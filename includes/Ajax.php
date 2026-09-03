<?php

namespace WeDevs\WeDocs;

use WeDevs\WeDocs\Admin\Migrate;

/**
 * Ajax Class.
 */
class Ajax {

    /**
     * Bind actions.
     */
    public function __construct() {
        // Get documentations stuff.
        add_action('wp_ajax_wedocs_get_docs', [$this, 'get_docs']);
        add_action('wp_ajax_nopriv_wedocs_get_docs', [$this, 'get_docs']);

        // Get vendor-only docs for vendor dashboard search.
        add_action('wp_ajax_wedocs_get_vendor_docs', [$this, 'get_vendor_docs']);

        // Handle weDocs rating stuff.
        add_action('wp_ajax_wedocs_rated', [$this, 'hide_wedocs_rating']);

        // Handle weDocs feedback stuff.
        add_action('wp_ajax_wedocs_ajax_feedback', [$this, 'handle_feedback']);
        add_action('wp_ajax_nopriv_wedocs_ajax_feedback', [$this, 'handle_feedback']);

        // Handle weDocs documentation contact stuff.
        add_action('wp_ajax_wedocs_contact_feedback', [$this, 'handle_contact']);
        add_action('wp_ajax_nopriv_wedocs_contact_feedback', [$this, 'handle_contact']);

        // Handle weDocs beta notice.
        add_action( 'wp_ajax_hide_wedocs_beta_notice', [ $this, 'hide_beta_notice' ] );

        // Data migration.
        add_action('wp_ajax_wedocs_check_need_betterdocs_migration', [Migrate::class, 'need_migration']);
        add_action('wp_ajax_wedocs_migrate_betterdocs_to_wedocs', [Migrate::class, 'do_migration']);

        // Handle weDocs pro notice.
        add_action( 'wp_ajax_hide_wedocs_pro_notice', [ $this, 'hide_pro_notice' ] );
        add_action( 'wp_ajax_nopriv_hide_wedocs_pro_notice', [ $this, 'hide_pro_notice' ] );

        // Handle weDocs helpful feedback voting.
        add_action( 'wp_ajax_wedocs_helpful_feedback_vote', [ $this, 'handle_helpful_feedback_vote' ] );
        add_action( 'wp_ajax_nopriv_wedocs_helpful_feedback_vote', [ $this, 'handle_helpful_feedback_vote' ] );

        // Handle QuickSearch.
        add_action( 'wp_ajax_wedocs_quick_search', [ $this, 'quick_search' ] );
        add_action( 'wp_ajax_nopriv_wedocs_quick_search', [ $this, 'quick_search' ] );

        // Handle load more for DocsGrid widget
        add_action('wp_ajax_wedocs_load_more_docs', [$this, 'load_more_docs']);
        add_action('wp_ajax_nopriv_wedocs_load_more_docs', [$this, 'load_more_docs']);

        // Handle "Was This Helpful" votes
        add_action('wp_ajax_wedocs_helpful_vote', [$this, 'handle_helpful_vote']);
        add_action('wp_ajax_nopriv_wedocs_helpful_vote', [$this, 'handle_helpful_vote']);

        // Handle "Was This Helpful" feedback
        add_action('wp_ajax_wedocs_helpful_feedback', [$this, 'handle_helpful_feedback']);
        add_action('wp_ajax_nopriv_wedocs_helpful_feedback', [$this, 'handle_helpful_feedback']);

        // Handle "Need More Help" form submission
        add_action('wp_ajax_wedocs_need_help_submit', [$this, 'handle_need_help_submit']);
        add_action('wp_ajax_nopriv_wedocs_need_help_submit', [$this, 'handle_need_help_submit']);
    }

