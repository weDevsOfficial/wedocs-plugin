import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { getBlockClasses, getInlineStyles } from '../block-helpers';
import {
	PanelBody,
	ToggleControl,
	SelectControl,
	RangeControl,
	TextControl,
	__experimentalUnitControl as UnitControl
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import './editor.scss';
import { ColorSettingsPanel } from '../commonControls/CommonControls';

export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		blockId,
		position,
		height,
		barColor,
		backgroundColor,
		showPercentage,
		showReadingTime,
		percentagePosition,
		animationSpeed,
		contentSelector,
		wordsPerMinute,
		borderRadius,
		showShadow,
		zIndex
	} = attributes;

	const [progress, setProgress] = useState(0);
	const [readingTime, setReadingTime] = useState('5 min');

	// Set unique block ID
	useEffect(() => {
		if (!blockId) {
			setAttributes({ blockId: `reading-progress-${clientId}` });
		}
	}, [blockId, clientId, setAttributes]);

	// Simulate progress in editor
	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prev) => {
				const next = prev + 5;
				return next > 100 ? 0 : next;
			});
		}, 500);
		return () => clearInterval(interval);
	}, []);

	const blockProps = useBlockProps({
		className: `wp-block-wedocs-reading-progress position-${position}`,
		'data-block-id': blockId,
		style: {
			position: position === 'fixed-top' || position === 'fixed-bottom' ? 'fixed' : 'relative',
			top: position === 'fixed-top' ? 0 : 'auto',
			bottom: position === 'fixed-bottom' ? 0 : 'auto',
			left: 0,
			right: 0,
			zIndex: position === 'fixed-top' || position === 'fixed-bottom' ? zIndex : 1
		}
	});

	const barStyles = {
		height,
		backgroundColor,
		borderRadius,
		overflow: 'hidden',
		boxShadow: showShadow ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
	};

	const progressStyles = {
		height: '100%',
		width: `${progress}%`,
		backgroundColor: barColor,
		transition: animationSpeed === 'smooth' ? 'width 0.3s ease' : animationSpeed === 'fast' ? 'width 0.1s linear' : 'width 0.5s ease-out'
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Position Settings', 'wedocs-plugin')} initialOpen={true}>
					<SelectControl
						label={__('Position', 'wedocs-plugin')}
						value={position}
						options={[
							{ label: __('Fixed Top', 'wedocs-plugin'), value: 'fixed-top' },
							{ label: __('Fixed Bottom', 'wedocs-plugin'), value: 'fixed-bottom' },
							{ label: __('Top of Content', 'wedocs-plugin'), value: 'top' },
							{ label: __('Bottom of Content', 'wedocs-plugin'), value: 'bottom' }
						]}
						onChange={(value) => setAttributes({ position: value })}
						help={__('Fixed positions stick to viewport, content positions are relative', 'wedocs-plugin')}
					/>
					{(position === 'fixed-top' || position === 'fixed-bottom') && (
						<RangeControl
							label={__('Z-Index', 'wedocs-plugin')}
							value={zIndex}
							onChange={(value) => setAttributes({ zIndex: value })}
							min={1}
							max={9999}
							help={__('Layer priority for fixed positions', 'wedocs-plugin')}
						/>
					)}
				</PanelBody>

				<PanelBody title={__('Appearance', 'wedocs-plugin')}>
					<UnitControl
						label={__('Bar Height', 'wedocs-plugin')}
						value={height}
						onChange={(value) => setAttributes({ height: value })}
					/>
					<UnitControl
						label={__('Border Radius', 'wedocs-plugin')}
						value={borderRadius}
						onChange={(value) => setAttributes({ borderRadius: value })}
					/>
					<ToggleControl
						label={__('Show Shadow', 'wedocs-plugin')}
						checked={showShadow}
						onChange={(value) => setAttributes({ showShadow: value })}
					/>
					<SelectControl
						label={__('Animation Speed', 'wedocs-plugin')}
						value={animationSpeed}
						options={[
							{ label: __('Smooth', 'wedocs-plugin'), value: 'smooth' },
							{ label: __('Fast', 'wedocs-plugin'), value: 'fast' },
							{ label: __('Slow', 'wedocs-plugin'), value: 'slow' }
						]}
						onChange={(value) => setAttributes({ animationSpeed: value })}
					/>
				</PanelBody>

				<ColorSettingsPanel
					attributes={attributes}
					setAttributes={setAttributes}
					colorSettings={[
						{
							label: __('Progress Color', 'wedocs-plugin'),
							value: barColor,
							onChange: (value) => setAttributes({ barColor: value })
						},
						{
							label: __('Background Color', 'wedocs-plugin'),
							value: backgroundColor,
							onChange: (value) => setAttributes({ backgroundColor: value })
						}
					]}
				/>

				<PanelBody title={__('Display Options', 'wedocs-plugin')}>
					<ToggleControl
						label={__('Show Percentage', 'wedocs-plugin')}
						checked={showPercentage}
						onChange={(value) => setAttributes({ showPercentage: value })}
					/>
					{showPercentage && (
						<SelectControl
							label={__('Percentage Position', 'wedocs-plugin')}
							value={percentagePosition}
							options={[
								{ label: __('Left', 'wedocs-plugin'), value: 'left' },
								{ label: __('Center', 'wedocs-plugin'), value: 'center' },
								{ label: __('Right', 'wedocs-plugin'), value: 'right' }
							]}
							onChange={(value) => setAttributes({ percentagePosition: value })}
						/>
					)}
					<ToggleControl
						label={__('Show Reading Time', 'wedocs-plugin')}
						checked={showReadingTime}
						onChange={(value) => setAttributes({ showReadingTime: value })}
					/>
				</PanelBody>

				<PanelBody title={__('Advanced Settings', 'wedocs-plugin')} initialOpen={false}>
					<TextControl
						label={__('Content Selector', 'wedocs-plugin')}
						value={contentSelector}
						onChange={(value) => setAttributes({ contentSelector: value })}
						help={__('CSS selector for the content area to track', 'wedocs-plugin')}
					/>
					<RangeControl
						label={__('Reading Speed (WPM)', 'wedocs-plugin')}
						value={wordsPerMinute}
						onChange={(value) => setAttributes({ wordsPerMinute: value })}
						min={100}
						max={400}
						help={__('Average words per minute for reading time calculation', 'wedocs-plugin')}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="reading-progress-bar" style={barStyles}>
					<div className="reading-progress-fill" style={progressStyles}></div>
				</div>
				{(showPercentage || showReadingTime) && (
					<div className={`reading-progress-info position-${percentagePosition}`} style={{
						display: 'flex',
						justifyContent: percentagePosition === 'center' ? 'center' : percentagePosition === 'right' ? 'flex-end' : 'flex-start',
						gap: '15px',
						padding: '5px 10px',
						fontSize: '12px',
						color: '#666'
					}}>
						{showPercentage && (
							<span className="progress-percentage">{progress}%</span>
						)}
						{showReadingTime && (
							<span className="progress-time">📖 {readingTime} read</span>
						)}
					</div>
				)}
				<div style={{
					textAlign: 'center',
					padding: '10px',
					fontSize: '11px',
					color: '#999',
					fontStyle: 'italic'
				}}>
					Preview: Progress animates automatically in editor
				</div>
			</div>
		</>
	);
}
