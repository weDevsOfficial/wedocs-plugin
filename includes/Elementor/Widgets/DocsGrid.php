<?php

namespace WeDevs\WeDocs\Elementor\Widgets;

use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Border;

/**
 * WeDocs Docs Grid Widget for Elementor
 */
class DocsGrid extends Widget_Base {

    /**
     * Get widget name.
     */
    public function get_name() {
        return 'wedocs-docs-grid';
    }

    /**
     * Get widget title.
     */
    public function get_title() {
        return __( 'weDocs - Docs Grid', 'wedocs' );
    }

    /**
     * Get widget icon.
     */
    public function get_icon() {
        return 'eicon-grid';
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
        return [ 'docs', 'wedocs', 'documentation', 'grid', 'list' ];
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
            'docStyle',
            [
                'label' => __( 'Doc Style', 'wedocs' ),
                'type' => Controls_Manager::SELECT,
                'default' => '1x1',
                'options' => [
                    '1x1' => __( '1x1 Grid', 'wedocs' ),
                    '2x2' => __( '2x2 Grid', 'wedocs' ),
                    'list' => __( 'List View', 'wedocs' ),
                ],
            ]
        );

        $this->add_control(
            'docsPerPage',
            [
                'label' => __( 'Docs Per Page', 'wedocs' ),
                'type' => Controls_Manager::SELECT,
                'default' => 'all',
                'options' => [
                    'all' => __( 'Show All', 'wedocs' ),
                    '3' => '3',
                    '6' => '6',
                    '9' => '9',
                    '12' => '12',
                    '15' => '15',
                ],
            ]
        );

        // Get all docs for exclude option
        $docs = get_posts([
            'post_type' => 'docs',
            'post_status' => 'publish',
            'numberposts' => -1,
            'post_parent' => 0,
        ]);

        $docs_options = [];
        foreach ($docs as $doc) {
            $docs_options[$doc->ID] = $doc->post_title;
        }

        $this->add_control(
            'excludeDocs',
            [
                'label' => __( 'Exclude Docs', 'wedocs' ),
                'type' => Controls_Manager::SELECT2,
                'multiple' => true,
                'options' => $docs_options,
                'default' => [],
            ]
        );

        $this->add_control(
            'order',
            [
                'label' => __( 'Order', 'wedocs' ),
                'type' => Controls_Manager::SELECT,
                'default' => 'asc',
                'options' => [
                    'asc' => __( 'Ascending', 'wedocs' ),
                    'desc' => __( 'Descending', 'wedocs' ),
                ],
            ]
        );

        $this->add_control(
            'orderBy',
            [
                'label' => __( 'Order By', 'wedocs' ),
                'type' => Controls_Manager::SELECT,
                'default' => 'menu_order',
                'options' => [
                    'menu_order' => __( 'Menu Order', 'wedocs' ),
                    'title' => __( 'Title', 'wedocs' ),
                    'date' => __( 'Date', 'wedocs' ),
                    'modified' => __( 'Modified Date', 'wedocs' ),
                ],
            ]
        );

        $this->add_control(
            'sectionsPerDoc',
            [
                'label' => __( 'Sections Per Doc', 'wedocs' ),
                'type' => Controls_Manager::SELECT,
                'default' => 'all',
                'options' => [
                    'all' => __( 'Show All', 'wedocs' ),
                    '3' => '3',
                    '5' => '5',
                    '10' => '10',
                ],
            ]
        );

        $this->add_control(
            'articlesPerSection',
            [
                'label' => __( 'Articles Per Section', 'wedocs' ),
                'type' => Controls_Manager::SELECT,
                'default' => 'all',
                'options' => [
                    'all' => __( 'Show All', 'wedocs' ),
                    '3' => '3',
                    '5' => '5',
                    '10' => '10',
                ],
            ]
        );

        $this->add_control(
            'showDocArticle',
            [
                'label' => __( 'Show Doc Articles', 'wedocs' ),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => __( 'Show', 'wedocs' ),
                'label_off' => __( 'Hide', 'wedocs' ),
                'return_value' => 'yes',
                'default' => 'yes',
            ]
        );

        $this->add_control(
            'keepArticlesCollapsed',
            [
                'label' => __( 'Keep Articles Collapsed', 'wedocs' ),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => __( 'Yes', 'wedocs' ),
                'label_off' => __( 'No', 'wedocs' ),
                'return_value' => 'yes',
                'default' => '',
                'condition' => [
                    'showDocArticle' => 'yes',
                ],
            ]
        );

