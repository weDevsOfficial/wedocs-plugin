<?php
// DESCRIPTION: Single Doc template class for displaying individual documentation articles
// DESCRIPTION: Integrates with WordPress block template system for CPT singles

namespace WeDevs\WeDocs\Templates;

/**
 * SingleDocTemplate class.
 *
 * Handles the template for single documentation articles.
 * This template is used when viewing a single 'docs' post type.
 * Follows WooCommerce's SingleProductTemplate pattern for CPT block templates.
 */
class SingleDocTemplate extends AbstractTemplate {

	/**
	 * The slug of the template.
	 *
	 * WordPress looks for templates named 'single-{posttype}' for custom post types.
	 * For the 'docs' post type, this should be 'single-docs'.
	 *
	 * @var string
	 */
	const SLUG = 'single-docs';

	/**
	 * Initialization method.
	 * Adds hooks for template-specific functionality.
	 *
	 * @return void
	 */
	public function init() {
		// Hook into template_redirect to handle block template rendering
		add_action( 'template_redirect', [ $this, 'render_block_template' ] );
		// Hook into get_block_templates to modify template content when needed
		add_filter( 'get_block_templates', [ $this, 'update_single_doc_content' ], 11, 3 );
	}

	/**
	 * Run template-specific logic when the query matches this template.
	 *
	 * @return void
	 */
	public function render_block_template() {
		if ( ! is_embed() && is_singular( 'docs' ) ) {
			global $post;

			$valid_slugs = array( self::SLUG );
			$single_doc_slug = 'docs' === $post->post_type && $post->post_name ? 'single-docs-' . $post->post_name : '';
			if ( $single_doc_slug ) {
				$valid_slugs[] = 'single-docs-' . $post->post_name;
			}

			$templates = get_block_templates( array( 'slug__in' => $valid_slugs ) );

			if ( count( $templates ) === 0 ) {
				return;
			}

			// Use the first template by default
			$template = reset( $templates );

			// Check if there is a template matching the slug `single-docs-{post_name}`
			if ( count( $valid_slugs ) > 1 && count( $templates ) > 1 ) {
				foreach ( $templates as $t ) {
					if ( $single_doc_slug === $t->slug ) {
						$template = $t;
						break;
					}
				}
			}
		}
	}

	/**
	 * Add the block template objects to be used and modify content if needed.
	 *
	 * @param array $query_result Array of template objects.
	 * @param array $query Optional. Query arguments.
	 * @param string $template_type Optional. Template type (wp_template or wp_template_part).
	 * @return array
	 */
	public function update_single_doc_content( $query_result, $query = array(), $template_type = 'wp_template' ) {
		if ( 'wp_template' !== $template_type ) {
			return $query_result;
		}

		$query_result = array_map(
			function ( $template ) {
				if ( strpos( $template->slug, self::SLUG ) === 0 ) {
					// Only modify on frontend, not in admin or REST API
					if ( ! is_admin() && ! ( defined( 'REST_REQUEST' ) && REST_REQUEST ) ) {
						// Optionally add custom body classes or modify content
						add_filter(
							'body_class',
							function ( $classes ) {
								$classes[] = 'single-docs';
								$classes[] = 'wedocs-single';
								return $classes;
							}
						);
					}
				}
				return $template;
			},
			$query_result
		);

		return $query_result;
	}

	/**
	 * Returns the title of the template.
	 *
	 * @return string
	 */
	public function get_template_title() {
		return __( 'Single Documentation', 'wedocs' );
	}

	/**
	 * Returns the description of the template.
	 *
	 * @return string
	 */
	public function get_template_description() {
		return __( 'Template for displaying single documentation articles with sidebar navigation, breadcrumbs, and helpful feedback features.', 'wedocs' );
	}
}
