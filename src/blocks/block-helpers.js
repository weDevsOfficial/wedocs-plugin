/**
 * Block Helpers - Centralized CSS Generation and Settings Management
 *
 * Provides consistent CSS generation and settings handling for all weDocs blocks.
 * This ensures all blocks follow the same patterns and logic.
 */

/**
 * Generate CSS from block supports and attributes
 *
 * @param {Object} attributes - Block attributes
 * @param {string} blockClass - The unique block class name
 * @param {Object} options - Additional options for CSS generation
 * @returns {string} Generated CSS string
 */
export function generateBlockCSS(attributes, blockClass, options = {}) {
	const styles = [];
	const selector = options.selector || `.${blockClass}`;

	// Color Styles
	if (attributes.style?.color || attributes.backgroundColor || attributes.textColor) {
		const colorStyles = generateColorStyles(attributes);
		if (colorStyles) {
			styles.push(`${selector} { ${colorStyles} }`);
		}
	}

	// Typography Styles
	if (attributes.style?.typography || attributes.fontSize || attributes.fontFamily) {
		const typographyStyles = generateTypographyStyles(attributes);
		if (typographyStyles) {
			styles.push(`${selector} { ${typographyStyles} }`);
		}
	}

	// Spacing Styles
	if (attributes.style?.spacing) {
		const spacingStyles = generateSpacingStyles(attributes);
		if (spacingStyles) {
			styles.push(`${selector} { ${spacingStyles} }`);
		}
	}

	// Dimensions Styles
	if (attributes.style?.dimensions) {
		const dimensionStyles = generateDimensionStyles(attributes);
		if (dimensionStyles) {
			styles.push(`${selector} { ${dimensionStyles} }`);
		}
	}

	// Border Styles
	if (attributes.style?.border || attributes.borderColor) {
		const borderStyles = generateBorderStyles(attributes);
		if (borderStyles) {
			styles.push(`${selector} { ${borderStyles} }`);
		}
	}

	return styles.join('\n');
}

/**
 * Generate color styles from attributes
 */
function generateColorStyles(attributes) {
	const styles = [];

	// Background color
	if (attributes.backgroundColor) {
		styles.push(`background-color: var(--wp--preset--color--${attributes.backgroundColor})`);
	} else if (attributes.style?.color?.background) {
		styles.push(`background-color: ${attributes.style.color.background}`);
	}

	// Text color
	if (attributes.textColor) {
		styles.push(`color: var(--wp--preset--color--${attributes.textColor})`);
	} else if (attributes.style?.color?.text) {
		styles.push(`color: ${attributes.style.color.text}`);
	}

	// Gradient
	if (attributes.gradient) {
		styles.push(`background: var(--wp--preset--gradient--${attributes.gradient})`);
	} else if (attributes.style?.color?.gradient) {
		styles.push(`background: ${attributes.style.color.gradient}`);
	}

	// Link color
	if (attributes.style?.elements?.link?.color?.text) {
		// This would need a separate selector for links
		// We'll handle this in the main function if needed
	}

	return styles.join('; ');
}

/**
 * Generate typography styles from attributes
 */
function generateTypographyStyles(attributes) {
	const styles = [];

	// Font size
	if (attributes.fontSize) {
		styles.push(`font-size: var(--wp--preset--font-size--${attributes.fontSize})`);
	} else if (attributes.style?.typography?.fontSize) {
		styles.push(`font-size: ${attributes.style.typography.fontSize}`);
	}

	// Font family
	if (attributes.fontFamily) {
		styles.push(`font-family: var(--wp--preset--font-family--${attributes.fontFamily})`);
	} else if (attributes.style?.typography?.fontFamily) {
		styles.push(`font-family: ${attributes.style.typography.fontFamily}`);
	}

	// Font weight
	if (attributes.style?.typography?.fontWeight) {
		styles.push(`font-weight: ${attributes.style.typography.fontWeight}`);
	}

	// Font style
	if (attributes.style?.typography?.fontStyle) {
		styles.push(`font-style: ${attributes.style.typography.fontStyle}`);
	}

	// Line height
	if (attributes.style?.typography?.lineHeight) {
		styles.push(`line-height: ${attributes.style.typography.lineHeight}`);
	}

	// Letter spacing
	if (attributes.style?.typography?.letterSpacing) {
		styles.push(`letter-spacing: ${attributes.style.typography.letterSpacing}`);
	}

	// Text transform
	if (attributes.style?.typography?.textTransform) {
		styles.push(`text-transform: ${attributes.style.typography.textTransform}`);
	}

	// Text decoration
	if (attributes.style?.typography?.textDecoration) {
		styles.push(`text-decoration: ${attributes.style.typography.textDecoration}`);
	}

	return styles.join('; ');
}

