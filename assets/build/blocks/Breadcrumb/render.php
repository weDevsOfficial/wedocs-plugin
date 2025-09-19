<?php
/**
 * Render the breadcrumb block on frontend
 *
 * @param array  $attributes Block attributes
 * @param string $content    Block content
 * @return string Rendered block content
 */
// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Extract attributes with defaults
$separator = $attributes['separator'] ?? 'slash';
$hide_home_icon = $attributes['hideHomeIcon'] ?? false;
$alignment = $attributes['alignment'] ?? 'left';

// Extract style attributes
$background_color = $attributes['backgroundColor'] ?? '';
$text_color = $attributes['textColor'] ?? '';
$border_color = $attributes['borderColor'] ?? '';
$font_size = $attributes['fontSize'] ?? '';
$className = $attributes['className'] ?? '';
$style = $attributes['style'] ?? [];
$spacing = $style['spacing'] ?? [];
$border = $style['border'] ?? [];
$typography = $style['typography'] ?? [];
$elements = $style['elements'] ?? [];
$padding = $spacing['padding'] ?? '';
$margin = $spacing['margin'] ?? '';
$border_radius = $border['radius'] ?? '';
$border_width = $border['width'] ?? '';
$border_style = $border['style'] ?? '';
$border_color_from_style = $border['color'] ?? '';
$font_size_from_style = $typography['fontSize'] ?? '';
$line_height = $typography['lineHeight'] ?? '';
$font_family = $typography['fontFamily'] ?? '';
$font_weight = $typography['fontWeight'] ?? '';
$font_style = $typography['fontStyle'] ?? '';
$text_transform = $typography['textTransform'] ?? '';
$text_decoration = $typography['textDecoration'] ?? '';
$letter_spacing = $typography['letterSpacing'] ?? '';
$link_color = $elements['link']['color']['text'] ?? '';
$breadcrumb_separator = $attributes['breadcrumbSeparator'] ?? [];
$separator_color = $breadcrumb_separator['color'] ?? '';

// Extract shadow attributes
$shadow = $style['shadow'] ?? '';

// Helper function to convert WordPress spacing to CSS
if (!function_exists('get_spacing_value')) {
    function get_spacing_value($spacing_value) {
        if (empty($spacing_value)) {
            return '';
        }
        
        // Handle object with individual sides
        if (is_array($spacing_value)) {
            $sides = ['top', 'right', 'bottom', 'left'];
            $values = [];
            foreach ($sides as $side) {
                $value = $spacing_value[$side] ?? '0';
                if (strpos($value, 'var:preset|spacing|') === 0) {
                    $spacing_name = str_replace('var:preset|spacing|', '', $value);
                    $values[] = "var(--wp--preset--spacing--{$spacing_name})";
                } else {
                    $values[] = $value;
                }
            }
            return implode(' ', $values);
        }
        
        // Handle string values
        if (is_string($spacing_value)) {
            if (strpos($spacing_value, 'var:preset|spacing|') === 0) {
                $spacing_name = str_replace('var:preset|spacing|', '', $spacing_value);
                return "var(--wp--preset--spacing--{$spacing_name})";
            }
            return $spacing_value;
        }
        
        return '';
    }
}

// Helper function to convert WordPress color to CSS
if (!function_exists('get_color_value')) {
    function get_color_value($color) {
        if (empty($color)) {
            return '';
        }
        
        // Handle preset color format: var:preset|color|accent-3
        if (strpos($color, 'var:preset|color|') === 0) {
            $color_name = str_replace('var:preset|color|', '', $color);
            return "var(--wp--preset--color--{$color_name})";
        }
        
        // Handle direct preset color names: accent-3, primary, etc.
        if (preg_match('/^[a-z0-9-]+$/', $color) && !strpos($color, '#') && !strpos($color, 'rgb')) {
            return "var(--wp--preset--color--{$color})";
        }
        
        return $color;
    }
}

// Helper function to convert WordPress border radius to CSS
if (!function_exists('get_border_radius_value')) {
    function get_border_radius_value($radius_value) {
        if (empty($radius_value)) {
            return '';
        }
        if (strpos($radius_value, 'var:preset|spacing|') === 0) {
            $radius_name = str_replace('var:preset|spacing|', '', $radius_value);
            return "var(--wp--preset--spacing--{$radius_name})";
        }
        return $radius_value;
    }
}

