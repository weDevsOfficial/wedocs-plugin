import { useBlockProps } from '@wordpress/block-editor';
import { getBlockClasses, getInlineStyles } from '../block-helpers';

export default function save({ attributes }) {
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

	const blockProps = useBlockProps.save({
		className: `wp-block-wedocs-reading-progress position-${position}`,
		'data-block-id': blockId,
		'data-position': position,
		'data-animation-speed': animationSpeed,
		'data-content-selector': contentSelector,
		'data-words-per-minute': wordsPerMinute,
		style: {
			position: position === 'fixed-top' || position === 'fixed-bottom' ? 'fixed' : 'relative',
			top: position === 'fixed-top' ? 0 : 'auto',
			bottom: position === 'fixed-bottom' ? 0 : 'auto',
			left: 0,
			right: 0,
			width: '100%',
			zIndex: position === 'fixed-top' || position === 'fixed-bottom' ? zIndex : 1
		}
	});

	const barStyles = {
		height,
		backgroundColor,
		borderRadius,
		position: 'relative',
		overflow: 'hidden',
		boxShadow: showShadow ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
	};

	const progressStyles = {
		height: '100%',
		width: '0%',
		backgroundColor: barColor,
		transition: animationSpeed === 'smooth' ? 'width 0.3s ease' : animationSpeed === 'fast' ? 'width 0.1s linear' : 'width 0.5s ease-out'
	};

	return (
		<div {...blockProps}>
			<div className="reading-progress-bar" style={barStyles}>
				<div className="reading-progress-fill" style={progressStyles}></div>
			</div>
			{(showPercentage || showReadingTime) && (
				<div
					className={`reading-progress-info position-${percentagePosition}`}
					style={{
						display: 'flex',
						justifyContent: percentagePosition === 'center' ? 'center' : percentagePosition === 'right' ? 'flex-end' : 'flex-start',
						gap: '15px',
						padding: '5px 10px',
						fontSize: '12px',
						color: '#666'
					}}
				>
					{showPercentage && (
						<span className="progress-percentage">0%</span>
					)}
					{showReadingTime && (
						<span className="progress-time"></span>
					)}
				</div>
			)}
		</div>
	);
}
