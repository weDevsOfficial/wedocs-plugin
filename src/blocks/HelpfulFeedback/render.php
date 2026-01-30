<?php
/**
 * Server-side rendering for the Helpful Feedback block
 *
 * @package weDocs
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Render the helpful feedback block on frontend
 *
 * @param array  $attributes Block attributes
 * @param string $content    Block content
 * @return string Rendered block content
 */
function render_wedocs_helpful_feedback($attributes) {
    // Check if this is a docs post type
    if (get_post_type() !== 'docs') {
        return '';
    }

    // Start output buffering
    ob_start();

    // Get current post ID
    $post_id = get_the_ID();

    // Get current user ID or IP for vote tracking
    $user_id = get_current_user_id();
    $user_ip = $_SERVER['REMOTE_ADDR'] ?? '';

    // Get vote counts from post meta (using existing system meta keys)
    $yes_votes = (int) get_post_meta($post_id, 'positive', true);
    $no_votes = (int) get_post_meta($post_id, 'negative', true);

    // Check if user has already voted
    $has_voted = false;
    $voted_option = '';

    // Check cookie-based tracking first (for compatibility with existing system)
    $previous = isset($_COOKIE['wedocs_response']) ? explode(',', $_COOKIE['wedocs_response']) : [];
    if (in_array($post_id, $previous)) {
        $has_voted = true;
        // For cookie-based votes, we need to determine which option was voted
        // Check user-specific records to get the vote type
        if ($user_id) {
            $user_vote = get_post_meta($post_id, "wedocs_helpful_vote_user_{$user_id}", true);
            if ($user_vote) {
                $voted_option = $user_vote;
            }
        }
        // If we can't determine the specific vote from user records, show generic "voted" state
        if (!$voted_option) {
            $voted_option = 'yes'; // Default to yes for display purposes
        }
    }

    // Check user-specific voting records if not already voted via cookie
    if (!$has_voted && $user_id) {
        // Check by user ID
        $user_vote = get_post_meta($post_id, "wedocs_helpful_vote_user_{$user_id}", true);
        if ($user_vote) {
            $has_voted = true;
            $voted_option = $user_vote;
        }
    } elseif (!$has_voted && ($attributes['allowAnonymous'] ?? true) && $user_ip) {
        // Check by IP for anonymous users
        $ip_vote = get_post_meta($post_id, "wedocs_helpful_vote_ip_" . md5($user_ip), true);
        if ($ip_vote) {
            $has_voted = true;
            $voted_option = $ip_vote;
        }
    }

    // Extract attributes with defaults
    $question_text = $attributes['questionText'] ?? 'Was this article helpful to you?';
    $layout = $attributes['layout'] ?? 'layout1';
    $alignment = $attributes['alignment'] ?? 'center';
    $show_vote_count = $attributes['showVoteCount'] ?? true;
    $allow_anonymous = $attributes['allowAnonymous'] ?? true;
    $yes_button_text = $attributes['yesButtonText'] ?? 'Yes';
    $no_button_text = $attributes['noButtonText'] ?? 'No';
    $thank_you_message = $attributes['thankYouMessage'] ?? 'Thank you for your feedback!';
    $additional_css_class = $attributes['additionalCssClass'] ?? '';

    // Build container styles
    $container_styles = [];
    if (!empty($attributes['containerBgColor'])) {
        $container_styles[] = 'background-color: ' . esc_attr($attributes['containerBgColor']);
    }
    if (!empty($attributes['containerPadding'])) {
        $padding = $attributes['containerPadding'];
        $container_styles[] = sprintf(
            'padding: %s %s %s %s',
            esc_attr($padding['top'] ?? '20px'),
            esc_attr($padding['right'] ?? '20px'),
            esc_attr($padding['bottom'] ?? '20px'),
            esc_attr($padding['left'] ?? '20px')
        );
    }
    if (!empty($attributes['containerMargin'])) {
        $margin = $attributes['containerMargin'];
        $container_styles[] = sprintf(
            'margin: %s %s %s %s',
            esc_attr($margin['top'] ?? '20px'),
            esc_attr($margin['right'] ?? '0px'),
            esc_attr($margin['bottom'] ?? '20px'),
            esc_attr($margin['left'] ?? '0px')
        );
    }
    if (!empty($attributes['containerBorderStyle']) && $attributes['containerBorderStyle'] !== 'none') {
        $border_width = $attributes['containerBorderWidth'] ?? ['top' => '1px', 'right' => '1px', 'bottom' => '1px', 'left' => '1px'];
        $container_styles[] = sprintf(
            'border: %s %s %s',
            esc_attr($border_width['top'] ?? '1px'),
            esc_attr($attributes['containerBorderStyle']),
            esc_attr($attributes['containerBorderColor'] ?? '#e0e0e0')
        );
    }
    if (!empty($attributes['containerBorderRadius'])) {
        $radius = $attributes['containerBorderRadius'];
        $container_styles[] = sprintf(
            'border-radius: %s %s %s %s',
            esc_attr($radius['top'] ?? '8px'),
            esc_attr($radius['right'] ?? '8px'),
            esc_attr($radius['bottom'] ?? '8px'),
            esc_attr($radius['left'] ?? '8px')
        );
    }
    if (!empty($attributes['containerBoxShadow'])) {
        $container_styles[] = 'box-shadow: ' . esc_attr($attributes['containerBoxShadow']);
    }
    $container_styles[] = 'text-align: ' . esc_attr($alignment);

    // Build title styles
    $title_styles = [];
    if (!empty($attributes['titleColor'])) {
        $title_styles[] = 'color: ' . esc_attr($attributes['titleColor']);
    }
    if (!empty($attributes['titleFontSize'])) {
        $title_styles[] = 'font-size: ' . esc_attr($attributes['titleFontSize']);
    }
    if (!empty($attributes['titleFontWeight'])) {
        $title_styles[] = 'font-weight: ' . esc_attr($attributes['titleFontWeight']);
    }
    if (!empty($attributes['titleLineHeight'])) {
        $title_styles[] = 'line-height: ' . esc_attr($attributes['titleLineHeight']);
    }
    if (!empty($attributes['titleLetterSpacing'])) {
        $title_styles[] = 'letter-spacing: ' . esc_attr($attributes['titleLetterSpacing']);
    }
    if (!empty($attributes['titlePadding'])) {
        $padding = $attributes['titlePadding'];
        $title_styles[] = sprintf(
            'padding: %s %s %s %s',
            esc_attr($padding['top'] ?? '0px'),
            esc_attr($padding['right'] ?? '0px'),
            esc_attr($padding['bottom'] ?? '16px'),
            esc_attr($padding['left'] ?? '0px')
        );
    }
    if (!empty($attributes['titleMargin'])) {
        $margin = $attributes['titleMargin'];
        $title_styles[] = sprintf(
            'margin: %s %s %s %s',
            esc_attr($margin['top'] ?? '0px'),
            esc_attr($margin['right'] ?? '0px'),
            esc_attr($margin['bottom'] ?? '0px'),
            esc_attr($margin['left'] ?? '0px')
        );
    }

    // CSS classes
    $css_classes = [
        'wedocs-helpful-feedback',
        esc_attr($layout),
        esc_attr($alignment),
    ];

    if ($has_voted) {
        $css_classes[] = 'has-voted';
        $css_classes[] = 'voted-' . esc_attr($voted_option);
    }

    if (!empty($additional_css_class)) {
        $css_classes[] = esc_attr($additional_css_class);
    }

    // Data attributes
    $data_attributes = [];
    $data_attributes['data-post-id'] = $post_id;
    $data_attributes['data-allow-anonymous'] = $allow_anonymous ? '1' : '0';
    $data_attributes['data-thank-you-message'] = esc_attr($thank_you_message);

    if (!empty($attributes['dataAttributes']) && is_array($attributes['dataAttributes'])) {
        foreach ($attributes['dataAttributes'] as $key => $value) {
            if (!empty($key) && !empty($value)) {
                $data_attributes['data-' . esc_attr($key)] = esc_attr($value);
            }
        }
    }

    // Build data attributes string
    $data_attrs_string = '';
    foreach ($data_attributes as $key => $value) {
        $data_attrs_string .= ' ' . $key . '="' . $value . '"';
    }

    // Enqueue frontend script and styles
    wp_enqueue_script('wedocs-helpful-feedback-frontend', plugin_dir_url(WEDOCS_FILE) . '/assets/js/helpful-feedback.js', ['jquery'], WEDOCS_VERSION, true);
    wp_localize_script('wedocs-helpful-feedback-frontend', 'wedocsHelpfulFeedback', [
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('wedocs_helpful_feedback_nonce')
    ]);

    // Generate unique block ID
    $block_id = 'wedocs-helpful-feedback-' . $post_id . '-' . wp_rand(1000, 9999);
    ?>

    <div
        id="<?php echo esc_attr($block_id); ?>"
        class="<?php echo esc_attr(implode(' ', $css_classes)); ?>"
        style="<?php echo esc_attr(implode('; ', $container_styles)); ?>"
        <?php echo $data_attrs_string; ?>
    >
        <?php if (!$has_voted): ?>
            <div class="wedocs-feedback-title" style="<?php echo esc_attr(implode('; ', $title_styles)); ?>">
                <?php echo esc_html($question_text); ?>
            </div>

            <div class="wedocs-feedback-buttons">
                <button
                    type="button"
                    class="wedocs-feedback-button wedocs-feedback-yes"
                    data-vote="yes"
                    style="
                        background-color: <?php echo esc_attr($attributes['yesButtonColor'] ?? '#4CAF50'); ?>;
                        color: <?php echo esc_attr($attributes['buttonTextColor'] ?? '#ffffff'); ?>;
                        border: <?php echo esc_attr($attributes['buttonBorderWidth'] ?? '1px'); ?> <?php echo esc_attr($attributes['buttonBorderStyle'] ?? 'solid'); ?> <?php echo esc_attr($attributes['buttonBorderColor'] ?? 'transparent'); ?>;
                        border-radius: <?php echo esc_attr($attributes['buttonBorderRadius'] ?? '6px'); ?>;
                        box-shadow: <?php echo esc_attr($attributes['buttonBoxShadow'] ?? '0 2px 4px rgba(0,0,0,0.1)'); ?>;
                        padding: 12px 24px;
                        margin: 0 8px;
                        cursor: pointer;
                        display: inline-flex;
                        align-items: center;
                        gap: 8px;
                        transition: all 0.3s ease;
                    "
                >
                    <span class="wedocs-feedback-icon" style="width: <?php echo esc_attr($attributes['iconWidth'] ?? '20px'); ?>; height: <?php echo esc_attr($attributes['iconHeight'] ?? '20px'); ?>;">
                        <svg viewBox="0 0 24 24" fill="currentColor" style="width: 100%; height: 100%;">
                            <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558-.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z"/>
                        </svg>
                    </span>
                    <?php echo esc_html($yes_button_text); ?>
                    <?php if ($show_vote_count): ?>
                        <span class="vote-count">(<?php echo $yes_votes; ?>)</span>
                    <?php endif; ?>
                </button>

                <button
                    type="button"
                    class="wedocs-feedback-button wedocs-feedback-no"
                    data-vote="no"
                    style="
                        background-color: <?php echo esc_attr($attributes['noButtonColor'] ?? '#9e9e9e'); ?>;
                        color: <?php echo esc_attr($attributes['buttonTextColor'] ?? '#ffffff'); ?>;
                        border: <?php echo esc_attr($attributes['buttonBorderWidth'] ?? '1px'); ?> <?php echo esc_attr($attributes['buttonBorderStyle'] ?? 'solid'); ?> <?php echo esc_attr($attributes['buttonBorderColor'] ?? 'transparent'); ?>;
                        border-radius: <?php echo esc_attr($attributes['buttonBorderRadius'] ?? '6px'); ?>;
                        box-shadow: <?php echo esc_attr($attributes['buttonBoxShadow'] ?? '0 2px 4px rgba(0,0,0,0.1)'); ?>;
                        padding: 12px 24px;
                        margin: 0 8px;
                        cursor: pointer;
                        display: inline-flex;
                        align-items: center;
                        gap: 8px;
                        transition: all 0.3s ease;
                    "
                >
                    <span class="wedocs-feedback-icon" style="width: <?php echo esc_attr($attributes['iconWidth'] ?? '20px'); ?>; height: <?php echo esc_attr($attributes['iconHeight'] ?? '20px'); ?>;">
                        <svg viewBox="0 0 24 24" fill="currentColor" style="width: 100%; height: 100%;">
                            <path d="M15.73 5.25h1.035A7.465 7.465 0 0118 9.375a7.465 7.465 0 01-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 01-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 00-.322 1.672V21a.75.75 0 01-.75.75 2.25 2.25 0 01-2.25-2.25c0-1.152.26-2.243.723-3.218C7.74 15.724 7.366 15 6.748 15H3.622c-1.026 0-1.945-.694-2.054-1.715A12.134 12.134 0 011.5 12c0-2.848.992-5.464 2.649-7.521.388-.482.987-.729 1.605-.729H9.77a4.5 4.5 0 011.423.23l3.114 1.04a4.5 4.5 0 001.423.23zM21.669 14.023c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.958 8.958 0 01-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227z"/>
                        </svg>
                    </span>
                    <?php echo esc_html($no_button_text); ?>
                    <?php if ($show_vote_count): ?>
                        <span class="vote-count">(<?php echo $no_votes; ?>)</span>
                    <?php endif; ?>
                </button>
            </div>
        <?php else: ?>
            <div class="wedocs-feedback-thank-you">
                <div class="wedocs-feedback-title" style="<?php echo esc_attr(implode('; ', $title_styles)); ?>">
                    <?php echo esc_html($thank_you_message); ?>
                </div>

                <div class="wedocs-feedback-result">
                    <div class="wedocs-feedback-voted-option voted-<?php echo esc_attr($voted_option); ?>">
                        <?php if ($voted_option === 'yes'): ?>
                            <span class="wedocs-feedback-icon">
                                <svg viewBox="0 0 24 24" fill="currentColor" style="width: 24px; height: 24px; color: <?php echo esc_attr($attributes['yesButtonColor'] ?? '#4CAF50'); ?>;">
                                    <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558-.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z"/>
                                </svg>
                            </span>
                            <?php _e('You found this helpful', 'wedocs'); ?>
                        <?php else: ?>
                            <span class="wedocs-feedback-icon">
                                <svg viewBox="0 0 24 24" fill="currentColor" style="width: 24px; height: 24px; color: <?php echo esc_attr($attributes['noButtonColor'] ?? '#9e9e9e'); ?>;">
                                    <path d="M15.73 5.25h1.035A7.465 7.465 0 0118 9.375a7.465 7.465 0 01-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 01-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 00-.322 1.672V21a.75.75 0 01-.75.75 2.25 2.25 0 01-2.25-2.25c0-1.152.26-2.243.723-3.218C7.74 15.724 7.366 15 6.748 15H3.622c-1.026 0-1.945-.694-2.054-1.715A12.134 12.134 0 011.5 12c0-2.848.992-5.464 2.649-7.521.388-.482.987-.729 1.605-.729H9.77a4.5 4.5 0 011.423.23l3.114 1.04a4.5 4.5 0 001.423.23zM21.669 14.023c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.958 8.958 0 01-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227z"/>
                                </svg>
                            </span>
                            <?php _e('You found this not helpful', 'wedocs'); ?>
                        <?php endif; ?>
                    </div>

                    <?php if ($show_vote_count): ?>
                        <div class="wedocs-feedback-vote-summary">
                            <span class="vote-yes"><?php echo $yes_votes; ?> <?php _e('Yes', 'wedocs'); ?></span>
                            <span class="vote-separator"> • </span>
                            <span class="vote-no"><?php echo $no_votes; ?> <?php _e('No', 'wedocs'); ?></span>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        <?php endif; ?>
    </div>

    <style>
    /* Hover effects for buttons */
    #<?php echo esc_attr($block_id); ?> .wedocs-feedback-yes:hover {
        background-color: <?php echo esc_attr($attributes['yesButtonHoverColor'] ?? '#45a049'); ?> !important;
        color: <?php echo esc_attr($attributes['buttonTextHoverColor'] ?? '#ffffff'); ?> !important;
        <?php if (!empty($attributes['buttonBorderHoverColor'])): ?>
        border-color: <?php echo esc_attr($attributes['buttonBorderHoverColor']); ?> !important;
        <?php endif; ?>
    }

    #<?php echo esc_attr($block_id); ?> .wedocs-feedback-no:hover {
        background-color: <?php echo esc_attr($attributes['noButtonHoverColor'] ?? '#757575'); ?> !important;
        color: <?php echo esc_attr($attributes['buttonTextHoverColor'] ?? '#ffffff'); ?> !important;
        <?php if (!empty($attributes['buttonBorderHoverColor'])): ?>
        border-color: <?php echo esc_attr($attributes['buttonBorderHoverColor']); ?> !important;
        <?php endif; ?>
    }

    #<?php echo esc_attr($block_id); ?> .wedocs-feedback-yes:active {
        background-color: <?php echo esc_attr($attributes['yesButtonActiveColor'] ?? '#2e7d32'); ?> !important;
    }

    #<?php echo esc_attr($block_id); ?> .wedocs-feedback-no:active {
        background-color: <?php echo esc_attr($attributes['noButtonActiveColor'] ?? '#616161'); ?> !important;
    }

    /* Container hover effect */
    <?php if (!empty($attributes['containerBgHoverColor'])): ?>
    #<?php echo esc_attr($block_id); ?>:hover {
        background-color: <?php echo esc_attr($attributes['containerBgHoverColor']); ?> !important;
    }
    <?php endif; ?>

    /* Layout specific styles */
    #<?php echo esc_attr($block_id); ?>.layout2 .wedocs-feedback-button {
        border-radius: 50% !important;
        width: 60px !important;
        height: 60px !important;
        padding: 0 !important;
        justify-content: center !important;
    }

    #<?php echo esc_attr($block_id); ?>.layout2 .wedocs-feedback-button .vote-count {
        position: absolute;
        bottom: -25px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 12px;
        white-space: nowrap;
    }

    #<?php echo esc_attr($block_id); ?> .wedocs-feedback-result {
        margin-top: 15px;
    }

    #<?php echo esc_attr($block_id); ?> .wedocs-feedback-voted-option {
        display: flex;
        align-items: center;
        gap: 8px;
        justify-content: <?php echo esc_attr($alignment); ?>;
        margin-bottom: 10px;
    }

    #<?php echo esc_attr($block_id); ?> .wedocs-feedback-vote-summary {
        text-align: <?php echo esc_attr($alignment); ?>;
        color: #666;
        font-size: 14px;
    }
    </style>

    <?php
    // Get the buffered output
    $output = ob_get_clean();
    return $output;
}
