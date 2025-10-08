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
	const modalHTML = block.querySelector('.need-more-help-modal-data');

	if (!triggerButton || !modalHTML) {
		return;
	}

	// Create modal element
	const modal = createModal(modalHTML.textContent);
	document.body.appendChild(modal);

	// Add click event to trigger button
	triggerButton.addEventListener('click', function(e) {
		e.preventDefault();
		modal.classList.add('show');
		document.body.style.overflow = 'hidden';

		// Track analytics event if configured
		const trackEvent = triggerButton.getAttribute('data-track');
		if (trackEvent && typeof gtag !== 'undefined') {
			gtag('event', trackEvent, {
				event_category: 'engagement',
				event_label: 'help_modal_opened'
			});
		}
	});

	// Close modal events
	const closeButton = modal.querySelector('.modal-close');
	const overlay = modal.querySelector('.modal-overlay');

	closeButton.addEventListener('click', closeModal);
	overlay.addEventListener('click', closeModal);

	// Close on escape key
	document.addEventListener('keydown', function(e) {
		if (e.key === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

	function closeModal() {
		modal.classList.remove('show');
		document.body.style.overflow = '';
	}

	// Handle form submission
	const form = modal.querySelector('.modal-form');
	if (form) {
		form.addEventListener('submit', handleFormSubmit);
	}

	function handleFormSubmit(e) {
		e.preventDefault();

		const formData = new FormData(form);
		const submitButton = form.querySelector('button[type="submit"]');
		const messageContainer = modal.querySelector('.form-message') || createMessageContainer();

		// Disable submit button
		const originalText = submitButton.textContent;
		submitButton.disabled = true;
		submitButton.textContent = 'Sending...';

		// Prepare AJAX data
		const ajaxData = {
			action: 'need_more_help_submit',
			name: formData.get('name'),
			email: formData.get('email'),
			subject: formData.get('subject') || '',
			message: formData.get('message'),
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
			} else {
				showMessage(messageContainer, data.data, 'error');
			}
		})
		.catch(error => {
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
}

function createModal(modalDataJSON) {
	const modalData = JSON.parse(modalDataJSON);

	const modal = document.createElement('div');
	modal.className = 'need-more-help-modal';
	modal.style.cssText = modalData.modalStyles || '';

	modal.innerHTML = `
		<div class="modal-overlay"></div>
		<div class="modal-content" style="${modalData.modalContentStyles || ''}">
			<div class="modal-header">
				<h2 style="${modalData.headingStyles || ''}">${modalData.title}</h2>
				<button type="button" class="modal-close" aria-label="Close">×</button>
			</div>
			<form class="modal-form">
				<div class="form-field">
					<label style="${modalData.labelStyles || ''}">${modalData.nameLabel}</label>
					<input type="text" name="name" required>
				</div>
				<div class="form-field">
					<label style="${modalData.labelStyles || ''}">${modalData.emailLabel}</label>
					<input type="email" name="email" required placeholder="${modalData.emailPlaceholder || ''}">
				</div>
				${modalData.showSubject ? `
					<div class="form-field">
						<label style="${modalData.labelStyles || ''}">${modalData.subjectLabel}</label>
						<input type="text" name="subject">
					</div>
				` : ''}
				<div class="form-field">
					<label style="${modalData.labelStyles || ''}">${modalData.messageLabel}</label>
					<textarea name="message" required rows="4"></textarea>
				</div>
				<div class="form-submit" style="justify-content: ${modalData.buttonAlignment || 'flex-start'}">
					<button type="submit" style="${modalData.buttonStyles || ''}" data-submit-text="${modalData.submitText}">
						${modalData.submitText}
					</button>
				</div>
			</form>
		</div>
	`;

	return modal;
}
