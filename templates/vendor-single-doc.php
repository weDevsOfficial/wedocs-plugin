<?php
// DESCRIPTION: Template for displaying a single doc inside the Dokan vendor dashboard.
// Renders doc content wrapped in the standard Dokan dashboard layout.

do_action( 'dokan_dashboard_wrap_start' );

$docs_url       = function_exists( 'dokan_get_navigation_url' ) ? dokan_get_navigation_url( 'docs' ) : '';
$dashboard_base = ! empty( $docs_url ) ? trailingslashit( $docs_url ) : '';

// Resolve the root ancestor to use as the sidebar parent, mirroring docs-sidebar.php logic.
// Use get_posts() for child links so we can build dashboard-scoped URLs (?doc_id=)
// rather than raw WordPress permalinks which break out of the vendor dashboard.
$ancestors      = [];
$sidebar_parent = false;

if ( ! empty( $post->post_parent ) ) {
    $ancestors      = get_post_ancestors( $post->ID );
    $sidebar_parent = ! empty( $ancestors ) ? $ancestors[ count( $ancestors ) - 1 ] : $post->post_parent;
} else {
    $sidebar_parent = ! empty( $post->ID ) ? $post->ID : false;
}

/**
 * Recursively build a nested sidebar nav list with dashboard-scoped URLs.
 *
 * Produces HTML structure matching docs-sidebar.php so the existing
 * wedocs frontend CSS and JS (carets, collapse/expand) work correctly.
 *
 * @since WEDOCS_SINCE
 *
 * @param int    $parent_id      ID of the parent post whose children to list.
 * @param string $dashboard_base Base URL of the vendor docs dashboard page.
 * @param string $post_type      Post type to query.
 * @param int    $current_id     ID of the currently viewed post (for active highlight).
 * @param array  $ancestor_ids   Ancestor IDs of the current post (for open/closed state).
 * @param int    $depth          Current nesting depth (0-based).
 *
 * @return string HTML <ul> list, or empty string if no children exist.
 */
/**
 * Fetch all descendants of a doc and group them by post_parent.
 *
 * A single query replaces the per-node get_posts() calls that
 * previously caused an N+1 problem in the sidebar nav builder.
 *
 * @since WEDOCS_SINCE
 *
 * @param int    $root_id   Root doc ID whose descendants to fetch.
 * @param string $post_type Post type to query.
 *
 * @return array Associative array keyed by parent ID, each value is an array of child post objects.
 */
if ( ! function_exists( 'wedocs_get_vendor_descendants' ) ) :
function wedocs_get_vendor_descendants( $root_id, $post_type ) {
    $all = get_pages(
        [
            'post_type'   => $post_type,
            'post_status' => 'publish',
            'sort_column' => 'menu_order',
            'sort_order'  => 'ASC',
            'child_of'    => $root_id,
        ]
    );

    // Group by post_parent for O(1) child lookups.
    $by_parent = [];
    foreach ( $all as $p ) {
        $by_parent[ $p->post_parent ][] = $p;
    }

    return $by_parent;
}
endif;

/**
 * Recursively build a nested sidebar nav list with dashboard-scoped URLs.
 *
 * Uses a pre-fetched descendants lookup to avoid per-node queries.
 *
 * @since WEDOCS_SINCE
 *
 * @param int    $parent_id      ID of the parent post whose children to list.
 * @param string $dashboard_base Base URL of the vendor docs dashboard page.
 * @param int    $current_id     ID of the currently viewed post (for active highlight).
 * @param array  $ancestor_ids   Ancestor IDs of the current post (for open/closed state).
 * @param array  $by_parent      Descendants grouped by parent ID (from wedocs_get_vendor_descendants).
 * @param int    $depth          Current nesting depth (0-based).
 *
 * @return string HTML <ul> list, or empty string if no children exist.
 */
if ( ! function_exists( 'wedocs_vendor_sidebar_nav' ) ) :
function wedocs_vendor_sidebar_nav( $parent_id, $dashboard_base, $current_id, $ancestor_ids, $by_parent, $depth = 0 ) {
    if ( empty( $by_parent[ $parent_id ] ) ) {
        return '';
    }

    $children = $by_parent[ $parent_id ];

    // Top-level uses doc-nav-list; nested levels use children (matching wp_list_pages output).
    $ul_class = ( 0 === $depth ) ? 'doc-nav-list' : 'children';
    $html     = '<ul class="' . esc_attr( $ul_class ) . '">';

    foreach ( $children as $child ) {
        $child_id    = (int) $child->ID;
        $url         = $dashboard_base
            ? esc_url( add_query_arg( 'doc_id', $child_id, $dashboard_base ) )
            : esc_url( get_permalink( $child_id ) );
        $is_current  = ( $child_id === (int) $current_id );
        $is_ancestor = in_array( $child_id, $ancestor_ids, true );
        $has_children = ! empty( $by_parent[ $child_id ] );

        // Build CSS classes matching wp_list_pages / wedocs_sidebar_page_status_class output.
        $classes = [ 'page_item', 'page-item-' . $child_id ];

        if ( $is_current ) {
            $classes[] = 'current_page_item';
        }

        if ( $is_ancestor ) {
            $classes[] = 'current_page_ancestor';
        }

        if ( $has_children ) {
            $classes[] = 'page_item_has_children';

            // At depth 0, sections start collapsed unless they are the current or ancestor item.
            if ( 0 === $depth ) {
                $classes[] = ( $is_current || $is_ancestor ) ? 'wd-state-open' : 'wd-state-closed';
            }
        }

        $html .= '<li class="' . esc_attr( implode( ' ', $classes ) ) . '">';
        $html .= '<a href="' . $url . '">' . esc_html( $child->post_title );

        if ( $has_children ) {
            $html .= '<span class="wedocs-caret"></span>';
        }

        $html .= '</a>';

        if ( $has_children ) {
            $html .= wedocs_vendor_sidebar_nav( $child_id, $dashboard_base, $current_id, $ancestor_ids, $by_parent, $depth + 1 );
        }

        $html .= '</li>';
    }

    $html .= '</ul>';

    return $html;
}
endif;
?>

