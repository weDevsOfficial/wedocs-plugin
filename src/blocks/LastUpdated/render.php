<?php
/**
 * Last Updated Date Block - Server-side Rendering
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Extract attributes
$block_id = $attributes['blockId'] ?? 'last-updated-' . uniqid();
$show_icon = $attributes['showIcon'] ?? true;
$icon_type = $attributes['iconType'] ?? 'document';
$prefix = $attributes['prefix'] ?? 'Last updated';
$date_format = $attributes['dateFormat'] ?? 'MM/DD/YYYY';
$text_color = $attributes['textColor'] ?? '#666666';
$font_size = $attributes['fontSize'] ?? '14px';
$font_weight = $attributes['fontWeight'] ?? '400';
$text_align = $attributes['textAlign'] ?? 'left';
$padding = $attributes['padding'] ?? ['top' => '10px', 'right' => '0px', 'bottom' => '10px', 'left' => '0px'];
$margin = $attributes['margin'] ?? ['top' => '0px', 'right' => '0px', 'bottom' => '10px', 'left' => '0px'];

// Get post modified date
global $post;
$modified_timestamp = get_post_modified_time('U', false, $post);
$current_timestamp = current_time('timestamp');

// Format date based on selected format
function wedocs_format_last_updated_date($timestamp, $format) {
    $date = new DateTime();
    $date->setTimestamp($timestamp);

    switch ($format) {
        case 'MM/DD/YYYY':
            return $date->format('m/d/Y');
        case 'DD/MM/YYYY':
            return $date->format('d/m/Y');
        case 'YYYY-MM-DD':
            return $date->format('Y-m-d');
        case 'Month DD, YYYY':
            return $date->format('F j, Y');
        case 'DD Month YYYY':
            return $date->format('j F Y');
        case 'relative':
            return human_time_diff($timestamp, current_time('timestamp')) . ' ago';
        default:
            return $date->format('m/d/Y');
    }
}

$formatted_date = wedocs_format_last_updated_date($modified_timestamp, $date_format);

// Icon SVGs
$icons = [
    'document' => '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 2C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V6L9 2H3Z" stroke="currentColor" stroke-width="1.5"/><path d="M9 2V6H14" stroke="currentColor" stroke-width="1.5"/></svg>',
    'clock' => '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5"/><path d="M8 4V8L11 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    'calendar' => '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M2 6H14" stroke="currentColor" stroke-width="1.5"/><path d="M5 2V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M11 2V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    'refresh' => '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8C2 4.68629 4.68629 2 8 2C9.88154 2 11.5638 2.92287 12.6271 4.34315M14 8C14 11.3137 11.3137 14 8 14C6.11846 14 4.43619 13.0771 3.37289 11.6569" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M14 4V4.5M14 4.5V8.5M14 4.5H10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 12V11.5M2 11.5V7.5M2 11.5H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
];

$icon_svg = $icons[$icon_type] ?? $icons['document'];

// Build wrapper attributes
$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'wp-block-wedocs-last-updated',
    'data-block-id' => esc_attr($block_id),
    'style' => sprintf(
        'color: %s; font-size: %s; font-weight: %s; text-align: %s; padding: %s %s %s %s; margin: %s %s %s %s;',
        esc_attr($text_color),
        esc_attr($font_size),
        esc_attr($font_weight),
        esc_attr($text_align),
        esc_attr($padding['top']),
        esc_attr($padding['right']),
        esc_attr($padding['bottom']),
        esc_attr($padding['left']),
        esc_attr($margin['top']),
        esc_attr($margin['right']),
        esc_attr($margin['bottom']),
        esc_attr($margin['left'])
    )
]);
?>

<div <?php echo $wrapper_attributes; ?>>
    <div class="last-updated-content" style="display: flex; align-items: center; gap: 8px; justify-content: <?php echo esc_attr($text_align === 'center' ? 'center' : ($text_align === 'right' ? 'flex-end' : 'flex-start')); ?>;">
        <?php if ($show_icon): ?>
            <span class="last-updated-icon" style="display: flex; align-items: center;">
                <?php echo $icon_svg; ?>
            </span>
        <?php endif; ?>
        <span>
            <?php if (!empty($prefix)): ?>
                <span><?php echo esc_html($prefix); ?> </span>
            <?php endif; ?>
            <time datetime="<?php echo esc_attr(date('c', $modified_timestamp)); ?>">
                <?php echo esc_html($formatted_date); ?>
            </time>
        </span>
    </div>
</div>
