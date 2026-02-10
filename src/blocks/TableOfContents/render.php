<?php

/**
 * Table of Contents Block - Server-side Rendering
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

// Prevent direct access
if (! defined('ABSPATH')) {
    exit;
}

/**
 * Generate TOC content from post headings
 */
if (! function_exists('wedocs_generate_toc_content_safe')) {
    function wedocs_generate_toc_content_safe($supported_headings, $show_hierarchy, $show_numbering) {
        try {
            global $post;

            if (!$post || empty($post->post_content)) {
                return '<div class="toc-empty-state"><p>' . esc_html__('No content available.', 'wedocs-plugin') . '</p></div>';
            }

            // Parse content for headings
            $content = $post->post_content;
            $headings = wedocs_extract_headings_from_content_safe($content, $supported_headings);

            if (empty($headings)) {
                return '<div class="toc-empty-state"><p>' . esc_html__('No headings found. The table of contents will be generated automatically when you add headings to your content.', 'wedocs-plugin') . '</p></div>';
            }

            return wedocs_render_toc_list_safe($headings, $show_hierarchy, $show_numbering);
        } catch (Exception $e) {
            return '<div class="toc-error"><p>' . esc_html__('Error generating table of contents.', 'wedocs-plugin') . '</p></div>';
        }
    }
}

/**
 * Extract headings from content
 */
if (! function_exists('wedocs_extract_headings_from_content_safe')) {
    function wedocs_extract_headings_from_content_safe($content, $supported_headings) {
        $headings = [];

        if (empty($content) || !is_array($supported_headings)) {
            return $headings;
        }

        // Convert h-tags to lowercase for pattern matching
        $supported_tags = array_map('strtolower', $supported_headings);
        $pattern = '/<(' . implode('|', $supported_tags) . ')(?:[^>]*(?:\s+id=["\']([^"\']*)["\'])?[^>]*)>(.*?)<\/\1>/i';

        if (preg_match_all($pattern, $content, $matches, PREG_SET_ORDER)) {
            $used_ids = [];

            foreach ($matches as $match) {
                if (count($match) < 4) continue;

                $tag = strtolower($match[1]);
                $level = (int) substr($tag, 1);
                $existing_id = isset($match[2]) && !empty(trim($match[2])) ? trim($match[2]) : '';
                $text = wp_strip_all_tags($match[3]);
                $text = trim($text);

                if (empty($text)) continue;

                $id = !empty($existing_id) ? $existing_id : sanitize_title($text);

                // Ensure unique IDs
                $original_id = $id;
                $counter = 1;
                while (in_array($id, $used_ids)) {
                    $id = $original_id . '-' . $counter;
                    $counter++;
                }
                $used_ids[] = $id;

                $headings[] = [
                    'level' => $level,
                    'text' => $text,
                    'id' => $id
                ];
            }
        }

        return $headings;
    }
}

/**
 * Render TOC list HTML
 */