        $this->add_control(
            'showViewDetails',
            [
                'label' => __( 'Show View Details Button', 'wedocs' ),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => __( 'Show', 'wedocs' ),
                'label_off' => __( 'Hide', 'wedocs' ),
                'return_value' => 'yes',
                'default' => 'yes',
            ]
        );

        $this->add_control(
            'buttonText',
            [
                'label' => __( 'Button Text', 'wedocs' ),
                'type' => Controls_Manager::TEXT,
                'default' => __( 'View Details', 'wedocs' ),
                'condition' => [
                    'showViewDetails' => 'yes',
                ],
            ]
        );

        $this->end_controls_section();

        // Style Section - Grid
        $this->start_controls_section(
            'style_grid',
            [
                'label' => __( 'Grid', 'wedocs' ),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_responsive_control(
            'gridPadding',
            [
                'label' => __( 'Padding', 'wedocs' ),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', '%', 'em' ],
                'default' => [
                    'top' => 20,
                    'right' => 20,
                    'bottom' => 20,
                    'left' => 20,
                    'unit' => 'px',
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__item' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'gridMargin',
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
                    '{{WRAPPER}} .wedocs-docs-grid__item' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Border::get_type(),
            [
                'name' => 'gridBorder',
                'label' => __( 'Border', 'wedocs' ),
                'selector' => '{{WRAPPER}} .wedocs-docs-grid__item',
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
                        'default' => 'rgba(0, 0, 0, 0.1)',
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
                    'size' => 4,
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__item' => 'border-radius: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->end_controls_section();

        // Style Section - Typography
        $this->start_controls_section(
            'style_typography',
            [
                'label' => __( 'Typography', 'wedocs' ),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'docTitleColor',
            [
                'label' => __( 'Doc Title Color', 'wedocs' ),
                'type' => Controls_Manager::COLOR,
                'default' => '#333333',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__title' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'docChildrenActiveColor',
            [
                'label' => __( 'Active Link Color', 'wedocs' ),
                'type' => Controls_Manager::COLOR,
                'default' => '#0073aa',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__article-link:hover' => 'color: {{VALUE}};',
                    '{{WRAPPER}} .wedocs-docs-grid__section-link:hover' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->end_controls_section();

        // Style Section - Button
        $this->start_controls_section(
            'style_button',
            [
                'label' => __( 'View Details Button', 'wedocs' ),
                'tab' => Controls_Manager::TAB_STYLE,
                'condition' => [
                    'showViewDetails' => 'yes',
                ],
            ]
        );

        $this->add_control(
            'buttonColor',
            [
                'label' => __( 'Background Color', 'wedocs' ),
                'type' => Controls_Manager::COLOR,
                'default' => '#0073aa',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__details-link' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'buttonTextColor',
            [
                'label' => __( 'Text Color', 'wedocs' ),
                'type' => Controls_Manager::COLOR,
                'default' => '#ffffff',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__details-link' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'buttonHoverColor',
            [
                'label' => __( 'Hover Background Color', 'wedocs' ),
                'type' => Controls_Manager::COLOR,
                'default' => '#005177',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__details-link:hover' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'buttonHoverTextColor',
            [
                'label' => __( 'Hover Text Color', 'wedocs' ),
                'type' => Controls_Manager::COLOR,
                'default' => '#ffffff',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__details-link:hover' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'buttonPadding',
            [
                'label' => __( 'Padding', 'wedocs' ),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', '%', 'em' ],
                'default' => [
                    'top' => 10,
                    'right' => 20,
                    'bottom' => 10,
                    'left' => 20,
                    'unit' => 'px',
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__details-link' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'buttonMargin',
            [
                'label' => __( 'Margin', 'wedocs' ),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', '%', 'em' ],
                'default' => [
                    'top' => 10,
                    'right' => 0,
                    'bottom' => 0,
                    'left' => 0,
                    'unit' => 'px',
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__details-link' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'buttonBorderRadius',
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
                    'size' => 4,
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__details-link' => 'border-radius: {{SIZE}}{{UNIT}};',
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

        // Convert Elementor settings to block attributes format
        $attributes = [
            'docStyle' => $settings['docStyle'],
            'docsPerPage' => $settings['docsPerPage'],
            'excludeDocs' => $settings['excludeDocs'],
            'order' => $settings['order'],
            'orderBy' => $settings['orderBy'],
            'sectionsPerDoc' => $settings['sectionsPerDoc'],
            'articlesPerSection' => $settings['articlesPerSection'],
            'showDocArticle' => $settings['showDocArticle'] === 'yes',
            'keepArticlesCollapsed' => $settings['keepArticlesCollapsed'] === 'yes',
            'showViewDetails' => $settings['showViewDetails'] === 'yes',
            'buttonText' => $settings['buttonText'],
            'gridPadding' => [
                'top' => $settings['gridPadding']['top'] . $settings['gridPadding']['unit'],
                'right' => $settings['gridPadding']['right'] . $settings['gridPadding']['unit'],
                'bottom' => $settings['gridPadding']['bottom'] . $settings['gridPadding']['unit'],
                'left' => $settings['gridPadding']['left'] . $settings['gridPadding']['unit'],
            ],
            'gridMargin' => [
                'top' => $settings['gridMargin']['top'] . $settings['gridMargin']['unit'],
                'right' => $settings['gridMargin']['right'] . $settings['gridMargin']['unit'],
                'bottom' => $settings['gridMargin']['bottom'] . $settings['gridMargin']['unit'],
                'left' => $settings['gridMargin']['left'] . $settings['gridMargin']['unit'],
            ],
            'borderRadius' => $settings['borderRadius']['size'] . 'px',
            'docTitleColor' => $settings['docTitleColor'],
            'docChildrenActiveColor' => $settings['docChildrenActiveColor'],
            'buttonColor' => $settings['buttonColor'],
            'buttonTextColor' => $settings['buttonTextColor'],
            'buttonHoverColor' => $settings['buttonHoverColor'],
            'buttonHoverTextColor' => $settings['buttonHoverTextColor'],
            'buttonPadding' => [
                'top' => $settings['buttonPadding']['top'] . $settings['buttonPadding']['unit'],
                'right' => $settings['buttonPadding']['right'] . $settings['buttonPadding']['unit'],
                'bottom' => $settings['buttonPadding']['bottom'] . $settings['buttonPadding']['unit'],
                'left' => $settings['buttonPadding']['left'] . $settings['buttonPadding']['unit'],
            ],
            'buttonMargin' => [
                'top' => $settings['buttonMargin']['top'] . $settings['buttonMargin']['unit'],
                'right' => $settings['buttonMargin']['right'] . $settings['buttonMargin']['unit'],
                'bottom' => $settings['buttonMargin']['bottom'] . $settings['buttonMargin']['unit'],
                'left' => $settings['buttonMargin']['left'] . $settings['buttonMargin']['unit'],
            ],
            'buttonBorderRadius' => $settings['buttonBorderRadius']['size'] . 'px',
        ];

        // Check if the render function exists
        if ( function_exists( 'render_wedocs_docs_grid' ) ) {
            echo render_wedocs_docs_grid( $attributes );
        } else {
            echo '<p>' . __( 'WeDocs Grid functionality is not available.', 'wedocs' ) . '</p>';
        }
    }

    /**
     * Render widget output in the editor.
     */
    protected function content_template() {
        ?>
        <div class="wedocs-docs-grid">
            <div class="wedocs-docs-grid__item" style="border: 1px solid rgba(0, 0, 0, 0.1); padding: 20px; margin-bottom: 20px; border-radius: 4px;">
                <h3 class="wedocs-docs-grid__title" style="color: {{{ settings.docTitleColor }}};">Sample Documentation</h3>
                <div class="wedocs-docs-grid__content">
                    <p>This is a preview of how your documentation grid will look.</p>
                    <# if ( settings.showViewDetails === 'yes' ) { #>
                        <a href="#" class="wedocs-docs-grid__details-link" style="
                            background-color: {{{ settings.buttonColor }}};
                            color: {{{ settings.buttonTextColor }}};
                            padding: 10px 20px;
                            border-radius: {{{ settings.buttonBorderRadius.size }}}px;
                            text-decoration: none;
                            display: inline-block;
                            margin-top: 10px;
                        ">{{{ settings.buttonText }}}</a>
                    <# } #>
                </div>
            </div>
        </div>
        <?php
    }
}