/**
 * Generate spacing styles from attributes
 */
function generateSpacingStyles(attributes) {
	const styles = [];
	const spacing = attributes.style?.spacing;

	if (!spacing) return '';

	// Margin
	if (spacing.margin) {
		if (typeof spacing.margin === 'string') {
			styles.push(`margin: ${spacing.margin}`);
		} else {
			if (spacing.margin.top) styles.push(`margin-top: ${spacing.margin.top}`);
			if (spacing.margin.right) styles.push(`margin-right: ${spacing.margin.right}`);
			if (spacing.margin.bottom) styles.push(`margin-bottom: ${spacing.margin.bottom}`);
			if (spacing.margin.left) styles.push(`margin-left: ${spacing.margin.left}`);
		}
	}

	// Padding
	if (spacing.padding) {
		if (typeof spacing.padding === 'string') {
			styles.push(`padding: ${spacing.padding}`);
		} else {
			if (spacing.padding.top) styles.push(`padding-top: ${spacing.padding.top}`);
			if (spacing.padding.right) styles.push(`padding-right: ${spacing.padding.right}`);
			if (spacing.padding.bottom) styles.push(`padding-bottom: ${spacing.padding.bottom}`);
			if (spacing.padding.left) styles.push(`padding-left: ${spacing.padding.left}`);
		}
	}

	// Block gap (for container blocks)
	if (spacing.blockGap) {
		styles.push(`gap: ${spacing.blockGap}`);
	}

	return styles.join('; ');
}

/**
 * Generate dimension styles from attributes
 */
function generateDimensionStyles(attributes) {
	const styles = [];
	const dimensions = attributes.style?.dimensions;

	if (!dimensions) return '';

	// Min height
	if (dimensions.minHeight) {
		styles.push(`min-height: ${dimensions.minHeight}`);
	}

	// Width (if custom)
	if (dimensions.width) {
		styles.push(`width: ${dimensions.width}`);
	}

	// Max width
	if (dimensions.maxWidth) {
		styles.push(`max-width: ${dimensions.maxWidth}`);
	}

	// Aspect ratio
	if (dimensions.aspectRatio) {
		styles.push(`aspect-ratio: ${dimensions.aspectRatio}`);
	}

	return styles.join('; ');
}

/**
 * Generate border styles from attributes
 */
function generateBorderStyles(attributes) {
	const styles = [];
	const border = attributes.style?.border;

	if (!border && !attributes.borderColor) return '';

	// Border color
	if (attributes.borderColor) {
		styles.push(`border-color: var(--wp--preset--color--${attributes.borderColor})`);
	} else if (border?.color) {
		styles.push(`border-color: ${border.color}`);
	}

	// Border width
	if (border?.width) {
		if (typeof border.width === 'string') {
			styles.push(`border-width: ${border.width}`);
		} else {
			if (border.width.top) styles.push(`border-top-width: ${border.width.top}`);
			if (border.width.right) styles.push(`border-right-width: ${border.width.right}`);
			if (border.width.bottom) styles.push(`border-bottom-width: ${border.width.bottom}`);
			if (border.width.left) styles.push(`border-left-width: ${border.width.left}`);
		}
	}

	// Border style
	if (border?.style) {
		styles.push(`border-style: ${border.style}`);
	}

	// Border radius
	if (border?.radius) {
		if (typeof border.radius === 'string') {
			styles.push(`border-radius: ${border.radius}`);
		} else {
			if (border.radius.topLeft) styles.push(`border-top-left-radius: ${border.radius.topLeft}`);
			if (border.radius.topRight) styles.push(`border-top-right-radius: ${border.radius.topRight}`);
			if (border.radius.bottomLeft) styles.push(`border-bottom-left-radius: ${border.radius.bottomLeft}`);
			if (border.radius.bottomRight) styles.push(`border-bottom-right-radius: ${border.radius.bottomRight}`);
		}
	}

	return styles.join('; ');
}

/**
 * Get block alignment class
 */
export function getAlignmentClass(align) {
	if (!align) return '';
	return `align${align}`;
}

/**
 * Get block wrapper classes
 */
