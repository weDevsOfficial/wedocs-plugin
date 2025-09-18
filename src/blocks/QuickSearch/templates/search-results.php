<?php
/**
 * Search Results Template
 * 
 * @param array $results Array of search result objects
 * @param array $modal_styles Modal styling attributes
 * @param string $empty_message Message to show when no results
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

$results = $results ?? [];
$modal_styles = $modal_styles ?? [];
$empty_message = $empty_message ?? __( 'No results found. Try different keywords.', 'wedocs' );
?>

<div class="space-y-2">
    <?php if ( empty( $results ) ) : ?>
        <p class="text-gray-500 text-center py-4"><?php echo esc_html( $empty_message ); ?></p>
    <?php else : ?>
        <?php foreach ( $results as $doc ) : ?>
            <?php
            // Determine document type and styling
            $is_parent = $doc['parent'] === 0;
            $is_section = $doc['parent'] > 0 && ! $is_parent;
            $is_article = $doc['parent'] > 0 && $is_section;
            
            $doc_type = 'Doc';
            $doc_type_color = $modal_styles['docLabelColor'] ?? '#3B82F6';
            
            if ( $is_section ) {
                $doc_type = 'Section';
                $doc_type_color = $modal_styles['sectionLabelColor'] ?? '#10B981';
            } elseif ( $is_article ) {
                $doc_type = 'Article';
                $doc_type_color = $modal_styles['articleLabelColor'] ?? '#8B5CF6';
            }
            
            // Get document title
            $title = is_array( $doc['title'] ) ? $doc['title']['rendered'] : $doc['title'];
            $permalink = $doc['permalink'] ?? '#';
            
            // Highlight search terms in title
            $highlighted_title = $title;
            if ( ! empty( $query ) && strlen( $query ) >= 2 ) {
                $highlighted_title = preg_replace(
                    '/(' . preg_quote( $query, '/' ) . ')/i',
                    '<mark class="bg-yellow-200 px-1 rounded">$1</mark>',
                    $title
                );
            }
            ?>
            
            <div class="flex items-start cursor-pointer transition-colors" 
                 style="
                     padding-top: <?php echo esc_attr( $modal_styles['listItemPadding']['top'] ?? '12px' ); ?>;
                     padding-right: <?php echo esc_attr( $modal_styles['listItemPadding']['right'] ?? '16px' ); ?>;
                     padding-bottom: <?php echo esc_attr( $modal_styles['listItemPadding']['bottom'] ?? '12px' ); ?>;
                     padding-left: <?php echo esc_attr( $modal_styles['listItemPadding']['left'] ?? '16px' ); ?>;
                     margin-top: <?php echo esc_attr( $modal_styles['listItemMargin']['top'] ?? '0px' ); ?>;
                     margin-right: <?php echo esc_attr( $modal_styles['listItemMargin']['right'] ?? '0px' ); ?>;
                     margin-bottom: <?php echo esc_attr( $modal_styles['listItemMargin']['bottom'] ?? '0px' ); ?>;
                     margin-left: <?php echo esc_attr( $modal_styles['listItemMargin']['left'] ?? '0px' ); ?>;
                     background-color: #F9FAFB;
                     border: <?php echo esc_attr( $modal_styles['listItemBorderWidth'] ?? '1px' ); ?> solid <?php echo esc_attr( $modal_styles['listItemBorderColor'] ?? '#E5E7EB' ); ?>;
                     border-radius: <?php echo esc_attr( $modal_styles['listItemBorderRadius'] ?? '4px' ); ?>;
                 "
                 onmouseover="this.style.backgroundColor='#F3F4F6'"
                 onmouseout="this.style.backgroundColor='#F9FAFB'"
                 onclick="window.open('<?php echo esc_url( $permalink ); ?>', '_blank')">
                <div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" style="color: <?php echo esc_attr( $modal_styles['listItemIconColor'] ?? '#3B82F6' ); ?>;">
                        <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path>
                    </svg>
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate" 
                       style="color: <?php echo esc_attr( $modal_styles['listItemTextColor'] ?? '#111827' ); ?>;">
                        <?php echo $highlighted_title; ?>
                    </p>
                    <div class="mt-1 flex flex-wrap gap-1">
                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" 
                              style="background-color: <?php echo esc_attr( $doc_type_color ); ?>20; color: <?php echo esc_attr( $doc_type_color ); ?>;">
                            <?php echo esc_html( $doc_type ); ?>
                        </span>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    <?php endif; ?>
</div>
