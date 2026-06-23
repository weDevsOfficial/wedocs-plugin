<?php

namespace WeDevs\WeDocs;

/**
 * Analytics Class.
 *
 * Tracks doc views and search queries into custom tables, and provides
 * aggregate query helpers consumed by the free dashboard and weDocs Pro reports.
 *
 * Privacy: no PII is stored. Visitors are identified by a daily-rotating salted
 * hash of IP + user agent, suitable for de-duplicating views without tracking users.
 *
 * @since 2.3.0
 */
class Analytics {

    /**
     * Constructor — register the admin dashboard widget.
     *
     * @since 2.3.0
     */
    public function __construct() {
        add_action( 'wp_dashboard_setup', [ $this, 'register_dashboard_widget' ] );
    }

    /**
     * Register the "weDocs Analytics" admin dashboard widget.
     *
     * @since 2.3.0
     *
     * @return void
     */
    public function register_dashboard_widget() {
        if ( ! current_user_can( 'manage_options' ) ) {
            return;
        }

        wp_add_dashboard_widget(
            'wedocs_analytics_overview',
            __( 'weDocs Analytics', 'wedocs' ),
            [ $this, 'render_dashboard_widget' ]
        );
    }

    /**
     * Render the dashboard widget contents.
     *
     * @since 2.3.0
     *
     * @return void
     */
    public function render_dashboard_widget() {
        $views_30    = $this->total_views( 30 );
        $searches_30 = $this->total_searches( 30 );
        $top_docs    = $this->get_top_docs( 5, 30 );

        echo '<p style="display:flex;gap:24px;margin:0 0 12px;">';
        echo '<span><strong style="font-size:20px;">' . esc_html( number_format_i18n( $views_30 ) ) . '</strong><br>' . esc_html__( 'Views (30 days)', 'wedocs' ) . '</span>';
        echo '<span><strong style="font-size:20px;">' . esc_html( number_format_i18n( $searches_30 ) ) . '</strong><br>' . esc_html__( 'Searches (30 days)', 'wedocs' ) . '</span>';
        echo '</p>';

        if ( empty( $top_docs ) ) {
            echo '<p>' . esc_html__( 'No views recorded yet.', 'wedocs' ) . '</p>';

            return;
        }

        echo '<strong>' . esc_html__( 'Top Docs', 'wedocs' ) . '</strong><ol style="margin:8px 0 0 18px;">';

        foreach ( $top_docs as $doc ) {
            printf(
                '<li><a href="%s">%s</a> &mdash; %s</li>',
                esc_url( get_edit_post_link( $doc['doc_id'] ) ),
                esc_html( $doc['title'] ),
                /* translators: %s: number of views */
                esc_html( sprintf( _n( '%s view', '%s views', $doc['views'], 'wedocs' ), number_format_i18n( $doc['views'] ) ) )
            );
        }

        echo '</ol>';
    }

    /**
     * Record a doc view.
     *
     * De-duplicated to one row per visitor per doc per day via a unique key
     * and INSERT IGNORE. Bots and (optionally) editors are skipped.
     *
     * @since 2.3.0
     *
     * @param int $doc_id
     *
     * @return void
     */
    public function record_view( $doc_id ) {
        $doc_id = absint( $doc_id );

        if ( ! $doc_id ) {
            return;
        }

        /**
         * Allow disabling view tracking entirely.
         *
         * @since 2.3.0
         *
         * @param bool $track
         * @param int  $doc_id
         */
        if ( ! apply_filters( 'wedocs_track_views', true, $doc_id ) ) {
            return;
        }

        if ( $this->is_bot() ) {
            return;
        }

        /**
         * Whether to count a view for the current user.
         *
         * Defaults to skipping users who can edit docs so authors don't
         * inflate their own view counts.
         *
         * @since 2.3.0
         *
         * @param bool $track
         * @param int  $user_id
         * @param int  $doc_id
         */
        $track_for_user = apply_filters( 'wedocs_track_view_for_user', ! current_user_can( 'edit_docs' ), get_current_user_id(), $doc_id );

        if ( ! $track_for_user ) {
            return;
        }

        global $wpdb;

        $table = $wpdb->prefix . 'wedocs_doc_views';

        // phpcs:ignore WordPress.DB.DirectDatabaseQuery
        $wpdb->query(
            $wpdb->prepare(
                "INSERT IGNORE INTO {$table} (doc_id, visitor_hash, view_date, viewed_at) VALUES (%d, %s, %s, %s)",
                $doc_id,
                $this->get_visitor_hash(),
                current_time( 'Y-m-d' ),
                current_time( 'mysql' )
            )
        );
    }

