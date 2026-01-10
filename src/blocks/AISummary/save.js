import { useBlockProps, RichText } from '@wordpress/block-editor';
import { getBlockClasses, getInlineStyles } from '../block-helpers';

export default function save({ attributes }) {
	const {
		blockId,
		postId,
		title,
		content,
		isCollapsible,
		isOpenByDefault,
		showIcon,
		iconType
	} = attributes;

	const getIconSVG = (type) => {
		const icons = {
			sparkles: (
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
					<path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="currentColor"/>
					<path d="M19 15L19.5 17L21.5 17.5L19.5 18L19 20L18.5 18L16.5 17.5L18.5 17L19 15Z" fill="currentColor"/>
					<path d="M6 4L6.5 6L8.5 6.5L6.5 7L6 9L5.5 7L3.5 6.5L5.5 6L6 4Z" fill="currentColor"/>
				</svg>
			),
			lightbulb: (
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
					<path d="M9 21C9 21.55 9.45 22 10 22H14C14.55 22 15 21.55 15 21V20H9V21ZM12 2C8.14 2 5 5.14 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.14 15.86 2 12 2Z" fill="currentColor"/>
				</svg>
			),
			star: (
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
					<path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
				</svg>
			),
			robot: (
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
					<path d="M20 9V7C20 5.9 19.1 5 18 5H13V2.5C13 2.22 12.78 2 12.5 2C12.22 2 12 2.22 12 2.5V5H6C4.9 5 4 5.9 4 7V9C2.9 9 2 9.9 2 11V13C2 14.1 2.9 15 4 15V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V15C21.1 15 22 14.1 22 13V11C22 9.9 21.1 9 20 9ZM7.5 11.5C7.5 10.67 8.17 10 9 10C9.83 10 10.5 10.67 10.5 11.5C10.5 12.33 9.83 13 9 13C8.17 13 7.5 12.33 7.5 11.5ZM16.5 17H7.5V16H16.5V17ZM15 13C14.17 13 13.5 12.33 13.5 11.5C13.5 10.67 14.17 10 15 10C15.83 10 16.5 10.67 16.5 11.5C16.5 12.33 15.83 13 15 13Z" fill="currentColor"/>
				</svg>
			)
		};
		return icons[type] || icons.sparkles;
	};

	// Only include postId if it's a valid number
	const validPostId = postId && typeof postId === 'number' && postId > 0 ? postId : '';

	const blockProps = useBlockProps.save({
		className: getBlockClasses(attributes, `wp-block-wedocs-ai-summary ${isCollapsible ? 'collapsible' : ''} ${isOpenByDefault ? 'open' : ''} ${!content ? 'no-summary' : 'has-summary'}`),
		'data-block-id': blockId,
		'data-post-id': validPostId,
		'data-collapsible': isCollapsible,
		'data-open-by-default': isOpenByDefault,
		'data-has-content': content ? 'true' : 'false',
		style: getInlineStyles(attributes)
	});

	return (
		<div {...blockProps}>
			<div className="ai-summary-header" style={{
				display: 'flex',
				alignItems: 'center',
				gap: '10px',
				cursor: isCollapsible ? 'pointer' : 'default'
			}}>
				{showIcon && (
					<div className="ai-summary-icon" >
						{getIconSVG(iconType)}
					</div>
				)}
				<RichText.Content
					tagName="h3"
					value={title}
					style={{
						margin: 0,
						flex: 1
					}}
				/>
				{isCollapsible && (
					<div className="ai-summary-toggle" >
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
							<path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
						</svg>
					</div>
				)}
			</div>
			<div className="ai-summary-content" style={{
			marginTop: '15px'
			}}>
				{content ? (
					<RichText.Content
						tagName="div"
						value={content}
					/>
				) : (
					<div className="ai-summary-generate-placeholder">
						<button
							className="ai-summary-generate-btn"
							data-generating-text="Generating summary..."
							style={{
								backgroundColor: '#0073aa',
								color: '#ffffff',
								border: 'none',
								padding: '10px 20px',
								borderRadius: '4px',
								cursor: 'pointer',
								fontSize: '14px',
								fontWeight: '500'
							}}
						>
							Generate AI Summary
						</button>
						<p style={{
							fontSize: '12px',
							color: '#666',
							marginTop: '8px',
							fontStyle: 'italic'
						}}>
							Click to generate a summary of this documentation using AI
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
