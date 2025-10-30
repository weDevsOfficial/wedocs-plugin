<?php
/**
 * Render the sidebar block on frontend using WordPress native functions
 *
 * @param array  $attributes Block attributes
 * @param string $content    Block content
 *
 * @return string Rendered block content
 */

/**
 * Parse WordPress preset values to actual CSS values
 *
 * @param string $value The preset value to parse
 * @return string The parsed CSS value
 */
if ( ! function_exists( 'wedocs_parse_wp_preset_value' ) ) {
    function wedocs_parse_wp_preset_value( $value ) {
        if ( empty( $value ) ) {
            return '';
        }

        // Handle WordPress CSS class-based colors like "has-accent-2-color"
        // Keep the class names as they are - WordPress will handle the styling
        if ( strpos( $value, 'has-' ) === 0 ) {
            return $value; // Return the class name as-is
        }

        // Handle WordPress theme color presets (any custom preset name)
        // WordPress themes can define custom color presets in theme.json
        // Examples: "primary", "secondary", "accent-1", "brand-blue", "custom-color"
        // Check if it's a valid color preset name (not a CSS color value)
        if ( ! empty( $value ) &&
             strpos( $value, '#' ) !== 0 &&
             strpos( $value, 'rgb' ) !== 0 &&
             strpos( $value, 'hsl' ) !== 0 &&
             strpos( $value, 'var(' ) !== 0 &&
             strpos( $value, 'var:' ) !== 0 &&
             $value !== 'transparent' &&
             $value !== 'currentColor' ) {
            // If it's not a CSS color value, treat it as a theme preset
            // Convert to WordPress color class: "primary" -> "has-primary-color"
            return 'has-' . strtolower( $value ) . '-color';
        }

        // Handle spacing presets like "var:preset|spacing|30"
        if ( strpos( $value, 'var:preset|spacing|' ) === 0 ) {
            $spacing_slug = str_replace( 'var:preset|spacing|', '', $value );

            // Convert to WordPress CSS custom property format
            return 'var(--wp--preset--spacing--' . $spacing_slug . ')';
        }

        // Handle color presets like "var:preset|color|primary"
        if ( strpos( $value, 'var:preset|color|' ) === 0 ) {
            $color_slug = str_replace( 'var:preset|color|', '', $value );
            return 'has-' . $color_slug . '-color';
        }

        // If it's already a valid CSS value, return as is
        return $value;
    }
}

/**
 * Get color value with fallback
 *
 * @param string $color_value The color value to check
 * @param string $fallback The fallback color value
 * @return string The color value or fallback
 */
if ( ! function_exists( 'wedocs_get_color_value' ) ) {
    function wedocs_get_color_value( $color_value, $fallback = '' ) {
        return $color_value && trim( $color_value ) !== '' ? $color_value : $fallback;
    }
}

/**
 * Process WordPress color class and add to appropriate output
 *
 * @param string $parsed_color The parsed color value
 * @param array $wp_classes Array of WordPress classes to add to
 * @param string $css_variables CSS variables string to add to
 * @param string $css_var_name The CSS variable name
 * @return array Array with updated wp_classes and css_variables
 */
if ( ! function_exists( 'wedocs_process_wp_color_class' ) ) {
    function wedocs_process_wp_color_class( $parsed_color, $wp_classes, $css_variables, $css_var_name ) {
        if ( strpos( $parsed_color, 'has-' ) === 0 ) {
            $wp_classes[] = $parsed_color;
        } else {
            $css_variables .= '--' . $css_var_name . ': ' . esc_attr( $parsed_color ) . ';';
        }

        return [ $wp_classes, $css_variables ];
    }
}

/**
 * Process WordPress background color class and add to appropriate output
 *
 * @param string $parsed_color The parsed color value
 * @param array $wp_classes Array of WordPress classes to add to
 * @param string $css_variables CSS variables string to add to
 * @param string $css_var_name The CSS variable name
 * @return array Array with updated wp_classes and css_variables
 */
