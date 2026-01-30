import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	PanelColorSettings,
	MediaUpload,
	MediaUploadCheck
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	SelectControl,
	RadioControl,
	RangeControl,
	Button,
	Placeholder,
	Spinner,
	ButtonGroup,
	__experimentalBoxControl as BoxControl,
	__experimentalUnitControl as UnitControl,
	__experimentalBorderControl as BorderControl
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

const Edit = (props) => {
	const { attributes, setAttributes, clientId } = props;
	const [users, setUsers] = useState([]);
	const [isLoadingUsers, setIsLoadingUsers] = useState(false);

	const blockProps = useBlockProps({
		className: `wedocs-contributors ${attributes.additionalCssClass}`,
		style: {
			backgroundColor: attributes.backgroundType === 'classic' ? attributes.backgroundColor : undefined,
			backgroundImage: attributes.backgroundType === 'gradient' ? attributes.backgroundGradient :
				(attributes.backgroundImage?.url ? `url(${attributes.backgroundImage.url})` : undefined),
			padding: `${attributes.padding.top} ${attributes.padding.right} ${attributes.padding.bottom} ${attributes.padding.left}`,
			margin: `${attributes.margin.top} ${attributes.margin.right} ${attributes.margin.bottom} ${attributes.margin.left}`,
			borderStyle: attributes.borderStyle !== 'none' ? attributes.borderStyle : undefined,
			borderWidth: attributes.borderStyle !== 'none' ?
				`${attributes.borderWidth.top} ${attributes.borderWidth.right} ${attributes.borderWidth.bottom} ${attributes.borderWidth.left}` : undefined,
			borderColor: attributes.borderStyle !== 'none' ? attributes.borderColor : undefined,
			borderRadius: attributes.borderRadius,
			boxShadow: attributes.boxShadow.enabled ?
				`${attributes.boxShadow.horizontal} ${attributes.boxShadow.vertical} ${attributes.boxShadow.blur} ${attributes.boxShadow.spread} ${attributes.boxShadow.color}` : undefined
		}
	});

	// Fetch users when component mounts or when manual selection mode is active
	useEffect(() => {
		if (attributes.contributorDisplayMode === 'manual') {
			setIsLoadingUsers(true);
			wp.apiFetch({ path: '/wp/v2/users?per_page=100&context=edit' })
				.then(users => {
					setUsers(users);
					setIsLoadingUsers(false);
				})
				.catch(() => {
					setIsLoadingUsers(false);
				});
		}
	}, [attributes.contributorDisplayMode]);

	const currentPost = useSelect((select) => {
		const { getCurrentPostId, getCurrentPostType } = select('core/editor') || {};
		if (!getCurrentPostId) return null;

		return select(coreStore).getEntityRecord('postType', getCurrentPostType(), getCurrentPostId());
	}, []);

	const renderPreview = () => {
		if (attributes.contributorDisplayMode === 'manual' && attributes.selectedContributors.length === 0) {
			return (
				<Placeholder
					icon="groups"
					label={__('Doc Contributors', 'wedocs')}
					instructions={__('Select contributors from the settings panel.', 'wedocs')}
				/>
			);
		}

		// Mock data for preview
		const mockContributors = attributes.contributorDisplayMode === 'main_author' ?
			[{ id: 1, name: 'John Doe', avatar_urls: { 48: 'https://via.placeholder.com/48' } }] :
			[
				{ id: 1, name: 'John Doe', avatar_urls: { 48: 'https://via.placeholder.com/48' } },
				{ id: 2, name: 'Jane Smith', avatar_urls: { 48: 'https://via.placeholder.com/48' } }
			];

		const avatarStyle = {
			width: attributes.avatarSize,
			height: attributes.avatarSize,
			borderRadius: attributes.avatarShape === 'circle' ? '50%' :
				(attributes.avatarShape === 'rounded' ? attributes.avatarBorderRadius : '0'),
			borderStyle: attributes.avatarBorderStyle !== 'none' ? attributes.avatarBorderStyle : undefined,
			borderColor: attributes.avatarBorderStyle !== 'none' ? attributes.avatarBorderColor : undefined,
			borderWidth: attributes.avatarBorderStyle !== 'none' ? '2px' : undefined
		};

		const nameStyle = {
			color: attributes.nameColor,
			fontSize: attributes.nameTypography.fontSize,
			fontWeight: attributes.nameTypography.fontWeight,
			fontStyle: attributes.nameTypography.fontStyle
		};
		const contributorTitleStyle = {
			color: attributes.contributorTitleColor,
			fontSize: attributes.contributorTitleTypography.fontSize,
			fontWeight: attributes.contributorTitleTypography.fontWeight,
			fontStyle: attributes.contributorTitleTypography.fontStyle
		};

		const dateStyle = {
			color: attributes.dateColor,
			fontSize: attributes.dateTypography.fontSize,
			fontWeight: attributes.dateTypography.fontWeight,
			fontStyle: attributes.dateTypography.fontStyle
		};

		return (
			<div>
				{attributes.showTitle && (
					<h3 style={{ marginBottom: '10px', fontSize: '16px', fontWeight: '600',  ...contributorTitleStyle}}>
						{attributes.title}
					</h3>
				)}

				<div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
					{attributes.showAvatar && mockContributors.map(contributor => (
						<div key={contributor.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
							{attributes.avatarType === 'user_avatar' ? (
								<img
									src={contributor.avatar_urls[48]}
									alt={contributor.name}
									style={avatarStyle}
								/>
							) : (
								<div style={{...avatarStyle, backgroundColor: '#0073aa', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
									<svg width="16" height="16" fill="white" viewBox="0 0 24 24">
										<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
									</svg>
								</div>
							)}
							<span style={nameStyle}>{contributor.name}</span>
						</div>
					))}
				</div>

				{attributes.showLastUpdated && (
					<div style={{ marginTop: '10px' }}>
						<span style={dateStyle}>
							{attributes.datePrefix} {new Date().toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</span>
					</div>
				)}
			</div>
		);
	};

	return (
		<>
			<InspectorControls>
				{/* General Tab */}
				<PanelBody title={__('General', 'wedocs')} initialOpen={true}>
					<ToggleControl
						label={__('Show Title', 'wedocs')}
						checked={attributes.showTitle}
						onChange={(value) => setAttributes({ showTitle: value })}
					/>

					{attributes.showTitle && (
						<TextControl
							label={__('Title', 'wedocs')}
							value={attributes.title}
							onChange={(value) => setAttributes({ title: value })}
						/>
					)}

					<SelectControl
						label={__('Contributor Display', 'wedocs')}
						value={attributes.contributorDisplayMode}
						options={[
							{ label: __('Show all contributors', 'wedocs'), value: 'all' },
							{ label: __('Manually select contributors', 'wedocs'), value: 'manual' },
							{ label: __('Show only main author', 'wedocs'), value: 'main_author' }
						]}
						onChange={(value) => setAttributes({ contributorDisplayMode: value })}
					/>

					{attributes.contributorDisplayMode === 'manual' && (
						<div>
							<h4>{__('Select Contributors', 'wedocs')}</h4>
							{isLoadingUsers ? (
								<Spinner />
							) : (
								<div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px' }}>
									{users.map(user => (
										<label key={user.id} style={{ display: 'block', marginBottom: '5px' }}>
											<input
												type="checkbox"
												checked={attributes.selectedContributors.includes(user.id)}
												onChange={(e) => {
													const newSelected = e.target.checked
														? [...attributes.selectedContributors, user.id]
														: attributes.selectedContributors.filter(id => id !== user.id);
													setAttributes({ selectedContributors: newSelected });
												}}
												style={{ marginRight: '8px' }}
											/>
											{user.name}
										</label>
									))}
								</div>
							)}
						</div>
					)}

					<ToggleControl
						label={__('Show Last Updated Date', 'wedocs')}
						checked={attributes.showLastUpdated}
						onChange={(value) => setAttributes({ showLastUpdated: value })}
					/>

					{attributes.showLastUpdated && (
						<>
							<RadioControl
								label={__('Date Format', 'wedocs')}
								selected={attributes.dateFormat}
								options={[
									{ label: __('WordPress Default', 'wedocs'), value: 'wp_default' },
									{ label: __('Custom Format', 'wedocs'), value: 'custom' }
								]}
								onChange={(value) => setAttributes({ dateFormat: value })}
							/>

							{attributes.dateFormat === 'custom' && (
								<TextControl
									label={__('Custom Date Format', 'wedocs')}
									value={attributes.customDateFormat}
									onChange={(value) => setAttributes({ customDateFormat: value })}
									help={__('Use PHP date format. E.g., F j, Y for "January 1, 2023"', 'wedocs')}
								/>
							)}

							<TextControl
								label={__('Date Prefix Text', 'wedocs')}
								value={attributes.datePrefix}
								onChange={(value) => setAttributes({ datePrefix: value })}
							/>
						</>
					)}
				</PanelBody>

				{/* Styles Tab */}
				<PanelBody title={__('Container Styles', 'wedocs')} initialOpen={false}>
					<RadioControl
						label={__('Background Type', 'wedocs')}
						selected={attributes.backgroundType}
						options={[
							{ label: __('Classic', 'wedocs'), value: 'classic' },
							{ label: __('Gradient', 'wedocs'), value: 'gradient' }
						]}
						onChange={(value) => setAttributes({ backgroundType: value })}
					/>

					{attributes.backgroundType === 'classic' ? (
						<PanelColorSettings
							title={__('Background Color', 'wedocs')}
							colorSettings={[
								{
									value: attributes.backgroundColor,
									onChange: (value) => setAttributes({ backgroundColor: value }),
									label: __('Color', 'wedocs')
								}
							]}
						/>
					) : (
						<TextControl
							label={__('Gradient CSS', 'wedocs')}
							value={attributes.backgroundGradient}
							onChange={(value) => setAttributes({ backgroundGradient: value })}
							help={__('Enter CSS gradient, e.g., linear-gradient(45deg, #ff0000, #00ff00)', 'wedocs')}
						/>
					)}

					<div style={{ marginBottom: '20px' }}>
						<h4>{__('Background Image', 'wedocs')}</h4>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) => setAttributes({
									backgroundImage: { url: media.url, alt: media.alt }
								})}
								allowedTypes={['image']}
								value={attributes.backgroundImage?.url}
								render={({ open }) => (
									<Button
										onClick={open}
										isSecondary
									>
										{attributes.backgroundImage?.url ? __('Change Image', 'wedocs') : __('Select Image', 'wedocs')}
									</Button>
								)}
							/>
						</MediaUploadCheck>
						{attributes.backgroundImage?.url && (
							<Button
								onClick={() => setAttributes({ backgroundImage: { url: '', alt: '' } })}
								isDestructive
								style={{ marginLeft: '10px' }}
							>
								{__('Remove', 'wedocs')}
							</Button>
						)}
					</div>

					<BoxControl
						label={__('Padding', 'wedocs')}
						values={attributes.padding}
						onChange={(value) => setAttributes({ padding: value })}
					/>

					<BoxControl
						label={__('Margin', 'wedocs')}
						values={attributes.margin}
						onChange={(value) => setAttributes({ margin: value })}
					/>

					<SelectControl
						label={__('Border Style', 'wedocs')}
						value={attributes.borderStyle}
						options={[
							{ label: __('None', 'wedocs'), value: 'none' },
							{ label: __('Solid', 'wedocs'), value: 'solid' },
							{ label: __('Dashed', 'wedocs'), value: 'dashed' },
							{ label: __('Dotted', 'wedocs'), value: 'dotted' }
						]}
						onChange={(value) => setAttributes({ borderStyle: value })}
					/>

					{attributes.borderStyle !== 'none' && (
						<>
							<BoxControl
								label={__('Border Width', 'wedocs')}
								values={attributes.borderWidth}
								onChange={(value) => setAttributes({ borderWidth: value })}
							/>

							<PanelColorSettings
								title={__('Border Color', 'wedocs')}
								colorSettings={[
									{
										value: attributes.borderColor,
										onChange: (value) => setAttributes({ borderColor: value }),
										label: __('Color', 'wedocs')
									}
								]}
							/>
						</>
					)}

					<UnitControl
						label={__('Border Radius', 'wedocs')}
						value={attributes.borderRadius}
						onChange={(value) => setAttributes({ borderRadius: value })}
					/>
				</PanelBody>

				{/* Avatar Styles */}
				<PanelBody title={__('Avatar Styles', 'wedocs')} initialOpen={false}>
					<ToggleControl
						label={__('Show Avatar', 'wedocs')}
						checked={attributes.showAvatar}
						onChange={(value) => setAttributes({ showAvatar: value })}
					/>

					{attributes.showAvatar && (
						<>
							<RadioControl
								label={__('Avatar Type', 'wedocs')}
								selected={attributes.avatarType}
								options={[
									{ label: __('User Avatar', 'wedocs'), value: 'user_avatar' },
									{ label: __('Common Icon', 'wedocs'), value: 'common_icon' }
								]}
								onChange={(value) => setAttributes({ avatarType: value })}
							/>

							<UnitControl
								label={__('Size', 'wedocs')}
								value={attributes.avatarSize}
								onChange={(value) => setAttributes({ avatarSize: value })}
							/>

							<RadioControl
								label={__('Shape', 'wedocs')}
								selected={attributes.avatarShape}
								options={[
									{ label: __('Circle', 'wedocs'), value: 'circle' },
									{ label: __('Rounded', 'wedocs'), value: 'rounded' },
									{ label: __('Square', 'wedocs'), value: 'square' }
								]}
								onChange={(value) => setAttributes({ avatarShape: value })}
							/>

							<SelectControl
								label={__('Border Style', 'wedocs')}
								value={attributes.avatarBorderStyle}
								options={[
									{ label: __('None', 'wedocs'), value: 'none' },
									{ label: __('Solid', 'wedocs'), value: 'solid' },
									{ label: __('Dashed', 'wedocs'), value: 'dashed' }
								]}
								onChange={(value) => setAttributes({ avatarBorderStyle: value })}
							/>

							{attributes.avatarBorderStyle !== 'none' && (
								<PanelColorSettings
									title={__('Border Color', 'wedocs')}
									colorSettings={[
										{
											value: attributes.avatarBorderColor,
											onChange: (value) => setAttributes({ avatarBorderColor: value }),
											label: __('Color', 'wedocs')
										}
									]}
								/>
							)}

							<ToggleControl
								label={__('Hover Effect', 'wedocs')}
								checked={attributes.avatarHoverEffect}
								onChange={(value) => setAttributes({ avatarHoverEffect: value })}
							/>
						</>
					)}
				</PanelBody>

				{/* Typography */}
				<PanelBody title={__('Typography', 'wedocs')} initialOpen={false}>
					<h4>{__('Title Name', 'wedocs')}</h4>
					<PanelColorSettings
						title={__('Contributor Title Colors', 'wedocs')}
						colorSettings={[
							{
								value: attributes.contributorTitleColor,
								onChange: (value) => setAttributes({ contributorTitleColor: value }),
								label: __('Text Color', 'wedocs')
							},
							{
								value: attributes.contributorTitleHoverColor,
								onChange: (value) => setAttributes({ contributorTitleHoverColor: value }),
								label: __('Hover Color', 'wedocs')
							}
						]}
					/>
					<h4>{__('Contributor Name', 'wedocs')}</h4>
					<PanelColorSettings
						title={__('Name Colors', 'wedocs')}
						colorSettings={[
							{
								value: attributes.nameColor,
								onChange: (value) => setAttributes({ nameColor: value }),
								label: __('Text Color', 'wedocs')
							},
							{
								value: attributes.nameHoverColor,
								onChange: (value) => setAttributes({ nameHoverColor: value }),
								label: __('Hover Color', 'wedocs')
							}
						]}
					/>

					<UnitControl
						label={__('Font Size', 'wedocs')}
						value={attributes.nameTypography.fontSize}
						onChange={(value) => setAttributes({
							nameTypography: { ...attributes.nameTypography, fontSize: value }
						})}
					/>

					<SelectControl
						label={__('Font Weight', 'wedocs')}
						value={attributes.nameTypography.fontWeight}
						options={[
							{ label: __('Normal', 'wedocs'), value: '400' },
							{ label: __('Bold', 'wedocs'), value: '600' },
							{ label: __('Bolder', 'wedocs'), value: '700' }
						]}
						onChange={(value) => setAttributes({
							nameTypography: { ...attributes.nameTypography, fontWeight: value }
						})}
					/>

					<h4 style={{ marginTop: '20px' }}>{__('Updated Date', 'wedocs')}</h4>
					<PanelColorSettings
						title={__('Date Color', 'wedocs')}
						colorSettings={[
							{
								value: attributes.dateColor,
								onChange: (value) => setAttributes({ dateColor: value }),
								label: __('Color', 'wedocs')
							}
						]}
					/>

					<UnitControl
						label={__('Font Size', 'wedocs')}
						value={attributes.dateTypography.fontSize}
						onChange={(value) => setAttributes({
							dateTypography: { ...attributes.dateTypography, fontSize: value }
						})}
					/>
				</PanelBody>

				{/* Advanced Tab */}
				<PanelBody title={__('Advanced', 'wedocs')} initialOpen={false}>
					<TextControl
						label={__('Additional CSS Classes', 'wedocs')}
						value={attributes.additionalCssClass}
						onChange={(value) => setAttributes({ additionalCssClass: value })}
						help={__('Separate multiple classes with spaces', 'wedocs')}
					/>

					<ToggleControl
						label={__('Enable Schema Markup', 'wedocs')}
						checked={attributes.enableSchema}
						onChange={(value) => setAttributes({ enableSchema: value })}
						help={__('Output structured data for author and dateModified', 'wedocs')}
					/>

					<SelectControl
						label={__('Avatar Link Behavior', 'wedocs')}
						value={attributes.linkBehavior}
						options={[
							{ label: __('Link to user profile', 'wedocs'), value: 'user_profile' },
							{ label: __('No link', 'wedocs'), value: 'no_link' },
							{ label: __('Custom link', 'wedocs'), value: 'custom_link' }
						]}
						onChange={(value) => setAttributes({ linkBehavior: value })}
					/>

					{attributes.linkBehavior === 'custom_link' && (
						<TextControl
							label={__('Custom Link URL', 'wedocs')}
							value={attributes.customLinkUrl}
							onChange={(value) => setAttributes({ customLinkUrl: value })}
							placeholder="https://example.com/author"
						/>
					)}
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				{renderPreview()}
			</div>
		</>
	);
};

export default Edit;
