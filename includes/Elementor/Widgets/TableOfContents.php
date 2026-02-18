<?php

namespace WeDevs\WeDocs\Elementor\Widgets;

use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Box_Shadow;

/**
 * WeDocs Table of Contents (On This Page) Widget for Elementor
 */
class TableOfContents extends Widget_Base {

    public function get_name() {
        return 'wedocs-toc';
    }

    public function get_title() {
        return __('weDocs - Table of Contents', 'wedocs');
    }

    public function get_icon() {
        return 'eicon-table-of-contents';
    }

    public function get_categories() {
        return ['wedocs-category'];
    }

    public function get_keywords() {
        return ['toc', 'table of contents', 'on this page', 'wedocs', 'navigation'];
    }

    /**
     * Get the proper post context for editor mode
     */
    protected function get_editor_post_context() {
        global $post;

        // If we have a valid docs post, use it
        if ($post && $post->post_type === 'docs') {
            return $post;
        }

        // In editor mode, try to get the post being edited
        if (\Elementor\Plugin::$instance->editor->is_edit_mode()) {
            $document = \Elementor\Plugin::$instance->documents->get_current();
            if ($document) {
                $edit_post = get_post($document->get_main_id());
                if ($edit_post && $edit_post->post_type === 'docs') {
                    return $edit_post;
                }
            }

            // Return a sample post for preview
            return (object) [
                'ID' => 0,
                'post_content' => '<h2>Introduction</h2><p>Welcome to the documentation.</p><h3>Getting Started</h3><p>First steps...</p><h2>Configuration</h2><p>How to configure...</p><h3>Basic Settings</h3><p>Basic configuration...</p><h3>Advanced Options</h3><p>Advanced settings...</p><h2>Troubleshooting</h2><p>Common issues...</p>'
            ];
        }

        return null;
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
            'title',
            [
                'label' => __('Title', 'wedocs'),
                'type' => Controls_Manager::TEXT,
                'default' => __('On This Page', 'wedocs'),
            ]
        );

        $this->add_control(
            'title_tag',
            [
                'label' => __('Title HTML Tag', 'wedocs'),
                'type' => Controls_Manager::SELECT,
                'default' => 'h3',
                'options' => [
                    'h2' => 'H2',
                    'h3' => 'H3',
                    'h4' => 'H4',
                    'h5' => 'H5',
                    'div' => 'DIV',
                    'span' => 'SPAN',
                ],
            ]
        );

        $this->add_control(
            'heading_levels',
            [
                'label' => __('Heading Levels', 'wedocs'),
                'type' => Controls_Manager::SELECT2,
                'multiple' => true,
                'default' => ['2', '3'],
                'options' => [
                    '2' => 'H2',
                    '3' => 'H3',
                    '4' => 'H4',
                    '5' => 'H5',
                    '6' => 'H6',
                ],
                'description' => __('Select which heading levels to include', 'wedocs'),
            ]
        );

