<?php
// DESCRIPTION: Handles the "Docs URL Structure" setting — rewrites docs permalinks,
// DESCRIPTION: registers matching rewrite rules, and 301-redirects the inactive format.

namespace WeDevs\WeDocs;

use WP_Post;

/**
 * Docs URL Structure handler.
 *
 * Governs whether docs URLs look like:
 *   before_doc:  /docs/{top-doc}/{section}/{article}/   (default, WP core behavior)
 *   after_doc:   /{top-doc}/docs/{section}/{article}/
 *
 * Setting: wedocs_settings.general.docs_url_structure (values: "before_doc" | "after_doc").
 */
class Docs_URL_Structure {

    /**
     * Post type this class governs.
     *
     * @var string
     */
    private $post_type = 'docs';

    /**
     * Constructor — wire hooks.
     */
    public function __construct() {
        add_action( 'init', [ $this, 'register_rewrite_rules' ], 11 );
        add_action( 'init', [ $this, 'maybe_flush_deferred' ], 12 );
        add_filter( 'post_type_link', [ $this, 'filter_doc_permalink' ], 10, 2 );
        add_filter( 'request', [ $this, 'resolve_request' ] );
        add_action( 'template_redirect', [ $this, 'maybe_redirect_legacy_url' ], 1 );
        add_action( 'wedocs_settings_data_updated', [ $this, 'maybe_flush_rewrite_rules' ] );
    }

    /**
     * Get the active URL structure setting.
     *
     * @return string "before_doc" or "after_doc"
     */
    public function get_structure() {
        $value = wedocs_get_general_settings( 'docs_url_structure', 'before_doc' );

        return 'after_doc' === $value ? 'after_doc' : 'before_doc';
    }

    /**
     * Get the rewrite slug registered for the docs post type.
     *
     * Resolves from the registered post-type object so that sites which filter
     * `wedocs_post_type` to override the rewrite slug are respected. Falls back
     * to the default "docs" during very early init (before registration).
     *
     * @return string Sanitized slug without leading/trailing slashes.
     */
    private function get_rewrite_slug() {
        $default = 'docs';

        if ( ! function_exists( 'get_post_type_object' ) ) {
            return $default;
        }

        $post_type_object = get_post_type_object( $this->post_type );
        if ( ! $post_type_object ) {
            return $default;
        }

        $slug = '';
        if ( is_array( $post_type_object->rewrite ) && ! empty( $post_type_object->rewrite['slug'] ) ) {
            $slug = (string) $post_type_object->rewrite['slug'];
        }

        $slug = trim( $slug, '/' );

        return '' !== $slug ? $slug : $default;
    }

    /**
     * Register rewrite rules to resolve "after_doc" URLs back to docs posts.
     *
     * Active only when structure is "after_doc". Maps:
     *   /{top-slug}/docs/{rest}/  →  index.php?docs={top-slug}/{rest}
     *   /{top-slug}/docs/         →  index.php?docs={top-slug}
     *
     * WP's hierarchical post lookup resolves the combined path to the correct post.
     *
     * @return void
     */
    public function register_rewrite_rules() {
        $structure = $this->get_structure();

        if ( 'after_doc' !== $structure ) {
            return;
        }

        // Skip reserved top segments to avoid colliding with WP / plugin URLs.
        $reserved   = $this->reserved_top_segments();
        $slug_regex = preg_quote( $this->get_rewrite_slug(), '#' );

        // Nested paths: /{top}/{slug}/{rest}/
        add_rewrite_rule(
            '^(?!(?:' . implode( '|', $reserved ) . ')/)([^/]+)/' . $slug_regex . '/(.+?)/?$',
            'index.php?' . $this->post_type . '=$matches[1]/$matches[2]',
            'top'
        );

        // Bare "Docs hub" landing under a top doc: /{top}/{slug}/
        add_rewrite_rule(
            '^(?!(?:' . implode( '|', $reserved ) . ')/)([^/]+)/' . $slug_regex . '/?$',
            'index.php?' . $this->post_type . '=$matches[1]',
            'top'
        );
    }

    /**
     * Filter post_type_link to produce permalinks matching the active structure.
     *
     * @param string  $post_link  Default permalink.
     * @param WP_Post $post       Post object.
     *
     * @return string
     */
    public function filter_doc_permalink( $post_link, $post ) {
        if ( ! $post instanceof WP_Post || $post->post_type !== $this->post_type ) {
            return $post_link;
        }

        if ( 'publish' !== $post->post_status ) {
            return $post_link;
        }

        if ( 'after_doc' !== $this->get_structure() ) {
            return $post_link;
        }

        $top_slug = $this->get_top_level_slug( $post );
        if ( ! $top_slug ) {
            return $post_link;
        }

        $rewrite_slug = $this->get_rewrite_slug();

        // Default post_link shape is {home}[/front]/{slug}/{top}[/rest]/ — we swap the
        // `{slug}/{top}` segment to `{top}/{slug}` while preserving any front base and the rest.
        $parts = wp_parse_url( $post_link );
        if ( empty( $parts['path'] ) ) {
            return $post_link;
        }

        $pattern = '#/' . preg_quote( $rewrite_slug, '#' ) . '/' . preg_quote( $top_slug, '#' ) . '(?=/|$)#';
        if ( ! preg_match( $pattern, $parts['path'] ) ) {
            return $post_link;
        }

        $new_path = preg_replace( $pattern, '/' . $top_slug . '/' . $rewrite_slug, $parts['path'], 1 );

        $scheme = isset( $parts['scheme'] ) ? $parts['scheme'] . '://' : '//';
        $host   = isset( $parts['host'] ) ? $parts['host'] : '';
        $port   = isset( $parts['port'] ) ? ':' . $parts['port'] : '';
        $query  = isset( $parts['query'] ) ? '?' . $parts['query'] : '';
        $frag   = isset( $parts['fragment'] ) ? '#' . $parts['fragment'] : '';

        $rewritten = $scheme . $host . $port . $new_path . $query . $frag;

        return $rewritten;
    }

