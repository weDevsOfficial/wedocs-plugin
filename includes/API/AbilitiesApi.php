<?php

namespace WeDevs\WeDocs\API;

use WP_REST_Server;

/**
 * Abilities REST API
 *
 * Exposes the current user's weDocs abilities via the REST API. Designed for
 * MCP clients and other integrations that need to discover what actions a user
 * may perform *before* attempting them.
 *
 * ## Endpoints
 *
 * | Method | URL                               | Description                        |
 * |--------|-----------------------------------|------------------------------------|
 * | GET    | /wp/v2/docs/abilities             | Global abilities for current user  |
 * | GET    | /wp/v2/docs/{id}/abilities        | Per-doc abilities for current user |
 *
 * Both endpoints are public (no authentication required) and return `false` for
 * every ability when called without credentials. This allows unauthenticated
 * clients to still discover which actions would be permitted once authenticated.
 *
 * @since 2.2.2
 */
class AbilitiesApi extends \WP_REST_Controller {

    /**
     * REST namespace.
     *
     * @since 2.2.2
     *
     * @var string
     */
    protected $namespace = 'wp/v2';

    /**
     * REST base (matches the docs rest_base used by the main API class).
     *
     * @since 2.2.2
     *
     * @var string
     */
    protected $rest_base = 'docs';

    /**
     * Register the abilities REST routes.
     *
     * @since 2.2.2
     *
     * @return void
     */
    public function register_routes() {
        // Global abilities: GET /wp/v2/docs/abilities
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/abilities',
            [
                [
                    'methods'             => WP_REST_Server::READABLE,
                    'callback'            => [ $this, 'get_global_abilities' ],
                    'permission_callback' => '__return_true',
                ],
                'schema' => [ $this, 'get_global_abilities_schema' ],
            ]
        );