if (! function_exists('wedocs_render_toc_list_safe')) {
    function wedocs_render_toc_list_safe($headings, $show_hierarchy, $show_numbering) {
        if (empty($headings) || !is_array($headings)) {
            return '';
        }

        $css_classes = ['toc-list'];
        $css_classes[] = $show_hierarchy ? 'hierarchical' : 'flat';
        $css_classes[] = $show_numbering ? 'numbered' : 'bulleted';

        $html = '<ul class="' . esc_attr(implode(' ', $css_classes)) . '">';

        $counters = [1 => 0, 2 => 0, 3 => 0, 4 => 0, 5 => 0, 6 => 0];
        $current_level = 0;
        $open_lists = 0;

        foreach ($headings as $index => $heading) {
            if (!is_array($heading) || !isset($heading['level'], $heading['text'], $heading['id'])) {
                continue;
            }

            $level = (int) $heading['level'];
            $text = sanitize_text_field($heading['text']);
            $id = sanitize_text_field($heading['id']);

            if ($show_hierarchy) {
                // Handle hierarchical structure
                if ($current_level === 0) {
                    $current_level = $level;
                } elseif ($level > $current_level) {
                    // Open nested list
                    while ($current_level < $level) {
                        $html .= '<ul>';
                        $open_lists++;
                        $current_level++;
                    }
                } elseif ($level < $current_level) {
                    // Close nested lists
                    while ($current_level > $level && $open_lists > 0) {
                        $html .= '</ul></li>';
                        $open_lists--;
                        $current_level--;
                    }
                }

                // Reset deeper level counters
                for ($i = $level + 1; $i <= 6; $i++) {
                    $counters[$i] = 0;
                }
            }

            $counters[$level]++;

            // Build number prefix if numbering is enabled
            $number_prefix = '';
            if ($show_numbering) {
                if ($show_hierarchy) {
                    $number_parts = [];
                    for ($i = min(array_keys($counters)); $i <= $level; $i++) {
                        if ($counters[$i] > 0) {
                            $number_parts[] = $counters[$i];
                        }
                    }
                    $number_prefix = implode('.', $number_parts) . '. ';
                } else {
                    $number_prefix = ($index + 1) . '. ';
                }
            }

            $html .= sprintf(
                '<li class="toc-item level-%d"><a href="#%s">%s%s</a>',
                esc_attr($level),
                esc_attr($id),
                $number_prefix,
                esc_html($text)
            );

            // Check if we need to close the li tag (will be closed when nesting or at end)
            $next_heading = isset($headings[$index + 1]) ? $headings[$index + 1] : null;
            if (!$next_heading || $next_heading['level'] <= $level) {
                $html .= '</li>';
            }
        }

        // Close any remaining open nested lists
        while ($open_lists > 0) {
            $html .= '</ul></li>';
            $open_lists--;
        }

        $html .= '</ul>';

        return $html;
    }
}

// ===========================
// MAIN RENDER LOGIC
// ===========================

// Extract attributes with defaults
$block_id = $attributes['blockId'] ?? 'toc-' . uniqid();
$toc_title = $attributes['tocTitle'] ?? 'Table of Contents';
$supported_headings = $attributes['supportedHeadings'] ?? ['h2', 'h3'];
$show_hierarchy = $attributes['showHierarchy'] ?? true;
$show_numbering = $attributes['showNumbering'] ?? false;
$collapsible_on_mobile = $attributes['collapsibleOnMobile'] ?? true;
$smooth_scroll = $attributes['smoothScroll'] ?? true;
$sticky_mode = $attributes['stickyMode'] ?? false;
$additional_css_class = $attributes['additionalCssClass'] ?? '';

// Style attributes
$container_background_color = $attributes['containerBackgroundColor'] ?? '';
$container_width = $attributes['containerWidth'] ?? '';
$container_padding = $attributes['containerPadding'] ?? ['top' => '20px', 'right' => '20px', 'bottom' => '20px', 'left' => '20px'];
$container_margin = $attributes['containerMargin'] ?? ['top' => '0px', 'right' => '0px', 'bottom' => '20px', 'left' => '0px'];
$container_border_style = $attributes['containerBorderStyle'] ?? 'solid';
$container_border_width = $attributes['containerBorderWidth'] ?? '1px';
$container_border_color = $attributes['containerBorderColor'] ?? '#e0e0e0';
$container_border_radius = $attributes['containerBorderRadius'] ?? '5px';
$title_color = $attributes['titleColor'] ?? '';
$title_font_size = $attributes['titleFontSize'] ?? '18px';
$title_font_weight = $attributes['titleFontWeight'] ?? '600';
$title_padding = $attributes['titlePadding'] ?? ['top' => '0px', 'right' => '0px', 'bottom' => '15px', 'left' => '0px'];
$list_color = $attributes['listColor'] ?? '';
$list_hover_color = $attributes['listHoverColor'] ?? '';
$list_font_size = $attributes['listFontSize'] ?? '14px';

