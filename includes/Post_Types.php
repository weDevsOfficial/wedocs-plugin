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

        // Propagate _is_vendor_doc meta to descendants.
        add_action( 'rest_after_insert_docs', [ $this, 'inherit_vendor_doc_meta' ], 10, 2 );
        add_action( 'updated_postmeta', [ $this, 'propagate_vendor_doc_meta' ], 10, 4 );
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

    /**
     * Inherit _is_vendor_doc meta from root ancestor when a doc is created via REST.
     *
     * When a section or article is created under a vendor doc tree, it should
     * automatically inherit the vendor doc flag from its root ancestor.
     *
     * @since WEDOCS_SINCE
     *
     * @param \WP_Post         $post    Inserted or updated post object.
     * @param \WP_REST_Request $request Request object.
     *
     * @return void
     */
    public function inherit_vendor_doc_meta( $post, $request ) {
        if ( empty( $post->post_parent ) ) {
            return;
        }

        $ancestors = get_post_ancestors( $post->ID );
        $root_id   = ! empty( $ancestors ) ? end( $ancestors ) : $post->post_parent;
        $is_vendor = get_post_meta( $root_id, '_is_vendor_doc', true );

        if ( '1' === $is_vendor ) {
            update_post_meta( $post->ID, '_is_vendor_doc', '1' );
        }
    }

    /**
     * Propagate _is_vendor_doc meta changes to all descendants.
     *
     * When a root doc is marked or unmarked as a vendor doc, all its
     * sections and articles should receive the same meta value.
     *
     * @since WEDOCS_SINCE
     *
     * @param int    $meta_id    ID of the metadata entry.
     * @param int    $post_id    Post ID.
     * @param string $meta_key   Metadata key.
     * @param mixed  $meta_value Metadata value.
     *
     * @return void
     */
    public function propagate_vendor_doc_meta( $meta_id, $post_id, $meta_key, $meta_value ) {
        if ( '_is_vendor_doc' !== $meta_key ) {
            return;
        }

        if ( 'docs' !== get_post_type( $post_id ) ) {
            return;
        }

        $descendants = wedocs_get_posts_children( $post_id, 'docs' );

        if ( empty( $descendants ) ) {
            return;
        }

        // Temporarily unhook to prevent recursive triggers.
        remove_action( 'updated_postmeta', [ $this, 'propagate_vendor_doc_meta' ], 10 );

        foreach ( $descendants as $descendant ) {
            update_post_meta( $descendant->ID, '_is_vendor_doc', $meta_value );
        }

        add_action( 'updated_postmeta', [ $this, 'propagate_vendor_doc_meta' ], 10, 4 );
    }
}
