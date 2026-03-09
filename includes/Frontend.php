<?php

namespace WeDevs\WeDocs;

use WP_Query;

/**
 * Frontend Handler Class
 */
class Frontend {

    /**
     * Shortcode class
     *
     * @var \WeDevs\WeDocs\Shortcode
     */
    public $shortcode;

    /**
     * Theme wrapper class
     *
     * @var \WeDevs\WeDocs\Theme_Support
     */
    public $theme;

    /**
     * Class Constructor
     */
    public function __construct() {

        // filter the search result
        add_action( 'pre_get_posts', [ $this, 'docs_search_filter' ] );

        // Exclude vendor docs from all public-facing docs queries.
        add_action( 'pre_get_posts', [ $this, 'exclude_vendor_docs' ] );

        // Loads frontend scripts and styles
        add_action( 'wp_enqueue_scripts', [ $this, 'register_scripts' ], 9 );
        add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_single_scripts' ], 9 );

        // Dequeue pro messaging bubble on the Dokan vendor dashboard.
        add_action( 'wp_enqueue_scripts', [ $this, 'dequeue_pro_scripts_on_vendor_dashboard' ], 20 );

        // override the theme template
        add_filter( 'template_include', [ $this, 'template_loader' ], 20 );

        $this->init_classes();
    }

    /**
     * Initialize the classes
     *
     * @return void
     */
    public function init_classes() {
        $this->shortcode = new Shortcode();
        $this->theme     = new Theme_Support();
    }

    /**
     * Enqueue admin scripts.
     *
     * Allows plugin assets to be loaded.
     *
     * @uses wp_enqueue_script()
     * @uses wp_localize_script()
     * @uses wp_enqueue_style
     */
    public function register_scripts() {
        // All styles goes here
        wp_register_style( 'wedocs-styles', WEDOCS_ASSETS . '/build/frontend.css', [], filemtime( WEDOCS_PATH . '/assets/build/frontend.css' ) );

        // All scripts goes here
        wp_register_script( 'wedocs-anchorjs', WEDOCS_ASSETS . '/js/anchor.min.js', [ 'jquery' ], WEDOCS_VERSION, true );
        wp_register_script( 'wedocs-scripts', WEDOCS_ASSETS . '/js/frontend.js', [ 'jquery', 'wedocs-anchorjs' ], filemtime( WEDOCS_PATH . '/assets/js/frontend.js' ), true );

        $store_dependencies = require WEDOCS_PATH . '/assets/build/store.asset.php';
        wp_register_script( 'wedocs-store-js', WEDOCS_ASSETS . '/build/store.js', $store_dependencies['dependencies'], $store_dependencies['version'], true );

        ob_start();
        wedocs_get_template_part( 'modals/search', 'modal' );
        $searchModal = ob_get_clean();

        wp_localize_script( 'wedocs-scripts', 'weDocs_Vars', [
            'nonce'              => wp_create_nonce( 'wedocs-ajax' ),
            'style'              => WEDOCS_ASSETS . '/build/print.css?v=10',
            'ajaxurl'            => admin_url( 'admin-ajax.php' ),
            'powered'            => sprintf( '&copy; %s, %d. %s<br>%s', get_bloginfo( 'name' ), date( 'Y' ), __( 'Powered by weDocs plugin for WordPress', 'wedocs' ), home_url() ),
            'isSingleDoc'        => is_singular( 'docs' ),
            'isVendorDashboard'  => $this->is_dokan_vendor_dashboard(),
            'vendorDocsBaseUrl'  => $this->is_dokan_vendor_dashboard() && function_exists( 'dokan_get_navigation_url' )
                ? trailingslashit( dokan_get_navigation_url( 'docs' ) )
                : '',
            'searchModal'        => $searchModal,
            'docNavLabel'        => __( 'Doc: ', 'wedocs' ),
            'searchBlankMsg'     => __( 'Search field cannot be blank', 'wedocs' ),
            'searchEmptyMsg'     => __( 'Your search didn\'t match any documents', 'wedocs' ),
            'sectionNavLabel'    => __( 'Section: ', 'wedocs' ),
            'searchModalColors'  => wedocs_get_search_modal_active_colors(),
        ] );
    }

    /**
     * Enqueue scripts only for singular docs
     *
     * @since 1.6.1
     *
     * @return void
     */
    public function enqueue_single_scripts() {
        if ( is_singular( 'docs' ) ) {
            self::enqueue_assets();
        }
    }

    /**
     * Enqueue the scripts and styles
     *
     * @since 1.6.1
     *
     * @return void
     */
    public static function enqueue_assets() {
        wp_enqueue_style( 'wedocs-styles' );

        wp_enqueue_script( 'wedocs-anchorjs' );
        wp_enqueue_script( 'wedocs-scripts' );
    }

