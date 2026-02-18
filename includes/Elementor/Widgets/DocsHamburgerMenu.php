<?php

namespace WeDevs\WeDocs\Elementor\Widgets;

use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Box_Shadow;

/**
 * WeDocs Docs Hamburger Menu Widget for Elementor
 */
class DocsHamburgerMenu extends Widget_Base {

    public function get_name() {
        return 'wedocs-hamburger-menu';
    }

    public function get_title() {
        return __('weDocs - Hamburger Menu', 'wedocs');
    }

    public function get_icon() {
        return 'eicon-menu-bar';
    }

    public function get_categories() {
        return ['wedocs-category'];
    }

    public function get_keywords() {
        return ['hamburger', 'menu', 'mobile', 'sidebar', 'off-canvas', 'wedocs', 'docs'];
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
            'icon_type',
            [
                'label' => __('Trigger Icon', 'wedocs'),
                'type' => Controls_Manager::SELECT,
                'default' => 'bars',
                'options' => [
                    'bars' => __('Hamburger Bars', 'wedocs'),
                    'dots' => __('Dots', 'wedocs'),
                    'menu_text' => __('Menu + Icon', 'wedocs'),
                ],
            ]
        );

        $this->add_control(
            'panel_position',
            [
                'label' => __('Panel Position', 'wedocs'),
                'type' => Controls_Manager::SELECT,
                'default' => 'left',
                'options' => [
                    'left' => __('Left', 'wedocs'),
                    'right' => __('Right', 'wedocs'),
                ],
            ]
        );

