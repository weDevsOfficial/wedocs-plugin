<?php
// DESCRIPTION: REST API controller for managing stored contact messages.
// Provides list, get, and delete endpoints for the admin messages UI.

namespace WeDevs\WeDocs\API;

use WP_Error;
use WP_REST_Server;

/**
 * Messages REST API controller.
 *
 * @since WEDOCS_SINCE
 */
class MessagesApi extends \WP_REST_Controller {

    /**
     * Post Type Base.
     *
     * @since WEDOCS_SINCE
     *
     * @var string
     */
    protected $base = 'docs/messages';

    /**
     * WP Version Number.
     *
     * @since WEDOCS_SINCE
     *
     * @var string
     */
    protected $version = '2';

    /**
     * WP Version Slug.
     *
     * @since WEDOCS_SINCE
     *
     * @var string
     */
    protected $namespace = 'wp/v';

    /**
     * Parent API class.
     *
     * @since WEDOCS_SINCE
     *
     * @var \WeDevs\WeDocs\API
     */
    protected $api;

    /**
     * Initialize the class.
     *
     * @since WEDOCS_SINCE
     *
     * @param \WeDevs\WeDocs\API $api Parent API instance.
     */
    public function __construct( $api ) {
        $this->api = $api;
    }

    /**
     * Register messages API routes.
     *
     * @since WEDOCS_SINCE
     *
     * @return void
     */
    public function register_api() {
        register_rest_route( $this->namespace . $this->version, '/' . $this->base,
            array(
                array(
                    'methods'             => WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_items' ),
                    'permission_callback' => array( $this, 'admin_permissions_check' ),
                    'args'                => array(
                        'page' => array(
                            'type'              => 'integer',
                            'default'           => 1,
                            'sanitize_callback' => 'absint',
                        ),
                        'per_page' => array(
                            'type'              => 'integer',
                            'default'           => 20,
                            'sanitize_callback' => 'absint',
                        ),
                        'search' => array(
                            'type'              => 'string',
                            'default'           => '',
                            'sanitize_callback' => 'sanitize_text_field',
                        ),
                        'source' => array(
                            'type'              => 'string',
                            'default'           => '',
                            'enum'              => array( '', 'modal', 'widget' ),
                            'sanitize_callback' => 'sanitize_text_field',
                        ),
                    ),
                ),
            )
        );

        register_rest_route( $this->namespace . $this->version, '/' . $this->base . '/(?P<id>[\d]+)',
            array(
                array(
                    'methods'             => WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_item' ),
                    'permission_callback' => array( $this, 'admin_permissions_check' ),
                ),
                array(
                    'methods'             => WP_REST_Server::DELETABLE,
                    'callback'            => array( $this, 'delete_item' ),
                    'permission_callback' => array( $this, 'admin_permissions_check' ),
                ),
            )
        );
    }

    /**
     * Check admin permissions.
     *
     * @since WEDOCS_SINCE
     *
     * @param \WP_REST_Request $request Full data about the request.
     *
     * @return bool|WP_Error
     */
    public function admin_permissions_check( $request ) {
        if ( ! current_user_can( 'manage_options' ) ) {
            return new WP_Error(
                'rest_forbidden',
                __( 'Sorry, you are not allowed to do that.', 'wedocs' ),
                array( 'status' => rest_authorization_required_code() )
            );
        }

        return true;
    }

    /**
     * Check if the messages table exists in the database.
     *
     * @since WEDOCS_SINCE
     *
     * @return bool|WP_Error True if table exists, WP_Error if not.
     */
    private function check_table_exists() {
        global $wpdb;

        $table_name = $wpdb->prefix . 'wedocs_messages';
        $table_exists = $wpdb->get_var(
            $wpdb->prepare( 'SHOW TABLES LIKE %s', $table_name )
        );

        if ( ! $table_exists ) {
            return new WP_Error(
                'rest_table_not_found',
                __( 'The messages database table does not exist. Please deactivate and reactivate the weDocs plugin to create it.', 'wedocs' ),
                array( 'status' => 500 )
            );
        }

        return true;
    }