// Helper function to convert WordPress border width to CSS
if (!function_exists('get_border_width_value')) {
    function get_border_width_value($width_value) {
        if (empty($width_value)) {
            return '';
        }
        return $width_value;
    }
}

// Helper function to convert WordPress typography to CSS
if (!function_exists('get_typography_value')) {
    function get_typography_value($typography_value) {
        if (empty($typography_value)) {
            return '';
        }
        
        // Handle preset font size format: var:preset|font-size|medium
        if (strpos($typography_value, 'var:preset|font-size|') === 0) {
            $font_size_name = str_replace('var:preset|font-size|', '', $typography_value);
            return "var(--wp--preset--font-size--{$font_size_name})";
        }
        
        // Handle preset font family format: var:preset|font-family|system-font
        if (strpos($typography_value, 'var:preset|font-family|') === 0) {
            $font_family_name = str_replace('var:preset|font-family|', '', $typography_value);
            return "var(--wp--preset--font-family--{$font_family_name})";
        }
        
        // Handle direct preset font size names: medium, large, x-large, xx-large, etc.
        if (preg_match('/^(small|medium|large|x-large|xx-large|xxx-large)$/', $typography_value)) {
            return "var(--wp--preset--font-size--{$typography_value})";
        }
        
        return $typography_value;
    }
}

// Helper function to convert WordPress shadow to CSS
if (!function_exists('get_shadow_value')) {
    function get_shadow_value($shadow_value) {
        if (empty($shadow_value)) {
            return '';
        }
        
        // Handle preset shadow format: var:preset|shadow|natural
        if (strpos($shadow_value, 'var:preset|shadow|') === 0) {
            $shadow_name = str_replace('var:preset|shadow|', '', $shadow_value);
            return "var(--wp--preset--shadow--{$shadow_name})";
        }
        
        // Handle direct preset shadow names: natural, deep, sharp, outlined, crisp
        if (preg_match('/^(natural|deep|sharp|outlined|crisp)$/', $shadow_value)) {
            return "var(--wp--preset--shadow--{$shadow_value})";
        }
        
        return $shadow_value;
    }
}

// Get separator icon
if (!function_exists('get_separator_icon')) {
    function get_separator_icon($separator) {
        switch ($separator) {
            case 'slash':
                return '/';
            case 'arrow':
                return '›';
            case 'chevron':
                return '»';
            case 'dot':
                return '•';
            default:
                return '/';
        }
    }
}

// Get alignment class
if (!function_exists('get_alignment_class')) {
    function get_alignment_class($alignment) {
        switch ($alignment) {
            case 'center':
                return 'justify-center';
            case 'right':
                return 'justify-end';
            case 'left':
            default:
                return 'justify-start';
        }
    }
}

