<?php
/**
 * Render the docs grid block on frontend with optimized pagination and dynamic styles
 *
 * @param array  $attributes Block attributes
 * @param string $content    Block content
 * @return string Rendered block content
 */

function get_pagination_style_tag($attributes) {
    $background_color = $attributes['paginationBackgroundColor'] ?? '#fff';
    $text_color = $attributes['paginationTextColor'] ?? '#333';
    $border_color = $attributes['paginationBorderColor'] ?? '#ddd';
    $hover_color = $attributes['paginationHoverColor'] ?? '#f5f5f5';
    $text_hover_color = $attributes['paginationTextHoverColor'] ?? '#0073aa';
    $border_radius = $attributes['borderRadius'] ?? '4px';

    return sprintf(
        '<style>
            :root {
                --wedocs-pagination-background-color: %s;
                --wedocs-pagination-text-color: %s;
                --wedocs-pagination-border-color: %s;
                --wedocs-pagination-hover-color: %s;
                --wedocs-pagination-text-hover-color: %s;
                --wedocs-border-radius: %s;
            }
        </style>',
        esc_attr($background_color),
        esc_attr($text_color),
        esc_attr($border_color),
        esc_attr($hover_color),
        esc_attr($text_hover_color),
        esc_attr($border_radius)
    );
}
function render_wedocs_docs_grid($attributes) {
    // Extract attributes with defaults
    $doc_style = $attributes['docStyle'] ?? '1x1';
    $docs_per_page = $attributes['docsPerPage'] ?? 'all';
    $exclude_docs = $attributes['excludeDocs'] ?? [];
    $order = $attributes['order'] ?? 'ASC';
    $order_by = $attributes['orderBy'] ?? 'menu_order';
    $sections_per_doc = $attributes['sectionsPerDoc'] ?? 'all';
    $articles_per_section = $attributes['articlesPerSection'] ?? 'all';
    $show_doc_article = $attributes['showDocArticle'] ?? true;
    $keep_articles_collapsed = $attributes['keepArticlesCollapsed'] ?? false;
    $show_view_details = $attributes['showViewDetails'] ?? true;

    // Extract style attributes
    $grid_padding = $attributes['gridPadding'] ?? null;
    $grid_margin = $attributes['gridMargin'] ?? null;
    $border_type = $attributes['borderType'] ?? 'solid';
    $border_radius = $attributes['borderRadius'] ?? '8px';
    $border_width = $attributes['borderWidth'] ?? '1px';
    $border_color = $attributes['borderColor'] ?? 'rgba(0, 0, 0, 0.1)';
    $doc_title_color = $attributes['docTitleColor'] ?? '#1e1e1e';
    $doc_children_active_color = $attributes['docChildrenActiveColor'] ?? '#0073aa';
    $button_color = $attributes['buttonColor'] ?? '#0073aa';
    $button_text = $attributes['buttonText'] ?? __('View Details', 'wedocs');
    $button_text_color = $attributes['buttonTextColor'] ?? '#ffffff';
    $button_hover_color = $attributes['buttonHoverColor'] ?? '#005177';
    $button_hover_text_color = $attributes['buttonHoverTextColor'] ?? '#ffffff';
    $button_padding = $attributes['buttonPadding'] ?? null;
    $button_radius = $attributes['buttonBorderRadius'] ?? '4px';
    $button_margin = $attributes['buttonMargin'] ?? null;

    // Format padding and margin styles
    $padding_style = '';
    if ($grid_padding) {
        $padding_style = sprintf(
            'padding: %s %s %s %s;',
            esc_attr($grid_padding['top'] ?? '1.5rem'),
            esc_attr($grid_padding['right'] ?? '1.5rem'),
            esc_attr($grid_padding['bottom'] ?? '1.5rem'),
            esc_attr($grid_padding['left'] ?? '1.5rem')
        );
    }

    $margin_style = '';
    if ($grid_margin) {
        $margin_style = sprintf(
            'margin: %s %s %s %s;',
            esc_attr($grid_margin['top'] ?? '0'),
            esc_attr($grid_margin['right'] ?? '0'),
            esc_attr($grid_margin['bottom'] ?? '0'),
            esc_attr($grid_margin['left'] ?? '0')
        );
    }

    // Format button padding and margin
    $button_padding_style = '';
    if ($button_padding) {
        $button_padding_style = sprintf(
            'padding: %s %s %s %s;',
            esc_attr($button_padding['top'] ?? '8px'),
            esc_attr($button_padding['right'] ?? '12px'),
            esc_attr($button_padding['bottom'] ?? '8px'),
            esc_attr($button_padding['left'] ?? '12px')
        );
    }

    $button_margin_style = '';
    if ($button_margin) {
        $button_margin_style = sprintf(
            'margin: %s %s %s %s;',
            esc_attr($button_margin['top'] ?? '0'),
            esc_attr($button_margin['right'] ?? '0'),
            esc_attr($button_margin['bottom'] ?? '0'),
            esc_attr($button_margin['left'] ?? '0')
        );
    }

    // Create inline styles for grid items
    $grid_item_style = sprintf(
        'border: %s %s %s; border-radius: %s; %s %s',
        esc_attr($border_width),
        esc_attr($border_type),
        esc_attr($border_color),
        esc_attr($border_radius),
        $padding_style,
        $margin_style
    );

    $title_style = sprintf('color: %s;', esc_attr($doc_title_color));
    $children_style = sprintf('color: %s;', esc_attr($doc_children_active_color));
    $button_style = sprintf(
        'background-color: %s; color: %s; border-radius: %s; %s %s',
        esc_attr($button_color),
        esc_attr($button_text_color),
        esc_attr($button_radius),
        $button_padding_style,
        $button_margin_style
    );

    // Add dynamic styles for hover states
    $hover_styles = sprintf(
        '<style>
        .wedocs-docs-grid__details-link:hover {
            background-color: %s !important;
            color: %s !important;
        }
        .wedocs-docs-grid__section-title svg {
            transition: transform 0.3s ease;
        }
        .wedocs-docs-grid__section-title svg.active {
            transform: rotate(180deg);
        }
    </style>',
        esc_attr($button_hover_color),
        esc_attr($button_hover_text_color)
    );

    // Get current page for pagination
    $current_page = (get_query_var('paged')) ? get_query_var('paged') : 1;

    // Set up the main docs query
    $args = array(
        'post_type' => 'docs',
        'post_status' => 'publish',
        'post_parent' => 0,
        'orderby' => $order_by,
        'order' => $order,
        'post__not_in' => array_map('intval', $exclude_docs)
    );

    // Handle pagination
    if ($docs_per_page !== 'all') {
        $args['posts_per_page'] = intval($docs_per_page);
        $args['paged'] = $current_page;
    } else {
        $args['posts_per_page'] = '-1';
        $args['paged'] = 1;
    }

    // Query docs with pagination
    $docs_query = new WP_Query($args);
    $docs = $docs_query->posts;
    $total_pages = $docs_query->max_num_pages;
    $toggle_script = <<<SCRIPT
        <script>
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.wedocs-docs-grid__section-title').forEach(title => {
        title.addEventListener('click', function(e) {
            // Ignore clicks on links
            if (e.target.tagName.toLowerCase() === 'a') {
                return;
            }

            const section = this.closest('.wedocs-docs-grid__section');
            const articlesList = section.querySelector('.wedocs-docs-grid__articles');
            const toggleIcon = this.querySelector('svg');

            if (articlesList) {
                articlesList.classList.toggle('collapsed');
                toggleIcon?.classList.toggle('active');
            }
        });
    });
});
</script>
SCRIPT;
    // Start output buffering
    ob_start();

    echo $toggle_script;
    // Output hover styles
    echo $hover_styles;
    ?>
    <div class="wedocs-block-wrapper">
        <div class="wedocs-docs-grid wedocs-docs-grid--<?php echo esc_attr($doc_style); ?>">
            <?php foreach ($docs as $doc) :
                // Get sections for this doc with limit
                $sections_query_args = array(
                    'post_type' => 'docs',
                    'post_status' => 'publish',
                    'post_parent' => $doc->ID,
                    'orderby' => 'menu_order',
                    'order' => 'ASC',
                    'posts_per_page' => $sections_per_doc === 'all' ? -1 : intval($sections_per_doc)
                );

                $sections = get_posts($sections_query_args);
                $total_articles = 0;
                ?>

                <div class="wedocs-docs-grid__item" style="<?php echo esc_attr($grid_item_style); ?>">
                    <h3 class="wedocs-docs-grid__title" style="<?php echo esc_attr($title_style); ?>">
                        <a href="<?php echo esc_url(get_permalink($doc->ID)); ?>" style="<?php echo esc_attr($title_style); ?>">
                            <?php echo esc_html($doc->post_title); ?>
                        </a>
                    </h3>

                    <?php if (!empty($sections)) : ?>
                    <div class='wedocs-docs-grid__container'>
                        <?php
                        foreach ($sections as $section) {
                            // Get articles for this section with limit
                            $articles_query_args = array(
                                'post_type' => 'docs',
                                'post_status' => 'publish',
                                'post_parent' => $section->ID,
                                'orderby' => 'menu_order',
                                'order' => 'ASC',
                                'posts_per_page' => $articles_per_section === 'all' ? -1 : intval($articles_per_section)
                            );

                            $articles = get_posts($articles_query_args);
                            ?>
                                <div class="wedocs-docs-grid__sections">
                                    <div class="wedocs-docs-grid__section">
                                        <h4 class="wedocs-docs-grid__section-title"
                                            style="<?php echo esc_attr($title_style); ?> display: flex; justify-content: space-between; align-items: center;">
                                            <span>
                                                <a href="<?php echo esc_url(get_permalink($section->ID)); ?>"
                                                   style="<?php echo esc_attr($title_style); ?>">
                                                    <?php echo esc_html($section->post_title); ?>
                                                </a>
                                            </span>
                                            <?php if ($show_doc_article && !empty($articles)) : ?>
                                                <svg fill="none"
                                                     viewBox="0 0 24 24"
                                                     width="16"
                                                     stroke-width="2"
                                                     stroke="#acb8c4"
                                                     class="<?php echo esc_attr($keep_articles_collapsed ? 'collapsed' : ''); ?>">
                                                    <path stroke-linecap="round"
                                                          stroke-linejoin="round"
                                                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                                                </svg>
                                            <?php endif; ?>
                                        </h4>
                                        <?php if ($show_doc_article && !empty($articles)) : ?>
                                            <ul class="wedocs-docs-grid__articles children has-icon <?php echo esc_attr($keep_articles_collapsed ? 'collapsed' : ''); ?>">
                                                <?php foreach ($articles as $article) : ?>
                                                    <li class="wedocs-docs-grid__article"
                                                        style="<?php echo esc_attr($children_style); ?>">
                                                        <a href="<?php echo esc_url(get_permalink($article->ID)); ?>"
                                                           style="<?php echo esc_attr($children_style); ?>">
                                                            <?php echo esc_html($article->post_title); ?>
                                                        </a>
                                                    </li>
                                                <?php endforeach; ?>
                                            </ul>
                                        <?php endif; ?>
                                    </div>
                                </div>
                            <?php
                        } ?>
                    </div>
                    <?php else : ?>
                        <span class='inside'>
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24"
                                 height="24" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                ></path>
                            </svg>
                            <?php esc_html_e('This document has no sections yet. Check back later or wait for the author to add content.', 'wedocs'); ?>
                        </span>
                    <?php endif; ?>
                    <?php if ($show_view_details) : ?>
                        <div class="wedocs-docs-grid__details">
                            <a href="<?php echo esc_url(get_permalink($doc->ID)); ?>"
                               class="wedocs-docs-grid__details-link"
                               style="<?php echo esc_attr($button_style); ?>">
                                <?php echo esc_html($button_text); ?>
                            </a>
                        </div>
                    <?php endif; ?>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
