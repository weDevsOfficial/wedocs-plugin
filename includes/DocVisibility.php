<?php

namespace WeDevs\WeDocs;

/**
 * Keep sections and articles out of sight while a doc above them is not
 * readable by the current visitor.
 *
 * A doc switched to Draft (or Private, or Pending) keeps its sections and
 * articles published, and WordPress judges each post by its own status, so
 * visitors could still open those pages, find them in Quick search and fetch
 * them over REST. Here a section or article is visible only while every doc
 * above it is published, or readable by the current user. Nothing is
 * rewritten: publishing the doc again brings its content straight back.
 *
 * @since WEDOCS_SINCE
 */
class DocVisibility {

    /**
     * Hidden doc ids, per user, for the current request.
     *
     * @var array<int, int[]>
     */
    private static $hidden = [];

    /**
     * Constructor.
     */
    public function __construct() {
        add_action( 'template_redirect', [ $this, 'hide_single_doc' ], 1 );
        add_filter( 'rest_docs_query', [ $this, 'exclude_from_rest_query' ] );
        add_filter( 'wp_sitemaps_posts_query_args', [ $this, 'exclude_from_sitemap' ], 10, 2 );
        add_filter( 'rest_request_before_callbacks', [ $this, 'guard_rest_item' ], 10, 3 );
    }

    /**
     * IDs of docs the current user may not see because a doc above them is
     * unpublished and not readable to them.
     *
     * @since WEDOCS_SINCE
     *
     * @return int[]
     */
    public static function hidden_ids( $user_id = null ) {
        $user_id = null === $user_id ? get_current_user_id() : (int) $user_id;

        if ( isset( self::$hidden[ $user_id ] ) ) {
            return self::$hidden[ $user_id ];
        }

        $unpublished = get_posts(
            [
                'post_type'        => 'docs',
                'post_status'      => [ 'draft', 'pending', 'private', 'future' ],
                'posts_per_page'   => -1,
                'fields'           => 'ids',
                'no_found_rows'    => true,
                'suppress_filters' => true,
            ]
        );

        $hidden = [];
        foreach ( $unpublished as $doc_id ) {
            if ( user_can( $user_id, 'read_post', $doc_id ) ) {
                continue;
            }

            $hidden = array_merge( $hidden, wedocs_get_doc_descendant_ids( $doc_id ) );
        }

        self::$hidden[ $user_id ] = array_values( array_unique( array_map( 'intval', $hidden ) ) );

        return self::$hidden[ $user_id ];
    }

    /**
     * Whether a doc may be shown to the current user.
     *
     * @since WEDOCS_SINCE
     *
     * @param int|\WP_Post $doc Doc.
     *
     * @return bool
     */
    public static function is_visible( $doc ) {
        $doc = get_post( $doc );

        if ( ! $doc || 'docs' !== $doc->post_type ) {
            return true;
        }

        return ! in_array( (int) $doc->ID, self::hidden_ids(), true );
    }

    /**
     * Answer 404 for a section or article under a hidden doc.
     *
     * @since WEDOCS_SINCE
     *
     * @return void
     */
    public function hide_single_doc() {
        if ( ! is_singular( 'docs' ) || self::is_visible( get_queried_object_id() ) ) {
            return;
        }

        global $wp_query;

        $wp_query->set_404();
        status_header( 404 );
        nocache_headers();
    }

    /**
     * Leave hidden docs out of REST collections and searches.
     *
     * @since WEDOCS_SINCE
     *
     * @param array $args WP_Query args.
     *
     * @return array
     */
    public function exclude_from_rest_query( $args ) {
        $hidden = self::hidden_ids();

        if ( $hidden ) {
            $args['post__not_in'] = array_merge( isset( $args['post__not_in'] ) ? (array) $args['post__not_in'] : [], $hidden );
        }

        return $args;
    }

    /**
     * Leave sections and articles of an unpublished doc out of the XML sitemap.
     *
     * Search engines crawl as visitors, so the list is built for a logged-out
     * user whoever requests the sitemap.
     *
     * @since WEDOCS_SINCE
     *
     * @param array  $args      WP_Query args.
     * @param string $post_type Post type of the sitemap.
     *
     * @return array
     */
    public function exclude_from_sitemap( $args, $post_type ) {
        if ( 'docs' !== $post_type ) {
            return $args;
        }

        $hidden = self::hidden_ids( 0 );

        if ( $hidden ) {
            $args['post__not_in'] = array_merge( isset( $args['post__not_in'] ) ? (array) $args['post__not_in'] : [], $hidden ); // phpcs:ignore WordPressVIPMinimum.Performance.WPQueryParams.PostNotIn_post__not_in
        }

        return $args;
    }

    /**
     * Refuse a single hidden doc over REST, the way its unpublished parent is refused.
     *
     * @since WEDOCS_SINCE
     *
     * @param mixed            $response Result so far.
     * @param array            $handler  Route handler.
     * @param \WP_REST_Request $request  Request.
     *
     * @return mixed
     */
    public function guard_rest_item( $response, $handler, $request ) {
        if ( is_wp_error( $response ) || 'GET' !== $request->get_method() ) {
            return $response;
        }

        if ( ! preg_match( '#^/wp/v2/docs/(\d+)$#', $request->get_route(), $matches ) ) {
            return $response;
        }

        if ( self::is_visible( (int) $matches[1] ) ) {
            return $response;
        }

        return new \WP_Error(
            'rest_forbidden',
            __( 'Sorry, you are not allowed to do that.', 'wedocs' ),
            [ 'status' => rest_authorization_required_code() ]
        );
    }
}
