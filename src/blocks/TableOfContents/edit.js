
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
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

/**
 * WordPress dependencies
 */
import {
	PanelBody,
	TextControl,
	ToggleControl,
	SelectControl,
	CheckboxControl,
	ColorPicker,
	RangeControl,
	__experimentalBoxControl as BoxControl,
	__experimentalUnitControl as UnitControl
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { select } from '@wordpress/data';
import ColorsControls from './ColorsControls';
import Inspector from './Inspector';
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
		containerBackgroundColor,
		containerWidth,
		containerPadding,
		containerMargin,
		containerBorderStyle,
		containerBorderWidth,
		containerBorderColor,
		containerBorderRadius,
		titleColor,
		titleFontSize,
		titleFontWeight,
		titlePadding,
		listColor,
		listHoverColor,
		listFontSize,
		smoothScroll,
		stickyMode,
		additionalCssClass
	} = attributes;

	const [headings, setHeadings] = useState([]);

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
					<p>{__('No headings found. Add some headings to your content to see them here.', 'dynamic-table-of-contents-block-wp')}</p>
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

	const blockProps = useBlockProps({
		className: `${additionalCssClass} ${stickyMode ? 'sticky-mode' : ''}`.trim(),
		'data-block-id': blockId,
		style: {
            "--list-item-sytle": containerBackgroundColor,
			// backgroundColor: containerBackgroundColor,
			width: containerWidth,
			padding: containerPadding ? `${containerPadding.top} ${containerPadding.right} ${containerPadding.bottom} ${containerPadding.left}` : undefined,
			margin: containerMargin ? `${containerMargin.top} ${containerMargin.right} ${containerMargin.bottom} ${containerMargin.left}` : undefined,
			borderStyle: containerBorderStyle !== 'none' ? containerBorderStyle : undefined,
			borderWidth: containerBorderStyle !== 'none' ? containerBorderWidth : undefined,
			borderColor: containerBorderStyle !== 'none' ? containerBorderColor : undefined,
			borderRadius: containerBorderRadius
		}
	});

	return (
		<>
			<Inspector attributes={attributes} setAttributes={setAttributes} />
			<div {...blockProps}>
				<div
					className="toc-title"
					style={{
						color: titleColor,
						fontSize: titleFontSize,
						fontWeight: titleFontWeight,
						padding: titlePadding ? `${titlePadding.top} ${titlePadding.right} ${titlePadding.bottom} ${titlePadding.left}` : undefined
					}}
				>
					{tocTitle}
				</div>
				<div
					className="toc-content"
					style={{
						color: listColor,
						fontSize: listFontSize
					}}
				>
					{renderTocList(headings, showHierarchy, showNumbering)}
				</div>
				{collapsibleOnMobile && (
					<div className="toc-mobile-notice" style={{ marginTop: '10px', fontSize: '12px', opacity: 0.7 }}>
						{__('(Collapsible on mobile devices)', 'dynamic-table-of-contents-block-wp')}
					</div>
				)}
			</div>
		</>
	);
}
