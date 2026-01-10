<?php
/**
 * Block Helpers - PHP Version
 *
 * Server-side CSS generation and settings management for weDocs blocks.
 * This ensures consistent rendering on both frontend and backend.
 *
 * @package weDocs
 */

if (!defined('ABSPATH')) {
    exit;
}

class WeDocs_Block_Helpers {

    /**
     * Generate CSS from block attributes
     *
     * @param array $attributes Block attributes
     * @param string $block_class Unique block class name
     * @param array $options Additional options
     * @return string Generated CSS
     */
    public static function generate_block_css($attributes, $block_class, $options = []) {
        $styles = [];
        $selector = isset($options['selector']) ? $options['selector'] : ".{$block_class}";

        // Color Styles
        $color_styles = self::generate_color_styles($attributes);
        if ($color_styles) {
            $styles[] = "{$selector} { {$color_styles} }";
        }

        // Typography Styles
        $typography_styles = self::generate_typography_styles($attributes);
        if ($typography_styles) {
            $styles[] = "{$selector} { {$typography_styles} }";
        }

        // Spacing Styles
        $spacing_styles = self::generate_spacing_styles($attributes);
        if ($spacing_styles) {
            $styles[] = "{$selector} { {$spacing_styles} }";
        }

        // Dimensions Styles
        $dimension_styles = self::generate_dimension_styles($attributes);
        if ($dimension_styles) {
            $styles[] = "{$selector} { {$dimension_styles} }";
        }

        // Border Styles
        $border_styles = self::generate_border_styles($attributes);
        if ($border_styles) {
            $styles[] = "{$selector} { {$border_styles} }";
        }

        return implode("\n", $styles);
    }

    /**
     * Generate color styles
     */
    private static function generate_color_styles($attributes) {
        $styles = [];

        // Background color
        if (!empty($attributes['backgroundColor'])) {
            $styles[] = "background-color: var(--wp--preset--color--{$attributes['backgroundColor']})";
        } elseif (!empty($attributes['style']['color']['background'])) {
            $styles[] = "background-color: {$attributes['style']['color']['background']}";
        }

        // Text color
        if (!empty($attributes['textColor'])) {
            $styles[] = "color: var(--wp--preset--color--{$attributes['textColor']})";
        } elseif (!empty($attributes['style']['color']['text'])) {
            $styles[] = "color: {$attributes['style']['color']['text']}";
        }

        // Gradient
        if (!empty($attributes['gradient'])) {
            $styles[] = "background: var(--wp--preset--gradient--{$attributes['gradient']})";
        } elseif (!empty($attributes['style']['color']['gradient'])) {
            $styles[] = "background: {$attributes['style']['color']['gradient']}";
        }

        return implode('; ', $styles);
    }

    /**
     * Generate typography styles
     */
    private static function generate_typography_styles($attributes) {
        $styles = [];
        $typography = isset($attributes['style']['typography']) ? $attributes['style']['typography'] : [];

        // Font size
        if (!empty($attributes['fontSize'])) {
            $styles[] = "font-size: var(--wp--preset--font-size--{$attributes['fontSize']})";
        } elseif (!empty($typography['fontSize'])) {
            $styles[] = "font-size: {$typography['fontSize']}";
        }

        // Font family
        if (!empty($attributes['fontFamily'])) {
            $styles[] = "font-family: var(--wp--preset--font-family--{$attributes['fontFamily']})";
        } elseif (!empty($typography['fontFamily'])) {
            $styles[] = "font-family: {$typography['fontFamily']}";
        }

        // Font weight
        if (!empty($typography['fontWeight'])) {
            $styles[] = "font-weight: {$typography['fontWeight']}";
        }

        // Font style
        if (!empty($typography['fontStyle'])) {
            $styles[] = "font-style: {$typography['fontStyle']}";
        }

        // Line height
        if (!empty($typography['lineHeight'])) {
            $styles[] = "line-height: {$typography['lineHeight']}";
        }

        // Letter spacing
        if (!empty($typography['letterSpacing'])) {
            $styles[] = "letter-spacing: {$typography['letterSpacing']}";
        }

        // Text transform
        if (!empty($typography['textTransform'])) {
            $styles[] = "text-transform: {$typography['textTransform']}";
        }

        // Text decoration
        if (!empty($typography['textDecoration'])) {
            $styles[] = "text-decoration: {$typography['textDecoration']}";
        }

        return implode('; ', $styles);
    }

