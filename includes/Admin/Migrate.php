<?php

namespace WeDevs\WeDocs\Admin;

/**
 * Migration Class.
 *
 * @since 2.0.0
 */
class Migrate {

    private static $migration_done = 0;

    private static $migratable_docs_length = 0;

    private static $migration_progress = 0;

    /**
     * Class Constructor.
     */
    public function __construct() {
//        add_action( 'wedocs_migration_runner', [ $this, 'do_migration' ] );
        add_action( 'create_term', [ $this, 'migrate_category_insert_status' ], 10, 3 );
        add_action( 'save_post_docs', [ $this, 'migrate_documentation_insert_status' ], 10, 3 );
    }

    public function migrate_documentation_insert_status( $post_id, $data, $update ) {
        // Get the taxonomy terms associated with the post
        $terms = wp_get_post_terms( $post_id, 'doc_category' );
        if ( ! $update && ! empty( $terms ) ) {
            update_option( 'wedocs_need_migration', true );
        }
    }

    public function migrate_category_insert_status( $term_id, $tt_id, $taxonomy ) {
        if ( $taxonomy === 'doc_category' ) {
            update_option( 'wedocs_need_migration', true );
        }

//        // Get the category object.
//        $category      = get_term( $term_id, $taxonomy_id );
//        $category_name = ! empty( $args['name'] ) ? sanitize_text_field( wp_unslash( $args['name'] ) ) : '';
//
//        // Check if the category title has been updated.
//        if ( $category_name !== $category->name ) {
//            update_option( 'wedocs_need_migration', true );
//        }
    }

    public static function need_migration() {
        if ( ! self::is_betterdocs_exists() ) {
            wp_send_json_error( [
                'success' => false,
                'message' => __( 'BetterDocs not exists.', 'wedocs' )
            ] );
        }

        $migratable_docs = self::betterdocs_migratable_docs();
//        self::migrate_uncategorized_docs();
        if ( ! empty( $migratable_docs ) ) {
            wp_send_json_success( [
                'success' => true,
                'message' => __( 'Migration done.', 'wedocs' )
            ] );
        }

        $need_migration = get_option( 'wedocs_need_migration', false );
//        error_log( print_r( $need_migration, 1 ) );
        if ( $need_migration ) {
            wp_send_json_success( [
                'success' => $need_migration,
                'message' => __( 'Migration done.', 'wedocs' )
            ] );
        }

        wp_send_json_error( [
            'success' => false,
            'message' => __( 'Migration not available at this moment.', 'wedocs' )
        ] );
    }

//    public function betterdocs_migratable_docs() {
//        $betterdoc_categories = get_terms( [
//            'hide_empty' => false,
//            'order'      => 'DESC',
//            'order_by'   => 'term_id',
//            'taxonomy'   => 'doc_category'
//        ] );
//
//        $docs_tree           = [];
//        $migrated_categories = get_option( 'wedocs_migrated_categories', [] );
//        foreach ( $betterdoc_categories as $category ) {
//            if ( empty( $migrated_categories[ $category->term_id ] ) ) {
//                $docs_tree['sections'][ $category->term_id ] = $category->name;
//            }
//
//            $doc_ids = get_term_meta( $category->term_id, '_docs_order', true );
//            $doc_ids = ! empty( $doc_ids ) ? explode( ',', $doc_ids ) : [];
//
//            $anchestor_ids = $this->split_doc_ids( $doc_ids, $category->term_id );
//            $docs_tree     = array_merge_recursive( $docs_tree, $anchestor_ids );
//        }
//
//        return $docs_tree;
//    }

    public static function migrate_category_to_sections( $migratable_docs ) {
        if ( empty( $migratable_docs['sections'] ) ) {
            return;
        }

        $need_migrate_doc = self::$migratable_docs_length - self::$migration_done;
        $upgrade_index    = min( $need_migrate_doc, 10 );
        for ( $i = self::$migration_done; $i < self::$migratable_docs_length; $i += $upgrade_index ) {
            $parent_docs = array_slice( $migratable_docs['sections'], 0, $upgrade_index, true );
            $parent_docs = array_map( 'sanitize_text_field', $parent_docs );

            // Migrate parent, section, article docs.
            $migrated_docs = self::migrate_categories_to_docs( $parent_docs );
            self::migrate_category_docs_to_articles( $migratable_docs, $migrated_docs );

            // Upgrade migration progress.
            self::$migration_done     = self::$migration_done += $upgrade_index;
            self::$migration_progress = floor( ( self::$migration_done / self::$migratable_docs_length ) * 100 );

            if ( absint( self::$migration_progress ) === 100 ) {
                update_option( 'wedocs_need_migration', 'done' );
//                self::migrate_uncategorized_docs();
            }

            wp_send_json_success( [
                'progress'        => self::$migration_progress,
                'migrated_length' => self::$migration_done,
            ] );
        }
    }

