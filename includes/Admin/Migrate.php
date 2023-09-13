<?php

namespace WeDevs\WeDocs\Admin;

/**
 * Migration Class.
 *
 * @since WEDOCS_SINCE
 */
class Migrate {

    /**
     * Class Constructor.
     */
    public function __construct() {
//        new Menu();
//
//        add_action( 'admin_enqueue_scripts', [ $this, 'admin_scripts' ] );
//
//        add_filter( 'parent_file', array( $this, 'fix_tag_menu' ) );
//        add_filter( 'admin_footer_text', array( $this, 'admin_footer_text' ), 1 );
//        add_action( 'created_term', [ $this, 'handle_betterdocs_category_update' ], 10, 3 );
//        add_action( 'edited_term', [ $this, 'handle_betterdocs_category_update' ], 10, 3 );
        add_action( 'wedocs_migration_runner', [ $this, 'do_migrate' ] );
        add_action( 'saved_doc_category', [ $this, 'handle_betterdocs_category_update' ], 10, 4 );
        add_action( 'save_post_docs', [ $this, 'handle_documentation_insert' ], 10, 3 );
        add_action( 'pre_post_update', [ $this, 'handle_documentation_update' ], 10, 2 );
    }

    public function handle_documentation_update( $post_id, $data ) {
        error_log( print_r( wp_get_post_terms( $post_id, 'doc_category', array( 'fields' => 'ids' ) ), 1 ) );
        error_log( print_r( $post_id, 1 ) );
        error_log( print_r( $data, 1 ) );
    }

    public function handle_documentation_insert( $post_id, $data, $update ) {
        // Get the taxonomy terms associated with the post
        $terms = wp_get_post_terms( $post_id, 'doc_category' );
        if ( ! $update && ! empty( $terms ) ) {
            update_option( 'wedocs_need_migration', true );
        }
    }

    public function handle_betterdocs_category_update( $term_id, $taxonomy_id, $update, $args ) {
        if ( ! $update ) {
            update_option( 'wedocs_need_migration', true );
            return;
        }

        // Get the category object.
        $category      = get_term( $term_id, $taxonomy_id );
        $category_name = ! empty( $args['name'] ) ? sanitize_text_field( wp_unslash( $args['name'] ) ) : '';

        // Check if the category title has been updated.
        if ( $category_name !== $category->name ) {
            update_option( 'wedocs_need_migration', true );
        }
    }

    public function need_migration() {
        if ( ! $this->is_betterdocs_exists() ) {
            return false;
        }

        $need_migration = get_option( 'wedocs_need_migration', false );
        if ( $need_migration ) {
            return true;
        }

        $migratable_docs = $this->betterdocs_migratable_docs();
        if ( ! empty( $migratable_docs ) ) {
            return true;
        }

        return false;
    }

    public function betterdocs_migratable_docs() {
        $betterdoc_categories = get_terms( [
            'hide_empty' => false,
            'taxonomy'   => 'doc_category'
        ] );

        $migrated_categories = get_option( 'wedocs_migrated_categories' );
        $migrated_categories = explode( ',', $migrated_categories );

        $docs_tree = [];
        foreach ( $betterdoc_categories as $category ) {
            if ( ! in_array( $category->term_id, array_keys( $migrated_categories ), true ) ) {
                $docs_tree['parents'][ $category->term_id ] = $category->name;
            }

            $doc_ids = get_term_meta( $category->term_id, '_docs_order', true );
            $doc_ids = ! empty( $doc_ids ) ? explode( ',', $doc_ids ) : [];

            $anchestor_ids = $this->split_doc_ids( $doc_ids );
            $docs_tree     = ! empty( $anchestor_ids ) ? array_merge( $anchestor_ids, $docs_tree ) : $docs_tree;
        }

        return $docs_tree;
    }

