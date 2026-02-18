<?php

namespace WeDevs\WeDocs\Elementor\Widgets;

use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;

/**
 * WeDocs Docs Breadcrumb Widget for Elementor
 */
class DocsBreadcrumb extends Widget_Base {

    public function get_name() {
        return 'wedocs-breadcrumb';
    }

    public function get_title() {
        return __('weDocs - Breadcrumb', 'wedocs');
    }

    public function get_icon() {
        return 'eicon-post-navigation';
    }

    public function get_categories() {
        return ['wedocs-category'];
    }

    public function get_keywords() {
        return ['breadcrumb', 'navigation', 'path', 'wedocs', 'docs'];
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
            'home_text',
            [
                'label' => __('Home Text', 'wedocs'),
                'type' => Controls_Manager::TEXT,
                'default' => __('Home', 'wedocs'),
            ]
        );

        $this->add_control(
            'show_home_icon',
            [
                'label' => __('Show Home Icon', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => __('Yes', 'wedocs'),
                'label_off' => __('No', 'wedocs'),
                'return_value' => 'yes',
                'default' => 'yes',
            ]
        );

        $this->add_control(
            'separator',
            [
                'label' => __('Separator', 'wedocs'),
                'type' => Controls_Manager::SELECT,
                'default' => 'angle',
                'options' => [
                    'angle' => '›',
                    'slash' => '/',
                    'arrow' => '→',
                    'dot' => '·',
                    'dash' => '—',
                ],
            ]
        );

        $this->add_control(
            'truncate_length',
            [
                'label' => __('Max Characters per Item', 'wedocs'),
                'type' => Controls_Manager::NUMBER,
                'default' => 0,
                'min' => 0,
                'max' => 100,
                'description' => __('0 = no truncation', 'wedocs'),
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
                    '{{WRAPPER}} .wedocs-el-breadcrumb' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'container_padding',
            [
                'label' => __('Padding', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', 'em'],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-breadcrumb' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'item_gap',
            [
                'label' => __('Item Spacing', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => ['px' => ['min' => 2, 'max' => 20]],
                'default' => ['size' => 8],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-breadcrumb__list' => 'gap: {{SIZE}}px;',
                ],
            ]
        );

        $this->end_controls_section();

        // Style Section - Links
        $this->start_controls_section(
            'style_links',
            [
                'label' => __('Links', 'wedocs'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'link_color',
            [
                'label' => __('Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#64748b',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-breadcrumb__link' => 'color: {{VALUE}};',
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
                    '{{WRAPPER}} .wedocs-el-breadcrumb__link:hover' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'link_typography',
                'selector' => '{{WRAPPER}} .wedocs-el-breadcrumb__link, {{WRAPPER}} .wedocs-el-breadcrumb__current',
            ]
        );

        $this->end_controls_section();

        // Style Section - Current Item
        $this->start_controls_section(
            'style_current',
            [
                'label' => __('Current Item', 'wedocs'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'current_color',
            [
                'label' => __('Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#1e293b',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-breadcrumb__current' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'current_font_weight',
            [
                'label' => __('Font Weight', 'wedocs'),
                'type' => Controls_Manager::SELECT,
                'default' => '600',
                'options' => [
                    '400' => __('Normal', 'wedocs'),
                    '500' => __('Medium', 'wedocs'),
                    '600' => __('Semi Bold', 'wedocs'),
                    '700' => __('Bold', 'wedocs'),
                ],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-breadcrumb__current' => 'font-weight: {{VALUE}};',
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
                'default' => '#cbd5e1',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-breadcrumb__sep' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'separator_size',
            [
                'label' => __('Size', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => ['px' => ['min' => 10, 'max' => 24]],
                'default' => ['size' => 14],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-breadcrumb__sep' => 'font-size: {{SIZE}}px;',
                ],
            ]
        );

        $this->end_controls_section();

        // Style Section - Home Icon
        $this->start_controls_section(
            'style_home_icon',
            [
                'label' => __('Home Icon', 'wedocs'),
                'tab' => Controls_Manager::TAB_STYLE,
                'condition' => ['show_home_icon' => 'yes'],
            ]
        );

        $this->add_control(
            'home_icon_color',
            [
                'label' => __('Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#94a3b8',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-breadcrumb__home-icon svg' => 'fill: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'home_icon_size',
            [
                'label' => __('Size', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => ['px' => ['min' => 12, 'max' => 24]],
                'default' => ['size' => 16],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-breadcrumb__home-icon svg' => 'width: {{SIZE}}px; height: {{SIZE}}px;',
                ],
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();

        $home_text = $settings['home_text'] ?? __('Home', 'wedocs');
        $show_home_icon = ($settings['show_home_icon'] ?? 'yes') === 'yes';
        $separator = $settings['separator'] ?? 'angle';
        $truncate = absint($settings['truncate_length'] ?? 0);

        $separators = [
            'angle' => '›',
            'slash' => '/',
            'arrow' => '→',
            'dot'   => '·',
            'dash'  => '—',
        ];
        $sep_char = $separators[$separator] ?? '›';

        global $post;

        if (empty($post) || $post->post_type !== 'docs') {
            if (\Elementor\Plugin::$instance->editor->is_edit_mode()) {
                echo '<p style="color: #999; font-style: italic; padding: 20px; text-align: center;">' . __('Docs Breadcrumb: Preview it on a single doc page.', 'wedocs') . '</p>';
            }
            return;
        }

        // Build breadcrumb items
        $items = [];

        // Home
        $items[] = [
            'label' => $home_text,
            'url'   => home_url('/'),
            'home'  => true,
        ];

        // Docs home page
        $docs_home = wedocs_get_general_settings('docs_home');
        if ($docs_home) {
            $items[] = [
                'label' => __('Docs', 'wedocs'),
                'url'   => get_permalink($docs_home),
            ];
        }

        // Parent hierarchy
        if ($post->post_parent) {
            $parent_id = $post->post_parent;
            $parents = [];

            while ($parent_id) {
                $page = get_post($parent_id);
                $parents[] = [
                    'label' => get_the_title($page->ID),
                    'url'   => get_permalink($page->ID),
                ];
                $parent_id = $page->post_parent;
            }

            $items = array_merge($items, array_reverse($parents));
        }

        // Current page (no link)
        $items[] = [
            'label'   => get_the_title(),
            'current' => true,
        ];

        ?>
        <nav class="wedocs-el-breadcrumb" aria-label="<?php esc_attr_e('Breadcrumb', 'wedocs'); ?>" itemscope itemtype="http://schema.org/BreadcrumbList">
            <ol class="wedocs-el-breadcrumb__list">
                <?php foreach ($items as $i => $item):
                    $is_current = !empty($item['current']);
                    $is_home = !empty($item['home']);
                    $label = $item['label'];
                    if ($truncate > 0 && mb_strlen($label) > $truncate && !$is_current) {
                        $label = mb_substr($label, 0, $truncate) . '…';
                    }
                ?>
                    <?php if ($i > 0): ?>
                        <li class="wedocs-el-breadcrumb__sep" aria-hidden="true"><?php echo esc_html($sep_char); ?></li>
                    <?php endif; ?>

                    <?php if ($is_current): ?>
                        <li class="wedocs-el-breadcrumb__item" aria-current="page">
                            <span class="wedocs-el-breadcrumb__current"><?php echo esc_html($label); ?></span>
                        </li>
                    <?php else: ?>
                        <li class="wedocs-el-breadcrumb__item" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
                            <a href="<?php echo esc_url($item['url']); ?>" class="wedocs-el-breadcrumb__link" itemprop="item">
                                <?php if ($is_home && $show_home_icon): ?>
                                    <span class="wedocs-el-breadcrumb__home-icon">
                                        <svg viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>
                                    </span>
                                <?php endif; ?>
                                <span itemprop="name"><?php echo esc_html($label); ?></span>
                            </a>
                            <meta itemprop="position" content="<?php echo $i + 1; ?>" />
                        </li>
                    <?php endif; ?>
                <?php endforeach; ?>
            </ol>
        </nav>

        <style>
            .wedocs-el-breadcrumb {
                box-sizing: border-box;
            }

            .wedocs-el-breadcrumb__list {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                list-style: none;
                margin: 0;
                padding: 0;
                gap: 8px;
            }

            .wedocs-el-breadcrumb__link {
                display: inline-flex;
                align-items: center;
                gap: 4px;
                text-decoration: none;
                transition: color 0.15s ease;
            }

            .wedocs-el-breadcrumb__link:hover {
                text-decoration: underline;
            }

            .wedocs-el-breadcrumb__home-icon {
                display: inline-flex;
                align-items: center;
                flex-shrink: 0;
            }

            .wedocs-el-breadcrumb__home-icon svg {
                width: 16px;
                height: 16px;
            }

            .wedocs-el-breadcrumb__sep {
                user-select: none;
                line-height: 1;
            }

            .wedocs-el-breadcrumb__current {
                font-weight: 600;
            }
        </style>
    <?php
    }

    protected function content_template() {
    ?>
        <#
        var homeText = settings.home_text || 'Home';
        var showHomeIcon = settings.show_home_icon === 'yes';
        var separator = settings.separator || 'angle';
        var linkColor = settings.link_color || '#64748b';
        var currentColor = settings.current_color || '#1e293b';
        var sepColor = settings.separator_color || '#cbd5e1';
        var sepSize = settings.separator_size?.size || 14;
        var iconColor = settings.home_icon_color || '#94a3b8';
        var iconSize = settings.home_icon_size?.size || 16;
        var currentWeight = settings.current_font_weight || '600';

        var seps = { angle: '›', slash: '/', arrow: '→', dot: '·', dash: '—' };
        var sepChar = seps[separator] || '›';

        var items = [
            { label: homeText, home: true },
            { label: 'Documentation' },
            { label: 'Getting Started' },
            { label: 'Installation Guide', current: true }
        ];
        #>

        <nav class="wedocs-el-breadcrumb">
            <ol style="display: flex; align-items: center; flex-wrap: wrap; list-style: none; margin: 0; padding: 0; gap: {{ settings.item_gap?.size || 8 }}px;">
                <# for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (i > 0) { #>
                        <li style="color: {{ sepColor }}; font-size: {{ sepSize }}px; user-select: none;">{{ sepChar }}</li>
                <# } #>

                    <# if (item.current) { #>
                        <li><span style="color: {{ currentColor }}; font-weight: {{ currentWeight }};">{{ item.label }}</span></li>
                    <# } else { #>
                        <li>
                            <a href="#" style="display: inline-flex; align-items: center; gap: 4px; text-decoration: none; color: {{ linkColor }};">
                                <# if (item.home && showHomeIcon) { #>
                                    <span style="display: inline-flex;">
                                        <svg width="{{ iconSize }}" height="{{ iconSize }}" viewBox="0 0 20 20" fill="{{ iconColor }}"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>
                                    </span>
                                <# } #>
                                <span>{{ item.label }}</span>
                            </a>
                        </li>
                    <# } #>
                <# } #>
            </ol>
        </nav>
    <?php
    }
}
