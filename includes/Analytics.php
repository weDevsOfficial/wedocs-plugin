<?php

namespace WeDevs\WeDocs;

use WP_REST_Server;
use WP_REST_Response;

/**
 * weDocs Analytics.
 *
 * Lightweight, dependency-free analytics for the admin Dashboard:
 *  - counts a per-doc view (post meta `wedocs_views`) on the single doc page
 *  - exposes aggregated stats over REST for the React Dashboard
 *
 * No custom tables — keeps the free plugin lean. Time-series / search
 * analytics live in weDocs Pro.
 *
 * @since 2.3.0
 */
class Analytics {

    /**
     * Post meta key holding the cumulative view count for a doc.
     *
     * @var string
     */
    const VIEWS_META = 'wedocs_views';

    /**
     * Constructor.
     */
    public function __construct() {
        add_action( 'template_redirect', [ $this, 'maybe_count_view' ] );
        add_action( 'rest_api_init', [ $this, 'register_routes' ] );
    }

    /**
     * Count a view for the current single doc.
     *
     * Skips bots, previews, feed/REST requests and users who can edit the
     * doc (so authors/editors don't inflate their own numbers). De-dupes
     * repeat views from the same visitor within 6 hours via a transient.
     *
     * @since 2.3.0
     *
     * @return void
     */
    public function maybe_count_view() {
        if ( ! is_singular( 'docs' ) || is_preview() || is_feed() ) {
            return;
        }

        $post_id = get_queried_object_id();
        if ( ! $post_id ) {
            return;
        }

        // Don't count people who can edit the doc.
        if ( current_user_can( 'edit_post', $post_id ) ) {
            return;
        }

        // De-dupe per visitor for 6 hours.
        $user_agent = isset( $_SERVER['HTTP_USER_AGENT'] ) ? sanitize_text_field( wp_unslash( $_SERVER['HTTP_USER_AGENT'] ) ) : '';
        if ( $user_agent && preg_match( '/bot|crawl|spider|slurp|facebookexternalhit|mediapartners/i', $user_agent ) ) {
            return;
        }

        $visitor    = md5( $this->get_visitor_ip() . $user_agent );
        $key     = 'wedocs_view_' . $post_id . '_' . $visitor;
        if ( get_transient( $key ) ) {
            return;
        }
        set_transient( $key, 1, 6 * HOUR_IN_SECONDS );

        global $wpdb;

        $updated = (int) $wpdb->query(
            $wpdb->prepare(
                "UPDATE {$wpdb->postmeta}
                 SET meta_value = CAST( meta_value AS UNSIGNED ) + 1
                 WHERE post_id = %d AND meta_key = %s
                 LIMIT 1",
                $post_id,
                self::VIEWS_META
            )
        );

        if ( 0 === $updated ) {
            add_post_meta( $post_id, self::VIEWS_META, 1, true );
        }
    }

    /**
     * Best-effort visitor IP for de-duplication only (not stored).
     *
     * @since 2.3.0
     *
     * @return string
     */
    protected function get_visitor_ip() {
        $ip = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '';

        return $ip;
    }

    /**
     * Register the dashboard stats route.
     *
     * @since 2.3.0
     *
     * @return void
     */
    public function register_routes() {
        register_rest_route(
            'wp/v2',
            '/docs/dashboard-stats',
            [
                [
                    'methods'             => WP_REST_Server::READABLE,
                    'callback'            => [ $this, 'get_dashboard_stats' ],
                    'permission_callback' => [ $this, 'permissions_check' ],
                ],
            ]
        );
    }

    /**
     * Only users who can manage docs may read the stats.
     *
     * @since 2.3.0
     *
     * @return bool
     */
    public function permissions_check() {
        return current_user_can( 'manage_options' ) || current_user_can( wedocs_get_publish_cap() );
    }

