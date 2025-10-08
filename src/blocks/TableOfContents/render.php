<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Get block attributes with proper defaults
$block_id = isset($attributes['blockId']) ? sanitize_text_field($attributes['blockId']) : 'toc-' . uniqid();
$toc_title = isset($attributes['tocTitle']) ? sanitize_text_field($attributes['tocTitle']) : 'Table of Contents';
$supported_headings = isset($attributes['supportedHeadings']) && is_array($attributes['supportedHeadings']) ? $attributes['supportedHeadings'] : ['h2', 'h3'];
$show_hierarchy = isset($attributes['showHierarchy']) ? (bool) $attributes['showHierarchy'] : true;
$show_numbering = isset($attributes['showNumbering']) ? (bool) $attributes['showNumbering'] : false;
$collapsible_on_mobile = isset($attributes['collapsibleOnMobile']) ? (bool) $attributes['collapsibleOnMobile'] : true;
$smooth_scroll = isset($attributes['smoothScroll']) ? (bool) $attributes['smoothScroll'] : true;
$sticky_mode = isset($attributes['stickyMode']) ? (bool) $attributes['stickyMode'] : false;
$additional_css_class = isset($attributes['additionalCssClass']) ? sanitize_text_field($attributes['additionalCssClass']) : '';

// Typography settings
$title_typography = isset($attributes['titleTypography']) && is_array($attributes['titleTypography']) ? $attributes['titleTypography'] : array();
$list_typography = isset($attributes['listTypography']) && is_array($attributes['listTypography']) ? $attributes['listTypography'] : array();

// Color settings
$title_color = isset($attributes['titleColor']) ? sanitize_text_field($attributes['titleColor']) : '';
$link_color = isset($attributes['linkColor']) ? sanitize_text_field($attributes['linkColor']) : '';
$link_hover_color = isset($attributes['linkHoverColor']) ? sanitize_text_field($attributes['linkHoverColor']) : '';

// Build CSS classes
$css_classes = ['wp-block-wedocs-block-dynamic-table-of-contents'];
if (!empty($additional_css_class)) {
    $css_classes[] = esc_attr($additional_css_class);
}
if ($sticky_mode) {
    $css_classes[] = 'sticky-mode';
}
if ($collapsible_on_mobile) {
    $css_classes[] = 'collapsible-mobile';
}
if ($smooth_scroll) {
    $css_classes[] = 'smooth-scroll';
}

// Build inline styles
$inline_styles = array();

// Title typography
if (!empty($title_typography['fontSize'])) {
    $inline_styles[] = '--toc-title-font-size: ' . esc_attr($title_typography['fontSize']);
}
if (!empty($title_typography['fontWeight'])) {
    $inline_styles[] = '--toc-title-font-weight: ' . esc_attr($title_typography['fontWeight']);
}
if (!empty($title_typography['lineHeight'])) {
    $inline_styles[] = '--toc-title-line-height: ' . esc_attr($title_typography['lineHeight']);
}
if (!empty($title_typography['fontFamily'])) {
    $inline_styles[] = '--toc-title-font-family: ' . esc_attr($title_typography['fontFamily']);
}

// List typography
if (!empty($list_typography['fontSize'])) {
    $inline_styles[] = '--toc-list-font-size: ' . esc_attr($list_typography['fontSize']);
}
if (!empty($list_typography['lineHeight'])) {
    $inline_styles[] = '--toc-list-line-height: ' . esc_attr($list_typography['lineHeight']);
}
if (!empty($list_typography['fontFamily'])) {
    $inline_styles[] = '--toc-list-font-family: ' . esc_attr($list_typography['fontFamily']);
}

// Colors
if (!empty($title_color)) {
    $inline_styles[] = '--toc-title-color: ' . esc_attr($title_color);
}
if (!empty($link_color)) {
    $inline_styles[] = '--toc-link-color: ' . esc_attr($link_color);
}
if (!empty($link_hover_color)) {
    $inline_styles[] = '--toc-link-hover-color: ' . esc_attr($link_hover_color);
}

// Get block wrapper attributes
$wrapper_attributes = get_block_wrapper_attributes(array(
    'class' => implode(' ', $css_classes),
    'data-block-id' => esc_attr($block_id),
    'data-supported-headings' => esc_attr(wp_json_encode($supported_headings)),
    'data-show-hierarchy' => $show_hierarchy ? 'true' : 'false',
    'data-show-numbering' => $show_numbering ? 'true' : 'false',
    'data-smooth-scroll' => $smooth_scroll ? 'true' : 'false',
    'style' => !empty($inline_styles) ? implode('; ', $inline_styles) : null
));

