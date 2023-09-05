<?php

namespace WeDevs\WeDocs\API;

use WP_Error;
use WP_REST_Server;

class SettingsApi extends \WP_REST_Controller {

    /**
     * Post Type Base.
     *
     * @since 2.0.0
     *
     * @var string
     */
    protected $base = 'docs/settings';

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
     * Initialize the class.
     *
     * @since 2.0.0
     *
     * @return void
     */
    public function __construct( $api ) {
        $this->api = $api;
    }

    /**
     * Register settings API.
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
                    'permission_callback' => '__return_true',
                ),
                array(
                    'methods'             => WP_REST_Server::CREATABLE,
                    'callback'            => array( $this, 'create_item' ),
                    'permission_callback' => array( $this, 'create_item_permissions_check' ),
                    'args'                => array(
                        'settings' => array(
                            'type'        => 'object',
                            'description' => esc_html__( 'Settings value', 'wedocs' ),
                            'properties'  => array(
                                'name' => array(
                                    'type' => 'string',
                                ),
                            ),
                        ),
                        'upgrade'  => array(
                            'type'        => 'boolean',
                            'description' => esc_html__( 'Upgrader version', 'wedocs' ),
                        ),
                    ),
                ),
            )
        );

        register_rest_route( $this->namespace . $this->version, '/' . $this->base . '/turnstile-site-key',
            array(
                array(
                    'methods'             => WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_turnstile_site_key' ),
                    'permission_callback' => '__return_true',
                ),
            )
        );
    }

    /**
     * Check settings data creation permission.
     *
     * @since 2.0.0
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
            return new \WP_Error( 'rest_invalid_settings_request', __( 'No settings request found', 'wedocs' ) );
        }

        return true;
    }

    /**
     * Collect settings data.
     *
     * @since 2.0.0
     *
     * @param \WP_REST_Request $request
     *
     * @return mixed
     */
    public function get_items( $request ) {
        $value    = array();
        $get_data = $request->get_param( 'data' );

        if ( 'wedocs_settings' === $get_data ) {
            $value = get_option( 'wedocs_settings', array() );
        }

        return rest_ensure_response( $value );
    }

    /**
     * Collect turnstile site key settings data.
     *
     * @since 2.0.0
     *
     * @return mixed
     */
    public function get_turnstile_site_key() {
        $assistant_settings = wedocs_get_option( 'assistant', 'wedocs_settings', '' );
        $turnstile_site_key = ! empty( $assistant_settings[ 'message' ][ 'turnstile_site_key' ] ) ? esc_html( $assistant_settings[ 'message' ][ 'turnstile_site_key' ] ) : '';

        return rest_ensure_response( $turnstile_site_key );
    }

    /**
     * Create settings data.
     *
     * @since 2.0.0
     *
     * @param \WP_REST_Request $request
     *
     * @return mixed
     */
    public function create_item( $request ) {
        if ( empty( $request->get_param( 'settings' ) ) ) {
            return array();
        }

        $settings_data = $request->get_param( 'settings' );
        $settings_data_filtered = apply_filters( 'wedocs_settings_data', $settings_data );

        // Update wedocs_settings via docs store.
        update_option( 'wedocs_settings', $settings_data_filtered );
        $response = apply_filters( 'wedocs_settings_data_rest_response', $settings_data_filtered, $settings_data );
        do_action( 'wedocs_settings_data_updated', $settings_data_filtered );

        return new \WP_REST_Response( rest_ensure_response( $response ), 200 );
    }
}
