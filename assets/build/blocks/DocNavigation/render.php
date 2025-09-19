<?php
/**
 * Render the doc navigation block on frontend
 *
 * @param array  $attributes Block attributes
 * @param string $content    Block content
 * @return string Rendered block content
 */
function render_wedocs_doc_navigation($attributes, $content = '') {
    // Extract attributes with defaults
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

    // Format navigation item padding and margin styles
    $nav_padding_style = '';
    if ($nav_padding) {
        $nav_padding_style = sprintf(
            'padding: %s %s %s %s;',
            esc_attr($nav_padding['top'] ?? '12px'),
            esc_attr($nav_padding['right'] ?? '16px'),
            esc_attr($nav_padding['bottom'] ?? '12px'),
            esc_attr($nav_padding['left'] ?? '16px')
        );
    }

    $nav_margin_style = '';
    if ($nav_margin) {
        $nav_margin_style = sprintf(
            'margin: %s %s %s %s;',
            esc_attr($nav_margin['top'] ?? '0px'),
            esc_attr($nav_margin['right'] ?? '0px'),
            esc_attr($nav_margin['bottom'] ?? '0px'),
            esc_attr($nav_margin['left'] ?? '0px')
        );
    }

    $arrow_padding_style = '';
    if ($arrow_padding) {
        $arrow_padding_style = sprintf(
            'padding: %s %s %s %s;',
            esc_attr($arrow_padding['top'] ?? '8px'),
            esc_attr($arrow_padding['right'] ?? '8px'),
            esc_attr($arrow_padding['bottom'] ?? '8px'),
            esc_attr($arrow_padding['left'] ?? '8px')
        );
    }

    $arrow_margin_style = '';
    if ($arrow_margin) {
        $arrow_margin_style = sprintf(
            'margin: %s %s %s %s;',
            esc_attr($arrow_margin['top'] ?? '0px'),
            esc_attr($arrow_margin['right'] ?? '8px'),
            esc_attr($arrow_margin['bottom'] ?? '0px'),
            esc_attr($arrow_margin['left'] ?? '0px')
        );
    }

    // Create inline styles
    $nav_item_style = sprintf(
        '%s %s border: %s %s %s; border-radius: %s; box-shadow: %s;',
        $nav_padding_style,
        $nav_margin_style,
        esc_attr($nav_border_width),
        esc_attr($nav_border_style),
        esc_attr($nav_border_color),
        esc_attr($nav_border_radius),
        esc_attr($nav_box_shadow)
    );

    $navigation_style = sprintf(
        'color: %s; font-size: %s; font-weight: %s; font-style: %s;',
        esc_attr($navigation_text_color),
        esc_attr($navigation_font_size),
        esc_attr($navigation_font_weight),
        esc_attr($navigation_font_style)
    );

    $arrow_style = sprintf(
        'font-size: %s; color: %s; background-color: %s; %s %s',
        esc_attr($arrow_size),
        esc_attr($arrow_color),
        esc_attr($arrow_background_color),
        $arrow_padding_style,
        $arrow_margin_style
    );

    // Get WordPress style system classes and styles
    $wrapper_attributes = get_block_wrapper_attributes();
    
    // Start output buffering
    ob_start();
    ?>
    <nav class="wedocs-doc-navigation wedocs-hide-print" <?php echo $wrapper_attributes; ?>>
        <h3 class="assistive-text screen-reader-text"><?php esc_html_e('Doc navigation', 'wedocs'); ?></h3>

        <?php if ($prev_post) : ?>
            <div class="wedocs-doc-nav-prev" style="<?php echo esc_attr($nav_item_style); ?>">
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
            <div class="wedocs-doc-nav-next" style="<?php echo esc_attr($nav_item_style); ?>">
                <a href="<?php echo esc_url(get_permalink($next_post->ID)); ?>" 
                   <?php echo ($seo_links === 'prev_next') ? 'rel="next"' : ''; ?>>
                    <span class="wedocs-doc-nav-title" style="<?php echo esc_attr($navigation_style); ?>">
                        <?php echo esc_html(apply_filters('wedocs_translate_text', $next_post->post_title)); ?>
                    </span>
                    <span class="wedocs-doc-nav-arrow" style="<?php echo esc_attr($arrow_style); ?>">→</span>
                </a>
            </div>
        <?php endif; ?>
    </nav>
    <?php
    return ob_get_clean();
}
