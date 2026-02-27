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
                    <a href="<?php echo esc_url( $docs_url ); ?>" class="wedocs-back-to-docs">
                        &larr; <?php esc_html_e( 'Back to Documentation', 'wedocs' ); ?>
                    </a>
                <?php endif; ?>
                <h1 class="entry-title"><?php echo esc_html( $post->post_title ); ?></h1>
            </header>

            <div class="entry-content">
                <?php
                \WeDevs\WeDocs\Frontend::enqueue_assets();

                echo apply_filters( 'the_content', $post->post_content );

                // Display child articles if any.
                $children = wp_list_pages(
                    [
                        'title_li'  => '',
                        'order'     => 'menu_order',
                        'child_of'  => $post->ID,
                        'echo'      => 0,
                        'post_type' => $post->post_type,
                    ]
                );

                if ( $children ) {
                    echo '<div class="wedocs-child-articles">';
                    echo '<h3>' . esc_html__( 'Articles', 'wedocs' ) . '</h3>';
                    echo '<ul>' . $children . '</ul>';
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
