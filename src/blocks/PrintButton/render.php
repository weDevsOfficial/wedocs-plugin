<?php
/**
 * Server-side rendering for the Print Button block.
 *
 * @param array $attributes Block attributes.
 * @return string
 */

function render_wedocs_print_button($attributes) {

// Check if we're on a weDocs post type
global $post;
if (!$post || $post->post_type !== 'docs') {
    return '';
}

ob_start();

// Extract attributes with defaults
$layout = isset($attributes['layout']) ? $attributes['layout'] : 'layout1';
$alignment = isset($attributes['alignment']) ? $attributes['alignment'] : 'left';
$button_text = isset($attributes['buttonText']) ? $attributes['buttonText'] : __('Print', 'wedocs');
$show_icon = isset($attributes['showIcon']) ? $attributes['showIcon'] : true;
$button_style = isset($attributes['buttonStyle']) ? $attributes['buttonStyle'] : 'primary';
$button_size = isset($attributes['buttonSize']) ? $attributes['buttonSize'] : 'medium';
$additional_classes = isset($attributes['additionalClasses']) ? $attributes['additionalClasses'] : '';

// Spacing attributes with proper defaults for empty values
$padding_defaults = [
    'top' => '10px',
    'right' => '15px', 
    'bottom' => '10px',
    'left' => '15px'
];

$margin_defaults = [
    'top' => '0px',
    'right' => '0px',
    'bottom' => '10px', 
    'left' => '0px'
];

// Merge with defaults to handle empty/undefined individual properties
$padding = array_merge($padding_defaults, isset($attributes['padding']) ? array_filter($attributes['padding'], function($value) {
    return !empty($value);
}) : []);

$margin = array_merge($margin_defaults, isset($attributes['margin']) ? array_filter($attributes['margin'], function($value) {
    return !empty($value);
}) : []);

// Color and style attributes
$background_color = isset($attributes['backgroundColor']) ? $attributes['backgroundColor'] : '#0073aa';
$text_color = isset($attributes['textColor']) ? $attributes['textColor'] : '#ffffff';
$hover_bg_color = isset($attributes['hoverBackgroundColor']) ? $attributes['hoverBackgroundColor'] : '#005177';
$hover_text_color = isset($attributes['hoverTextColor']) ? $attributes['hoverTextColor'] : '#ffffff';
$border_radius = isset($attributes['borderRadius']) ? $attributes['borderRadius'] : '4px';
$border_width = isset($attributes['borderWidth']) ? $attributes['borderWidth'] : '1px';
$border_color = isset($attributes['borderColor']) ? $attributes['borderColor'] : '#0073aa';
$border_style = isset($attributes['borderStyle']) ? $attributes['borderStyle'] : 'solid';
$font_size = isset($attributes['fontSize']) ? $attributes['fontSize'] : '16px';
$font_weight = isset($attributes['fontWeight']) ? $attributes['fontWeight'] : 'normal';

// Build inline styles with !important for maximum specificity
$padding_style = sprintf(
    'padding: %s %s %s %s !important;',
    esc_attr($padding['top']),
    esc_attr($padding['right']),
    esc_attr($padding['bottom']),
    esc_attr($padding['left'])
);

$margin_style = sprintf(
    'margin: %s %s %s %s !important;',
    esc_attr($margin['top']),
    esc_attr($margin['right']),
    esc_attr($margin['bottom']),
    esc_attr($margin['left'])
);

$button_styles = sprintf(
    '%s %s background-color: %s !important; color: %s !important; border: %s %s %s !important; border-radius: %s !important; font-size: %s !important; font-weight: %s !important; text-decoration: none !important; cursor: pointer !important; transition: all 0.2s ease-in-out !important; display: inline-flex !important; align-items: center !important; justify-content: center !important; gap: %s !important; line-height: 1.4 !important;',
    $padding_style,
    $margin_style,
    esc_attr($background_color),
    esc_attr($text_color),
    esc_attr($border_width),
    esc_attr($border_style),
    esc_attr($border_color),
    esc_attr($border_radius),
    esc_attr($font_size),
    esc_attr($font_weight),
    $show_icon ? '8px' : '0'
);

// Container styles based on alignment
$container_styles = sprintf('text-align: %s; width: 100%%;', esc_attr($alignment));

// Generate unique ID for hover styles
$block_id = 'wedocs-print-btn-' . wp_generate_uuid4();

// Build CSS classes
$css_classes = sprintf('wedocs-print-article wedocs-print-button %s %s-size %s %s', 
    esc_attr($layout), 
    esc_attr($button_size),
    esc_attr($button_style),
    esc_attr($additional_classes)
);

// Render layout variations
$button_content = '';

switch ($layout) {
    case 'layout2':
        $button_content = sprintf(
            '<a href="#" id="%s" class="%s layout-2" style="%s" title="%s">
                %s
                <span>%s</span>
            </a>',
            esc_attr($block_id),
            esc_attr($css_classes),
            esc_attr($button_styles),
            esc_attr(__('Print this article', 'wedocs')),
            $show_icon ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/></svg>' : '',
            esc_html($button_text)
        );
        break;
        
    case 'layout3':
        $vertical_styles = str_replace('gap: 8px', 'gap: 4px; flex-direction: column', $button_styles);
        $button_content = sprintf(
            '<a href="#" id="%s" class="%s layout-3" style="%s" title="%s">
                %s
                <span style="font-size: 12px;">%s</span>
            </a>',
            esc_attr($block_id),
            esc_attr($css_classes),
            esc_attr($vertical_styles),
            esc_attr(__('Print this article', 'wedocs')),
            $show_icon ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/></svg>' : '',
            esc_html($button_text)
        );
        break;
        
    default: // layout1
        $button_content = sprintf(
            '<a href="#" id="%s" class="%s layout-1" style="%s" title="%s">
                %s
                <span>%s</span>
            </a>',
            esc_attr($block_id),
            esc_attr($css_classes),
            esc_attr($button_styles),
            esc_attr(__('Print this article', 'wedocs')),
            $show_icon ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/></svg>' : '',
            esc_html($button_text)
        );
        break;
}

// Output the complete block with inline print hiding
?>
<style>
@media print {
    #<?php echo esc_attr($block_id); ?>,
    .wp-block-wedocs-print-button,
    .wedocs-print-button-wrapper,
    [id="<?php echo esc_attr($block_id); ?>"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        height: 0 !important;
        width: 0 !important;
        overflow: hidden !important;
        position: absolute !important;
        left: -9999px !important;
    }
}
</style>
<div class="wp-block-wedocs-print-button wedocs-print-button-wrapper" style="<?php echo esc_attr($container_styles); ?>">
    <?php echo $button_content; ?>
    
    <style>
        #<?php echo esc_attr($block_id); ?>:hover {
            background-color: <?php echo esc_attr($hover_bg_color); ?> !important;
            color: <?php echo esc_attr($hover_text_color); ?> !important;
        }
        
        .wedocs-print-button {
            border: none;
            outline: none;
        }
        
        .wedocs-print-button.small-size {
            font-size: 14px;
            padding: 8px 12px;
        }
        
        .wedocs-print-button.large-size {
            font-size: 18px;
            padding: 12px 20px;
        }
        
        .wedocs-print-button.outline {
            background-color: transparent !important;
            color: <?php echo esc_attr($border_color); ?> !important;
        }
        
        .wedocs-print-button.ghost {
            background-color: transparent !important;
            border: none !important;
            color: <?php echo esc_attr($background_color); ?> !important;
        }
    </style>
</div>
<?php
return ob_get_clean();
}
?>
