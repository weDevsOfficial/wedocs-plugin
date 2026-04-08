<?php

namespace WeDevs\WeDocs;

/**
 * Shortcode.
 */
class Shortcode {

    /**
     * Initialize the class
     */
    public function __construct() {
        add_shortcode( 'wedocs', [ $this, 'shortcode' ] );
        add_shortcode( 'wedocs_faq', [ $this, 'faq_shortcode' ] );
    }

    /**
     * Shortcode handler.
     *
     * @param array  $atts
     * @param string $content
     *
     * @return string
     */
    public function shortcode( $atts, $content = '' ) {
        Frontend::enqueue_assets();

        ob_start();
        self::wedocs( $atts );
        $content .= ob_get_clean();

        return $content;
    }

    /**
     * Generic function for displaying docs.
     *
     * @param array $args
     *
     * @return void
     */
    public static function wedocs( $args = [] ) {
        $defaults = [
            'col'      => '2',
            'include'  => 'any',
            'exclude'  => '',
            'items'    => 10,
            'more'     => __( 'View Details', 'wedocs' ),
            'paginate' => '',
        ];

        $args     = wp_parse_args( $args, $defaults );
        $arranged = [];

        $parent_args = [
            'parent'      => 0,
            'post_type'   => 'docs',
            'sort_column' => 'menu_order',
        ];

        if ( 'any' != $args['include'] ) {
            $parent_args['include'] = $args['include'];
        }

        if ( !empty( $args['exclude'] ) ) {
            $parent_args['exclude'] = $args['exclude'];
        }

        $parent_args = apply_filters( 'wedocs_shortcode_page_parent_args', $parent_args );
        $parent_docs = get_pages( $parent_args );

        // Pagination support.
        $per_page    = ! empty( $args['paginate'] ) ? absint( $args['paginate'] ) : 0;
        $total_docs  = is_array( $parent_docs ) ? count( $parent_docs ) : 0;
        $total_pages = 1;
        $current_page = 1;

        if ( $per_page > 0 && $total_docs > $per_page ) {
            $raw_page     = isset( $_GET['wedocs_page'] ) && is_scalar( $_GET['wedocs_page'] )
                                ? wp_unslash( $_GET['wedocs_page'] )
                                : 1;
            $current_page = max( 1, absint( $raw_page ) );
            $total_pages  = (int) ceil( $total_docs / $per_page );
            $current_page = min( $current_page, $total_pages );
            $offset       = ( $current_page - 1 ) * $per_page;
            $parent_docs  = array_slice( $parent_docs, $offset, $per_page );
        }

        // Arrange the section docs.
        if ( $parent_docs ) {
            foreach ( $parent_docs as $root ) {
                $section_args = [
                    'post_parent' => $root->ID,
                    'post_type'   => 'docs',
                    'post_status' => 'publish',
                    'orderby'     => 'menu_order',
                    'order'       => 'ASC',
                    'numberposts' => (int) $args['items'],
                ];

                $section_args = apply_filters( 'wedocs_shortcode_page_section_args', $section_args );
	            $section_docs = get_children( $section_args );

                $arranged[] = [
                    'doc'      => $root,
                    'sections' => $section_docs,
                ];
            }
        }

        // Count documentation length.
        $docs_length = ! empty( $arranged ) ? count( $arranged ) : 0;

	    /**
	     * Handle single docs template directory.
	     *
	     * @since 2.0.0
	     *
	     * @param string $template_dir
	     *
	     * @return string
	     */
        $template_dir = apply_filters( 'wedocs_get_doc_listing_template_dir', 'shortcode.php' );

	    /**
	     * Handle single doc template arguments.
	     *
	     * @since 2.0.0
	     *
	     * @param array $template_args
	     *
	     * @return array
	     */
        $template_args = apply_filters(
            'wedocs_get_doc_listing_template_args',
            array(
                'docs'          => $arranged,
                'more'          => $args['more'],
                'col'           => (int) ( $docs_length === 1 ? $docs_length : $args['col'] ),
                'enable_search' => wedocs_get_general_settings( 'enable_search', 'on' ),
                'show_faq'      => wedocs_get_general_settings( 'show_faq', 'off' ),
                'current_page'  => $current_page,
                'total_pages'   => $total_pages,
            )
        );

        // Render single documentation template.
        wedocs_get_template( $template_dir, $template_args );
    }