export function getBlockClasses(attributes, baseClass) {
	const classes = [baseClass];

	// Add alignment class
	if (attributes.align) {
		classes.push(getAlignmentClass(attributes.align));
	}

	// Add color classes
	if (attributes.backgroundColor) {
		classes.push(`has-${attributes.backgroundColor}-background-color`);
		classes.push('has-background');
	}

	if (attributes.textColor) {
		classes.push(`has-${attributes.textColor}-color`);
		classes.push('has-text-color');
	}

	if (attributes.gradient) {
		classes.push(`has-${attributes.gradient}-gradient-background`);
		classes.push('has-background');
	}

	// Add font size class
	if (attributes.fontSize) {
		classes.push(`has-${attributes.fontSize}-font-size`);
	}

	// Add font family class
	if (attributes.fontFamily) {
		classes.push(`has-${attributes.fontFamily}-font-family`);
	}

	// Add custom className if provided
	if (attributes.className) {
		classes.push(attributes.className);
	}

	return classes.filter(Boolean).join(' ');
}

/**
 * Get inline styles object from attributes
 */
export function getInlineStyles(attributes) {
	const styles = {};

	// Color styles
	if (attributes.style?.color?.background) {
		styles.backgroundColor = attributes.style.color.background;
	}
	if (attributes.style?.color?.text) {
		styles.color = attributes.style.color.text;
	}
	if (attributes.style?.color?.gradient) {
		styles.background = attributes.style.color.gradient;
	}

	// Typography styles
	if (attributes.style?.typography?.fontSize) {
		styles.fontSize = attributes.style.typography.fontSize;
	}
	if (attributes.style?.typography?.fontFamily) {
		styles.fontFamily = attributes.style.typography.fontFamily;
	}
	if (attributes.style?.typography?.fontWeight) {
		styles.fontWeight = attributes.style.typography.fontWeight;
	}
	if (attributes.style?.typography?.fontStyle) {
		styles.fontStyle = attributes.style.typography.fontStyle;
	}
	if (attributes.style?.typography?.lineHeight) {
		styles.lineHeight = attributes.style.typography.lineHeight;
	}
	if (attributes.style?.typography?.letterSpacing) {
		styles.letterSpacing = attributes.style.typography.letterSpacing;
	}
	if (attributes.style?.typography?.textTransform) {
		styles.textTransform = attributes.style.typography.textTransform;
	}
	if (attributes.style?.typography?.textDecoration) {
		styles.textDecoration = attributes.style.typography.textDecoration;
	}

	// Spacing styles
	const spacing = attributes.style?.spacing;
	if (spacing?.margin) {
		if (typeof spacing.margin === 'string') {
			styles.margin = spacing.margin;
		} else {
			if (spacing.margin.top) styles.marginTop = spacing.margin.top;
			if (spacing.margin.right) styles.marginRight = spacing.margin.right;
			if (spacing.margin.bottom) styles.marginBottom = spacing.margin.bottom;
			if (spacing.margin.left) styles.marginLeft = spacing.margin.left;
		}
	}
	if (spacing?.padding) {
		if (typeof spacing.padding === 'string') {
			styles.padding = spacing.padding;
		} else {
			if (spacing.padding.top) styles.paddingTop = spacing.padding.top;
			if (spacing.padding.right) styles.paddingRight = spacing.padding.right;
			if (spacing.padding.bottom) styles.paddingBottom = spacing.padding.bottom;
			if (spacing.padding.left) styles.paddingLeft = spacing.padding.left;
		}
	}
	if (spacing?.blockGap) {
		styles.gap = spacing.blockGap;
	}

	// Dimension styles
	const dimensions = attributes.style?.dimensions;
	if (dimensions?.minHeight) {
		styles.minHeight = dimensions.minHeight;
	}
	if (dimensions?.width) {
		styles.width = dimensions.width;
	}
	if (dimensions?.maxWidth) {
		styles.maxWidth = dimensions.maxWidth;
	}
	if (dimensions?.aspectRatio) {
		styles.aspectRatio = dimensions.aspectRatio;
	}

	// Width from layout settings (content width, wide width)
	if (attributes.width) {
		styles.width = attributes.width;
	}
	if (attributes.style?.layout?.contentSize) {
		styles.maxWidth = attributes.style.layout.contentSize;
	}
	if (attributes.style?.layout?.wideSize) {
		styles.maxWidth = attributes.style.layout.wideSize;
	}

	// Border styles
	const border = attributes.style?.border;
	if (border?.color) {
		styles.borderColor = border.color;
	}
	if (border?.width) {
		if (typeof border.width === 'string') {
			styles.borderWidth = border.width;
		} else {
			if (border.width.top) styles.borderTopWidth = border.width.top;
			if (border.width.right) styles.borderRightWidth = border.width.right;
			if (border.width.bottom) styles.borderBottomWidth = border.width.bottom;
			if (border.width.left) styles.borderLeftWidth = border.width.left;
		}
	}
	if (border?.style) {
		styles.borderStyle = border.style;
	}
	if (border?.radius) {
		if (typeof border.radius === 'string') {
			styles.borderRadius = border.radius;
		} else {
			if (border.radius.topLeft) styles.borderTopLeftRadius = border.radius.topLeft;
			if (border.radius.topRight) styles.borderTopRightRadius = border.radius.topRight;
			if (border.radius.bottomLeft) styles.borderBottomLeftRadius = border.radius.bottomLeft;
			if (border.radius.bottomRight) styles.borderBottomRightRadius = border.radius.bottomRight;
		}
	}

	return styles;
}

