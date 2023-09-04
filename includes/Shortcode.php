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
            'post_type'   => 'docs',
            'parent'      => 0,
            'sort_column' => 'menu_order',
        ];

        if ( 'any' != $args['include'] ) {
            $parent_args['include'] = $args['include'];
        }

        if ( !empty( $args['exclude'] ) ) {
            $parent_args['exclude'] = $args['exclude'];
        }

        $parent_docs = get_pages( $parent_args );

        // Arrange the section docs.
        if ( $parent_docs ) {
            foreach ( $parent_docs as $root ) {
	            $section_docs = get_children( [
                    'post_parent' => $root->ID,
                    'post_type'   => 'docs',
                    'post_status' => 'publish',
                    'orderby'     => 'menu_order',
                    'order'       => 'ASC',
                    'numberposts' => (int) $args['items'],
                ] );

                $arranged[] = [
                    'doc'      => $root,
                    'sections' => $section_docs,
                ];
            }
        }

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
                'docs' => $arranged,
                'more' => $args['more'],
                'col'  => (int) $args['col'],
            )
        );

        // Render single documentation template.
        wedocs_get_template( $template_dir, $template_args );
    }
}