    /**
     * Log a search query.
     *
     * @since 2.3.0
     *
     * @param string $term
     * @param int    $results_count
     *
     * @return void
     */
    public function log_search( $term, $results_count ) {
        $term = trim( wp_strip_all_tags( (string) $term ) );

        // Skip empty / too-short queries to avoid noise.
        if ( mb_strlen( $term ) < 2 ) {
            return;
        }

        /**
         * Allow disabling search logging.
         *
         * @since 2.3.0
         *
         * @param bool   $log
         * @param string $term
         */
        if ( ! apply_filters( 'wedocs_log_search', true, $term ) ) {
            return;
        }

        if ( $this->is_bot() ) {
            return;
        }

        global $wpdb;

        $table = $wpdb->prefix . 'wedocs_search_logs';

        // utf8mb4 index cap is 191 chars.
        $term = mb_substr( $term, 0, 191 );

        // phpcs:ignore WordPress.DB.DirectDatabaseQuery
        $wpdb->insert(
            $table,
            [
                'term'          => $term,
                'results_count' => absint( $results_count ),
                'visitor_hash'  => $this->get_visitor_hash(),
                'searched_at'   => current_time( 'mysql' ),
            ],
            [ '%s', '%d', '%s', '%s' ]
        );
    }

    /**
     * Build a privacy-safe visitor hash (rotates daily, no PII stored).
     *
     * @since 2.3.0
     *
     * @return string
     */
    public function get_visitor_hash() {
        $ip = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '';
        $ua = isset( $_SERVER['HTTP_USER_AGENT'] ) ? sanitize_text_field( wp_unslash( $_SERVER['HTTP_USER_AGENT'] ) ) : '';

        // Day-of-year salt so the same visitor maps to one hash per day only.
        $raw = $ip . '|' . $ua . '|' . wp_salt( 'nonce' ) . '|' . current_time( 'Y-z' );

        return hash( 'sha256', $raw );
    }

    /**
     * Detect known bots/crawlers by user agent.
     *
     * @since 2.3.0
     *
     * @return bool
     */
    public function is_bot() {
        $ua = isset( $_SERVER['HTTP_USER_AGENT'] ) ? strtolower( sanitize_text_field( wp_unslash( $_SERVER['HTTP_USER_AGENT'] ) ) ) : '';

        if ( empty( $ua ) ) {
            return true;
        }

        $is_bot = (bool) preg_match( '/(bot|crawl|spider|slurp|mediapartners|bingpreview|facebookexternalhit|embedly|quora link preview|pinterest|vkshare|w3c_validator|whatsapp|telegrambot|headlesschrome|lighthouse|pingdom|uptimerobot|gtmetrix)/', $ua );

        /**
         * Filter bot detection.
         *
         * @since 2.3.0
         *
         * @param bool   $is_bot
         * @param string $ua
         */
        return apply_filters( 'wedocs_is_bot', $is_bot, $ua );
    }

    /**
     * Total unique-per-day views recorded.
     *
     * @since 2.3.0
     *
     * @param int|null $days Limit to the last N days.
     *
     * @return int
     */
    public function total_views( $days = null ) {
        global $wpdb;

        $table = $wpdb->prefix . 'wedocs_doc_views';

        if ( $days ) {
            // phpcs:ignore WordPress.DB
            return (int) $wpdb->get_var(
                $wpdb->prepare( "SELECT COUNT(*) FROM {$table} WHERE viewed_at >= %s", $this->days_ago( $days ) )
            );
        }

        // phpcs:ignore WordPress.DB
        return (int) $wpdb->get_var( "SELECT COUNT(*) FROM {$table}" );
    }

    /**
     * Total searches logged.
     *
     * @since 2.3.0
     *
     * @param int|null $days
     *
     * @return int
     */
    public function total_searches( $days = null ) {
        global $wpdb;

        $table = $wpdb->prefix . 'wedocs_search_logs';

        if ( $days ) {
            // phpcs:ignore WordPress.DB
            return (int) $wpdb->get_var(
                $wpdb->prepare( "SELECT COUNT(*) FROM {$table} WHERE searched_at >= %s", $this->days_ago( $days ) )
            );
        }

        // phpcs:ignore WordPress.DB
        return (int) $wpdb->get_var( "SELECT COUNT(*) FROM {$table}" );
    }

