<?php

if ( ! class_exists( 'WeDocs_Walker_Docs' ) ) :

/**
 * weDocs Docs Walker
 */
class WeDocs_Walker_Docs extends Walker_Page {

    public function start_el( &$output, $page, $depth = 0, $args = array(), $current_page = 0 ) {

        if ( isset( $args['pages_with_children'][ $page->ID ] ) ) {
            $args['link_after'] = '<span class="wedocs-caret"></span>';
        }

        parent::start_el( $output, $page, $depth, $args, $current_page);
    }
}

endif;
