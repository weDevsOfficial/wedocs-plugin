<?php

/**
 * Theme Support Class
 *
 * @since 1.4
 */
class WeDocs_Theme_Support {

    function __construct() {
        $this->theme_support();
    }

    /**
     * Loads theme compatibility wrappers
     *
     * @return void
     */
    public function theme_support() {
        $current_theme = get_template();

        switch ($current_theme) {
            case 'twentyseventeen':
                include_once __DIR__ . '/theme-support/twentyseventeen.php';
                break;

            case 'twentyfifteen':
                include_once __DIR__ . '/theme-support/twentyfifteen.php';
                break;
        }
    }

}
