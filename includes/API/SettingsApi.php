<?php

namespace WeDevs\WeDocs\API;

use WP_Error;
use WP_REST_Server;
use WP_REST_Controller;

class SettingsApi extends \WP_REST_Controller {

    /**
     * Post Type Base
     *
     * @var string
     */
    protected $base = 'docs/settings';

    /**
     * WP Version Number
     *
     * @var string
     */
    protected $version = '2';

    /**
     * WP Version Slug
     *
     * @var string
     */
    protected $namespace = 'wp/v';

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
        $this->api = $api;
    }

    /**
     * Register the API
     *
     * @return void
     */
    public function register_api() {
        register_rest_route( $this->namespace . $this->version, '/' . $this->base, array(
            array(
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => array( $this, 'get_items' ),
                'permission_callback' => array( $this, 'get_items_permissions_check' ),
//                'args'                => array(
//                    'data' => array(
//                        'type'        => 'string',
////                        'required'    => true,
//                        'description' => esc_html__( 'Settings value', 'wedocs' ),
//                    ),
//                    'datab' => array(
//                        'type'        => 'string',
//                        'required'    => true,
//                        'description' => esc_html__( 'Settings value', 'wedocs' ),
//                    ),
//                ),
            ),
            array(
                'methods'             => WP_REST_Server::CREATABLE,
                'callback'            => array( $this, 'create_item' ),
                'permission_callback' => array( $this, 'create_item_permissions_check' ),
                'args'                => array(
                    'settings' => array(
                        'type'        => 'object',
//                        'required'    => true,
                        'description' => esc_html__( 'Settings value', 'wedocs' ),
                        'properties'  => array(
                            'name' => array(
                                'type' => 'string',
                            ),
                        ),
                    ),
                    'upgrade'  => array(
                        'type'        => 'string',
                        'description' => esc_html__( 'Upgrader version', 'wedocs' ),
                    ),
                ),
            ),
        ) );
    }

    /**
     * Check settings data getting permission.
     *
     * @param \WP_REST_Request $request
     *
     * @return bool|\WP_Error
     */
    public function get_items_permissions_check( $request ) {
        if ( empty( $request->get_param( 'data' ) ) ) {
            return new \WP_Error( 'rest_doc_invalid_arg', __( 'No settings request given', 'wedocs' ) );
        }

        if ( current_user_can( 'read' ) ) {
            return true;
        }

        return new \WP_Error( 'wedocs_permission_failure', __( "You don't have permission to get settings data", 'wedocs' ) );
    }

    /**
     * Check settings data creation permission.
     *
     * @param \WP_REST_Request $request
     *
     * @return bool|WP_Error
     */
    public function create_item_permissions_check( $request ) {
        if ( ! is_user_logged_in() ) {
            return new \WP_Error( 'rest_invalid_authenication', __( 'Need to be an authenticate user', 'wedocs' ) );
        }

        if ( empty( $request->get_param( 'settings' ) ) && empty( $request->get_param( 'upgrade' ) ) ) {
            return new \WP_Error( 'rest_invalid_settings_request', __( 'No settings request found', 'wedocs' ) );
        }

        return true;
    }

    /**
     * Collect settings data.
     *
     * @param \WP_REST_Request $request
     *
     * @return mixed
     */
