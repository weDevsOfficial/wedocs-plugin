import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { getBlockClasses, getInlineStyles } from '../block-helpers';
import {
	PanelBody,
	ToggleControl,
	SelectControl,
	TextControl,
	__experimentalUnitControl as UnitControl
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import './editor.scss';
import {
	ButtonControls,
	ButtonGroupControls,
	AdvancedTypographyControls,
	HoverStateControls
} from '../commonControls/CommonControls';

export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		blockId,
		displayStyle,
		showLabel,
		labelText,
		buttonStyle,
		alignment,
		showCurrentSize,
		contentSelector,
		defaultSize,
		// Button styling
		buttonBackgroundColor,
		buttonTextColor,
		buttonHoverBackgroundColor,
		buttonHoverTextColor,
		buttonActiveBackgroundColor,
		buttonActiveTextColor,
		buttonBorderColor,
		buttonHoverBorderColor,
		buttonBorder,
		buttonBorderRadius,
		buttonPadding,
		buttonMargin,
		buttonWidth,
		buttonHeight,
		buttonGap,
		// Label styling
		labelColor,
		labelFontSize,
		labelFontWeight,
		labelMargin,
		// Slider styling
		sliderTrackColor,
		sliderThumbColor,
		sliderThumbSize,
		sliderHeight,
		// Dropdown styling
		dropdownBackgroundColor,
		dropdownTextColor,
		dropdownBorderColor,
		dropdownBorder,
		dropdownBorderRadius,
		dropdownPadding,
		// Transitions
		transitionDuration,
		transitionTimingFunction
	} = attributes;

	const [hoveredButton, setHoveredButton] = useState(null);
	const [activeButton, setActiveButton] = useState('medium');

	// Set unique block ID
	useEffect(() => {
		if (!blockId) {
			setAttributes({ blockId: `font-size-switcher-${clientId}` });
		}
	}, [blockId, clientId, setAttributes]);

	const blockProps = useBlockProps({
		className: getBlockClasses(attributes, 'wp-block-wedocs-font-size-switcher'),
		'data-block-id': blockId,
		style: getInlineStyles(attributes)
	});

	const containerStyle = {
		display: 'flex',
		alignItems: 'center',
		gap: buttonGap || '10px',
		justifyContent: alignment === 'center' ? 'center' : (alignment === 'right' ? 'flex-end' : 'flex-start'),
		flexWrap: 'wrap'
	};

	const getButtonStyle = (buttonKey, isActive) => {
		const isHovered = hoveredButton === buttonKey;

		return {
			backgroundColor: isActive
				? (buttonActiveBackgroundColor || buttonHoverBackgroundColor || buttonBackgroundColor)
				: isHovered
					? (buttonHoverBackgroundColor || buttonBackgroundColor)
					: buttonBackgroundColor,
			color: isActive
				? (buttonActiveTextColor || buttonHoverTextColor || buttonTextColor)
				: isHovered
					? (buttonHoverTextColor || buttonTextColor)
					: buttonTextColor,
			borderColor: isHovered ? (buttonHoverBorderColor || buttonBorderColor) : buttonBorderColor,
			borderStyle: buttonBorder?.style || 'solid',
			borderWidth: buttonBorder?.width || '1px',
			borderRadius: buttonBorderRadius ? `${buttonBorderRadius.top} ${buttonBorderRadius.right} ${buttonBorderRadius.bottom} ${buttonBorderRadius.left}` : '4px',
			padding: buttonPadding ? `${buttonPadding.top} ${buttonPadding.right} ${buttonPadding.bottom} ${buttonPadding.left}` : '8px 16px',
			margin: buttonMargin ? `${buttonMargin.top} ${buttonMargin.right} ${buttonMargin.bottom} ${buttonMargin.left}` : '0',
			width: buttonWidth || 'auto',
			height: buttonHeight || 'auto',
			cursor: 'pointer',
			fontSize: '14px',
			transition: `all ${transitionDuration || '300ms'} ${transitionTimingFunction || 'ease'}`,
			display: 'inline-flex',
			alignItems: 'center',
			justifyContent: 'center'
		};
	};

	const getLabelStyle = () => ({
		color: labelColor,
		fontSize: labelFontSize || '14px',
		fontWeight: labelFontWeight || '500',
		margin: labelMargin ? `${labelMargin.top} ${labelMargin.right} ${labelMargin.bottom} ${labelMargin.left}` : '0'
	});

	const getSliderStyle = () => ({
		height: sliderHeight || '4px',
		background: sliderTrackColor || '#ddd',
		borderRadius: '4px',
		outline: 'none',
		appearance: 'none',
		WebkitAppearance: 'none',
		flex: 1
	});

	const getDropdownStyle = () => ({
		backgroundColor: dropdownBackgroundColor,
		color: dropdownTextColor,
		borderColor: dropdownBorderColor,
		borderStyle: dropdownBorder?.style || 'solid',
		borderWidth: dropdownBorder?.width || '1px',
		borderRadius: dropdownBorderRadius ? `${dropdownBorderRadius.top} ${dropdownBorderRadius.right} ${dropdownBorderRadius.bottom} ${dropdownBorderRadius.left}` : '4px',
		padding: dropdownPadding ? `${dropdownPadding.top} ${dropdownPadding.right} ${dropdownPadding.bottom} ${dropdownPadding.left}` : '8px 12px',
		cursor: 'pointer',
		outline: 'none'
	});

	const buttonBaseStyle = {
		cursor: 'pointer',
		fontSize: '14px',
		transition: 'all 0.2s ease'
	};

	const renderButtons = () => {
		const sizes = [
			{ label: 'S', value: '14px', title: 'Small', key: 'small' },
			{ label: 'M', value: '16px', title: 'Default', key: 'medium' },
			{ label: 'L', value: '18px', title: 'Medium', key: 'large' },
			{ label: 'XL', value: '20px', title: 'Large', key: 'xlarge' },
			{ label: '2XL', value: '24px', title: 'Extra Large', key: 'xxlarge' }
		];

		return sizes.map((size, index) => (
			<button
				key={index}
				className="font-size-option"
				style={getButtonStyle(size.key, size.value === defaultSize)}
				title={size.title}
				onMouseEnter={() => setHoveredButton(size.key)}
				onMouseLeave={() => setHoveredButton(null)}
				onClick={() => setActiveButton(size.key)}
			>
				{size.label}
			</button>
		));
	};

	const renderSlider = () => (
		<div style={{ display: 'flex', alignItems: 'center', gap: buttonGap || '10px', flex: 1, maxWidth: '300px' }}>
			<button
				style={getButtonStyle('decrease', false)}
				onMouseEnter={() => setHoveredButton('decrease')}
				onMouseLeave={() => setHoveredButton(null)}
			>
				A-
			</button>
			<input
				type="range"
				min="12"
				max="28"
				value={parseInt(defaultSize)}
				style={getSliderStyle()}
				readOnly
			/>
			<button
				style={getButtonStyle('increase', false)}
				onMouseEnter={() => setHoveredButton('increase')}
				onMouseLeave={() => setHoveredButton(null)}
			>
				A+
			</button>
		</div>
	);

	const renderDropdown = () => (
		<select
			style={{
				...getDropdownStyle(),
				appearance: 'none',
				WebkitAppearance: 'none',
				backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='${encodeURIComponent(dropdownTextColor || '#333')}' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'right 10px center',
				minWidth: '120px',
				transition: `all ${transitionDuration || '300ms'} ${transitionTimingFunction || 'ease'}`
			}}
		>
			<option>Small</option>
			<option selected>Default</option>
			<option>Medium</option>
			<option>Large</option>
			<option>Extra Large</option>
		</select>
	);

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={alignment}
					onChange={(value) => setAttributes({ alignment: value })}
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={__('Display Settings', 'wedocs-plugin')} initialOpen={true}>
					<SelectControl
						label={__('Display Style', 'wedocs-plugin')}
						value={displayStyle}
						options={[
							{ label: __('Size Buttons (S, M, L, XL)', 'wedocs-plugin'), value: 'buttons' },
							{ label: __('Slider with +/- Controls', 'wedocs-plugin'), value: 'slider' },
							{ label: __('Dropdown Menu', 'wedocs-plugin'), value: 'dropdown' }
						]}
						onChange={(value) => setAttributes({ displayStyle: value })}
					/>
					<ToggleControl
						label={__('Show Label', 'wedocs-plugin')}
						checked={showLabel}
						onChange={(value) => setAttributes({ showLabel: value })}
					/>
					{showLabel && (
						<TextControl
							label={__('Label Text', 'wedocs-plugin')}
							value={labelText}
							onChange={(value) => setAttributes({ labelText: value })}
						/>
					)}
					<ToggleControl
						label={__('Show Current Size', 'wedocs-plugin')}
						checked={showCurrentSize}
						onChange={(value) => setAttributes({ showCurrentSize: value })}
						help={__('Display current font size (e.g., "16px" or "Default")', 'wedocs-plugin')}
					/>
				</PanelBody>

				<ButtonControls
					title={__('Button Styling', 'wedocs-plugin')}
					backgroundColor={buttonBackgroundColor}
					textColor={buttonTextColor}
					hoverBackgroundColor={buttonHoverBackgroundColor}
					hoverTextColor={buttonHoverTextColor}
					activeBackgroundColor={buttonActiveBackgroundColor}
					activeTextColor={buttonActiveTextColor}
					borderColor={buttonBorderColor}
					hoverBorderColor={buttonHoverBorderColor}
					border={buttonBorder}
					borderRadius={buttonBorderRadius}
					padding={buttonPadding}
					margin={buttonMargin}
					width={buttonWidth}
					height={buttonHeight}
					onBackgroundColorChange={(value) => setAttributes({ buttonBackgroundColor: value })}
					onTextColorChange={(value) => setAttributes({ buttonTextColor: value })}
					onHoverBackgroundColorChange={(value) => setAttributes({ buttonHoverBackgroundColor: value })}
					onHoverTextColorChange={(value) => setAttributes({ buttonHoverTextColor: value })}
					onActiveBackgroundColorChange={(value) => setAttributes({ buttonActiveBackgroundColor: value })}
					onActiveTextColorChange={(value) => setAttributes({ buttonActiveTextColor: value })}
					onBorderColorChange={(value) => setAttributes({ buttonBorderColor: value })}
					onHoverBorderColorChange={(value) => setAttributes({ buttonHoverBorderColor: value })}
					onBorderChange={(value) => setAttributes({ buttonBorder: value })}
					onBorderRadiusChange={(value) => setAttributes({ buttonBorderRadius: value })}
					onPaddingChange={(value) => setAttributes({ buttonPadding: value })}
					onMarginChange={(value) => setAttributes({ buttonMargin: value })}
					onWidthChange={(value) => setAttributes({ buttonWidth: value })}
					onHeightChange={(value) => setAttributes({ buttonHeight: value })}
					showAlignment={false}
					showActiveStates={true}
					initialOpen={false}
				/>

				<ButtonGroupControls
					title={__('Button Spacing', 'wedocs-plugin')}
					gap={buttonGap}
					onGapChange={(value) => setAttributes({ buttonGap: value })}
					initialOpen={false}
				/>

				<AdvancedTypographyControls
					title={__('Label Typography', 'wedocs-plugin')}
					textColor={labelColor}
					fontSize={labelFontSize}
					fontWeight={labelFontWeight}
					onTextColorChange={(value) => setAttributes({ labelColor: value })}
					onFontSizeChange={(value) => setAttributes({ labelFontSize: value })}
					onFontWeightChange={(value) => setAttributes({ labelFontWeight: value })}
					showFontFamily={false}
					showLineHeight={false}
					showLetterSpacing={false}
					showTextTransform={false}
					showTextDecoration={false}
					showTextAlign={false}
					showHoverColor={false}
					initialOpen={false}
				/>

				{displayStyle === 'slider' && (
					<PanelBody title={__('Slider Styling', 'wedocs-plugin')} initialOpen={false}>
						<UnitControl
							label={__('Track Height', 'wedocs-plugin')}
							value={sliderHeight}
							onChange={(value) => setAttributes({ sliderHeight: value })}
						/>
						<UnitControl
							label={__('Track Color', 'wedocs-plugin')}
							value={sliderTrackColor}
							onChange={(value) => setAttributes({ sliderTrackColor: value })}
						/>
						<UnitControl
							label={__('Thumb Color', 'wedocs-plugin')}
							value={sliderThumbColor}
							onChange={(value) => setAttributes({ sliderThumbColor: value })}
						/>
						<UnitControl
							label={__('Thumb Size', 'wedocs-plugin')}
							value={sliderThumbSize}
							onChange={(value) => setAttributes({ sliderThumbSize: value })}
						/>
					</PanelBody>
				)}

				{displayStyle === 'dropdown' && (
					<PanelBody title={__('Dropdown Styling', 'wedocs-plugin')} initialOpen={false}>
						<UnitControl
							label={__('Background Color', 'wedocs-plugin')}
							value={dropdownBackgroundColor}
							onChange={(value) => setAttributes({ dropdownBackgroundColor: value })}
						/>
						<UnitControl
							label={__('Text Color', 'wedocs-plugin')}
							value={dropdownTextColor}
							onChange={(value) => setAttributes({ dropdownTextColor: value })}
						/>
						<UnitControl
							label={__('Border Color', 'wedocs-plugin')}
							value={dropdownBorderColor}
							onChange={(value) => setAttributes({ dropdownBorderColor: value })}
						/>
					</PanelBody>
				)}

				<HoverStateControls
					title={__('Transitions', 'wedocs-plugin')}
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

				<PanelBody title={__('Advanced Settings', 'wedocs-plugin')} initialOpen={false}>
					<TextControl
						label={__('Content Selector', 'wedocs-plugin')}
						value={contentSelector}
						onChange={(value) => setAttributes({ contentSelector: value })}
						help={__('CSS selector for the content area to adjust', 'wedocs-plugin')}
					/>
					<UnitControl
						label={__('Default Font Size', 'wedocs-plugin')}
						value={defaultSize}
						onChange={(value) => setAttributes({ defaultSize: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="font-size-switcher-container" style={containerStyle}>
					{showLabel && (
						<span className="font-size-label" style={{ fontSize: '14px', fontWeight: '500' }}>
							{labelText}
						</span>
					)}

					{displayStyle === 'buttons' && renderButtons()}
					{displayStyle === 'slider' && renderSlider()}
					{displayStyle === 'dropdown' && renderDropdown()}

					{showCurrentSize && (
						<span className="current-size-display" style={{
							color: textColor,
							fontSize: '13px',
							opacity: 0.7,
							marginLeft: '10px'
						}}>
							(Default)
						</span>
					)}
				</div>
			</div>
		</>
	);
}
