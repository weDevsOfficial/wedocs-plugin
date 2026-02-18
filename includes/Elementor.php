<?php

namespace WeDevs\WeDocs;

/**
 * Elementor Integration Class
 */
class Elementor {

    /**
     * Initialize the class
     */
    public function __construct() {
        add_action('elementor/widgets/register', [$this, 'register_widgets']);
        add_action('elementor/elements/categories_registered', [$this, 'register_widget_category']);

        // Register widget scripts
        add_action('elementor/frontend/after_register_scripts', [$this, 'register_widget_scripts']);
        add_action('elementor/frontend/after_enqueue_styles', [$this, 'register_widget_styles']);

        // Register templates
        add_action('init', [$this, 'init_templates']);

        // Admin only scripts for Elementor editor
        if (is_admin()) {
            add_action('elementor/editor/footer', [$this, 'enqueue_template_scripts']);
        }
    }

    /**
     * Register custom widget category
     */
    public function register_widget_category($elements_manager) {
        $elements_manager->add_category(
            'wedocs-category',
            [
                'title' => __('weDocs', 'wedocs'),
                'icon' => 'fa fa-book',
            ]
        );
    }

    /**
     * Register widgets
     */
    public function register_widgets() {
        // Check if Elementor is loaded
        if (! did_action('elementor/loaded')) {
            return;
        }

        // Include widget files
        // require_once WEDOCS_PATH . '/includes/Elementor/Widgets/Search.php';
        require_once WEDOCS_PATH . '/includes/Elementor/Widgets/DocsGrid.php';
        require_once WEDOCS_PATH . '/includes/Elementor/Widgets/TableOfContents.php';
        require_once WEDOCS_PATH . '/includes/Elementor/Widgets/NeedHelp.php';
        require_once WEDOCS_PATH . '/includes/Elementor/Widgets/WasThisHelpful.php';
        require_once WEDOCS_PATH . '/includes/Elementor/Widgets/DocsSidebar.php';
        require_once WEDOCS_PATH . '/includes/Elementor/Widgets/SearchModal.php';
        require_once WEDOCS_PATH . '/includes/Elementor/Widgets/DocNavigation.php';
        require_once WEDOCS_PATH . '/includes/Elementor/Widgets/DocsHamburgerMenu.php';
        require_once WEDOCS_PATH . '/includes/Elementor/Widgets/DocsBreadcrumb.php';

        // Register widgets
        // \Elementor\Plugin::instance()->widgets_manager->register( new \WeDevs\WeDocs\Elementor\Widgets\Search() );
        \Elementor\Plugin::instance()->widgets_manager->register(new \WeDevs\WeDocs\Elementor\Widgets\DocsGrid());
        \Elementor\Plugin::instance()->widgets_manager->register(new \WeDevs\WeDocs\Elementor\Widgets\TableOfContents());
        \Elementor\Plugin::instance()->widgets_manager->register(new \WeDevs\WeDocs\Elementor\Widgets\NeedHelp());
        \Elementor\Plugin::instance()->widgets_manager->register(new \WeDevs\WeDocs\Elementor\Widgets\WasThisHelpful());
        \Elementor\Plugin::instance()->widgets_manager->register(new \WeDevs\WeDocs\Elementor\Widgets\DocsSidebar());
        \Elementor\Plugin::instance()->widgets_manager->register(new \WeDevs\WeDocs\Elementor\Widgets\SearchModal());
        \Elementor\Plugin::instance()->widgets_manager->register(new \WeDevs\WeDocs\Elementor\Widgets\DocNavigation());
        \Elementor\Plugin::instance()->widgets_manager->register(new \WeDevs\WeDocs\Elementor\Widgets\DocsHamburgerMenu());
        \Elementor\Plugin::instance()->widgets_manager->register(new \WeDevs\WeDocs\Elementor\Widgets\DocsBreadcrumb());
    }

    /**
     * Register widget scripts
     */
    public function register_widget_scripts() {
        wp_register_script(
            'wedocs-elementor-widgets',
            WEDOCS_ASSETS . '/js/elementor-widgets.js',
            ['elementor-frontend'],
            WEDOCS_VERSION,
            true
        );
    }

    /**
     * Register widget styles
     */
    public function register_widget_styles() {
        wp_register_style(
            'wedocs-elementor-widgets',
            WEDOCS_ASSETS . '/css/elementor-widgets.css',
            [],
            WEDOCS_VERSION
        );
    }

    /**
     * Initialize template import
     */
    public function init_templates() {
        if (! did_action('elementor/loaded')) {
            return;
        }

        // Import default templates if they don't exist
        $this->import_default_templates();
    }

    /**
     * Import default weDocs templates
     */
    public function import_default_templates() {
        // Clean up any existing templates with incorrect format
        $this->fix_existing_template_conditions();

        // Force re-import if templates exist with wrong format
        $existing_templates = get_posts([
            'post_type' => 'elementor_library',
            'meta_key' => '_wedocs_template',
            'meta_value' => true,
            'posts_per_page' => 1
        ]);

        if (!empty($existing_templates)) {
            // Check if existing template has proper data format
            $elementor_data = get_post_meta($existing_templates[0]->ID, '_elementor_data', true);
            if (is_array($elementor_data)) {
                // Re-import with correct format
                delete_option('wedocs_elementor_templates_imported');
                wp_delete_post($existing_templates[0]->ID, true);
            }
        }

        // Check if template import is needed
        if (get_option('wedocs_elementor_templates_imported')) {
            return;
        }

        $template_id = $this->import_template_from_json('three_column', 'weDocs - Single Doc Page');

        if ($template_id) {
            // Set template conditions for single docs
            $this->set_template_conditions($template_id, 'single_docs');

            // Mark as imported
            update_option('wedocs_elementor_templates_imported', true);
        }
    }

