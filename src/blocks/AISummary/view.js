/**
 * AI-Powered Summary Block - Frontend JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
	const summaryBlocks = document.querySelectorAll('.wp-block-wedocs-ai-summary');

	summaryBlocks.forEach(block => {
		const header = block.querySelector('.ai-summary-header');
		const isCollapsible = block.getAttribute('data-collapsible') === 'true';
		const isOpenByDefault = block.getAttribute('data-open-by-default') === 'true';
		let postId = block.getAttribute('data-post-id');
		const hasContent = block.getAttribute('data-has-content') === 'true';

		// Fallback: Get post ID from body class or meta tag if not in block
		if (!postId || postId === '' || isNaN(postId)) {
			// Try to get from body class (WordPress adds postid-XXX class)
			const bodyClasses = document.body.className.match(/postid-(\d+)/);
			if (bodyClasses && bodyClasses[1]) {
				postId = bodyClasses[1];
			} else {
				// Try to get from article data attribute or other sources
				const article = document.querySelector('article[data-id]');
				if (article) {
					postId = article.getAttribute('data-id');
				}
			}
		}

		// Set initial state for collapsible blocks
		if (isCollapsible) {
			if (isOpenByDefault) {
				block.classList.add('open');
			}

			// Toggle on click
			if (header) {
				header.addEventListener('click', () => {
					block.classList.toggle('open');

					// Save state to localStorage
					const blockId = block.getAttribute('data-block-id');
					if (blockId) {
						const isOpen = block.classList.contains('open');
						localStorage.setItem(`ai-summary-${blockId}`, isOpen ? 'open' : 'closed');
					}
				});
			}

			// Restore state from localStorage
			const blockId = block.getAttribute('data-block-id');
			if (blockId) {
				const savedState = localStorage.getItem(`ai-summary-${blockId}`);
				if (savedState === 'open') {
					block.classList.add('open');
				} else if (savedState === 'closed') {
					block.classList.remove('open');
				}
			}
		}

		// Handle AI summary generation on frontend
		if (!hasContent && postId) {
			const generateBtn = block.querySelector('.ai-summary-generate-btn');
			if (generateBtn) {
				generateBtn.addEventListener('click', async function() {
					// Prevent multiple clicks
					if (generateBtn.disabled) return;

					generateBtn.disabled = true;
					const originalText = generateBtn.textContent;
					generateBtn.textContent = generateBtn.getAttribute('data-generating-text') || 'Generating...';
					generateBtn.style.opacity = '0.6';
					generateBtn.style.cursor = 'not-allowed';

					try {
						const response = await fetch(`/wp-json/wp/v2/docs/${postId}/ai-summary/generate`, {
							method: 'POST',
							credentials: 'same-origin',
							headers: {
								'Content-Type': 'application/json',
								'X-WP-Nonce': window.wpApiSettings?.nonce || ''
							}
						});

						if (!response.ok) {
							const errorData = await response.json().catch(() => ({}));
							throw new Error(errorData.message || 'Failed to generate summary');
						}

						const data = await response.json();

						if (data.success && data.summary) {
							// Replace the placeholder with the generated summary
							const contentDiv = block.querySelector('.ai-summary-content');
							if (contentDiv) {
								contentDiv.innerHTML = `<div>${data.summary}</div>`;
								block.setAttribute('data-has-content', 'true');
								block.classList.remove('no-summary');
								block.classList.add('has-summary');
							}
						} else {
							throw new Error('No summary was generated');
						}
					} catch (error) {
						console.error('AI Summary generation error:', error);

						// Show error message
						const contentDiv = block.querySelector('.ai-summary-content');
						if (contentDiv) {
							const errorMsg = document.createElement('p');
							errorMsg.style.color = '#d63638';
							errorMsg.style.fontSize = '14px';
							errorMsg.textContent = error.message || 'Failed to generate summary. Please try again later.';
							contentDiv.appendChild(errorMsg);
						}

						// Re-enable button
						generateBtn.disabled = false;
						generateBtn.textContent = originalText;
						generateBtn.style.opacity = '1';
						generateBtn.style.cursor = 'pointer';
					}
				});
			}
		}

		// Try to load saved summary from server if no content exists
		if (!hasContent && postId) {
			loadSavedSummary(block, postId);
		}
	});

	/**
	 * Load saved summary from server
	 */
	async function loadSavedSummary(block, postId) {
		try {
			const response = await fetch(`/wp-json/wp/v2/docs/${postId}/ai-summary`, {
				method: 'GET',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) return;

			const data = await response.json();

			if (data.exists && data.summary) {
				// Replace the placeholder with the saved summary
				const contentDiv = block.querySelector('.ai-summary-content');
				if (contentDiv) {
					contentDiv.innerHTML = `<div>${data.summary}</div>`;
					block.setAttribute('data-has-content', 'true');
					block.classList.remove('no-summary');
					block.classList.add('has-summary');
				}
			}
		} catch (error) {
			console.log('No saved summary available or error loading:', error);
		}
	}
});