        // Per-doc abilities: GET /wp/v2/docs/{id}/abilities
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/(?P<id>[\d]+)/abilities',
            [
                [
                    'methods'             => WP_REST_Server::READABLE,
                    'callback'            => [ $this, 'get_doc_abilities' ],
                    'permission_callback' => '__return_true',
                    'args'                => [
                        'id' => [
                            'description'       => __( 'Unique identifier for the doc.', 'wedocs' ),
                            'type'              => 'integer',
                            'required'          => true,
                            'sanitize_callback' => 'absint',
                            'validate_callback' => 'rest_validate_request_arg',
                        ],
                    ],
                ],
                'schema' => [ $this, 'get_doc_abilities_schema' ],
            ]
        );
    }

    /**
     * Return current user's global weDocs abilities.
     *
     * @since 2.2.2
     *
     * @return \WP_REST_Response
     */
    public function get_global_abilities() {
        return rest_ensure_response( AbilitiesPolicy::global_abilities() );
    }

    /**
     * Return current user's abilities for a specific doc post.
     *
     * @since 2.2.2
     *
     * @param \WP_REST_Request $request
     *
     * @return \WP_REST_Response|\WP_Error
     */
    public function get_doc_abilities( $request ) {
        $abilities = AbilitiesPolicy::doc_abilities( (int) $request['id'] );

        if ( is_wp_error( $abilities ) ) {
            return $abilities;
        }

        return rest_ensure_response( $abilities );
    }

    /**
     * JSON Schema for the global abilities response.
     *
     * @since 2.2.2
     *
     * @return array
     */
    public function get_global_abilities_schema() {
        return [
            '$schema'    => 'http://json-schema.org/draft-04/schema#',
            'title'      => 'wedocs-global-abilities',
            'type'       => 'object',
            'properties' => [
                'docs.read'          => [
                    'type'        => 'boolean',
                    'description' => __( 'Can read published docs (always true).', 'wedocs' ),
                ],
                'docs.read_private'  => [
                    'type'        => 'boolean',
                    'description' => __( 'Can read private docs.', 'wedocs' ),
                ],
                'docs.create'        => [
                    'type'        => 'boolean',
                    'description' => __( 'Can create new docs.', 'wedocs' ),
                ],
                'docs.edit'          => [
                    'type'        => 'boolean',
                    'description' => __( 'Can edit own docs.', 'wedocs' ),
                ],
                'docs.edit_others'   => [
                    'type'        => 'boolean',
                    'description' => __( 'Can edit docs authored by other users.', 'wedocs' ),
                ],
                'docs.delete'        => [
                    'type'        => 'boolean',
                    'description' => __( 'Can delete docs.', 'wedocs' ),
                ],
                'docs.publish'       => [
                    'type'        => 'boolean',
                    'description' => __( 'Can publish docs.', 'wedocs' ),
                ],
                'docs.sort'          => [
                    'type'        => 'boolean',
                    'description' => __( 'Can reorder / sort docs.', 'wedocs' ),
                ],
                'docs.search'        => [
                    'type'        => 'boolean',
                    'description' => __( 'Can search published docs (always true).', 'wedocs' ),
                ],
                'settings.read'      => [
                    'type'        => 'boolean',
                    'description' => __( 'Can read plugin settings.', 'wedocs' ),
                ],
                'settings.write'     => [
                    'type'        => 'boolean',
                    'description' => __( 'Can update plugin settings.', 'wedocs' ),
                ],
                'ai.generate'        => [
                    'type'        => 'boolean',
                    'description' => __( 'Can generate AI-written documentation content.', 'wedocs' ),
                ],
                'ai.upload_image'    => [
                    'type'        => 'boolean',
                    'description' => __( 'Can upload images for AI vision analysis (Pro only).', 'wedocs' ),
                ],
                'ai.configure'       => [
                    'type'        => 'boolean',
                    'description' => __( 'Can configure AI provider credentials.', 'wedocs' ),
                ],
                'summary.read'       => [
                    'type'        => 'boolean',
                    'description' => __( 'Can read AI-generated summaries (always true).', 'wedocs' ),
                ],
                'summary.save'       => [
                    'type'        => 'boolean',
                    'description' => __( 'Can save AI summaries.', 'wedocs' ),
                ],
                'summary.delete'     => [
                    'type'        => 'boolean',
                    'description' => __( 'Can delete AI summaries.', 'wedocs' ),
                ],
                'summary.generate'   => [
                    'type'        => 'boolean',
                    'description' => __( 'Can trigger on-demand AI summary generation (always true).', 'wedocs' ),
                ],
                'notices.manage'     => [
                    'type'        => 'boolean',
                    'description' => __( 'Can view and dismiss admin promotional notices.', 'wedocs' ),
                ],
                'helpfulness.vote'   => [
                    'type'        => 'boolean',
                    'description' => __( 'Can cast helpful/not-helpful votes on docs (requires login).', 'wedocs' ),
                ],
                'feedback.submit'    => [
                    'type'        => 'boolean',
                    'description' => __( 'Can submit feedback on docs (always true).', 'wedocs' ),
                ],
                'contributors.read'  => [
                    'type'        => 'boolean',
                    'description' => __( 'Can read contributor data (always true).', 'wedocs' ),
                ],
                'pro_active'         => [
                    'type'        => 'boolean',
                    'description' => __( 'Whether weDocs Pro is active on this installation.', 'wedocs' ),
                ],
            ],
        ];
    }

    /**
     * JSON Schema for the per-doc abilities response.
     *
     * @since 2.2.2
     *
     * @return array
     */
    public function get_doc_abilities_schema() {
        return [
            '$schema'    => 'http://json-schema.org/draft-04/schema#',
            'title'      => 'wedocs-doc-abilities',
            'type'       => 'object',
            'properties' => [
                'read'             => [
                    'type'        => 'boolean',
                    'description' => __( 'Can read this doc (depends on post status).', 'wedocs' ),
                ],
                'edit'             => [
                    'type'        => 'boolean',
                    'description' => __( 'Can edit this doc.', 'wedocs' ),
                ],
                'delete'           => [
                    'type'        => 'boolean',
                    'description' => __( 'Can delete this doc.', 'wedocs' ),
                ],
                'publish'          => [
                    'type'        => 'boolean',
                    'description' => __( 'Can publish this doc.', 'wedocs' ),
                ],
                'summary.read'     => [
                    'type'        => 'boolean',
                    'description' => __( 'Can read the AI summary for this doc.', 'wedocs' ),
                ],
                'summary.save'     => [
                    'type'        => 'boolean',
                    'description' => __( 'Can save the AI summary for this doc.', 'wedocs' ),
                ],
                'summary.delete'   => [
                    'type'        => 'boolean',
                    'description' => __( 'Can delete the AI summary for this doc.', 'wedocs' ),
                ],
                'summary.generate' => [
                    'type'        => 'boolean',
                    'description' => __( 'Can trigger AI summary generation for this doc.', 'wedocs' ),
                ],
            ],
        ];
    }
}
