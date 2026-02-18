<?php

namespace WeDevs\WeDocs\Elementor\Widgets;

use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Box_Shadow;

/**
 * WeDocs Search Modal Widget for Elementor
 *
 * Renders a search trigger that opens a full-screen documentation
 * search modal (the same Cmd+K modal from weDocs).
 */
class SearchModal extends Widget_Base {

    public function get_name() {
        return 'wedocs-search-modal';
    }

    public function get_title() {
        return __('weDocs - Search Modal', 'wedocs');
    }

    public function get_icon() {
        return 'eicon-search-bold';
    }

    public function get_categories() {
        return ['wedocs-category'];
    }

    public function get_keywords() {
        return ['search', 'modal', 'find', 'wedocs', 'cmd+k', 'documentation'];
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
            'trigger_type',
            [
                'label' => __('Trigger Type', 'wedocs'),
                'type' => Controls_Manager::SELECT,
                'default' => 'input',
                'options' => [
                    'input' => __('Search Input (like sidebar)', 'wedocs'),
                    'button' => __('Button', 'wedocs'),
                    'icon' => __('Icon Only', 'wedocs'),
                ],
            ]
        );

        $this->add_control(
            'placeholder',
            [
                'label' => __('Placeholder Text', 'wedocs'),
                'type' => Controls_Manager::TEXT,
                'default' => __('Search documentation...', 'wedocs'),
            ]
        );

        $this->add_control(
            'button_text',
            [
                'label' => __('Button Text', 'wedocs'),
                'type' => Controls_Manager::TEXT,
                'default' => __('Search Docs', 'wedocs'),
                'condition' => ['trigger_type' => 'button'],
            ]
        );

        $this->add_control(
            'show_shortcut',
            [
                'label' => __('Show ⌘K Shortcut', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'return_value' => 'yes',
                'default' => 'yes',
            ]
        );

        $this->add_control(
            'trigger_icon',
            [
                'label' => __('Search Icon', 'wedocs'),
                'type' => Controls_Manager::ICONS,
                'default' => [
                    'value' => 'fas fa-search',
                    'library' => 'fa-solid',
                ],
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
                'default' => 'left',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-modal-trigger-wrap' => 'text-align: {{VALUE}};',
                ],
            ]
        );

        $this->end_controls_section();

