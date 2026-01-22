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
                'type' => Controls_Manager::SELECT,
                'default' => 'all',
                'options' => [
                    'all' => __('Show All', 'wedocs'),
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
    }

    /**
     * Render widget output on the frontend.
     */
    protected function render() {
        $settings = $this->get_settings_for_display();

        // Get settings
        $doc_style = $settings['docStyle'] ?? '1x1';
        $docs_per_page = $settings['docsPerPage'] ?? 'all';
        $exclude_docs = $settings['excludeDocs'] ?? [];
        $order = $settings['order'] ?? 'asc';
        $order_by = $settings['orderBy'] ?? 'menu_order';
        $sections_per_doc = $settings['sectionsPerDoc'] ?? 'all';
        $articles_per_section = $settings['articlesPerSection'] ?? 'all';
        $show_articles = ($settings['showDocArticle'] ?? 'yes') === 'yes';
        $keep_collapsed = ($settings['keepArticlesCollapsed'] ?? '') === 'yes';
        $show_view_details = ($settings['showViewDetails'] ?? 'yes') === 'yes';
        $button_text = $settings['buttonText'] ?? __('View Details', 'wedocs');

        // Query args
        $args = [
            'post_type' => 'docs',
            'post_status' => 'publish',
            'post_parent' => 0,
            'orderby' => $order_by,
            'order' => $order,
        ];

        if ($docs_per_page !== 'all') {
            $args['posts_per_page'] = intval($docs_per_page);
        } else {
            $args['posts_per_page'] = -1;
        }

        if (!empty($exclude_docs)) {
            $args['post__not_in'] = $exclude_docs;
        }

        $docs = get_posts($args);

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
        <div class="<?php echo esc_attr($grid_class); ?>">
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

        <style>
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
    <?php
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
