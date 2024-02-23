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
//        // Pagination variables
//        $paged          = (int) ( ! empty( $_GET['paged'] ) ? $_GET['paged'] : get_query_var( 'paged' ) );
//        $current_page   = ! empty( $paged ) ? max( 1, $paged ) : 1;
//        $items_per_page = 10;
//        $offset         = ( $current_page - 1 ) * $items_per_page;
//
//        // Fetch all parent docs
//        $docs_for_page = get_pages( [
//            'post_type'      => 'docs',
//            'post_status'    => [ 'publish', 'draft', 'pending' ],
//            'number'         => $items_per_page,
//            'orderby'        => 'menu_order',
//            'offset'         => $offset,
//            'order'          => 'ASC',
//            'parent'         => 0,
//        ] );
//
//        $total_docs  = count( $docs_for_page );
////        error_log( print_r( $total_docs, 1 ) );
////        error_log( print_r( $test_docs, 1 ) );
//        $total_pages = (int) ceil( $total_docs / $items_per_page );
//
//        // Get docs for the current page
////        $docs_for_page = array_slice( $test_docs, $offset, $items_per_page );
//
//        // Render docs
//        foreach ( $docs_for_page as $doc ) {
//            echo '<div>' . $doc->post_title . '</div>'; // Customize as needed
//        }
//
//        $pagination = paginate_links( array(
//            'format'   => '?paged=%#%',
//            'current'  => max( 1, get_query_var( 'paged' ) ),
//            'end_size' => 3, // number of pages on either the start and the end list edges
//            'mid_size' => 1, // number of pages on either the start and the end list edges
//            'total'    => $total_pages,
//            'type'     => 'array', // Return pagination links as an array
//            'prev_next' => true,
//            'prev_text' => '<span>
//                <svg width="20" height="21" fill="none">
//                    <path
//                        fill="#475569"
//                        fill-rule="evenodd"
//                        d="M12.707 5.68a1 1 0 0 1 0 1.414l-3.293 3.293 3.293 3.293a1 1 0 0 1-1.414 1.414l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0z"
//                    />
//                </svg>
//            </span>',
//            'next_text' => '<span>
//                <svg width="20" height="21" fill="none">
//                    <path
//                        fill="#475569"
//                        fill-rule="evenodd"
//                        d="M7.293 15.094a1 1 0 0 1 0-1.414l3.293-3.293-3.293-3.293A1 1 0 1 1 8.707 5.68l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0z"
//                    />
//                </svg>
//            </span>',
//        ) );
//
//        if ( is_array( $pagination ) ) {
//            echo '<div class="pagination"><ul>';
//
//            if ( $current_page === 1 ) {
//                echo '<li class="disabled">
//                            <span>
//                                <svg width="20" height="21" fill="none">
//                                    <path
//                                        fill="#475569"
//                                        fill-rule="evenodd"
//                                        d="M12.707 5.68a1 1 0 0 1 0 1.414l-3.293 3.293 3.293 3.293a1 1 0 0 1-1.414 1.414l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0z"
//                                    />
//                                </svg>
//                            </span>
//                        </li>'; // "Previous" disabled
//            }
//
//            foreach ( $pagination as $page_link ) {
//                echo '<li>' . $page_link . '</li>';
//            }
//
//            if ( $current_page === $total_pages ) {
//                echo '<li class="disabled">
//                            <span>
//                                <svg width="20" height="21" fill="none">
//                                    <path
//                                        fill="#475569"
//                                        fill-rule="evenodd"
//                                        d="M7.293 15.094a1 1 0 0 1 0-1.414l3.293-3.293-3.293-3.293A1 1 0 1 1 8.707 5.68l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0z"
//                                    />
//                                </svg>
//                            </span>
//                        </li>'; // "Next" disabled
//            }
//
//            echo '</ul></div>';
//        }

        // Pagination variables
        $paged          = (int) ( ! empty( $_GET['paged'] ) ? $_GET['paged'] : get_query_var( 'paged' ) );
        $current_page   = ! empty( $paged ) ? max( 1, $paged ) : 1;
        $items_per_page = 10;
        $offset         = ( $current_page - 1 ) * $items_per_page;

        $defaults = [
            'col'     => '2',
            'include' => 'any',
            'exclude' => '',
            'items'   => 10,
            'more'    => __( 'View Details', 'wedocs' ),
        ];

        $args     = wp_parse_args( $args, $defaults );
        $arranged = [];

        $parent_args = [
            'parent'    => 0,
            'offset'    => $offset,
            'post_type' => 'docs',
            'orderby'   => 'menu_order',
            'number'    => $items_per_page,
        ];

        if ( 'any' != $args['include'] ) {
            $parent_args['include'] = $args['include'];
        }

        if ( !empty( $args['exclude'] ) ) {
            $parent_args['exclude'] = $args['exclude'];
        }

        $parent_args = apply_filters( 'wedocs_shortcode_page_parent_args', $parent_args );
        $parent_docs = get_pages( $parent_args );

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
                'paged' => $current_page,
                'more'  => $args['more'],
                'docs'  => $arranged,
                'col'   => (int) ( $docs_length === 1 ? $docs_length : $args['col'] ),
            )
        );

        // Render single documentation template.
        wedocs_get_template( $template_dir, $template_args );
    }
}
