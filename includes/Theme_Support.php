<?php

namespace WeDevs\WeDocs;

/**
 * Theme Support Class.
 *
 * @since 1.4
 */
class Theme_Support {

    /**
     * Theme wrapper class
     *
     * @var \WeDevs\WeDocs\Theme_Support
     */
    public $twenty17;

    /**
     * Theme wrapper class
     *
     * @var \WeDevs\WeDocs\Theme_Support
     */
    public $twenty15;

    /**
     * Initialize the class
     */
    public function __construct() {
        $this->theme_support();
    }

    /**
     * Loads theme compatibility wrappers.
     *
     * @return void
     */
    public function theme_support() {
        $current_theme = get_template();

        switch ( $current_theme ) {
            case 'twentyseventeen':
                $this->twenty17 = new Theme\Twenty_Seventeen();
                break;

            case 'twentyfifteen':
                $this->twenty15 = new Theme\Twenty_Fifteen();
                break;
        }
    }
}
