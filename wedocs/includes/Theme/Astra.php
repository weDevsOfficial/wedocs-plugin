<?php

namespace WeDevs\WeDocs\Theme;

/**
 * Twenty Seventeen Support
 */
class Astra {

    /**
     * Constructor
     */
    public function __construct() {
        add_filter( 'astra_page_layout', [ $this, 'page_layout' ] );
    }

    /**
     * Set the correct page layout
     *
     * @param  string $layout
     *
     * @return string
     */
    public function page_layout( $layout ) {

        if ( is_singular( 'docs' ) ) {
            return 'no-sidebar';
        }

        return $layout;
    }
}
