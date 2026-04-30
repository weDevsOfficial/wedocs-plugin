<?php
/**
 * Shared helper functions for WeDocs blocks styling
 *
 * @package WeDocs
 * @since 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Build typography styles from typography attributes
 *
 * @param array $typography Typography attributes array
 * @return array Array of CSS style strings
 */
function wedocs_build_typography_styles($typography) {
    $styles = [];

    if (isset($typography['fontFamily']) && $typography['fontFamily'] !== 'default') {
        $styles[] = 'font-family: ' . esc_attr($typography['fontFamily']);
    }
    if (isset($typography['fontSize'])) {
        $styles[] = 'font-size: ' . esc_attr($typography['fontSize']);
    }
    if (isset($typography['fontWeight'])) {
        $styles[] = 'font-weight: ' . esc_attr($typography['fontWeight']);
    }
    if (isset($typography['fontStyle'])) {
        $styles[] = 'font-style: ' . esc_attr($typography['fontStyle']);
    }
    if (isset($typography['lineHeight']) && $typography['lineHeight'] !== 'normal') {
        $styles[] = 'line-height: ' . esc_attr($typography['lineHeight']);
    }
    if (isset($typography['letterSpacing']) && $typography['letterSpacing'] !== 'normal') {
        $styles[] = 'letter-spacing: ' . esc_attr($typography['letterSpacing']);
    }
    if (isset($typography['textTransform']) && $typography['textTransform'] !== 'none') {
        $styles[] = 'text-transform: ' . esc_attr($typography['textTransform']);
    }
    if (isset($typography['textDecoration']) && $typography['textDecoration'] !== 'none') {
        $styles[] = 'text-decoration: ' . esc_attr($typography['textDecoration']);
    }

    return $styles;
}

/**
 * Build spacing styles from padding and margin attributes
 *
 * @param array $padding Padding attributes array
 * @param array $margin Margin attributes array
 * @return array Array of CSS style strings
 */
function wedocs_build_spacing_styles($padding, $margin) {
    $styles = [];

    if (!empty($padding)) {
        $styles[] = 'padding: ' . esc_attr($padding['top'] ?? '0px') . ' ' . esc_attr($padding['right'] ?? '0px') . ' ' . esc_attr($padding['bottom'] ?? '0px') . ' ' . esc_attr($padding['left'] ?? '0px');
    }

    if (!empty($margin)) {
        $styles[] = 'margin: ' . esc_attr($margin['top'] ?? '0px') . ' ' . esc_attr($margin['right'] ?? '0px') . ' ' . esc_attr($margin['bottom'] ?? '0px') . ' ' . esc_attr($margin['left'] ?? '0px');
    }

    return $styles;
}

/**
 * Build border styles from border attributes
 *
 * @param string $border_style Border style (none, solid, dashed, etc.)
 * @param array  $border_width Border width attributes array
 * @param string $border_color Border color value
 * @param string $border_radius Border radius value
 * @return array Array of CSS style strings
 */
function wedocs_build_border_styles($border_style, $border_width = [], $border_color = '', $border_radius = '') {
    $styles = [];

    if ($border_style && $border_style !== 'none') {
        $styles[] = 'border-style: ' . esc_attr($border_style);

        if (!empty($border_width)) {
            $styles[] = 'border-width: ' . esc_attr($border_width['top'] ?? '1px') . ' ' . esc_attr($border_width['right'] ?? '1px') . ' ' . esc_attr($border_width['bottom'] ?? '1px') . ' ' . esc_attr($border_width['left'] ?? '1px');
        }

        if ($border_color) {
            $styles[] = 'border-color: ' . esc_attr($border_color);
        }
    }

    if ($border_radius) {
        $styles[] = 'border-radius: ' . esc_attr($border_radius);
    }

    return $styles;
}

/**
 * Build box shadow styles from shadow attributes
 *
 * @param array $shadow_attrs Shadow attributes array
 * @return array Array of CSS style strings
 */
function wedocs_build_shadow_styles($shadow_attrs) {
    $styles = [];

    if (isset($shadow_attrs['enabled']) && $shadow_attrs['enabled']) {
        $horizontal = $shadow_attrs['horizontal'] ?? '0px';
        $vertical = $shadow_attrs['vertical'] ?? '2px';
        $blur = $shadow_attrs['blur'] ?? '4px';
        $spread = $shadow_attrs['spread'] ?? '0px';
        $color = $shadow_attrs['color'] ?? 'rgba(0,0,0,0.1)';

        $styles[] = 'box-shadow: ' . esc_attr($horizontal) . ' ' . esc_attr($vertical) . ' ' . esc_attr($blur) . ' ' . esc_attr($spread) . ' ' . esc_attr($color);
    }

    return $styles;
}

/**
 * Build background styles from background attributes
 *
 * @param string $background_type Background type (classic, gradient)
 * @param string $background_color Background color value
 * @param string $background_gradient Background gradient CSS
 * @param array  $background_image Background image attributes
 * @return array Array of CSS style strings
 */
function wedocs_build_background_styles($background_type, $background_color = '', $background_gradient = '', $background_image = []) {
    $styles = [];

    if ($background_type === 'classic' && $background_color) {
        $styles[] = 'background-color: ' . esc_attr($background_color);
    }

    if ($background_type === 'gradient' && $background_gradient) {
        $styles[] = 'background-image: ' . esc_attr($background_gradient);
    }

    if (isset($background_image['url']) && !empty($background_image['url'])) {
        $styles[] = 'background-image: url(' . esc_url($background_image['url']) . ')';
        $styles[] = 'background-size: cover';
        $styles[] = 'background-position: center';
    }

    return $styles;
}

