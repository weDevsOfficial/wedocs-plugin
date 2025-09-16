<?php

namespace WeDevs\WeDocs;

/**
 * Compatibility class for ensuring backward compatibility
 * when extending hierarchy depth.
 */
class Compatibility {

    /**
     * Initialize compatibility checks and filters
     */
    public function __construct() {
        add_filter( 'wedocs_max_hierarchy_depth', [ $this, 'validate_max_depth' ], 10, 1 );
        add_action( 'admin_notices', [ $this, 'show_hierarchy_notices' ] );
    }

    /**
     * Validate maximum hierarchy depth to prevent performance issues.
     *
     * @param int $depth The requested maximum depth
     * @return int The validated depth
     */
    public function validate_max_depth( $depth ) {
        // Ensure depth is reasonable to prevent performance issues
        if ( $depth > 10 ) {
            $depth = 10;
        }
        
        if ( $depth < 4 ) {
            $depth = 4; // Minimum for Doc > Section > Article > Sub-Article
        }
        
        return $depth;
    }

    /**
     * Show admin notices about hierarchy changes if needed.
     */
    public function show_hierarchy_notices() {
        $screen = get_current_screen();
        
        if ( ! $screen || $screen->post_type !== 'docs' ) {
            return;
        }
        
        // Check if user has deeply nested content
        $deep_docs = $this->get_deeply_nested_docs();
        
        if ( ! empty( $deep_docs ) ) {
            $max_depth = wedocs_get_max_hierarchy_depth();
            echo '<div class="notice notice-info is-dismissible">';
            echo '<p>';
            printf( 
                esc_html__( 'You have %1$d documents with deep nesting (depth > 4). The maximum supported depth is %2$d levels. Documents beyond this depth will be indicated but not fully expanded.', 'wedocs' ),
                count( $deep_docs ),
                $max_depth
            );
            echo '</p>';
            echo '</div>';
        }
    }

    /**
     * Get documents that are nested deeper than 4 levels.
     *
     * @return array Array of deeply nested document IDs
     */
    private function get_deeply_nested_docs() {
        global $wpdb;
        
        $transient_key = 'wedocs_deep_nested_docs';
        $deep_docs = get_transient( $transient_key );
        
        if ( false === $deep_docs ) {
            // Find documents with depth > 4
            $deep_docs = [];
            
            $docs = get_posts( [
                'post_type' => 'docs',
                'posts_per_page' => -1,
                'post_status' => ['publish', 'draft', 'private']
            ] );
            
            foreach ( $docs as $doc ) {
                $depth = wedocs_get_document_depth( $doc->ID );
                if ( $depth > 4 ) {
                    $deep_docs[] = $doc->ID;
                }
            }
            
            // Cache for 1 hour
            set_transient( $transient_key, $deep_docs, HOUR_IN_SECONDS );
        }
        
        return $deep_docs;
    }

    /**
     * Check if existing content structure is compatible.
     *
     * @return bool True if compatible, false otherwise
     */
    public static function check_content_compatibility() {
        // Check for any structural issues
        global $wpdb;
        
        // Check for circular references (should not happen but good to verify)
        $circular_refs = $wpdb->get_results(
            "SELECT p1.ID, p1.post_parent 
             FROM {$wpdb->posts} p1 
             JOIN {$wpdb->posts} p2 ON p1.post_parent = p2.ID 
             WHERE p1.post_type = 'docs' 
             AND p2.post_parent = p1.ID"
        );
        
        if ( ! empty( $circular_refs ) ) {
            return false;
        }
        
        // Check for orphaned documents
        $orphaned = $wpdb->get_results(
            "SELECT ID FROM {$wpdb->posts} 
             WHERE post_type = 'docs' 
             AND post_parent > 0 
             AND post_parent NOT IN (
                 SELECT ID FROM {$wpdb->posts} WHERE post_type = 'docs'
             )"
        );
        
        if ( ! empty( $orphaned ) ) {
            return false;
        }
        
        return true;
    }

    /**
     * Migrate existing content if needed.
     *
     * @return bool True on success, false on failure
     */
    public static function migrate_content() {
        // For now, no migration is needed as we're just extending existing functionality
        // Future versions might need to migrate metadata or structure
        
        return true;
    }
}

