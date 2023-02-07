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
                'args'                => array(
                    'data' => array(
                        'type'        => 'string',
                        'required'    => true,
                        'description' => esc_html__( 'Settings value', 'wedocs' ),
                    ),
                ),
            ),
            array(
                'methods'             => WP_REST_Server::CREATABLE,
                'callback'            => array( $this, 'create_item' ),
                'permission_callback' => array( $this, 'create_item_permissions_check' ),
                'args'                => array(
                    'settings' => array(
                        'type'        => 'object',
                        'required'    => true,
                        'description' => esc_html__( 'Settings value', 'wedocs' ),
                        'properties' => array(
                            'name'  => array(
                                'type' => 'string',
                            ),
                        ),
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

        if ( empty( $request->get_param( 'settings' ) ) ) {
            return new \WP_Error( 'rest_doc_invalid_settings', __( 'No settings data given', 'wedocs' ) );
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
    public function get_items( $request ) {
        $value    = array();
        $get_data = $request->get_param( 'data' );

        if ( 'wedocs_settings' === $get_data ) {
            $value = get_option( 'wedocs_settings', $value );
        }

        if ( 'user_roles' === $get_data ) {
            $user_roles_with_caps = get_option( 'wp_user_roles', $value );
            $user_roles           = array_keys( $user_roles_with_caps );

            foreach ( $user_roles as $role ) {
                $value[ $role ] = ucfirst( $role );
            }
        }

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
        $value           = $request->get_param( 'settings' );
        $wedocs_settings = $this->get_items( $request );

        update_option( 'wedocs_settings', $value );
        return rest_ensure_response( $wedocs_settings );
    }
}
