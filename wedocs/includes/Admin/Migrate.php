<?php

namespace WeDevs\WeDocs\Admin;

/**
 * Migration Class.
 *
 * @since 2.0.0
 */
class Migrate {

    /**
     * Count migrated docs.
     *
     * @since 2.0.0
     *
     * @var int
     */
    private static $migration_done = 0;

    /**
     * Migration progress.
     *
     * @since 2.0.0
     *
     * @var int
     */
    private static $migration_progress = 0;

    /**
     * Count migratable docs length.
     *
     * @since 2.0.0
     *
     * @var int
     */
    private static $migratable_docs_length = 0;

    /**
     * Class Constructor.
     */
    public function __construct() {
        add_action( 'before_delete_post', [ $this, 'reset_migration' ], 10, 2 );
        add_action( 'create_term', [ $this, 'update_migration_status' ], 10, 3 );

        $this->reset_documentation_page();
    }

    /**
     * Check migration availability.
     *
     * @since 2.0.0
     *
     * @return void
     */
    public static function need_migration() {
        // Check is betterdocs available.
        if ( ! self::is_betterdocs_exists() ) {
            wp_send_json_error( [
                'success' => false,
                'message' => __( 'BetterDocs not exists.', 'wedocs' )
            ] );
        }

        // Make migration available if betterdocs category not migrated.
        $migratable_docs = self::betterdocs_migratable_docs();
        $default_parent  = get_option( 'wedocs_migrated_default_parent_doc', 0 );
        if ( ! empty( $migratable_docs['sections'] ) ) {
            wp_send_json_success( [
                'success'   => true,
                'message'   => __( 'Migration done.', 'wedocs' ),
                'parent_id' => $default_parent,
            ] );
        }

        // Check migration availability from DB.
        $need_migration = get_option( 'wedocs_need_migration', false );
        if ( $need_migration ) {
            wp_send_json_success( [
                'success'   => $need_migration,
                'message'   => __( 'Migration done.', 'wedocs' ),
                'parent_id' => $default_parent,
            ] );
        }

        // By default, sent not availability status.
        wp_send_json_error( [
            'success' => false,
            'message' => __( 'Migration not available at this moment.', 'wedocs' )
        ] );
    }

    /**
     * Migrate betterdocs data to weDocs.
     *
     * @since 2.0.0
     *
     * @param array $migratable_docs
     *
     * @return void
     */
    private static function migrate_betterdocs_data( $migratable_docs ) {
        if ( empty( $migratable_docs['sections'] ) ) {
            return;
        }

        // Handle total & migratable sections length count.
        $migratable_sections_length      = count( $migratable_docs['sections'] );
        $total_migratable_section_length = $migratable_sections_length + self::$migration_done;

        $need_migrate_doc = $total_migratable_section_length - self::$migration_done;
        $upgrade_index    = min( $need_migrate_doc, 10 );
        for ( $i = self::$migration_done; $i < $total_migratable_section_length; $i += $upgrade_index ) {
            $section_docs = array_slice( $migratable_docs['sections'], 0, $upgrade_index, true );
            $section_docs = array_map( 'sanitize_text_field', $section_docs );

            // Migrate parent, section, article docs.
            $migrated_docs = self::migrate_categories_to_docs( $section_docs );
            self::migrate_category_docs_to_articles( $migratable_docs, $migrated_docs );

            // Upgrade migration progress.
            self::$migration_done     = self::$migration_done += $upgrade_index;
            self::$migration_progress = floor( ( self::$migration_done / $total_migratable_section_length ) * 100 );

            if ( absint( self::$migration_progress ) === 100 ) {
                self::handle_migration_done();
                wedocs_user_documentation_handling_capabilities();
            }

            wp_send_json_success( [
                'progress'        => self::$migration_progress,
                'migrated_length' => self::$migration_done,
            ] );
        }
    }