    private function split_doc_ids( $doc_ids ) {
        $ids                    = [];
        $migrated_category_docs = get_option( 'wedocs_migrated_category_docs' );
        $migrated_category_docs = explode( ',', $migrated_category_docs );
        foreach ( $doc_ids as $doc_id ) {
            if ( in_array( $doc_id, $migrated_category_docs, true ) ) {
                continue;
            }

            $parent_id = (int) wp_get_post_parent_id( $doc_id );
            if ( $this->is_a_parent_doc( $doc_id ) || !in_array( $parent_id, $doc_ids ) ) {
                $ids['sections'][] = $doc_id;
                continue;
            }

            // Find grandparent doc id & set it as section. Also, assign doc id as article.
            $anchestors_ids  = get_post_ancestors( $doc_id );
            $grand_parent_id = end( $anchestors_ids );

            $ids['articles'][ $grand_parent_id ][] = $doc_id;
        }

        return $ids;
    }

    public function is_a_parent_doc( $doc_id ) {
        return (int) wp_get_post_parent_id( $doc_id ) === 0;
    }

    public function is_betterdocs_exists() {
        return class_exists( '\WPDeveloper\BetterDocs\Plugin' ) && $this->is_betterdocs_textdomain_available();
    }

    public function do_migrate() {
        $migratable_docs = $this->betterdocs_migratable_docs();

        $parent_docs  = ! empty( $migratable_docs['parents'] ) ? array_map( 'sanitize_text_field', $migratable_docs['parents'] ) : [];
        $section_docs = ! empty( $migratable_docs['sections'] ) ? array_map( 'absint', $migratable_docs['sections'] ) : [];
        $article_docs = ! empty( $migratable_docs['articles'] ) ? array_map( 'absint', $migratable_docs['articles'] ) : [];

//        error_log( print_r( $migratable_docs, 1 ) );
//        error_log( print_r( 'parents', 1 ) );
//        error_log( print_r( $parent_docs, 1 ) );
//        error_log( print_r( 'sections', 1 ) );
//        error_log( print_r( $section_docs, 1 ) );
//        error_log( print_r( 'articles', 1 ) );
//        error_log( print_r( $article_docs, 1 ) );
        $this->migrate_betterdocs_categories_to_docs( $parent_docs );

        update_option( 'wedocs_migration_runner', 'done' );
    }

    private function migrate_betterdocs_categories_to_docs( $parent_docs ) {
        // Prepare an array to store post data
        $posts_data = [];

        // Loop through the titles array and prepare post data
        foreach ( $parent_docs as $category_title ) {
            $post_data = [
                'post_title'  => $category_title,
                'post_status' => 'publish',
                'post_type'   => 'docs'
            ];

            $posts_data[] = $post_data;
        }

        $post_ids = wp_insert_post( $posts_data, true );

        error_log( print_r( $post_ids, 1 ) );
    }

    public function is_betterdocs_textdomain_available() {
        $active_plugins = get_option('active_plugins');
        foreach ( $active_plugins as $plugin ) {
            $plugin_data        = get_plugin_data( WP_PLUGIN_DIR . '/' . $plugin );
            $plugin_text_domain = ! empty( $plugin_data[ 'TextDomain' ] ) ? sanitize_key( $plugin_data[ 'TextDomain' ] ) : '';

            if ( $plugin_text_domain === 'betterdocs' ) {
                return true;
            }
        }

        return false;
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

        if ( file_exists( WEDOCS_PATH . '/assets/build/index.asset.php' ) ) {
            $react_dependencies = require WEDOCS_PATH . '/assets/build/index.asset.php';

            // Adding wedocs necessary assets.
            wp_enqueue_style( 'wedocs-app-style', WEDOCS_URL . '/assets/build/index.css', [], $react_dependencies['version'] );
            wp_enqueue_script( 'wedocs-app-script', WEDOCS_URL . '/assets/build/index.js', $react_dependencies['dependencies'], $react_dependencies['version'], true );
        }
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

        if ( 'doc_tag' === $current_screen->taxonomy || 'docs' === $current_screen->post_type ) {
            $parent_file = 'wedocs';
        }

        return $parent_file;
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
