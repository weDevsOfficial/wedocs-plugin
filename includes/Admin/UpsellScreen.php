<?php

namespace WeDevs\WeDocs\Admin;

/**
 * A Pro-only screen, as Free shows it.
 *
 * Free registers the same submenu entry Pro will later replace, so the menu
 * does not rearrange itself on upgrade and someone evaluating weDocs can see
 * what the feature is before paying for it. The entry carries a PRO badge, and
 * the screen behind it draws a still of the real thing under an upgrade card -
 * the same treatment the settings panels use, so the two read as one product.
 *
 * A subclass supplies the slug, the titles, where the entry sits, the feature
 * list, and the mock body. Everything else is shared.
 *
 * @since WEDOCS_SINCE
 */
abstract class UpsellScreen {

    /**
     * Constructor.
     *
     * @since WEDOCS_SINCE
     */
    public function __construct() {
        add_action( 'admin_menu', [ $this, 'register_page' ], 20 );
        add_action( 'admin_menu', [ $this, 'reorder_menu' ], 999 );
        add_action( 'admin_head', [ $this, 'print_badge_styles' ] );
    }

    /**
     * The submenu slug.
     *
     * @since WEDOCS_SINCE
     *
     * @return string
     */
    abstract protected function slug();

    /**
     * The menu label, without the badge.
     *
     * @since WEDOCS_SINCE
     *
     * @return string
     */
    abstract protected function menu_title();

    /**
     * The heading on the upgrade card.
     *
     * @since WEDOCS_SINCE
     *
     * @return string
     */
    abstract protected function heading();

    /**
     * One sentence saying what the feature is for.
     *
     * @since WEDOCS_SINCE
     *
     * @return string
     */
    abstract protected function tagline();

    /**
     * What the feature does, as short lines.
     *
     * @since WEDOCS_SINCE
     *
     * @return string[]
     */
    abstract protected function features();

    /**
     * Print the mock of the real screen. Escaped by the implementer.
     *
     * @since WEDOCS_SINCE
     *
     * @return void
     */
    abstract protected function render_mock();

    /**
     * The submenu slug this entry should sit after.
     *
     * @since WEDOCS_SINCE
     *
     * @return string
     */
    abstract protected function anchor_slug();

    /**
     * Where the Upgrade button points.
     *
     * @since WEDOCS_SINCE
     *
     * @return string
     */
    protected function upgrade_url() {
        return 'https://wedocs.co/pricing/?utm_source=wp-admin&utm_medium=' . rawurlencode( $this->slug() );
    }

    /**
     * Whether weDocs Pro is running, in which case Free stands aside.
     *
     * @since WEDOCS_SINCE
     *
     * @return bool
     */
    protected function is_pro_active() {
        return function_exists( 'wedocs_is_pro_active' ) ? wedocs_is_pro_active() : defined( 'WEDOCS_PRO_VERSION' );
    }

