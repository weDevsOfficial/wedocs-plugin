<?php

namespace WeDevs\WeDocs;

/**
 * Post type class
 */
class Post_Types {

    /**
     * The post type name.
     *
     * @var string
     */
    private $post_type = 'docs';

    /**
     * Initialize the class
     */
    public function __construct() {
        add_action( 'init', [ $this, 'register_post_type' ] );
        add_action( 'init', [ $this, 'register_taxonomy' ] );
        add_action( 'init', [ $this, 'register_post_meta' ] );
        add_filter( 'dokan_settings_general_site_options', [ $this, 'add_vendor_docs_setting' ] );
        add_filter( 'dokan_get_dashboard_nav', [ $this, 'add_docs_vendor_dashboard_menu' ] );
        add_filter( 'dokan_query_var_filter', [ $this, 'register_docs_query_var' ] );
        add_action( 'dokan_load_custom_template', [ $this, 'load_vendor_docs_template' ] );
        add_action( 'wp_enqueue_scripts', [ $this, 'collapse_dokan_sidebar_on_docs_page' ] );
    }

    /**
     * Register the post type.
     *
     * @return void
     */
    public function register_post_type() {
        $labels = array(
            'name'               => _x( 'Docs', 'Post Type General Name', 'wedocs' ),
            'singular_name'      => _x( 'Doc', 'Post Type Singular Name', 'wedocs' ),
            'menu_name'          => __( 'Documentation', 'wedocs' ),
            'parent_item_colon'  => __( 'Parent Doc', 'wedocs' ),
            'all_items'          => __( 'All Documentations', 'wedocs' ),
            'view_item'          => __( 'View Documentation', 'wedocs' ),
            'add_new_item'       => __( 'Add Documentation', 'wedocs' ),
            'add_new'            => __( 'Add New', 'wedocs' ),
            'edit_item'          => __( 'Edit Documentation', 'wedocs' ),
            'update_item'        => __( 'Update Documentation', 'wedocs' ),
            'search_items'       => __( 'Search Documentation', 'wedocs' ),
            'not_found'          => __( 'Not documentation found', 'wedocs' ),
            'not_found_in_trash' => __( 'Not found in Trash', 'wedocs' ),
        );

        $rewrite = array(
            'slug'       => 'docs',
            'with_front' => true,
            'pages'      => true,
            'feeds'      => true,
        );

        $args = array(
            'labels'              => $labels,
            'supports'            => array( 'title', 'editor', 'thumbnail', 'revisions', 'page-attributes', 'comments', 'elementor', 'custom-fields'),
            'hierarchical'        => true,
            'public'              => true,
            'show_ui'             => true,
            'show_in_menu'        => false,
            'show_in_nav_menus'   => true,
            'show_in_admin_bar'   => true,
            'menu_position'       => 5,
            'menu_icon'           => 'dashicons-portfolio',
            'can_export'          => true,
            'has_archive'         => false,
            'exclude_from_search' => false,
            'publicly_queryable'  => true,
            'show_in_rest'        => true,
            'rewrite'             => $rewrite,
            'map_meta_cap'        => true,
            'capability_type'     => array( 'doc', 'docs' ),
            'taxonomies'          => array( 'doc_tag' ),
        );

        register_post_type( $this->post_type, apply_filters( 'wedocs_post_type', $args ) );
    }

    /**
     * Register doc tags taxonomy.
     *
     * @return void
     */
    public function register_taxonomy() {
        $labels = [
            'name'                       => _x( 'Tags', 'Taxonomy General Name', 'wedocs' ),
            'singular_name'              => _x( 'Tag', 'Taxonomy Singular Name', 'wedocs' ),
            'menu_name'                  => __( 'Tags', 'wedocs' ),
            'all_items'                  => __( 'All Tags', 'wedocs' ),
            'parent_item'                => __( 'Parent Tag', 'wedocs' ),
            'parent_item_colon'          => __( 'Parent Tag:', 'wedocs' ),
            'new_item_name'              => __( 'New Tag', 'wedocs' ),
            'add_new_item'               => __( 'Add New Item', 'wedocs' ),
            'edit_item'                  => __( 'Edit Tag', 'wedocs' ),
            'update_item'                => __( 'Update Tag', 'wedocs' ),
            'view_item'                  => __( 'View Tag', 'wedocs' ),
            'separate_items_with_commas' => __( 'Separate items with commas', 'wedocs' ),
            'add_or_remove_items'        => __( 'Add or remove items', 'wedocs' ),
            'choose_from_most_used'      => __( 'Choose from the most used', 'wedocs' ),
            'popular_items'              => __( 'Popular Tags', 'wedocs' ),
            'search_items'               => __( 'Search Tags', 'wedocs' ),
            'not_found'                  => __( 'Not Found', 'wedocs' ),
            'no_terms'                   => __( 'No items', 'wedocs' ),
            'items_list'                 => __( 'Tags list', 'wedocs' ),
            'items_list_navigation'      => __( 'Tags list navigation', 'wedocs' ),
        ];

        $rewrite = [
            'slug'         => 'doc-tag',
            'with_front'   => true,
            'hierarchical' => false,
        ];

        $args = [
            'labels'            => $labels,
            'hierarchical'      => false,
            'public'            => true,
            'show_ui'           => true,
            'show_admin_column' => true,
            'show_in_nav_menus' => true,
            'show_tagcloud'     => true,
            'show_in_rest'      => true,
            'rewrite'           => $rewrite,
        ];

        register_taxonomy( 'doc_tag', [ 'docs' ], $args );
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

        // Check for a single doc view via query parameter.
        // phpcs:ignore WordPress.Security.NonceVerification.Recommended
        $doc_id = ! empty( $_GET['doc_id'] ) ? absint( $_GET['doc_id'] ) : 0;

        if ( $doc_id > 0 ) {
            $post = get_post( $doc_id );

            if ( $post && 'docs' === $post->post_type && 'publish' === $post->post_status ) {
                require WEDOCS_PATH . '/templates/vendor-single-doc.php';

                return;
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

        wp_add_inline_script(
            'wedocs-scripts',
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

    /**
     * Register post meta fields for the docs post type.
     *
     * @since WEDOCS_SINCE
     *
     * @return void
     */
    public function register_post_meta() {
        register_post_meta( $this->post_type, '_is_vendor_doc', [
            'show_in_rest'  => true,
            'single'        => true,
            'type'          => 'string',
            'default'       => '0',
            'auth_callback' => function () {
                return current_user_can( 'edit_docs' );
            },
        ] );
    }
}
