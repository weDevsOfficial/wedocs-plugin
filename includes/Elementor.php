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
        add_action( 'elementor/widgets/widgets_registered', [ $this, 'register_widgets' ] );
        add_action( 'elementor/elements/categories_registered', [ $this, 'register_widget_category' ] );

        // Register widget scripts
        add_action( 'elementor/frontend/after_register_scripts', [ $this, 'register_widget_scripts' ] );
        add_action( 'elementor/frontend/after_enqueue_styles', [ $this, 'register_widget_styles' ] );
    }

    /**
     * Register custom widget category
     */
    public function register_widget_category( $elements_manager ) {
        $elements_manager->add_category(
            'wedocs-category',
            [
                'title' => __( 'weDocs', 'wedocs' ),
                'icon' => 'fa fa-file-text-o',
            ]
        );
    }

    /**
     * Register widgets
     */
    public function register_widgets() {
        // Check if Elementor is loaded
        if ( ! did_action( 'elementor/loaded' ) ) {
            return;
        }

        // Include widget files
        require_once WEDOCS_PATH . '/includes/Elementor/Widgets/Search.php';
        require_once WEDOCS_PATH . '/includes/Elementor/Widgets/DocsGrid.php';

        // Register widgets
        \Elementor\Plugin::instance()->widgets_manager->register_widget_type( new \WeDevs\WeDocs\Elementor\Widgets\Search() );
        \Elementor\Plugin::instance()->widgets_manager->register_widget_type( new \WeDevs\WeDocs\Elementor\Widgets\DocsGrid() );
    }

    /**
     * Register widget scripts
     */
    public function register_widget_scripts() {
        wp_register_script(
            'wedocs-elementor-widgets',
            WEDOCS_ASSETS . '/js/elementor-widgets.js',
            [ 'elementor-frontend' ],
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
}
