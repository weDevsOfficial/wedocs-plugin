import {
	__experimentalUnitControl as UnitControl,
	Button,
	FlexItem,
	__experimentalHStack as HStack,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { __experimentalSpacingSizesControl as SpacingSizesControl } from '@wordpress/block-editor';

const DimensionsControls = ({ attributes, setAttributes, device }) => {
	const { dimensionsControls } = attributes;
	const currentDimensions = dimensionsControls[device] || {};

	const handlePaddingChange = (value) => {
		const newDimensionsControls = {
			...dimensionsControls,
			[device]: {
				...currentDimensions,
				padding: {
					...currentDimensions.padding,
					...value,
				},
			},
		};

		setAttributes({ dimensionsControls: newDimensionsControls });
	};

	const handleMarginChange = (value) => {
		const newDimensionsControls = {
			...dimensionsControls,
			[device]: {
				...currentDimensions,
				margin: {
					...currentDimensions.margin,
					...value,
				},
			},
		};

		setAttributes({ dimensionsControls: newDimensionsControls });
	};

	const handleBlockSpacingChange = (value) => {
		const newDimensionsControls = {
			...dimensionsControls,
			[device]: {
				...currentDimensions,
				blockSpacing: {
					...currentDimensions.blockSpacing,
					...value,
				},
			},
		};

		setAttributes({ dimensionsControls: newDimensionsControls });
	};

	return (
		<div className="wedocs-dimensions-control">
			<SpacingSizesControl
				values={currentDimensions.padding || {}}
				onChange={handlePaddingChange}
				label={__('Padding', 'wedocs')}
				minimumCustomValue={0}
			/>

			<SpacingSizesControl
				values={currentDimensions.margin || {}}
				onChange={handleMarginChange}
				label={__('Margin', 'wedocs')}
				minimumCustomValue={-Infinity}
			/>

			<SpacingSizesControl
				values={currentDimensions.blockSpacing || {}}
				onChange={handleBlockSpacingChange}
				sides={['horizontal', 'vertical']}
				label={__('Block Spacing', 'wedocs')}
				minimumCustomValue={0}
			/>

			<VStack spacing={3}>
				<HStack justify="space-between" alignment="center">
					<h3
						style={{
							fontSize: '11px',
							fontWeight: '500',
							lineHeight: '1.4',
							margin: '0',
						}}
					>
						{__('Width', 'wedocs')}
					</h3>
				</HStack>

				{/* Row and Column controls */}
				<HStack spacing={2}>
					<FlexItem>
						<UnitControl
							__next40pxDefaultSize
							label={__('Fixed', 'wedocs')}
							value={currentDimensions.width || ''}
							onChange={(value) => {
								setAttributes({
									dimensionsControls: {
										...dimensionsControls,
										[device]: {
											...currentDimensions,
											width: value,
										},
									},
								});
							}}
						/>
					</FlexItem>
					<FlexItem>
						<UnitControl
							__next40pxDefaultSize
							label={__('Min', 'wedocs')}
							value={currentDimensions.minWidth || ''}
							onChange={(value) => {
								setAttributes({
									dimensionsControls: {
										...dimensionsControls,
										[device]: {
											...currentDimensions,
											minWidth: value,
										},
									},
								});
							}}
						/>
					</FlexItem>
					<FlexItem>
						<UnitControl
							__next40pxDefaultSize
							label={__('Max', 'wedocs')}
							value={currentDimensions.maxWidth || ''}
							onChange={(value) => {
								setAttributes({
									dimensionsControls: {
										...dimensionsControls,
										[device]: {
											...currentDimensions,
											maxWidth: value,
										},
									},
								});
							}}
						/>
					</FlexItem>
				</HStack>
			</VStack>

			<VStack spacing={3}>
				<HStack justify="space-between" alignment="center">
					<h3
						style={{
							fontSize: '11px',
							fontWeight: '500',
							lineHeight: '1.4',
							margin: '0',
						}}
					>
						{__('Height', 'wedocs')}
					</h3>
				</HStack>

				{/* Row and Column controls */}
				<HStack spacing={2}>
					<FlexItem>
						<UnitControl
							__next40pxDefaultSize
							label={__('Fixed', 'wedocs')}
							value={currentDimensions.height || ''}
							onChange={(value) => {
								setAttributes({
									dimensionsControls: {
										...dimensionsControls,
										[device]: {
											...currentDimensions,
											height: value,
										},
									},
								});
							}}
						/>
					</FlexItem>
					<FlexItem>
						<UnitControl
							__next40pxDefaultSize
							label={__('Min', 'wedocs')}
							value={currentDimensions.minHeight || ''}
							onChange={(value) => {
								setAttributes({
									dimensionsControls: {
										...dimensionsControls,
										[device]: {
											...currentDimensions,
											minHeight: value,
										},
									},
								});
							}}
						/>
					</FlexItem>
					<FlexItem>
						<UnitControl
							__next40pxDefaultSize
							label={__('Max', 'wedocs')}
							value={currentDimensions.maxHeight || ''}
							onChange={(value) => {
								setAttributes({
									dimensionsControls: {
										...dimensionsControls,
										[device]: {
											...currentDimensions,
											maxHeight: value,
										},
									},
								});
							}}
						/>
					</FlexItem>
				</HStack>
			</VStack>

			<Button
				__next40pxDefaultSize
				variant="secondary"
				isDestructive
				text={__('Reset All', 'wedocs')}
				style={{
					width: '100%',
					justifyContent: 'center',
				}}
				onClick={() => {
					setAttributes({
						dimensionsControls: {
							...dimensionsControls,
							[device]: {
								...currentDimensions,
								width: null,
								minWidth: null,
								maxWidth: null,
								height: null,
								minHeight: null,
								maxHeight: null,
								padding: null,
								margin: null,
								blockSpacing: null,
							},
						},
					});
				}}
			/>
		</div>
	);
};

export default DimensionsControls;