/**
 * Merge default attributes with user attributes
 */
export function mergeAttributes(defaultAttrs, userAttrs) {
	return {
		...defaultAttrs,
		...userAttrs,
		style: {
			...defaultAttrs.style,
			...userAttrs.style,
			color: {
				...defaultAttrs.style?.color,
				...userAttrs.style?.color
			},
			typography: {
				...defaultAttrs.style?.typography,
				...userAttrs.style?.typography
			},
			spacing: {
				...defaultAttrs.style?.spacing,
				...userAttrs.style?.spacing
			},
			dimensions: {
				...defaultAttrs.style?.dimensions,
				...userAttrs.style?.dimensions
			},
			border: {
				...defaultAttrs.style?.border,
				...userAttrs.style?.border
			}
		}
	};
}

/**
 * Generate block wrapper props for use in save/render
 */
export function useBlockProps(attributes, additionalProps = {}) {
	return {
		className: getBlockClasses(attributes, additionalProps.className || ''),
		style: getInlineStyles(attributes),
		...additionalProps
	};
}

/**
 * Sanitize attribute value
 */
export function sanitizeAttribute(value, type = 'string') {
	if (value === undefined || value === null) return '';

	switch (type) {
		case 'string':
			return String(value).trim();
		case 'number':
			return Number(value) || 0;
		case 'boolean':
			return Boolean(value);
		case 'color':
			// Basic color validation
			return /^#[0-9A-F]{6}$/i.test(value) || /^#[0-9A-F]{3}$/i.test(value) || /^rgb/.test(value) ? value : '';
		case 'url':
			try {
				new URL(value);
				return value;
			} catch {
				return '';
			}
		default:
			return value;
	}
}

/**
 * Get responsive value based on device
 */
export function getResponsiveValue(values, device = 'desktop') {
	if (!values || typeof values !== 'object') return values;

	// Check if it's a responsive object
	if (values[device]) {
		return values[device];
	}

	// Fallback to desktop or first available
	return values.desktop || values.mobile || values.tablet || Object.values(values)[0];
}

/**
 * Format spacing value (ensures unit)
 */
export function formatSpacing(value) {
	if (!value) return '';
	if (typeof value === 'number') return `${value}px`;
	if (typeof value === 'string' && /^\d+$/.test(value)) return `${value}px`;
	return value;
}

/**
 * Parse spacing shorthand (e.g., "10px 20px" to object)
 */
export function parseSpacing(value) {
	if (!value) return null;
	if (typeof value === 'object') return value;

	const parts = value.split(' ').filter(Boolean);

	if (parts.length === 1) {
		return { top: parts[0], right: parts[0], bottom: parts[0], left: parts[0] };
	} else if (parts.length === 2) {
		return { top: parts[0], right: parts[1], bottom: parts[0], left: parts[1] };
	} else if (parts.length === 3) {
		return { top: parts[0], right: parts[1], bottom: parts[2], left: parts[1] };
	} else if (parts.length === 4) {
		return { top: parts[0], right: parts[1], bottom: parts[2], left: parts[3] };
	}

	return null;
}

export default {
	generateBlockCSS,
	getAlignmentClass,
	getBlockClasses,
	getInlineStyles,
	mergeAttributes,
	useBlockProps,
	sanitizeAttribute,
	getResponsiveValue,
	formatSpacing,
	parseSpacing
};
