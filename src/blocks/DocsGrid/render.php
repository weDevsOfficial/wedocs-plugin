<?php
    // Extract attributes with defaults
    $doc_style = $attributes['docStyle'] ?? '1x1';
    $docs_per_page = $attributes['docsPerPage'] ?? 'all';
    $exclude_docs = $attributes['excludeDocs'] ?? [];
    $order_by = $attributes['orderBy'] ?? 'menu_order';
    $sections_per_doc = $attributes['sectionsPerDoc'] ?? 'all';
    $articles_per_section = $attributes['articlesPerSection'] ?? 'all';
    $enable_pagination = $attributes['enablePagination'] ?? false;
    $show_doc_article = $attributes['showDocArticle'] ?? true;
    $keep_articles_collapsed = $attributes['keepArticlesCollapsed'] ?? false;
    $show_view_details = $attributes['showViewDetails'] ?? true;

    // Get current page for pagination
    $current_page = max(1, get_query_var('paged'));

    // Query docs
    $args = array(
        'post_type' => 'docs',
        'post_status' => 'publish',
        'posts_per_page' => -1,
        'post_parent' => 0,
        'orderby' => $order_by,
        'order' => 'ASC',
        'post__not_in' => array_map('intval', $exclude_docs)
    );

    $docs_query = new WP_Query($args);
    $all_docs = $docs_query->posts;

    // Process pagination
    if ($enable_pagination && $docs_per_page !== 'all') {
        $per_page = intval($docs_per_page);
        $total_pages = ceil(count($all_docs) / $per_page);
        $offset = ($current_page - 1) * $per_page;
        $docs = array_slice($all_docs, $offset, $per_page);
    } else {
        $docs = $all_docs;
        $total_pages = 1;
    }

    // Start output buffering
    ob_start();
    ?>
    <div class="wedocs-block-wrapper">
        <div class="wedocs-docs-grid wedocs-docs-grid--<?php echo esc_attr($doc_style); ?>">
            <?php foreach ($docs as $doc) :
                // Get sections for this doc
                $sections_args = array(
                    'post_type' => 'docs',
                    'post_status' => 'publish',
                    'posts_per_page' => $sections_per_doc === 'all' ? -1 : intval($sections_per_doc),
                    'post_parent' => $doc->ID,
                    'orderby' => 'menu_order',
                    'order' => 'ASC'
                );

                $sections = get_posts($sections_args);
                $total_articles = 0;
                ?>

                <div class="wedocs-docs-grid__item">
                    <h3 class="wedocs-docs-grid__title">
                        <a href="<?php echo esc_url(get_permalink($doc->ID)); ?>">
                            <?php echo esc_html($doc->post_title); ?>
                        </a>
                    </h3>

                    <?php if ($show_doc_article || !empty($sections)) : ?>
                        <?php
                        // Calculate total articles
                        foreach ($sections as $section) {
                            $articles_args = array(
                                'post_type' => 'docs',
                                'post_status' => 'publish',
                                'posts_per_page' => $articles_per_section === 'all' ? -1 : intval($articles_per_section),
                                'post_parent' => $section->ID,
                                'orderby' => 'menu_order',
                                'order' => 'ASC'
                            );

                            $articles = get_posts($articles_args);
                            $total_articles += count($articles);
                            if (!$keep_articles_collapsed) : ?>
                                <div class="wedocs-docs-grid__sections">
                                    <div class="wedocs-docs-grid__section">
                                        <h4 class="wedocs-docs-grid__section-title">
                                            <a href="<?php echo esc_url(get_permalink($section->ID)); ?>">
                                                <?php echo esc_html($section->post_title); ?>
                                            </a>
                                        </h4>
                                        <?php if (!empty($articles)) : ?>
                                            <ul class="wedocs-docs-grid__articles">
                                                <?php foreach ($articles as $article) : ?>
                                                    <li class="wedocs-docs-grid__article">
                                                        <a href="<?php echo esc_url(get_permalink($article->ID)); ?>">
                                                            <?php echo esc_html($article->post_title); ?>
                                                        </a>
                                                    </li>
                                                <?php endforeach; ?>
                                            </ul>
                                        <?php endif; ?>
                                    </div>
                                </div>
                            <?php endif;
                        }
                        ?>

                        <?php if ($show_doc_article) : ?>
                            <p class="wedocs-docs-grid__article-count">
                                <?php printf(
                                    _n('%d article', '%d articles', $total_articles, 'wedocs'),
                                    $total_articles
                                ); ?>
                            </p>
                        <?php endif; ?>
                    <?php endif; ?>

                    <?php if ($show_view_details) : ?>
                        <div class="wedocs-docs-grid__details">
                            <a href="<?php echo esc_url(get_permalink($doc->ID)); ?>" class="wedocs-docs-grid__details-link">
                                <?php esc_html_e('View Details', 'wedocs'); ?> →
                            </a>
                        </div>
                    <?php endif; ?>
                </div>
            <?php endforeach; ?>
        </div>

        <?php if ($enable_pagination && $total_pages > 1) : ?>
            <div class="wedocs-docs-pagination">
                <?php
                echo paginate_links(array(
                    'base' => get_pagenum_link(1) . '%_%',
                    'format' => 'page/%#%',
                    'current' => $current_page,
                    'total' => $total_pages,
                    'prev_text' => __('&laquo; Previous', 'wedocs'),
                    'next_text' => __('Next &raquo;', 'wedocs'),
                    'type' => 'list'
                ));
                ?>
            </div>
        <?php endif; ?>
    </div>
