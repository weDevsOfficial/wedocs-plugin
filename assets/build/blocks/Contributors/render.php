<?php
/**
 * Render callback for the Contributors block
 *
 * @param array    $attributes Block attributes
 * @param string   $content    Block content
 * @param WP_Block $block      Block instance
 * @return string
 */

if ( !function_exists('render_wedocs_contributors_block')){
    function render_wedocs_contributors_block($attributes, $content, $block) {
        // Get the current post
        $post = get_post();
        // if (!$post || $post->post_type !== 'docs') {
        //     return '';
        // }

        // Extract attributes with defaults
        $show_title = $attributes['showTitle'] ?? true;
        $title = $attributes['title'] ?? 'Contributors';
        $contributor_display_mode = $attributes['contributorDisplayMode'] ?? 'all';
        $selected_contributors = $attributes['selectedContributors'] ?? [];
        $show_last_updated = $attributes['showLastUpdated'] ?? true;
        $date_format = $attributes['dateFormat'] ?? 'wp_default';
        $custom_date_format = $attributes['customDateFormat'] ?? 'F j, Y';
        $date_prefix = $attributes['datePrefix'] ?? 'Updated on';
        $show_avatar = $attributes['showAvatar'] ?? true;
        $avatar_type = $attributes['avatarType'] ?? 'user_avatar';
        $avatar_size = $attributes['avatarSize'] ?? '32px';
        $avatar_shape = $attributes['avatarShape'] ?? 'circle';
        $avatar_border_style = $attributes['avatarBorderStyle'] ?? 'none';
        $avatar_border_color = $attributes['avatarBorderColor'] ?? '#dddddd';
        $avatar_hover_effect = $attributes['avatarHoverEffect'] ?? false;
        $additional_css_class = $attributes['additionalCssClass'] ?? '';
        $enable_schema = $attributes['enableSchema'] ?? false;
        $link_behavior = $attributes['linkBehavior'] ?? 'user_profile';
        $custom_link_url = $attributes['customLinkUrl'] ?? '';

        // Typography attributes
        $contributor_color = $attributes['contributorTitleColor'] ?? '#333333';
        $contributor_typography = $attributes['contributorTitleTypography'] ?? [];
        $contributor_hover_color = $attributes['contributorTitleHoverColor'] ?? '#0073aa';
        $name_color = $attributes['nameColor'] ?? '#333333';
        $name_typography = $attributes['nameTypography'] ?? [];
        $name_hover_color = $attributes['nameHoverColor'] ?? '#0073aa';
        $date_color = $attributes['dateColor'] ?? '#666666';
        $date_typography = $attributes['dateTypography'] ?? [];

        // Spacing attributes
        $title_padding = $attributes['titlePadding'] ?? [];
        $title_margin = $attributes['titleMargin'] ?? [];
        $avatar_padding = $attributes['avatarPadding'] ?? [];
        $avatar_margin = $attributes['avatarMargin'] ?? [];
        $name_padding = $attributes['namePadding'] ?? [];
        $name_margin = $attributes['nameMargin'] ?? [];
        $date_padding = $attributes['datePadding'] ?? [];
        $date_margin = $attributes['dateMargin'] ?? [];
        $contributor_gap = $attributes['contributorGap'] ?? '10px';

        // Build container styles using helper functions
        $container_styles = [];

        // Background styles
        $background_args = [
            'type' => $attributes['backgroundType'] ?? 'classic',
            'color' => $attributes['backgroundColor'] ?? '',
            'gradient' => $attributes['backgroundGradient'] ?? '',
            'image' => $attributes['backgroundImage'] ?? []
        ];
        $container_styles = array_merge($container_styles, wedocs_build_background_styles(
            $background_args['type'],
            $background_args['color'],
            $background_args['gradient'],
            $background_args['image']
        ));

        // Container spacing
        $container_styles = array_merge($container_styles, wedocs_build_spacing_styles(
            $attributes['padding'] ?? [],
            $attributes['margin'] ?? []
        ));

        // Container border
        $container_styles = array_merge($container_styles, wedocs_build_border_styles(
            $attributes['borderStyle'] ?? 'none',
            $attributes['borderWidth'] ?? [],
            $attributes['borderColor'] ?? '',
            $attributes['borderRadius'] ?? ''
        ));

        // Container shadow
        $container_styles = array_merge($container_styles, wedocs_build_shadow_styles(
            $attributes['boxShadow'] ?? []
        ));

        // Get contributors based on display mode
        $contributors = [];

        switch ($contributor_display_mode) {
            case 'main_author':
                $author_id = get_post_field('wedocs_contributors', $post->ID);
                if ($author_id) {
                    $contributors[] = get_userdata($author_id);
                }

                break;

            case 'manual':
                if (!empty($selected_contributors)) {
                    foreach ($selected_contributors as $user_id) {
                        $user = get_userdata($user_id);
                        if ($user) {
                            $contributors[] = $user;
                        }
                    }
                }
                break;

            case 'all':
            default:
                // Get all contributors who have edited the post
                $author_id = get_post_field('wedocs_contributors', $post->ID);
                $authors = array_values($author_id); // return auhtors id.
                foreach($authors as $author){
                    $contributors[]= get_userdata($author);
                }


                if ($author_id && ($author_user = get_userdata($author_id))) {
                    $contributors[] = $author_user;
                }

                // Get additional contributors from post meta or revisions
                if ($post) {
                    $revisions = wp_get_post_revisions($post->ID);
                    $contributor_ids = [$author_id];

                    foreach ($revisions as $revision) {
                        $revision_author = get_post_field('post_author', $revision->ID);
                        if (!in_array($revision_author, $contributor_ids)) {
                            $contributor_ids[] = $revision_author;
                            $user = get_userdata($revision_author);
                            if ($user) {
                                $contributors[] = $user;
                            }
                        }
                    }
                }
                break;
        }

        // Filter out invalid contributors
        $contributors = array_filter($contributors);

        if (empty($contributors)) {
            // For demo purposes, add mock contributors if none found
            $contributors = [
                (object) [
                    'ID' => 1,
                    'display_name' => 'Demo Author',
                    'user_email' => 'demo@example.com'
                ]
            ];
        }

        // Build avatar styles using helper functions
        $avatar_base_styles = [
            'width: ' . esc_attr($avatar_size),
            'height: ' . esc_attr($avatar_size),
            'object-fit: cover'
        ];

        // Avatar shape
        switch ($avatar_shape) {
            case 'circle':
                $avatar_base_styles[] = 'border-radius: 50%';
                break;
            case 'rounded':
                $avatar_base_styles[] = 'border-radius: ' . esc_attr($attributes['avatarBorderRadius'] ?? '8px');
                break;
            case 'square':
                $avatar_base_styles[] = 'border-radius: 0';
                break;
        }

        // Avatar border and spacing
        $avatar_styles = array_merge($avatar_base_styles, wedocs_build_border_styles(
            $avatar_border_style,
            $attributes['avatarBorderWidth'] ?? [],
            $avatar_border_color,
            '' // Border radius already handled above
        ));

        $avatar_styles = array_merge($avatar_styles, wedocs_build_spacing_styles(
            $avatar_padding,
            $avatar_margin
        ));

        $avatar_styles = array_merge($avatar_styles, wedocs_build_shadow_styles(
            $attributes['avatarBoxShadow'] ?? []
        ));

        // Build element styles using helper functions
        $title_styles = wedocs_build_element_styles([
            'color' => $contributor_color,
            'typography' => $contributor_typography,
            'spacing' => [
                'padding' => $title_padding,
                'margin' => $title_margin
            ]
        ]);

        $name_styles = wedocs_build_element_styles([
            'color' => $name_color,
            'typography' => $name_typography,
            'spacing' => [
                'padding' => $name_padding,
                'margin' => $name_margin
            ]
        ]);

        $date_styles = wedocs_build_element_styles([
            'color' => $date_color,
            'typography' => $date_typography,
            'spacing' => [
                'padding' => $date_padding,
                'margin' => $date_margin
            ]
        ]);

        // Build CSS classes
        $css_classes = ['wedocs-contributors'];
        if (!empty($additional_css_class)) {
            $css_classes[] = esc_attr($additional_css_class);
        }

        // Generate unique block ID
        $block_id = wedocs_generate_block_id('wedocs-contributors');

        // Start building output
        $output = '<div class="' . implode(' ', $css_classes) . ' ' . $block_id . '"';
        if (!empty($container_styles)) {
            $output .= ' style="' . wedocs_styles_to_css($container_styles) . '"';
        }
        $output .= '>';

        // Schema markup
        $schema_data = [];
        if ($enable_schema) {
            $schema_data['@context'] = 'https://schema.org';
            $schema_data['@type'] = 'Article';
            $schema_data['author'] = [];
            foreach ($contributors as $contributor) {
                $schema_data['author'][] = [
                    '@type' => 'Person',
                    'name' => $contributor->display_name,
                    'url' => get_author_posts_url($contributor->ID)
                ];
            }
            if ($post) {
                $schema_data['dateModified'] = get_the_modified_date('c', $post);
            }
        }

        // Title
        if ($show_title) {
            $title_css = wedocs_styles_to_css($title_styles);
            $contributor_hover_style = '--contributor-hover-color: ' . esc_attr($contributor_hover_color);

            $output .= '<h3 class="contributors-title" style="' . $title_css . '; ' . $contributor_hover_style . '">' . esc_html($title) . '</h3>';
        }

        // Contributors container with gap
        $container_gap_style = 'gap: ' . esc_attr($contributor_gap);
        $output .= '<div class="contributors-container" style="display: flex; align-items: center; flex-wrap: wrap; ' . $container_gap_style . '">';

        foreach ($contributors as $contributor) {
            $output .= '<div class="contributor-item" style="display: flex; align-items: center;">';

            // Avatar
            if ($show_avatar) {
                $avatar_class = 'contributor-avatar';
                if ($avatar_hover_effect) {
                    $avatar_class .= ' avatar-hover';
                }

                $output .= '<div class="' . $avatar_class . '">';

                if ($avatar_type === 'user_avatar') {
                    $avatar_url = get_avatar_url($contributor->ID, ['size' => 96]);
                    $output .= '<img src="' . esc_url($avatar_url) . '" alt="' . esc_attr($contributor->display_name) . '" style="' . wedocs_styles_to_css($avatar_styles) . '">';
                } else {
                    $icon_styles = array_merge($avatar_styles, [
                        'background-color: #0073aa',
                        'display: flex',
                        'align-items: center',
                        'justify-content: center',
                        'color: white'
                    ]);

                    $output .= '<div class="default-icon" style="' . wedocs_styles_to_css($icon_styles) . '">';
                    $output .= '<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">';
                    $output .= '<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>';
                    $output .= '</svg>';
                    $output .= '</div>';
                }

                $output .= '</div>';
            }

            // Name
            $name_css = wedocs_styles_to_css($name_styles);
            $name_hover_style = '--name-hover-color: ' . esc_attr($name_hover_color);

            if ($link_behavior === 'user_profile') {
                $output .= '<a href="' . esc_url(get_author_posts_url($contributor->ID)) . '" class="contributor-name" style="' . $name_css . '; ' . $name_hover_style . '; text-decoration: none;">' . esc_html($contributor->display_name) . '</a>';
            } elseif ($link_behavior === 'custom_link' && !empty($custom_link_url)) {
                $output .= '<a href="' . esc_url($custom_link_url) . '" class="contributor-name" style="' . $name_css . '; ' . $name_hover_style . '; text-decoration: none;">' . esc_html($contributor->display_name) . '</a>';
            } else {
                $output .= '<span class="contributor-name no-link" style="' . $name_css . '">' . esc_html($contributor->display_name) . '</span>';
            }

            $output .= '</div>';
        }

        $output .= '</div>';

        // Last updated date
        if ($show_last_updated) {
            $date_format_string = $date_format === 'custom' ? $custom_date_format : get_option('date_format');
            $last_modified = $post ? get_the_modified_date($date_format_string, $post) : date($date_format_string);

            $output .= '<div class="last-updated" style="' . wedocs_styles_to_css($date_styles) . '">';
            $output .= esc_html($date_prefix) . ' ' . esc_html($last_modified);
            $output .= '</div>';
        }

        $output .= '</div>';

        // Add schema markup
        if ($enable_schema && !empty($schema_data)) {
            $output .= '<script type="application/ld+json">' . wp_json_encode($schema_data) . '</script>';
        }

        // Add CSS for hover effects and responsive design using helper
        $responsive_rules = [
            'desktop' => '',
            'tablet' => '
                .contributors-container {
                    flex-direction: column !important;
                    align-items: flex-start !important;
                    gap: 8px !important;
                }
                .contributor-item {
                    width: 100% !important;
                }
            ',
            'mobile' => '
                .contributors-container {
                    gap: 6px !important;
                }
                .contributor-avatar img,
                .contributor-avatar .default-icon {
                    width: 28px !important;
                    height: 28px !important;
                }
            ',
            'accessibility' => '
                .contributor-avatar.avatar-hover:hover {
                    transform: none !important;
                    transition: none !important;
                }
            '
        ];

        $responsive_css = wedocs_generate_responsive_css($block_id, $responsive_rules);

        $output .= '<style>
            .' . $block_id . ' .contributor-name:hover {
                color: var(--name-hover-color, ' . esc_attr($name_hover_color) . ') !important;
            }
            .' . $block_id . ' .contributors-title:hover {
                color: var(--contributor-hover-color, ' . esc_attr($contributor_hover_color) . ') !important;
            }
            .' . $block_id . ' .contributor-avatar.avatar-hover:hover {
                transform: scale(1.05);
                transition: transform 0.3s ease;
            }
            ' . $responsive_css . '
        </style>';

        return $output;
    }
    echo render_wedocs_contributors_block($attributes, $content, $block);
}

