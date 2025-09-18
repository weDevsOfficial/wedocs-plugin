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
        modal.innerHTML = `
            <div class="bg-white rounded-lg w-[90%] max-w-2xl max-h-[80vh] overflow-y-auto shadow-xl" style="
                background-color: <?php echo esc_attr( $modal_styles['backgroundColor'] ?? '#FFFFFF' ); ?>;
            ">
                <!-- Search Input -->
                <div class="p-6 border-b border-gray-200">
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <input 
                            type="text" 
                            placeholder="<?php echo esc_attr( $modal_placeholder ); ?>"
                            class="block w-full pl-10 pr-20 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                            style="
                                color: <?php echo esc_attr( $modal_styles['fieldTextColor'] ?? '#111827' ); ?>;
                                background-color: transparent;
                            "
                        />
                        <div class="absolute inset-y-0 right-0 pr-3 flex items-center space-x-2">
                            <button class="text-gray-400 hover:text-gray-600 p-1" type="button">
                                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                            <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">ESC</span>
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
                    <div class="space-y-2">
                        <p class="text-gray-500 text-center py-4">Type at least 2 characters to search...</p>
                    </div>
                </div>
            </div>
        `;
        
        // Append modal to body
        document.body.appendChild(modal);
        
        const openModal = () => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };
        
        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
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
        
        const performSearch = async (query) => {
            if (!query || query.length < 2) {
                resultsContainer.innerHTML = '<p class="text-gray-500 text-center py-4">Type at least 2 characters to search...</p>';
                return;
            }
            
            // Show loading state
            resultsContainer.innerHTML = '<div class="flex justify-center py-4"><div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div></div>';
            
            try {
                const response = await fetch(`<?php echo rest_url('wp/v2/docs/search'); ?>?query=${encodeURIComponent(query)}&per_page=10`);
                
                if (!response.ok) {
                    throw new Error('Search failed');
                }
                
                const data = await response.json();
                displaySearchResults(data);
                
            } catch (error) {
                console.error('Search error:', error);
                resultsContainer.innerHTML = '<p class="text-red-500 text-center py-4">Search failed. Please try again.</p>';
            }
        };
        
        const displaySearchResults = (results) => {
            if (!results || results.length === 0) {
                resultsContainer.innerHTML = '<p class="text-gray-500 text-center py-4">No results found. Try different keywords.</p>';
                return;
            }
            
            const resultsHTML = results.map(doc => {
                const isParent = doc.parent === 0;
                const isSection = doc.parent > 0 && !isParent;
                const isArticle = doc.parent > 0 && isSection;
                
                let docType = 'Doc';
                let docTypeColor = '<?php echo esc_attr( $modal_styles['docLabelColor'] ?? '#3B82F6' ); ?>';
                
                if (isSection) {
                    docType = 'Section';
                    docTypeColor = '<?php echo esc_attr( $modal_styles['sectionLabelColor'] ?? '#10B981' ); ?>';
                } else if (isArticle) {
                    docType = 'Article';
                    docTypeColor = '<?php echo esc_attr( $modal_styles['articleLabelColor'] ?? '#8B5CF6' ); ?>';
                }
                
                return `
                    <div class="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors" onclick="window.open('${doc.permalink}', '_blank')">
                        <div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-900 truncate" style="color: <?php echo esc_attr( $modal_styles['listItemTextColor'] ?? '#111827' ); ?>;">
                                ${doc.title.rendered}
                            </p>
                            <div class="mt-1 flex flex-wrap gap-1">
                                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" style="background-color: ${docTypeColor}20; color: ${docTypeColor};">
                                    ${docType}: ${docType}
                                </span>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
            
            resultsContainer.innerHTML = resultsHTML;
        };
        
        // Debounced search input
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performSearch(e.target.value);
            }, 300);
        });
        
        // Clear search button
        const clearButton = modal.querySelector('button[type="button"]');
        if (clearButton) {
            clearButton.addEventListener('click', () => {
                searchInput.value = '';
                resultsContainer.innerHTML = '<p class="text-gray-500 text-center py-4">Type at least 2 characters to search...</p>';
            });
        }
        
        // Focus search input when modal opens
        const focusSearchInput = () => {
            if (modal.classList.contains('active')) {
                searchInput.focus();
            }
        };
        
        // Keyboard shortcut (Cmd/Ctrl + K)
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                if (modal.classList.contains('active')) {
                    closeModal();
                } else {
                    openModal();
                    setTimeout(focusSearchInput, 100);
                }
            }
            
            // Close modal with Escape key
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    })();
    </script>
    <?php
    return ob_get_clean();
}