// Generate TOC content server-side for better SEO
if ( ! function_exists( 'wedocs_generate_toc_content_safe' ) ) {
    function wedocs_generate_toc_content_safe($supported_headings, $show_hierarchy, $show_numbering) {
        try {
            global $post;

            if (!$post || empty($post->post_content)) {
                return '<div class="toc-empty-state"><p>' . esc_html__('No content available.', 'wedocs') . '</p></div>';
            }

            // Parse content for headings
            $content = $post->post_content;
            $headings = wedocs_extract_headings_from_content_safe($content, $supported_headings);

            if (empty($headings)) {
                return '<div class="toc-empty-state"><p>' . esc_html__('No headings found. The table of contents will be generated automatically when you add headings to your content.', 'wedocs') . '</p></div>';
            }

            return wedocs_render_toc_list_safe($headings, $show_hierarchy, $show_numbering);
        } catch (Exception $e) {
            return '<div class="toc-error"><p>' . esc_html__('Error generating table of contents.', 'wedocs') . '</p></div>';
        }
    }
}

if ( ! function_exists( 'wedocs_extract_headings_from_content_safe' ) ) {
    function wedocs_extract_headings_from_content_safe($content, $supported_headings) {
        $headings = [];

        if (empty($content) || !is_array($supported_headings)) {
            return $headings;
        }

        // Convert h-tags to lowercase for pattern matching
        $supported_tags = array_map('strtolower', $supported_headings);
        $pattern = '/<(' . implode('|', $supported_tags) . ')(?:[^>]*(?:\s+id=["\']([^"\'][^"\']*)["\'\'])?[^>]*)>(.*?)<\/\1>/i';

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

if ( ! function_exists( 'wedocs_render_toc_list_safe' ) ) {
    function wedocs_render_toc_list_safe($headings, $show_hierarchy, $show_numbering) {
        if (empty($headings) || !is_array($headings)) {
            return '';
        }

        $css_classes = ['toc-list'];
        $css_classes[] = $show_hierarchy ? 'hierarchical' : 'flat';
        $css_classes[] = $show_numbering ? 'numbered' : 'bulleted';

        $html = '<ul class="' . esc_attr(implode(' ', $css_classes)) . '">';

        $counters = [1 => 0, 2 => 0, 3 => 0, 4 => 0, 5 => 0];
        $global_counter = 1;

        foreach ($headings as $heading) {
            if (!is_array($heading) || !isset($heading['level'], $heading['text'], $heading['id'])) {
                continue;
            }

            $level = (int) $heading['level'];
            $text = sanitize_text_field($heading['text']);
            $id = sanitize_text_field($heading['id']);

            if ($level < 1 || $level > 6 || empty($text) || empty($id)) {
                continue;
            }

            // Update counters
            if ($show_numbering) {
                if ($show_hierarchy) {
                    $counters[$level]++;
                    // Reset lower level counters
                    for ($i = $level + 1; $i <= 5; $i++) {
                        $counters[$i] = 0;
                    }
                } else {
                    $counters[$level] = $global_counter++;
                }
            }

            // Calculate indent
            $indent = $show_hierarchy ? max(0, ($level - 2) * 20) : 0;

            // Generate number text
            $number_text = '';
            if ($show_numbering) {
                if ($show_hierarchy) {
                    $numbers = [];
                    for ($i = 2; $i <= $level; $i++) {
                        if (isset($counters[$i]) && $counters[$i] > 0) {
                            $numbers[] = $counters[$i];
                        }
                    }
                    $number_text = !empty($numbers) ? implode('.', $numbers) . '. ' : '';
                } else {
                    $number_text = (isset($counters[$level]) ? $counters[$level] : 0) . '. ';
                }
            }

            $html .= '<li style="margin-left: ' . esc_attr($indent) . 'px">';
            $html .= '<a href="#' . esc_attr($id) . '" class="toc-link">';
            if ($show_numbering && !empty($number_text)) {
                $html .= '<span class="toc-number">' . esc_html($number_text) . '</span>';
            }
            $html .= esc_html($text);
            $html .= '</a></li>';
        }

        $html .= '</ul>';

        return $html;
    }
}

$toc_content = wedocs_generate_toc_content_safe($supported_headings, $show_hierarchy, $show_numbering);
?>

<div <?php echo $wrapper_attributes; ?>>
    <div class="toc-title">
        <?php echo esc_html($toc_title); ?>
    </div>
    <div class="toc-content">
        <?php echo wp_kses_post($toc_content); ?>
    </div>
</div>
