/**
 * AI-Powered Summary Block - Frontend JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
	const summaryBlocks = document.querySelectorAll('.wp-block-wedocs-ai-summary.collapsible');

	summaryBlocks.forEach(block => {
		const header = block.querySelector('.ai-summary-header');
		const isOpenByDefault = block.getAttribute('data-open-by-default') === 'true';

		// Set initial state
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
	});
});
