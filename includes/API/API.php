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

        // Register settings api.
        $settings_api = new SettingsApi( $api );
        $settings_api->register_api();

        // Register upgrader api.
        $upgrader_api = new UpgraderApi( $api );
        $upgrader_api->register_api();
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
                'permission_callback' => [ $this, 'helpful_update_permissions_check', ],
                'args'                => [
                    'type' => [
                        'required' => true,
                        'type'     => 'string',
                        'enum'     => [ 'positive', 'negative' ],
                    ],
                ],
            ],
        ] );

        register_rest_route( $this->namespace, '/' . $this->rest_base . '/(?P<id>[\d]+)/', [
            [
                'methods'             => WP_REST_Server::DELETABLE,
                'callback'            => array( $this, 'delete_item' ),
                'permission_callback' => array( $this, 'delete_item_permissions_check' ),
                'args'                => array(
                    'force' => array(
                        'default' => false,
                    ),
                ),
            ]
        ] );

        register_rest_route( $this->namespace, '/' . $this->rest_base . '/(?P<id>[\d]+)/parents', [
            [
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => [ $this, 'get_parents' ],
                'permission_callback' => '__return_true',
            ],
        ] );

        register_rest_route( $this->namespace, '/' . $this->rest_base . '/helpfulness', [
            [
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => array( $this, 'get_helpful_docs' ),
                'permission_callback' => '__return_true',
            ],
        ] );

        register_rest_route( $this->namespace, '/' . $this->rest_base . '/contributors', [
            [
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => array( $this, 'get_documentation_contributors' ),
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

        register_rest_route( $this->namespace, '/' . $this->rest_base . '/sorting_status', [
            [
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => [ $this, 'get_sortable_status' ],
                'permission_callback' => [ $this, 'sortable_item_permissions_check' ],
            ],
            [
                'methods'             => WP_REST_Server::CREATABLE,
                'callback'            => [ $this, 'update_sortable_status' ],
                'permission_callback' => [ $this, 'sortable_item_permissions_check' ],
                'args'                => [
                    'sortable_status' => [
                        'required'          => true,
                        'type'              => 'boolean',
                        'sanitize_callback' => 'rest_sanitize_boolean',
                    ],
                    'documentations'  => [
                        'required'    => true,
                        'type'        => 'object',
                        'description' => __( 'Documentations data', 'wedocs' ),
                    ]
                ],
            ],
        ] );

        register_rest_route( $this->namespace, '/' . $this->rest_base . '/need_sorting_status', [
            [
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => [ $this, 'get_need_sortable_status' ],
                'permission_callback' => [ $this, 'sortable_item_permissions_check' ],
            ],
            [
                'methods'             => WP_REST_Server::CREATABLE,
                'callback'            => [ $this, 'update_need_sortable_status' ],
                'permission_callback' => [ $this, 'sortable_item_permissions_check' ],
                'args'                => [
                    'need_sortable_status' => [
                        'required'          => true,
                        'type'              => 'boolean',
                        'sanitize_callback' => 'rest_sanitize_boolean',
                    ],
                ],
            ],
        ] );

        register_rest_route( $this->namespace, '/' . $this->rest_base . '/update_docs_status', [
            [
                'methods'             => WP_REST_Server::CREATABLE,
                'callback'            => [ $this, 'update_docs_status' ],
                'permission_callback' => [ $this, 'sortable_item_permissions_check' ],
                'args'                => [
                    'data' => array(
                        'type'        => 'object',
                        'description' => esc_html__( 'Collective documents object', 'wedocs' ),
                        'properties'  => array(
                            'docIds' => array(
                                'type' => 'object',
                            ),
                            'status' => array(
                                'type' => 'string',
                            ),
                        ),
                    ),
                ],
            ],
        ] );
    }

    /**
     * Get need sortable status.
     *
     * @since 2.0.0
     *
     * @return WP_Error|WP_REST_Response response object on success, or WP_Error object on failure.
     */
    public function get_need_sortable_status() {
        $need_sortable_status = get_option( 'wedocs_need_sortable_status', false );
        return rest_ensure_response( $need_sortable_status );
    }

    /**
     * Get sortable status.
     *
     * @since 2.0.0
     *
     * @return WP_Error|WP_REST_Response response object on success, or WP_Error object on failure.
     */
    public function get_sortable_status() {
        $need_sortable_status = get_option( 'wedocs_sortable_status', false );
        return rest_ensure_response( $need_sortable_status );
    }

    /**
     * Update need sortable status.
     *
     * @since 2.0.0
     *
     * @param WP_REST_Request $request full data about the request
     *
     * @return WP_Error|WP_REST_Response response object on success, or WP_Error object on failure.
     */
    public function update_need_sortable_status( $request ) {
        if ( ! is_user_logged_in() ) {
            return new WP_Error( 'rest_not_logged_in', __( 'You are not currently logged in.', 'wedocs' ) );
        }

        if ( ! current_user_can( 'edit_docs' ) ) {
            return new WP_Error( 'wedocs_permission_failure', __( 'Unauthorized permission error', 'wedocs' ) );
        }

        if ( ! isset( $request['need_sortable_status'] ) ) {
            return new WP_Error( 'wedocs_required_args', __( 'Currently sortable status not given', 'wedocs' ) );
        }

        update_option( 'wedocs_need_sortable_status', $request['need_sortable_status'] );
        return rest_ensure_response( $request['need_sortable_status'] );
    }

    /**
     * Update sortable status.
     *
     * @since 2.0.0
     *
     * @param WP_REST_Request $request full data about the request
     *
     * @return WP_Error|WP_REST_Response response object on success, or WP_Error object on failure.
     */
    public function update_sortable_status( $request ) {
        // Check log in status.
        if ( ! is_user_logged_in() ) {
            return new WP_Error( 'rest_not_logged_in', __( 'You are not currently logged in.', 'wedocs' ) );
        }

        // Check current user is admin.
        if ( ! current_user_can( 'edit_docs' ) ) {
            return new WP_Error( 'wedocs_permission_failure', __( 'Unauthorized permission error', 'wedocs' ) );
        }

        // Check sortable status is running or not.
        if ( ! isset( $request['sortable_status'] ) ) {
            return new WP_Error( 'wedocs_required_args', __( 'Currently sortable status not given', 'wedocs' ) );
        }

        // Make sortable status running.
        update_option( 'wedocs_sortable_status', true );
        foreach ( $request['documentations'] as $index => $doc ) {
            $post_data = [
                'ID'          => $doc['id'],
                'post_type'   => 'docs',
                'menu_order'  => $index,
            ];

            wp_update_post( $post_data, true );
        }

        // Reset sortable statuses.
        update_option( 'wedocs_sortable_status', false );
        update_option( 'wedocs_need_sortable_status', false );
        return rest_ensure_response( false );
    }

    /**
     * Update collective docs status.
     *
     * @since 2.0.2
     *
     * @return WP_Error|WP_REST_Response response object on success, or WP_Error object on failure.
     */
    public function update_docs_status( $request ) {
        $status  = false;
        $doc_ids = ! empty( $request['docIds'] ) ? array_map( 'intval', $request['docIds'] ) : array();

        foreach ( $doc_ids as $doc_id ) {
            $doc_status = get_post_status( $doc_id );
            if ( $doc_status === 'draft' ) {
                continue;
            }

            $post_data = array(
                'ID'          => $doc_id,
                'post_status' => ! empty( $request['status'] ) ? sanitize_text_field( $request['status'] ) : 'publish',
            );

            $status = wp_update_post( $post_data );
        }

        return rest_ensure_response( $status );
    }

    /**
     * Check sortable items permission check.
     *
     * @since 2.0.0
     *
     * @return \WP_Error|bool
     */
    public function sortable_item_permissions_check() {
        if ( ! current_user_can( 'edit_docs' ) ) {
            return new WP_Error(
                'wedocs_permission_failure',
                __( 'Unauthorized permission error', 'wedocs' )
            );
        }

        return true;
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
     * Get top helpful documentations.
     *
     * @since 2.0.0
     *
     * @return mixed
     */
    public function get_helpful_docs() {
        // Get all docs.
        $args = array(
            'post_type'      => 'docs',
            'posts_per_page' => -1 // Retrieve all docs.
        );

        $docs = get_posts( $args );

        // Create an array to store the vote counts
        $vote_counts = array();

        // Loop through each post and calculate the vote count
        foreach ( $docs as $doc ) {
            if ( empty( $doc->ID ) ) {
                continue;
            }

            $positive = (int) get_post_meta( $doc->ID, 'positive', true );
            $negative = (int) get_post_meta( $doc->ID, 'negative', true );
            if ( empty( $positive ) && empty( $negative ) ) {
                continue;
            }

            $vote_count              = $positive - $negative;
            $vote_counts[ $doc->ID ] = $vote_count;
        }

        // Sort the vote counts in descending order
        arsort( $vote_counts );

        // Get the top 10 post IDs
        $top_10_post_ids = array_slice( array_keys( $vote_counts ), 0, 10 );

        return rest_ensure_response( $top_10_post_ids );
    }

    /**
     * Get documentation contributors.
     *
     * @since 2.0.0
     *
     * @param \WP_REST_Request $request
     *
     * @return mixed
     */
    public function get_documentation_contributors( $request ) {
        $args = array(
            'post_type'      => 'docs',
            'post_status'    => 'publish',
            'meta_key'       => 'wedocs_contributors',
            'meta_value'     => '',
            'meta_compare'   => '!=',
            'posts_per_page' => -1,
        );

        $docs         = get_posts( $args );
        $contributors = array();
        foreach ( $docs as $doc ) {
            $data             = array();
            $doc_contributors = (array) get_post_meta( $doc->ID, 'wedocs_contributors', true );
            foreach ( $doc_contributors as $contributor_id ) {
                $user_data               = get_userdata( $contributor_id );
                $data[ $contributor_id ] = array(
                    'name' => $user_data->user_login,
                    'src' => get_avatar_url( $contributor_id )
                );
            }

            $contributors[ $doc->ID ] = $data;
        }

        return rest_ensure_response( $contributors );
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
     * @param WP_Post         $doc    post object
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
     * Check helpful item permission.
     *
     * @since 2.1.5
     *
     * @param WP_REST_Request $request full data about the request
     *
     * @return WP_Error|bool true on success
     */
    public function helpful_update_permissions_check( $request ) {
        if ( ! is_user_logged_in() ) {
            return new WP_Error( 'rest_not_logged_in', __( 'You are not currently logged in.', 'wedocs' ) );
        }

        $doc_id       = absint( $request->get_param( 'id' ) );
        $doc_status   = get_post_status( $doc_id );
        $doc_statuses = array( 'publish', 'private' );

        // Check doc status is valid.
        if ( ! in_array( $doc_status, $doc_statuses ) ) {
            return new WP_Error( 'rest_doc_invalid_status', __( 'Doc status not valid for update helpful data', 'wedocs' ) );
        }

        $user_id         = get_current_user_id();
        $updated_doc_ids = get_user_meta( $user_id, 'wedocs_response', true );
        $previous        = ! empty( $updated_doc_ids ) ? explode( ',', $updated_doc_ids ) : [];

        // Check doc status is valid.
        if ( in_array( $doc_id, $previous ) ) {
            return new WP_Error( 'rest_doc_invalid_helpful_update', __( 'Sorry, we have already recorded your feedback!', 'wedocs' ) );
        }

        array_push( $previous, $doc_id );
        $responsed_doc_ids = implode( ',', $previous );

        update_user_meta( $user_id, 'wedocs_response', $responsed_doc_ids );

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

    /**
     * Check permissions for the documentation delete.
     *
     * @since 2.0.0
     *
     * @param WP_REST_Request $request Current request.
     *
     * @return bool|WP_Error
     */
    public function delete_item_permissions_check( $request ) {
        if ( ! current_user_can( 'edit_docs' ) ) {
            return new WP_Error(
                'wedocs_permission_failure',
                __( 'You cannot delete the documentation resource.', 'wedocs' )
            );
        }

        return true;
    }

    /**
     * Delete a single documentation.
     *
     * @since 2.0.0
     *
     * @param WP_REST_Request $request Current request.
     *
     * @return WP_REST_Response|WP_Error
     */
    public function delete_item( $request ) {
        $doc_id = absint( $request->get_param( 'id' ) );
        $doc    = get_post( $doc_id );

        if ( ! $doc ) {
            return new WP_Error( 'rest_invalid_documentation', __( 'Invalid Documentation.', 'wedocs' ) );
        }

        $this->remove_child_docs( $doc_id );
        $deleted_doc = wp_trash_post( $doc_id );

        return rest_ensure_response( $deleted_doc );
    }

    /**
     * Remove all children docs if exists.
     *
     * @since 2.0.0
     *
     * @param int $parent_id
     *
     * @return WP_REST_Response|WP_Error
     */
    public function remove_child_docs( $parent_id ) {
        $childrens = get_children( array( 'post_parent' => $parent_id ) );

        if ( $childrens ) {
            foreach ( $childrens as $child_post ) {
                // Recursively delete documentations.
                $this->remove_child_docs( $child_post->ID );
                wp_delete_post( $child_post->ID );
            }
        }
    }
}
