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
				label={__('Direction', 'wedocs')}
				value={currentAlignment.direction || ''}
				onChange={handleDirectionAlignmentChange}
				isBlock
				__nextHasNoMarginBottom
				__next40pxDefaultSize
			>
				<ToggleGroupControlOptionIcon
					value="row"
					label={__('Row', 'wedocs')}
					icon={arrowRight}
				/>
				<ToggleGroupControlOptionIcon
					value="column"
					label={__('Column', 'wedocs')}
					icon={arrowDown}
				/>
				<ToggleGroupControlOptionIcon
					value="row-reverse"
					label={__('Row reverse', 'wedocs')}
					icon={arrowLeft}
				/>
				<ToggleGroupControlOptionIcon
					value="column-reverse"
					label={__('Column reverse', 'wedocs')}
					icon={arrowUp}
				/>
			</ToggleGroupControl>
			<ToggleGroupControl
				label={__('Horizontal', 'wedocs')}
				value={currentAlignment.justifyContent || ''}
				onChange={handleHorizontalAlignmentChange}
				isBlock
				__nextHasNoMarginBottom
				__next40pxDefaultSize
			>
				<ToggleGroupControlOptionIcon
					value="flex-start"
					label={__('Align items left', 'wedocs')}
					icon={justifyLeft}
				/>
				<ToggleGroupControlOptionIcon
					value="center"
					label={__('Align items center', 'wedocs')}
					icon={justifyCenter}
				/>
				<ToggleGroupControlOptionIcon
					value="flex-end"
					label={__('Align items right', 'wedocs')}
					icon={justifyRight}
				/>
				<ToggleGroupControlOptionIcon
					value="space-between"
					label={__('Space between', 'wedocs')}
					icon={justifySpaceBetween}
				/>
			</ToggleGroupControl>
			<ToggleGroupControl
				label={__('Vertical', 'wedocs')}
				value={currentAlignment.alignItems || ''}
				onChange={handleVerticalAlignmentChange}
				isBlock
				__nextHasNoMarginBottom
				__next40pxDefaultSize
			>
				<ToggleGroupControlOptionIcon
					value="flex-start"
					label={__('Align items top', 'wedocs')}
					icon={justifyTop}
				/>
				<ToggleGroupControlOptionIcon
					value="center"
					label={__('Align items middle', 'wedocs')}
					icon={justifyCenterVertical}
				/>
				<ToggleGroupControlOptionIcon
					value="flex-end"
					label={__('Align items bottom', 'wedocs')}
					icon={justifyBottom}
				/>
				<ToggleGroupControlOptionIcon
					value="space-between"
					label={__('Space between', 'wedocs')}
					icon={justifyStretchVertical}
				/>
			</ToggleGroupControl>
			<ToggleGroupControl
				label={__('Text', 'wedocs')}
				value={currentAlignment.textAlign || ''}
				onChange={handleTextAlignmentChange}
				isBlock
				__nextHasNoMarginBottom
				__next40pxDefaultSize
			>
				<ToggleGroupControlOptionIcon
					value="left"
					label={__('Left', 'wedocs')}
					icon={alignLeft}
				/>
				<ToggleGroupControlOptionIcon
					value="center"
					label={__('Center', 'wedocs')}
					icon={alignCenter}
				/>
				<ToggleGroupControlOptionIcon
					value="right"
					label={__('Right', 'wedocs')}
					icon={alignRight}
				/>
				<ToggleGroupControlOptionIcon
					value="justify"
					label={__('Justify', 'wedocs')}
					icon={alignJustify}
				/>
			</ToggleGroupControl>
			<Button
				__next40pxDefaultSize
				variant="secondary"
				isDestructive
				text={__('Reset All', 'wedocs')}
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
