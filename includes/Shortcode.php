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
        
        $defaults = apply_filters(
            'wedocs/shortcode/defaults',
            $defaults
        );

        $args     = wp_parse_args( $args, $defaults );
        $arranged = [];        
        
        $args = apply_filters(
            'wedocs/shortcode/args',
            $args
        );

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
        
        $parent_args = apply_filters(
            'wedocs/shortcode/parent_args',
            $parent_args
        );

        $parent_docs = get_pages( $parent_args );

        // arrange the docs
        if ( $parent_docs ) {
            foreach ( $parent_docs as $root ) {
                $children_args = [
                    'post_parent' => $root->ID,
                    'post_type'   => 'docs',
                    'post_status' => 'publish',
                    'orderby'     => 'menu_order',
                    'order'       => 'ASC',
                    'numberposts' => (int) $args['items'],
                ];
                
                $children_args = apply_filters(
                    'wedocs/shortcode/children_args',
                    $children_args
                );
                
                $sections = get_children($children_args);

                $arranged[] = [
                    'doc'      => $root,
                    'sections' => $sections,
                ];
            }
        }
        
        $template_args = [
            'docs' => $arranged,
            'col'  => (int) $args['col'],
            'more' => $args['more'],
        ];
        
        $template_args = apply_filters(
            'wedocs/shortcode/template_args',
            $template_args
        );

        // call the template
        wedocs_get_template( 'shortcode.php', $template_args );
    }
}