// Build CSS classes
$css_classes = ['wp-block-wedocs-table-of-contents'];
if ($collapsible_on_mobile) {
    $css_classes[] = 'collapsible-mobile';
}
if ($smooth_scroll) {
    $css_classes[] = 'smooth-scroll';
}
if ($sticky_mode) {
    $css_classes[] = 'sticky-mode';
}
if (!empty($additional_css_class)) {
    $css_classes[] = esc_attr($additional_css_class);
}

// Build wrapper attributes
$wrapper_attributes = get_block_wrapper_attributes([
    'class' => implode(' ', $css_classes),
    'data-block-id' => esc_attr($block_id),
    'data-supported-headings' => esc_attr(wp_json_encode($supported_headings)),
    'data-show-hierarchy' => $show_hierarchy ? 'true' : 'false',
    'data-show-numbering' => $show_numbering ? 'true' : 'false',
    'data-smooth-scroll' => $smooth_scroll ? 'true' : 'false'
]);

// Build inline styles
$container_styles = [];
if (!empty($container_background_color)) {
    $container_styles[] = 'background-color: ' . esc_attr($container_background_color);
}
if (!empty($container_width)) {
    $container_styles[] = 'width: ' . esc_attr($container_width);
}
if (!empty($container_padding)) {
    $padding_value = sprintf(
        '%s %s %s %s',
        esc_attr($container_padding['top']),
        esc_attr($container_padding['right']),
        esc_attr($container_padding['bottom']),
        esc_attr($container_padding['left'])
    );
    $container_styles[] = 'padding: ' . $padding_value;
}
if (!empty($container_margin)) {
    $margin_value = sprintf(
        '%s %s %s %s',
        esc_attr($container_margin['top']),
        esc_attr($container_margin['right']),
        esc_attr($container_margin['bottom']),
        esc_attr($container_margin['left'])
    );
    $container_styles[] = 'margin: ' . $margin_value;
}
if (!empty($container_border_style) && $container_border_style !== 'none') {
    $border_value = sprintf(
        '%s %s %s',
        esc_attr($container_border_width),
        esc_attr($container_border_style),
        esc_attr($container_border_color)
    );
    $container_styles[] = 'border: ' . $border_value;
}
if (!empty($container_border_radius)) {
    $container_styles[] = 'border-radius: ' . esc_attr($container_border_radius);
}

// Build title styles
$title_styles = [];
if (!empty($title_color)) {
    $title_styles[] = 'color: ' . esc_attr($title_color);
}
$title_styles[] = 'font-size: ' . esc_attr($title_font_size);
$title_styles[] = 'font-weight: ' . esc_attr($title_font_weight);
if (!empty($title_padding)) {
    $padding_value = sprintf(
        '%s %s %s %s',
        esc_attr($title_padding['top']),
        esc_attr($title_padding['right']),
        esc_attr($title_padding['bottom']),
        esc_attr($title_padding['left'])
    );
    $title_styles[] = 'padding: ' . $padding_value;
}

// Build content styles
$content_styles = [];
if (!empty($list_color)) {
    $content_styles[] = 'color: ' . esc_attr($list_color);
}
$content_styles[] = 'font-size: ' . esc_attr($list_font_size);

// Generate TOC content
$toc_content = wedocs_generate_toc_content_safe($supported_headings, $show_hierarchy, $show_numbering);

// Output the block HTML
?>
<div <?php echo $wrapper_attributes; ?> <?php echo !empty($container_styles) ? 'style="' . esc_attr(implode('; ', $container_styles)) . '"' : ''; ?>>
    <div class="toc-title" <?php echo !empty($title_styles) ? 'style="' . esc_attr(implode('; ', $title_styles)) . '"' : ''; ?>>
        <?php echo esc_html($toc_title); ?>
    </div>
    <div class="toc-content" <?php echo !empty($content_styles) ? 'style="' . esc_attr(implode('; ', $content_styles)) . '"' : ''; ?>>
        <?php echo wp_kses_post($toc_content); ?>
    </div>
</div>