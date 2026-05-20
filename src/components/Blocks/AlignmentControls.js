import { __ } from '@wordpress/i18n';
import {
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
	Button,
} from '@wordpress/components';
import {
	alignLeft,
	alignCenter,
	alignRight,
	alignJustify,
	justifyTop,
	justifyLeft,
	justifyCenter,
	justifyCenterVertical,
	justifyRight,
	justifyBottom,
	arrowRight,
	arrowDown,
	arrowLeft,
	arrowUp,
	justifySpaceBetween,
	justifyStretchVertical,
} from '@wordpress/icons';

const AlignmentControls = ({ attributes, setAttributes, device }) => {
	const { alignmentControls } = attributes;
	const currentAlignment = alignmentControls[device] || {};

	const handleDirectionAlignmentChange = (value) => {
		setAttributes({
			alignmentControls: {
				...alignmentControls,
				[device]: {
					...currentAlignment,
					direction: value,
				},
			},
		});
	};

	const handleTextAlignmentChange = (value) => {
		setAttributes({
			alignmentControls: {
				...alignmentControls,
				[device]: {
					...currentAlignment,
					textAlign: value,
				},
			},
		});
	};

	const handleHorizontalAlignmentChange = (value) => {
		setAttributes({
			alignmentControls: {
				...alignmentControls,
				[device]: {
					...currentAlignment,
					justifyContent: value,
				},
			},
		});
	};

	const handleVerticalAlignmentChange = (value) => {
		setAttributes({
			alignmentControls: {
				...alignmentControls,
				[device]: {
					...currentAlignment,
					alignItems: value,
				},
			},
		});
	};

	return (
		<>
			<ToggleGroupControl
				label={__('Direction', 'block-responsive')}
				value={currentAlignment.direction || ''}
				onChange={handleDirectionAlignmentChange}
				isBlock
				__nextHasNoMarginBottom
				__next40pxDefaultSize
			>
				<ToggleGroupControlOptionIcon
					value="row"
					label={__('Row', 'block-responsive')}
					icon={arrowRight}
				/>
				<ToggleGroupControlOptionIcon
					value="column"
					label={__('Column', 'block-responsive')}
					icon={arrowDown}
				/>
				<ToggleGroupControlOptionIcon
					value="row-reverse"
					label={__('Row reverse', 'block-responsive')}
					icon={arrowLeft}
				/>
				<ToggleGroupControlOptionIcon
					value="column-reverse"
					label={__('Column reverse', 'block-responsive')}
					icon={arrowUp}
				/>
			</ToggleGroupControl>
			<ToggleGroupControl
				label={__('Horizontal', 'block-responsive')}
				value={currentAlignment.justifyContent || ''}
				onChange={handleHorizontalAlignmentChange}
				isBlock
				__nextHasNoMarginBottom
				__next40pxDefaultSize
			>
				<ToggleGroupControlOptionIcon
					value="flex-start"
					label={__('Align items left', 'block-responsive')}
					icon={justifyLeft}
				/>
				<ToggleGroupControlOptionIcon
					value="center"
					label={__('Align items center', 'block-responsive')}
					icon={justifyCenter}
				/>
				<ToggleGroupControlOptionIcon
					value="flex-end"
					label={__('Align items right', 'block-responsive')}
					icon={justifyRight}
				/>
				<ToggleGroupControlOptionIcon
					value="space-between"
					label={__('Space between', 'block-responsive')}
					icon={justifySpaceBetween}
				/>
			</ToggleGroupControl>
			<ToggleGroupControl
				label={__('Vertical', 'block-responsive')}
				value={currentAlignment.alignItems || ''}
				onChange={handleVerticalAlignmentChange}
				isBlock
				__nextHasNoMarginBottom
				__next40pxDefaultSize
			>
				<ToggleGroupControlOptionIcon
					value="flex-start"
					label={__('Align items top', 'block-responsive')}
					icon={justifyTop}
				/>
				<ToggleGroupControlOptionIcon
					value="center"
					label={__('Align items middle', 'block-responsive')}
					icon={justifyCenterVertical}
				/>
				<ToggleGroupControlOptionIcon
					value="flex-end"
					label={__('Align items bottom', 'block-responsive')}
					icon={justifyBottom}
				/>
				<ToggleGroupControlOptionIcon
					value="space-between"
					label={__('Space between', 'block-responsive')}
					icon={justifyStretchVertical}
				/>
			</ToggleGroupControl>
			<ToggleGroupControl
				label={__('Text', 'block-responsive')}
				value={currentAlignment.textAlign || ''}
				onChange={handleTextAlignmentChange}
				isBlock
				__nextHasNoMarginBottom
				__next40pxDefaultSize
			>
				<ToggleGroupControlOptionIcon
					value="left"
					label={__('Left', 'block-responsive')}
					icon={alignLeft}
				/>
				<ToggleGroupControlOptionIcon
					value="center"
					label={__('Center', 'block-responsive')}
					icon={alignCenter}
				/>
				<ToggleGroupControlOptionIcon
					value="right"
					label={__('Right', 'block-responsive')}
					icon={alignRight}
				/>
				<ToggleGroupControlOptionIcon
					value="justify"
					label={__('Justify', 'block-responsive')}
					icon={alignJustify}
				/>
			</ToggleGroupControl>
			<Button
				__next40pxDefaultSize
				variant="secondary"
				isDestructive
				text={__('Reset All', 'block-responsive')}
				style={{
					width: '100%',
					justifyContent: 'center',
				}}
				onClick={() => {
					setAttributes({
						alignmentControls: {
							...alignmentControls,
							[device]: {
								...currentAlignment,
								textAlign: null,
								alignItems: null,
								justifyContent: null,
								direction: null,
							},
						},
					});
				}}
			/>
		</>
	);
};

export default AlignmentControls;
