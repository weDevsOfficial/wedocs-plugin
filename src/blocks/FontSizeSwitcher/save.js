import { useBlockProps } from '@wordpress/block-editor';
import { getBlockClasses, getInlineStyles } from '../block-helpers';

export default function save({ attributes }) {
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

	const blockProps = useBlockProps.save({
		className: 'wp-block-wedocs-font-size-switcher',
		'data-block-id': blockId,
		'data-display-style': displayStyle,
		'data-button-style': buttonStyle,
		'data-content-selector': contentSelector,
		'data-default-size': defaultSize,
		style: {
		}
	});

	const containerStyle = {
		display: 'flex',
		alignItems: 'center',
		gap: "10px",
		justifyContent: alignment === 'center' ? 'center' : (alignment === 'right' ? 'flex-end' : 'flex-start'),
		flexWrap: 'wrap'
	};

	const buttonBaseStyle = {
		
		
		
		
		padding: '8px 12px',
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
				data-size={size.value}
				data-label={size.title}
				style={buttonBaseStyle}
				title={size.title}
			>
				{size.label}
			</button>
		));
	};

	const renderSlider = () => (
		<div className="font-size-slider-controls" style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, maxWidth: '300px' }}>
			<button className="font-size-decrease" style={{ ...buttonBaseStyle, padding: '6px 10px' }} title="Decrease font size">
				A-
			</button>
			<input
				type="range"
				className="font-size-slider"
				min="12"
				max="28"
				step="2"
				defaultValue="16"
				style={{ flex: 1 }}
			/>
			<button className="font-size-increase" style={{ ...buttonBaseStyle, padding: '6px 10px' }} title="Increase font size">
				A+
			</button>
		</div>
	);

	const renderDropdown = () => (
		<select
			className="font-size-dropdown"
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
			<option value="14px">Small</option>
			<option value="16px" selected>Default</option>
			<option value="18px">Medium</option>
			<option value="20px">Large</option>
			<option value="24px">Extra Large</option>
		</select>
	);

	return (
		<div {...blockProps}>
			<div className="font-size-switcher-container" style={containerStyle}>
				{showLabel && (
					<span className="font-size-label" style={{  fontSize: '14px', fontWeight: '500' }}>
						{labelText}
					</span>
				)}

				{displayStyle === 'buttons' && renderButtons()}
				{displayStyle === 'slider' && renderSlider()}
				{displayStyle === 'dropdown' && renderDropdown()}

				{showCurrentSize && (
					<span className="current-size-display" style={{
						
						fontSize: '13px',
						opacity: 0.7,
						marginLeft: '10px'
					}}>
						(Default)
					</span>
				)}
			</div>
		</div>
	);
}