    /**
     * Migrate betterdocs category docs to weDocs articles.
     *
     * @since 2.0.0
     *
     * @param array $migratable_docs
     * @param array $migrated_category_ids
     *
     * @return false|mixed|void|null
     */
    private static function migrate_category_docs_to_articles( $migratable_docs, $migrated_category_ids ) {
        // Get migrated article data.
        $migrated_data = get_option( 'wedocs_migrated_article_ids', [] );
        if ( empty( $migratable_docs['articles'] ) ) {
            return $migrated_data;
        }

        foreach ( $migratable_docs['articles'] as $category_id => $articles ) {
            // If article already migrated then continue loop.
            if ( empty( $migrated_category_ids[ $category_id ] ) ) {
                continue;
            }

            foreach ( $articles as $article_id ) {
                $post_data = [
                    'ID'          => $article_id,
                    'post_type'   => 'docs',
                    'post_status' => get_post_status( $article_id ),
                    'post_parent' => $migrated_category_ids[ $category_id ],
                ];

                wp_update_post( $post_data, true );
                $migrated_data[] = $article_id;
            }
        }

        update_option( 'wedocs_migrated_article_ids', $migrated_data );
    }

    /**
     * Insert default parent documentation for sections.
     *
     * @since 2.0.0
     *
     * @return int|\WP_Error
     */
    private static function migrate_default_categories_parent() {
        $post_title = ! empty( $_POST['parentTitle'] ) ? sanitize_text_field( $_POST['parentTitle'] ) : __( 'Untitled Docs', 'wedocs' );

        // Through the parent title array and prepare post data.
        $post_data = [
            'post_type'   => 'docs',
            'post_status' => 'publish',
            'post_title'  => $post_title,
        ];

        $parent_doc_id = wp_insert_post( $post_data, true );
        update_option( 'wedocs_migrated_default_parent_doc', $parent_doc_id );

        return $parent_doc_id;
    }

    /**
     * Migrate betterdocs to weDocs.
     *
     * @since 2.0.0
     *
     * @return void
     */
    public static function do_migration() {
        $migratable_docs      = self::betterdocs_migratable_docs();
        $migrated_docs_length = ! empty( $_POST[ 'migratedDocLength' ] ) ? $_POST[ 'migratedDocLength' ] : 0;

        self::$migration_progress = 0;
        self::$migration_done     = $migrated_docs_length;

        // Count overall migratable docs length.
        $migratable_docs_length = array_reduce( $migratable_docs, function ( $carry, $item ) {
            return $carry + count( $item );
        }, 0 );

        self::$migratable_docs_length = $migratable_docs_length + $migrated_docs_length;

        self::migrate_betterdocs_data( $migratable_docs );
    }

    /**
     * Migration betterdocs categories to documentation sections.
     *
     * @since 2.0.0
     *
     * @param array $section_docs
     *
     * @return array|mixed
     */
    private static function migrate_categories_to_docs( $section_docs ) {
        // Get migrated docs data.
        $migrated_data  = get_option( 'wedocs_migrated_categories', [] );
        $default_parent = get_option( 'wedocs_migrated_default_parent_doc', 0 );

        if ( empty( $default_parent ) ) {
            $default_parent = self::migrate_default_categories_parent();
        }

        // Loop through the titles array and prepare post data
        foreach ( $section_docs as $category_id => $category_title ) {
            $post_data = [
                'post_type'   => 'docs',
                'post_title'  => $category_title,
                'post_parent' => $default_parent,
                'post_status' => 'publish',
            ];

            $migrated_doc_id = wp_insert_post( $post_data, true );
            $migrated_data[ $category_id ] = $migrated_doc_id;
        }

        update_option( 'wedocs_migrated_categories', $migrated_data );

        return $migrated_data;
    }

    /**
     * Update migration status.
     *
     * @since 2.0.0
     *
     * @return void
     */
    public static function handle_migration_done() {
        if ( self::is_betterdocs_textdomain_available() ) {
            deactivate_plugins( [
                'betterdocs/betterdocs.php',
                'betterdocs-pro/betterdocs-pro.php',
            ] );
        }

        // Update migration status.
        update_option( 'wedocs_need_migration', 'done' );
        update_option( 'wedocs_need_reset_documentation_page', true );
    }

    /**
     * Reset default docs page after
     * migration done.
     *
     * @since 2.0.0
     *
     * @return void
     */
    public function reset_documentation_page() {
        $need_reset_documentation_page = get_option( 'wedocs_need_reset_documentation_page', false );

        // Get back weDocs "docs" page ui.
        if ( $need_reset_documentation_page ) {
            // Remove reset option after done.
            delete_option( 'wedocs_need_reset_documentation_page' );
            flush_rewrite_rules();
        }
    }

