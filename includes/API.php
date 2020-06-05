<?php

namespace WeDevs\WeDocs;

/**
 * API Class
 */
class API {

    /**
     * Initialize the class
     */
    public function __construct() {
        add_action( 'rest_api_init', [ $this, 'init_api' ] );

        add_filter( 'rest_prepare_docs', [ $this, 'set_pagination' ], 10, 3 );
        add_filter( 'rest_prepare_docs', [ $this, 'set_caps' ], 10, 3 );
        add_filter( 'rest_delete_docs', [ $this, 'delete_child_docs' ], 10 );
    }

    /**
     * Initialize the API
     *
     * @return void
     */
    public function init_api() {
        $api = new API\API( $this );
        $api->register_routes();
    }

    /**
     * Set next and previous pagination.
     *
     * @param WP_REST_Response $response
     * @param WP_Post          $post
     * @param WP_REST_Request  $request  full data about the request
     */
    public function set_pagination( $response, $post, $request ) {
        global $wpdb;

        // we don't want this for edit context
        if ( 'edit' == $request['context'] ) {
            return $response;
        }

        // is it a single request?
        $single = false;

        if ( isset( $request['id'] ) || $request['slug'] || 'sidebar' == $request['context'] ) {
            $single = true;
        }

        if ( !$single ) {
            return $response;
        }

        $next_query = "SELECT ID, post_title FROM {$wpdb->posts}
            WHERE post_parent = {$post->post_parent} and post_type = 'docs' and post_status = 'publish' and menu_order > {$post->menu_order}
            ORDER BY menu_order ASC
            LIMIT 0, 1";

        $prev_query = "SELECT ID, post_title FROM {$wpdb->posts}
            WHERE post_parent = {$post->post_parent} and post_type = 'docs' and post_status = 'publish' and menu_order < {$post->menu_order}
            ORDER BY menu_order DESC
            LIMIT 0, 1";

        $next_post = $wpdb->get_row( $next_query );
        $prev_post = $wpdb->get_row( $prev_query );

        if ( $next_post ) {
            $response->add_link( 'next', rest_url( "/wp/v2/docs/{$next_post->ID}" ), [
                'title' => $next_post->post_title,
                'link'  => get_permalink( $next_post->ID ),
            ] );
        }

        if ( $prev_post ) {
            $response->add_link( 'prev', rest_url( "/wp/v2/docs/{$prev_post->ID}" ), [
                'title' => $prev_post->post_title,
                'link'  => get_permalink( $prev_post->ID ),
            ] );
        }

        return $response;
    }

    /**
     * Set capabilities.
     *
     * @param WP_REST_Response $response
     * @param WP_Post          $post
     * @param WP_REST_Request  $request  full data about the request
     */
    public function set_caps( $response, $post, $request ) {
        if ( 'edit' != $request['context'] ) {
            return $response;
        }

        $response->data['caps'] = [
            'edit'   => current_user_can( 'edit_post', $post->ID ),
            'delete' => current_user_can( 'delete_post', $post->ID ),
        ];

        $response->data['children'] = [];

        return $response;
    }

    /**
     * Delete child posts.
     *
     * @param \WP_Post $doc
     *
     * @return void
     */
    public function delete_child_docs( $doc ) {
        $childrens = get_children( [ 'post_parent' => $doc->ID ] );

        if ( $childrens ) {
            foreach ( $childrens as $child_post ) {
                // recursively delete
                $this->delete_child_docs( $child_post->ID );

                wp_delete_post( $child_post->ID );
            }
        }
    }
}