/**
 * Generate unique block ID for scoped CSS
 *
 * @param string $block_name Block name/prefix
 * @return string Unique block ID
 */
function wedocs_generate_block_id($block_name = 'wedocs-block') {
    return $block_name . '-' . wp_unique_id();
}

/**
 * Build complete element styles by combining all style types
 *
 * @param array $args {
 *     Array of style arguments
 *     @type string $color         Base color
 *     @type array  $typography    Typography attributes
 *     @type array  $spacing       Spacing attributes (padding, margin)
 *     @type array  $border        Border attributes
 *     @type array  $shadow        Shadow attributes
 *     @type array  $background    Background attributes
 *     @type array  $custom        Custom CSS properties
 * }
 * @return array Array of CSS style strings
 */
function wedocs_build_element_styles($args = []) {
    $styles = [];

    // Base color
    if (isset($args['color']) && $args['color']) {
        $styles[] = 'color: ' . esc_attr($args['color']);
    }

    // Typography
    if (isset($args['typography']) && is_array($args['typography'])) {
        $styles = array_merge($styles, wedocs_build_typography_styles($args['typography']));
    }

    // Spacing
    if (isset($args['spacing']) && is_array($args['spacing'])) {
        $padding = $args['spacing']['padding'] ?? [];
        $margin = $args['spacing']['margin'] ?? [];
        $styles = array_merge($styles, wedocs_build_spacing_styles($padding, $margin));
    }

    // Border
    if (isset($args['border']) && is_array($args['border'])) {
        $border_style = $args['border']['style'] ?? 'none';
        $border_width = $args['border']['width'] ?? [];
        $border_color = $args['border']['color'] ?? '';
        $border_radius = $args['border']['radius'] ?? '';
        $styles = array_merge($styles, wedocs_build_border_styles($border_style, $border_width, $border_color, $border_radius));
    }

    // Shadow
    if (isset($args['shadow']) && is_array($args['shadow'])) {
        $styles = array_merge($styles, wedocs_build_shadow_styles($args['shadow']));
    }

    // Background
    if (isset($args['background']) && is_array($args['background'])) {
        $bg_type = $args['background']['type'] ?? 'classic';
        $bg_color = $args['background']['color'] ?? '';
        $bg_gradient = $args['background']['gradient'] ?? '';
        $bg_image = $args['background']['image'] ?? [];
        $styles = array_merge($styles, wedocs_build_background_styles($bg_type, $bg_color, $bg_gradient, $bg_image));
    }

    // Custom styles
    if (isset($args['custom']) && is_array($args['custom'])) {
        $styles = array_merge($styles, $args['custom']);
    }

    return $styles;
}

/**
 * Convert styles array to inline CSS string
 *
 * @param array $styles Array of CSS style strings
 * @return string Inline CSS string
 */
function wedocs_styles_to_css($styles) {
    if (empty($styles)) {
        return '';
    }

    return implode('; ', array_filter($styles));
}

/**
 * Generate responsive CSS rules
 *
 * @param string $block_id Unique block identifier
 * @param array  $rules    Responsive rules array
 * @return string CSS string with media queries
 */
function wedocs_generate_responsive_css($block_id, $rules = []) {
    $css = '';

    // Desktop styles (default)
    if (isset($rules['desktop']) && !empty($rules['desktop'])) {
        $css .= '.' . $block_id . ' {' . $rules['desktop'] . '}';
    }

    // Tablet styles
    if (isset($rules['tablet']) && !empty($rules['tablet'])) {
        $css .= '@media (max-width: 768px) {';
        $css .= '.' . $block_id . ' {' . $rules['tablet'] . '}';
        $css .= '}';
    }

    // Mobile styles
    if (isset($rules['mobile']) && !empty($rules['mobile'])) {
        $css .= '@media (max-width: 480px) {';
        $css .= '.' . $block_id . ' {' . $rules['mobile'] . '}';
        $css .= '}';
    }

    // Accessibility styles
    if (isset($rules['accessibility']) && !empty($rules['accessibility'])) {
        $css .= '@media (prefers-reduced-motion: reduce) {';
        $css .= '.' . $block_id . ' {' . $rules['accessibility'] . '}';
        $css .= '}';
    }

    return $css;
}

/**
 * Sanitize and validate CSS unit values
 *
 * @param string $value CSS value to sanitize
 * @param array  $allowed_units Array of allowed units
 * @return string Sanitized CSS value
 */
function wedocs_sanitize_css_value($value, $allowed_units = ['px', 'em', 'rem', '%', 'vh', 'vw']) {
    if (empty($value)) {
        return '';
    }

    // Allow 'auto', 'inherit', 'initial', 'unset'
    $special_values = ['auto', 'inherit', 'initial', 'unset', 'none', 'normal'];
    if (in_array($value, $special_values)) {
        return $value;
    }

    // Extract number and unit
    if (preg_match('/^(-?\d*\.?\d+)([a-z%]+)?$/i', $value, $matches)) {
        $number = $matches[1];
        $unit = $matches[2] ?? 'px';

        if (in_array($unit, $allowed_units)) {
            return $number . $unit;
        }
    }

    return '';
}