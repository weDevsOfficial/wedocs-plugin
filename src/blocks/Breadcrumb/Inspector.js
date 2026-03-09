import { __ } from "@wordpress/i18n";
import {
	InspectorControls,
} from "@wordpress/block-editor";
import {
	PanelBody,
	ToggleControl,
	RangeControl,
	__experimentalDropdownContentWrapper as DropdownContentWrapper,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	Button,
	ColorIndicator,
	ColorPalette,
	Dropdown,
	__experimentalHStack as HStack,
	__experimentalText as Text,
} from "@wordpress/components";
import { useSelect } from "@wordpress/data";

export default function Inspector({ attributes, setAttributes }) {
	const {
		separator,
		hideHomeIcon,
		alignment,
		breadcrumbSeparator,
		truncateTitle,
		maxTitleLength,
		collapseBreadcrumbs,
		maxVisibleItems,
	} = attributes;

	// Fetch theme colors and gradients
	const { themeColors, themeGradients } = useSelect((select) => {
		const editorSettings = select("core/block-editor").getSettings();
		return {
			themeColors: editorSettings.colors,
			themeGradients: editorSettings.gradients,
		};
	});



	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Settings", "wedocs-blocks")}>
					<ToggleGroupControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						isBlock
						label={__("Separator Icon", "wedocs-blocks")}
						help={__(
							"Select the separator icon for the breadcrumbs.",
							"wedocs-blocks",
						)}
						onChange={(value) => setAttributes({ separator: value })}
						value={separator}
					>
						<ToggleGroupControlOption label="/" value="slash" />
						<ToggleGroupControlOption label="›" value="arrow" />
						<ToggleGroupControlOption label="»" value="chevron" />
						<ToggleGroupControlOption label="•" value="dot" />
					</ToggleGroupControl>
					<ToggleControl
						label={__("Hide Home Icon", "wedocs-blocks")}
						help={__(
							"Hide the home icon from the breadcrumbs.",
							"wedocs-blocks",
						)}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						checked={hideHomeIcon}
						onChange={() => setAttributes({ hideHomeIcon: !hideHomeIcon })}
					/>
					<ToggleGroupControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						isBlock
						label={__("Alignment", "wedocs-blocks")}
						help={__(
							"Select the alignment for the breadcrumbs.",
							"wedocs-blocks",
						)}
						onChange={(value) => setAttributes({ alignment: value })}
						value={alignment}
					>
						<ToggleGroupControlOption label={__("Left", "wedocs-blocks")} value="left" />
						<ToggleGroupControlOption label={__("Center", "wedocs-blocks")} value="center" />
						<ToggleGroupControlOption label={__("Right", "wedocs-blocks")} value="right" />
					</ToggleGroupControl>
					<ToggleControl
						label={__("Truncate Long Titles", "wedocs-blocks")}
						help={__(
							"Shorten breadcrumb titles that exceed the character limit.",
							"wedocs-blocks",
						)}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						checked={truncateTitle}
						onChange={() => setAttributes({ truncateTitle: !truncateTitle })}
					/>
					{truncateTitle && (
						<RangeControl
							label={__("Max Title Length", "wedocs-blocks")}
							help={__(
								"Maximum number of characters before truncating with ellipsis.",
								"wedocs-blocks",
							)}
							value={maxTitleLength}
							onChange={(value) => setAttributes({ maxTitleLength: value })}
							min={5}
							max={50}
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
					)}
					<ToggleControl
						label={__("Collapse Deep Nesting", "wedocs-blocks")}
						help={__(
							"Collapse middle breadcrumb items into \"...\" when there are too many levels.",
							"wedocs-blocks",
						)}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						checked={collapseBreadcrumbs}
						onChange={() => setAttributes({ collapseBreadcrumbs: !collapseBreadcrumbs })}
					/>
					{collapseBreadcrumbs && (
						<RangeControl
							label={__("Max Visible Items", "wedocs-blocks")}
							help={__(
								"Number of breadcrumb items to show before collapsing middle items.",
								"wedocs-blocks",
							)}
							value={maxVisibleItems}
							onChange={(value) => setAttributes({ maxVisibleItems: value })}
							min={2}
							max={10}
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
					)}
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="styles">
				<PanelBody
					title={__("Breadcrumb Separator", "wedocs-blocks")}
					initialOpen={false}
				>
					<div style={{ marginBottom: "16px" }}>
						<Text
							style={{
								fontSize: "11px",
								fontWeight: "500",
								lineHeight: "1.4",
								textTransform: "uppercase",
								display: "block",
								maxWidth: "100%",
								textOverflow: "ellipsis",
								whiteSpace: "nowrap",
								marginBottom: "8px",
							}}
						>
							{__("Color", "wedocs-blocks")}
						</Text>
						<Dropdown
							style={{ width: "100%" }}
							popoverProps={{
								placement: "left-start",
								offset: 36,
								shift: true,
							}}
							renderToggle={({ isOpen, onToggle }) => (
								<Button
									__next40pxDefaultSize
									onClick={onToggle}
									aria-expanded={isOpen}
									className={isOpen && "is-open"}
									style={{
										width: "100%",
										border: "1px solid #ddd",
									}}
								>
									<HStack alignment="left">
										<ColorIndicator colorValue={breadcrumbSeparator.color} />
										<Text>{__("Separator Icon", "wedocs-blocks")}</Text>
									</HStack>
								</Button>
							)}
							renderContent={() => (
								<DropdownContentWrapper
									style={{ width: "260px" }}
									paddingSize="medium"
								>
									<ColorPalette
										enableAlpha
										value={breadcrumbSeparator.color}
										colors={[
											{
												colors: themeColors,
												name: __("Theme", "wedocs-blocks"),
											},
										]}
										onChange={(color) =>
											setAttributes({
												breadcrumbSeparator: {
													...breadcrumbSeparator,
													color: color,
												},
											})
										}
									/>
								</DropdownContentWrapper>
							)}
						/>
					</div>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