    /**
     * Get a paginated list of messages.
     *
     * @since WEDOCS_SINCE
     *
     * @param \WP_REST_Request $request Full data about the request.
     *
     * @return \WP_REST_Response|WP_Error
     */
    public function get_items( $request ) {
        $table_check = $this->check_table_exists();
        if ( is_wp_error( $table_check ) ) {
            return $table_check;
        }

        global $wpdb;

        $table_name = $wpdb->prefix . 'wedocs_messages';
        $page       = $request->get_param( 'page' );
        $per_page   = $request->get_param( 'per_page' );
        $search     = $request->get_param( 'search' );
        $source     = $request->get_param( 'source' );
        $offset     = ( $page - 1 ) * $per_page;

        $where_clauses = array();
        $where_values  = array();

        if ( ! empty( $search ) ) {
            $like            = '%' . $wpdb->esc_like( $search ) . '%';
            $where_clauses[] = '(name LIKE %s OR email LIKE %s OR subject LIKE %s OR message LIKE %s)';
            $where_values[]  = $like;
            $where_values[]  = $like;
            $where_values[]  = $like;
            $where_values[]  = $like;
        }

        if ( ! empty( $source ) ) {
            $where_clauses[] = 'source = %s';
            $where_values[]  = $source;
        }

        $where = '';
        if ( ! empty( $where_clauses ) ) {
            $where = 'WHERE ' . implode( ' AND ', $where_clauses );
        }

        // Get total count.
        $count_query = "SELECT COUNT(*) FROM $table_name $where";
        if ( ! empty( $where_values ) ) {
            $count_query = $wpdb->prepare( $count_query, $where_values );
        }
        $total = (int) $wpdb->get_var( $count_query );

        // Get paginated results.
        $query = "SELECT * FROM $table_name $where ORDER BY submitted_at DESC LIMIT %d OFFSET %d";
        $query_values = array_merge( $where_values, array( $per_page, $offset ) );
        $messages = $wpdb->get_results( $wpdb->prepare( $query, $query_values ) );

        return rest_ensure_response( array(
            'messages'    => $messages,
            'total'       => $total,
            'total_pages' => ceil( $total / $per_page ),
        ) );
    }

    /**
     * Get a single message by ID.
     *
     * @since WEDOCS_SINCE
     *
     * @param \WP_REST_Request $request Full data about the request.
     *
     * @return \WP_REST_Response|WP_Error
     */
    public function get_item( $request ) {
        $table_check = $this->check_table_exists();
        if ( is_wp_error( $table_check ) ) {
            return $table_check;
        }

        global $wpdb;

        $table_name = $wpdb->prefix . 'wedocs_messages';
        $id         = (int) $request['id'];

        $message = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM $table_name WHERE id = %d", $id ) );

        if ( ! $message ) {
            return new WP_Error(
                'rest_message_not_found',
                __( 'Message not found.', 'wedocs' ),
                array( 'status' => 404 )
            );
        }

        return rest_ensure_response( $message );
    }

    /**
     * Delete a single message by ID.
     *
     * @since WEDOCS_SINCE
     *
     * @param \WP_REST_Request $request Full data about the request.
     *
     * @return \WP_REST_Response|WP_Error
     */
    public function delete_item( $request ) {
        $table_check = $this->check_table_exists();
        if ( is_wp_error( $table_check ) ) {
            return $table_check;
        }

        global $wpdb;

        $table_name = $wpdb->prefix . 'wedocs_messages';
        $id         = (int) $request['id'];

        $deleted = $wpdb->delete( $table_name, array( 'id' => $id ), array( '%d' ) );

        if ( ! $deleted ) {
            return new WP_Error(
                'rest_message_not_found',
                __( 'Message not found.', 'wedocs' ),
                array( 'status' => 404 )
            );
        }

        return rest_ensure_response( array(
            'success' => true,
            'message' => __( 'Message deleted successfully.', 'wedocs' ),
        ) );
    }
}
