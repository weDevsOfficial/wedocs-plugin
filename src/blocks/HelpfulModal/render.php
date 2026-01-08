<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$main_text = $attributes['mainText'] ?? 'Still stuck? How can we help?';
$button_text = $attributes['buttonText'] ?? 'Get Help';
$show_last_updated = $attributes['showLastUpdated'] ?? false;
$modal_title = $attributes['modalTitle'] ?? 'How can we help?';
$name_label = $attributes['nameLabel'] ?? 'Name:';
$email_label = $attributes['emailLabel'] ?? 'Email:';
$message_label = $attributes['messageLabel'] ?? 'Message:';
$email_placeholder = $attributes['emailPlaceholder'] ?? 'you@example.com';
$submit_button_text = $attributes['submitButtonText'] ?? 'Submit';
$show_subject_field = $attributes['showSubjectField'] ?? false;
$subject_label = $attributes['subjectLabel'] ?? 'Subject:';
$success_message = $attributes['successMessage'] ?? 'Thank you! Your message has been sent successfully.';
$error_message = $attributes['errorMessage'] ?? 'Sorry, there was an error sending your message. Please try again.';

$container_background_color = $attributes['containerBackgroundColor'] ?? '';
$container_padding = $attributes['containerPadding'] ?? ['top' => '20px', 'right' => '20px', 'bottom' => '20px', 'left' => '20px'];
$container_margin = $attributes['containerMargin'] ?? ['top' => '0px', 'right' => '0px', 'bottom' => '20px', 'left' => '0px'];
$container_border = $attributes['containerBorder'] ?? ['width' => '1px', 'style' => 'solid', 'color' => '#ddd'];
$container_border_radius = $attributes['containerBorderRadius'] ?? '8px';
$container_box_shadow = $attributes['containerBoxShadow'] ?? '0 2px 4px rgba(0,0,0,0.1)';

$icon_type = $attributes['iconType'] ?? 'email';
$icon_color = $attributes['iconColor'] ?? '';
$icon_size = $attributes['iconSize'] ?? '24px';

$text_color = $attributes['textColor'] ?? '';
$text_typography = $attributes['textTypography'] ?? ['fontSize' => '16px', 'fontWeight' => 'normal'];
$link_color = $attributes['linkColor'] ?? '';
$link_typography = $attributes['linkTypography'] ?? ['fontSize' => '16px', 'fontWeight' => '500'];
$text_alignment = $attributes['textAlignment'] ?? 'left';

$modal_width = $attributes['modalWidth'] ?? '500px';
$modal_height = $attributes['modalHeight'] ?? 'auto';
$modal_heading_color = $attributes['modalHeadingColor'] ?? '';
$modal_heading_typography = $attributes['modalHeadingTypography'] ?? ['fontSize' => '24px', 'fontWeight' => '600'];
$modal_heading_alignment = $attributes['modalHeadingAlignment'] ?? 'left';
$label_color = $attributes['labelColor'] ?? '';
$label_typography = $attributes['labelTypography'] ?? ['fontSize' => '14px', 'fontWeight' => '500'];

$button_background_color = $attributes['buttonBackgroundColor'] ?? '#0073aa';
$button_text_color = $attributes['buttonTextColor'] ?? 'white';
$button_typography = $attributes['buttonTypography'] ?? ['fontSize' => '16px', 'fontWeight' => '500'];
$button_width = $attributes['buttonWidth'] ?? 'auto';
$button_padding = $attributes['buttonPadding'] ?? ['top' => '12px', 'right' => '24px', 'bottom' => '12px', 'left' => '24px'];
$button_alignment = $attributes['buttonAlignment'] ?? 'left';

$success_text_color = $attributes['successTextColor'] ?? '';
$success_typography = $attributes['successTypography'] ?? ['fontSize' => '16px', 'fontWeight' => 'normal'];
$success_alignment = $attributes['successAlignment'] ?? 'left';
$error_text_color = $attributes['errorTextColor'] ?? '';
$error_typography = $attributes['errorTypography'] ?? ['fontSize' => '16px', 'fontWeight' => 'normal'];
$error_alignment = $attributes['errorAlignment'] ?? 'left';

$custom_class_name = $attributes['customClassName'] ?? '';
$analytics_event = $attributes['analyticsEvent'] ?? 'need-help-clicked';

// Build styles
$container_styles = sprintf(
	'background-color: %s; padding: %s %s %s %s; margin: %s %s %s %s; border: %s %s %s; border-radius: %s; box-shadow: %s; text-align: %s;',
	esc_attr($container_background_color),
	esc_attr($container_padding['top'] ?? '20px'),
	esc_attr($container_padding['right'] ?? '20px'),
	esc_attr($container_padding['bottom'] ?? '20px'),
	esc_attr($container_padding['left'] ?? '20px'),
	esc_attr($container_margin['top'] ?? '0px'),
	esc_attr($container_margin['right'] ?? '0px'),
	esc_attr($container_margin['bottom'] ?? '20px'),
	esc_attr($container_margin['left'] ?? '0px'),
	esc_attr($container_border['width'] ?? '1px'),
	esc_attr($container_border['style'] ?? 'solid'),
	esc_attr($container_border['color'] ?? '#ddd'),
	esc_attr($container_border_radius),
	esc_attr($container_box_shadow),
	esc_attr($text_alignment)
);