    private static function migrate_uncategorized_docs() {
        $default_parent = (int) get_option( 'wedocs_migrated_default_parent_doc', 0 );
        if ( empty( $default_parent ) ) {
            return $default_parent;
        }

        $migratable_docs = self::get_uncategorized_docs();
        error_log( print_r( $migratable_docs, 1 ) );
        if ( empty( $migratable_docs ) ) {
            return $migratable_docs;
        }

        $migratable_docs = array_filter( $migratable_docs, function ( $doc ) use ( $default_parent ) {
            if ( $default_parent === $doc->ID ) {
                return false;
            }

            $anchestors_ids  = get_post_ancestors( $doc->ID );
            $grand_parent_id = end( $anchestors_ids );

            return $grand_parent_id !== absint( $default_parent );
        } );

        return $migratable_docs;
    }

    public static function get_uncategorized_docs() {
        global $wpdb;

        $_post__not_in_query = $wpdb->prepare(
            "SELECT ID as post_id from $wpdb->posts WHERE post_type = %s AND post_status != 'trash' AND ID NOT IN ( SELECT object_id as post_id FROM $wpdb->term_relationships WHERE term_taxonomy_id IN ( SELECT term_taxonomy_id FROM $wpdb->term_taxonomy WHERE taxonomy = %s ) )",
            'docs',
            'doc_category'
        );

        $uncategorized_posts = [];
        $_post__not_in       = $wpdb->get_col( $_post__not_in_query );
        if ( empty( $_post__not_in ) ) {
            return $uncategorized_posts;
        }

        $uncategorized_posts = get_posts( [
            'post_status' => 'any',
            'post_type'   => 'docs',
            'post__in'    => $_post__not_in
        ] );

        return $uncategorized_posts;
    }

    private static function migrate_category_docs_to_articles( $migratable_docs, $migrated_category_ids ) {
        // Get migrated article data.
        $migrated_data = get_option( 'wedocs_migrated_article_ids', [] );
        if ( empty( $migratable_docs['articles'] ) ) {
            return $migrated_data;
        }

        foreach ( $migratable_docs['articles'] as $category_id => $articles ) {
            if ( ! empty( $migrated_category_ids[ $category_id ] ) ) {
                foreach ( $articles as $article_id ) {
                    $post_data = [
                        'ID'          => $article_id,
                        'post_type'   => 'docs',
                        'post_parent' => $migrated_category_ids[ $category_id ],
                    ];

                    wp_update_post( $post_data, true );
                    $migrated_data[] = $article_id;
                }
            }
        }

        update_option( 'wedocs_migrated_article_ids', $migrated_data );

        return $migrated_data;
    }

    private static function migrate_default_categories_parent() {
        // Through the parent title array and prepare post data.
        $post_data = [
            'post_type'   => 'docs',
            'post_status' => 'publish',
            'post_title'  => __( 'Untitled Docs', 'wedocs' ),
        ];

        $parent_doc_id = wp_insert_post( $post_data, true );
        update_option( 'wedocs_migrated_default_parent_doc', $parent_doc_id );

        return $parent_doc_id;
    }

    public static function do_migration() {
        $migratable_docs      = self::betterdocs_migratable_docs();
        $migrated_docs_length = ! empty( $_POST[ 'migratedDocLength' ] ) ? $_POST[ 'migratedDocLength' ] : 0;

        self::$migration_progress = 0;
        self::$migration_done     = $migrated_docs_length;

        $migratable_docs_length = array_reduce( $migratable_docs, function ( $carry, $item ) {
            return $carry + count( $item );
        }, 0 );

        self::$migratable_docs_length = $migratable_docs_length + $migrated_docs_length;

        self::migrate_category_to_sections( $migratable_docs );

//        $section_docs = ! empty( $migratable_docs['sections'] ) ? $migratable_docs['sections'] : [];
//        $article_docs = ! empty( $migratable_docs['articles'] ) ? $migratable_docs['articles'] : [];
//        if ( ! empty( $section_docs ) || ! empty( $article_docs ) ) {
//            $migrated_ids = $this->migrate_category_anchestors( $section_docs, $article_docs );
//            update_option( 'wedocs_migrated_doc_ids', $migrated_ids );
//        }

//        update_option( 'wedocs_need_migration', 'done' );
    }

