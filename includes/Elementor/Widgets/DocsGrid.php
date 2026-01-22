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
        return __('weDocs - Docs Grid', 'wedocs');
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
        return ['wedocs-category'];
    }

    /**
     * Get widget keywords.
     */
    public function get_keywords() {
        return ['docs', 'wedocs', 'documentation', 'grid', 'list'];
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
            'docStyle',
            [
                'label' => __('Doc Style', 'wedocs'),
                'type' => Controls_Manager::SELECT,
                'default' => '1x1',
                'options' => [
                    '1x1' => __('1x1 Grid', 'wedocs'),
                    '2x2' => __('2x2 Grid', 'wedocs'),
                    'list' => __('List View', 'wedocs'),
                ],
            ]
        );

        $this->add_control(
            'docsPerPage',
            [
                'label' => __('Docs Per Page', 'wedocs'),
                'type' => Controls_Manager::NUMBER,
                'default' => 9,
                'min' => 1,
                'max' => 100,
                'step' => 1,
                'description' => __('Set to -1 for unlimited docs', 'wedocs'),
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
                'label' => __('Exclude Docs', 'wedocs'),
                'type' => Controls_Manager::SELECT2,
                'multiple' => true,
                'options' => $docs_options,
                'default' => [],
            ]
        );

        $this->add_control(
            'order',
            [
                'label' => __('Order', 'wedocs'),
                'type' => Controls_Manager::SELECT,
                'default' => 'asc',
                'options' => [
                    'asc' => __('Ascending', 'wedocs'),
                    'desc' => __('Descending', 'wedocs'),
                ],
            ]
        );

        $this->add_control(
            'orderBy',
            [
                'label' => __('Order By', 'wedocs'),
                'type' => Controls_Manager::SELECT,
                'default' => 'menu_order',
                'options' => [
                    'menu_order' => __('Menu Order', 'wedocs'),
                    'title' => __('Title', 'wedocs'),
                    'date' => __('Date', 'wedocs'),
                    'modified' => __('Modified Date', 'wedocs'),
                ],
            ]
        );

        $this->add_control(
            'sectionsPerDoc',
            [
                'label' => __('Sections Per Doc', 'wedocs'),
                'type' => Controls_Manager::SELECT,
                'default' => 'all',
                'options' => [
                    'all' => __('Show All', 'wedocs'),
                    '3' => '3',
                    '5' => '5',
                    '10' => '10',
                ],
            ]
        );

        $this->add_control(
            'articlesPerSection',
            [
                'label' => __('Articles Per Section', 'wedocs'),
                'type' => Controls_Manager::SELECT,
                'default' => 'all',
                'options' => [
                    'all' => __('Show All', 'wedocs'),
                    '3' => '3',
                    '5' => '5',
                    '10' => '10',
                ],
            ]
        );

        $this->add_control(
            'showDocArticle',
            [
                'label' => __('Show Doc Articles', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => __('Show', 'wedocs'),
                'label_off' => __('Hide', 'wedocs'),
                'return_value' => 'yes',
                'default' => 'yes',
            ]
        );

        $this->add_control(
            'keepArticlesCollapsed',
            [
                'label' => __('Keep Articles Collapsed', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => __('Yes', 'wedocs'),
                'label_off' => __('No', 'wedocs'),
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
                'label' => __('Show View Details Button', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => __('Show', 'wedocs'),
                'label_off' => __('Hide', 'wedocs'),
                'return_value' => 'yes',
                'default' => 'yes',
            ]
        );

        $this->add_control(
            'buttonText',
            [
                'label' => __('Button Text', 'wedocs'),
                'type' => Controls_Manager::TEXT,
                'default' => __('View Details', 'wedocs'),
                'condition' => [
                    'showViewDetails' => 'yes',
                ],
            ]
        );

        $this->end_controls_section();

        // Pagination Section
        $this->start_controls_section(
            'pagination_section',
            [
                'label' => __('Pagination', 'wedocs'),
                'tab' => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'enablePagination',
            [
                'label' => __('Enable Pagination', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => __('Yes', 'wedocs'),
                'label_off' => __('No', 'wedocs'),
                'return_value' => 'yes',
                'default' => 'yes',
            ]
        );

        $this->add_control(
            'paginationType',
            [
                'label' => __('Pagination Type', 'wedocs'),
                'type' => Controls_Manager::SELECT,
                'default' => 'numbers',
                'options' => [
                    'numbers' => __('Numbers', 'wedocs'),
                    'ajax' => __('AJAX Load More', 'wedocs'),
                    'infinite' => __('Infinite Scroll', 'wedocs'),
                    'prev_next' => __('Previous/Next Only', 'wedocs'),
                ],
                'condition' => [
                    'enablePagination' => 'yes',
                ],
            ]
        );

        $this->add_control(
            'loadMoreText',
            [
                'label' => __('Load More Button Text', 'wedocs'),
                'type' => Controls_Manager::TEXT,
                'default' => __('Load More', 'wedocs'),
                'condition' => [
                    'enablePagination' => 'yes',
                    'paginationType' => 'ajax',
                ],
            ]
        );

        $this->add_control(
            'showPageInfo',
            [
                'label' => __('Show Page Info', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => __('Show', 'wedocs'),
                'label_off' => __('Hide', 'wedocs'),
                'return_value' => 'yes',
                'default' => 'yes',
                'description' => __('Show "Showing X-Y of Z docs"', 'wedocs'),
                'condition' => [
                    'enablePagination' => 'yes',
                ],
            ]
        );

        $this->add_control(
            'showTotalCount',
            [
                'label' => __('Show Total Count', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => __('Show', 'wedocs'),
                'label_off' => __('Hide', 'wedocs'),
                'return_value' => 'yes',
                'default' => 'yes',
                'description' => __('Display total number of docs at top', 'wedocs'),
            ]
        );

        $this->end_controls_section();

        // Advanced Filtering Section
        $this->start_controls_section(
            'filtering_section',
            [
                'label' => __('Advanced Filtering', 'wedocs'),
                'tab' => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'enableSearch',
            [
                'label' => __('Enable Search', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => __('Yes', 'wedocs'),
                'label_off' => __('No', 'wedocs'),
                'return_value' => 'yes',
                'default' => '',
                'description' => __('Add search box above grid', 'wedocs'),
            ]
        );

        $this->add_control(
            'searchPlaceholder',
            [
                'label' => __('Search Placeholder', 'wedocs'),
                'type' => Controls_Manager::TEXT,
                'default' => __('Search documentation...', 'wedocs'),
                'condition' => [
                    'enableSearch' => 'yes',
                ],
            ]
        );

        $this->add_control(
            'enableSorting',
            [
                'label' => __('Enable Sorting Dropdown', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => __('Yes', 'wedocs'),
                'label_off' => __('No', 'wedocs'),
                'return_value' => 'yes',
                'default' => '',
                'description' => __('Let users sort docs dynamically', 'wedocs'),
            ]
        );

        $this->add_control(
            'enableViewToggle',
            [
                'label' => __('Enable View Toggle', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => __('Yes', 'wedocs'),
                'label_off' => __('No', 'wedocs'),
                'return_value' => 'yes',
                'default' => '',
                'description' => __('Let users switch between grid/list view', 'wedocs'),
            ]
        );

        $this->end_controls_section();

        // Animation Section
        $this->start_controls_section(
            'animation_section',
            [
                'label' => __('Animations', 'wedocs'),
                'tab' => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'itemAnimation',
            [
                'label' => __('Item Animation', 'wedocs'),
                'type' => Controls_Manager::SELECT,
                'default' => 'none',
                'options' => [
                    'none' => __('None', 'wedocs'),
                    'fadeIn' => __('Fade In', 'wedocs'),
                    'fadeInUp' => __('Fade In Up', 'wedocs'),
                    'fadeInDown' => __('Fade In Down', 'wedocs'),
                    'fadeInLeft' => __('Fade In Left', 'wedocs'),
                    'fadeInRight' => __('Fade In Right', 'wedocs'),
                    'zoomIn' => __('Zoom In', 'wedocs'),
                    'bounceIn' => __('Bounce In', 'wedocs'),
                    'slideInUp' => __('Slide In Up', 'wedocs'),
                ],
            ]
        );

        $this->add_control(
            'animationDelay',
            [
                'label' => __('Animation Delay (ms)', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 1000,
                        'step' => 50,
                    ],
                ],
                'default' => [
                    'size' => 100,
                ],
                'condition' => [
                    'itemAnimation!' => 'none',
                ],
            ]
        );

        $this->add_control(
            'staggerAnimation',
            [
                'label' => __('Stagger Animation', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => __('Yes', 'wedocs'),
                'label_off' => __('No', 'wedocs'),
                'return_value' => 'yes',
                'default' => 'yes',
                'description' => __('Items appear one after another', 'wedocs'),
                'condition' => [
                    'itemAnimation!' => 'none',
                ],
            ]
        );

        $this->end_controls_section();

        // Style Section - Grid
        $this->start_controls_section(
            'style_grid',
            [
                'label' => __('Grid', 'wedocs'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'gridBackgroundColor',
            [
                'label' => __('Background Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#ffffff',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__item' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'gridPadding',
            [
                'label' => __('Padding', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%', 'em'],
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
                'label' => __('Margin', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%', 'em'],
                'default' => [
                    'top' => 0,
                    'right' => 0,
                    'bottom' => 15,
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
                'label' => __('Border', 'wedocs'),
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
                        'default' => '#e0e0e0',
                    ],
                ],
            ]
        );

        $this->add_control(
            'borderRadius',
            [
                'label' => __('Border Radius', 'wedocs'),
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

        $this->add_control(
            'gridBoxShadow',
            [
                'label' => __('Box Shadow', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => __('Yes', 'wedocs'),
                'label_off' => __('No', 'wedocs'),
                'return_value' => 'yes',
                'default' => '',
            ]
        );

        $this->add_control(
            'gridHoverEffect',
            [
                'label' => __('Hover Effect', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => __('Yes', 'wedocs'),
                'label_off' => __('No', 'wedocs'),
                'return_value' => 'yes',
                'default' => 'yes',
            ]
        );

        $this->end_controls_section();

        // Style Section - Typography
        $this->start_controls_section(
            'style_typography',
            [
                'label' => __('Typography', 'wedocs'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'docTitleHeading',
            [
                'label' => __('Doc Title', 'wedocs'),
                'type' => Controls_Manager::HEADING,
            ]
        );

        $this->add_control(
            'docTitleColor',
            [
                'label' => __('Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#333333',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__title' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'docTitleTypography',
                'label' => __('Typography', 'wedocs'),
                'selector' => '{{WRAPPER}} .wedocs-docs-grid__title',
            ]
        );

        $this->add_control(
            'sectionTitleHeading',
            [
                'label' => __('Section Title', 'wedocs'),
                'type' => Controls_Manager::HEADING,
                'separator' => 'before',
            ]
        );

        $this->add_control(
            'sectionTitleColor',
            [
                'label' => __('Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#444444',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__section-title' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'sectionTitleTypography',
                'label' => __('Typography', 'wedocs'),
                'selector' => '{{WRAPPER}} .wedocs-docs-grid__section-title',
            ]
        );

        $this->add_control(
            'articleLinkHeading',
            [
                'label' => __('Article Links', 'wedocs'),
                'type' => Controls_Manager::HEADING,
                'separator' => 'before',
            ]
        );

        $this->add_control(
            'articleLinkColor',
            [
                'label' => __('Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#666666',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__article-link' => 'color: {{VALUE}};',
                    '{{WRAPPER}} .wedocs-docs-grid__section-link' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'docChildrenActiveColor',
            [
                'label' => __('Hover Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#0073aa',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__article-link:hover' => 'color: {{VALUE}};',
                    '{{WRAPPER}} .wedocs-docs-grid__section-link:hover' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'articleLinkTypography',
                'label' => __('Typography', 'wedocs'),
                'selector' => '{{WRAPPER}} .wedocs-docs-grid__article-link, {{WRAPPER}} .wedocs-docs-grid__section-link',
            ]
        );

        $this->end_controls_section();

        // Style Section - Button
        $this->start_controls_section(
            'style_button',
            [
                'label' => __('View Details Button', 'wedocs'),
                'tab' => Controls_Manager::TAB_STYLE,
                'condition' => [
                    'showViewDetails' => 'yes',
                ],
            ]
        );

        $this->add_control(
            'buttonColor',
            [
                'label' => __('Background Color', 'wedocs'),
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
                'label' => __('Text Color', 'wedocs'),
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
                'label' => __('Hover Background Color', 'wedocs'),
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
                'label' => __('Hover Text Color', 'wedocs'),
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
                'label' => __('Padding', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%', 'em'],
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
                'label' => __('Margin', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%', 'em'],
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
                'label' => __('Border Radius', 'wedocs'),
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

        // Style Section - Pagination
        $this->start_controls_section(
            'style_pagination',
            [
                'label' => __('Pagination', 'wedocs'),
                'tab' => Controls_Manager::TAB_STYLE,
                'condition' => [
                    'enablePagination' => 'yes',
                ],
            ]
        );

        $this->add_responsive_control(
            'paginationAlign',
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
                'default' => 'center',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-pagination' => 'text-align: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'paginationTypography',
                'label' => __('Typography', 'wedocs'),
                'selector' => '{{WRAPPER}} .wedocs-pagination a, {{WRAPPER}} .wedocs-pagination span',
            ]
        );

        $this->add_control(
            'paginationColor',
            [
                'label' => __('Text Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#333333',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-pagination a' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'paginationBgColor',
            [
                'label' => __('Background Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#f5f5f5',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-pagination a' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'paginationActiveColor',
            [
                'label' => __('Active Text Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#ffffff',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-pagination .current' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'paginationActiveBgColor',
            [
                'label' => __('Active Background', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#0073aa',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-pagination .current' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'paginationHoverColor',
            [
                'label' => __('Hover Text Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#ffffff',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-pagination a:hover' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'paginationHoverBgColor',
            [
                'label' => __('Hover Background', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#0073aa',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-pagination a:hover' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'paginationPadding',
            [
                'label' => __('Padding', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%', 'em'],
                'default' => [
                    'top' => 8,
                    'right' => 12,
                    'bottom' => 8,
                    'left' => 12,
                    'unit' => 'px',
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-pagination a, {{WRAPPER}} .wedocs-pagination span' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'paginationMargin',
            [
                'label' => __('Margin', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%', 'em'],
                'default' => [
                    'top' => 30,
                    'right' => 0,
                    'bottom' => 0,
                    'left' => 0,
                    'unit' => 'px',
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-pagination' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'paginationSpacing',
            [
                'label' => __('Item Spacing', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 30,
                        'step' => 1,
                    ],
                ],
                'default' => [
                    'size' => 5,
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-pagination a, {{WRAPPER}} .wedocs-pagination span' => 'margin-right: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'paginationBorderRadius',
            [
                'label' => __('Border Radius', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 50,
                        'step' => 1,
                    ],
                ],
                'default' => [
                    'size' => 3,
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-pagination a, {{WRAPPER}} .wedocs-pagination span' => 'border-radius: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->end_controls_section();

        // Style Section - Search & Filters
        $this->start_controls_section(
            'style_filters',
            [
                'label' => __('Search & Filters', 'wedocs'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'filterTypography',
                'label' => __('Typography', 'wedocs'),
                'selector' => '{{WRAPPER}} .wedocs-grid-search input, {{WRAPPER}} .wedocs-grid-sort select',
            ]
        );

        $this->add_control(
            'filterBgColor',
            [
                'label' => __('Background Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#ffffff',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-grid-search input' => 'background-color: {{VALUE}};',
                    '{{WRAPPER}} .wedocs-grid-sort select' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'filterBorderColor',
            [
                'label' => __('Border Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#dddddd',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-grid-search input' => 'border-color: {{VALUE}};',
                    '{{WRAPPER}} .wedocs-grid-sort select' => 'border-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'filterPadding',
            [
                'label' => __('Padding', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%', 'em'],
                'default' => [
                    'top' => 10,
                    'right' => 15,
                    'bottom' => 10,
                    'left' => 15,
                    'unit' => 'px',
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-grid-search input' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    '{{WRAPPER}} .wedocs-grid-sort select' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'filterBorderRadius',
            [
                'label' => __('Border Radius', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 50,
                        'step' => 1,
                    ],
                ],
                'default' => [
                    'size' => 4,
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-grid-search input' => 'border-radius: {{SIZE}}{{UNIT}};',
                    '{{WRAPPER}} .wedocs-grid-sort select' => 'border-radius: {{SIZE}}{{UNIT}};',
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

        // Get settings
        $doc_style = $settings['docStyle'] ?? '1x1';
        $docs_per_page = intval($settings['docsPerPage'] ?? 9);
        $exclude_docs = $settings['excludeDocs'] ?? [];
        $order = $settings['order'] ?? 'asc';
        $order_by = $settings['orderBy'] ?? 'menu_order';
        $sections_per_doc = $settings['sectionsPerDoc'] ?? 'all';
        $articles_per_section = $settings['articlesPerSection'] ?? 'all';
        $show_articles = ($settings['showDocArticle'] ?? 'yes') === 'yes';
        $keep_collapsed = ($settings['keepArticlesCollapsed'] ?? '') === 'yes';
        $show_view_details = ($settings['showViewDetails'] ?? 'yes') === 'yes';
        $button_text = $settings['buttonText'] ?? __('View Details', 'wedocs');

        // Pagination settings
        $enable_pagination = ($settings['enablePagination'] ?? 'no') === 'yes';
        $pagination_type = $settings['paginationType'] ?? 'numbers';
        $load_more_text = $settings['loadMoreText'] ?? __('Load More', 'wedocs');
        $show_page_info = ($settings['showPageInfo'] ?? 'no') === 'yes';
        $show_total_count = ($settings['showTotalCount'] ?? 'no') === 'yes';

        // Filtering settings
        $enable_search = ($settings['enableSearch'] ?? 'no') === 'yes';
        $search_placeholder = $settings['searchPlaceholder'] ?? __('Search docs...', 'wedocs');
        $enable_sorting = ($settings['enableSorting'] ?? 'no') === 'yes';

        // Get current page
        $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

        // Query args
        $args = [
            'post_type' => 'docs',
            'post_status' => 'publish',
            'post_parent' => 0,
            'orderby' => $order_by,
            'order' => $order,
        ];

        // Handle pagination
        if ($enable_pagination && $docs_per_page > 0) {
            $args['posts_per_page'] = $docs_per_page;
            $args['paged'] = $paged;
        } elseif ($docs_per_page == -1) {
            $args['posts_per_page'] = -1;
        } else {
            $args['posts_per_page'] = $docs_per_page;
        }

        if (!empty($exclude_docs)) {
            $args['post__not_in'] = $exclude_docs;
        }

        $docs_query = new \WP_Query($args);
        $docs = $docs_query->posts;
        $total_docs = $docs_query->found_posts;
        $max_pages = $docs_query->max_num_pages;

        if (empty($docs)) {
            echo '<p>' . __('No documentation found.', 'wedocs') . '</p>';
            return;
        }

        // Grid class
        $grid_class = 'wedocs-docs-grid';
        if ($doc_style === '2x2') {
            $grid_class .= ' wedocs-docs-grid--2x2';
        } elseif ($doc_style === 'list') {
            $grid_class .= ' wedocs-docs-grid--list';
        }

?>
        <div class="wedocs-grid-wrapper">
            <?php if ($enable_search || $enable_sorting): ?>
                <div class="wedocs-grid-filters">
                    <?php if ($enable_search): ?>
                        <div class="wedocs-grid-search">
                            <input type="text" placeholder="<?php echo esc_attr($search_placeholder); ?>" class="wedocs-grid-search-input" data-grid-id="<?php echo $this->get_id(); ?>">
                        </div>
                    <?php endif; ?>

                    <?php if ($enable_sorting): ?>
                        <div class="wedocs-grid-sort">
                            <select class="wedocs-grid-sort-select" data-grid-id="<?php echo $this->get_id(); ?>">
                                <option value="title_asc"><?php _e('Title (A-Z)', 'wedocs'); ?></option>
                                <option value="title_desc"><?php _e('Title (Z-A)', 'wedocs'); ?></option>
                                <option value="date_desc"><?php _e('Newest First', 'wedocs'); ?></option>
                                <option value="date_asc"><?php _e('Oldest First', 'wedocs'); ?></option>
                            </select>
                        </div>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <?php if ($show_total_count): ?>
                <div class="wedocs-grid-count">
                    <?php printf(__('Total: %d documents', 'wedocs'), $total_docs); ?>
                </div>
            <?php endif; ?>

            <div class="<?php echo esc_attr($grid_class); ?>" data-grid-id="<?php echo $this->get_id(); ?>">
                <?php foreach ($docs as $doc): ?>
                    <div class="wedocs-docs-grid__item">
                        <h3 class="wedocs-docs-grid__title">
                            <?php if ($doc_style === 'list'): ?>
                                <span class="wedocs-docs-grid__icon">📄</span>
                            <?php endif; ?>
                            <a href="<?php echo get_permalink($doc->ID); ?>"><?php echo esc_html($doc->post_title); ?></a>
                        </h3>

                        <?php if ($show_articles): ?>
                            <div class="wedocs-docs-grid__content">
                                <?php
                                // Get sections (children of this doc)
                                $section_args = [
                                    'post_type' => 'docs',
                                    'post_status' => 'publish',
                                    'post_parent' => $doc->ID,
                                    'orderby' => $order_by,
                                    'order' => $order,
                                ];

                                if ($sections_per_doc !== 'all') {
                                    $section_args['posts_per_page'] = intval($sections_per_doc);
                                } else {
                                    $section_args['posts_per_page'] = -1;
                                }

                                $sections = get_posts($section_args);

                                if (!empty($sections)):
                                    foreach ($sections as $section):
                                ?>
                                        <div class="wedocs-docs-grid__section">
                                            <h4 class="wedocs-docs-grid__section-title">
                                                <a href="<?php echo get_permalink($section->ID); ?>" class="wedocs-docs-grid__section-link">
                                                    <?php echo esc_html($section->post_title); ?>
                                                </a>
                                            </h4>

                                            <?php
                                            // Get articles (children of this section)
                                            $article_args = [
                                                'post_type' => 'docs',
                                                'post_status' => 'publish',
                                                'post_parent' => $section->ID,
                                                'orderby' => $order_by,
                                                'order' => $order,
                                            ];

                                            if ($articles_per_section !== 'all') {
                                                $article_args['posts_per_page'] = intval($articles_per_section);
                                            } else {
                                                $article_args['posts_per_page'] = -1;
                                            }

                                            $articles = get_posts($article_args);

                                            if (!empty($articles)):
                                            ?>
                                                <ul class="wedocs-docs-grid__articles <?php echo $keep_collapsed ? 'wedocs-docs-grid__articles--collapsed' : ''; ?>">
                                                    <?php foreach ($articles as $article): ?>
                                                        <li>
                                                            <a href="<?php echo get_permalink($article->ID); ?>" class="wedocs-docs-grid__article-link">
                                                                → <?php echo esc_html($article->post_title); ?>
                                                            </a>
                                                        </li>
                                                    <?php endforeach; ?>
                                                </ul>
                                            <?php endif; ?>
                                        </div>
                                <?php
                                    endforeach;
                                endif;
                                ?>
                            </div>
                        <?php endif; ?>

                        <?php if ($show_view_details): ?>
                            <a href="<?php echo get_permalink($doc->ID); ?>" class="wedocs-docs-grid__details-link">
                                <?php echo esc_html($button_text); ?>
                            </a>
                        <?php endif; ?>
                    </div>
                <?php endforeach; ?>
            </div>

            <?php if ($enable_pagination && $max_pages > 1): ?>
                <div class="wedocs-pagination" data-pagination-type="<?php echo esc_attr($pagination_type); ?>">
                    <?php if ($show_page_info): ?>
                        <div class="wedocs-page-info">
                            <?php
                            $showing_from = (($paged - 1) * $docs_per_page) + 1;
                            $showing_to = min($paged * $docs_per_page, $total_docs);
                            printf(__('Showing %d-%d of %d', 'wedocs'), $showing_from, $showing_to, $total_docs);
                            ?>
                        </div>
                    <?php endif; ?>

                    <?php if ($pagination_type === 'numbers'): ?>
                        <?php
                        // Number pagination
                        $big = 999999999;
                        echo paginate_links([
                            'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
                            'format' => '?paged=%#%',
                            'current' => max(1, $paged),
                            'total' => $max_pages,
                            'prev_text' => '&laquo;',
                            'next_text' => '&raquo;',
                            'type' => 'plain',
                        ]);
                        ?>
                    <?php elseif ($pagination_type === 'prev_next'): ?>
                        <div class="wedocs-prev-next">
                            <?php if ($paged > 1): ?>
                                <a href="<?php echo get_pagenum_link($paged - 1); ?>" class="wedocs-prev"><?php _e('Previous', 'wedocs'); ?></a>
                            <?php endif; ?>

                            <span class="wedocs-page-current"><?php printf(__('Page %d of %d', 'wedocs'), $paged, $max_pages); ?></span>

                            <?php if ($paged < $max_pages): ?>
                                <a href="<?php echo get_pagenum_link($paged + 1); ?>" class="wedocs-next"><?php _e('Next', 'wedocs'); ?></a>
                            <?php endif; ?>
                        </div>
                    <?php elseif ($pagination_type === 'ajax' || $pagination_type === 'infinite'): ?>
                        <?php if ($paged < $max_pages): ?>
                            <button class="wedocs-load-more"
                                data-page="<?php echo $paged; ?>"
                                data-max-pages="<?php echo $max_pages; ?>"
                                data-widget-id="<?php echo $this->get_id(); ?>">
                                <?php echo esc_html($load_more_text); ?>
                            </button>
                        <?php endif; ?>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
        </div><?php // Close wedocs-grid-wrapper
                ?>

        <style>
            .wedocs-grid-wrapper {
                width: 100%;
            }

            .wedocs-grid-filters {
                display: flex;
                gap: 15px;
                margin-bottom: 25px;
                align-items: center;
                flex-wrap: wrap;
            }

            .wedocs-grid-search {
                flex: 1;
                min-width: 200px;
            }

            .wedocs-grid-search input {
                width: 100%;
                padding: 10px 15px;
                border: 1px solid #ddd;
                border-radius: 4px;
                font-size: 14px;
            }

            .wedocs-grid-sort {
                min-width: 180px;
            }

            .wedocs-grid-sort select {
                width: 100%;
                padding: 10px 15px;
                border: 1px solid #ddd;
                border-radius: 4px;
                font-size: 14px;
                background: white;
            }

            .wedocs-grid-count {
                margin-bottom: 15px;
                color: #666;
                font-size: 14px;
            }

            .wedocs-docs-grid--2x2 {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
            }

            .wedocs-docs-grid__item {
                position: relative;
            }

            .wedocs-docs-grid__title {
                margin-top: 0;
                margin-bottom: 15px;
            }

            .wedocs-docs-grid__title a {
                text-decoration: none;
                color: inherit;
            }

            .wedocs-docs-grid__icon {
                margin-right: 8px;
            }

            .wedocs-docs-grid__section {
                margin-bottom: 15px;
            }

            .wedocs-docs-grid__section-title {
                font-size: 1.1em;
                margin: 10px 0 5px;
                font-weight: 600;
            }

            .wedocs-docs-grid__section-link {
                text-decoration: none;
            }

            .wedocs-docs-grid__articles {
                list-style: none;
                padding: 0;
                margin: 0;
            }

            .wedocs-docs-grid__articles li {
                padding: 3px 0;
            }

            .wedocs-docs-grid__article-link {
                text-decoration: none;
                display: block;
            }

            .wedocs-docs-grid__articles--collapsed {
                display: none;
            }

            .wedocs-docs-grid__details-link {
                text-decoration: none;
                display: inline-block;
            }

            /* Pagination Styles */
            .wedocs-pagination {
                margin-top: 30px;
                text-align: center;
            }

            .wedocs-pagination a,
            .wedocs-pagination span {
                display: inline-block;
                padding: 8px 12px;
                margin: 0 5px 5px 0;
                background: #f5f5f5;
                color: #333;
                text-decoration: none;
                border-radius: 3px;
                transition: all 0.3s ease;
            }

            .wedocs-pagination a:hover {
                background: #0073aa;
                color: #fff;
            }

            .wedocs-pagination .current {
                background: #0073aa;
                color: #fff;
            }

            .wedocs-page-info {
                margin-bottom: 15px;
                color: #666;
                font-size: 14px;
            }

            .wedocs-prev-next {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 15px;
            }

            .wedocs-prev-next a {
                background: #0073aa;
                color: #fff;
                padding: 10px 20px;
                border-radius: 4px;
                text-decoration: none;
            }

            .wedocs-prev-next .wedocs-page-current {
                background: transparent;
                color: #333;
            }

            .wedocs-load-more {
                background: #0073aa;
                color: #fff;
                border: none;
                padding: 12px 30px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
                transition: all 0.3s ease;
            }

            .wedocs-load-more:hover {
                background: #005177;
                transform: translateY(-2px);
            }

            .wedocs-load-more.loading {
                opacity: 0.6;
                cursor: not-allowed;
            }

            @media (max-width: 768px) {
                .wedocs-docs-grid--2x2 {
                    grid-template-columns: 1fr;
                }

                .wedocs-grid-filters {
                    flex-direction: column;
                    align-items: stretch;
                }

                .wedocs-grid-search,
                .wedocs-grid-sort {
                    width: 100%;
                }
            }

            <?php if (($settings['gridHoverEffect'] ?? 'yes') === 'yes'): ?>.wedocs-docs-grid__item {
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }

            .wedocs-docs-grid__item:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
            }

            <?php endif; ?>@media (max-width: 768px) {
                .wedocs-docs-grid--2x2 {
                    grid-template-columns: 1fr;
                }
            }
        </style>

        <script>
            (function($) {
                'use strict';

                // Search functionality
                $('.wedocs-grid-search-input').on('keyup', function() {
                    var searchTerm = $(this).val().toLowerCase();
                    var gridId = $(this).data('grid-id');
                    var $grid = $('.wedocs-docs-grid[data-grid-id="' + gridId + '"]');

                    $grid.find('.wedocs-docs-grid__item').each(function() {
                        var $item = $(this);
                        var text = $item.text().toLowerCase();

                        if (text.indexOf(searchTerm) > -1) {
                            $item.show();
                        } else {
                            $item.hide();
                        }
                    });
                });

                // Sort functionality
                $('.wedocs-grid-sort-select').on('change', function() {
                    var sortValue = $(this).val();
                    var gridId = $(this).data('grid-id');
                    var $grid = $('.wedocs-docs-grid[data-grid-id="' + gridId + '"]');
                    var $items = $grid.find('.wedocs-docs-grid__item');

                    $items.sort(function(a, b) {
                        var aTitle = $(a).find('.wedocs-docs-grid__title a').text();
                        var bTitle = $(b).find('.wedocs-docs-grid__title a').text();

                        if (sortValue === 'title_asc') {
                            return aTitle.localeCompare(bTitle);
                        } else if (sortValue === 'title_desc') {
                            return bTitle.localeCompare(aTitle);
                        }
                        return 0;
                    });

                    $grid.html($items);
                });

                // AJAX Load More
                $('.wedocs-load-more').on('click', function(e) {
                    e.preventDefault();
                    var $button = $(this);
                    var page = parseInt($button.data('page'));
                    var maxPages = parseInt($button.data('max-pages'));
                    var widgetId = $button.data('widget-id');
                    var paginationType = $button.closest('.wedocs-pagination').data('pagination-type');

                    if ($button.hasClass('loading')) return;

                    $button.addClass('loading').text('<?php _e('Loading...', 'wedocs'); ?>');

                    $.ajax({
                        url: '<?php echo admin_url('admin-ajax.php'); ?>',
                        type: 'POST',
                        data: {
                            action: 'wedocs_load_more_docs',
                            page: page + 1,
                            widget_id: widgetId,
                            nonce: '<?php echo wp_create_nonce('wedocs_load_more'); ?>'
                        },
                        success: function(response) {
                            if (response.success && response.data.html) {
                                var $newItems = $(response.data.html);
                                $('.wedocs-docs-grid[data-grid-id="' + widgetId + '"]').append($newItems);

                                $button.data('page', page + 1);
                                $button.removeClass('loading').text('<?php echo esc_js($load_more_text); ?>');

                                if (page + 1 >= maxPages) {
                                    $button.fadeOut();
                                }
                            }
                        },
                        error: function() {
                            $button.removeClass('loading').text('<?php _e('Try Again', 'wedocs'); ?>');
                        }
                    });
                });

                // Infinite Scroll
                if ($('.wedocs-pagination[data-pagination-type="infinite"]').length) {
                    var infiniteScrollObserver = new IntersectionObserver(function(entries) {
                        entries.forEach(function(entry) {
                            if (entry.isIntersecting) {
                                var $button = $(entry.target).find('.wedocs-load-more');
                                if ($button.length && !$button.hasClass('loading')) {
                                    $button.trigger('click');
                                }
                            }
                        });
                    }, {
                        threshold: 0.5
                    });

                    $('.wedocs-pagination[data-pagination-type="infinite"]').each(function() {
                        infiniteScrollObserver.observe(this);
                    });
                }
            })(jQuery);
        </script>
    <?php
        // Don't close the PHP tag if there's no content_template() after this
    }

    /**
     * Render widget output in the editor.
     */
    protected function content_template() {
    ?>
        <#
            var docStyle=settings.docStyle || '1x1' ;
            var showArticles=settings.showDocArticle==='yes' ;
            var showViewDetails=settings.showViewDetails==='yes' ;
            var buttonText=settings.buttonText || 'View Details' ;
            var enablePagination=settings.enablePagination==='yes' ;
            var paginationType=settings.paginationType || 'numbers' ;
            var enableSearch=settings.enableSearch==='yes' ;
            var enableSorting=settings.enableSorting==='yes' ;
            var showTotalCount=settings.showTotalCount==='yes' ;

            // Grid classes based on doc style
            var gridClass='wedocs-docs-grid' ;
            if (docStyle==='2x2' ) {
            gridClass +=' wedocs-docs-grid--2x2' ;
            } else if (docStyle==='list' ) {
            gridClass +=' wedocs-docs-grid--list' ;
            }

            // Calculate grid item styles
            var itemStyle='border: ' + (settings.gridBorder_border || 'solid' ) + ' ' ;
            itemStyle +=(settings.gridBorder_width ? settings.gridBorder_width.top : '1' ) + 'px ' ;
            itemStyle +=(settings.gridBorder_color || '#e0e0e0' ) + '; ' ;
            itemStyle +='padding: ' + (settings.gridPadding.top || '20' ) + settings.gridPadding.unit + ' ' ;
            itemStyle +=(settings.gridPadding.right || '20' ) + settings.gridPadding.unit + ' ' ;
            itemStyle +=(settings.gridPadding.bottom || '20' ) + settings.gridPadding.unit + ' ' ;
            itemStyle +=(settings.gridPadding.left || '20' ) + settings.gridPadding.unit + '; ' ;
            itemStyle +='margin: ' + (settings.gridMargin.top || '0' ) + settings.gridMargin.unit + ' ' ;
            itemStyle +=(settings.gridMargin.right || '0' ) + settings.gridMargin.unit + ' ' ;
            itemStyle +=(settings.gridMargin.bottom || '15' ) + settings.gridMargin.unit + ' ' ;
            itemStyle +=(settings.gridMargin.left || '0' ) + settings.gridMargin.unit + '; ' ;
            itemStyle +='border-radius: ' + (settings.borderRadius.size || '4' ) + 'px; ' ;
            itemStyle +='background-color: ' + (settings.gridBackgroundColor || '#ffffff' ) + '; ' ;
            if (settings.gridBoxShadow==='yes' ) {
            itemStyle +='box-shadow: 0 2px 8px rgba(0,0,0,0.1); ' ;
            }

            var titleStyle='color: ' + (settings.docTitleColor || '#333333' ) + '; ' ;
            titleStyle +='margin-top: 0; margin-bottom: 15px;' ;

            var sectionTitleStyle='color: ' + (settings.sectionTitleColor || '#444444' ) + '; ' ;
            sectionTitleStyle +='margin: 10px 0 5px; font-weight: 600;' ;

            var linkStyle='color: ' + (settings.articleLinkColor || '#666666' ) + '; ' ;
            linkStyle +='text-decoration: none; display: block; padding: 3px 0;' ;

            var buttonStyle='background-color: ' + (settings.buttonColor || '#0073aa' ) + '; ' ;
            buttonStyle +='color: ' + (settings.buttonTextColor || '#ffffff' ) + '; ' ;
            buttonStyle +='padding: ' + (settings.buttonPadding.top || '10' ) + settings.buttonPadding.unit + ' ' ;
            buttonStyle +=(settings.buttonPadding.right || '20' ) + settings.buttonPadding.unit + ' ' ;
            buttonStyle +=(settings.buttonPadding.bottom || '10' ) + settings.buttonPadding.unit + ' ' ;
            buttonStyle +=(settings.buttonPadding.left || '20' ) + settings.buttonPadding.unit + '; ' ;
            buttonStyle +='margin: ' + (settings.buttonMargin.top || '10' ) + settings.buttonMargin.unit + ' ' ;
            buttonStyle +=(settings.buttonMargin.right || '0' ) + settings.buttonMargin.unit + ' ' ;
            buttonStyle +=(settings.buttonMargin.bottom || '0' ) + settings.buttonMargin.unit + ' ' ;
            buttonStyle +=(settings.buttonMargin.left || '0' ) + settings.buttonMargin.unit + '; ' ;
            buttonStyle +='border-radius: ' + (settings.buttonBorderRadius.size || '4' ) + 'px; ' ;
            buttonStyle +='text-decoration: none; display: inline-block; border: none; cursor: pointer;' ;
            #>

            <div class="wedocs-grid-wrapper">
                <# if (enableSearch || enableSorting) { #>
                    <div class="wedocs-grid-filters" style="display: flex; gap: 15px; margin-bottom: 25px; align-items: center; flex-wrap: wrap;">
                        <# if (enableSearch) { #>
                            <div class="wedocs-grid-search" style="flex: 1; min-width: 200px;">
                                <input type="text" placeholder="{{ settings.searchPlaceholder || 'Search docs...' }}" style="width: 100%; padding: 10px 15px; border: 1px solid #ddd; border-radius: 4px;">
                            </div>
                            <# } #>
                                <# if (enableSorting) { #>
                                    <div class="wedocs-grid-sort" style="min-width: 180px;">
                                        <select style="width: 100%; padding: 10px 15px; border: 1px solid #ddd; border-radius: 4px; background: white;">
                                            <option>Title (A-Z)</option>
                                            <option>Title (Z-A)</option>
                                            <option>Newest First</option>
                                            <option>Oldest First</option>
                                        </select>
                                    </div>
                                    <# } #>
                    </div>
                    <# } #>

                        <# if (showTotalCount) { #>
                            <div class="wedocs-grid-count" style="margin-bottom: 15px; color: #666; font-size: 14px;">
                                Total: 24 documents
                            </div>
                            <# } #>

                                <div class="{{ gridClass }}" style="<# if (docStyle === '2x2') { #>display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;<# } #>">
                                    <#
                                        var numItems=docStyle==='2x2' ? 4 : (docStyle==='list' ? 3 : 2);
                                        for (var i=1; i <=numItems; i++) {
                                        #>
                                        <div class="wedocs-docs-grid__item" style="{{ itemStyle }}">
                                            <h3 class="wedocs-docs-grid__title" style="{{ titleStyle }}">
                                                <# if (docStyle==='list' ) { #>
                                                    📄
                                                    <# } #>
                                                        Documentation {{ i }}
                                            </h3>

                                            <# if (showArticles) { #>
                                                <div class="wedocs-docs-grid__content">
                                                    <div class="wedocs-docs-grid__section" style="margin-bottom: 10px;">
                                                        <h4 class="wedocs-docs-grid__section-title" style="{{ sectionTitleStyle }}">Getting Started</h4>
                                                        <ul style="list-style: none; padding: 0; margin: 0;">
                                                            <li><a href="#" class="wedocs-docs-grid__article-link" style="{{ linkStyle }}">→ Introduction</a></li>
                                                            <li><a href="#" class="wedocs-docs-grid__article-link" style="{{ linkStyle }}">→ Installation Guide</a></li>
                                                            <li><a href="#" class="wedocs-docs-grid__article-link" style="{{ linkStyle }}">→ Quick Start</a></li>
                                                        </ul>
                                                    </div>
                                                    <div class="wedocs-docs-grid__section">
                                                        <h4 class="wedocs-docs-grid__section-title" style="{{ sectionTitleStyle }}">Advanced Topics</h4>
                                                        <ul style="list-style: none; padding: 0; margin: 0;">
                                                            <li><a href="#" class="wedocs-docs-grid__article-link" style="{{ linkStyle }}">→ Configuration</a></li>
                                                            <li><a href="#" class="wedocs-docs-grid__article-link" style="{{ linkStyle }}">→ API Reference</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <# } #>

                                                    <# if (showViewDetails) { #>
                                                        <a href="#" class="wedocs-docs-grid__details-link" style="{{ buttonStyle }}">
                                                            {{ buttonText }}
                                                        </a>
                                                        <# } #>
                                        </div>
                                        <# } #>
                                </div>

                                <# if (enablePagination) { #>
                                    <div class="wedocs-pagination" style="margin-top: 30px; text-align: center;">
                                        <# if (paginationType==='numbers' ) { #>
                                            <a href="#" style="display: inline-block; padding: 8px 12px; margin: 0 5px; background: #f5f5f5; color: #333; text-decoration: none; border-radius: 3px;">&laquo;</a>
                                            <span class="current" style="display: inline-block; padding: 8px 12px; margin: 0 5px; background: #0073aa; color: #fff; border-radius: 3px;">1</span>
                                            <a href="#" style="display: inline-block; padding: 8px 12px; margin: 0 5px; background: #f5f5f5; color: #333; text-decoration: none; border-radius: 3px;">2</a>
                                            <a href="#" style="display: inline-block; padding: 8px 12px; margin: 0 5px; background: #f5f5f5; color: #333; text-decoration: none; border-radius: 3px;">3</a>
                                            <a href="#" style="display: inline-block; padding: 8px 12px; margin: 0 5px; background: #f5f5f5; color: #333; text-decoration: none; border-radius: 3px;">&raquo;</a>
                                            <# } else if (paginationType==='prev_next' ) { #>
                                                <div style="display: flex; justify-content: center; align-items: center; gap: 15px;">
                                                    <a href="#" style="background: #0073aa; color: #fff; padding: 10px 20px; border-radius: 4px; text-decoration: none;">Previous</a>
                                                    <span style="color: #333;">Page 1 of 5</span>
                                                    <a href="#" style="background: #0073aa; color: #fff; padding: 10px 20px; border-radius: 4px; text-decoration: none;">Next</a>
                                                </div>
                                                <# } else if (paginationType==='ajax' || paginationType==='infinite' ) { #>
                                                    <button style="background: #0073aa; color: #fff; border: none; padding: 12px 30px; border-radius: 4px; cursor: pointer; font-size: 14px;">
                                                        {{ settings.loadMoreText || 'Load More' }}
                                                    </button>
                                                    <# } #>
                                    </div>
                                    <# } #>
            </div><?php // Close wedocs-grid-wrapper
                    ?>

            <style>
                .wedocs-docs-grid__article-link:hover,
                .wedocs-docs-grid__section-link:hover {
                    color: {
                            {
                            settings.docChildrenActiveColor || '#0073aa'
                        }
                    }

                    !important;
                }

                .wedocs-docs-grid__details-link:hover {
                    background-color: {
                            {
                            settings.buttonHoverColor || '#005177'
                        }
                    }

                    !important;

                    color: {
                            {
                            settings.buttonHoverTextColor || '#ffffff'
                        }
                    }

                    !important;
                }

                <# if (settings.gridHoverEffect==='yes') {
                    #>.wedocs-docs-grid__item {
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                    }

                    .wedocs-docs-grid__item:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
                    }

                    <#
                }

                #>
            </style>
    <?php
    }
}