    /**
     * Register the submenu page.
     *
     * The badge markup goes in the submenu title, never a parent one: WordPress
     * derives a top-level page's hook suffix from its title, so decorating a
     * parent would rename every child hook and stop their assets loading. A
     * submenu's hook comes from its slug, so this is safe.
     *
     * @since WEDOCS_SINCE
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
            $this->menu_title(),
            $this->menu_title() . ' <span class="wedocs-pro-badge">' . esc_html__( 'Pro', 'wedocs' ) . '</span>',
            $cap,
            $this->slug(),
            [ $this, 'render' ]
        );
    }

    /**
     * Sit the entry where Pro will later put the real one.
     *
     * @since WEDOCS_SINCE
     *
     * @return void
     */
    public function reorder_menu() {
        global $submenu;

        if ( $this->is_pro_active() || empty( $submenu['wedocs'] ) ) {
            return;
        }

        // Every submenu row is [ title, cap, slug, ... ], so column 2 is the slug.
        $index = array_search( $this->slug(), array_column( $submenu['wedocs'], 2 ), true );

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
     * In `admin_head` because the admin menu renders on every screen, while the
     * plugin stylesheet is only enqueued on weDocs pages.
     *
     * @since WEDOCS_SINCE
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
                display: inline-block;
                margin-left: 6px;
                padding: 1px 6px;
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
            #adminmenu li.current .wedocs-pro-badge,
            #adminmenu a:hover .wedocs-pro-badge {
                background: #6366f1;
            }
        </style>
        <?php
    }

    /**
     * Draw the mock under the upgrade card.
     *
     * @since WEDOCS_SINCE
     *
     * @return void
     */
    public function render() {
        ?>
        <div class="wrap wedocs-upsell">
            <div class="wedocs-upsell__card">
                <span class="wedocs-upsell__pill"><?php esc_html_e( 'Pro feature', 'wedocs' ); ?></span>
                <h1 class="wedocs-upsell__title"><?php echo esc_html( $this->heading() ); ?></h1>
                <p class="wedocs-upsell__lede"><?php echo esc_html( $this->tagline() ); ?></p>

                <ul class="wedocs-upsell__features">
                    <?php foreach ( $this->features() as $feature ) : ?>
                        <li>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                <circle cx="10" cy="10" r="10" fill="#ecfdf5" />
                                <path d="M6 10.5l2.5 2.5L14 7" stroke="#15a66e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <span><?php echo esc_html( $feature ); ?></span>
                        </li>
                    <?php endforeach; ?>
                </ul>

                <a href="<?php echo esc_url( $this->upgrade_url() ); ?>" target="_blank" rel="noopener" class="button button-primary button-hero wedocs-upsell__cta">
                    <?php esc_html_e( 'Upgrade to Pro', 'wedocs' ); ?>
                </a>
            </div>

            <div class="wedocs-upsell__preview" aria-hidden="true">
                <?php $this->render_mock(); ?>
            </div>
        </div>
        <?php $this->print_styles(); ?>
        <?php
    }

    /**
     * Styles for the upsell screen.
     *
     * Inline rather than enqueued: this screen exists only in Free, only until
     * someone upgrades, and adding it to the bundle would ship it to every
     * weDocs page for the life of the plugin.
     *
     * @since WEDOCS_SINCE
     *
     * @return void
     */
    protected function print_styles() {
        ?>
        <style>
            .wedocs-upsell { max-width: 960px; margin: 32px auto 0; }
            .wedocs-upsell__card {
                background: #fff; border: 1px solid #e5e7eb; border-radius: 12px;
                padding: 36px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,.05);
            }
            .wedocs-upsell__pill {
                display: inline-block; font-size: 12px; font-weight: 600; letter-spacing: .04em;
                text-transform: uppercase; color: #4f46e5; background: #eef2ff;
                border-radius: 9999px; padding: 5px 12px;
            }
            .wedocs-upsell__title { font-size: 28px; margin: 18px 0 8px; color: #111827; }
            .wedocs-upsell__lede { font-size: 15px; color: #6b7280; margin: 0 auto 24px; max-width: 560px; }
            .wedocs-upsell__features { text-align: left; max-width: 560px; margin: 0 auto 28px; padding: 0; list-style: none; }
            .wedocs-upsell__features li {
                display: flex; align-items: flex-start; gap: 10px;
                margin: 0 0 12px; color: #374151; font-size: 14px;
            }
            .wedocs-upsell__features svg { flex-shrink: 0; margin-top: 1px; }
            .wedocs-upsell__cta { background: #4f46e5 !important; border-color: #4f46e5 !important; }
            /* The still of the real screen. Dimmed and inert: it is an
               illustration, not a control surface. */
            .wedocs-upsell__preview {
                margin-top: 28px; border: 1px solid #e5e7eb; border-radius: 12px;
                background: #fff; padding: 24px; opacity: .55; filter: saturate(.85);
                pointer-events: none; user-select: none;
            }
            .wedocs-upsell__preview h2 { font-size: 15px; margin: 0 0 16px; color: #111827; }
            .wedocs-upsell-row {
                display: flex; align-items: center; justify-content: space-between; gap: 16px;
                border: 1px solid #e5e7eb; border-radius: 8px; padding: 14px 16px; margin-bottom: 10px;
                background: #fff;
            }
            .wedocs-upsell-row__title { font-size: 14px; font-weight: 500; color: #111827; margin: 0; }
            .wedocs-upsell-row__meta { font-size: 12px; color: #6b7280; margin: 4px 0 0; }
            .wedocs-upsell-tag {
                display: inline-block; border-radius: 9999px; padding: 2px 10px;
                font-size: 11px; font-weight: 600;
            }
        </style>
        <?php
    }
}
