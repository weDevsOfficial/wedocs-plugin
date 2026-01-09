import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	SelectControl,
	RadioControl,
	Placeholder,
	Spinner
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import {
	ColorSettingsPanel,
	SpacingPanel,
	BorderPanel,
	TypographyPanel,
} from '../commonControls/CommonControls';

// Import demo avatars
import avatar1 from '../../assets/img/avatar_1.png';
import avatar2 from '../../assets/img/avatar_2.png';

const Edit = (props) => {
	const { attributes, setAttributes } = props;
	const [users, setUsers] = useState([]);
	const [isLoadingUsers, setIsLoadingUsers] = useState(false);
	const [actualContributors, setActualContributors] = useState([]);
	const [isLoadingContributors, setIsLoadingContributors] = useState(false);

	// Check if weDocs Pro is active
	const isPro = window.weDocsAdminScriptVars?.isPro || false;

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

	// Get current post data
	const currentPost = useSelect((select) => {
		const { getCurrentPostId, getCurrentPostType } = select('core/editor') || {};
		if (!getCurrentPostId) return null;

		return select(coreStore).getEntityRecord('postType', getCurrentPostType(), getCurrentPostId());
	}, []);

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
					avatar_urls: { 48: avatar1 }
				}
			];
		}

		const avatarStyle = {
			width: attributes.avatarSize,
			height: attributes.avatarSize,
			borderRadius: attributes.avatarShape === 'circle' ? '50%' :
				(attributes.avatarShape === 'rounded' ? attributes.avatarBorderRadius : '0'),
			borderStyle: attributes.avatarBorderStyle !== 'none' ? attributes.avatarBorderStyle : undefined,
			borderColor: attributes.avatarBorderStyle !== 'none' ? attributes.avatarBorderColor : undefined,
			borderWidth: attributes.avatarBorderStyle !== 'none' ?
				`${attributes.avatarBorderWidth?.top || '2px'} ${attributes.avatarBorderWidth?.right || '2px'} ${attributes.avatarBorderWidth?.bottom || '2px'} ${attributes.avatarBorderWidth?.left || '2px'}` : undefined,
			padding: `${attributes.avatarPadding?.top || '0px'} ${attributes.avatarPadding?.right || '0px'} ${attributes.avatarPadding?.bottom || '0px'} ${attributes.avatarPadding?.left || '0px'}`,
			margin: `${attributes.avatarMargin?.top || '0px'} ${attributes.avatarMargin?.right || '8px'} ${attributes.avatarMargin?.bottom || '0px'} ${attributes.avatarMargin?.left || '0px'}`,
			boxShadow: attributes.avatarBoxShadow?.enabled ?
				`${attributes.avatarBoxShadow.horizontal} ${attributes.avatarBoxShadow.vertical} ${attributes.avatarBoxShadow.blur} ${attributes.avatarBoxShadow.spread} ${attributes.avatarBoxShadow.color}` : undefined
		};

		const titleStyle = {
			color: attributes.contributorTitleColor,
			fontSize: attributes.contributorTitleTypography.fontSize,
			fontWeight: attributes.contributorTitleTypography.fontWeight,
			fontStyle: attributes.contributorTitleTypography.fontStyle,
			fontFamily: attributes.contributorTitleTypography.fontFamily !== 'default' ? attributes.contributorTitleTypography.fontFamily : undefined,
			lineHeight: attributes.contributorTitleTypography.lineHeight !== 'normal' ? attributes.contributorTitleTypography.lineHeight : undefined,
			letterSpacing: attributes.contributorTitleTypography.letterSpacing !== 'normal' ? attributes.contributorTitleTypography.letterSpacing : undefined,
			textTransform: attributes.contributorTitleTypography.textTransform !== 'none' ? attributes.contributorTitleTypography.textTransform : undefined,
			textDecoration: attributes.contributorTitleTypography.textDecoration !== 'none' ? attributes.contributorTitleTypography.textDecoration : undefined,
			padding: `${attributes.titlePadding?.top || '0px'} ${attributes.titlePadding?.right || '0px'} ${attributes.titlePadding?.bottom || '10px'} ${attributes.titlePadding?.left || '0px'}`,
			margin: `${attributes.titleMargin?.top || '0px'} ${attributes.titleMargin?.right || '0px'} ${attributes.titleMargin?.bottom || '0px'} ${attributes.titleMargin?.left || '0px'}`
		};

		const nameStyle = {
			color: attributes.nameColor,
			fontSize: attributes.nameTypography.fontSize,
			fontWeight: attributes.nameTypography.fontWeight,
			fontStyle: attributes.nameTypography.fontStyle,
			fontFamily: attributes.nameTypography.fontFamily !== 'default' ? attributes.nameTypography.fontFamily : undefined,
			lineHeight: attributes.nameTypography.lineHeight !== 'normal' ? attributes.nameTypography.lineHeight : undefined,
			letterSpacing: attributes.nameTypography.letterSpacing !== 'normal' ? attributes.nameTypography.letterSpacing : undefined,
			textTransform: attributes.nameTypography.textTransform !== 'none' ? attributes.nameTypography.textTransform : undefined,
			textDecoration: attributes.nameTypography.textDecoration !== 'none' ? attributes.nameTypography.textDecoration : undefined,
			padding: `${attributes.namePadding?.top || '0px'} ${attributes.namePadding?.right || '0px'} ${attributes.namePadding?.bottom || '0px'} ${attributes.namePadding?.left || '0px'}`,
			margin: `${attributes.nameMargin?.top || '0px'} ${attributes.nameMargin?.right || '0px'} ${attributes.nameMargin?.bottom || '0px'} ${attributes.nameMargin?.left || '0px'}`
		};

		const dateStyle = {
			color: attributes.dateColor,
			fontSize: attributes.dateTypography.fontSize,
			fontWeight: attributes.dateTypography.fontWeight,
			fontStyle: attributes.dateTypography.fontStyle,
			fontFamily: attributes.dateTypography.fontFamily !== 'default' ? attributes.dateTypography.fontFamily : undefined,
			lineHeight: attributes.dateTypography.lineHeight !== 'normal' ? attributes.dateTypography.lineHeight : undefined,
			letterSpacing: attributes.dateTypography.letterSpacing !== 'normal' ? attributes.dateTypography.letterSpacing : undefined,
			textTransform: attributes.dateTypography.textTransform !== 'none' ? attributes.dateTypography.textTransform : undefined,
			textDecoration: attributes.dateTypography.textDecoration !== 'none' ? attributes.dateTypography.textDecoration : undefined,
			padding: `${attributes.datePadding?.top || '0px'} ${attributes.datePadding?.right || '0px'} ${attributes.datePadding?.bottom || '0px'} ${attributes.datePadding?.left || '0px'}`,
			margin: `${attributes.dateMargin?.top || '10px'} ${attributes.dateMargin?.right || '0px'} ${attributes.dateMargin?.bottom || '0px'} ${attributes.dateMargin?.left || '0px'}`
		};

		return (
			<div>
				{attributes.showTitle && (
					<h3 style={titleStyle}>
						{attributes.title}
					</h3>
				)}

				<div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: attributes.contributorGap || '10px' }}>
					{attributes.showAvatar && displayContributors.map(contributor => {
						// Handle both API response format and demo format
						const contributorName = contributor.name || contributor.display_name || 'Unknown';
						const contributorId = contributor.id || contributor.ID || Math.random();
						// Get avatar URL with fallbacks
						let avatarUrl = avatar1;

						if (contributor.avatar_urls) {
							avatarUrl = contributor.avatar_urls[48] || contributor.avatar_urls[96] || contributor.avatar_urls[24];
						}

						// If no avatar URL and we have an email, use Gravatar
						if (!avatarUrl && contributor.email) {
							try {
								const emailHash = btoa(contributor.email.toLowerCase().trim());
								avatarUrl = `https://www.gravatar.com/avatar/${emailHash}?s=48&d=identicon`;
							} catch (e) {
								avatarUrl = avatar1;
							}
						}

						return (
							<div key={contributorId} style={{ display: 'flex', alignItems: 'center' }}>
								{attributes.avatarType === 'user_avatar' ? (
									<img
										src={avatarUrl}
										alt={contributorName}
										style={avatarStyle}
									/>
								) : (
									<div style={{...avatarStyle, backgroundColor: '#0073aa', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
										<svg width="16" height="16" fill="white" viewBox="0 0 24 24">
											<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
										</svg>
									</div>
								)}
								<span style={nameStyle}>{contributorName}</span>
							</div>
						);
					})}
				</div>

				{attributes.showLastUpdated && (
					<div style={dateStyle}>
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

	// If Pro is not active, show upgrade notice
	if (!isPro) {
		return (
			<>
				<InspectorControls>
					<PanelBody title={__('Doc Contributors - PRO Feature', 'wedocs')} initialOpen={true}>
						<div style={{ padding: '20px', textAlign: 'center' }}>
							<div style={{ marginBottom: '15px' }}>
								<svg width="48" height="48" fill="#4f47e6" viewBox="0 0 20 15">
									<path d="M19.213 4.116c.003.054-.001.108-.015.162l-1.234 6.255a.56.56 0 0 1-.541.413l-7.402.036h-.003-7.402c-.257 0-.482-.171-.544-.414L.839 4.295a.53.53 0 0 1-.015-.166C.347 3.983 0 3.548 0 3.036c0-.632.528-1.145 1.178-1.145s1.178.514 1.178 1.145a1.13 1.13 0 0 1-.43.884L3.47 5.434c.39.383.932.602 1.486.602.655 0 1.28-.303 1.673-.81l2.538-3.272c-.213-.207-.345-.494-.345-.809C8.822.514 9.351 0 10 0s1.178.514 1.178 1.145c0 .306-.125.584-.327.79l.002.003 2.52 3.281c.393.512 1.02.818 1.677.818a2.11 2.11 0 0 0 1.481-.597l1.554-1.512c-.268-.21-.44-.531-.44-.892 0-.632.528-1.145 1.177-1.145S20 2.405 20 3.036c0 .498-.329.922-.787 1.079zm-1.369 8.575c0-.301-.251-.545-.561-.545H2.779c-.31 0-.561.244-.561.545V14c0 .301.251.546.561.546h14.505c.31 0 .561-.244.561-.546v-1.309z" />
								</svg>
							</div>
							<h3 style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: '600' }}>
								{__('This is a PRO Feature', 'wedocs')}
							</h3>
							<p style={{ margin: '0 0 20px 0', color: '#666', fontSize: '14px' }}>
								{__('The Contributors block requires weDocs Pro to be active.', 'wedocs')}
							</p>
							<a
								href="https://wedocs.co/pricing/"
								target="_blank"
								rel="noopener noreferrer"
								style={{
									display: 'inline-block',
									padding: '10px 20px',
									backgroundColor: '#4f47e6',
									color: '#fff',
									textDecoration: 'none',
									borderRadius: '4px',
									fontWeight: '600',
									fontSize: '14px'
								}}
							>
								{__('Purchase weDocs Pro', 'wedocs')}
							</a>
						</div>
					</PanelBody>
				</InspectorControls>

				<div {...blockProps}>
					<Placeholder
						icon={
							<svg width="48" height="48" fill="#4f47e6" viewBox="0 0 20 15">
								<path d="M19.213 4.116c.003.054-.001.108-.015.162l-1.234 6.255a.56.56 0 0 1-.541.413l-7.402.036h-.003-7.402c-.257 0-.482-.171-.544-.414L.839 4.295a.53.53 0 0 1-.015-.166C.347 3.983 0 3.548 0 3.036c0-.632.528-1.145 1.178-1.145s1.178.514 1.178 1.145a1.13 1.13 0 0 1-.43.884L3.47 5.434c.39.383.932.602 1.486.602.655 0 1.28-.303 1.673-.81l2.538-3.272c-.213-.207-.345-.494-.345-.809C8.822.514 9.351 0 10 0s1.178.514 1.178 1.145c0 .306-.125.584-.327.79l.002.003 2.52 3.281c.393.512 1.02.818 1.677.818a2.11 2.11 0 0 0 1.481-.597l1.554-1.512c-.268-.21-.44-.531-.44-.892 0-.632.528-1.145 1.177-1.145S20 2.405 20 3.036c0 .498-.329.922-.787 1.079zm-1.369 8.575c0-.301-.251-.545-.561-.545H2.779c-.31 0-.561.244-.561.545V14c0 .301.251.546.561.546h14.505c.31 0 .561-.244.561-.546v-1.309z" />
							</svg>
						}
						label={__('Doc Contributors - PRO Feature', 'wedocs')}
						instructions={__('This block requires weDocs Pro to be active.', 'wedocs')}
					>
						<a
							href="https://wedocs.co/pricing/"
							target="_blank"
							rel="noopener noreferrer"
							style={{
								display: 'inline-block',
								padding: '10px 20px',
								backgroundColor: '#4f47e6',
								color: '#fff',
								textDecoration: 'none',
								borderRadius: '4px',
								fontWeight: '600',
								fontSize: '14px',
								marginTop: '10px'
							}}
						>
							{__('Purchase weDocs Pro', 'wedocs')}
						</a>
					</Placeholder>
				</div>
			</>
		);
	}

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
			</PanelBody>
		</InspectorControls>

		<InspectorControls group="styles">
			<SpacingPanel
				title={__('Container Spacing', 'wedocs')}
				padding={attributes.padding}
				margin={attributes.margin}
				onPaddingChange={(value) => setAttributes({ padding: value })}
				onMarginChange={(value) => setAttributes({ margin: value })}
			/>

			<BorderPanel
				title={__('Container Border', 'wedocs')}
				borderStyle={attributes.borderStyle}
				borderWidth={attributes.borderWidth}
				borderColor={attributes.borderColor}
				borderRadius={attributes.borderRadius}
				onStyleChange={(value) => setAttributes({ borderStyle: value })}
				onWidthChange={(value) => setAttributes({ borderWidth: value })}
				onColorChange={(value) => setAttributes({ borderColor: value })}
				onRadiusChange={(value) => setAttributes({ borderRadius: value })}
			/>


			{attributes.showTitle && (
				<>
					<ColorSettingsPanel
						title={__('Title Colors', 'wedocs')}
						colorSettings={[
							{
								value: attributes.contributorTitleColor,
								onChange: (value) => setAttributes({ contributorTitleColor: value }),
								label: __('Title Color', 'wedocs'),
							},
							{
								value: attributes.contributorTitleHoverColor,
								onChange: (value) => setAttributes({ contributorTitleHoverColor: value }),
								label: __('Title Hover Color', 'wedocs'),
							},
						]}
					/>

					<SpacingPanel
						title={__('Title Spacing', 'wedocs')}
						padding={attributes.titlePadding}
						margin={attributes.titleMargin}
						onPaddingChange={(value) => setAttributes({ titlePadding: value })}
						onMarginChange={(value) => setAttributes({ titleMargin: value })}
					/>
				</>
			)}


			{attributes.showAvatar && (
				<>
					<SpacingPanel
						title={__('Avatar Spacing', 'wedocs')}
						padding={attributes.avatarPadding}
						margin={attributes.avatarMargin}
						onPaddingChange={(value) => setAttributes({ avatarPadding: value })}
						onMarginChange={(value) => setAttributes({ avatarMargin: value })}
					/>

					<BorderPanel
						title={__('Avatar Border', 'wedocs')}
						borderStyle={attributes.avatarBorderStyle}
						borderWidth={attributes.avatarBorderWidth}
						borderColor={attributes.avatarBorderColor}
						borderRadius={attributes.avatarBorderRadius}
						onStyleChange={(value) => setAttributes({ avatarBorderStyle: value })}
						onWidthChange={(value) => setAttributes({ avatarBorderWidth: value })}
						onColorChange={(value) => setAttributes({ avatarBorderColor: value })}
						onRadiusChange={(value) => setAttributes({ avatarBorderRadius: value })}
					/>
				</>
			)}


			<ColorSettingsPanel
				title={__('Name Colors', 'wedocs')}
				colorSettings={[
					{
						value: attributes.nameColor,
						onChange: (value) => setAttributes({ nameColor: value }),
						label: __('Name Color', 'wedocs'),
					},
					{
						value: attributes.nameHoverColor,
						onChange: (value) => setAttributes({ nameHoverColor: value }),
						label: __('Name Hover Color', 'wedocs'),
					},
				]}
			/>

			<SpacingPanel
				title={__('Name Spacing', 'wedocs')}
				padding={attributes.namePadding}
				margin={attributes.nameMargin}
				onPaddingChange={(value) => setAttributes({ namePadding: value })}
				onMarginChange={(value) => setAttributes({ nameMargin: value })}
			/>


			{attributes.showLastUpdated && (
				<>
					<ColorSettingsPanel
						title={__('Date Colors', 'wedocs')}
						colorSettings={[
							{
								value: attributes.dateColor,
								onChange: (value) => setAttributes({ dateColor: value }),
								label: __('Date Color', 'wedocs'),
							},
						]}
					/>

					<SpacingPanel
						title={__('Date Spacing', 'wedocs')}
						padding={attributes.datePadding}
						margin={attributes.dateMargin}
						onPaddingChange={(value) => setAttributes({ datePadding: value })}
						onMarginChange={(value) => setAttributes({ dateMargin: value })}
					/>
				</>
			)}
		</InspectorControls>

		<div {...blockProps}>
			{renderPreview()}
		</div>
	</>
	);
};

export default Edit;