//    public function get_items( $request ) {
//        $value    = array();
//        $get_data = $request->get_param( 'data' );
//
//        if ( 'wedocs_settings' === $get_data ) {
//            $value = (array) wedocs_get_option( 'wedocs_settings', $value );
//        }
//
//        // Set default value if general data not found.
//        if ( empty( $value[ 'general' ] ) ) {
//            $value[ 'general' ] = [
//                'print'     => wedocs_get_general_settings( 'print', 'on' ),
//                'email'     => wedocs_get_general_settings( 'email', 'on' ),
//                'helpful'   => wedocs_get_general_settings( 'helpful', 'on' ),
//                'comments'  => wedocs_get_general_settings( 'comments', 'on' ),
//                'email_to'  => wedocs_get_general_settings( 'email_to' ),
//                'docs_home' => wedocs_get_general_settings( 'docs_home' ),
//            ];
//
//            unset( $value[0] );
//            unset( $value[ 'print' ] );
//            unset( $value[ 'email' ] );
//            unset( $value[ 'helpful' ] );
//            unset( $value[ 'comments' ] );
//            unset( $value[ 'email_to' ] );
//            unset( $value[ 'docs_home' ] );
//
//            update_option( 'wedocs_settings', $value );
//        }
//
//        return rest_ensure_response( $value );
//    }

    public function get_items( $request ) {
        $get_data = $request->get_param( 'data' );


//        $value = (array) wedocs_get_option( 'wedocs_settings', $value );
//        $value    = array();
//        $get_data = $request->get_param( 'data' );
//
        if ( 'wedocs_settings' === $get_data ) {
            $value = wedocs_get_option( 'wedocs_settings', [] );
        } elseif ( 'wedocs_version' === $get_data ) {
            $value = get_option( 'wedocs_version', '1.7.1' );
        } else {
            $value = get_option( 'wedocs_upgrade_version', '2.0.0' );
        }

//        if ( 'wedocs_upgrade' === $get_data ) {
//            $value = wedocs_get_option( 'wedocs_upgrade_version', '2.0' );
//        }
//
//        // Set default value if general data not found.
//        if ( empty( $value[ 'general' ] ) ) {
//            $value[ 'general' ] = [
//                'print'     => wedocs_get_general_settings( 'print', 'on' ),
//                'email'     => wedocs_get_general_settings( 'email', 'on' ),
//                'helpful'   => wedocs_get_general_settings( 'helpful', 'on' ),
//                'comments'  => wedocs_get_general_settings( 'comments', 'on' ),
//                'email_to'  => wedocs_get_general_settings( 'email_to' ),
//                'docs_home' => wedocs_get_general_settings( 'docs_home' ),
//            ];
//
//            unset( $value[0] );
//            unset( $value[ 'print' ] );
//            unset( $value[ 'email' ] );
//            unset( $value[ 'helpful' ] );
//            unset( $value[ 'comments' ] );
//            unset( $value[ 'email_to' ] );
//            unset( $value[ 'docs_home' ] );

//            update_option( 'wedocs_settings', $value );
//        }
//
        return rest_ensure_response( $value );
    }

    /**
     * Create settings data.
     *
     * @param \WP_REST_Request $request
     *
     * @return mixed
     */
    public function create_item( $request ) {
        if ( ! empty( $request->get_param( 'settings' ) ) ) {
            $settings_data = $this->get_items( $request );
        } else {
            $settings_data = $request->get_param( 'upgrade' );
            $this->upgrade_wedocs_settings( $settings_data );
        }

//        update_option( 'wedocs_settings', $value );
        return rest_ensure_response( $settings_data );
    }

    public function upgrade_wedocs_settings( $version ) {
        $value = get_option( 'wedocs_settings', [] );

        // Check if data already updated.
        if ( empty( $value[ 'general' ] ) ) {
            // Set default value if general data not found.
            $value[ 'general' ] = [
                'print'     => wedocs_get_general_settings( 'print', 'on' ),
                'email'     => wedocs_get_general_settings( 'email', 'on' ),
                'helpful'   => wedocs_get_general_settings( 'helpful', 'on' ),
                'comments'  => wedocs_get_general_settings( 'comments', 'on' ),
                'email_to'  => wedocs_get_general_settings( 'email_to' ),
                'docs_home' => wedocs_get_general_settings( 'docs_home' ),
            ];

            // Remove all unnecessary data.
            unset( $value[ 'print' ] );
            unset( $value[ 'email' ] );
            unset( $value[ 'helpful' ] );
            unset( $value[ 'comments' ] );
            unset( $value[ 'email_to' ] );
            unset( $value[ 'docs_home' ] );
        }

        // Update settings data with plugin version.
        update_option( 'wedocs_settings', $value );
        update_option( 'wedocs_version', $version );
    }

//    public function create_item( $request ) {
//        $value           = $request->get_param( 'settings' );
//        $wedocs_settings = $this->get_items( $request );
//
//        update_option( 'wedocs_settings', $value );
//        return rest_ensure_response( $wedocs_settings );
//    }
}
