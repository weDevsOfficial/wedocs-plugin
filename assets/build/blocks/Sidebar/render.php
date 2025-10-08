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

    // Use wp_list_pages with existing Walker class (like docs-sidebar.php)
    $walker = new WeDevs\WeDocs\Walker();
    
    // Build wp_list_pages arguments
    $list_args = array(
        'title_li' => '',
        'echo' => false,
        'post_type' => 'docs',
        'walker' => $walker,
    );

    // Apply ordering - matching admin interface logic but respecting direction setting
    if ($sections_order_by === 'menu_order') {
        // Use the same sorting logic as admin interface but respect direction setting
        $list_args['sort_column'] = 'menu_order';
        $list_args['sort_order'] = strtoupper($sections_order);
    } else {
        $list_args['sort_column'] = $sections_order_by;
        $list_args['sort_order'] = strtoupper($sections_order);
    }

    // Apply exclude filter
    if (!empty($exclude_sections)) {
        $list_args['exclude'] = implode(',', $exclude_sections);
    }

    // If we have a specific parent, use child_of, otherwise get all top-level docs
    if ($parent > 0) {
        $list_args['child_of'] = $parent;
    } else {
        $list_args['parent'] = 0; // Only top-level docs
    }

    // Get the hierarchical list using WordPress native function
    $children = wp_list_pages($list_args);

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
}
