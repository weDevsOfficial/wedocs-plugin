<?php
// DESCRIPTION: Handles weDocs integration with the Dokan vendor dashboard.
// DESCRIPTION: Registers Dokan hooks for settings, nav menu, query vars, templates, and sidebar.

namespace WeDevs\WeDocs\Dokan;

/**
 * Dokan vendor dashboard integration for weDocs.
 */
class VendorDashboard {

    /**
     * Initialize the class
     */
    public function __construct() {
        add_filter( 'dokan_settings_general_site_options', [ $this, 'add_vendor_docs_setting' ] );
        add_filter( 'dokan_get_dashboard_nav', [ $this, 'add_docs_vendor_dashboard_menu' ] );
        add_filter( 'dokan_query_var_filter', [ $this, 'register_docs_query_var' ] );
        add_action( 'dokan_load_custom_template', [ $this, 'load_vendor_docs_template' ] );
        add_action( 'wp_enqueue_scripts', [ $this, 'collapse_dokan_sidebar_on_docs_page' ] );
    }

    /**
     * Add vendor docs toggle to Dokan general site settings.
     *
     * @since WEDOCS_SINCE
     *
     * @param array $settings_fields Existing settings fields.
     *
     * @return array
     */
    public function add_vendor_docs_setting( $settings_fields ) {
        $settings_fields['show_docs_in_vendor_dashboard'] = [
            'name'    => 'show_docs_in_vendor_dashboard',
            'label'   => __( 'Show Docs in Vendor Dashboard', 'wedocs' ),
            'desc'    => __( 'Allow vendors to view from their dashboard', 'wedocs' ),
            'type'    => 'switcher',
            'default' => 'off',
        ];

        return $settings_fields;
    }

    /**
     * Add Docs menu item to the Dokan vendor dashboard sidebar.
     *
     * @since WEDOCS_SINCE
     *
     * @param array $menus Existing dashboard nav menus.
     *
     * @return array
     */
    public function add_docs_vendor_dashboard_menu( $menus ) {
        if ( ! function_exists( 'dokan_get_option' ) ) {
            return $menus;
        }

        $show_docs = dokan_get_option( 'show_docs_in_vendor_dashboard', 'dokan_general', 'off' );

        if ( 'on' !== $show_docs ) {
            return $menus;
        }

        $menus['docs'] = [
            'title'     => __( 'Docs', 'wedocs' ),
            'icon'      => '<i class="fas fa-book"></i>',
            'icon_name' => 'BookOpen',
            'url'       => dokan_get_navigation_url( 'docs' ),
            'pos'       => 185,
        ];

        return $menus;
    }

    /**
     * Register docs query var for the Dokan vendor dashboard.
     *
     * @since WEDOCS_SINCE
     *
     * @param array $query_vars Existing query vars.
     *
     * @return array
     */
    public function register_docs_query_var( $query_vars ) {
        $query_vars[] = 'docs';

        return $query_vars;
    }

    /**
     * Load the vendor docs template when the docs query var is set.
     *
     * If the query var has a numeric value, load a single doc view
     * inside the dashboard. Otherwise, load the doc listing.
     *
     * @since WEDOCS_SINCE
     *
     * @param array $query_vars Current query vars.
     *
     * @return void
     */
    public function load_vendor_docs_template( $query_vars ) {
        if ( ! isset( $query_vars['docs'] ) ) {
            return;
        }

        $show_docs = dokan_get_option( 'show_docs_in_vendor_dashboard', 'dokan_general', 'off' );

        if ( 'on' !== $show_docs ) {
            return;
        }

        // Check for a single doc view via query parameter.
        // phpcs:ignore WordPress.Security.NonceVerification.Recommended
        $doc_id = ! empty( $_GET['doc_id'] ) ? absint( $_GET['doc_id'] ) : 0;

        if ( $doc_id > 0 ) {
            $post = get_post( $doc_id );

            if ( $post && 'docs' === $post->post_type && 'publish' === $post->post_status ) {
                // _is_vendor_doc is set only on the root doc. For sections and articles,
                // walk up to the root ancestor and check the meta there.
                $ancestors = $post->post_parent ? get_post_ancestors( $post->ID ) : [];
                $root_id   = ! empty( $ancestors ) ? end( $ancestors ) : $post->ID;

                if ( '1' === get_post_meta( $root_id, '_is_vendor_doc', true ) ) {
                    require WEDOCS_PATH . '/templates/vendor-single-doc.php';

                    return;
                }
            }
        }

        require WEDOCS_PATH . '/templates/vendor-docs.php';
    }

    /**
     * Collapse the Dokan vendor sidebar when the vendor is on the docs dashboard page.
     *
     * Writes the Dokan sidebar localStorage key and dispatches a storage event so the
     * React app collapses immediately without requiring a page reload.
     *
     * @since WEDOCS_SINCE
     *
     * @return void
     */
    public function collapse_dokan_sidebar_on_docs_page() {
        global $wp;

        if ( ! function_exists( 'dokan_is_seller_dashboard' ) ) {
            return;
        }

        if ( ! dokan_is_seller_dashboard() || ! isset( $wp->query_vars['docs'] ) ) {
            return;
        }

        // Register a dependency-free handle so the inline script has a reliable anchor.
        // wp_add_inline_script() is silently dropped if its handle is not registered.
        wp_register_script( 'wedocs-dokan-sidebar', '', [], false, true );
        wp_enqueue_script( 'wedocs-dokan-sidebar' );

        wp_add_inline_script(
            'wedocs-dokan-sidebar',
            "( function () {
                var STORAGE_KEY = 'dokanVendorSidebarCollapsed';
                var prev = window.localStorage.getItem( STORAGE_KEY );
                window.localStorage.setItem( STORAGE_KEY, '1' );
                // Dispatch a storage event so the React app picks up the change immediately.
                window.dispatchEvent( new StorageEvent( 'storage', {
                    key:      STORAGE_KEY,
                    oldValue: prev,
                    newValue: '1',
                    storageArea: window.localStorage
                } ) );
            } )();"
        );
    }
}