// Get current page info for breadcrumbs
if (!function_exists('get_breadcrumb_items')) {
    function get_breadcrumb_items() {
    $breadcrumbs = [];

    // Always start with Home
    $breadcrumbs[] = [
        'title' => __('Home', 'wedocs'),
        'url' => home_url('/')
    ];

    // Check if we're on a docs page
    if (is_singular('docs')) {
        global $post;

        // Add parent docs
        $parent_docs = get_doc_ancestors($post);
        foreach ($parent_docs as $parent) {
            $breadcrumbs[] = [
                'title' => $parent->post_title,
                'url' => get_permalink($parent->ID)
            ];
        }

        // Add current doc (no URL for current page)
        $breadcrumbs[] = [
            'title' => $post->post_title,
            'url' => null
        ];
    } elseif (is_post_type_archive('docs')) {
        $breadcrumbs[] = [
            'title' => __('Documentation', 'wedocs'),
            'url' => null
        ];
    } elseif (is_page()) {
        // Handle regular pages with proper hierarchy
        global $post;
        
        // Get page ancestors using WordPress built-in function
        $ancestors = get_post_ancestors($post->ID);
        
        // Add ancestor pages in correct order
        foreach ($ancestors as $ancestor_id) {
            $ancestor = get_post($ancestor_id);
            if ($ancestor) {
                $breadcrumbs[] = [
                    'title' => $ancestor->post_title,
                    'url' => get_permalink($ancestor->ID)
                ];
            }
        }
        
        // Add current page (no URL for current page)
        $breadcrumbs[] = [
            'title' => $post->post_title,
            'url' => null
        ];
    } elseif (is_singular('post')) {
        // Handle blog posts
        global $post;
        
        // Add blog archive page
        $blog_page_id = get_option('page_for_posts');
        if ($blog_page_id) {
            $blog_page = get_post($blog_page_id);
            if ($blog_page) {
                $breadcrumbs[] = [
                    'title' => $blog_page->post_title,
                    'url' => get_permalink($blog_page->ID)
                ];
            }
        } else {
            // Fallback to blog home
            $breadcrumbs[] = [
                'title' => __('Blog', 'wedocs'),
                'url' => get_option('home')
            ];
        }
        
        // Add current post (no URL for current page)
        $breadcrumbs[] = [
            'title' => $post->post_title,
            'url' => null
        ];
    } elseif (is_category()) {
        // Handle category pages
        $category = get_queried_object();
        $breadcrumbs[] = [
            'title' => $category->name,
            'url' => null
        ];
    } elseif (is_tag()) {
        // Handle tag pages
        $tag = get_queried_object();
        $breadcrumbs[] = [
            'title' => $tag->name,
            'url' => null
        ];
    } elseif (is_archive()) {
        // Handle other archive pages
        $breadcrumbs[] = [
            'title' => get_the_archive_title(),
            'url' => null
        ];
    } elseif (is_home() || is_front_page()) {
        // Handle home page - no additional breadcrumb needed
        // The home breadcrumb is already added at the beginning
    } else {
        // Fallback for any other page type
        if (is_singular()) {
            global $post;
            $breadcrumbs[] = [
                'title' => $post->post_title,
                'url' => null
            ];
        }
    }

    return $breadcrumbs;
    }
}

if (!function_exists('get_doc_ancestors')) {
    function get_doc_ancestors($post) {
    $ancestors = [];
    $parent = $post->post_parent;

    while ($parent) {
        $parent_post = get_post($parent);
        if ($parent_post) {
            array_unshift($ancestors, $parent_post);
            $parent = $parent_post->post_parent;
        } else {
            break;
        }
    }

    return $ancestors;
    }
}

$separator_icon = get_separator_icon($separator);
$breadcrumbs = get_breadcrumb_items();

