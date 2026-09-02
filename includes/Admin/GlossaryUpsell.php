<?php

namespace WeDevs\WeDocs\Admin;

/**
 * Free "Glossaries" submenu - a Pro upsell.
 *
 * Registered only when weDocs Pro is not active, since Pro ships the real
 * screen at the same slug and in the same place.
 */
class GlossaryUpsell extends UpsellScreen {

    /**
     * @return string
     */
    protected function slug() {
        return 'wedocs-glossaries';
    }

    /**
     * @return string
     */
    protected function menu_title() {
        return __( 'Glossaries', 'wedocs' );
    }

    /**
     * @return string
     */
    protected function heading() {
        return __( 'Glossary', 'wedocs' );
    }

    /**
     * @return string
     */
    protected function tagline() {
        return __( 'Explain a term once and weDocs marks it wherever it appears in your documentation, with a tooltip that defines it in place.', 'wedocs' );
    }

    /**
     * @return string[]
     */
    protected function features() {
        return [
            __( 'Define a term once; every mention across your docs picks it up', 'wedocs' ),
            __( 'Readers get the definition in a tooltip without leaving the page', 'wedocs' ),
            __( 'Add a "Learn more" link to send them deeper when they want it', 'wedocs' ),
            __( 'Works in documentation, shortcodes and blocks alike', 'wedocs' ),
            __( 'Match your brand: fonts and colours for the term and its tooltip', 'wedocs' ),
        ];
    }

    /**
     * Directly after Tags, which is where Pro puts the real screen.
     *
     * @return string
     */
    protected function anchor_slug() {
        return 'edit-tags.php?taxonomy=doc_tag&post_type=docs';
    }

    /**
     * A still of the glossary list, plus the tooltip a reader would see.
     *
     * @return void
     */
    protected function render_mock() {
        $terms = [
            [
                'term'     => 'Cloudflare',
                'meaning'  => __( 'A service that sits in front of your site to speed it up and keep it online.', 'wedocs' ),
                'articles' => 4,
            ],
            [
                'term'     => 'DNS',
                'meaning'  => __( 'The address book of the internet: it turns a domain name into a server address.', 'wedocs' ),
                'articles' => 7,
            ],
            [
                'term'     => 'SSL',
                'meaning'  => __( 'The padlock in the address bar: it encrypts traffic between a reader and your site.', 'wedocs' ),
                'articles' => 3,
            ],
        ];
        ?>
        <h2><?php esc_html_e( 'This is what the Glossaries screen looks like', 'wedocs' ); ?></h2>

        <?php foreach ( $terms as $item ) : ?>
            <div class="wedocs-upsell-row">
                <div>
                    <p class="wedocs-upsell-row__title"><?php echo esc_html( $item['term'] ); ?></p>
                    <p class="wedocs-upsell-row__meta"><?php echo esc_html( $item['meaning'] ); ?></p>
                </div>
                <span class="wedocs-upsell-tag" style="background:#f3f4f6;color:#4b5563;">
                    <?php
                    printf(
                        /* translators: %d: number of articles the term appears in. */
                        esc_html( _n( '%d article', '%d articles', $item['articles'], 'wedocs' ) ),
                        (int) $item['articles']
                    );
                    ?>
                </span>
            </div>
        <?php endforeach; ?>

        <h2 style="margin-top:24px;"><?php esc_html_e( 'And this is what a reader sees', 'wedocs' ); ?></h2>

        <div style="border:1px solid #e5e7eb;border-radius:8px;padding:20px;background:#f9fafb;">
            <p style="margin:0;font-size:14px;line-height:1.7;color:#374151;">
                <?php esc_html_e( 'Point your domain at our servers using', 'wedocs' ); ?>
                <span style="color:#4F46E5;font-weight:500;text-decoration:underline;text-underline-offset:3px;">
                    <?php esc_html_e( 'Cloudflare', 'wedocs' ); ?>
                </span>
                <?php esc_html_e( 'and the change goes live within minutes.', 'wedocs' ); ?>
            </p>

            <div style="margin-top:14px;display:inline-block;max-width:320px;background:#111827;border:1px solid #111827;border-radius:6px;padding:12px 16px;">
                <span style="display:block;color:#F9FAFB;font-size:12px;line-height:1.6;">
                    <?php esc_html_e( 'A service that sits in front of your site to speed it up and keep it online.', 'wedocs' ); ?>
                </span>
                <span style="display:block;margin-top:8px;color:#FBBF24;font-size:12px;font-weight:500;">
                    <?php esc_html_e( 'Learn more →', 'wedocs' ); ?>
                </span>
            </div>
        </div>
        <?php
    }
}
