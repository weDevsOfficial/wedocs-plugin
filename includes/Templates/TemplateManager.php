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
	 * Required wedocs blocks that must be present in the template.
	 * If a DB-stored template is missing any of these, it will be reset.
	 *
	 * @var string[]
	 */
	private $required_blocks = [
		'wedocs/sidebar',
		'wedocs/quick-search',
	];

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
				// phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
				$plugin_content     = file_get_contents( $template_file_path );
				$template_full_name = self::PLUGIN_SLUG . '//' . $template::SLUG;

				// Remove outdated DB template if it's missing required blocks
				$this->maybe_reset_db_template( $template::SLUG, $plugin_content );

				register_block_template(
					$template_full_name,
					[
						'title'       => $template->get_template_title(),
						'description' => $template->get_template_description(),
						'content'     => $plugin_content,
					]
				);
			}
		}

		$this->templates = $templates;
	}

	/**
	 * Check if a DB-stored template is missing required wedocs blocks
	 * and delete it so the plugin's version takes over.
	 *
	 * Only runs once per plugin version to avoid unnecessary DB queries.
	 *
	 * @param string $slug           Template slug.
	 * @param string $plugin_content The plugin's template content.
	 * @return void
	 */
	private function maybe_reset_db_template( $slug, $plugin_content ) {
		$option_key       = 'wedocs_template_version_' . $slug;
		$current_version  = defined( 'WEDOCS_VERSION' ) ? WEDOCS_VERSION : '0';
		$stored_version   = get_option( $option_key, '' );

		// Only check once per plugin version
		if ( $stored_version === $current_version ) {
			return;
		}

		$db_template = $this->get_db_template( $slug );

		if ( $db_template ) {
			$is_missing_blocks = false;

			foreach ( $this->required_blocks as $block_name ) {
				if ( strpos( $db_template->post_content, $block_name ) === false ) {
					$is_missing_blocks = true;
					break;
				}
			}

			if ( $is_missing_blocks ) {
				wp_delete_post( $db_template->ID, true );
			}
		}

		update_option( $option_key, $current_version );
	}

	/**
	 * Get a DB-stored wp_template post by slug.
	 *
	 * @param string $slug Template slug.
	 * @return \WP_Post|null
	 */
	private function get_db_template( $slug ) {
		$posts = get_posts( [
			'post_type'      => 'wp_template',
			'post_status'    => [ 'publish', 'draft', 'auto-draft' ],
			'posts_per_page' => 1,
			'post_name__in'  => [ $slug ],
			'tax_query'      => [
				[
					'taxonomy' => 'wp_theme',
					'field'    => 'name',
					'terms'    => get_stylesheet(),
				],
			],
		] );

		return ! empty( $posts ) ? $posts[0] : null;
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