if ( ! function_exists( 'wedocs_process_wp_background_color_class' ) ) {
    function wedocs_process_wp_background_color_class( $parsed_color, $wp_classes, $css_variables, $css_var_name ) {
        if ( strpos( $parsed_color, 'has-' ) === 0 ) {
            // Convert to background-color class
            $bg_class = str_replace( '-color', '-background-color', $parsed_color );
            $wp_classes[] = $bg_class;
        } else {
            $css_variables .= '--' . $css_var_name . ': ' . esc_attr( $parsed_color ) . ';';
        }

        return [ $wp_classes, $css_variables ];
    }
}

/**
 * Generate connector line HTML
 *
 * @param array $tree_styles Tree styling options
 * @param int $level Current nesting level
 * @return string HTML for connector line
 */
if ( ! function_exists( 'wedocs_generate_connector_line' ) ) {
    function wedocs_generate_connector_line( $tree_styles, $level ) {
        if ( $level <= 0 ) {
            return '';
        }

        $connector_width = intval( str_replace( 'px', '', $tree_styles['indentation'] ?? '20' ) ) / 2;
        $connector_color = wedocs_get_color_value( $tree_styles['connectorColor'] ?? '', '#e5e7eb' );

        return '<div class="wedocs-connector-line" style="position: absolute; left: -' . $connector_width . 'px; top: 0; bottom: 0; width: ' . ( $tree_styles['connectorWidth'] ?? '1px' ) . '; background-color: ' . esc_attr( $connector_color ) . ';"></div>';
    }
}
if ( ! function_exists( 'render_wedocs_sidebar' ) ) {
    function render_wedocs_sidebar( $attributes, $content ) {
        // Extract attributes with defaults
        $exclude_sections       = $attributes['excludeSections'] ?? [];
        $sections_order_by      = $attributes['sectionsOrderBy'] ?? 'menu_order';
        $sections_order         = $attributes['sectionsOrder'] ?? 'asc';
        $article_order_by       = $attributes['articleOrderBy'] ?? 'menu_order';
        $article_order          = $attributes['articleOrder'] ?? 'asc';
        $enable_nested_articles = $attributes['enableNestedArticles'] ?? true;
    // Handle empty string case
    if ($enable_nested_articles === '') {
        $enable_nested_articles = true;
    }
        $section_title_tag      = $attributes['sectionTitleTag'] ?? 'h3';
        $article_title_tag      = $attributes['articleTitleTag'] ?? 'h4';
        // Styling attributes
        $container_styles   = $attributes['containerStyles'] ?? [];
        $section_styles     = $attributes['sectionStyles'] ?? [];
        $title_styles       = $attributes['titleStyles'] ?? [];
        $doc_list_styles    = $attributes['docListStyles'] ?? [];
        $tree_styles        = $attributes['treeStyles'] ?? [];
        $count_badge_styles = $attributes['countBadgeStyles'] ?? [];
        $className          = $attributes['className'] ?? '';
        // Get all docs
        $all_docs = get_posts(
            [
                'post_type'   => 'docs',
                'post_status' => 'publish',
                'numberposts' => - 1,
                'orderby'     => 'menu_order',
                'order'       => 'ASC',
            ]
        );
        // Apply exclude filter
        if ( ! empty( $exclude_sections ) ) {
            $all_docs = array_filter(
                $all_docs, function( $doc ) use ( $exclude_sections ) {
                return ! in_array( $doc->ID, $exclude_sections );
            }
            );
        }
        // Build hierarchical structure
        $sections            = [];
        $articles_by_section = [];
        foreach ( $all_docs as $doc ) {
            if ( $doc->post_parent == 0 ) {
                $sections[] = $doc;
            } else {
                if ( ! isset( $articles_by_section[ $doc->post_parent ] ) ) {
                    $articles_by_section[ $doc->post_parent ] = [];
                }
                $articles_by_section[ $doc->post_parent ][] = $doc;
            }
        }
        // Sort sections
        $sections = wedocs_sort_docs( $sections, $sections_order_by, $sections_order );
        // Sort articles for each section
        foreach ( $articles_by_section as $section_id => $articles ) {
            $articles_by_section[ $section_id ] = wedocs_sort_docs( $articles, $article_order_by, $article_order );
        }
        // Build the HTML output
        $children = '';
        foreach ( $sections as $section ) {
            $children .= wedocs_render_section_with_articles(
                $section, $articles_by_section, $enable_nested_articles, $section_title_tag, $article_title_tag,
                $section_styles, $title_styles, $doc_list_styles, $tree_styles, $count_badge_styles
            );
        }
        // Build CSS variables for main container styling (only padding and background)
        $css_variables = '';
        $wp_classes = [];

        // Process WordPress core backgroundColor attribute
        if ( ! empty( $attributes['backgroundColor'] ) ) {
            $parsed_bg_color = wedocs_parse_wp_preset_value( $attributes['backgroundColor'] );
            // Check if it's a WordPress class (starts with 'has-')
            if ( strpos( $parsed_bg_color, 'has-' ) === 0 ) {
                // Convert has-accent-2-color to has-accent-2-background-color for background
                $bg_class = str_replace( '-color', '-background-color', $parsed_bg_color );
                $wp_classes[] = $bg_class;
            } else {
                $css_variables .= 'background-color: ' . esc_attr( $parsed_bg_color ) . ';';
            }
        }

        // Process WordPress core style attribute (spacing, etc.)
        if ( ! empty( $attributes['style'] ) ) {
            $style = $attributes['style'];

            // Process background color from style.color.background
            if ( ! empty( $style['color']['background'] ) ) {
                $parsed_bg_color = wedocs_parse_wp_preset_value( $style['color']['background'] );
                // Check if it's a WordPress class (starts with 'has-')
                if ( strpos( $parsed_bg_color, 'has-' ) === 0 ) {
                    // Convert has-accent-2-color to has-accent-2-background-color for background
                    $bg_class = str_replace( '-color', '-background-color', $parsed_bg_color );
                    $wp_classes[] = $bg_class;
                } else {
                    $css_variables .= 'background-color: ' . esc_attr( $parsed_bg_color ) . ';';
                }
            }

            // Process spacing
            if ( ! empty( $style['spacing']['padding'] ) ) {
                $padding = $style['spacing']['padding'];

                if ( ! empty( $padding['top'] ) ) {
                    $parsed_padding_top = wedocs_parse_wp_preset_value( $padding['top'] );
                    $css_variables .= 'padding-top: ' . esc_attr( $parsed_padding_top ) . ';';
                }
                if ( ! empty( $padding['bottom'] ) ) {
                    $parsed_padding_bottom = wedocs_parse_wp_preset_value( $padding['bottom'] );
                    $css_variables .= 'padding-bottom: ' . esc_attr( $parsed_padding_bottom ) . ';';
                }
                if ( ! empty( $padding['left'] ) ) {
                    $parsed_padding_left = wedocs_parse_wp_preset_value( $padding['left'] );
                    $css_variables .= 'padding-left: ' . esc_attr( $parsed_padding_left ) . ';';
                }
                if ( ! empty( $padding['right'] ) ) {
                    $parsed_padding_right = wedocs_parse_wp_preset_value( $padding['right'] );
                    $css_variables .= 'padding-right: ' . esc_attr( $parsed_padding_right ) . ';';
                }
            }
        }
        // Combine WordPress classes with existing className
        $all_classes = array_merge( [ 'wedocs-sidebar-block', 'wedocs-document' ], $wp_classes );
        if ( ! empty( $className ) ) {
            $all_classes[] = $className;
        }
        $class_string = implode( ' ', array_unique( $all_classes ) );

        // Start output buffering
        ob_start();
        ?>
        <div class="<?php echo esc_attr( $class_string ); ?>"
             style="<?php echo esc_attr( $css_variables ); ?>">
            <?php if ( $children ): ?>
                <div class="wedocs-sections">
                    <?php echo $children; ?>
                </div>
            <?php else: ?>
                <p class="wedocs-no-content text-gray-500 italic text-center py-4">
                    <?php _e( 'No documentation sections found.', 'wedocs' ); ?>
                </p>
            <?php endif; ?>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Sort docs array based on orderby and order parameters
     */
    function wedocs_sort_docs( $docs, $orderby, $order ) {
        if ( empty( $docs ) ) {
            return $docs;
        }
        usort(
            $docs, function( $a, $b ) use ( $orderby, $order ) {
            switch ( $orderby ) {
                case 'name':
                    $result = strcmp( $a->post_title, $b->post_title );
                    break;
                case 'slug':
                    $result = strcmp( $a->post_name, $b->post_name );
                    break;
                case 'id':
                    $result = $a->ID - $b->ID;
                    break;
                default:
                    $result = $a->menu_order - $b->menu_order;
            }

            return $order === 'desc' ? - $result : $result;
        }
        );

        return $docs;
    }

    /**
     * Render a section with its articles matching React component structure
     */
    function wedocs_render_section_with_articles( $section, $articles_by_section, $enable_nested_articles, $section_title_tag, $article_title_tag, $section_styles, $title_styles, $doc_list_styles, $tree_styles, $count_badge_styles, $level = 0 ) {
        $output = '';

        // Build section-specific CSS variables
        $section_css_variables = '';
        $section_wp_classes = [];

        // Section styles
        if ( ! empty( $section_styles['backgroundColor'] ) ) {
            $parsed_section_bg = wedocs_parse_wp_preset_value( $section_styles['backgroundColor'] );
            list( $section_wp_classes, $section_css_variables ) = wedocs_process_wp_background_color_class( $parsed_section_bg, $section_wp_classes, $section_css_variables, 'section-bg' );
        }
        if ( ! empty( $section_styles['backgroundColorHover'] ) ) {
            $parsed_section_bg_hover = wedocs_parse_wp_preset_value( $section_styles['backgroundColorHover'] );
            list( $section_wp_classes, $section_css_variables ) = wedocs_process_wp_background_color_class( $parsed_section_bg_hover, $section_wp_classes, $section_css_variables, 'section-bg-hover' );
        }
        if ( ! empty( $section_styles['padding'] ) ) {
            $parsed_section_padding = wedocs_parse_wp_preset_value( $section_styles['padding'] );
            $section_css_variables .= '--section-padding: ' . esc_attr( $parsed_section_padding ) . ';';
        }
        if ( ! empty( $section_styles['margin'] ) ) {
            $parsed_section_margin = wedocs_parse_wp_preset_value( $section_styles['margin'] );
            $section_css_variables .= '--section-margin: ' . esc_attr( $parsed_section_margin ) . ';';
        }
        if ( ! empty( $section_styles['borderRadius'] ) ) {
            $parsed_section_border_radius = wedocs_parse_wp_preset_value( $section_styles['borderRadius'] );
            $section_css_variables .= '--section-border-radius: ' . esc_attr( $parsed_section_border_radius ) . ';';
        }

        // Tree styles
        if ( ! empty( $tree_styles['indentation'] ) ) {
            $parsed_tree_indentation = wedocs_parse_wp_preset_value( $tree_styles['indentation'] );
            $section_css_variables .= '--tree-indentation: ' . esc_attr( $parsed_tree_indentation ) . ';';
        }
        if ( ! empty( $tree_styles['connectorColor'] ) ) {
            $parsed_tree_connector_color = wedocs_parse_wp_preset_value( $tree_styles['connectorColor'] );
            list( $section_wp_classes, $section_css_variables ) = wedocs_process_wp_color_class( $parsed_tree_connector_color, $section_wp_classes, $section_css_variables, 'tree-connector-color' );
        }
        if ( ! empty( $tree_styles['connectorWidth'] ) ) {
            $parsed_tree_connector_width = wedocs_parse_wp_preset_value( $tree_styles['connectorWidth'] );
            $section_css_variables .= '--tree-connector-width: ' . esc_attr( $parsed_tree_connector_width ) . ';';
        }
        if ( ! empty( $tree_styles['itemSpacing'] ) ) {
            $parsed_tree_item_spacing = wedocs_parse_wp_preset_value( $tree_styles['itemSpacing'] );
            $section_css_variables .= '--tree-item-spacing: ' . esc_attr( $parsed_tree_item_spacing ) . ';';
        }
        if ( ! empty( $tree_styles['headerBackgroundColor'] ) ) {
            $parsed_tree_header_bg = wedocs_parse_wp_preset_value( $tree_styles['headerBackgroundColor'] );
            list( $section_wp_classes, $section_css_variables ) = wedocs_process_wp_background_color_class( $parsed_tree_header_bg, $section_wp_classes, $section_css_variables, 'tree-header-bg' );
        }
        if ( ! empty( $tree_styles['headerTextColor'] ) ) {
            $parsed_tree_header_text = wedocs_parse_wp_preset_value( $tree_styles['headerTextColor'] );
            list( $section_wp_classes, $section_css_variables ) = wedocs_process_wp_color_class( $parsed_tree_header_text, $section_wp_classes, $section_css_variables, 'tree-header-text' );
        }
        if ( ! empty( $tree_styles['headerPadding'] ) ) {
            $parsed_tree_header_padding = wedocs_parse_wp_preset_value( $tree_styles['headerPadding'] );
            $section_css_variables .= '--tree-header-padding: ' . esc_attr( $parsed_tree_header_padding ) . ';';
        }
        if ( ! empty( $tree_styles['headerBorderRadius'] ) ) {
            $parsed_tree_header_border_radius = wedocs_parse_wp_preset_value( $tree_styles['headerBorderRadius'] );
            $section_css_variables .= '--tree-header-border-radius: ' . esc_attr( $parsed_tree_header_border_radius ) . ';';
        }

        // Tree-specific styles - hardcoded for reliability
        $indentation = $level * intval( str_replace( 'px', '', $tree_styles['indentation'] ?? '20' ) );
        $section_style = '';
        if ( $level > 0 ) {
            $section_style .= 'margin-left: ' . $indentation . 'px;';
        }
        $section_style .= 'margin-bottom: ' . ( $tree_styles['itemSpacing'] ?? '4px' ) . ';';
        $section_style .= 'position: relative;';
        $header_style = '';
        if ( $level === 0 ) {
            if ( ! empty( $tree_styles['headerBackgroundColor'] ) ) {
                $header_style .= 'background-color: ' . esc_attr( $tree_styles['headerBackgroundColor'] ) . ';';
            }
            if ( ! empty( $tree_styles['headerTextColor'] ) ) {
                $header_style .= 'color: ' . esc_attr( $tree_styles['headerTextColor'] ) . ';';
            }
            if ( ! empty( $tree_styles['headerPadding'] ) ) {
                $header_style .= 'padding: ' . esc_attr( $tree_styles['headerPadding'] ) . ';';
            }
            if ( ! empty( $tree_styles['headerBorderRadius'] ) ) {
                $header_style .= 'border-radius: ' . esc_attr( $tree_styles['headerBorderRadius'] ) . ';';
            }
        } else {
            if ( ! empty( $tree_styles['connectorColor'] ) ) {
                $header_style .= 'border: 1px solid ' . esc_attr( $tree_styles['connectorColor'] ) . ';';
                $header_style .= 'border-left: 2px solid ' . esc_attr( $tree_styles['connectorColor'] ) . ';';
            }
        }
        // Build title-specific CSS variables
        $title_css_variables = '';
        $title_wp_classes = [];

        // Title styles
        if ( ! empty( $title_styles['backgroundColor'] ) ) {
            $parsed_title_bg = wedocs_parse_wp_preset_value( $title_styles['backgroundColor'] );
            list( $title_wp_classes, $title_css_variables ) = wedocs_process_wp_background_color_class( $parsed_title_bg, $title_wp_classes, $title_css_variables, 'title-bg' );
        }
        if ( ! empty( $title_styles['backgroundColorHover'] ) ) {
            $parsed_title_bg_hover = wedocs_parse_wp_preset_value( $title_styles['backgroundColorHover'] );
            list( $title_wp_classes, $title_css_variables ) = wedocs_process_wp_background_color_class( $parsed_title_bg_hover, $title_wp_classes, $title_css_variables, 'title-bg-hover' );
        }
        if ( ! empty( $title_styles['color'] ) ) {
            $parsed_title_color = wedocs_parse_wp_preset_value( $title_styles['color'] );
            list( $title_wp_classes, $title_css_variables ) = wedocs_process_wp_color_class( $parsed_title_color, $title_wp_classes, $title_css_variables, 'title-color' );
        }
        if ( ! empty( $title_styles['padding'] ) ) {
            $parsed_title_padding = wedocs_parse_wp_preset_value( $title_styles['padding'] );
            $title_css_variables .= '--title-padding: ' . esc_attr( $parsed_title_padding ) . ';';
        }

        // Title styling is now handled by CSS
        $title_style = '';
        $icon_style = '';
        $icon_color = wedocs_get_color_value( $title_styles['color'] ?? '', '#6c757d' );
        $icon_style .= 'color: ' . esc_attr( $icon_color ) . ';';
        $icon_style .= 'font-size: ' . ( $level === 0 ? '16px' : '14px' ) . ';';
        $icon_style .= 'margin-right: 8px;';
        // Get articles for this section
        $articles       = isset( $articles_by_section[ $section->ID ] ) ? $articles_by_section[ $section->ID ] : [];
        $children_count = count( $articles );
        // Section icon SVG
        $section_icon = $level === 0 ?
            '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 20px; height: 20px;"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" /></svg>' :
            '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 16px; height: 16px;"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" /></svg>';
        // Expand/collapse button (only for top-level sections)
        $expand_button = '';
        if ( $level === 0 && $children_count > 0 ) {
            $expand_button = '<button class="wedocs-expand-toggle transition-colors" style="color: ' . esc_attr(
                    $icon_color
                ) . '; background: none; border: none; cursor: pointer; padding: 2px; border-radius: 2px; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;" aria-expanded="true" aria-label="Toggle ' . esc_attr(
                                 $section->post_title
                             ) . ' section">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 16px; height: 16px;">
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
            </svg>
        </button>';
        }
        // Visual connector line for nested items
        $connector_line = wedocs_generate_connector_line( $tree_styles, $level );
        // Combine section classes
        $section_classes = array_merge( [ 'wedocs-section', 'transition-colors', 'duration-200' ], $section_wp_classes );
        $section_class_string = implode( ' ', array_unique( $section_classes ) );

        $output .= '<div class="' . esc_attr( $section_class_string ) . '" style="' . esc_attr(
                $section_style . $section_css_variables
            ) . '">';
        $output .= $connector_line;
        $output .= '<div class="wedocs-section-header flex items-center justify-between cursor-pointer transition-colors" style="' . esc_attr(
                $header_style
            ) . '" role="button" tabindex="0" aria-expanded="true" aria-label="Toggle ' . esc_attr(
                       $section->post_title
                   ) . ' section">';
        $output .= '<div class="flex items-center space-x-2">';
        $output .= '<span class="wedocs-section-icon" style="' . esc_attr(
                $icon_style
            ) . '" aria-hidden="true">' . $section_icon . '</span>';
        // Combine title classes
        $title_classes = array_merge( [ 'wedocs-section-title' ], $title_wp_classes );
        $title_class_string = implode( ' ', array_unique( $title_classes ) );

        $output .= '<' . esc_attr( $section_title_tag ) . ' class="' . esc_attr( $title_class_string ) . '" style="' . esc_attr(
                $title_style . $title_css_variables
            ) . '">' . esc_html( $section->post_title ) . '</' . esc_attr( $section_title_tag ) . '>';
        $output .= '</div>';
        $output .= $expand_button;
        $output .= '</div>';
        // Add articles for this section
        if ( $children_count > 0 ) {
            $children_style = '';
            if ( $level > 0 ) {
                $children_style .= 'margin-left: ' . intval(
                        str_replace( 'px', '', $tree_styles['indentation'] ?? '20' )
                    ) . 'px;';
                if ( ! empty( $tree_styles['connectorColor'] ) ) {
                    $children_style .= 'border-left: ' . ( $tree_styles['connectorWidth'] ?? '1px' ) . ' solid ' . esc_attr(
                            $tree_styles['connectorColor']
                        ) . ';';
                }
                $children_style .= 'padding-left: 8px;';
            } else {
                $children_style .= 'margin-left: 0;';
            }
            $output .= '<div class="wedocs-section-children" style="' . esc_attr( $children_style ) . '">';
            foreach ( $articles as $article ) {
                $output .= wedocs_render_article(
                    $article, $articles_by_section, $enable_nested_articles, $article_title_tag, $doc_list_styles,
                    $tree_styles, $level + 1
                );
            }
            $output .= '</div>';
        }
        $output .= '</div>';

        return $output;
    }

    /**
     * Render an article matching React component structure
     */
    function wedocs_render_article( $article, $articles_by_section, $enable_nested_articles, $article_title_tag, $doc_list_styles, $tree_styles, $level = 0 ) {
        $output = '';

        // Build article-specific CSS variables
        $article_css_variables = '';
        $article_wp_classes = [];

        // Doc list styles
        if ( ! empty( $doc_list_styles['textColor'] ) ) {
            $parsed_doc_list_text_color = wedocs_parse_wp_preset_value( $doc_list_styles['textColor'] );
            list( $article_wp_classes, $article_css_variables ) = wedocs_process_wp_color_class( $parsed_doc_list_text_color, $article_wp_classes, $article_css_variables, 'doc-list-text-color' );
        }
        if ( ! empty( $doc_list_styles['textColorHover'] ) ) {
            $parsed_doc_list_text_color_hover = wedocs_parse_wp_preset_value( $doc_list_styles['textColorHover'] );
            list( $article_wp_classes, $article_css_variables ) = wedocs_process_wp_color_class( $parsed_doc_list_text_color_hover, $article_wp_classes, $article_css_variables, 'doc-list-text-color-hover' );
        }
        if ( ! empty( $doc_list_styles['backgroundColor'] ) ) {
            $parsed_doc_list_bg = wedocs_parse_wp_preset_value( $doc_list_styles['backgroundColor'] );
            list( $article_wp_classes, $article_css_variables ) = wedocs_process_wp_background_color_class( $parsed_doc_list_bg, $article_wp_classes, $article_css_variables, 'doc-list-bg' );
        }
        if ( ! empty( $doc_list_styles['backgroundColorHover'] ) ) {
            $parsed_doc_list_bg_hover = wedocs_parse_wp_preset_value( $doc_list_styles['backgroundColorHover'] );
            list( $article_wp_classes, $article_css_variables ) = wedocs_process_wp_background_color_class( $parsed_doc_list_bg_hover, $article_wp_classes, $article_css_variables, 'doc-list-bg-hover' );
        }

        // Tree-specific styles - hardcoded for reliability
        $indentation = 20;
        $article_style = '';
        if ( $level > 0 ) {
            $article_style .= 'margin-left: ' . $indentation . 'px;';
        }
        $article_style .= 'margin-bottom: ' . ( $tree_styles['itemSpacing'] ?? '4px' ) . ';';
        $article_style .= 'position: relative;';
        $icon_style = '';
        $icon_color = wedocs_get_color_value( $doc_list_styles['textColor'] ?? '', '#6c757d' );
        $icon_style .= 'color: ' . esc_attr( $icon_color ) . ';';
        $icon_style .= 'font-size: 14px;';
        $icon_style .= 'margin-right: 8px;';
        // Text styling is now handled by CSS
        $text_style = '';
        // Get child articles
        $children     = isset( $articles_by_section[ $article->ID ] ) ? $articles_by_section[ $article->ID ] : [];
        $has_children = count( $children ) > 0;
        // Visual connector line for nested items
        $connector_line = wedocs_generate_connector_line( $tree_styles, $level );
        // Combine article classes
        $article_classes = array_merge( [ 'wedocs-article', 'transition-colors', 'duration-200' ], $article_wp_classes );
        $article_class_string = implode( ' ', array_unique( $article_classes ) );

        $output .= '<div class="' . esc_attr( $article_class_string ) . '" style="' . esc_attr( $article_css_variables ) . '">';
        $output .= $connector_line;
        $output .= '<div class="flex items-center space-x-2" style="' . esc_attr( $article_style ) . '">';
        $output .= '<span class="wedocs-article-icon" style="' . esc_attr(
                $icon_style
            ) . '" aria-hidden="true">📄</span>';
        $output .= '<' . esc_attr( $article_title_tag ) . ' class="wedocs-article-title ' . esc_attr(
                $article_title_tag
            ) . ' m-0 flex-1" style="' . esc_attr( $text_style ) . '">';
        $output .= '<a href="' . esc_url(
                get_permalink( $article->ID )
            ) . '" class="hover:underline transition-colors duration-200" style="color: ' . esc_attr(
                       wedocs_get_color_value( $doc_list_styles['textColor'] ?? '' )
                   ) . '; text-decoration: none;">' . esc_html( $article->post_title ) . '</a>';
        $output .= '</' . esc_attr( $article_title_tag ) . '>';
        $output .= '</div>';
        // Add child articles if nested articles are enabled
        if ( $has_children && $enable_nested_articles ) {
            $children_style = '';
            if ( $level > 0 ) {
                $children_style .= 'margin-left: ' . intval(
                        str_replace( 'px', '', $tree_styles['indentation'] ?? '20' )
                    ) . 'px;';
                if ( ! empty( $tree_styles['connectorColor'] ) ) {
                    $children_style .= 'border-left: ' . ( $tree_styles['connectorWidth'] ?? '1px' ) . ' solid ' . esc_attr(
                            $tree_styles['connectorColor']
                        ) . ';';
                }
                $children_style .= 'padding-left: 8px;';
            } else {
                $children_style .= 'margin-left: 0;';
            }
            $output .= '<div class="wedocs-article-children" style="' . esc_attr( $children_style ) . '">';
            foreach ( $children as $child_article ) {
                $output .= wedocs_render_article(
                    $child_article, $articles_by_section, $enable_nested_articles, $article_title_tag, $doc_list_styles,
                    $tree_styles, $level + 1
                );
            }
            $output .= '</div>';
        }
        // When nested articles are disabled, show all child articles at the same level
        if ( $has_children && ! $enable_nested_articles ) {
            foreach ( $children as $child_article ) {
                $output .= wedocs_render_article(
                    $child_article, $articles_by_section, $enable_nested_articles, $article_title_tag, $doc_list_styles,
                    $tree_styles, $level
                );
            }
        }
        $output .= '</div>';

        return $output;
    }
}
