import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	SelectControl,
	__experimentalUnitControl as UnitControl,
	__experimentalBoxControl as BoxControl,
	__experimentalSpacer as Spacer
} from '@wordpress/components';
import { PanelColorSettings } from '@wordpress/block-editor';

const BorderControl = ({
	label,
	borderStyle = 'none',
	onBorderStyleChange,
	borderWidth = {},
	onBorderWidthChange,
	borderColor,
	onBorderColorChange,
	borderRadius,
	onBorderRadiusChange,
	showIndividualSides = true
}) => {
	return (
		<PanelBody title={label} initialOpen={false}>
			{/* Border Style */}
			<SelectControl
				label={__('Border Style', 'wedocs')}
				value={borderStyle}
				options={[
					{ label: __('None', 'wedocs'), value: 'none' },
					{ label: __('Solid', 'wedocs'), value: 'solid' },
					{ label: __('Dashed', 'wedocs'), value: 'dashed' },
					{ label: __('Dotted', 'wedocs'), value: 'dotted' },
					{ label: __('Double', 'wedocs'), value: 'double' },
					{ label: __('Groove', 'wedocs'), value: 'groove' },
					{ label: __('Ridge', 'wedocs'), value: 'ridge' },
					{ label: __('Inset', 'wedocs'), value: 'inset' },
					{ label: __('Outset', 'wedocs'), value: 'outset' }
				]}
				onChange={onBorderStyleChange}
			/>

			{borderStyle !== 'none' && (
				<>
					<Spacer marginTop={4} marginBottom={4} />

					{/* Border Width */}
					{showIndividualSides ? (
						<BoxControl
							label={__('Border Width', 'wedocs')}
							values={borderWidth}
							onChange={onBorderWidthChange}
							units={[
								{ value: 'px', label: 'px' },
								{ value: 'em', label: 'em' },
								{ value: 'rem', label: 'rem' }
							]}
							allowReset={true}
							resetValues={{
								top: '1px',
								right: '1px',
								bottom: '1px',
								left: '1px'
							}}
						/>
					) : (
						<UnitControl
							label={__('Border Width', 'wedocs')}
							value={borderWidth.top || '1px'}
							onChange={(newValue) => onBorderWidthChange({
								top: newValue,
								right: newValue,
								bottom: newValue,
								left: newValue
							})}
							units={[
								{ value: 'px', label: 'px' },
								{ value: 'em', label: 'em' },
								{ value: 'rem', label: 'rem' }
							]}
						/>
					)}

					<Spacer marginTop={4} marginBottom={4} />

					{/* Border Color */}
					<PanelColorSettings
						title={__('Border Color', 'wedocs')}
						colorSettings={[
							{
								value: borderColor,
								onChange: onBorderColorChange,
								label: __('Color', 'wedocs')
							}
						]}
					/>
				</>
			)}

			<Spacer marginTop={4} marginBottom={4} />

			{/* Border Radius */}
			<UnitControl
				label={__('Border Radius', 'wedocs')}
				value={borderRadius || '0px'}
				onChange={onBorderRadiusChange}
				units={[
					{ value: 'px', label: 'px' },
					{ value: 'em', label: 'em' },
					{ value: 'rem', label: 'rem' },
					{ value: '%', label: '%' }
				]}
			/>
		</PanelBody>
	);
};

export default BorderControl;