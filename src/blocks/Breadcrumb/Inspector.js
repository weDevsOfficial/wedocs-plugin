import { __ } from "@wordpress/i18n";
import {
	InspectorControls,
	__experimentalSpacingSizesControl as SpacingSizesControl,
} from "@wordpress/block-editor";
import {
	SelectControl,
	PanelBody,
	ToggleControl,
	__experimentalDropdownContentWrapper as DropdownContentWrapper,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	Button,
	ButtonGroup,
	ColorIndicator,
	ColorPalette,
	Dropdown,
	Flex,
	FlexItem,
	Icon,
	__experimentalHStack as HStack,
	__experimentalText as Text,
} from "@wordpress/components";
import { dispatch, useSelect } from "@wordpress/data";
import { desktop, mobile, tablet } from "@wordpress/icons";

export default function Inspector({ attributes, setAttributes }) {
	const {
		layout,
		separator,
		hideHomeIcon,
		breadcrumbSeparator,
		separatorSpacing,
	} = attributes;

	// Fetch theme colors and gradients
	const { themeColors, themeGradients } = useSelect((select) => {
		const editorSettings = select("core/block-editor").getSettings();
		return {
			themeColors: editorSettings.colors,
			themeGradients: editorSettings.gradients,
		};
	});

	const handlePaddingChange = (value, device) => {
		const newSeparatorSpacing = {
			...separatorSpacing,
			[device]: {
				...separatorSpacing[device],
				padding: {
					...separatorSpacing[device].padding,
					...value.padding,
				},
			},
		};

		setAttributes({ separatorSpacing: newSeparatorSpacing });
	};

	const handleMarginChange = (value, device) => {
		const newSeparatorSpacing = {
			...separatorSpacing,
			[device]: {
				...separatorSpacing[device],
				margin: {
					...separatorSpacing[device].margin,
					...value.margin,
				},
			},
		};

		setAttributes({ separatorSpacing: newSeparatorSpacing });
	};

	// Updated device detection that works with both editors
	const { selectedDevice, editorMode } = useSelect((select) => {
		// Detect which editor we're in
		const isSiteEditor = !!select("core/edit-site");
		const isPostEditor = !!select("core/edit-post");

		let device = "Desktop";

		// Use the newer core/editor API if available (WP 6.5+)
		const editorSelect = select("core/editor");
		if (editorSelect?.getDeviceType) {
			device = editorSelect.getDeviceType();
		} else if (isSiteEditor) {
			// Site Editor fallback for older versions
			device =
				select("core/edit-site").__experimentalGetPreviewDeviceType?.() ||
				"Desktop";
		} else if (isPostEditor) {
			// Post Editor fallback for older versions
			device =
				select("core/edit-post").__experimentalGetPreviewDeviceType?.() ||
				"Desktop";
		}

		return {
			selectedDevice: device,
			editorMode: isSiteEditor ? "site-editor" : "post-editor",
		};
	}, []);

	const setCustomPreviewDeviceType = (device) => {
		const editorDispatch = dispatch("core/editor");
		if (editorDispatch?.setDeviceType) {
			editorDispatch.setDeviceType(device);
		} else if (editorMode === "site-editor") {
			dispatch("core/edit-site")?.__experimentalSetPreviewDeviceType?.(device);
		} else {
			dispatch("core/edit-post")?.__experimentalSetPreviewDeviceType?.(device);
		}
	};

	const isDesktop = selectedDevice === "Desktop";
	const isTablet = selectedDevice === "Tablet";
	const isMobile = selectedDevice === "Mobile";

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Settings", "wedocs-blocks")}>
					<SelectControl
						label={__("Select Layout", "wedocs-blocks")}
						help={__("Select the layout for the breadcrumbs.", "wedocs-blocks")}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						value={layout}
						options={[
							{ label: "Layout 1", value: "layout-1" },
							{ label: "Layout 2", value: "layout-2" }
						]}
						onChange={(value) => setAttributes({ layout: value })}
					/>
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
					<div className="wedocs-responsive-wrapper">
						<Flex
							style={{
								marginBottom: "16px",
								cursor: "pointer",
								minHeight: "32px",
							}}
						>
							<FlexItem
								style={{
									fontWeight: "600",
									fontSize: "12px",
									lineHeight: "1.4",
								}}
							>
								{__("Separator Spacing", "wedocs-blocks")}
							</FlexItem>
							<FlexItem>
								<ButtonGroup
									className="wedocs-responsive-tabs-group"
									onClick={(e) => e.stopPropagation()}
								>
									<Button
										label={__("Desktop", "wedocs-blocks")}
										icon={<Icon icon={desktop} />}
										className={isDesktop && "wedocs-active-res-tab"}
										onClick={() => setCustomPreviewDeviceType("Desktop")}
									/>
									<Button
										label={__("Tablet", "wedocs-blocks")}
										icon={<Icon icon={tablet} />}
										className={isTablet && "wedocs-active-res-tab"}
										onClick={() => setCustomPreviewDeviceType("Tablet")}
									/>
									<Button
										label={__("Mobile", "wedocs-blocks")}
										icon={<Icon icon={mobile} />}
										className={isMobile && "wedocs-active-res-tab"}
										onClick={() => setCustomPreviewDeviceType("Mobile")}
									/>
								</ButtonGroup>
							</FlexItem>
						</Flex>

						<>
							{isDesktop && (
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										gap: "16px",
									}}
								>
									<SpacingSizesControl
										__next40pxDefaultSize
										values={separatorSpacing["desktop"].padding || {}}
										onChange={handlePaddingChange}
										label={__("Padding", "wedocs-blocks")}
									/>

									<SpacingSizesControl
										__next40pxDefaultSize
										values={separatorSpacing["desktop"].margin || {}}
										onChange={handleMarginChange}
										label={__("Margin", "wedocs-blocks")}
									/>
								</div>
							)}
							{isTablet && (
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										gap: "16px",
									}}
								>
									<SpacingSizesControl
										__next40pxDefaultSize
										values={separatorSpacing["tablet"].padding || {}}
										onChange={handlePaddingChange}
										label={__("Padding", "wedocs-blocks")}
									/>

									<SpacingSizesControl
										__next40pxDefaultSize
										values={separatorSpacing["tablet"].margin || {}}
										onChange={handleMarginChange}
										label={__("Margin", "wedocs-blocks")}
									/>
								</div>
							)}
							{isMobile && (
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										gap: "16px",
									}}
								>
									<SpacingSizesControl
										__next40pxDefaultSize
										values={separatorSpacing["mobile"].padding || {}}
										onChange={handlePaddingChange}
										label={__("Padding", "wedocs-blocks")}
									/>

									<SpacingSizesControl
										__next40pxDefaultSize
										values={separatorSpacing["mobile"].margin || {}}
										onChange={handleMarginChange}
										label={__("Margin", "wedocs-blocks")}
									/>
								</div>
							)}
						</>
					</div>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
