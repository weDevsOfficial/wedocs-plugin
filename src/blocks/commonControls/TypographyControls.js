import { __ } from '@wordpress/i18n';
import {
	__experimentalFontFamilyControl as FontFamilyControl,
	LineHeightControl,
	useSetting,
	useSettings,
	FontSizePicker,
	__experimentalFontAppearanceControl as FontAppearanceControl,
} from '@wordpress/block-editor';
import {
	Flex,
	FlexItem,
	Button,
	__experimentalUnitControl as UnitControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
	SelectControl,
} from '@wordpress/components';
import {
	lineSolid,
	formatUnderline,
	formatStrikethrough,
	formatUppercase,
	formatLowercase,
	formatCapitalize,
} from '@wordpress/icons';

const TypographyControls = ({ attributes, setAttributes, device }) => {
	const { typographyControls } = attributes;
	const currentTypography = typographyControls[device] || {};
	const fontSizes = useSetting('typography.fontSizes');
	const fontFamilies = useSettings('typography.fontFamilies');

	// Combine both theme and custom fonts
	const themeFonts = fontFamilies[0]?.theme || [];
	const customFonts = fontFamilies[0]?.custom || [];
	const validFontFamilies = [...themeFonts, ...customFonts];

	return (
		<>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '16px',
				}}
			>
				{validFontFamilies.length > 0 ? (
					<FontFamilyControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						fontFamilies={validFontFamilies}
						onChange={(value) => {
							setAttributes({
								typographyControls: {
									...typographyControls,
									[device]: {
										...typographyControls[device],
										fontFamily: value,
									},
								},
							});
						}}
						value={currentTypography.fontFamily || ''}
					/>
				) : (
					<div className="wedocs-font-control-disabled">
						<SelectControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label={__('Font', 'wedocs')}
							help={__(
								'Not supported in classic themes.',
								'wedocs'
							)}
							value={'default'}
							onChange={() => {}}
							disabled
							options={[
								{
									disabled: true,
									label: __('Default', 'wedocs'),
									value: 'default',
								},
							]}
						/>
					</div>
				)}

				<FontSizePicker
					__next40pxDefaultSize
					fontSizes={fontSizes}
					onChange={(value) => {
						setAttributes({
							typographyControls: {
								...typographyControls,
								[device]: {
									...typographyControls[device],
									fontSize: value,
								},
							},
						});
					}}
					value={currentTypography.fontSize || ''}
					withSlider
					withReset={false}
				/>

				<Flex style={{ gap: '16px' }}>
					<FlexItem isBlock>
						<FontAppearanceControl
							__next40pxDefaultSize
							onChange={(value) => {
								setAttributes({
									typographyControls: {
										...typographyControls,
										[device]: {
											...typographyControls[device],
											fontAppearance: value,
										},
									},
								});
							}}
							value={currentTypography.fontAppearance || ''}
						/>
					</FlexItem>
					<FlexItem isBlock>
						<LineHeightControl
							__next40pxDefaultSize
							__unstableInputWidth="auto"
							onChange={(value) => {
								setAttributes({
									typographyControls: {
										...typographyControls,
										[device]: {
											...typographyControls[device],
											lineHeight: value,
										},
									},
								});
							}}
							value={currentTypography.lineHeight || ''}
						/>
					</FlexItem>
				</Flex>

				<Flex style={{ gap: '16px' }}>
					<FlexItem isBlock>
						<UnitControl
							label={__('Letter spacing', 'wedocs')}
							__next40pxDefaultSize
							onChange={(value) => {
								setAttributes({
									typographyControls: {
										...typographyControls,
										[device]: {
											...typographyControls[device],
											letterSpacing: value,
										},
									},
								});
							}}
							value={currentTypography.letterSpacing || ''}
						/>
					</FlexItem>
					<FlexItem isBlock>
						<ToggleGroupControl
							isDeselectable
							label={__('Decoration', 'wedocs')}
							value={currentTypography.textDecoration || ''}
							onChange={(value) => {
								setAttributes({
									typographyControls: {
										...typographyControls,
										[device]: {
											...typographyControls[device],
											textDecoration: value,
										},
									},
								});
							}}
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						>
							<ToggleGroupControlOptionIcon
								value="none"
								label={__('None', 'wedocs')}
								icon={lineSolid}
							/>
							<ToggleGroupControlOptionIcon
								value="underline"
								label={__('Underline', 'wedocs')}
								icon={formatUnderline}
							/>
							<ToggleGroupControlOptionIcon
								value="line-through"
								label={__('Strikethrough', 'wedocs')}
								icon={formatStrikethrough}
							/>
						</ToggleGroupControl>
					</FlexItem>
				</Flex>

				<ToggleGroupControl
					isDeselectable
					label={__('Letter case', 'wedocs')}
					value={currentTypography.textTransform || ''}
					onChange={(value) => {
						setAttributes({
							typographyControls: {
								...typographyControls,
								[device]: {
									...typographyControls[device],
									textTransform: value,
								},
							},
						});
					}}
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				>
					<ToggleGroupControlOptionIcon
						value="none"
						label={__('None', 'wedocs')}
						icon={lineSolid}
					/>
					<ToggleGroupControlOptionIcon
						value="uppercase"
						label={__('Uppercase', 'wedocs')}
						icon={formatUppercase}
					/>
					<ToggleGroupControlOptionIcon
						value="lowercase"
						label={__('Lowercase', 'wedocs')}
						icon={formatLowercase}
					/>
					<ToggleGroupControlOptionIcon
						value="capitalize"
						label={__('Capitalize', 'wedocs')}
						icon={formatCapitalize}
					/>
				</ToggleGroupControl>
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
						typographyControls: {
							...typographyControls,
							[device]: {
								...currentTypography,
								fontFamily: null,
								fontSize: null,
								fontAppearance: null,
								lineHeight: null,
								letterSpacing: null,
								textDecoration: null,
								textTransform: null,
							},
						},
					});
				}}
			/>
		</>
	);
};

export default TypographyControls;
