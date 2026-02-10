<?php

namespace WeDevs\WeDocs\Admin;

/**
 * Export/Import Class.
 *
 * Handles exporting and importing of documentation.
 *
 * @since 2.1.19
 */
class ExportImport {

    /**
     * Class Constructor.
     */
    public function __construct() {
        add_action( 'wp_ajax_wedocs_export_docs', [ $this, 'export_docs' ] );
        add_action( 'wp_ajax_wedocs_import_docs', [ $this, 'import_docs' ] );
    }

    /**
     * Export all docs to JSON format.
     *
     * @since 2.1.19
     *
     * @return void
     */
    public function export_docs() {
        // Check nonce
        check_ajax_referer( 'wedocs_export_docs', 'nonce' );

        // Check permissions
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_send_json_error( [
                'message' => __( 'You do not have permission to export docs.', 'wedocs' )
            ] );
        }

        // Get all docs
        $args = [
            'post_type'      => 'docs',
            'post_status'    => [ 'publish', 'draft', 'pending', 'private' ],
            'posts_per_page' => -1,
            'orderby'        => 'menu_order',
            'order'          => 'ASC',
        ];

        $docs = get_posts( $args );

        if ( empty( $docs ) ) {
            wp_send_json_error( [
                'message' => __( 'No docs found to export.', 'wedocs' )
            ] );
        }

        /**
         * Export data structure:
         * - version: Plugin version at time of export
         * - export_date: MySQL datetime of export
         * - docs: Array of documentation posts with:
         *   - id, title, content, excerpt, status, parent
         *   - menu_order, date, modified, author, slug
         *   - meta: Array of post metadata (positive, negative, wedocs_contributors)
         *   - tags: Array of tag names assigned to the doc
         * - tags: Array of all doc_tag taxonomy terms with name, slug, description
         */
        $export_data = [
            'version'     => WEDOCS_VERSION,
            'export_date' => current_time( 'mysql' ),
            'docs'        => [],
            'tags'        => [],
        ];

        // Export docs
        foreach ( $docs as $doc ) {
            $doc_data = [
                'id'           => $doc->ID,
                'title'        => $doc->post_title,
                'content'      => $doc->post_content,
                'excerpt'      => $doc->post_excerpt,
                'status'       => $doc->post_status,
                'parent'       => $doc->post_parent,
                'menu_order'   => $doc->menu_order,
                'date'         => $doc->post_date,
                'modified'     => $doc->post_modified,
                'author'       => $doc->post_author,
                'slug'         => $doc->post_name,
                'meta'         => [],
                'tags'         => [],
            ];

            // Get post meta
            $meta_keys = [ 'positive', 'negative', 'wedocs_contributors' ];
            foreach ( $meta_keys as $meta_key ) {
                $meta_value = get_post_meta( $doc->ID, $meta_key, true );
                if ( ! empty( $meta_value ) ) {
                    $doc_data['meta'][ $meta_key ] = $meta_value;
                }
            }

            // Get tags
            $tags = wp_get_post_terms( $doc->ID, 'doc_tag', [ 'fields' => 'names' ] );
            if ( ! is_wp_error( $tags ) && ! empty( $tags ) ) {
                $doc_data['tags'] = $tags;
            }

            $export_data['docs'][] = $doc_data;
        }

        // Export all tags
        $all_tags = get_terms( [
            'taxonomy'   => 'doc_tag',
            'hide_empty' => false,
        ] );

        if ( ! is_wp_error( $all_tags ) ) {
            foreach ( $all_tags as $tag ) {
                $export_data['tags'][] = [
                    'name'        => $tag->name,
                    'slug'        => $tag->slug,
                    'description' => $tag->description,
                ];
            }
        }

