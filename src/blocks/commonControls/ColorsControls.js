/* eslint-disable @wordpress/no-unsafe-wp-apis */
import { __ } from '@wordpress/i18n';
import {
	Button,
	ColorIndicator,
	ColorPalette,
	Dropdown,
	__experimentalDropdownContentWrapper as DropdownContentWrapper,
	GradientPicker,
	__experimentalHStack as HStack,
	TabPanel,
	__experimentalText as Text,
	__experimentalZStack as ZStack,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';

const ColorsControls = ({ attributes, setAttributes, isTextColor = false, isBackgroundColor = false, isLinkColor = false }) => {
	const { colorsControls } = attributes;
	const currentColors = colorsControls[device] || {};

	// Fetch theme colors and gradients
	const { themeColors, themeGradients } = useSelect((select) => {
		const editorSettings = select('core/block-editor').getSettings();
		return {
			themeColors: editorSettings.colors,
			themeGradients: editorSettings.gradients,
		};
	});

	return (
		<>
			<div className="wedocs-colors-controls">
				{/* Text Color Control */}
				<Dropdown
					style={{ width: '100%' }}
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
								<ColorIndicator
									colorValue={currentColors.textColor}
								/>
								<Text>{__('Color', 'wedocs')}</Text>
							</HStack>
						</Button>
					)}
					renderContent={() => (
						<DropdownContentWrapper
							style={{ width: '260px' }}
							paddingSize="medium"
						>
							<ColorPalette
								enableAlpha
								value={currentColors.textColor}
								colors={[
									{
										colors: themeColors,
										name: __('Theme', 'wedocs'),
									},
								]}
								onChange={(color) =>
									setAttributes({
										colorsControls: {
											...colorsControls,
											[device]: {
												...currentColors,
												textColor: color,
											},
										},
									})
								}
							/>
						</DropdownContentWrapper>
					)}
				/>

				{/* Background Color Control */}
				<Dropdown
					style={{ width: '100%' }}
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
								<ColorIndicator
									colorValue={currentColors.backgroundColor}
								/>
								<Text>
									{__('Background', 'wedocs')}
								</Text>
							</HStack>
						</Button>
					)}
					renderContent={() => (
						<DropdownContentWrapper
							style={{ width: '260px' }}
							paddingSize="none"
						>
							<TabPanel
								tabs={[
									{
										name: 'color',
										title: __('Color', 'wedocs'),
										content: (
											<div className="block-editor-wedocs-dropdown-tab-content">
												<ColorPalette
													enableAlpha
													value={
														currentColors.backgroundColor
													}
													colors={[
														{
															colors: themeColors,
															name: __(
																'Theme',
																'wedocs'
															),
														},
													]}
													onChange={(color) =>
														setAttributes({
															colorsControls: {
																...colorsControls,
																[device]: {
																	...currentColors,
																	backgroundColor:
																		color,
																},
															},
														})
													}
												/>
											</div>
										),
									},
									{
										name: 'gradient',
										title: __(
											'Gradient',
											'wedocs'
										),
										content: (
											<div className="block-editor-wedocs-dropdown-tab-content">
												<GradientPicker
													value={
														currentColors.backgroundColor ??
														null
													}
													gradients={[
														{
															gradients:
																themeGradients,
															name: __(
																'Theme',
																'wedocs'
															),
														},
													]}
													onChange={(gradient) =>
														setAttributes({
															colorsControls: {
																...colorsControls,
																[device]: {
																	...currentColors,
																	backgroundColor:
																		gradient,
																},
															},
														})
													}
												/>
											</div>
										),
									},
								]}
							>
								{({ content }) => content}
							</TabPanel>
						</DropdownContentWrapper>
					)}
				/>

				{/* Link Color Control */}
				<Dropdown
					style={{ width: '100%' }}
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
								<ZStack offset={-8} isLayered={false}>
									<ColorIndicator
										colorValue={currentColors.linkColor}
									/>
									<ColorIndicator
										colorValue={
											currentColors.linkHoverColor
										}
									/>
								</ZStack>
								<Text>{__('Link', 'wedocs')}</Text>
							</HStack>
						</Button>
					)}
					renderContent={() => (
						<DropdownContentWrapper
							style={{ width: '260px' }}
							paddingSize="none"
						>
							<TabPanel
								tabs={[
									{
										name: 'default',
										title: __(
											'Default',
											'wedocs'
										),
										content: (
											<div className="block-editor-wedocs-dropdown-tab-content">
												<ColorPalette
													enableAlpha
													value={
														currentColors.linkColor
													}
													colors={[
														{
															colors: themeColors,
															name: __(
																'Theme',
																'wedocs'
															),
														},
													]}
													onChange={(color) =>
														setAttributes({
															colorsControls: {
																...colorsControls,
																[device]: {
																	...currentColors,
																	linkColor:
																		color,
																},
															},
														})
													}
												/>
											</div>
										),
									},
									{
										name: 'hover-color',
										title: __('Hover', 'wedocs'),
										content: (
											<div className="block-editor-wedocs-dropdown-tab-content">
												<ColorPalette
													enableAlpha
													value={
														currentColors.linkHoverColor
													}
													colors={[
														{
															colors: themeColors,
															name: __(
																'Theme',
																'wedocs'
															),
														},
													]}
													onChange={(color) =>
														setAttributes({
															colorsControls: {
																...colorsControls,
																[device]: {
																	...currentColors,
																	linkHoverColor:
																		color,
																},
															},
														})
													}
												/>
											</div>
										),
									},
								]}
							>
								{({ content }) => content}
							</TabPanel>
						</DropdownContentWrapper>
					)}
				/>
			</div>

			<Button
				__next40pxDefaultSize
				variant="secondary"
				isDestructive
				text={__('Reset All', 'wedocs')}
				style={{
					width: '100%',
					justifyContent: 'center',
					marginTop: '16px',
				}}
				onClick={() => {
					setAttributes({
						colorsControls: {
							...colorsControls,
							[device]: {
								...currentColors,
								textColor: undefined,
								backgroundColor: undefined,
								linkColor: undefined,
								linkHoverColor: undefined,
							},
						},
					});
				}}
			/>
		</>
	);
};

export default ColorsControls;
