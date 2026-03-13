import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	SelectControl,
	RangeControl,
	TextareaControl,
	__experimentalUnitControl as UnitControl
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import './editor.scss';
import {
	ColorSettingsPanel,
	SpacingPanel,
	BorderPanel
} from '../commonControls/CommonControls';

export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		blockId,
		showCopyMarkdown,
		showChatGPT,
		showClaude,
		buttonStyle,
		buttonSize,
		alignment,
		spacing,
		backgroundColor,
		textColor,
		borderColor,
		borderWidth,
		borderRadius,
		hoverBackgroundColor,
		fontSize,
		padding,
		margin,
		promptTemplate
	} = attributes;

	// Set unique block ID
	useEffect(() => {
		if (!blockId) {
			setAttributes({ blockId: `doc-actions-${clientId}` });
		}
	}, [blockId, clientId, setAttributes]);

	const blockProps = useBlockProps({
		className: 'wp-block-wedocs-doc-actions',
		'data-block-id': blockId,
		style: {
			padding: `${padding.top} ${padding.right} ${padding.bottom} ${padding.left}`,
			margin: `${margin.top} ${margin.right} ${margin.bottom} ${margin.left}`
		}
	});

	const isPro = window.weDocsAdminScriptVars?.isPro || false;
	if ( ! isPro ) {
		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'weDocs Documentation Actions - PRO Feature', 'wedocs' ) } initialOpen={ true }>
						<div style={ { padding: '16px', textAlign: 'center' } }>
							<p style={ { margin: '0 0 12px 0', color: '#666', fontSize: '14px' } }>
								{ __( 'This block requires weDocs Pro to be active.', 'wedocs' ) }
							</p>
							<a href="https://wedocs.co/pricing/" target="_blank" rel="noopener noreferrer" style={ { display: 'inline-block', padding: '8px 16px', backgroundColor: '#4f47e6', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: '600', fontSize: '13px' } }>
								{ __( 'Purchase weDocs Pro', 'wedocs' ) }
							</a>
						</div>
					</PanelBody>
				</InspectorControls>
				<div { ...blockProps }>
					<div style={ { border: '2px dashed #ccd0d4', borderRadius: '4px', padding: '40px 20px', textAlign: 'center', backgroundColor: '#f8f9fa' } }>
						<div style={ { marginBottom: '12px', color: '#4f47e6' } }>
							<svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 1Z"/></svg>
						</div>
						<p style={ { margin: '0 0 4px 0', fontWeight: '600', fontSize: '14px', color: '#1e1e1e' } }>
							{ __( 'weDocs Documentation Actions', 'wedocs' ) }
						</p>
						<p style={ { margin: '0 0 16px 0', color: '#757575', fontSize: '13px' } }>
							{ __( 'This block requires weDocs Pro to be active.', 'wedocs' ) }
						</p>
						<a href="https://wedocs.co/pricing/" target="_blank" rel="noopener noreferrer" style={ { display: 'inline-block', padding: '8px 16px', backgroundColor: '#4f47e6', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: '600', fontSize: '13px' } }>
							{ __( 'Purchase weDocs Pro', 'wedocs' ) }
						</a>
					</div>
				</div>
			</>
		);
	}

	const getButtonClasses = () => {
		let classes = ['doc-action-button'];
		classes.push(`style-${buttonStyle}`);
		classes.push(`size-${buttonSize}`);
		return classes.join(' ');
	};

	const getButtonStyles = () => ({
		backgroundColor: buttonStyle === 'filled' ? backgroundColor : 'transparent',
		color: textColor,
		...(buttonStyle !== 'text' ? {
			borderColor,
			borderWidth,
			borderRadius,
		} : {}),
		fontSize,
		gap: spacing
	});

	const getIconSVG = (type) => {
		const icons = {
			copy: (
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
					<rect x="6" y="6" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
					<path d="M4 14H3C2.44772 14 2 13.5523 2 13V3C2 2.44772 2.44772 2 3 2H13C13.5523 2 14 2.44772 14 3V4" stroke="currentColor" strokeWidth="1.5"/>
				</svg>
			),
			chatgpt: (
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
					<path d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2Z" stroke="currentColor" strokeWidth="1.5"/>
					<circle cx="10" cy="10" r="3" fill="currentColor"/>
				</svg>
			),
			claude: (
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
					<path d="M10 2L13 8L19 9L14.5 13L16 19L10 16L4 19L5.5 13L1 9L7 8L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
				</svg>
			)
		};
		return icons[type];
	};

	const containerStyle = {
		display: 'flex',
		flexWrap: 'wrap',
		gap: spacing,
		justifyContent: alignment === 'center' ? 'center' : (alignment === 'right' ? 'flex-end' : 'flex-start')
	};

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={alignment}
					onChange={(value) => setAttributes({ alignment: value })}
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={__('Button Settings', 'wedocs-plugin')} initialOpen={true}>
					<ToggleControl
						label={__('Show "Copy Markdown for LLM"', 'wedocs-plugin')}
						checked={showCopyMarkdown}
						onChange={(value) => setAttributes({ showCopyMarkdown: value })}
					/>
					<ToggleControl
						label={__('Show "Open in ChatGPT"', 'wedocs-plugin')}
						checked={showChatGPT}
						onChange={(value) => setAttributes({ showChatGPT: value })}
					/>
					<ToggleControl
						label={__('Show "Open in Claude"', 'wedocs-plugin')}
						checked={showClaude}
						onChange={(value) => setAttributes({ showClaude: value })}
					/>
				</PanelBody>

				<PanelBody title={__('AI Prompt Template', 'wedocs-plugin')} initialOpen={false}>
					<TextareaControl
						label={__('Prompt Template', 'wedocs-plugin')}
						value={promptTemplate}
						onChange={(value) => setAttributes({ promptTemplate: value })}
						help={__(
							'Use {title} for page title and {url} for page URL. Example: Need more information on "{title}"\n\nSource: {url}',
							'wedocs-plugin'
						)}
						rows={5}
					/>
				</PanelBody>

				<PanelBody title={__('Button Style', 'wedocs-plugin')}>
					<SelectControl
						label={__('Style', 'wedocs-plugin')}
						value={buttonStyle}
						options={[
							{ label: __('Outlined', 'wedocs-plugin'), value: 'outlined' },
							{ label: __('Filled', 'wedocs-plugin'), value: 'filled' },
							{ label: __('Text Only', 'wedocs-plugin'), value: 'text' }
						]}
						onChange={(value) => setAttributes({ buttonStyle: value })}
					/>
					<SelectControl
						label={__('Size', 'wedocs-plugin')}
						value={buttonSize}
						options={[
							{ label: __('Small', 'wedocs-plugin'), value: 'small' },
							{ label: __('Medium', 'wedocs-plugin'), value: 'medium' },
							{ label: __('Large', 'wedocs-plugin'), value: 'large' }
						]}
						onChange={(value) => setAttributes({ buttonSize: value })}
					/>
					<UnitControl
						label={__('Button Spacing', 'wedocs-plugin')}
						value={spacing}
						onChange={(value) => setAttributes({ spacing: value })}
					/>
					<UnitControl
						label={__('Font Size', 'wedocs-plugin')}
						value={fontSize}
						onChange={(value) => setAttributes({ fontSize: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<ColorSettingsPanel
					attributes={attributes}
					setAttributes={setAttributes}
					colorSettings={[
						{
							label: __('Text Color', 'wedocs-plugin'),
							value: textColor,
							onChange: (value) => setAttributes({ textColor: value })
						},
						{
							label: __('Background Color', 'wedocs-plugin'),
							value: backgroundColor,
							onChange: (value) => setAttributes({ backgroundColor: value })
						},
						{
							label: __('Border Color', 'wedocs-plugin'),
							value: borderColor,
							onChange: (value) => setAttributes({ borderColor: value })
						},
						{
							label: __('Hover Background', 'wedocs-plugin'),
							value: hoverBackgroundColor,
							onChange: (value) => setAttributes({ hoverBackgroundColor: value })
						}
					]}
				/>

				<BorderPanel
					borderWidth={borderWidth}
					borderRadius={borderRadius}
					borderColor={borderColor}
					onBorderWidthChange={(value) => setAttributes({ borderWidth: value })}
					onBorderRadiusChange={(value) => setAttributes({ borderRadius: value })}
					onBorderColorChange={(value) => setAttributes({ borderColor: value })}
				/>

				<SpacingPanel
					title={__('Padding', 'wedocs-plugin')}
					values={padding}
					onChange={(value) => setAttributes({ padding: value })}
				/>

				<SpacingPanel
					title={__('Margin', 'wedocs-plugin')}
					values={margin}
					onChange={(value) => setAttributes({ margin: value })}
				/>
			</InspectorControls>

			<div {...blockProps}>
				<div className="doc-actions-container" style={containerStyle}>
					{showCopyMarkdown && (
						<button className={getButtonClasses()} style={getButtonStyles()}>
							{getIconSVG('copy')}
							<span>{__('Copy Markdown for LLM', 'wedocs-plugin')}</span>
						</button>
					)}
					{showChatGPT && (
						<button className={getButtonClasses()} style={getButtonStyles()}>
							{getIconSVG('chatgpt')}
							<span>{__('Open in ChatGPT', 'wedocs-plugin')}</span>
						</button>
					)}
					{showClaude && (
						<button className={getButtonClasses()} style={getButtonStyles()}>
							{getIconSVG('claude')}
							<span>{__('Open in Claude', 'wedocs-plugin')}</span>
						</button>
					)}
				</div>
			</div>
		</>
	);
}
