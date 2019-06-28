<?php

class WeDocs_REST_API extends WP_REST_Controller {

    protected $post_type = 'docs';

    public function __construct() {
        $this->namespace = 'wp/v2';
        $this->rest_base = 'docs';

        add_filter( 'rest_prepare_docs', [ $this, 'set_pagination' ], 10, 3 );
        add_filter( 'rest_prepare_docs', [ $this, 'set_caps' ], 10, 3 );
        add_filter( 'rest_delete_docs', [ $this, 'delete_child_docs' ], 10 );
    }

    /**
     * Register the routes for the objects of the controller.
     */
    public function register_routes() {
        register_rest_route( $this->namespace, '/' . $this->rest_base . '/(?P<id>[\d]+)/feedback', [
            [
                'methods'  => WP_REST_Server::CREATABLE,
                'callback' => [ $this, 'handle_feedback' ],
                'permission_callback' => array( $this, 'create_item_permissions_check' ),
                'args'     => [
                    'name' => [
                        'type'              => 'string',
                        'sanitize_callback' => 'sanitize_text_field',
                    ],
                    'email' => [
                        'description' => __( 'Email address of the author.' ),
                        'type'        => 'string',
                        'format'      => 'email',
                    ],
                    'subject' => [
                        'required'          => true,
                        'type'              => 'string',
                        'sanitize_callback' => 'sanitize_text_field',
                    ],
                    'message' => [
                        'required'          => true,
                        'type'              => 'string',
                        'sanitize_callback' => 'sanitize_textarea_field',
                    ],
                ],
            ]
        ] );

        register_rest_route( $this->namespace, '/' . $this->rest_base . '/(?P<id>[\d]+)/helpfullness', [
            [
                'methods'  => WP_REST_Server::EDITABLE,
                'callback' => [ $this, 'update_helpfullness' ],
                'args'     => [
                    'type' => [
                        'required' => true,
                        'type'     => 'string',
                        'enum'     => [ 'positive', 'negative' ],
                    ],
                ],
            ]
        ] );

        register_rest_route( $this->namespace, '/' . $this->rest_base . '/(?P<id>[\d]+)/parents', [
            [
                'methods'  => WP_REST_Server::READABLE,
                'callback' => [ $this, 'get_parents' ],
            ]
        ] );
    }

    /**
     * Set next and previous pagination
     *
     * @param WP_REST_Response $response
     * @param WP_Post $post
     * @param WP_REST_Request $request Full data about the request.
     */
    public function set_pagination( $response, $post, $request ) {
        global $wpdb;

        // we don't want this for edit context
        if ( $request['context'] == 'edit' ) {
            return $response;
        }

        // is it a single request?
        $single = false;

        if ( isset( $request['id'] ) || $request['slug'] ) {
            $single = true;
        }

        if ( ! $single ) {
            return $response;
        }

        $next_query = "SELECT ID, post_title FROM $wpdb->posts
            WHERE post_parent = $post->post_parent and post_type = 'docs' and post_status = 'publish' and menu_order > $post->menu_order
            ORDER BY menu_order ASC
            LIMIT 0, 1";

        $prev_query = "SELECT ID, post_title FROM $wpdb->posts
            WHERE post_parent = $post->post_parent and post_type = 'docs' and post_status = 'publish' and menu_order < $post->menu_order
            ORDER BY menu_order DESC
            LIMIT 0, 1";

        $next_post_id = $wpdb->get_row( $next_query );
        $prev_post_id = $wpdb->get_row( $prev_query );

        if ( $next_post_id ) {
            $response->add_link( 'next', rest_url( "/wp/v2/docs/{$next_post_id->ID}" ), [
                'title' => $next_post_id->post_title
            ] );
        }

        if ( $prev_post_id ) {
            $response->add_link( 'prev', rest_url( "/wp/v2/docs/{$prev_post_id->ID}" ), [
                'title' => $prev_post_id->post_title
            ] );
        }

        return $response;
    }

    /**
     * Set capabilities
     *
     * @param WP_REST_Response $response
     * @param WP_Post $post
     * @param WP_REST_Request $request Full data about the request.
     */
    public function set_caps( $response, $post, $request ) {
        if ( $request['context'] != 'edit' ) {
            return $response;
        }

        $response->data['caps'] = [
            'edit'   => current_user_can( 'edit_post', $post->ID ),
            'delete' => current_user_can( 'delete_post', $post->ID )
        ];

        $response->data['children'] = [];

        return $response;
    }