        $this->add_control(
            'collapsible',
            [
                'label' => __('Collapsible', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => __('Yes', 'wedocs'),
                'label_off' => __('No', 'wedocs'),
                'return_value' => 'yes',
                'default' => '',
            ]
        );

        $this->add_control(
            'collapsed_default',
            [
                'label' => __('Collapsed by Default', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => __('Yes', 'wedocs'),
                'label_off' => __('No', 'wedocs'),
                'return_value' => 'yes',
                'default' => '',
                'condition' => [
                    'collapsible' => 'yes',
                ],
            ]
        );

        $this->add_control(
            'sticky',
            [
                'label' => __('Sticky Position', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => __('Yes', 'wedocs'),
                'label_off' => __('No', 'wedocs'),
                'return_value' => 'yes',
                'default' => '',
                'description' => __('Make TOC sticky when scrolling', 'wedocs'),
            ]
        );

        $this->add_control(
            'sticky_offset',
            [
                'label' => __('Sticky Offset (px)', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 200,
                    ],
                ],
                'default' => [
                    'size' => 20,
                ],
                'condition' => [
                    'sticky' => 'yes',
                ],
            ]
        );

        $this->add_control(
            'show_numbers',
            [
                'label' => __('Show Numbers', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => __('Yes', 'wedocs'),
                'label_off' => __('No', 'wedocs'),
                'return_value' => 'yes',
                'default' => '',
            ]
        );

        $this->add_control(
            'smooth_scroll',
            [
                'label' => __('Smooth Scroll', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => __('Yes', 'wedocs'),
                'label_off' => __('No', 'wedocs'),
                'return_value' => 'yes',
                'default' => 'yes',
            ]
        );

        $this->add_control(
            'highlight_active',
            [
                'label' => __('Highlight Active Section', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => __('Yes', 'wedocs'),
                'label_off' => __('No', 'wedocs'),
                'return_value' => 'yes',
                'default' => 'yes',
            ]
        );

        $this->end_controls_section();

        // Responsive Section
        $this->start_controls_section(
            'responsive_section',
            [
                'label' => __('Responsive', 'wedocs'),
                'tab' => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'mobile_display',
            [
                'label' => __('Mobile Display Mode', 'wedocs'),
                'type' => Controls_Manager::SELECT,
                'default' => 'collapsed',
                'options' => [
                    'normal' => __('Normal (Always Visible)', 'wedocs'),
                    'collapsed' => __('Collapsed by Default', 'wedocs'),
                    'hidden' => __('Hidden on Mobile', 'wedocs'),
                ],
                'description' => __('How to display on screens ≤768px', 'wedocs'),
            ]
        );

        $this->add_control(
            'mobile_sticky',
            [
                'label' => __('Sticky on Mobile', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => __('Yes', 'wedocs'),
                'label_off' => __('No', 'wedocs'),
                'return_value' => 'yes',
                'default' => '',
                'description' => __('Disable to turn off sticky positioning on mobile', 'wedocs'),
                'condition' => ['sticky' => 'yes'],
            ]
        );

        $this->add_responsive_control(
            'mobile_max_height',
            [
                'label' => __('Max Height', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => ['min' => 100, 'max' => 600],
                    'vh' => ['min' => 10, 'max' => 80],
                ],
                'size_units' => ['px', 'vh'],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-toc__body' => 'max-height: {{SIZE}}{{UNIT}}; overflow-y: auto;',
                ],
                'description' => __('Limit height with scrolling for long lists', 'wedocs'),
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
                    '{{WRAPPER}} .wedocs-toc' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'padding',
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
                    '{{WRAPPER}} .wedocs-toc' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Border::get_type(),
            [
                'name' => 'container_border',
                'label' => __('Border', 'wedocs'),
                'selector' => '{{WRAPPER}} .wedocs-toc',
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
                'default' => [
                    'top' => 8,
                    'right' => 8,
                    'bottom' => 8,
                    'left' => 8,
                    'unit' => 'px',
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-toc' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Box_Shadow::get_type(),
            [
                'name' => 'container_shadow',
                'selector' => '{{WRAPPER}} .wedocs-toc',
            ]
        );

        $this->end_controls_section();

        // Style Section - Title
        $this->start_controls_section(
            'style_title',
            [
                'label' => __('Title', 'wedocs'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'title_color',
            [
                'label' => __('Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#1a202c',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-toc__title' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'title_typography',
                'selector' => '{{WRAPPER}} .wedocs-toc__title',
            ]
        );

        $this->add_responsive_control(
            'title_margin',
            [
                'label' => __('Margin Bottom', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => ['min' => 0, 'max' => 50],
                ],
                'default' => ['size' => 15],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-toc__title' => 'margin-bottom: {{SIZE}}px;',
                ],
            ]
        );

        $this->end_controls_section();

        // Style Section - List Items
        $this->start_controls_section(
            'style_items',
            [
                'label' => __('List Items', 'wedocs'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'link_color',
            [
                'label' => __('Link Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#4a5568',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-toc__link' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'link_hover_color',
            [
                'label' => __('Link Hover Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#0073aa',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-toc__link:hover' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'active_color',
            [
                'label' => __('Active Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#0073aa',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-toc__link.active' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'active_border_color',
            [
                'label' => __('Active Border Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#0073aa',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-toc__link.active' => 'border-left-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'link_typography',
                'selector' => '{{WRAPPER}} .wedocs-toc__link',
            ]
        );

        $this->add_responsive_control(
            'item_spacing',
            [
                'label' => __('Item Spacing', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => ['min' => 0, 'max' => 30],
                ],
                'default' => ['size' => 8],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-toc__item' => 'margin-bottom: {{SIZE}}px;',
                ],
            ]
        );

        $this->add_responsive_control(
            'indent',
            [
                'label' => __('Sub-item Indent', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => ['min' => 0, 'max' => 50],
                ],
                'default' => ['size' => 16],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-toc__list .wedocs-toc__list' => 'padding-left: {{SIZE}}px;',
                ],
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();

        $title = $settings['title'] ?? __('On This Page', 'wedocs');
        $title_tag = $settings['title_tag'] ?? 'h3';
        $heading_levels = $settings['heading_levels'] ?? ['2', '3'];
        $collapsible = ($settings['collapsible'] ?? '') === 'yes';
        $collapsed_default = ($settings['collapsed_default'] ?? '') === 'yes';
        $sticky = ($settings['sticky'] ?? '') === 'yes';
        $sticky_offset = $settings['sticky_offset']['size'] ?? 20;
        $show_numbers = ($settings['show_numbers'] ?? '') === 'yes';
        $smooth_scroll = ($settings['smooth_scroll'] ?? 'yes') === 'yes';
        $highlight_active = ($settings['highlight_active'] ?? 'yes') === 'yes';

        $selector = implode(',', array_map(function ($level) {
            return 'h' . intval($level);
        }, $heading_levels));

        // Build heading regex pattern from selected levels
        $level_pattern = implode('|', array_map('intval', $heading_levels));

        // Extract headings from the current post content (server-side)
        $headings = [];
        $current_post = $this->get_editor_post_context();

        if (!$current_post && \Elementor\Plugin::$instance->editor->is_edit_mode()) {
            // Show editor preview with sample data
            $this->render_editor_preview($settings);
            return;
        }

        if (!empty($current_post->post_content)) {
            $content = apply_filters('the_content', $current_post->post_content);
            if (preg_match_all('/<h(' . $level_pattern . ')[^>]*(?:\s+id=["\']([^"\']*)["\'])?[^>]*>(.*?)<\/h\1>/si', $content, $matches, PREG_SET_ORDER)) {
                $counter = 0;
                foreach ($matches as $match) {
                    $counter++;
                    $level = intval($match[1]);
                    $id = !empty($match[2]) ? $match[2] : 'wedocs-heading-' . $counter;
                    $text = wp_strip_all_tags($match[3]);
                    if (!empty(trim($text))) {
                        $headings[] = [
                            'level' => $level,
                            'id'    => $id,
                            'text'  => $text,
                            'index' => $counter,
                        ];
                    }
                }
            }
        }

        $mobile_display = $settings['mobile_display'] ?? 'collapsed';
        $mobile_sticky = ($settings['mobile_sticky'] ?? '') === 'yes';

        $wrapper_class = 'wedocs-toc';
        if ($sticky) {
            $wrapper_class .= ' wedocs-toc--sticky';
        }
        if (!$mobile_sticky && $sticky) {
            $wrapper_class .= ' wedocs-toc--no-mobile-sticky';
        }
        if ($collapsible) {
            $wrapper_class .= ' wedocs-toc--collapsible';
        }
        if ($collapsed_default) {
            $wrapper_class .= ' wedocs-toc--collapsed';
        }
        if ($mobile_display === 'collapsed') {
            $wrapper_class .= ' wedocs-toc--mobile-collapsed';
        } elseif ($mobile_display === 'hidden') {
            $wrapper_class .= ' wedocs-toc--mobile-hidden';
        }

        // Determine minimum heading level for indentation
        $min_level = !empty($headings) ? min(array_column($headings, 'level')) : 2;
?>

        <div class="<?php echo esc_attr($wrapper_class); ?>"
            data-selector="<?php echo esc_attr($selector); ?>"
            data-smooth-scroll="<?php echo $smooth_scroll ? 'true' : 'false'; ?>"
            data-highlight-active="<?php echo $highlight_active ? 'true' : 'false'; ?>"
            data-show-numbers="<?php echo $show_numbers ? 'true' : 'false'; ?>"
            <?php if ($sticky): ?>style="position: sticky; top: <?php echo intval($sticky_offset); ?>px;" <?php endif; ?>>

            <div class="wedocs-toc__header">
                <?php if ($mobile_display === 'collapsed'): ?>
                    <button type="button" class="wedocs-toc__mobile-toggle">
                        <span><?php echo esc_html($title); ?></span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                            <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none" />
                        </svg>
                    </button>
                <?php endif; ?>
                <<?php echo esc_html($title_tag); ?> class="wedocs-toc__title">
                    <?php echo esc_html($title); ?>
                    <?php if ($collapsible): ?>
                        <button type="button" class="wedocs-toc__toggle" aria-expanded="<?php echo $collapsed_default ? 'false' : 'true'; ?>">
                            <svg class="wedocs-toc__toggle-icon" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                                <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none" />
                            </svg>
                        </button>
                    <?php endif; ?>
                </<?php echo esc_html($title_tag); ?>>
            </div>

            <nav class="wedocs-toc__body" <?php if ($collapsed_default): ?>style="display: none;" <?php endif; ?>>
                <ul class="wedocs-toc__list">
                    <?php if (!empty($headings)): ?>
                        <?php foreach ($headings as $heading): ?>
                            <?php $depth = $heading['level'] - $min_level; ?>
                            <li class="wedocs-toc__item" style="padding-left: <?php echo $depth * 16; ?>px;">
                                <a href="#<?php echo esc_attr($heading['id']); ?>" class="wedocs-toc__link">
                                    <?php if ($show_numbers): ?>
                                        <span class="wedocs-toc__number"><?php echo $heading['index']; ?>.</span>
                                    <?php endif; ?>
                                    <?php echo esc_html($heading['text']); ?>
                                </a>
                            </li>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <li class="wedocs-toc__placeholder"><?php _e('No headings found in the content.', 'wedocs'); ?></li>
                    <?php endif; ?>
                </ul>
            </nav>
        </div>

        <?php if (\Elementor\Plugin::$instance->editor->is_edit_mode() && empty($headings)): ?>
            <div style="margin-top: 10px; padding: 10px; background: #f0f8ff; border-left: 3px solid #2196f3; font-size: 12px; color: #666;">
                📝 <?php _e('Preview: This widget extracts headings from your content. Add H2, H3 headings to see them here.', 'wedocs'); ?>
            </div>
        <?php endif; ?>

        <style>
            .wedocs-toc {
                box-sizing: border-box;
            }

            .wedocs-toc__header {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .wedocs-toc__title {
                margin: 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
            }

            .wedocs-toc__toggle {
                background: none;
                border: none;
                cursor: pointer;
                padding: 4px;
                color: inherit;
                transition: transform 0.3s ease;
            }

            .wedocs-toc--collapsed .wedocs-toc__toggle {
                transform: rotate(-90deg);
            }

            .wedocs-toc__list {
                list-style: none;
                margin: 0;
                padding: 0;
            }

            .wedocs-toc__list .wedocs-toc__list {
                margin-top: 4px;
            }

            .wedocs-toc__link {
                text-decoration: none;
                display: block;
                padding: 4px 0 4px 12px;
                border-left: 2px solid transparent;
                transition: all 0.2s ease;
            }

            .wedocs-toc__link:hover {
                border-left-color: currentColor;
            }

            .wedocs-toc__link.active {
                font-weight: 600;
                border-left-width: 3px;
            }

            .wedocs-toc__placeholder {
                color: #999;
                font-style: italic;
                font-size: 13px;
            }

            .wedocs-toc__number {
                margin-right: 6px;
                font-weight: 600;
                opacity: 0.6;
            }

            /* Mobile: auto-collapse toggle */
            .wedocs-toc__mobile-toggle {
                display: none;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                background: none;
                border: none;
                cursor: pointer;
                padding: 0;
                color: inherit;
                font: inherit;
            }

            .wedocs-toc__mobile-toggle svg {
                transition: transform 0.3s ease;
                flex-shrink: 0;
            }

            .wedocs-toc--mobile-body-hidden .wedocs-toc__mobile-toggle svg {
                transform: rotate(-90deg);
            }

            @media screen and (max-width: 768px) {
                .wedocs-toc--mobile-hidden {
                    display: none !important;
                }

                .wedocs-toc--no-mobile-sticky {
                    position: static !important;
                    top: auto !important;
                }

                .wedocs-toc--mobile-collapsed .wedocs-toc__mobile-toggle {
                    display: flex;
                }

                .wedocs-toc--mobile-collapsed .wedocs-toc__title {
                    display: none;
                }

                .wedocs-toc--mobile-collapsed.wedocs-toc--mobile-body-hidden .wedocs-toc__body {
                    display: none;
                }
            }
        </style>

        <script>
            (function($) {
                'use strict';

                var $toc = $('.wedocs-toc[data-selector]');
                if (!$toc.length) return;

                $toc.each(function() {
                    var $this = $(this);
                    var selector = $this.data('selector');
                    var smoothScroll = $this.data('smooth-scroll');
                    var highlightActive = $this.data('highlight-active');
                    var showNumbers = $this.data('show-numbers');

                    // Find headings in the main content area
                    var $content = $('.entry-content, .wedocs-single-content, .elementor-widget-theme-post-content, article .post-content, .wp-block-post-content, main');
                    if (!$content.length) $content = $('body');

                    var $headings = $content.find(selector).filter(function() {
                        return !$(this).closest('.wedocs-toc').length;
                    });

                    if (!$headings.length) return;

                    // Build TOC
                    var $list = $this.find('.wedocs-toc__list');
                    $list.empty();

                    var minLevel = 9;
                    $headings.each(function() {
                        var level = parseInt(this.tagName.charAt(1));
                        if (level < minLevel) minLevel = level;
                    });

                    var counter = 0;
                    $headings.each(function() {
                        var $heading = $(this);
                        var level = parseInt(this.tagName.charAt(1));
                        var depth = level - minLevel;
                        counter++;

                        // Ensure heading has an ID
                        if (!$heading.attr('id')) {
                            $heading.attr('id', 'wedocs-heading-' + counter);
                        }

                        var text = $heading.text().trim();
                        var id = $heading.attr('id');
                        var numberHtml = showNumbers ? '<span class="wedocs-toc__number">' + counter + '.</span>' : '';

                        var $item = $('<li class="wedocs-toc__item"></li>');
                        $item.css('padding-left', (depth * 16) + 'px');
                        $item.html('<a href="#' + id + '" class="wedocs-toc__link">' + numberHtml + text + '</a>');
                        $list.append($item);
                    });

                    // Smooth scroll
                    if (smoothScroll) {
                        $list.on('click', '.wedocs-toc__link', function(e) {
                            e.preventDefault();
                            var targetId = $(this).attr('href');
                            var $target = $(targetId);
                            if ($target.length) {
                                $('html, body').animate({
                                    scrollTop: $target.offset().top - 80
                                }, 400);
                                history.pushState(null, null, targetId);
                            }
                        });
                    }

                    // Highlight active
                    if (highlightActive) {
                        var headingOffsets = [];
                        $headings.each(function() {
                            headingOffsets.push({
                                id: $(this).attr('id'),
                                top: $(this).offset().top
                            });
                        });

                        $(window).on('scroll.wedocsToc', function() {
                            var scrollTop = $(window).scrollTop() + 100;
                            var activeId = '';

                            for (var i = headingOffsets.length - 1; i >= 0; i--) {
                                if (scrollTop >= headingOffsets[i].top) {
                                    activeId = headingOffsets[i].id;
                                    break;
                                }
                            }

                            $list.find('.wedocs-toc__link').removeClass('active');
                            if (activeId) {
                                $list.find('.wedocs-toc__link[href="#' + activeId + '"]').addClass('active');
                            }
                        });
                    }

                    // Collapsible toggle
                    $this.find('.wedocs-toc__toggle').on('click', function() {
                        var $body = $this.find('.wedocs-toc__body');
                        $this.toggleClass('wedocs-toc--collapsed');
                        $body.slideToggle(200);
                        var expanded = !$this.hasClass('wedocs-toc--collapsed');
                        $(this).attr('aria-expanded', expanded);
                    });

                    // Mobile collapsed toggle
                    if ($this.hasClass('wedocs-toc--mobile-collapsed')) {
                        // Start collapsed on mobile
                        var isMobile = window.matchMedia('(max-width: 768px)').matches;
                        if (isMobile) {
                            $this.addClass('wedocs-toc--mobile-body-hidden');
                        }

                        $this.find('.wedocs-toc__mobile-toggle').on('click', function() {
                            $this.toggleClass('wedocs-toc--mobile-body-hidden');
                        });
                    }
                });
            })(jQuery);
        </script>
    <?php
    }

    protected function content_template() {
    ?>
        <#
            var titleTag=settings.title_tag || 'h3' ;
            var collapsible=settings.collapsible==='yes' ;
            var collapsed=settings.collapsed_default==='yes' ;
            var sticky=settings.sticky==='yes' ;
            var stickyOffset=settings.sticky_offset?.size || 20;
            var showNumbers=settings.show_numbers==='yes' ;

            var wrapperClass='wedocs-toc' ;
            if (sticky) wrapperClass +=' wedocs-toc--sticky' ;
            if (collapsible) wrapperClass +=' wedocs-toc--collapsible' ;
            #>

            <div class="{{ wrapperClass }}" <# if (sticky) { #>style="position: sticky; top: {{ stickyOffset }}px;"<# } #>>
                    <div class="wedocs-toc__header">
                        <{{ titleTag }} class="wedocs-toc__title">
                            {{ settings.title || 'On This Page' }}
                            <# if (collapsible) { #>
                                <button type="button" class="wedocs-toc__toggle" style="background: none; border: none; cursor: pointer; padding: 4px; color: inherit;">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                                        <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none" />
                                    </svg>
                                </button>
                                <# } #>
                        </{{ titleTag }}>
                    </div>

                    <nav class="wedocs-toc__body">
                        <ul class="wedocs-toc__list" style="list-style: none; margin: 0; padding: 0;">
                            <# var sampleItems=['Getting Started', 'Installation' , 'Configuration' , 'Basic Usage' , 'Advanced Features' , 'API Reference' ];
                                for (var i=0; i < sampleItems.length; i++) {
                                var depth=(i===2 || i===3) ? 1 : 0;
                                var numberHtml=showNumbers ? '<span class="wedocs-toc__number" style="margin-right: 6px; font-weight: 600; opacity: 0.6;">' + (i+1) + '.</span>' : '' ;
                                #>
                                <li class="wedocs-toc__item" style="margin-bottom: {{ settings.item_spacing?.size || 8 }}px; padding-left: {{ depth * (settings.indent?.size || 16) }}px;">
                                    <a href="#" class="wedocs-toc__link{{ i === 0 ? ' active' : '' }}" style="text-decoration: none; display: block; padding: 4px 0 4px 12px; border-left: {{ i === 0 ? '3' : '2' }}px solid {{ i === 0 ? (settings.active_border_color || '#0073aa') : 'transparent' }}; color: {{ i === 0 ? (settings.active_color || '#0073aa') : (settings.link_color || '#4a5568') }}; {{ i === 0 ? 'font-weight: 600;' : '' }}">{{{ numberHtml }}}{{ sampleItems[i] }}</a>
                                </li>
                                <# } #>
                        </ul>
                    </nav>
            </div>
        <?php
    }

    /**
     * Render preview for editor mode with sample data
     */
    protected function render_editor_preview($settings) {
        $title = $settings['title'] ?? __('On This Page', 'wedocs');
        $title_tag = $settings['title_tag'] ?? 'h3';
        $show_numbers = ($settings['show_numbers'] ?? '') === 'yes';
        $collapsible = ($settings['collapsible'] ?? '') === 'yes';
        $collapsed_default = ($settings['collapsed_default'] ?? '') === 'yes';
        $sticky = ($settings['sticky'] ?? '') === 'yes';
        $sticky_offset = $settings['sticky_offset']['size'] ?? 20;

        $wrapper_class = 'wedocs-toc';
        if ($sticky) {
            $wrapper_class .= ' wedocs-toc--sticky';
        }
        if ($collapsible) {
            $wrapper_class .= ' wedocs-toc--collapsible';
        }
        if ($collapsed_default) {
            $wrapper_class .= ' wedocs-toc--collapsed';
        }

        // Sample headings for preview
        $sample_headings = [
            ['level' => 2, 'id' => 'introduction', 'text' => 'Introduction', 'index' => 1],
            ['level' => 3, 'id' => 'getting-started', 'text' => 'Getting Started', 'index' => 2],
            ['level' => 2, 'id' => 'configuration', 'text' => 'Configuration', 'index' => 3],
            ['level' => 3, 'id' => 'basic-settings', 'text' => 'Basic Settings', 'index' => 4],
            ['level' => 3, 'id' => 'advanced-options', 'text' => 'Advanced Options', 'index' => 5],
            ['level' => 2, 'id' => 'troubleshooting', 'text' => 'Troubleshooting', 'index' => 6],
        ];

        $min_level = 2;
        ?>

            <div class="<?php echo esc_attr($wrapper_class); ?>"
                <?php if ($sticky): ?>style="position: sticky; top: <?php echo intval($sticky_offset); ?>px;" <?php endif; ?>>

                <div class="wedocs-toc__header">
                    <<?php echo esc_html($title_tag); ?> class="wedocs-toc__title">
                        <?php echo esc_html($title); ?>
                        <?php if ($collapsible): ?>
                            <button type="button" class="wedocs-toc__toggle" aria-expanded="<?php echo $collapsed_default ? 'false' : 'true'; ?>">
                                <svg class="wedocs-toc__toggle-icon" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                                    <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none" />
                                </svg>
                            </button>
                        <?php endif; ?>
                    </<?php echo esc_html($title_tag); ?>>
                </div>

                <nav class="wedocs-toc__body" <?php if ($collapsed_default): ?>style="display: none;" <?php endif; ?>>
                    <ul class="wedocs-toc__list">
                        <?php foreach ($sample_headings as $i => $heading): ?>
                            <?php $depth = $heading['level'] - $min_level; ?>
                            <li class="wedocs-toc__item <?php echo $i === 0 ? 'active' : ''; ?>" style="padding-left: <?php echo $depth * 16; ?>px;">
                                <a href="#<?php echo esc_attr($heading['id']); ?>" class="wedocs-toc__link">
                                    <?php if ($show_numbers): ?>
                                        <span class="wedocs-toc__number"><?php echo $heading['index']; ?>.</span>
                                    <?php endif; ?>
                                    <?php echo esc_html($heading['text']); ?>
                                </a>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </nav>

                <div style="margin-top: 10px; padding: 10px; background: #f0f8ff; border-left: 3px solid #2196f3; font-size: 12px; color: #666;">
                    📝 <?php _e('Preview: This widget will show headings from your page content.', 'wedocs'); ?>
                </div>
            </div>
    <?php
    }
}
