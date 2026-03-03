<?php
// DESCRIPTION: Template for displaying a single doc inside the Dokan vendor dashboard.
// Renders doc content wrapped in the standard Dokan dashboard layout.

do_action( 'dokan_dashboard_wrap_start' );

$docs_url       = function_exists( 'dokan_get_navigation_url' ) ? dokan_get_navigation_url( 'docs' ) : '';
$dashboard_base = trailingslashit( $docs_url );

// Resolve the root ancestor to use as the sidebar parent, mirroring docs-sidebar.php logic.
// Use get_posts() for child links so we can build dashboard-scoped URLs (?doc_id=)
// rather than raw WordPress permalinks which break out of the vendor dashboard.
$ancestors      = [];
$sidebar_parent = false;

if ( ! empty( $post->post_parent ) ) {
    $ancestors      = get_post_ancestors( $post->ID );
    $root           = count( $ancestors ) - 1;
    $sidebar_parent = $ancestors[ $root ];
} else {
    $sidebar_parent = ! empty( $post->ID ) ? $post->ID : false;
}

/**
 * Recursively build a nested sidebar nav list with dashboard-scoped URLs.
 *
 * @since WEDOCS_SINCE
 *
 * @param int    $parent_id      ID of the parent post whose children to list.
 * @param string $dashboard_base Base URL of the vendor docs dashboard page.
 * @param string $post_type      Post type to query.
 * @param int    $current_id     ID of the currently viewed post (for active highlight).
 *
 * @return string HTML <ul> list, or empty string if no children exist.
 */
function wedocs_vendor_sidebar_nav( $parent_id, $dashboard_base, $post_type, $current_id ) {
    $children = get_posts(
        [
            'post_type'      => $post_type,
            'post_parent'    => $parent_id,
            'post_status'    => 'publish',
            'orderby'        => 'menu_order',
            'order'          => 'ASC',
            'posts_per_page' => -1,
        ]
    );

    if ( ! $children ) {
        return '';
    }

    $html = '<ul class="doc-nav-list">';
    foreach ( $children as $child ) {
        $url        = esc_url( add_query_arg( 'doc_id', $child->ID, $dashboard_base ) );
        $is_current = ( (int) $child->ID === (int) $current_id );
        $class      = 'page_item page-item-' . (int) $child->ID . ( $is_current ? ' current_page_item' : '' );

        $html .= '<li class="' . esc_attr( $class ) . '">';
        $html .= '<a href="' . $url . '">' . esc_html( $child->post_title ) . '</a>';
        $html .= wedocs_vendor_sidebar_nav( $child->ID, $dashboard_base, $post_type, $current_id );
        $html .= '</li>';
    }
    $html .= '</ul>';

    return $html;
}
?>

<div class="dokan-dashboard-wrap">

    <?php
    do_action( 'dokan_dashboard_content_before' );
    ?>

    <div class="dokan-dashboard-content dokan-wedocs-content">

        <div class="wedocs-single-wrap text-sm">

        <?php if ( $sidebar_parent ) : ?>
            <aside class="wedocs-sidebar wedocs-vendor-sidebar">
                <h3 class="widget-title"><?php echo esc_html( get_post_field( 'post_title', $sidebar_parent, 'display' ) ); ?></h3>

                <?php
                $sidebar_nav = wedocs_vendor_sidebar_nav( $sidebar_parent, $dashboard_base, $post->post_type, $post->ID );
                if ( $sidebar_nav ) {
                    echo $sidebar_nav; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                }
                ?>
            </aside>
        <?php endif; ?>

        <article class="dokan-wedocs-area wedocs-single-content">

            <header class="dokan-dashboard-header">
                <?php if ( $docs_url ) : ?>
                    <a href="<?php echo esc_url( $docs_url ); ?>">&larr; <?php esc_html_e( 'Documentation', 'wedocs' ); ?></a>
                <?php endif; ?>
                <h1 class="entry-title text-2xl font-semibold text-gray-800  md:text-4xl lg:text-3xl"><?php echo esc_html( $post->post_title ); ?></h1>
            </header>

            <div class="entry-content">
                <?php
                \WeDevs\WeDocs\Frontend::enqueue_assets();

                $panel_content = apply_filters( 'the_content', $post->post_content );
                if ( ! empty( trim( $panel_content ) ) ) {
                    echo '<div class="dokan-panel dokan-panel-default">';
                    echo '<div class="dokan-panel-body">';
                    echo $panel_content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                    echo '</div>';
                    echo '</div>';
                }

                // Display child articles if any.
                $child_posts = get_posts(
                    [
                        'post_type'      => $post->post_type,
                        'post_parent'    => $post->ID,
                        'post_status'    => 'publish',
                        'orderby'        => 'menu_order',
                        'order'          => 'ASC',
                        'posts_per_page' => -1,
                    ]
                );

                if ( $child_posts ) {
                    echo '<div class="dokan-panel dokan-panel-default wedocs-child-articles">';
                    echo '<div class="dokan-panel-heading"><strong>' . esc_html__( 'Articles', 'wedocs' ) . '</strong></div>';
                    echo '<ul class="dokan-panel-body list-unstyled">';
                    foreach ( $child_posts as $child ) {
                        $child_url = esc_url( add_query_arg( 'doc_id', $child->ID, $dashboard_base ) );
                        echo '<li class="page_item page-item-' . esc_attr( $child->ID ) . '">';
                        echo '<a href="' . $child_url . '">' . esc_html( $child->post_title ) . '</a>';
                        echo '</li>';
                    }
                    echo '</ul>';
                    echo '</div>';
                }
                ?>
            </div>

        </article>

        </div><!-- .wedocs-single-wrap -->

    </div><!-- .dokan-dashboard-content -->

    <?php
    do_action( 'dokan_dashboard_content_after' );
    ?>
</div><!-- .dokan-dashboard-wrap -->

<?php do_action( 'dokan_dashboard_wrap_end' ); ?>
