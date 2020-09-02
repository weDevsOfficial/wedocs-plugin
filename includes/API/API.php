<?php

namespace WeDevs\WeDocs\API;

use WP_Error;
use WP_Query;
use WP_REST_Controller;
use WP_REST_Server;

class API extends WP_REST_Controller {

    /**
     * Post type
     *
     * @var string
     */
    protected $post_type = 'docs';

    /**
     * Parent API class
     *
     * @var \WeDevs\WeDocs\API
     */
    protected $api;

    /**
     * Initialize the class
     */
    public function __construct( $api ) {
        $this->namespace = 'wp/v2';
        $this->rest_base = 'docs';

        $this->api = $api;
    }

    /**
     * Register the routes for the objects of the controller.
     */
    public function register_routes() {
        register_rest_route( $this->namespace, '/' . $this->rest_base . '/(?P<id>[\d]+)/feedback', [
            [
                'methods'             => WP_REST_Server::CREATABLE,
                'callback'            => [ $this, 'handle_feedback' ],
                'permission_callback' => [ $this, 'create_item_permissions_check' ],
                'args'                => [
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
            ],
        ] );

        register_rest_route( $this->namespace, '/' . $this->rest_base . '/(?P<id>[\d]+)/helpfullness', [
            [
                'methods'             => WP_REST_Server::EDITABLE,
                'callback'            => [ $this, 'update_helpfullness' ],
                'permission_callback' => '__return_true',
                'args'                => [
                    'type' => [
                        'required' => true,
                        'type'     => 'string',
                        'enum'     => [ 'positive', 'negative' ],
                    ],
                ],
            ],
        ] );

        register_rest_route( $this->namespace, '/' . $this->rest_base . '/(?P<id>[\d]+)/parents', [
            [
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => [ $this, 'get_parents' ],
                'permission_callback' => '__return_true',
            ],
        ] );

        register_rest_route( $this->namespace, '/' . $this->rest_base . '/search', [
            [
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => [ $this, 'search_docs' ],
                'permission_callback' => '__return_true',
                'args'                => [
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
                    'page' => [
                        'description'       => __( 'Current page of the collection.', 'wedocs' ),
                        'type'              => 'integer',
                        'default'           => 1,
                        'sanitize_callback' => 'absint',
                        'validate_callback' => 'rest_validate_request_arg',
                        'minimum'           => 1,
                    ],
                    'per_page' => [
                        'description'       => __( 'Maximum number of items to be returned in result set.', 'wedocs' ),
                        'type'              => 'integer',
                        'default'           => 10,
                        'minimum'           => 1,
                        'maximum'           => 100,
                        'sanitize_callback' => 'absint',
                        'validate_callback' => 'rest_validate_request_arg',
                    ],
                ],
            ],
        ] );
    }

    /**
     * [handle_feedback description].
     *
     * @param WP_REST_Request $request full data about the request
     *
     * @return WP_Error|WP_REST_Response response object on success, or WP_Error object on failure
     */
    public function handle_feedback( $request ) {
        $id = (int) $request['id'];

        if ( !is_user_logged_in() ) {
            $name  = $request['name'];
            $email = $request['email'];
        } else {
            $user  = wp_get_current_user();
            $name  = $user->display_name;
            $email = $user->user_email;
        }

        wedocs_doc_feedback_email( $id, $name, $email, $request['subject'], $request['message'] );

        return rest_ensure_response( [
            'success' => true,
        ] );
    }

    /**
     * [handle_feedback description].
     *
     * @param WP_REST_Request $request full data about the request
     *
     * @return WP_Error|WP_REST_Response response object on success, or WP_Error object on failure
     */
    public function update_helpfullness( $request ) {
        $valid_check = $this->get_doc( $request['id'] );

        if ( is_wp_error( $valid_check ) ) {
            return $valid_check;
        }

        $type  = $request['type'];
        $count = (int) get_post_meta( $request['id'], $type, true );

        update_post_meta( $request['id'], $type, $count + 1 );

        return rest_ensure_response( [
            'success' => true,
        ] );
    }

    /**
     * Get parents of a document.
     *
     * @param \WP_REST_Request $request
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
        $root      = $parent      = false;

        if ( $doc->post_parent ) {
            $ancestors = get_post_ancestors( $doc->ID );
            $root      = count( $ancestors ) - 1;
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
            $data = $this->api->set_pagination( $data, $doc, $request );

            $result[] = $this->prepare_response_for_collection( $data );
        }

        $response = rest_ensure_response( $result );

        return $response;
    }

    /**
     * Search docs.
     *
     * @param \WP_REST_Request $request
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
            $post__in      = [ $request['in'] => $request['in'] ];
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
            return new WP_Error( 'rest_docs_invalid_page_number', __( 'The page number requested is larger than the number of pages available.', 'wedocs' ), [ 'status' => 400 ] );
        }

        $response = rest_ensure_response( $result );

        $response->header( 'X-WP-Total', (int) $total_posts );
        $response->header( 'X-WP-TotalPages', (int) $max_pages );

        return $response;
    }

    /**
     * Prepares a single doc output for response.
     *
     * @param WP_Post         $post    post object
     * @param WP_REST_Request $request request object
     *
     * @return WP_REST_Response response object
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
                'rendered' => get_the_title( $doc->ID ),
            ],
            'content' => [
                'rendered' => post_password_required( $doc ) ? '' : apply_filters( 'the_content', $doc->post_content ),
            ],
            'parent' => $doc->post_parent,
            'order'  => $doc->menu_order,
        ];

        if ( 'edit' == $request['context'] ) {
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
     * @param WP_Post $post post object
     *
     * @return array links for the given post
     */
    protected function prepare_links( $doc ) {
        $base = sprintf( '%s/%s', $this->namespace, $this->rest_base );

        $links = [
            'self' => [
                'href' => rest_url( trailingslashit( $base ) . $doc->ID ),
            ],
            'collection' => [
                'href' => rest_url( $base ),
            ],
        ];

        return $links;
    }

    /**
     * Check feedback create permission.
     *
     * @param WP_REST_Request $request full data about the request
     *
     * @return WP_Error|bool true on success
     */
    public function create_item_permissions_check( $request ) {
        if ( is_user_logged_in() ) {
            return true;
        }

        if ( empty( $request['name'] ) ) {
            return new WP_Error( 'rest_doc_invalid_name', __( 'No name given', 'wedocs' ) );
        }

        if ( empty( $request['email'] ) ) {
            return new WP_Error( 'rest_doc_invalid_email', __( 'No email given', 'wedocs' ) );
        }

        return true;
    }

    /**
     * Get the post, if the ID is valid.
     *
     * @param int $id supplied ID
     *
     * @return WP_Post|WP_Error post object if ID is valid, WP_Error otherwise
     */
    protected function get_doc( $id ) {
        $error = new WP_Error( 'rest_doc_invalid_id', __( 'Invalid doc ID.' ), [ 'status' => 404 ] );

        if ( (int) $id <= 0 ) {
            return $error;
        }

        $post = get_post( (int) $id );

        if ( empty( $post ) || empty( $post->ID ) || 'docs' !== $this->post_type ) {
            return $error;
        }

        return $post;
    }
}