    /**
     * View count for a single doc.
     *
     * @since 2.3.0
     *
     * @param int      $doc_id
     * @param int|null $days
     *
     * @return int
     */
    public function get_doc_views( $doc_id, $days = null ) {
        global $wpdb;

        $table  = $wpdb->prefix . 'wedocs_doc_views';
        $doc_id = absint( $doc_id );

        if ( $days ) {
            // phpcs:ignore WordPress.DB
            return (int) $wpdb->get_var(
                $wpdb->prepare( "SELECT COUNT(*) FROM {$table} WHERE doc_id = %d AND viewed_at >= %s", $doc_id, $this->days_ago( $days ) )
            );
        }

        // phpcs:ignore WordPress.DB
        return (int) $wpdb->get_var( $wpdb->prepare( "SELECT COUNT(*) FROM {$table} WHERE doc_id = %d", $doc_id ) );
    }

    /**
     * Most-viewed docs.
     *
     * @since 2.3.0
     *
     * @param int $limit
     * @param int $days
     *
     * @return array List of [ 'doc_id', 'title', 'permalink', 'views' ].
     */
    public function get_top_docs( $limit = 10, $days = 30 ) {
        global $wpdb;

        $table = $wpdb->prefix . 'wedocs_doc_views';
        $limit = absint( $limit );

        // phpcs:ignore WordPress.DB
        $rows = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT doc_id, COUNT(*) AS views FROM {$table} WHERE viewed_at >= %s GROUP BY doc_id ORDER BY views DESC LIMIT %d",
                $this->days_ago( $days ),
                $limit
            )
        );

        $result = [];

        foreach ( (array) $rows as $row ) {
            $result[] = [
                'doc_id'    => (int) $row->doc_id,
                'title'     => get_the_title( $row->doc_id ),
                'permalink' => get_permalink( $row->doc_id ),
                'views'     => (int) $row->views,
            ];
        }

        return $result;
    }

    /**
     * MySQL datetime for N days ago (site time).
     *
     * @since 2.3.0
     *
     * @param int $days
     *
     * @return string
     */
    protected function days_ago( $days ) {
        return gmdate( 'Y-m-d H:i:s', current_time( 'timestamp' ) - ( absint( $days ) * DAY_IN_SECONDS ) );
    }

    /**
     * Create / upgrade the analytics tables via dbDelta.
     *
     * Idempotent: safe to call on every load; gated by the wedocs_db_version option.
     *
     * @since 2.3.0
     *
     * @return void
     */
    public static function maybe_create_tables() {
        if ( get_option( 'wedocs_db_version' ) === WEDOCS_DB_VERSION ) {
            return;
        }

        self::create_tables();

        update_option( 'wedocs_db_version', WEDOCS_DB_VERSION );
    }

    /**
     * Run dbDelta for the analytics tables.
     *
     * @since 2.3.0
     *
     * @return void
     */
    public static function create_tables() {
        global $wpdb;

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';

        $charset_collate = $wpdb->get_charset_collate();
        $views_table     = $wpdb->prefix . 'wedocs_doc_views';
        $search_table    = $wpdb->prefix . 'wedocs_search_logs';

        $views_sql = "CREATE TABLE {$views_table} (
            id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            doc_id bigint(20) unsigned NOT NULL,
            visitor_hash char(64) NOT NULL DEFAULT '',
            view_date date NOT NULL,
            viewed_at datetime NOT NULL,
            PRIMARY KEY  (id),
            UNIQUE KEY uniq_view (doc_id, visitor_hash, view_date),
            KEY doc_id (doc_id),
            KEY viewed_at (viewed_at)
        ) {$charset_collate};";

        $search_sql = "CREATE TABLE {$search_table} (
            id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            term varchar(191) NOT NULL DEFAULT '',
            results_count int(10) unsigned NOT NULL DEFAULT 0,
            visitor_hash char(64) NOT NULL DEFAULT '',
            searched_at datetime NOT NULL,
            PRIMARY KEY  (id),
            KEY term (term),
            KEY results_count (results_count),
            KEY searched_at (searched_at)
        ) {$charset_collate};";

        dbDelta( $views_sql );
        dbDelta( $search_sql );
    }
}
