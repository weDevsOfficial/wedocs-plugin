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
        add_action( 'wedocs_migration_runner', [ $this, 'do_migrate' ] );
        add_action( 'create_term', [ $this, 'migrate_category_insert_status' ], 10, 3 );
        add_action( 'save_post_docs', [ $this, 'migrate_documentation_insert_status' ], 10, 3 );
//        add_action( 'pre_post_update', [ $this, 'handle_documentation_update' ], 10, 2 );
    }

    public function handle_documentation_update( $post_id, $data ) {
//        error_log( print_r( wp_get_post_terms( $post_id, 'doc_category', array( 'fields' => 'ids' ) ), 1 ) );
//        error_log( print_r( $post_id, 1 ) );
//        error_log( print_r( $data, 1 ) );
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
            'order'      => 'DESC',
            'order_by'   => 'term_id',
            'taxonomy'   => 'doc_category'
        ] );

        $docs_tree           = [];
        $migrated_categories = get_option( 'wedocs_migrated_categories', [] );
        foreach ( $betterdoc_categories as $category ) {
            if ( empty( $migrated_categories[ $category->term_id ] ) ) {
                $docs_tree['parents'][ $category->term_id ] = $category->name;
            }

            $doc_ids = get_term_meta( $category->term_id, '_docs_order', true );
            $doc_ids = ! empty( $doc_ids ) ? explode( ',', $doc_ids ) : [];

            $anchestor_ids = $this->split_doc_ids( $doc_ids, $category->term_id );
            $docs_tree     = array_merge_recursive( $docs_tree, $anchestor_ids );
        }

        return $docs_tree;
    }

    public function do_migrate() {
        $migratable_docs = $this->betterdocs_migratable_docs();
        if ( ! empty( $migratable_docs['parents'] ) ) {
            $parent_docs             = array_map( 'sanitize_text_field', $migratable_docs['parents'] );
            $category_migration_data = $this->migrate_categories_to_docs( $parent_docs );
            update_option( 'wedocs_migrated_categories', $category_migration_data );
        }

//        $section_docs = ! empty( $migratable_docs['sections'] ) ? $migratable_docs['sections'] : [];
//        $article_docs = ! empty( $migratable_docs['articles'] ) ? $migratable_docs['articles'] : [];
//        if ( ! empty( $section_docs ) || ! empty( $article_docs ) ) {
//            $migrated_ids = $this->migrate_category_anchestors( $section_docs, $article_docs );
//            update_option( 'wedocs_migrated_doc_ids', $migrated_ids );
//        }

//        update_option( 'wedocs_need_migration', false );
        update_option( 'wedocs_migration_runner', 'done' );
    }

    private function split_doc_ids( $doc_ids, $parent_category_id ) {
        $ids               = [];
        $migrated_docs_ids = get_option( 'wedocs_migrated_doc_ids', [] );
        foreach ( $doc_ids as $doc_id ) {
            if ( in_array( $doc_id, $migrated_docs_ids, true ) ) {
                continue;
            }

            $parent_id = (int) wp_get_post_parent_id( $doc_id );
            if ( $this->is_a_parent_doc( $doc_id ) || !in_array( $parent_id, $doc_ids ) ) {
                $ids['sections'][ $parent_category_id ][] = $doc_id;
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

    private function migrate_category_anchestors( $section_docs, $article_docs ) {
        $migrated_category_ids = get_option( 'wedocs_migrated_categories', [] );
        if ( empty( $migrated_category_ids ) ) {
            return $migrated_category_ids;
        }

        $migrated_doc_ids    = get_option( 'wedocs_migrated_doc_ids', [] );
        $migrate_section_ids = $this->migrate_category_docs_to_sections( $section_docs, $migrated_category_ids );
        $migrate_article_ids = $this->migrate_category_docs_to_articles( $article_docs );

        return [ ...$migrated_doc_ids, ...$migrate_section_ids, ...$migrate_article_ids ];
    }

    private function migrate_category_docs_to_articles( $article_docs ) {
        $article_ids = [];
        if ( empty( $article_docs ) ) {
            return $article_ids;
        }

        foreach ( $article_docs as $section_id => $articles ) {
            foreach ( $articles as $article_id ) {
                $post_data = [
                    'ID'          => $article_id,
                    'post_type'   => 'docs',
                    'post_parent' => $section_id,
                ];

                wp_update_post( $post_data, true );
                $article_ids[] = $article_id;
            }
        }

        return $article_ids;
    }

    private function migrate_category_docs_to_sections( $section_docs, $migrated_category_ids ) {
        $section_ids = [];
        if ( empty( $section_docs ) ) {
            return $section_ids;
        }

        foreach ( $section_docs as $category_id => $sections ) {
            if ( ! empty( $migrated_category_ids[ $category_id ] ) ) {
                foreach ( $sections as $section_id ) {
                    $post_data = [
                        'ID'          => $section_id,
                        'post_type'   => 'docs',
                        'post_parent' => $migrated_category_ids[ $category_id ],
                    ];

                    wp_update_post( $post_data, true );
                    $section_ids[] = $section_id;
                }
            }
        }

        return $section_ids;
    }

    private function migrate_categories_to_docs( $parent_docs ) {
        // Prepare an array to store post data
        $migrate_data  = [];
        $migrated_data = get_option( 'wedocs_migrated_categories', [] );

        // Loop through the titles array and prepare post data
        foreach ( $parent_docs as $category_id => $category_title ) {
            $post_data = [
                'post_type'   => 'docs',
                'post_status' => 'publish',
                'post_title'  => $category_title,
            ];

            $migrated_doc_id = wp_insert_post( $post_data, true );
            $migrate_data[ $category_id ] = $migrated_doc_id;
        }

        return array_merge( $migrated_data, $migrate_data );
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
}
