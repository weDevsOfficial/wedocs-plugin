<?php

namespace WeDevs\WeDocs\API;

use WP_Error;
use WP_REST_Server;

/**
 * Analytics REST API (free).
 *
 * Exposes a lightweight overview of doc views, searches and helpful votes for
 * the in-dashboard summary card. Rich, filterable reports live in weDocs Pro.
 *
 * @since 2.3.0
 */
class AnalyticsApi extends \WP_REST_Controller {

    /**
     * Route base.
     *
     * @var string
     */
    protected $base = 'docs/analytics';

    /**
     * API version.
     *
     * @var string
     */
    protected $version = '2';

    /**
     * Namespace prefix.
     *
     * @var string
     */
    protected $namespace = 'wp/v';

    /**
     * Parent API class.
     *
     * @var \WeDevs\WeDocs\API
     */
    protected $api;

    /**
     * Constructor.
     *
     * @param \WeDevs\WeDocs\API $api
     */
    public function __construct( $api ) {
        $this->api = $api;
    }

    /**
     * Register routes.
     *
     * @return void
     */
    public function register_api() {
        register_rest_route( $this->namespace . $this->version, '/' . $this->base . '/overview', [
            [
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => [ $this, 'get_overview' ],
                'permission_callback' => [ $this, 'permissions_check' ],
                'args'                => [
                    'days' => [
                        'type'              => 'integer',
                        'default'           => 30,
                        'sanitize_callback' => 'absint',
                    ],
                ],
            ],
        ] );

        register_rest_route( $this->namespace . $this->version, '/' . $this->base . '/top-docs', [
            [
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => [ $this, 'get_top_docs' ],
                'permission_callback' => [ $this, 'permissions_check' ],
                'args'                => [
                    'days'  => [
                        'type'              => 'integer',
                        'default'           => 30,
                        'sanitize_callback' => 'absint',
                    ],
                    'limit' => [
                        'type'              => 'integer',
                        'default'           => 10,
                        'sanitize_callback' => 'absint',
                    ],
                ],
            ],
        ] );
    }

    /**
     * Permission check — settings managers only.
     *
     * @return bool
     */
    public function permissions_check() {
        return current_user_can( 'manage_options' );
    }

    /**
     * Overview payload: totals + top docs.
     *
     * @param \WP_REST_Request $request
     *
     * @return \WP_REST_Response
     */
    public function get_overview( $request ) {
        $days      = absint( $request['days'] ) ?: 30;
        $analytics = wedocs()->analytics;

        return rest_ensure_response( [
            'range_days'      => $days,
            'total_views'     => $analytics->total_views( $days ),
            'total_views_all' => $analytics->total_views(),
            'total_searches'  => $analytics->total_searches( $days ),
            'top_docs'        => $analytics->get_top_docs( 10, $days ),
        ] );
    }

    /**
     * Top docs list.
     *
     * @param \WP_REST_Request $request
     *
     * @return \WP_REST_Response
     */
    public function get_top_docs( $request ) {
        $days  = absint( $request['days'] ) ?: 30;
        $limit = absint( $request['limit'] ) ?: 10;

        return rest_ensure_response( wedocs()->analytics->get_top_docs( $limit, $days ) );
    }
}
