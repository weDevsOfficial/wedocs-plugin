<?php

namespace WeDevs\WeDocs\Theme;

/**
 * 2015
 */
class Twenty_Fifteen {
    public function __construct() {
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
        echo '<div id="primary" class="content-area">';
        echo '<main id="main" class="site-main" role="main">';
        echo '<div class="hentry">';
    }

    /**
     * End wrapper.
     *
     * @return void
     */
    public function wrapper_end() {
        echo '</div><!-- .hentry -->';
        echo '</main><!-- .site-main -->';
        echo '</div><!-- .content-area -->';
    }
}
