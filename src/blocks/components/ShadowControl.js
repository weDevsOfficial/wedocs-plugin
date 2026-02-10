import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	ToggleControl,
	__experimentalUnitControl as UnitControl,
	__experimentalSpacer as Spacer
} from '@wordpress/components';
import { PanelColorSettings } from '@wordpress/block-editor';

const ShadowControl = ({
	label,
	shadowValue = {},
	onShadowChange,
	showToggle = true
}) => {
	const updateShadow = (key, newValue) => {
		onShadowChange({
			...shadowValue,
			[key]: newValue
		});
	};

	const enabled = shadowValue.enabled ?? false;

	return (
		<PanelBody title={label} initialOpen={false}>
			{showToggle && (
				<>
					<ToggleControl
						label={__('Enable Box Shadow', 'wedocs')}
						checked={enabled}
						onChange={(value) => updateShadow('enabled', value)}
					/>
					<Spacer marginTop={4} marginBottom={4} />
				</>
			)}

			{(enabled || !showToggle) && (
				<>
					{/* Horizontal Offset */}
					<UnitControl
						label={__('Horizontal Offset', 'wedocs')}
						value={shadowValue.horizontal || '0px'}
						onChange={(value) => updateShadow('horizontal', value)}
						units={[
							{ value: 'px', label: 'px' },
							{ value: 'em', label: 'em' },
							{ value: 'rem', label: 'rem' }
						]}
					/>

					<Spacer marginTop={3} marginBottom={3} />

					{/* Vertical Offset */}
					<UnitControl
						label={__('Vertical Offset', 'wedocs')}
						value={shadowValue.vertical || '2px'}
						onChange={(value) => updateShadow('vertical', value)}
						units={[
							{ value: 'px', label: 'px' },
							{ value: 'em', label: 'em' },
							{ value: 'rem', label: 'rem' }
						]}
					/>

					<Spacer marginTop={3} marginBottom={3} />

					{/* Blur Radius */}
					<UnitControl
						label={__('Blur Radius', 'wedocs')}
						value={shadowValue.blur || '4px'}
						onChange={(value) => updateShadow('blur', value)}
						units={[
							{ value: 'px', label: 'px' },
							{ value: 'em', label: 'em' },
							{ value: 'rem', label: 'rem' }
						]}
					/>

					<Spacer marginTop={3} marginBottom={3} />

					{/* Spread Radius */}
					<UnitControl
						label={__('Spread Radius', 'wedocs')}
						value={shadowValue.spread || '0px'}
						onChange={(value) => updateShadow('spread', value)}
						units={[
							{ value: 'px', label: 'px' },
							{ value: 'em', label: 'em' },
							{ value: 'rem', label: 'rem' }
						]}
					/>

					<Spacer marginTop={4} marginBottom={4} />

					{/* Shadow Color */}
					<PanelColorSettings
						title={__('Shadow Color', 'wedocs')}
						colorSettings={[
							{
								value: shadowValue.color || 'rgba(0,0,0,0.1)',
								onChange: (value) => updateShadow('color', value),
								label: __('Color', 'wedocs')
							}
						]}
					/>
				</>
			)}
		</PanelBody>
	);
};

export default ShadowControl;