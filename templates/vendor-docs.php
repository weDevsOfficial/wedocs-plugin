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

            <div class='wedocs-single-search-input' style='max-width: 400px;'>
                <input
                    name='s'
                    readonly
                    type='search'
                    class='search-field'
                    value='<?php get_search_query(); ?>'
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

            <div class="entry-content">
                <?php
                \WeDevs\WeDocs\Frontend::enqueue_assets();

                $parent_query = new \WP_Query( [
                    'post_type'      => 'docs',
                    'post_status'    => 'publish',
                    'post_parent'    => 0,
                    'orderby'        => 'menu_order',
                    'order'          => 'ASC',
                    'posts_per_page' => -1,
                    'meta_query'     => [
                        [
                            'key'   => '_is_vendor_doc',
                            'value' => '1',
                        ],
                    ],
                ] );

                $parent_docs = $parent_query->posts;
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
