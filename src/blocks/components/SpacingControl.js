import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	__experimentalBoxControl as BoxControl,
	__experimentalUnitControl as UnitControl,
	__experimentalSpacer as Spacer
} from '@wordpress/components';

const SpacingControl = ({
	label,
	paddingValue = {},
	onPaddingChange,
	marginValue = {},
	onMarginChange,
	showPadding = true,
	showMargin = true,
	showGap = false,
	gapValue,
	onGapChange
}) => {
	return (
		<PanelBody title={label} initialOpen={false}>
			{/* Padding */}
			{showPadding && (
				<>
					<BoxControl
						label={__('Padding', 'wedocs')}
						values={paddingValue}
						onChange={onPaddingChange}
						units={[
							{ value: 'px', label: 'px' },
							{ value: 'em', label: 'em' },
							{ value: 'rem', label: 'rem' },
							{ value: '%', label: '%' }
						]}
						allowReset={true}
						resetValues={{
							top: '0px',
							right: '0px',
							bottom: '0px',
							left: '0px'
						}}
					/>
					<Spacer marginTop={4} marginBottom={4} />
				</>
			)}

			{/* Margin */}
			{showMargin && (
				<>
					<BoxControl
						label={__('Margin', 'wedocs')}
						values={marginValue}
						onChange={onMarginChange}
						units={[
							{ value: 'px', label: 'px' },
							{ value: 'em', label: 'em' },
							{ value: 'rem', label: 'rem' },
							{ value: '%', label: '%' }
						]}
						allowReset={true}
						resetValues={{
							top: '0px',
							right: '0px',
							bottom: '0px',
							left: '0px'
						}}
					/>
					<Spacer marginTop={4} marginBottom={4} />
				</>
			)}

			{/* Gap */}
			{showGap && (
				<UnitControl
					label={__('Gap', 'wedocs')}
					value={gapValue || '10px'}
					onChange={onGapChange}
					units={[
						{ value: 'px', label: 'px' },
						{ value: 'em', label: 'em' },
						{ value: 'rem', label: 'rem' }
					]}
				/>
			)}
		</PanelBody>
	);
};

export default SpacingControl;