    private static function migrate_categories_to_docs( $parent_docs ) {
        // Get migrated docs data.
        $migrated_data  = get_option( 'wedocs_migrated_categories', [] );
        $default_parent = get_option( 'wedocs_migrated_default_parent_doc', 0 );

        if ( empty( $default_parent ) ) {
            $default_parent = self::migrate_default_categories_parent();
        }

        // Loop through the titles array and prepare post data
        foreach ( $parent_docs as $category_id => $category_title ) {
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
            if ( empty( $migrated_categories[ $category->term_id ] ) ) {
                $docs_tree['sections'][ $category->term_id ] = $category->name;
            }

             $doc_ids = get_term_meta( $category->term_id, '_docs_order', true );
             $doc_ids = ! empty( $doc_ids ) ? explode( ',', $doc_ids ) : [];

             $anchestor_ids = self::split_article_ids( $doc_ids, $category->term_id );
             $docs_tree     = array_merge_recursive( $docs_tree, $anchestor_ids );
        }

        return $docs_tree;
    }

    private static function split_article_ids( $doc_ids, $parent_category_id ) {
        $ids               = [];
        $migrated_docs_ids = get_option( 'wedocs_migrated_article_ids', [] );
        foreach ( $doc_ids as $doc_id ) {
            if ( in_array( $doc_id, $migrated_docs_ids, true ) ) {
                continue;
            }

            $ids['articles'][ $parent_category_id ][] = $doc_id;
        }

        return $ids;
    }

    public static function is_betterdocs_exists() {
        return class_exists( '\WPDeveloper\BetterDocs\Plugin' ) && self::is_betterdocs_textdomain_available();
    }

    private function migrate_category_anchestors( $section_docs, $article_docs ) {
        $migrated_category_ids = get_option( 'wedocs_migrated_categories', [] );
        if ( empty( $migrated_category_ids ) ) {
            return $migrated_category_ids;
        }

        $migrated_doc_ids    = get_option( 'wedocs_migrated_doc_ids', [] );
//        $migrate_section_ids = $this->migrate_category_docs_to_sections( $section_docs, $migrated_category_ids );
//        $migrate_article_ids = $this->migrate_category_docs_to_articles( $article_docs );

//        return [ ...$migrated_doc_ids, ...$migrate_section_ids, ...$migrate_article_ids ];
    }

//    private function migrate_category_docs_to_articles( $article_docs ) {
//        $article_ids = [];
//        if ( empty( $article_docs ) ) {
//            return $article_ids;
//        }
//
//        foreach ( $article_docs as $section_id => $articles ) {
//            foreach ( $articles as $article_id ) {
//                $post_data = [
//                    'ID'          => $article_id,
//                    'post_type'   => 'docs',
//                    'post_parent' => $section_id,
//                ];
//
//                wp_update_post( $post_data, true );
//                $article_ids[] = $article_id;
//            }
//        }
//
//        return $article_ids;
//    }

//    private function migrate_category_docs_to_sections( $section_docs, $migrated_category_ids ) {
//        $section_ids = [];
//        if ( empty( $section_docs ) ) {
//            return $section_ids;
//        }
//
//        foreach ( $section_docs as $category_id => $sections ) {
//            if ( ! empty( $migrated_category_ids[ $category_id ] ) ) {
//                foreach ( $sections as $section_id ) {
//                    $post_data = [
//                        'ID'          => $section_id,
//                        'post_type'   => 'docs',
//                        'post_parent' => $migrated_category_ids[ $category_id ],
//                    ];
//
//                    wp_update_post( $post_data, true );
//                    $section_ids[] = $section_id;
//                }
//            }
//        }
//
//        return $section_ids;
//    }

    public function upgrade_progress() {
        $this->migrated_done++;
        $this->migration_progress = floor( ( $this->migrated_done / $this->migratable_docs_length ) * 100 );

        $cookie_name   = 'wedocs_migration_progress';
        $cookie_value  = $this->migration_progress;
        $cookie_expiry = time() + 3600; // current time + 1 hour

        setcookie( $cookie_name, $cookie_value, $cookie_expiry );
    }

    public static function is_betterdocs_textdomain_available() {
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
}
