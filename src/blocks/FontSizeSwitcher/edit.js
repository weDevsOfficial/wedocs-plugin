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
import { useEffect } from '@wordpress/element';
import './editor.scss';

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
		defaultSize
	} = attributes;

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
		gap: '10px',
		justifyContent: alignment === 'center' ? 'center' : (alignment === 'right' ? 'flex-end' : 'flex-start'),
		flexWrap: 'wrap'
	};

	const buttonBaseStyle = {
		cursor: 'pointer',
		fontSize: '14px',
		transition: 'all 0.2s ease'
	};

	const renderButtons = () => {
		const sizes = [
			{ label: 'S', value: '14px', title: 'Small' },
			{ label: 'M', value: '16px', title: 'Default' },
			{ label: 'L', value: '18px', title: 'Medium' },
			{ label: 'XL', value: '20px', title: 'Large' },
			{ label: '2XL', value: '24px', title: 'Extra Large' }
		];

		return sizes.map((size, index) => (
			<button
				key={index}
				className="font-size-option"
				style={size.value === defaultSize ? activeButtonStyle : buttonBaseStyle}
				title={size.title}
			>
				{size.label}
			</button>
		));
	};

	const renderSlider = () => (
		<div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, maxWidth: '300px' }}>
			<button style={{ ...buttonBaseStyle, padding: '6px 10px' }}>A-</button>
			<input
				type="range"
				min="12"
				max="28"
				value={parseInt(defaultSize)}
				style={{ flex: 1 }}
				readOnly
			/>
			<button style={{ ...buttonBaseStyle, padding: '6px 10px' }}>A+</button>
		</div>
	);

	const renderDropdown = () => (
		<select
			style={{
				...buttonBaseStyle,
				padding: '8px 32px 8px 12px',
				appearance: 'none',
				backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'right 10px center',
				minWidth: '120px'
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
</PanelBody>				<PanelBody title={__('Advanced Settings', 'wedocs-plugin')} initialOpen={false}>
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
