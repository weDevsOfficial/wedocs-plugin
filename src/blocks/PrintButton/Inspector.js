import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	SelectControl,
	RangeControl,
	__experimentalUnitControl as UnitControl,
	__experimentalBoxControl as BoxControl,
} from '@wordpress/components';
import {
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';

const Inspector = ({ attributes, setAttributes }) => {
	const {
		padding,
		margin,
		backgroundColor,
		textColor,
		borderRadius,
		borderWidth,
		borderColor,
		borderStyle,
		fontSize,
		fontWeight,
	} = attributes;

	// Helper function to update nested objects
	const updateAttribute =
		(attributeName, property = null) =>
		(value) => {
			if (property) {
				setAttributes({
					[attributeName]: {
						...attributes[attributeName],
						[property]: value,
					},
				});
			} else {
				setAttributes({ [attributeName]: value });
			}
		};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title={__('Style Settings', 'wedocs')}
					initialOpen={false}
				>
					<SelectControl
						label={__('Button Style', 'wedocs')}
						value={attributes.buttonStyle}
						options={[
							{ label: __('Primary', 'wedocs'), value: 'primary' },
							{
								label: __('Secondary', 'wedocs'),
								value: 'secondary',
							},
							{ label: __('Outline', 'wedocs'), value: 'outline' },
							{ label: __('Ghost', 'wedocs'), value: 'ghost' },
						]}
						onChange={updateAttribute('buttonStyle')}
					/>

					<SelectControl
						label={__('Button Size', 'wedocs')}
						value={attributes.buttonSize}
						options={[
							{ label: __('Small', 'wedocs'), value: 'small' },
							{ label: __('Medium', 'wedocs'), value: 'medium' },
							{ label: __('Large', 'wedocs'), value: 'large' },
						]}
						onChange={updateAttribute('buttonSize')}
					/>

					<PanelColorSettings
						title={__('Color Settings', 'wedocs')}
						initialOpen={false}
						colorSettings={[
							{
								value: textColor,
								onChange: updateAttribute('textColor'),
								label: __('Text Color', 'wedocs'),
							},
							{
								value: backgroundColor,
								onChange: updateAttribute('backgroundColor'),
								label: __('Background Color', 'wedocs'),
							},
						]}
					/>
				</PanelBody>

				<PanelBody title={__('Spacing', 'wedocs')} initialOpen={false}>
					{BoxControl ? (
						<Fragment>
							<BoxControl
								label={__('Padding', 'wedocs')}
								values={padding}
								onChange={updateAttribute('padding')}
								units={[
									{ value: 'px', label: 'px', default: 0 },
									{ value: 'em', label: 'em', default: 0 },
									{ value: '%', label: '%', default: 0 },
								]}
							/>

							<BoxControl
								label={__('Margin', 'wedocs')}
								values={margin}
								onChange={updateAttribute('margin')}
								units={[
									{ value: 'px', label: 'px', default: 0 },
									{ value: 'em', label: 'em', default: 0 },
									{ value: '%', label: '%', default: 0 },
								]}
							/>
						</Fragment>
					) : (
						<Fragment>
							<p
								style={{
									marginBottom: '16px',
									color: '#666',
								}}
							>
								{__(
									'Individual spacing controls (Padding & Margin)',
									'wedocs'
								)}
							</p>
							{/* Fallback individual controls if BoxControl is not available */}
							<div style={{ marginBottom: '16px' }}>
								<strong>{__('Padding', 'wedocs')}</strong>
							</div>
							<div style={{ marginBottom: '16px' }}>
								<strong>{__('Margin', 'wedocs')}</strong>
							</div>
						</Fragment>
					)}
				</PanelBody>

				<PanelBody
					title={__('Border & Typography', 'wedocs')}
					initialOpen={false}
				>
					{UnitControl ? (
						<Fragment>
							<UnitControl
								label={__('Border Radius', 'wedocs')}
								value={borderRadius}
								onChange={updateAttribute('borderRadius')}
								units={[
									{ value: 'px', label: 'px', default: 0 },
									{ value: 'em', label: 'em', default: 0 },
									{ value: '%', label: '%', default: 0 },
								]}
							/>

							<UnitControl
								label={__('Border Width', 'wedocs')}
								value={borderWidth}
								onChange={updateAttribute('borderWidth')}
								units={[
									{ value: 'px', label: 'px', default: 0 },
								]}
							/>

							<UnitControl
								label={__('Font Size', 'wedocs')}
								value={fontSize}
								onChange={updateAttribute('fontSize')}
								units={[
									{ value: 'px', label: 'px', default: 16 },
									{ value: 'em', label: 'em', default: 1 },
									{ value: 'rem', label: 'rem', default: 1 },
								]}
							/>
						</Fragment>
					) : (
						<Fragment>
							<RangeControl
								label={__('Border Radius (px)', 'wedocs')}
								value={parseInt(borderRadius)}
								onChange={(value) =>
									updateAttribute('borderRadius')(`${value}px`)
								}
								min={0}
								max={50}
							/>

							<RangeControl
								label={__('Border Width (px)', 'wedocs')}
								value={parseInt(borderWidth)}
								onChange={(value) =>
									updateAttribute('borderWidth')(`${value}px`)
								}
								min={0}
								max={10}
							/>

							<RangeControl
								label={__('Font Size (px)', 'wedocs')}
								value={parseInt(fontSize)}
								onChange={(value) =>
									updateAttribute('fontSize')(`${value}px`)
								}
								min={10}
								max={32}
							/>
						</Fragment>
					)}

					<SelectControl
						label={__('Border Style', 'wedocs')}
						value={borderStyle}
						options={[
							{ label: __('Solid', 'wedocs'), value: 'solid' },
							{ label: __('Dashed', 'wedocs'), value: 'dashed' },
							{ label: __('Dotted', 'wedocs'), value: 'dotted' },
							{ label: __('None', 'wedocs'), value: 'none' },
						]}
						onChange={updateAttribute('borderStyle')}
					/>

					<PanelColorSettings
						title={__('Border Color', 'wedocs')}
						initialOpen={false}
						colorSettings={[
							{
								value: borderColor,
								onChange: updateAttribute('borderColor'),
								label: __('Border Color', 'wedocs'),
							},
						]}
					/>

					<SelectControl
						label={__('Font Weight', 'wedocs')}
						value={fontWeight}
						options={[
							{ label: __('Normal', 'wedocs'), value: 'normal' },
							{ label: __('Bold', 'wedocs'), value: 'bold' },
							{ label: __('Light', 'wedocs'), value: '300' },
							{ label: __('Medium', 'wedocs'), value: '500' },
							{
								label: __('Semi Bold', 'wedocs'),
								value: '600',
							},
							{
								label: __('Extra Bold', 'wedocs'),
								value: '800',
							},
						]}
						onChange={updateAttribute('fontWeight')}
					/>
				</PanelBody>
			</InspectorControls>
		</Fragment>
	);
};

export default Inspector;
