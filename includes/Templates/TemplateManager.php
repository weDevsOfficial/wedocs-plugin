<?php
// DESCRIPTION: Template Manager class for registering weDocs block templates
// DESCRIPTION: Handles initialization of all template classes and integrates with WordPress

namespace WeDevs\WeDocs\Templates;

/**
 * TemplateManager class.
 *
 * Manages the registration and initialization of all weDocs block templates.
 * This class serves as the central point for template system integration.
 * Follows WooCommerce's template registry pattern.
 */
class TemplateManager {

	/**
	 * The array of registered templates.
	 *
	 * @var \WeDevs\WeDocs\Templates\AbstractTemplate[]
	 */
	private $templates = [];

	/**
	 * Directory name for block templates.
	 *
	 * @var string
	 */
	const TEMPLATES_DIR_NAME = 'block-templates';

	/**
	 * weDocs plugin slug for template registration.
	 *
	 * @var string
	 */
	const PLUGIN_SLUG = 'wedocs';

	/**
	 * Class constructor.
	 */
	public function __construct() {
		add_action( 'init', [ $this, 'init' ], 10 );
	}

	/**
	 * Initialization method.
	 * Registers all templates and their corresponding block template files.
	 *
	 * @return void
	 */
	public function init() {
		// DEBUG: Log initialization
		error_log( '[weDocs TemplateManager] init() called' );
		error_log( '[weDocs TemplateManager] wp_is_block_theme: ' . ( function_exists( 'wp_is_block_theme' ) ? ( wp_is_block_theme() ? 'true' : 'false' ) : 'function not exists' ) );
		error_log( '[weDocs TemplateManager] current theme: ' . get_stylesheet() );

		// Only proceed if block templates are supported
		if ( ! $this->supports_block_templates() ) {
			error_log( '[weDocs TemplateManager] Block templates NOT supported, exiting early' );
			return;
		}

		error_log( '[weDocs TemplateManager] Block templates supported, proceeding with registration' );

		// Define templates to register
		$templates = [
			SingleDocTemplate::SLUG => new SingleDocTemplate(),
		];

		error_log( '[weDocs TemplateManager] Templates to register: ' . implode( ', ', array_keys( $templates ) ) );

		// Initialize each template and register the block template
		foreach ( $templates as $slug => $template ) {
			error_log( '[weDocs TemplateManager] Processing template: ' . $slug );
			// Call init() to set up hooks (template_redirect, get_block_templates, etc.)
			$template->init();

			// Register the block template with WordPress
			$template_file_path = $this->get_templates_directory() . '/' . $template::SLUG . '.html';

			error_log( '[weDocs TemplateManager] Template file path: ' . $template_file_path );
			error_log( '[weDocs TemplateManager] File exists: ' . ( file_exists( $template_file_path ) ? 'YES' : 'NO' ) );

			if ( file_exists( $template_file_path ) ) {
				$template_full_name = self::PLUGIN_SLUG . '//' . $template::SLUG;
				error_log( '[weDocs TemplateManager] Registering block template: ' . $template_full_name );

				register_block_template(
					$template_full_name,
					[
						'title'       => $template->get_template_title(),
						'description' => $template->get_template_description(),
						// phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
						'content'     => file_get_contents( $template_file_path ),
					]
				);

				error_log( '[weDocs TemplateManager] Block template registered successfully: ' . $template_full_name );
			} else {
				error_log( '[weDocs TemplateManager] Template file NOT found, skipping registration' );
			}
		}

		$this->templates = $templates;

		// DEBUG: Check registered templates after init and when template loads
		add_action( 'wp_loaded', [ $this, 'debug_registered_templates' ], 999 );
		add_action( 'template_redirect', [ $this, 'debug_template_resolution' ], 999 );
	}

