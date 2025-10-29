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
        add_action( 'wp_ajax_wedocs_get_docs', [ $this, 'get_docs' ] );
        add_action( 'wp_ajax_nopriv_wedocs_get_docs', [ $this, 'get_docs' ] );

        // Handle weDocs rating stuff.
        add_action( 'wp_ajax_wedocs_rated', [ $this, 'hide_wedocs_rating' ] );

        // Handle weDocs feedback stuff.
        add_action( 'wp_ajax_wedocs_ajax_feedback', [ $this, 'handle_feedback' ] );
        add_action( 'wp_ajax_nopriv_wedocs_ajax_feedback', [ $this, 'handle_feedback' ] );

        // Handle weDocs documentation contact stuff.
        add_action( 'wp_ajax_wedocs_contact_feedback', [ $this, 'handle_contact' ] );
        add_action( 'wp_ajax_nopriv_wedocs_contact_feedback', [ $this, 'handle_contact' ] );

        // Handle weDocs beta notice.
        add_action( 'wp_ajax_hide_wedocs_beta_notice', [ $this, 'hide_beta_notice' ] );
        add_action( 'wp_ajax_nopriv_hide_wedocs_beta_notice', [ $this, 'hide_beta_notice' ] );

        // Data migration.
        add_action( 'wp_ajax_wedocs_check_need_betterdocs_migration', [ Migrate::class, 'need_migration' ] );
        add_action( 'wp_ajax_wedocs_migrate_betterdocs_to_wedocs', [ Migrate::class, 'do_migration' ] );

        // Handle weDocs pro notice.
        add_action( 'wp_ajax_hide_wedocs_pro_notice', [ $this, 'hide_pro_notice' ] );
        add_action( 'wp_ajax_nopriv_hide_wedocs_pro_notice', [ $this, 'hide_pro_notice' ] );

        // Handle weDocs helpful feedback voting.
        add_action( 'wp_ajax_wedocs_helpful_feedback_vote', [ $this, 'handle_helpful_feedback_vote' ] );
        add_action( 'wp_ajax_nopriv_wedocs_helpful_feedback_vote', [ $this, 'handle_helpful_feedback_vote' ] );
    }

    /**
     * Get all docs.
     *
     * @return void
     */
    public function get_docs() {
        check_ajax_referer( 'wedocs-ajax' );

        $docs = get_pages( [
            'post_type'      => 'docs',
            'post_status'    => [ 'publish', 'draft', 'pending' ],
            'posts_per_page' => '-1',
            'orderby'        => 'menu_order',
            'order'          => 'ASC',
        ] );

        // Build a doc tree with separate parents, sections, articles & all docs together.
        $docs_tree = [ 'all_docs' => $docs ];
        foreach ( $docs as $doc ) {
            $is_parent      = $this->is_a_parent_doc( $doc->ID );
            $doc->permalink = get_permalink( $doc->ID );
            if ( $is_parent ) {
                // Get parents documentation.
                $docs_tree['parents'][] = $doc;
                continue;
            }

            $is_section = $this->is_a_parent_doc( $doc->post_parent );
            if ( $is_section ) {
                // Get sections documentation.
                $docs_tree['sections'][] = $doc;
                continue;
            }

            // Get articles documentation.
            $docs_tree['articles'][] = $doc;
        }

        wp_send_json_success( $docs_tree );
    }

    /**
     * Assume the user rated weDocs.
     *
     * @return void
     */
    public function hide_wedocs_rating() {
        check_ajax_referer( 'wedocs-admin-nonce' );

        update_option( 'wedocs_admin_footer_text_rated', 'yes' );
        wp_send_json_success();
    }

    /**
     * Store feedback for an article.
     *
     * @return void
     */
    public function handle_feedback() {
        check_ajax_referer( 'wedocs-ajax' );

        $template = '<div class="wedocs-alert wedocs-alert-%s">%s</div>';
        $previous = isset( $_COOKIE['wedocs_response'] ) ? explode( ',', $_COOKIE['wedocs_response'] ) : [];
        $post_id  = intval( $_POST['post_id'] );
        $type     = in_array( $_POST['type'], [ 'positive', 'negative' ] ) ? $_POST['type'] : false;

        // check previous response
        if ( in_array( $post_id, $previous ) ) {
            $message = sprintf( $template, 'danger', __( 'Sorry, we have already recorded your feedback!', 'wedocs' ) );
            wp_send_json_error( $message );
        }

        // seems new
        if ( $type ) {
            $count = (int) get_post_meta( $post_id, $type, true );
            update_post_meta( $post_id, $type, $count + 1 );

            array_push( $previous, $post_id );
            $cookie_val = implode( ',', $previous );

            $val = setcookie( 'wedocs_response', $cookie_val, time() + WEEK_IN_SECONDS, COOKIEPATH, COOKIE_DOMAIN );
        }

        $message = sprintf( $template, 'success', __( 'Thanks for your feedback!', 'wedocs' ) );
        wp_send_json_success( $message );
    }

    /**
     * Send email feedback.
     *
     * @return void
     */
    public function handle_contact() {
        check_ajax_referer( 'wedocs-ajax' );

        $name    = isset( $_POST['name'] ) ? sanitize_text_field( $_POST['name'] ) : '';
        $subject = isset( $_POST['subject'] ) ? sanitize_text_field( $_POST['subject'] ) : '';
        $message = isset( $_POST['message'] ) ? strip_tags( $_POST['message'] ) : '';
        $doc_id  = isset( $_POST['doc_id'] ) ? intval( $_POST['doc_id'] ) : 0;

        if ( !is_user_logged_in() ) {
            $email = isset( $_POST['email'] ) ? filter_var( $_POST['email'], FILTER_VALIDATE_EMAIL ) : false;

            if ( !$email ) {
                wp_send_json_error( __( 'Please enter a valid email address.', 'wedocs' ) );
            }
        } else {
            $email = wp_get_current_user()->user_email;
        }

        if ( empty( $subject ) ) {
            wp_send_json_error( __( 'Please provide a subject line.', 'wedocs' ) );
        }

        if ( empty( $message ) ) {
            wp_send_json_error( __( 'Please provide the message details.', 'wedocs' ) );
        }

        wedocs_doc_feedback_email( $doc_id, $name, $email, $subject, $message );

        wp_send_json_success( __( 'Thanks for your feedback.', 'wedocs' ) );
    }

    /**
     * Build a tree of docs with parent-child relation.
     *
     * @param array $docs
     * @param int   $parent
     *
     * @return array
     */
    public function build_tree( $docs, $parent = 0 ) {
        $result = [];

        if ( !$docs ) {
            return $result;
        }

        $post_type_object = get_post_type_object( 'docs' );

        foreach ( $docs as $key => $doc ) {
            if ( $doc->post_parent == $parent ) {
                unset( $docs[ $key ] );

                // build tree and sort
                $child = $this->build_tree( $docs, $doc->ID );
                usort( $child, [ $this, 'sort_callback' ] );

                $result[] = [
                    'post' => [
                        'id'     => $doc->ID,
                        'title'  => $doc->post_title,
                        'status' => $doc->post_status,
                        'order'  => $doc->menu_order,
                        'caps'   => [
                            'edit'   => current_user_can( $post_type_object->cap->edit_post, $doc->ID ),
                            'delete' => current_user_can( $post_type_object->cap->delete_post, $doc->ID ),
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
    public function sort_callback( $a, $b ) {
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
        $user_id = get_current_user_id();
        update_user_meta( $user_id, 'wedocs_hide_pro_notice', true );
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
    public function is_a_parent_doc( $doc_id ) {
        return (int) wp_get_post_parent_id( $doc_id ) === 0;
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
        $user_ip = $_SERVER['REMOTE_ADDR'] ?? '';

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
            $ip_vote = get_post_meta( $post_id, "wedocs_helpful_vote_ip_" . md5( $user_ip ), true );
            if ( $ip_vote ) {
                $has_voted = true;
            }
        }

        if ( $has_voted ) {
            wp_send_json_error( [
                'message' => __( 'You have already voted on this article.', 'wedocs' )
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
            update_post_meta( $post_id, "wedocs_helpful_vote_ip_" . md5( $user_ip ), $vote );
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
}
