import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	SelectControl,
	RangeControl,
	TextareaControl,
	__experimentalUnitControl as UnitControl
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import './editor.scss';
import { getBlockClasses, getInlineStyles } from '../block-helpers';
import {
	ButtonControls,
	ButtonGroupControls,
	IconControls,
	HoverStateControls
} from '../commonControls/CommonControls';

export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		blockId,
		showCopyMarkdown,
		showChatGPT,
		showClaude,
		buttonStyle,
		buttonSize,
		alignment,
		promptTemplate,
		// Button styling
		buttonBackgroundColor,
		buttonTextColor,
		buttonHoverBackgroundColor,
		buttonHoverTextColor,
		buttonBorderColor,
		buttonHoverBorderColor,
		buttonBorder,
		buttonBorderRadius,
		buttonPadding,
		buttonMargin,
		buttonWidth,
		buttonHeight,
		buttonBoxShadow,
		buttonHoverBoxShadow,
		// Button group styling
		buttonGap,
		buttonDirection,
		buttonJustifyContent,
		buttonAlignItems,
		// Icon styling
		iconSize,
		iconColor,
		iconHoverColor,
		iconPosition,
		iconGap,
		// Transition
		transitionDuration,
		transitionTimingFunction
	} = attributes;

	const [hoveredButton, setHoveredButton] = useState(null);

	// Set unique block ID
	useEffect(() => {
		if (!blockId) {
			setAttributes({ blockId: `doc-actions-${clientId}` });
		}
	}, [blockId, clientId, setAttributes]);

	const blockProps = useBlockProps({
		className: getBlockClasses(attributes, 'wp-block-wedocs-doc-actions'),
		'data-block-id': blockId,
		style: getInlineStyles(attributes)
	});

	const getButtonClasses = () => {
		let classes = ['doc-action-button'];
		classes.push(`style-${buttonStyle}`);
		classes.push(`size-${buttonSize}`);
		return classes.join(' ');
	};

	const getButtonStyles = (buttonType) => {
		const isHovered = hoveredButton === buttonType;

		return {
			backgroundColor: isHovered ? (buttonHoverBackgroundColor || buttonBackgroundColor) : buttonBackgroundColor,
			color: isHovered ? (buttonHoverTextColor || buttonTextColor) : buttonTextColor,
			borderColor: isHovered ? (buttonHoverBorderColor || buttonBorderColor) : buttonBorderColor,
			borderStyle: buttonBorder?.style || 'solid',
			borderWidth: buttonBorder?.width || '1px',
			borderRadius: buttonBorderRadius ? `${buttonBorderRadius.top} ${buttonBorderRadius.right} ${buttonBorderRadius.bottom} ${buttonBorderRadius.left}` : '4px',
			padding: buttonPadding ? `${buttonPadding.top} ${buttonPadding.right} ${buttonPadding.bottom} ${buttonPadding.left}` : '8px 16px',
			margin: buttonMargin ? `${buttonMargin.top} ${buttonMargin.right} ${buttonMargin.bottom} ${buttonMargin.left}` : '0',
			width: buttonWidth || 'auto',
			height: buttonHeight || 'auto',
			boxShadow: isHovered ? (buttonHoverBoxShadow || buttonBoxShadow) : buttonBoxShadow,
			transition: `all ${transitionDuration || '300ms'} ${transitionTimingFunction || 'ease'}`,
			display: 'inline-flex',
			alignItems: 'center',
			gap: iconGap || '8px',
			flexDirection: iconPosition === 'after' ? 'row-reverse' : 'row',
			cursor: 'pointer'
		};
	};

	const getIconStyles = (buttonType) => {
		const isHovered = hoveredButton === buttonType;

		return {
			width: iconSize || '20px',
			height: iconSize || '20px',
			color: isHovered ? (iconHoverColor || iconColor) : iconColor,
			transition: `color ${transitionDuration || '300ms'} ${transitionTimingFunction || 'ease'}`
		};
	};

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

	const containerStyle = {
		display: 'flex',
		flexWrap: 'wrap',
		gap: buttonGap || '10px',
		justifyContent: buttonJustifyContent || (alignment === 'center' ? 'center' : (alignment === 'right' ? 'flex-end' : 'flex-start')),
		alignItems: buttonAlignItems || 'center',
		flexDirection: buttonDirection || 'row'
	};

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={alignment}
					onChange={(value) => setAttributes({ alignment: value })}
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={__('Button Visibility', 'wedocs-plugin')} initialOpen={true}>
					<ToggleControl
						label={__('Show "Copy Markdown for LLM"', 'wedocs-plugin')}
						checked={showCopyMarkdown}
						onChange={(value) => setAttributes({ showCopyMarkdown: value })}
					/>
					<ToggleControl
						label={__('Show "Open in ChatGPT"', 'wedocs-plugin')}
						checked={showChatGPT}
						onChange={(value) => setAttributes({ showChatGPT: value })}
					/>
					<ToggleControl
						label={__('Show "Open in Claude"', 'wedocs-plugin')}
						checked={showClaude}
						onChange={(value) => setAttributes({ showClaude: value })}
					/>
				</PanelBody>

				<ButtonControls
					title={__('Button Styling', 'wedocs-plugin')}
					backgroundColor={buttonBackgroundColor}
					textColor={buttonTextColor}
					hoverBackgroundColor={buttonHoverBackgroundColor}
					hoverTextColor={buttonHoverTextColor}
					borderColor={buttonBorderColor}
					hoverBorderColor={buttonHoverBorderColor}
					border={buttonBorder}
					borderRadius={buttonBorderRadius}
					padding={buttonPadding}
					margin={buttonMargin}
					width={buttonWidth}
					height={buttonHeight}
					boxShadow={buttonBoxShadow}
					hoverBoxShadow={buttonHoverBoxShadow}
					onBackgroundColorChange={(value) => setAttributes({ buttonBackgroundColor: value })}
					onTextColorChange={(value) => setAttributes({ buttonTextColor: value })}
					onHoverBackgroundColorChange={(value) => setAttributes({ buttonHoverBackgroundColor: value })}
					onHoverTextColorChange={(value) => setAttributes({ buttonHoverTextColor: value })}
					onBorderColorChange={(value) => setAttributes({ buttonBorderColor: value })}
					onHoverBorderColorChange={(value) => setAttributes({ buttonHoverBorderColor: value })}
					onBorderChange={(value) => setAttributes({ buttonBorder: value })}
					onBorderRadiusChange={(value) => setAttributes({ buttonBorderRadius: value })}
					onPaddingChange={(value) => setAttributes({ buttonPadding: value })}
					onMarginChange={(value) => setAttributes({ buttonMargin: value })}
					onWidthChange={(value) => setAttributes({ buttonWidth: value })}
					onHeightChange={(value) => setAttributes({ buttonHeight: value })}
					onBoxShadowChange={(value) => setAttributes({ buttonBoxShadow: value })}
					onHoverBoxShadowChange={(value) => setAttributes({ buttonHoverBoxShadow: value })}
					showAlignment={false}
					initialOpen={false}
				/>

				<ButtonGroupControls
					title={__('Button Group Layout', 'wedocs-plugin')}
					gap={buttonGap}
					direction={buttonDirection}
					justifyContent={buttonJustifyContent}
					alignItems={buttonAlignItems}
					onGapChange={(value) => setAttributes({ buttonGap: value })}
					onDirectionChange={(value) => setAttributes({ buttonDirection: value })}
					onJustifyContentChange={(value) => setAttributes({ buttonJustifyContent: value })}
					onAlignItemsChange={(value) => setAttributes({ buttonAlignItems: value })}
					initialOpen={false}
				/>

				<IconControls
					title={__('Icon Styling', 'wedocs-plugin')}
					iconSize={iconSize}
					iconColor={iconColor}
					iconHoverColor={iconHoverColor}
					iconPosition={iconPosition}
					iconGap={iconGap}
					onIconSizeChange={(value) => setAttributes({ iconSize: value })}
					onIconColorChange={(value) => setAttributes({ iconColor: value })}
					onIconHoverColorChange={(value) => setAttributes({ iconHoverColor: value })}
					onIconPositionChange={(value) => setAttributes({ iconPosition: value })}
					onIconGapChange={(value) => setAttributes({ iconGap: value })}
					showPosition={true}
					showSpacing={false}
					showEffects={false}
					initialOpen={false}
				/>

				<HoverStateControls
					title={__('Transitions & Effects', 'wedocs-plugin')}
					transitionDuration={transitionDuration}
					transitionTimingFunction={transitionTimingFunction}
					onTransitionDurationChange={(value) => setAttributes({ transitionDuration: value })}
					onTransitionTimingFunctionChange={(value) => setAttributes({ transitionTimingFunction: value })}
					showHoverState={false}
					showActiveState={false}
					showFocusState={false}
					showTransforms={false}
					initialOpen={false}
				/>

				<PanelBody title={__('AI Prompt Template', 'wedocs-plugin')} initialOpen={false}>
					<TextareaControl
						label={__('Prompt Template', 'wedocs-plugin')}
						value={promptTemplate}
						onChange={(value) => setAttributes({ promptTemplate: value })}
						help={__(
							'Use {title} for page title and {url} for page URL. Example: Need more information on "{title}"\n\nSource: {url}',
							'wedocs-plugin'
						)}
						rows={5}
					/>
				</PanelBody>

				<PanelBody title={__('Button Style', 'wedocs-plugin')}>
					<SelectControl
						label={__('Style', 'wedocs-plugin')}
						value={buttonStyle}
						options={[
							{ label: __('Outlined', 'wedocs-plugin'), value: 'outlined' },
							{ label: __('Filled', 'wedocs-plugin'), value: 'filled' },
							{ label: __('Text Only', 'wedocs-plugin'), value: 'text' }
						]}
						onChange={(value) => setAttributes({ buttonStyle: value })}
					/>
					<SelectControl
						label={__('Size', 'wedocs-plugin')}
						value={buttonSize}
						options={[
							{ label: __('Small', 'wedocs-plugin'), value: 'small' },
							{ label: __('Medium', 'wedocs-plugin'), value: 'medium' },
							{ label: __('Large', 'wedocs-plugin'), value: 'large' }
						]}
						onChange={(value) => setAttributes({ buttonSize: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="doc-actions-container" style={containerStyle}>
					{showCopyMarkdown && (
						<button
							className={getButtonClasses()}
							style={getButtonStyles('copy')}
							onMouseEnter={() => setHoveredButton('copy')}
							onMouseLeave={() => setHoveredButton(null)}
						>
							<span style={getIconStyles('copy')}>{getIconSVG('copy')}</span>
							<span>{__('Copy Markdown for LLM', 'wedocs-plugin')}</span>
						</button>
					)}
					{showChatGPT && (
						<button
							className={getButtonClasses()}
							style={getButtonStyles('chatgpt')}
							onMouseEnter={() => setHoveredButton('chatgpt')}
							onMouseLeave={() => setHoveredButton(null)}
						>
							<span style={getIconStyles('chatgpt')}>{getIconSVG('chatgpt')}</span>
							<span>{__('Open in ChatGPT', 'wedocs-plugin')}</span>
						</button>
					)}
					{showClaude && (
						<button
							className={getButtonClasses()}
							style={getButtonStyles('claude')}
							onMouseEnter={() => setHoveredButton('claude')}
							onMouseLeave={() => setHoveredButton(null)}
						>
							<span style={getIconStyles('claude')}>{getIconSVG('claude')}</span>
							<span>{__('Open in Claude', 'wedocs-plugin')}</span>
						</button>
					)}
				</div>
			</div>
		</>
	);
}
