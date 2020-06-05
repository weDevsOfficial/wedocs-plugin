<?php

namespace WeDevs\WeDocs\Theme;

/**
 * Twenty Seventeen Support
 */
class Twenty_Seventeen {
    public function __construct() {
        add_filter( 'body_class', [ $this, 'body_classes' ], 99 );

        // remove main actions
        remove_action( 'wedocs_before_main_content', 'wedocs_template_wrapper_start', 10 );
        remove_action( 'wedocs_after_main_content', 'wedocs_template_wrapper_end', 10 );

        // attach new ones
        add_action( 'wedocs_before_main_content', [ $this, 'wrapper_start' ] );
        add_action( 'wedocs_after_main_content', [ $this, 'wrapper_end' ] );
    }

    /**
     * Start wrapper.
     *
     * @return void
     */
    public function wrapper_start() {
        echo '<div class="wrap">';
        echo '<div id="primary" class="content-area">';
        echo '<main id="main" class="site-main" role="main">';
    }

    /**
     * End wrapper.
     *
     * @return void
     */
    public function wrapper_end() {
        echo '</main><!-- #main -->';
        echo '</div><!-- #primary -->';
        echo '</div><!-- .wrap -->';
    }

    /**
     * Make twenty seventeen single docs full width.
     *
     * @param array $classes
     *
     * @return array
     */
    public function body_classes( $classes ) {
        if ( is_singular( 'docs' ) && in_array( 'has-sidebar', $classes ) ) {
            $key = array_search( 'has-sidebar', $classes );

            unset( $classes[ $key ] );
        }

        return $classes;
    }
}