    /**
     * FAQ shortcode handler.
     *
     * @since WEDOCS_SINCE
     *
     * @param array  $atts    Shortcode attributes.
     * @param string $content Shortcode content.
     *
     * @return string
     */
    public function faq_shortcode( $atts, $content = '' ) {
        Frontend::enqueue_assets();

        ob_start();
        self::wedocs_faq( $atts );
        $content .= ob_get_clean();

        return $content;
    }

    /**
     * Query and render FAQ groups and items.
     *
     * @since WEDOCS_SINCE
     *
     * @param array $args Shortcode attributes.
     *
     * @return void
     */
    public static function wedocs_faq( $args = [] ) {
        wp_enqueue_style( 'wedocs-faq' );
        wp_enqueue_script( 'wedocs-faq' );

        $defaults = [
            'group'   => '',
            'limit'   => -1,
            'orderby' => 'menu_order',
            'order'   => 'ASC',
        ];

        $args = wp_parse_args( $args, $defaults );

        $group_query_args = [
            'taxonomy'   => 'wedocs_faq_group',
            'hide_empty' => true,
        ];

        // Filter by specific group slug(s).
        if ( ! empty( $args['group'] ) ) {
            $group_query_args['slug'] = array_map( 'trim', explode( ',', $args['group'] ) );
        }

        $faq_groups = get_terms( $group_query_args );

        if ( empty( $faq_groups ) || is_wp_error( $faq_groups ) ) {
            return;
        }

        // Build FAQ data keyed by group.
        $faq_data = [];

        foreach ( $faq_groups as $group ) {
            // WP deletes the meta row when storing boolean false, so an empty
            // get_term_meta result can mean either "never set" (treat as active)
            // or "explicitly disabled". Use metadata_exists() to tell them apart.
            $has_status = metadata_exists( 'term', $group->term_id, 'status' );
            $status     = get_term_meta( $group->term_id, 'status', true );

            // Skip groups that were explicitly disabled.
            if ( $has_status && ! $status ) {
                continue;
            }

            $faq_query_args = [
                'post_type'      => 'wedocs_faq',
                'posts_per_page' => (int) $args['limit'],
                'orderby'        => $args['orderby'],
                'order'          => $args['order'],
                'tax_query'      => [ // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
                    [
                        'taxonomy' => 'wedocs_faq_group',
                        'field'    => 'term_id',
                        'terms'    => $group->term_id,
                    ],
                ],
            ];

            /**
             * Filter the FAQ query arguments for a specific group.
             *
             * @since WEDOCS_SINCE
             *
             * @param array    $faq_query_args WP_Query arguments.
             * @param \WP_Term $group          The FAQ group term.
             * @param array    $args           Shortcode attributes.
             */
            $faq_query_args = apply_filters( 'wedocs_faq_shortcode_query_args', $faq_query_args, $group, $args );

            $faqs = get_posts( $faq_query_args );

            if ( empty( $faqs ) ) {
                continue;
            }

            $faq_data[] = [
                'group' => $group,
                'faqs'  => $faqs,
            ];
        }

        if ( empty( $faq_data ) ) {
            return;
        }

        /**
         * Filter the FAQ shortcode template path.
         *
         * @since WEDOCS_SINCE
         *
         * @param string $template_dir Template file name.
         */
        $template_dir = apply_filters( 'wedocs_get_faq_listing_template_dir', 'shortcode-faq.php' );

        /**
         * Filter the FAQ shortcode template arguments.
         *
         * @since WEDOCS_SINCE
         *
         * @param array $template_args Template arguments.
         */
        $template_args = apply_filters(
            'wedocs_get_faq_listing_template_args',
            [
                'faq_data' => $faq_data,
            ]
        );

        wedocs_get_template( $template_dir, $template_args );
    }
}