    /**
     * Generate spacing styles
     */
    private static function generate_spacing_styles($attributes) {
        $styles = [];
        $spacing = isset($attributes['style']['spacing']) ? $attributes['style']['spacing'] : [];

        // Margin
        if (!empty($spacing['margin'])) {
            if (is_string($spacing['margin'])) {
                $styles[] = "margin: {$spacing['margin']}";
            } elseif (is_array($spacing['margin'])) {
                if (!empty($spacing['margin']['top'])) $styles[] = "margin-top: {$spacing['margin']['top']}";
                if (!empty($spacing['margin']['right'])) $styles[] = "margin-right: {$spacing['margin']['right']}";
                if (!empty($spacing['margin']['bottom'])) $styles[] = "margin-bottom: {$spacing['margin']['bottom']}";
                if (!empty($spacing['margin']['left'])) $styles[] = "margin-left: {$spacing['margin']['left']}";
            }
        }

        // Padding
        if (!empty($spacing['padding'])) {
            if (is_string($spacing['padding'])) {
                $styles[] = "padding: {$spacing['padding']}";
            } elseif (is_array($spacing['padding'])) {
                if (!empty($spacing['padding']['top'])) $styles[] = "padding-top: {$spacing['padding']['top']}";
                if (!empty($spacing['padding']['right'])) $styles[] = "padding-right: {$spacing['padding']['right']}";
                if (!empty($spacing['padding']['bottom'])) $styles[] = "padding-bottom: {$spacing['padding']['bottom']}";
                if (!empty($spacing['padding']['left'])) $styles[] = "padding-left: {$spacing['padding']['left']}";
            }
        }

        // Block gap
        if (!empty($spacing['blockGap'])) {
            $styles[] = "gap: {$spacing['blockGap']}";
        }

        return implode('; ', $styles);
    }

    /**
     * Generate dimension styles
     */
    private static function generate_dimension_styles($attributes) {
        $styles = [];
        $dimensions = isset($attributes['style']['dimensions']) ? $attributes['style']['dimensions'] : [];

        // Min height
        if (!empty($dimensions['minHeight'])) {
            $styles[] = "min-height: {$dimensions['minHeight']}";
        }

        // Width
        if (!empty($dimensions['width'])) {
            $styles[] = "width: {$dimensions['width']}";
        }

        // Max width
        if (!empty($dimensions['maxWidth'])) {
            $styles[] = "max-width: {$dimensions['maxWidth']}";
        }

        // Aspect ratio
        if (!empty($dimensions['aspectRatio'])) {
            $styles[] = "aspect-ratio: {$dimensions['aspectRatio']}";
        }

        return implode('; ', $styles);
    }

    /**
     * Generate border styles
     */
    private static function generate_border_styles($attributes) {
        $styles = [];
        $border = isset($attributes['style']['border']) ? $attributes['style']['border'] : [];

        // Border color
        if (!empty($attributes['borderColor'])) {
            $styles[] = "border-color: var(--wp--preset--color--{$attributes['borderColor']})";
        } elseif (!empty($border['color'])) {
            $styles[] = "border-color: {$border['color']}";
        }

        // Border width
        if (!empty($border['width'])) {
            if (is_string($border['width'])) {
                $styles[] = "border-width: {$border['width']}";
            } elseif (is_array($border['width'])) {
                if (!empty($border['width']['top'])) $styles[] = "border-top-width: {$border['width']['top']}";
                if (!empty($border['width']['right'])) $styles[] = "border-right-width: {$border['width']['right']}";
                if (!empty($border['width']['bottom'])) $styles[] = "border-bottom-width: {$border['width']['bottom']}";
                if (!empty($border['width']['left'])) $styles[] = "border-left-width: {$border['width']['left']}";
            }
        }

        // Border style
        if (!empty($border['style'])) {
            $styles[] = "border-style: {$border['style']}";
        }

        // Border radius
        if (!empty($border['radius'])) {
            if (is_string($border['radius'])) {
                $styles[] = "border-radius: {$border['radius']}";
            } elseif (is_array($border['radius'])) {
                if (!empty($border['radius']['topLeft'])) $styles[] = "border-top-left-radius: {$border['radius']['topLeft']}";
                if (!empty($border['radius']['topRight'])) $styles[] = "border-top-right-radius: {$border['radius']['topRight']}";
                if (!empty($border['radius']['bottomLeft'])) $styles[] = "border-bottom-left-radius: {$border['radius']['bottomLeft']}";
                if (!empty($border['radius']['bottomRight'])) $styles[] = "border-bottom-right-radius: {$border['radius']['bottomRight']}";
            }
        }

        return implode('; ', $styles);
    }

