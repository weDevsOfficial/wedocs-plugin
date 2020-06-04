<?php

namespace WeDevs\WeDocs;

use WP_Query;

/**
 * Installer Class
 */
class Installer {

    /**
     * Run the installer
     *
     * @return void
     */
    public function run() {
        $this->maybe_create_docs_page();
        $this->add_post_types();
        $this->timestamps();
    }

    /**
     * Register the post type
     *
     * @return void
     */
    public function add_post_types() {
        $post_type = new Post_Types();

        $post_type->register_post_type();
        $post_type->register_taxonomy();
    }

    /**
     * Save version
     *
     * @return void
     */
    public function timestamps() {
        flush_rewrite_rules();

        $installed = get_option( 'wedocs_installed' );

        if ( ! $installed ) {
            update_option( 'wedocs_installed', time() );
        }

        update_option( 'wedocs_version', WEDOCS_VERSION );
    }

    /**
     * Maybe create docs page if not found.
     *
     * @since 1.3
     *
     * @return void
     */
    public function maybe_create_docs_page() {
        $version = get_option( 'wedocs_version' );

        // seems like it's already installed
        if ( $version ) {
            return;
        }

        // skip if there's a page already with [wedocs] shortcode
        $pages_query = new WP_Query( [
            'post_type'      => 'page',
            'posts_per_page' => -1,
            's'              => '[wedocs',
        ] );

        if ( $pages_query->found_posts ) {
            return;
        }

        $docs_page = wp_insert_post( [
            'post_type'      => 'page',
            'post_title'     => 'Documentation',
            'post_author'    => get_current_user_id(),
            'post_content'   => '[wedocs]',
            'post_status'    => 'publish',
            'comment_status' => 'closed',
            'ping_status'    => 'closed',
            'post_name'      => 'docs',
        ] );

        if ( ! is_wp_error( $docs_page ) ) {
            $settings              = get_option( 'wedocs_settings', [] );
            $settings['docs_home'] = $docs_page;

            update_option( 'wedocs_settings', $settings );
        }
    }
}
