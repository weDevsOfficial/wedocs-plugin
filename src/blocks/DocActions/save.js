import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		blockId,
		showCopyMarkdown,
		showChatGPT,
		showClaude,
		buttonStyle,
		buttonSize,
		alignment,
		spacing,
		backgroundColor,
		textColor,
		borderColor,
		borderWidth,
		borderRadius,
		hoverBackgroundColor,
		fontSize,
		padding,
		margin,
		promptTemplate
	} = attributes;

	const getIconSVG = (type) => {
		const icons = {
			copy: (
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
					<rect x="6" y="6" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
					<path d="M4 14H3C2.44772 14 2 13.5523 2 13V3C2 2.44772 2.44772 2 3 2H13C13.5523 2 14 2.44772 14 3V4" stroke="currentColor" strokeWidth="1.5"/>
				</svg>
			),
			chatgpt: (
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
					<path d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2Z" stroke="currentColor" strokeWidth="1.5"/>
					<circle cx="10" cy="10" r="3" fill="currentColor"/>
				</svg>
			),
			claude: (
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
					<path d="M10 2L13 8L19 9L14.5 13L16 19L10 16L4 19L5.5 13L1 9L7 8L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
				</svg>
			)
		};
		return icons[type];
	};

	const blockProps = useBlockProps.save({
		className: 'wp-block-wedocs-doc-actions',
		'data-block-id': blockId,
		'data-button-style': buttonStyle,
		'data-bg-color': backgroundColor,
		'data-hover-bg': hoverBackgroundColor,
		'data-prompt-template': promptTemplate,
		style: {
			padding: `${padding.top} ${padding.right} ${padding.bottom} ${padding.left}`,
			margin: `${margin.top} ${margin.right} ${margin.bottom} ${margin.left}`
		}
	});

	const containerStyle = {
		display: 'flex',
		flexWrap: 'wrap',
		gap: spacing,
		justifyContent: alignment === 'center' ? 'center' : (alignment === 'right' ? 'flex-end' : 'flex-start')
	};

	const btnStyles = {
		backgroundColor: buttonStyle === 'filled' ? backgroundColor : 'transparent',
		color: textColor,
		borderColor,
		borderWidth,
		borderStyle: 'solid',
		borderRadius,
		fontSize
	};

	return (
		<div {...blockProps}>
			<div className="doc-actions-container" style={containerStyle}>
				{showCopyMarkdown && (
					<button
						className={`doc-action-button style-${buttonStyle} size-${buttonSize}`}
						style={btnStyles}
						data-action="copy-markdown"
					>
						{getIconSVG('copy')}
						<span>Copy Markdown for LLM</span>
					</button>
				)}
				{showChatGPT && (
					<button
						className={`doc-action-button style-${buttonStyle} size-${buttonSize}`}
						style={btnStyles}
						data-action="open-chatgpt"
					>
						{getIconSVG('chatgpt')}
						<span>Open in ChatGPT</span>
					</button>
				)}
				{showClaude && (
					<button
						className={`doc-action-button style-${buttonStyle} size-${buttonSize}`}
						style={btnStyles}
						data-action="open-claude"
					>
						{getIconSVG('claude')}
						<span>Open in Claude</span>
					</button>
				)}
			</div>
		</div>
	);
}
