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
                \WeDevs\WeDocs\Frontend::enqueue_assets();

                $parent_args = [
                    'post_type'   => 'docs',
                    'post_status' => 'publish',
                    'parent'      => 0,
                    'sort_column' => 'menu_order',
                    'meta_query'  => [
                        [
                            'key'   => '_is_vendor_doc',
                            'value' => '1',
                        ],
                    ],
                ];

                $parent_docs = get_pages( $parent_args );
                $arranged    = [];
                $items       = 10;

                if ( $parent_docs ) {
                    foreach ( $parent_docs as $root ) {
                        $section_args = [
                            'post_parent' => $root->ID,
                            'post_type'   => 'docs',
                            'post_status' => 'publish',
                            'orderby'     => 'menu_order',
                            'order'       => 'ASC',
                            'numberposts' => $items,
                        ];

                        $section_docs = get_children( $section_args );

                        $arranged[] = [
                            'doc'      => $root,
                            'sections' => $section_docs,
                        ];
                    }
                }

                if ( ! empty( $arranged ) ) {
                    $docs_length   = count( $arranged );
                    $col           = $docs_length === 1 ? 1 : 2;
                    $template_args = [
                        'docs'            => $arranged,
                        'more'            => __( 'View Details', 'wedocs' ),
                        'col'             => $col,
                        'args'            => [ 'enable_search' => 'off' ],
                        'open_in_new_tab' => false,
                        'base_url'        => dokan_get_navigation_url( 'docs' ),
                    ];

                    wedocs_get_template( 'shortcode.php', $template_args );
                } else {
                    ?>
                    <p><?php esc_html_e( 'No documentation available.', 'wedocs' ); ?></p>
                    <?php
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
