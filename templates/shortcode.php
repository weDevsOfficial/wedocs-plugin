<?php

if ( $docs ) {
    $total_parents = (int) ! empty( wp_count_posts( 'docs' )->publish ) ? wp_count_posts( 'docs' )->publish : 0;
    $total_pages   = (int) ( $total_parents / $items );
    $pagination    = paginate_links(
        array(
            'type'      => 'array', // Return pagination links as an array
            'total'     => $total_pages,
            'format'    => '?paged=%#%',
            'current'   => max( 1, get_query_var( 'paged' ) ),
            'end_size'  => 3, // number of pages on either the start and the end list edges
            'mid_size'  => 1, // number of pages on either the start and the end list edges
            'prev_next' => true,
            'prev_text' => '<span>
                <svg width="16" height="11" fill="none">
                    <path
                        fill="#64748B"
                        fill-rule="evenodd"
                        d="M5.707 9.954a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 1.414L3.414 4.247H15a1 1 0 1 1 0 2H3.414L5.707 8.54a1 1 0 0 1 0 1.414z"
                    />
                </svg>'
                . __( 'Previous', 'wedocs' ) .
            '</span>',
            'next_text' => '<span>'
                . __( 'Next', 'wedocs' ) .
                '<svg width="16" height="11" fill="none">
                    <path
                        fill="#64748B"
                        fill-rule="evenodd"
                        d="M10.293.54a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414l2.293-2.293H1a1 1 0 1 1 0-2h11.586l-2.293-2.293a1 1 0 0 1 0-1.414z"
                    />
                </svg>
            </span>',
        )
    );
    ?>

    <div class="wedocs-shortcode-wrap">

        <?php wedocs_get_template_part( 'doc-search', 'form' ); ?>

        <ul class="wedocs-docs-list col-<?php echo $col; ?>">

            <?php foreach ( $docs as $main_doc ) { ?>
                <li class="wedocs-docs-single">
                    <h3>
                        <a href="<?php echo get_permalink( $main_doc['doc']->ID ); ?>" target='_blank'>
                            <?php echo $main_doc['doc']->post_title; ?>
                        </a>
                    </h3>

                    <div class="inside">
                        <?php if ( $main_doc['sections'] ) : ?>
                            <ul class="wedocs-doc-sections">
                                <?php
                                foreach ( $main_doc['sections'] as $section ) {
                                    $article_args = array(
                                        'post_type'      => 'docs',
                                        'posts_per_page' => '-1',
                                        'orderby'        => 'menu_order',
                                        'order'          => 'ASC'
                                    );

                                    $article_args = apply_filters( 'wedocs_shortcode_page_section_args', $article_args );
                                    $my_wp_query  = new WP_Query();
                                    $all_wp_pages = $my_wp_query->query( $article_args );

                                    $children_docs = get_page_children( $section->ID, $all_wp_pages );
                                    $post_title    = wedocs_apply_short_content(
                                        __( $section->post_title, 'wedocs' ),
                                        $col > 1 ? 60 : 160
                                    );

                                    $collapse_section_articles = wedocs_get_general_settings( 'collapse_articles', 'off' );
                                    ?>
                                    <li>
                                        <a class='icon-view' href="<?php echo get_permalink( $section->ID ); ?>" target='_blank'>
                                            <?php echo esc_html( $post_title ); ?>
                                        </a>
                                        <?php if ( $children_docs ) : ?>
                                            <svg
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="2"
                                                stroke="#acb8c4"
                                                class='<?php echo esc_attr( $collapse_section_articles !== 'on' ? 'active' : '' ); ?>'
                                            >
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        <?php endif; ?>
                                    </li>
                                    <?php if ( $children_docs ) : ?>
                                        <ul
                                            class='children has-icon <?php echo esc_attr( $collapse_section_articles !== 'on' ? 'active' : '' ); ?>'
                                        >
                                            <?php foreach ( $children_docs as $article ) : ?>
                                                <li>
                                                    <a href="<?php echo get_permalink( $article->ID ); ?>" target='_blank'>
                                                        <?php echo esc_html( wedocs_apply_short_content( $article->post_title, $col > 1 ? 60 : 160 ) ); ?>
                                                    </a>
                                                </li>
                                            <?php endforeach; ?>
                                        </ul>
                                    <?php endif; ?>
                                <?php } ?>
                            </ul>
                        <?php else : ?>
                            <span>
                                <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                    ></path>
                                </svg>
                                <?php esc_html_e( 'This document has no sections yet. Check back later or wait for the author to add content.', 'wedocs' ); ?>
                            </span>
                        <?php endif; ?>
                    </div>

                    <hr class='divider' />

                    <div class="wedocs-doc-link">
                        <a href="<?php echo get_permalink( $main_doc['doc']->ID ); ?>" target='_blank'><?php echo $more; ?></a>
                    </div>
                </li>
            <?php } ?>
        </ul>

        <?php if ( is_array( $pagination ) ) { ?>
            <div class="pagination">
                <ul>
                    <?php if ( $paged === 1 ) { ?>
                        <li class="disabled">
                            <span>
                                <svg width='16' height='11' fill='none'>
                                    <path
                                        fill='#64748B'
                                        fill-rule='evenodd'
                                        d='M5.707 9.954a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 1.414L3.414 4.247H15a1 1 0 1 1 0 2H3.414L5.707 8.54a1 1 0 0 1 0 1.414z'
                                    />
                                </svg>
                                <?php esc_html_e( 'Previous', 'wedocs' ); ?>
                            </span>
                        </li>
                    <?php } ?>

                    <?php foreach ( $pagination as $page_link ) { ?>
                        <li><?php echo $page_link; ?></li>
                    <?php } ?>

                    <?php if ( $paged === $total_pages ) { ?>
                        <li class="disabled">
                            <span>
                                <?php esc_html_e( 'Next', 'wedocs' ); ?>
                                <svg width='16' height='11' fill='none'>
                                    <path
                                        fill='#64748B'
                                        fill-rule='evenodd'
                                        d='M10.293.54a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414l2.293-2.293H1a1 1 0 1 1 0-2h11.586l-2.293-2.293a1 1 0 0 1 0-1.414z'
                                    />
                                </svg>
                            </span>
                        </li>
                    <?php } ?>
                </ul>
            </div>
        <?php } ?>
    </div>
<?php
}
