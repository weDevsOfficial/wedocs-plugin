<?php
// DESCRIPTION: Template for displaying a single doc inside the Dokan vendor dashboard.
// Renders doc content wrapped in the standard Dokan dashboard layout.

do_action( 'dokan_dashboard_wrap_start' );

$docs_url = function_exists( 'dokan_get_navigation_url' ) ? dokan_get_navigation_url( 'docs' ) : '';
?>

<div class="dokan-dashboard-wrap">

    <?php
    do_action( 'dokan_dashboard_content_before' );
    ?>

    <div class="dokan-dashboard-content dokan-wedocs-content">

        <article class="dokan-wedocs-area">

            <header class="dokan-dashboard-header">
                <?php if ( $docs_url ) : ?>
                    <a href="<?php echo esc_url( $docs_url ); ?>">&larr; <?php esc_html_e( 'Documentation', 'wedocs' ); ?></a>
                <?php endif; ?>
                <h1 class="entry-title text-2xl font-semibold text-gray-800  md:text-4xl lg:text-3xl"><?php echo esc_html( $post->post_title ); ?></h1>
            </header>

            <div class="entry-content">
                <?php
                \WeDevs\WeDocs\Frontend::enqueue_assets();

                echo '<div class="dokan-panel dokan-panel-default">';
                echo '<div class="dokan-panel-body">';
                echo apply_filters( 'the_content', $post->post_content );
                echo '</div>';
                echo '</div>';

                // Display child articles if any.
                // Use get_posts() instead of wp_list_pages() so we can build dashboard-scoped
                // URLs (?doc_id=) rather than raw WordPress permalinks which break out of the
                // vendor dashboard.
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
                    $dashboard_base = trailingslashit( $docs_url );
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

    </div><!-- .dokan-dashboard-content -->

    <?php
    do_action( 'dokan_dashboard_content_after' );
    ?>
</div><!-- .dokan-dashboard-wrap -->

<?php do_action( 'dokan_dashboard_wrap_end' ); ?>
