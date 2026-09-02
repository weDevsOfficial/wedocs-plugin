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
     * A still of the Glossaries screen, built to match the real one: the same
     * header and Add button, the same row - drag handle, term, definition,
     * "Learn more", article count, edit and delete, the enable switch - and
     * then the tooltip a reader actually sees.
     *
     * @return void
     */
    protected function render_mock() {
        $terms = [
            [
                'term'     => 'Cloudflare',
                'meaning'  => __( 'A service that sits in front of your site to speed it up and keep it online.', 'wedocs' ),
                'link'     => __( 'Learn more', 'wedocs' ),
                'articles' => 4,
                'on'       => true,
            ],
            [
                'term'     => 'DNS',
                'meaning'  => __( 'The address book of the internet: it turns a domain name into a server address.', 'wedocs' ),
                'link'     => '',
                'articles' => 7,
                'on'       => true,
            ],
            [
                'term'     => 'SSL',
                'meaning'  => __( 'The padlock in the address bar: it encrypts traffic between a reader and your site.', 'wedocs' ),
                'link'     => '',
                'articles' => 3,
                'on'       => false,
            ],
        ];
        ?>
        <div class="wedocs-mock__bar">
            <h2 class="wedocs-mock__title"><?php esc_html_e( 'Glossaries', 'wedocs' ); ?></h2>
            <span class="wedocs-mock__add" aria-hidden="true">
                <span class="dashicons dashicons-plus"></span>
            </span>
        </div>

        <?php foreach ( $terms as $item ) : ?>
            <div class="wedocs-mock__row">
                <span class="wedocs-mock__grip" aria-hidden="true">
                    <svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor">
                        <circle cx="2" cy="2" r="1.5" /><circle cx="8" cy="2" r="1.5" />
                        <circle cx="2" cy="8" r="1.5" /><circle cx="8" cy="8" r="1.5" />
                        <circle cx="2" cy="14" r="1.5" /><circle cx="8" cy="14" r="1.5" />
                    </svg>
                </span>

                <div class="wedocs-mock__body">
                    <span class="wedocs-mock__term"><?php echo esc_html( $item['term'] ); ?></span>
                    <p class="wedocs-mock__meaning"><?php echo esc_html( $item['meaning'] ); ?></p>
                    <?php if ( $item['link'] ) : ?>
                        <span class="wedocs-mock__link"><?php echo esc_html( $item['link'] ); ?> &rarr;</span>
                    <?php endif; ?>
                </div>

                <div class="wedocs-mock__actions">
                    <span class="wedocs-mock__count">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" />
                        </svg>
                        <?php
                        printf(
                            /* translators: %d: number of articles the term appears in. */
                            esc_html( _n( '%d Article', '%d Articles', $item['articles'], 'wedocs' ) ),
                            (int) $item['articles']
                        );
                        ?>
                    </span>

                    <svg class="wedocs-mock__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    <svg class="wedocs-mock__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>

                    <span class="wedocs-mock__switch<?php echo $item['on'] ? ' is-on' : ''; ?>" aria-hidden="true"><span></span></span>
                </div>
            </div>
        <?php endforeach; ?>

        <h2 class="wedocs-mock__title" style="margin-top:26px;"><?php esc_html_e( 'And this is what a reader sees', 'wedocs' ); ?></h2>

        <div class="wedocs-mock__reader">
            <p>
                <?php esc_html_e( 'Point your domain at our servers using', 'wedocs' ); ?>
                <span class="wedocs-mock__hit"><?php esc_html_e( 'Cloudflare', 'wedocs' ); ?></span>
                <?php esc_html_e( 'and the change goes live within minutes.', 'wedocs' ); ?>
            </p>

            <div class="wedocs-mock__tooltip">
                <span><?php esc_html_e( 'A service that sits in front of your site to speed it up and keep it online.', 'wedocs' ); ?></span>
                <span class="wedocs-mock__tooltip-link"><?php esc_html_e( 'Learn more', 'wedocs' ); ?> &rarr;</span>
            </div>
        </div>
        <?php
    }
}
