/**
 * Shared helper functions for WeDocs blocks
 *
 * @package WeDocs
 * @since 1.0.0
 */

/**
 * Generate CSS styles object from block attributes
 *
 * @param {Object} attributes Block attributes
 * @param {Object} options Options for style generation
 * @returns {Object} CSS styles object
 */
export const generateBlockStyles = (attributes, options = {}) => {
	const styles = {};

	// Background styles
	if (attributes.backgroundType === 'classic' && attributes.backgroundColor) {
		styles.backgroundColor = attributes.backgroundColor;
	}

	if (attributes.backgroundType === 'gradient' && attributes.backgroundGradient) {
		styles.backgroundImage = attributes.backgroundGradient;
	}

	if (attributes.backgroundImage?.url) {
		styles.backgroundImage = `url(${attributes.backgroundImage.url})`;
		styles.backgroundSize = 'cover';
		styles.backgroundPosition = 'center';
	}

	// Spacing
	if (attributes.padding) {
		const p = attributes.padding;
		styles.padding = `${p.top} ${p.right} ${p.bottom} ${p.left}`;
	}

	if (attributes.margin) {
		const m = attributes.margin;
		styles.margin = `${m.top} ${m.right} ${m.bottom} ${m.left}`;
	}

	// Border
	if (attributes.borderStyle && attributes.borderStyle !== 'none') {
		styles.borderStyle = attributes.borderStyle;

		if (attributes.borderWidth) {
			const bw = attributes.borderWidth;
			styles.borderWidth = `${bw.top} ${bw.right} ${bw.bottom} ${bw.left}`;
		}

		if (attributes.borderColor) {
			styles.borderColor = attributes.borderColor;
		}
	}

	if (attributes.borderRadius) {
		styles.borderRadius = attributes.borderRadius;
	}

	// Box shadow
	if (attributes.boxShadow?.enabled) {
		const bs = attributes.boxShadow;
		styles.boxShadow = `${bs.horizontal} ${bs.vertical} ${bs.blur} ${bs.spread} ${bs.color}`;
	}

	return styles;
};

/**
 * Generate typography styles from typography attributes
 *
 * @param {Object} typography Typography attributes
 * @returns {Object} CSS typography styles
 */
export const generateTypographyStyles = (typography) => {
	const styles = {};

	if (typography.fontFamily && typography.fontFamily !== 'default') {
		styles.fontFamily = typography.fontFamily;
	}

	if (typography.fontSize) {
		styles.fontSize = typography.fontSize;
	}

	if (typography.fontWeight) {
		styles.fontWeight = typography.fontWeight;
	}

	if (typography.fontStyle) {
		styles.fontStyle = typography.fontStyle;
	}

	if (typography.lineHeight && typography.lineHeight !== 'normal') {
		styles.lineHeight = typography.lineHeight;
	}

	if (typography.letterSpacing && typography.letterSpacing !== 'normal') {
		styles.letterSpacing = typography.letterSpacing;
	}

	if (typography.textTransform && typography.textTransform !== 'none') {
		styles.textTransform = typography.textTransform;
	}

	if (typography.textDecoration && typography.textDecoration !== 'none') {
		styles.textDecoration = typography.textDecoration;
	}

	return styles;
};

/**
 * Generate spacing styles from spacing attributes
 *
 * @param {Object} padding Padding attributes
 * @param {Object} margin Margin attributes
 * @returns {Object} CSS spacing styles
 */
export const generateSpacingStyles = (padding, margin) => {
	const styles = {};

	if (padding) {
		styles.padding = `${padding.top || '0px'} ${padding.right || '0px'} ${padding.bottom || '0px'} ${padding.left || '0px'}`;
	}

	if (margin) {
		styles.margin = `${margin.top || '0px'} ${margin.right || '0px'} ${margin.bottom || '0px'} ${margin.left || '0px'}`;
	}

	return styles;
};

/**
 * Generate complete element styles
 *
 * @param {Object} options Style options
 * @param {string} options.color Base color
 * @param {Object} options.typography Typography attributes
 * @param {Object} options.spacing Spacing attributes
 * @param {Object} options.border Border attributes
 * @param {Object} options.shadow Shadow attributes
 * @param {Object} options.background Background attributes
 * @param {Object} options.custom Custom CSS properties
 * @returns {Object} Complete CSS styles object
 */
