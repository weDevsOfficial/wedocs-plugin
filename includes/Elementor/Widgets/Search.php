<?php

namespace WeDevs\WeDocs\Elementor\Widgets;

use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Box_Shadow;
use Elementor\Core\Schemes\Typography;
use Elementor\Core\Schemes\Color;

/**
 * WeDocs Search Widget for Elementor
 */
class Search extends Widget_Base {

    /**
     * Get widget name.
     */
    public function get_name() {
        return 'wedocs-search';
    }

    /**
     * Get widget title.
     */
    public function get_title() {
        return __('weDocs Search', 'wedocs');
    }

    /**
     * Get widget icon.
     */
    public function get_icon() {
        return 'eicon-search';
    }

    /**
     * Get widget categories.
     */
    public function get_categories() {
        return ['wedocs-category'];
    }

    /**
     * Get widget keywords.
     */
    public function get_keywords() {
        return ['search', 'wedocs', 'documentation', 'find'];
    }

    /**
     * Register widget controls.
     */
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
            'hideSearch',
            [
                'label' => __('Hide Search', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => __('Yes', 'wedocs'),
                'label_off' => __('No', 'wedocs'),
                'return_value' => 'yes',
                'default' => '',
            ]
        );

        $this->add_control(
            'placeholder',
            [
                'label' => __('Placeholder Text', 'wedocs'),
                'type' => Controls_Manager::TEXT,
                'default' => __('Search for a topic or question', 'wedocs'),
                'placeholder' => __('Enter placeholder text', 'wedocs'),
            ]
        );

        $this->add_control(
            'alignment',
            [
                'label' => __('Alignment', 'wedocs'),
                'type' => Controls_Manager::CHOOSE,
                'options' => [
                    'left' => [
                        'title' => __('Left', 'wedocs'),
                        'icon' => 'eicon-text-align-left',
                    ],
                    'center' => [
                        'title' => __('Center', 'wedocs'),
                        'icon' => 'eicon-text-align-center',
                    ],
                    'right' => [
                        'title' => __('Right', 'wedocs'),
                        'icon' => 'eicon-text-align-right',
                    ],
                ],
                'default' => 'right',
                'toggle' => true,
            ]
        );

        $this->add_control(
            'icon_heading',
            [
                'label' => __('Button Icon', 'wedocs'),
                'type' => Controls_Manager::HEADING,
                'separator' => 'before',
            ]
        );

        $this->add_control(
            'button_icon',
            [
                'label' => __('Icon', 'wedocs'),
                'type' => Controls_Manager::ICONS,
                'default' => [
                    'value' => 'fas fa-search',
                    'library' => 'fa-solid',
                ],
                'recommended' => [
                    'fa-solid' => [
                        'search',
                        'search-plus',
                        'search-minus',
                        'magnifying-glass',
                    ],
                    'fa-regular' => [
                        'search',
                    ],
                ],
            ]
        );

        $this->add_control(
            'icon_position',
            [
                'label' => __('Icon Position', 'wedocs'),
                'type' => Controls_Manager::CHOOSE,
                'options' => [
                    'left' => [
                        'title' => __('Left', 'wedocs'),
                        'icon' => 'eicon-h-align-left',
                    ],
                    'right' => [
                        'title' => __('Right', 'wedocs'),
                        'icon' => 'eicon-h-align-right',
                    ],
                ],
                'default' => 'right',
                'toggle' => false,
            ]
        );

        $this->end_controls_section();

