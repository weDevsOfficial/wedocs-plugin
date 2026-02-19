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
		// Only proceed if block templates are supported
		if ( ! $this->supports_block_templates() ) {
			return;
		}

		// Define templates to register
		$templates = [
			SingleDocTemplate::SLUG => new SingleDocTemplate(),
		];

		// Initialize each template and register the block template
		foreach ( $templates as $slug => $template ) {
			// Call init() to set up hooks (template_redirect, get_block_templates, etc.)
			$template->init();

			// Register the block template with WordPress
			$template_file_path = $this->get_templates_directory() . '/' . $template::SLUG . '.html';

			if ( file_exists( $template_file_path ) ) {
				$template_full_name = self::PLUGIN_SLUG . '//' . $template::SLUG;

				register_block_template(
					$template_full_name,
					[
						'title'       => $template->get_template_title(),
						'description' => $template->get_template_description(),
						// phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
						'content'     => file_get_contents( $template_file_path ),
					]
				);
			}
		}

		$this->templates = $templates;
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
