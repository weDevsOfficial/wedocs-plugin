/**
 * Block Style Helpers
 * Helper functions to generate dynamic CSS from block attributes
 */

/**
 * Generate CSS variable string from attributes
 */
export const generateCSSVariables = (attributes, prefix = '') => {
    const cssVars = {};

    Object.keys(attributes).forEach(key => {
        const value = attributes[key];

        if (value === null || value === undefined || value === '') {
            return;
        }

        // Handle object attributes (padding, margin, border, etc.)
        if (typeof value === 'object' && !Array.isArray(value)) {
            Object.keys(value).forEach(subKey => {
                if (value[subKey]) {
                    const varName = `--${prefix}${key}-${subKey}`;
                    cssVars[varName] = value[subKey];
                }
            });
        }
        // Handle simple values
        else {
            const varName = `--${prefix}${key}`;
            cssVars[varName] = value;
        }
    });

    return cssVars;
};

/**
 * Generate inline style object from attributes
 */
export const generateInlineStyles = (attributes) => {
    const styles = {};

    // Background Color
    if (attributes.backgroundColor) {
        styles.backgroundColor = attributes.backgroundColor;
    }

    // Text Color
    if (attributes.textColor || attributes.color) {
        styles.color = attributes.textColor || attributes.color;
    }

    // Padding
    if (attributes.padding) {
        if (typeof attributes.padding === 'object') {
            styles.padding = `${attributes.padding.top || '0'} ${attributes.padding.right || '0'} ${attributes.padding.bottom || '0'} ${attributes.padding.left || '0'}`;
        } else {
            styles.padding = attributes.padding;
        }
    }

    // Margin
    if (attributes.margin) {
        if (typeof attributes.margin === 'object') {
            styles.margin = `${attributes.margin.top || '0'} ${attributes.margin.right || '0'} ${attributes.margin.bottom || '0'} ${attributes.margin.left || '0'}`;
        } else {
            styles.margin = attributes.margin;
        }
    }

    // Border
    if (attributes.border) {
        if (typeof attributes.border === 'object') {
            if (attributes.border.style) styles.borderStyle = attributes.border.style;
            if (attributes.border.width) styles.borderWidth = attributes.border.width;
            if (attributes.border.color) styles.borderColor = attributes.border.color;
        }
    }

    // Border Radius
    if (attributes.borderRadius) {
        if (typeof attributes.borderRadius === 'object') {
            styles.borderRadius = `${attributes.borderRadius.top || '0'} ${attributes.borderRadius.right || '0'} ${attributes.borderRadius.bottom || '0'} ${attributes.borderRadius.left || '0'}`;
        } else {
            styles.borderRadius = attributes.borderRadius;
        }
    }

    // Width & Height
    if (attributes.width) styles.width = attributes.width;
    if (attributes.height) styles.height = attributes.height;

    // Font Size
    if (attributes.fontSize) styles.fontSize = attributes.fontSize;

    // Font Weight
    if (attributes.fontWeight) styles.fontWeight = attributes.fontWeight;

    // Line Height
    if (attributes.lineHeight) styles.lineHeight = attributes.lineHeight;

    // Letter Spacing
    if (attributes.letterSpacing) styles.letterSpacing = attributes.letterSpacing;

    // Text Align
    if (attributes.textAlign) styles.textAlign = attributes.textAlign;

    // Box Shadow
    if (attributes.boxShadow) styles.boxShadow = attributes.boxShadow;

    // Display
    if (attributes.display) styles.display = attributes.display;

    // Flex properties
    if (attributes.alignItems) styles.alignItems = attributes.alignItems;
    if (attributes.justifyContent) styles.justifyContent = attributes.justifyContent;
    if (attributes.flexDirection) styles.flexDirection = attributes.flexDirection;
    if (attributes.gap) styles.gap = attributes.gap;

    // Opacity
    if (attributes.opacity) styles.opacity = attributes.opacity;

    // Transform
    if (attributes.transform) styles.transform = attributes.transform;

    // Transition
    if (attributes.transition) styles.transition = attributes.transition;

    return styles;
};

/**
 * Generate hover state CSS
 */
