<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Add inline styles for the block based on attributes
 */
if ( ! function_exists( 'wedocs_dynamic_table_of_contents_inline_styles' ) ) {
    function wedocs_dynamic_table_of_contents_inline_styles() {
        if ( ! function_exists( 'has_blocks' ) || ! has_blocks() ) {
            return;
        }

        global $post;
        if ( ! $post ) {
            return;
        }

        $blocks = parse_blocks( $post->post_content );
        $styles = '';

        foreach ( $blocks as $block ) {
            if ( 'wedocs/table-of-contents' === $block['blockName'] ) {
                $attributes = $block['attrs'] ?? array();
                $block_id = $attributes['blockId'] ?? '';

                if ( ! empty( $block_id ) ) {
                    $styles .= wedocs_generate_toc_styles( $attributes, $block_id );
                }
            }
        }

        if ( ! empty( $styles ) ) {
            echo '<style id="dynamic-toc-styles">' . $styles . '</style>';
        }
    }
add_action( 'wp_head', 'wedocs_dynamic_table_of_contents_inline_styles' );
}
/**
 * Generate CSS styles from block attributes
 */
if ( ! function_exists( 'wedocs_generate_toc_styles' ) ) {
	function wedocs_generate_toc_styles( $attributes, $block_id ) {
		$styles = '';
		$selector = '.wp-block-wedocs-table-of-contents[data-block-id="' . esc_attr( $block_id ) . '"]';

		// Container styles
		if ( isset( $attributes['containerBackgroundColor'] ) ) {
			$styles .= $selector . ' { background-color: ' . esc_attr( $attributes['containerBackgroundColor'] ) . '; }';
		}
		if ( isset( $attributes['containerWidth'] ) ) {
			$styles .= $selector . ' { width: ' . esc_attr( $attributes['containerWidth'] ) . '; }';
		}
		if ( isset( $attributes['containerPadding'] ) ) {
			$padding = $attributes['containerPadding'];
			$styles .= $selector . ' { padding: ' . esc_attr( $padding['top'] ?? '0' ) . ' ' . esc_attr( $padding['right'] ?? '0' ) . ' ' . esc_attr( $padding['bottom'] ?? '0' ) . ' ' . esc_attr( $padding['left'] ?? '0' ) . '; }';
		}
		if ( isset( $attributes['containerMargin'] ) ) {
			$margin = $attributes['containerMargin'];
			$styles .= $selector . ' { margin: ' . esc_attr( $margin['top'] ?? '0' ) . ' ' . esc_attr( $margin['right'] ?? '0' ) . ' ' . esc_attr( $margin['bottom'] ?? '0' ) . ' ' . esc_attr( $margin['left'] ?? '0' ) . '; }';
		}
		if ( isset( $attributes['containerBorderStyle'] ) && $attributes['containerBorderStyle'] !== 'none' ) {
			$styles .= $selector . ' { border-style: ' . esc_attr( $attributes['containerBorderStyle'] ) . '; }';
			if ( isset( $attributes['containerBorderWidth'] ) ) {
				$styles .= $selector . ' { border-width: ' . esc_attr( $attributes['containerBorderWidth'] ) . '; }';
			}
			if ( isset( $attributes['containerBorderColor'] ) ) {
				$styles .= $selector . ' { border-color: ' . esc_attr( $attributes['containerBorderColor'] ) . '; }';
			}
		}
		if ( isset( $attributes['containerBorderRadius'] ) ) {
			$styles .= $selector . ' { border-radius: ' . esc_attr( $attributes['containerBorderRadius'] ) . '; }';
		}

		// Title styles
		if ( isset( $attributes['titleColor'] ) ) {
			$styles .= $selector . ' .toc-title { color: ' . esc_attr( $attributes['titleColor'] ) . '; }';
		}
		if ( isset( $attributes['titleFontSize'] ) ) {
			$styles .= $selector . ' .toc-title { font-size: ' . esc_attr( $attributes['titleFontSize'] ) . '; }';
		}
		if ( isset( $attributes['titleFontWeight'] ) ) {
			$styles .= $selector . ' .toc-title { font-weight: ' . esc_attr( $attributes['titleFontWeight'] ) . '; }';
		}

		// List styles
		if ( isset( $attributes['listColor'] ) ) {
			$styles .= $selector . ' .toc-list a { color: ' . esc_attr( $attributes['listColor'] ) . '; }';
		}
		if ( isset( $attributes['listHoverColor'] ) ) {
			$styles .= $selector . ' .toc-list a:hover { color: ' . esc_attr( $attributes['listHoverColor'] ) . '; }';
		}
		if ( isset( $attributes['listFontSize'] ) ) {
			$styles .= $selector . ' .toc-list { font-size: ' . esc_attr( $attributes['listFontSize'] ) . '; }';
		}

		return $styles;
	}
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

// Build CSS classes
$css_classes = ['wp-block-wedocs-table-of-contents'];
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

// Get block wrapper attributes
$wrapper_attributes = get_block_wrapper_attributes([
    'class' => implode(' ', $css_classes),
    'data-block-id' => esc_attr($block_id),
    'data-supported-headings' => esc_attr(wp_json_encode($supported_headings)),
    'data-show-hierarchy' => $show_hierarchy ? 'true' : 'false',
    'data-show-numbering' => $show_numbering ? 'true' : 'false',
    'data-smooth-scroll' => $smooth_scroll ? 'true' : 'false'
]);

// Apply inline styles
$inline_styles = '';
if (!empty($attributes['containerBackgroundColor'])) {
    $inline_styles .= 'background-color: ' . esc_attr($attributes['containerBackgroundColor']) . ';';
}
if (!empty($attributes['containerWidth'])) {
    $inline_styles .= 'width: ' . esc_attr($attributes['containerWidth']) . ';';
}

// Generate TOC content server-side for better SEO
if ( ! function_exists( 'wedocs_generate_toc_content_safe' ) ) {
    function wedocs_generate_toc_content_safe($supported_headings, $show_hierarchy, $show_numbering) {
        try {
            global $post;

            if (!$post || empty($post->post_content)) {
                return '<div class="toc-empty-state"><p>' . esc_html__('No content available.', 'dynamic-table-of-contents-block-wp') . '</p></div>';
            }

            // Parse content for headings
            $content = $post->post_content;
            $headings = wedocs_extract_headings_from_content_safe($content, $supported_headings);

            if (empty($headings)) {
                return '<div class="toc-empty-state"><p>' . esc_html__('No headings found. The table of contents will be generated automatically when you add headings to your content.', 'dynamic-table-of-contents-block-wp') . '</p></div>';
            }

            return wedocs_render_toc_list_safe($headings, $show_hierarchy, $show_numbering);
        } catch (Exception $e) {
            return '<div class="toc-error"><p>' . esc_html__('Error generating table of contents.', 'dynamic-table-of-contents-block-wp') . '</p></div>';
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

if ( ! function_exists( 'render_wedocs_table_of_contents_block' ) ) {
    /**
     * Modern WordPress block render callback
     * This function is automatically called by WordPress when the block.json has "render": "file:./render.php"
     */
    function render_wedocs_table_of_contents_block($attributes, $content, $block) {
        // Extract attributes with defaults
        $toc_title = $attributes['tocTitle'] ?? 'Table of Contents';
        $supported_headings = $attributes['supportedHeadings'] ?? ['h2', 'h3'];
        $show_hierarchy = $attributes['showHierarchy'] ?? true;
        $show_numbering = $attributes['showNumbering'] ?? false;
        $collapsible_on_mobile = $attributes['collapsibleOnMobile'] ?? true;
        $container_background_color = $attributes['containerBackgroundColor'] ?? '';
        $container_width = $attributes['containerWidth'] ?? '100%';
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
        $smooth_scroll = $attributes['smoothScroll'] ?? true;
        $sticky_mode = $attributes['stickyMode'] ?? false;
        $additional_css_class = $attributes['additionalCssClass'] ?? '';

        // Build wrapper attributes
        $wrapper_attributes = 'class="wp-block-wedocs-table-of-contents';
        if ($collapsible_on_mobile) {
            $wrapper_attributes .= ' toc-mobile-collapsible';
        }
        if ($sticky_mode) {
            $wrapper_attributes .= ' toc-sticky';
        }
        if (!empty($additional_css_class)) {
            $wrapper_attributes .= ' ' . esc_attr($additional_css_class);
        }
        $wrapper_attributes .= '"';

        // Build inline styles
        $inline_styles = '';
        if (!empty($container_background_color)) {
            $inline_styles .= 'background-color: ' . esc_attr($container_background_color) . '; ';
        }
        $inline_styles .= 'width: ' . esc_attr($container_width) . '; ';
        $inline_styles .= 'padding: ' . esc_attr($container_padding['top']) . ' ' . esc_attr($container_padding['right']) . ' ' . esc_attr($container_padding['bottom']) . ' ' . esc_attr($container_padding['left']) . '; ';
        $inline_styles .= 'margin: ' . esc_attr($container_margin['top']) . ' ' . esc_attr($container_margin['right']) . ' ' . esc_attr($container_margin['bottom']) . ' ' . esc_attr($container_margin['left']) . '; ';
        $inline_styles .= 'border: ' . esc_attr($container_border_width) . ' ' . esc_attr($container_border_style) . ' ' . esc_attr($container_border_color) . '; ';
        $inline_styles .= 'border-radius: ' . esc_attr($container_border_radius) . '; ';

        $toc_content = wedocs_generate_toc_content_safe($supported_headings, $show_hierarchy, $show_numbering);

        ob_start();
        ?>
        <div <?php echo $wrapper_attributes; ?> <?php echo !empty($inline_styles) ? 'style="' . esc_attr($inline_styles) . '"' : ''; ?>>
            <div class="toc-title" style="<?php echo !empty($title_color) ? 'color: ' . esc_attr($title_color) . '; ' : ''; ?>font-size: <?php echo esc_attr($title_font_size); ?>; font-weight: <?php echo esc_attr($title_font_weight); ?>; padding: <?php echo esc_attr($title_padding['top']) . ' ' . esc_attr($title_padding['right']) . ' ' . esc_attr($title_padding['bottom']) . ' ' . esc_attr($title_padding['left']); ?>;">
                <?php echo esc_html($toc_title); ?>
            </div>
            <div class="toc-content" style="<?php echo !empty($list_color) ? 'color: ' . esc_attr($list_color) . '; ' : ''; ?>font-size: <?php echo esc_attr($list_font_size); ?>;">
                <?php echo wp_kses_post($toc_content); ?>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
}

/**
 * Modern WordPress block render callback
 * This function is automatically called by WordPress when the block.json has "render": "file:./render.php"
 */
    // Extract attributes with defaults
    $toc_title = $attributes['tocTitle'] ?? 'Table of Contents';
    $supported_headings = $attributes['supportedHeadings'] ?? ['h2', 'h3'];
    $show_hierarchy = $attributes['showHierarchy'] ?? true;
    $show_numbering = $attributes['showNumbering'] ?? false;
    $collapsible_on_mobile = $attributes['collapsibleOnMobile'] ?? true;
    $container_background_color = $attributes['containerBackgroundColor'] ?? '';
    $container_width = $attributes['containerWidth'] ?? '100%';
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
    $smooth_scroll = $attributes['smoothScroll'] ?? true;
    $sticky_mode = $attributes['stickyMode'] ?? false;
    $additional_css_class = $attributes['additionalCssClass'] ?? '';

    // Build wrapper attributes
    $wrapper_attributes = 'class="wp-block-wedocs-table-of-contents';
    if ($collapsible_on_mobile) {
        $wrapper_attributes .= ' toc-mobile-collapsible';
    }
    if ($sticky_mode) {
        $wrapper_attributes .= ' toc-sticky';
    }
    if (!empty($additional_css_class)) {
        $wrapper_attributes .= ' ' . esc_attr($additional_css_class);
    }
    $wrapper_attributes .= '"';

    // Build inline styles
    $inline_styles = '';
    if (!empty($container_background_color)) {
        $inline_styles .= 'background-color: ' . esc_attr($container_background_color) . '; ';
    }
    $inline_styles .= 'width: ' . esc_attr($container_width) . '; ';
    $inline_styles .= 'padding: ' . esc_attr($container_padding['top']) . ' ' . esc_attr($container_padding['right']) . ' ' . esc_attr($container_padding['bottom']) . ' ' . esc_attr($container_padding['left']) . '; ';
    $inline_styles .= 'margin: ' . esc_attr($container_margin['top']) . ' ' . esc_attr($container_margin['right']) . ' ' . esc_attr($container_margin['bottom']) . ' ' . esc_attr($container_margin['left']) . '; ';
    $inline_styles .= 'border: ' . esc_attr($container_border_width) . ' ' . esc_attr($container_border_style) . ' ' . esc_attr($container_border_color) . '; ';
    $inline_styles .= 'border-radius: ' . esc_attr($container_border_radius) . '; ';

    $toc_content = wedocs_generate_toc_content_safe($supported_headings, $show_hierarchy, $show_numbering);

    ?>
    <div <?php echo $wrapper_attributes; ?> <?php echo !empty($inline_styles) ? 'style="' . esc_attr($inline_styles) . '"' : ''; ?>>
        <div class="toc-title" style="<?php echo !empty($title_color) ? 'color: ' . esc_attr($title_color) . '; ' : ''; ?>font-size: <?php echo esc_attr($title_font_size); ?>; font-weight: <?php echo esc_attr($title_font_weight); ?>; padding: <?php echo esc_attr($title_padding['top']) . ' ' . esc_attr($title_padding['right']) . ' ' . esc_attr($title_padding['bottom']) . ' ' . esc_attr($title_padding['left']); ?>;">
            <?php echo esc_html($toc_title); ?>
        </div>
        <div class="toc-content" style="<?php echo !empty($list_color) ? 'color: ' . esc_attr($list_color) . '; ' : ''; ?>font-size: <?php echo esc_attr($list_font_size); ?>;">
            <?php echo wp_kses_post($toc_content); ?>
        </div>
    </div>
