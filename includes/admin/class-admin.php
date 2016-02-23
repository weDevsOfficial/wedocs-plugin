<?php

/**
 * Admin Class
 */
class WeDocs_Admin {

    function __construct() {
        $this->init_actions();
    }

    /**
     * Initialize action hooks
     *
     * @return void
     */
    public function init_actions() {
        add_action( 'admin_enqueue_scripts', array( $this, 'admin_scripts' ) );
        add_action( 'admin_menu', array( $this, 'admin_menu' ) );
    }

    /**
     * Load admin scripts and styles
     *
     * @param  string
     *
     * @return void
     */
    public function admin_scripts( $hook ) {
        if ( 'toplevel_page_wedocs' != $hook ) {
            return;
        }

        $suffix     = ( defined('SCRIPT_DEBUG') && SCRIPT_DEBUG ) ? '' : '.min';
        $assets_url = wedocs()->plugin_url() . '/assets';

        wp_enqueue_script( 'vuejs', $assets_url . '/js/vue.min.js' );
        wp_enqueue_script( 'sweetalert', $assets_url . '/js/sweetalert.min.js', array( 'jquery' ) );
        wp_enqueue_script( 'wedocs-admin-script', $assets_url . "/js/admin-script.js", array( 'jquery', 'jquery-ui-sortable', 'wp-util' ), date( 'Ymd' ), true );
        wp_localize_script( 'wedocs-admin-script', 'weDocs', array(
            'nonce'   => wp_create_nonce( 'wedocs-admin-nonce' ),
            'editurl' => admin_url( 'post.php?action=edit&post=' ),
            'viewurl' => home_url( '/?p=' )
        ) );

        wp_enqueue_style( 'sweetalert', $assets_url . '/css/sweetalert.css', false, date( 'Ymd' ) );
        wp_enqueue_style( 'wedocs-admin-styles', $assets_url . '/css/admin.css', false, date( 'Ymd' ) );
    }

    /**
     * Get the admin menu position
     *
     * @return int the position of the menu
     */
    public function get_menu_position() {
        return apply_filters( 'wedocs_menu_position', 48 );
    }

    /**
     * Add menu items
     *
     * @return void
     */
    public function admin_menu() {

        add_menu_page( __( 'weDocs', 'wp-erp' ), __( 'weDocs', 'wp-erp' ), 'publish_posts', 'wedocs', array( $this, 'page_index' ), 'dashicons-media-document', $this->get_menu_position() );
        add_submenu_page( 'wedocs', __( 'Docs', 'wp-erp' ), __( 'Docs', 'wp-erp' ), 'publish_posts', 'wedocs', array( $this, 'page_index' ) );
    }

    public function page_index() {
        include dirname( __FILE__ ) . '/template-vue.php';
    }
}

return new WeDocs_Admin();