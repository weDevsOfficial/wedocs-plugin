<?php

namespace WeDevs\WeDocs\API;

use WP_REST_Server;

class UpgraderApi extends \WP_REST_Controller {

    /**
     * Post Type Base.
     *
     * @since 2.0.0
     *
     * @var string
     */
    protected $base = 'docs/upgrade';

    /**
     * WP Version Number.
     *
     * @since 2.0.0
     *
     * @var string
     */
    protected $version = '2';

    /**
     * WP Version Slug.
     *
     * @since 2.0.0
     *
     * @var string
     */
    protected $namespace = 'wp/v';

    /**
     * Parent API class.
     *
     * @since 2.0.0
     *
     * @var \WeDevs\WeDocs\API
     */
    protected $api;

    /**
     * Initialize the class
     *
     * @since 2.0.0
     *
     * @return void
     */
    public function __construct( $api ) {
        $this->api = $api;
    }

    /**
     * Register the API
     *
     * @since 2.0.0
     *
     * @return void
     */
    public function register_api() {
        register_rest_route( $this->namespace . $this->version, '/' . $this->base,
            array(
                array(
                    'methods'             => WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_items' ),
                    'permission_callback' => array( $this, 'get_items_permissions_check' ),
                ),
                array(
                    'methods'             => WP_REST_Server::CREATABLE,
                    'callback'            => array( $this, 'create_item' ),
                    'permission_callback' => array( $this, 'create_items_permissions_check' ),
                ),
            )
        );

        register_rest_route( $this->namespace . $this->version, '/' . $this->base . '/done',
            array(
                array(
                    'methods'             => WP_REST_Server::CREATABLE,
                    'callback'            => array( $this, 'handle_upgrades_done' ),
                    'permission_callback' => array( $this, 'create_items_permissions_check' ),
                ),
            )
        );
    }

    /**
     * Check upgrade data getting permission.
     *
     * @since 2.0.0
     *
     * @param \WP_REST_Request $request
     *
     * @return bool|\WP_Error
     */
    public function get_items_permissions_check( $request ) {
        if ( current_user_can( 'read' ) ) {
            return true;
        }

        return new \WP_Error( 'wedocs_permission_failure', __( "You don't have permission to get upgrader data", 'wedocs' ) );
    }

    /**
     * Collect upgrader data.
     *
     * @since 2.0.0
     *
     * @param \WP_REST_Request $request
     *
     * @return mixed
     */
    public function get_items( $request ) {
        $need_upgrade = wedocs()->upgrader->calculate()->need_upgrade();
        $runner_info  = get_option( 'wedocs_upgrader_runner' );

        return rest_ensure_response(
            array(
                'status'       => $runner_info,
                'need_upgrade' => $need_upgrade,
            )
        );
    }

    /**
     * Check upgrade data writing permission.
     *
     * @since 2.0.0
     *
     * @return bool|\WP_Error
     */
    public function create_items_permissions_check() {
        if ( ! is_user_logged_in() ) {
            return new \WP_Error( 'rest_invalid_authenication', __( 'Need to be an authenticate user', 'wedocs' ) );
        }

        if ( ! current_user_can( 'manage_options' ) ) {
            return new \WP_Error( 'rest_invalid_permission', __( 'Need to be an administrator user', 'wedocs' ) );
        }

        return true;
    }

    /**
     * Handle upgrader data.
     *
     * @since 2.0.0
     *
     * @param \WP_REST_Request $request
     *
     * @return mixed
     */
    public function create_item( $request ) {
        // Run wedocs db upgrade scheduler.
        as_enqueue_async_action( 'wedocs_upgrader_runner', array(), 'wedocs_upgrader' );
        update_option( 'wedocs_upgrader_runner', 'running' );

        return rest_ensure_response( array( 'message' => __( 'Processing Upgrade in the background.', 'wedocs' ) ) );
    }

    /**
     * Handle upgrades running complete action.
     *
     * @since 2.0.0
     *
     * @return \WP_Error|\WP_HTTP_Response|\WP_REST_Response
     */
    public function handle_upgrades_done() {
        $is_update = update_option( 'wedocs_upgrader_runner', 'close' );
        return rest_ensure_response( $is_update );
    }
}
