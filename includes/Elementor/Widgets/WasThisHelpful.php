<?php

namespace WeDevs\WeDocs\Elementor\Widgets;

use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Border;

/**
 * WeDocs "Was This Helpful?" Widget for Elementor
 */
class WasThisHelpful extends Widget_Base {

    public function get_name() {
        return 'wedocs-was-helpful';
    }

    public function get_title() {
        return __('weDocs - Was This Helpful', 'wedocs');
    }

    public function get_icon() {
        return 'eicon-review';
    }

    public function get_categories() {
        return ['wedocs-category'];
    }

    public function get_keywords() {
        return ['helpful', 'feedback', 'rating', 'vote', 'wedocs', 'thumbs'];
    }

    protected function register_controls() {

        // Content Section
        $this->start_controls_section(
            'content_section',
            [
                'label' => __('Content', 'wedocs'),
                'tab' => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'question_text',
            [
                'label' => __('Question Text', 'wedocs'),
                'type' => Controls_Manager::TEXT,
                'default' => __('Was this article helpful?', 'wedocs'),
            ]
        );

        $this->add_control(
            'style',
            [
                'label' => __('Style', 'wedocs'),
                'type' => Controls_Manager::SELECT,
                'default' => 'thumbs',
                'options' => [
                    'thumbs' => __('Thumbs Up/Down', 'wedocs'),
                    'emoji' => __('Emoji Reactions', 'wedocs'),
                    'yes_no' => __('Yes/No Buttons', 'wedocs'),
                ],
            ]
        );

        $this->add_control(
            'yes_text',
            [
                'label' => __('Positive Text', 'wedocs'),
                'type' => Controls_Manager::TEXT,
                'default' => __('Yes', 'wedocs'),
                'condition' => ['style' => 'yes_no'],
            ]
        );

        $this->add_control(
            'no_text',
            [
                'label' => __('Negative Text', 'wedocs'),
                'type' => Controls_Manager::TEXT,
                'default' => __('No', 'wedocs'),
                'condition' => ['style' => 'yes_no'],
            ]
        );

        $this->add_control(
            'show_count',
            [
                'label' => __('Show Vote Count', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'return_value' => 'yes',
                'default' => '',
            ]
        );

        $this->add_control(
            'thank_you_message',
            [
                'label' => __('Thank You Message', 'wedocs'),
                'type' => Controls_Manager::TEXT,
                'default' => __('Thank you for your feedback!', 'wedocs'),
            ]
        );

        $this->add_control(
            'negative_follow_up',
            [
                'label' => __('Negative Feedback Follow-up', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'return_value' => 'yes',
                'default' => '',
                'description' => __('Show a text field when negative feedback is given', 'wedocs'),
            ]
        );

        $this->add_control(
            'follow_up_placeholder',
            [
                'label' => __('Follow-up Placeholder', 'wedocs'),
                'type' => Controls_Manager::TEXT,
                'default' => __('How can we improve this article?', 'wedocs'),
                'condition' => ['negative_follow_up' => 'yes'],
            ]
        );

        $this->add_control(
            'alignment',
            [
                'label' => __('Alignment', 'wedocs'),
                'type' => Controls_Manager::CHOOSE,
                'options' => [
                    'left' => ['title' => __('Left', 'wedocs'), 'icon' => 'eicon-text-align-left'],
                    'center' => ['title' => __('Center', 'wedocs'), 'icon' => 'eicon-text-align-center'],
                    'right' => ['title' => __('Right', 'wedocs'), 'icon' => 'eicon-text-align-right'],
                ],
                'default' => 'center',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-helpful' => 'text-align: {{VALUE}};',
                ],
            ]
        );

        $this->end_controls_section();

        // Style Section - Container
        $this->start_controls_section(
            'style_container',
            [
                'label' => __('Container', 'wedocs'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'bg_color',
            [
                'label' => __('Background Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#f8f9fa',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-helpful' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'padding',
            [
                'label' => __('Padding', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%', 'em'],
                'default' => ['top' => 20, 'right' => 25, 'bottom' => 20, 'left' => 25, 'unit' => 'px'],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-helpful' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Border::get_type(),
            [
                'name' => 'container_border',
                'selector' => '{{WRAPPER}} .wedocs-helpful',
                'fields_options' => [
                    'border' => ['default' => 'solid'],
                    'width' => ['default' => ['top' => 1, 'right' => 1, 'bottom' => 1, 'left' => 1]],
                    'color' => ['default' => '#e2e8f0'],
                ],
            ]
        );

        $this->add_responsive_control(
            'border_radius',
            [
                'label' => __('Border Radius', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%'],
                'default' => ['top' => 8, 'right' => 8, 'bottom' => 8, 'left' => 8, 'unit' => 'px'],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-helpful' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->end_controls_section();

        // Style Section - Question
        $this->start_controls_section(
            'style_question',
            [
                'label' => __('Question Text', 'wedocs'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'question_color',
            [
                'label' => __('Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#1a202c',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-helpful__question' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'question_typography',
                'selector' => '{{WRAPPER}} .wedocs-helpful__question',
            ]
        );

        $this->end_controls_section();

        // Style Section - Buttons
        $this->start_controls_section(
            'style_buttons',
            [
                'label' => __('Vote Buttons', 'wedocs'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'btn_color',
            [
                'label' => __('Button Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#718096',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-helpful__btn' => 'color: {{VALUE}}; border-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'btn_hover_color',
            [
                'label' => __('Hover Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#0073aa',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-helpful__btn:hover' => 'color: {{VALUE}}; border-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'btn_positive_active',
            [
                'label' => __('Positive Active Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#10b981',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-helpful__btn--positive.active' => 'color: {{VALUE}}; border-color: {{VALUE}}; background-color: color-mix(in srgb, {{VALUE}} 10%, transparent);',
                ],
            ]
        );

        $this->add_control(
            'btn_negative_active',
            [
                'label' => __('Negative Active Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#ef4444',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-helpful__btn--negative.active' => 'color: {{VALUE}}; border-color: {{VALUE}}; background-color: color-mix(in srgb, {{VALUE}} 10%, transparent);',
                ],
            ]
        );

        $this->add_responsive_control(
            'btn_size',
            [
                'label' => __('Button Size', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => ['px' => ['min' => 24, 'max' => 80]],
                'default' => ['size' => 44],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-helpful__btn' => 'width: {{SIZE}}px; height: {{SIZE}}px;',
                    '{{WRAPPER}} .wedocs-helpful__btn--text' => 'width: auto; height: auto;',
                ],
            ]
        );

        $this->add_responsive_control(
            'btn_icon_size',
            [
                'label' => __('Icon Size', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => ['px' => ['min' => 14, 'max' => 48]],
                'default' => ['size' => 22],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-helpful__btn svg' => 'width: {{SIZE}}px; height: {{SIZE}}px;',
                    '{{WRAPPER}} .wedocs-helpful__btn .wedocs-helpful__emoji' => 'font-size: {{SIZE}}px;',
                ],
            ]
        );

        $this->add_responsive_control(
            'btn_gap',
            [
                'label' => __('Button Spacing', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => ['px' => ['min' => 4, 'max' => 30]],
                'default' => ['size' => 10],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-helpful__actions' => 'gap: {{SIZE}}px;',
                ],
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();

        $style = $settings['style'] ?? 'thumbs';
        $show_count = ($settings['show_count'] ?? '') === 'yes';
        $negative_follow_up = ($settings['negative_follow_up'] ?? '') === 'yes';
        $widget_id = $this->get_id();

        // Get post ID - handle editor mode
        $post_id = get_the_ID();
        if (!$post_id && \Elementor\Plugin::$instance->editor->is_edit_mode()) {
            $document = \Elementor\Plugin::$instance->documents->get_current();
            if ($document) {
                $post_id = $document->get_main_id();
            }
        }

        // Fallback for editor preview
        if (!$post_id) {
            $post_id = 0;
        }

        // Get existing vote counts
        $positive_count = (int) get_post_meta($post_id, 'positive', true);
        $negative_count = (int) get_post_meta($post_id, 'negative', true);

        // Show sample counts in editor mode for better preview
        if (\Elementor\Plugin::$instance->editor->is_edit_mode() && !$positive_count && !$negative_count) {
            $positive_count = 12;
            $negative_count = 3;
        }
        ?>

        <div class="wedocs-helpful" data-post-id="<?php echo esc_attr($post_id); ?>" data-widget-id="<?php echo esc_attr($widget_id); ?>">
            <span class="wedocs-helpful__question"><?php echo esc_html($settings['question_text']); ?></span>

            <div class="wedocs-helpful__actions">
                <?php if ($style === 'thumbs'): ?>
                    <button type="button" class="wedocs-helpful__btn wedocs-helpful__btn--positive" data-vote="yes" title="<?php esc_attr_e('Yes', 'wedocs'); ?>">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                        <?php if ($show_count): ?><span class="wedocs-helpful__count"><?php echo $positive_count; ?></span><?php endif; ?>
                    </button>
                    <button type="button" class="wedocs-helpful__btn wedocs-helpful__btn--negative" data-vote="no" title="<?php esc_attr_e('No', 'wedocs'); ?>">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/></svg>
                        <?php if ($show_count): ?><span class="wedocs-helpful__count"><?php echo $negative_count; ?></span><?php endif; ?>
                    </button>

                <?php elseif ($style === 'emoji'): ?>
                    <button type="button" class="wedocs-helpful__btn wedocs-helpful__btn--positive" data-vote="yes" title="<?php esc_attr_e('Helpful', 'wedocs'); ?>">
                        <span class="wedocs-helpful__emoji">&#128077;</span>
                        <?php if ($show_count): ?><span class="wedocs-helpful__count"><?php echo $positive_count; ?></span><?php endif; ?>
                    </button>
                    <button type="button" class="wedocs-helpful__btn wedocs-helpful__btn--negative" data-vote="no" title="<?php esc_attr_e('Not helpful', 'wedocs'); ?>">
                        <span class="wedocs-helpful__emoji">&#128078;</span>
                        <?php if ($show_count): ?><span class="wedocs-helpful__count"><?php echo $negative_count; ?></span><?php endif; ?>
                    </button>

                <?php elseif ($style === 'yes_no'): ?>
                    <button type="button" class="wedocs-helpful__btn wedocs-helpful__btn--text wedocs-helpful__btn--positive" data-vote="yes">
                        <?php echo esc_html($settings['yes_text']); ?>
                        <?php if ($show_count): ?><span class="wedocs-helpful__count">(<?php echo $positive_count; ?>)</span><?php endif; ?>
                    </button>
                    <button type="button" class="wedocs-helpful__btn wedocs-helpful__btn--text wedocs-helpful__btn--negative" data-vote="no">
                        <?php echo esc_html($settings['no_text']); ?>
                        <?php if ($show_count): ?><span class="wedocs-helpful__count">(<?php echo $negative_count; ?>)</span><?php endif; ?>
                    </button>
                <?php endif; ?>
            </div>

            <?php if ($negative_follow_up): ?>
            <div class="wedocs-helpful__follow-up" style="display: none;">
                <textarea class="wedocs-helpful__feedback-text" placeholder="<?php echo esc_attr($settings['follow_up_placeholder']); ?>" rows="3"></textarea>
                <button type="button" class="wedocs-helpful__feedback-submit"><?php _e('Submit Feedback', 'wedocs'); ?></button>
            </div>
            <?php endif; ?>

            <div class="wedocs-helpful__thank-you" style="display: none;">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#10b981" opacity="0.15"/><path d="M6 10.5L9 13.5L14 7.5" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <span><?php echo esc_html($settings['thank_you_message']); ?></span>
            </div>
        </div>

        <style>
            .wedocs-helpful {
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                gap: 12px;
                width: 100%;
                box-sizing: border-box;
            }

            .wedocs-helpful__question {
                font-weight: 500;
            }

            .wedocs-helpful__actions {
                display: inline-flex;
                align-items: center;
            }

            .wedocs-helpful__btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 4px;
                background: transparent;
                border: 2px solid;
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.2s ease;
                padding: 0;
                line-height: 1;
            }

            .wedocs-helpful__btn--text {
                border-radius: 6px;
                padding: 10px 20px;
                font-weight: 500;
                font-size: 14px;
            }

            .wedocs-helpful__btn:hover {
                transform: scale(1.1);
            }

            .wedocs-helpful__btn.active {
                transform: scale(1.1);
            }

            .wedocs-helpful__btn.voted {
                opacity: 0.4;
                pointer-events: none;
            }

            .wedocs-helpful__count {
                font-size: 12px;
                font-weight: 600;
            }

            .wedocs-helpful__emoji {
                line-height: 1;
            }

            .wedocs-helpful__thank-you {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                font-weight: 500;
                color: #10b981;
                animation: wedocsHelpfulFadeIn 0.3s ease;
            }

            .wedocs-helpful__follow-up {
                width: 100%;
                max-width: 400px;
                animation: wedocsHelpfulFadeIn 0.3s ease;
            }

            .wedocs-helpful__feedback-text {
                width: 100%;
                padding: 10px 14px;
                border: 1px solid #d1d5db;
                border-radius: 6px;
                font-size: 14px;
                box-sizing: border-box;
                resize: vertical;
                font-family: inherit;
                margin-bottom: 10px;
            }

            .wedocs-helpful__feedback-text:focus {
                outline: none;
                border-color: #0073aa;
            }

            .wedocs-helpful__feedback-submit {
                background: #0073aa;
                color: #fff;
                border: none;
                padding: 8px 18px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
                transition: background 0.2s;
            }

            .wedocs-helpful__feedback-submit:hover {
                background: #005177;
            }

            @keyframes wedocsHelpfulFadeIn {
                from { opacity: 0; transform: translateY(5px); }
                to { opacity: 1; transform: translateY(0); }
            }
        </style>

        <script>
            (function($) {
                'use strict';

                var $widget = $('.wedocs-helpful[data-widget-id="<?php echo esc_js($widget_id); ?>"]');

                $widget.find('.wedocs-helpful__btn').on('click', function() {
                    var $btn = $(this);
                    var vote = $btn.data('vote');

                    if ($btn.hasClass('active') || $btn.hasClass('voted')) return;

                    // Mark active and disable others
                    $btn.addClass('active');
                    $widget.find('.wedocs-helpful__btn').not($btn).addClass('voted');

                    // Update count if visible
                    var $count = $btn.find('.wedocs-helpful__count');
                    if ($count.length) {
                        var isText = $btn.hasClass('wedocs-helpful__btn--text');
                        var current = parseInt($count.text().replace(/[^\d]/g, '')) || 0;
                        $count.text(isText ? '(' + (current + 1) + ')' : (current + 1));
                    }

                    // Send vote
                    $.ajax({
                        url: '<?php echo admin_url('admin-ajax.php'); ?>',
                        type: 'POST',
                        data: {
                            action: 'wedocs_helpful_vote',
                            nonce: '<?php echo wp_create_nonce('wedocs_helpful_vote'); ?>',
                            post_id: $widget.data('post-id'),
                            vote: vote
                        }
                    });

                    // Show follow-up or thank you
                    var hasFollowUp = <?php echo $negative_follow_up ? 'true' : 'false'; ?>;
                    if (vote === 'no' && hasFollowUp) {
                        $widget.find('.wedocs-helpful__follow-up').slideDown(200);
                    } else {
                        $widget.find('.wedocs-helpful__actions').fadeOut(150, function() {
                            $widget.find('.wedocs-helpful__thank-you').fadeIn(200);
                        });
                    }
                });

                // Follow-up submission
                $widget.find('.wedocs-helpful__feedback-submit').on('click', function() {
                    var feedback = $widget.find('.wedocs-helpful__feedback-text').val();
                    if (!feedback.trim()) return;

                    $.ajax({
                        url: '<?php echo admin_url('admin-ajax.php'); ?>',
                        type: 'POST',
                        data: {
                            action: 'wedocs_helpful_feedback',
                            nonce: '<?php echo wp_create_nonce('wedocs_helpful_vote'); ?>',
                            post_id: $widget.data('post-id'),
                            feedback: feedback
                        }
                    });

                    $widget.find('.wedocs-helpful__follow-up, .wedocs-helpful__actions').fadeOut(150, function() {
                        $widget.find('.wedocs-helpful__thank-you').fadeIn(200);
                    });
                });
            })(jQuery);
        </script>
    <?php
    }

    protected function content_template() {
    ?>
        <#
        var style = settings.style || 'thumbs';
        var showCount = settings.show_count === 'yes';
        #>

        <div class="wedocs-helpful" style="display: inline-flex; flex-direction: column; align-items: center; gap: 12px; width: 100%; box-sizing: border-box; text-align: {{ settings.alignment || 'center' }}; background-color: {{ settings.bg_color || '#f8f9fa' }}; padding: 20px 25px; border: 1px solid {{ settings.container_border_color || '#e2e8f0' }}; border-radius: 8px;">
            <span class="wedocs-helpful__question" style="font-weight: 500; color: {{ settings.question_color || '#1a202c' }};">{{ settings.question_text }}</span>

            <div class="wedocs-helpful__actions" style="display: inline-flex; align-items: center; gap: {{ settings.btn_gap?.size || 10 }}px;">
                <# if (style === 'thumbs') { #>
                    <button type="button" class="wedocs-helpful__btn wedocs-helpful__btn--positive" style="display: inline-flex; align-items: center; justify-content: center; width: {{ settings.btn_size?.size || 44 }}px; height: {{ settings.btn_size?.size || 44 }}px; background: transparent; border: 2px solid {{ settings.btn_color || '#718096' }}; border-radius: 50%; cursor: pointer; color: {{ settings.btn_color || '#718096' }};">
                        <svg width="{{ settings.btn_icon_size?.size || 22 }}" height="{{ settings.btn_icon_size?.size || 22 }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                        <# if (showCount) { #><span style="font-size: 12px; font-weight: 600; margin-left: 2px;">12</span><# } #>
                    </button>
                    <button type="button" class="wedocs-helpful__btn wedocs-helpful__btn--negative" style="display: inline-flex; align-items: center; justify-content: center; width: {{ settings.btn_size?.size || 44 }}px; height: {{ settings.btn_size?.size || 44 }}px; background: transparent; border: 2px solid {{ settings.btn_color || '#718096' }}; border-radius: 50%; cursor: pointer; color: {{ settings.btn_color || '#718096' }};">
                        <svg width="{{ settings.btn_icon_size?.size || 22 }}" height="{{ settings.btn_icon_size?.size || 22 }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/></svg>
                        <# if (showCount) { #><span style="font-size: 12px; font-weight: 600; margin-left: 2px;">3</span><# } #>
                    </button>
                <# } else if (style === 'emoji') { #>
                    <button type="button" class="wedocs-helpful__btn wedocs-helpful__btn--positive" style="display: inline-flex; align-items: center; justify-content: center; width: {{ settings.btn_size?.size || 44 }}px; height: {{ settings.btn_size?.size || 44 }}px; background: transparent; border: 2px solid {{ settings.btn_color || '#718096' }}; border-radius: 50%; cursor: pointer; font-size: {{ settings.btn_icon_size?.size || 22 }}px;">
                        &#128077;
                        <# if (showCount) { #><span style="font-size: 12px; font-weight: 600;">12</span><# } #>
                    </button>
                    <button type="button" class="wedocs-helpful__btn wedocs-helpful__btn--negative" style="display: inline-flex; align-items: center; justify-content: center; width: {{ settings.btn_size?.size || 44 }}px; height: {{ settings.btn_size?.size || 44 }}px; background: transparent; border: 2px solid {{ settings.btn_color || '#718096' }}; border-radius: 50%; cursor: pointer; font-size: {{ settings.btn_icon_size?.size || 22 }}px;">
                        &#128078;
                        <# if (showCount) { #><span style="font-size: 12px; font-weight: 600;">3</span><# } #>
                    </button>
                <# } else if (style === 'yes_no') { #>
                    <button type="button" class="wedocs-helpful__btn wedocs-helpful__btn--text wedocs-helpful__btn--positive" style="padding: 10px 20px; background: transparent; border: 2px solid {{ settings.btn_color || '#718096' }}; border-radius: 6px; cursor: pointer; font-weight: 500; color: {{ settings.btn_color || '#718096' }};">
                        {{ settings.yes_text || 'Yes' }}
                        <# if (showCount) { #><span style="font-size: 12px;">(12)</span><# } #>
                    </button>
                    <button type="button" class="wedocs-helpful__btn wedocs-helpful__btn--text wedocs-helpful__btn--negative" style="padding: 10px 20px; background: transparent; border: 2px solid {{ settings.btn_color || '#718096' }}; border-radius: 6px; cursor: pointer; font-weight: 500; color: {{ settings.btn_color || '#718096' }};">
                        {{ settings.no_text || 'No' }}
                        <# if (showCount) { #><span style="font-size: 12px;">(3)</span><# } #>
                    </button>
                <# } #>
            </div>
        </div>
    <?php
    }
}