        $this->add_control(
            'show_search',
            [
                'label' => __('Show Quick Search', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => __('Yes', 'wedocs'),
                'label_off' => __('No', 'wedocs'),
                'return_value' => 'yes',
                'default' => 'yes',
            ]
        );

        $this->add_control(
            'search_placeholder',
            [
                'label' => __('Search Placeholder', 'wedocs'),
                'type' => Controls_Manager::TEXT,
                'default' => __('Quick search...', 'wedocs'),
                'condition' => ['show_search' => 'yes'],
            ]
        );

        $this->add_control(
            'show_title',
            [
                'label' => __('Show Doc Title', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => __('Yes', 'wedocs'),
                'label_off' => __('No', 'wedocs'),
                'return_value' => 'yes',
                'default' => 'yes',
            ]
        );

        $this->end_controls_section();

        // Style Section - Trigger Button
        $this->start_controls_section(
            'style_trigger',
            [
                'label' => __('Trigger Button', 'wedocs'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'trigger_color',
            [
                'label' => __('Icon Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#1e293b',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-hamburger__trigger' => 'color: {{VALUE}};',
                    '{{WRAPPER}} .wedocs-hamburger__trigger svg' => 'fill: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'trigger_bg',
            [
                'label' => __('Background Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-hamburger__trigger' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'trigger_size',
            [
                'label' => __('Icon Size', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => ['px' => ['min' => 16, 'max' => 48]],
                'default' => ['size' => 24],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-hamburger__trigger svg' => 'width: {{SIZE}}px; height: {{SIZE}}px;',
                ],
            ]
        );

        $this->add_responsive_control(
            'trigger_padding',
            [
                'label' => __('Padding', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px'],
                'default' => ['top' => 8, 'right' => 8, 'bottom' => 8, 'left' => 8, 'unit' => 'px'],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-hamburger__trigger' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'trigger_border_radius',
            [
                'label' => __('Border Radius', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%'],
                'default' => ['top' => 6, 'right' => 6, 'bottom' => 6, 'left' => 6, 'unit' => 'px'],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-hamburger__trigger' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->end_controls_section();

        // Style Section - Panel
        $this->start_controls_section(
            'style_panel',
            [
                'label' => __('Panel', 'wedocs'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'panel_bg',
            [
                'label' => __('Background Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#ffffff',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-hamburger__panel' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'panel_width',
            [
                'label' => __('Width', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => ['px' => ['min' => 240, 'max' => 500]],
                'default' => ['size' => 320],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-hamburger__panel' => 'width: {{SIZE}}px;',
                ],
            ]
        );

        $this->add_responsive_control(
            'panel_padding',
            [
                'label' => __('Padding', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', 'em'],
                'default' => ['top' => 20, 'right' => 20, 'bottom' => 20, 'left' => 20, 'unit' => 'px'],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-hamburger__panel' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Box_Shadow::get_type(),
            [
                'name' => 'panel_shadow',
                'selector' => '{{WRAPPER}} .wedocs-hamburger__panel',
                'fields_options' => [
                    'box_shadow_type' => ['default' => 'yes'],
                    'box_shadow' => ['default' => ['horizontal' => 4, 'vertical' => 0, 'blur' => 20, 'spread' => 0, 'color' => 'rgba(0,0,0,0.15)']],
                ],
            ]
        );

        $this->add_control(
            'overlay_color',
            [
                'label' => __('Overlay Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => 'rgba(0,0,0,0.4)',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-hamburger__overlay' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->end_controls_section();

        // Style Section - Title
        $this->start_controls_section(
            'style_title',
            [
                'label' => __('Doc Title', 'wedocs'),
                'tab' => Controls_Manager::TAB_STYLE,
                'condition' => ['show_title' => 'yes'],
            ]
        );

        $this->add_control(
            'title_color',
            [
                'label' => __('Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#1e293b',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-hamburger__title' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'title_typography',
                'selector' => '{{WRAPPER}} .wedocs-hamburger__title',
            ]
        );

        $this->end_controls_section();

        // Style Section - Navigation Items
        $this->start_controls_section(
            'style_nav',
            [
                'label' => __('Navigation Items', 'wedocs'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'link_color',
            [
                'label' => __('Link Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#475569',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-hamburger__nav a' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'link_hover_color',
            [
                'label' => __('Hover Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#0073aa',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-hamburger__nav a:hover' => 'color: {{VALUE}};',
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
                    '{{WRAPPER}} .wedocs-hamburger__nav .current_page_item > a' => 'color: {{VALUE}}; font-weight: 600;',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'link_typography',
                'selector' => '{{WRAPPER}} .wedocs-hamburger__nav a',
            ]
        );

        $this->add_responsive_control(
            'item_padding',
            [
                'label' => __('Item Padding', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', 'em'],
                'default' => ['top' => 8, 'right' => 0, 'bottom' => 8, 'left' => 0, 'unit' => 'px'],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-hamburger__nav a' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->end_controls_section();

        // Style Section - Close Button
        $this->start_controls_section(
            'style_close',
            [
                'label' => __('Close Button', 'wedocs'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'close_color',
            [
                'label' => __('Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#64748b',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-hamburger__close' => 'color: {{VALUE}};',
                    '{{WRAPPER}} .wedocs-hamburger__close svg' => 'fill: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'close_size',
            [
                'label' => __('Size', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => ['px' => ['min' => 16, 'max' => 40]],
                'default' => ['size' => 24],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-hamburger__close svg' => 'width: {{SIZE}}px; height: {{SIZE}}px;',
                ],
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();

        $icon_type = $settings['icon_type'] ?? 'bars';
        $panel_position = $settings['panel_position'] ?? 'left';
        $show_search = ($settings['show_search'] ?? 'yes') === 'yes';
        $search_placeholder = $settings['search_placeholder'] ?? __('Quick search...', 'wedocs');
        $show_title = ($settings['show_title'] ?? 'yes') === 'yes';

        global $post;

        // Determine the parent doc
        $ancestors = [];
        $parent = false;

        if (!empty($post->post_parent)) {
            $ancestors = get_post_ancestors($post->ID);
            $root = count($ancestors) - 1;
            $parent = $ancestors[$root];
        } else {
            $parent = !empty($post->ID) ? $post->ID : '';
        }

        if (!$parent) {
            if (\Elementor\Plugin::$instance->editor->is_edit_mode()) {
                echo '<p style="color: #999; font-style: italic; padding: 20px; text-align: center;">' . __('Hamburger Menu: Preview it on a single doc page.', 'wedocs') . '</p>';
            }
            return;
        }

        $walker = new \WeDevs\WeDocs\Walker();
        $children = wp_list_pages([
            'title_li'  => '',
            'order'     => 'menu_order',
            'child_of'  => $parent,
            'echo'      => false,
            'post_type' => 'docs',
            'walker'    => $walker,
        ]);

        $widget_id = $this->get_id();
        ?>

        <!-- Trigger Button -->
        <button type="button" class="wedocs-hamburger__trigger" data-panel="wedocs-hamburger-panel-<?php echo esc_attr($widget_id); ?>" aria-label="<?php esc_attr_e('Open menu', 'wedocs'); ?>">
            <?php if ($icon_type === 'bars'): ?>
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"/></svg>
            <?php elseif ($icon_type === 'dots'): ?>
                <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>
            <?php elseif ($icon_type === 'menu_text'): ?>
                <svg viewBox="0 0 24 24" fill="currentColor" style="margin-right: 6px;"><path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"/></svg>
                <span><?php esc_html_e('Menu', 'wedocs'); ?></span>
            <?php endif; ?>
        </button>

        <!-- Overlay -->
        <div class="wedocs-hamburger__overlay" id="wedocs-hamburger-overlay-<?php echo esc_attr($widget_id); ?>"></div>

        <!-- Panel -->
        <div class="wedocs-hamburger__panel wedocs-hamburger__panel--<?php echo esc_attr($panel_position); ?>" id="wedocs-hamburger-panel-<?php echo esc_attr($widget_id); ?>">
            <div class="wedocs-hamburger__header">
                <?php if ($show_title && $parent): ?>
                    <h3 class="wedocs-hamburger__title">
                        <a href="<?php echo get_permalink($parent); ?>" style="text-decoration: none; color: inherit;">
                            <?php echo get_post_field('post_title', $parent, 'display'); ?>
                        </a>
                    </h3>
                <?php else: ?>
                    <span></span>
                <?php endif; ?>
                <button type="button" class="wedocs-hamburger__close" data-panel="wedocs-hamburger-panel-<?php echo esc_attr($widget_id); ?>" aria-label="<?php esc_attr_e('Close menu', 'wedocs'); ?>">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                </button>
            </div>

            <?php if ($show_search): ?>
                <div class="wedocs-hamburger__search wedocs-single-search-input">
                    <button type="button" class="search-submit">
                        <svg width="15" height="16" fill="#95a4b9"><path fill-rule="evenodd" d="M11.856 10.847l2.883 2.883a.89.89 0 0 1 0 1.257c-.173.174-.401.261-.629.261s-.455-.087-.629-.261l-2.883-2.883c-1.144.874-2.532 1.353-3.996 1.353a6.56 6.56 0 0 1-4.671-1.935c-2.576-2.575-2.576-6.765 0-9.341C3.179.934 4.839.247 6.603.247s3.424.687 4.671 1.935a6.56 6.56 0 0 1 1.935 4.67 6.55 6.55 0 0 1-1.353 3.995zM3.189 3.439c-1.882 1.882-1.882 4.945 0 6.827.912.912 2.124 1.414 3.414 1.414s2.502-.502 3.414-1.414 1.414-2.124 1.414-3.413-.502-2.502-1.414-3.413-2.124-1.414-3.414-1.414-2.502.502-3.414 1.414z"/></svg>
                    </button>
                    <input name="s" readonly type="search" class="search-field" placeholder="<?php echo esc_attr($search_placeholder); ?>" />
                    <div class="short-key">⌘K</div>
                </div>
            <?php endif; ?>

            <?php if ($children): ?>
                <ul class="wedocs-hamburger__nav doc-nav-list">
                    <?php echo $children; ?>
                </ul>
            <?php endif; ?>
        </div>

        <style>
            .wedocs-hamburger__trigger {
                display: inline-flex;
                align-items: center;
                border: none;
                cursor: pointer;
                line-height: 1;
                transition: opacity 0.2s ease;
            }

            .wedocs-hamburger__trigger:hover {
                opacity: 0.7;
            }

            .wedocs-hamburger__trigger svg {
                width: 24px;
                height: 24px;
            }

            .wedocs-hamburger__overlay {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 99998;
            }

            .wedocs-hamburger__overlay.active {
                display: block;
            }

            .wedocs-hamburger__panel {
                position: fixed;
                top: 0;
                bottom: 0;
                z-index: 99999;
                overflow-y: auto;
                transition: transform 0.3s ease;
                box-sizing: border-box;
            }

            .wedocs-hamburger__panel--left {
                left: 0;
                transform: translateX(-100%);
            }

            .wedocs-hamburger__panel--right {
                right: 0;
                transform: translateX(100%);
            }

            .wedocs-hamburger__panel.active {
                transform: translateX(0);
            }

            .wedocs-hamburger__header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 16px;
            }

            .wedocs-hamburger__title {
                margin: 0;
                font-size: 16px;
                font-weight: 700;
            }

            .wedocs-hamburger__close {
                background: none;
                border: none;
                cursor: pointer;
                padding: 4px;
                display: flex;
                align-items: center;
                transition: opacity 0.2s ease;
            }

            .wedocs-hamburger__close:hover {
                opacity: 0.7;
            }

            .wedocs-hamburger__close svg {
                width: 24px;
                height: 24px;
            }

            .wedocs-hamburger__search {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 10px 14px;
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 6px;
                margin-bottom: 16px;
                cursor: pointer;
                position: relative;
            }

            .wedocs-hamburger__search input.search-field {
                flex: 1;
                border: none;
                background: transparent;
                outline: none;
                font-size: 14px;
                cursor: pointer;
                min-width: 0;
                width: auto;
                height: auto;
                padding: 0;
                margin: 0;
                box-shadow: none;
            }

            .wedocs-hamburger__search .search-submit {
                background: none;
                border: none;
                cursor: pointer;
                padding: 0;
                display: flex;
                align-items: center;
                flex-shrink: 0;
                position: static;
            }

            .wedocs-hamburger__search .short-key {
                font-size: 11px;
                padding: 2px 6px;
                border-radius: 4px;
                background: #e2e8f0;
                color: #64748b;
                font-weight: 500;
                flex-shrink: 0;
                position: static;
                margin: 0;
            }

            .wedocs-hamburger__nav {
                list-style: none;
                margin: 0;
                padding: 0;
            }

            .wedocs-hamburger__nav .children {
                list-style: none;
                margin: 0;
                padding-left: 16px;
            }

            .wedocs-hamburger__nav a {
                display: flex;
                align-items: center;
                justify-content: space-between;
                text-decoration: none;
                transition: color 0.15s ease;
            }

            .wedocs-hamburger__nav .wedocs-caret {
                display: inline-block;
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-top: 6px solid #94a3b8;
                cursor: pointer;
                transition: transform 0.2s ease;
                flex-shrink: 0;
                margin-left: 8px;
            }

            .wedocs-hamburger__nav .wd-state-closed > a .wedocs-caret {
                border-top: 5px solid transparent;
                border-bottom: 5px solid transparent;
                border-left: 6px solid #94a3b8;
                border-right: 0;
            }

            .wedocs-hamburger__nav .wd-state-closed > .children {
                display: none;
            }

            .wedocs-hamburger__nav .wd-state-open > .children {
                display: block;
            }
        </style>

        <script>
            (function($) {
                'use strict';

                var widgetId = '<?php echo esc_js($widget_id); ?>';
                var $trigger = $('[data-panel="wedocs-hamburger-panel-' + widgetId + '"]').filter('.wedocs-hamburger__trigger');
                var $panel = $('#wedocs-hamburger-panel-' + widgetId);
                var $overlay = $('#wedocs-hamburger-overlay-' + widgetId);
                var $close = $panel.find('.wedocs-hamburger__close');

                function openPanel() {
                    $panel.addClass('active');
                    $overlay.addClass('active');
                    $('body').css('overflow', 'hidden');
                }

                function closePanel() {
                    $panel.removeClass('active');
                    $overlay.removeClass('active');
                    $('body').css('overflow', '');
                }

                $trigger.on('click', openPanel);
                $close.on('click', closePanel);
                $overlay.on('click', closePanel);

                $(document).on('keydown', function(e) {
                    if (e.key === 'Escape' && $panel.hasClass('active')) {
                        closePanel();
                    }
                });

                // Caret toggle
                $panel.find('.doc-nav-list .page_item_has_children').on('click', '.wedocs-caret', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var $parent = $(this).closest('.page_item');
                    $parent.toggleClass('wd-state-closed wd-state-open');
                });

                // Expand active ancestor
                $panel.find('.current_page_ancestor').each(function() {
                    $(this).removeClass('wd-state-closed').addClass('wd-state-open');
                });
            })(jQuery);
        </script>
    <?php
    }

    protected function content_template() {
    ?>
        <#
        var iconType = settings.icon_type || 'bars';
        var triggerColor = settings.trigger_color || '#1e293b';
        var triggerBg = settings.trigger_bg || '';
        #>

        <button type="button" class="wedocs-hamburger__trigger" style="display: inline-flex; align-items: center; border: none; cursor: pointer; color: {{ triggerColor }}; background: {{ triggerBg || 'transparent' }}; padding: 8px; border-radius: 6px;">
            <# if (iconType === 'bars') { #>
                <svg width="{{ settings.trigger_size?.size || 24 }}" height="{{ settings.trigger_size?.size || 24 }}" viewBox="0 0 24 24" fill="currentColor"><path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"/></svg>
            <# } else if (iconType === 'dots') { #>
                <svg width="{{ settings.trigger_size?.size || 24 }}" height="{{ settings.trigger_size?.size || 24 }}" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>
            <# } else if (iconType === 'menu_text') { #>
                <svg width="{{ settings.trigger_size?.size || 24 }}" height="{{ settings.trigger_size?.size || 24 }}" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 6px;"><path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"/></svg>
                <span>Menu</span>
            <# } #>
        </button>

        <p style="color: #999; font-style: italic; font-size: 12px; margin-top: 8px;">
            Off-canvas panel opens on the frontend when clicked. Position: {{ settings.panel_position || 'left' }}.
        </p>
    <?php
    }
}
