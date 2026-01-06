/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls, BlockControls } from '@wordpress/block-editor';

/**
 * WordPress components
 */
import {
	PanelBody,
	TextControl,
	ToggleControl,
	SelectControl,
	RangeControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	__experimentalBoxControl as BoxControl,
	__experimentalBorderControl as BorderControl,
	__experimentalDivider as Divider,
	Button,
	ToolbarGroup,
	ToolbarButton
} from '@wordpress/components';

import { useState } from '@wordpress/element';
import { settings, help, info, email } from '@wordpress/icons';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const {
		mainText,
		buttonText,
		showLastUpdated,
		modalTitle,
		nameLabel,
		emailLabel,
		messageLabel,
		emailPlaceholder,
		submitButtonText,
		showSubjectField,
		subjectLabel,
		successMessage,
		errorMessage,
		containerBackgroundColor,
		containerPadding,
		containerMargin,
		containerBorder,
		containerBorderRadius,
		containerBoxShadow,
		iconType,
		iconColor,
		iconSize,
		textColor,
		textTypography,
		linkColor,
		linkTypography,
		textAlignment,
		modalWidth,
		modalHeight,
		modalHeadingColor,
		modalHeadingTypography,
		modalHeadingAlignment,
		labelColor,
		labelTypography,
		buttonBackgroundColor,
		buttonTextColor,
		buttonTypography,
		buttonWidth,
		buttonPadding,
		buttonAlignment,
		successTextColor,
		successTypography,
		successAlignment,
		errorTextColor,
		errorTypography,
		errorAlignment,
		customClassName,
		analyticsEvent
	} = attributes;

	const [showModal, setShowModal] = useState(false);

	const iconOptions = [
		{ label: 'Email', value: 'email' },
		{ label: 'Help', value: 'help' },
		{ label: 'Info', value: 'info' }
	];

	const alignmentOptions = [
		{ label: 'Left', value: 'left' },
		{ label: 'Center', value: 'center' },
		{ label: 'Right', value: 'right' }
	];

	const getIcon = (type) => {
		switch(type) {
			case 'help':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
					</svg>
				);
			case 'info':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
					</svg>
				);
			case 'email':
			default:
				return (
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path d="M4 20q-.825 0-1.413-.588T2 18V6q0-.825.588-1.413T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.588 1.413T20 20H4Zm8-7L4 8v10h16V8l-8 5Zm0-2 8-5H4l8 5ZM4 8V6v12V8Z"/>
					</svg>
				);
		}
	};

	// Build inline styles for real-time preview
	const containerStyles = {
		backgroundColor: containerBackgroundColor,
		padding: containerPadding ? `${containerPadding.top} ${containerPadding.right} ${containerPadding.bottom} ${containerPadding.left}` : '20px',
		margin: containerMargin ? `${containerMargin.top} ${containerMargin.right} ${containerMargin.bottom} ${containerMargin.left}` : '0 0 20px 0',
		border: containerBorder ? `${containerBorder.width} ${containerBorder.style} ${containerBorder.color}` : '1px solid #ddd',
		borderRadius: containerBorderRadius || '8px',
		boxShadow: containerBoxShadow || '0 2px 4px rgba(0,0,0,0.1)',
		textAlign: textAlignment || 'left'
	};

	const textStyles = {
		color: textColor,
		fontSize: textTypography?.fontSize || '16px',
		fontWeight: textTypography?.fontWeight || 'normal',
		margin: '0 0 16px 0'
	};

	const linkStyles = {
		color: linkColor,
		fontSize: linkTypography?.fontSize || '16px',
		fontWeight: linkTypography?.fontWeight || '500',
		textDecoration: 'none',
		display: 'inline-flex',
		alignItems: 'center',
		gap: '8px',
		cursor: 'pointer'
	};

	const modalStyles = {
		position: 'fixed',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: modalWidth || '500px',
		height: modalHeight === 'auto' ? 'auto' : modalHeight,
		backgroundColor: 'white',
		borderRadius: '8px',
		boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
		padding: '24px',
		zIndex: 9999,
		maxHeight: '90vh',
		overflow: 'auto'
	};

	const modalHeadingStyles = {
		color: modalHeadingColor,
		fontSize: modalHeadingTypography?.fontSize || '24px',
		fontWeight: modalHeadingTypography?.fontWeight || '600',
		textAlign: modalHeadingAlignment || 'left',
		margin: '0 0 20px 0'
	};

	const labelStyles = {
		color: labelColor,
		fontSize: labelTypography?.fontSize || '14px',
		fontWeight: labelTypography?.fontWeight || '500',
		display: 'block',
		marginBottom: '4px'
	};

	const buttonStyles = {
		backgroundColor: buttonBackgroundColor || '#0073aa',
		color: buttonTextColor || 'white',
		fontSize: buttonTypography?.fontSize || '16px',
		fontWeight: buttonTypography?.fontWeight || '500',
		width: buttonWidth || 'auto',
		padding: buttonPadding ? `${buttonPadding.top} ${buttonPadding.right} ${buttonPadding.bottom} ${buttonPadding.left}` : '12px 24px',
		border: 'none',
		borderRadius: '4px',
		cursor: 'pointer',
		alignSelf: buttonAlignment === 'center' ? 'center' : buttonAlignment === 'right' ? 'flex-end' : 'flex-start'
	};

	const IconComponent = getIcon(iconType);

	const blockProps = useBlockProps({
		className: customClassName,
		style: {
			// Apply block-level styles here for editor preview
			color: textColor,
			backgroundColor: containerBackgroundColor
		}
	});

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={settings}
						label={__('Preview Modal', 'wedocs')}
						onClick={() => setShowModal(!showModal)}
						isPressed={showModal}
					/>
				</ToolbarGroup>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={__('Content', 'wedocs')} initialOpen={true}>
					<TextControl
						label={__('Main Text', 'wedocs')}
						value={mainText}
						onChange={(value) => setAttributes({ mainText: value })}
					/>
					<TextControl
						label={__('Button Text', 'wedocs')}
						value={buttonText}
						onChange={(value) => setAttributes({ buttonText: value })}
					/>
					<ToggleControl
						label={__('Show Last Updated Date', 'wedocs')}
						checked={showLastUpdated}
						onChange={(value) => setAttributes({ showLastUpdated: value })}
					/>
					<Divider />
					<TextControl
						label={__('Modal Title', 'wedocs')}
						value={modalTitle}
						onChange={(value) => setAttributes({ modalTitle: value })}
					/>
					<TextControl
						label={__('Name Label', 'wedocs')}
						value={nameLabel}
						onChange={(value) => setAttributes({ nameLabel: value })}
					/>
					<TextControl
						label={__('Email Label', 'wedocs')}
						value={emailLabel}
						onChange={(value) => setAttributes({ emailLabel: value })}
					/>
					<TextControl
						label={__('Email Placeholder', 'wedocs')}
						value={emailPlaceholder}
						onChange={(value) => setAttributes({ emailPlaceholder: value })}
					/>
					<ToggleControl
						label={__('Show Subject Field', 'wedocs')}
						checked={showSubjectField}
						onChange={(value) => setAttributes({ showSubjectField: value })}
					/>
					{showSubjectField && (
						<TextControl
							label={__('Subject Label', 'wedocs')}
							value={subjectLabel}
							onChange={(value) => setAttributes({ subjectLabel: value })}
						/>
					)}
					<TextControl
						label={__('Message Label', 'wedocs')}
						value={messageLabel}
						onChange={(value) => setAttributes({ messageLabel: value })}
					/>
					<TextControl
						label={__('Submit Button Text', 'wedocs')}
						value={submitButtonText}
						onChange={(value) => setAttributes({ submitButtonText: value })}
					/>
					<Divider />
					<TextControl
						label={__('Success Message', 'wedocs')}
						value={successMessage}
						onChange={(value) => setAttributes({ successMessage: value })}
					/>
					<TextControl
						label={__('Error Message', 'wedocs')}
						value={errorMessage}
						onChange={(value) => setAttributes({ errorMessage: value })}
					/>
				</PanelBody>

				<ToolsPanel
					label={__("Icon Settings", "wedocs")}
					resetAll={() => {
						setAttributes({
							iconType: 'email',
							iconColor: undefined,
							iconSize: '24px'
						});
					}}
				>
					<ToolsPanelItem
						hasValue={() => iconType !== 'email'}
						label={__('Icon Type', 'wedocs')}
						onDeselect={() => setAttributes({ iconType: 'email' })}
					>
						<SelectControl
							label={__('Icon Type', 'wedocs')}
							value={iconType}
							options={iconOptions}
							onChange={(value) => setAttributes({ iconType: value })}
						/>
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={() => !!iconSize && iconSize !== '24px'}
						label={__('Icon Size', 'wedocs')}
						onDeselect={() => setAttributes({ iconSize: '24px' })}
					>
						<RangeControl
							label={__('Icon Size (px)', 'wedocs')}
							value={parseInt(iconSize) || 24}
							onChange={(value) => setAttributes({ iconSize: value + 'px' })}
							min={12}
							max={48}
						/>
					</ToolsPanelItem>
				</ToolsPanel>

				<ToolsPanel
					label={__("Layout & Alignment", "wedocs")}
					resetAll={() => {
						setAttributes({
							textAlignment: 'left',
							modalHeadingAlignment: 'left',
							buttonAlignment: 'left',
							successAlignment: 'left',
							errorAlignment: 'left'
						});
					}}
				>
					<ToolsPanelItem
						hasValue={() => textAlignment !== 'left'}
						label={__('Text Alignment', 'wedocs')}
						onDeselect={() => setAttributes({ textAlignment: 'left' })}
					>
						<SelectControl
							label={__('Text Alignment', 'wedocs')}
							value={textAlignment}
							options={alignmentOptions}
							onChange={(value) => setAttributes({ textAlignment: value })}
						/>
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={() => modalHeadingAlignment !== 'left'}
						label={__('Modal Heading Alignment', 'wedocs')}
						onDeselect={() => setAttributes({ modalHeadingAlignment: 'left' })}
					>
						<SelectControl
							label={__('Modal Heading Alignment', 'wedocs')}
							value={modalHeadingAlignment}
							options={alignmentOptions}
							onChange={(value) => setAttributes({ modalHeadingAlignment: value })}
						/>
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={() => buttonAlignment !== 'left'}
						label={__('Button Alignment', 'wedocs')}
						onDeselect={() => setAttributes({ buttonAlignment: 'left' })}
					>
						<SelectControl
							label={__('Button Alignment', 'wedocs')}
							value={buttonAlignment}
							options={alignmentOptions}
							onChange={(value) => setAttributes({ buttonAlignment: value })}
						/>
					</ToolsPanelItem>
				</ToolsPanel>

				<ToolsPanel
					label={__("Dimensions", "wedocs")}
					resetAll={() => {
						setAttributes({
							modalWidth: '500px',
							modalHeight: 'auto',
							buttonWidth: 'auto',
							containerBorderRadius: '8px'
						});
					}}
				>
					<ToolsPanelItem
						hasValue={() => modalWidth !== '500px'}
						label={__('Modal Width', 'wedocs')}
						onDeselect={() => setAttributes({ modalWidth: '500px' })}
					>
						<TextControl
							label={__('Modal Width', 'wedocs')}
							value={modalWidth}
							onChange={(value) => setAttributes({ modalWidth: value })}
							help={__('e.g., 500px, 80%, auto', 'wedocs')}
						/>
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={() => modalHeight !== 'auto'}
						label={__('Modal Height', 'wedocs')}
						onDeselect={() => setAttributes({ modalHeight: 'auto' })}
					>
						<TextControl
							label={__('Modal Height', 'wedocs')}
							value={modalHeight}
							onChange={(value) => setAttributes({ modalHeight: value })}
							help={__('e.g., 400px, 80vh, auto', 'wedocs')}
						/>
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={() => buttonWidth !== 'auto'}
						label={__('Button Width', 'wedocs')}
						onDeselect={() => setAttributes({ buttonWidth: 'auto' })}
					>
						<TextControl
							label={__('Button Width', 'wedocs')}
							value={buttonWidth}
							onChange={(value) => setAttributes({ buttonWidth: value })}
							help={__('e.g., 100%, 200px, auto', 'wedocs')}
						/>
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={() => containerBorderRadius !== '8px'}
						label={__('Container Border Radius', 'wedocs')}
						onDeselect={() => setAttributes({ containerBorderRadius: '8px' })}
					>
						<TextControl
							label={__('Container Border Radius', 'wedocs')}
							value={containerBorderRadius}
							onChange={(value) => setAttributes({ containerBorderRadius: value })}
							help={__('e.g., 8px, 1rem', 'wedocs')}
						/>
					</ToolsPanelItem>
				</ToolsPanel>

				<ToolsPanel
					label={__("Spacing", "wedocs")}
					resetAll={() => {
						setAttributes({
							containerPadding: { top: '20px', right: '20px', bottom: '20px', left: '20px' },
							containerMargin: { top: '0px', right: '0px', bottom: '20px', left: '0px' },
							buttonPadding: { top: '12px', right: '24px', bottom: '12px', left: '24px' }
						});
					}}
				>
					<ToolsPanelItem
						hasValue={() => !!containerPadding}
						label={__('Container Padding', 'wedocs')}
						onDeselect={() => setAttributes({ containerPadding: undefined })}
					>
						<BoxControl
							label={__('Container Padding', 'wedocs')}
							values={containerPadding}
							onChange={(value) => setAttributes({ containerPadding: value })}
						/>
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={() => !!containerMargin}
						label={__('Container Margin', 'wedocs')}
						onDeselect={() => setAttributes({ containerMargin: undefined })}
					>
						<BoxControl
							label={__('Container Margin', 'wedocs')}
							values={containerMargin}
							onChange={(value) => setAttributes({ containerMargin: value })}
						/>
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={() => !!buttonPadding}
						label={__('Button Padding', 'wedocs')}
						onDeselect={() => setAttributes({ buttonPadding: undefined })}
					>
						<BoxControl
							label={__('Button Padding', 'wedocs')}
							values={buttonPadding}
							onChange={(value) => setAttributes({ buttonPadding: value })}
						/>
					</ToolsPanelItem>
				</ToolsPanel>

				<ToolsPanel
					label={__("Border & Shadow", "wedocs")}
					resetAll={() => {
						setAttributes({
							containerBorder: undefined,
							containerBoxShadow: '0 2px 4px rgba(0,0,0,0.1)'
						});
					}}
				>
					<ToolsPanelItem
						hasValue={() => !!containerBorder}
						label={__('Container Border', 'wedocs')}
						onDeselect={() => setAttributes({ containerBorder: undefined })}
					>
						<BorderControl
							label={__('Container Border', 'wedocs')}
							value={containerBorder}
							onChange={(value) => setAttributes({ containerBorder: value })}
						/>
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={() => containerBoxShadow !== '0 2px 4px rgba(0,0,0,0.1)'}
						label={__('Container Box Shadow', 'wedocs')}
						onDeselect={() => setAttributes({ containerBoxShadow: '0 2px 4px rgba(0,0,0,0.1)' })}
					>
						<TextControl
							label={__('Container Box Shadow', 'wedocs')}
							value={containerBoxShadow}
							onChange={(value) => setAttributes({ containerBoxShadow: value })}
							help={__('CSS box-shadow value, e.g., 0 2px 4px rgba(0,0,0,0.1)', 'wedocs')}
						/>
					</ToolsPanelItem>
				</ToolsPanel>

				<PanelBody title={__('Advanced Settings', 'wedocs')} initialOpen={false}>
					<TextControl
						label={__('Additional CSS Class(es)', 'wedocs')}
						value={customClassName}
						onChange={(value) => setAttributes({ customClassName: value })}
						help={__('Space-separated CSS classes', 'wedocs')}
					/>
					<TextControl
						label={__('Analytics Event', 'wedocs')}
						value={analyticsEvent}
						onChange={(value) => setAttributes({ analyticsEvent: value })}
						help={__('Used for data-track attribute', 'wedocs')}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="need-more-help-container" style={containerStyles}>
					<p style={textStyles}>{mainText}</p>
					<a
						style={linkStyles}
						onClick={() => setShowModal(true)}
						data-track={analyticsEvent}
					>
						<span
							style={{
								color: iconColor,
								width: iconSize,
								height: iconSize,
								display: 'inline-flex'
							}}
						>
							{IconComponent}
						</span>
						{buttonText}
					</a>
					{showLastUpdated && (
						<p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
							{__('Last updated: ', 'wedocs')} {new Date().toLocaleDateString()}
						</p>
					)}
				</div>

				{showModal && (
					<>
						<div
							style={{
								position: 'fixed',
								top: 0,
								left: 0,
								width: '100%',
								height: '100%',
								backgroundColor: 'rgba(0,0,0,0.5)',
								zIndex: 9998
							}}
							onClick={() => setShowModal(false)}
						/>
						<div style={modalStyles}>
							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
								<h2 style={modalHeadingStyles}>{modalTitle}</h2>
								<Button
									style={{
										background: 'none',
										border: 'none',
										fontSize: '20px',
										cursor: 'pointer',
										padding: '4px 8px'
									}}
									onClick={() => setShowModal(false)}
								>
									×
								</Button>
							</div>

							<form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
								<div>
									<label style={labelStyles}>{nameLabel}</label>
									<input
										type="text"
										required
										style={{
											width: '100%',
											padding: '8px 12px',
											border: '1px solid #ddd',
											borderRadius: '4px'
										}}
									/>
								</div>

								<div>
									<label style={labelStyles}>{emailLabel}</label>
									<input
										type="email"
										required
										placeholder={emailPlaceholder}
										style={{
											width: '100%',
											padding: '8px 12px',
											border: '1px solid #ddd',
											borderRadius: '4px'
										}}
									/>
								</div>

								{showSubjectField && (
									<div>
										<label style={labelStyles}>{subjectLabel}</label>
										<input
											type="text"
											style={{
												width: '100%',
												padding: '8px 12px',
												border: '1px solid #ddd',
												borderRadius: '4px'
											}}
										/>
									</div>
								)}

								<div>
									<label style={labelStyles}>{messageLabel}</label>
									<textarea
										required
										rows="4"
										style={{
											width: '100%',
											padding: '8px 12px',
											border: '1px solid #ddd',
											borderRadius: '4px',
											resize: 'vertical'
										}}
									/>
								</div>

								<button
									type="submit"
									style={buttonStyles}
									onClick={(e) => e.preventDefault()}
								>
									{submitButtonText}
								</button>
							</form>
						</div>
					</>
				)}
			</div>
		</>
	);
}
