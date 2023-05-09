<?php

namespace WeDevs\WeDocs\API;

use WeDevs\WeDocs\Upgrader\Upgrader;
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

        /**
         * @var $upgrader Upgrader
         */
        $upgrader = wedocs()->upgrader;

        return rest_ensure_response( $upgrader->calculate()->need_upgrade() );
    }

    /**
     * Check upgrade data writing permission.
     *
     * @since 2.0.0
     *
     * @param \WP_REST_Request $request
     *
     * @return bool|\WP_Error
     */
    public function create_items_permissions_check( $request ) {
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
        as_enqueue_async_action( 'wedocs_upgrader_runner', array(), 'wedocs_upgrader' );
        return rest_ensure_response( array( 'message' => __( 'Processing Upgrade in the background.', 'wedocs' ) ) );
    }

    /**
     * Update wedocs settings data.
     *
     * @since 2.0.0
     *
     * @param string $updated_version
     *
     * @return void
     */
    public function upgrade_wedocs_settings( $updated_version ) {
        $value = get_option( 'wedocs_settings', [] );

        // Check if data already updated.
        if ( empty( $value['general'] ) ) {
            // Set default value if general data not found.
            $value['general'] = [
                'print'     => wedocs_get_general_settings( 'print', 'on' ),
                'email'     => wedocs_get_general_settings( 'email', 'on' ),
                'helpful'   => wedocs_get_general_settings( 'helpful', 'on' ),
                'comments'  => wedocs_get_general_settings( 'comments', 'on' ),
                'email_to'  => wedocs_get_general_settings( 'email_to' ),
                'docs_home' => wedocs_get_general_settings( 'docs_home' ),
            ];

            // Remove all unnecessary data.
            unset( $value['print'] );
            unset( $value['email'] );
            unset( $value['helpful'] );
            unset( $value['comments'] );
            unset( $value['email_to'] );
            unset( $value['docs_home'] );
        }

        // Update settings data with plugin version.
        update_option( 'wedocs_settings', $value );
        update_option( 'wedocs_version', $updated_version );
    }
}
