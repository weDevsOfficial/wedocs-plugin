<?php

namespace WeDevs\WeDocs\Admin;

/**
 * Admin Class.
 */
class Admin {

    /**
     * Constructor
     */
    public function __construct() {
        add_action( 'admin_enqueue_scripts', [ $this, 'admin_scripts' ] );

        new Menu();
//        add_action( 'admin_menu', [ $this, 'admin_menu' ] );
        add_filter( 'parent_file', [$this, 'fix_tag_menu' ] );

        add_filter( 'admin_footer_text', [ $this, 'admin_footer_text' ], 1 );
    }

    /**
     * Load admin scripts and styles.
     *
     * @param string $hook
     *
     * @return void
     */
    public function admin_scripts( $hook ) {
        if ( 'toplevel_page_wedocs' !== $hook  ) {
            return;
        }

        $assets_url = wedocs()->plugin_url() . '/assets';

        if ( file_exists( WEDOCS_PATH . '/hot/index.asset.php' ) ) {
            $react_dependencies = require WEDOCS_PATH . '/hot/index.asset.php';

            // Adding wedocs necessary assets.
            wp_enqueue_style( 'wedocs-app-style', WEDOCS_URL . '/hot/index.css', [], $react_dependencies['version'] );
            wp_enqueue_script( 'wedocs-app-script', WEDOCS_URL . '/hot/index.js', $react_dependencies['dependencies'], $react_dependencies['version'], true );
        }
    }

    /**
     * Get the admin menu position.
     *
     * @return int the position of the menu
     */
    public function get_menu_position() {
        return apply_filters( 'wedocs_menu_position', 48 );
    }

    /**
     * Add menu items.
     *
     * @return void
     */
    public function admin_menu() {
        $capability = wedocs_get_publish_cap();

        add_menu_page( __( 'weDocs', 'wedocs' ), __( 'weDocs', 'wedocs' ), $capability, 'wedocs', [ $this, 'page_index' ], 'dashicons-media-document', $this->get_menu_position() );
        add_submenu_page( 'wedocs', __( 'Docs', 'wedocs' ), __( 'Docs', 'wedocs' ), $capability, 'wedocs#/', [ $this, 'page_index' ] );
        add_submenu_page( 'wedocs', __( 'Tags', 'wedocs' ), __( 'Tags', 'wedocs' ), 'manage_categories', 'edit-tags.php?taxonomy=doc_tag&post_type=docs' );
    }

    /**
     * highlight the proper top level menu.
     *
     * @see http://wordpress.org/support/topic/moving-taxonomy-ui-to-another-main-menu?replies=5#post-2432769
     *
     * @global obj $current_screen
     *
     * @param string $parent_file
     *
     * @return string
     */
    public function fix_tag_menu( $parent_file ) {
        global $current_screen;

        if ( 'doc_tag' == $current_screen->taxonomy || 'docs' == $current_screen->post_type ) {
            $parent_file = 'wedocs';
        }

        return $parent_file;
    }

    /**
     * UI Page handler.
     *
     * @return void
     */
    public function page_index() {
        wedocs_get_template_part( 'admin/docs' );
    }

    public function set_pro_docs_location( $location ) {
        return 'adminn/docss';
    }

    public function set_pro_docs_arguments( $args ) {
        return array_merge( array( 'pro' => true ), $args );
    }

    /**
     * Change the admin footer text on weDocs admin pages.
     *
     * @param string $footer_text
     *
     * @return string
     */
    public function admin_footer_text( $footer_text ) {
        $footer_text    = '';
        $current_screen = get_current_screen();
        $pages          = [ 'toplevel_page_wedocs', 'edit-docs' ];

        // Check to make sure we're on a wedocs admin page
        if ( isset( $current_screen->id ) && apply_filters( 'wedocs_display_admin_footer_text', in_array( $current_screen->id, $pages ) ) ) {
            if ( !get_option( 'wedocs_admin_footer_text_rated' ) ) {
                $footer_text .= ' ' . sprintf( __( 'Thank you for using <strong>weDocs</strong>. Please leave us a %s&#9733;&#9733;&#9733;&#9733;&#9733;%s rating.', 'wedocs' ), '<a href="https://wordpress.org/support/view/plugin-reviews/wedocs?filter=5#postform" target="_blank" class="wedocs-rating-link" data-rated="' . esc_attr__( 'Thanks :)', 'wedocs' ) . '">', '</a>' );
                $script = '<script type="text/javascript">
                    jQuery(function($){$( "a.wedocs-rating-link" ).click( function() {
                        $.post( ajaxurl, { action: "wedocs_rated", _wpnonce: weDocs.nonce } );
                        $( this ).parent().text( $( this ).data( "rated" ) );
                    });});
                    </script>
                ';

                echo $script;
            } else {
                $footer_text .= ' ' . __( 'Thank you for using <strong>weDocs</strong>.', 'wedocs' );
            }

            $footer_text .= ' ' . sprintf( __( 'Use the <a href="%s">classic UI</a>.', 'wedocs' ), admin_url( 'edit.php?post_type=docs' ) );
        }

        return $footer_text;
    }
}