    /**
     * Get alignment class
     */
    public static function get_alignment_class($align) {
        if (empty($align)) return '';
        return "align{$align}";
    }

    /**
     * Get block wrapper classes
     */
    public static function get_block_classes($attributes, $base_class = '') {
        $classes = [$base_class];

        // Alignment
        if (!empty($attributes['align'])) {
            $classes[] = self::get_alignment_class($attributes['align']);
        }

        // Background color
        if (!empty($attributes['backgroundColor'])) {
            $classes[] = "has-{$attributes['backgroundColor']}-background-color";
            $classes[] = 'has-background';
        }

        // Text color
        if (!empty($attributes['textColor'])) {
            $classes[] = "has-{$attributes['textColor']}-color";
            $classes[] = 'has-text-color';
        }

        // Gradient
        if (!empty($attributes['gradient'])) {
            $classes[] = "has-{$attributes['gradient']}-gradient-background";
            $classes[] = 'has-background';
        }

        // Font size
        if (!empty($attributes['fontSize'])) {
            $classes[] = "has-{$attributes['fontSize']}-font-size";
        }

        // Font family
        if (!empty($attributes['fontFamily'])) {
            $classes[] = "has-{$attributes['fontFamily']}-font-family";
        }

        // Custom className
        if (!empty($attributes['className'])) {
            $classes[] = $attributes['className'];
        }

        return implode(' ', array_filter($classes));
    }

