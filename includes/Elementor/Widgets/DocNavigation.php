<?php

namespace WeDevs\WeDocs\Elementor\Widgets;

use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Box_Shadow;

/**
 * WeDocs Doc Navigation (Next/Previous) Widget for Elementor
 */
class DocNavigation extends Widget_Base {

    public function get_name() {
        return 'wedocs-doc-navigation';
    }

    public function get_title() {
        return __('weDocs - Doc Navigation', 'wedocs');
    }

    public function get_icon() {
        return 'eicon-post-navigation';
    }

    public function get_categories() {
        return ['wedocs-category'];
    }

    public function get_keywords() {
        return ['navigation', 'next', 'previous', 'prev', 'wedocs', 'docs'];
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
            'show_prev',
            [
                'label' => __('Show Previous', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => __('Yes', 'wedocs'),
                'label_off' => __('No', 'wedocs'),
                'return_value' => 'yes',
                'default' => 'yes',
            ]
        );

        $this->add_control(
            'show_next',
            [
                'label' => __('Show Next', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => __('Yes', 'wedocs'),
                'label_off' => __('No', 'wedocs'),
                'return_value' => 'yes',
                'default' => 'yes',
            ]
        );

        $this->add_control(
            'prev_label',
            [
                'label' => __('Previous Label', 'wedocs'),
                'type' => Controls_Manager::TEXT,
                'default' => __('Previous', 'wedocs'),
                'condition' => ['show_prev' => 'yes'],
            ]
        );

        $this->add_control(
            'next_label',
            [
                'label' => __('Next Label', 'wedocs'),
                'type' => Controls_Manager::TEXT,
                'default' => __('Next', 'wedocs'),
                'condition' => ['show_next' => 'yes'],
            ]
        );

        $this->add_control(
            'show_arrows',
            [
                'label' => __('Show Arrows', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => __('Yes', 'wedocs'),
                'label_off' => __('No', 'wedocs'),
                'return_value' => 'yes',
                'default' => 'yes',
            ]
        );

        $this->add_control(
            'layout',
            [
                'label' => __('Layout', 'wedocs'),
                'type' => Controls_Manager::SELECT,
                'default' => 'side-by-side',
                'options' => [
                    'side-by-side' => __('Side by Side', 'wedocs'),
                    'stacked' => __('Stacked', 'wedocs'),
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
            'bg_color',
            [
                'label' => __('Background Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-nav' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'container_padding',
            [
                'label' => __('Padding', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%', 'em'],
                'default' => ['top' => 20, 'right' => 0, 'bottom' => 20, 'left' => 0, 'unit' => 'px'],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-nav' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Border::get_type(),
            [
                'name' => 'container_border',
                'selector' => '{{WRAPPER}} .wedocs-el-nav',
                'fields_options' => [
                    'border' => ['default' => 'solid'],
                    'width' => ['default' => ['top' => 1, 'right' => 0, 'bottom' => 1, 'left' => 0]],
                    'color' => ['default' => '#e2e8f0'],
                ],
            ]
        );

        $this->add_responsive_control(
            'container_border_radius',
            [
                'label' => __('Border Radius', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%'],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-nav' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Box_Shadow::get_type(),
            [
                'name' => 'container_shadow',
                'selector' => '{{WRAPPER}} .wedocs-el-nav',
            ]
        );

        $this->end_controls_section();

        // Style Section - Label
        $this->start_controls_section(
            'style_label',
            [
                'label' => __('Label', 'wedocs'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'label_color',
            [
                'label' => __('Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#94a3b8',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-nav__label' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'label_typography',
                'selector' => '{{WRAPPER}} .wedocs-el-nav__label',
            ]
        );

        $this->end_controls_section();

        // Style Section - Title
        $this->start_controls_section(
            'style_title',
            [
                'label' => __('Doc Title', 'wedocs'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'title_color',
            [
                'label' => __('Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#1e293b',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-nav__title a' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'title_hover_color',
            [
                'label' => __('Hover Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#0073aa',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-nav__title a:hover' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'title_typography',
                'selector' => '{{WRAPPER}} .wedocs-el-nav__title',
            ]
        );

        $this->end_controls_section();

        // Style Section - Arrow
        $this->start_controls_section(
            'style_arrow',
            [
                'label' => __('Arrow', 'wedocs'),
                'tab' => Controls_Manager::TAB_STYLE,
                'condition' => ['show_arrows' => 'yes'],
            ]
        );

        $this->add_control(
            'arrow_color',
            [
                'label' => __('Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#94a3b8',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-nav__arrow' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'arrow_size',
            [
                'label' => __('Size', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => ['px' => ['min' => 12, 'max' => 40]],
                'default' => ['size' => 20],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-nav__arrow svg' => 'width: {{SIZE}}px; height: {{SIZE}}px;',
                ],
            ]
        );

        $this->end_controls_section();

        // Style Section - Separator
        $this->start_controls_section(
            'style_separator',
            [
                'label' => __('Separator', 'wedocs'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'separator_color',
            [
                'label' => __('Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#e2e8f0',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-nav--side-by-side .wedocs-el-nav__separator' => 'background-color: {{VALUE}};',
                    '{{WRAPPER}} .wedocs-el-nav--stacked .wedocs-el-nav__item + .wedocs-el-nav__item' => 'border-top-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'separator_width',
            [
                'label' => __('Width', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => ['px' => ['min' => 0, 'max' => 5]],
                'default' => ['size' => 1],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-nav--side-by-side .wedocs-el-nav__separator' => 'width: {{SIZE}}px;',
                    '{{WRAPPER}} .wedocs-el-nav--stacked .wedocs-el-nav__item + .wedocs-el-nav__item' => 'border-top-width: {{SIZE}}px;',
                ],
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();

        $show_prev = ($settings['show_prev'] ?? 'yes') === 'yes';
        $show_next = ($settings['show_next'] ?? 'yes') === 'yes';
        $prev_label = $settings['prev_label'] ?? __('Previous', 'wedocs');
        $next_label = $settings['next_label'] ?? __('Next', 'wedocs');
        $show_arrows = ($settings['show_arrows'] ?? 'yes') === 'yes';
        $layout = $settings['layout'] ?? 'side-by-side';

        global $post, $wpdb;

        if (empty($post) || $post->post_type !== 'docs') {
            if (\Elementor\Plugin::$instance->editor->is_edit_mode()) {
                echo '<p style="color: #999; font-style: italic; padding: 20px; text-align: center;">' . __('Doc Navigation: Preview it on a single doc page.', 'wedocs') . '</p>';
            }
            return;
        }

        $next_post_id = 0;
        $prev_post_id = 0;

        if ($show_next) {
            $next_query = "SELECT ID FROM {$wpdb->posts}
                WHERE post_parent = {$post->post_parent} AND post_type = 'docs' AND post_status = 'publish' AND menu_order > {$post->menu_order}
                ORDER BY menu_order ASC
                LIMIT 0, 1";
            $next_post_id = (int) $wpdb->get_var($next_query);
        }

        if ($show_prev) {
            $prev_query = "SELECT ID FROM {$wpdb->posts}
                WHERE post_parent = {$post->post_parent} AND post_type = 'docs' AND post_status = 'publish' AND menu_order < {$post->menu_order}
                ORDER BY menu_order DESC
                LIMIT 0, 1";
            $prev_post_id = (int) $wpdb->get_var($prev_query);
        }

        if (!$next_post_id && !$prev_post_id) {
            if (\Elementor\Plugin::$instance->editor->is_edit_mode()) {
                echo '<p style="color: #999; font-style: italic; padding: 20px; text-align: center;">' . __('Doc Navigation: No adjacent docs found.', 'wedocs') . '</p>';
            }
            return;
        }

        $nav_class = 'wedocs-el-nav wedocs-el-nav--' . $layout;
        ?>

        <nav class="<?php echo esc_attr($nav_class); ?>">
            <?php if ($show_prev && $prev_post_id): ?>
                <?php $prev_post = get_post($prev_post_id); ?>
                <div class="wedocs-el-nav__item wedocs-el-nav__item--prev">
                    <a href="<?php echo esc_url(get_permalink($prev_post_id)); ?>" class="wedocs-el-nav__link">
                        <?php if ($show_arrows): ?>
                            <span class="wedocs-el-nav__arrow wedocs-el-nav__arrow--prev">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
                            </span>
                        <?php endif; ?>
                        <span class="wedocs-el-nav__content">
                            <span class="wedocs-el-nav__label"><?php echo esc_html($prev_label); ?></span>
                            <span class="wedocs-el-nav__title"><?php echo esc_html(apply_filters('wedocs_translate_text', $prev_post->post_title)); ?></span>
                        </span>
                    </a>
                </div>
            <?php elseif ($show_prev): ?>
                <div class="wedocs-el-nav__item wedocs-el-nav__item--prev wedocs-el-nav__item--empty"></div>
            <?php endif; ?>

            <?php if ($show_prev && $show_next && $layout === 'side-by-side'): ?>
                <div class="wedocs-el-nav__separator"></div>
            <?php endif; ?>

            <?php if ($show_next && $next_post_id): ?>
                <?php $next_post = get_post($next_post_id); ?>
                <div class="wedocs-el-nav__item wedocs-el-nav__item--next">
                    <a href="<?php echo esc_url(get_permalink($next_post_id)); ?>" class="wedocs-el-nav__link">
                        <span class="wedocs-el-nav__content">
                            <span class="wedocs-el-nav__label"><?php echo esc_html($next_label); ?></span>
                            <span class="wedocs-el-nav__title"><?php echo esc_html(apply_filters('wedocs_translate_text', $next_post->post_title)); ?></span>
                        </span>
                        <?php if ($show_arrows): ?>
                            <span class="wedocs-el-nav__arrow wedocs-el-nav__arrow--next">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                            </span>
                        <?php endif; ?>
                    </a>
                </div>
            <?php elseif ($show_next): ?>
                <div class="wedocs-el-nav__item wedocs-el-nav__item--next wedocs-el-nav__item--empty"></div>
            <?php endif; ?>
        </nav>

        <style>
            .wedocs-el-nav {
                box-sizing: border-box;
            }

            .wedocs-el-nav--side-by-side {
                display: flex;
                align-items: stretch;
                gap: 0;
            }

            .wedocs-el-nav--side-by-side .wedocs-el-nav__item {
                flex: 1;
                min-width: 0;
            }

            .wedocs-el-nav--stacked .wedocs-el-nav__item + .wedocs-el-nav__item {
                border-top: 1px solid;
                margin-top: 12px;
                padding-top: 12px;
            }

            .wedocs-el-nav__separator {
                align-self: stretch;
                margin: 0 20px;
            }

            .wedocs-el-nav__link {
                display: flex;
                align-items: center;
                gap: 12px;
                text-decoration: none;
                padding: 8px 0;
                transition: opacity 0.2s ease;
            }

            .wedocs-el-nav__link:hover {
                opacity: 0.8;
            }

            .wedocs-el-nav__item--next .wedocs-el-nav__link {
                justify-content: flex-end;
                text-align: right;
            }

            .wedocs-el-nav__content {
                display: flex;
                flex-direction: column;
                gap: 4px;
                min-width: 0;
            }

            .wedocs-el-nav__label {
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                font-weight: 500;
            }

            .wedocs-el-nav__title {
                font-size: 15px;
                font-weight: 600;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .wedocs-el-nav__title a {
                text-decoration: none;
                color: inherit;
            }

            .wedocs-el-nav__arrow {
                flex-shrink: 0;
                display: flex;
                align-items: center;
            }

            .wedocs-el-nav__arrow svg {
                width: 20px;
                height: 20px;
            }

            .wedocs-el-nav__item--empty {
                visibility: hidden;
            }
        </style>
    <?php
    }

    protected function content_template() {
    ?>
        <#
        var showPrev = settings.show_prev === 'yes';
        var showNext = settings.show_next === 'yes';
        var showArrows = settings.show_arrows === 'yes';
        var layout = settings.layout || 'side-by-side';
        var prevLabel = settings.prev_label || 'Previous';
        var nextLabel = settings.next_label || 'Next';
        var arrowColor = settings.arrow_color || '#94a3b8';
        var labelColor = settings.label_color || '#94a3b8';
        var titleColor = settings.title_color || '#1e293b';
        var arrowSize = settings.arrow_size?.size || 20;
        #>

        <nav class="wedocs-el-nav wedocs-el-nav--{{ layout }}" style="display: {{ layout === 'side-by-side' ? 'flex' : 'block' }}; align-items: stretch;">
            <# if (showPrev) { #>
                <div class="wedocs-el-nav__item wedocs-el-nav__item--prev" style="{{ layout === 'side-by-side' ? 'flex: 1;' : '' }}">
                    <a href="#" style="display: flex; align-items: center; gap: 12px; text-decoration: none; padding: 8px 0;">
                        <# if (showArrows) { #>
                            <span style="flex-shrink: 0; display: flex; color: {{ arrowColor }};">
                                <svg width="{{ arrowSize }}" height="{{ arrowSize }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
                            </span>
                        <# } #>
                        <span style="display: flex; flex-direction: column; gap: 4px;">
                            <span style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 500; color: {{ labelColor }};">{{ prevLabel }}</span>
                            <span style="font-size: 15px; font-weight: 600; color: {{ titleColor }};">Getting Started Guide</span>
                        </span>
                    </a>
                </div>
            <# } #>

            <# if (showPrev && showNext && layout === 'side-by-side') { #>
                <div style="width: {{ settings.separator_width?.size || 1 }}px; background: {{ settings.separator_color || '#e2e8f0' }}; margin: 0 20px; align-self: stretch;"></div>
            <# } #>

            <# if (showPrev && showNext && layout === 'stacked') { #>
                <div style="border-top: {{ settings.separator_width?.size || 1 }}px solid {{ settings.separator_color || '#e2e8f0' }}; margin-top: 12px; padding-top: 12px;"></div>
            <# } #>

            <# if (showNext) { #>
                <div class="wedocs-el-nav__item wedocs-el-nav__item--next" style="{{ layout === 'side-by-side' ? 'flex: 1;' : '' }}">
                    <a href="#" style="display: flex; align-items: center; gap: 12px; text-decoration: none; padding: 8px 0; justify-content: flex-end; text-align: right;">
                        <span style="display: flex; flex-direction: column; gap: 4px;">
                            <span style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 500; color: {{ labelColor }};">{{ nextLabel }}</span>
                            <span style="font-size: 15px; font-weight: 600; color: {{ titleColor }};">Advanced Configuration</span>
                        </span>
                        <# if (showArrows) { #>
                            <span style="flex-shrink: 0; display: flex; color: {{ arrowColor }};">
                                <svg width="{{ arrowSize }}" height="{{ arrowSize }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                            </span>
                        <# } #>
                    </a>
                </div>
            <# } #>
        </nav>
    <?php
    }
}
