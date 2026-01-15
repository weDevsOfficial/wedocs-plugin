import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	__experimentalUnitControl as UnitControl,
	__experimentalSpacer as Spacer
} from '@wordpress/components';

const DimensionControl = ({
	label,
	widthValue,
	onWidthChange,
	heightValue,
	onHeightChange,
	showHeight = true,
	linkValues = false
}) => {
	const handleWidthChange = (newValue) => {
		onWidthChange(newValue);
		if (linkValues && showHeight && onHeightChange) {
			onHeightChange(newValue);
		}
	};

	return (
		<PanelBody title={label} initialOpen={false}>
			{/* Width */}
			<UnitControl
				label={__('Width', 'wedocs')}
				value={widthValue || 'auto'}
				onChange={handleWidthChange}
				units={[
					{ value: 'px', label: 'px' },
					{ value: 'em', label: 'em' },
					{ value: 'rem', label: 'rem' },
					{ value: '%', label: '%' },
					{ value: 'auto', label: 'auto' }
				]}
			/>

			{/* Height */}
			{showHeight && (
				<>
					<Spacer marginTop={3} marginBottom={3} />
					<UnitControl
						label={__('Height', 'wedocs')}
						value={heightValue || 'auto'}
						onChange={onHeightChange}
						units={[
							{ value: 'px', label: 'px' },
							{ value: 'em', label: 'em' },
							{ value: 'rem', label: 'rem' },
							{ value: '%', label: '%' },
							{ value: 'auto', label: 'auto' }
						]}
					/>
				</>
			)}
		</PanelBody>
	);
};

export default DimensionControl;