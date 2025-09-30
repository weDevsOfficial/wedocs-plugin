<?php
/**
 * Render callback for the Contributors block
 *
 * @param array    $attributes Block attributes
 * @param string   $content    Block content
 * @param WP_Block $block      Block instance
 * @return string
 */
function render_wedocs_advance_contributors_block($attributes, $content, $block) {
    // Get the current post
    $post = get_post();

    // Extract basic attributes with defaults
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
    $avatar_shape = $attributes['avatarShape'] ?? 'circle';
    $avatar_hover_effect = $attributes['avatarHoverEffect'] ?? false;
    $additional_css_class = $attributes['additionalCssClass'] ?? '';
    $enable_schema = $attributes['enableSchema'] ?? false;
    $link_behavior = $attributes['linkBehavior'] ?? 'user_profile';
    $custom_link_url = $attributes['customLinkUrl'] ?? '';
    $contributor_gap = $attributes['contributorGap'] ?? '10px';

    // Extract responsive control attributes
    $typography_controls = $attributes['typographyControls'] ?? [];
    $colors_controls = $attributes['colorsControls'] ?? [];
    $dimensions_controls = $attributes['dimensionsControls'] ?? [];
    $alignment_controls = $attributes['alignmentControls'] ?? [];
    $background_image_controls = $attributes['backgroundImageControls'] ?? [];
    $border_shadow_controls = $attributes['borderAndShadowControls'] ?? [];
    $display_controls = $attributes['displayControls'] ?? [];

    // Generate unique block ID
    $block_id = 'wedocs-contributors-' . wp_generate_uuid4();

    // Get contributors based on display mode
    $contributors = [];

    switch ($contributor_display_mode) {
        case 'main_author':
            $author_id = get_post_field('post_author', $post->ID);
            if ($author_id) {
                $author_user = get_userdata($author_id);
                if ($author_user) {
                    $contributors[] = $author_user;
                }
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
            // Get post author
            $author_id = get_post_field('post_author', $post->ID);
            if ($author_id && ($author_user = get_userdata($author_id))) {
                $contributors[] = $author_user;
            }

            // Get additional contributors from revisions
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

    // Helper function to generate responsive CSS
    function generate_responsive_css($block_id, $controls, $device_suffix = '') {
        $css = '';

        if (empty($controls)) {
            return $css;
        }

        $selector = '.' . $block_id . $device_suffix;
        $rules = [];

        // Typography
        if (isset($controls['fontFamily']) && $controls['fontFamily']) {
            $rules[] = 'font-family: ' . esc_attr($controls['fontFamily']);
        }
        if (isset($controls['fontSize']) && $controls['fontSize']) {
            $rules[] = 'font-size: ' . esc_attr($controls['fontSize']);
        }
        if (isset($controls['fontAppearance']['fontWeight']) && $controls['fontAppearance']['fontWeight']) {
            $rules[] = 'font-weight: ' . esc_attr($controls['fontAppearance']['fontWeight']);
        }
        if (isset($controls['fontAppearance']['fontStyle']) && $controls['fontAppearance']['fontStyle']) {
            $rules[] = 'font-style: ' . esc_attr($controls['fontAppearance']['fontStyle']);
        }
        if (isset($controls['lineHeight']) && $controls['lineHeight']) {
            $rules[] = 'line-height: ' . esc_attr($controls['lineHeight']);
        }
        if (isset($controls['letterSpacing']) && $controls['letterSpacing']) {
            $rules[] = 'letter-spacing: ' . esc_attr($controls['letterSpacing']);
        }
        if (isset($controls['textDecoration']) && $controls['textDecoration']) {
            $rules[] = 'text-decoration: ' . esc_attr($controls['textDecoration']);
        }
        if (isset($controls['textTransform']) && $controls['textTransform']) {
            $rules[] = 'text-transform: ' . esc_attr($controls['textTransform']);
        }

        // Colors
        if (isset($controls['textColor']) && $controls['textColor']) {
            $rules[] = 'color: ' . esc_attr($controls['textColor']);
        }
        if (isset($controls['backgroundColor']) && $controls['backgroundColor']) {
            $rules[] = 'background-color: ' . esc_attr($controls['backgroundColor']);
        }

        // Dimensions
        if (isset($controls['width']) && $controls['width']) {
            $rules[] = 'width: ' . esc_attr($controls['width']);
        }
        if (isset($controls['minWidth']) && $controls['minWidth']) {
            $rules[] = 'min-width: ' . esc_attr($controls['minWidth']);
        }
        if (isset($controls['maxWidth']) && $controls['maxWidth']) {
            $rules[] = 'max-width: ' . esc_attr($controls['maxWidth']);
        }
        if (isset($controls['height']) && $controls['height']) {
            $rules[] = 'height: ' . esc_attr($controls['height']);
        }
        if (isset($controls['minHeight']) && $controls['minHeight']) {
            $rules[] = 'min-height: ' . esc_attr($controls['minHeight']);
        }
        if (isset($controls['maxHeight']) && $controls['maxHeight']) {
            $rules[] = 'max-height: ' . esc_attr($controls['maxHeight']);
        }

        // Padding
        if (isset($controls['padding']) && is_array($controls['padding'])) {
            $padding_values = [];
            $padding_values[] = $controls['padding']['top'] ?? '0';
            $padding_values[] = $controls['padding']['right'] ?? '0';
            $padding_values[] = $controls['padding']['bottom'] ?? '0';
            $padding_values[] = $controls['padding']['left'] ?? '0';
            $rules[] = 'padding: ' . implode(' ', $padding_values);
        }

        // Margin
        if (isset($controls['margin']) && is_array($controls['margin'])) {
            $margin_values = [];
            $margin_values[] = $controls['margin']['top'] ?? '0';
            $margin_values[] = $controls['margin']['right'] ?? '0';
            $margin_values[] = $controls['margin']['bottom'] ?? '0';
            $margin_values[] = $controls['margin']['left'] ?? '0';
            $rules[] = 'margin: ' . implode(' ', $margin_values);
        }

        // Alignment
        if (isset($controls['textAlign']) && $controls['textAlign']) {
            $rules[] = 'text-align: ' . esc_attr($controls['textAlign']);
        }
        if (isset($controls['alignItems']) && $controls['alignItems']) {
            $rules[] = 'align-items: ' . esc_attr($controls['alignItems']);
        }
        if (isset($controls['justifyContent']) && $controls['justifyContent']) {
            $rules[] = 'justify-content: ' . esc_attr($controls['justifyContent']);
        }
        if (isset($controls['direction']) && $controls['direction']) {
            $rules[] = 'flex-direction: ' . esc_attr($controls['direction']);
        }

        // Border
        if (isset($controls['border']) && is_array($controls['border'])) {
            $border = $controls['border'];
            if (isset($border['width']) && isset($border['style']) && isset($border['color'])) {
                $rules[] = 'border: ' . esc_attr($border['width']) . ' ' . esc_attr($border['style']) . ' ' . esc_attr($border['color']);
            }
        }

        // Border Radius
        if (isset($controls['borderRadius']) && is_array($controls['borderRadius'])) {
            $radius = $controls['borderRadius'];
            $radius_values = [];
            $radius_values[] = $radius['topLeft'] ?? '0';
            $radius_values[] = $radius['topRight'] ?? '0';
            $radius_values[] = $radius['bottomRight'] ?? '0';
            $radius_values[] = $radius['bottomLeft'] ?? '0';
            $rules[] = 'border-radius: ' . implode(' ', $radius_values);
        }

        // Box Shadow
        if (isset($controls['boxShadow']) && is_array($controls['boxShadow']) && isset($controls['boxShadow']['x'])) {
            $shadow = $controls['boxShadow'];
            $shadow_value = '';
            if (isset($shadow['inset']) && $shadow['inset']) {
                $shadow_value .= 'inset ';
            }
            $shadow_value .= esc_attr($shadow['x']) . ' ';
            $shadow_value .= esc_attr($shadow['y']) . ' ';
            $shadow_value .= esc_attr($shadow['blur']) . ' ';
            $shadow_value .= esc_attr($shadow['spread']) . ' ';
            $shadow_value .= esc_attr($shadow['color']);
            $rules[] = 'box-shadow: ' . $shadow_value;
        }

        // Background Image
        if (isset($controls['bgUrl']) && $controls['bgUrl']) {
            $rules[] = 'background-image: url(' . esc_url($controls['bgUrl']) . ')';

            if (isset($controls['bgSize']) && $controls['bgSize']) {
                $rules[] = 'background-size: ' . esc_attr($controls['bgSize']);
            }

            if (isset($controls['bgFocalPoint']) && is_array($controls['bgFocalPoint'])) {
                $focal = $controls['bgFocalPoint'];
                $rules[] = 'background-position: ' . ($focal['x'] * 100) . '% ' . ($focal['y'] * 100) . '%';
            }

            if (isset($controls['bgRepeat'])) {
                $rules[] = 'background-repeat: ' . ($controls['bgRepeat'] ? 'repeat' : 'no-repeat');
            }

            if (isset($controls['bgFixed']) && $controls['bgFixed']) {
                $rules[] = 'background-attachment: fixed';
            }
        }

        // Display
        if (isset($controls['display']) && $controls['display']) {
            $rules[] = 'display: ' . esc_attr($controls['display']);
        }
        if (isset($controls['visibility']) && $controls['visibility']) {
            $rules[] = 'visibility: ' . esc_attr($controls['visibility']);
        }
        if (isset($controls['overflow']) && $controls['overflow']) {
            $rules[] = 'overflow: ' . esc_attr($controls['overflow']);
        }
        if (isset($controls['zIndex']) && $controls['zIndex']) {
            $rules[] = 'z-index: ' . esc_attr($controls['zIndex']);
        }

        if (!empty($rules)) {
            $css .= $selector . ' { ' . implode('; ', $rules) . '; }';
        }

        return $css;
    }

    // Generate CSS for all devices
    $responsive_css = '';

    // Merge all device controls for CSS generation
    foreach (['desktop', 'tablet', 'mobile'] as $device) {
        $device_controls = [];

        // Merge all control types for this device
        if (isset($typography_controls[$device])) {
            $device_controls = array_merge($device_controls, $typography_controls[$device]);
        }
        if (isset($colors_controls[$device])) {
            $device_controls = array_merge($device_controls, $colors_controls[$device]);
        }
        if (isset($dimensions_controls[$device])) {
            $device_controls = array_merge($device_controls, $dimensions_controls[$device]);
        }
        if (isset($alignment_controls[$device])) {
            $device_controls = array_merge($device_controls, $alignment_controls[$device]);
        }
        if (isset($background_image_controls[$device])) {
            $device_controls = array_merge($device_controls, $background_image_controls[$device]);
        }
        if (isset($border_shadow_controls[$device])) {
            $device_controls = array_merge($device_controls, $border_shadow_controls[$device]);
        }
        if (isset($display_controls[$device])) {
            $device_controls = array_merge($device_controls, $display_controls[$device]);
        }

        // Generate CSS for this device
        if ($device === 'desktop') {
            $responsive_css .= generate_responsive_css($block_id, $device_controls);
        } else if ($device === 'tablet') {
            $responsive_css .= '@media (max-width: 1024px) { ' . generate_responsive_css($block_id, $device_controls) . ' }';
        } else if ($device === 'mobile') {
            $responsive_css .= '@media (max-width: 768px) { ' . generate_responsive_css($block_id, $device_controls) . ' }';
        }
    }

    // Build CSS classes
    $css_classes = ['wedocs-contributors', $block_id];
    if (!empty($additional_css_class)) {
        $css_classes[] = esc_attr($additional_css_class);
    }

    // Handle display controls for hiding on devices
    $display_classes = [];
    if (isset($display_controls['desktop']) && $display_controls['desktop']) {
        $display_classes[] = 'wedocs-hide-desktop';
    }
    if (isset($display_controls['tablet']) && $display_controls['tablet']) {
        $display_classes[] = 'wedocs-hide-tablet';
    }
    if (isset($display_controls['mobile']) && $display_controls['mobile']) {
        $display_classes[] = 'wedocs-hide-mobile';
    }
    $css_classes = array_merge($css_classes, $display_classes);

    // Start building output
    $output = '<div class="' . implode(' ', $css_classes) . '" style="display: flex; flex-wrap: wrap; gap: ' . esc_attr($contributor_gap) . ';">';

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
        $output .= '<div class="contributors-title-wrapper" style="width: 100%; margin-bottom: 10px;">';
        $output .= '<h3 class="contributors-title">' . esc_html($title) . '</h3>';
        $output .= '</div>';
    }

    // Contributors container
    $output .= '<div class="contributors-container" style="display: flex; align-items: center; flex-wrap: wrap; gap: ' . esc_attr($contributor_gap) . '; width: 100%;">';

    foreach ($contributors as $contributor) {
        $output .= '<div class="contributor-item" style="display: flex; align-items: center;">';

        // Avatar
        if ($show_avatar) {
            $avatar_class = 'contributor-avatar';
            if ($avatar_hover_effect) {
                $avatar_class .= ' avatar-hover';
            }

            $avatar_styles = [
                'width: 32px',
                'height: 32px',
                'object-fit: cover',
                'margin-right: 8px'
            ];

            // Avatar shape
            switch ($avatar_shape) {
                case 'circle':
                    $avatar_styles[] = 'border-radius: 50%';
                    break;
                case 'rounded':
                    $avatar_styles[] = 'border-radius: 8px';
                    break;
                case 'square':
                    $avatar_styles[] = 'border-radius: 0';
                    break;
            }

            $output .= '<div class="' . $avatar_class . '">';

            if ($avatar_type === 'user_avatar') {
                $avatar_url = get_avatar_url($contributor->ID, ['size' => 96]);
                $output .= '<img src="' . esc_url($avatar_url) . '" alt="' . esc_attr($contributor->display_name) . '" style="' . implode('; ', $avatar_styles) . '">';
            } else {
                $icon_styles = array_merge($avatar_styles, [
                    'background-color: #0073aa',
                    'display: flex',
                    'align-items: center',
                    'justify-content: center',
                    'color: white'
                ]);

                $output .= '<div class="default-icon" style="' . implode('; ', $icon_styles) . '">';
                $output .= '<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">';
                $output .= '<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>';
                $output .= '</svg>';
                $output .= '</div>';
            }

            $output .= '</div>';
        }

        // Name
        $name_styles = [
            'font-size: 14px',
            'font-weight: 600',
            'text-decoration: none'
        ];

        if ($link_behavior === 'user_profile') {
            $output .= '<a href="' . esc_url(get_author_posts_url($contributor->ID)) . '" class="contributor-name" style="' . implode('; ', $name_styles) . '">' . esc_html($contributor->display_name) . '</a>';
        } elseif ($link_behavior === 'custom_link' && !empty($custom_link_url)) {
            $output .= '<a href="' . esc_url($custom_link_url) . '" class="contributor-name" style="' . implode('; ', $name_styles) . '">' . esc_html($contributor->display_name) . '</a>';
        } else {
            $output .= '<span class="contributor-name no-link" style="' . implode('; ', $name_styles) . '">' . esc_html($contributor->display_name) . '</span>';
        }

        $output .= '</div>';
    }

    $output .= '</div>';

    // Last updated date
    if ($show_last_updated) {
        $date_format_string = $date_format === 'custom' ? $custom_date_format : get_option('date_format');
        $last_modified = $post ? get_the_modified_date($date_format_string, $post) : date($date_format_string);

        $output .= '<div class="last-updated" style="width: 100%; margin-top: 10px; font-size: 12px; color: #666666;">';
        $output .= esc_html($date_prefix) . ' ' . esc_html($last_modified);
        $output .= '</div>';
    }

    $output .= '</div>';

    // Add schema markup
    if ($enable_schema && !empty($schema_data)) {
        $output .= '<script type="application/ld+json">' . wp_json_encode($schema_data) . '</script>';
    }

    // Add responsive CSS
    if (!empty($responsive_css)) {
        $output .= '<style>' . $responsive_css;

        // Add hover effects
        $output .= '
        .' . $block_id . ' .contributor-name:hover {
            opacity: 0.8;
        }
        .' . $block_id . ' .contributor-avatar.avatar-hover:hover {
            transform: scale(1.05);
            transition: transform 0.3s ease;
        }

        /* Display control classes */
        @media (min-width: 1025px) {
            .wedocs-hide-desktop { display: none !important; }
        }
        @media (max-width: 1024px) and (min-width: 769px) {
            .wedocs-hide-tablet { display: none !important; }
        }
        @media (max-width: 768px) {
            .wedocs-hide-mobile { display: none !important; }
        }
        ';

        $output .= '</style>';
    }

    return $output;
}
render_wedocs_advance_contributors_block( $attributes, $content, $block );
