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
        add_action('wp_ajax_hide_wedocs_pro_notice', [$this, 'hide_pro_notice']);
        add_action('wp_ajax_nopriv_hide_wedocs_pro_notice', [$this, 'hide_pro_notice']);

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

        $docs = get_pages([
            'post_type'      => 'docs',
            'post_status'    => ['publish', 'draft', 'pending'],
            'posts_per_page' => '-1',
            'orderby'        => 'menu_order',
            'order'          => 'ASC',
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

        $page = isset($_POST['page']) ? intval($_POST['page']) : 1;
        $widget_id = isset($_POST['widget_id']) ? sanitize_text_field($_POST['widget_id']) : '';

        // This is a simplified version - in production you'd need to get all the widget settings
        // from the POST data or store them in a transient
        $args = [
            'post_type' => 'docs',
            'post_status' => 'publish',
            'post_parent' => 0,
            'posts_per_page' => 9, // Default, should come from settings
            'paged' => $page,
        ];

        $docs_query = new \WP_Query($args);

        if (!$docs_query->have_posts()) {
            wp_send_json_error(['message' => 'No more docs found']);
            return;
        }

        ob_start();

        while ($docs_query->have_posts()) {
            $docs_query->the_post();
            $doc = get_post();
?>
            <div class="wedocs-docs-grid__item">
                <h3 class="wedocs-docs-grid__title">
                    <a href="<?php echo get_permalink($doc->ID); ?>"><?php echo esc_html($doc->post_title); ?></a>
                </h3>
                <a href="<?php echo get_permalink($doc->ID); ?>" class="wedocs-docs-grid__details-link">
                    <?php _e('View Details', 'wedocs'); ?>
                </a>
            </div>
<?php
        }

        $html = ob_get_clean();
        wp_reset_postdata();

        wp_send_json_success([
            'html' => $html,
            'page' => $page,
            'max_pages' => $docs_query->max_num_pages
        ]);
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

        $meta_key = $vote === 'yes' ? '_wedocs_helpful_yes' : '_wedocs_helpful_no';
        $current = (int) get_post_meta($post_id, $meta_key, true);
        update_post_meta($post_id, $meta_key, $current + 1);

        wp_send_json_success([
            'yes' => (int) get_post_meta($post_id, '_wedocs_helpful_yes', true),
            'no' => (int) get_post_meta($post_id, '_wedocs_helpful_no', true),
        ]);
    }

    /**
     * Handle "Was This Helpful" negative feedback text.
     */
    public function handle_helpful_feedback() {
        check_ajax_referer('wedocs_helpful_vote', 'nonce');

        $post_id = intval($_POST['post_id'] ?? 0);
        $feedback = sanitize_textarea_field($_POST['feedback'] ?? '');

        if (!$post_id || empty($feedback)) {
            wp_send_json_error(['message' => __('Invalid feedback.', 'wedocs')]);
        }

        $existing = get_post_meta($post_id, '_wedocs_helpful_feedback', true);
        if (!is_array($existing)) {
            $existing = [];
        }

        $existing[] = [
            'feedback' => $feedback,
            'date' => current_time('mysql'),
            'ip' => sanitize_text_field($_SERVER['REMOTE_ADDR'] ?? ''),
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

        $name = sanitize_text_field($_POST['name'] ?? '');
        $email = sanitize_email($_POST['email'] ?? '');
        $subject = sanitize_text_field($_POST['subject'] ?? '');
        $message = sanitize_textarea_field($_POST['message'] ?? '');
        $page_url = esc_url_raw($_POST['page_url'] ?? '');
        $page_title = sanitize_text_field($_POST['page_title'] ?? '');
        $recipient = sanitize_email($_POST['recipient'] ?? get_option('admin_email'));
        $save_to_elementor = sanitize_text_field($_POST['save_to_elementor'] ?? '');
        $post_id = intval($_POST['post_id'] ?? 0);

        if (empty($message)) {
            wp_send_json_error(['message' => __('Message is required.', 'wedocs')]);
        }

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