    /**
     * Dequeue pro messaging bubble scripts on the Dokan vendor dashboard.
     *
     * @since WEDOCS_SINCE
     *
     * @return void
     */
    public function dequeue_pro_scripts_on_vendor_dashboard() {
        if ( ! $this->is_dokan_vendor_dashboard() ) {
            return;
        }

        wp_dequeue_script( 'wedocs-pro-frontend-js' );
        wp_dequeue_style( 'wedocs-pro-frontend-css' );
    }

    /**
     * Exclude vendor docs from public-facing docs queries.
     *
     * Vendor docs (meta _is_vendor_doc = '1') should only be visible in the
     * Dokan vendor dashboard context. This filter adds a meta_query to every
     * public WP_Query for the docs post type so vendor docs are automatically
     * excluded from search results, block renders, Elementor widgets, etc.
     *
     * @since WEDOCS_SINCE
     *
     * @param WP_Query $query
     *
     * @return void
     */
    public function exclude_vendor_docs( $query ) {
        // Only target docs post type queries.
        $post_type = $query->get( 'post_type' );

        if ( 'docs' !== $post_type ) {
            return;
        }

        $is_vendor_dashboard = $this->is_dokan_vendor_dashboard();

        // Don't filter admin-side queries (list tables, etc.).
        if ( is_admin() && ! wp_doing_ajax() ) {
            return;
        }

        // Don't filter for users who can manage docs (admins).
        if ( current_user_can( 'edit_docs' ) ) {
            return;
        }

        // Don't filter when inside the Dokan vendor dashboard.
        if ( $is_vendor_dashboard ) {
            return;
        }

        // Allow opting out of vendor doc filtering for specific queries.
        if ( $query->get( 'wedocs_include_vendor_docs' ) ) {
            return;
        }

        $meta_query = $query->get( 'meta_query' );

        if ( ! is_array( $meta_query ) ) {
            $meta_query = [];
        }

        $meta_query[] = [
            'relation' => 'OR',
            [
                'key'     => '_is_vendor_doc',
                'value'   => '1',
                'compare' => '!=',
            ],
            [
                'key'     => '_is_vendor_doc',
                'compare' => 'NOT EXISTS',
            ],
        ];

        $query->set( 'meta_query', $meta_query );
    }

    /**
     * Check if the current request is inside the Dokan vendor dashboard.
     *
     * @since WEDOCS_SINCE
     *
     * @return bool
     */
    private function is_dokan_vendor_dashboard() {
        global $wp;

        if ( ! function_exists( 'dokan_is_seller_dashboard' ) ) {
            return false;
        }

        return dokan_is_seller_dashboard() && isset( $wp->query_vars['docs'] );
    }

    /**
     * Handle the search filtering in search page.
     *
     * @param WP_Query $query
     *
     * @return void
     */
    public function docs_search_filter( $query ) {
        if ( ! $query->is_main_query() ) {
            return;
        }

        if ( ! is_search() ) {
            return;
        }

        $param = isset( $_GET['search_in_doc'] ) ? sanitize_text_field( $_GET['search_in_doc'] ) : false;

        error_log( '[weDocs Search Debug] docs_search_filter called, search_in_doc: ' . ( $param ?: 'none' ) . ', search query: ' . $query->get( 's' ) );

        if ( $param && 'all' != $param ) {
            $parent_doc_id = intval( $param );
            $post__in      = [ $parent_doc_id => $parent_doc_id ];
            $children_docs = wedocs_get_posts_children( $parent_doc_id, 'docs' );

            if ( $children_docs ) {
                $post__in = array_merge( $post__in, wp_list_pluck( $children_docs, 'ID' ) );
            }

            $query->set( 'post__in', $post__in );
        }
    }

    /**
     * If the theme doesn't have any single doc handler, load that from
     * the plugin.
     *
     * @param string $template
     *
     * @return string
     */
    public function template_loader( $template ) {
        // override if builder use_wedocs_builder_template is set to true
        if ( ! use_wedocs_legacy_template() ) {
            return $template;
        }

        $find = [ 'docs.php' ];
        $file = '';

        if ( is_single() && get_post_type() == 'docs' ) {
            $file   = 'single-docs.php';
            $find[] = $file;
            $find[] = wedocs()->theme_dir_path() . $file;
        }

        if ( $file ) {
            $template = locate_template( $find );

            if ( !$template ) {
                $template = wedocs()->template_path() . $file;
            }
        }

        return $template;
    }
}