    /**
     * Get inline styles array
     */
    public static function get_inline_styles($attributes) {
        $styles = [];

        // Color styles
        if (!empty($attributes['style']['color']['background'])) {
            $styles['background-color'] = $attributes['style']['color']['background'];
        }
        if (!empty($attributes['style']['color']['text'])) {
            $styles['color'] = $attributes['style']['color']['text'];
        }
        if (!empty($attributes['style']['color']['gradient'])) {
            $styles['background'] = $attributes['style']['color']['gradient'];
        }

        // Typography styles
        $typography = isset($attributes['style']['typography']) ? $attributes['style']['typography'] : [];
        if (!empty($typography['fontSize'])) $styles['font-size'] = $typography['fontSize'];
        if (!empty($typography['fontFamily'])) $styles['font-family'] = $typography['fontFamily'];
        if (!empty($typography['fontWeight'])) $styles['font-weight'] = $typography['fontWeight'];
        if (!empty($typography['fontStyle'])) $styles['font-style'] = $typography['fontStyle'];
        if (!empty($typography['lineHeight'])) $styles['line-height'] = $typography['lineHeight'];
        if (!empty($typography['letterSpacing'])) $styles['letter-spacing'] = $typography['letterSpacing'];
        if (!empty($typography['textTransform'])) $styles['text-transform'] = $typography['textTransform'];
        if (!empty($typography['textDecoration'])) $styles['text-decoration'] = $typography['textDecoration'];

        // Spacing styles
        $spacing = isset($attributes['style']['spacing']) ? $attributes['style']['spacing'] : [];
        if (!empty($spacing['margin'])) {
            if (is_string($spacing['margin'])) {
                $styles['margin'] = $spacing['margin'];
            } elseif (is_array($spacing['margin'])) {
                if (!empty($spacing['margin']['top'])) $styles['margin-top'] = $spacing['margin']['top'];
                if (!empty($spacing['margin']['right'])) $styles['margin-right'] = $spacing['margin']['right'];
                if (!empty($spacing['margin']['bottom'])) $styles['margin-bottom'] = $spacing['margin']['bottom'];
                if (!empty($spacing['margin']['left'])) $styles['margin-left'] = $spacing['margin']['left'];
            }
        }
        if (!empty($spacing['padding'])) {
            if (is_string($spacing['padding'])) {
                $styles['padding'] = $spacing['padding'];
            } elseif (is_array($spacing['padding'])) {
                if (!empty($spacing['padding']['top'])) $styles['padding-top'] = $spacing['padding']['top'];
                if (!empty($spacing['padding']['right'])) $styles['padding-right'] = $spacing['padding']['right'];
                if (!empty($spacing['padding']['bottom'])) $styles['padding-bottom'] = $spacing['padding']['bottom'];
                if (!empty($spacing['padding']['left'])) $styles['padding-left'] = $spacing['padding']['left'];
            }
        }
        if (!empty($spacing['blockGap'])) {
            $styles['gap'] = $spacing['blockGap'];
        }

        // Dimension styles
        $dimensions = isset($attributes['style']['dimensions']) ? $attributes['style']['dimensions'] : [];
        if (!empty($dimensions['minHeight'])) $styles['min-height'] = $dimensions['minHeight'];
        if (!empty($dimensions['width'])) $styles['width'] = $dimensions['width'];
        if (!empty($dimensions['maxWidth'])) $styles['max-width'] = $dimensions['maxWidth'];
        if (!empty($dimensions['aspectRatio'])) $styles['aspect-ratio'] = $dimensions['aspectRatio'];

        // Width from layout settings (content width, wide width)
        if (!empty($attributes['width'])) {
            $styles['width'] = $attributes['width'];
        }
        if (!empty($attributes['style']['layout']['contentSize'])) {
            $styles['max-width'] = $attributes['style']['layout']['contentSize'];
        }
        if (!empty($attributes['style']['layout']['wideSize'])) {
            $styles['max-width'] = $attributes['style']['layout']['wideSize'];
        }

        // Border styles
        $border = isset($attributes['style']['border']) ? $attributes['style']['border'] : [];
        if (!empty($border['color'])) $styles['border-color'] = $border['color'];
        if (!empty($border['width'])) {
            if (is_string($border['width'])) {
                $styles['border-width'] = $border['width'];
            }
        }
        if (!empty($border['style'])) $styles['border-style'] = $border['style'];
        if (!empty($border['radius'])) {
            if (is_string($border['radius'])) {
                $styles['border-radius'] = $border['radius'];
            }
        }

        return $styles;
    }

    /**
     * Convert styles array to inline style string
     */
    public static function styles_to_string($styles) {
        if (empty($styles)) return '';

        $style_string = [];
        foreach ($styles as $property => $value) {
            if (!empty($value)) {
                $style_string[] = "{$property}: {$value}";
            }
        }

        return implode('; ', $style_string);
    }

    /**
     * Get block wrapper attributes
     */
    public static function get_block_wrapper_attributes($attributes, $additional_classes = '') {
        $classes = self::get_block_classes($attributes, $additional_classes);
        $styles = self::get_inline_styles($attributes);
        $style_string = self::styles_to_string($styles);

        $attrs = [];
        if ($classes) {
            $attrs[] = sprintf('class="%s"', esc_attr($classes));
        }
        if ($style_string) {
            $attrs[] = sprintf('style="%s"', esc_attr($style_string));
        }

        return implode(' ', $attrs);
    }

    /**
     * Sanitize attribute value
     */
    public static function sanitize_attribute($value, $type = 'string') {
        if (empty($value) && $value !== 0) return '';

        switch ($type) {
            case 'string':
                return sanitize_text_field($value);
            case 'html':
                return wp_kses_post($value);
            case 'number':
                return floatval($value);
            case 'int':
                return intval($value);
            case 'boolean':
                return (bool) $value;
            case 'color':
                return sanitize_hex_color($value);
            case 'url':
                return esc_url_raw($value);
            case 'email':
                return sanitize_email($value);
            default:
                return sanitize_text_field($value);
        }
    }
}
