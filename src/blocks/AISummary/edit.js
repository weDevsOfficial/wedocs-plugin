import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	SelectControl,
	Button,
	Spinner,
	Notice
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import './editor.scss';
import {
	ColorSettingsPanel,
	TypographyPanel,
	SpacingPanel,
	BorderPanel
} from '../commonControls/CommonControls';
import { getBlockClasses, getInlineStyles } from '../block-helpers';

export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		blockId,
		title,
		content,
		isCollapsible,
		isOpenByDefault,
		showIcon,
		iconType
	} = attributes;

	const [isGenerating, setIsGenerating] = useState(false);
	const [isLoadingSaved, setIsLoadingSaved] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [hasSavedSummary, setHasSavedSummary] = useState(false);

	// Get current post ID
	const currentPostId = useSelect((select) => {
		return select('core/editor').getCurrentPostId();
	}, []);

	// Set unique block ID and post ID
	useEffect(() => {
		if (!blockId) {
			setAttributes({ blockId: `ai-summary-${clientId}` });
		}
		if (currentPostId && attributes.postId !== currentPostId) {
			setAttributes({ postId: currentPostId });
		}
	}, [blockId, clientId, currentPostId, attributes.postId, setAttributes]);

	// Use postId from attributes
	const postId = attributes.postId;

	// Load saved summary on mount
	useEffect(() => {
		if (postId) {
			loadSavedSummary();
		}
	}, [postId]);

	// Load saved summary from post meta
	const loadSavedSummary = async () => {
		setIsLoadingSaved(true);
		setError('');

		try {
			const response = await apiFetch({
				path: `/wp/v2/docs/${postId}/ai-summary`,
				method: 'GET',
			});

			if (response.exists && response.summary) {
				setAttributes({ content: response.summary });
				setHasSavedSummary(true);
				setSuccess(__('Loaded saved summary', 'wedocs-plugin'));
				setTimeout(() => setSuccess(''), 3000);
			}
		} catch (err) {
			// No saved summary or error loading - not a critical error
			console.log('No saved summary found or error loading:', err);
		} finally {
			setIsLoadingSaved(false);
		}
	};

	// Generate summary using AI
	const generateSummary = async () => {
		if (!postId) {
			setError(__('Unable to get post ID. Please save the post first.', 'wedocs-plugin'));
			return;
		}

		setIsGenerating(true);
		setError('');
		setSuccess('');

		try {
			console.log('Generating AI summary for post ID:', postId);
			const response = await apiFetch({
				path: `/wp/v2/docs/${postId}/ai-summary/generate`,
				method: 'POST',
			});

			console.log('AI summary response:', response);

			if (response.success && response.summary) {
				setAttributes({ content: response.summary });
				setHasSavedSummary(true);
				setSuccess(__('Summary generated and saved successfully!', 'wedocs-plugin'));
				setTimeout(() => setSuccess(''), 5000);
			}
		} catch (err) {
			console.error('AI summary generation error:', err);
			setError(err.message || __('Failed to generate summary. Please check your AI settings.', 'wedocs-plugin'));
		} finally {
			setIsGenerating(false);
		}
	};

	// Clear saved summary
	const clearSummary = async () => {
		if (!confirm(__('Are you sure you want to clear the saved summary? This cannot be undone.', 'wedocs-plugin'))) {
			return;
		}

		try {
			await apiFetch({
				path: `/wp/v2/docs/${postId}/ai-summary`,
				method: 'DELETE',
			});

			setAttributes({ content: '' });
			setHasSavedSummary(false);
			setSuccess(__('Summary cleared successfully', 'wedocs-plugin'));
			setTimeout(() => setSuccess(''), 3000);
		} catch (err) {
			setError(err.message || __('Failed to clear summary', 'wedocs-plugin'));
		}
	};

	// Save current content as summary
	const saveCurrentSummary = async () => {
		if (!content) {
			setError(__('Please add content before saving', 'wedocs-plugin'));
			return;
		}

		try {
			await apiFetch({
				path: `/wp/v2/docs/${postId}/ai-summary`,
				method: 'POST',
				data: {
					summary: content
				}
			});

			setHasSavedSummary(true);
			setSuccess(__('Summary saved successfully!', 'wedocs-plugin'));
			setTimeout(() => setSuccess(''), 3000);
		} catch (err) {
			setError(err.message || __('Failed to save summary', 'wedocs-plugin'));
		}
	};

	const blockProps = useBlockProps({
		className: 'wp-block-wedocs-ai-summary',
		'data-block-id': blockId,
		style: {
		}
	});

	const getIconSVG = (type) => {
		const icons = {
			sparkles: (
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
					<path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="currentColor"/>
					<path d="M19 15L19.5 17L21.5 17.5L19.5 18L19 20L18.5 18L16.5 17.5L18.5 17L19 15Z" fill="currentColor"/>
					<path d="M6 4L6.5 6L8.5 6.5L6.5 7L6 9L5.5 7L3.5 6.5L5.5 6L6 4Z" fill="currentColor"/>
				</svg>
			),
			lightbulb: (
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
					<path d="M9 21C9 21.55 9.45 22 10 22H14C14.55 22 15 21.55 15 21V20H9V21ZM12 2C8.14 2 5 5.14 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.14 15.86 2 12 2Z" fill="currentColor"/>
				</svg>
			),
			star: (
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
					<path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
				</svg>
			),
			robot: (
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
					<path d="M20 9V7C20 5.9 19.1 5 18 5H13V2.5C13 2.22 12.78 2 12.5 2C12.22 2 12 2.22 12 2.5V5H6C4.9 5 4 5.9 4 7V9C2.9 9 2 9.9 2 11V13C2 14.1 2.9 15 4 15V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V15C21.1 15 22 14.1 22 13V11C22 9.9 21.1 9 20 9ZM7.5 11.5C7.5 10.67 8.17 10 9 10C9.83 10 10.5 10.67 10.5 11.5C10.5 12.33 9.83 13 9 13C8.17 13 7.5 12.33 7.5 11.5ZM16.5 17H7.5V16H16.5V17ZM15 13C14.17 13 13.5 12.33 13.5 11.5C13.5 10.67 14.17 10 15 10C15.83 10 16.5 10.67 16.5 11.5C16.5 12.33 15.83 13 15 13Z" fill="currentColor"/>
				</svg>
			)
		};
		return icons[type] || icons.sparkles;
	};

	return (
		<>
			<InspectorControls>
				{/* AI Actions Panel */}
				<PanelBody title={__('AI Summary Actions', 'wedocs-plugin')} initialOpen={true}>
					{error && (
						<Notice status="error" isDismissible={false}>
							{error}
						</Notice>
					)}
					{success && (
						<Notice status="success" isDismissible={false}>
							{success}
						</Notice>
					)}

					<div style={{ marginBottom: '16px' }}>
						<Button
							variant="primary"
							onClick={generateSummary}
							disabled={isGenerating || isLoadingSaved}
							style={{ width: '100%', justifyContent: 'center', marginBottom: '8px' }}
						>
							{isGenerating ? (
								<>
									<Spinner />
									{__('Generating...', 'wedocs-plugin')}
								</>
							) : (
								__('Generate AI Summary', 'wedocs-plugin')
							)}
						</Button>

						<p style={{ fontSize: '12px', color: '#757575', margin: '8px 0' }}>
							{hasSavedSummary
								? __('A saved summary exists. Generate will create a new one.', 'wedocs-plugin')
								: __('Generate a summary using AI based on the document content.', 'wedocs-plugin')
							}
						</p>
					</div>

					{content && (
						<div style={{ marginBottom: '16px' }}>
							<Button
								variant="secondary"
								onClick={saveCurrentSummary}
								disabled={isGenerating}
								style={{ width: '100%', justifyContent: 'center', marginBottom: '8px' }}
							>
								{__('Save Current Content', 'wedocs-plugin')}
							</Button>
							<p style={{ fontSize: '12px', color: '#757575', margin: '8px 0' }}>
								{__('Save the current summary content for future use.', 'wedocs-plugin')}
							</p>
						</div>
					)}

					{hasSavedSummary && (
						<div style={{ marginBottom: '16px' }}>
							<Button
								variant="secondary"
								onClick={loadSavedSummary}
								disabled={isGenerating || isLoadingSaved}
								style={{ width: '100%', justifyContent: 'center', marginBottom: '8px' }}
							>
								{isLoadingSaved ? (
									<>
										<Spinner />
										{__('Loading...', 'wedocs-plugin')}
									</>
								) : (
									__('Reload Saved Summary', 'wedocs-plugin')
								)}
							</Button>
						</div>
					)}

					{hasSavedSummary && (
						<Button
							variant="link"
							isDestructive
							onClick={clearSummary}
							disabled={isGenerating}
							style={{ width: '100%', justifyContent: 'center' }}
						>
							{__('Clear Saved Summary', 'wedocs-plugin')}
						</Button>
					)}
				</PanelBody>

				{/* Block Settings Panel */}
				<PanelBody title={__('Block Settings', 'wedocs-plugin')} initialOpen={false}>
					<ToggleControl
						label={__('Make Collapsible', 'wedocs-plugin')}
						checked={isCollapsible}
						onChange={(value) => setAttributes({ isCollapsible: value })}
						help={__('Allow users to expand/collapse the summary', 'wedocs-plugin')}
					/>
					{isCollapsible && (
						<ToggleControl
							label={__('Open by Default', 'wedocs-plugin')}
							checked={isOpenByDefault}
							onChange={(value) => setAttributes({ isOpenByDefault: value })}
						/>
					)}
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
								{ label: __('Sparkles', 'wedocs-plugin'), value: 'sparkles' },
								{ label: __('Lightbulb', 'wedocs-plugin'), value: 'lightbulb' },
								{ label: __('Star', 'wedocs-plugin'), value: 'star' },
								{ label: __('Robot', 'wedocs-plugin'), value: 'robot' }
							]}
							onChange={(value) => setAttributes({ iconType: value })}
						/>
					)}
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="ai-summary-header" style={{
					display: 'flex',
					alignItems: 'center',
					gap: '10px',
					cursor: isCollapsible ? 'pointer' : 'default'
				}}>
					{showIcon && (
						<div className="ai-summary-icon">
							{getIconSVG(iconType)}
						</div>
					)}
					<RichText
						tagName="h3"
						value={title}
						onChange={(value) => setAttributes({ title: value })}
						placeholder={__('AI Summary', 'wedocs-plugin')}
						style={{
							margin: 0,
							flex: 1
						}}
					/>
					{isCollapsible && (
						<div className="ai-summary-toggle">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
								<path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
							</svg>
						</div>
					)}
				</div>
				<div className="ai-summary-content" style={{
					marginTop: '15px'
				}}>
					<RichText
						tagName="div"
						value={content}
						onChange={(value) => setAttributes({ content: value })}
						placeholder={__('Click "Generate AI Summary" to create a summary, or type your own...', 'wedocs-plugin')}
					/>
				</div>
			</div>
		</>
	);
}