export const generateElementStyles = (options = {}) => {
	let styles = {};

	// Base color
	if (options.color) {
		styles.color = options.color;
	}

	// Typography
	if (options.typography) {
		styles = { ...styles, ...generateTypographyStyles(options.typography) };
	}

	// Spacing
	if (options.spacing) {
		const spacingStyles = generateSpacingStyles(
			options.spacing.padding,
			options.spacing.margin
		);
		styles = { ...styles, ...spacingStyles };
	}

	// Border
	if (options.border) {
		const border = options.border;
		if (border.style && border.style !== 'none') {
			styles.borderStyle = border.style;

			if (border.width) {
				const bw = border.width;
				styles.borderWidth = `${bw.top || '1px'} ${bw.right || '1px'} ${bw.bottom || '1px'} ${bw.left || '1px'}`;
			}

			if (border.color) {
				styles.borderColor = border.color;
			}
		}

		if (border.radius) {
			styles.borderRadius = border.radius;
		}
	}

	// Shadow
	if (options.shadow?.enabled) {
		const bs = options.shadow;
		styles.boxShadow = `${bs.horizontal || '0px'} ${bs.vertical || '2px'} ${bs.blur || '4px'} ${bs.spread || '0px'} ${bs.color || 'rgba(0,0,0,0.1)'}`;
	}

	// Background
	if (options.background) {
		const bg = options.background;
		if (bg.type === 'classic' && bg.color) {
			styles.backgroundColor = bg.color;
		}

		if (bg.type === 'gradient' && bg.gradient) {
			styles.backgroundImage = bg.gradient;
		}

		if (bg.image?.url) {
			styles.backgroundImage = `url(${bg.image.url})`;
			styles.backgroundSize = 'cover';
			styles.backgroundPosition = 'center';
		}
	}

	// Custom styles
	if (options.custom) {
		styles = { ...styles, ...options.custom };
	}

	return styles;
};

/**
 * Debounce function for performance optimization
 *
 * @param {Function} func Function to debounce
 * @param {number} wait Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
};

/**
 * Validate CSS unit values
 *
 * @param {string} value CSS value to validate
 * @param {Array} allowedUnits Array of allowed units
 * @returns {boolean} Whether the value is valid
 */
export const isValidCSSValue = (value, allowedUnits = ['px', 'em', 'rem', '%', 'vh', 'vw']) => {
	if (!value) return false;

	// Allow special values
	const specialValues = ['auto', 'inherit', 'initial', 'unset', 'none', 'normal'];
	if (specialValues.includes(value)) return true;

	// Check if value matches number + unit pattern
	const regex = /^(-?\d*\.?\d+)([a-z%]+)?$/i;
	const matches = value.match(regex);

	if (matches) {
		const unit = matches[2] || 'px';
		return allowedUnits.includes(unit);
	}

	return false;
};

/**
 * Convert rem/em values to px for calculations
 *
 * @param {string} value CSS value with unit
 * @param {number} baseFontSize Base font size in px (default: 16)
 * @returns {number} Value in pixels
 */
export const convertToPx = (value, baseFontSize = 16) => {
	if (!value) return 0;

	const regex = /^(-?\d*\.?\d+)([a-z%]+)?$/i;
	const matches = value.match(regex);

	if (matches) {
		const number = parseFloat(matches[1]);
		const unit = matches[2] || 'px';

		switch (unit) {
			case 'rem':
				return number * baseFontSize;
			case 'em':
				return number * baseFontSize; // Simplified, actual em depends on parent
			case 'px':
				return number;
			case '%':
				return number; // Percentage values depend on context
			default:
				return number;
		}
	}

	return 0;
};

/**
 * Generate CSS custom properties for theming
 *
 * @param {Object} attributes Block attributes
 * @param {string} prefix Prefix for custom properties
 * @returns {Object} CSS custom properties object
 */
export const generateCustomProperties = (attributes, prefix = '--wedocs') => {
	const customProps = {};

	// Color properties
	if (attributes.nameColor) {
		customProps[`${prefix}-name-color`] = attributes.nameColor;
	}

	if (attributes.nameHoverColor) {
		customProps[`${prefix}-name-hover-color`] = attributes.nameHoverColor;
	}

	if (attributes.contributorTitleColor) {
		customProps[`${prefix}-title-color`] = attributes.contributorTitleColor;
	}

	if (attributes.contributorTitleHoverColor) {
		customProps[`${prefix}-title-hover-color`] = attributes.contributorTitleHoverColor;
	}

	if (attributes.dateColor) {
		customProps[`${prefix}-date-color`] = attributes.dateColor;
	}

	// Spacing properties
	if (attributes.contributorGap) {
		customProps[`${prefix}-gap`] = attributes.contributorGap;
	}

	if (attributes.avatarSize) {
		customProps[`${prefix}-avatar-size`] = attributes.avatarSize;
	}

	return customProps;
};

/**
 * Merge class names utility
 *
 * @param {...string} classes Class names to merge
 * @returns {string} Merged class names
 */
export const classNames = (...classes) => {
	return classes.filter(Boolean).join(' ');
};

/**
 * Get responsive breakpoints
 *
 * @returns {Object} Breakpoint values
 */
export const getBreakpoints = () => ({
	mobile: 480,
	tablet: 768,
	desktop: 1024,
	wide: 1200
});

/**
 * Check if current viewport matches breakpoint
 *
 * @param {string} breakpoint Breakpoint name
 * @returns {boolean} Whether viewport matches breakpoint
 */
export const isBreakpoint = (breakpoint) => {
	const breakpoints = getBreakpoints();
	const width = window.innerWidth;

	switch (breakpoint) {
		case 'mobile':
			return width <= breakpoints.mobile;
		case 'tablet':
			return width > breakpoints.mobile && width <= breakpoints.tablet;
		case 'desktop':
			return width > breakpoints.tablet && width <= breakpoints.desktop;
		case 'wide':
			return width > breakpoints.desktop;
		default:
			return false;
	}
};