        wp_send_json_success( [
            'data'     => $export_data,
            'filename' => 'wedocs-export-' . gmdate( 'Y-m-d-H-i-s' ) . '.json',
        ] );
    }

    /**
     * Import docs from JSON format.
     *
     * @since 2.1.19
     *
     * @return void
     */
    public function import_docs() {
        // Check nonce
        check_ajax_referer( 'wedocs_import_docs', 'nonce' );

        // Check permissions
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_send_json_error( [
                'message' => __( 'You do not have permission to import docs.', 'wedocs' )
            ] );
        }

        // Get the import data
        $import_data = isset( $_POST['import_data'] ) ? json_decode( stripslashes( $_POST['import_data'] ), true ) : null;

        if ( empty( $import_data ) || ! is_array( $import_data ) ) {
            wp_send_json_error( [
                'message' => __( 'Invalid import data.', 'wedocs' )
            ] );
        }

        if ( empty( $import_data['docs'] ) || ! is_array( $import_data['docs'] ) ) {
            wp_send_json_error( [
                'message' => __( 'No docs found in import data.', 'wedocs' )
            ] );
        }

        $imported_count = 0;
        $skipped_count  = 0;
        $error_count    = 0;
        $id_map         = []; // Map old IDs to new IDs for parent relationships

        // First pass: Import tags
        if ( ! empty( $import_data['tags'] ) && is_array( $import_data['tags'] ) ) {
            foreach ( $import_data['tags'] as $tag_data ) {
                if ( ! term_exists( $tag_data['slug'], 'doc_tag' ) ) {
                    wp_insert_term(
                        sanitize_text_field( $tag_data['name'] ),
                        'doc_tag',
                        [
                            'slug'        => sanitize_title( $tag_data['slug'] ),
                            'description' => sanitize_textarea_field( $tag_data['description'] ),
                        ]
                    );
                }
            }
        }

        // Sort docs to import parents before children
        usort( $import_data['docs'], function( $a, $b ) {
            return $a['parent'] - $b['parent'];
        } );

        // Second pass: Import docs
        foreach ( $import_data['docs'] as $doc_data ) {
            // Check if doc already exists by slug
            $existing_doc = get_page_by_path( $doc_data['slug'], OBJECT, 'docs' );
            
            if ( $existing_doc ) {
                $skipped_count++;
                $id_map[ $doc_data['id'] ] = $existing_doc->ID;
                continue;
            }

            // Prepare post data
            $post_data = [
                'post_type'    => 'docs',
                'post_title'   => sanitize_text_field( $doc_data['title'] ),
                'post_content' => wp_kses_post( $doc_data['content'] ),
                'post_excerpt' => sanitize_textarea_field( $doc_data['excerpt'] ),
                'post_status'  => sanitize_text_field( $doc_data['status'] ),
                'post_name'    => sanitize_title( $doc_data['slug'] ),
                'menu_order'   => absint( $doc_data['menu_order'] ),
                'post_date'    => sanitize_text_field( $doc_data['date'] ),
            ];

            // Handle parent relationship using mapped ID
            if ( ! empty( $doc_data['parent'] ) && isset( $id_map[ $doc_data['parent'] ] ) ) {
                $post_data['post_parent'] = $id_map[ $doc_data['parent'] ];
            }

            // Insert the post
            $new_doc_id = wp_insert_post( $post_data, true );

            if ( is_wp_error( $new_doc_id ) ) {
                $error_count++;
                continue;
            }

            // Map the old ID to the new ID
            $id_map[ $doc_data['id'] ] = $new_doc_id;

            // Import meta data
            if ( ! empty( $doc_data['meta'] ) && is_array( $doc_data['meta'] ) ) {
                foreach ( $doc_data['meta'] as $meta_key => $meta_value ) {
                    $sanitized_key = sanitize_key( $meta_key );
                    
                    // Sanitize based on known meta keys
                    if ( in_array( $sanitized_key, [ 'positive', 'negative' ], true ) ) {
                        $meta_value = absint( $meta_value );
                    } elseif ( $sanitized_key === 'wedocs_contributors' && is_array( $meta_value ) ) {
                        $meta_value = array_map( 'absint', $meta_value );
                    } else {
                        // Default sanitization for unknown meta
                        $meta_value = sanitize_text_field( $meta_value );
                    }
                    
                    update_post_meta( $new_doc_id, $sanitized_key, $meta_value );
                }
            }

            // Import tags
            if ( ! empty( $doc_data['tags'] ) && is_array( $doc_data['tags'] ) ) {
                $sanitized_tags = array_map( 'sanitize_text_field', $doc_data['tags'] );
                wp_set_object_terms( $new_doc_id, $sanitized_tags, 'doc_tag' );
            }

            $imported_count++;
        }

        wp_send_json_success( [
            'message'  => sprintf(
                __( 'Import completed. %d docs imported, %d skipped, %d errors.', 'wedocs' ),
                $imported_count,
                $skipped_count,
                $error_count
            ),
            'imported' => $imported_count,
            'skipped'  => $skipped_count,
            'errors'   => $error_count,
        ] );
    }
}
