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
import {
	useBlockProps,
	InspectorControls,
	InspectorAdvancedControls,
	PanelColorSettings
} from '@wordpress/block-editor';

/**
 * WordPress dependencies
 */
import {
	PanelBody,
	TextControl,
	ToggleControl,
	CheckboxControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	__experimentalFontFamilyControl as FontFamilyControl,
	FontSizePicker,
	SelectControl
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { useSetting } from '@wordpress/block-editor';

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
export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		blockId,
		tocTitle,
		supportedHeadings,
		showHierarchy,
		showNumbering,
		collapsibleOnMobile,
		titleTypography,
		listTypography,
		titleColor,
		linkColor,
		linkHoverColor,
		smoothScroll,
		stickyMode,
		additionalCssClass
	} = attributes;

	const [headings, setHeadings] = useState([]);

	// Get theme colors and font settings
	const colors = useSetting('color.palette') || [];
	const fontSizes = useSetting('typography.fontSizes') || [];
	const fontFamilies = useSetting('typography.fontFamilies') || [];

	// Set unique block ID on first render
	useEffect(() => {
		if (!blockId) {
			setAttributes({ blockId: `toc-${clientId}` });
		}
	}, [blockId, clientId, setAttributes]);

	// Mock headings for preview in editor
	useEffect(() => {
		const mockHeadings = [
			{ level: 2, text: 'Introduction', id: 'introduction' },
			{ level: 3, text: 'Getting Started', id: 'getting-started' },
			{ level: 3, text: 'Basic Features', id: 'basic-features' },
			{ level: 2, text: 'Advanced Usage', id: 'advanced-usage' },
			{ level: 3, text: 'Configuration', id: 'configuration' },
			{ level: 4, text: 'Settings Panel', id: 'settings-panel' },
			{ level: 2, text: 'Conclusion', id: 'conclusion' }
		].filter(heading => supportedHeadings.includes(`h${heading.level}`));

		setHeadings(mockHeadings);
	}, [supportedHeadings]);

	const renderTocList = (headings, showHierarchy, showNumbering) => {
		if (headings.length === 0) {
			return (
				<div className="toc-empty-state">
					<p>{__('No headings found. Add some headings to your content to see them here.', 'wedocs')}</p>
				</div>
			);
		}

		let counter = 1;
		const counters = { 2: 0, 3: 0, 4: 0, 5: 0 };

		return (
			<ul className={`toc-list ${showHierarchy ? 'hierarchical' : 'flat'} ${showNumbering ? 'numbered' : 'bulleted'}`}>
				{headings.map((heading, index) => {
					if (showNumbering) {
						if (showHierarchy) {
							counters[heading.level]++;
							// Reset lower level counters
							for (let i = heading.level + 1; i <= 5; i++) {
								counters[i] = 0;
							}
						} else {
							counters[heading.level] = counter++;
						}
					}

					const indent = showHierarchy ? (heading.level - 2) * 20 : 0;
					const numberText = showNumbering ?
						(showHierarchy ?
							Object.entries(counters).slice(0, heading.level - 1).map(([level, count]) => count > 0 ? count : '').filter(n => n).join('.') :
							counters[heading.level]
						) : '';

					return (
						<li key={index} style={{ marginLeft: `${indent}px` }}>
							<a href={`#${heading.id}`} className="toc-link">
								{showNumbering && <span className="toc-number">{numberText}. </span>}
								{heading.text}
							</a>
						</li>
					);
				})}
			</ul>
		);
	};

	// Build block styles
	const blockStyles = {
		'--toc-title-font-size': titleTypography?.fontSize || '1.25rem',
		'--toc-title-font-weight': titleTypography?.fontWeight || '600',
		'--toc-title-line-height': titleTypography?.lineHeight || '1.4',
		'--toc-title-font-family': titleTypography?.fontFamily,
		'--toc-list-font-size': listTypography?.fontSize || '1rem',
		'--toc-list-line-height': listTypography?.lineHeight || '1.6',
		'--toc-list-font-family': listTypography?.fontFamily,
		'--toc-title-color': titleColor,
		'--toc-link-color': linkColor,
		'--toc-link-hover-color': linkHoverColor
	};

	// Filter out undefined values
	Object.keys(blockStyles).forEach(key => {
		if (blockStyles[key] === undefined) {
			delete blockStyles[key];
		}
	});

	const blockProps = useBlockProps({
		className: `${additionalCssClass} ${stickyMode ? 'sticky-mode' : ''}`.trim(),
		'data-block-id': blockId,
		style: blockStyles
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Table of Contents Settings', 'wedocs')} initialOpen={true}>
					<TextControl
						label={__('TOC Title', 'wedocs')}
						value={tocTitle}
						onChange={(value) => setAttributes({ tocTitle: value })}
					/>

					<div style={{ marginBottom: '20px' }}>
						<label style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>
							{__('Supported Heading Tags', 'wedocs')}
						</label>
						{['h1', 'h2', 'h3', 'h4', 'h5'].map(heading => (
							<CheckboxControl
								key={heading}
								label={heading.toUpperCase()}
								checked={supportedHeadings.includes(heading)}
								onChange={(checked) => {
									const newHeadings = checked
										? [...supportedHeadings, heading]
										: supportedHeadings.filter(h => h !== heading);
									setAttributes({ supportedHeadings: newHeadings });
								}}
							/>
						))}
					</div>

					<ToggleControl
						label={__('List Hierarchy', 'wedocs')}
						help={__('Indent subheadings to show hierarchy', 'wedocs')}
						checked={showHierarchy}
						onChange={(value) => setAttributes({ showHierarchy: value })}
					/>

					<ToggleControl
						label={__('List Numbering', 'wedocs')}
						help={__('Show numbered list instead of bullets', 'wedocs')}
						checked={showNumbering}
						onChange={(value) => setAttributes({ showNumbering: value })}
					/>

					<ToggleControl
						label={__('Collapsible on Small Devices', 'wedocs')}
						help={__('Make TOC collapsible on mobile devices', 'wedocs')}
						checked={collapsibleOnMobile}
						onChange={(value) => setAttributes({ collapsibleOnMobile: value })}
					/>

					<ToggleControl
						label={__('Smooth Scroll Behavior', 'wedocs')}
						checked={smoothScroll}
						onChange={(value) => setAttributes({ smoothScroll: value })}
					/>

					<ToggleControl
						label={__('Sticky Mode', 'wedocs')}
						help={__('Keep TOC fixed while scrolling', 'wedocs')}
						checked={stickyMode}
						onChange={(value) => setAttributes({ stickyMode: value })}
					/>
				</PanelBody>

				<PanelColorSettings
					title={__('Color Settings', 'wedocs')}
					colorSettings={[
						{
							value: titleColor,
							onChange: (color) => setAttributes({ titleColor: color }),
							label: __('Title Color', 'wedocs'),
							colors
						},
						{
							value: linkColor,
							onChange: (color) => setAttributes({ linkColor: color }),
							label: __('Link Color', 'wedocs'),
							colors
						},
						{
							value: linkHoverColor,
							onChange: (color) => setAttributes({ linkHoverColor: color }),
							label: __('Link Hover Color', 'wedocs'),
							colors
						}
					]}
				/>

				<ToolsPanel
					label={__('Typography', 'wedocs')}
					resetAll={() => {
						setAttributes({
							titleTypography: {
								fontSize: '1.25rem',
								fontWeight: '600',
								lineHeight: '1.4'
							},
							listTypography: {
								fontSize: '1rem',
								lineHeight: '1.6'
							}
						});
					}}
				>
					<ToolsPanelItem
						hasValue={() => !!titleTypography?.fontSize}
						label={__('Title Font Size', 'wedocs')}
						onDeselect={() => {
							setAttributes({
								titleTypography: {
									...titleTypography,
									fontSize: undefined
								}
							});
						}}
					>
						<FontSizePicker
							value={titleTypography?.fontSize}
							onChange={(fontSize) => setAttributes({
								titleTypography: {
									...titleTypography,
									fontSize
								}
							})}
							fontSizes={fontSizes}
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={() => !!titleTypography?.fontWeight}
						label={__('Title Font Weight', 'wedocs')}
						onDeselect={() => {
							setAttributes({
								titleTypography: {
									...titleTypography,
									fontWeight: undefined
								}
							});
						}}
					>
						<SelectControl
							value={titleTypography?.fontWeight}
							options={[
								{ label: __('Normal', 'wedocs'), value: '400' },
								{ label: __('Medium', 'wedocs'), value: '500' },
								{ label: __('Semi Bold', 'wedocs'), value: '600' },
								{ label: __('Bold', 'wedocs'), value: '700' },
								{ label: __('Extra Bold', 'wedocs'), value: '800' }
							]}
							onChange={(fontWeight) => setAttributes({
								titleTypography: {
									...titleTypography,
									fontWeight
								}
							})}
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={() => !!listTypography?.fontSize}
						label={__('List Font Size', 'wedocs')}
						onDeselect={() => {
							setAttributes({
								listTypography: {
									...listTypography,
									fontSize: undefined
								}
							});
						}}
					>
						<FontSizePicker
							value={listTypography?.fontSize}
							onChange={(fontSize) => setAttributes({
								listTypography: {
									...listTypography,
									fontSize
								}
							})}
							fontSizes={fontSizes}
						/>
					</ToolsPanelItem>

					{fontFamilies.length > 0 && (
						<ToolsPanelItem
							hasValue={() => !!titleTypography?.fontFamily}
							label={__('Title Font Family', 'wedocs')}
							onDeselect={() => {
								setAttributes({
									titleTypography: {
										...titleTypography,
										fontFamily: undefined
									}
								});
							}}
						>
							<FontFamilyControl
								value={titleTypography?.fontFamily}
								onChange={(fontFamily) => setAttributes({
									titleTypography: {
										...titleTypography,
										fontFamily
									}
								})}
								fontFamilies={fontFamilies}
							/>
						</ToolsPanelItem>
					)}
				</ToolsPanel>
			</InspectorControls>

			<InspectorAdvancedControls>
				<TextControl
					label={__('Additional CSS class(es)', 'wedocs')}
					value={additionalCssClass}
					onChange={(value) => setAttributes({ additionalCssClass: value })}
					help={__('Space-separated CSS classes', 'wedocs')}
				/>
			</InspectorAdvancedControls>

			<div {...blockProps}>
				<div className="toc-title">
					{tocTitle}
				</div>
				<div className="toc-content">
					{renderTocList(headings, showHierarchy, showNumbering)}
				</div>
				{collapsibleOnMobile && (
					<div className="toc-mobile-notice" style={{ marginTop: '10px', fontSize: '12px', opacity: 0.7 }}>
						{__('(Collapsible on mobile devices)', 'wedocs')}
					</div>
				)}
			</div>
		</>
	);
}
