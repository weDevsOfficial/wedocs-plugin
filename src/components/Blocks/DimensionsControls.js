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
		<div className="block-responsive-dimensions-control">
			<SpacingSizesControl
				values={currentDimensions.padding || {}}
				onChange={handlePaddingChange}
				label={__('Padding', 'block-responsive')}
				minimumCustomValue={0}
			/>

			<SpacingSizesControl
				values={currentDimensions.margin || {}}
				onChange={handleMarginChange}
				label={__('Margin', 'block-responsive')}
				minimumCustomValue={-Infinity}
			/>

			<SpacingSizesControl
				values={currentDimensions.blockSpacing || {}}
				onChange={handleBlockSpacingChange}
				sides={['horizontal', 'vertical']}
				label={__('Block Spacing', 'block-responsive')}
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
						{__('Width', 'block-responsive')}
					</h3>
				</HStack>

				{/* Row and Column controls */}
				<HStack spacing={2}>
					<FlexItem>
						<UnitControl
							__next40pxDefaultSize
							label={__('Fixed', 'block-responsive')}
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
							label={__('Min', 'block-responsive')}
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
							label={__('Max', 'block-responsive')}
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
						{__('Height', 'block-responsive')}
					</h3>
				</HStack>

				{/* Row and Column controls */}
				<HStack spacing={2}>
					<FlexItem>
						<UnitControl
							__next40pxDefaultSize
							label={__('Fixed', 'block-responsive')}
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
							label={__('Min', 'block-responsive')}
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
							label={__('Max', 'block-responsive')}
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
				text={__('Reset All', 'block-responsive')}
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