    /**
     * [handle_feedback description]
     *
     * @param WP_REST_Request $request Full data about the request.
     *
     * @return WP_Error|WP_REST_Response Response object on success, or WP_Error object on failure.
     */
    public function handle_feedback( $request ) {
        $id = (int) $request['id'];

        if ( ! is_user_logged_in() ) {
            $name  = $request['name'];
            $email = $request['email'];
        } else {
            $user  = wp_get_current_user();
            $name  = $user->display_name;
            $email = $user->user_email;
        }

        wedocs_doc_feedback_email( $id, $name, $email, $request['subject'], $request['message'] );

        return rest_ensure_response([
            'success' => true
        ]);
    }

    /**
     * [handle_feedback description]
     *
     * @param WP_REST_Request $request Full data about the request.
     *
     * @return WP_Error|WP_REST_Response Response object on success, or WP_Error object on failure.
     */
    public function update_helpfullness( $request ) {
        $valid_check = $this->get_doc( $request['id'] );

        if ( is_wp_error( $valid_check ) ) {
            return $valid_check;
        }

        $count = (int) get_post_meta( $request['id'], $type, true );
        update_post_meta( $post_id, $type, $count + 1 );

        return rest_ensure_response([
            'success' => true
        ]);
    }

    public function get_parents( $request ) {
        $doc = $this->get_doc( $request['id'] );

        if ( is_wp_error( $doc ) ) {
            return $doc;
        }

        $docs    = [];
        $result  = [];
        $parents = get_post_ancestors( $doc );

        foreach ( $parents as $doc_id ) {
            $temp = get_children( $doc_id, OBJECT );

            $docs = array_merge( $docs, $temp );
        }

        foreach ( $docs as $key => $doc ) {
            $result[] = [
                'id'           => $doc->ID,
                'date'         => mysql_to_rfc3339( $doc->post_date ),
                'date_gmt'     => mysql_to_rfc3339( $doc->post_date_gmt ),
                'modified'     => mysql_to_rfc3339( $doc->post_modified ),
                'modified_gmt' => mysql_to_rfc3339( $doc->post_modified_gmt ),
                'slug'         => $doc->post_name,
                'content'      => [
                    'raw'      => $doc->post_content,
                    'rendered' => post_password_required( $doc ) ? '' : apply_filters( 'the_content', $doc->post_content ),
                ],
                'title'        => [
                    'raw'      => $doc->post_title,
                    'rendered' => get_the_title( $doc->ID )
                ],
                'parent'       => $doc->post_parent,
                'menu_order'   => $doc->menu_order,
            ];
        }

        return $result;
    }

    public function delete_child_docs( $doc ) {
        $childrens = get_children( [ 'post_parent' => $doc->ID ] );

        if ( $childrens ) {
            foreach ($childrens as $child_post) {
                // recursively delete
                $this->delete_child_docs( $child_post->ID );

                wp_delete_post( $child_post->ID );
            }
        }
    }

    /**
     * Check feedback create permission
     *
     * @param WP_REST_Request $request Full data about the request.
     *
     * @return WP_Error|boolean true on success
     */
    public function create_item_permissions_check( $request ) {
        if ( is_user_logged_in() ) {
            return true;
        }

        if ( empty( $request['name'] ) ) {
            return new \WP_Error( 'rest_doc_invalid_name', __( 'No name given', 'wedocs' ) );
        }

        if ( empty( $request['email'] ) ) {
            return new \WP_Error( 'rest_doc_invalid_email', __( 'No email given', 'wedocs' ) );
        }

        return true;
    }

    /**
     * Get the post, if the ID is valid.
     *
     * @param int $id Supplied ID.
     *
     * @return WP_Post|WP_Error Post object if ID is valid, WP_Error otherwise.
     */
    protected function get_doc( $id ) {
        $error = new WP_Error( 'rest_doc_invalid_id', __( 'Invalid doc ID.' ), array( 'status' => 404 ) );

        if ( (int) $id <= 0 ) {
            return $error;
        }

        $post = get_post( (int) $id );
        if ( empty( $post ) || empty( $post->ID ) || $this->post_type !== 'docs' ) {
            return $error;
        }

        return $post;
    }

}