    /**
     * Collect migratable category & documentation ids.
     *
     * @since 2.0.0
     *
     * @return array
     */
    public static function betterdocs_migratable_docs() {
        $betterdocs_categories = get_terms( [
            'order'      => 'DESC',
            'orderby'    => 'meta_value_num',
            'taxonomy'   => 'doc_category',
            'meta_key'   => 'doc_category_order',
            'hide_empty' => false,
        ] );

        $docs_tree           = [];
        $migrated_categories = get_option( 'wedocs_migrated_categories', [] );
        foreach ( $betterdocs_categories as $category ) {
            // Tree for migratable section docs.
            if ( empty( $migrated_categories[ $category->term_id ] ) ) {
                $docs_tree['sections'][ $category->term_id ] = $category->name;
            }

             $doc_ids = get_term_meta( $category->term_id, '_docs_order', true );
             $doc_ids = ! empty( $doc_ids ) ? explode( ',', $doc_ids ) : [];

             $anchestor_ids = self::get_migratable_article_ids( $doc_ids );
            // Tree for migratable article docs.
             if ( ! empty( $anchestor_ids ) ) {
                 $docs_tree['articles'][ $category->term_id ] = $anchestor_ids;
             }
        }

        return $docs_tree;
    }

    /**
     * Collect migratable article ids.
     *
     * @param array $doc_ids
     *
     * @return array
     */
    private static function get_migratable_article_ids( $doc_ids ) {
        $ids               = [];
        $migrated_docs_ids = get_option( 'wedocs_migrated_article_ids', [] );

        foreach ( $doc_ids as $doc_id ) {
            if ( empty( $migrated_docs_ids[ $doc_id ] ) ) {
                $ids[] = $doc_id;
            }
        }

        return $ids;
    }

    /**
     * Reset migration for migrated parent trash.
     *
     * @since 2.0.0
     *
     * @param int      $doc_id
     * @param \WP_Post $post
     *
     * @return void
     */
    public function reset_migration( $doc_id, $post ) {
        if ( empty( $post->post_type ) || $post->post_type !== 'docs' ) {
            return;
        }

        $default_parent = get_option( 'wedocs_migrated_default_parent_doc', 0 );
        if ( absint( $default_parent ) !== $doc_id ) {
            return;
        }

        delete_option( 'wedocs_need_migration' );
        delete_option( 'wedocs_migrated_categories' );
        delete_option( 'wedocs_migrated_article_ids' );
        delete_option( 'wedocs_migrated_default_parent_doc' );

        $meta_key  = '_doc_order';
        $meta_type = 'term';

        // Get all term ids.
        $term_ids = get_terms( [
            'fields'     => 'ids',
            'taxonomy'   => 'doc_category',
            'hide_empty' => false,
        ] );

        // Loop through each term and delete the specific meta key.
        foreach ( $term_ids as $term_id ) {
            delete_metadata( $meta_type, $term_id, $meta_key );
        }
    }

    /**
     * Update weDocs migration status for betterdocs category insertion.
     *
     * @since 2.0.0
     *
     * @param int    $term_id
     * @param int    $tt_id
     * @param string $taxonomy
     *
     * @return void
     */
    public function update_migration_status( $term_id, $tt_id, $taxonomy ) {
        if ( $taxonomy !== 'doc_category' ) {
            return;
        }

        update_option( 'wedocs_need_migration', true );
    }

    /**
     * Check betterdocs plugin availability.
     *
     * @since 2.0.0
     *
     * @return bool
     */
    public static function is_betterdocs_exists() {
        return class_exists( '\WPDeveloper\BetterDocs\Plugin' ) && self::is_betterdocs_textdomain_available();
    }

    /**
     * Check betterdocs text domain exists.
     *
     * @since 2.0.0
     *
     * @return bool
     */
    public static function is_betterdocs_textdomain_available() {
        $active_plugins = get_option( 'active_plugins' );

        // Check betterdocs domain availability.
        foreach ( $active_plugins as $plugin ) {
            $plugin_data        = get_plugin_data( WP_PLUGIN_DIR . '/' . $plugin );
            $plugin_text_domain = ! empty( $plugin_data[ 'TextDomain' ] ) ? sanitize_key( $plugin_data[ 'TextDomain' ] ) : '';

            if ( $plugin_text_domain === 'betterdocs' ) {
                return true;
            }
        }

        return false;
    }
}
