<?php
// DESCRIPTION: Template for displaying vendor docs in the Dokan vendor dashboard.
// Follows the standard Dokan dashboard template structure.

do_action( 'dokan_dashboard_wrap_start' );
?>

<div class="dokan-dashboard-wrap">

    <?php
    do_action( 'dokan_dashboard_content_before' );
    ?>

    <div class="dokan-dashboard-content dokan-wedocs-content">

        <article class="dokan-wedocs-area">

            <header class="dokan-dashboard-header">
                <h1 class="entry-title"><?php esc_html_e( 'Documentation', 'wedocs' ); ?></h1>
            </header>

            <div class="entry-content">
                <?php
                $vendor_docs = new WP_Query(
                    [
                        'post_type'      => 'docs',
                        'post_status'    => 'publish',
                        'posts_per_page' => -1,
                        'parent'         => 0,
                        'meta_key'       => '_is_vendor_doc',
                        'meta_value'     => '1',
                        'orderby'        => 'menu_order',
                        'order'          => 'ASC',
                    ]
                );

                if ( $vendor_docs->have_posts() ) :
                    ?>
                    <div class="wedocs-vendor-docs-list">
                        <table class="dokan-table dokan-table-striped">
                            <thead>
                                <tr>
                                    <th><?php esc_html_e( 'Title', 'wedocs' ); ?></th>
                                    <th><?php esc_html_e( 'Sections', 'wedocs' ); ?></th>
                                    <th><?php esc_html_e( 'Updated', 'wedocs' ); ?></th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                while ( $vendor_docs->have_posts() ) :
                                    $vendor_docs->the_post();

                                    $sections = get_children(
                                        [
                                            'post_parent' => get_the_ID(),
                                            'post_type'   => 'docs',
                                            'post_status' => 'publish',
                                        ]
                                    );
                                    ?>
                                    <tr>
                                        <td>
                                            <a href="<?php the_permalink(); ?>" target="_blank">
                                                <?php the_title(); ?>
                                            </a>
                                        </td>
                                        <td><?php echo count( $sections ); ?></td>
                                        <td><?php echo esc_html( get_the_modified_date() ); ?></td>
                                    </tr>
                                <?php endwhile; ?>
                            </tbody>
                        </table>
                    </div>
                    <?php
                    wp_reset_postdata();
                else :
                    ?>
                    <p><?php esc_html_e( 'No documentation available.', 'wedocs' ); ?></p>
                <?php endif; ?>
            </div>

        </article>

    </div><!-- .dokan-dashboard-content -->

    <?php
    do_action( 'dokan_dashboard_content_after' );
    ?>
</div><!-- .dokan-dashboard-wrap -->

<?php do_action( 'dokan_dashboard_wrap_end' ); ?>
