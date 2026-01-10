/**
 * Common Block Supports Configuration
 *
 * Reusable support configurations for consistent block design standards across all blocks.
 * Import and use these in block.json files to maintain consistency.
 */

/**
 * Full design standards support object
 * Includes all common design controls: color, typography, spacing, border, dimensions, layout, and alignment
 */
export const fullDesignSupports = {
	html: false,
	anchor: true,
	align: ["wide", "full"],
	alignWide: true,
	color: {
		background: true,
		text: true,
		link: true,
		gradients: true,
		palette: true,
		__experimentalDuotone: true,
		__experimentalDefaultControls: {
			background: true,
			text: true,
			link: true
		}
	},
	typography: {
		fontSize: true,
		lineHeight: true,
		fontFamily: true,
		fontWeight: true,
		fontStyle: true,
		textTransform: true,
		textDecoration: true,
		letterSpacing: true,
		__experimentalFontFamily: true,
		__experimentalFontWeight: true,
		__experimentalFontStyle: true,
		__experimentalTextTransform: true,
		__experimentalTextDecoration: true,
		__experimentalLetterSpacing: true,
		__experimentalDefaultControls: {
			fontSize: true,
			lineHeight: true,
			fontWeight: true
		}
	},
	spacing: {
		margin: true,
		padding: true,
		blockGap: true,
		__experimentalDefaultControls: {
			padding: true,
			margin: true,
			blockGap: true
		}
	},
	dimensions: {
		minHeight: true,
		aspectRatio: true,
		__experimentalDefaultControls: {
			minHeight: true,
			aspectRatio: false
		}
	},
	border: {
		color: true,
		radius: true,
		style: true,
		width: true,
		__experimentalDefaultControls: {
			color: true,
			radius: true,
			style: true,
			width: true
		}
	},
	__experimentalBorder: {
		color: true,
		radius: true,
		style: true,
		width: true,
		__experimentalDefaultControls: {
			color: true,
			radius: true
		}
	},
	layout: {
		allowEditing: true,
		allowInheriting: true,
		allowSwitching: true,
		allowVerticalAlignment: true,
		default: {
			type: "constrained"
		}
	}
};

/**
 * Enhanced support object
 * Includes core design controls: color, typography, spacing, border, dimensions, and layout
 */
export const enhancedSupports = {
	html: false,
	anchor: true,
	align: ["wide", "full"],
	alignWide: true,
	color: {
		background: true,
		text: true,
		link: true,
		palette: true,
		__experimentalDefaultControls: {
			background: true,
			text: true,
			link: true
		}
	},
	typography: {
		fontSize: true,
		lineHeight: true,
		__experimentalFontFamily: true,
		__experimentalFontWeight: true,
		__experimentalDefaultControls: {
			fontSize: true
		}
	},
	spacing: {
		margin: true,
		padding: true,
		blockGap: true,
		__experimentalDefaultControls: {
			padding: true,
			margin: true
		}
	},
	dimensions: {
		minHeight: true,
		aspectRatio: true,
		__experimentalDefaultControls: {
			minHeight: true,
			aspectRatio: false
		}
	},
	__experimentalBorder: {
		color: true,
		radius: true,
		style: true,
		width: true,
		__experimentalDefaultControls: {
			color: true,
			radius: true
		}
	},
	layout: {
		allowEditing: true,
		allowInheriting: true,
		allowSwitching: true,
		default: {
			type: "constrained"
		}
	}
};

/**
 * Standard support object for text-based blocks
 * Includes alignment options for left, center, right, wide, and full with dimensions
 */
export const textBlockSupports = {
	html: false,
	anchor: true,
	align: ["left", "center", "right", "wide", "full"],
	alignWide: true,
	color: {
		background: true,
		text: true,
		palette: true,
		__experimentalDefaultControls: {
			text: true,
			background: false
		}
	},
	typography: {
		fontSize: true,
		lineHeight: true,
		__experimentalFontFamily: true,
		__experimentalFontWeight: true,
		__experimentalDefaultControls: {
			fontSize: true
		}
	},
	spacing: {
		margin: true,
		padding: true,
		__experimentalDefaultControls: {
			padding: true,
			margin: true
		}
	},
	dimensions: {
		minHeight: true,
		aspectRatio: true,
		__experimentalDefaultControls: {
			minHeight: true,
			aspectRatio: false
		}
	}
};

/**
 * Widget support object for utility/widget blocks
 * Includes full alignment options with spacing controls
 */
export const widgetSupports = {
	html: false,
	anchor: true,
	align: ["left", "center", "right", "wide", "full"],
	spacing: {
		margin: true,
		padding: true,
		__experimentalDefaultControls: {
			padding: true,
			margin: true
		}
	}
};

/**
 * Minimal support object for single-instance blocks
 * Used for blocks that should only appear once per page
 */
export const singletonSupports = {
	html: false,
	multiple: false
};

/**
 * Color configuration with theme palette
 */
export const colorSupports = {
	background: true,
	text: true,
	link: true,
	palette: true,
	gradients: true,
	__experimentalDuotone: true,
	__experimentalDefaultControls: {
		background: true,
		text: true,
		link: true
	}
};

/**
 * Typography configuration
 */
export const typographySupports = {
	fontSize: true,
	lineHeight: true,
	__experimentalFontFamily: true,
	__experimentalFontWeight: true,
	__experimentalDefaultControls: {
		fontSize: true
	}
};

/**
 * Enhanced typography configuration with all controls
 */
export const fullTypographySupports = {
	fontSize: true,
	lineHeight: true,
	fontFamily: true,
	fontWeight: true,
	fontStyle: true,
	textTransform: true,
	textDecoration: true,
	letterSpacing: true,
	__experimentalFontFamily: true,
	__experimentalFontWeight: true,
	__experimentalFontStyle: true,
	__experimentalTextTransform: true,
	__experimentalTextDecoration: true,
	__experimentalLetterSpacing: true,
	__experimentalDefaultControls: {
		fontSize: true,
		lineHeight: true,
		fontWeight: true
	}
};

/**
 * Spacing configuration
 */
export const spacingSupports = {
	margin: true,
	padding: true,
	blockGap: true,
	__experimentalDefaultControls: {
		padding: true,
		margin: true,
		blockGap: true
	}
};

/**
 * Border configuration
 */
export const borderSupports = {
	color: true,
	radius: true,
	style: true,
	width: true,
	__experimentalDefaultControls: {
		color: true,
		radius: true,
		style: true,
		width: true
	}
};

/**
 * Dimensions configuration
 */
export const dimensionsSupports = {
	minHeight: true,
	aspectRatio: true,
	__experimentalDefaultControls: {
		minHeight: true,
		aspectRatio: false
	}
};

/**
 * Layout configuration
 */
export const layoutSupports = {
	allowEditing: true,
	allowInheriting: true,
	allowSwitching: true,
	default: {
		type: "constrained"
	}
};

/**
 * Layout configuration with vertical alignment
 */
export const layoutWithVerticalSupports = {
	allowEditing: true,
	allowInheriting: true,
	allowSwitching: true,
	allowVerticalAlignment: true,
	default: {
		type: "constrained"
	}
};

export default {
	fullDesignSupports,
	enhancedSupports,
	textBlockSupports,
	widgetSupports,
	singletonSupports,
	colorSupports,
	typographySupports,
	fullTypographySupports,
	spacingSupports,
	borderSupports,
	dimensionsSupports,
	layoutSupports,
	layoutWithVerticalSupports
};