export const generateHoverCSS = (selector, hoverAttributes) => {
    const rules = [];

    if (hoverAttributes.hoverBackgroundColor || hoverAttributes.backgroundColorHover) {
        rules.push(`background-color: ${hoverAttributes.hoverBackgroundColor || hoverAttributes.backgroundColorHover} !important;`);
    }

    if (hoverAttributes.hoverTextColor || hoverAttributes.textColorHover) {
        rules.push(`color: ${hoverAttributes.hoverTextColor || hoverAttributes.textColorHover} !important;`);
    }

    if (hoverAttributes.hoverBorderColor || hoverAttributes.borderColorHover) {
        rules.push(`border-color: ${hoverAttributes.hoverBorderColor || hoverAttributes.borderColorHover} !important;`);
    }

    if (hoverAttributes.hoverBoxShadow || hoverAttributes.boxShadowHover) {
        rules.push(`box-shadow: ${hoverAttributes.hoverBoxShadow || hoverAttributes.boxShadowHover} !important;`);
    }

    if (hoverAttributes.hoverOpacity !== undefined) {
        rules.push(`opacity: ${hoverAttributes.hoverOpacity} !important;`);
    }

    if (hoverAttributes.hoverTransform) {
        rules.push(`transform: ${hoverAttributes.hoverTransform} !important;`);
    }

    if (hoverAttributes.hoverScale) {
        rules.push(`transform: scale(${hoverAttributes.hoverScale}) !important;`);
    }

    if (rules.length === 0) return '';

    return `${selector}:hover { ${rules.join(' ')} }`;
};

/**
 * Generate responsive CSS
 */
export const generateResponsiveCSS = (selector, attributes) => {
    let css = '';

    // Desktop styles (default, already applied)

    // Tablet styles
    if (attributes.tabletFontSize || attributes.tabletPadding || attributes.tabletMargin) {
        const tabletRules = [];
        if (attributes.tabletFontSize) tabletRules.push(`font-size: ${attributes.tabletFontSize};`);
        if (attributes.tabletPadding) {
            if (typeof attributes.tabletPadding === 'object') {
                tabletRules.push(`padding: ${attributes.tabletPadding.top} ${attributes.tabletPadding.right} ${attributes.tabletPadding.bottom} ${attributes.tabletPadding.left};`);
            }
        }
        if (tabletRules.length > 0) {
            css += `@media (max-width: 1024px) { ${selector} { ${tabletRules.join(' ')} } }`;
        }
    }

    // Mobile styles
    if (attributes.mobileFontSize || attributes.mobilePadding || attributes.mobileMargin) {
        const mobileRules = [];
        if (attributes.mobileFontSize) mobileRules.push(`font-size: ${attributes.mobileFontSize};`);
        if (attributes.mobilePadding) {
            if (typeof attributes.mobilePadding === 'object') {
                mobileRules.push(`padding: ${attributes.mobilePadding.top} ${attributes.mobilePadding.right} ${attributes.mobilePadding.bottom} ${attributes.mobilePadding.left};`);
            }
        }
        if (mobileRules.length > 0) {
            css += `@media (max-width: 768px) { ${selector} { ${mobileRules.join(' ')} } }`;
        }
    }

    return css;
};

/**
 * Inject dynamic styles into the document
 */
export const injectDynamicStyles = (blockId, css) => {
    if (!blockId || !css) return;

    // Remove existing style tag if present
    const existingStyle = document.getElementById(`dynamic-styles-${blockId}`);
    if (existingStyle) {
        existingStyle.remove();
    }

    // Create and inject new style tag
    const styleTag = document.createElement('style');
    styleTag.id = `dynamic-styles-${blockId}`;
    styleTag.textContent = css;
    document.head.appendChild(styleTag);
};

/**
 * Generate complete block styles including hover and responsive
 */
export const generateCompleteBlockStyles = (blockId, attributes, selector) => {
    let css = '';

    // Base styles
    const baseStyles = generateInlineStyles(attributes);
    if (Object.keys(baseStyles).length > 0) {
        const styleRules = Object.entries(baseStyles)
            .map(([key, value]) => {
                // Convert camelCase to kebab-case
                const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
                return `${cssKey}: ${value};`;
            })
            .join(' ');
        css += `${selector} { ${styleRules} }`;
    }

    // Hover styles
    const hoverCSS = generateHoverCSS(selector, attributes);
    if (hoverCSS) {
        css += hoverCSS;
    }

    // Responsive styles
    const responsiveCSS = generateResponsiveCSS(selector, attributes);
    if (responsiveCSS) {
        css += responsiveCSS;
    }

    return css;
};

/**
 * Convert spacing object to CSS string
 */
export const spacingObjectToCSS = (spacing) => {
    if (!spacing) return '';
    if (typeof spacing === 'string') return spacing;
    if (typeof spacing === 'object') {
        return `${spacing.top || '0'} ${spacing.right || '0'} ${spacing.bottom || '0'} ${spacing.left || '0'}`;
    }
    return '';
};

/**
 * Get transition string
 */
export const getTransitionString = (duration = '300ms', timingFunction = 'ease', property = 'all') => {
    return `${property} ${duration} ${timingFunction}`;
};

export default {
    generateCSSVariables,
    generateInlineStyles,
    generateHoverCSS,
    generateResponsiveCSS,
    injectDynamicStyles,
    generateCompleteBlockStyles,
    spacingObjectToCSS,
    getTransitionString
};
