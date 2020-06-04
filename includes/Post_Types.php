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
    }

    /**
     * Register the post type.
     *
     * @return void
     */
    public function register_post_type() {
        $labels = [
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
        ];
        $rewrite = [
            'slug'       => 'docs',
            'with_front' => true,
            'pages'      => true,
            'feeds'      => true,
        ];
        $args = [
            'labels'              => $labels,
            'supports'            => [ 'title', 'editor', 'thumbnail', 'revisions', 'page-attributes', 'comments' ],
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
            'taxonomies'          => [ 'doc_tag' ],
        ];

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
}
