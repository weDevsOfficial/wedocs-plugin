<?php
/**
 * Quick Search Block Render
 *
 * @package weDocs
 */

// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Render callback for the Quick Search block
 *
 * @param array $attributes Block attributes
 * @return string
 */
function render_wedocs_quick_search( $attributes ) {
    // Get block attributes
    $search_box_placeholder = $attributes['searchBoxPlaceholder'] ?? __( 'Quick search...', 'wedocs' );
    $modal_placeholder = $attributes['modalPlaceholder'] ?? __( 'Search documentation', 'wedocs' );
    $modal_docs_source = $attributes['modalDocsSource'] ?? 'helpful';
    $section_ids = $attributes['sectionIds'] ?? '';
    $article_ids = $attributes['articleIds'] ?? '';
    $helpful_docs_count = $attributes['helpfulDocsCount'] ?? 10;

    // Get styling attributes
    $search_box_styles = $attributes['searchBoxStyles'] ?? [];
    $modal_styles = $attributes['modalStyles'] ?? [];

    // Build CSS variables for styling
    $search_box_css_vars = [];
    if ( ! empty( $search_box_styles ) ) {
        $search_box_css_vars[] = '--wedocs-placeholder-color: ' . ( $search_box_styles['placeholderColor'] ?? '#9CA3AF' );
        $search_box_css_vars[] = '--wedocs-icon-color: ' . ( $search_box_styles['iconColor'] ?? '#6B7280' );
        $search_box_css_vars[] = '--wedocs-command-key-color: ' . ( $search_box_styles['commandKeyColor'] ?? '#6B7280' );
        $search_box_css_vars[] = '--wedocs-background-color: ' . ( $search_box_styles['backgroundColor'] ?? '#FFFFFF' );
        $search_box_css_vars[] = '--wedocs-border-color: ' . ( $search_box_styles['borderColor'] ?? '#D1D5DB' );
        $search_box_css_vars[] = '--wedocs-border-width: ' . ( $search_box_styles['borderWidth'] ?? '1px' );
        $search_box_css_vars[] = '--wedocs-border-radius: ' . ( $search_box_styles['borderRadius'] ?? '8px' );
        $search_box_css_vars[] = '--wedocs-padding-top: ' . ( $search_box_styles['padding']['top'] ?? '12px' );
        $search_box_css_vars[] = '--wedocs-padding-right: ' . ( $search_box_styles['padding']['right'] ?? '16px' );
        $search_box_css_vars[] = '--wedocs-padding-bottom: ' . ( $search_box_styles['padding']['bottom'] ?? '12px' );
        $search_box_css_vars[] = '--wedocs-padding-left: ' . ( $search_box_styles['padding']['left'] ?? '16px' );
        $search_box_css_vars[] = '--wedocs-margin-top: ' . ( $search_box_styles['margin']['top'] ?? '0px' );
        $search_box_css_vars[] = '--wedocs-margin-right: ' . ( $search_box_styles['margin']['right'] ?? '0px' );
        $search_box_css_vars[] = '--wedocs-margin-bottom: ' . ( $search_box_styles['margin']['bottom'] ?? '0px' );
        $search_box_css_vars[] = '--wedocs-margin-left: ' . ( $search_box_styles['margin']['left'] ?? '0px' );
        $search_box_css_vars[] = '--wedocs-font-size: ' . ( $search_box_styles['fontSize'] ?? '16px' );
        $search_box_css_vars[] = '--wedocs-font-weight: ' . ( $search_box_styles['fontWeight'] ?? '400' );
        $search_box_css_vars[] = '--wedocs-letter-spacing: ' . ( $search_box_styles['letterSpacing'] ?? '0px' );
        $search_box_css_vars[] = '--wedocs-line-height: ' . ( $search_box_styles['lineHeight'] ?? '1.5' );
    }

    // Build modal CSS variables
    $modal_css_vars = [];
    if ( ! empty( $modal_styles ) ) {
        $modal_css_vars[] = '--wedocs-modal-placeholder-color: ' . ( $modal_styles['placeholderColor'] ?? '#9CA3AF' );
        $modal_css_vars[] = '--wedocs-modal-search-icon-color: ' . ( $modal_styles['searchIconColor'] ?? '#6B7280' );
        $modal_css_vars[] = '--wedocs-modal-background-color: ' . ( $modal_styles['backgroundColor'] ?? '#FFFFFF' );
        $modal_css_vars[] = '--wedocs-modal-field-text-color: ' . ( $modal_styles['fieldTextColor'] ?? '#111827' );
        $modal_css_vars[] = '--wedocs-modal-list-item-icon-color: ' . ( $modal_styles['listItemIconColor'] ?? '#3B82F6' );
        $modal_css_vars[] = '--wedocs-modal-list-item-text-color: ' . ( $modal_styles['listItemTextColor'] ?? '#111827' );
        $modal_css_vars[] = '--wedocs-modal-doc-label-color: ' . ( $modal_styles['docLabelColor'] ?? '#3B82F6' );
        $modal_css_vars[] = '--wedocs-modal-section-label-color: ' . ( $modal_styles['sectionLabelColor'] ?? '#3B82F6' );
        $modal_css_vars[] = '--wedocs-modal-list-item-padding-top: ' . ( $modal_styles['listItemPadding']['top'] ?? '12px' );
        $modal_css_vars[] = '--wedocs-modal-list-item-padding-right: ' . ( $modal_styles['listItemPadding']['right'] ?? '16px' );
        $modal_css_vars[] = '--wedocs-modal-list-item-padding-bottom: ' . ( $modal_styles['listItemPadding']['bottom'] ?? '12px' );
        $modal_css_vars[] = '--wedocs-modal-list-item-padding-left: ' . ( $modal_styles['listItemPadding']['left'] ?? '16px' );
        $modal_css_vars[] = '--wedocs-modal-list-item-margin-top: ' . ( $modal_styles['listItemMargin']['top'] ?? '0px' );
        $modal_css_vars[] = '--wedocs-modal-list-item-margin-right: ' . ( $modal_styles['listItemMargin']['right'] ?? '0px' );
        $modal_css_vars[] = '--wedocs-modal-list-item-margin-bottom: ' . ( $modal_styles['listItemMargin']['bottom'] ?? '0px' );
        $modal_css_vars[] = '--wedocs-modal-list-item-margin-left: ' . ( $modal_styles['listItemMargin']['left'] ?? '0px' );
        $modal_css_vars[] = '--wedocs-modal-list-item-border-color: ' . ( $modal_styles['listItemBorderColor'] ?? '#E5E7EB' );
        $modal_css_vars[] = '--wedocs-modal-list-item-border-width: ' . ( $modal_styles['listItemBorderWidth'] ?? '1px' );
        $modal_css_vars[] = '--wedocs-modal-list-item-border-radius: ' . ( $modal_styles['listItemBorderRadius'] ?? '4px' );
    }

    // Combine all CSS variables
    $all_css_vars = array_merge( $search_box_css_vars, $modal_css_vars );
    $css_vars_string = implode( '; ', $all_css_vars );

    // Build CSS classes
    $css_classes_string = 'wedocs-quick-search-block wedocs-document';

    // Build data attributes
    $data_attributes = [
        'data-placeholder="' . esc_attr( $search_box_placeholder ) . '"',
        'data-modal-placeholder="' . esc_attr( $modal_placeholder ) . '"',
        'data-modal-docs-source="' . esc_attr( $modal_docs_source ) . '"',
        'data-section-ids="' . esc_attr( $section_ids ) . '"',
        'data-article-ids="' . esc_attr( $article_ids ) . '"',
        'data-helpful-docs-count="' . esc_attr( $helpful_docs_count ) . '"',
    ];
    $data_attributes_string = implode( ' ', $data_attributes );

/**
 * Load QuickSearch template
 *
 * @param string $template_name Template name without .php extension
 * @param array $args Template arguments
 * @return string Rendered template HTML
 */

 if( ! function_exists( 'wedocs_block_quick_search_get_template' ) ) {
    function wedocs_block_quick_search_get_template( $template_name, $args = [] ) {
        $template_path = plugin_dir_path( __FILE__ ) . 'templates/' . $template_name . '.php';
        
        if ( ! file_exists( $template_path ) ) {
            return '';
        }
        
        // Extract variables for template
        extract( $args );
        
        ob_start();
        include $template_path;
        return ob_get_clean();
    }
}

    // Enqueue frontend assets to get access to weDocs_Vars
    \WeDevs\WeDocs\Frontend::enqueue_assets();

    ob_start();
    ?>
    <div class="<?php echo esc_attr( $css_classes_string ); ?>" style="<?php echo esc_attr( $css_vars_string ); ?>">
        <div class="wedocs-quick-search-trigger" <?php echo $data_attributes_string; ?>>
            <div class="wedocs-quick-search-container" style="
                display: flex;
                background-color: <?php echo esc_attr( $search_box_styles['backgroundColor'] ?? '#FFFFFF' ); ?>;
                border-color: <?php echo esc_attr( $search_box_styles['borderColor'] ?? '#D1D5DB' ); ?>;
                border-width: <?php echo esc_attr( $search_box_styles['borderWidth'] ?? '1px' ); ?>;
                border-style: solid;
                border-radius: <?php echo esc_attr( $search_box_styles['borderRadius'] ?? '8px' ); ?>;
                margin-top: <?php echo esc_attr( $search_box_styles['margin']['top'] ?? '0px' ); ?>;
                margin-right: <?php echo esc_attr( $search_box_styles['margin']['right'] ?? '0px' ); ?>;
                margin-bottom: <?php echo esc_attr( $search_box_styles['margin']['bottom'] ?? '0px' ); ?>;
                margin-left: <?php echo esc_attr( $search_box_styles['margin']['left'] ?? '0px' ); ?>;
            ">
                <input 
                    type="text" 
                    placeholder="<?php echo esc_attr( $search_box_placeholder ); ?>"
                    class="wedocs-quick-search-input"
                    style="
                        flex: 1;
                        min-width: 0;
                        color: <?php echo esc_attr( $search_box_styles['placeholderColor'] ?? '#9CA3AF' ); ?>;
                        background-color: transparent;
                        border: none;
                        outline: none;
                        box-shadow: none;
                        font-size: <?php echo esc_attr( $search_box_styles['fontSize'] ?? '16px' ); ?>;
                        font-weight: <?php echo esc_attr( $search_box_styles['fontWeight'] ?? '400' ); ?>;
                        letter-spacing: <?php echo esc_attr( $search_box_styles['letterSpacing'] ?? '0px' ); ?>;
                        line-height: <?php echo esc_attr( $search_box_styles['lineHeight'] ?? '1.5' ); ?>;
                        padding-top: <?php echo esc_attr( $search_box_styles['padding']['top'] ?? '12px' ); ?>;
                        padding-right: <?php echo esc_attr( $search_box_styles['padding']['right'] ?? '16px' ); ?>;
                        padding-bottom: <?php echo esc_attr( $search_box_styles['padding']['bottom'] ?? '12px' ); ?>;
                        padding-left: <?php echo esc_attr( $search_box_styles['padding']['left'] ?? '16px' ); ?>;
                    "
                />
                <div class="wedocs-quick-search-command" style="
                    display: flex;
                    padding: 6px 6px 6px 0;
                ">
                    <kbd style="
                        display: inline-flex;
                        align-items: center;
                        border-radius: 4px;
                        border: 1px solid #ddd;
                        padding: 2px 4px;
                        font-family: sans-serif;
                        font-size: 12px;
                        color: <?php echo esc_attr( $search_box_styles['iconColor'] ?? '#6B7280' ); ?>;
                    ">
                        ⌘K
                    </kbd>
                </div>
            </div>
        </div>
    </div>
    
    <style>
        .wedocs-quick-search-input::placeholder {
            color: <?php echo esc_attr( $search_box_styles['placeholderColor'] ?? '#9CA3AF' ); ?> !important;
        }
        .wedocs-quick-search-input::-webkit-input-placeholder {
            color: <?php echo esc_attr( $search_box_styles['placeholderColor'] ?? '#9CA3AF' ); ?> !important;
        }
        .wedocs-quick-search-input::-moz-placeholder {
            color: <?php echo esc_attr( $search_box_styles['placeholderColor'] ?? '#9CA3AF' ); ?> !important;
        }
        .wedocs-quick-search-input:-ms-input-placeholder {
            color: <?php echo esc_attr( $search_box_styles['placeholderColor'] ?? '#9CA3AF' ); ?> !important;
        }
        
        /* Modal Styles */
        .wedocs-quick-search-modal {
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 9999;
            justify-content: center;
            align-items: center;
        }
        
        .wedocs-quick-search-modal.active {
            display: flex;
        }
    </style>
    
    <!-- Modal will be dynamically added to body -->
    
    <script>
    (function() {
        const trigger = document.querySelector('.wedocs-quick-search-trigger');
        
        if (!trigger) return;
        
        // Create modal dynamically
        const modal = document.createElement('div');
        modal.className = 'wedocs-quick-search-modal wedocs-document';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', '<?php echo esc_attr( $modal_placeholder ); ?>');
           modal.innerHTML = `
               <div class="rounded-lg w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] max-w-4xl max-h-[85vh] sm:max-h-[80vh] overflow-y-auto shadow-xl" style="
                background-color: <?php echo esc_attr( $modal_styles['backgroundColor'] ?? '#FFFFFF' ); ?>;
                border: <?php echo esc_attr( $modal_styles['listItemBorderWidth'] ?? '1px' ); ?> solid <?php echo esc_attr( $modal_styles['listItemBorderColor'] ?? '#E5E7EB' ); ?>;
                border-radius: <?php echo esc_attr( $modal_styles['listItemBorderRadius'] ?? '8px' ); ?>;
            ">
                <!-- Search Input -->
                <div class="p-6 border-b border-gray-200">
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: <?php echo esc_attr( $modal_styles['searchIconColor'] ?? '#6B7280' ); ?>;">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                           <input 
                               type="text" 
                               placeholder="<?php echo esc_attr( $modal_placeholder ); ?>"
                               class="block w-full pl-10 pr-16 sm:pr-20 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base sm:text-lg"
                            style="
                                color: <?php echo esc_attr( $modal_styles['fieldTextColor'] ?? '#111827' ); ?>;
                                background-color: transparent;
                            "
                            aria-label="<?php echo esc_attr( $modal_placeholder ); ?>"
                            aria-describedby="search-results"
                            autocomplete="off"
                            spellcheck="false"
                        />
                        <style>
                            .wedocs-quick-search-modal input::placeholder {
                                color: <?php echo esc_attr( $modal_styles['placeholderColor'] ?? '#9CA3AF' ); ?> !important;
                            }
                            .wedocs-quick-search-modal input::-webkit-input-placeholder {
                                color: <?php echo esc_attr( $modal_styles['placeholderColor'] ?? '#9CA3AF' ); ?> !important;
                            }
                            .wedocs-quick-search-modal input::-moz-placeholder {
                                color: <?php echo esc_attr( $modal_styles['placeholderColor'] ?? '#9CA3AF' ); ?> !important;
                            }
                            .wedocs-quick-search-modal input:-ms-input-placeholder {
                                color: <?php echo esc_attr( $modal_styles['placeholderColor'] ?? '#9CA3AF' ); ?> !important;
                            }
                        </style>
                        <div class="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center space-x-1 sm:space-x-2">
                            <button class="text-gray-400 hover:text-gray-600 p-1" type="button">
                                <svg class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                            <span class="hidden sm:inline text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">ESC</span>
                        </div>
                    </div>
                </div>

                <!-- Modal Data Source -->
                <div class="p-4">
                    <span class="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">Badge</span>
                    <span class="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">Badge</span>
                    <span class="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">Badge</span>
                    <span class="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">Badge</span>
                    <span class="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">Badge</span>
                </div>
                
                <!-- Search Results -->
                <div class="p-4">
                    <div id="search-results" class="space-y-2" role="listbox" aria-label="Search results">
                        <?php echo wedocs_block_quick_search_get_template("empty-state", ["message" => __("Type at least 2 characters to search...", "wedocs")]); ?>
                    </div>
                </div>
            </div>
        `;
        
        // Append modal to body
        document.body.appendChild(modal);
        
        const openModal = () => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Add opening animation
            const modalContent = modal.querySelector('.rounded-lg');
            if (modalContent) {
                modalContent.style.transform = 'scale(0.95)';
                modalContent.style.opacity = '0';
                setTimeout(() => {
                    modalContent.style.transition = 'all 0.2s ease-out';
                    modalContent.style.transform = 'scale(1)';
                    modalContent.style.opacity = '1';
                }, 10);
            }
            
            // Focus management for accessibility
            const previousActiveElement = document.activeElement;
            modal.setAttribute('data-previous-active-element', previousActiveElement ? previousActiveElement.id || 'body' : 'body');
            
            // Announce modal opening to screen readers
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'sr-only';
            announcement.textContent = '<?php echo esc_js( __("Search modal opened. Use arrow keys to navigate results, Enter to select, Escape to close.", "wedocs") ); ?>';
            modal.appendChild(announcement);
            
            setTimeout(() => {
                announcement.remove();
            }, 1000);
        };
        
        const closeModal = () => {
            // Add closing animation
            const modalContent = modal.querySelector('.rounded-lg');
            if (modalContent) {
                modalContent.style.transition = 'all 0.15s ease-in';
                modalContent.style.transform = 'scale(0.95)';
                modalContent.style.opacity = '0';
                
                setTimeout(() => {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                    // Reset animation styles
                    modalContent.style.transition = '';
                    modalContent.style.transform = '';
                    modalContent.style.opacity = '';
                }, 150);
            } else {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Restore focus to previous element
            const previousElementId = modal.getAttribute('data-previous-active-element');
            if (previousElementId && previousElementId !== 'body') {
                const previousElement = document.getElementById(previousElementId);
                if (previousElement) {
                    previousElement.focus();
                }
            }
            
            // Reset search state
            searchInput.value = '';
            currentResults = [];
            selectedIndex = -1;
        };
        
        // Click trigger to open modal
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
        
        // Close modal when clicking close button
        const closeButton = modal.querySelector('.wedocs-quick-search-modal-close');
        if (closeButton) {
            closeButton.addEventListener('click', (e) => {
                e.preventDefault();
                closeModal();
            });
        }
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Search functionality
        const searchInput = modal.querySelector('input[type="text"]');
        const resultsContainer = modal.querySelector('.space-y-2');
        let searchTimeout;
        let currentResults = [];
        let selectedIndex = -1;
        
        const performSearch = async (query) => {
            if (!query || query.length < 2) {
                resultsContainer.innerHTML = '<?php echo wedocs_block_quick_search_get_template("empty-state", ["message" => __("Type at least 2 characters to search...", "wedocs")]); ?>';
                return;
            }
            
            // Show enhanced loading state
            resultsContainer.innerHTML = `
                <div class="flex flex-col items-center justify-center py-8">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-3"></div>
                    <p class="text-sm text-gray-500"><?php echo esc_js( __("Searching...", "wedocs") ); ?></p>
                </div>
            `;
            
            // Add loading class to search input
            searchInput.classList.add('opacity-75', 'cursor-wait');
            
            try {
                // Use our new AJAX endpoint with HTML format
                const formData = new FormData();
                formData.append('action', 'wedocs_quick_search');
                formData.append('query', query);
                formData.append('per_page', '10');
                formData.append('format', 'html');
                formData.append('_wpnonce', weDocs_Vars.nonce);
                
                const response = await fetch(weDocs_Vars.ajaxurl, {
                    method: 'POST',
                    body: formData
                });
                
                if (!response.ok) {
                    throw new Error('Search failed');
                }
                
                const data = await response.json();
                
                   if (data.success && data.data.html) {
                       resultsContainer.innerHTML = data.data.html;
                       currentResults = data.data.results || [];
                       selectedIndex = -1;
                       updateResultSelection();
                       addResultHoverSupport();
                    
                    // Announce results to screen readers
                    const resultCount = currentResults.length;
                    const announcement = document.createElement('div');
                    announcement.setAttribute('aria-live', 'polite');
                    announcement.setAttribute('aria-atomic', 'true');
                    announcement.className = 'sr-only';
                    
                    if (resultCount === 0) {
                        announcement.textContent = '<?php echo esc_js( __("No results found.", "wedocs") ); ?>';
                    } else {
                        announcement.textContent = `<?php echo esc_js( __("Found", "wedocs") ); ?> ${resultCount} <?php echo esc_js( __("results", "wedocs") ); ?>. <?php echo esc_js( __("Use arrow keys to navigate.", "wedocs") ); ?>`;
                    }
                    
                    modal.appendChild(announcement);
                    setTimeout(() => announcement.remove(), 2000);
                } else {
                    throw new Error(data.data || 'Search failed');
                }
                
            } catch (error) {
                console.error('Search error:', error);
                resultsContainer.innerHTML = '<?php echo wedocs_block_quick_search_get_template("empty-state", ["message" => __("Search failed. Please try again.", "wedocs")]); ?>';
            } finally {
                // Remove loading state
                searchInput.classList.remove('opacity-75', 'cursor-wait');
            }
        };

        // Update result selection highlighting
        const updateResultSelection = () => {
            const resultItems = resultsContainer.querySelectorAll('.flex.items-start');
            resultItems.forEach((item, index) => {
                if (index === selectedIndex) {
                    item.style.backgroundColor = '#EBF8FF';
                    item.style.borderColor = '#3B82F6';
                    item.style.borderWidth = '2px';
                    item.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                } else {
                    item.style.backgroundColor = '#F9FAFB';
                    item.style.borderColor = '<?php echo esc_js( $modal_styles['listItemBorderColor'] ?? '#E5E7EB' ); ?>';
                    item.style.borderWidth = '<?php echo esc_js( $modal_styles['listItemBorderWidth'] ?? '1px' ); ?>';
                    item.style.boxShadow = 'none';
                }
            });
        };

        // Navigate results with keyboard
        const navigateResults = (direction) => {
            const resultItems = resultsContainer.querySelectorAll('.flex.items-start');
            if (resultItems.length === 0) return;

            if (direction === 'down') {
                selectedIndex = Math.min(selectedIndex + 1, resultItems.length - 1);
            } else if (direction === 'up') {
                selectedIndex = Math.max(selectedIndex - 1, -1);
            }

            updateResultSelection();

            // Scroll selected item into view
            if (selectedIndex >= 0) {
                resultItems[selectedIndex].scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            }
        };

        // Open selected result
        const openSelectedResult = () => {
            if (selectedIndex >= 0 && currentResults[selectedIndex]) {
                const result = currentResults[selectedIndex];
                window.open(result.permalink, '_blank');
                closeModal();
            } else if (selectedIndex >= 0) {
                // Fallback: try to click the selected result element
                const resultItems = resultsContainer.querySelectorAll('.flex.items-start');
                if (resultItems[selectedIndex]) {
                    resultItems[selectedIndex].click();
                }
            }
        };

        // Highlight search terms in text
        const highlightSearchTerms = (text, query) => {
            if (!query || query.length < 2) return text;
            
            const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
        };
        
        
        // Debounced search input
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performSearch(e.target.value);
            }, 300);
        });

        // Add mouse hover support for results
        const addResultHoverSupport = () => {
            const resultItems = resultsContainer.querySelectorAll('.flex.items-start');
            resultItems.forEach((item, index) => {
                item.addEventListener('mouseenter', () => {
                    selectedIndex = index;
                    updateResultSelection();
                });
                
                item.addEventListener('mouseleave', () => {
                    // Don't reset selectedIndex on mouse leave to maintain keyboard navigation
                });
            });
        };
        
        // Clear search button
        const clearButton = modal.querySelector('button[type="button"]');
        if (clearButton) {
            clearButton.addEventListener('click', () => {
                searchInput.value = '';
                resultsContainer.innerHTML = '<?php echo wedocs_block_quick_search_get_template("empty-state", ["message" => __("Type at least 2 characters to search...", "wedocs")]); ?>';
            });
        }
        
        // Focus search input when modal opens
        const focusSearchInput = () => {
            if (modal.classList.contains('active')) {
                searchInput.focus();
            }
        };
        
        // Enhanced keyboard navigation
        document.addEventListener('keydown', (e) => {
            // Only handle keyboard events when modal is active
            if (!modal.classList.contains('active')) {
                // Cmd/Ctrl + K to open modal
                if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                    e.preventDefault();
                    openModal();
                    setTimeout(focusSearchInput, 100);
                }
                return;
            }

            // Modal is active - handle navigation
            switch (e.key) {
                case 'Escape':
                    e.preventDefault();
                    closeModal();
                    break;
                    
                case 'ArrowDown':
                    e.preventDefault();
                    navigateResults('down');
                    break;
                    
                case 'ArrowUp':
                    e.preventDefault();
                    navigateResults('up');
                    break;
                    
                case 'Enter':
                    e.preventDefault();
                    if (selectedIndex >= 0) {
                        openSelectedResult();
                    } else {
                        // If no result selected, perform search
                        performSearch(searchInput.value);
                    }
                    break;
                    
                case 'k':
                    if (e.metaKey || e.ctrlKey) {
                        e.preventDefault();
                        closeModal();
                    }
                    break;
            }
        });
    })();
    </script>
    <?php
    return ob_get_clean();
}