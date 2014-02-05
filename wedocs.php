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
 * Copyright (c) 2014 Tareq Hasan (email: tareq@wedevs.com). All rights reserved.
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
        }

        return $instance;
    }

    function plugin_init() {
        $this->theme_dir_path = apply_filters( 'wedocs_theme_dir_path', 'wedocs/' );

        $this->file_includes();

        // Localize our plugin
        add_action( 'init', array( $this, 'localization_setup' ) );
        add_action( 'init', array( $this, 'register_post_type' ) );
        add_action( 'init', array( $this, 'register_taxonomy' ) );

        add_action( 'wp_ajax_wedocs_ajax_feedback', array( $this, 'ajax_feedback' ) );
        add_action( 'wp_ajax_nopriv_wedocs_ajax_feedback', array( $this, 'ajax_feedback' ) );

        add_action( 'pre_get_posts', array( $this, 'pre_get_category' ) );

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
        wp_enqueue_style( 'wedocs-styles', plugins_url( 'assets/css/style.css', __FILE__ ), false, date( 'Ymd' ) );

        /**
         * All scripts goes here
         */
        wp_enqueue_script( 'wedocs-scripts', plugins_url( 'assets/js/script.js', __FILE__ ), array( 'jquery' ), false, true );
        wp_localize_script( 'wedocs-scripts', 'wedocs', array(
            'ajaxurl' => admin_url( 'admin-ajax.php' ),
            'nonce' => wp_create_nonce( 'wedocs-ajax' )
        ) );


        /**
         * Example for setting up text strings from Javascript files for localization
         *
         * Uncomment line below and replace with proper localization variables.
         */
        // $translation_array = array( 'some_string' => __( 'Some string to translate', 'wedocs' ), 'a_value' => '10' );
        // wp_localize_script( 'base-plugin-scripts', 'wedocs', $translation_array ) );

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
            'show_ui'             => true,
            'show_in_menu'        => true,
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

        register_post_type( 'wedocs', $args );
    }

    // Register Custom Taxonomy
    function register_taxonomy() {

        $labels = array(
            'name'                       => _x( 'Categories', 'Taxonomy General Name', 'wedocs' ),
            'singular_name'              => _x( 'Category', 'Taxonomy Singular Name', 'wedocs' ),
            'menu_name'                  => __( 'Categories', 'wedocs' ),
            'all_items'                  => __( 'All Categories', 'wedocs' ),
            'parent_item'                => __( 'Parent Category', 'wedocs' ),
            'parent_item_colon'          => __( 'Parent Category:', 'wedocs' ),
            'new_item_name'              => __( 'New Category Name', 'wedocs' ),
            'add_new_item'               => __( 'Add New Category', 'wedocs' ),
            'edit_item'                  => __( 'Edit Category', 'wedocs' ),
            'update_item'                => __( 'Update Category', 'wedocs' ),
            'separate_items_with_commas' => __( 'Separate categories with commas', 'wedocs' ),
            'search_items'               => __( 'Search Categories', 'wedocs' ),
            'add_or_remove_items'        => __( 'Add or remove categories', 'wedocs' ),
            'choose_from_most_used'      => __( 'Choose from the most used categories', 'wedocs' ),
            'not_found'                  => __( 'Not Found', 'wedocs' ),
        );
        $rewrite = array(
            'slug'                       => 'docs-category',
            'with_front'                 => true,
            'hierarchical'               => true,
        );
        $args = array(
            'labels'                     => $labels,
            'hierarchical'               => true,
            'public'                     => true,
            'show_ui'                    => true,
            'show_admin_column'          => true,
            'show_in_nav_menus'          => true,
            'show_tagcloud'              => true,
            'rewrite'                    => $rewrite,
        );

        register_taxonomy( 'wedocs_category', 'wedocs', $args );

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
        $find = array( 'wedocs.php' );
        $file = '';

        if ( is_single() && get_post_type() == 'wedocs' ) {
            $file   = 'single-wedocs.php';
            $find[] = $file;
            $find[] = $this->theme_dir_path. $file;

        } else if ( is_tax( 'wedocs_category' ) ) {
            $file   = 'archive-wedocs_category.php';
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

    function pre_get_category( $query ) {

        if ( $query->is_main_query() && is_tax('wedocs_category') ) {

            $current_cat = get_queried_object();

            $query->set('tax_query', array(
                array(
                    'taxonomy' => 'wedocs_category',
                    'field' => 'term_id',
                    'terms' => array($current_cat->term_id),
                    'operator' => 'IN',
                    'include_children' => false
                )
            ));
        }
    }


    function ajax_feedback() {
        check_ajax_referer( 'wedocs-ajax' );

        $template = '<div class="wedocs-%s">%s</div>';
        $previous = isset( $_COOKIE['wedocs_response'] ) ? explode( ',', $_COOKIE['wedocs_response'] ) : array();
        $post_id = intval( $_POST['post_id'] );
        $type = in_array( $_POST['type'], array( 'positive', 'negative' ) ) ? $_POST['type'] : false;

        // check previous response
        if ( in_array( $post_id, $previous ) ) {
            $message = sprintf( $template, 'error', __( 'Sorry, you\'ve already recorded your feedback!', 'wedocs' ) );
            wp_send_json_error( $message );
        }

        // seems new
        if ( $type ) {
            $count = (int) get_post_meta( $post_id, $type, true );
            update_post_meta( $post_id, $type, $count + 1 );

            array_push( $previous, $post_id );
            $cookie_val = implode( ',',  $previous);

            $val = setcookie( 'wedocs_response', $cookie_val, time() + WEEK_IN_SECONDS, COOKIEPATH, COOKIE_DOMAIN );
        }

        $message = sprintf( $template, 'success', __( 'Thanks for your feedback!', 'wedocs' ) );
        wp_send_json_success( $message );
        exit;
    }

} // WeDocs

function wedocs_load_plugin() {
    $wedocs = WeDocs::init();
    $wedocs->plugin_init();
}

add_action( 'plugins_loaded', 'wedocs_load_plugin' );