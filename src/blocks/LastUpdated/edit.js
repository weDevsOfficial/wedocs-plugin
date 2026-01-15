import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	SelectControl,
	TextControl
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import './editor.scss';
import {
	ColorSettingsPanel,
	TypographyPanel,
	SpacingPanel
} from '../commonControls/CommonControls';

export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		blockId,
		showIcon,
		iconType,
		prefix,
		dateFormat,
		textColor,
		fontSize,
		fontWeight,
		textAlign,
		padding,
		margin
	} = attributes;

	// Set unique block ID
	useEffect(() => {
		if (!blockId) {
			setAttributes({ blockId: `last-updated-${clientId}` });
		}
	}, [blockId, clientId, setAttributes]);

	const blockProps = useBlockProps({
		className: 'wp-block-wedocs-last-updated',
		'data-block-id': blockId,
		style: {
			color: textColor,
			fontSize,
			fontWeight,
			textAlign,
			padding: `${padding.top} ${padding.right} ${padding.bottom} ${padding.left}`,
			margin: `${margin.top} ${margin.right} ${margin.bottom} ${margin.left}`
		}
	});

	const getIconSVG = (type) => {
		const icons = {
			document: (
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
					<path d="M3 2C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V6L9 2H3Z" stroke="currentColor" strokeWidth="1.5"/>
					<path d="M9 2V6H14" stroke="currentColor" strokeWidth="1.5"/>
				</svg>
			),
			clock: (
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
					<circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
					<path d="M8 4V8L11 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
				</svg>
			),
			calendar: (
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
					<rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" strokeWidth="1.5"/>
					<path d="M2 6H14" stroke="currentColor" strokeWidth="1.5"/>
					<path d="M5 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
					<path d="M11 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
				</svg>
			),
			refresh: (
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
					<path d="M2 8C2 4.68629 4.68629 2 8 2C9.88154 2 11.5638 2.92287 12.6271 4.34315M14 8C14 11.3137 11.3137 14 8 14C6.11846 14 4.43619 13.0771 3.37289 11.6569" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
					<path d="M14 4V4.5M14 4.5V8.5M14 4.5H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
					<path d="M2 12V11.5M2 11.5V7.5M2 11.5H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
				</svg>
			)
		};
		return icons[type] || icons.document;
	};

	const formatDate = (format) => {
		const now = new Date();
		const formats = {
			'MM/DD/YYYY': now.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
			'DD/MM/YYYY': now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }),
			'YYYY-MM-DD': now.toISOString().split('T')[0],
			'Month DD, YYYY': now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
			'DD Month YYYY': now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
			'relative': 'Just now'
		};
		return formats[format] || formats['MM/DD/YYYY'];
	};

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={textAlign}
					onChange={(value) => setAttributes({ textAlign: value })}
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={__('Date Settings', 'wedocs-plugin')} initialOpen={true}>
					<TextControl
						label={__('Prefix Text', 'wedocs-plugin')}
						value={prefix}
						onChange={(value) => setAttributes({ prefix: value })}
						help={__('Text shown before the date', 'wedocs-plugin')}
					/>
					<SelectControl
						label={__('Date Format', 'wedocs-plugin')}
						value={dateFormat}
						options={[
							{ label: '01/02/2026', value: 'MM/DD/YYYY' },
							{ label: '02/01/2026', value: 'DD/MM/YYYY' },
							{ label: '2026-01-02', value: 'YYYY-MM-DD' },
							{ label: 'January 2, 2026', value: 'Month DD, YYYY' },
							{ label: '2 January 2026', value: 'DD Month YYYY' },
							{ label: 'Relative (e.g., "2 days ago")', value: 'relative' }
						]}
						onChange={(value) => setAttributes({ dateFormat: value })}
					/>
					<ToggleControl
						label={__('Show Icon', 'wedocs-plugin')}
						checked={showIcon}
						onChange={(value) => setAttributes({ showIcon: value })}
					/>
					{showIcon && (
						<SelectControl
							label={__('Icon Type', 'wedocs-plugin')}
							value={iconType}
							options={[
								{ label: __('Document', 'wedocs-plugin'), value: 'document' },
								{ label: __('Clock', 'wedocs-plugin'), value: 'clock' },
								{ label: __('Calendar', 'wedocs-plugin'), value: 'calendar' },
								{ label: __('Refresh', 'wedocs-plugin'), value: 'refresh' }
							]}
							onChange={(value) => setAttributes({ iconType: value })}
						/>
					)}
				</PanelBody>

				<ColorSettingsPanel
					attributes={attributes}
					setAttributes={setAttributes}
					colorSettings={[
						{
							label: __('Text Color', 'wedocs-plugin'),
							value: textColor,
							onChange: (value) => setAttributes({ textColor: value })
						}
					]}
				/>

				<TypographyPanel
					fontSize={fontSize}
					fontWeight={fontWeight}
					onFontSizeChange={(value) => setAttributes({ fontSize: value })}
					onFontWeightChange={(value) => setAttributes({ fontWeight: value })}
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
				<div className="last-updated-content" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
					{showIcon && (
						<span className="last-updated-icon" style={{ display: 'flex', alignItems: 'center' }}>
							{getIconSVG(iconType)}
						</span>
					)}
					<span>
						{prefix && <span>{prefix} </span>}
						<time>{formatDate(dateFormat)}</time>
					</span>
				</div>
			</div>
		</>
	);
}
