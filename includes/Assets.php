<?php

namespace WeDevs\WeDocs;

/**
 * Scripts and Styles Class
 */
class Assets {

    /**
     * Assets constructor.
     */
    public function __construct() {
        add_action( 'init', array( $this, 'register' ) );
        add_action( 'init', array( $this, 'register_translations' ) );
        add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueue' ) );
    }

    /**
     * Register plugin assets.
     *
     * @since 2.0.2
     *
     * @return void
     */
    public function register() {
        $assets_url  = wedocs()->plugin_url() . '/assets';
        $assets_path = wedocs()->plugin_path() . '/assets';

        // Register admin scripts.
        wp_register_script(
            'wedocs-admin-script',
            $assets_url . '/js/admin-script.js',
            array( 'jquery' ),
            filemtime( $assets_path . '/js/admin-script.js' ),
            true
        );

        wp_localize_script(
            'wedocs-admin-script',
            'weDocsAdminScriptVars',
            array(
                'ajaxurl' => admin_url( 'admin-ajax.php' ),
                'nonce'   => wp_create_nonce( 'wedocs-ajax' ),
            ),
        );

        if ( file_exists( WEDOCS_PATH . '/assets/build/index.asset.php' ) ) {
            $react_dependencies = require WEDOCS_PATH . '/assets/build/index.asset.php';

            // Adding wedocs necessary assets.
            wp_register_style(
                'wedocs-app-style',
                $assets_url . '/build/index.css',
                $react_dependencies['version'],
            );

            wp_register_script(
                'wedocs-app-script',
                $assets_url . '/build/index.js',
                $react_dependencies['dependencies'],
                $react_dependencies['version'],
                true
            );

            wp_localize_script(
                'wedocs-app-script',
                'weDocsAdminVars',
                array(
                    'adminUrl'     => admin_url(),
                    'hasManageCap' => current_user_can( 'manage_options' ),
                    'aiProviderConfigs' => wedocs_get_ai_provider_configs(),
                    'adminUrl'      => admin_url(),
                    'hasManageCap'  => current_user_can( 'manage_options' ),
                    'weDocsUrl'     => admin_url( 'admin.php?page=wedocs#/' ),
                    'pro_active'    => wedocs_is_pro_active(),
                ),
            );
        }

        if ( file_exists( WEDOCS_PATH . '/assets/build/block.asset.php' ) ) {
            $block_dependencies = require WEDOCS_PATH . '/assets/build/block.asset.php';
            wp_register_style(
                'wedocs-block-style',
                $assets_url . '/build/style-block.css',
                $block_dependencies['version']
            );

            wp_register_script(
                'wedocs-block-script',
                $assets_url . '/build/block.js',
                $block_dependencies['dependencies'],
                $block_dependencies['version'],
                true
            );

            wp_localize_script(
                'wedocs-block-script',
                'weDocsBlockVars',
                array( 'siteUrl' => site_url() ),
            );
        }

        // Register editor scripts for AI Doc Writer
        if ( file_exists( WEDOCS_PATH . '/assets/build/editor.asset.php' ) ) {
            $editor_dependencies = require WEDOCS_PATH . '/assets/build/editor.asset.php';

            wp_register_script(
                'wedocs-editor-script',
                $assets_url . '/build/editor.js',
                $editor_dependencies['dependencies'],
                $editor_dependencies['version'],
                true
            );

            wp_localize_script(
                'wedocs-editor-script',
                'weDocsEditorVars',
                array(
                    'ajaxurl'           => admin_url( 'admin-ajax.php' ),
                    'nonce'             => wp_create_nonce( 'wp_rest' ),
                    'aiProviderConfigs' => wedocs_get_ai_provider_configs(),
                ),
            );
        }

        wp_enqueue_style( 'wedocs-block-style' );
    }

    /**
     * Register script translations.
     *
     * @since 2.0.2
     *
     * @return void
     */
    public function register_translations() {
        wp_set_script_translations(
            'wedocs-app-script',
            'wedocs',
            plugin_dir_path( WEDOCS_FILE ) . 'languages'
        );
    }

    /**
     * Enqueue admin scripts.
     *
     * @since 2.0.2
     *
     * @return void
     */
    public function admin_enqueue() {
        wp_enqueue_style( 'wedocs-block-style' );

        // Enqueue admin script.
        wp_enqueue_script( 'wedocs-admin-script' );
        wp_enqueue_script( 'wedocs-block-script' );

        // Enqueue admin app scripts.
        if ( 'toplevel_page_wedocs' === get_current_screen()->id ) {
            wp_enqueue_style( 'wedocs-app-style' );
            wp_enqueue_script( 'wedocs-app-script' );
        }

        // Enqueue editor scripts for docs post type
        $screen = get_current_screen();
        if ( $screen && ( 'post' === $screen->base && 'docs' === $screen->post_type ) ) {
            wp_enqueue_script( 'wedocs-editor-script' );
        }
    }
}
