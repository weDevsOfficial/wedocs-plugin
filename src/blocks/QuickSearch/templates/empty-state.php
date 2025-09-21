<?php
/**
 * Empty State Template
 * 
 * @param string $message Message to display
 * @param string $icon Icon to show (optional)
 * @param array $modal_styles Modal styling attributes
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

$message = $message ?? __( 'Type at least 2 characters to search...', 'wedocs' );
$icon = $icon ?? '';
$modal_styles = $modal_styles ?? [];
?>

<div class="text-center py-8">
    <?php if ( $icon ) : ?>
        <div class="mb-4">
            <?php echo $icon; ?>
        </div>
    <?php endif; ?>
    
    <p class="text-gray-500" style="color: <?php echo esc_attr( $modal_styles['emptyStateTextColor'] ?? '#6B7280' ); ?>;">
        <?php echo esc_html( $message ); ?>
    </p>
</div>
