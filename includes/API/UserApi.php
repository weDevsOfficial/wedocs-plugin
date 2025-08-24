<?php

namespace WeDevs\WeDocs\API;

use WP_REST_Server;

/**
 * API Class
 */
class UserApi {

	/**
	 * WP Version Number.
	 *
	 * @since 1.0.0
	 *
	 * @var string
	 */
	protected $version = '2';

	/**
	 * WP Version Slug.
	 *
	 * @since 1.0.0
	 *
	 * @var string
	 */
	protected $namespace = 'wp/v';

	/**
	 * Post Type Base.
	 *
	 * @since 1.0.0
	 *
	 * @var string
	 */
	protected $base = 'docs/users';

	/**
	 * Register the API
	 *
	 * @return void
	 */
	public function register_api() {
		register_rest_route(
			$this->namespace . $this->version,
			'/' . $this->base,
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_items' ),
					'permission_callback' => array( $this, 'get_items_permissions_check' ),
				),
			)
		);

		register_rest_route(
			$this->namespace . $this->version,
			'/' . $this->base . '/ids/',
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_user_docs' ),
					'permission_callback' => array( $this, 'get_items_permissions_check' ),
				),
			)
		);
	}

	/**
	 * Check settings data getting permission.
	 *
	 * @since 1.0.0
	 *
	 * @return bool|\WP_Error
	 */
	public function get_items_permissions_check() {
		if ( ! ( is_user_logged_in() || current_user_can( 'read' ) ) ) {
			return new \WP_Error( 'wedocs_permission_failure', __( "You don't have permission to get users data", 'wedocs-pro' ) );
		}

		return true;
	}

	/**
	 * Get users data.
	 *
	 * @since 1.0.0
	 *
	 * @return mixed
	 */
	public function get_items() {
		$value      = array();
		$user_roles = array_keys( wp_roles()->roles );

		// Make user roles array as key value pair.
		foreach ( $user_roles as $role ) {
			$value[ $role ] = ucfirst( $role );
		}

		return rest_ensure_response( $value );
	}

	/**
	 * Collect users data.
	 *
	 * @since 1.0.0
	 *
	 * @return mixed
	 */
	public function get_user_docs() {
		// Get user role form user id.
		$user_id    = get_current_user_id();
		$user_roles = get_user_by( 'id', $user_id )->roles;

		// Retrieve only parent docs.
		$parent_ids = get_posts(
			array(
				'fields'         => 'ids',
				'post_type'      => 'docs',
				'post_status'    => array( 'publish', 'private', 'draft' ),
				'post_parent'    => 0,
				'posts_per_page' => -1,
			)
		);

		$user_docs = array_filter(
			$parent_ids,
			function ( $parent_id ) use ( $user_roles ) {
				return $this->current_user_can_edit_doc( $parent_id, $user_roles );
			}
		);

		return rest_ensure_response( array_values( $user_docs ) );
	}

	/**
	 * Check if current user have access to edit documentation.
	 *
	 * @since 1.0.0
	 *
	 * @param int   $doc_id
	 * @param array $user_roles
	 *
	 * @return bool|void
	 */
	public function current_user_can_edit_doc( $doc_id, $user_roles ) {
		// Check if user role has access from wedocs settings.
		$get_role_settings = get_post_meta( $doc_id, 'wedocs_user_permission', true );
		if ( $get_role_settings !== 'custom' ) {
			$permitted_roles = wedocs_get_permission_settings( 'global_permission', array( 'administrator', 'editor' ) );
			return ! empty( array_intersect( $permitted_roles, $user_roles ) );
		}

		$doc_access_caps = get_post_meta( $doc_id, 'wedocs_access_role_capabilities', true );
		foreach ( $user_roles as $user_role ) {
			return ! empty( $doc_access_caps[ $user_role ] ) && $doc_access_caps[ $user_role ] === 'edit';
		}
	}
}
