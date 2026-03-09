/**
 * Reading Progress Bar - Frontend JavaScript
 * Calculates reading progress based on content section only
 */

document.addEventListener('DOMContentLoaded', function() {
	const progressBlocks = document.querySelectorAll('.wp-block-wedocs-reading-progress');

	progressBlocks.forEach(block => {
		const contentSelector = block.getAttribute('data-content-selector') || '.entry-content, .post-content, article, main';
		const wordsPerMinute = parseInt(block.getAttribute('data-words-per-minute')) || 200;
		const animationSpeed = block.getAttribute('data-animation-speed') || 'smooth';

		const progressBar = block.querySelector('.reading-progress-fill');
		const percentageEl = block.querySelector('.progress-percentage');
		const timeEl = block.querySelector('.progress-time');

		// Find the content element
		const contentElements = contentSelector.split(',').map(s => s.trim());
		let contentElement = null;

		for (const selector of contentElements) {
			contentElement = document.querySelector(selector);
			if (contentElement) break;
		}

		if (!contentElement) {
			console.warn('Reading Progress: Content element not found with selector:', contentSelector);
			return;
		}

		// Calculate reading time
		const textContent = contentElement.innerText || contentElement.textContent;
		const wordCount = textContent.trim().split(/\s+/).length;
		const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);

		// Initialize reading time display
		if (timeEl) {
			timeEl.textContent = `📖 ${readingTimeMinutes} min read`;
		}

		// Get content boundaries
		function getContentBounds() {
			const rect = contentElement.getBoundingClientRect();
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

			return {
				top: rect.top + scrollTop,
				bottom: rect.bottom + scrollTop,
				height: rect.height
			};
		}

		// Calculate and update progress
		function updateProgress() {
			const bounds = getContentBounds();
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			const windowHeight = window.innerHeight;

			// Calculate when content starts to be visible
			const contentStart = bounds.top;
			const contentEnd = bounds.bottom - windowHeight;

			// Calculate scroll progress within content area
			let progress = 0;

			if (scrollTop < contentStart) {
				// Before content
				progress = 0;
			} else if (scrollTop > contentEnd) {
				// After content
				progress = 100;
			} else {
				// Within content - calculate percentage
				const scrolledInContent = scrollTop - contentStart;
				const totalScrollableContent = contentEnd - contentStart;
				progress = (scrolledInContent / totalScrollableContent) * 100;
			}

			// Ensure progress is between 0 and 100
			progress = Math.max(0, Math.min(100, progress));

			// Update progress bar
			if (progressBar) {
				progressBar.style.width = `${progress}%`;
			}

			// Update percentage display
			if (percentageEl) {
				percentageEl.textContent = `${Math.round(progress)}%`;
			}

			// Update remaining reading time
			if (timeEl) {
				const remainingProgress = 100 - progress;
				const remainingMinutes = Math.ceil((readingTimeMinutes * remainingProgress) / 100);

				if (progress >= 100) {
					timeEl.textContent = '✓ Complete';
				} else if (remainingMinutes === 0) {
					timeEl.textContent = '📖 < 1 min';
				} else {
					timeEl.textContent = `📖 ${remainingMinutes} min left`;
				}
			}
		}

		// Initial update
		updateProgress();

		// Update on scroll with throttle
		let ticking = false;
		window.addEventListener('scroll', function() {
			if (!ticking) {
				window.requestAnimationFrame(function() {
					updateProgress();
					ticking = false;
				});
				ticking = true;
			}
		});

		// Update on resize
		let resizeTimeout;
		window.addEventListener('resize', function() {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(updateProgress, 250);
		});

		// Store initial state for potential reset
		block._readingProgressState = {
			contentElement,
			readingTimeMinutes,
			update: updateProgress
		};
	});

	// Optional: Add visibility observer for performance
	if ('IntersectionObserver' in window) {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting && entry.target._readingProgressState) {
					entry.target._readingProgressState.update();
				}
			});
		});

		progressBlocks.forEach(block => {
			observer.observe(block);
		});
	}
});
