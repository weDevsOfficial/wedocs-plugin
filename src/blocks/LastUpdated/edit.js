import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { getBlockClasses, getInlineStyles } from '../block-helpers';
import {
	PanelBody,
	ToggleControl,
	SelectControl,
	TextControl
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import './editor.scss';

export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		blockId,
		showIcon,
		iconType,
		prefix,
		dateFormat,
		textAlign
	} = attributes;

	// Set unique block ID
	useEffect(() => {
		if (!blockId) {
			setAttributes({ blockId: `last-updated-${clientId}` });
		}
	}, [blockId, clientId, setAttributes]);

	const blockProps = useBlockProps({
		className: getBlockClasses(attributes, 'wp-block-wedocs-last-updated'),
		'data-block-id': blockId,
		style: {
			...getInlineStyles(attributes),
			textAlign
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
			calendar: (
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
					<rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" strokeWidth="1.5"/>
					<path d="M5 1V4M11 1V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
					<path d="M2 6H14" stroke="currentColor" strokeWidth="1.5"/>
				</svg>
			),
			clock: (
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
					<circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
					<path d="M8 4V8L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
				</svg>
			)
		};
		return icons[type] || icons.calendar;
	};

	const formatDate = (format) => {
		const now = new Date();
		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		};

		switch (format) {
			case 'MM/DD/YYYY':
				return `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
			case 'DD/MM/YYYY':
				return `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
			case 'YYYY-MM-DD':
				return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
			case 'Month DD, YYYY':
				return now.toLocaleDateString('en-US', options);
			case 'DD Month YYYY':
				return now.toLocaleDateString('en-GB', options);
			case 'relative':
				return __('Just now', 'wedocs-plugin');
			default:
				return now.toLocaleDateString();
		}
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
