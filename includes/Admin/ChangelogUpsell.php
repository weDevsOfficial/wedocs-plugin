<?php

namespace WeDevs\WeDocs\Admin;

/**
 * Free "Changelogs" submenu - a Pro upsell.
 *
 * Registered only when weDocs Pro is not active, since Pro ships the real
 * screen at the same slug and in the same place, so the menu does not
 * rearrange itself on upgrade.
 *
 * The screen itself is the ProPreviews panel the settings page already shows,
 * mounted by `src/upsell.js`. Drawing a second mock here would be a preview
 * that could drift from the first one.
 */
class ChangelogUpsell {

    /**
     * The submenu slug. Pro registers the real screen at the same one.
     */
    const PAGE = 'wedocs-changelog';

    /**
     * Which ProPreviews panel this screen renders.
     */
    const PANEL = 'changelog';

    /**
     * Constructor.
     */
    public function __construct() {
        add_action( 'admin_menu', [ $this, 'register_page' ], 20 );
        add_action( 'admin_menu', [ $this, 'reorder_menu' ], 999 );
        add_action( 'admin_head', [ $this, 'print_badge_styles' ] );
        add_action( 'admin_enqueue_scripts', [ $this, 'enqueue' ] );
    }

    /**
     * Whether weDocs Pro is active, in which case Free stands aside.
     *
     * @return bool
     */
    protected function is_pro_active() {
        return function_exists( 'wedocs_is_pro_active' ) ? wedocs_is_pro_active() : defined( 'WEDOCS_PRO_VERSION' );
    }

    /**
     * The submenu slug this entry sits after. Docs, for the changelog.
     *
     * @return string
     */
    protected function anchor_slug() {
        return admin_url( 'admin.php?page=wedocs' ) . '#/';
    }

    /**
     * Register the submenu page.
     *
     * The badge markup goes in a submenu title only. WordPress derives a
     * top-level page's hook suffix from its title, so decorating a parent
     * would rename every child hook and stop their assets loading; a
     * submenu's hook comes from its slug.
     *
     * @return void
     */
    public function register_page() {
        if ( $this->is_pro_active() ) {
            return;
        }

        $cap = function_exists( 'wedocs_get_publish_cap' ) ? wedocs_get_publish_cap() : 'edit_posts';

        add_submenu_page(
            'wedocs',
            $this->page_title(),
            $this->page_title() . ' ' . $this->badge(),
            $cap,
            static::PAGE,
            [ $this, 'render' ]
        );
    }

    /**
     * The PRO badge, crown and all.
     *
     * The same crown the Premium entry already uses, so the two read as one
     * family rather than two attempts at the same idea.
     *
     * @return string
     */
    protected function badge() {
        $crown = '<svg class="wedocs-pro-badge__crown" viewBox="0 0 24 24" aria-hidden="true" focusable="false">'
            . '<path d="M5 16L3 6l5.5 4L12 4l3.5 6L21 6l-2 10H5zm14 3a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-1h14v1z"/>'
            . '</svg>';

        return '<span class="wedocs-pro-badge">' . esc_html__( 'Pro', 'wedocs' ) . $crown . '</span>';
    }

    /**
     * The menu label, without the badge.
     *
     * @return string
     */
    protected function page_title() {
        return __( 'Changelogs', 'wedocs' );
    }

    /**
     * Sit the entry where Pro will later put the real one.
     *
     * @return void
     */
    public function reorder_menu() {
        global $submenu;

        if ( $this->is_pro_active() || empty( $submenu['wedocs'] ) ) {
            return;
        }

        // Every submenu row is [ title, cap, slug, ... ], so column 2 is the slug.
        $index = array_search( static::PAGE, array_column( $submenu['wedocs'], 2 ), true );

        if ( false === $index ) {
            return;
        }

        $entry = $submenu['wedocs'][ $index ];
        unset( $submenu['wedocs'][ $index ] );
        $submenu['wedocs'] = array_values( $submenu['wedocs'] );

        // Anchored to a neighbour rather than a fixed offset, so the position
        // holds if the surrounding entries ever change.
        $anchor    = array_search( $this->anchor_slug(), array_column( $submenu['wedocs'], 2 ), true );
        $insert_at = false === $anchor ? count( $submenu['wedocs'] ) : $anchor + 1;

        array_splice( $submenu['wedocs'], $insert_at, 0, [ $entry ] );
    }

    /**
     * Style the PRO badge.
     *
     * In `admin_head` because the admin menu renders on every screen, while
     * the plugin stylesheet only loads on weDocs pages. Printed once even
     * though both upsell screens ask for it.
     *
     * @return void
     */
    public function print_badge_styles() {
        static $printed = false;

        if ( $printed || $this->is_pro_active() ) {
            return;
        }

        $printed = true;
        ?>
        <style id="wedocs-pro-badge-style">
            #adminmenu .wedocs-pro-badge {
                display: inline-flex;
                align-items: center;
                gap: 3px;
                margin-left: 6px;
                padding: 1px 7px;
                border-radius: 9999px;
                background: #4f46e5;
                color: #fff;
                font-size: 9px;
                font-weight: 600;
                line-height: 16px;
                letter-spacing: .04em;
                text-transform: uppercase;
                vertical-align: middle;
            }
            #adminmenu .wedocs-pro-badge__crown {
                width: 10px;
                height: 10px;
                fill: currentColor;
            }
            #adminmenu li.current .wedocs-pro-badge,
            #adminmenu a:hover .wedocs-pro-badge {
                background: #4338ca;
            }
        </style>
        <?php
    }

    /**
     * Load the preview bundle on this screen only.
     *
     * @param string $hook Current admin page hook.
     *
     * @return void
     */
    public function enqueue( $hook ) {
        if ( $this->is_pro_active() || 'wedocs_page_' . static::PAGE !== $hook ) {
            return;
        }

        $asset_file = WEDOCS_PATH . '/assets/build/upsell.asset.php';

        if ( ! file_exists( $asset_file ) ) {
            return;
        }

        $asset = require $asset_file;

        wp_enqueue_style( 'wedocs-app-style' );

        wp_enqueue_script(
            'wedocs-upsell-script',
            WEDOCS_ASSETS . '/build/upsell.js',
            $asset['dependencies'],
            $asset['version'],
            true
        );

        wp_set_script_translations( 'wedocs-upsell-script', 'wedocs', WEDOCS_PATH . '/languages/' );
    }

    /**
     * The mount point the preview renders into.
     *
     * @return void
     */
    public function render() {
        printf(
            '<div class="wrap" style="margin-right:20px;"><div id="wedocs-upsell-app" data-screen="%s"></div></div>',
            esc_attr( static::PANEL )
        );
    }
}
