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
            <div class="bg-white p-5 rounded-lg w-[90%] max-w-2xl max-h-[80vh] overflow-y-auto shadow-xl">
                <div class="flex justify-between items-center mb-5">
                    <h3 class="text-lg font-semibold m-0"><?php echo esc_html( $modal_placeholder ); ?></h3>
                    <button class="wedocs-quick-search-modal-close bg-transparent border-0 text-2xl cursor-pointer p-0 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded" type="button">&times;</button>
                </div>
                <div class="wedocs-quick-search-modal-body">
                    <p>Modal content will be implemented here...</p>
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
        
        // Keyboard shortcut (Cmd/Ctrl + K)
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                if (modal.classList.contains('active')) {
                    closeModal();
                } else {
                    openModal();
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