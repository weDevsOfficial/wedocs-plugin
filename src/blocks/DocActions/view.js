/**
 * Documentation Actions Block - Frontend JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
	const actionBlocks = document.querySelectorAll('.wp-block-wedocs-doc-actions');

	actionBlocks.forEach(block => {
		const buttons = block.querySelectorAll('.doc-action-button');
		const hoverBgColor = block.getAttribute('data-hover-bg');
		const promptTemplate = block.getAttribute('data-prompt-template') || 'Need more information on "{title}"\n\nSource: {url}';

		buttons.forEach(button => {
			const action = button.getAttribute('data-action');

			// Add hover background color
			if (hoverBgColor) {
				button.addEventListener('mouseenter', () => {
					button.style.backgroundColor = hoverBgColor;
				});
				button.addEventListener('mouseleave', () => {
					const blockStyle = block.getAttribute('data-button-style');
					const bgColor = block.getAttribute('data-bg-color');
					button.style.backgroundColor = blockStyle === 'filled' ? bgColor : 'transparent';
				});
			}

			// Handle button actions
			button.addEventListener('click', async () => {
				switch (action) {
					case 'copy-markdown':
						await handleCopyMarkdown(button);
						break;
					case 'open-chatgpt':
						handleOpenChatGPT(promptTemplate);
						break;
					case 'open-claude':
						handleOpenClaude(promptTemplate);
						break;
				}
			});
		});
	});

	async function handleCopyMarkdown(button) {
		try {
			// Get page content
			const content = document.querySelector('.entry-content, .post-content, main');
			if (!content) {
				showNotification(button, 'Content not found', 'error');
				return;
			}

			// Convert content to markdown
			const markdown = convertToMarkdown(content);

			// Copy to clipboard with fallback
			const success = await copyToClipboard(markdown);

			if (success) {
				showNotification(button, 'Copied to clipboard!', 'success');
			} else {
				showNotification(button, 'Copy failed', 'error');
			}
		} catch (error) {
			console.error('Copy failed:', error);
			showNotification(button, 'Copy failed', 'error');
		}
	}

	function handleOpenChatGPT(promptTemplate) {
		const pageTitle = document.title;
		const pageUrl = window.location.href;
		const prompt = promptTemplate
			.replace(/{title}/g, pageTitle)
			.replace(/{url}/g, pageUrl);

		const encodedPrompt = encodeURIComponent(prompt);
		const url = `https://chatgpt.com/?prompt=${encodedPrompt}`;

		window.open(url, '_blank');
	}

	function handleOpenClaude(promptTemplate) {
		const pageTitle = document.title;
		const pageUrl = window.location.href;
		const prompt = promptTemplate
			.replace(/{title}/g, pageTitle)
			.replace(/{url}/g, pageUrl);

		const encodedPrompt = encodeURIComponent(prompt);
		const url = `https://claude.ai/new?q=${encodedPrompt}`;

		window.open(url, '_blank');
	}

	// Clipboard helper with fallback for unsupported browsers
	async function copyToClipboard(text) {
		// Try modern Clipboard API first
		if (navigator.clipboard && navigator.clipboard.writeText) {
			try {
				await navigator.clipboard.writeText(text);
				return true;
			} catch (err) {
				console.warn('Clipboard API failed, trying fallback:', err);
			}
		}

		// Fallback method for older browsers or non-HTTPS contexts
		try {
			const textArea = document.createElement('textarea');
			textArea.value = text;
			textArea.style.position = 'fixed';
			textArea.style.top = '0';
			textArea.style.left = '0';
			textArea.style.width = '2em';
			textArea.style.height = '2em';
			textArea.style.padding = '0';
			textArea.style.border = 'none';
			textArea.style.outline = 'none';
			textArea.style.boxShadow = 'none';
			textArea.style.background = 'transparent';
			textArea.style.opacity = '0';

			document.body.appendChild(textArea);
			textArea.focus();
			textArea.select();

			const successful = document.execCommand('copy');
			document.body.removeChild(textArea);

			return successful;
		} catch (err) {
			console.error('Fallback copy failed:', err);
			return false;
		}
	}

	function convertToMarkdown(element) {
		let markdown = '';
		const title = document.title;
		const url = window.location.href;

		markdown += `# ${title}\n\n`;
		markdown += `Source: ${url}\n\n`;
		markdown += `---\n\n`;

		// Extract text content with basic formatting
		const walker = document.createTreeWalker(
			element,
			NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
			null,
			false
		);

		let node;
		while (node = walker.nextNode()) {
			if (node.nodeType === Node.TEXT_NODE) {
				const text = node.textContent.trim();
				if (text) {
					markdown += text + '\n';
				}
			} else if (node.nodeType === Node.ELEMENT_NODE) {
				const tag = node.tagName.toLowerCase();
				switch (tag) {
					case 'h1':
					case 'h2':
					case 'h3':
					case 'h4':
					case 'h5':
					case 'h6':
						const level = parseInt(tag[1]);
						markdown += '\n' + '#'.repeat(level) + ' ';
						break;
					case 'p':
						markdown += '\n\n';
						break;
					case 'li':
						markdown += '\n- ';
						break;
					case 'code':
						markdown += '`';
						break;
				}
			}
		}

		return markdown.trim();
	}

	function getPageContent() {
		const content = document.querySelector('.entry-content, .post-content, main');
		return content ? content.textContent.trim() : document.body.textContent.trim();
	}

	function showNotification(button, message, type) {
		const originalText = button.querySelector('span').textContent;
		const span = button.querySelector('span');

		span.textContent = message;
		button.classList.add('copied');

		setTimeout(() => {
			span.textContent = originalText;
			button.classList.remove('copied');
		}, 2000);
	}
});
