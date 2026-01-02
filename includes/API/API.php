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

        register_rest_route( $this->namespace, '/' . $this->rest_base . '/promotion-notice', [
            [
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => [ $this, 'get_promotional_notice' ],
                'permission_callback' => [ $this, 'get_promotional_notice_check' ],
            ]
        ] );

        register_rest_route( $this->namespace, '/' . $this->rest_base . '/hide-promotion-notice', [
            [
                'methods'             => WP_REST_Server::CREATABLE,
                'callback'            => [ $this, 'handle_hide_promotion_notice' ],
                'permission_callback' => [ $this, 'get_promotional_notice_check' ],
            ]
        ] );

        register_rest_route( $this->namespace, '/' . $this->rest_base . '/ai/generate', [
            [
                'methods'             => WP_REST_Server::CREATABLE,
                'callback'            => [ $this, 'generate_ai_content' ],
                'permission_callback' => [ $this, 'ai_generate_permissions_check' ],
                'args'                => [
                    'prompt' => [
                        'required'          => true,
                        'type'              => 'string',
                        'sanitize_callback' => 'sanitize_textarea_field',
                    ],
                    'provider' => [
                        'required' => false,
                        'type'     => 'string',
                        'sanitize_callback' => 'sanitize_text_field',
                    ],
                    'model' => [
                        'required' => false,
                        'type'     => 'string',
                        'sanitize_callback' => 'sanitize_text_field',
                    ],
                    'maxTokens' => [
                        'required' => false,
                        'type'     => 'integer',
                        'default'  => 2000,
                    ],
                    'temperature' => [
                        'required' => false,
                        'type'     => 'number',
                        'default'  => 0.7,
                    ],
                    'systemPrompt' => [
                        'required' => false,
                        'type'     => 'string',
                        'sanitize_callback' => 'sanitize_textarea_field',
                    ],
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
        if ( ! get_current_user_id() ) {
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

    /**
     * Check permissions for getting
     *  promotion notice.
     *
     * @since 2.1.11
     *
     * @param WP_REST_Request $request Current request.
     *
     * @return bool|WP_Error
     */
    public function get_promotional_notice_check( $request ) {
        if ( ! current_user_can( 'manage_options' ) ) {
            return new WP_Error(
                'wedocs_permission_failure',
                __( 'You cannot see promotion notices.', 'wedocs' )
            );
        }

        return true;
    }

    /**
     * Get the data needed for promotional notice.
     * 
     * @since 2.1.11
     *
     * @return bool|WP_Error|WP_REST_Response response object on success, or WP_Error object on failure.
     */
    public function get_promotional_notice() {
        if ( ! current_user_can( 'manage_options' ) ) {
            return false;
        }

		$promos = get_transient( WEDOCS_PROMO_KEY );

		if ( false === $promos ) {
            $promo_notice_url   = WEDOCS_PROMO_URL;
            $response           = wp_remote_get( $promo_notice_url, array( 'timeout'  => 15 ) );
            $promos             = wp_remote_retrieve_body( $response );
            $promos             = json_decode( $promos, true );

            if ( is_wp_error( $response ) || $response['response']['code'] !== 200 ) {
                $promos = '[]';
            }

            set_transient( WEDOCS_PROMO_KEY, $promos, DAY_IN_SECONDS );
        }

        $promos = ! is_array( $promos ) ? json_decode( $promos, true ) : $promos;

        if ( empty( $promos ) || ! is_array( $promos ) ) {
            return false;
        }

        if ( ! isset( $promos['key'] ) || 'hide' === get_option( $promos['key'], 'no' ) ) {
            return false;
        }

        $promos['logo_url'] = WEDOCS_LOGO_URL;

		$current_time = wedocs_convert_utc_to_est();

		if (
			isset( $promos['start_date'] )
			&& isset( $promos['end_date'] )
            && strtotime( $promos['start_date'] ) < strtotime( $current_time )
            && strtotime( $current_time ) < strtotime( $promos['end_date'] )
            ) {
            return rest_ensure_response( $promos );
        }

        return false;
    }

     /**
     * Handle promotional notice hidden action
     * 
     * @since 2.1.11
     * 
     * @param WP_REST_Request $request Current request.
     *
     */
    public function handle_hide_promotion_notice( $request ) {
        if ( ! empty( $request->get_param('option_name') ) ) {
			$offer_key = sanitize_text_field( wp_unslash( $request->get_param('option_name') ) );

			update_option( $offer_key, 'hide' );

            wp_send_json_success( 'Successfully dismissed.' );
		}

        wp_send_json_error( 'Failed to dismiss.' );
    }

    /**
     * Check permissions for AI content generation
     *
     * @since 2.0.0
     *
     * @param WP_REST_Request $request Current request.
     *
     * @return bool|WP_Error
     */
    public function ai_generate_permissions_check( $request ) {
        if ( ! current_user_can( 'edit_docs' ) ) {
            return new WP_Error(
                'wedocs_permission_failure',
                __( 'You do not have permission to generate AI content.', 'wedocs' ),
                [ 'status' => 403 ]
            );
        }

        return true;
    }

    /**
     * Generate AI content
     *
     * @since 2.0.0
     *
     * @param WP_REST_Request $request Current request.
     *
     * @return WP_Error|WP_REST_Response
     */
    public function generate_ai_content( $request ) {
        $prompt = $request->get_param( 'prompt' );
        $provider = $request->get_param( 'provider' );
        $model = $request->get_param( 'model' );
        $max_tokens = $request->get_param( 'maxTokens' );
        $temperature = $request->get_param( 'temperature' );
        $system_prompt = $request->get_param( 'systemPrompt' );

        // Validate numeric parameters
        if ( $max_tokens && ( $max_tokens < 1 || $max_tokens > 8000 ) ) {
            return new WP_Error(
                'wedocs_ai_invalid_max_tokens',
                __( 'Max tokens must be between 1 and 8000.', 'wedocs' ),
                [ 'status' => 400 ]
            );
        }

        if ( $temperature !== null && ( $temperature < 0.0 || $temperature > 2.0 ) ) {
            return new WP_Error(
                'wedocs_ai_invalid_temperature',
                __( 'Temperature must be between 0.0 and 2.0.', 'wedocs' ),
                [ 'status' => 400 ]
            );
        }

        // Get AI settings
        $ai_settings = wedocs_get_option( 'ai', 'wedocs_settings', '' );
        
        if ( empty( $ai_settings ) || empty( $ai_settings['providers'] ) ) {
            return new WP_Error(
                'wedocs_ai_not_configured',
                __( 'AI settings are not configured.', 'wedocs' ),
                [ 'status' => 400 ]
            );
        }

        // Use provided provider or default
        $selected_provider = $provider ?: ( $ai_settings['default_provider'] ?? 'openai' );
        
        // Get provider config
        $provider_config = $ai_settings['providers'][ $selected_provider ] ?? null;
        
        if ( ! $provider_config || empty( $provider_config['api_key'] ) ) {
            return new WP_Error(
                'wedocs_ai_provider_not_configured',
                __( 'AI provider is not configured or API key is missing.', 'wedocs' ),
                [ 'status' => 400 ]
            );
        }

        // Get provider endpoint and config
        $provider_configs = wedocs_get_ai_provider_configs();
        $provider_endpoint_config = $provider_configs[ $selected_provider ] ?? null;
        
        if ( ! $provider_endpoint_config ) {
            return new WP_Error(
                'wedocs_ai_invalid_provider',
                __( 'Invalid AI provider specified.', 'wedocs' ),
                [ 'status' => 400 ]
            );
        }

        $selected_model = $model ?: ( $provider_config['selected_model'] ?? null );
        
        if ( ! $selected_model ) {
            return new WP_Error(
                'wedocs_ai_model_not_specified',
                __( 'AI model is not specified.', 'wedocs' ),
                [ 'status' => 400 ]
            );
        }

        // Make API call
        try {
            $response = $this->make_ai_api_call(
                $selected_provider,
                $provider_endpoint_config,
                $selected_model,
                $provider_config['api_key'],
                $prompt,
                $system_prompt ?: __( 'You are a helpful documentation assistant.', 'wedocs' ),
                $max_tokens ?: 2000,
                $temperature ?: 0.7
            );

            return rest_ensure_response( $response );
        } catch ( \Exception $e ) {
            // Check if it's a timeout or fatal error
            $error_message = $e->getMessage();
            if ( strpos( $error_message, 'Maximum execution time' ) !== false || strpos( $error_message, 'Fatal error' ) !== false ) {
                $error_message = __( 'The request took too long to complete. Please try again with a shorter prompt.', 'wedocs' );
            }

            return new WP_Error(
                'wedocs_ai_generation_failed',
                $error_message,
                [ 'status' => 500 ]
            );
        }
    }

    /**
     * Make AI API call based on provider
     *
     * @since 2.0.0
     *
     * @param string $provider Provider name
     * @param array $provider_config Provider configuration
     * @param string $model Model to use
     * @param string $api_key API key
     * @param string $prompt User prompt
     * @param string $system_prompt System prompt
     * @param int $max_tokens Max tokens
     * @param float $temperature Temperature
     *
     * @return array Response with content and usage
     * @throws \Exception
     */
    private function make_ai_api_call( $provider, $provider_config, $model, $api_key, $prompt, $system_prompt, $max_tokens, $temperature ) {
        $endpoint = $provider_config['endpoint'];

        switch ( $provider ) {
            case 'openai':
                return $this->call_openai_api( $endpoint, $api_key, $model, $prompt, $system_prompt, $max_tokens, $temperature );
            case 'anthropic':
                return $this->call_anthropic_api( $endpoint, $api_key, $model, $prompt, $system_prompt, $max_tokens, $temperature );
            case 'google':
                return $this->call_google_api( $endpoint, $api_key, $model, $prompt, $system_prompt, $max_tokens, $temperature );
            default:
                throw new \Exception( __( 'Unsupported AI provider', 'wedocs' ) );
        }
    }

    /**
     * Call OpenAI API
     *
     * @since 2.0.0
     *
     * @param string $endpoint API endpoint
     * @param string $api_key API key
     * @param string $model Model to use
     * @param string $prompt User prompt
     * @param string $system_prompt System prompt
     * @param int $max_tokens Max tokens
     * @param float $temperature Temperature
     *
     * @return array Response with content and usage
     * @throws \Exception
     */
    private function call_openai_api( $endpoint, $api_key, $model, $prompt, $system_prompt, $max_tokens, $temperature ) {
        // Validate API key
        if ( empty( $api_key ) || ! is_string( $api_key ) ) {
            throw new \Exception( __( 'OpenAI API key is missing or invalid', 'wedocs' ) );
        }

        $headers = [
            'Authorization' => 'Bearer ' . $api_key,
            'Content-Type' => 'application/json',
        ];

        $data = [
            'model' => $model,
            'messages' => [
                [
                    'role' => 'system',
                    'content' => $system_prompt
                ],
                [
                    'role' => 'user',
                    'content' => $prompt
                ]
            ],
            'max_tokens' => $max_tokens,
            'temperature' => $temperature
        ];

        $response = wp_remote_post( $endpoint, [
            'headers' => $headers,
            'body' => json_encode( $data ),
            'timeout' => 60 // Increased timeout for AI generation
        ]);

        if ( is_wp_error( $response ) ) {
            $error_message = $response->get_error_message();
            
            // Handle timeout errors
            if ( strpos( $error_message, 'timeout' ) !== false || strpos( $error_message, 'timed out' ) !== false ) {
                throw new \Exception( __( 'The request took too long. Please try again with a shorter prompt or check your connection.', 'wedocs' ) );
            }
            
            throw new \Exception( sprintf( __( 'OpenAI API error: %s', 'wedocs' ), $error_message ) );
        }

        $response_code = wp_remote_retrieve_response_code( $response );
        $body = wp_remote_retrieve_body( $response );
        $decoded = json_decode( $body, true );

        // Check for HTTP errors
        if ( $response_code >= 400 ) {
            $this->handle_api_error( $response_code, $decoded, 'OpenAI' );
        }

        if ( isset( $decoded['choices'][0]['message']['content'] ) ) {
            return [
                'content' => $decoded['choices'][0]['message']['content'],
                'usage' => $decoded['usage'] ?? null
            ];
        }

        $error_message = $decoded['error']['message'] ?? __( 'Invalid OpenAI API response', 'wedocs' );
        throw new \Exception( $error_message );
    }

    /**
     * Call Anthropic API
     *
     * @since 2.0.0
     *
     * @param string $endpoint API endpoint
     * @param string $api_key API key
     * @param string $model Model to use
     * @param string $prompt User prompt
     * @param string $system_prompt System prompt
     * @param int $max_tokens Max tokens
     * @param float $temperature Temperature
     *
     * @return array Response with content and usage
     * @throws \Exception
     */
    private function call_anthropic_api( $endpoint, $api_key, $model, $prompt, $system_prompt, $max_tokens, $temperature ) {
        // Validate API key
        if ( empty( $api_key ) || ! is_string( $api_key ) ) {
            throw new \Exception( __( 'Anthropic API key is missing or invalid', 'wedocs' ) );
        }

        $headers = [
            'x-api-key' => $api_key,
            'Content-Type' => 'application/json',
            'anthropic-version' => '2023-06-01'
        ];

        $data = [
            'model' => $model,
            'max_tokens' => $max_tokens,
            'messages' => [
                [
                    'role' => 'user',
                    'content' => $system_prompt . "\n\n" . $prompt
                ]
            ]
        ];

        $response = wp_remote_post( $endpoint, [
            'headers' => $headers,
            'body' => json_encode( $data ),
            'timeout' => 60 // Increased timeout for AI generation
        ]);

        if ( is_wp_error( $response ) ) {
            $error_message = $response->get_error_message();
            
            // Handle timeout errors
            if ( strpos( $error_message, 'timeout' ) !== false || strpos( $error_message, 'timed out' ) !== false ) {
                throw new \Exception( __( 'The request took too long. Please try again with a shorter prompt or check your connection.', 'wedocs' ) );
            }
            
            throw new \Exception( sprintf( __( 'Anthropic API error: %s', 'wedocs' ), $error_message ) );
        }

        $response_code = wp_remote_retrieve_response_code( $response );
        $body = wp_remote_retrieve_body( $response );
        $decoded = json_decode( $body, true );

        // Check for HTTP errors
        if ( $response_code >= 400 ) {
            $this->handle_api_error( $response_code, $decoded, 'Anthropic' );
        }

        if ( isset( $decoded['content'][0]['text'] ) ) {
            return [
                'content' => $decoded['content'][0]['text'],
                'usage' => $decoded['usage'] ?? null
            ];
        }

        $error_message = $decoded['error']['message'] ?? __( 'Invalid Anthropic API response', 'wedocs' );
        throw new \Exception( $error_message );
    }

    /**
     * Call Google API
     *
     * @since 2.0.0
     *
     * @param string $endpoint API endpoint
     * @param string $api_key API key
     * @param string $model Model to use
     * @param string $prompt User prompt
     * @param string $system_prompt System prompt
     * @param int $max_tokens Max tokens
     * @param float $temperature Temperature
     *
     * @return array Response with content and usage
     * @throws \Exception
     */
    private function call_google_api( $endpoint, $api_key, $model, $prompt, $system_prompt, $max_tokens, $temperature ) {
        // Validate API key
        if ( empty( $api_key ) || ! is_string( $api_key ) ) {
            throw new \Exception( __( 'Google API key is missing or invalid', 'wedocs' ) );
        }

        $endpoint = str_replace( '{model}', $model, $endpoint );
        $endpoint = add_query_arg( 'key', $api_key, $endpoint );

        $data = [
            'contents' => [
                [
                    'parts' => [
                        [
                            'text' => $system_prompt . "\n\n" . $prompt
                        ]
                    ]
                ]
            ],
            'generationConfig' => [
                'maxOutputTokens' => $max_tokens,
                'temperature' => $temperature
            ]
        ];

        $response = wp_remote_post( $endpoint, [
            'headers' => [
                'Content-Type' => 'application/json',
            ],
            'body' => json_encode( $data ),
            'timeout' => 60 // Increased timeout for AI generation
        ]);

        if ( is_wp_error( $response ) ) {
            $error_message = $response->get_error_message();
            
            // Handle timeout errors
            if ( strpos( $error_message, 'timeout' ) !== false || strpos( $error_message, 'timed out' ) !== false ) {
                throw new \Exception( __( 'The request took too long. Please try again with a shorter prompt or check your connection.', 'wedocs' ) );
            }
            
            throw new \Exception( sprintf( __( 'Google API error: %s', 'wedocs' ), $error_message ) );
        }

        $response_code = wp_remote_retrieve_response_code( $response );
        $body = wp_remote_retrieve_body( $response );
        $decoded = json_decode( $body, true );

        // Check for HTTP errors
        if ( $response_code >= 400 ) {
            $error_message = $decoded['error']['message'] ?? $decoded['error']['status'] ?? __( 'Google API request failed', 'wedocs' );
            $this->handle_api_error( $response_code, [ 'error' => [ 'message' => $error_message ] ], 'Google' );
        }

        if ( isset( $decoded['candidates'][0]['content']['parts'][0]['text'] ) ) {
            return [
                'content' => $decoded['candidates'][0]['content']['parts'][0]['text'],
                'usage' => $decoded['usageMetadata'] ?? null
            ];
        }

        $error_message = $decoded['error']['message'] ?? __( 'Invalid Google API response', 'wedocs' );
        throw new \Exception( $error_message );
    }

    /**
     * Handle API error responses
     *
     * @since 2.0.0
     *
     * @param int $response_code HTTP response code
     * @param array $decoded Decoded response body
     * @param string $provider_name Provider name for error messages
     *
     * @throws \Exception
     */
    private function handle_api_error( $response_code, $decoded, $provider_name ) {
        $error_message = $decoded['error']['message'] ?? $decoded['error']['type'] ?? $decoded['error']['status'] ?? sprintf( __( '%s API request failed', 'wedocs' ), $provider_name );
        
        // User-friendly error messages
        if ( $response_code === 401 ) {
            if ( strpos( strtolower( $error_message ), 'invalid' ) !== false || strpos( strtolower( $error_message ), 'api' ) !== false ) {
                throw new \Exception( sprintf( __( 'Invalid %s API key. Please check your API key in the AI settings.', 'wedocs' ), $provider_name ) );
            }
            throw new \Exception( sprintf( __( 'Authentication failed. Please verify your %s API key is correct.', 'wedocs' ), $provider_name ) );
        } elseif ( $response_code === 403 ) {
            if ( strpos( strtolower( $error_message ), 'invalid' ) !== false || strpos( strtolower( $error_message ), 'api' ) !== false ) {
                throw new \Exception( sprintf( __( 'Invalid %s API key. Please check your API key in the AI settings.', 'wedocs' ), $provider_name ) );
            }
            throw new \Exception( sprintf( __( 'Authentication failed. Please verify your %s API key is correct.', 'wedocs' ), $provider_name ) );
        } elseif ( $response_code === 429 ) {
            throw new \Exception( __( 'Rate limit exceeded. Please wait a moment and try again.', 'wedocs' ) );
        } elseif ( $response_code === 500 || $response_code === 503 ) {
            throw new \Exception( sprintf( __( '%s service is temporarily unavailable. Please try again later.', 'wedocs' ), $provider_name ) );
        }
        
        // Generic error
        throw new \Exception( sprintf( __( '%s API error: %s', 'wedocs' ), $provider_name, $error_message ) );
    }
}
