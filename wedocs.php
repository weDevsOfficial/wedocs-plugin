<?php
/*
Plugin Name: weDocs
Plugin URI: http://wedevs.com/
Description: A documentation plugin for WordPress
Version: 1.4.1
Author: Tareq Hasan
Author URI: https://tareq.co/
License: GPL2
Text Domain: wedocs
Domain Path: /languages
*/

/**
 * Copyright (c) 2018 Tareq Hasan (email: tareq@wedevs.com). All rights reserved.
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

    /**
     * Plugin version
     *
     * @var string
     */
    public $version = '1.4.1';

    /**
     * The plugin url
     *
     * @var string
     */
    public $plugin_url;

    /**
     * The plugin path
     *
     * @var string
     */
    public $plugin_path;

    /**
     * The theme directory path
     *
     * @var string
     */
    public $theme_dir_path;

    /**
     * The post type name
     *
     * @var string
     */
    private $post_type = 'docs';

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

    /**
     * Initialize the plugin
     *
     * @return void
     */
    function plugin_init() {
        $this->theme_dir_path = apply_filters( 'wedocs_theme_dir_path', 'wedocs/' );

        $this->file_includes();
        $this->init_classes();

        // Localize our plugin
        add_action( 'init', array( $this, 'localization_setup' ) );

        // custom post types and taxonomies
        add_action( 'init', array( $this, 'register_post_type' ) );
        add_action( 'init', array( $this, 'register_taxonomy' ) );

        // filter the search result
        add_action( 'pre_get_posts', array( $this, 'docs_search_filter' ) );

        // registeer our widget
        add_action( 'widgets_init', array( $this, 'register_widget' ) );

        // override the theme template
        add_filter( 'template_include', array( $this, 'template_loader' ), 20 );

        // Loads frontend scripts and styles
        add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );

        register_activation_hook( __FILE__, array( $this, 'activate' ) );
    }

    /**
     * The plugin activation function
     *
     * @since 1.3
     *
     * @return void
     */
    public function activate() {

        $this->maybe_create_docs_page();

        // rewrite rules problem, register and flush
        $this->register_post_type();
        $this->register_taxonomy();

        flush_rewrite_rules();

        update_option( 'wedocs_installed', time() );
        update_option( 'wedocs_version', $this->version );
    }

    /**
     * Load the required files
     *
     * @return void
     */
    function file_includes() {
        include_once dirname( __FILE__ ) . '/includes/functions.php';
        include_once dirname( __FILE__ ) . '/includes/class-walker-docs.php';
        include_once dirname( __FILE__ ) . '/includes/class-search-widget.php';
        include_once dirname( __FILE__ ) . '/includes/class-theme-support.php';

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
     * Initialize the classes
     *
     * @since 1.4
     *
     * @return void
     */
    public function init_classes() {

        new WeDocs_Theme_Support();

        if ( is_admin() ) {
            new WeDocs_Admin();
        } else {
            new WeDocs_Shortcode_Handler();
        }

        if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
            new WeDocs_Ajax();
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
        wp_enqueue_style( 'wedocs-styles', plugins_url( 'assets/css/frontend.css', __FILE__ ), array(), $this->version );

        /**
         * All scripts goes here
         */
        wp_enqueue_script( 'wedocs-anchorjs', plugins_url( 'assets/js/anchor.min.js', __FILE__ ), array( 'jquery' ), $this->version, true );
        wp_enqueue_script( 'wedocs-scripts', plugins_url( 'assets/js/frontend.js', __FILE__ ), array( 'jquery', 'wedocs-anchorjs' ), $this->version, true );
        wp_localize_script( 'wedocs-scripts', 'weDocs_Vars', array(
            'ajaxurl' => admin_url( 'admin-ajax.php' ),
            'nonce'   => wp_create_nonce( 'wedocs-ajax' ),
            'style'   => plugins_url( 'assets/css/print.css', __FILE__ ),
            'powered' => sprintf( '&copy; %s, %d. %s<br>%s', get_bloginfo( 'name' ), date( 'Y' ), __( 'Powered by weDocs', 'wedocs' ), home_url() )
        ) );
    }

    /**
     * Register the post type
     *
     * @return void
     */
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
            'supports'            => array( 'title', 'editor', 'thumbnail', 'revisions', 'page-attributes' ),
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
            'capability_type'     => 'post',
            'taxonomies'          => array( 'doc_tag' )
        );

        register_post_type( $this->post_type, apply_filters( 'wedocs_post_type', $args ) );
    }

    /**
     * Register doc tags taxonomy
     *
     * @return void
     */
    function register_taxonomy() {

        $labels = array(
            'name'                       => _x( 'Tags', 'Taxonomy General Name', 'wedocs' ),
            'singular_name'              => _x( 'Tag', 'Taxonomy Singular Name', 'wedocs' ),
            'menu_name'                  => __( 'Tags', 'wedocs' ),
            'all_items'                  => __( 'All Tags', 'wedocs' ),
            'parent_item'                => __( 'Parent Tag', 'wedocs' ),
            'parent_item_colon'          => __( 'Parent Tag:', 'wedocs' ),
            'new_item_name'              => __( 'New Tag Tag', 'wedocs' ),
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
        );

        $rewrite = array(
            'slug'                       => 'doc-tag',
            'with_front'                 => true,
            'hierarchical'               => false,
        );

        $args = array(
            'labels'                     => $labels,
            'hierarchical'               => false,
            'public'                     => true,
            'show_ui'                    => true,
            'show_admin_column'          => true,
            'show_in_nav_menus'          => true,
            'show_tagcloud'              => true,
            'show_in_rest'               => true,
            'rewrite'                    => $rewrite
        );

        register_taxonomy( 'doc_tag', array( 'docs' ), $args );

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
     * @return string
     */
    public function plugin_path() {
        if ( $this->plugin_path ) return $this->plugin_path;

        return $this->plugin_path = untrailingslashit( plugin_dir_path( __FILE__ ) );
    }

    /**
     * Get the template path.
     *
     * @return string
     */
    public function template_path() {
        return $this->plugin_path() . '/templates/';
    }

    /**
     * If the theme doesn't have any single doc handler, load that from
     * the plugin
     *
     * @param  string  $template
     *
     * @return string
     */
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

    /**
     * Handle the search filtering in search page
     *
     * @param  \WP_Query  $query
     *
     * @return \WP_Query
     */
    function docs_search_filter( $query ) {

        if ( ! is_admin() && $query->is_main_query() ) {
            if( is_search() ) {
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
        }

        return $query;
    }

    /**
     * Maybe create docs page if not found
     *
     * @since 1.3
     *
     * @return void
     */
    public function maybe_create_docs_page() {
        $version = get_option( 'wedocs_version' );

        // seems like it's already installed
        if ( $version ) {
            return;
        }

        // skip if there's a page already with [wedocs] shortcode
        $pages_query = new WP_Query( array(
            'post_type'      => 'page',
            'posts_per_page' => -1,
            's'              => '[wedocs'
        ) );

        if ( $pages_query->found_posts ) {
            return;
        }

        $docs_page = wp_insert_post( array(
            'post_type'      => 'page',
            'post_title'     => 'Documentation',
            'post_author'    => get_current_user_id(),
            'post_content'   => '[wedocs]',
            'post_status'    => 'publish',
            'comment_status' => 'closed',
            'ping_status'    => 'closed',
            'post_name'      => 'docs',
        ) );

        if ( ! is_wp_error( $docs_page ) ) {
            $settings = get_option( 'wedocs_settings', array() );
            $settings['docs_home'] = $docs_page;

            update_option( 'wedocs_settings', $settings );
        }
    }

} // WeDocs

/**
 * Initialize the plugin
 *
 * @return \WeDocs
 */
function wedocs() {
    return WeDocs::init();
}

// kick it off
wedocs();