        // Style Section - Search Box
        $this->start_controls_section(
            'style_search_box',
            [
                'label' => __('Input Field', 'wedocs'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_responsive_control(
            'searchWidth',
            [
                'label' => __('Width', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'size_units' => ['px', '%', 'vw'],
                'range' => [
                    'px' => [
                        'min' => 200,
                        'max' => 1200,
                        'step' => 1,
                    ],
                    '%' => [
                        'min' => 10,
                        'max' => 100,
                    ],
                    'vw' => [
                        'min' => 10,
                        'max' => 100,
                    ],
                ],
                'default' => [
                    'unit' => '%',
                    'size' => 50,
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-wrap' => 'width: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'inputHeight',
            [
                'label' => __('Height', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'size_units' => ['px', 'em'],
                'range' => [
                    'px' => [
                        'min' => 30,
                        'max' => 100,
                        'step' => 1,
                    ],
                    'em' => [
                        'min' => 2,
                        'max' => 10,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-input' => 'height: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->start_controls_tabs('input_style_tabs');

        // Normal Tab
        $this->start_controls_tab(
            'input_normal_tab',
            [
                'label' => __('Normal', 'wedocs'),
            ]
        );

        $this->add_control(
            'bgColor',
            [
                'label' => __('Background Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#FFFFFF',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-input' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'textColor',
            [
                'label' => __('Text Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#333333',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-input' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'placeholderColor',
            [
                'label' => __('Placeholder Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#999999',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-input::placeholder' => 'color: {{VALUE}};',
                    '{{WRAPPER}} .wedocs-search-input::-webkit-input-placeholder' => 'color: {{VALUE}};',
                    '{{WRAPPER}} .wedocs-search-input::-moz-placeholder' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Box_Shadow::get_type(),
            [
                'name' => 'input_box_shadow',
                'label' => __('Box Shadow', 'wedocs'),
                'selector' => '{{WRAPPER}} .wedocs-search-input',
            ]
        );

        $this->end_controls_tab();

        // Hover Tab
        $this->start_controls_tab(
            'input_hover_tab',
            [
                'label' => __('Hover', 'wedocs'),
            ]
        );

        $this->add_control(
            'hoverColor',
            [
                'label' => __('Background Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-input:hover' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'hoverTextColor',
            [
                'label' => __('Text Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-input:hover' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'hoverBorderColor',
            [
                'label' => __('Border Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-input:hover' => 'border-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Box_Shadow::get_type(),
            [
                'name' => 'input_hover_box_shadow',
                'label' => __('Box Shadow', 'wedocs'),
                'selector' => '{{WRAPPER}} .wedocs-search-input:hover',
            ]
        );

        $this->end_controls_tab();

        // Focus Tab
        $this->start_controls_tab(
            'input_focus_tab',
            [
                'label' => __('Focus', 'wedocs'),
            ]
        );

        $this->add_control(
            'focusBgColor',
            [
                'label' => __('Background Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-input:focus' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'focusTextColor',
            [
                'label' => __('Text Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-input:focus' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'focusBorderColor',
            [
                'label' => __('Border Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#3b82f6',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-input:focus' => 'border-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Box_Shadow::get_type(),
            [
                'name' => 'input_focus_box_shadow',
                'label' => __('Box Shadow', 'wedocs'),
                'selector' => '{{WRAPPER}} .wedocs-search-input:focus',
            ]
        );

        $this->end_controls_tab();

        $this->end_controls_tabs();

        $this->add_control(
            'typography_heading',
            [
                'label' => __('Typography', 'wedocs'),
                'type' => Controls_Manager::HEADING,
                'separator' => 'before',
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'input_typography',
                'label' => __('Typography', 'wedocs'),
                'selector' => '{{WRAPPER}} .wedocs-search-input',
            ]
        );

        $this->add_control(
            'spacing_heading',
            [
                'label' => __('Spacing', 'wedocs'),
                'type' => Controls_Manager::HEADING,
                'separator' => 'before',
            ]
        );

        $this->add_responsive_control(
            'padding',
            [
                'label' => __('Padding', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%', 'em'],
                'default' => [
                    'top' => 14,
                    'right' => 22,
                    'bottom' => 14,
                    'left' => 22,
                    'unit' => 'px',
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-input' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'margin',
            [
                'label' => __('Margin', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%', 'em'],
                'default' => [
                    'top' => 0,
                    'right' => 0,
                    'bottom' => 0,
                    'left' => 0,
                    'unit' => 'px',
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-wrap' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'border_heading',
            [
                'label' => __('Border', 'wedocs'),
                'type' => Controls_Manager::HEADING,
                'separator' => 'before',
            ]
        );

        $this->add_group_control(
            Group_Control_Border::get_type(),
            [
                'name' => 'border',
                'label' => __('Border', 'wedocs'),
                'selector' => '{{WRAPPER}} .wedocs-search-input',
                'fields_options' => [
                    'border' => [
                        'default' => 'solid',
                    ],
                    'width' => [
                        'default' => [
                            'top' => 1,
                            'right' => 1,
                            'bottom' => 1,
                            'left' => 1,
                        ],
                    ],
                    'color' => [
                        'default' => '#cccccc',
                    ],
                ],
            ]
        );

        $this->add_responsive_control(
            'borderRadius',
            [
                'label' => __('Border Radius', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%', 'em'],
                'default' => [
                    'top' => 30,
                    'right' => 30,
                    'bottom' => 30,
                    'left' => 30,
                    'unit' => 'px',
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-input' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'transition_heading',
            [
                'label' => __('Transition', 'wedocs'),
                'type' => Controls_Manager::HEADING,
                'separator' => 'before',
            ]
        );

        $this->add_control(
            'transitionDuration',
            [
                'label' => __('Transition Duration (ms)', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 1000,
                        'step' => 50,
                    ],
                ],
                'default' => [
                    'size' => 300,
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-input' => 'transition: all {{SIZE}}ms ease;',
                ],
            ]
        );

        $this->end_controls_section();

        // Style Section - Search Button
        $this->start_controls_section(
            'style_search_button',
            [
                'label' => __('Search Button', 'wedocs'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_responsive_control(
            'iconSize',
            [
                'label' => __('Icon Size', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'size_units' => ['px', 'em'],
                'range' => [
                    'px' => [
                        'min' => 10,
                        'max' => 50,
                        'step' => 1,
                    ],
                    'em' => [
                        'min' => 0.5,
                        'max' => 5,
                    ],
                ],
                'default' => [
                    'size' => 16,
                    'unit' => 'px',
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-btn svg' => 'width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}};',
                    '{{WRAPPER}} .wedocs-search-btn i' => 'font-size: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->start_controls_tabs('button_style_tabs');

        // Normal Tab
        $this->start_controls_tab(
            'button_normal_tab',
            [
                'label' => __('Normal', 'wedocs'),
            ]
        );

        $this->add_control(
            'iconColor',
            [
                'label' => __('Icon Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#FFFFFF',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-btn svg' => 'fill: {{VALUE}};',
                    '{{WRAPPER}} .wedocs-search-btn svg path' => 'stroke: {{VALUE}};',
                    '{{WRAPPER}} .wedocs-search-btn i' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'iconBgColor',
            [
                'label' => __('Background Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#3b82f6',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-btn' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Box_Shadow::get_type(),
            [
                'name' => 'button_box_shadow',
                'label' => __('Box Shadow', 'wedocs'),
                'selector' => '{{WRAPPER}} .wedocs-search-btn',
            ]
        );

        $this->end_controls_tab();

        // Hover Tab
        $this->start_controls_tab(
            'button_hover_tab',
            [
                'label' => __('Hover', 'wedocs'),
            ]
        );

        $this->add_control(
            'svgHoverColor',
            [
                'label' => __('Icon Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#FFFFFF',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-btn:hover svg' => 'fill: {{VALUE}};',
                    '{{WRAPPER}} .wedocs-search-btn:hover svg path' => 'stroke: {{VALUE}};',
                    '{{WRAPPER}} .wedocs-search-btn:hover i' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'iconHoverColor',
            [
                'label' => __('Background Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#2563eb',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-btn:hover' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'buttonHoverTransform',
            [
                'label' => __('Hover Transform', 'wedocs'),
                'type' => Controls_Manager::SELECT,
                'default' => 'none',
                'options' => [
                    'none' => __('None', 'wedocs'),
                    'scale' => __('Scale', 'wedocs'),
                    'translateY' => __('Translate Y', 'wedocs'),
                    'rotate' => __('Rotate', 'wedocs'),
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Box_Shadow::get_type(),
            [
                'name' => 'button_hover_box_shadow',
                'label' => __('Box Shadow', 'wedocs'),
                'selector' => '{{WRAPPER}} .wedocs-search-btn:hover',
            ]
        );

        $this->end_controls_tab();

        // Focus Tab
        $this->start_controls_tab(
            'button_focus_tab',
            [
                'label' => __('Focus', 'wedocs'),
            ]
        );

        $this->add_control(
            'focusIconColor',
            [
                'label' => __('Icon Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-btn:focus svg' => 'fill: {{VALUE}};',
                    '{{WRAPPER}} .wedocs-search-btn:focus svg path' => 'stroke: {{VALUE}};',
                    '{{WRAPPER}} .wedocs-search-btn:focus i' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'focusButtonBgColor',
            [
                'label' => __('Background Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-btn:focus' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Box_Shadow::get_type(),
            [
                'name' => 'button_focus_box_shadow',
                'label' => __('Box Shadow', 'wedocs'),
                'selector' => '{{WRAPPER}} .wedocs-search-btn:focus',
            ]
        );

        $this->end_controls_tab();

        $this->end_controls_tabs();

        $this->add_control(
            'button_spacing_heading',
            [
                'label' => __('Spacing', 'wedocs'),
                'type' => Controls_Manager::HEADING,
                'separator' => 'before',
            ]
        );

        $this->add_responsive_control(
            'btnPadding',
            [
                'label' => __('Padding', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%', 'em'],
                'default' => [
                    'top' => 24,
                    'right' => 26,
                    'bottom' => 24,
                    'left' => 26,
                    'unit' => 'px',
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-btn' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'btnMargin',
            [
                'label' => __('Margin', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%', 'em'],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-btn' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'button_border_heading',
            [
                'label' => __('Border', 'wedocs'),
                'type' => Controls_Manager::HEADING,
                'separator' => 'before',
            ]
        );

        $this->add_group_control(
            Group_Control_Border::get_type(),
            [
                'name' => 'btnBorder',
                'label' => __('Border', 'wedocs'),
                'selector' => '{{WRAPPER}} .wedocs-search-btn',
            ]
        );

        $this->add_responsive_control(
            'btnRadius',
            [
                'label' => __('Border Radius', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%', 'em'],
                'default' => [
                    'top' => 30,
                    'right' => 30,
                    'bottom' => 30,
                    'left' => 30,
                    'unit' => 'px',
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-btn' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'button_transition_heading',
            [
                'label' => __('Transition', 'wedocs'),
                'type' => Controls_Manager::HEADING,
                'separator' => 'before',
            ]
        );

        $this->add_control(
            'btnTransitionDuration',
            [
                'label' => __('Transition Duration (ms)', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 1000,
                        'step' => 50,
                    ],
                ],
                'default' => [
                    'size' => 300,
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-btn' => 'transition: all {{SIZE}}ms ease;',
                    '{{WRAPPER}} .wedocs-search-btn svg' => 'transition: all {{SIZE}}ms ease;',
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
            'containerBgColor',
            [
                'label' => __('Background Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-wrap' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'containerPadding',
            [
                'label' => __('Padding', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%', 'em'],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-wrap' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Border::get_type(),
            [
                'name' => 'containerBorder',
                'label' => __('Border', 'wedocs'),
                'selector' => '{{WRAPPER}} .wedocs-search-wrap',
            ]
        );

        $this->add_responsive_control(
            'containerBorderRadius',
            [
                'label' => __('Border Radius', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%', 'em'],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-wrap' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Box_Shadow::get_type(),
            [
                'name' => 'container_box_shadow',
                'label' => __('Box Shadow', 'wedocs'),
                'selector' => '{{WRAPPER}} .wedocs-search-wrap',
            ]
        );

        $this->add_responsive_control(
            'containerGap',
            [
                'label' => __('Gap Between Input & Button', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'size_units' => ['px'],
                'range' => [
                    'px' => [
                        'min' => -10,
                        'max' => 50,
                        'step' => 1,
                    ],
                ],
                'default' => [
                    'size' => -1,
                    'unit' => 'px',
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-container' => 'gap: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->end_controls_section();
    }

    /**
     * Render widget output on the frontend.
     */
    protected function render() {
        $settings = $this->get_settings_for_display();

        if ($settings['hideSearch'] === 'yes') {
            return;
        }

        $alignment_class = 'wedocs-search-' . esc_attr($settings['alignment']);
        $icon_position = $settings['icon_position'] ?? 'right';
        $container_class = 'wedocs-search-container wedocs-icon-' . esc_attr($icon_position);
?>
        <div class="wedocs-search-wrap <?php echo esc_attr($alignment_class); ?>">
            <div class="wedocs-search-form">
                <form role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>">
                    <div class="<?php echo esc_attr($container_class); ?>">
                        <?php if ($icon_position === 'left'): ?>
                            <button type="submit" class="wedocs-search-btn">
                                <?php
                                if (isset($settings['button_icon']) && !empty($settings['button_icon']['value'])) {
                                    \Elementor\Icons_Manager::render_icon($settings['button_icon'], ['aria-hidden' => 'true']);
                                } else {
                                    // Fallback SVG
                                ?>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.25 12.5C10.1495 12.5 12.5 10.1495 12.5 7.25C12.5 4.35051 10.1495 2 7.25 2C4.35051 2 2 4.35051 2 7.25C2 10.1495 4.35051 12.5 7.25 12.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M11.0625 11.0625L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                <?php
                                }
                                ?>
                            </button>
                        <?php endif; ?>

                        <input
                            type="search"
                            class="wedocs-search-input"
                            placeholder="<?php echo esc_attr($settings['placeholder']); ?>"
                            value="<?php echo get_search_query(); ?>"
                            name="s"
                            title="<?php echo esc_attr($settings['placeholder']); ?>" />
                        <input type="hidden" name="post_type" value="docs" />

                        <?php if ($icon_position === 'right'): ?>
                            <button type="submit" class="wedocs-search-btn">
                                <?php
                                if (isset($settings['button_icon']) && !empty($settings['button_icon']['value'])) {
                                    \Elementor\Icons_Manager::render_icon($settings['button_icon'], ['aria-hidden' => 'true']);
                                } else {
                                    // Fallback SVG
                                ?>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.25 12.5C10.1495 12.5 12.5 10.1495 12.5 7.25C12.5 4.35051 10.1495 2 7.25 2C4.35051 2 2 4.35051 2 7.25C2 10.1495 4.35051 12.5 7.25 12.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M11.0625 11.0625L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                <?php
                                }
                                ?>
                            </button>
                        <?php endif; ?>
                    </div>
                </form>
            </div>
        </div>

        <style>
            .wedocs-search-wrap {
                margin: 0 auto;
            }

            .wedocs-search-left {
                text-align: left;
            }

            .wedocs-search-center {
                text-align: center;
            }

            .wedocs-search-right {
                text-align: right;
            }

            .wedocs-search-form {
                display: inline-block;
                width: 100%;
            }

            .wedocs-search-container {
                display: flex;
                align-items: stretch;
                position: relative;
                max-width: 100%;
            }

            .wedocs-search-input {
                flex: 1;
                outline: none;
                box-sizing: border-box;
            }

            .wedocs-search-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                border: none;
                cursor: pointer;
            }

            .wedocs-search-btn i,
            .wedocs-search-btn svg {
                display: block;
            }

            .wedocs-search-btn svg path {
                stroke: currentColor;
            }

            <?php if (!empty($settings['buttonHoverTransform'])): ?><?php if ($settings['buttonHoverTransform'] === 'scale'): ?>.wedocs-search-btn:hover {
                transform: scale(1.05);
            }

            <?php elseif ($settings['buttonHoverTransform'] === 'translateY'): ?>.wedocs-search-btn:hover {
                transform: translateY(-2px);
            }

            <?php elseif ($settings['buttonHoverTransform'] === 'rotate'): ?>.wedocs-search-btn:hover i,
            .wedocs-search-btn:hover svg {
                transform: rotate(15deg);
            }

            <?php endif; ?><?php endif; ?>
        </style>
    <?php
    }

    /**
     * Render widget output in the editor.
     */
    protected function content_template() {
    ?>
        <# if ( settings.hideSearch !=='yes' ) {
            var iconPosition=settings.icon_position || 'right' ;
            var containerClass='wedocs-search-container wedocs-icon-' + iconPosition;
            #>
            <div class="wedocs-search-wrap wedocs-search-{{{ settings.alignment }}}">
                <div class="wedocs-search-form">
                    <div class="{{{ containerClass }}}">
                        <# if (iconPosition==='left' ) { #>
                            <button type="button" class="wedocs-search-btn" style="
                                background-color: {{{ settings.iconBgColor || '#3b82f6' }}};
                                border-radius: {{{ settings.btnRadius.top || '30' }}}{{{ settings.btnRadius.unit || 'px' }}} {{{ settings.btnRadius.right || '30' }}}{{{ settings.btnRadius.unit || 'px' }}} {{{ settings.btnRadius.bottom || '30' }}}{{{ settings.btnRadius.unit || 'px' }}} {{{ settings.btnRadius.left || '30' }}}{{{ settings.btnRadius.unit || 'px' }}};
                                padding: {{{ settings.btnPadding.top || '24' }}}{{{ settings.btnPadding.unit || 'px' }}} {{{ settings.btnPadding.right || '26' }}}{{{ settings.btnPadding.unit || 'px' }}} {{{ settings.btnPadding.bottom || '24' }}}{{{ settings.btnPadding.unit || 'px' }}} {{{ settings.btnPadding.left || '26' }}}{{{ settings.btnPadding.unit || 'px' }}};
                            ">
                                <# if (settings.button_icon && settings.button_icon.value) { #>
                                    <# if (settings.button_icon.library==='svg' ) { #>
                                        {{{ settings.button_icon.value.url ? '<img src="' + settings.button_icon.value.url + '" />' : settings.button_icon.value }}}
                                        <# } else { #>
                                            <i class="{{{ settings.button_icon.value }}}" aria-hidden="true" style="font-size: {{{ settings.iconSize.size || '16' }}}{{{ settings.iconSize.unit || 'px' }}}; color: {{{ settings.iconColor || '#FFFFFF' }}};"></i>
                                            <# } #>
                                                <# } else { #>
                                                    <svg width="{{{ settings.iconSize.size || '16' }}}" height="{{{ settings.iconSize.size || '16' }}}" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="fill: {{{ settings.iconColor || '#FFFFFF' }}};">
                                                        <path d="M7.25 12.5C10.1495 12.5 12.5 10.1495 12.5 7.25C12.5 4.35051 10.1495 2 7.25 2C4.35051 2 2 4.35051 2 7.25C2 10.1495 4.35051 12.5 7.25 12.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M11.0625 11.0625L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                    <# } #>
                            </button>
                            <# } #>

                                <input
                                    type="search"
                                    class="wedocs-search-input"
                                    placeholder="{{{ settings.placeholder }}}"
                                    title="{{{ settings.placeholder }}}"
                                    style="
                                background-color: {{{ settings.bgColor || '#FFFFFF' }}};
                                color: {{{ settings.textColor || '#333333' }}};
                                border: {{{ settings.border_border || 'solid' }}} {{{ settings.border_width ? settings.border_width.top : '1' }}}px {{{ settings.border_color || '#cccccc' }}};
                                border-radius: {{{ settings.borderRadius.top || '30' }}}{{{ settings.borderRadius.unit || 'px' }}} {{{ settings.borderRadius.right || '30' }}}{{{ settings.borderRadius.unit || 'px' }}} {{{ settings.borderRadius.bottom || '30' }}}{{{ settings.borderRadius.unit || 'px' }}} {{{ settings.borderRadius.left || '30' }}}{{{ settings.borderRadius.unit || 'px' }}};
                                padding: {{{ settings.padding.top || '14' }}}{{{ settings.padding.unit || 'px' }}} {{{ settings.padding.right || '22' }}}{{{ settings.padding.unit || 'px' }}} {{{ settings.padding.bottom || '14' }}}{{{ settings.padding.unit || 'px' }}} {{{ settings.padding.left || '22' }}}{{{ settings.padding.unit || 'px' }}};
                            " />

                                <# if (iconPosition==='right' ) { #>
                                    <button type="button" class="wedocs-search-btn" style="
                                background-color: {{{ settings.iconBgColor || '#3b82f6' }}};
                                border-radius: {{{ settings.btnRadius.top || '30' }}}{{{ settings.btnRadius.unit || 'px' }}} {{{ settings.btnRadius.right || '30' }}}{{{ settings.btnRadius.unit || 'px' }}} {{{ settings.btnRadius.bottom || '30' }}}{{{ settings.btnRadius.unit || 'px' }}} {{{ settings.btnRadius.left || '30' }}}{{{ settings.btnRadius.unit || 'px' }}};
                                padding: {{{ settings.btnPadding.top || '24' }}}{{{ settings.btnPadding.unit || 'px' }}} {{{ settings.btnPadding.right || '26' }}}{{{ settings.btnPadding.unit || 'px' }}} {{{ settings.btnPadding.bottom || '24' }}}{{{ settings.btnPadding.unit || 'px' }}} {{{ settings.btnPadding.left || '26' }}}{{{ settings.btnPadding.unit || 'px' }}};
                            ">
                                        <# if (settings.button_icon && settings.button_icon.value) { #>
                                            <# if (settings.button_icon.library==='svg' ) { #>
                                                {{{ settings.button_icon.value.url ? '<img src="' + settings.button_icon.value.url + '" />' : settings.button_icon.value }}}
                                                <# } else { #>
                                                    <i class="{{{ settings.button_icon.value }}}" aria-hidden="true" style="font-size: {{{ settings.iconSize.size || '16' }}}{{{ settings.iconSize.unit || 'px' }}}; color: {{{ settings.iconColor || '#FFFFFF' }}};"></i>
                                                    <# } #>
                                                        <# } else { #>
                                                            <svg width="{{{ settings.iconSize.size || '16' }}}" height="{{{ settings.iconSize.size || '16' }}}" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="fill: {{{ settings.iconColor || '#FFFFFF' }}};">
                                                                <path d="M7.25 12.5C10.1495 12.5 12.5 10.1495 12.5 7.25C12.5 4.35051 10.1495 2 7.25 2C4.35051 2 2 4.35051 2 7.25C2 10.1495 4.35051 12.5 7.25 12.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                <path d="M11.0625 11.0625L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                            </svg>
                                                            <# } #>
                                    </button>
                                    <# } #>
                    </div>
                </div>
            </div>

            <style>
                .wedocs-search-wrap {
                    width: {
                            {
                                {
                                settings.searchWidth.size || '50'
                            }
                        }
                    }

                        {
                            {
                                {
                                settings.searchWidth.unit || '%'
                            }
                        }
                    }

                    ;

                    margin: {
                            {
                                {
                                settings.margin.top || '0'
                            }
                        }
                    }

                        {
                            {
                                {
                                settings.margin.unit || 'px'
                            }
                        }
                    }

                        {
                            {
                                {
                                settings.margin.right || '0'
                            }
                        }
                    }

                        {
                            {
                                {
                                settings.margin.unit || 'px'
                            }
                        }
                    }

                        {
                            {
                                {
                                settings.margin.bottom || '0'
                            }
                        }
                    }

                        {
                            {
                                {
                                settings.margin.unit || 'px'
                            }
                        }
                    }

                        {
                            {
                                {
                                settings.margin.left || '0'
                            }
                        }
                    }

                        {
                            {
                                {
                                settings.margin.unit || 'px'
                            }
                        }
                    }

                    ;
                }

                .wedocs-search-left {
                    margin-left: 0;
                    margin-right: auto;
                }

                .wedocs-search-center {
                    margin-left: auto;
                    margin-right: auto;
                }

                .wedocs-search-right {
                    margin-left: auto;
                    margin-right: 0;
                }

                .wedocs-search-form {
                    display: block;
                    width: 100%;
                }

                .wedocs-search-container {
                    display: flex;
                    align-items: stretch;
                    position: relative;

                    gap: {
                            {
                                {
                                settings.containerGap.size || '-1'
                            }
                        }
                    }

                        {
                            {
                                {
                                settings.containerGap.unit || 'px'
                            }
                        }
                    }

                    ;
                }

                .wedocs-search-input {
                    flex: 1;
                    outline: none;
                    box-sizing: border-box;
                }

                .wedocs-search-input:hover {
                    background-color: {
                            {
                                {
                                settings.hoverColor || '#FFFFFF'
                            }
                        }
                    }

                    !important;

                    border-color: {
                            {
                                {
                                settings.hoverBorderColor || '#cccccc'
                            }
                        }
                    }

                    !important;
                }

                .wedocs-search-input:focus {
                    background-color: {
                            {
                                {
                                settings.focusBgColor || '#FFFFFF'
                            }
                        }
                    }

                    !important;

                    border-color: {
                            {
                                {
                                settings.focusBorderColor || '#3b82f6'
                            }
                        }
                    }

                    !important;
                }

                .wedocs-search-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: none;
                    cursor: pointer;

                    transition: all {
                            {
                                {
                                settings.btnTransitionDuration.size || '300'
                            }
                        }
                    }

                    ms ease;
                }

                .wedocs-search-btn:hover {
                    background-color: {
                            {
                                {
                                settings.iconHoverColor || '#2563eb'
                            }
                        }
                    }

                    !important;
                }

                .wedocs-search-btn:hover i,
                .wedocs-search-btn:hover svg {
                    <# if (settings.buttonHoverTransform==='scale') {
                        #>transform: scale(1.05);
                        <#
                    }

                    else if (settings.buttonHoverTransform==='translateY') {
                        #>transform: translateY(-2px);
                        <#
                    }

                    else if (settings.buttonHoverTransform==='rotate') {
                        #>transform: rotate(15deg);
                        <#
                    }

                    #>fill: {
                            {
                                {
                                settings.svgHoverColor || '#FFFFFF'
                            }
                        }
                    }

                    !important;

                    color: {
                            {
                                {
                                settings.svgHoverColor || '#FFFFFF'
                            }
                        }
                    }

                    !important;
                }

                .wedocs-search-btn i,
                .wedocs-search-btn svg {
                    display: block;

                    transition: all {
                            {
                                {
                                settings.btnTransitionDuration.size || '300'
                            }
                        }
                    }

                    ms ease;
                }

                .wedocs-search-btn svg path {
                    stroke: currentColor;
                }
            </style>
            <# } #>
        <?php
    }
}
