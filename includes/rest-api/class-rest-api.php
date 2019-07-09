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

        register_rest_route( $this->namespace, '/' . $this->rest_base . '/search', [
            [
                'methods'  => WP_REST_Server::READABLE,
                'callback' => [ $this, 'search_docs' ],
                'args'     => [
                    'query' => [
                        'required'          => true,
                        'type'              => 'string',
                        'description'       => __( 'Limit results to those matching a string.', 'wedocs' ),
                        'sanitize_callback' => 'sanitize_text_field',
                        'validate_callback' => 'rest_validate_request_arg',
                    ],
                    'in' => [
                        'required'          => false,
                        'type'              => 'integer',
                        'description'       => __( 'The ID for the parent of the object.', 'wedocs' ),
                        'sanitize_callback' => 'absint',
                        'validate_callback' => 'rest_validate_request_arg',
                    ],
                    'page'     => array(
                        'description'       => __( 'Current page of the collection.', 'wedocs' ),
                        'type'              => 'integer',
                        'default'           => 1,
                        'sanitize_callback' => 'absint',
                        'validate_callback' => 'rest_validate_request_arg',
                        'minimum'           => 1,
                    ),
                    'per_page' => array(
                        'description'       => __( 'Maximum number of items to be returned in result set.', 'wedocs' ),
                        'type'              => 'integer',
                        'default'           => 10,
                        'minimum'           => 1,
                        'maximum'           => 100,
                        'sanitize_callback' => 'absint',
                        'validate_callback' => 'rest_validate_request_arg',
                    ),
                ],
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

        if ( isset( $request['id'] ) || $request['slug'] || $request['context'] == 'sidebar' ) {
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

        $type  = $request['type'];
        $count = (int) get_post_meta( $request['id'], $type, true );

        update_post_meta( $request['id'], $type, $count + 1 );

        return rest_ensure_response([
            'success' => true
        ]);
    }

    /**
     * Get parents of a document
     *
     * @param  \WP_REST_Request $request
     *
     * @return \WP_REST_Response
     */
    public function get_parents( $request ) {
        $doc = $this->get_doc( $request['id'] );

        if ( is_wp_error( $doc ) ) {
            return $doc;
        }

        // forcefully set the context
        $request['context'] = 'sidebar';

        $ancestors = [];
        $root      = $parent = false;

        if ( $doc->post_parent ) {
            $ancestors = get_post_ancestors($doc->ID);
            $root      = count($ancestors) - 1;
            $parent    = $ancestors[$root];
        } else {
            $parent = $doc->ID;
        }

        $docs = get_pages( [
            'order'     => 'menu_order',
            'child_of'  => $parent,
            'post_type' => 'docs',
        ] );

        $result = [];

        // add the parent by-default as the first element
        $parent_doc = ( $parent == $doc->ID ) ? $doc : get_post( $parent );

        if ( $parent_doc ) {
            $data     = $this->prepare_item_for_response( $parent_doc, $request );
            $result[] = $this->prepare_response_for_collection( $data );
        }

        // now, process the child
        foreach ( $docs as $key => $doc ) {
            $data = $this->prepare_item_for_response( $doc, $request );
            $data = $this->set_pagination( $data, $doc, $request );

            $result[] = $this->prepare_response_for_collection( $data );
        }

        $response = rest_ensure_response( $result );

        return $response;
    }

    /**
     * Delete child posts
     *
     * @param  \WP_Post $doc
     *
     * @return void
     */
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
     * Search docs
     *
     * @param  \WP_REST_Request $request
     *
     * @return \WP_REST_Response
     */
    public function search_docs( $request ) {

        $args = [
            'post_type'      => 'docs',
            'posts_per_page' => $request['per_page'],
            'paged'          => $request['page'],
            's'              => $request['query'],
        ];

        if ( $request['in'] ) {
            $post__in      = array( $request['in'] => $request['in'] );
            $children_docs = wedocs_get_posts_children( $request['in'], 'docs' );

            if ( $children_docs ) {
                $post__in = array_merge( $post__in, wp_list_pluck( $children_docs, 'ID' ) );

                $args['post__in'] = $post__in;
            }
        }

        $query  = new WP_Query( $args );
        $docs   = $query->get_posts();
        $result = [];

        foreach ( $docs as $doc ) {
            $data     = $this->prepare_item_for_response( $doc, $request );
            $result[] = $this->prepare_response_for_collection( $data );
        }

        $page        = (int) $args['paged'];
        $total_posts = $query->found_posts;

        if ( $total_posts < 1 ) {
            // Out-of-bounds, run the query again without LIMIT for total count.
            unset( $args['paged'] );

            $count_query = new WP_Query();
            $count_query->query( $args );
            $total_posts = $count_query->found_posts;
        }

        $max_pages = ceil( $total_posts / (int) $query->query_vars['posts_per_page'] );

        if ( $page > $max_pages && $total_posts > 0 ) {
            return new WP_Error( 'rest_docs_invalid_page_number', __( 'The page number requested is larger than the number of pages available.', 'wedocs' ), array( 'status' => 400 ) );
        }

        $response = rest_ensure_response( $result );

        $response->header( 'X-WP-Total', (int) $total_posts );
        $response->header( 'X-WP-TotalPages', (int) $max_pages );

        return $response;
    }

    /**
     * Prepares a single doc output for response.
     *
     * @param WP_Post         $post    Post object.
     * @param WP_REST_Request $request Request object.
     *
     * @return WP_REST_Response Response object.
     */
    public function prepare_item_for_response( $doc, $request ) {
        $data = [
            'id'           => $doc->ID,
            'date'         => mysql_to_rfc3339( $doc->post_date ),
            'date_gmt'     => mysql_to_rfc3339( $doc->post_date_gmt ),
            'modified'     => mysql_to_rfc3339( $doc->post_modified ),
            'modified_gmt' => mysql_to_rfc3339( $doc->post_modified_gmt ),
            'slug'         => $doc->post_name,
            'permalink'    => get_permalink( $doc ),
            'title'        => [
                'rendered' => get_the_title( $doc->ID )
            ],
            'content'      => [
                'rendered' => post_password_required( $doc ) ? '' : apply_filters( 'the_content', $doc->post_content ),
            ],
            'parent'       => $doc->post_parent,
            'order'        => $doc->menu_order,
        ];

        if ( $request['context'] == 'edit' ) {
            $data['title']['raw']   = $doc->post_title;
            $data['content']['raw'] = $doc->post_content;
        }

        $response = rest_ensure_response( $data );

        $links = $this->prepare_links( $doc );
        $response->add_links( $links );

        return $response;
    }

    /**
     * Prepares links for the request.
     *
     * @param WP_Post $post Post object.
     *
     * @return array Links for the given post.
     */
    protected function prepare_links( $doc ) {
        $base = sprintf( '%s/%s', $this->namespace, $this->rest_base );

        $links = array(
            'self'       => array(
                'href' => rest_url( trailingslashit( $base ) . $doc->ID ),
            ),
            'collection' => array(
                'href' => rest_url( $base ),
            ),
        );

        return $links;
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
