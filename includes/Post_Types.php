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
        add_action( 'init', [ $this, 'register_faq_post_type' ] );
        add_action( 'init', [ $this, 'register_faq_taxonomy' ] );
        add_action( 'init', [ $this, 'register_faq_meta' ] );
        add_filter( 'get_terms', [ $this, 'sort_faq_groups_by_order' ], 10, 4 );
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
            'supports'            => array( 'title', 'editor', 'thumbnail', 'revisions', 'page-attributes', 'comments', 'elementor'),
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
     * Register the FAQ post type.
     *
     * @since WEDOCS_SINCE
     *
     * @return void
     */
    public function register_faq_post_type() {
        $labels = [
            'name'               => _x( 'FAQs', 'Post Type General Name', 'wedocs' ),
            'singular_name'      => _x( 'FAQ', 'Post Type Singular Name', 'wedocs' ),
            'menu_name'          => __( 'FAQs', 'wedocs' ),
            'all_items'          => __( 'All FAQs', 'wedocs' ),
            'view_item'          => __( 'View FAQ', 'wedocs' ),
            'add_new_item'       => __( 'Add FAQ', 'wedocs' ),
            'add_new'            => __( 'Add New', 'wedocs' ),
            'edit_item'          => __( 'Edit FAQ', 'wedocs' ),
            'update_item'        => __( 'Update FAQ', 'wedocs' ),
            'search_items'       => __( 'Search FAQs', 'wedocs' ),
            'not_found'          => __( 'No FAQs found', 'wedocs' ),
            'not_found_in_trash' => __( 'Not found in Trash', 'wedocs' ),
        ];

        $args = [
            'labels'              => $labels,
            'supports'            => [ 'title', 'editor', 'page-attributes', 'custom-fields' ],
            'hierarchical'        => false,
            'public'              => false,
            'show_ui'             => false,
            'show_in_menu'        => false,
            'show_in_rest'        => true,
            'rest_base'           => 'wedocs-faqs',
            'has_archive'         => false,
            'exclude_from_search' => true,
            'publicly_queryable'  => false,
            'map_meta_cap'        => true,
            'capability_type'     => [ 'doc', 'docs' ],
        ];

        register_post_type( 'wedocs_faq', apply_filters( 'wedocs_faq_post_type', $args ) );
    }

    /**
     * Register the FAQ group taxonomy.
     *
     * @since WEDOCS_SINCE
     *
     * @return void
     */
    public function register_faq_taxonomy() {
        $labels = [
            'name'              => _x( 'FAQ Groups', 'Taxonomy General Name', 'wedocs' ),
            'singular_name'     => _x( 'FAQ Group', 'Taxonomy Singular Name', 'wedocs' ),
            'menu_name'         => __( 'FAQ Groups', 'wedocs' ),
            'all_items'         => __( 'All FAQ Groups', 'wedocs' ),
            'new_item_name'     => __( 'New FAQ Group', 'wedocs' ),
            'add_new_item'      => __( 'Add New FAQ Group', 'wedocs' ),
            'edit_item'         => __( 'Edit FAQ Group', 'wedocs' ),
            'update_item'       => __( 'Update FAQ Group', 'wedocs' ),
            'search_items'      => __( 'Search FAQ Groups', 'wedocs' ),
            'not_found'         => __( 'Not Found', 'wedocs' ),
        ];

        $args = [
            'labels'            => $labels,
            'hierarchical'      => true,
            'public'            => false,
            'show_ui'           => false,
            'show_in_rest'      => true,
            'rest_base'         => 'wedocs-faq-groups',
            'show_admin_column' => false,
            'capabilities'      => [
                'manage_terms' => 'manage_doc_terms',
                'edit_terms'   => 'edit_doc_terms',
                'delete_terms' => 'delete_doc_terms',
                'assign_terms' => 'edit_docs',
            ],
        ];

        register_taxonomy( 'wedocs_faq_group', [ 'wedocs_faq' ], $args );
    }

    /**
     * Register FAQ post meta fields for REST API exposure.
     *
     * @since WEDOCS_SINCE
     *
     * @return void
     */
    public function register_faq_meta() {
        register_post_meta( 'wedocs_faq', '_faq_open_by_default', [
            'type'              => 'boolean',
            'single'            => true,
            'default'           => false,
            'show_in_rest'      => true,
            'sanitize_callback' => 'rest_sanitize_boolean',
            'auth_callback'     => function () {
                return current_user_can( 'edit_docs' );
            },
        ] );

        register_term_meta( 'wedocs_faq_group', 'icon', [
            'type'          => 'integer',
            'single'        => true,
            'default'       => 0,
            'show_in_rest'  => true,
            'sanitize_callback' => 'absint',
        ] );

        register_term_meta( 'wedocs_faq_group', 'order', [
            'type'          => 'integer',
            'single'        => true,
            'default'       => 0,
            'show_in_rest'  => true,
            'sanitize_callback' => 'absint',
        ] );

        register_term_meta( 'wedocs_faq_group', 'status', [
            'type'              => 'boolean',
            'single'            => true,
            'default'           => true,
            'show_in_rest'      => true,
            'sanitize_callback' => 'rest_sanitize_boolean',
        ] );
    }

    /**
     * Sort FAQ group terms by their order term meta after retrieval.
     *
     * Uses the get_terms filter instead of meta_key query arg because
     * terms without an explicit order meta row would be excluded by WP_Term_Query.
     *
     * @since WEDOCS_SINCE
     *
     * @param array          $terms      Array of found terms.
     * @param array|null     $taxonomies Array of taxonomies.
     * @param array          $args       Term query arguments.
     * @param \WP_Term_Query $term_query The WP_Term_Query instance.
     *
     * @return array
     */
    public function sort_faq_groups_by_order( $terms, $taxonomies, $args, $term_query ) {
        // Bail early for non-FAQ taxonomy queries to avoid overhead on every get_terms call.
        if ( ! is_array( $taxonomies ) || ! in_array( 'wedocs_faq_group', $taxonomies, true ) ) {
            return $terms;
        }

        if ( empty( $terms ) || is_wp_error( $terms ) ) {
            return $terms;
        }

        // Only sort when terms are returned as objects (not counts, ids, etc.).
        if ( ! isset( $terms[0] ) || ! is_object( $terms[0] ) ) {
            return $terms;
        }

        usort( $terms, function ( $a, $b ) {
            $order_a = (int) get_term_meta( $a->term_id, 'order', true );
            $order_b = (int) get_term_meta( $b->term_id, 'order', true );

            return $order_a - $order_b;
        } );

        return $terms;
    }
}
