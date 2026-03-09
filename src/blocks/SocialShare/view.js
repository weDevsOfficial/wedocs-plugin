/**
 * Frontend JavaScript for Social Share Block
 * Handles hover effects and dynamic color changes
 */

document.addEventListener('DOMContentLoaded', function() {
    const socialShareBlocks = document.querySelectorAll('.wedocs-social-share-block');

    socialShareBlocks.forEach(block => {
        const buttons = block.querySelectorAll('.wedocs-social-share-btn');
        const buttonBg = block.dataset.buttonBg;
        const buttonBgHover = block.dataset.buttonBgHover;
        const buttonIcon = block.dataset.buttonIcon;
        const buttonIconHover = block.dataset.buttonIconHover;
        const useIndividual = block.dataset.useIndividual === 'true';

        buttons.forEach(button => {
            const originalColor = button.dataset.color;

            // Add hover listeners only if not using individual colors
            if (!useIndividual) {
                button.addEventListener('mouseenter', function() {
                    this.style.backgroundColor = buttonBgHover;
                    if (buttonIconHover) {
                        this.style.color = buttonIconHover;
                    }
                });

                button.addEventListener('mouseleave', function() {
                    this.style.backgroundColor = originalColor || buttonBg;
                    if (buttonIcon) {
                        this.style.color = buttonIcon;
                    }
                });
            }
        });
    });

    // Track social share clicks (optional analytics)
    document.querySelectorAll('.wedocs-social-share-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const platform = this.dataset.platform;

            // You can add analytics tracking here
            if (typeof gtag !== 'undefined') {
                gtag('event', 'share', {
                    method: platform,
                    content_type: 'documentation'
                });
            }

            // Allow the link to work normally
        });
    });
});
