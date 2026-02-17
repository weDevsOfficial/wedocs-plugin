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
        return 'eicon-posts-grid';
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
            ]
        );

        // Get all docs for exclude option
        $cache_key = 'wedocs_parent_docs_options';
        $docs_options = wp_cache_get($cache_key);

        if ($docs_options === false) {
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
            wp_cache_set($cache_key, $docs_options, '', HOUR_IN_SECONDS);
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

        $this->add_responsive_control(
            'gridGap',
            [
                'label' => __('Grid Gap', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'size_units' => ['px', '%', 'em'],
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 100,
                        'step' => 1,
                    ],
                ],
                'default' => [
                    'size' => 20,
                    'unit' => 'px',
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid--2x2' => 'gap: {{SIZE}}{{UNIT}};',
                ],
                'condition' => [
                    'docStyle' => '2x2',
                ],
            ]
        );

        $this->add_responsive_control(
            'grid2x2Columns',
            [
                'label' => __('Columns', 'wedocs'),
                'type' => Controls_Manager::SELECT,
                'options' => [
                    '1' => __('1 Column', 'wedocs'),
                    '2' => __('2 Columns', 'wedocs'),
                    '3' => __('3 Columns', 'wedocs'),
                    '4' => __('4 Columns', 'wedocs'),
                ],
                'default' => '2',
                'tablet_default' => '2',
                'mobile_default' => '1',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid--2x2' => 'grid-template-columns: repeat({{VALUE}}, 1fr);',
                ],
                'condition' => [
                    'docStyle' => '2x2',
                ],
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

        $this->add_group_control(
            \Elementor\Group_Control_Box_Shadow::get_type(),
            [
                'name' => 'gridBoxShadow',
                'label' => __('Box Shadow', 'wedocs'),
                'selector' => '{{WRAPPER}} .wedocs-docs-grid__item',
            ]
        );

        $this->add_group_control(
            \Elementor\Group_Control_Box_Shadow::get_type(),
            [
                'name' => 'gridHoverBoxShadow',
                'label' => __('Hover Box Shadow', 'wedocs'),
                'selector' => '{{WRAPPER}} .wedocs-docs-grid__item:hover',
            ]
        );

        $this->add_control(
            'gridHoverEffect',
            [
                'label' => __('Hover Lift Effect', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => __('Yes', 'wedocs'),
                'label_off' => __('No', 'wedocs'),
                'return_value' => 'yes',
                'default' => 'yes',
                'description' => __('Lift card up on hover', 'wedocs'),
            ]
        );

        $this->add_control(
            'gridHoverTransform',
            [
                'label' => __('Hover Lift Distance', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => -20,
                        'max' => 20,
                        'step' => 1,
                    ],
                ],
                'default' => [
                    'size' => -2,
                ],
                'condition' => [
                    'gridHoverEffect' => 'yes',
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__item:hover' => 'transform: translateY({{SIZE}}{{UNIT}});',
                ],
            ]
        );

        $this->add_control(
            'gridTransitionSpeed',
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
                    '{{WRAPPER}} .wedocs-docs-grid__item' => 'transition: all {{SIZE}}ms ease;',
                ],
            ]
        );

        $this->add_control(
            'gridOpacity',
            [
                'label' => __('Opacity', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 1,
                        'step' => 0.1,
                    ],
                ],
                'default' => [
                    'size' => 1,
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__item' => 'opacity: {{SIZE}};',
                ],
            ]
        );

        $this->add_control(
            'gridHoverOpacity',
            [
                'label' => __('Hover Opacity', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 1,
                        'step' => 0.1,
                    ],
                ],
                'default' => [
                    'size' => 1,
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__item:hover' => 'opacity: {{SIZE}};',
                ],
            ]
        );

        $this->add_control(
            'gridHoverBackgroundColor',
            [
                'label' => __('Hover Background Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__item:hover' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'gridHoverBorderColor',
            [
                'label' => __('Hover Border Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__item:hover' => 'border-color: {{VALUE}};',
                ],
            ]
        );

        $this->end_controls_section();

        // Style Section - Card Header
        $this->start_controls_section(
            'style_card_header',
            [
                'label' => __('Card Header', 'wedocs'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'cardHeaderBackgroundColor',
            [
                'label' => __('Background Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__header' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'cardHeaderPadding',
            [
                'label' => __('Padding', 'wedocs'),
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
                    '{{WRAPPER}} .wedocs-docs-grid__header' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'cardHeaderMargin',
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
                    '{{WRAPPER}} .wedocs-docs-grid__header' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Border::get_type(),
            [
                'name' => 'cardHeaderBorder',
                'label' => __('Border', 'wedocs'),
                'selector' => '{{WRAPPER}} .wedocs-docs-grid__header',
            ]
        );

        $this->add_control(
            'cardHeaderBorderRadius',
            [
                'label' => __('Border Radius', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%'],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__header' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'cardHeaderAlign',
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
                'default' => 'left',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__header' => 'text-align: {{VALUE}};',
                ],
            ]
        );

        $this->end_controls_section();

        // Style Section - Card Content/Body
        $this->start_controls_section(
            'style_card_body',
            [
                'label' => __('Card Content/Body', 'wedocs'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'cardBodyBackgroundColor',
            [
                'label' => __('Background Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__content' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'cardBodyPadding',
            [
                'label' => __('Padding', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%', 'em'],
                'default' => [
                    'top' => 0,
                    'right' => 0,
                    'bottom' => 10,
                    'left' => 0,
                    'unit' => 'px',
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__content' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'cardBodyMargin',
            [
                'label' => __('Margin', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%', 'em'],
                'default' => [
                    'top' => 0,
                    'right' => 0,
                    'bottom' => 10,
                    'left' => 0,
                    'unit' => 'px',
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__content' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Border::get_type(),
            [
                'name' => 'cardBodyBorder',
                'label' => __('Border', 'wedocs'),
                'selector' => '{{WRAPPER}} .wedocs-docs-grid__content',
            ]
        );

        $this->add_control(
            'cardBodyBorderRadius',
            [
                'label' => __('Border Radius', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%'],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__content' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'cardBodyMaxHeight',
            [
                'label' => __('Max Height', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 1000,
                        'step' => 10,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__content' => 'max-height: {{SIZE}}{{UNIT}}; overflow-y: auto;',
                ],
            ]
        );

        $this->end_controls_section();

        // Style Section - List View Specific
        $this->start_controls_section(
            'style_list_view',
            [
                'label' => __('List View', 'wedocs'),
                'tab' => Controls_Manager::TAB_STYLE,
                'condition' => [
                    'docStyle' => 'list',
                ],
            ]
        );

        $this->add_control(
            'listItemSpacing',
            [
                'label' => __('Item Spacing', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 50,
                        'step' => 1,
                    ],
                ],
                'default' => [
                    'size' => 15,
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid--list .wedocs-docs-grid__item' => 'margin-bottom: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'listIcon',
            [
                'label' => __('List Icon', 'wedocs'),
                'type' => Controls_Manager::ICONS,
                'default' => [
                    'value' => 'fas fa-file-alt',
                    'library' => 'fa-solid',
                ],
                'recommended' => [
                    'fa-solid' => [
                        'file-alt',
                        'file',
                        'book',
                        'folder',
                        'file-lines',
                        'scroll',
                        'newspaper',
                        'bookmark',
                    ],
                    'fa-regular' => [
                        'file-alt',
                        'file',
                        'folder',
                        'bookmark',
                    ],
                ],
            ]
        );

        $this->add_control(
            'listIconSize',
            [
                'label' => __('Icon Size', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 10,
                        'max' => 50,
                        'step' => 1,
                    ],
                ],
                'default' => [
                    'size' => 20,
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__icon' => 'font-size: {{SIZE}}{{UNIT}};',
                    '{{WRAPPER}} .wedocs-docs-grid__icon i' => 'font-size: {{SIZE}}{{UNIT}};',
                    '{{WRAPPER}} .wedocs-docs-grid__icon svg' => 'width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'listIconColor',
            [
                'label' => __('Icon Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__icon' => 'color: {{VALUE}};',
                    '{{WRAPPER}} .wedocs-docs-grid__icon i' => 'color: {{VALUE}};',
                    '{{WRAPPER}} .wedocs-docs-grid__icon svg' => 'fill: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'listIconSpacing',
            [
                'label' => __('Icon Spacing', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 30,
                        'step' => 1,
                    ],
                ],
                'default' => [
                    'size' => 8,
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__icon' => 'margin-right: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'listIconRotate',
            [
                'label' => __('Icon Rotation', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 360,
                        'step' => 1,
                    ],
                ],
                'default' => [
                    'size' => 0,
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__icon i' => 'transform: rotate({{SIZE}}deg);',
                    '{{WRAPPER}} .wedocs-docs-grid__icon svg' => 'transform: rotate({{SIZE}}deg);',
                ],
            ]
        );

        $this->add_control(
            'listIconBackgroundColor',
            [
                'label' => __('Icon Background Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__icon' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'listIconPadding',
            [
                'label' => __('Icon Padding', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 30,
                        'step' => 1,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__icon' => 'padding: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'listIconBorderRadius',
            [
                'label' => __('Icon Border Radius', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 50,
                        'step' => 1,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__icon' => 'border-radius: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'listItemDivider',
            [
                'label' => __('Show Divider', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => __('Yes', 'wedocs'),
                'label_off' => __('No', 'wedocs'),
                'return_value' => 'yes',
                'default' => '',
            ]
        );

        $this->add_control(
            'listDividerColor',
            [
                'label' => __('Divider Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#e0e0e0',
                'condition' => [
                    'listItemDivider' => 'yes',
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid--list .wedocs-docs-grid__item' => 'border-bottom: 1px solid {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'listDividerWidth',
            [
                'label' => __('Divider Width', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 1,
                        'max' => 10,
                        'step' => 1,
                    ],
                ],
                'default' => [
                    'size' => 1,
                ],
                'condition' => [
                    'listItemDivider' => 'yes',
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid--list .wedocs-docs-grid__item' => 'border-bottom-width: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->end_controls_section();

        // Style Section - Sections (nested sections within cards)
        $this->start_controls_section(
            'style_sections',
            [
                'label' => __('Sections', 'wedocs'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'sectionBackgroundColor',
            [
                'label' => __('Background Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__section' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'sectionPadding',
            [
                'label' => __('Padding', 'wedocs'),
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
                    '{{WRAPPER}} .wedocs-docs-grid__section' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'sectionMargin',
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
                    '{{WRAPPER}} .wedocs-docs-grid__section' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Border::get_type(),
            [
                'name' => 'sectionBorder',
                'label' => __('Border', 'wedocs'),
                'selector' => '{{WRAPPER}} .wedocs-docs-grid__section',
            ]
        );

        $this->add_control(
            'sectionBorderRadius',
            [
                'label' => __('Border Radius', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%'],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__section' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'sectionSpacing',
            [
                'label' => __('Spacing Between Sections', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 50,
                        'step' => 1,
                    ],
                ],
                'default' => [
                    'size' => 15,
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__section' => 'margin-bottom: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->end_controls_section();

        // Style Section - Article Items
        $this->start_controls_section(
            'style_articles',
            [
                'label' => __('Article Items', 'wedocs'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'articleBackgroundColor',
            [
                'label' => __('Background Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__articles li' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'articleHoverBackgroundColor',
            [
                'label' => __('Hover Background Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#f5f5f5',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__articles li:hover' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'articlePadding',
            [
                'label' => __('Padding', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%', 'em'],
                'default' => [
                    'top' => 5,
                    'right' => 0,
                    'bottom' => 5,
                    'left' => 0,
                    'unit' => 'px',
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__articles li' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'articleMargin',
            [
                'label' => __('Margin', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%', 'em'],
                'default' => [
                    'top' => 0,
                    'right' => 0,
                    'bottom' => 3,
                    'left' => 0,
                    'unit' => 'px',
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__articles li' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Border::get_type(),
            [
                'name' => 'articleBorder',
                'label' => __('Border', 'wedocs'),
                'selector' => '{{WRAPPER}} .wedocs-docs-grid__articles li',
            ]
        );

        $this->add_control(
            'articleBorderRadius',
            [
                'label' => __('Border Radius', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 30,
                        'step' => 1,
                    ],
                ],
                'default' => [
                    'size' => 0,
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__articles li' => 'border-radius: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'articleIconHeading',
            [
                'label' => __('Article Icon/Prefix', 'wedocs'),
                'type' => Controls_Manager::HEADING,
                'separator' => 'before',
            ]
        );

        $this->add_control(
            'articlePrefixType',
            [
                'label' => __('Prefix Type', 'wedocs'),
                'type' => Controls_Manager::SELECT,
                'default' => 'icon',
                'options' => [
                    'icon' => __('Icon', 'wedocs'),
                    'text' => __('Text/Emoji', 'wedocs'),
                ],
            ]
        );

        $this->add_control(
            'articlePrefixIcon',
            [
                'label' => __('Prefix Icon', 'wedocs'),
                'type' => Controls_Manager::ICONS,
                'default' => [
                    'value' => 'fas fa-arrow-right',
                    'library' => 'fa-solid',
                ],
                'recommended' => [
                    'fa-solid' => [
                        'arrow-right',
                        'chevron-right',
                        'angle-right',
                        'caret-right',
                        'circle',
                        'check',
                        'play',
                        'minus',
                        'square',
                    ],
                ],
                'condition' => [
                    'articlePrefixType' => 'icon',
                ],
            ]
        );

        $this->add_control(
            'articlePrefix',
            [
                'label' => __('Prefix Text', 'wedocs'),
                'type' => Controls_Manager::TEXT,
                'default' => '→',
                'description' => __('Enter text or emoji', 'wedocs'),
                'condition' => [
                    'articlePrefixType' => 'text',
                ],
            ]
        );

        $this->add_control(
            'articlePrefixSize',
            [
                'label' => __('Prefix Size', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 8,
                        'max' => 50,
                        'step' => 1,
                    ],
                ],
                'default' => [
                    'size' => 14,
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__article-link::before' => 'font-size: {{SIZE}}{{UNIT}};',
                    '{{WRAPPER}} .wedocs-docs-grid__article-icon' => 'font-size: {{SIZE}}{{UNIT}};',
                    '{{WRAPPER}} .wedocs-docs-grid__article-icon svg' => 'width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'articlePrefixColor',
            [
                'label' => __('Prefix Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#999999',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__article-link::before' => 'color: {{VALUE}};',
                    '{{WRAPPER}} .wedocs-docs-grid__article-icon' => 'color: {{VALUE}};',
                    '{{WRAPPER}} .wedocs-docs-grid__article-icon i' => 'color: {{VALUE}};',
                    '{{WRAPPER}} .wedocs-docs-grid__article-icon svg' => 'fill: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'articlePrefixSpacing',
            [
                'label' => __('Prefix Spacing', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 30,
                        'step' => 1,
                    ],
                ],
                'default' => [
                    'size' => 8,
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__article-link::before' => 'margin-right: {{SIZE}}{{UNIT}};',
                    '{{WRAPPER}} .wedocs-docs-grid__article-icon' => 'margin-right: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'articlePrefixRotate',
            [
                'label' => __('Prefix Rotation', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 360,
                        'step' => 1,
                    ],
                ],
                'default' => [
                    'size' => 0,
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__article-icon i' => 'transform: rotate({{SIZE}}deg);',
                    '{{WRAPPER}} .wedocs-docs-grid__article-icon svg' => 'transform: rotate({{SIZE}}deg);',
                ],
                'condition' => [
                    'articlePrefixType' => 'icon',
                ],
            ]
        );

        $this->add_control(
            'articlePrefixBackgroundColor',
            [
                'label' => __('Prefix Background Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__article-icon' => 'background-color: {{VALUE}};',
                ],
                'condition' => [
                    'articlePrefixType' => 'icon',
                ],
            ]
        );

        $this->add_responsive_control(
            'articlePrefixPadding',
            [
                'label' => __('Prefix Padding', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 30,
                        'step' => 1,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__article-icon' => 'padding: {{SIZE}}{{UNIT}};',
                ],
                'condition' => [
                    'articlePrefixType' => 'icon',
                ],
            ]
        );

        $this->add_control(
            'articlePrefixBorderRadius',
            [
                'label' => __('Prefix Border Radius', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 50,
                        'step' => 1,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__article-icon' => 'border-radius: {{SIZE}}{{UNIT}};',
                ],
                'condition' => [
                    'articlePrefixType' => 'icon',
                ],
            ]
        );

        $this->add_control(
            'articleSpacing',
            [
                'label' => __('Spacing Between Items', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 30,
                        'step' => 1,
                    ],
                ],
                'default' => [
                    'size' => 3,
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__articles li' => 'margin-bottom: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'articleListIndent',
            [
                'label' => __('List Indent', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 50,
                        'step' => 1,
                    ],
                ],
                'default' => [
                    'size' => 10,
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__articles' => 'padding-left: {{SIZE}}{{UNIT}};',
                ],
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

        $this->add_responsive_control(
            'docTitleSpacing',
            [
                'label' => __('Bottom Spacing', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 50,
                        'step' => 1,
                    ],
                ],
                'default' => [
                    'size' => 15,
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__title' => 'margin-bottom: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'docTitleHoverColor',
            [
                'label' => __('Hover Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__title:hover' => 'color: {{VALUE}};',
                ],
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

        $this->add_responsive_control(
            'sectionTitleSpacing',
            [
                'label' => __('Bottom Spacing', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 30,
                        'step' => 1,
                    ],
                ],
                'default' => [
                    'size' => 10,
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__section-title' => 'margin-bottom: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'sectionTitleHoverColor',
            [
                'label' => __('Hover Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__section-title:hover' => 'color: {{VALUE}};',
                ],
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

        $this->add_control(
            'articleLinkDecoration',
            [
                'label' => __('Text Decoration', 'wedocs'),
                'type' => Controls_Manager::SELECT,
                'options' => [
                    'none' => __('None', 'wedocs'),
                    'underline' => __('Underline', 'wedocs'),
                    'overline' => __('Overline', 'wedocs'),
                    'line-through' => __('Line Through', 'wedocs'),
                ],
                'default' => 'none',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__article-link' => 'text-decoration: {{VALUE}};',
                    '{{WRAPPER}} .wedocs-docs-grid__section-link' => 'text-decoration: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'articleLinkHoverDecoration',
            [
                'label' => __('Hover Text Decoration', 'wedocs'),
                'type' => Controls_Manager::SELECT,
                'options' => [
                    'none' => __('None', 'wedocs'),
                    'underline' => __('Underline', 'wedocs'),
                    'overline' => __('Overline', 'wedocs'),
                    'line-through' => __('Line Through', 'wedocs'),
                ],
                'default' => 'underline',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__article-link:hover' => 'text-decoration: {{VALUE}};',
                    '{{WRAPPER}} .wedocs-docs-grid__section-link:hover' => 'text-decoration: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'articleLinkTransition',
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
                    '{{WRAPPER}} .wedocs-docs-grid__article-link' => 'transition: all {{SIZE}}ms ease;',
                    '{{WRAPPER}} .wedocs-docs-grid__section-link' => 'transition: all {{SIZE}}ms ease;',
                ],
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

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'buttonTypography',
                'label' => __('Typography', 'wedocs'),
                'selector' => '{{WRAPPER}} .wedocs-docs-grid__details-link',
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

        $this->add_group_control(
            Group_Control_Border::get_type(),
            [
                'name' => 'buttonBorder',
                'label' => __('Border', 'wedocs'),
                'selector' => '{{WRAPPER}} .wedocs-docs-grid__details-link',
            ]
        );

        $this->add_group_control(
            \Elementor\Group_Control_Box_Shadow::get_type(),
            [
                'name' => 'buttonBoxShadow',
                'label' => __('Box Shadow', 'wedocs'),
                'selector' => '{{WRAPPER}} .wedocs-docs-grid__details-link',
            ]
        );

        $this->add_group_control(
            \Elementor\Group_Control_Box_Shadow::get_type(),
            [
                'name' => 'buttonHoverBoxShadow',
                'label' => __('Hover Box Shadow', 'wedocs'),
                'selector' => '{{WRAPPER}} .wedocs-docs-grid__details-link:hover',
            ]
        );

        $this->add_responsive_control(
            'buttonAlign',
            [
                'label' => __('Alignment', 'wedocs'),
                'type' => Controls_Manager::CHOOSE,
                'options' => [
                    'flex-start' => [
                        'title' => __('Left', 'wedocs'),
                        'icon' => 'eicon-text-align-left',
                    ],
                    'center' => [
                        'title' => __('Center', 'wedocs'),
                        'icon' => 'eicon-text-align-center',
                    ],
                    'flex-end' => [
                        'title' => __('Right', 'wedocs'),
                        'icon' => 'eicon-text-align-right',
                    ],
                ],
                'default' => 'flex-start',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__details-link' => 'align-self: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'buttonWidth',
            [
                'label' => __('Width', 'wedocs'),
                'type' => Controls_Manager::SELECT,
                'options' => [
                    'auto' => __('Auto', 'wedocs'),
                    'full' => __('Full Width', 'wedocs'),
                    'custom' => __('Custom', 'wedocs'),
                ],
                'default' => 'auto',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__details-link' => 'width: {{VALUE}};',
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__details-link[data-width="full"]' => 'width: 100%; align-self: stretch;',
                ],
            ]
        );

        $this->add_responsive_control(
            'buttonCustomWidth',
            [
                'label' => __('Custom Width', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'size_units' => ['px', '%', 'em'],
                'range' => [
                    'px' => [
                        'min' => 50,
                        'max' => 500,
                        'step' => 1,
                    ],
                    '%' => [
                        'min' => 10,
                        'max' => 100,
                        'step' => 1,
                    ],
                ],
                'condition' => [
                    'buttonWidth' => 'custom',
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__details-link' => 'width: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'buttonTextAlign',
            [
                'label' => __('Text Align', 'wedocs'),
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
                    '{{WRAPPER}} .wedocs-docs-grid__details-link' => 'text-align: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'buttonTransitionSpeed',
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
                    '{{WRAPPER}} .wedocs-docs-grid__details-link' => 'transition: all {{SIZE}}ms ease;',
                ],
            ]
        );

        $this->add_control(
            'buttonOpacity',
            [
                'label' => __('Opacity', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 1,
                        'step' => 0.1,
                    ],
                ],
                'default' => [
                    'size' => 1,
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__details-link' => 'opacity: {{SIZE}};',
                ],
            ]
        );

        $this->add_control(
            'buttonHoverOpacity',
            [
                'label' => __('Hover Opacity', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 1,
                        'step' => 0.1,
                    ],
                ],
                'default' => [
                    'size' => 1,
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__details-link:hover' => 'opacity: {{SIZE}};',
                ],
            ]
        );

        $this->add_control(
            'buttonHoverTransform',
            [
                'label' => __('Hover Scale', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0.5,
                        'max' => 1.5,
                        'step' => 0.05,
                    ],
                ],
                'default' => [
                    'size' => 1,
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-docs-grid__details-link:hover' => 'transform: scale({{SIZE}});',
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
            'filterTextColor',
            [
                'label' => __('Text Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#333333',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-grid-search input' => 'color: {{VALUE}};',
                    '{{WRAPPER}} .wedocs-grid-sort select' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'filterPlaceholderColor',
            [
                'label' => __('Placeholder Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#999999',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-grid-search input::placeholder' => 'color: {{VALUE}};',
                ],
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
            'filterBorderWidth',
            [
                'label' => __('Border Width', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 10,
                        'step' => 1,
                    ],
                ],
                'default' => [
                    'size' => 1,
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-grid-search input' => 'border-width: {{SIZE}}{{UNIT}}; border-style: solid;',
                    '{{WRAPPER}} .wedocs-grid-sort select' => 'border-width: {{SIZE}}{{UNIT}}; border-style: solid;',
                ],
            ]
        );

        $this->add_control(
            'filterFocusBorderColor',
            [
                'label' => __('Focus Border Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#0073aa',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-grid-search input:focus' => 'border-color: {{VALUE}}; outline: none;',
                    '{{WRAPPER}} .wedocs-grid-sort select:focus' => 'border-color: {{VALUE}}; outline: none;',
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

        $this->add_responsive_control(
            'filterMargin',
            [
                'label' => __('Margin', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%', 'em'],
                'default' => [
                    'top' => 0,
                    'right' => 0,
                    'bottom' => 25,
                    'left' => 0,
                    'unit' => 'px',
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-grid-filters' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'filterGap',
            [
                'label' => __('Gap Between Items', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 50,
                        'step' => 1,
                    ],
                ],
                'default' => [
                    'size' => 15,
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-grid-filters' => 'gap: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->end_controls_section();

        // Style Section - Document Count
        $this->start_controls_section(
            'style_document_count',
            [
                'label' => __('Document Count', 'wedocs'),
                'tab' => Controls_Manager::TAB_STYLE,
                'condition' => [
                    'showTotalCount' => 'yes',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'documentCountTypography',
                'label' => __('Typography', 'wedocs'),
                'selector' => '{{WRAPPER}} .wedocs-grid-count',
            ]
        );

        $this->add_control(
            'documentCountColor',
            [
                'label' => __('Text Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#666666',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-grid-count' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'documentCountBgColor',
            [
                'label' => __('Background Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .wedocs-grid-count' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'documentCountAlign',
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
                'default' => 'left',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-grid-count' => 'text-align: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'documentCountPadding',
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
                    '{{WRAPPER}} .wedocs-grid-count' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'documentCountMargin',
            [
                'label' => __('Margin', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%', 'em'],
                'default' => [
                    'top' => 0,
                    'right' => 0,
                    'bottom' => 20,
                    'left' => 0,
                    'unit' => 'px',
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-grid-count' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'documentCountBorderRadius',
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
                'selectors' => [
                    '{{WRAPPER}} .wedocs-grid-count' => 'border-radius: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Border::get_type(),
            [
                'name' => 'documentCountBorder',
                'label' => __('Border', 'wedocs'),
                'selector' => '{{WRAPPER}} .wedocs-grid-count',
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
        $enable_view_toggle = ($settings['enableViewToggle'] ?? '') === 'yes';

        // Animation settings
        $item_animation = $settings['itemAnimation'] ?? 'none';
        $animation_delay = $settings['animationDelay']['size'] ?? 100;
        $stagger_animation = ($settings['staggerAnimation'] ?? 'yes') === 'yes';

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
            <?php if ($enable_search || $enable_sorting || $enable_view_toggle): ?>
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

                    <?php if ($enable_view_toggle): ?>
                        <div class="wedocs-view-toggle" data-grid-id="<?php echo $this->get_id(); ?>">
                            <button type="button" class="wedocs-view-toggle__btn <?php echo ($doc_style !== 'list') ? 'active' : ''; ?>" data-view="grid" title="<?php esc_attr_e('Grid View', 'wedocs'); ?>">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="0" width="7" height="7"/><rect x="9" y="0" width="7" height="7"/><rect x="0" y="9" width="7" height="7"/><rect x="9" y="9" width="7" height="7"/></svg>
                            </button>
                            <button type="button" class="wedocs-view-toggle__btn <?php echo ($doc_style === 'list') ? 'active' : ''; ?>" data-view="list" title="<?php esc_attr_e('List View', 'wedocs'); ?>">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="1" width="16" height="3"/><rect x="0" y="6.5" width="16" height="3"/><rect x="0" y="12" width="16" height="3"/></svg>
                            </button>
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
                <?php foreach ($docs as $index => $doc):
                    $anim_class = ($item_animation !== 'none') ? ' wedocs-anim wedocs-anim--' . esc_attr($item_animation) : '';
                    $anim_delay = ($item_animation !== 'none' && $stagger_animation) ? ($index * $animation_delay) : 0;
                ?>
                    <div class="wedocs-docs-grid__item<?php echo $anim_class; ?>"<?php if ($item_animation !== 'none'): ?> data-anim-delay="<?php echo esc_attr($anim_delay); ?>"<?php endif; ?>>
                        <div class="wedocs-docs-grid__header">
                            <h3 class="wedocs-docs-grid__title">
                                <?php if ($doc_style === 'list'): ?>
                                    <span class="wedocs-docs-grid__icon">
                                        <?php
                                        if (!empty($settings['listIcon']['value'])) {
                                            \Elementor\Icons_Manager::render_icon($settings['listIcon'], ['aria-hidden' => 'true']);
                                        } else {
                                            echo '📄';
                                        }
                                        ?>
                                    </span>
                                <?php endif; ?>
                                <a href="<?php echo get_permalink($doc->ID); ?>"><?php echo esc_html($doc->post_title); ?></a>
                            </h3>
                        </div>

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
                                                    <?php
                                                    $prefix_type = $settings['articlePrefixType'] ?? 'icon';
                                                    foreach ($articles as $article):
                                                    ?>
                                                        <li>
                                                            <?php if ($prefix_type === 'icon' && !empty($settings['articlePrefixIcon']['value'])): ?>
                                                                <span class="wedocs-docs-grid__article-icon">
                                                                    <?php \Elementor\Icons_Manager::render_icon($settings['articlePrefixIcon'], ['aria-hidden' => 'true']); ?>
                                                                </span>
                                                                <a href="<?php echo get_permalink($article->ID); ?>" class="wedocs-docs-grid__article-link">
                                                                    <?php echo esc_html($article->post_title); ?>
                                                                </a>
                                                            <?php else: ?>
                                                                <a href="<?php echo get_permalink($article->ID); ?>" class="wedocs-docs-grid__article-link" data-prefix="<?php echo esc_attr($settings['articlePrefix'] ?? '→'); ?>">
                                                                    <?php echo esc_html($article->post_title); ?>
                                                                </a>
                                                            <?php endif; ?>
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

            .wedocs-docs-grid__header {
                display: block;
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
                display: inline-block;
                vertical-align: middle;
            }

            .wedocs-docs-grid__icon i,
            .wedocs-docs-grid__icon svg {
                display: inline-block;
                vertical-align: middle;
            }

            .wedocs-docs-grid__article-icon {
                display: inline-flex;
                align-items: center;
                margin-right: 8px;
                flex-shrink: 0;
            }

            .wedocs-docs-grid__article-icon i,
            .wedocs-docs-grid__article-icon svg {
                display: block;
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
                transition: background-color 0.3s ease;
                display: flex;
                align-items: center;
            }

            .wedocs-docs-grid__article-link {
                text-decoration: none;
                display: inline;
                transition: all 0.3s ease;
            }

            .wedocs-docs-grid__article-link::before {
                content: attr(data-prefix);
                display: inline-block;
                margin-right: 8px;
            }

            .wedocs-docs-grid__articles--collapsed {
                display: none;
            }

            .wedocs-docs-grid__details-link {
                text-decoration: none;
                display: inline-block;
            }

            /* List view specific styles */
            .wedocs-docs-grid--list .wedocs-docs-grid__item {
                display: flex;
                flex-direction: column;
            }

            .wedocs-docs-grid--list .wedocs-docs-grid__details-link {
                align-self: flex-start;
            }

            <?php if (($settings['listItemDivider'] ?? '') === 'yes'): ?>.wedocs-docs-grid--list .wedocs-docs-grid__item {
                border-bottom: 1px solid <?php echo $settings['listDividerColor'] ?? '#e0e0e0'; ?>;
                padding-bottom: 15px;
            }

            .wedocs-docs-grid--list .wedocs-docs-grid__item:last-child {
                border-bottom: none;
            }

            <?php endif; ?>

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

            /* View Toggle */
            .wedocs-view-toggle {
                display: flex;
                gap: 4px;
                align-items: center;
            }

            .wedocs-view-toggle__btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 36px;
                height: 36px;
                border: 1px solid #ddd;
                border-radius: 4px;
                background: #fff;
                color: #999;
                cursor: pointer;
                transition: all 0.2s ease;
                padding: 0;
            }

            .wedocs-view-toggle__btn:hover {
                color: #333;
                border-color: #999;
            }

            .wedocs-view-toggle__btn.active {
                background: #0073aa;
                color: #fff;
                border-color: #0073aa;
            }

            /* Animations */
            .wedocs-anim {
                opacity: 0;
            }

            .wedocs-anim.wedocs-anim--visible {
                animation-fill-mode: forwards;
            }

            .wedocs-anim--fadeIn.wedocs-anim--visible { animation-name: wedocsFadeIn; }
            .wedocs-anim--fadeInUp.wedocs-anim--visible { animation-name: wedocsFadeInUp; }
            .wedocs-anim--fadeInDown.wedocs-anim--visible { animation-name: wedocsFadeInDown; }
            .wedocs-anim--fadeInLeft.wedocs-anim--visible { animation-name: wedocsFadeInLeft; }
            .wedocs-anim--fadeInRight.wedocs-anim--visible { animation-name: wedocsFadeInRight; }
            .wedocs-anim--zoomIn.wedocs-anim--visible { animation-name: wedocsZoomIn; }
            .wedocs-anim--bounceIn.wedocs-anim--visible { animation-name: wedocsBounceIn; }
            .wedocs-anim--slideInUp.wedocs-anim--visible { animation-name: wedocsSlideInUp; }

            @keyframes wedocsFadeIn {
                from { opacity: 0; } to { opacity: 1; }
            }
            @keyframes wedocsFadeInUp {
                from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); }
            }
            @keyframes wedocsFadeInDown {
                from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); }
            }
            @keyframes wedocsFadeInLeft {
                from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); }
            }
            @keyframes wedocsFadeInRight {
                from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); }
            }
            @keyframes wedocsZoomIn {
                from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); }
            }
            @keyframes wedocsBounceIn {
                0% { opacity: 0; transform: scale(0.3); }
                50% { opacity: 1; transform: scale(1.05); }
                70% { transform: scale(0.95); }
                100% { opacity: 1; transform: scale(1); }
            }
            @keyframes wedocsSlideInUp {
                from { opacity: 0; transform: translateY(100%); } to { opacity: 1; transform: translateY(0); }
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

                // View Toggle
                $('.wedocs-view-toggle__btn').on('click', function() {
                    var $btn = $(this);
                    var view = $btn.data('view');
                    var gridId = $btn.closest('.wedocs-view-toggle').data('grid-id');
                    var $grid = $('.wedocs-docs-grid[data-grid-id="' + gridId + '"]');

                    $btn.addClass('active').siblings().removeClass('active');

                    if (view === 'list') {
                        $grid.removeClass('wedocs-docs-grid--2x2').addClass('wedocs-docs-grid--list');
                        $grid.css({'display': 'flex', 'flex-direction': 'column', 'grid-template-columns': ''});
                    } else {
                        $grid.removeClass('wedocs-docs-grid--list').addClass('wedocs-docs-grid--2x2');
                        $grid.css({'display': 'grid', 'grid-template-columns': 'repeat(2, 1fr)', 'flex-direction': ''});
                    }
                });

                // Animations - trigger when items enter viewport
                if ($('.wedocs-anim').length) {
                    var animObserver = new IntersectionObserver(function(entries) {
                        entries.forEach(function(entry) {
                            if (entry.isIntersecting) {
                                var $el = $(entry.target);
                                var delay = parseInt($el.data('anim-delay')) || 0;
                                setTimeout(function() {
                                    $el.css('animation-duration', '0.6s');
                                    $el.addClass('wedocs-anim--visible');
                                }, delay);
                                animObserver.unobserve(entry.target);
                            }
                        });
                    }, { threshold: 0.1 });

                    $('.wedocs-anim').each(function() {
                        animObserver.observe(this);
                    });
                }

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
            var enableViewToggle=settings.enableViewToggle==='yes' ;
            var itemAnimation=settings.itemAnimation || 'none' ;
            var animationDelay=settings.animationDelay?.size || 100 ;
            var staggerAnimation=settings.staggerAnimation==='yes' ;

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

            // Card Header Styles
            var headerStyle='' ;
            if (settings.cardHeaderBackgroundColor) {
            headerStyle +='background-color: ' + settings.cardHeaderBackgroundColor + '; ' ;
            }
            headerStyle +='padding: ' + (settings.cardHeaderPadding?.top || '0' ) + (settings.cardHeaderPadding?.unit || 'px' ) + ' ' ;
            headerStyle +=(settings.cardHeaderPadding?.right || '0' ) + (settings.cardHeaderPadding?.unit || 'px' ) + ' ' ;
            headerStyle +=(settings.cardHeaderPadding?.bottom || '15' ) + (settings.cardHeaderPadding?.unit || 'px' ) + ' ' ;
            headerStyle +=(settings.cardHeaderPadding?.left || '0' ) + (settings.cardHeaderPadding?.unit || 'px' ) + '; ' ;
            headerStyle +='margin: ' + (settings.cardHeaderMargin?.top || '0' ) + (settings.cardHeaderMargin?.unit || 'px' ) + ' ' ;
            headerStyle +=(settings.cardHeaderMargin?.right || '0' ) + (settings.cardHeaderMargin?.unit || 'px' ) + ' ' ;
            headerStyle +=(settings.cardHeaderMargin?.bottom || '0' ) + (settings.cardHeaderMargin?.unit || 'px' ) + ' ' ;
            headerStyle +=(settings.cardHeaderMargin?.left || '0' ) + (settings.cardHeaderMargin?.unit || 'px' ) + '; ' ;
            headerStyle +='text-align: ' + (settings.cardHeaderAlign || 'left' ) + '; ' ;
            if (settings.cardHeaderBorder_border && settings.cardHeaderBorder_border !=='none' ) {
            headerStyle +='border: ' + settings.cardHeaderBorder_border + ' ' ;
            headerStyle +=(settings.cardHeaderBorder_width?.top || '0' ) + 'px ' ;
            headerStyle +=(settings.cardHeaderBorder_color || '#ddd' ) + '; ' ;
            }
            if (settings.cardHeaderBorderRadius) {
            headerStyle +='border-radius: ' + (settings.cardHeaderBorderRadius.top || '0' ) + (settings.cardHeaderBorderRadius.unit || 'px' ) + ' ' ;
            headerStyle +=(settings.cardHeaderBorderRadius.right || '0' ) + (settings.cardHeaderBorderRadius.unit || 'px' ) + ' ' ;
            headerStyle +=(settings.cardHeaderBorderRadius.bottom || '0' ) + (settings.cardHeaderBorderRadius.unit || 'px' ) + ' ' ;
            headerStyle +=(settings.cardHeaderBorderRadius.left || '0' ) + (settings.cardHeaderBorderRadius.unit || 'px' ) + '; ' ;
            }

            // Card Body Styles
            var bodyStyle='' ;
            if (settings.cardBodyBackgroundColor) {
            bodyStyle +='background-color: ' + settings.cardBodyBackgroundColor + '; ' ;
            }
            bodyStyle +='padding: ' + (settings.cardBodyPadding?.top || '0' ) + (settings.cardBodyPadding?.unit || 'px' ) + ' ' ;
            bodyStyle +=(settings.cardBodyPadding?.right || '0' ) + (settings.cardBodyPadding?.unit || 'px' ) + ' ' ;
            bodyStyle +=(settings.cardBodyPadding?.bottom || '10' ) + (settings.cardBodyPadding?.unit || 'px' ) + ' ' ;
            bodyStyle +=(settings.cardBodyPadding?.left || '0' ) + (settings.cardBodyPadding?.unit || 'px' ) + '; ' ;
            bodyStyle +='margin: ' + (settings.cardBodyMargin?.top || '0' ) + (settings.cardBodyMargin?.unit || 'px' ) + ' ' ;
            bodyStyle +=(settings.cardBodyMargin?.right || '0' ) + (settings.cardBodyMargin?.unit || 'px' ) + ' ' ;
            bodyStyle +=(settings.cardBodyMargin?.bottom || '10' ) + (settings.cardBodyMargin?.unit || 'px' ) + ' ' ;
            bodyStyle +=(settings.cardBodyMargin?.left || '0' ) + (settings.cardBodyMargin?.unit || 'px' ) + '; ' ;
            if (settings.cardBodyBorder_border && settings.cardBodyBorder_border !=='none' ) {
            bodyStyle +='border: ' + settings.cardBodyBorder_border + ' ' ;
            bodyStyle +=(settings.cardBodyBorder_width?.top || '0' ) + 'px ' ;
            bodyStyle +=(settings.cardBodyBorder_color || '#ddd' ) + '; ' ;
            }
            if (settings.cardBodyBorderRadius) {
            bodyStyle +='border-radius: ' + (settings.cardBodyBorderRadius.top || '0' ) + (settings.cardBodyBorderRadius.unit || 'px' ) + ' ' ;
            bodyStyle +=(settings.cardBodyBorderRadius.right || '0' ) + (settings.cardBodyBorderRadius.unit || 'px' ) + ' ' ;
            bodyStyle +=(settings.cardBodyBorderRadius.bottom || '0' ) + (settings.cardBodyBorderRadius.unit || 'px' ) + ' ' ;
            bodyStyle +=(settings.cardBodyBorderRadius.left || '0' ) + (settings.cardBodyBorderRadius.unit || 'px' ) + '; ' ;
            }
            if (settings.cardBodyMaxHeight?.size) {
            bodyStyle +='max-height: ' + settings.cardBodyMaxHeight.size + 'px; overflow-y: auto; ' ;
            }

            // Section Styles
            var sectionStyle='' ;
            if (settings.sectionBackgroundColor) {
            sectionStyle +='background-color: ' + settings.sectionBackgroundColor + '; ' ;
            }
            sectionStyle +='padding: ' + (settings.sectionPadding?.top || '0' ) + (settings.sectionPadding?.unit || 'px' ) + ' ' ;
            sectionStyle +=(settings.sectionPadding?.right || '0' ) + (settings.sectionPadding?.unit || 'px' ) + ' ' ;
            sectionStyle +=(settings.sectionPadding?.bottom || '0' ) + (settings.sectionPadding?.unit || 'px' ) + ' ' ;
            sectionStyle +=(settings.sectionPadding?.left || '0' ) + (settings.sectionPadding?.unit || 'px' ) + '; ' ;
            sectionStyle +='margin: ' + (settings.sectionMargin?.top || '0' ) + (settings.sectionMargin?.unit || 'px' ) + ' ' ;
            sectionStyle +=(settings.sectionMargin?.right || '0' ) + (settings.sectionMargin?.unit || 'px' ) + ' ' ;
            sectionStyle +=(settings.sectionMargin?.bottom || '15' ) + (settings.sectionMargin?.unit || 'px' ) + ' ' ;
            sectionStyle +=(settings.sectionMargin?.left || '0' ) + (settings.sectionMargin?.unit || 'px' ) + '; ' ;
            if (settings.sectionBorder_border && settings.sectionBorder_border !=='none' ) {
            sectionStyle +='border: ' + settings.sectionBorder_border + ' ' ;
            sectionStyle +=(settings.sectionBorder_width?.top || '0' ) + 'px ' ;
            sectionStyle +=(settings.sectionBorder_color || '#ddd' ) + '; ' ;
            }
            if (settings.sectionBorderRadius) {
            sectionStyle +='border-radius: ' + (settings.sectionBorderRadius.top || '0' ) + (settings.sectionBorderRadius.unit || 'px' ) + ' ' ;
            sectionStyle +=(settings.sectionBorderRadius.right || '0' ) + (settings.sectionBorderRadius.unit || 'px' ) + ' ' ;
            sectionStyle +=(settings.sectionBorderRadius.bottom || '0' ) + (settings.sectionBorderRadius.unit || 'px' ) + ' ' ;
            sectionStyle +=(settings.sectionBorderRadius.left || '0' ) + (settings.sectionBorderRadius.unit || 'px' ) + '; ' ;
            }

            // Article Item Styles
            var articleItemStyle='' ;
            if (settings.articleBackgroundColor) {
            articleItemStyle +='background-color: ' + settings.articleBackgroundColor + '; ' ;
            }
            articleItemStyle +='padding: ' + (settings.articlePadding?.top || '5' ) + (settings.articlePadding?.unit || 'px' ) + ' ' ;
            articleItemStyle +=(settings.articlePadding?.right || '0' ) + (settings.articlePadding?.unit || 'px' ) + ' ' ;
            articleItemStyle +=(settings.articlePadding?.bottom || '5' ) + (settings.articlePadding?.unit || 'px' ) + ' ' ;
            articleItemStyle +=(settings.articlePadding?.left || '0' ) + (settings.articlePadding?.unit || 'px' ) + '; ' ;
            articleItemStyle +='margin: ' + (settings.articleMargin?.top || '0' ) + (settings.articleMargin?.unit || 'px' ) + ' ' ;
            articleItemStyle +=(settings.articleMargin?.right || '0' ) + (settings.articleMargin?.unit || 'px' ) + ' ' ;
            articleItemStyle +=(settings.articleMargin?.bottom || '3' ) + (settings.articleMargin?.unit || 'px' ) + ' ' ;
            articleItemStyle +=(settings.articleMargin?.left || '0' ) + (settings.articleMargin?.unit || 'px' ) + '; ' ;
            if (settings.articleBorder_border && settings.articleBorder_border !=='none' ) {
            articleItemStyle +='border: ' + settings.articleBorder_border + ' ' ;
            articleItemStyle +=(settings.articleBorder_width?.top || '0' ) + 'px ' ;
            articleItemStyle +=(settings.articleBorder_color || '#ddd' ) + '; ' ;
            }
            if (settings.articleBorderRadius?.size) {
            articleItemStyle +='border-radius: ' + settings.articleBorderRadius.size + 'px; ' ;
            }
            articleItemStyle +='transition: background-color 0.3s ease; ' ;
            articleItemStyle +='display: flex; align-items: center; ' ;

            // Article List Styles
            var articleListStyle='list-style: none; padding: 0; margin: 0; ' ;
            if (settings.articleListIndent?.size) {
            articleListStyle +='padding-left: ' + settings.articleListIndent.size + 'px; ' ;
            }

            // Icon Styles (for list view)
            var iconStyle='display: inline-block; vertical-align: middle; ' ;
            if (settings.listIconSize?.size) {
            iconStyle +='font-size: ' + settings.listIconSize.size + 'px; ' ;
            }
            if (settings.listIconColor) {
            iconStyle +='color: ' + settings.listIconColor + '; ' ;
            }
            if (settings.listIconSpacing?.size) {
            iconStyle +='margin-right: ' + settings.listIconSpacing.size + 'px; ' ;
            }

            var titleStyle='color: ' + (settings.docTitleColor || '#333333' ) + '; ' ;
            titleStyle +='margin-top: 0; margin-bottom: 15px;' ;

            var sectionTitleStyle='color: ' + (settings.sectionTitleColor || '#444444' ) + '; ' ;
            sectionTitleStyle +='margin: 10px 0 5px; font-weight: 600;' ;

            var linkStyle='color: ' + (settings.articleLinkColor || '#666666' ) + '; ' ;
            linkStyle +='text-decoration: none; display: inline;' ;

            var buttonStyle='background-color: ' + (settings.buttonColor || '#0073aa' ) + '; ' ;
            buttonStyle +='color: ' + (settings.buttonTextColor || '#ffffff' ) + '; ' ;
            buttonStyle +='padding: ' + (settings.buttonPadding?.top || '10' ) + (settings.buttonPadding?.unit || 'px' ) + ' ' ;
            buttonStyle +=(settings.buttonPadding?.right || '20' ) + (settings.buttonPadding?.unit || 'px' ) + ' ' ;
            buttonStyle +=(settings.buttonPadding?.bottom || '10' ) + (settings.buttonPadding?.unit || 'px' ) + ' ' ;
            buttonStyle +=(settings.buttonPadding?.left || '20' ) + (settings.buttonPadding?.unit || 'px' ) + '; ' ;
            buttonStyle +='margin: ' + (settings.buttonMargin?.top || '10' ) + (settings.buttonMargin?.unit || 'px' ) + ' ' ;
            buttonStyle +=(settings.buttonMargin?.right || '0' ) + (settings.buttonMargin?.unit || 'px' ) + ' ' ;
            buttonStyle +=(settings.buttonMargin?.bottom || '0' ) + (settings.buttonMargin?.unit || 'px' ) + ' ' ;
            buttonStyle +=(settings.buttonMargin?.left || '0' ) + (settings.buttonMargin?.unit || 'px' ) + '; ' ;
            buttonStyle +='border-radius: ' + (settings.buttonBorderRadius?.size || '4' ) + 'px; ' ;
            buttonStyle +='text-decoration: none; display: inline-block; border: none; cursor: pointer; transition: all 0.3s ease;' ;
            #>

            <div class="wedocs-grid-wrapper">
                <# if (enableSearch || enableSorting || enableViewToggle) { #>
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
                                <# if (enableViewToggle) { #>
                                    <div class="wedocs-view-toggle" style="display: flex; gap: 4px; align-items: center;">
                                        <button type="button" class="wedocs-view-toggle__btn {{ docStyle !== 'list' ? 'active' : '' }}" style="display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border: 1px solid {{ docStyle !== 'list' ? '#0073aa' : '#ddd' }}; border-radius: 4px; background: {{ docStyle !== 'list' ? '#0073aa' : '#fff' }}; color: {{ docStyle !== 'list' ? '#fff' : '#999' }}; cursor: pointer; padding: 0;">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="0" width="7" height="7"/><rect x="9" y="0" width="7" height="7"/><rect x="0" y="9" width="7" height="7"/><rect x="9" y="9" width="7" height="7"/></svg>
                                        </button>
                                        <button type="button" class="wedocs-view-toggle__btn {{ docStyle === 'list' ? 'active' : '' }}" style="display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border: 1px solid {{ docStyle === 'list' ? '#0073aa' : '#ddd' }}; border-radius: 4px; background: {{ docStyle === 'list' ? '#0073aa' : '#fff' }}; color: {{ docStyle === 'list' ? '#fff' : '#999' }}; cursor: pointer; padding: 0;">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="1" width="16" height="3"/><rect x="0" y="6.5" width="16" height="3"/><rect x="0" y="12" width="16" height="3"/></svg>
                                        </button>
                                    </div>
                                    <# } #>
                    </div>
                    <# } #>

                        <# if (showTotalCount) { #>
                            <div class="wedocs-grid-count">
                                Total: 24 documents
                            </div>
                            <# } #>

                                <div class="{{ gridClass }}" style="<# if (docStyle === '2x2') { #>display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;<# } else if (docStyle === 'list') { #>display: flex; flex-direction: column;<# } #>">
                                    <#
                                        var numItems=docStyle==='2x2' ? 4 : (docStyle==='list' ? 3 : 2);
                                        for (var i=1; i <=numItems; i++) {
                                            var animClass = (itemAnimation !== 'none') ? ' wedocs-anim wedocs-anim--' + itemAnimation + ' wedocs-anim--visible' : '';
                                            var animStyle = (itemAnimation !== 'none') ? 'animation-duration: 0.6s; animation-delay: ' + (staggerAnimation ? ((i-1) * animationDelay) : 0) + 'ms;' : '';
                                        #>
                                        <div class="wedocs-docs-grid__item{{ animClass }}" style="{{ itemStyle }} {{ animStyle }}">
                                            <div class="wedocs-docs-grid__header" style="{{ headerStyle }}">
                                                <h3 class="wedocs-docs-grid__title" style="{{ titleStyle }}">
                                                    <# if (docStyle==='list' ) {
                                                        var iconHTML=elementor.helpers.renderIcon( view, settings.listIcon, { 'aria-hidden' : true }, 'i' , 'object' );
                                                        #>
                                                        <span class="wedocs-docs-grid__icon" style="{{ iconStyle }}">
                                                            <# if ( iconHTML && iconHTML.rendered ) { #>
                                                                {{{ iconHTML.value }}}
                                                                <# } else { #>
                                                                    <i class="{{ settings.listIcon.value }}" aria-hidden="true"></i>
                                                                    <# } #>
                                                        </span>
                                                        <# } #>
                                                            Documentation {{ i }}
                                                </h3>
                                            </div>

                                            <# if (showArticles) { #>
                                                <div class="wedocs-docs-grid__content" style="{{ bodyStyle }}">
                                                    <div class="wedocs-docs-grid__section" style="{{ sectionStyle }}">
                                                        <h4 class="wedocs-docs-grid__section-title" style="{{ sectionTitleStyle }}">Getting Started</h4>
                                                        <ul class="wedocs-docs-grid__articles" style="{{ articleListStyle }}">
                                                            <#
                                                                var articlePrefixType=settings.articlePrefixType || 'icon' ;
                                                                var renderArticleLine=function(title) {
                                                                if (articlePrefixType==='icon' && settings.articlePrefixIcon && settings.articlePrefixIcon.value) {
                                                                var prefixIconHTML=elementor.helpers.renderIcon( view, settings.articlePrefixIcon, { 'aria-hidden' : true }, 'i' , 'object' );
                                                                #>
                                                                <li style="{{ articleItemStyle }}">
                                                                    <span class="wedocs-docs-grid__article-icon" style="display: inline-flex; align-items: center; flex-shrink: 0; margin-right: {{ settings.articlePrefixSpacing?.size || '8' }}px; font-size: {{ settings.articlePrefixSize?.size || '14' }}px; color: {{ settings.articlePrefixColor || '#999999' }};">
                                                                        <# if ( prefixIconHTML && prefixIconHTML.rendered ) { #>
                                                                            {{{ prefixIconHTML.value }}}
                                                                            <# } else { #>
                                                                                <i class="{{ settings.articlePrefixIcon.value }}" aria-hidden="true"></i>
                                                                                <# } #>
                                                                    </span>
                                                                    <a href="#" class="wedocs-docs-grid__article-link" style="{{ linkStyle }}">{{ title }}</a>
                                                                </li>
                                                                <# } else { #>
                                                                    <li style="{{ articleItemStyle }}"><a href="#" class="wedocs-docs-grid__article-link" data-prefix="{{ settings.articlePrefix || '→' }}" style="{{ linkStyle }}">{{ title }}</a></li>
                                                                    <# }
                                                                        };
                                                                        renderArticleLine('Introduction');
                                                                        renderArticleLine('Installation Guide');
                                                                        renderArticleLine('Quick Start');
                                                                        #>
                                                        </ul>
                                                    </div>
                                                    <div class="wedocs-docs-grid__section" style="{{ sectionStyle }}">
                                                        <h4 class="wedocs-docs-grid__section-title" style="{{ sectionTitleStyle }}">Advanced Topics</h4>
                                                        <ul class="wedocs-docs-grid__articles" style="{{ articleListStyle }}">
                                                            <#
                                                                renderArticleLine('Configuration');
                                                                renderArticleLine('API Reference');
                                                                #>
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
                <# if (settings.articlePrefixType==='text') {
                    #>.wedocs-docs-grid__article-link::before {
                        content: attr(data-prefix);
                        display: inline-block;

                        margin-right: {
                                {
                                settings.articlePrefixSpacing?.size || '8'
                            }
                        }

                        px;

                        <# if (settings.articlePrefixColor) {
                            #>color: {
                                    {
                                    settings.articlePrefixColor
                                }
                            }

                            ;
                            <#
                        }

                        #><# if (settings.articlePrefixSize?.size) {
                            #>font-size: {
                                    {
                                    settings.articlePrefixSize.size
                                }
                            }

                            px;
                            <#
                        }

                        #>
                    }

                    <#
                }

                #>.wedocs-docs-grid__article-icon {
                    display: inline-flex;
                    align-items: center;
                    flex-shrink: 0;
                }

                .wedocs-docs-grid__article-icon i,
                .wedocs-docs-grid__article-icon svg {
                    display: block;
                }

                .wedocs-docs-grid__icon i,
                .wedocs-docs-grid__icon svg {
                    display: inline-block;
                    vertical-align: middle;
                }

                .wedocs-docs-grid__article-link:hover,
                .wedocs-docs-grid__section-link:hover {
                    color: {
                            {
                            settings.docChildrenActiveColor || '#0073aa'
                        }
                    }

                    !important;
                }

                .wedocs-docs-grid__articles li:hover {
                    <# if (settings.articleHoverBackgroundColor) {
                        #>background-color: {
                                {
                                settings.articleHoverBackgroundColor
                            }
                        }

                        !important;
                        <#
                    }

                    #>
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

                .wedocs-docs-grid__header {
                    display: block;
                }

                .wedocs-docs-grid__articles li {
                    transition: background-color 0.3s ease;
                }

                <# if (docStyle==='list' && settings.listItemDivider==='yes') {
                    #>.wedocs-docs-grid--list .wedocs-docs-grid__item {
                        border-bottom: {
                                {
                                settings.listDividerWidth?.size || '1'
                            }
                        }

                        px solid {
                                {
                                settings.listDividerColor || '#e0e0e0'
                            }
                        }

                        ;
                        padding-bottom: 15px;
                    }

                    .wedocs-docs-grid--list .wedocs-docs-grid__item:last-child {
                        border-bottom: none;
                    }

                    <#
                }

                #><# if (docStyle==='list' && settings.listItemSpacing?.size) {
                    #>.wedocs-docs-grid--list .wedocs-docs-grid__item {
                        margin-bottom: {
                                {
                                settings.listItemSpacing.size
                            }
                        }

                        px;
                    }

                    <#
                }

                #><# if (settings.gridHoverEffect==='yes') {
                    #>.wedocs-docs-grid__item {
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                    }

                    .wedocs-docs-grid__item:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
                    }

                    <#
                }

                #>.wedocs-docs-grid--list .wedocs-docs-grid__details-link {
                    align-self: flex-start;
                }

                @media (max-width: 768px) {
                    .wedocs-docs-grid--2x2 {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
    <?php
    }
}
