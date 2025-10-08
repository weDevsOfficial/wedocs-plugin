<?php
/**
 * Render the sidebar block on frontend using WordPress native functions
 *
 * @param array  $attributes Block attributes
 * @param string $content    Block content
 * @return string Rendered block content
 */

if (!function_exists('render_wedocs_sidebar')) {
function render_wedocs_sidebar($attributes, $content) {
    // Extract attributes with defaults
    $exclude_sections = $attributes['excludeSections'] ?? [];
    $sections_order_by = $attributes['sectionsOrderBy'] ?? 'menu_order';
    $sections_order = $attributes['sectionsOrder'] ?? 'asc';
    $article_order_by = $attributes['articleOrderBy'] ?? 'menu_order';
    $article_order = $attributes['articleOrder'] ?? 'asc';
    $enable_nested_articles = $attributes['enableNestedArticles'] ?? true;
    $section_title_tag = $attributes['sectionTitleTag'] ?? 'h3';
    $article_title_tag = $attributes['articleTitleTag'] ?? 'h4';
    
    // Styling attributes
    $container_styles = $attributes['containerStyles'] ?? [];
    $section_styles = $attributes['sectionStyles'] ?? [];
    $title_styles = $attributes['titleStyles'] ?? [];
    $count_badge_styles = $attributes['countBadgeStyles'] ?? [];
    $doc_list_styles = $attributes['docListStyles'] ?? [];
    $className = $attributes['className'] ?? '';

    // Get the parent doc ID (similar to existing docs-sidebar.php logic)
    global $post;
    $parent = 0;
    
    if (!empty($post) && $post->post_type === 'docs') {
        if (!empty($post->post_parent)) {
            $ancestors = get_post_ancestors($post->ID);
            $root = count($ancestors) - 1;
            $parent = $ancestors[$root];
        } else {
            $parent = $post->ID;
        }
    }

    // Custom implementation to handle separate sorting for sections and articles
    $walker = new WeDevs\WeDocs\Walker();
    
    // Get all docs for custom sorting
    $all_docs_args = array(
        'post_type' => 'docs',
        'post_status' => 'publish',
        'numberposts' => -1,
        'orderby' => 'menu_order',
        'order' => 'ASC'
    );
    
    $all_docs = get_posts($all_docs_args);
    
    // Apply exclude filter
    if (!empty($exclude_sections)) {
        $all_docs = array_filter($all_docs, function($doc) use ($exclude_sections) {
            return !in_array($doc->ID, $exclude_sections);
        });
    }
    
    // Build hierarchical structure
    $sections = array();
    $articles_by_section = array();
    
    foreach ($all_docs as $doc) {
        if ($doc->post_parent == 0) {
            // This is a top-level section
            $sections[] = $doc;
        } else {
            // This is an article
            if (!isset($articles_by_section[$doc->post_parent])) {
                $articles_by_section[$doc->post_parent] = array();
            }
            $articles_by_section[$doc->post_parent][] = $doc;
        }
    }
    
    // Sort sections
    $sections = wedocs_sort_docs($sections, $sections_order_by, $sections_order);
    
    // Sort articles for each section
    foreach ($articles_by_section as $section_id => $articles) {
        $articles_by_section[$section_id] = wedocs_sort_docs($articles, $article_order_by, $article_order);
    }
    
    // Build the HTML output using the Walker
    $children = '';
    foreach ($sections as $section) {
        $children .= wedocs_render_section_with_articles($section, $articles_by_section, $walker, $enable_nested_articles);
    }

    // Build inline styles from block attributes
    $container_style = '';
    if (!empty($container_styles['backgroundColor'])) {
        $container_style .= 'background-color: ' . esc_attr($container_styles['backgroundColor']) . ';';
    }
    if (!empty($container_styles['width'])) {
        $container_style .= 'width: ' . esc_attr($container_styles['width']) . ';';
    }

    // Build section styles for CSS custom properties
    $section_styles_css = '';
    if (!empty($section_styles['backgroundColor'])) {
        $section_styles_css .= '--section-bg: ' . esc_attr($section_styles['backgroundColor']) . ';';
    }
    if (!empty($section_styles['backgroundColorHover'])) {
        $section_styles_css .= '--section-bg-hover: ' . esc_attr($section_styles['backgroundColorHover']) . ';';
    }
    if (!empty($section_styles['padding'])) {
        $section_styles_css .= '--section-padding: ' . esc_attr($section_styles['padding']) . ';';
    }
    if (!empty($section_styles['margin'])) {
        $section_styles_css .= '--section-margin: ' . esc_attr($section_styles['margin']) . ';';
    }
    if (!empty($section_styles['borderRadius'])) {
        $section_styles_css .= '--section-border-radius: ' . esc_attr($section_styles['borderRadius']) . ';';
    }

    // Build title styles for CSS custom properties
    if (!empty($title_styles['backgroundColor'])) {
        $section_styles_css .= '--title-bg: ' . esc_attr($title_styles['backgroundColor']) . ';';
    }
    if (!empty($title_styles['backgroundColorHover'])) {
        $section_styles_css .= '--title-bg-hover: ' . esc_attr($title_styles['backgroundColorHover']) . ';';
    }
    if (!empty($title_styles['color'])) {
        $section_styles_css .= '--title-color: ' . esc_attr($title_styles['color']) . ';';
    }
    if (!empty($title_styles['padding'])) {
        $section_styles_css .= '--title-padding: ' . esc_attr($title_styles['padding']) . ';';
    }

    // Start output buffering
    ob_start();
    ?>
    <div class="wedocs-sidebar-block <?php echo esc_attr($className); ?>" style="<?php echo esc_attr($container_style . $section_styles_css); ?>">
        <?php if ($children): ?>
            <ul class="doc-nav-list">
                <?php echo $children; ?>
            </ul>
        <?php else: ?>
            <p class="wedocs-no-content">
                <?php _e('No documentation sections found.', 'wedocs'); ?>
            </p>
        <?php endif; ?>
    </div>
    <?php
    return ob_get_clean();
}

/**
 * Sort docs array based on orderby and order parameters
 */
function wedocs_sort_docs($docs, $orderby, $order) {
    if (empty($docs)) {
        return $docs;
    }
    
    usort($docs, function($a, $b) use ($orderby, $order) {
        $result = 0;
        
        switch ($orderby) {
            case 'menu_order':
                $result = $a->menu_order - $b->menu_order;
                break;
            case 'name':
                $result = strcmp($a->post_title, $b->post_title);
                break;
            case 'slug':
                $result = strcmp($a->post_name, $b->post_name);
                break;
            case 'id':
                $result = $a->ID - $b->ID;
                break;
            case 'count':
                // For count, we need to count children - this is complex for articles
                // For now, fall back to menu_order
                $result = $a->menu_order - $b->menu_order;
                break;
            default:
                $result = $a->menu_order - $b->menu_order;
        }
        
        return $order === 'desc' ? -$result : $result;
    });
    
    return $docs;
}

/**
 * Render a section with its articles using the Walker
 */
function wedocs_render_section_with_articles($section, $articles_by_section, $walker, $enable_nested_articles) {
    $output = '';
    
    // Start the section
    $walker->start_el($output, $section, 0, array('pages_with_children' => array()));
    
    // Add articles for this section
    if (isset($articles_by_section[$section->ID])) {
        $articles = $articles_by_section[$section->ID];
        
        if ($enable_nested_articles) {
            // Render articles as nested children
            foreach ($articles as $article) {
                $walker->start_el($output, $article, 1, array());
                $walker->end_el($output, $article, 1);
            }
        } else {
            // Render articles at the same level
            foreach ($articles as $article) {
                $walker->start_el($output, $article, 0, array());
                $walker->end_el($output, $article, 0);
            }
        }
    }
    
    // End the section
    $walker->end_el($output, $section, 0);
    
    return $output;
}
}
