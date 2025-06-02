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
        return __( 'weDocs Search', 'wedocs' );
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
        return [ 'wedocs-category' ];
    }

    /**
     * Get widget keywords.
     */
    public function get_keywords() {
        return [ 'search', 'wedocs', 'documentation', 'find' ];
    }

    /**
     * Register widget controls.
     */
    protected function register_controls() {

        // Content Section
        $this->start_controls_section(
            'content_section',
            [
                'label' => __( 'Content', 'wedocs' ),
                'tab' => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'hideSearch',
            [
                'label' => __( 'Hide Search', 'wedocs' ),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => __( 'Yes', 'wedocs' ),
                'label_off' => __( 'No', 'wedocs' ),
                'return_value' => 'yes',
                'default' => '',
            ]
        );

        $this->add_control(
            'placeholder',
            [
                'label' => __( 'Placeholder Text', 'wedocs' ),
                'type' => Controls_Manager::TEXT,
                'default' => __( 'Search for a topic or question', 'wedocs' ),
                'placeholder' => __( 'Enter placeholder text', 'wedocs' ),
            ]
        );

        $this->add_control(
            'alignment',
            [
                'label' => __( 'Alignment', 'wedocs' ),
                'type' => Controls_Manager::CHOOSE,
                'options' => [
                    'left' => [
                        'title' => __( 'Left', 'wedocs' ),
                        'icon' => 'eicon-text-align-left',
                    ],
                    'center' => [
                        'title' => __( 'Center', 'wedocs' ),
                        'icon' => 'eicon-text-align-center',
                    ],
                    'right' => [
                        'title' => __( 'Right', 'wedocs' ),
                        'icon' => 'eicon-text-align-right',
                    ],
                ],
                'default' => 'right',
                'toggle' => true,
            ]
        );

        $this->end_controls_section();

        // Style Section - Search Box
        $this->start_controls_section(
            'style_search_box',
            [
                'label' => __( 'Search Box', 'wedocs' ),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_responsive_control(
            'searchWidth',
            [
                'label' => __( 'Width', 'wedocs' ),
                'type' => Controls_Manager::SLIDER,
                'size_units' => [ 'px', '%' ],
                'range' => [
                    'px' => [
                        'min' => 200,
                        'max' => 1000,
                        'step' => 5,
                    ],
                    '%' => [
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

        $this->add_control(
            'bgColor',
            [
                'label' => __( 'Background Color', 'wedocs' ),
                'type' => Controls_Manager::COLOR,
                'default' => '#FFFFFF',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-input' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'hoverColor',
            [
                'label' => __( 'Hover Background Color', 'wedocs' ),
                'type' => Controls_Manager::COLOR,
                'default' => '#FFFFFF',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-input:hover' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'padding',
            [
                'label' => __( 'Padding', 'wedocs' ),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', '%', 'em' ],
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
                'label' => __( 'Margin', 'wedocs' ),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', '%', 'em' ],
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

        $this->add_group_control(
            Group_Control_Border::get_type(),
            [
                'name' => 'border',
                'label' => __( 'Border', 'wedocs' ),
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

        $this->add_control(
            'borderRadius',
            [
                'label' => __( 'Border Radius', 'wedocs' ),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 100,
                        'step' => 1,
                    ],
                ],
                'default' => [
                    'size' => 30,
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-input' => 'border-radius: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->end_controls_section();

        // Style Section - Search Button
        $this->start_controls_section(
            'style_search_button',
            [
                'label' => __( 'Search Button', 'wedocs' ),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'iconColor',
            [
                'label' => __( 'Icon Color', 'wedocs' ),
                'type' => Controls_Manager::COLOR,
                'default' => '#FFFFFF',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-btn svg' => 'fill: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'iconBgColor',
            [
                'label' => __( 'Background Color', 'wedocs' ),
                'type' => Controls_Manager::COLOR,
                'default' => '#3b82f6',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-btn' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'iconHoverColor',
            [
                'label' => __( 'Hover Background Color', 'wedocs' ),
                'type' => Controls_Manager::COLOR,
                'default' => '#2563eb',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-btn:hover' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'svgHoverColor',
            [
                'label' => __( 'Hover Icon Color', 'wedocs' ),
                'type' => Controls_Manager::COLOR,
                'default' => '#FFFFFF',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-btn:hover svg' => 'fill: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'btnPadding',
            [
                'label' => __( 'Padding', 'wedocs' ),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', '%', 'em' ],
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

        $this->add_control(
            'btnRadius',
            [
                'label' => __( 'Border Radius', 'wedocs' ),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 100,
                        'step' => 1,
                    ],
                ],
                'default' => [
                    'size' => 30,
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-search-btn' => 'border-radius: {{SIZE}}{{UNIT}};',
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

        if ( $settings['hideSearch'] === 'yes' ) {
            return;
        }

        $alignment_class = 'wedocs-search-' . esc_attr( $settings['alignment'] );
        ?>
        <div class="wedocs-search-wrap <?php echo esc_attr( $alignment_class ); ?>">
            <div class="wedocs-search-form">
                <form role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>">
                    <div class="wedocs-search-container">
                        <input
                            type="search"
                            class="wedocs-search-input"
                            placeholder="<?php echo esc_attr( $settings['placeholder'] ); ?>"
                            value="<?php echo get_search_query(); ?>"
                            name="s"
                            title="<?php echo esc_attr( $settings['placeholder'] ); ?>"
                        />
                        <input type="hidden" name="post_type" value="docs" />
                        <button type="submit" class="wedocs-search-btn">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.25 12.5C10.1495 12.5 12.5 10.1495 12.5 7.25C12.5 4.35051 10.1495 2 7.25 2C4.35051 2 2 4.35051 2 7.25C2 10.1495 4.35051 12.5 7.25 12.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M11.0625 11.0625L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <?php
    }

    /**
     * Render widget output in the editor.
     */
    protected function content_template() {
        ?>
        <# if ( settings.hideSearch !== 'yes' ) { #>
            <div class="wedocs-search-wrap wedocs-search-{{{ settings.alignment }}}">
                <div class="wedocs-search-form">
                    <div class="wedocs-search-container">
                        <input
                            type="search"
                            class="wedocs-search-input"
                            placeholder="{{{ settings.placeholder }}}"
                            title="{{{ settings.placeholder }}}"
                        />
                        <button type="button" class="wedocs-search-btn">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.25 12.5C10.1495 12.5 12.5 10.1495 12.5 7.25C12.5 4.35051 10.1495 2 7.25 2C4.35051 2 2 4.35051 2 7.25C2 10.1495 4.35051 12.5 7.25 12.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M11.0625 11.0625L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        <# } #>
        <?php
    }
}