    /**
     * Get all docs.
     *
     * @return void
     */
    public function get_docs() {
        check_ajax_referer('wedocs-ajax');

        // Only users who can edit docs may see unpublished documentation.
        $statuses = current_user_can( 'edit_docs' ) ? ['publish', 'draft', 'pending'] : ['publish'];

        $docs = get_posts([
            'post_type'      => 'docs',
            'post_status'    => $statuses,
            'posts_per_page' => -1,
            'orderby'        => 'menu_order',
            'order'          => 'ASC',
            'meta_query'     => wedocs_exclude_vendor_doc_meta_query(),
        ]);

        // Build a doc tree with separate parents, sections, articles & all docs together.
        $docs_tree = ['all_docs' => $docs];
        foreach ($docs as $doc) {
            $is_parent      = $this->is_a_parent_doc($doc->ID);
            $doc->permalink = get_permalink($doc->ID);
            if ($is_parent) {
                // Get parents documentation.
                $docs_tree['parents'][] = $doc;
                continue;
            }

            $is_section = $this->is_a_parent_doc($doc->post_parent);
            if ($is_section) {
                // Get sections documentation.
                $docs_tree['sections'][] = $doc;
                continue;
            }

            // Get articles documentation.
            $docs_tree['articles'][] = $doc;
        }

        wp_send_json_success($docs_tree);
    }

    /**
     * Get vendor-only docs for vendor dashboard search.
     *
     * Returns only docs marked with _is_vendor_doc meta, structured
     * the same way as get_docs() so the frontend search modal can
     * reuse the same client-side filtering logic.
     *
     * @since 2.2.7
     *
     * @return void
     */
    public function get_vendor_docs() {
        check_ajax_referer('wedocs-ajax');

        if ( ! current_user_can( 'dokandar' ) && ! current_user_can( 'manage_options' ) ) {
            wp_send_json_error( __( 'Unauthorized access.', 'wedocs' ), 403 );
        }

        $docs = get_posts([
            'post_type'      => 'docs',
            'post_status'    => 'publish',
            'posts_per_page' => -1,
            'orderby'        => 'menu_order',
            'order'          => 'ASC',
            'meta_query'     => [
                [
                    'key'   => '_is_vendor_doc',
                    'value' => '1',
                ],
            ],
        ]);

        // Build a doc tree with separate parents, sections, articles & all docs together.
        $docs_tree = ['all_docs' => $docs];
        foreach ($docs as $doc) {
            $is_parent      = $this->is_a_parent_doc($doc->ID);
            $doc->permalink = get_permalink($doc->ID);
            if ($is_parent) {
                $docs_tree['parents'][] = $doc;
                continue;
            }

            $is_section = $this->is_a_parent_doc($doc->post_parent);
            if ($is_section) {
                $docs_tree['sections'][] = $doc;
                continue;
            }

            $docs_tree['articles'][] = $doc;
        }

        wp_send_json_success($docs_tree);
    }

    /**
     * Assume the user rated weDocs.
     *
     * @return void
     */
    public function hide_wedocs_rating() {
        check_ajax_referer('wedocs-admin-nonce');

        update_option('wedocs_admin_footer_text_rated', 'yes');
        wp_send_json_success();
    }

    /**
     * Store feedback for an article.
     *
     * @return void
     */
    public function handle_feedback() {
        check_ajax_referer('wedocs-ajax');

        $template = '<div class="wedocs-alert wedocs-alert-%s">%s</div>';
        $previous = isset($_COOKIE['wedocs_response']) ? explode(',', $_COOKIE['wedocs_response']) : [];
        $post_id  = intval($_POST['post_id']);
        $type     = in_array($_POST['type'], ['positive', 'negative']) ? $_POST['type'] : false;

        // Only documentation posts accept feedback votes.
        if ( 'docs' !== get_post_type( $post_id ) ) {
            wp_send_json_error( __( 'Invalid post.', 'wedocs' ) );
        }

        // check previous response
        if (in_array($post_id, $previous)) {
            $message = sprintf($template, 'danger', __('Sorry, we have already recorded your feedback!', 'wedocs'));
            wp_send_json_error($message);
        }

        // seems new
        if ($type) {
            $count = (int) get_post_meta($post_id, $type, true);
            update_post_meta($post_id, $type, $count + 1);

            array_push($previous, $post_id);
            $cookie_val = implode(',', $previous);

            $val = setcookie('wedocs_response', $cookie_val, time() + WEEK_IN_SECONDS, COOKIEPATH, COOKIE_DOMAIN);
        }

        $message = sprintf($template, 'success', __('Thanks for your feedback!', 'wedocs'));
        wp_send_json_success($message);
    }

