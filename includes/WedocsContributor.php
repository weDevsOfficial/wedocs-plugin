<?php

namespace WeDevs\WeDocs;

/**
 * Class to handle wedocs contributor related
 * tasks.
*/
class WedocsContributor {
	/**
	 * Check and add docs contributors.
	 *
	 * @since 2.1.12
	 *
	 * @return void
	 */
	public function check_and_add_docs_contributors() {
		$contributors_updated = get_option( 'wedocs_contributors_added', null );

		if ( null === $contributors_updated ) {
			$this->add_article_contributors();
			$this->add_documentation_contributors();

			update_option( 'wedocs_contributors_added', true );
		}
	}

	/**
	 * Add wedocs article contributors list.
	 *
	 * @since 2.1.12
	 *
	 * @return void
	 */
	public function add_article_contributors() {
		$args = array(
			'post_type'      => 'docs',
			'post_status'    => array( 'publish', 'private' ),
			'posts_per_page' => -1,
		);

		$documentations = get_posts( $args );

		foreach ( $documentations as $documentation ) {
			$contributors = get_post_meta( $documentation->ID, 'wedocs_contributors', true );
			if ( empty( $contributors ) && 0 !== $documentation->post_parent ) {
				update_post_meta( $documentation->ID, 'wedocs_contributors', array( $documentation->post_author ) );
			}
		}
	}

	/**
	 * Add wedocs documentation contributors list.
	 *
	 * @since 2.1.12
	 *
	 * @return void
	 */
	public function add_documentation_contributors() {
		$args = array(
			'post_type'      => 'docs',
			'post_status'    => array( 'publish', 'private' ),
			'post_parent'    => 0,
			'posts_per_page' => -1,
		);

		$documentations = get_posts( $args );

		foreach ( $documentations as $documentation ) {
			$contributors = get_post_meta( $documentation->ID, 'wedocs_contributors', true );
			if ( empty( $contributors ) ) {
				$article_ids  = wedocs_get_documentation_children_by_type( $documentation->ID );
				$contributors = wedocs_get_documentation_contributors( $documentation->post_author, $article_ids );
				update_post_meta( $documentation->ID, 'wedocs_contributors', (array) $contributors );
			}
		}
	}
}
