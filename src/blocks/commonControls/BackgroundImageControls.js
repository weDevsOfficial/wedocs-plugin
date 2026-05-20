import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import {
	Button,
	FocalPointPicker,
	ToggleControl,
	__experimentalUnitControl as UnitControl,
	Flex,
	FlexItem,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const BackgroundImageControls = ({ attributes, setAttributes, device }) => {
	const { backgroundImageControls } = attributes;
	const currentBackgroundImage = backgroundImageControls[device] || {};

	const ALLOWED_MEDIA_TYPES = ['image'];

	// Handle focal point change
	const handleFocalPointChange = (newFocalPoint) => {
		setAttributes({
			backgroundImageControls: {
				...backgroundImageControls,
				[device]: {
					...currentBackgroundImage,
					bgFocalPoint: newFocalPoint,
				},
			},
		});
	};

	const handleBackgroundImageSizeChange = (value) => {
		let newFocalPoint = currentBackgroundImage.bgFocalPoint || {};
		let newBgRepeat = currentBackgroundImage.bgRepeat || false;

		// Set focal point and repeat based on size
		if (value === 'cover') {
			newFocalPoint = null;
			newBgRepeat = null;
		} else if (value === 'contain') {
			newFocalPoint = { x: 0.5, y: 0.5 }; // 50% 50%
			newBgRepeat = false;
		} else if (value === 'tile') {
			newFocalPoint = { x: 0.5, y: 0 }; // 50% 0px
			newBgRepeat = true;
		}

		setAttributes({
			backgroundImageControls: {
				...backgroundImageControls,
				[device]: {
					...currentBackgroundImage,
					bgSize: value,
					bgFocalPoint: newFocalPoint,
					bgRepeat: newBgRepeat,
				},
			},
		});
	};

	return (
		<div
			className="wedocs-background-image-controls"
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '16px',
			}}
		>
			<MediaUploadCheck>
				<MediaUpload
					onSelect={(media) => {
						setAttributes({
							backgroundImageControls: {
								...backgroundImageControls,
								[device]: {
									...currentBackgroundImage,
									bgUrl: media.url,
									bgId: media.id,
								},
							},
						});
					}}
					allowedTypes={ALLOWED_MEDIA_TYPES}
					value={currentBackgroundImage.bgId}
					render={({ open }) => (
						<Button
							__next40pxDefaultSize
							onClick={open}
							style={{
								width: '100%',
								justifyContent: 'center',
								border: '1px solid #ddd',
							}}
						>
							{currentBackgroundImage.bgUrl
								? __(
										'Change Background Image',
										'wedocs'
									)
								: __(
										'Add Background Image',
										'wedocs'
									)}
						</Button>
					)}
				/>
			</MediaUploadCheck>
			{currentBackgroundImage.bgUrl && (
				<>
					<FocalPointPicker
						__nextHasNoMarginBottom
						url={currentBackgroundImage.bgUrl || ''}
						value={currentBackgroundImage.bgFocalPoint || {}}
						onDragStart={handleFocalPointChange}
						onDrag={handleFocalPointChange}
						onChange={handleFocalPointChange}
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Fixed background', 'wedocs')}
						checked={currentBackgroundImage.bgFixed || false}
						onChange={(value) => {
							setAttributes({
								backgroundImageControls: {
									...backgroundImageControls,
									[device]: {
										...currentBackgroundImage,
										bgFixed: value,
									},
								},
							});
						}}
					/>
					<ToggleGroupControl
						label={__('Size', 'wedocs')}
						value={currentBackgroundImage.bgSize || 'cover'}
						onChange={handleBackgroundImageSizeChange}
						isBlock
						__nextHasNoMarginBottom
						__next40pxDefaultSize
					>
						<ToggleGroupControlOption
							value="cover"
							label={__('Cover', 'wedocs')}
						/>
						<ToggleGroupControlOption
							value="contain"
							label={__('Contain', 'wedocs')}
						/>
						<ToggleGroupControlOption
							value="tile"
							label={__('Tile', 'wedocs')}
						/>
					</ToggleGroupControl>
					<Flex
						style={{
							gap: '8px',
							justifyContent: 'flex-start',
						}}
					>
						<FlexItem style={{ maxWidth: '100px' }}>
							<UnitControl
								__next40pxDefaultSize
								value={currentBackgroundImage.bgWidth || 'auto'}
								disabled={
									currentBackgroundImage.bgSize !== 'tile'
								}
								onChange={(value) => {
									setAttributes({
										backgroundImageControls: {
											...backgroundImageControls,
											[device]: {
												...currentBackgroundImage,
												bgWidth: value,
											},
										},
									});
								}}
								placeholder={__('Auto', 'wedocs')}
							/>
						</FlexItem>
						<FlexItem>
							<ToggleControl
								__nextHasNoMarginBottom
								label={__('Repeat', 'wedocs')}
								disabled={
									!(
										currentBackgroundImage.bgSize ===
											'contain' ||
										currentBackgroundImage.bgSize === 'tile'
									)
								}
								checked={
									currentBackgroundImage.bgRepeat || false
								}
								onChange={(value) => {
									setAttributes({
										backgroundImageControls: {
											...backgroundImageControls,
											[device]: {
												...currentBackgroundImage,
												bgRepeat: value,
											},
										},
									});
								}}
							/>
						</FlexItem>
					</Flex>

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
								backgroundImageControls: {
									...backgroundImageControls,
									[device]: {
										...currentBackgroundImage,
										bgUrl: null,
										bgId: null,
										bgFocalPoint: null,
										bgFixed: null,
										bgSize: null,
										bgWidth: null,
										bgRepeat: null,
									},
								},
							});
						}}
					/>
				</>
			)}
		</div>
	);
};

export default BackgroundImageControls;
