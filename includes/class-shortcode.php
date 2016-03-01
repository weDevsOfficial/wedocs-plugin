<?php

/**
 * Shortcode
 */
class WeDocs_Shortcode_Handler {

    public function __construct() {
        add_shortcode( 'wedocs', array( $this, 'shortcode' ) );
    }

    /**
     * Shortcode handler
     *
     * @param  array  $atts
     * @param  string  $content
     *
     * @return string
     */
    public function shortcode( $atts, $content = '' ) {

        ob_start();
        self::wedocs( $atts );
        $content .= ob_get_clean();

        return $content;
    }

    /**
     * Generic function for displaying docs
     *
     * @param  array   $args
     *
     * @return void
     */
    public static function wedocs( $args = array() ) {
        $defaults = array(
            'col'     => '2',
            'include' => 'any',
            'exclude' => '',
            'more'    => __( 'View Details', 'wedocs' )
        );

        $args     = wp_parse_args( $args, $defaults );
        $arranged = array();

        $parent_args     = array(
            'post_type'   => 'docs',
            'parent'      => 0,
            'sort_column' => 'menu_order'
        );

        if ( 'any' != $args['include'] ) {
            $parent_args['include'] = $args['include'];
        }

        if ( !empty( $args['exclude'] ) ) {
            $parent_args['exclude'] = $args['exclude'];
        }

        $parent_docs = get_pages( $parent_args );

        // arrange the docs
        if ( $parent_docs ) {
            foreach ($parent_docs as $root) {
                $sections = get_children( array(
                    'post_parent' => $root->ID,
                    'post_type'   => 'docs',
                    'post_status' => 'publish',
                    'orderby'     => 'menu_order',
                    'order'       => 'ASC'
                ) );

                $arranged[] = array(
                    'doc'      => $root,
                    'sections' => $sections
                );
            }
        }

        // call the template
        wedocs_get_template( 'shortcode.php', array(
            'docs' => $arranged,
            'col'  => (int) $args['col'],
            'more' => $args['more']
        ) );
    }
}

new WeDocs_Shortcode_Handler();
