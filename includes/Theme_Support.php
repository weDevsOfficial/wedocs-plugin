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
     * @var \WeDevs\WeDocs\Theme\Twenty_Seventeen
     */
    public $twenty17;

    /**
     * Theme wrapper class
     *
     * @var \WeDevs\WeDocs\Theme\Twenty_Fifteen
     */
    public $twenty15;

    /**
     * Theme wrapper class
     *
     * @var \WeDevs\WeDocs\Theme\Astra
     */
    public $astra;

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

            case 'astra':
                $this->astra = new Theme\Astra();
                break;
        }
    }
}
