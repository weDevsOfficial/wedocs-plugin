import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	SelectControl,
	__experimentalBoxControl as BoxControl
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import './editor.scss';
import {
	ColorSettingsPanel,
	TypographyPanel,
	SpacingPanel,
	BorderPanel
} from '../commonControls/CommonControls';

export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		blockId,
		title,
		content,
		isCollapsible,
		isOpenByDefault,
		showIcon,
		iconType,
		backgroundColor,
		textColor,
		titleColor,
		titleFontSize,
		titleFontWeight,
		contentFontSize,
		borderRadius,
		padding,
		margin
	} = attributes;

	// Set unique block ID
	useEffect(() => {
		if (!blockId) {
			setAttributes({ blockId: `ai-summary-${clientId}` });
		}
	}, [blockId, clientId, setAttributes]);

	const blockProps = useBlockProps({
		className: 'wp-block-wedocs-ai-summary',
		'data-block-id': blockId,
		style: {
			backgroundColor,
			color: textColor,
			borderRadius,
			padding: `${padding.top} ${padding.right} ${padding.bottom} ${padding.left}`,
			margin: `${margin.top} ${margin.right} ${margin.bottom} ${margin.left}`
		}
	});

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

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Summary Settings', 'wedocs-plugin')} initialOpen={true}>
					<ToggleControl
						label={__('Make Collapsible', 'wedocs-plugin')}
						checked={isCollapsible}
						onChange={(value) => setAttributes({ isCollapsible: value })}
						help={__('Allow users to expand/collapse the summary', 'wedocs-plugin')}
					/>
					{isCollapsible && (
						<ToggleControl
							label={__('Open by Default', 'wedocs-plugin')}
							checked={isOpenByDefault}
							onChange={(value) => setAttributes({ isOpenByDefault: value })}
						/>
					)}
					<ToggleControl
						label={__('Show Icon', 'wedocs-plugin')}
						checked={showIcon}
						onChange={(value) => setAttributes({ showIcon: value })}
					/>
					{showIcon && (
						<SelectControl
							label={__('Icon Type', 'wedocs-plugin')}
							value={iconType}
							options={[
								{ label: __('Sparkles', 'wedocs-plugin'), value: 'sparkles' },
								{ label: __('Lightbulb', 'wedocs-plugin'), value: 'lightbulb' },
								{ label: __('Star', 'wedocs-plugin'), value: 'star' },
								{ label: __('Robot', 'wedocs-plugin'), value: 'robot' }
							]}
							onChange={(value) => setAttributes({ iconType: value })}
						/>
					)}
				</PanelBody>

				<ColorSettingsPanel
					attributes={attributes}
					setAttributes={setAttributes}
					colorSettings={[
						{
							label: __('Background Color', 'wedocs-plugin'),
							value: backgroundColor,
							onChange: (value) => setAttributes({ backgroundColor: value })
						},
						{
							label: __('Title Color', 'wedocs-plugin'),
							value: titleColor,
							onChange: (value) => setAttributes({ titleColor: value })
						},
						{
							label: __('Content Color', 'wedocs-plugin'),
							value: textColor,
							onChange: (value) => setAttributes({ textColor: value })
						}
					]}
				/>

				<TypographyPanel
					title={__('Title Typography', 'wedocs-plugin')}
					fontSize={titleFontSize}
					fontWeight={titleFontWeight}
					onFontSizeChange={(value) => setAttributes({ titleFontSize: value })}
					onFontWeightChange={(value) => setAttributes({ titleFontWeight: value })}
				/>

				<TypographyPanel
					title={__('Content Typography', 'wedocs-plugin')}
					fontSize={contentFontSize}
					onFontSizeChange={(value) => setAttributes({ contentFontSize: value })}
				/>

				<SpacingPanel
					title={__('Padding', 'wedocs-plugin')}
					values={padding}
					onChange={(value) => setAttributes({ padding: value })}
				/>

				<SpacingPanel
					title={__('Margin', 'wedocs-plugin')}
					values={margin}
					onChange={(value) => setAttributes({ margin: value })}
				/>

				<PanelBody title={__('Border Settings', 'wedocs-plugin')}>
					<BoxControl
						label={__('Border Radius', 'wedocs-plugin')}
						values={{ top: borderRadius, right: borderRadius, bottom: borderRadius, left: borderRadius }}
						onChange={(value) => setAttributes({ borderRadius: value.top })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="ai-summary-header" style={{
					display: 'flex',
					alignItems: 'center',
					gap: '10px',
					cursor: isCollapsible ? 'pointer' : 'default'
				}}>
					{showIcon && (
						<div className="ai-summary-icon" style={{ color: titleColor }}>
							{getIconSVG(iconType)}
						</div>
					)}
					<RichText
						tagName="h3"
						value={title}
						onChange={(value) => setAttributes({ title: value })}
						placeholder={__('Enter summary title...', 'wedocs-plugin')}
						style={{
							color: titleColor,
							fontSize: titleFontSize,
							fontWeight: titleFontWeight,
							margin: 0
						}}
					/>
					{isCollapsible && (
						<div className="ai-summary-toggle" style={{ marginLeft: 'auto', color: titleColor }}>
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
								<path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
							</svg>
						</div>
					)}
				</div>
				<div className="ai-summary-content" style={{
					marginTop: '15px',
					fontSize: contentFontSize,
					lineHeight: '1.6'
				}}>
					<RichText
						tagName="div"
						value={content}
						onChange={(value) => setAttributes({ content: value })}
						placeholder={__('Enter AI-generated summary content...', 'wedocs-plugin')}
					/>
				</div>
			</div>
		</>
	);
}
