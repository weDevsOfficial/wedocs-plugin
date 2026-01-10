import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls
} from '@wordpress/block-editor';
import { getBlockClasses, getInlineStyles } from '../block-helpers';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	SelectControl,
	RadioControl,
	Placeholder,
	Spinner,
	TabPanel,
	Button,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { desktop, tablet, mobile } from '@wordpress/icons';

// Import common controls
import TypographyControls from '../commonControls/TypographyControls';
import ColorsControls from '../commonControls/ColorsControls';
import DimensionsControls from '../commonControls/DimensionsControls';
import AlignmentControls from '../commonControls/AlignmentControls';
import BackgroundImageControls from '../commonControls/BackgroundImageControls';
import BorderAndShadowControls from '../commonControls/BorderAndShadowControls';
import DisplayControls from '../commonControls/DisplayControls';

const Edit = (props) => {
	const { attributes, setAttributes } = props;
	const [users, setUsers] = useState([]);
	const [isLoadingUsers, setIsLoadingUsers] = useState(false);
	const [actualContributors, setActualContributors] = useState([]);
	const [isLoadingContributors, setIsLoadingContributors] = useState(false);
	const [currentDevice, setCurrentDevice] = useState('desktop');

	// Get current post data
	const currentPost = useSelect((select) => {
		const { getCurrentPostId, getCurrentPostType } = select('core/editor') || {};
		if (!getCurrentPostId) return null;

		return select(coreStore).getEntityRecord('postType', getCurrentPostType(), getCurrentPostId());
	}, []);

	// Device configuration
	const devices = [
		{ key: 'desktop', icon: desktop, label: __('Desktop', 'wedocs') },
		{ key: 'tablet', icon: tablet, label: __('Tablet', 'wedocs') },
		{ key: 'mobile', icon: mobile, label: __('Mobile', 'wedocs') },
	];

	// Generate responsive styles for preview
	const getResponsiveStyles = () => {
		const currentTypography = attributes.typographyControls[currentDevice] || {};
		const currentColors = attributes.colorsControls[currentDevice] || {};
		const currentDimensions = attributes.dimensionsControls[currentDevice] || {};
		const currentAlignment = attributes.alignmentControls[currentDevice] || {};
		const currentBorderShadow = attributes.borderAndShadowControls[currentDevice] || {};
		const currentBackgroundImage = attributes.backgroundImageControls[currentDevice] || {};

		// Build container styles
		const containerStyles = {
			// Typography
			fontFamily: currentTypography.fontFamily || undefined,
			fontSize: currentTypography.fontSize || undefined,
			fontWeight: currentTypography.fontAppearance?.fontWeight || undefined,
			fontStyle: currentTypography.fontAppearance?.fontStyle || undefined,
			lineHeight: currentTypography.lineHeight || undefined,
			letterSpacing: currentTypography.letterSpacing || undefined,
			textDecoration: currentTypography.textDecoration || undefined,
			textTransform: currentTypography.textTransform || undefined,

			// Colors
			color: currentColors.textColor || undefined,
			backgroundColor: currentColors.backgroundColor || undefined,

			// Dimensions
			width: currentDimensions.width || undefined,
			minWidth: currentDimensions.minWidth || undefined,
			maxWidth: currentDimensions.maxWidth || undefined,
			height: currentDimensions.height || undefined,
			minHeight: currentDimensions.minHeight || undefined,
			maxHeight: currentDimensions.maxHeight || undefined,
			padding: currentDimensions.padding ? `${currentDimensions.padding.top || '0'} ${currentDimensions.padding.right || '0'} ${currentDimensions.padding.bottom || '0'} ${currentDimensions.padding.left || '0'}` : undefined,
			margin: currentDimensions.margin ? `${currentDimensions.margin.top || '0'} ${currentDimensions.margin.right || '0'} ${currentDimensions.margin.bottom || '0'} ${currentDimensions.margin.left || '0'}` : undefined,

			// Alignment
			textAlign: currentAlignment.textAlign || undefined,
			display: 'flex',
			flexDirection: currentAlignment.direction || 'row',
			alignItems: currentAlignment.alignItems || 'center',
			justifyContent: currentAlignment.justifyContent || 'flex-start',
			flexWrap: 'wrap',
			gap: attributes.contributorGap || '10px',

			// Border and Shadow
			border: currentBorderShadow.border ? `${currentBorderShadow.border.width || '0'} ${currentBorderShadow.border.style || 'solid'} ${currentBorderShadow.border.color || 'transparent'}` : undefined,
			borderRadius: currentBorderShadow.borderRadius ? `${currentBorderShadow.borderRadius.topLeft || '0'} ${currentBorderShadow.borderRadius.topRight || '0'} ${currentBorderShadow.borderRadius.bottomRight || '0'} ${currentBorderShadow.borderRadius.bottomLeft || '0'}` : undefined,
			boxShadow: currentBorderShadow.boxShadow && currentBorderShadow.boxShadow.x ? `${currentBorderShadow.boxShadow.inset ? 'inset ' : ''}${currentBorderShadow.boxShadow.x || '0px'} ${currentBorderShadow.boxShadow.y || '0px'} ${currentBorderShadow.boxShadow.blur || '0px'} ${currentBorderShadow.boxShadow.spread || '0px'} ${currentBorderShadow.boxShadow.color || 'rgba(0,0,0,0.2)'}` : undefined,

			// Background Image
			backgroundImage: currentBackgroundImage.bgUrl ? `url(${currentBackgroundImage.bgUrl})` : undefined,
			backgroundSize: currentBackgroundImage.bgSize || undefined,
			backgroundPosition: currentBackgroundImage.bgFocalPoint ? `${currentBackgroundImage.bgFocalPoint.x * 100}% ${currentBackgroundImage.bgFocalPoint.y * 100}%` : undefined,
			backgroundRepeat: currentBackgroundImage.bgRepeat ? 'repeat' : 'no-repeat',
			backgroundAttachment: currentBackgroundImage.bgFixed ? 'fixed' : 'scroll',
		};

		// Remove undefined values
		Object.keys(containerStyles).forEach(key => {
			if (containerStyles[key] === undefined) {
				delete containerStyles[key];
			}
		});

		return containerStyles;
	};

	const blockProps = useBlockProps({
		className: `wedocs-contributors ${attributes.additionalCssClass}`,
		style: getResponsiveStyles()
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

	// Fetch actual contributors based on current post and display mode
	useEffect(() => {
		if (!currentPost) return;

		const fetchContributors = async () => {
			setIsLoadingContributors(true);
			try {
				const contributors = [];

				switch (attributes.contributorDisplayMode) {
					case 'main_author':
						if (currentPost.author) {
							const authorUser = await wp.apiFetch({
								path: `/wp/v2/users/${currentPost.author}?context=edit`
							});
							if (authorUser) {
								contributors.push(authorUser);
							}
						}
						break;

					case 'manual':
						if (attributes.selectedContributors.length > 0) {
							for (const userId of attributes.selectedContributors) {
								try {
									const user = await wp.apiFetch({
										path: `/wp/v2/users/${userId}?context=edit`
									});
									if (user) {
										contributors.push(user);
									}
								} catch (error) {
									console.warn(`Could not fetch user ${userId}:`, error);
								}
							}
						}
						break;

					case 'all':
					default:
						// Get post author
						if (currentPost.author) {
							const authorUser = await wp.apiFetch({
								path: `/wp/v2/users/${currentPost.author}?context=edit`
							});
							if (authorUser) {
								contributors.push(authorUser);
							}
						}

						// Get revisions if post is saved
						if (currentPost.id) {
							try {
								const revisions = await wp.apiFetch({
									path: `/wp/v2/${currentPost.type}/${currentPost.id}/revisions?per_page=50`
								});

								const contributorIds = [currentPost.author];
								for (const revision of revisions) {
									if (revision.author && !contributorIds.includes(revision.author)) {
										contributorIds.push(revision.author);
										try {
											const user = await wp.apiFetch({
												path: `/wp/v2/users/${revision.author}?context=edit`
											});
											if (user) {
												contributors.push(user);
											}
										} catch (error) {
											console.warn(`Could not fetch revision author ${revision.author}:`, error);
										}
									}
								}
							} catch (error) {
								console.warn('Could not fetch revisions:', error);
							}
						}
						break;
				}

				setActualContributors(contributors);
			} catch (error) {
				console.error('Error fetching contributors:', error);
				setActualContributors([]);
			} finally {
				setIsLoadingContributors(false);
			}
		};

		fetchContributors();
	}, [currentPost, attributes.contributorDisplayMode, attributes.selectedContributors]);

	const renderPreview = () => {
		// Show loading state
		if (isLoadingContributors) {
			return (
				<Placeholder
					icon="groups"
					label={__('Doc Contributors', 'wedocs')}
				>
					<Spinner />
					<div>{__('Loading contributors...', 'wedocs')}</div>
				</Placeholder>
			);
		}

		if (attributes.contributorDisplayMode === 'manual' && attributes.selectedContributors.length === 0) {
			return (
				<Placeholder
					icon="groups"
					label={__('Doc Contributors', 'wedocs')}
					instructions={__('Select contributors from the settings panel.', 'wedocs')}
				/>
			);
		}

		// Use actual contributors or fallback to demo data
		let displayContributors = actualContributors;

		if (!displayContributors || displayContributors.length === 0) {
			// Fallback to demo data for new posts or when no contributors found
			displayContributors = [
				{
					id: 1,
					name: 'Demo Author',
					avatar_urls: { 48: weDocsAdminScriptVars.assetsUrl + "/img/demo_avatar/avatar_2.png" }
				}
			];
		}

		const currentColors = attributes.colorsControls[currentDevice] || {};
		const linkColor = currentColors.linkColor || '#0073aa';
		const linkHoverColor = currentColors.linkHoverColor || '#005177';

		return (
			<div>
				{attributes.showTitle && (
					<h3 style={{ marginBottom: '10px' }}>
						{attributes.title}
					</h3>
				)}

				<div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: attributes.contributorGap || '10px' }}>
					{displayContributors.map(contributor => {
						// Handle both API response format and demo format
						const contributorName = contributor.name || contributor.display_name || 'Unknown';
						const contributorId = contributor.id || contributor.ID || Math.random();

						// Get avatar URL with fallbacks
						let avatarUrl = weDocsAdminScriptVars.assetsUrl + "/img/demo_avatar/avatar_1.png";

						if (contributor.avatar_urls) {
							avatarUrl = contributor.avatar_urls[48] || contributor.avatar_urls[96] || contributor.avatar_urls[24];
						}

						// Avatar styles
						const avatarStyles = {
							width: '32px',
							height: '32px',
							borderRadius: attributes.avatarShape === 'circle' ? '50%' :
								(attributes.avatarShape === 'rounded' ? '8px' : '0'),
							marginRight: '8px',
							objectFit: 'cover'
						};

						return (
							<div key={contributorId} style={{ display: 'flex', alignItems: 'center' }}>
								{attributes.showAvatar && (
									attributes.avatarType === 'user_avatar' ? (
										<img
											src={avatarUrl}
											alt={contributorName}
											style={avatarStyles}
										/>
									) : (
										<div style={{
											...avatarStyles,
											backgroundColor: '#0073aa',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center'
										}}>
											<svg width="16" height="16" fill="white" viewBox="0 0 24 24">
												<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
											</svg>
										</div>
									)
								)}
								<span style={{
									color: linkColor,
									cursor: 'pointer',
									fontSize: '14px',
									fontWeight: '600'
								}}>
									{contributorName}
								</span>
							</div>
						);
					})}
				</div>

				{attributes.showLastUpdated && (
					<div style={{
						marginTop: '10px',
						fontSize: '12px',
						color: '#666666'
					}}>
						{attributes.datePrefix} {new Date().toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</div>
				)}
			</div>
		);
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('General Settings', 'wedocs')} initialOpen={true}>
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
				</PanelBody>

				{/* Avatar Settings */}
				<PanelBody title={__('Avatar Settings', 'wedocs')} initialOpen={false}>
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

							<SelectControl
								label={__('Avatar Shape', 'wedocs')}
								value={attributes.avatarShape}
								options={[
									{ label: __('Circle', 'wedocs'), value: 'circle' },
									{ label: __('Rounded', 'wedocs'), value: 'rounded' },
									{ label: __('Square', 'wedocs'), value: 'square' }
								]}
								onChange={(value) => setAttributes({ avatarShape: value })}
							/>

							<ToggleControl
								label={__('Hover Effect', 'wedocs')}
								checked={attributes.avatarHoverEffect}
								onChange={(value) => setAttributes({ avatarHoverEffect: value })}
							/>
						</>
					)}
				</PanelBody>

				{/* Date Settings */}
				<PanelBody title={__('Date Settings', 'wedocs')} initialOpen={false}>
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

				{/* Advanced Settings */}
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

					<TextControl
						label={__('Contributor Gap', 'wedocs')}
						value={attributes.contributorGap}
						onChange={(value) => setAttributes({ contributorGap: value })}
						help={__('Space between contributors (e.g., 10px)', 'wedocs')}
					/>
				</PanelBody>

				{/* Style Controls with Device Tabs */}
				<PanelBody title={__('Style Controls', 'wedocs')} initialOpen={false}>
					{/* Device Selector */}
					<div style={{ marginBottom: '16px' }}>
						<ToggleGroupControl
							label={__('Device', 'wedocs')}
							value={currentDevice}
							onChange={setCurrentDevice}
							isBlock
							__nextHasNoMarginBottom
							__next40pxDefaultSize
						>
							{devices.map(device => (
								<ToggleGroupControlOption
									key={device.key}
									value={device.key}
									label={device.label}
									icon={device.icon}
								/>
							))}
						</ToggleGroupControl>
					</div>

					{/* Style Control Tabs */}
					<TabPanel
						tabs={[
							{ name: 'typography', title: __('Typography', 'wedocs') },
							{ name: 'colors', title: __('Colors', 'wedocs') },
							{ name: 'dimensions', title: __('Dimensions', 'wedocs') },
							{ name: 'alignment', title: __('Alignment', 'wedocs') },
							{ name: 'background', title: __('Background', 'wedocs') },
							{ name: 'border', title: __('Border & Shadow', 'wedocs') },
							{ name: 'display', title: __('Display', 'wedocs') },
						]}
					>
						{(tab) => (
							<div style={{ paddingTop: '16px' }}>
								{tab.name === 'typography' && (
									<TypographyControls
										attributes={attributes}
										setAttributes={setAttributes}
										device={currentDevice}
									/>
								)}
								{tab.name === 'colors' && (
									<ColorsControls
										attributes={attributes}
										setAttributes={setAttributes}
										device={currentDevice}
									/>
								)}
								{tab.name === 'dimensions' && (
									<DimensionsControls
										attributes={attributes}
										setAttributes={setAttributes}
										device={currentDevice}
									/>
								)}
								{tab.name === 'alignment' && (
									<AlignmentControls
										attributes={attributes}
										setAttributes={setAttributes}
										device={currentDevice}
									/>
								)}
								{tab.name === 'background' && (
									<BackgroundImageControls
										attributes={attributes}
										setAttributes={setAttributes}
										device={currentDevice}
									/>
								)}
								{tab.name === 'border' && (
									<BorderAndShadowControls
										attributes={attributes}
										setAttributes={setAttributes}
										device={currentDevice}
									/>
								)}
								{tab.name === 'display' && (
									<DisplayControls
										attributes={attributes}
										setAttributes={setAttributes}
									/>
								)}
							</div>
						)}
					</TabPanel>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				{renderPreview()}
			</div>
		</>
	);
};

export default Edit;
