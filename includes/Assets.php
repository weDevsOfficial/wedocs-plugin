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
        add_action( 'wedocs_load_faq_page', array( $this, 'enqueue_faq_assets' ) );
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
                'ajaxurl'   => admin_url( 'admin-ajax.php' ),
                'nonce'     => wp_create_nonce( 'wedocs-ajax' ),
                'assetsUrl' => WEDOCS_ASSETS,
                'isPro'     => wedocs_is_pro_active(),
            ),
        );

        // Register the shared component registry. Pro reads its components from
        // the `window.wedocs` namespace this bundle publishes, so it has to be
        // in the dependency list of every weDocs admin bundle - that guarantees
        // the registry exists before any weDocs React tree renders.
        if ( file_exists( WEDOCS_PATH . '/assets/build/shared.asset.php' ) ) {
            $shared_dependencies = require WEDOCS_PATH . '/assets/build/shared.asset.php';

            wp_register_script(
                'wedocs-shared-script',
                $assets_url . '/build/shared.js',
                $shared_dependencies['dependencies'],
                $shared_dependencies['version'],
                true
            );
        }

        if ( file_exists( WEDOCS_PATH . '/assets/build/index.asset.php' ) ) {
            $react_dependencies = require WEDOCS_PATH . '/assets/build/index.asset.php';

            // Adding wedocs necessary assets.
            wp_register_style(
                'wedocs-app-style',
                $assets_url . '/build/index.css',
                array(),
                $react_dependencies['version'],
            );

            wp_register_script(
                'wedocs-app-script',
                $assets_url . '/build/index.js',
                array_merge( $react_dependencies['dependencies'], array( 'wedocs-shared-script' ) ),
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
                    'migrationNonce' => wp_create_nonce( 'wedocs-migration' ),
                    'weDocsUrl'     => admin_url( 'admin.php?page=wedocs#/' ),
                    'pro_active'    => wedocs_is_pro_active(),
                    'dokan_active'  => is_plugin_active( 'dokan-lite/dokan.php' ),
                    'upgradePopupContent' => wedocs_get_upgrade_popup_content(),
                    'siteUrl'       => home_url( '/' ),
                ),
            );
        }

        if ( file_exists( WEDOCS_PATH . '/assets/build/block.asset.php' ) ) {
            $block_dependencies = require WEDOCS_PATH . '/assets/build/block.asset.php';
            // wp_register_style(
            //     'wedocs-block-style',
            //     $assets_url . '/build/style-block.css',
            //     $block_dependencies['version']
            // );

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
                    'aiSettings'        => wedocs_get_ai_settings_for_frontend(),
                ),
            );
        }

        // Register FAQ assets.
        if ( file_exists( WEDOCS_PATH . '/assets/build/faq.asset.php' ) ) {
            $faq_dependencies = require WEDOCS_PATH . '/assets/build/faq.asset.php';

            wp_register_style(
                'wedocs-faq-style',
                $assets_url . '/build/faq.css',
                array(),
                $faq_dependencies['version'],
            );

            wp_register_script(
                'wedocs-faq-script',
                $assets_url . '/build/faq.js',
                array_merge( $faq_dependencies['dependencies'], array( 'wedocs-shared-script' ) ),
                $faq_dependencies['version'],
                true
            );

            wp_localize_script(
                'wedocs-faq-script',
                'weDocsFaqVars',
                array(
                    'restNonce' => wp_create_nonce( 'wp_rest' ),
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

        // The shared components carry their own strings ("Cancel",
        // "Processing...", the toast fallbacks), so they need translations of
        // their own - the app bundle's registration does not cover them.
        wp_set_script_translations(
            'wedocs-shared-script',
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

    /**
     * Enqueue FAQ page assets.
     *
     * @since WEDOCS_SINCE
     *
     * @return void
     */
    public function enqueue_faq_assets() {
        wp_enqueue_media();
        // Shared Tailwind build, so the FAQ stylesheet only carries its own rules.
        wp_enqueue_style( 'wedocs-app-style' );
        wp_enqueue_style( 'wedocs-faq-style' );
        wp_enqueue_script( 'wedocs-faq-script' );
    }
}
