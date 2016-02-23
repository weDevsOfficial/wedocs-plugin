<?php
/*
Plugin Name: weDocs
Plugin URI: http://wedevs.com/
Description: Documentation plugin for WordPress
Version: 0.1
Author: Tareq Hasan
Author URI: http://tareq.wedevs.com/
License: GPL2
*/

/**
 * Copyright (c) 2016 Tareq Hasan (email: tareq@wedevs.com). All rights reserved.
 *
 * Released under the GPL license
 * http://www.opensource.org/licenses/gpl-license.php
 *
 * This is an add-on for WordPress
 * http://wordpress.org/
 *
 * **********************************************************************
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 * **********************************************************************
 */

// don't call the file directly
if ( !defined( 'ABSPATH' ) ) exit;

/**
 * WeDocs class
 *
 * @class WeDocs The class that holds the entire WeDocs plugin
 */
class WeDocs {

    public $plugin_url;
    public $plugin_path;
    public $theme_dir_path;

    private $post_type = 'docs';

    /**
     * Constructor for the WeDocs class
     *
     * Sets up all the appropriate hooks and actions
     * within our plugin.
     *
     * @uses register_activation_hook()
     * @uses register_deactivation_hook()
     * @uses is_admin()
     * @uses add_action()
     */
    public function __construct() {
        register_activation_hook( __FILE__, array( $this, 'activate' ) );
        register_deactivation_hook( __FILE__, array( $this, 'deactivate' ) );
    }

    /**
     * Initializes the WeDocs() class
     *
     * Checks for an existing WeDocs() instance
     * and if it doesn't find one, creates it.
     */
    public static function init() {
        static $instance = false;

        if ( ! $instance ) {
            $instance = new WeDocs();

            $instance->plugin_init();
        }

        return $instance;
    }

    function plugin_init() {
        $this->theme_dir_path = apply_filters( 'wedocs_theme_dir_path', 'wedocs/' );

        $this->file_includes();

        // Localize our plugin
        add_action( 'init', array( $this, 'localization_setup' ) );
        add_action( 'init', array( $this, 'register_post_type' ) );

        // filter the search result
        add_action( 'pre_get_posts', array( $this, 'docs_search_filter' ) );

        // registeer our widget
        add_action( 'widgets_init', array( $this, 'register_widget' ) );

        // override the theme template
        add_filter( 'template_include', array( $this, 'template_loader' ), 20 );

        // Loads frontend scripts and styles
        add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
    }

    /**
     * Placeholder for activation function
     *
     * Nothing being called here yet.
     */
    public function activate() {

    }

    /**
     * Placeholder for deactivation function
     *
     * Nothing being called here yet.
     */
    public function deactivate() {

    }

