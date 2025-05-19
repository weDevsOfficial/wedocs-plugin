<?php

namespace WeDevs\WeDocs;

/**
 * Class for various hooks.
 */
class Hooks {
	/**
	 * Initialize the class
	 */
	public function __construct() {
		add_action( 'save_post_docs', array( $this, 'save_documentation_contributors' ), 10, 2 );
	}

	/**
	 * Save documentation contributors id.
	 *
	 * @since 2.1.12
	 *
	 * @param int      $post_id Post id.
	 * @param \WP_Post $post    Post object.
	 *
	 * @return void|null
	 */
	public function save_documentation_contributors( $post_id, $post ) {
		// Check if this is a parent post.
		if ( 0 === $post->post_parent ) {
			$this->save_parent_contributors( $post );
			return;
		}

		// Check if this is a section post.
		$parent_id = wp_get_post_parent_id( $post->post_parent );

		if ( false === $parent_id ) {
			return;
		}

		$user_id      = get_current_user_id();
		$contributors = get_post_meta( $post_id, 'wedocs_contributors', true );
		$contributors = ! empty( $contributors ) ? $contributors : array();

		if ( ! in_array( $user_id, $contributors ) ) {
			array_push( $contributors, $user_id );
		}

		// Save the doc contributors meta.
		update_post_meta( $post_id, 'wedocs_contributors', (array) $contributors );
		wedocs_plugin_update_documentation_contributors( $post_id, $contributors );
	}

	/**
	 * Handle contributors data of parent documentation.
	 *
	 * @since 2.1.12
	 *
	 * @param \WP_Post $post WP Post object instance.
	 *
	 * @return void
	 */
	public function save_parent_contributors( $post ) {
		$article_ids  = wedocs_plugin_get_documentation_children_by_type( $post->ID );
		$contributors = wedocs_plugin_get_documentation_contributors( $post->post_author, $article_ids );

		update_post_meta( $post->ID, 'wedocs_contributors', (array) $contributors );
	}
}