    /**
     * Fix existing template conditions and settings format
     */
    public function fix_existing_template_conditions() {
        $templates = get_posts([
            'post_type' => 'elementor_library',
            'meta_key' => '_wedocs_template',
            'meta_value' => true,
            'posts_per_page' => -1
        ]);

        foreach ($templates as $template) {
            // Fix conditions format
            $conditions = get_post_meta($template->ID, '_elementor_conditions', true);

            // Check if conditions are in old array format
            if (is_array($conditions) && isset($conditions[0]['type'])) {
                // Convert to proper string format
                $new_conditions = [];
                foreach ($conditions as $condition) {
                    if (isset($condition['type'], $condition['sub'], $condition['sub_id'])) {
                        $new_conditions[] = $condition['type'] . '/' . $condition['sub'] . '/' . $condition['sub_id'];
                    }
                }

                if (!empty($new_conditions)) {
                    update_post_meta($template->ID, '_elementor_conditions', $new_conditions);
                }
            }

            // Fix page settings format
            $page_settings = get_post_meta($template->ID, '_elementor_page_settings', true);

            // Check if page settings are JSON string instead of array
            if (is_string($page_settings) && !empty($page_settings)) {
                $decoded_settings = json_decode($page_settings, true);
                if (json_last_error() === JSON_ERROR_NONE && is_array($decoded_settings)) {
                    // Convert from JSON string to array
                    update_post_meta($template->ID, '_elementor_page_settings', $decoded_settings);
                }
            } elseif (empty($page_settings)) {
                // Set empty array if none exists
                update_post_meta($template->ID, '_elementor_page_settings', []);
            }

            // Fix elementor data format
            $elementor_data = get_post_meta($template->ID, '_elementor_data', true);

            // Check if elementor data is stored as array instead of JSON string
            if (is_array($elementor_data) && !empty($elementor_data)) {
                // Convert from array to JSON string
                update_post_meta($template->ID, '_elementor_data', wp_json_encode($elementor_data));
            }
        }
    }

    /**
     * Set template conditions
     */
    public function set_template_conditions($template_id, $condition_type = 'single_docs') {
        $conditions = [];

        switch ($condition_type) {
            case 'single_docs':
                $conditions = [
                    'include/single/docs'
                ];
                break;

            case 'docs_archive':
                $conditions = [
                    'include/archive/docs'
                ];
                break;
        }

        if (! empty($conditions)) {
            update_post_meta($template_id, '_elementor_conditions', $conditions);
        }
    }

    /**
     * Import template from JSON file
     */
    public function import_template_from_json($template_name, $template_title) {
        $template_path = WEDOCS_PATH . '/includes/Elementor/Templates/' . $template_name . '.json';

        if (! file_exists($template_path)) {
            return false;
        }

        $json_content = file_get_contents($template_path);
        $template_data = json_decode($json_content, true);

        if (! $template_data || json_last_error() !== JSON_ERROR_NONE) {
            return false;
        }

        // Validate required template structure
        if (! isset($template_data['content']) || ! is_array($template_data['content'])) {
            return false;
        }

        // Prepare page settings
        $page_settings = [];
        if (isset($template_data['page_settings']) && is_array($template_data['page_settings'])) {
            $page_settings = $template_data['page_settings'];
        }

        // Create template post
        $template_id = wp_insert_post([
            'post_type'   => 'elementor_library',
            'post_status' => 'publish',
            'post_title'  => $template_title,
            'meta_input'  => [
                '_elementor_data' => wp_json_encode($template_data['content']),
                '_elementor_page_settings' => $page_settings,
                '_elementor_template_type' => $template_data['type'] ?? 'single',
                '_elementor_version' => $template_data['version'] ?? ELEMENTOR_VERSION,
                '_elementor_edit_mode' => 'builder',
                '_wedocs_template' => true, // Mark as weDocs template
            ]
        ]);

        return ($template_id && ! is_wp_error($template_id)) ? $template_id : false;
    }

    /**
     * Enqueue template scripts in Elementor editor
     */
    public function enqueue_template_scripts() {
?>
        <script>
            jQuery(document).ready(function($) {
                // Add weDocs templates to Elementor's template library
                if (window.elementor && elementor.library) {
                    elementor.hooks.addAction('library:save', function() {
                        // Refresh template library to show weDocs templates
                        if (elementor.library.getDefaultModal) {
                            elementor.library.getDefaultModal().refreshContent();
                        }
                    });
                }
            });
        </script>
<?php
    }

    /**
     * Reset template import (for development/debugging)
     */
    public function reset_template_import() {
        delete_option('wedocs_elementor_templates_imported');

        // Remove existing weDocs templates
        $templates = get_posts([
            'post_type' => 'elementor_library',
            'meta_key' => '_wedocs_template',
            'meta_value' => true,
            'posts_per_page' => -1
        ]);

        foreach ($templates as $template) {
            wp_delete_post($template->ID, true);
        }
    }

    /**
     * Get template version for comparison
     */
    public function get_template_version($template_name) {
        $template_path = WEDOCS_PATH . '/includes/Elementor/Templates/' . $template_name . '.json';

        if (! file_exists($template_path)) {
            return false;
        }

        $template_data = json_decode(file_get_contents($template_path), true);
        return $template_data['version'] ?? '1.0.0';
    }
}