    /**
     * Safety net for "after_doc" requests that aren't caught by rewrite rules yet
     * (e.g., before flush on a just-changed setting, or servers with aggressive caching).
     *
     * @param array $query_vars
     *
     * @return array
     */
    public function resolve_request( $query_vars ) {
        if ( 'after_doc' !== $this->get_structure() ) {
            return $query_vars;
        }

        if ( ! empty( $query_vars[ $this->post_type ] ) ) {
            return $query_vars;
        }

        // WP fills "pagename" when it finds a hierarchical-looking path but couldn't resolve it.
        if ( empty( $query_vars['pagename'] ) ) {
            return $query_vars;
        }

        $path         = trim( $query_vars['pagename'], '/' );
        $rewrite_slug = $this->get_rewrite_slug();

        if ( false === strpos( $path, '/' . $rewrite_slug ) ) {
            return $query_vars;
        }

        // Expected shape: {top}/{slug} or {top}/{slug}/{rest}
        $path_pattern = '#^([^/]+)/' . preg_quote( $rewrite_slug, '#' ) . '(?:/(.+))?$#';
        if ( ! preg_match( $path_pattern, $path, $matches ) ) {
            return $query_vars;
        }

        $top_slug = $matches[1];
        $rest     = isset( $matches[2] ) ? $matches[2] : '';
        $doc_path = '' === $rest ? $top_slug : $top_slug . '/' . $rest;

        if ( ! $this->doc_path_exists( $doc_path ) ) {
            return $query_vars;
        }

        unset( $query_vars['pagename'] );
        $query_vars[ $this->post_type ] = $doc_path;
        $query_vars['post_type']        = $this->post_type;
        $query_vars['name']             = basename( $doc_path );

        return $query_vars;
    }

    /**
     * 301-redirect requests hitting the *inactive* URL format to the active one.
     *
     * Runs at template_redirect so WP has already resolved (or failed to resolve) the request.
     *
     * @return void
     */
    public function maybe_redirect_legacy_url() {
        if ( is_admin() || wp_doing_ajax() || ( defined( 'REST_REQUEST' ) && REST_REQUEST ) ) {
            return;
        }

        if ( empty( $_SERVER['REQUEST_URI'] ) ) {
            return;
        }

        $request_uri  = wp_parse_url( esc_url_raw( wp_unslash( $_SERVER['REQUEST_URI'] ) ), PHP_URL_PATH );
        $request_path = trim( (string) $request_uri, '/' );
        if ( '' === $request_path ) {
            return;
        }

        $structure = $this->get_structure();

        $current_url  = untrailingslashit( home_url( $request_uri ) );
        $rewrite_slug = $this->get_rewrite_slug();

        if ( 'after_doc' === $structure ) {
            // Active = after_doc. Legacy = before_doc → /{slug}/{top}/{rest}/
            $legacy_pattern = '#^' . preg_quote( $rewrite_slug, '#' ) . '/(.+?)/?$#';
            if ( ! preg_match( $legacy_pattern, $request_path, $matches ) ) {
                return;
            }

            $doc_path = $matches[1];
            $post     = $this->get_doc_by_path( $doc_path );
            if ( ! $post ) {
                return;
            }

            // Confirm the request really is this doc's legacy permalink, not a coincidental
            // path collision. The legacy "before_doc" URL is the native /{slug}/{path}/ form.
            $expected_legacy = untrailingslashit( home_url( '/' . $rewrite_slug . '/' . $doc_path . '/' ) );
            if ( $expected_legacy !== $current_url ) {
                return;
            }

            $target = get_permalink( $post );
            if ( $target && untrailingslashit( $target ) !== $current_url ) {
                wp_safe_redirect( $target, 301 );
                exit;
            }

            return;
        }

        // Active = before_doc. Legacy = after_doc → /{top}/{slug}/{rest}/ or /{top}/{slug}/
        $reserved = $this->reserved_top_segments();
        $pattern  = '#^(?!(?:' . implode( '|', $reserved ) . ')/)([^/]+)/' . preg_quote( $rewrite_slug, '#' ) . '(?:/(.+?))?/?$#';

        if ( ! preg_match( $pattern, $request_path, $matches ) ) {
            return;
        }

        $top_slug = $matches[1];
        $rest     = isset( $matches[2] ) ? $matches[2] : '';
        $doc_path = '' === $rest ? $top_slug : $top_slug . '/' . $rest;

        $post = $this->get_doc_by_path( $doc_path );
        if ( ! $post ) {
            return;
        }

        // Confirm the request really is this doc's legacy permalink. The top segment
        // must be the doc's top-level ancestor slug (not some unrelated page that
        // happens to share the name), and the full after_doc URL must match.
        $top_ancestor_slug = $this->get_top_level_slug( $post );
        if ( $top_ancestor_slug !== $top_slug ) {
            return;
        }

        $expected_legacy_path = '' === $rest
            ? '/' . $top_slug . '/' . $rewrite_slug . '/'
            : '/' . $top_slug . '/' . $rewrite_slug . '/' . $rest . '/';
        $expected_legacy = untrailingslashit( home_url( $expected_legacy_path ) );
        if ( $expected_legacy !== $current_url ) {
            return;
        }

        $target = get_permalink( $post );
        if ( $target && untrailingslashit( $target ) !== $current_url ) {
            wp_safe_redirect( $target, 301 );
            exit;
        }
    }