<div class="dokan-dashboard-wrap">

    <?php
    do_action( 'dokan_dashboard_content_before' );
    ?>

    <div class="dokan-dashboard-content dokan-wedocs-content">

        <div class="wedocs-single-wrap text-base">

        <?php if ( $sidebar_parent ) : ?>
            <aside class="wedocs-sidebar wedocs-vendor-sidebar">
                <h3 class="widget-title"><?php echo esc_html( get_post_field( 'post_title', $sidebar_parent, 'display' ) ); ?></h3>

                <div class='wedocs-single-search-input'>
                    <input
                        name='s'
                        readonly
                        type='search'
                        class='search-field'
                        value='<?php echo esc_attr( get_search_query() ); ?>'
                        title='<?php echo esc_attr_x( 'Search for:', 'label', 'wedocs' ); ?>'
                        placeholder='<?php echo esc_attr_x( 'Quick search...', 'placeholder', 'wedocs' ); ?>'
                    />
                    <button type='button' class='search-submit'>
                        <svg width='15' height='16' fill='#95a4b9'>
                            <path
                                fill='#95a4b9'
                                fill-rule='evenodd'
                                d='M11.856 10.847l2.883 2.883a.89.89 0 0 1 0 1.257c-.173.174-.401.261-.629.261s-.455-.087-.629-.261l-2.883-2.883c-1.144.874-2.532 1.353-3.996 1.353a6.56 6.56 0 0 1-4.671-1.935c-2.576-2.575-2.576-6.765 0-9.341C3.179.934 4.839.247 6.603.247s3.424.687 4.671 1.935a6.56 6.56 0 0 1 1.935 4.67 6.55 6.55 0 0 1-1.353 3.995zM3.189 3.439c-1.882 1.882-1.882 4.945 0 6.827.912.912 2.124 1.414 3.414 1.414s2.502-.502 3.414-1.414 1.414-2.124 1.414-3.413-.502-2.502-1.414-3.413-2.124-1.414-3.414-1.414-2.502.502-3.414 1.414z'
                            />
                        </svg>
                    </button>
                    <div class='short-key'>⌘K</div>
                </div>

                <?php
                $ancestor_ids = array_map( 'intval', $ancestors );
                $by_parent    = wedocs_get_vendor_descendants( $sidebar_parent, $post->post_type );
                $sidebar_nav  = wedocs_vendor_sidebar_nav( $sidebar_parent, $dashboard_base, $post->ID, $ancestor_ids, $by_parent );
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
                $child_posts   = get_posts(
                    [
                        'post_type'      => $post->post_type,
                        'post_parent'    => $post->ID,
                        'post_status'    => 'publish',
                        'orderby'        => 'menu_order',
                        'order'          => 'ASC',
                        'posts_per_page' => -1,
                    ]
                );
                ?>

                <?php if ( ! empty( trim( $panel_content ) ) ) : ?>
                <div class="dokan-panel dokan-panel-default">
                    <div class="dokan-panel-body">
                        <?php echo $panel_content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
                    </div>
                </div>
                <?php endif; ?>

                <?php if ( $child_posts ) : ?>
                <div class="dokan-panel dokan-panel-default wedocs-child-articles">
                    <div class="dokan-panel-heading"><strong><?php esc_html_e( 'Articles', 'wedocs' ); ?></strong></div>
                    <ul class="dokan-panel-body list-unstyled">
                        <?php foreach ( $child_posts as $child ) : ?>
                        <li class="page_item page-item-<?php echo esc_attr( $child->ID ); ?>">
                            <a href="<?php echo $dashboard_base ? esc_url( add_query_arg( 'doc_id', $child->ID, $dashboard_base ) ) : esc_url( get_permalink( $child->ID ) ); ?>"><?php echo esc_html( $child->post_title ); ?></a>
                        </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
                <?php endif; ?>
            </div>

            <?php if ( wedocs_get_general_settings( 'helpful', 'on' ) === 'on' ) { ?>
                <footer class="entry-footer wedocs-entry-footer">
                    <div class="feedback-content">
                        <?php wedocs_get_template_part( 'content', 'feedback' ); ?>
                    </div>
                </footer>
            <?php } ?>

        </article>

        </div><!-- .wedocs-single-wrap -->

    </div><!-- .dokan-dashboard-content -->

    <?php
    do_action( 'dokan_dashboard_content_after' );
    ?>
</div><!-- .dokan-dashboard-wrap -->

<?php do_action( 'dokan_dashboard_wrap_end' ); ?>
