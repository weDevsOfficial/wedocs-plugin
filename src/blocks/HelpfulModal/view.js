/**
 * JavaScript for the Need More Help - Contact Modal block front-end behavior
 */

document.addEventListener('DOMContentLoaded', function() {
	// Find all Need More Help blocks
	const helpBlocks = document.querySelectorAll('.wp-block-wedocs-block-need-more-help-contact-modal');

	helpBlocks.forEach(function(block) {
		initializeHelpBlock(block);
	});
});

function initializeHelpBlock(block) {
	const triggerButton = block.querySelector('[data-track]');
	const modalDataScript = block.querySelector('.need-more-help-modal-data');

	if (!triggerButton || !modalDataScript) {
		return;
	}

	// Parse modal data
	let modalData;
	try {
		modalData = JSON.parse(modalDataScript.textContent);
	} catch (e) {
		console.error('Failed to parse modal data:', e);
		return;
	}

	// Create modal element (but don't show it yet)
	const modal = createModal(modalData);
	document.body.appendChild(modal);

	// Add click event to trigger button
	triggerButton.addEventListener('click', function(e) {
		e.preventDefault();
		openModal();

		// Track analytics event if configured
		const trackEvent = triggerButton.getAttribute('data-track');
		if (trackEvent && typeof gtag !== 'undefined') {
			gtag('event', trackEvent, {
				event_category: 'engagement',
				event_label: 'help_modal_opened'
			});
		}
	});

	function openModal() {
		modal.classList.add('show');
		document.body.style.overflow = 'hidden';

		// Focus first input for accessibility
		setTimeout(() => {
			const firstInput = modal.querySelector('input[name="name"]');
			if (firstInput) {
				firstInput.focus();
			}
		}, 300);
	}

	function closeModal() {
		modal.classList.remove('show');
		document.body.style.overflow = '';

		// Reset form and messages
		const form = modal.querySelector('.modal-form');
		const messageContainer = modal.querySelector('.form-message');
		if (form) {
			form.reset();
		}
		if (messageContainer) {
			messageContainer.classList.remove('show', 'success', 'error');
		}
	}

	// Close modal events
	const closeButton = modal.querySelector('.modal-close');
	const overlay = modal.querySelector('.modal-overlay');

	if (closeButton) {
		closeButton.addEventListener('click', closeModal);
	}
	if (overlay) {
		overlay.addEventListener('click', closeModal);
	}

	// Close on escape key
	document.addEventListener('keydown', function(e) {
		if (e.key === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

	// Handle form submission
	const form = modal.querySelector('.modal-form');
	if (form) {
		form.addEventListener('submit', handleFormSubmit);
	}

	function handleFormSubmit(e) {
		e.preventDefault();

		const formData = new FormData(form);
		const submitButton = form.querySelector('button[type="submit"]');
		let messageContainer = modal.querySelector('.form-message');

		if (!messageContainer) {
			messageContainer = createMessageContainer();
		}

		// Validate required fields
		const name = formData.get('name');
		const email = formData.get('email');
		const message = formData.get('message');

		if (!name || !email || !message) {
			showMessage(messageContainer, 'Please fill in all required fields.', 'error');
			return;
		}

		if (!isValidEmail(email)) {
			showMessage(messageContainer, 'Please enter a valid email address.', 'error');
			return;
		}

		// Disable submit button
		const originalText = submitButton.textContent;
		submitButton.disabled = true;
		submitButton.textContent = 'Sending...';

		// Check if AJAX is available
		if (typeof needMoreHelpAjax === 'undefined') {
			showMessage(messageContainer, 'Contact form is not properly configured. Please try again later.', 'error');
			submitButton.disabled = false;
			submitButton.textContent = originalText;
			return;
		}

		// Prepare AJAX data
		const ajaxData = {
			action: 'need_more_help_submit',
			name: name,
			email: email,
			subject: formData.get('subject') || '',
			message: message,
			page_url: window.location.href,
			nonce: needMoreHelpAjax.nonce
		};

		// Send AJAX request
		fetch(needMoreHelpAjax.ajaxUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams(ajaxData)
		})
		.then(response => response.json())
		.then(data => {
			if (data.success) {
				showMessage(messageContainer, data.data, 'success');
				form.reset();

				// Auto close modal after success (optional)
				setTimeout(() => {
					closeModal();
				}, 3000);
			} else {
				showMessage(messageContainer, data.data || 'An error occurred. Please try again.', 'error');
			}
		})
		.catch(error => {
			console.error('Form submission error:', error);
			showMessage(messageContainer, 'An error occurred. Please try again.', 'error');
		})
		.finally(() => {
			// Re-enable submit button
			submitButton.disabled = false;
			submitButton.textContent = originalText;
		});
	}

	function createMessageContainer() {
		const container = document.createElement('div');
		container.className = 'form-message';
		form.appendChild(container);
		return container;
	}

	function showMessage(container, message, type) {
		container.textContent = message;
		container.className = `form-message ${type} show`;

		// Auto-hide success messages after 5 seconds
		if (type === 'success') {
			setTimeout(() => {
				container.classList.remove('show');
			}, 5000);
		}
	}

	function isValidEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}
}

function createModal(modalData) {
	const modal = document.createElement('div');
	modal.className = 'need-more-help-modal';

	// Apply custom modal styles if provided
	if (modalData.modalStyles) {
		modal.style.cssText += modalData.modalStyles;
	}

	modal.innerHTML = `
		<div class="modal-overlay"></div>
		<div class="modal-content" style="${modalData.modalContentStyles || ''}">
			<div class="modal-header">
				<h2 style="${modalData.headingStyles || ''}">${escapeHtml(modalData.title)}</h2>
				<button type="button" class="modal-close" aria-label="Close">×</button>
			</div>
			<form class="modal-form">
				<div class="form-field">
					<label style="${modalData.labelStyles || ''}">${escapeHtml(modalData.nameLabel)}</label>
					<input type="text" name="name" required>
				</div>
				<div class="form-field">
					<label style="${modalData.labelStyles || ''}">${escapeHtml(modalData.emailLabel)}</label>
					<input type="email" name="email" required placeholder="${escapeHtml(modalData.emailPlaceholder || '')}">
				</div>
				${modalData.showSubject ? `
					<div class="form-field">
						<label style="${modalData.labelStyles || ''}">${escapeHtml(modalData.subjectLabel)}</label>
						<input type="text" name="subject">
					</div>
				` : ''}
				<div class="form-field">
					<label style="${modalData.labelStyles || ''}">${escapeHtml(modalData.messageLabel)}</label>
					<textarea name="message" required rows="4"></textarea>
				</div>
				<div class="form-submit" style="justify-content: ${modalData.buttonAlignment || 'flex-start'}">
					<button type="submit" style="${modalData.buttonStyles || ''}">
						${escapeHtml(modalData.submitText)}
					</button>
				</div>
			</form>
		</div>
	`;

	return modal;
}

function escapeHtml(unsafe) {
	if (!unsafe) return '';
	return unsafe
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}
