/**
 * Frontend JavaScript for the weDocs Sidebar block
 */

document.addEventListener('DOMContentLoaded', function() {
    // Handle section expand/collapse functionality
    const sectionHeaders = document.querySelectorAll('.wedocs-section-header');
    
    sectionHeaders.forEach(header => {
        header.addEventListener('click', function(e) {
            e.preventDefault();
            
            const section = this.closest('.wedocs-section');
            const children = section.querySelector('.wedocs-section-children');
            const toggleButton = this.querySelector('.wedocs-expand-toggle');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            if (children) {
                if (isExpanded) {
                    // Collapse
                    children.style.display = 'none';
                    this.setAttribute('aria-expanded', 'false');
                    if (toggleButton) {
                        // Change to down arrow
                        toggleButton.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 16px; height: 16px;">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        `;
                    }
                } else {
                    // Expand
                    children.style.display = 'block';
                    this.setAttribute('aria-expanded', 'true');
                    if (toggleButton) {
                        // Change to up arrow
                        toggleButton.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 16px; height: 16px;">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                            </svg>
                        `;
                    }
                }
            }
        });
        
        // Handle keyboard navigation
        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Handle hover effects for sections
    const sections = document.querySelectorAll('.wedocs-section');
    
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            const hoverBg = getComputedStyle(this).getPropertyValue('--section-bg-hover');
            if (hoverBg && hoverBg.trim() !== '') {
                this.style.backgroundColor = hoverBg;
            }
        });
        
        section.addEventListener('mouseleave', function() {
            const normalBg = getComputedStyle(this).getPropertyValue('--section-bg');
            this.style.backgroundColor = normalBg || '';
        });
    });
    
    // Handle hover effects for section titles
    const sectionTitles = document.querySelectorAll('.wedocs-section-title');
    
    sectionTitles.forEach(title => {
        const section = title.closest('.wedocs-section');
        if (section) {
            section.addEventListener('mouseenter', function() {
                const titleElement = this.querySelector('.wedocs-section-title');
                const hoverBg = getComputedStyle(this).getPropertyValue('--title-bg-hover');
                if (titleElement && hoverBg && hoverBg.trim() !== '') {
                    titleElement.style.backgroundColor = hoverBg;
                }
            });
            
            section.addEventListener('mouseleave', function() {
                const titleElement = this.querySelector('.wedocs-section-title');
                const normalBg = getComputedStyle(this).getPropertyValue('--title-bg');
                if (titleElement) {
                    titleElement.style.backgroundColor = normalBg || 'transparent';
                }
            });
        }
    });
    
    // Handle hover effects for article links
    const articleLinks = document.querySelectorAll('.wedocs-article a');
    
    articleLinks.forEach(link => {
        const article = link.closest('.wedocs-article');
        if (article) {
            const textColor = getComputedStyle(article).getPropertyValue('--doc-list-text-color');
            const hoverColor = getComputedStyle(article).getPropertyValue('--doc-list-text-color-hover');
            
            if (textColor && hoverColor) {
                link.addEventListener('mouseenter', function() {
                    this.style.color = hoverColor;
                });
                
                link.addEventListener('mouseleave', function() {
                    this.style.color = textColor;
                });
            }
        }
    });
});
