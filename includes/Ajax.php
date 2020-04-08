<?php

namespace WeDevs\WeDocs;

/**
 * Ajax Class.
 */
class Ajax {

    /**
     * Bind actions.
     */
    public function __construct() {
        add_action( 'wp_ajax_wedocs_create_doc', [ $this, 'create_doc' ] );
        add_action( 'wp_ajax_wedocs_remove_doc', [ $this, 'remove_doc' ] );
        add_action( 'wp_ajax_wedocs_admin_get_docs', [ $this, 'get_docs' ] );
        add_action( 'wp_ajax_wedocs_sortable_docs', [ $this, 'sort_docs' ] );

        add_action( 'wp_ajax_wedocs_rated', [ $this, 'hide_wedocs_rating' ] );

        // feedback
        add_action( 'wp_ajax_wedocs_ajax_feedback', [ $this, 'handle_feedback' ] );
        add_action( 'wp_ajax_nopriv_wedocs_ajax_feedback', [ $this, 'handle_feedback' ] );

        // contact
        add_action( 'wp_ajax_wedocs_contact_feedback', [ $this, 'handle_contact' ] );
        add_action( 'wp_ajax_nopriv_wedocs_contact_feedback', [ $this, 'handle_contact' ] );
    }

    /**
     * Create a new doc.
     *
     * @return void
     */
    public function create_doc() {
        check_ajax_referer( 'wedocs-admin-nonce' );

        $title  = isset( $_POST['title'] ) ? sanitize_text_field( $_POST['title'] ) : '';
        $status = isset( $_POST['status'] ) ? sanitize_text_field( $_POST['status'] ) : 'draft';
        $parent = isset( $_POST['parent'] ) ? absint( $_POST['parent'] ) : 0;
        $order  = isset( $_POST['order'] ) ? absint( $_POST['order'] ) : 0;

        $status           = 'publish';
        $post_type_object = get_post_type_object( 'docs' );

        if ( ! current_user_can( $post_type_object->cap->publish_posts ) ) {
            $status = 'pending';
        }

        $post_id = wp_insert_post( [
            'post_title'  => $title,
            'post_type'   => 'docs',
            'post_status' => $status,
            'post_parent' => $parent,
            'post_author' => get_current_user_id(),
            'menu_order'  => $order,
        ] );

        if ( is_wp_error( $post_id ) ) {
            wp_send_json_error();
        }

        wp_send_json_success( [
            'post' => [
                'id'     => $post_id,
                'title'  => stripslashes( $title ),
                'status' => $status,
                'caps'   => [
                    'edit'   => current_user_can( $post_type_object->cap->edit_post, $post_id ),
                    'delete' => current_user_can( $post_type_object->cap->delete_post, $post_id ),
                ],
            ],
            'child' => [],
        ] );
    }

    /**
     * Delete a doc.
     *
     * @return void
     */
    public function remove_doc() {
        check_ajax_referer( 'wedocs-admin-nonce' );

        $force_delete = false;
        $post_id      = isset( $_POST['id'] ) ? absint( $_POST['id'] ) : 0;

        if ( ! current_user_can( 'delete_post', $post_id ) ) {
            wp_send_json_error( __( 'You are not allowed to delete this item.' ) );
        }

        if ( $post_id ) {
            // delete childrens first if found
            $this->remove_child_docs( $post_id, $force_delete );

            // delete main doc
            wp_delete_post( $post_id, $force_delete );
        }

        wp_send_json_success();
    }

    /**
     * Remove child docs.
     *
     * @param int $parent_id
     *
     * @return void
     */
    public function remove_child_docs( $parent_id = 0, $force_delete ) {
        $childrens = get_children( [ 'post_parent' => $parent_id ] );

        if ( $childrens ) {
            foreach ( $childrens as $child_post ) {
                // recursively delete
                $this->remove_child_docs( $child_post->ID, $force_delete );

                wp_delete_post( $child_post->ID, $force_delete );
            }
        }
    }

    /**
     * Get all docs.
     *
     * @return void
     */
    public function get_docs() {
        check_ajax_referer( 'wedocs-admin-nonce' );

        $docs = get_pages( [
            'post_type'      => 'docs',
            'post_status'    => [ 'publish', 'draft', 'pending' ],
            'posts_per_page' => '-1',
            'orderby'        => 'menu_order',
            'order'          => 'ASC',
        ] );

        $arranged = $this->build_tree( $docs );
        usort( $arranged, [ $this, 'sort_callback' ] );
        wp_send_json_success( $arranged );
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
            $message = sprintf( $template, 'danger', __( 'Sorry, you\'ve already recorded your feedback!', 'wedocs' ) );
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
     * Sort docs.
     *
     * @return void
     */
    public function sort_docs() {
        check_ajax_referer( 'wedocs-admin-nonce' );

        $doc_ids = isset( $_POST['ids'] ) ? array_map( 'absint', $_POST['ids'] ) : [];

        if ( $doc_ids ) {
            foreach ( $doc_ids as $order => $id ) {
                wp_update_post( [
                    'ID'         => $id,
                    'menu_order' => $order,
                ] );
            }
        }

        exit;
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
}
