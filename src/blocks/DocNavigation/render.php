<?php
/**
 * Render the doc navigation block on frontend
 *
 * @param array  $attributes Block attributes
 * @param string $content    Block content
 * @return string Rendered block content
 */
function render_wedocs_doc_navigation($attributes, $content = '') {
    // Extract custom attributes with defaults
    $seo_links = $attributes['seoLinks'] ?? 'none';
    $nav_padding = $attributes['navPadding'] ?? null;
    $nav_margin = $attributes['navMargin'] ?? null;
    $nav_border_style = $attributes['navBorderStyle'] ?? 'none';
    $nav_border_radius = $attributes['navBorderRadius'] ?? '4px';
    $nav_border_width = $attributes['navBorderWidth'] ?? '1px';
    $nav_border_color = $attributes['navBorderColor'] ?? '#dddddd';
    $nav_box_shadow = $attributes['navBoxShadow'] ?? 'none';
    $navigation_text_color = $attributes['navigationTextColor'] ?? '#333333';
    $navigation_text_hover_color = $attributes['navigationTextHoverColor'] ?? '#0073aa';
    $navigation_font_size = $attributes['navigationFontSize'] ?? '16px';
    $navigation_font_weight = $attributes['navigationFontWeight'] ?? '400';
    $navigation_font_style = $attributes['navigationFontStyle'] ?? 'normal';
    $arrow_size = $attributes['arrowSize'] ?? '16px';
    $arrow_color = $attributes['arrowColor'] ?? '#333333';
    $arrow_background_color = $attributes['arrowBackgroundColor'] ?? 'transparent';
    $arrow_padding = $attributes['arrowPadding'] ?? null;
    $arrow_margin = $attributes['arrowMargin'] ?? null;

    // Use the existing navigation function logic
    global $post, $wpdb;

    if (!$post || $post->post_type !== 'docs') {
        return '';
    }

    $next_query = "SELECT ID, post_title FROM {$wpdb->posts}
        WHERE post_parent = {$post->post_parent} and post_type = 'docs' and post_status = 'publish' and menu_order > {$post->menu_order}
        ORDER BY menu_order ASC
        LIMIT 0, 1";

    $prev_query = "SELECT ID, post_title FROM {$wpdb->posts}
        WHERE post_parent = {$post->post_parent} and post_type = 'docs' and post_status = 'publish' and menu_order < {$post->menu_order}
        ORDER BY menu_order DESC
        LIMIT 0, 1";

    $next_post = $wpdb->get_row($next_query);
    $prev_post = $wpdb->get_row($prev_query);

    // Check if we have any navigation to show
    $has_navigation = false;
    if ($prev_post || $next_post) {
        $has_navigation = true;
    }

    if (!$has_navigation) {
        return '';
    }

    // Get WordPress style system classes and styles
    $wrapper_attributes = get_block_wrapper_attributes();
    
    // Extract WordPress style system attributes
    $wp_style = $attributes['style'] ?? [];
    $wp_background_color = $attributes['backgroundColor'] ?? null;
    $wp_text_color = $attributes['textColor'] ?? null;
    $wp_class_name = $attributes['className'] ?? '';
    
    // Build WordPress style system styles
    $wp_styles = [];
    
    // Handle WordPress background color
    if ($wp_background_color) {
        $wp_styles[] = sprintf('background-color: var(--wp--preset--color--%s);', esc_attr($wp_background_color));
    }
    
    // Handle WordPress text color
    if ($wp_text_color) {
        $wp_styles[] = sprintf('color: var(--wp--preset--color--%s);', esc_attr($wp_text_color));
    }
    
    // Handle WordPress spacing (padding/margin from style system)
    if (isset($wp_style['spacing']['padding'])) {
        $padding = $wp_style['spacing']['padding'];
        if (is_array($padding)) {
            $wp_styles[] = sprintf(
                'padding: %s %s %s %s;',
                esc_attr($padding['top'] ?? '0'),
                esc_attr($padding['right'] ?? '0'),
                esc_attr($padding['bottom'] ?? '0'),
                esc_attr($padding['left'] ?? '0')
            );
        } else {
            $wp_styles[] = sprintf('padding: %s;', esc_attr($padding));
        }
    }
    
    if (isset($wp_style['spacing']['margin'])) {
        $margin = $wp_style['spacing']['margin'];
        if (is_array($margin)) {
            $wp_styles[] = sprintf(
                'margin: %s %s %s %s;',
                esc_attr($margin['top'] ?? '0'),
                esc_attr($margin['right'] ?? '0'),
                esc_attr($margin['bottom'] ?? '0'),
                esc_attr($margin['left'] ?? '0')
            );
        } else {
            $wp_styles[] = sprintf('margin: %s;', esc_attr($margin));
        }
    }
    
    // Handle WordPress border styles
    if (isset($wp_style['border']['color'])) {
        $wp_styles[] = sprintf('border-color: %s;', esc_attr($wp_style['border']['color']));
    }
    if (isset($wp_style['border']['width'])) {
        $wp_styles[] = sprintf('border-width: %s;', esc_attr($wp_style['border']['width']));
    }
    if (isset($wp_style['border']['style'])) {
        $wp_styles[] = sprintf('border-style: %s;', esc_attr($wp_style['border']['style']));
    }
    if (isset($wp_style['border']['radius'])) {
        $wp_styles[] = sprintf('border-radius: %s;', esc_attr($wp_style['border']['radius']));
    }
    
    // Handle WordPress shadow
    if (isset($wp_style['shadow'])) {
        $wp_styles[] = sprintf('box-shadow: var(--wp--preset--shadow--%s);', esc_attr($wp_style['shadow']));
    }
    
    // Combine WordPress styles
    $wp_style_string = implode(' ', $wp_styles);
    
    // Build custom styles for navigation items
    $custom_nav_styles = [];
    
    // Handle custom padding (always apply since WordPress style system doesn't have spacing in this case)
    if ($nav_padding) {
        $custom_nav_styles[] = sprintf(
            'padding: %s %s %s %s;',
            esc_attr($nav_padding['top'] ?? '12px'),
            esc_attr($nav_padding['right'] ?? '16px'),
            esc_attr($nav_padding['bottom'] ?? '12px'),
            esc_attr($nav_padding['left'] ?? '16px')
        );
    }
    
    // Handle custom margin (always apply since WordPress style system doesn't have spacing in this case)
    if ($nav_margin) {
        $custom_nav_styles[] = sprintf(
            'margin: %s %s %s %s;',
            esc_attr($nav_margin['top'] ?? '0px'),
            esc_attr($nav_margin['right'] ?? '0px'),
            esc_attr($nav_margin['bottom'] ?? '0px'),
            esc_attr($nav_margin['left'] ?? '0px')
        );
    }
    
    // Handle custom border styles
    if ($nav_border_style !== 'none') {
        $custom_nav_styles[] = sprintf(
            'border: %s %s %s; border-radius: %s;',
            esc_attr($nav_border_width),
            esc_attr($nav_border_style),
            esc_attr($nav_border_color),
            esc_attr($nav_border_radius)
        );
    }
    
    // Handle custom box shadow
    if ($nav_box_shadow !== 'none') {
        $custom_nav_styles[] = sprintf('box-shadow: %s;', esc_attr($nav_box_shadow));
    }
    
    // Combine custom navigation styles
    $nav_item_style = implode(' ', $custom_nav_styles);
    
    // Build navigation text styles
    $navigation_style = sprintf(
        'color: %s; font-size: %s; font-weight: %s; font-style: %s;',
        esc_attr($navigation_text_color),
        esc_attr($navigation_font_size),
        esc_attr($navigation_font_weight),
        esc_attr($navigation_font_style)
    );
    
    // Add hover color CSS
    $hover_css = '';
    if ($navigation_text_hover_color && $navigation_text_hover_color !== $navigation_text_color) {
        $hover_css = sprintf(
            '<style>.wedocs-doc-navigation a:hover .wedocs-doc-nav-title { color: %s !important; }</style>',
            esc_attr($navigation_text_hover_color)
        );
    }
    
    // Build arrow styles
    $arrow_styles = [];
    $arrow_styles[] = sprintf('font-size: %s;', esc_attr($arrow_size));
    $arrow_styles[] = sprintf('color: %s;', esc_attr($arrow_color));
    $arrow_styles[] = sprintf('background-color: %s;', esc_attr($arrow_background_color));
    
    if ($arrow_padding) {
        $arrow_styles[] = sprintf(
            'padding: %s %s %s %s;',
            esc_attr($arrow_padding['top'] ?? '8px'),
            esc_attr($arrow_padding['right'] ?? '8px'),
            esc_attr($arrow_padding['bottom'] ?? '8px'),
            esc_attr($arrow_padding['left'] ?? '8px')
        );
    }
    
    if ($arrow_margin) {
        $arrow_styles[] = sprintf(
            'margin: %s %s %s %s;',
            esc_attr($arrow_margin['top'] ?? '0px'),
            esc_attr($arrow_margin['right'] ?? '8px'),
            esc_attr($arrow_margin['bottom'] ?? '0px'),
            esc_attr($arrow_margin['left'] ?? '0px')
        );
    }
    
    $arrow_style = implode(' ', $arrow_styles);
    
    // Start output buffering
    ob_start();
    ?>
    <?php echo $hover_css; ?>
    <div class="wedocs-document wedocs-doc-navigation-preview" <?php echo $wrapper_attributes; ?>>
        <div class="wedocs-doc-navigation flex justify-between"<?php echo $wp_style_string ? ' style="' . esc_attr($wp_style_string) . '"' : ''; ?>>
            <?php if ($prev_post) : ?>
                <div class="wedocs-doc-nav-prev"<?php echo $nav_item_style ? ' style="' . esc_attr($nav_item_style) . '"' : ''; ?>>
                    <a href="<?php echo esc_url(get_permalink($prev_post->ID)); ?>" 
                       <?php echo ($seo_links === 'prev_next') ? 'rel="prev"' : ''; ?>>
                        <span class="wedocs-doc-nav-arrow" style="<?php echo esc_attr($arrow_style); ?>">←</span>
                        <span class="wedocs-doc-nav-title" style="<?php echo esc_attr($navigation_style); ?>">
                            <?php echo esc_html(apply_filters('wedocs_translate_text', $prev_post->post_title)); ?>
                        </span>
                    </a>
                </div>
            <?php endif; ?>
            
            <?php if ($next_post) : ?>
                <div class="wedocs-doc-nav-next"<?php echo $nav_item_style ? ' style="' . esc_attr($nav_item_style) . '"' : ''; ?>>
                    <a href="<?php echo esc_url(get_permalink($next_post->ID)); ?>" 
                       <?php echo ($seo_links === 'prev_next') ? 'rel="next"' : ''; ?>>
                        <span class="wedocs-doc-nav-title" style="<?php echo esc_attr($navigation_style); ?>">
                            <?php echo esc_html(apply_filters('wedocs_translate_text', $next_post->post_title)); ?>
                        </span>
                        <span class="wedocs-doc-nav-arrow" style="<?php echo esc_attr($arrow_style); ?>">→</span>
                    </a>
                </div>
            <?php endif; ?>
        </div>
    </div>
    
    <?php
    return ob_get_clean();
}