        // Content Section - Modal
        $this->start_controls_section(
            'modal_section',
            [
                'label' => __('Modal', 'wedocs'),
                'tab' => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'modal_placeholder',
            [
                'label' => __('Modal Search Placeholder', 'wedocs'),
                'type' => Controls_Manager::TEXT,
                'default' => __('Search documentation', 'wedocs'),
            ]
        );

        $this->add_control(
            'empty_message',
            [
                'label' => __('No Results Message', 'wedocs'),
                'type' => Controls_Manager::TEXT,
                'default' => __("Your search didn't match any documents", 'wedocs'),
            ]
        );

        $this->add_control(
            'blank_message',
            [
                'label' => __('Blank Search Message', 'wedocs'),
                'type' => Controls_Manager::TEXT,
                'default' => __('Search field cannot be blank', 'wedocs'),
            ]
        );

        $this->end_controls_section();

        // Style Section - Trigger
        $this->start_controls_section(
            'style_trigger',
            [
                'label' => __('Trigger', 'wedocs'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'trigger_bg',
            [
                'label' => __('Background Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#f8fafc',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-modal-trigger' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'trigger_text_color',
            [
                'label' => __('Text Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#94a3b8',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-modal-trigger' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'trigger_icon_color',
            [
                'label' => __('Icon Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#95a4b9',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-modal-trigger__icon' => 'color: {{VALUE}};',
                    '{{WRAPPER}} .wedocs-search-modal-trigger__icon svg' => 'fill: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'trigger_hover_bg',
            [
                'label' => __('Hover Background', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#f1f5f9',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-modal-trigger:hover' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'trigger_hover_border_color',
            [
                'label' => __('Hover Border Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#cbd5e1',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-modal-trigger:hover' => 'border-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Border::get_type(),
            [
                'name' => 'trigger_border',
                'selector' => '{{WRAPPER}} .wedocs-search-modal-trigger',
                'fields_options' => [
                    'border' => ['default' => 'solid'],
                    'width' => ['default' => ['top' => 1, 'right' => 1, 'bottom' => 1, 'left' => 1]],
                    'color' => ['default' => '#e2e8f0'],
                ],
            ]
        );

        $this->add_responsive_control(
            'trigger_border_radius',
            [
                'label' => __('Border Radius', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%'],
                'default' => ['top' => 8, 'right' => 8, 'bottom' => 8, 'left' => 8, 'unit' => 'px'],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-modal-trigger' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'trigger_padding',
            [
                'label' => __('Padding', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', 'em'],
                'default' => ['top' => 12, 'right' => 16, 'bottom' => 12, 'left' => 16, 'unit' => 'px'],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-modal-trigger' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Box_Shadow::get_type(),
            [
                'name' => 'trigger_shadow',
                'selector' => '{{WRAPPER}} .wedocs-search-modal-trigger',
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'trigger_typography',
                'selector' => '{{WRAPPER}} .wedocs-search-modal-trigger',
            ]
        );

        $this->add_responsive_control(
            'trigger_width',
            [
                'label' => __('Width', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'size_units' => ['px', '%'],
                'range' => [
                    'px' => ['min' => 100, 'max' => 800],
                    '%' => ['min' => 10, 'max' => 100],
                ],
                'default' => ['size' => 100, 'unit' => '%'],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-modal-trigger' => 'width: {{SIZE}}{{UNIT}};',
                ],
                'condition' => ['trigger_type' => 'input'],
            ]
        );

        $this->add_control(
            'shortcut_bg',
            [
                'label' => __('Shortcut Badge Background', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#e2e8f0',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-modal-trigger__shortcut' => 'background-color: {{VALUE}};',
                ],
                'condition' => ['show_shortcut' => 'yes'],
            ]
        );

        $this->add_control(
            'shortcut_text_color',
            [
                'label' => __('Shortcut Badge Text', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#64748b',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-modal-trigger__shortcut' => 'color: {{VALUE}};',
                ],
                'condition' => ['show_shortcut' => 'yes'],
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
            'modal_overlay_color',
            [
                'label' => __('Overlay Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => 'rgba(15, 23, 42, 0.6)',
            ]
        );

        $this->add_control(
            'modal_bg',
            [
                'label' => __('Modal Background', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#ffffff',
            ]
        );

        $this->add_responsive_control(
            'modal_width',
            [
                'label' => __('Modal Width', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'size_units' => ['px', '%'],
                'range' => [
                    'px' => ['min' => 400, 'max' => 900],
                    '%' => ['min' => 30, 'max' => 90],
                ],
                'default' => ['size' => 620, 'unit' => 'px'],
            ]
        );

        $this->add_responsive_control(
            'modal_border_radius',
            [
                'label' => __('Modal Border Radius', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px'],
                'default' => ['top' => 12, 'right' => 12, 'bottom' => 12, 'left' => 12, 'unit' => 'px'],
            ]
        );

        $this->add_control(
            'result_hover_color',
            [
                'label' => __('Result Hover Background', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#3B82F6',
            ]
        );

        $this->add_control(
            'result_icon_bg',
            [
                'label' => __('Result Icon Background', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#D9EBFF',
            ]
        );

        $this->add_control(
            'result_icon_color',
            [
                'label' => __('Result Icon Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#3B82F6',
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();

        $trigger_type = $settings['trigger_type'] ?? 'input';
        $show_shortcut = ($settings['show_shortcut'] ?? 'yes') === 'yes';
        $widget_id = $this->get_id();

        $modal_overlay = $settings['modal_overlay_color'] ?? 'rgba(15, 23, 42, 0.6)';
        $modal_bg = $settings['modal_bg'] ?? '#ffffff';
        $modal_width = ($settings['modal_width']['size'] ?? 620) . ($settings['modal_width']['unit'] ?? 'px');
        $modal_radius_top = $settings['modal_border_radius']['top'] ?? 12;
        $modal_radius_right = $settings['modal_border_radius']['right'] ?? 12;
        $modal_radius_bottom = $settings['modal_border_radius']['bottom'] ?? 12;
        $modal_radius_left = $settings['modal_border_radius']['left'] ?? 12;
        $modal_radius_unit = $settings['modal_border_radius']['unit'] ?? 'px';
        $modal_radius = "{$modal_radius_top}{$modal_radius_unit} {$modal_radius_right}{$modal_radius_unit} {$modal_radius_bottom}{$modal_radius_unit} {$modal_radius_left}{$modal_radius_unit}";

        $result_hover = $settings['result_hover_color'] ?? '#3B82F6';
        $result_icon_bg = $settings['result_icon_bg'] ?? '#D9EBFF';
        $result_icon_color = $settings['result_icon_color'] ?? '#3B82F6';
        ?>

        <div class="wedocs-search-modal-trigger-wrap">
            <?php if ($trigger_type === 'input'): ?>
                <div class="wedocs-search-modal-trigger wedocs-search-modal-trigger--input" data-modal-id="wedocs-sm-<?php echo esc_attr($widget_id); ?>">
                    <span class="wedocs-search-modal-trigger__icon">
                        <?php if (!empty($settings['trigger_icon']['value'])): ?>
                            <?php \Elementor\Icons_Manager::render_icon($settings['trigger_icon'], ['aria-hidden' => 'true']); ?>
                        <?php else: ?>
                            <svg width="15" height="16" fill="currentColor"><path fill-rule="evenodd" d="M11.856 10.847l2.883 2.883a.89.89 0 0 1 0 1.257c-.173.174-.401.261-.629.261s-.455-.087-.629-.261l-2.883-2.883c-1.144.874-2.532 1.353-3.996 1.353a6.56 6.56 0 0 1-4.671-1.935c-2.576-2.575-2.576-6.765 0-9.341C3.179.934 4.839.247 6.603.247s3.424.687 4.671 1.935a6.56 6.56 0 0 1 1.935 4.67 6.55 6.55 0 0 1-1.353 3.995zM3.189 3.439c-1.882 1.882-1.882 4.945 0 6.827.912.912 2.124 1.414 3.414 1.414s2.502-.502 3.414-1.414 1.414-2.124 1.414-3.413-.502-2.502-1.414-3.413-2.124-1.414-3.414-1.414-2.502.502-3.414 1.414z"/></svg>
                        <?php endif; ?>
                    </span>
                    <span class="wedocs-search-modal-trigger__text"><?php echo esc_html($settings['placeholder']); ?></span>
                    <?php if ($show_shortcut): ?>
                        <span class="wedocs-search-modal-trigger__shortcut">⌘K</span>
                    <?php endif; ?>
                </div>

            <?php elseif ($trigger_type === 'button'): ?>
                <button type="button" class="wedocs-search-modal-trigger wedocs-search-modal-trigger--button" data-modal-id="wedocs-sm-<?php echo esc_attr($widget_id); ?>">
                    <span class="wedocs-search-modal-trigger__icon">
                        <?php if (!empty($settings['trigger_icon']['value'])): ?>
                            <?php \Elementor\Icons_Manager::render_icon($settings['trigger_icon'], ['aria-hidden' => 'true']); ?>
                        <?php else: ?>
                            <svg width="15" height="16" fill="currentColor"><path fill-rule="evenodd" d="M11.856 10.847l2.883 2.883a.89.89 0 0 1 0 1.257c-.173.174-.401.261-.629.261s-.455-.087-.629-.261l-2.883-2.883c-1.144.874-2.532 1.353-3.996 1.353a6.56 6.56 0 0 1-4.671-1.935c-2.576-2.575-2.576-6.765 0-9.341C3.179.934 4.839.247 6.603.247s3.424.687 4.671 1.935a6.56 6.56 0 0 1 1.935 4.67 6.55 6.55 0 0 1-1.353 3.995zM3.189 3.439c-1.882 1.882-1.882 4.945 0 6.827.912.912 2.124 1.414 3.414 1.414s2.502-.502 3.414-1.414 1.414-2.124 1.414-3.413-.502-2.502-1.414-3.413-2.124-1.414-3.414-1.414-2.502.502-3.414 1.414z"/></svg>
                        <?php endif; ?>
                    </span>
                    <?php echo esc_html($settings['button_text']); ?>
                    <?php if ($show_shortcut): ?>
                        <span class="wedocs-search-modal-trigger__shortcut">⌘K</span>
                    <?php endif; ?>
                </button>

            <?php else: ?>
                <button type="button" class="wedocs-search-modal-trigger wedocs-search-modal-trigger--icon" data-modal-id="wedocs-sm-<?php echo esc_attr($widget_id); ?>" title="<?php esc_attr_e('Search documentation', 'wedocs'); ?>">
                    <span class="wedocs-search-modal-trigger__icon">
                        <?php if (!empty($settings['trigger_icon']['value'])): ?>
                            <?php \Elementor\Icons_Manager::render_icon($settings['trigger_icon'], ['aria-hidden' => 'true']); ?>
                        <?php else: ?>
                            <svg width="20" height="20" fill="currentColor"><path fill-rule="evenodd" d="M11.856 10.847l2.883 2.883a.89.89 0 0 1 0 1.257c-.173.174-.401.261-.629.261s-.455-.087-.629-.261l-2.883-2.883c-1.144.874-2.532 1.353-3.996 1.353a6.56 6.56 0 0 1-4.671-1.935c-2.576-2.575-2.576-6.765 0-9.341C3.179.934 4.839.247 6.603.247s3.424.687 4.671 1.935a6.56 6.56 0 0 1 1.935 4.67 6.55 6.55 0 0 1-1.353 3.995zM3.189 3.439c-1.882 1.882-1.882 4.945 0 6.827.912.912 2.124 1.414 3.414 1.414s2.502-.502 3.414-1.414 1.414-2.124 1.414-3.413-.502-2.502-1.414-3.413-2.124-1.414-3.414-1.414-2.502.502-3.414 1.414z"/></svg>
                        <?php endif; ?>
                    </span>
                </button>
            <?php endif; ?>
        </div>

        <!-- Search Modal -->
        <div class="wedocs-sm" id="wedocs-sm-<?php echo esc_attr($widget_id); ?>" style="display: none;">
            <div class="wedocs-sm__modal">
                <div class="wedocs-sm__header">
                    <label class="wedocs-sm__search-icon">
                        <svg width="20" height="20" viewBox="0 0 20 20"><path fill="none" stroke-width="2" stroke="#475569" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"></path></svg>
                    </label>
                    <div class="wedocs-sm__field">
                        <input type="text" class="wedocs-sm__input" placeholder="<?php echo esc_attr($settings['modal_placeholder']); ?>" autocomplete="off" />
                        <svg class="wedocs-sm__clear" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="display: none;"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </div>
                    <button type="button" class="wedocs-sm__cancel"><?php _e('ESC', 'wedocs'); ?></button>
                </div>
                <div class="wedocs-sm__body">
                    <div class="wedocs-sm__results">
                        <div class="wedocs-sm__empty"><?php echo esc_html($settings['blank_message']); ?></div>
                    </div>
                </div>
            </div>
        </div>

        <style>
            .wedocs-search-modal-trigger-wrap {
                width: 100%;
            }

            .wedocs-search-modal-trigger {
                display: inline-flex;
                align-items: center;
                gap: 10px;
                cursor: pointer;
                transition: all 0.2s ease;
                box-sizing: border-box;
            }

            .wedocs-search-modal-trigger--input {
                width: 100%;
            }

            .wedocs-search-modal-trigger--button {
                border: none;
                font-weight: 500;
            }

            .wedocs-search-modal-trigger--icon {
                border: none;
                justify-content: center;
            }

            .wedocs-search-modal-trigger__icon {
                display: flex;
                align-items: center;
                flex-shrink: 0;
            }

            .wedocs-search-modal-trigger__icon i,
            .wedocs-search-modal-trigger__icon svg {
                display: block;
            }

            .wedocs-search-modal-trigger__text {
                flex: 1;
            }

            .wedocs-search-modal-trigger__shortcut {
                font-size: 11px;
                padding: 2px 8px;
                border-radius: 4px;
                font-weight: 600;
                flex-shrink: 0;
                line-height: 1.4;
            }

            /* Modal */
            .wedocs-sm {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 999999;
                background: <?php echo esc_attr($modal_overlay); ?>;
                display: flex;
                align-items: flex-start;
                justify-content: center;
                padding-top: 12vh;
                box-sizing: border-box;
            }

            .wedocs-sm__modal {
                width: 100%;
                max-width: <?php echo esc_attr($modal_width); ?>;
                background: <?php echo esc_attr($modal_bg); ?>;
                border-radius: <?php echo esc_attr($modal_radius); ?>;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                overflow: hidden;
                max-height: 70vh;
                display: flex;
                flex-direction: column;
            }

            .wedocs-sm__header {
                display: flex;
                align-items: center;
                padding: 12px 16px;
                border-bottom: 1px solid #e2e8f0;
                gap: 12px;
            }

            .wedocs-sm__search-icon {
                flex-shrink: 0;
                display: flex;
            }

            .wedocs-sm__field {
                flex: 1;
                display: flex;
                align-items: center;
                position: relative;
            }

            .wedocs-sm__input {
                width: 100%;
                border: none;
                outline: none;
                font-size: 16px;
                background: transparent;
                color: #1e293b;
                padding: 4px 0;
            }

            .wedocs-sm__input::placeholder {
                color: #94a3b8;
            }

            .wedocs-sm__clear {
                width: 20px;
                height: 20px;
                cursor: pointer;
                color: #94a3b8;
                flex-shrink: 0;
            }

            .wedocs-sm__clear:hover {
                color: #475569;
            }

            .wedocs-sm__cancel {
                background: #f1f5f9;
                border: 1px solid #e2e8f0;
                border-radius: 4px;
                padding: 4px 10px;
                font-size: 12px;
                font-weight: 600;
                color: #64748b;
                cursor: pointer;
                flex-shrink: 0;
            }

            .wedocs-sm__cancel:hover {
                background: #e2e8f0;
            }

            .wedocs-sm__body {
                overflow-y: auto;
                padding: 8px;
            }

            .wedocs-sm__results {
                min-height: 60px;
            }

            .wedocs-sm__empty {
                text-align: center;
                padding: 20px;
                color: #94a3b8;
                font-size: 14px;
            }

            .wedocs-sm__list {
                list-style: none;
                margin: 0;
                padding: 0;
            }

            .wedocs-sm__hit {
                border-radius: 8px;
                overflow: hidden;
            }

            .wedocs-sm__hit a {
                display: flex;
                align-items: center;
                padding: 10px 12px;
                text-decoration: none;
                color: #1e293b;
                gap: 12px;
                border-radius: 8px;
                transition: background 0.15s ease;
            }

            .wedocs-sm__hit a:hover {
                background: <?php echo esc_attr($result_hover); ?>;
                color: #fff;
            }

            .wedocs-sm__hit a:hover .wedocs-sm__hit-icon {
                background: rgba(255, 255, 255, 0.2);
            }

            .wedocs-sm__hit a:hover .wedocs-sm__hit-icon svg path {
                stroke: #fff;
            }

            .wedocs-sm__hit a:hover .wedocs-sm__hit-breadcrumb {
                color: rgba(255, 255, 255, 0.7);
            }

            .wedocs-sm__hit-icon {
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 6px;
                flex-shrink: 0;
                background: <?php echo esc_attr($result_icon_bg); ?>;
            }

            .wedocs-sm__hit-icon svg path {
                stroke: <?php echo esc_attr($result_icon_color); ?>;
            }

            .wedocs-sm__hit-content {
                flex: 1;
                min-width: 0;
            }

            .wedocs-sm__hit-title {
                font-weight: 500;
                font-size: 14px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .wedocs-sm__hit-breadcrumb {
                font-size: 12px;
                color: #94a3b8;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-top: 2px;
            }

            @media (max-width: 640px) {
                .wedocs-sm {
                    padding: 5vh 12px 0;
                }

                .wedocs-sm__modal {
                    max-height: 80vh;
                }
            }
        </style>

        <script>
            (function($) {
                'use strict';

                var widgetId = '<?php echo esc_js($widget_id); ?>';
                var $trigger = $('[data-modal-id="wedocs-sm-' + widgetId + '"]');
                var $modal = $('#wedocs-sm-' + widgetId);
                var $input = $modal.find('.wedocs-sm__input');
                var $results = $modal.find('.wedocs-sm__results');
                var $clear = $modal.find('.wedocs-sm__clear');
                var allDocs = null;
                var emptyMsg = <?php echo wp_json_encode($settings['empty_message']); ?>;
                var blankMsg = <?php echo wp_json_encode($settings['blank_message']); ?>;

                // Load all docs
                $.ajax({
                    url: '<?php echo admin_url('admin-ajax.php'); ?>',
                    type: 'POST',
                    data: {
                        action: 'wedocs_get_docs',
                        _wpnonce: '<?php echo wp_create_nonce('wedocs-ajax'); ?>'
                    },
                    success: function(response) {
                        if (response?.data) {
                            allDocs = response.data;
                        }
                    }
                });

                // Open modal
                $trigger.on('click', function() {
                    openModal();
                });

                // Keyboard shortcut
                $(document).on('keydown', function(e) {
                    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                        e.preventDefault();
                        openModal();
                    }
                    if (e.key === 'Escape' && $modal.is(':visible')) {
                        closeModal();
                    }
                });

                // Close on backdrop
                $modal.on('click', function(e) {
                    if (!$(e.target).closest('.wedocs-sm__modal').length) {
                        closeModal();
                    }
                });

                $modal.find('.wedocs-sm__cancel').on('click', closeModal);

                // Search input
                $input.on('keyup', function() {
                    var val = $(this).val().trim();
                    $clear.toggle(val.length > 0);

                    if (!val) {
                        $results.html('<div class="wedocs-sm__empty">' + blankMsg + '</div>');
                        return;
                    }

                    var matches = searchDocs(val);
                    if (!matches.length) {
                        $results.html('<div class="wedocs-sm__empty">' + emptyMsg + '</div>');
                        return;
                    }

                    var html = '<ul class="wedocs-sm__list">';
                    matches.forEach(function(doc) {
                        var url = doc.article ? doc.article.permalink :
                                  (doc.section ? doc.section.permalink : doc.parent.permalink);
                        var title = doc.article ? doc.article.post_title :
                                    (doc.section ? doc.section.post_title : doc.parent.post_title);
                        var breadcrumb = '';
                        if (doc.parent) breadcrumb = doc.parent.post_title;
                        if (doc.section && doc.article) breadcrumb += ' › ' + doc.section.post_title;

                        html += '<li class="wedocs-sm__hit">' +
                            '<a href="' + url + '">' +
                                '<div class="wedocs-sm__hit-icon">' +
                                    '<svg width="12" height="18" viewBox="0 0 14 18" fill="none"><path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M4.49984 9H9.49984M4.49984 12.3333H9.49984M11.1665 16.5H2.83317C1.9127 16.5 1.1665 15.7538 1.1665 14.8333V3.16667C1.1665 2.24619 1.9127 1.5 2.83317 1.5H7.48799C7.70901 1.5 7.92097 1.5878 8.07725 1.74408L12.5891 6.25592C12.7454 6.4122 12.8332 6.62416 12.8332 6.84518V14.8333C12.8332 15.7538 12.087 16.5 11.1665 16.5Z"/></svg>' +
                                '</div>' +
                                '<div class="wedocs-sm__hit-content">' +
                                    '<div class="wedocs-sm__hit-title">' + escHtml(title) + '</div>' +
                                    (breadcrumb ? '<div class="wedocs-sm__hit-breadcrumb">' + escHtml(breadcrumb) + '</div>' : '') +
                                '</div>' +
                            '</a>' +
                        '</li>';
                    });
                    html += '</ul>';
                    $results.html(html);
                });

                // Clear
                $clear.on('click', function() {
                    $input.val('').focus();
                    $(this).hide();
                    $results.html('<div class="wedocs-sm__empty">' + blankMsg + '</div>');
                });

                function openModal() {
                    $modal.fadeIn(150);
                    $input.val('').focus();
                    $clear.hide();
                    $results.html('<div class="wedocs-sm__empty">' + blankMsg + '</div>');
                    $('body').css('overflow', 'hidden');
                }

                function closeModal() {
                    $modal.fadeOut(150);
                    $('body').css('overflow', '');
                }

                function searchDocs(query) {
                    if (!allDocs || !allDocs.all_docs) return [];
                    var results = [];
                    var q = query.toLowerCase();

                    allDocs.all_docs.forEach(function(doc) {
                        if (doc.post_status !== 'publish') return;
                        if (!doc.post_title.toLowerCase().includes(q)) return;

                        var obj = {};
                        if (doc.post_parent === 0) {
                            obj.parent = doc;
                        } else if (allDocs.sections) {
                            var isSection = allDocs.sections.find(function(s) { return s.ID === doc.ID; });
                            if (isSection) {
                                obj.section = doc;
                                obj.parent = allDocs.parents ? allDocs.parents.find(function(p) { return p.ID === doc.post_parent; }) : null;
                            }
                        }

                        if (!obj.section && !obj.parent && allDocs.articles) {
                            var isArticle = allDocs.articles.find(function(a) { return a.ID === doc.ID; });
                            if (isArticle) {
                                obj.article = doc;
                                obj.section = allDocs.sections ? allDocs.sections.find(function(s) { return s.ID === doc.post_parent; }) : null;
                                obj.parent = (obj.section && allDocs.parents) ? allDocs.parents.find(function(p) { return p.ID === obj.section.post_parent; }) : null;
                            }
                        }

                        results.push(obj);
                    });

                    return results.slice(0, 20);
                }

                function escHtml(str) {
                    var div = document.createElement('div');
                    div.textContent = str || '';
                    return div.innerHTML;
                }
            })(jQuery);
        </script>
    <?php
    }

    protected function content_template() {
    ?>
        <#
        var triggerType = settings.trigger_type || 'input';
        var showShortcut = settings.show_shortcut === 'yes';
        #>

        <div class="wedocs-search-modal-trigger-wrap">
            <# if (triggerType === 'input') { #>
                <div class="wedocs-search-modal-trigger wedocs-search-modal-trigger--input" style="display: inline-flex; align-items: center; gap: 10px; width: 100%; cursor: pointer; background: {{ settings.trigger_bg || '#f8fafc' }}; color: {{ settings.trigger_text_color || '#94a3b8' }}; border: 1px solid {{ settings.trigger_border_color || '#e2e8f0' }}; border-radius: 8px; padding: 12px 16px; box-sizing: border-box;">
                    <span class="wedocs-search-modal-trigger__icon" style="display: flex; color: {{ settings.trigger_icon_color || '#95a4b9' }};">
                        <# if (settings.trigger_icon && settings.trigger_icon.value) {
                            var iconHTML = elementor.helpers.renderIcon(view, settings.trigger_icon, { 'aria-hidden': true }, 'i', 'object');
                            if (iconHTML && iconHTML.rendered) { #>
                                {{{ iconHTML.value }}}
                            <# } else { #>
                                <i class="{{ settings.trigger_icon.value }}"></i>
                            <# }
                        } else { #>
                            <svg width="15" height="16" fill="currentColor"><path fill-rule="evenodd" d="M11.856 10.847l2.883 2.883a.89.89 0 0 1 0 1.257c-.173.174-.401.261-.629.261s-.455-.087-.629-.261l-2.883-2.883c-1.144.874-2.532 1.353-3.996 1.353a6.56 6.56 0 0 1-4.671-1.935c-2.576-2.575-2.576-6.765 0-9.341C3.179.934 4.839.247 6.603.247s3.424.687 4.671 1.935a6.56 6.56 0 0 1 1.935 4.67 6.55 6.55 0 0 1-1.353 3.995zM3.189 3.439c-1.882 1.882-1.882 4.945 0 6.827.912.912 2.124 1.414 3.414 1.414s2.502-.502 3.414-1.414 1.414-2.124 1.414-3.413-.502-2.502-1.414-3.413-2.124-1.414-3.414-1.414-2.502.502-3.414 1.414z"/></svg>
                        <# } #>
                    </span>
                    <span style="flex: 1;">{{ settings.placeholder || 'Search documentation...' }}</span>
                    <# if (showShortcut) { #>
                        <span class="wedocs-search-modal-trigger__shortcut" style="font-size: 11px; padding: 2px 8px; border-radius: 4px; background: {{ settings.shortcut_bg || '#e2e8f0' }}; color: {{ settings.shortcut_text_color || '#64748b' }}; font-weight: 600;">⌘K</span>
                    <# } #>
                </div>

            <# } else if (triggerType === 'button') { #>
                <button type="button" class="wedocs-search-modal-trigger wedocs-search-modal-trigger--button" style="display: inline-flex; align-items: center; gap: 10px; cursor: pointer; background: {{ settings.trigger_bg || '#f8fafc' }}; color: {{ settings.trigger_text_color || '#94a3b8' }}; border: 1px solid {{ settings.trigger_border_color || '#e2e8f0' }}; border-radius: 8px; padding: 12px 16px; font-weight: 500;">
                    <span class="wedocs-search-modal-trigger__icon" style="display: flex; color: {{ settings.trigger_icon_color || '#95a4b9' }};">
                        <# if (settings.trigger_icon && settings.trigger_icon.value) {
                            var iconHTML = elementor.helpers.renderIcon(view, settings.trigger_icon, { 'aria-hidden': true }, 'i', 'object');
                            if (iconHTML && iconHTML.rendered) { #>
                                {{{ iconHTML.value }}}
                            <# } else { #>
                                <i class="{{ settings.trigger_icon.value }}"></i>
                            <# }
                        } else { #>
                            <svg width="15" height="16" fill="currentColor"><path fill-rule="evenodd" d="M11.856 10.847l2.883 2.883a.89.89 0 0 1 0 1.257c-.173.174-.401.261-.629.261s-.455-.087-.629-.261l-2.883-2.883c-1.144.874-2.532 1.353-3.996 1.353a6.56 6.56 0 0 1-4.671-1.935c-2.576-2.575-2.576-6.765 0-9.341C3.179.934 4.839.247 6.603.247s3.424.687 4.671 1.935a6.56 6.56 0 0 1 1.935 4.67 6.55 6.55 0 0 1-1.353 3.995zM3.189 3.439c-1.882 1.882-1.882 4.945 0 6.827.912.912 2.124 1.414 3.414 1.414s2.502-.502 3.414-1.414 1.414-2.124 1.414-3.413-.502-2.502-1.414-3.413-2.124-1.414-3.414-1.414-2.502.502-3.414 1.414z"/></svg>
                        <# } #>
                    </span>
                    {{ settings.button_text || 'Search Docs' }}
                    <# if (showShortcut) { #>
                        <span class="wedocs-search-modal-trigger__shortcut" style="font-size: 11px; padding: 2px 8px; border-radius: 4px; background: {{ settings.shortcut_bg || '#e2e8f0' }}; color: {{ settings.shortcut_text_color || '#64748b' }}; font-weight: 600;">⌘K</span>
                    <# } #>
                </button>

            <# } else { #>
                <button type="button" class="wedocs-search-modal-trigger wedocs-search-modal-trigger--icon" style="display: inline-flex; align-items: center; justify-content: center; cursor: pointer; background: {{ settings.trigger_bg || '#f8fafc' }}; color: {{ settings.trigger_icon_color || '#95a4b9' }}; border: 1px solid {{ settings.trigger_border_color || '#e2e8f0' }}; border-radius: 8px; padding: 12px 16px;">
                    <# if (settings.trigger_icon && settings.trigger_icon.value) {
                        var iconHTML = elementor.helpers.renderIcon(view, settings.trigger_icon, { 'aria-hidden': true }, 'i', 'object');
                        if (iconHTML && iconHTML.rendered) { #>
                            {{{ iconHTML.value }}}
                        <# } else { #>
                            <i class="{{ settings.trigger_icon.value }}"></i>
                        <# }
                    } else { #>
                        <svg width="20" height="20" fill="currentColor"><path fill-rule="evenodd" d="M11.856 10.847l2.883 2.883a.89.89 0 0 1 0 1.257c-.173.174-.401.261-.629.261s-.455-.087-.629-.261l-2.883-2.883c-1.144.874-2.532 1.353-3.996 1.353a6.56 6.56 0 0 1-4.671-1.935c-2.576-2.575-2.576-6.765 0-9.341C3.179.934 4.839.247 6.603.247s3.424.687 4.671 1.935a6.56 6.56 0 0 1 1.935 4.67 6.55 6.55 0 0 1-1.353 3.995zM3.189 3.439c-1.882 1.882-1.882 4.945 0 6.827.912.912 2.124 1.414 3.414 1.414s2.502-.502 3.414-1.414 1.414-2.124 1.414-3.413-.502-2.502-1.414-3.413-2.124-1.414-3.414-1.414-2.502.502-3.414 1.414z"/></svg>
                    <# } #>
                </button>
            <# } #>
        </div>
    <?php
    }
}
