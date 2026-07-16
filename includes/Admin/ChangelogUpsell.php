<?php

namespace WeDevs\WeDocs\Admin;

/**
 * Free "Changelogs" submenu — a Pro upsell.
 *
 * Registered only when weDocs Pro is not active (Pro ships the real screen).
 * Sits under the weDocs menu, right after Docs.
 */
class ChangelogUpsell {

    /**
     * Constructor.
     */
    public function __construct() {
        add_action( 'admin_menu', [ $this, 'register_page' ], 20 );
        add_action( 'admin_menu', [ $this, 'reorder_menu' ], 999 );
    }

    /**
     * Whether weDocs Pro is active.
     *
     * @return bool
     */
    private function is_pro_active() {
        return ( function_exists( 'wedocs_is_pro_active' ) && wedocs_is_pro_active() ) || defined( 'WEDOCS_PRO_VERSION' );
    }

    /**
     * Register the submenu page.
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
            __( 'Changelogs', 'wedocs' ),
            __( 'Changelogs', 'wedocs' ),
            $cap,
            'wedocs-changelog',
            [ $this, 'render' ]
        );
    }

    /**
     * Move the Changelogs submenu directly below Docs.
     *
     * @return void
     */
    public function reorder_menu() {
        global $submenu;

        if ( $this->is_pro_active() || empty( $submenu['wedocs'] ) ) {
            return;
        }

        $index = null;
        foreach ( $submenu['wedocs'] as $i => $item ) {
            if ( isset( $item[2] ) && 'wedocs-changelog' === $item[2] ) {
                $index = $i;
                break;
            }
        }

        if ( null === $index ) {
            return;
        }

        $entry = $submenu['wedocs'][ $index ];
        unset( $submenu['wedocs'][ $index ] );
        $submenu['wedocs'] = array_values( $submenu['wedocs'] );
        array_splice( $submenu['wedocs'], 1, 0, [ $entry ] );
    }

    /**
     * Render the upsell screen.
     *
     * @return void
     */
    public function render() {
        $upgrade = apply_filters( 'wedocs_changelog_upgrade_url', 'https://wedocs.co/pricing/?utm_source=wp-admin&utm_medium=changelog-menu' );

        $features = [
            __( 'Publish a beautiful changelog timeline at /changelog', 'wedocs' ),
            __( 'Group updates into channels (Free, Pro, …) with their own pages', 'wedocs' ),
            __( 'Colour-coded categories: Fixes, Improvements, New feature, New releases', 'wedocs' ),
            __( 'Customisable header banner, brand colour and RSS feed', 'wedocs' ),
            __( 'Embed anywhere with the [wedocs_changelog] shortcode', 'wedocs' ),
        ];
        ?>
        <div class="wrap">
            <div style="max-width:720px;margin:40px auto 0;background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:40px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,.05);">
                <span style="display:inline-block;font-size:12px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#4f46e5;background:#eef2ff;border-radius:9999px;padding:5px 12px;">
                    <?php esc_html_e( 'Pro feature', 'wedocs' ); ?>
                </span>
                <h1 style="font-size:28px;margin:18px 0 8px;color:#111827;"><?php esc_html_e( 'Changelog', 'wedocs' ); ?></h1>
                <p style="font-size:15px;color:#6b7280;margin:0 auto 24px;max-width:520px;">
                    <?php esc_html_e( 'Keep your users in the loop with a polished, filterable changelog for your product — available in weDocs Pro.', 'wedocs' ); ?>
                </p>

                <ul style="text-align:left;max-width:520px;margin:0 auto 28px;padding:0;list-style:none;">
                    <?php foreach ( $features as $feature ) : ?>
                        <li style="display:flex;align-items:flex-start;gap:10px;margin:0 0 12px;color:#374151;font-size:14px;">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style="flex-shrink:0;margin-top:1px;"><circle cx="10" cy="10" r="10" fill="#ecfdf5"/><path d="M6 10.5l2.5 2.5L14 7" stroke="#15a66e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            <span><?php echo esc_html( $feature ); ?></span>
                        </li>
                    <?php endforeach; ?>
                </ul>

                <a href="<?php echo esc_url( $upgrade ); ?>" target="_blank" rel="noopener" class="button button-primary button-hero" style="background:#4f46e5;border-color:#4f46e5;">
                    <?php esc_html_e( 'Upgrade to Pro', 'wedocs' ); ?>
                </a>
            </div>
        </div>
        <?php
    }
}
