<?php
/**
 * Server-side rendering for the Social Share block
 *
 * @package weDocs
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Check if this is a docs post type
if (get_post_type() !== 'docs') {
    return '';
}

// Start output buffering
ob_start();

// Extract attributes with defaults
$label_text = $attributes['labelText'] ?? 'Share This Article:';
$show_label = $attributes['showLabel'] ?? true;
$enabled_platforms = $attributes['enabledPlatforms'] ?? [
    'facebook' => true,
    'twitter' => true,
    'linkedin' => true,
    'pinterest' => true
];
$button_style = $attributes['buttonStyle'] ?? 'icon-only';
$button_size = $attributes['buttonSize'] ?? 'medium';
$button_shape = $attributes['buttonShape'] ?? 'rounded';
$layout = $attributes['layout'] ?? 'horizontal';
$alignment = $attributes['alignment'] ?? 'left';
$spacing = $attributes['spacing'] ?? 10;
$label_color = $attributes['labelColor'] ?? '#374151';
$label_font_size = $attributes['labelFontSize'] ?? 16;
$label_font_weight = $attributes['labelFontWeight'] ?? '500';
$button_bg_color = $attributes['buttonBgColor'] ?? '#6B7280';
$button_bg_hover_color = $attributes['buttonBgHoverColor'] ?? '#4B5563';
$button_icon_color = $attributes['buttonIconColor'] ?? '#FFFFFF';
$button_icon_hover_color = $attributes['buttonIconHoverColor'] ?? '#FFFFFF';
$use_individual_colors = $attributes['useIndividualColors'] ?? false;
$facebook_color = $attributes['facebookColor'] ?? '#1877F2';
$twitter_color = $attributes['twitterColor'] ?? '#000000';
$linkedin_color = $attributes['linkedinColor'] ?? '#0A66C2';
$pinterest_color = $attributes['pinterestColor'] ?? '#E60023';
$container_padding = $attributes['containerPadding'] ?? ['top' => '20px', 'right' => '0px', 'bottom' => '20px', 'left' => '0px'];
$container_margin = $attributes['containerMargin'] ?? ['top' => '20px', 'right' => '0px', 'bottom' => '20px', 'left' => '0px'];
$container_border_style = $attributes['containerBorderStyle'] ?? 'none';
$container_border_color = $attributes['containerBorderColor'] ?? '#E5E7EB';
$container_border_width = $attributes['containerBorderWidth'] ?? '1px';
$container_border_radius = $attributes['containerBorderRadius'] ?? '8px';
$container_bg_color = $attributes['containerBgColor'] ?? 'transparent';
$additional_css_class = $attributes['additionalCssClass'] ?? '';

// Get current post data
$post_id = get_the_ID();
$post_title = get_the_title($post_id);
$post_url = get_permalink($post_id);
$post_excerpt = get_the_excerpt($post_id);
$post_thumbnail = get_the_post_thumbnail_url($post_id);

// Social media URLs
$facebook_url = 'https://www.facebook.com/sharer/sharer.php?u=' . urlencode($post_url);
$twitter_url = 'https://twitter.com/intent/tweet?url=' . urlencode($post_url) . '&text=' . urlencode($post_title);
$linkedin_url = 'https://www.linkedin.com/sharing/share-offsite/?url=' . urlencode($post_url);
$pinterest_url = 'https://pinterest.com/pin/create/button/?url=' . urlencode($post_url) . '&media=' . urlencode($post_thumbnail) . '&description=' . urlencode($post_title);

// Helper function to get button color
if (!function_exists('wedocs_get_button_color')) {
    function wedocs_get_button_color($platform, $use_individual, $individual_color, $default_color) {
        return $use_individual ? $individual_color : $default_color;
    }
}


// Get size class
$size_class = 'wedocs-social-btn-' . $button_size;

// Get shape class
$shape_class = 'wedocs-social-btn-' . $button_shape;

// Get alignment class
$alignment_class = 'wedocs-social-align-' . $alignment;

// Container styles
$container_styles = [];
if ($container_bg_color !== 'transparent') {
    $container_styles[] = 'background-color: ' . esc_attr($container_bg_color);
}
$container_styles[] = 'padding: ' . esc_attr($container_padding['top']) . ' ' . esc_attr($container_padding['right']) . ' ' . esc_attr($container_padding['bottom']) . ' ' . esc_attr($container_padding['left']);
$container_styles[] = 'margin: ' . esc_attr($container_margin['top']) . ' ' . esc_attr($container_margin['right']) . ' ' . esc_attr($container_margin['bottom']) . ' ' . esc_attr($container_margin['left']);
if ($container_border_style !== 'none') {
    $container_styles[] = 'border: ' . esc_attr($container_border_width) . ' ' . esc_attr($container_border_style) . ' ' . esc_attr($container_border_color);
    $container_styles[] = 'border-radius: ' . esc_attr($container_border_radius);
}
$container_style_attr = implode('; ', $container_styles);

// Label styles
$label_styles = [];
$label_styles[] = 'color: ' . esc_attr($label_color);
$label_styles[] = 'font-size: ' . esc_attr($label_font_size) . 'px';
$label_styles[] = 'font-weight: ' . esc_attr($label_font_weight);
$label_style_attr = implode('; ', $label_styles);

// Button wrapper styles
$button_wrapper_styles = [];
$button_wrapper_styles[] = 'display: flex';
$button_wrapper_styles[] = 'flex-direction: ' . ($layout === 'vertical' ? 'column' : 'row');
$button_wrapper_styles[] = 'gap: ' . esc_attr($spacing) . 'px';
$button_wrapper_styles[] = 'flex-wrap: wrap';
$button_wrapper_style_attr = implode('; ', $button_wrapper_styles);

// Social icons SVG
$social_icons = [
    'facebook' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    'twitter' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    'linkedin' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    'pinterest' => '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/></svg>'
];

// Platform names
$platform_names = [
    'facebook' => __('Facebook', 'wedocs'),
    'twitter' => __('Twitter', 'wedocs'),
    'linkedin' => __('LinkedIn', 'wedocs'),
    'pinterest' => __('Pinterest', 'wedocs')
];

?>

<div
    class="wedocs-social-share-block <?php echo esc_attr($alignment_class); ?> <?php echo esc_attr($additional_css_class); ?>"
    style="<?php echo esc_attr($container_style_attr); ?>"
    data-button-bg="<?php echo esc_attr($button_bg_color); ?>"
    data-button-bg-hover="<?php echo esc_attr($button_bg_hover_color); ?>"
    data-button-icon="<?php echo esc_attr($button_icon_color); ?>"
    data-button-icon-hover="<?php echo esc_attr($button_icon_hover_color); ?>"
    data-use-individual="<?php echo $use_individual_colors ? 'true' : 'false'; ?>"
>
    <?php if ($show_label) : ?>
        <span class="wedocs-social-share-label" style="<?php echo esc_attr($label_style_attr); ?>">
            <?php echo esc_html($label_text); ?>
        </span>
    <?php endif; ?>

    <div
        class="wedocs-social-share-buttons <?php echo $layout === 'vertical' ? 'vertical' : 'horizontal'; ?>"
        style="<?php echo esc_attr($button_wrapper_style_attr); ?>"
    >
        <?php if (!empty($enabled_platforms['facebook'])) :
            $btn_color = wedocs_get_button_color('facebook', $use_individual_colors, $facebook_color, $button_bg_color);
        ?>
            <a href="<?php echo esc_url($facebook_url); ?>"
               target="_blank"
               rel="noopener noreferrer"
               class="wedocs-social-share-btn wedocs-social-share-facebook <?php echo esc_attr($size_class . ' ' . $shape_class); ?>"
               style="background-color: <?php echo esc_attr($btn_color); ?>; color: <?php echo esc_attr($button_icon_color); ?>;"
               title="<?php echo esc_attr(sprintf(__('Share on %s', 'wedocs'), $platform_names['facebook'])); ?>"
               data-platform="facebook"
               data-color="<?php echo esc_attr($btn_color); ?>">
                <?php if ($button_style !== 'text-only') : ?>
                    <?php echo $social_icons['facebook']; ?>
                <?php endif; ?>
                <?php if ($button_style === 'icon-text' || $button_style === 'text-only') : ?>
                    <span class="wedocs-social-btn-text"><?php echo esc_html($platform_names['facebook']); ?></span>
                <?php endif; ?>
            </a>
        <?php endif; ?>

        <?php if (!empty($enabled_platforms['twitter'])) :
            $btn_color = wedocs_get_button_color('twitter', $use_individual_colors, $twitter_color, $button_bg_color);
        ?>
            <a href="<?php echo esc_url($twitter_url); ?>"
               target="_blank"
               rel="noopener noreferrer"
               class="wedocs-social-share-btn wedocs-social-share-twitter <?php echo esc_attr($size_class . ' ' . $shape_class); ?>"
               style="background-color: <?php echo esc_attr($btn_color); ?>; color: <?php echo esc_attr($button_icon_color); ?>;"
               title="<?php echo esc_attr(sprintf(__('Share on %s', 'wedocs'), $platform_names['twitter'])); ?>"
               data-platform="twitter"
               data-color="<?php echo esc_attr($btn_color); ?>">
                <?php if ($button_style !== 'text-only') : ?>
                    <?php echo $social_icons['twitter']; ?>
                <?php endif; ?>
                <?php if ($button_style === 'icon-text' || $button_style === 'text-only') : ?>
                    <span class="wedocs-social-btn-text"><?php echo esc_html($platform_names['twitter']); ?></span>
                <?php endif; ?>
            </a>
        <?php endif; ?>

        <?php if (!empty($enabled_platforms['linkedin'])) :
            $btn_color = wedocs_get_button_color('linkedin', $use_individual_colors, $linkedin_color, $button_bg_color);
        ?>
            <a href="<?php echo esc_url($linkedin_url); ?>"
               target="_blank"
               rel="noopener noreferrer"
               class="wedocs-social-share-btn wedocs-social-share-linkedin <?php echo esc_attr($size_class . ' ' . $shape_class); ?>"
               style="background-color: <?php echo esc_attr($btn_color); ?>; color: <?php echo esc_attr($button_icon_color); ?>;"
               title="<?php echo esc_attr(sprintf(__('Share on %s', 'wedocs'), $platform_names['linkedin'])); ?>"
               data-platform="linkedin"
               data-color="<?php echo esc_attr($btn_color); ?>">
                <?php if ($button_style !== 'text-only') : ?>
                    <?php echo $social_icons['linkedin']; ?>
                <?php endif; ?>
                <?php if ($button_style === 'icon-text' || $button_style === 'text-only') : ?>
                    <span class="wedocs-social-btn-text"><?php echo esc_html($platform_names['linkedin']); ?></span>
                <?php endif; ?>
            </a>
        <?php endif; ?>

        <?php if (!empty($enabled_platforms['pinterest'])) :
            $btn_color = wedocs_get_button_color('pinterest', $use_individual_colors, $pinterest_color, $button_bg_color);
        ?>
            <a href="<?php echo esc_url($pinterest_url); ?>"
               target="_blank"
               rel="noopener noreferrer"
               class="wedocs-social-share-btn wedocs-social-share-pinterest <?php echo esc_attr($size_class . ' ' . $shape_class); ?>"
               style="background-color: <?php echo esc_attr($btn_color); ?>; color: <?php echo esc_attr($button_icon_color); ?>;"
               title="<?php echo esc_attr(sprintf(__('Share on %s', 'wedocs'), $platform_names['pinterest'])); ?>"
               data-platform="pinterest"
               data-color="<?php echo esc_attr($btn_color); ?>">
                <?php if ($button_style !== 'text-only') : ?>
                    <?php echo $social_icons['pinterest']; ?>
                <?php endif; ?>
                <?php if ($button_style === 'icon-text' || $button_style === 'text-only') : ?>
                    <span class="wedocs-social-btn-text"><?php echo esc_html($platform_names['pinterest']); ?></span>
                <?php endif; ?>
            </a>
        <?php endif; ?>
    </div>
</div>

<?php
echo  ob_get_clean();
