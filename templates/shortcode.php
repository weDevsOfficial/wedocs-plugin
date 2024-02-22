<?php
if ( $docs ) {
    $enable_doc_search = ! empty( $args['enable_search'] ) && $args['enable_search'] === 'on';
    ?>

<div class="wedocs-shortcode-wrap">

    <?php
    // Render documentation search form.
    if ( $enable_doc_search ) {
        wedocs_get_template_part( 'doc-search', 'form' );
    }
    ?>

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
</div>

<?php }
