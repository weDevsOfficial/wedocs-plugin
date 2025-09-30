/******/ (() => { // webpackBootstrap
/*!********************************************!*\
  !*** ./src/blocks/TableOfContents/view.js ***!
  \********************************************/
/**
* Frontend JavaScript for Dynamic Table of Contents block
*/

document.addEventListener('DOMContentLoaded', function () {
  const tocBlocks = document.querySelectorAll('.wp-block-wedocs-table-of-contents');
  tocBlocks.forEach(function (tocBlock) {
    const tocContent = tocBlock.querySelector('.toc-content');
    const tocList = tocBlock.querySelector('.toc-list');
    const tocTitle = tocBlock.querySelector('.toc-title');

    // Get block attributes from data attributes or classes
    const smoothScroll = tocBlock.classList.contains('smooth-scroll') || tocBlock.dataset.smoothScroll === 'true';
    const collapsibleOnMobile = tocBlock.classList.contains('collapsible-mobile') || window.innerWidth <= 768;

    // Enable smooth scrolling if requested
    if (smoothScroll) {
      document.documentElement.classList.add('smooth-scroll');
    }

    // Generate TOC from page headings
    generateTOC(tocBlock);

    // Setup mobile collapsible behavior
    if (collapsibleOnMobile && window.innerWidth <= 768) {
      setupMobileCollapsible(tocBlock);
    }

    // Setup scroll spy for active highlighting
    setupScrollSpy(tocBlock);

    // Setup smooth scrolling for TOC links
    setupSmoothScrolling(tocBlock, smoothScroll);
  });

  /**
   * Generate TOC from page headings
   */
  function generateTOC(tocBlock) {
    const supportedHeadings = getSupportedHeadings(tocBlock);
    const showHierarchy = tocBlock.dataset.showHierarchy !== 'false';
    const showNumbering = tocBlock.dataset.showNumbering === 'true';

    // Find all headings in the page content
    const contentArea = document.querySelector('.entry-content, .post-content, main, .content') || document.body;
    const headingSelector = supportedHeadings.map(h => h.toLowerCase()).join(', ');
    const headings = contentArea.querySelectorAll(headingSelector);
    if (headings.length === 0) {
      const tocContent = tocBlock.querySelector('.toc-content');
      tocContent.innerHTML = '<div class="toc-empty-state"><p>No headings found in the content.</p></div>';
      return;
    }

    // Generate TOC HTML
    const tocHTML = generateTOCHTML(headings, supportedHeadings, showHierarchy, showNumbering);
    const tocContent = tocBlock.querySelector('.toc-content');
    tocContent.innerHTML = tocHTML;

    // Add IDs to headings if they don't have them
    headings.forEach(function (heading, index) {
      if (!heading.id) {
        heading.id = 'toc-heading-' + index;
      }
    });
  }

  /**
   * Get supported heading levels from block attributes
   */
  function getSupportedHeadings(tocBlock) {
    const supportedAttr = tocBlock.dataset.supportedHeadings;
    if (supportedAttr) {
      try {
        return JSON.parse(supportedAttr);
      } catch (e) {
        console.warn('Invalid supportedHeadings data:', supportedAttr);
      }
    }
    return ['H2', 'H3']; // Default
  }

  /**
   * Generate TOC HTML from headings
   */
  function generateTOCHTML(headings, supportedHeadings, showHierarchy, showNumbering) {
    let html = '<ul class="toc-list';
    html += showHierarchy ? ' hierarchical' : ' flat';
    html += showNumbering ? ' numbered' : ' bulleted';
    html += '">';
    const counters = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    };
    let globalCounter = 1;
    headings.forEach(function (heading) {
      const level = parseInt(heading.tagName.charAt(1));
      const text = heading.textContent.trim();
      const id = heading.id || 'toc-heading-' + Array.from(headings).indexOf(heading);

      // Update counters
      if (showNumbering) {
        if (showHierarchy) {
          counters[level]++;
          // Reset lower level counters
          for (let i = level + 1; i <= 5; i++) {
            counters[i] = 0;
          }
        } else {
          counters[level] = globalCounter++;
        }
      }

      // Calculate indent for hierarchy
      const indent = showHierarchy ? (level - 2) * 20 : 0;

      // Generate number text
      let numberText = '';
      if (showNumbering) {
        if (showHierarchy) {
          const numbers = [];
          for (let i = 2; i <= level; i++) {
            if (counters[i] > 0) {
              numbers.push(counters[i]);
            }
          }
          numberText = numbers.join('.') + '. ';
        } else {
          numberText = counters[level] + '. ';
        }
      }
      html += '<li style="margin-left: ' + indent + 'px">';
      html += '<a href="#' + id + '" class="toc-link">';
      if (showNumbering) {
        html += '<span class="toc-number">' + numberText + '</span>';
      }
      html += text;
      html += '</a></li>';
    });
    html += '</ul>';
    return html;
  }

  /**
   * Setup mobile collapsible behavior
   */
  function setupMobileCollapsible(tocBlock) {
    tocBlock.classList.add('collapsible-mobile');
    const title = tocBlock.querySelector('.toc-title');
    const content = tocBlock.querySelector('.toc-content');
    if (title && content) {
      title.addEventListener('click', function () {
        title.classList.toggle('collapsed');
        content.classList.toggle('collapsed');
      });
    }
  }

  /**
   * Setup scroll spy for active highlighting
   */
  function setupScrollSpy(tocBlock) {
    const links = tocBlock.querySelectorAll('.toc-link');
    const headings = Array.from(links).map(function (link) {
      const id = link.getAttribute('href').substring(1);
      return document.getElementById(id);
    }).filter(Boolean);
    if (headings.length === 0) return;
    function updateActiveLink() {
      const scrollPos = window.scrollY + 100; // Offset for better UX
      let activeHeading = null;

      // Find the active heading
      headings.forEach(function (heading) {
        if (heading.offsetTop <= scrollPos) {
          activeHeading = heading;
        }
      });

      // Update active states
      links.forEach(function (link) {
        link.classList.remove('active');
        if (activeHeading && link.getAttribute('href') === '#' + activeHeading.id) {
          link.classList.add('active');
        }
      });
    }

    // Throttle scroll events
    let ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          updateActiveLink();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Initial update
    updateActiveLink();
  }

  /**
   * Setup smooth scrolling for TOC links
   */
  function setupSmoothScrolling(tocBlock, smoothScroll) {
    const links = tocBlock.querySelectorAll('.toc-link');
    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80; // Account for sticky headers

          if (smoothScroll && 'scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          } else {
            // Fallback smooth scroll
            animateScrollTo(offsetTop, 600);
          }
        }
      });
    });
  }

  /**
   * Fallback smooth scroll animation
   */
  function animateScrollTo(to, duration) {
    const start = window.scrollY;
    const change = to - start;
    const startTime = performance.now();
    function animateScroll(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeInOutQuad(progress);
      window.scrollTo(0, start + change * ease);
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    }
    requestAnimationFrame(animateScroll);
  }

  /**
   * Easing function for smooth animation
   */
  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }
});
/******/ })()
;
//# sourceMappingURL=view.js.map