	/**
	 * Debug: Check what template is being used when page loads.
	 *
	 * @return void
	 */
	public function debug_template_resolution() {
		global $post, $wp_query;

		error_log( '[weDocs TemplateManager] === DEBUG: Template Resolution Check ===' );
		error_log( '[weDocs TemplateManager] Global post ID: ' . ( $post ? $post->ID : 'NULL' ) );
		error_log( '[weDocs TemplateManager] Global post type: ' . ( $post ? $post->post_type : 'NULL' ) );
		error_log( '[weDocs TemplateManager] get_post_type(): ' . get_post_type() );
		error_log( '[weDocs TemplateManager] is_singular(docs): ' . ( is_singular( 'docs' ) ? 'YES' : 'NO' ) );

		if ( ! is_singular( 'docs' ) ) {
			return;
		}

		// Get the resolved template
		$template = get_query_template( 'single-docs' );
		error_log( '[weDocs TemplateManager] Query template for single-docs: ' . ( $template ?: 'NOT FOUND' ) );

		$template = get_query_template( 'single' );
		error_log( '[weDocs TemplateManager] Query template for single: ' . ( $template ?: 'NOT FOUND' ) );

		// Check what block templates exist
		$all_templates = get_block_templates( [], 'wp_template' );
		$doc_templates = array_filter( $all_templates, function( $t ) {
			return strpos( $t->slug, 'doc' ) !== false || strpos( $t->slug, 'single' ) !== false;
		} );

		error_log( '[weDocs TemplateManager] Doc/single related templates: ' . count( $doc_templates ) );
		foreach ( $doc_templates as $tpl ) {
			error_log( '[weDocs TemplateManager] - slug: ' . $tpl->slug . ' | theme: ' . $tpl->theme . ' | source: ' . $tpl->source );
		}

		// Check what template WordPress actually resolved
		add_filter( 'template_include', function( $template ) {
			error_log( '[weDocs TemplateManager] === FINAL TEMPLATE ===: ' . $template );
			return $template;
		}, 999 );
	}

	/**
	 * Debug: Check what templates are registered after WordPress loads.
	 *
	 * @return void
	 */
	public function debug_registered_templates() {
		error_log( '[weDocs TemplateManager] === DEBUG: Template Check at wp_loaded ===' );
		error_log( '[weDocs TemplateManager] is_singular(docs): ' . ( is_singular( 'docs' ) ? 'YES' : 'NO' ) );
		error_log( '[weDocs TemplateManager] Current post type: ' . get_post_type() );

		if ( ! is_singular( 'docs' ) ) {
			error_log( '[weDocs TemplateManager] Not on a single doc page, skipping detailed checks' );
			return;
		}

		error_log( '[weDocs TemplateManager] === DEBUG: Registered Templates Check ===' );

		// Check if our template is in the database
		$templates = get_block_templates( [ 'slug__in' => [ SingleDocTemplate::SLUG ] ], 'wp_template' );
		error_log( '[weDocs TemplateManager] Block templates found for slug "' . SingleDocTemplate::SLUG . '": ' . count( $templates ) );

		foreach ( $templates as $tpl ) {
			error_log( '[weDocs TemplateManager] Found template: ' . $tpl->slug . ' | theme: ' . $tpl->theme . ' | source: ' . $tpl->source );
		}

		// Get all templates
		$all_templates = get_block_templates( [], 'wp_template' );
		error_log( '[weDocs TemplateManager] Total block templates in system: ' . count( $all_templates ) );

		$wedocs_templates = array_filter( $all_templates, function( $t ) {
			return strpos( $t->theme, 'wedocs' ) !== false || strpos( $t->slug, 'wedocs' ) !== false || strpos( $t->slug, 'doc' ) !== false;
		} );

		error_log( '[weDocs TemplateManager] weDocs-related templates found: ' . count( $wedocs_templates ) );
		foreach ( $wedocs_templates as $tpl ) {
			error_log( '[weDocs TemplateManager] - slug: ' . $tpl->slug . ' | theme: ' . $tpl->theme . ' | source: ' . $tpl->source );
		}

		// Check template hierarchy
		global $_wp_current_template_hierarchy;
		if ( is_array( $_wp_current_template_hierarchy ) ) {
			error_log( '[weDocs TemplateManager] Template hierarchy: ' . implode( ', ', $_wp_current_template_hierarchy ) );
		}

		// Check what template is actually being used
		global $_wp_current_template;
		if ( $_wp_current_template ) {
			error_log( '[weDocs TemplateManager] Current template: ' . $_wp_current_template );
		}
	}

	/**
	 * Check if the current theme supports block templates.
	 *
	 * @return bool True if block templates are supported.
	 */
	private function supports_block_templates() {
		return function_exists( 'wp_is_block_theme' ) && wp_is_block_theme();
	}

	/**
	 * Get the directory path where block templates are stored.
	 *
	 * @return string The templates directory path.
	 */
	private function get_templates_directory() {
		return WEDOCS_PATH . '/templates/' . self::TEMPLATES_DIR_NAME;
	}

	/**
	 * Returns the template matching the slug.
	 *
	 * @param string $template_slug Slug of the template to retrieve.
	 * @return \WeDevs\WeDocs\Templates\AbstractTemplate|null
	 */
	public function get_template( $template_slug ) {
		if ( isset( $this->templates[ $template_slug ] ) ) {
			return $this->templates[ $template_slug ];
		}
		return null;
	}

	/**
	 * Get all registered templates.
	 *
	 * @return \WeDevs\WeDocs\Templates\AbstractTemplate[]
	 */
	public function get_templates() {
		return $this->templates;
	}
}
