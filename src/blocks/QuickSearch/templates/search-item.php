<?php
/**
 * Individual Search Item Template
 * 
 * @param array $doc Document object
 * @param array $modal_styles Modal styling attributes
 * @param string $doc_type Document type (Doc, Section, Article)
 * @param string $doc_type_color Color for the document type label
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

$doc = $doc ?? [];
$modal_styles = $modal_styles ?? [];
$doc_type = $doc_type ?? 'Doc';
$doc_type_color = $doc_type_color ?? '#3B82F6';

// Get document title and permalink
$title = is_array( $doc['title'] ) ? $doc['title']['rendered'] : $doc['title'];
$permalink = $doc['permalink'] ?? '#';
?>

<div class="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors" 
     onclick="window.open('<?php echo esc_url( $permalink ); ?>', '_blank')">
    <div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
        <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path>
        </svg>
    </div>
    <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-gray-900 truncate" 
           style="color: <?php echo esc_attr( $modal_styles['listItemTextColor'] ?? '#111827' ); ?>;">
            <?php echo esc_html( $title ); ?>
        </p>
        <div class="mt-1 flex flex-wrap gap-1">
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" 
                  style="background-color: <?php echo esc_attr( $doc_type_color ); ?>20; color: <?php echo esc_attr( $doc_type_color ); ?>;">
                <?php echo esc_html( $doc_type ); ?>
            </span>
        </div>
    </div>
</div>
