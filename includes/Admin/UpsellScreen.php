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
     * Draw the screen: the mock itself, with the upgrade prompt over it.
     *
     * The same treatment the locked settings panels use - a still of the real
     * thing, dimmed, with the prompt appearing over it - so a Free site meets
     * one pattern for Pro features rather than a marketing card here and a
     * preview there.
     *
     * @since WEDOCS_SINCE
     *
     * @return void
     */
    public function render() {
        ?>
        <div class="wrap wedocs-upsell">
            <h1 class="wedocs-upsell__heading">
                <?php echo esc_html( $this->heading() ); ?>
                <span class="wedocs-upsell__pill"><?php esc_html_e( 'Pro feature', 'wedocs' ); ?></span>
            </h1>
            <p class="wedocs-upsell__lede"><?php echo esc_html( $this->tagline() ); ?></p>

            <div class="wedocs-upsell__preview">
                <div class="wedocs-upsell__mock"><?php $this->render_mock(); ?></div>

                <div class="wedocs-upsell__overlay">
                    <div class="wedocs-upsell__popup">
                        <h2><?php esc_html_e( 'Unlock and enjoy Pro features', 'wedocs' ); ?></h2>
                        <ul>
                            <?php foreach ( $this->features() as $feature ) : ?>
                                <li>
                                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                        <circle cx="10" cy="10" r="10" fill="#ecfdf5" />
                                        <path d="M6 10.5l2.5 2.5L14 7" stroke="#15a66e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <span><?php echo esc_html( $feature ); ?></span>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                        <a href="<?php echo esc_url( $this->upgrade_url() ); ?>" target="_blank" rel="noopener" class="wedocs-upsell__cta">
                            <?php esc_html_e( 'Upgrade to Pro', 'wedocs' ); ?>
                        </a>
                    </div>
                </div>
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
            .wedocs-upsell { max-width: 960px; margin: 24px auto 0; }
            .wedocs-upsell__heading {
                display: flex; align-items: center; gap: 12px;
                font-size: 23px; color: #111827; margin: 0 0 6px; padding: 0;
            }
            .wedocs-upsell__pill {
                font-size: 11px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase;
                color: #4f46e5; background: #eef2ff; border-radius: 9999px; padding: 4px 10px;
            }
            .wedocs-upsell__lede { font-size: 14px; color: #6b7280; margin: 0 0 20px; max-width: 640px; }

            .wedocs-upsell__preview {
                position: relative; border: 1px solid #e5e7eb; border-radius: 12px;
                background: #fff; overflow: hidden;
            }
            /* The still is an illustration, not a control surface. */
            .wedocs-upsell__mock { padding: 24px; pointer-events: none; user-select: none; }
            .wedocs-upsell__mock h2 { font-size: 15px; margin: 0 0 16px; color: #111827; }

            .wedocs-upsell__overlay {
                position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
                background: rgba(17, 24, 39, .5); opacity: 0; transition: opacity .15s ease;
            }
            .wedocs-upsell__preview:hover .wedocs-upsell__overlay,
            .wedocs-upsell__overlay:focus-within { opacity: 1; }
            /* Keyboard and touch users never hover, so the prompt has to be
               reachable without it. */
            @media (hover: none) {
                .wedocs-upsell__overlay { opacity: 1; }
            }

            .wedocs-upsell__popup {
                background: #fff; border-radius: 12px; padding: 28px 32px;
                max-width: 460px; box-shadow: 0 10px 30px rgba(0,0,0,.18);
            }
            .wedocs-upsell__popup h2 { margin: 0 0 16px; font-size: 17px; color: #111827; }
            .wedocs-upsell__popup ul { margin: 0 0 20px; padding: 0; list-style: none; }
            .wedocs-upsell__popup li {
                display: flex; align-items: flex-start; gap: 9px;
                margin: 0 0 10px; color: #374151; font-size: 13px; line-height: 1.5;
            }
            .wedocs-upsell__popup svg { flex-shrink: 0; margin-top: 2px; }
            .wedocs-upsell__cta {
                display: inline-block; background: #4f46e5; color: #fff; text-decoration: none;
                font-size: 14px; font-weight: 500; padding: 9px 20px; border-radius: 6px;
            }
            .wedocs-upsell__cta:hover, .wedocs-upsell__cta:focus { background: #4338ca; color: #fff; }

            /* Mock chrome, matching the real screens closely enough to be
               recognisable when the customer later sees them. */
            .wedocs-mock__bar { display: flex; align-items: center; justify-content: space-between; margin: 0 0 18px; }
            .wedocs-mock__title { font-size: 18px; font-weight: 600; color: #111827; margin: 0; }
            .wedocs-mock__add {
                display: inline-flex; align-items: center; justify-content: center;
                width: 34px; height: 34px; border-radius: 6px; background: #4f46e5; color: #fff;
            }
            .wedocs-mock__add .dashicons { font-size: 20px; width: 20px; height: 20px; }
            .wedocs-mock__row {
                display: flex; align-items: flex-start; gap: 4px;
                background: #fff; border: 1px solid #d1d5db; border-radius: 6px; margin-bottom: 12px;
            }
            .wedocs-mock__grip { color: #9ca3af; padding: 22px 16px; flex-shrink: 0; }
            .wedocs-mock__body { flex: 1; min-width: 0; padding: 18px 16px 18px 0; }
            .wedocs-mock__term { display: block; font-size: 15px; font-weight: 500; color: #000; }
            .wedocs-mock__meaning { margin: 4px 0 0; font-size: 13px; color: #6b7280; }
            .wedocs-mock__link { display: inline-block; margin-top: 4px; font-size: 13px; font-weight: 500; color: #4f46e5; }
            .wedocs-mock__actions { display: flex; align-items: center; gap: 12px; padding: 20px 16px; flex-shrink: 0; }
            .wedocs-mock__count { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: #6b7280; }
            .wedocs-mock__icon { color: #9ca3af; }
            .wedocs-mock__switch {
                display: inline-block; width: 40px; height: 22px; border-radius: 9999px;
                background: #d1d5db; position: relative;
            }
            .wedocs-mock__switch span {
                position: absolute; top: 2px; left: 2px; width: 18px; height: 18px;
                border-radius: 9999px; background: #fff; box-shadow: 0 1px 2px rgba(0,0,0,.2);
            }
            .wedocs-mock__switch.is-on { background: #4f46e5; }
            .wedocs-mock__switch.is-on span { left: 20px; }

            .wedocs-mock__reader { border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; background: #f9fafb; }
            .wedocs-mock__reader p { margin: 0; font-size: 14px; line-height: 1.7; color: #374151; }
            .wedocs-mock__hit { color: #4f46e5; font-weight: 500; text-decoration: underline; text-underline-offset: 3px; }
            .wedocs-mock__tooltip {
                margin-top: 14px; display: inline-block; max-width: 320px;
                background: #111827; border: 1px solid #111827; border-radius: 6px; padding: 12px 16px;
            }
            .wedocs-mock__tooltip span { display: block; color: #f9fafb; font-size: 12px; line-height: 1.6; }
            .wedocs-mock__tooltip-link { margin-top: 8px; color: #fbbf24 !important; font-weight: 500; }

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