    /**
     * Send email feedback.
     *
     * @return void
     */
    public function handle_contact() {
        check_ajax_referer('wedocs-ajax');

        $name    = isset($_POST['name']) ? sanitize_text_field($_POST['name']) : '';
        $subject = isset($_POST['subject']) ? sanitize_text_field($_POST['subject']) : '';
        $message = isset($_POST['message']) ? strip_tags($_POST['message']) : '';
        $doc_id  = isset($_POST['doc_id']) ? intval($_POST['doc_id']) : 0;

        if (!is_user_logged_in()) {
            $email = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) : false;

            if (!$email) {
                wp_send_json_error(__('Please enter a valid email address.', 'wedocs'));
            }
        } else {
            $email = wp_get_current_user()->user_email;
        }

        if (empty($subject)) {
            wp_send_json_error(__('Please provide a subject line.', 'wedocs'));
        }

        if (empty($message)) {
            wp_send_json_error(__('Please provide the message details.', 'wedocs'));
        }

        wedocs_doc_feedback_email($doc_id, $name, $email, $subject, $message);

        wp_send_json_success(__('Thanks for your feedback.', 'wedocs'));
    }

    /**
     * Build a tree of docs with parent-child relation.
     *
     * @param array $docs
     * @param int   $parent
     *
     * @return array
     */
    public function build_tree($docs, $parent = 0) {
        $result = [];

        if (!$docs) {
            return $result;
        }

        $post_type_object = get_post_type_object('docs');

        foreach ($docs as $key => $doc) {
            if ($doc->post_parent == $parent) {
                unset($docs[$key]);

                // build tree and sort
                $child = $this->build_tree($docs, $doc->ID);
                usort($child, [$this, 'sort_callback']);

                $result[] = [
                    'post' => [
                        'id'     => $doc->ID,
                        'title'  => $doc->post_title,
                        'status' => $doc->post_status,
                        'order'  => $doc->menu_order,
                        'caps'   => [
                            'edit'   => current_user_can($post_type_object->cap->edit_post, $doc->ID),
                            'delete' => current_user_can($post_type_object->cap->delete_post, $doc->ID),
                        ],
                    ],
                    'child' => $child,
                ];
            }
        }

        return $result;
    }

    /**
     * Sort callback for sorting posts with their menu order.
     *
     * @param array $a
     * @param array $b
     *
     * @return int
     */
    public function sort_callback($a, $b) {
        return $a['post']['order'] - $b['post']['order'];
    }

    /**
     * Hide weDocs pro notice.
     *
     * @since 2.0.0
     *
     * @return void
     */
    public function hide_pro_notice() {
        check_ajax_referer( 'wedocs-admin-nonce', 'nonce' );

        $user_id = get_current_user_id();
        update_user_meta( $user_id, 'wedocs_hide_pro_notice', true );

        wp_send_json_success();
    }

    /**
     * Check this documentation is parent.
     *
     * @since 2.0.2
     *
     * @param int $doc_id
     *
     * @return bool
     */
    public function is_a_parent_doc($doc_id) {
        return (int) wp_get_post_parent_id($doc_id) === 0;
    }

    /**
     * Load more docs for DocsGrid widget AJAX pagination
     *
     * @since 2.1.12
     *
     * @return void
     */
    public function load_more_docs() {
        check_ajax_referer('wedocs_load_more', 'nonce');

        $page      = isset($_POST['page']) ? max(1, intval($_POST['page'])) : 1;
        $widget_id = isset($_POST['widget_id']) ? sanitize_text_field($_POST['widget_id']) : '';
        $post_id   = isset($_POST['post_id']) ? intval($_POST['post_id']) : 0;

        // Resolve the widget's own settings server-side. They are never taken
        // from the request: this endpoint is unauthenticated, so a client-supplied
        // posts_per_page or post__not_in would let anyone shape the query.
        // An empty result is not fatal: the widget may live in a theme-builder
        // template rather than the queried post. Fall back to defaults, which
        // still yields a correctly shaped card.
        $settings = $this->get_widget_settings($widget_id, $post_id);

        $docs_per_page = intval($settings['docsPerPage'] ?? 9);
        $exclude_docs  = $settings['excludeDocs'] ?? [];
        $order         = $settings['order'] ?? 'asc';
        $order_by      = $settings['orderBy'] ?? 'menu_order';

        if ($docs_per_page <= 0) {
            $docs_per_page = 9;
        }

        $args = [
            'post_type'      => 'docs',
            'post_status'    => 'publish',
            'post_parent'    => 0,
            'orderby'        => $order_by,
            'order'          => $order,
            'posts_per_page' => $docs_per_page,
            'paged'          => $page,
        ];

        if (!empty($exclude_docs)) {
            $args['post__not_in'] = array_map('intval', (array) $exclude_docs);
        }

        $docs_query = new \WP_Query($args);

        if (!$docs_query->have_posts()) {
            wp_send_json_error(['message' => __('No more docs found.', 'wedocs')]);
        }

        // Continue the stagger delay from where the previous page finished.
        $offset = ($page - 1) * $docs_per_page;
        $html   = '';

        foreach ($docs_query->posts as $index => $doc) {
            $html .= \WeDevs\WeDocs\Elementor\Widgets\DocsGrid::render_doc_card($doc, $settings, $offset + $index);
        }

        wp_send_json_success([
            'html'      => $html,
            'page'      => $page,
            'max_pages' => $docs_query->max_num_pages,
        ]);
    }

    /**
     * Resolve an Elementor widget's saved settings server-side.
     *
     * Mirrors get_need_help_recipient(): settings for an unauthenticated
     * endpoint are read from the Elementor document rather than the request
     * payload, so a caller cannot influence the resulting query.
     *
     * @since 2.3.2
     *
     * @param string $widget_id Elementor widget (element) id.
     * @param int    $post_id   Post the widget lives on.
     *
     * @return array Widget settings, or an empty array when not resolvable.
     */
    private function get_widget_settings($widget_id, $post_id) {
        if (!$post_id || !$widget_id || !did_action('elementor/loaded') || !class_exists('\Elementor\Plugin')) {
            return [];
        }

        $document = \Elementor\Plugin::$instance->documents->get($post_id);

        if (!$document) {
            return [];
        }

        $settings = $this->find_widget_settings($document->get_elements_data(), $widget_id);

        return is_array($settings) ? $settings : [];
    }

    /**
     * Recursively find the settings array for a given Elementor element id.
     *
     * @since 2.3.2
     *
     * @param array  $elements  Elementor elements tree.
     * @param string $widget_id Target element id.
     *
     * @return array|null
     */
    private function find_widget_settings($elements, $widget_id) {
        foreach ((array) $elements as $element) {
            if (isset($element['id']) && $element['id'] === $widget_id) {
                return isset($element['settings']) ? (array) $element['settings'] : [];
            }

            if (!empty($element['elements'])) {
                $found = $this->find_widget_settings($element['elements'], $widget_id);

                if (null !== $found) {
                    return $found;
                }
            }
        }

        return null;
    }

    /**
     * Handle helpful feedback voting.
     *
     * @since 2.1.0
     *
     * @return void
     */
    public function handle_helpful_feedback_vote() {
        // Verify nonce for security
        if ( ! wp_verify_nonce( $_POST['nonce'] ?? '', 'wedocs_helpful_feedback_nonce' ) ) {
            wp_send_json_error( [
                'message' => __( 'Security verification failed.', 'wedocs' )
            ] );
        }

        // Validate required fields
        $post_id = intval( $_POST['post_id'] ?? 0 );
        $vote = sanitize_text_field( $_POST['vote'] ?? '' );
        $allow_anonymous = filter_var( $_POST['allow_anonymous'] ?? true, FILTER_VALIDATE_BOOLEAN );

        if ( ! $post_id || ! in_array( $vote, [ 'yes', 'no' ] ) ) {
            wp_send_json_error( [
                'message' => __( 'Invalid voting data.', 'wedocs' )
            ] );
        }

        // Verify this is a docs post
        if ( get_post_type( $post_id ) !== 'docs' ) {
            wp_send_json_error( [
                'message' => __( 'Invalid post type.', 'wedocs' )
            ] );
        }

        // Get current user ID and IP
        $user_id = get_current_user_id();
        $user_ip = wedocs_get_client_ip();

        // Check if user can vote
        if ( ! $user_id && ! $allow_anonymous ) {
            wp_send_json_error( [
                'message' => __( 'You must be logged in to vote.', 'wedocs' )
            ] );
        }

        // Check if user has already voted
        $has_voted = false;

        // Check cookie-based tracking (for compatibility with existing system)
        $previous = isset( $_COOKIE['wedocs_response'] ) ? explode( ',', $_COOKIE['wedocs_response'] ) : [];
        if ( in_array( $post_id, $previous ) ) {
            $has_voted = true;
        }

        // Check user-specific voting records
        if ( ! $has_voted && $user_id ) {
            // Check by user ID
            $user_vote = get_post_meta( $post_id, "wedocs_helpful_vote_user_{$user_id}", true );
            if ( $user_vote ) {
                $has_voted = true;
            }
        } elseif ( ! $has_voted && $allow_anonymous && $user_ip ) {
            // Check by IP for anonymous users
            $ip_vote = wedocs_has_anonymous_voted( $post_id, $user_ip );
            if ( $ip_vote ) {
                $has_voted = true;
            }
        }

        if ( $has_voted ) {
            wp_send_json_error( [
                'already_voted' => true,
                'message'       => __( 'Sorry, we have already recorded your feedback!', 'wedocs' ),
            ] );
        }

        // Record the vote
        $vote_meta_key = $vote === 'yes' ? 'positive' : 'negative';
        $current_votes = (int) get_post_meta( $post_id, $vote_meta_key, true );
        update_post_meta( $post_id, $vote_meta_key, $current_votes + 1 );

        // Record user vote to prevent duplicate voting
        if ( $user_id ) {
            update_post_meta( $post_id, "wedocs_helpful_vote_user_{$user_id}", $vote );
        } elseif ( $allow_anonymous && $user_ip ) {
            wedocs_record_anonymous_vote( $post_id, $user_ip, $vote );
        }

        // Also update cookie-based tracking for compatibility with existing system
        $previous = isset( $_COOKIE['wedocs_response'] ) ? explode( ',', $_COOKIE['wedocs_response'] ) : [];
        array_push( $previous, $post_id );
        $cookie_val = implode( ',', $previous );
        setcookie( 'wedocs_response', $cookie_val, time() + WEEK_IN_SECONDS, COOKIEPATH, COOKIE_DOMAIN );

        // Get updated vote counts
        $yes_votes = (int) get_post_meta( $post_id, 'positive', true );
        $no_votes = (int) get_post_meta( $post_id, 'negative', true );

        // Fire action hook for extensibility
        do_action( 'wedocs_helpful_feedback_voted', $post_id, $vote, $user_id, $user_ip );

        // Return success response
        wp_send_json_success( [
            'vote' => $vote,
            'yes_votes' => $yes_votes,
            'no_votes' => $no_votes,
            'message' => __( 'Thank you for your feedback!', 'wedocs' )
        ] );
    }

    /**
     * QuickSearch AJAX handler
     *
     * @since 2.2.0
     *
     * @return void
     */
    public function quick_search() {
        check_ajax_referer( 'wedocs-ajax' );

        $query = isset( $_POST['query'] ) ? sanitize_text_field( $_POST['query'] ) : '';
        $per_page = isset( $_POST['per_page'] ) ? intval( $_POST['per_page'] ) : 10;
        $format = isset( $_POST['format'] ) ? sanitize_text_field( $_POST['format'] ) : 'json';
        $modal_styles = isset( $_POST['modal_styles'] ) ? $_POST['modal_styles'] : [];
        $show_icon_in_results = isset( $_POST['show_icon_in_results'] ) ? filter_var( $_POST['show_icon_in_results'], FILTER_VALIDATE_BOOLEAN ) : true;


        $result_image_type = isset( $_POST['result_image_type'] ) ? sanitize_text_field( $_POST['result_image_type'] ) : 'icon';


        // If modal_styles is a string (JSON), decode it
        if ( is_string( $modal_styles ) ) {
            // Remove slashes that WordPress adds to escaped quotes
            $modal_styles = stripslashes( $modal_styles );
            $modal_styles = json_decode( $modal_styles, true );
        }

        // Ensure it's an array
        if ( ! is_array( $modal_styles ) ) {
            $modal_styles = [];
        }

        if ( empty( $query ) || strlen( $query ) < 2 ) {
            wp_send_json_error( __( 'Query must be at least 2 characters long.', 'wedocs' ) );
        }

        // Use existing search logic from API
        $args = [
            'post_type'      => 'docs',
            'posts_per_page' => $per_page,
            's'              => $query,
            'post_status'    => 'publish',
        ];

        $query_obj = new \WP_Query( $args );
        $docs = $query_obj->get_posts();
        $results = [];

        foreach ( $docs as $doc ) {
            $results[] = [
                'id'        => $doc->ID,
                'title'     => [
                    'rendered' => get_the_title( $doc->ID ),
                ],
                'permalink' => get_permalink( $doc->ID ),
                'parent'    => $doc->post_parent,
                'order'     => $doc->menu_order,
            ];
        }

        if ( $format === 'html' ) {
            // Load template for HTML response
            $template_args = [
                'results'      => $results,
                'query'        => $query,
                'modal_styles' => $modal_styles,
                'empty_message' => __( 'No results found. Try different keywords.', 'wedocs' ),
                'result_image_type' => $result_image_type,
            ];

            // Load the template
            $template_path = plugin_dir_path( __FILE__ ) . '../assets/build/blocks/QuickSearch/templates/search-results.php';
            if ( file_exists( $template_path ) ) {
                extract( $template_args );
                ob_start();
                include $template_path;
                $html = ob_get_clean();
                wp_send_json_success( [
                    'html' => $html,
                    'results' => $results,
                    'query' => $query
                ] );
            } else {
                wp_send_json_error( __( 'Template not found.', 'wedocs' ) );
            }
        } else {
            // Return JSON response
            wp_send_json_success( $results );
        }
    }

    /**
     * Handle "Was This Helpful" vote.
     */
    public function handle_helpful_vote() {
        check_ajax_referer('wedocs_helpful_vote', 'nonce');

        $post_id = intval($_POST['post_id'] ?? 0);
        $vote = sanitize_text_field($_POST['vote'] ?? '');

        if (!$post_id || !in_array($vote, ['yes', 'no'], true)) {
            wp_send_json_error(['message' => __('Invalid vote.', 'wedocs')]);
        }

        // Only allow voting on docs posts.
        if (get_post_type($post_id) !== 'docs') {
            wp_send_json_error(['message' => __('Invalid post type.', 'wedocs')]);
        }

        // Prevent duplicate/inflated votes (cookie + user meta + IP transient).
        $user_id = get_current_user_id();
        $user_ip = wedocs_get_client_ip();

        $previous = isset($_COOKIE['wedocs_response']) ? explode(',', $_COOKIE['wedocs_response']) : [];
        $has_voted = in_array((string) $post_id, $previous, true);

        if (!$has_voted && $user_id && get_post_meta($post_id, "wedocs_helpful_vote_user_{$user_id}", true)) {
            $has_voted = true;
        }

        if (!$has_voted && !$user_id && $user_ip && wedocs_has_anonymous_voted($post_id, $user_ip)) {
            $has_voted = true;
        }

        if ($has_voted) {
            wp_send_json_error([
                'already_voted' => true,
                'message'       => __('You have already voted on this article.', 'wedocs'),
            ]);
        }

        $meta_key = $vote === 'yes' ? 'positive' : 'negative';
        $current = (int) get_post_meta($post_id, $meta_key, true);
        update_post_meta($post_id, $meta_key, $current + 1);

        // Record the vote so it cannot be repeated.
        if ($user_id) {
            update_post_meta($post_id, "wedocs_helpful_vote_user_{$user_id}", $vote);
        } elseif ($user_ip) {
            wedocs_record_anonymous_vote($post_id, $user_ip, $vote);
        }

        $previous[] = $post_id;
        setcookie('wedocs_response', implode(',', $previous), time() + WEEK_IN_SECONDS, COOKIEPATH, COOKIE_DOMAIN);

        wp_send_json_success([
            'yes' => (int) get_post_meta($post_id, 'positive', true),
            'no' => (int) get_post_meta($post_id, 'negative', true),
        ]);
    }

    /**
     * Handle "Was This Helpful" negative feedback text.
     */
    public function handle_helpful_feedback() {
        check_ajax_referer('wedocs_helpful_vote', 'nonce');

        // Unauthenticated and appends to a single growing meta row, so throttle
        // per IP the same way the other public write endpoints do.
        if (!wedocs_rate_limit_ok('helpful_feedback', 5, HOUR_IN_SECONDS)) {
            wp_send_json_error(['message' => __('Too many requests. Please try again later.', 'wedocs')]);
        }

        $post_id = intval($_POST['post_id'] ?? 0);
        $feedback = sanitize_textarea_field($_POST['feedback'] ?? '');

        if (!$post_id || empty($feedback)) {
            wp_send_json_error(['message' => __('Invalid feedback.', 'wedocs')]);
        }

        // Only allow feedback on docs posts.
        if (get_post_type($post_id) !== 'docs') {
            wp_send_json_error(['message' => __('Invalid post type.', 'wedocs')]);
        }

        $existing = get_post_meta($post_id, '_wedocs_helpful_feedback', true);
        if (!is_array($existing)) {
            $existing = [];
        }

        $existing[] = [
            'feedback' => $feedback,
            'date' => current_time('mysql'),
            'ip' => wedocs_get_client_ip(),
        ];

        update_post_meta($post_id, '_wedocs_helpful_feedback', $existing);
        wp_send_json_success();
    }


    /**
     * Handle "Need More Help" contact form submission.
     */
    public function handle_need_help_submit() {
        $widget_id = sanitize_text_field($_POST['widget_id'] ?? '');

        if (!wp_verify_nonce($_POST['nonce'] ?? '', 'wedocs_need_help_' . $widget_id)) {
            wp_send_json_error(['message' => __('Security check failed.', 'wedocs')]);
        }

        // The nonce is public to every anonymous visitor, so throttle per IP
        // before doing any work that sends mail or writes a submission row.
        if (!wedocs_rate_limit_ok('need_help', 5, HOUR_IN_SECONDS)) {
            wp_send_json_error(['message' => __('Too many requests. Please try again later.', 'wedocs')]);
        }

        $name = sanitize_text_field($_POST['name'] ?? '');
        $email = sanitize_email($_POST['email'] ?? '');
        $subject = sanitize_text_field($_POST['subject'] ?? '');
        $message = sanitize_textarea_field($_POST['message'] ?? '');
        $page_url = esc_url_raw($_POST['page_url'] ?? '');
        $page_title = sanitize_text_field($_POST['page_title'] ?? '');
        $save_to_elementor = sanitize_text_field($_POST['save_to_elementor'] ?? '');
        $post_id = intval($_POST['post_id'] ?? 0);

        if (empty($message)) {
            wp_send_json_error(['message' => __('Message is required.', 'wedocs')]);
        }

        // SECURITY: never trust a client-supplied recipient (open-relay risk).
        // Resolve the recipient server-side from the widget's saved settings and
        // fall back to the site admin email.
        $recipient = $this->get_need_help_recipient($widget_id, $post_id);

        if (empty($recipient) || !is_email($recipient)) {
            $recipient = get_option('admin_email');
        }

        // Send email
        $email_subject = !empty($subject) ? $subject : sprintf(__('[weDocs] Support request from %s', 'wedocs'), $page_title);

        $body = sprintf(__("Name: %s\n", 'wedocs'), $name ?: __('Not provided', 'wedocs'));
        $body .= sprintf(__("Email: %s\n", 'wedocs'), $email ?: __('Not provided', 'wedocs'));
        $body .= sprintf(__("Page: %s (%s)\n\n", 'wedocs'), $page_title, $page_url);
        $body .= sprintf(__("Message:\n%s", 'wedocs'), $message);

        $headers = ['Content-Type: text/plain; charset=UTF-8'];
        if (!empty($email) && is_email($email)) {
            $headers[] = 'Reply-To: ' . ($name ? "$name <$email>" : $email);
        }

        $sent = wp_mail($recipient, $email_subject, $body, $headers);

        // Save to Elementor Pro submissions if enabled
        if ($save_to_elementor === 'yes') {
            $this->save_to_elementor_submissions($widget_id, $post_id, $page_url, $page_title, [
                'name' => $name,
                'email' => $email,
                'subject' => $subject,
                'message' => $message,
            ]);
        }

        if ($sent) {
            wp_send_json_success();
        } else {
            wp_send_json_error(['message' => __('Failed to send email. Please try again.', 'wedocs')]);
        }
    }

    /**
     * Resolve the "Need More Help" recipient email server-side.
     *
     * The recipient is configured in the Elementor widget settings and must
     * NEVER be taken from the request payload, otherwise the endpoint becomes
     * an open mail relay. We read the widget's `recipient_email` control from
     * the Elementor document of the given post; if unavailable we fall back to
     * the site admin email.
     *
     * @param string $widget_id The Elementor widget (element) id.
     * @param int    $post_id   The post/page the widget lives on.
     *
     * @return string
     */
    private function get_need_help_recipient($widget_id, $post_id) {
        $recipient = '';

        if ($post_id && $widget_id && did_action('elementor/loaded') && class_exists('\Elementor\Plugin')) {
            $document = \Elementor\Plugin::$instance->documents->get($post_id);

            if ($document) {
                $data = $document->get_elements_data();
                $recipient = $this->find_widget_setting($data, $widget_id, 'recipient_email');
            }
        }

        $recipient = sanitize_email($recipient);

        /**
         * Filters the resolved "Need More Help" recipient email.
         *
         * @param string $recipient Recipient email resolved from widget settings.
         * @param string $widget_id Elementor widget id.
         * @param int    $post_id   Post id the widget lives on.
         */
        return apply_filters('wedocs_need_help_recipient', $recipient, $widget_id, $post_id);
    }

    /**
     * Recursively find a setting value for a given Elementor element id.
     *
     * @param array  $elements Elementor elements tree.
     * @param string $widget_id Target element id.
     * @param string $setting_key Setting key to read.
     *
     * @return string
     */
    private function find_widget_setting($elements, $widget_id, $setting_key) {
        foreach ((array) $elements as $element) {
            if (isset($element['id']) && $element['id'] === $widget_id) {
                return isset($element['settings'][$setting_key]) ? (string) $element['settings'][$setting_key] : '';
            }

            if (!empty($element['elements'])) {
                $found = $this->find_widget_setting($element['elements'], $widget_id, $setting_key);
                if ($found !== '') {
                    return $found;
                }
            }
        }

        return '';
    }

    /**
     * Save form data to Elementor Pro submissions table.
     *
     * @param string $widget_id   The Elementor widget ID.
     * @param int    $post_id     The post/page ID where the form was submitted.
     * @param string $page_url    The page URL (referer).
     * @param string $page_title  The page title.
     * @param array  $fields      Associative array of field id => value.
     */
    private function save_to_elementor_submissions($widget_id, $post_id, $page_url, $page_title, $fields) {
        // Check if Elementor Pro submissions are available
        if (!class_exists('\ElementorPro\Modules\Forms\Submissions\Database\Query')) {
            return;
        }

        $query = \ElementorPro\Modules\Forms\Submissions\Database\Query::get_instance();

        $fields_data = [];
        foreach ($fields as $id => $value) {
            if (empty($value)) {
                continue;
            }

            $type = 'text';
            if ($id === 'email') {
                $type = 'email';
            } elseif ($id === 'message') {
                $type = 'textarea';
            }

            $fields_data[] = [
                'id'    => $id,
                'value' => $value,
                'type'  => $type,
            ];
        }

        if (empty($fields_data)) {
            return;
        }

        $submission_data = [
            'post_id'                 => $post_id ?: 0,
            'referer'                 => $page_url,
            'referer_title'           => $page_title,
            'element_id'              => $widget_id,
            'form_name'               => __('weDocs - Need More Help', 'wedocs'),
            'campaign_id'             => 0,
            'user_id'                 => get_current_user_id() ?: null,
            'user_ip'                 => sanitize_text_field($_SERVER['REMOTE_ADDR'] ?? ''),
            'user_agent'              => sanitize_text_field($_SERVER['HTTP_USER_AGENT'] ?? ''),
            'actions_count'           => 1,
            'actions_succeeded_count' => 1,
            'meta'                    => wp_json_encode([
                'edit_post_id' => $post_id ?: 0,
            ]),
        ];

        $query->add_submission($submission_data, $fields_data);
    }
}