?>
<div class="wedocs-document">
    <nav aria-label="Breadcrumb">
        <?php
        // Build CSS classes for WordPress style system
        $ol_classes = ['flex', get_alignment_class($alignment)];
        
        // Add color classes
        if ($background_color) {
            $ol_classes[] = 'has-background';
            $ol_classes[] = 'has-' . sanitize_key($background_color) . '-background-color';
        }
        if ($text_color) {
            $ol_classes[] = 'has-text-color';
            $ol_classes[] = 'has-' . sanitize_key($text_color) . '-color';
        }
        // Use border color from style system if available, fallback to attribute
        $effective_border_color = $border_color_from_style ?: $border_color;
        if ($effective_border_color) {
            $ol_classes[] = 'has-border-color';
            $ol_classes[] = 'has-' . sanitize_key($effective_border_color) . '-border-color';
        }
        
        // Add WordPress className
        if ($className) {
            $ol_classes[] = $className;
        }
        
        $ol_class_string = implode(' ', $ol_classes);
        ?>
        <ol role="list" class="<?php echo esc_attr($ol_class_string); ?>" style="
            <?php if ($padding): ?>padding: <?php echo esc_attr(get_spacing_value($padding)); ?>;<?php endif; ?>
            <?php if ($margin): ?>margin: <?php echo esc_attr(get_spacing_value($margin)); ?>;<?php endif; ?>
            <?php if ($border_radius): ?>border-radius: <?php echo esc_attr(get_border_radius_value($border_radius)); ?>;<?php endif; ?>
            <?php if ($border_width): ?>border-width: <?php echo esc_attr(get_border_width_value($border_width)); ?>;<?php endif; ?>
            <?php if ($border_style): ?>border-style: <?php echo esc_attr($border_style); ?>;<?php elseif ($border_width || $effective_border_color): ?>border-style: solid;<?php endif; ?>
            <?php if ($effective_border_color): ?>border-color: <?php echo esc_attr(get_color_value($effective_border_color)); ?>;<?php endif; ?>
            <?php if ($shadow): ?>box-shadow: <?php echo esc_attr(get_shadow_value($shadow)); ?>;<?php endif; ?>
            <?php if ($line_height): ?>line-height: <?php echo esc_attr($line_height); ?>;<?php endif; ?>
            <?php if ($font_family): ?>font-family: <?php echo esc_attr(get_typography_value($font_family)); ?>;<?php endif; ?>
            <?php if ($font_weight): ?>font-weight: <?php echo esc_attr($font_weight); ?>;<?php endif; ?>
            <?php if ($font_style): ?>font-style: <?php echo esc_attr($font_style); ?>;<?php endif; ?>
            <?php if ($text_transform): ?>text-transform: <?php echo esc_attr($text_transform); ?>;<?php endif; ?>
            <?php if ($text_decoration): ?>text-decoration: <?php echo esc_attr($text_decoration); ?>;<?php endif; ?>
            <?php if ($letter_spacing): ?>letter-spacing: <?php echo esc_attr($letter_spacing); ?>;<?php endif; ?>
        ">
            <?php foreach ($breadcrumbs as $index => $breadcrumb): ?>
                <li class="flex">
                    <div class="flex items-center">
                        <?php if ($index > 0): ?>
                            <!-- Separator -->
                            <span class="mx-2" style="<?php if ($separator_color): ?>color: <?php echo esc_attr($separator_color); ?>;<?php endif; ?>">
                                <?php echo esc_html($separator_icon); ?>
                            </span>
                        <?php endif; ?>
                        
                        <?php if ($breadcrumb['url']): ?>
                            <!-- Link with home icon for first item -->
                            <?php if (!$hide_home_icon && $index === 0): ?>
                                <?php
                                $home_link_classes = ['hover:opacity-80', 'flex', 'items-center'];
                                if ($link_color) {
                                    $home_link_classes[] = 'has-link-color';
                                    $home_link_classes[] = 'has-' . sanitize_key(str_replace('var:preset|color|', '', $link_color)) . '-link-color';
                                }
                                ?>
                                <a href="<?php echo esc_url($breadcrumb['url']); ?>" class="<?php echo esc_attr(implode(' ', $home_link_classes)); ?>" style="<?php if ($font_size_from_style): ?>font-size: <?php echo esc_attr(get_typography_value($font_size_from_style)); ?>;<?php elseif ($font_size): ?>font-size: <?php echo esc_attr(get_typography_value($font_size)); ?>;<?php endif; ?>">
                                    <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="w-5 h-5 shrink-0 mr-1">
                                        <path d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clip-rule="evenodd" fill-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only"><?php echo esc_html($breadcrumb['title']); ?></span>
                                </a>
                            <?php else: ?>
                                <!-- Regular link -->
                                <?php
                                $link_classes = ['text-sm', 'font-medium', 'hover:opacity-80'];
                                if ($index > 0) {
                                    $link_classes[] = 'ml-4';
                                }
                                if ($link_color) {
                                    $link_classes[] = 'has-link-color';
                                    $link_classes[] = 'has-' . sanitize_key(str_replace('var:preset|color|', '', $link_color)) . '-link-color';
                                }
                                ?>
                                <a href="<?php echo esc_url($breadcrumb['url']); ?>" class="<?php echo esc_attr(implode(' ', $link_classes)); ?>" style="<?php if ($font_size_from_style): ?>font-size: <?php echo esc_attr(get_typography_value($font_size_from_style)); ?>;<?php elseif ($font_size): ?>font-size: <?php echo esc_attr(get_typography_value($font_size)); ?>;<?php endif; ?>">
                                    <?php echo esc_html($breadcrumb['title']); ?>
                                </a>
                            <?php endif; ?>
                        <?php else: ?>
                            <!-- Current page (no link) -->
                            <span <?php echo $index === 0 ? '' : 'class="ml-4"'; ?> aria-current="page" class="text-sm font-medium text-gray-500 hover:text-gray-700" style="<?php if ($font_size_from_style): ?>font-size: <?php echo esc_attr(get_typography_value($font_size_from_style)); ?>;<?php elseif ($font_size): ?>font-size: <?php echo esc_attr(get_typography_value($font_size)); ?>;<?php endif; ?>">
                                <?php echo esc_html($breadcrumb['title']); ?>
                            </span>
                        <?php endif; ?>
                    </div>
                </li>
            <?php endforeach; ?>
        </ol>
    </nav>
</div>