    /**
     * Build the aggregated dashboard payload.
     *
     * @since 2.3.0
     *
     * @return WP_REST_Response
     */
    public function get_dashboard_stats() {
        global $wpdb;

        // ---- Counts -------------------------------------------------------
        $parents = (int) $wpdb->get_var(
            "SELECT COUNT(*) FROM {$wpdb->posts}
             WHERE post_type = 'docs' AND post_status = 'publish' AND post_parent = 0"
        );

        $published = (int) $wpdb->get_var(
            "SELECT COUNT(*) FROM {$wpdb->posts}
             WHERE post_type = 'docs' AND post_status = 'publish'"
        );

        $drafts = (int) $wpdb->get_var(
            "SELECT COUNT(*) FROM {$wpdb->posts}
             WHERE post_type = 'docs' AND post_status IN ( 'draft', 'pending', 'private' )"
        );

        // Everything published that isn't a top-level doc is a section/article.
        $articles = max( 0, $published - $parents );

        // ---- Views --------------------------------------------------------
        $total_views = (int) $wpdb->get_var(
            $wpdb->prepare(
                "SELECT COALESCE( SUM( CAST( pm.meta_value AS UNSIGNED ) ), 0 )
                 FROM {$wpdb->postmeta} pm
                 INNER JOIN {$wpdb->posts} p ON p.ID = pm.post_id
                 WHERE pm.meta_key = %s AND p.post_type = 'docs' AND p.post_status = 'publish'",
                self::VIEWS_META
            )
        );

        // ---- Helpful votes ------------------------------------------------
        $positive = (int) $wpdb->get_var(
            "SELECT COALESCE( SUM( CAST( pm.meta_value AS UNSIGNED ) ), 0 )
             FROM {$wpdb->postmeta} pm
             INNER JOIN {$wpdb->posts} p ON p.ID = pm.post_id
             WHERE pm.meta_key = 'positive' AND p.post_type = 'docs' AND p.post_status = 'publish'"
        );
        $negative = (int) $wpdb->get_var(
            "SELECT COALESCE( SUM( CAST( pm.meta_value AS UNSIGNED ) ), 0 )
             FROM {$wpdb->postmeta} pm
             INNER JOIN {$wpdb->posts} p ON p.ID = pm.post_id
             WHERE pm.meta_key = 'negative' AND p.post_type = 'docs' AND p.post_status = 'publish'"
        );

        // ---- Popular docs (by views) -------------------------------------
        $popular_rows = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT p.ID, p.post_title, CAST( pm.meta_value AS UNSIGNED ) AS views
                 FROM {$wpdb->posts} p
                 INNER JOIN {$wpdb->postmeta} pm ON pm.post_id = p.ID AND pm.meta_key = %s
                 WHERE p.post_type = 'docs' AND p.post_status = 'publish'
                 ORDER BY views DESC
                 LIMIT 5",
                self::VIEWS_META
            )
        );

        $popular = [];
        foreach ( (array) $popular_rows as $row ) {
            if ( (int) $row->views <= 0 ) {
                continue;
            }
            $popular[] = [
                'id'    => (int) $row->ID,
                'title' => $row->post_title,
                'link'  => get_permalink( $row->ID ),
                'edit'  => get_edit_post_link( $row->ID, 'raw' ),
                'views' => (int) $row->views,
            ];
        }

        // ---- Most helpful docs (positive - negative) ----------------------
        $helpful_rows = $wpdb->get_results(
            "SELECT p.ID, p.post_title,
                    COALESCE( MAX( IF( pm.meta_key = 'positive', pm.meta_value, 0 ) ), 0 ) AS positive,
                    COALESCE( MAX( IF( pm.meta_key = 'negative', pm.meta_value, 0 ) ), 0 ) AS negative
             FROM {$wpdb->posts} p
             INNER JOIN {$wpdb->postmeta} pm ON pm.post_id = p.ID AND pm.meta_key IN ( 'positive', 'negative' )
             WHERE p.post_type = 'docs' AND p.post_status = 'publish'
             GROUP BY p.ID, p.post_title
             HAVING ( CAST( positive AS SIGNED ) - CAST( negative AS SIGNED ) ) > 0
             ORDER BY ( CAST( positive AS SIGNED ) - CAST( negative AS SIGNED ) ) DESC
             LIMIT 5"
        );

        $most_helpful = [];
        foreach ( (array) $helpful_rows as $row ) {
            $p = (int) $row->positive;
            $n = (int) $row->negative;
            if ( 0 === $p && 0 === $n ) {
                continue;
            }
            $total          = $p + $n;
            $most_helpful[] = [
                'id'         => (int) $row->ID,
                'title'      => $row->post_title,
                'link'       => get_permalink( $row->ID ),
                'edit'       => get_edit_post_link( $row->ID, 'raw' ),
                'positive'   => $p,
                'negative'   => $n,
                'percentage' => $total ? (int) round( ( $p / $total ) * 100 ) : 0,
            ];
        }

        // ---- Recent docs --------------------------------------------------
        $recent_posts = get_posts(
            [
                'post_type'      => 'docs',
                'post_status'    => [ 'publish', 'draft', 'pending', 'private' ],
                'posts_per_page' => 5,
                'orderby'        => 'modified',
                'order'          => 'DESC',
            ]
        );

        $recent = [];
        foreach ( $recent_posts as $post ) {
            $recent[] = [
                'id'       => (int) $post->ID,
                'title'    => $post->post_title ? $post->post_title : __( '(no title)', 'wedocs' ),
                'status'   => $post->post_status,
                'edit'     => get_edit_post_link( $post->ID, 'raw' ),
                'link'     => get_permalink( $post->ID ),
                'modified' => get_the_modified_date( 'M j, Y', $post ),
                'views'    => (int) get_post_meta( $post->ID, self::VIEWS_META, true ),
            ];
        }

        // ---- Contributors -------------------------------------------------
        $contributors = (int) $wpdb->get_var(
            "SELECT COUNT( DISTINCT post_author ) FROM {$wpdb->posts}
             WHERE post_type = 'docs' AND post_status = 'publish'"
        );

        $data = [
            'totals'       => [
                'docs'         => $parents,
                'articles'     => $articles,
                'published'    => $published,
                'drafts'      => $drafts,
                'views'        => $total_views,
                'positive'     => $positive,
                'negative'     => $negative,
                'helpful_rate' => ( $positive + $negative ) ? (int) round( ( $positive / ( $positive + $negative ) ) * 100 ) : 0,
                'contributors' => $contributors,
            ],
            'popular'      => $popular,
            'most_helpful' => $most_helpful,
            'recent'       => $recent,
            'pro_active'   => function_exists( 'wedocs_is_pro_active' ) ? (bool) wedocs_is_pro_active() : false,
        ];

        return new WP_REST_Response( apply_filters( 'wedocs_dashboard_stats', $data ), 200 );
    }
}
