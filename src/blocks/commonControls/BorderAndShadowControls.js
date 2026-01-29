import { __ } from '@wordpress/i18n';
import {
	__experimentalBorderRadiusControl as BorderRadiusControl,
	useSetting,
} from '@wordpress/block-editor';
import {
	BorderBoxControl,
	ColorPalette,
	Dropdown,
	__experimentalDropdownContentWrapper as DropdownContentWrapper,
	__experimentalHStack as HStack,
	__experimentalText as Text,
	Button,
	Icon,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import { shadow } from '@wordpress/icons';

const BorderAndShadowControls = ({ attributes, setAttributes, device }) => {
	const { borderAndShadowControls } = attributes;
	const currentBorderAndShadow = borderAndShadowControls[device] || {};
	const themeColors = useSetting('color.palette');

	// Provide default values for border radius
	const defaultBorderRadius = {
		topLeft: undefined,
		topRight: undefined,
		bottomLeft: undefined,
		bottomRight: undefined,
	};

	// Default box shadow values
	const defaultBoxShadow = {
		x: '0px',
		y: '0px',
		blur: '0px',
		spread: '0px',
		color: 'rgba(0, 0, 0, 0.2)',
		inset: false,
	};

	const currentBoxShadow =
		currentBorderAndShadow.boxShadow || defaultBoxShadow;

	const handleShadowChange = (property, value) => {
		setAttributes({
			borderAndShadowControls: {
				...borderAndShadowControls,
				[device]: {
					...currentBorderAndShadow,
					boxShadow: {
						...currentBoxShadow,
						[property]: value,
					},
				},
			},
		});
	};

	const handleInsetChange = (value) => {
		handleShadowChange('inset', value === 'true');
	};

	return (
		<div className="wedocs-border-and-shadow-controls">
			<BorderBoxControl
				__next40pxDefaultSize
				label={__('Border', 'wedocs')}
				value={currentBorderAndShadow.border}
				popoverOffset={36}
				popoverPlacement="left-start"
				colors={[
					{
						colors: themeColors,
						name: __('Theme', 'wedocs'),
					},
				]}
				enableAlpha
				onChange={(value) => {
					setAttributes({
						borderAndShadowControls: {
							...borderAndShadowControls,
							[device]: {
								...currentBorderAndShadow,
								border: value,
							},
						},
					});
				}}
			/>
			<BorderRadiusControl
				__next40pxDefaultSize
				label={__('Border Radius', 'wedocs')}
				values={
					currentBorderAndShadow.borderRadius || defaultBorderRadius
				}
				onChange={(value) => {
					setAttributes({
						borderAndShadowControls: {
							...borderAndShadowControls,
							[device]: {
								...currentBorderAndShadow,
								borderRadius: value,
							},
						},
					});
				}}
			/>
			<Dropdown
				style={{
					width: '100%',
					borderTop: '1px solid #ddd',
					borderTopLeftRadius: '2px',
					borderTopRightRadius: '2px',
				}}
				popoverProps={{
					placement: 'left-start',
					offset: 36,
					shift: true,
				}}
				renderToggle={({ isOpen, onToggle }) => (
					<Button
						__next40pxDefaultSize
						onClick={onToggle}
						aria-expanded={isOpen}
						style={{ width: '100%' }}
						className={isOpen && 'is-open'}
					>
						<HStack alignment="left">
							<Icon icon={shadow} />
							<Text>{__('Drop Shadow', 'wedocs')}</Text>
						</HStack>
					</Button>
				)}
				renderContent={() => (
					<DropdownContentWrapper
						style={{ width: '280px' }}
						paddingSize="medium"
					>
						<ColorPalette
							style={{ marginBottom: '8px' }}
							enableAlpha
							value={currentBoxShadow.color}
							clearable={false}
							onChange={(color) =>
								handleShadowChange('color', color)
							}
						/>
						<ToggleGroupControl
							value={currentBoxShadow.inset ? 'true' : 'false'}
							onChange={handleInsetChange}
							isBlock
							__nextHasNoMarginBottom
							__next40pxDefaultSize
						>
							<ToggleGroupControlOption
								value="false"
								label={__('Outset', 'wedocs')}
							/>
							<ToggleGroupControlOption
								value="true"
								label={__('Inset', 'wedocs')}
							/>
						</ToggleGroupControl>

						{/* Drop Shadow Unit Controls */}
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: '1fr 1fr',
								gap: '12px',
								marginTop: '16px',
							}}
						>
							<UnitControl
								__next40pxDefaultSize
								label={__('X Position', 'wedocs')}
								value={currentBoxShadow.x || '0px'}
								onChange={(value) =>
									handleShadowChange('x', value || '0px')
								}
							/>
							<UnitControl
								__next40pxDefaultSize
								label={__('Y Position', 'wedocs')}
								value={currentBoxShadow.y || '0px'}
								onChange={(value) =>
									handleShadowChange('y', value || '0px')
								}
							/>
							<UnitControl
								__next40pxDefaultSize
								label={__('Blur', 'wedocs')}
								value={currentBoxShadow.blur || '0px'}
								onChange={(value) =>
									handleShadowChange('blur', value || '0px')
								}
								min={0}
							/>
							<UnitControl
								__next40pxDefaultSize
								label={__('Spread', 'wedocs')}
								value={currentBoxShadow.spread || '0px'}
								onChange={(value) =>
									handleShadowChange('spread', value || '0px')
								}
							/>
						</div>
					</DropdownContentWrapper>
				)}
			/>

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
						borderAndShadowControls: {
							...borderAndShadowControls,
							[device]: {
								...currentBorderAndShadow,
								border: {},
								borderRadius: null,
								boxShadow: {},
							},
						},
					});
				}}
			/>
		</div>
	);
};

export default BorderAndShadowControls;