    function file_includes() {
        include_once dirname( __FILE__ ) . '/includes/functions.php';
        include_once dirname( __FILE__ ) . '/includes/class-walker-docs.php';
        include_once dirname( __FILE__ ) . '/includes/class-search-widget.php';

        if ( is_admin() ) {
            include_once dirname( __FILE__ ) . '/includes/admin/class-admin.php';
        } else {
            include_once dirname( __FILE__ ) . '/includes/class-shortcode.php';
        }

        if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
            include_once dirname( __FILE__ ) . '/includes/class-ajax.php';
        }
    }

    /**
     * Initialize plugin for localization
     *
     * @uses load_plugin_textdomain()
     */
    public function localization_setup() {
        load_plugin_textdomain( 'wedocs', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
    }

    /**
     * Enqueue admin scripts
     *
     * Allows plugin assets to be loaded.
     *
     * @uses wp_enqueue_script()
     * @uses wp_localize_script()
     * @uses wp_enqueue_style
     */
    public function enqueue_scripts() {

        /**
         * All styles goes here
         */
        wp_enqueue_style( 'wedocs-styles', plugins_url( 'assets/css/frontend.css', __FILE__ ), false, date( 'Ymd' ) );

        /**
         * All scripts goes here
         */
        wp_enqueue_script( 'wedocs-scripts', plugins_url( 'assets/js/frontend.js', __FILE__ ), array( 'jquery' ), false, true );
        wp_localize_script( 'wedocs-scripts', 'weDocs', array(
            'ajaxurl' => admin_url( 'admin-ajax.php' ),
            'nonce'   => wp_create_nonce( 'wedocs-ajax' )
        ) );
    }

    function register_post_type() {

        $labels = array(
            'name'                => _x( 'Docs', 'Post Type General Name', 'wedocs' ),
            'singular_name'       => _x( 'Doc', 'Post Type Singular Name', 'wedocs' ),
            'menu_name'           => __( 'Documentation', 'wedocs' ),
            'parent_item_colon'   => __( 'Parent Doc', 'wedocs' ),
            'all_items'           => __( 'All Documentations', 'wedocs' ),
            'view_item'           => __( 'View Documentation', 'wedocs' ),
            'add_new_item'        => __( 'Add Documentation', 'wedocs' ),
            'add_new'             => __( 'Add New', 'wedocs' ),
            'edit_item'           => __( 'Edit Documentation', 'wedocs' ),
            'update_item'         => __( 'Update Documentation', 'wedocs' ),
            'search_items'        => __( 'Search Documentation', 'wedocs' ),
            'not_found'           => __( 'Not documentation found', 'wedocs' ),
            'not_found_in_trash'  => __( 'Not found in Trash', 'wedocs' ),
        );
        $rewrite = array(
            'slug'                => 'docs',
            'with_front'          => true,
            'pages'               => true,
            'feeds'               => true,
        );
        $args = array(
            'labels'              => $labels,
            'supports'            => array( 'title', 'editor', 'thumbnail', 'revisions', ),
            'taxonomies'          => array( 'wedocs_category' ),
            'hierarchical'        => true,
            'public'              => true,
            'show_ui'             => false,
            'show_in_menu'        => false,
            'show_in_nav_menus'   => true,
            'show_in_admin_bar'   => true,
            'menu_position'       => 5,
            'menu_icon'           => 'dashicons-portfolio',
            'can_export'          => true,
            'has_archive'         => true,
            'exclude_from_search' => false,
            'publicly_queryable'  => true,
            'rewrite'             => $rewrite,
            'capability_type'     => 'page',
        );

        register_post_type( $this->post_type, $args );
    }

    /**
     * Register the search widget
     *
     * @return void
     */
    public function register_widget() {
        register_widget( 'WeDocs_Search_Widget' );
    }

    /**
     * Get the plugin url.
     *
     * @access public
     * @return string
     */
    public function plugin_url() {
        if ( $this->plugin_url ) {
            return $this->plugin_url;
        }

        return $this->plugin_url = untrailingslashit( plugins_url( '/', __FILE__ ) );
    }


    /**
     * Get the plugin path.
     *
     * @access public
     * @return string
     */
    public function plugin_path() {
        if ( $this->plugin_path ) return $this->plugin_path;

        return $this->plugin_path = untrailingslashit( plugin_dir_path( __FILE__ ) );
    }

    /**
     * Get the template path.
     *
     * @access public
     * @return string
     */
    public function template_path() {
        return $this->plugin_path() . '/templates/';
    }

    function template_loader( $template ) {
        $find = array( $this->post_type . '.php' );
        $file = '';

        if ( is_single() && get_post_type() == $this->post_type ) {
            $file   = 'single-' . $this->post_type . '.php';
            $find[] = $file;
            $find[] = $this->theme_dir_path. $file;
        }

        if ( $file ) {

            $template = locate_template( $find );

            if ( ! $template ) {
                $template = $this->template_path() . $file;
            }
        }

        return $template;
    }

    function docs_search_filter( $query ) {

        if ( ! is_admin() && is_search() && $query->is_main_query() ) {
            $param = isset( $_GET['search_in_doc'] ) ? sanitize_text_field( $_GET['search_in_doc'] ) : false;

            if ( $param ) {

                if ( $param != 'all' ) {
                    $parent_doc_id = intval( $param );
                    $post__in      = array( $parent_doc_id => $parent_doc_id );
                    $children_docs = wedocs_get_posts_children( $parent_doc_id, 'docs' );

                    if ( $children_docs ) {
                        $post__in = array_merge( $post__in, wp_list_pluck( $children_docs, 'ID' ) );
                    }

                    $query->set( 'post__in', $post__in );
                }
            }
        }

        return $query;
    }

} // WeDocs

function wedocs() {
    return WeDocs::init();
}

add_action( 'plugins_loaded', 'wedocs' );
