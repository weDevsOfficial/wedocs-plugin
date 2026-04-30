import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	RadioControl,
	TextControl,
	Button,
	__experimentalSpacer as Spacer
} from '@wordpress/components';
import {
	PanelColorSettings,
	MediaUpload,
	MediaUploadCheck
} from '@wordpress/block-editor';

const BackgroundControl = ({
	label,
	backgroundType = 'classic',
	onBackgroundTypeChange,
	backgroundColor,
	onBackgroundColorChange,
	backgroundGradient,
	onBackgroundGradientChange,
	backgroundImage = {},
	onBackgroundImageChange,
	showGradient = true,
	showImage = true
}) => {
	return (
		<PanelBody title={label} initialOpen={false}>
			{/* Background Type */}
			<RadioControl
				label={__('Background Type', 'wedocs')}
				selected={backgroundType}
				options={[
					{ label: __('Classic', 'wedocs'), value: 'classic' },
					...(showGradient ? [{ label: __('Gradient', 'wedocs'), value: 'gradient' }] : [])
				]}
				onChange={onBackgroundTypeChange}
			/>

			<Spacer marginTop={4} marginBottom={4} />

			{/* Classic Background */}
			{backgroundType === 'classic' && (
				<PanelColorSettings
					title={__('Background Color', 'wedocs')}
					colorSettings={[
						{
							value: backgroundColor,
							onChange: onBackgroundColorChange,
							label: __('Color', 'wedocs')
						}
					]}
				/>
			)}

			{/* Gradient Background */}
			{backgroundType === 'gradient' && showGradient && (
				<TextControl
					label={__('Gradient CSS', 'wedocs')}
					value={backgroundGradient || ''}
					onChange={onBackgroundGradientChange}
					placeholder="linear-gradient(45deg, #ff0000, #00ff00)"
					help={__('Enter CSS gradient value', 'wedocs')}
				/>
			)}

			{/* Background Image */}
			{showImage && (
				<>
					<Spacer marginTop={4} marginBottom={4} />
					<div>
						<h4>{__('Background Image', 'wedocs')}</h4>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) => onBackgroundImageChange({
									url: media.url,
									alt: media.alt,
									id: media.id
								})}
								allowedTypes={['image']}
								value={backgroundImage?.id}
								render={({ open }) => (
									<Button
										onClick={open}
										variant="secondary"
									>
										{backgroundImage?.url ? __('Change Image', 'wedocs') : __('Select Image', 'wedocs')}
									</Button>
								)}
							/>
						</MediaUploadCheck>
						{backgroundImage?.url && (
							<>
								<Spacer marginTop={2} marginBottom={2} />
								<Button
									onClick={() => onBackgroundImageChange({ url: '', alt: '', id: '' })}
									variant="secondary"
									isDestructive
								>
									{__('Remove Image', 'wedocs')}
								</Button>
							</>
						)}
					</div>
				</>
			)}
		</PanelBody>
	);
};

export default BackgroundControl;