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

        // Runs right after core's global block-style enqueue (priority 10) on classic themes.
        add_action( 'enqueue_block_assets', array( $this, 'dequeue_block_styles_when_unused' ), 20 );
    }

    /**
     * Keep weDocs block stylesheets off pages that cannot render a weDocs block.
     *
     * On classic themes WordPress enqueues the `style` of every registered block
     * on every front-end request (wp_enqueue_registered_block_scripts_and_styles),
     * which put all 17 weDocs block stylesheets on every page of the site. Block
     * themes, and WordPress 6.8+ sites that opt into on-demand block assets, never
     * enqueue them globally, so there is nothing to undo there.
     *
     * This removes the global enqueue on requests that hold no weDocs block.
     * WP_Block::render() enqueues a block's style again the moment the block
     * renders, so a weDocs block placed anywhere (a landing page, a widget area,
     * a template part) still gets its stylesheet, just not every other page.
     *
     * @since 2.6.0
     *
     * @return void
     */
    public function dequeue_block_styles_when_unused() {
        if ( is_admin() || is_feed() || ( defined( 'REST_REQUEST' ) && REST_REQUEST ) ) {
            return;
        }

        // Core already loads block assets on demand: nothing was enqueued globally.
        $on_demand = function_exists( 'wp_should_load_block_assets_on_demand' )
            ? wp_should_load_block_assets_on_demand()
            : wp_should_load_separate_core_block_assets();

        if ( $on_demand || $this->request_can_render_blocks() ) {
            return;
        }

        $registry = \WP_Block_Type_Registry::get_instance();

        foreach ( $registry->get_all_registered() as $block_name => $block_type ) {
            if ( 0 !== strpos( $block_name, 'wedocs/' ) ) {
                continue;
            }

            foreach ( (array) $block_type->style_handles as $handle ) {
                wp_dequeue_style( $handle );
            }
        }
    }

    /**
     * Whether the current request is one where weDocs blocks are expected to render.
     *
     * Covers the docs post type (single, archive, tag), the configured docs home
     * page, and any singular post whose content contains a weDocs block. Blocks
     * that render outside these (a template part, a widget) are still styled by
     * the render-time enqueue in WP_Block::render(), only later in the page.
     *
     * @since 2.6.0
     *
     * @return bool
     */
    private function request_can_render_blocks() {
        if ( is_singular( 'docs' ) || is_post_type_archive( 'docs' ) || is_tax( 'doc_tag' ) ) {
            return true;
        }

        $docs_home = function_exists( 'wedocs_get_general_settings' ) ? absint( wedocs_get_general_settings( 'docs_home' ) ) : 0;

        if ( $docs_home && is_page( $docs_home ) ) {
            return true;
        }

        $queried = get_queried_object();

        if ( $queried instanceof \WP_Post && is_string( $queried->post_content ) && false !== strpos( $queried->post_content, '<!-- wp:wedocs/' ) ) {
            return true;
        }

        /**
         * Filters whether weDocs block stylesheets should stay enqueued on this request.
         *
         * Return true for requests that render weDocs blocks in a way the plugin cannot detect.
         *
         * @since 2.6.0
         *
         * @param bool $can_render Whether weDocs blocks are expected on this request.
         */
        return (bool) apply_filters( 'wedocs_request_can_render_blocks', false );
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
     * @since 2.5.0
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
