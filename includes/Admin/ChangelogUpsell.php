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
     * A still of the Changelogs screen: the same header and Add button, and
     * rows carrying the version, its release date, and the colour-coded
     * category and channel the real list shows.
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
        <div class="wedocs-mock__bar">
            <h2 class="wedocs-mock__title"><?php esc_html_e( 'Changelogs', 'wedocs' ); ?></h2>
            <span class="wedocs-mock__add" aria-hidden="true">
                <span class="dashicons dashicons-plus"></span>
            </span>
        </div>

        <?php foreach ( $entries as $entry ) : ?>
            <div class="wedocs-mock__row">
                <span class="wedocs-mock__grip" aria-hidden="true">
                    <svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor">
                        <circle cx="2" cy="2" r="1.5" /><circle cx="8" cy="2" r="1.5" />
                        <circle cx="2" cy="8" r="1.5" /><circle cx="8" cy="8" r="1.5" />
                        <circle cx="2" cy="14" r="1.5" /><circle cx="8" cy="14" r="1.5" />
                    </svg>
                </span>

                <div class="wedocs-mock__body">
                    <span class="wedocs-mock__term"><?php echo esc_html( $entry['title'] ); ?></span>
                    <p class="wedocs-mock__meaning"><?php echo esc_html( $entry['date'] ); ?></p>
                </div>

                <div class="wedocs-mock__actions">
                    <span class="wedocs-upsell-tag" style="background:<?php echo esc_attr( $entry['color'] ); ?>26;color:<?php echo esc_attr( $entry['color'] ); ?>;">
                        <?php echo esc_html( $entry['category'] ); ?>
                    </span>
                    <span class="wedocs-upsell-tag" style="background:#f3f4f6;color:#4b5563;">
                        <?php echo esc_html( $entry['channel'] ); ?>
                    </span>

                    <svg class="wedocs-mock__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    <svg class="wedocs-mock__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                </div>
            </div>
        <?php endforeach; ?>
        <?php
    }
}
