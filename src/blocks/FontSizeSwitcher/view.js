/**
 * Font Size Switcher - Frontend JavaScript
 * Allows readers to adjust document font size for better readability
 */

document.addEventListener('DOMContentLoaded', function() {
	const switcherBlocks = document.querySelectorAll('.wp-block-wedocs-font-size-switcher');

	switcherBlocks.forEach(block => {
		const contentSelector = block.getAttribute('data-content-selector') || '.entry-content, .post-content, article, main';
		const defaultSize = block.getAttribute('data-default-size') || '16px';
		const displayStyle = block.getAttribute('data-display-style') || 'buttons';
		const activeColor = block.getAttribute('data-active-color') || '#0073aa';
		const textColor = block.getAttribute('data-text-color') || '#333333';
		const bgColor = block.getAttribute('data-bg-color') || '#f5f5f5';
		const borderColor = block.getAttribute('data-border-color') || '#dddddd';
		const buttonStyle = block.getAttribute('data-button-style') || 'outlined';

		// Find the content element
		const contentElements = contentSelector.split(',').map(s => s.trim());
		let contentElement = null;

		for (const selector of contentElements) {
			contentElement = document.querySelector(selector);
			if (contentElement) break;
		}

		if (!contentElement) {
			console.warn('Font Size Switcher: Content element not found with selector:', contentSelector);
			return;
		}

		// Get stored font size from localStorage
		const storageKey = 'wedocs-font-size';
		const storedSize = localStorage.getItem(storageKey);
		let currentSize = storedSize || defaultSize;

		// Apply initial font size
		applyFontSize(currentSize);

		// Get UI elements
		const currentDisplay = block.querySelector('.current-size-display');

		// Handle different display styles
		if (displayStyle === 'buttons') {
			initButtonControls();
		} else if (displayStyle === 'slider') {
			initSliderControls();
		} else if (displayStyle === 'dropdown') {
			initDropdownControls();
		}

		// Button controls
		function initButtonControls() {
			const buttons = block.querySelectorAll('.font-size-option');

			buttons.forEach(button => {
				const size = button.getAttribute('data-size');
				const label = button.getAttribute('data-label');

				// Highlight active button
				if (size === currentSize) {
					setActiveButton(button);
				}

				button.addEventListener('click', () => {
					currentSize = size;
					applyFontSize(size);
					localStorage.setItem(storageKey, size);

					// Update active state
					buttons.forEach(btn => resetButtonStyle(btn));
					setActiveButton(button);

					// Update current display
					if (currentDisplay) {
						currentDisplay.textContent = `(${label})`;
					}
				});
			});
		}

		// Slider controls
		function initSliderControls() {
			const slider = block.querySelector('.font-size-slider');
			const decreaseBtn = block.querySelector('.font-size-decrease');
			const increaseBtn = block.querySelector('.font-size-increase');

			if (slider) {
				// Set initial slider value
				slider.value = parseInt(currentSize);

				slider.addEventListener('input', (e) => {
					const size = e.target.value + 'px';
					currentSize = size;
					applyFontSize(size);
					updateDisplay(size);
				});

				slider.addEventListener('change', (e) => {
					const size = e.target.value + 'px';
					localStorage.setItem(storageKey, size);
				});
			}

			if (decreaseBtn) {
				decreaseBtn.addEventListener('click', () => {
					const current = parseInt(currentSize);
					if (current > 12) {
						const newSize = (current - 2) + 'px';
						currentSize = newSize;
						applyFontSize(newSize);
						localStorage.setItem(storageKey, newSize);
						if (slider) slider.value = current - 2;
						updateDisplay(newSize);
					}
				});
			}

			if (increaseBtn) {
				increaseBtn.addEventListener('click', () => {
					const current = parseInt(currentSize);
					if (current < 28) {
						const newSize = (current + 2) + 'px';
						currentSize = newSize;
						applyFontSize(newSize);
						localStorage.setItem(storageKey, newSize);
						if (slider) slider.value = current + 2;
						updateDisplay(newSize);
					}
				});
			}
		}

		// Dropdown controls
		function initDropdownControls() {
			const dropdown = block.querySelector('.font-size-dropdown');

			if (dropdown) {
				// Set initial selected value
				dropdown.value = currentSize;

				dropdown.addEventListener('change', (e) => {
					const size = e.target.value;
					const label = e.target.options[e.target.selectedIndex].text;

					currentSize = size;
					applyFontSize(size);
					localStorage.setItem(storageKey, size);

					// Update current display
					if (currentDisplay) {
						currentDisplay.textContent = `(${label})`;
					}
				});
			}
		}

		// Apply font size to content
		function applyFontSize(size) {
			// Apply to main content element with !important to override theme styles
			contentElement.style.setProperty('font-size', size, 'important');

			// Add a custom class to mark as adjusted
			contentElement.classList.add('font-size-adjusted');
			contentElement.setAttribute('data-adjusted-size', size);
		}

		// Update current size display
		function updateDisplay(size) {
			if (currentDisplay) {
				const sizeMap = {
					'14px': 'Small',
					'16px': 'Default',
					'18px': 'Medium',
					'20px': 'Large',
					'24px': 'Extra Large'
				};
				const label = sizeMap[size] || size;
				currentDisplay.textContent = `(${label})`;
			}
		}

		// Set button as active
		function setActiveButton(button) {
			button.style.backgroundColor = activeColor;
			button.style.color = '#ffffff';
			button.style.borderColor = activeColor;
			button.classList.add('active');
		}

		// Reset button to default style
		function resetButtonStyle(button) {
			button.style.backgroundColor = buttonStyle === 'filled' ? bgColor : 'transparent';
			button.style.color = textColor;
			button.style.borderColor = borderColor;
			button.classList.remove('active');
		}

		// Initialize display with stored value
		if (storedSize && currentDisplay) {
			updateDisplay(storedSize);
		}
	});
});