$text_styles = sprintf(
	'color: %s; font-size: %s; font-weight: %s; margin: 0 0 16px 0;',
	esc_attr($text_color),
	esc_attr($text_typography['fontSize'] ?? '16px'),
	esc_attr($text_typography['fontWeight'] ?? 'normal')
);

$link_styles = sprintf(
	'color: %s; font-size: %s; font-weight: %s; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; cursor: pointer;',
	esc_attr($link_color),
	esc_attr($link_typography['fontSize'] ?? '16px'),
	esc_attr($link_typography['fontWeight'] ?? '500')
);

$icon_styles = sprintf(
	'color: %s; width: %s; height: %s;',
	esc_attr($icon_color),
	esc_attr($icon_size),
	esc_attr($icon_size)
);

$modal_styles = '';

$modal_content_styles = sprintf(
	'width: %s; max-width: %s; height: %s;',
	esc_attr($modal_width),
	esc_attr($modal_width),
	esc_attr($modal_height)
);

$heading_styles = sprintf(
	'color: %s; font-size: %s; font-weight: %s; text-align: %s; margin: 0;',
	esc_attr($modal_heading_color),
	esc_attr($modal_heading_typography['fontSize'] ?? '24px'),
	esc_attr($modal_heading_typography['fontWeight'] ?? '600'),
	esc_attr($modal_heading_alignment)
);

$label_styles = sprintf(
	'color: %s; font-size: %s; font-weight: %s; display: block; margin-bottom: 4px;',
	esc_attr($label_color),
	esc_attr($label_typography['fontSize'] ?? '14px'),
	esc_attr($label_typography['fontWeight'] ?? '500')
);

$button_styles = sprintf(
	'background-color: %s; color: %s; font-size: %s; font-weight: %s; width: %s; padding: %s %s %s %s; border: none; border-radius: 4px; cursor: pointer;',
	esc_attr($button_background_color),
	esc_attr($button_text_color),
	esc_attr($button_typography['fontSize'] ?? '16px'),
	esc_attr($button_typography['fontWeight'] ?? '500'),
	esc_attr($button_width),
	esc_attr($button_padding['top'] ?? '12px'),
	esc_attr($button_padding['right'] ?? '24px'),
	esc_attr($button_padding['bottom'] ?? '12px'),
	esc_attr($button_padding['left'] ?? '24px')
);

// Get icon SVG - guarded function to prevent redeclaration
if (!function_exists('get_help_icon_svg')) {
	function get_help_icon_svg($type, $styles) {
		$icons = [
			'email' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 20q-.825 0-1.413-.588T2 18V6q0-.825.588-1.413T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.588 1.413T20 20H4Zm8-7L4 8v10h16V8l-8 5Zm0-2 8-5H4l8 5ZM4 8V6v12V8Z"/></svg>',
			'help' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>',
			'info' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>'
		];

		return sprintf('<span style="%s">%s</span>', $styles, $icons[$type] ?? $icons['email']);
	}
}

// Prepare modal data for JavaScript
$modal_data = [
	'title' => $modal_title,
	'nameLabel' => $name_label,
	'emailLabel' => $email_label,
	'messageLabel' => $message_label,
	'emailPlaceholder' => $email_placeholder,
	'submitText' => $submit_button_text,
	'showSubject' => $show_subject_field,
	'subjectLabel' => $subject_label,
	'successMessage' => $success_message,
	'errorMessage' => $error_message,
	'modalStyles' => $modal_styles,
	'modalContentStyles' => $modal_content_styles,
	'headingStyles' => $heading_styles,
	'labelStyles' => $label_styles,
	'buttonStyles' => $button_styles,
	'buttonAlignment' => $button_alignment
];

$wrapper_attributes = get_block_wrapper_attributes([
	'class' => $custom_class_name
]);
?>

<div <?php echo $wrapper_attributes; ?>>
	<div class="need-more-help-container" style="<?php echo esc_attr($container_styles); ?>">
		<p style="<?php echo esc_attr($text_styles); ?>"><?php echo esc_html($main_text); ?></p>
		<a style="<?php echo esc_attr($link_styles); ?>" data-track="<?php echo esc_attr($analytics_event); ?>">
			<?php echo get_help_icon_svg($icon_type, $icon_styles); ?>
			<?php echo esc_html($button_text); ?>
		</a>
		<?php if ($show_last_updated) : ?>
			<p style="font-size: 12px; color: #666; margin-top: 8px;">
				<?php
				printf(
					/* translators: %s: formatted date */
					esc_html__('Last updated: %s', 'wedocs'),
					esc_html(get_the_modified_date())
				);
				?>
			</p>
		<?php endif; ?>
	</div>

	<!-- Hidden data for JavaScript -->
	<script type="application/json" class="need-more-help-modal-data"><?php echo wp_json_encode($modal_data); ?></script>
</div>
