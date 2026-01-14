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
                    'permission_callback' => array( $this, 'get_items_permissions_check' ),
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
     * Check settings data read permission.
     *
     * @since 2.1.16
     *
     * @param \WP_REST_Request $request
     *
     * @return bool|WP_Error
     */
    public function get_items_permissions_check( $request ) {
        if ( ! current_user_can( 'manage_options' ) ) {
            return new \WP_Error( 'rest_forbidden', __( 'Sorry, you are not allowed to do that.', 'wedocs' ), array( 'status' => rest_authorization_required_code() ) );
        }

        return true;
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
        if ( ! current_user_can( 'manage_options' ) ) {
            return new \WP_Error( 'rest_forbidden', __( 'Sorry, you are not allowed to do that.', 'wedocs' ), array( 'status' => rest_authorization_required_code() ) );
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
        
        // Sanitize AI settings if present
        if ( isset( $settings_data['ai'] ) ) {
            $settings_data['ai'] = $this->sanitize_ai_settings( $settings_data['ai'] );
        }
        
        $settings_data_filtered = apply_filters( 'wedocs_settings_data', $settings_data );

        // Update wedocs_settings via docs store.
        update_option( 'wedocs_settings', $settings_data_filtered );
        $response = apply_filters( 'wedocs_settings_data_rest_response', $settings_data_filtered, $settings_data );
        do_action( 'wedocs_settings_data_updated', $settings_data_filtered );

        return new \WP_REST_Response( rest_ensure_response( $response ), 200 );
    }

    /**
     * Sanitize AI settings data.
     *
     * @since 2.1.15
     *
     * @param array $ai_settings
     *
     * @return array
     */
    private function sanitize_ai_settings( $ai_settings ) {
        $sanitized = [];

        // Get allowed providers from configuration
        $provider_configs = wedocs_get_ai_provider_configs();
        $allowed_providers = array_keys( $provider_configs );

        // Sanitize default provider
        if ( isset( $ai_settings['default_provider'] ) ) {
            $sanitized['default_provider'] = in_array( $ai_settings['default_provider'], $allowed_providers ) 
                ? sanitize_text_field( $ai_settings['default_provider'] ) 
                : 'openai';
        }

        // Sanitize provider configurations
        if ( isset( $ai_settings['providers'] ) && is_array( $ai_settings['providers'] ) ) {
            $sanitized['providers'] = array();
            
            foreach ( $ai_settings['providers'] as $provider => $config ) {
                if ( in_array( $provider, $allowed_providers ) ) {
                    $sanitized['providers'][ $provider ] = array();
                    
                    // Sanitize API key
                    if ( isset( $config['api_key'] ) && ! empty( $config['api_key'] ) ) {
                        $sanitized['providers'][ $provider ]['api_key'] = sanitize_text_field( $config['api_key'] );
                    }
                    
                    
                    // Sanitize selected model
                    if ( isset( $config['selected_model'] ) ) {
                        $sanitized['providers'][ $provider ]['selected_model'] = sanitize_text_field( $config['selected_model'] );
                    }
                    
                    // Sanitize available models
                    if ( isset( $config['models'] ) && is_array( $config['models'] ) ) {
                        $sanitized['providers'][ $provider ]['models'] = array_map( 'sanitize_text_field', $config['models'] );
                    }
                }
            }
        }


        return $sanitized;
    }

}
