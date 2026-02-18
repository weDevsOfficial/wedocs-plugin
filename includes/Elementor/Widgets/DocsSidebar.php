<?php

namespace WeDevs\WeDocs\Elementor\Widgets;

use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Box_Shadow;

/**
 * WeDocs Docs Sidebar Navigation Widget for Elementor
 */
class DocsSidebar extends Widget_Base {

    public function get_name() {
        return 'wedocs-docs-sidebar';
    }

    public function get_title() {
        return __('weDocs - Docs Sidebar', 'wedocs');
    }

    public function get_icon() {
        return 'eicon-sidebar';
    }

    public function get_categories() {
        return ['wedocs-category'];
    }

    public function get_keywords() {
        return ['sidebar', 'navigation', 'menu', 'wedocs', 'docs'];
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

            // Fallback: try to find any published doc
            $fallback_doc = get_posts([
                'post_type' => 'docs',
                'post_status' => 'publish',
                'posts_per_page' => 1,
                'meta_query' => [
                    'relation' => 'OR',
                    [
                        'key' => '_wp_page_template',
                        'value' => 'elementor_header_footer',
                        'compare' => 'NOT EXISTS'
                    ],
                    [
                        'key' => '_wp_page_template',
                        'value' => 'elementor_header_footer',
                        'compare' => '!='
                    ]
                ]
            ]);

            if (!empty($fallback_doc)) {
                return $fallback_doc[0];
            }
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
            'show_shortcut',
            [
                'label' => __('Show Keyboard Shortcut', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => __('Yes', 'wedocs'),
                'label_off' => __('No', 'wedocs'),
                'return_value' => 'yes',
                'default' => 'yes',
                'description' => __('Show the ⌘K shortcut hint', 'wedocs'),
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

        $this->add_control(
            'collapse_behavior',
            [
                'label' => __('Default Collapse', 'wedocs'),
                'type' => Controls_Manager::SELECT,
                'default' => 'expand_active',
                'options' => [
                    'expand_active' => __('Expand Active Only', 'wedocs'),
                    'expand_all' => __('Expand All', 'wedocs'),
                    'collapse_all' => __('Collapse All', 'wedocs'),
                ],
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
                'default' => 'normal',
                'options' => [
                    'normal' => __('Normal (Always Visible)', 'wedocs'),
                    'hamburger' => __('Hamburger Toggle', 'wedocs'),
                    'hidden' => __('Hidden on Mobile', 'wedocs'),
                ],
                'description' => __('How to display the sidebar on screens ≤768px', 'wedocs'),
            ]
        );

        $this->add_control(
            'mobile_toggle_text',
            [
                'label' => __('Toggle Button Text', 'wedocs'),
                'type' => Controls_Manager::TEXT,
                'default' => __('Navigation', 'wedocs'),
                'condition' => ['mobile_display' => 'hamburger'],
            ]
        );

        $this->add_control(
            'mobile_toggle_color',
            [
                'label' => __('Toggle Button Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#1e293b',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-sidebar__toggle' => 'color: {{VALUE}};',
                    '{{WRAPPER}} .wedocs-el-sidebar__toggle svg' => 'fill: {{VALUE}};',
                ],
                'condition' => ['mobile_display' => 'hamburger'],
            ]
        );

        $this->add_control(
            'mobile_toggle_bg',
            [
                'label' => __('Toggle Button Background', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#f1f5f9',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-sidebar__toggle' => 'background-color: {{VALUE}};',
                ],
                'condition' => ['mobile_display' => 'hamburger'],
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
                    '{{WRAPPER}} .wedocs-el-sidebar' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'container_padding',
            [
                'label' => __('Padding', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%', 'em'],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-sidebar' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Border::get_type(),
            [
                'name' => 'container_border',
                'selector' => '{{WRAPPER}} .wedocs-el-sidebar',
            ]
        );

        $this->add_responsive_control(
            'container_border_radius',
            [
                'label' => __('Border Radius', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%'],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-sidebar' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Box_Shadow::get_type(),
            [
                'name' => 'container_shadow',
                'selector' => '{{WRAPPER}} .wedocs-el-sidebar',
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
                    '{{WRAPPER}} .wedocs-el-sidebar__title' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'title_typography',
                'selector' => '{{WRAPPER}} .wedocs-el-sidebar__title',
            ]
        );

        $this->add_responsive_control(
            'title_margin',
            [
                'label' => __('Margin', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', 'em'],
                'default' => ['top' => 0, 'right' => 0, 'bottom' => 15, 'left' => 0, 'unit' => 'px'],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-sidebar__title' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->end_controls_section();

        // Style Section - Search
        $this->start_controls_section(
            'style_search',
            [
                'label' => __('Quick Search', 'wedocs'),
                'tab' => Controls_Manager::TAB_STYLE,
                'condition' => ['show_search' => 'yes'],
            ]
        );

        $this->add_control(
            'search_bg',
            [
                'label' => __('Background Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#f8fafc',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-sidebar__search' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'search_text_color',
            [
                'label' => __('Text Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#64748b',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-sidebar__search input' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'search_placeholder_color',
            [
                'label' => __('Placeholder Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#94a3b8',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-sidebar__search input::placeholder' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'search_icon_color',
            [
                'label' => __('Icon Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#95a4b9',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-sidebar__search svg' => 'fill: {{VALUE}};',
                    '{{WRAPPER}} .wedocs-el-sidebar__search svg path' => 'fill: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Border::get_type(),
            [
                'name' => 'search_border',
                'selector' => '{{WRAPPER}} .wedocs-el-sidebar__search',
                'fields_options' => [
                    'border' => ['default' => 'solid'],
                    'width' => ['default' => ['top' => 1, 'right' => 1, 'bottom' => 1, 'left' => 1]],
                    'color' => ['default' => '#e2e8f0'],
                ],
            ]
        );

        $this->add_responsive_control(
            'search_border_radius',
            [
                'label' => __('Border Radius', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%'],
                'default' => ['top' => 6, 'right' => 6, 'bottom' => 6, 'left' => 6, 'unit' => 'px'],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-sidebar__search' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'search_padding',
            [
                'label' => __('Padding', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', 'em'],
                'default' => ['top' => 10, 'right' => 14, 'bottom' => 10, 'left' => 14, 'unit' => 'px'],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-sidebar__search' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'shortcut_bg',
            [
                'label' => __('Shortcut Badge Background', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#e2e8f0',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-sidebar__search .short-key' => 'background-color: {{VALUE}};',
                ],
                'condition' => ['show_shortcut' => 'yes'],
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
                    '{{WRAPPER}} .wedocs-el-sidebar .doc-nav-list a' => 'color: {{VALUE}};',
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
                    '{{WRAPPER}} .wedocs-el-sidebar .doc-nav-list a:hover' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'active_color',
            [
                'label' => __('Active Item Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#0073aa',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-sidebar .doc-nav-list .current_page_item > a' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'active_bg_color',
            [
                'label' => __('Active Item Background', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-sidebar .doc-nav-list .current_page_item > a' => 'background-color: {{VALUE}};',
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
                    '{{WRAPPER}} .wedocs-el-sidebar .doc-nav-list .current_page_item > a' => 'border-left-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'link_typography',
                'selector' => '{{WRAPPER}} .wedocs-el-sidebar .doc-nav-list a',
            ]
        );

        $this->add_responsive_control(
            'item_padding',
            [
                'label' => __('Item Padding', 'wedocs'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', 'em'],
                'default' => ['top' => 8, 'right' => 12, 'bottom' => 8, 'left' => 12, 'unit' => 'px'],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-sidebar .doc-nav-list a' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'child_indent',
            [
                'label' => __('Sub-item Indent', 'wedocs'),
                'type' => Controls_Manager::SLIDER,
                'range' => ['px' => ['min' => 0, 'max' => 40]],
                'default' => ['size' => 16],
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-sidebar .doc-nav-list .children' => 'padding-left: {{SIZE}}px;',
                ],
            ]
        );

        $this->add_control(
            'caret_color',
            [
                'label' => __('Caret/Arrow Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#94a3b8',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-sidebar .wedocs-caret' => 'border-top-color: {{VALUE}};',
                    '{{WRAPPER}} .wedocs-el-sidebar .wd-state-closed > a .wedocs-caret' => 'border-left-color: {{VALUE}}; border-top-color: transparent;',
                ],
            ]
        );

        $this->add_control(
            'divider_color',
            [
                'label' => __('Divider Color', 'wedocs'),
                'type' => Controls_Manager::COLOR,
                'default' => '#f1f5f9',
                'selectors' => [
                    '{{WRAPPER}} .wedocs-el-sidebar .doc-nav-list > li' => 'border-bottom-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'show_dividers',
            [
                'label' => __('Show Dividers', 'wedocs'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => __('Yes', 'wedocs'),
                'label_off' => __('No', 'wedocs'),
                'return_value' => 'yes',
                'default' => '',
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();

        $show_search = ($settings['show_search'] ?? 'yes') === 'yes';
        $show_shortcut = ($settings['show_shortcut'] ?? 'yes') === 'yes';
        $show_title = ($settings['show_title'] ?? 'yes') === 'yes';
        $search_placeholder = $settings['search_placeholder'] ?? __('Quick search...', 'wedocs');
        $collapse_behavior = $settings['collapse_behavior'] ?? 'expand_active';
        $show_dividers = ($settings['show_dividers'] ?? '') === 'yes';
        $mobile_display = $settings['mobile_display'] ?? 'normal';
        $mobile_toggle_text = $settings['mobile_toggle_text'] ?? __('Navigation', 'wedocs');

        // Get the proper post context
        $current_post = $this->get_editor_post_context();

        if (!$current_post) {
            if (\Elementor\Plugin::$instance->editor->is_edit_mode()) {
                // Show preview with sample data
                $this->render_editor_preview($settings);
            }
            return;
        }

        // Determine the parent doc
        $ancestors = [];
        $parent = false;

        if (!empty($current_post->post_parent)) {
            $ancestors = get_post_ancestors($current_post->ID);
            $root = count($ancestors) - 1;
            $parent = $ancestors[$root];
        } else {
            $parent = !empty($current_post->ID) ? $current_post->ID : '';
        }

        if (!$parent) {
            if (\Elementor\Plugin::$instance->editor->is_edit_mode()) {
                $this->render_editor_preview($settings);
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

        $sidebar_class = 'wedocs-el-sidebar';
        if ($collapse_behavior === 'expand_all') {
            $sidebar_class .= ' wedocs-el-sidebar--expand-all';
        } elseif ($collapse_behavior === 'collapse_all') {
            $sidebar_class .= ' wedocs-el-sidebar--collapse-all';
        }
        if ($mobile_display === 'hamburger') {
            $sidebar_class .= ' wedocs-el-sidebar--mobile-hamburger';
        } elseif ($mobile_display === 'hidden') {
            $sidebar_class .= ' wedocs-el-sidebar--mobile-hidden';
        }
?>

        <?php if ($mobile_display === 'hamburger'): ?>
            <button type="button" class="wedocs-el-sidebar__toggle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
                </svg>
                <span><?php echo esc_html($mobile_toggle_text); ?></span>
            </button>
        <?php endif; ?>

        <div class="<?php echo esc_attr($sidebar_class); ?>">
            <?php if ($mobile_display === 'hamburger'): ?>
                <button type="button" class="wedocs-el-sidebar__mobile-close" aria-label="<?php esc_attr_e('Close navigation', 'wedocs'); ?>">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                </button>
            <?php endif; ?>

            <?php if ($show_title && $parent): ?>
                <h3 class="wedocs-el-sidebar__title">
                    <a href="<?php echo get_permalink($parent); ?>"><?php echo get_post_field('post_title', $parent, 'display'); ?></a>
                </h3>
            <?php endif; ?>

            <?php if ($show_search): ?>
                <div class="wedocs-el-sidebar__search wedocs-single-search-input">
                    <input
                        name="s"
                        readonly
                        type="search"
                        class="search-field"
                        placeholder="<?php echo esc_attr($search_placeholder); ?>" />
                    <button type="button" class="search-submit">
                        <svg width="15" height="16" fill="currentColor">
                            <path fill-rule="evenodd" d="M11.856 10.847l2.883 2.883a.89.89 0 0 1 0 1.257c-.173.174-.401.261-.629.261s-.455-.087-.629-.261l-2.883-2.883c-1.144.874-2.532 1.353-3.996 1.353a6.56 6.56 0 0 1-4.671-1.935c-2.576-2.575-2.576-6.765 0-9.341C3.179.934 4.839.247 6.603.247s3.424.687 4.671 1.935a6.56 6.56 0 0 1 1.935 4.67 6.55 6.55 0 0 1-1.353 3.995zM3.189 3.439c-1.882 1.882-1.882 4.945 0 6.827.912.912 2.124 1.414 3.414 1.414s2.502-.502 3.414-1.414 1.414-2.124 1.414-3.413-.502-2.502-1.414-3.413-2.124-1.414-3.414-1.414-2.502.502-3.414 1.414z" />
                        </svg>
                    </button>
                    <?php if ($show_shortcut): ?>
                        <div class="short-key">⌘K</div>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <?php if ($children): ?>
                <ul class="doc-nav-list">
                    <?php echo $children; ?>
                </ul>
            <?php endif; ?>
        </div>

        <style>
            .wedocs-el-sidebar {
                box-sizing: border-box;
            }

            .wedocs-el-sidebar__title {
                margin: 0 0 15px;
            }

            .wedocs-el-sidebar__title a {
                text-decoration: none;
                color: inherit;
            }

            .wedocs-el-sidebar__search.wedocs-single-search-input {
                display: flex;
                align-items: center;
                gap: 0;
                margin-bottom: 15px;
                cursor: pointer;
                position: relative;
                border-bottom: none;
            }

            .wedocs-el-sidebar__search.wedocs-single-search-input input.search-field {
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
                padding-left: 28px;
            }

            .wedocs-el-sidebar__search.wedocs-single-search-input .search-submit {
                background: none;
                border: none;
                cursor: pointer;
                padding: 0;
                display: flex;
                align-items: center;
                flex-shrink: 0;
                position: absolute;
                left: 14px;
                top: 50%;
                transform: translateY(-50%);
            }

            .wedocs-el-sidebar__search.wedocs-single-search-input .short-key {
                font-size: 11px;
                padding: 2px 6px;
                border-radius: 4px;
                font-weight: 500;
                color: #64748b;
                flex-shrink: 0;
                line-height: 1.4;
                position: static;
                margin: 0;
            }

            .wedocs-el-sidebar .doc-nav-list {
                list-style: none;
                margin: 0;
                padding: 0;
            }

            .wedocs-el-sidebar .doc-nav-list .children {
                list-style: none;
                margin: 0;
            }

            .wedocs-el-sidebar .doc-nav-list a {
                display: flex;
                align-items: center;
                justify-content: space-between;
                text-decoration: none;
                transition: all 0.15s ease;
                border-left: 3px solid transparent;
            }

            .wedocs-el-sidebar .doc-nav-list .current_page_item>a {
                font-weight: 600;
            }

            <?php if ($show_dividers): ?>.wedocs-el-sidebar .doc-nav-list>li {
                border-bottom: 1px solid;
            }

            .wedocs-el-sidebar .doc-nav-list>li:last-child {
                border-bottom: none;
            }

            <?php endif; ?>

            /* Caret toggle */
            .wedocs-el-sidebar .wedocs-caret {
                display: inline-block;
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-top: 6px solid;
                cursor: pointer;
                transition: transform 0.2s ease;
                flex-shrink: 0;
                margin-left: 8px;
            }

            .wedocs-el-sidebar .wd-state-closed>a .wedocs-caret {
                border-top: 5px solid transparent;
                border-bottom: 5px solid transparent;
                border-left: 6px solid;
                border-right: 0;
            }

            .wedocs-el-sidebar .wd-state-closed>.children {
                display: none;
            }

            .wedocs-el-sidebar .wd-state-open>.children {
                display: block;
            }

            /* Collapse behaviors */
            .wedocs-el-sidebar--expand-all .page_item_has_children>.children {
                display: block !important;
            }

            .wedocs-el-sidebar--collapse-all .page_item_has_children:not(.current_page_item):not(.current_page_ancestor)>.children {
                display: none;
            }

            /* Mobile toggle button - hidden on desktop */
            .wedocs-el-sidebar__toggle {
                display: none;
                align-items: center;
                gap: 8px;
                width: 100%;
                padding: 12px 16px;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                cursor: pointer;
                font-size: 15px;
                font-weight: 600;
                transition: background-color 0.2s ease;
                box-sizing: border-box;
            }

            .wedocs-el-sidebar__toggle:hover {
                opacity: 0.85;
            }

            .wedocs-el-sidebar__toggle svg {
                flex-shrink: 0;
            }

            /* Mobile responsive modes */
            @media screen and (max-width: 768px) {
                .wedocs-el-sidebar--mobile-hidden {
                    display: none !important;
                }

                .wedocs-el-sidebar__toggle {
                    display: flex;
                }

                .wedocs-el-sidebar--mobile-hamburger {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 99999;
                    background: #fff;
                    overflow-y: auto;
                    padding: 20px;
                    box-sizing: border-box;
                    animation: wedocsSidebarSlideIn 0.25s ease;
                }

                .wedocs-el-sidebar--mobile-hamburger.wedocs-el-sidebar--mobile-open {
                    display: block;
                }

                .wedocs-el-sidebar--mobile-hamburger .wedocs-el-sidebar__mobile-close {
                    display: flex;
                }
            }

            .wedocs-el-sidebar__mobile-close {
                display: none;
                align-items: center;
                justify-content: flex-end;
                background: none;
                border: none;
                cursor: pointer;
                padding: 4px;
                margin-bottom: 12px;
                margin-left: auto;
                color: #64748b;
            }

            .wedocs-el-sidebar__mobile-close:hover {
                color: #1e293b;
            }

            @keyframes wedocsSidebarSlideIn {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }

                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        </style>

        <script>
            (function($) {
                'use strict';
                var $sidebar = $('.wedocs-el-sidebar');

                // Toggle sidebar children
                $sidebar.find('.doc-nav-list .page_item_has_children').on('click', '.wedocs-caret', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var $parent = $(this).closest('.page_item');
                    if ($parent.hasClass('wd-state-closed')) {
                        $parent.removeClass('wd-state-closed').addClass('wd-state-open');
                    } else {
                        $parent.removeClass('wd-state-open').addClass('wd-state-closed');
                    }
                });

                // Ensure active ancestor is expanded
                $sidebar.find('.current_page_ancestor').each(function() {
                    $(this).removeClass('wd-state-closed').addClass('wd-state-open');
                });

                // Mobile hamburger toggle
                var $toggle = $sidebar.prev('.wedocs-el-sidebar__toggle');
                var $closeBtn = $sidebar.find('.wedocs-el-sidebar__mobile-close');

                if ($toggle.length) {
                    $toggle.on('click', function() {
                        $sidebar.addClass('wedocs-el-sidebar--mobile-open');
                        $('body').css('overflow', 'hidden');
                    });

                    $closeBtn.on('click', function() {
                        $sidebar.removeClass('wedocs-el-sidebar--mobile-open');
                        $('body').css('overflow', '');
                    });

                    $(document).on('keydown', function(e) {
                        if (e.key === 'Escape' && $sidebar.hasClass('wedocs-el-sidebar--mobile-open')) {
                            $sidebar.removeClass('wedocs-el-sidebar--mobile-open');
                            $('body').css('overflow', '');
                        }
                    });
                }
            })(jQuery);
        </script>
    <?php
    }

    /**
     * Render preview for editor mode with sample data
     */
    protected function render_editor_preview($settings) {
        $show_search = ($settings['show_search'] ?? 'yes') === 'yes';
        $show_shortcut = ($settings['show_shortcut'] ?? 'yes') === 'yes';
        $show_title = ($settings['show_title'] ?? 'yes') === 'yes';
        $search_placeholder = $settings['search_placeholder'] ?? __('Quick search...', 'wedocs');
        $mobile_display = $settings['mobile_display'] ?? 'normal';
        $mobile_toggle_text = $settings['mobile_toggle_text'] ?? __('Navigation', 'wedocs');

        $sidebar_class = 'wedocs-el-sidebar';
        if ($mobile_display === 'hamburger') {
            $sidebar_class .= ' wedocs-el-sidebar--mobile-hamburger';
        } elseif ($mobile_display === 'hidden') {
            $sidebar_class .= ' wedocs-el-sidebar--mobile-hidden';
        }
    ?>

        <?php if ($mobile_display === 'hamburger'): ?>
            <button type="button" class="wedocs-el-sidebar__toggle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
                </svg>
                <span><?php echo esc_html($mobile_toggle_text); ?></span>
            </button>
        <?php endif; ?>

        <aside class="<?php echo esc_attr($sidebar_class); ?>">
            <?php if ($mobile_display === 'hamburger'): ?>
                <div class="wedocs-el-sidebar__mobile-header">
                    <span class="wedocs-el-sidebar__mobile-title"><?php echo esc_html($mobile_toggle_text); ?></span>
                    <button type="button" class="wedocs-el-sidebar__mobile-close">×</button>
                </div>
            <?php endif; ?>

            <?php if ($show_title): ?>
                <h3 class="wedocs-el-sidebar__title"><?php _e('Sample Documentation', 'wedocs'); ?></h3>
            <?php endif; ?>

            <?php if ($show_search): ?>
                <div class="wedocs-el-sidebar__search-container">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="wedocs-el-sidebar__search-icon">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    <input type="search" class="wedocs-el-sidebar__search" placeholder="<?php echo esc_attr($search_placeholder); ?>" readonly>
                    <?php if ($show_shortcut): ?>
                        <span class="wedocs-el-sidebar__shortcut">⌘K</span>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <nav class="doc-nav">
                <ul class="doc-nav-list">
                    <li class="wd-state-open current">
                        <a href="#" class="wd-doc-link">
                            <span class="wedocs-caret"></span>
                            Getting Started
                        </a>
                        <ul class="children">
                            <li><a href="#" class="wd-doc-link">Installation</a></li>
                            <li class="current_page_item"><a href="#" class="wd-doc-link">Quick Setup</a></li>
                            <li><a href="#" class="wd-doc-link">Configuration</a></li>
                        </ul>
                    </li>
                    <li class="wd-state-closed">
                        <a href="#" class="wd-doc-link">
                            <span class="wedocs-caret"></span>
                            Advanced Features
                        </a>
                        <ul class="children">
                            <li><a href="#" class="wd-doc-link">Custom Templates</a></li>
                            <li><a href="#" class="wd-doc-link">Advanced Configuration</a></li>
                        </ul>
                    </li>
                    <li><a href="#" class="wd-doc-link">Troubleshooting</a></li>
                    <li><a href="#" class="wd-doc-link">FAQ</a></li>
                </ul>
            </nav>

            <div class="wedocs-el-sidebar__preview-note" style="margin-top: 20px; padding: 10px; background: #f0f8ff; border-left: 3px solid #2196f3; font-size: 12px; color: #666;">
                📝 <?php _e('Preview: This shows how the sidebar will look with your documentation structure.', 'wedocs'); ?>
            </div>
        </aside>
    <?php
    }

    protected function content_template() {
    ?>
        <#
            var showSearch=settings.show_search==='yes' ;
            var showShortcut=settings.show_shortcut==='yes' ;
            var showTitle=settings.show_title==='yes' ;
            var showDividers=settings.show_dividers==='yes' ;
            #>

            <div class="wedocs-el-sidebar" style="background-color: {{ settings.bg_color || '' }};">
                <# if (showTitle) { #>
                    <h3 class="wedocs-el-sidebar__title" style="color: {{ settings.title_color || '#1e293b' }}; margin: 0 0 15px;">
                        <a href="#" style="text-decoration: none; color: inherit;">Sample Documentation</a>
                    </h3>
                    <# } #>

                        <# if (showSearch) { #>
                            <div class="wedocs-el-sidebar__search" style="display: flex; align-items: center; gap: 8px; padding: 10px 14px; background: {{ settings.search_bg || '#f8fafc' }}; border: 1px solid {{ settings.search_border_color || '#e2e8f0' }}; border-radius: 6px; margin-bottom: 15px; cursor: pointer;">
                                <svg width="15" height="16" fill="{{ settings.search_icon_color || '#95a4b9' }}">
                                    <path fill-rule="evenodd" d="M11.856 10.847l2.883 2.883a.89.89 0 0 1 0 1.257c-.173.174-.401.261-.629.261s-.455-.087-.629-.261l-2.883-2.883c-1.144.874-2.532 1.353-3.996 1.353a6.56 6.56 0 0 1-4.671-1.935c-2.576-2.575-2.576-6.765 0-9.341C3.179.934 4.839.247 6.603.247s3.424.687 4.671 1.935a6.56 6.56 0 0 1 1.935 4.67 6.55 6.55 0 0 1-1.353 3.995zM3.189 3.439c-1.882 1.882-1.882 4.945 0 6.827.912.912 2.124 1.414 3.414 1.414s2.502-.502 3.414-1.414 1.414-2.124 1.414-3.413-.502-2.502-1.414-3.413-2.124-1.414-3.414-1.414-2.502.502-3.414 1.414z" />
                                </svg>
                                <span style="flex: 1; color: {{ settings.search_placeholder_color || '#94a3b8' }}; font-size: 14px;">{{ settings.search_placeholder || 'Quick search...' }}</span>
                                <# if (showShortcut) { #>
                                    <span style="font-size: 11px; padding: 2px 6px; border-radius: 4px; background: {{ settings.shortcut_bg || '#e2e8f0' }}; color: #64748b; font-weight: 500;">⌘K</span>
                                    <# } #>
                            </div>
                            <# } #>

                                <ul class="doc-nav-list" style="list-style: none; margin: 0; padding: 0;">
                                    <#
                                        var sampleItems=[
                                        { title: 'Getting Started' , hasChildren: true, active: false, children: ['Installation', 'Quick Setup' ] },
                                        { title: 'Configuration' , hasChildren: true, active: true, children: ['Basic Settings', 'Advanced Options' , 'Environment Variables' ] },
                                        { title: 'User Guide' , hasChildren: false, active: false, children: [] },
                                        { title: 'API Reference' , hasChildren: true, active: false, children: ['Authentication', 'Endpoints' ] },
                                        { title: 'FAQ' , hasChildren: false, active: false, children: [] },
                                        ];

                                        for (var i=0; i < sampleItems.length; i++) {
                                        var item=sampleItems[i];
                                        var stateClass=item.active ? 'wd-state-open current_page_ancestor' : 'wd-state-closed' ;
                                        var borderBottom=showDividers && i < sampleItems.length - 1 ? 'border-bottom: 1px solid ' + (settings.divider_color || '#f1f5f9' ) + ';' : '' ;
                                        #>
                                        <li class="page_item {{ item.hasChildren ? 'page_item_has_children ' + stateClass : '' }}" style="{{ borderBottom }}">
                                            <a href="#" style="display: flex; align-items: center; justify-content: space-between; text-decoration: none; padding: {{ settings.item_padding?.top || 8 }}px {{ settings.item_padding?.right || 12 }}px {{ settings.item_padding?.bottom || 8 }}px {{ settings.item_padding?.left || 12 }}px; color: {{ settings.link_color || '#475569' }}; border-left: 3px solid transparent;">
                                                {{ item.title }}
                                                <# if (item.hasChildren) { #>
                                                    <span style="display: inline-block; width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 6px solid {{ settings.caret_color || '#94a3b8' }}; margin-left: 8px;"></span>
                                                    <# } #>
                                            </a>
                                            <# if (item.hasChildren && item.active) { #>
                                                <ul class="children" style="list-style: none; margin: 0; padding-left: {{ settings.child_indent?.size || 16 }}px;">
                                                    <# for (var j=0; j < item.children.length; j++) { #>
                                                        <li class="page_item {{ j === 1 ? 'current_page_item' : '' }}">
                                                            <a href="#" style="display: block; text-decoration: none; padding: {{ settings.item_padding?.top || 8 }}px {{ settings.item_padding?.right || 12 }}px {{ settings.item_padding?.bottom || 8 }}px {{ settings.item_padding?.left || 12 }}px; color: {{ j === 1 ? (settings.active_color || '#0073aa') : (settings.link_color || '#475569') }}; border-left: 3px solid {{ j === 1 ? (settings.active_border_color || '#0073aa') : 'transparent' }}; {{ j === 1 ? 'font-weight: 600;' : '' }}">
                                                                {{ item.children[j] }}
                                                            </a>
                                                        </li>
                                                        <# } #>
                                                </ul>
                                                <# } #>
                                        </li>
                                        <# } #>
                                </ul>
            </div>
    <?php
    }
}
