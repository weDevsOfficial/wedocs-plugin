import { useBlockProps } from "@wordpress/block-editor";
import { useEffect } from "@wordpress/element";
import Inspector from "./Inspector";
import "./style.scss";

export default function Edit({ attributes, setAttributes }) {
	// Set default styles if not already set using useEffect
	useEffect(() => {
		let needsUpdate = false;
		const newStyle = { ...attributes.style };

		// Set default padding if not set
		if (!attributes.style?.spacing?.padding) {
			newStyle.spacing = {
				...newStyle.spacing,
				padding: {
					top: "var:preset|spacing|20",
					right: "var:preset|spacing|40",
					bottom: "var:preset|spacing|20",
					left: "var:preset|spacing|40"
				}
			};
			needsUpdate = true;
		}

		// Set default border radius if not set
		if (!attributes.style?.border?.radius) {
			newStyle.border = {
				...newStyle.border,
				radius: "var:preset|spacing|20"
			};
			needsUpdate = true;
		}

		// Only update if we actually need to
		if (needsUpdate) {
			setAttributes({ style: newStyle });
		}
	}, []); // Empty dependency array means this runs once on mount

	const blockProps = useBlockProps();
	const { separator, hideHomeIcon, alignment, breadcrumbSeparator } = attributes;


	// Helper function to convert WordPress color format to CSS variable
	const getColorValue = (color) => {
		if (!color) return undefined;
		if (color.startsWith('var:preset|color|')) {
			const colorName = color.replace('var:preset|color|', '');
			return `var(--wp--preset--color--${colorName})`;
		}
		// Handle direct preset color names: accent-1, primary, etc.
		if (/^[a-z0-9-]+$/.test(color) && !color.includes('#') && !color.includes('rgb')) {
			return `var(--wp--preset--color--${color})`;
		}
		return color;
	};

	// Helper function to convert WordPress spacing to CSS
	const getSpacingValue = (spacingValue) => {
		if (!spacingValue) return undefined;

		// Handle object with individual sides
		if (typeof spacingValue === 'object') {
			const sides = ['top', 'right', 'bottom', 'left'];
			const values = sides.map(side => {
				const value = spacingValue[side];
				if (!value) return '0';
				if (value.startsWith('var:preset|spacing|')) {
					const spacingName = value.replace('var:preset|spacing|', '');
					return `var(--wp--preset--spacing--${spacingName})`;
				}
				return value;
			});
			return values.join(' ');
		}

		// Handle string values
		if (typeof spacingValue === 'string') {
			// Handle preset spacing
			if (spacingValue.startsWith('var:preset|spacing|')) {
				const spacingName = spacingValue.replace('var:preset|spacing|', '');
				return `var(--wp--preset--spacing--${spacingName})`;
			}
			return spacingValue;
		}

		return undefined;
	};

	// Helper function to convert WordPress border radius to CSS
	const getBorderRadiusValue = (radiusValue) => {
		if (!radiusValue) return undefined;
		if (radiusValue.startsWith('var:preset|spacing|')) {
			const radiusName = radiusValue.replace('var:preset|spacing|', '');
			return `var(--wp--preset--spacing--${radiusName})`;
		}
		return radiusValue;
	};

	// Helper function to convert WordPress typography to CSS
	const getTypographyValue = (typographyValue) => {
		if (!typographyValue) return undefined;
		
		// Handle preset font size format: var:preset|font-size|medium
		if (typographyValue.startsWith('var:preset|font-size|')) {
			const fontSizeName = typographyValue.replace('var:preset|font-size|', '');
			return `var(--wp--preset--font-size--${fontSizeName})`;
		}
		
		// Handle preset font family format: var:preset|font-family|system-font
		if (typographyValue.startsWith('var:preset|font-family|')) {
			const fontFamilyName = typographyValue.replace('var:preset|font-family|', '');
			return `var(--wp--preset--font-family--${fontFamilyName})`;
		}
		
		// Handle direct preset font size names: medium, large, x-large, xx-large, etc.
		if (/^(small|medium|large|x-large|xx-large|xxx-large)$/.test(typographyValue)) {
			return `var(--wp--preset--font-size--${typographyValue})`;
		}
		
		return typographyValue;
	};

	// Helper function to convert WordPress shadow to CSS
	const getShadowValue = (shadowValue) => {
		if (!shadowValue) return undefined;
		
		// Handle preset shadow format: var:preset|shadow|natural
		if (shadowValue.startsWith('var:preset|shadow|')) {
			const shadowName = shadowValue.replace('var:preset|shadow|', '');
			return `var(--wp--preset--shadow--${shadowName})`;
		}
		
		// Handle direct preset shadow names: natural, deep, sharp, outlined, crisp
		if (/^(natural|deep|sharp|outlined|crisp)$/.test(shadowValue)) {
			return `var(--wp--preset--shadow--${shadowValue})`;
		}
		
		return shadowValue;
	};

	// Extract style system colors and spacing
	const backgroundColor = attributes.backgroundColor;
	const textColor = attributes.textColor;
	const linkColor = attributes.style?.elements?.link?.color?.text;

	// Extract spacing, border, typography, and shadow from style object
	const spacing = attributes.style?.spacing || {};
	const border = attributes.style?.border || {};
	const typography = attributes.style?.typography || {};
	const shadow = attributes.style?.shadow || '';
	const padding = spacing.padding;
	const margin = spacing.margin;
	const borderRadius = border.radius;
	const borderWidth = border.width;
	const borderStyle = border.style;
	const borderColor = border.color;
	const fontSize = typography.fontSize;
	const lineHeight = typography.lineHeight;
	const fontFamily = typography.fontFamily;
	const fontWeight = typography.fontWeight;
	const fontStyle = typography.fontStyle;
	const textTransform = typography.textTransform;
	const textDecoration = typography.textDecoration;
	const letterSpacing = typography.letterSpacing;


	const getSeparatorIcon = () => {
		switch (separator) {
			case "slash":
				return "/";
			case "arrow":
				return "›";
			case "chevron":
				return "»";
			case "dot":
				return "•";
			default:
				return "/";
		}
	};

	// Helper function to get alignment class
	const getAlignmentClass = () => {
		switch (alignment) {
			case "center":
				return "justify-center";
			case "right":
				return "justify-end";
			case "left":
			default:
				return "justify-start";
		}
	};

	// Mock breadcrumb data for preview
	const breadcrumbs = [
		{
			title: "Home",
			url: "#"
		},
		{
			title: "Documentation",
			url: "#"
		},
		{
			title: "Getting Started",
			url: null
		}
	];

	return (
		<>
			<Inspector attributes={attributes} setAttributes={setAttributes} />
			<div className="wedocs-document">
				<nav aria-label="Breadcrumb">
					<ol
						role="list"
						className={`flex ${getAlignmentClass()}`}
						style={{
							backgroundColor: backgroundColor ? `var(--wp--preset--color--${backgroundColor})` : undefined,
							color: textColor ? `var(--wp--preset--color--${textColor})` : undefined,
							padding: padding ? getSpacingValue(padding) : undefined,
							margin: margin ? getSpacingValue(margin) : undefined,
							borderRadius: borderRadius ? getBorderRadiusValue(borderRadius) : undefined,
							borderWidth: borderWidth ? borderWidth : undefined,
							borderStyle: borderStyle ? borderStyle : (borderWidth || borderColor || attributes.borderColor ? 'solid' : undefined),
							borderColor: borderColor ? getColorValue(borderColor) : (attributes.borderColor ? getColorValue(attributes.borderColor) : undefined),
							boxShadow: shadow ? getShadowValue(shadow) : undefined,
							lineHeight: lineHeight ? lineHeight : undefined,
							fontFamily: fontFamily ? getTypographyValue(fontFamily) : undefined,
							fontWeight: fontWeight ? fontWeight : undefined,
							fontStyle: fontStyle ? fontStyle : undefined,
							textTransform: textTransform ? textTransform : undefined,
							textDecoration: textDecoration ? textDecoration : undefined,
							letterSpacing: letterSpacing ? letterSpacing : undefined
						}}
					>
						{breadcrumbs.map((breadcrumb, index) => (
							<li key={index} className="flex">
								<div className="flex items-center">
									{index > 0 && (
										<span
											className="mx-2 text-gray-400"
											style={{
												color: getColorValue(breadcrumbSeparator?.color) || undefined
											}}
										>
											{getSeparatorIcon()}
										</span>
									)}

									{breadcrumb.url ? (
										!hideHomeIcon && index === 0 ? (
											<a
												href={breadcrumb.url}
												className="hover:opacity-80 flex items-center"
												style={{
													color: getColorValue(linkColor) || (textColor ? `var(--wp--preset--color--${textColor})` : undefined),
													fontSize: fontSize ? getTypographyValue(fontSize) : (attributes.fontSize ? getTypographyValue(attributes.fontSize) : undefined)
												}}
											>
												<svg
													viewBox="0 0 20 20"
													fill="currentColor"
													data-slot="icon"
													aria-hidden="true"
													className="w-5 h-5 shrink-0 mr-1"
													style={{
														color: getColorValue(linkColor) || (textColor ? `var(--wp--preset--color--${textColor})` : undefined)
													}}
												>
													<path d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clipRule="evenodd" fillRule="evenodd" />
												</svg>
												<span className="sr-only">{breadcrumb.title}</span>
											</a>
										) : (
											<a
												href={breadcrumb.url}
												className={`${index === 0 ? '' : 'ml-4'} text-sm font-medium hover:opacity-80`}
												style={{
													color: getColorValue(linkColor) || (textColor ? `var(--wp--preset--color--${textColor})` : undefined),
													fontSize: fontSize ? getTypographyValue(fontSize) : (attributes.fontSize ? getTypographyValue(attributes.fontSize) : undefined)
												}}
											>
												{breadcrumb.title}
											</a>
										)
									) : (
										<span
											className={`${index === 0 ? '' : 'ml-4'} text-sm font-medium`}
											aria-current="page"
											style={{
												color: textColor ? `var(--wp--preset--color--${textColor})` : undefined,
												fontSize: fontSize ? getTypographyValue(fontSize) : (attributes.fontSize ? getTypographyValue(attributes.fontSize) : undefined)
											}}
										>
											{breadcrumb.title}
										</span>
									)}
								</div>
							</li>
						))}
					</ol>
				</nav>
			</div>
		</>
	);
}