    /**
     * Flush rewrite rules when the docs_url_structure setting changes.
     *
     * @param array $new_settings Settings blob just saved.
     *
     * @return void
     */
    public function maybe_flush_rewrite_rules( $new_settings ) {
        $new_value = 'before_doc';

        if ( is_array( $new_settings ) && isset( $new_settings['general']['docs_url_structure'] ) ) {
            $new_value = 'after_doc' === $new_settings['general']['docs_url_structure'] ? 'after_doc' : 'before_doc';
        }

        $last_known = get_option( 'wedocs_docs_url_structure_last', 'before_doc' );

        if ( $new_value === $last_known ) {
            return;
        }

        update_option( 'wedocs_docs_url_structure_last', $new_value );

        // Defer the actual flush to the next request's init (after our rewrite rules
        // have been registered with the new structure). Flushing on the current request
        // is unreliable because $wp_rewrite's rule array was compiled during `init`
        // before the new setting was saved.
        update_option( 'wedocs_docs_url_structure_needs_flush', 1, false );
    }

    /**
     * Perform a deferred flush set by maybe_flush_rewrite_rules().
     * Runs at init priority 12 — right after register_rewrite_rules() at priority 11.
     *
     * @return void
     */
    public function maybe_flush_deferred() {
        if ( ! get_option( 'wedocs_docs_url_structure_needs_flush' ) ) {
            return;
        }

        delete_option( 'wedocs_docs_url_structure_needs_flush' );
        flush_rewrite_rules( false );
    }

    /**
     * Get the top-level doc slug for a given post by walking up the parent chain.
     *
     * @param WP_Post $post
     *
     * @return string Empty string if no top-level ancestor can be resolved.
     */
    private function get_top_level_slug( $post ) {
        $current = $post;

        while ( $current && $current->post_parent ) {
            $parent = get_post( $current->post_parent );
            if ( ! $parent ) {
                break;
            }
            $current = $parent;
        }

        return $current ? $current->post_name : '';
    }

    /**
     * Check whether a given "/" separated doc path resolves to an existing doc.
     *
     * @param string $path
     *
     * @return bool
     */
    private function doc_path_exists( $path ) {
        return (bool) $this->get_doc_by_path( $path );
    }

    /**
     * Resolve a hierarchical doc path (e.g. "top/section/article") to its post.
     *
     * @param string $path
     *
     * @return WP_Post|null
     */
    private function get_doc_by_path( $path ) {
        $post = get_page_by_path( $path, OBJECT, $this->post_type );

        return $post instanceof WP_Post ? $post : null;
    }

    /**
     * Top-level URL segments reserved by WP / the plugin. Used to avoid matching
     * `/wp-admin/docs/...` etc. as "after_doc" paths.
     *
     * @return array<int, string>
     */
    private function reserved_top_segments() {
        $reserved = [
            'wp-admin',
            'wp-login.php',
            'wp-content',
            'wp-includes',
            'wp-json',
            'feed',
            'comments',
            'search',
            'author',
            'category',
            'tag',
            'page',
            $this->get_rewrite_slug(),
        ];

        $filtered = apply_filters( 'wedocs_url_structure_reserved_segments', $reserved );

        // Defensive: a third-party callback may return a non-array or a non-string entry.
        // Coerce back to a clean list of non-empty strings before preg_quote'ing.
        if ( ! \is_array( $filtered ) ) {
            $filtered = $reserved;
        }

        $filtered = array_filter(
            array_map(
                static function ( $segment ) {
                    return \is_scalar( $segment ) ? trim( (string) $segment, '/' ) : '';
                },
                $filtered
            ),
            'strlen'
        );

        if ( empty( $filtered ) ) {
            $filtered = $reserved;
        }

        return array_map( 'preg_quote', array_values( $filtered ) );
    }
}
