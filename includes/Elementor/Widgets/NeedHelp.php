<?php

namespace WeDevs\WeDocs\Elementor\Widgets;

use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Box_Shadow;

/**
 * WeDocs Need More Help / Contact Modal Widget for Elementor
 */
class NeedHelp extends Widget_Base {

    public function get_name() {
        return 'wedocs-need-help';
    }

    public function get_title() {
        return __('weDocs - Need More Help', 'wedocs');
    }

    public function get_icon() {
        return 'eicon-help-o';
    }

    public function get_categories() {
        return ['wedocs-category'];
    }

    public function get_keywords() {
        return ['help', 'contact', 'support', 'modal', 'wedocs'];
    }

    protected function register_controls() {

        // Content Section - Trigger
        $this->start_controls_section(
            'trigger_section',
            [
                'label' => __('Trigger', 'wedocs'),
                'tab' => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'trigger_heading',
            [
                'label' => __('Heading', 'wedocs'),
                'type' => Controls_Manager::TEXT,
                'default' => __('Need More Help?', 'wedocs'),
            ]
        );

        $this->add_control(
            'trigger_description',
            [
                'label' => __('Description', 'wedocs'),
                'type' => Controls_Manager::TEXTAREA,
                'default' => __("Can't find what you're looking for? Reach out to our support team.", 'wedocs'),
                'rows' => 3,
            ]
        );

        $this->add_control(
            'trigger_icon',
            [
                'label' => __('Icon', 'wedocs'),
                'type' => Controls_Manager::ICONS,
                'default' => [
                    'value' => 'fas fa-headset',
                    'library' => 'fa-solid',
                ],
            ]
        );

        $this->add_control(
            'button_text',
            [
                'label' => __('Button Text', 'wedocs'),
                'type' => Controls_Manager::TEXT,
                'default' => __('Contact Support', 'wedocs'),
            ]
        );

        $this->add_control(
            'layout',
            [
                'label' => __('Layout', 'wedocs'),
                'type' => Controls_Manager::SELECT,
                'default' => 'card',
                'options' => [
                    'card' => __('Card', 'wedocs'),
                    'inline' => __('Inline', 'wedocs'),
                    'minimal' => __('Minimal (Button Only)', 'wedocs'),
                ],
            ]
        );

        $this->end_controls_section();

        // Content Section - Modal
        $this->start_controls_section(
            'modal_section',
            [
                'label' => __('Modal Content', 'wedocs'),
                'tab' => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'modal_title',
            [
                'label' => __('Modal Title', 'wedocs'),
                'type' => Controls_Manager::TEXT,
                'default' => __('Contact Support', 'wedocs'),
            ]
        );

        $this->add_control(
            'modal_description',
            [
                'label' => __('Modal Description', 'wedocs'),
                'type' => Controls_Manager::TEXTAREA,
                'default' => __('Fill out the form below and our team will get back to you as soon as possible.', 'wedocs'),
                'rows' => 2,
            ]
        );

        $this->add_control(
            'show_name_field',
            [
                'label' => __('Show Name Field', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'return_value' => 'yes',
                'default' => 'yes',
            ]
        );

        $this->add_control(
            'show_email_field',
            [
                'label' => __('Show Email Field', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'return_value' => 'yes',
                'default' => 'yes',
            ]
        );

        $this->add_control(
            'show_subject_field',
            [
                'label' => __('Show Subject Field', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'return_value' => 'yes',
                'default' => 'yes',
            ]
        );

        $this->add_control(
            'submit_text',
            [
                'label' => __('Submit Button Text', 'wedocs'),
                'type' => Controls_Manager::TEXT,
                'default' => __('Send Message', 'wedocs'),
            ]
        );

        $this->add_control(
            'success_message',
            [
                'label' => __('Success Message', 'wedocs'),
                'type' => Controls_Manager::TEXT,
                'default' => __('Thank you! Your message has been sent successfully.', 'wedocs'),
            ]
        );

        $this->add_control(
            'recipient_email',
            [
                'label' => __('Recipient Email', 'wedocs'),
                'type' => Controls_Manager::TEXT,
                'default' => get_option('admin_email'),
                'description' => __('Email address where form submissions will be sent', 'wedocs'),
            ]
        );

        $this->add_control(
            'save_to_elementor',
            [
                'label' => __('Save to Elementor Submissions', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => __('Yes', 'wedocs'),
                'label_off' => __('No', 'wedocs'),
                'return_value' => 'yes',
                'default' => '',
                'description' => __('Save form data to Elementor Pro submissions (requires Elementor Pro)', 'wedocs'),
                'separator' => 'before',
            ]
        );

        $this->end_controls_section();

        // Style Section - Card
        $this->start_controls_section(
            'style_card',
            [
                'label' => __('Card / Trigger', 'wedocs'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'card_bg_color',
            [
                'label' => __('Background Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#f0f7ff',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-need-help__card' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'card_padding',
            [
                'label' => __('Padding', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%', 'em'],
                'default' => [
                    'top' => 25,
                    'right' => 25,
                    'bottom' => 25,
                    'left' => 25,
                    'unit' => 'px',
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-need-help__card' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Border::get_type(),
            [
                'name' => 'card_border',
                'selector' => '{{WRAPPER}} .wedocs-need-help__card',
                'fields_options' => [
                    'border' => ['default' => 'solid'],
                    'width' => ['default' => ['top' => 1, 'right' => 1, 'bottom' => 1, 'left' => 1]],
                    'color' => ['default' => '#d0e3f7'],
                ],
            ]
        );

        $this->add_responsive_control(
            'card_border_radius',
            [
                'label' => __('Border Radius', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%'],
                'default' => ['top' => 8, 'right' => 8, 'bottom' => 8, 'left' => 8, 'unit' => 'px'],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-need-help__card' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'heading_color',
            [
                'label' => __('Heading Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#1a202c',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-need-help__heading' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'heading_typography',
                'selector' => '{{WRAPPER}} .wedocs-need-help__heading',
            ]
        );

        $this->add_control(
            'desc_color',
            [
                'label' => __('Description Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#4a5568',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-need-help__desc' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'icon_color',
            [
                'label' => __('Icon Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#0073aa',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-need-help__icon' => 'color: {{VALUE}};',
                    '{{WRAPPER}} .wedocs-need-help__icon svg' => 'fill: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'icon_size',
            [
                'label' => __('Icon Size', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => ['px' => ['min' => 16, 'max' => 80]],
                'default' => ['size' => 40],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-need-help__icon i' => 'font-size: {{SIZE}}px;',
                    '{{WRAPPER}} .wedocs-need-help__icon svg' => 'width: {{SIZE}}px; height: {{SIZE}}px;',
                ],
            ]
        );

        $this->end_controls_section();

        // Style Section - Button
        $this->start_controls_section(
            'style_button',
            [
                'label' => __('Button', 'wedocs'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'btn_bg_color',
            [
                'label' => __('Background Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#0073aa',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-need-help__btn' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'btn_text_color',
            [
                'label' => __('Text Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#ffffff',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-need-help__btn' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'btn_hover_bg_color',
            [
                'label' => __('Hover Background', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#005177',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-need-help__btn:hover' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'btn_padding',
            [
                'label' => __('Padding', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', 'em'],
                'default' => ['top' => 12, 'right' => 24, 'bottom' => 12, 'left' => 24, 'unit' => 'px'],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-need-help__btn' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'btn_border_radius',
            [
                'label' => __('Border Radius', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%'],
                'default' => ['top' => 6, 'right' => 6, 'bottom' => 6, 'left' => 6, 'unit' => 'px'],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-need-help__btn' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'btn_typography',
                'selector' => '{{WRAPPER}} .wedocs-need-help__btn',
            ]
        );

        $this->end_controls_section();

        // Style Section - Modal
        $this->start_controls_section(
            'style_modal',
            [
                'label' => __('Modal', 'wedocs'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'modal_bg_color',
            [
                'label' => __('Background Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#ffffff',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-need-help__modal-content' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'modal_overlay_color',
            [
                'label' => __('Overlay Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => 'rgba(0,0,0,0.5)',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-need-help__modal' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'modal_width',
            [
                'label' => __('Modal Width', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'size_units' => ['px', '%'],
                'range' => [
                    'px' => ['min' => 300, 'max' => 800],
                    '%' => ['min' => 30, 'max' => 90],
                ],
                'default' => ['size' => 500, 'unit' => 'px'],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-need-help__modal-content' => 'max-width: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'modal_border_radius',
            [
                'label' => __('Border Radius', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%'],
                'default' => ['top' => 12, 'right' => 12, 'bottom' => 12, 'left' => 12, 'unit' => 'px'],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-need-help__modal-content' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Box_Shadow::get_type(),
            [
                'name' => 'modal_shadow',
                'selector' => '{{WRAPPER}} .wedocs-need-help__modal-content',
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();

        $layout = $settings['layout'] ?? 'card';
        $show_name = ($settings['show_name_field'] ?? 'yes') === 'yes';
        $show_email = ($settings['show_email_field'] ?? 'yes') === 'yes';
        $show_subject = ($settings['show_subject_field'] ?? 'yes') === 'yes';
        $widget_id = $this->get_id();
        ?>

        <?php if ($layout !== 'minimal'): ?>
        <div class="wedocs-need-help__card wedocs-need-help--<?php echo esc_attr($layout); ?>">
            <?php if (!empty($settings['trigger_icon']['value'])): ?>
                <div class="wedocs-need-help__icon">
                    <?php \Elementor\Icons_Manager::render_icon($settings['trigger_icon'], ['aria-hidden' => 'true']); ?>
                </div>
            <?php endif; ?>

            <div class="wedocs-need-help__text">
                <h3 class="wedocs-need-help__heading"><?php echo esc_html($settings['trigger_heading']); ?></h3>
                <?php if (!empty($settings['trigger_description'])): ?>
                    <p class="wedocs-need-help__desc"><?php echo esc_html($settings['trigger_description']); ?></p>
                <?php endif; ?>
            </div>

            <button type="button" class="wedocs-need-help__btn" data-modal="wedocs-help-modal-<?php echo esc_attr($widget_id); ?>">
                <?php echo esc_html($settings['button_text']); ?>
            </button>
        </div>
        <?php else: ?>
        <button type="button" class="wedocs-need-help__btn" data-modal="wedocs-help-modal-<?php echo esc_attr($widget_id); ?>">
            <?php if (!empty($settings['trigger_icon']['value'])): ?>
                <span class="wedocs-need-help__btn-icon">
                    <?php \Elementor\Icons_Manager::render_icon($settings['trigger_icon'], ['aria-hidden' => 'true']); ?>
                </span>
            <?php endif; ?>
            <?php echo esc_html($settings['button_text']); ?>
        </button>
        <?php endif; ?>

        <!-- Modal -->
        <div class="wedocs-need-help__modal" id="wedocs-help-modal-<?php echo esc_attr($widget_id); ?>" style="display: none;">
            <div class="wedocs-need-help__modal-content">
                <button type="button" class="wedocs-need-help__modal-close">&times;</button>

                <h3 class="wedocs-need-help__modal-title"><?php echo esc_html($settings['modal_title']); ?></h3>
                <?php if (!empty($settings['modal_description'])): ?>
                    <p class="wedocs-need-help__modal-desc"><?php echo esc_html($settings['modal_description']); ?></p>
                <?php endif; ?>

                <form class="wedocs-need-help__form" data-widget-id="<?php echo esc_attr($widget_id); ?>">
                    <?php wp_nonce_field('wedocs_need_help_' . $widget_id, 'wedocs_help_nonce'); ?>

                    <?php if ($show_name): ?>
                    <div class="wedocs-need-help__field">
                        <label for="wedocs-help-name-<?php echo esc_attr($widget_id); ?>"><?php _e('Name', 'wedocs'); ?></label>
                        <input type="text" id="wedocs-help-name-<?php echo esc_attr($widget_id); ?>" name="name" required>
                    </div>
                    <?php endif; ?>

                    <?php if ($show_email): ?>
                    <div class="wedocs-need-help__field">
                        <label for="wedocs-help-email-<?php echo esc_attr($widget_id); ?>"><?php _e('Email', 'wedocs'); ?></label>
                        <input type="email" id="wedocs-help-email-<?php echo esc_attr($widget_id); ?>" name="email" required>
                    </div>
                    <?php endif; ?>

                    <?php if ($show_subject): ?>
                    <div class="wedocs-need-help__field">
                        <label for="wedocs-help-subject-<?php echo esc_attr($widget_id); ?>"><?php _e('Subject', 'wedocs'); ?></label>
                        <input type="text" id="wedocs-help-subject-<?php echo esc_attr($widget_id); ?>" name="subject">
                    </div>
                    <?php endif; ?>

                    <div class="wedocs-need-help__field">
                        <label for="wedocs-help-message-<?php echo esc_attr($widget_id); ?>"><?php _e('Message', 'wedocs'); ?> <span class="required">*</span></label>
                        <textarea id="wedocs-help-message-<?php echo esc_attr($widget_id); ?>" name="message" rows="5" required></textarea>
                    </div>

                    <div class="wedocs-need-help__form-footer">
                        <button type="submit" class="wedocs-need-help__btn wedocs-need-help__submit-btn">
                            <?php echo esc_html($settings['submit_text']); ?>
                        </button>
                    </div>

                    <div class="wedocs-need-help__success" style="display: none;">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="#10b981" opacity="0.1"/><path d="M15 25L21 31L33 19" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        <p><?php echo esc_html($settings['success_message']); ?></p>
                    </div>
                </form>
            </div>
        </div>

        <style>
            .wedocs-need-help__card {
                text-align: center;
            }

            .wedocs-need-help--inline {
                display: flex;
                align-items: center;
                gap: 20px;
                text-align: left;
            }

            .wedocs-need-help--inline .wedocs-need-help__text {
                flex: 1;
            }

            .wedocs-need-help__icon {
                margin-bottom: 15px;
            }

            .wedocs-need-help--inline .wedocs-need-help__icon {
                margin-bottom: 0;
                flex-shrink: 0;
            }

            .wedocs-need-help__heading {
                margin: 0 0 8px;
            }

            .wedocs-need-help__desc {
                margin: 0 0 20px;
            }

            .wedocs-need-help--inline .wedocs-need-help__desc {
                margin-bottom: 0;
            }

            .wedocs-need-help__btn {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                border: none;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.2s ease;
                text-decoration: none;
                line-height: 1;
            }

            .wedocs-need-help__btn:hover {
                transform: translateY(-1px);
            }

            .wedocs-need-help__btn-icon i,
            .wedocs-need-help__btn-icon svg {
                display: block;
            }

            /* Modal */
            .wedocs-need-help__modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 99999;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                box-sizing: border-box;
            }

            .wedocs-need-help__modal-content {
                width: 100%;
                padding: 30px;
                position: relative;
                max-height: 90vh;
                overflow-y: auto;
                box-sizing: border-box;
            }

            .wedocs-need-help__modal-close {
                position: absolute;
                top: 12px;
                right: 16px;
                background: none;
                border: none;
                font-size: 28px;
                cursor: pointer;
                color: #999;
                line-height: 1;
                padding: 0;
                transition: color 0.2s;
            }

            .wedocs-need-help__modal-close:hover {
                color: #333;
            }

            .wedocs-need-help__modal-title {
                margin: 0 0 8px;
                font-size: 22px;
                color: #1a202c;
            }

            .wedocs-need-help__modal-desc {
                margin: 0 0 24px;
                color: #718096;
                font-size: 14px;
            }

            .wedocs-need-help__field {
                margin-bottom: 16px;
            }

            .wedocs-need-help__field label {
                display: block;
                margin-bottom: 6px;
                font-weight: 500;
                font-size: 14px;
                color: #374151;
            }

            .wedocs-need-help__field .required {
                color: #ef4444;
            }

            .wedocs-need-help__field input,
            .wedocs-need-help__field textarea {
                width: 100%;
                padding: 10px 14px;
                border: 1px solid #d1d5db;
                border-radius: 6px;
                font-size: 14px;
                box-sizing: border-box;
                transition: border-color 0.2s;
                font-family: inherit;
            }

            .wedocs-need-help__field input:focus,
            .wedocs-need-help__field textarea:focus {
                outline: none;
                border-color: #0073aa;
                box-shadow: 0 0 0 2px rgba(0, 115, 170, 0.15);
            }

            .wedocs-need-help__form-footer {
                margin-top: 20px;
            }

            .wedocs-need-help__submit-btn {
                width: 100%;
                justify-content: center;
            }

            .wedocs-need-help__submit-btn.loading {
                opacity: 0.6;
                pointer-events: none;
            }

            .wedocs-need-help__success {
                text-align: center;
                padding: 30px 0;
            }

            .wedocs-need-help__success p {
                margin: 16px 0 0;
                color: #10b981;
                font-weight: 500;
                font-size: 16px;
            }

            @media (max-width: 768px) {
                .wedocs-need-help--inline {
                    flex-direction: column;
                    text-align: center;
                }

                .wedocs-need-help--inline .wedocs-need-help__desc {
                    margin-bottom: 15px;
                }
            }
        </style>

        <script>
            (function($) {
                'use strict';

                // Open modal
                $('[data-modal="wedocs-help-modal-<?php echo esc_js($widget_id); ?>"]').on('click', function(e) {
                    e.preventDefault();
                    $('#wedocs-help-modal-<?php echo esc_js($widget_id); ?>').fadeIn(200);
                    $('body').css('overflow', 'hidden');
                });

                // Close modal
                var $modal = $('#wedocs-help-modal-<?php echo esc_js($widget_id); ?>');

                $modal.find('.wedocs-need-help__modal-close').on('click', function() {
                    $modal.fadeOut(200);
                    $('body').css('overflow', '');
                });

                $modal.on('click', function(e) {
                    if ($(e.target).is('.wedocs-need-help__modal')) {
                        $modal.fadeOut(200);
                        $('body').css('overflow', '');
                    }
                });

                $(document).on('keydown', function(e) {
                    if (e.key === 'Escape' && $modal.is(':visible')) {
                        $modal.fadeOut(200);
                        $('body').css('overflow', '');
                    }
                });

                // Form submission
                $modal.find('.wedocs-need-help__form').on('submit', function(e) {
                    e.preventDefault();
                    var $form = $(this);
                    var $submitBtn = $form.find('.wedocs-need-help__submit-btn');

                    if ($submitBtn.hasClass('loading')) return;

                    $submitBtn.addClass('loading').text('<?php _e('Sending...', 'wedocs'); ?>');

                    $.ajax({
                        url: '<?php echo admin_url('admin-ajax.php'); ?>',
                        type: 'POST',
                        data: {
                            action: 'wedocs_need_help_submit',
                            nonce: $form.find('[name="wedocs_help_nonce"]').val(),
                            widget_id: '<?php echo esc_js($widget_id); ?>',
                            name: $form.find('[name="name"]').val() || '',
                            email: $form.find('[name="email"]').val() || '',
                            subject: $form.find('[name="subject"]').val() || '',
                            message: $form.find('[name="message"]').val(),
                            page_url: window.location.href,
                            page_title: document.title,
                            post_id: <?php echo get_the_ID(); ?>,
                            recipient: '<?php echo esc_js($settings['recipient_email']); ?>',
                            save_to_elementor: '<?php echo esc_js($settings['save_to_elementor'] ?? ''); ?>'
                        },
                        success: function(response) {
                            if (response.success) {
                                $form.find('.wedocs-need-help__field, .wedocs-need-help__form-footer').hide();
                                $form.find('.wedocs-need-help__success').fadeIn();
                            } else {
                                $submitBtn.removeClass('loading').text('<?php echo esc_js($settings['submit_text']); ?>');
                                alert(response.data?.message || '<?php _e('Something went wrong. Please try again.', 'wedocs'); ?>');
                            }
                        },
                        error: function() {
                            $submitBtn.removeClass('loading').text('<?php echo esc_js($settings['submit_text']); ?>');
                            alert('<?php _e('Something went wrong. Please try again.', 'wedocs'); ?>');
                        }
                    });
                });
            })(jQuery);
        </script>
    <?php
    }

    protected function content_template() {
    ?>
        <#
        var layout = settings.layout || 'card';
        #>

        <# if (layout !== 'minimal') { #>
        <div class="wedocs-need-help__card wedocs-need-help--{{ layout }}" style="background-color: {{ settings.card_bg_color || '#f0f7ff' }}; border: 1px solid {{ settings.card_border_color || '#d0e3f7' }}; border-radius: 8px; padding: 25px; {{ layout === 'inline' ? 'display: flex; align-items: center; gap: 20px; text-align: left;' : 'text-align: center;' }}">
            <# if (settings.trigger_icon && settings.trigger_icon.value) { #>
                <div class="wedocs-need-help__icon" style="color: {{ settings.icon_color || '#0073aa' }}; {{ layout !== 'inline' ? 'margin-bottom: 15px;' : 'flex-shrink: 0;' }}">
                    <# var iconHTML = elementor.helpers.renderIcon(view, settings.trigger_icon, { 'aria-hidden': true }, 'i', 'object');
                    if (iconHTML && iconHTML.rendered) { #>
                        {{{ iconHTML.value }}}
                    <# } else { #>
                        <i class="{{ settings.trigger_icon.value }}" style="font-size: {{ settings.icon_size?.size || 40 }}px;"></i>
                    <# } #>
                </div>
            <# } #>

            <div class="wedocs-need-help__text" style="{{ layout === 'inline' ? 'flex: 1;' : '' }}">
                <h3 class="wedocs-need-help__heading" style="margin: 0 0 8px; color: {{ settings.heading_color || '#1a202c' }};">{{ settings.trigger_heading }}</h3>
                <# if (settings.trigger_description) { #>
                    <p class="wedocs-need-help__desc" style="margin: 0 {{ layout === 'inline' ? '' : '0 20px' }}; color: {{ settings.desc_color || '#4a5568' }};">{{ settings.trigger_description }}</p>
                <# } #>
            </div>

            <button type="button" class="wedocs-need-help__btn" style="background-color: {{ settings.btn_bg_color || '#0073aa' }}; color: {{ settings.btn_text_color || '#ffffff' }}; padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; {{ layout !== 'inline' ? 'margin-top: 20px;' : '' }}">
                {{ settings.button_text }}
            </button>
        </div>
        <# } else { #>
        <button type="button" class="wedocs-need-help__btn" style="background-color: {{ settings.btn_bg_color || '#0073aa' }}; color: {{ settings.btn_text_color || '#ffffff' }}; padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; display: inline-flex; align-items: center; gap: 8px;">
            <# if (settings.trigger_icon && settings.trigger_icon.value) {
                var iconHTML = elementor.helpers.renderIcon(view, settings.trigger_icon, { 'aria-hidden': true }, 'i', 'object');
                if (iconHTML && iconHTML.rendered) { #>
                    <span style="display: flex;">{{{ iconHTML.value }}}</span>
                <# } else { #>
                    <i class="{{ settings.trigger_icon.value }}"></i>
                <# }
            } #>
            {{ settings.button_text }}
        </button>
        <# } #>
    <?php
    }
}
