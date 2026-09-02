<?php

namespace WeDevs\WeDocs\Admin;

/**
 * Free "Changelogs" submenu - a Pro upsell.
 *
 * Registered only when weDocs Pro is not active, since Pro ships the real
 * screen at the same slug and in the same place.
 */
class ChangelogUpsell extends UpsellScreen {

    /**
     * @return string
     */
    protected function slug() {
        return 'wedocs-changelog';
    }

    /**
     * @return string
     */
    protected function menu_title() {
        return __( 'Changelogs', 'wedocs' );
    }

    /**
     * @return string
     */
    protected function heading() {
        return __( 'Changelog', 'wedocs' );
    }

    /**
     * @return string
     */
    protected function tagline() {
        return __( 'Keep your users in the loop with a polished, filterable changelog for your product.', 'wedocs' );
    }

    /**
     * @return string[]
     */
    protected function features() {
        return [
            __( 'Publish a changelog timeline at /changelog', 'wedocs' ),
            __( 'Group updates into channels (Free, Pro, …) with their own pages', 'wedocs' ),
            __( 'Colour-coded categories: Fixes, Improvements, New feature, New releases', 'wedocs' ),
            __( 'Customisable header banner, brand colour and RSS feed', 'wedocs' ),
            __( 'Embed anywhere with the [wedocs_changelog] shortcode', 'wedocs' ),
        ];
    }

    /**
     * Directly below Docs, which is where Pro puts the real screen.
     *
     * @return string
     */
    protected function anchor_slug() {
        return admin_url( 'admin.php?page=wedocs' ) . '#/';
    }

    /**
     * A still of the changelog list.
     *
     * @return void
     */
    protected function render_mock() {
        $entries = [
            [
                'title'    => 'v2.5.0',
                'date'     => __( 'Released 12 August 2026', 'wedocs' ),
                'category' => __( 'New feature', 'wedocs' ),
                'color'    => '#0ea5e9',
                'channel'  => __( 'Pro', 'wedocs' ),
            ],
            [
                'title'    => 'v2.4.3',
                'date'     => __( 'Released 29 July 2026', 'wedocs' ),
                'category' => __( 'Fixes', 'wedocs' ),
                'color'    => '#b45309',
                'channel'  => __( 'Free', 'wedocs' ),
            ],
            [
                'title'    => 'v2.4.2',
                'date'     => __( 'Released 15 July 2026', 'wedocs' ),
                'category' => __( 'Improvements', 'wedocs' ),
                'color'    => '#15a66e',
                'channel'  => __( 'Free', 'wedocs' ),
            ],
        ];
        ?>
        <h2><?php esc_html_e( 'This is what the Changelog screen looks like', 'wedocs' ); ?></h2>

        <?php foreach ( $entries as $entry ) : ?>
            <div class="wedocs-upsell-row">
                <div>
                    <p class="wedocs-upsell-row__title"><?php echo esc_html( $entry['title'] ); ?></p>
                    <p class="wedocs-upsell-row__meta"><?php echo esc_html( $entry['date'] ); ?></p>
                </div>
                <div style="display:flex;align-items:center;gap:8px;">
                    <span class="wedocs-upsell-tag" style="background:<?php echo esc_attr( $entry['color'] ); ?>26;color:<?php echo esc_attr( $entry['color'] ); ?>;">
                        <?php echo esc_html( $entry['category'] ); ?>
                    </span>
                    <span class="wedocs-upsell-tag" style="background:#f3f4f6;color:#4b5563;">
                        <?php echo esc_html( $entry['channel'] ); ?>
                    </span>
                </div>
            </div>
        <?php endforeach; ?>
        <?php
    }
}
