<?php

namespace WeDevs\WeDocs\Admin;

/**
 * WeDocs Admin Menu class.
 *
 * We are setting admin page and submenu from here.
 *
 * @since 2.0.0
 */
class Menu {

    /**
     * Menu Capability
     *
     * @since 2.0.0
     *
     * @var string
     */
    protected $capability;

    /**
     * WeDocs Admin menu Constructor.
     *
     * @since 2.0.0
     */
    public function __construct() {
        $this->capability = wedocs_get_publish_cap();

        add_action( 'admin_menu', array( $this, 'add_admin_menu' ) );
        add_action( 'admin_menu', array( $this, 'add_admin_submenu' ) );
        add_action( 'admin_head', array( $this, 'cleanup_admin_notices' ), 1 );
        add_action( 'admin_head', array( $this, 'premium_menu_styles' ) );
    }

    /**
     * Add menu to Admin Dashboard.
     *
     * @since 2.0.0
     *
     * @return void
     */
    public function add_admin_menu() {
        $parent_slug = 'wedocs';
        add_menu_page(
            __( 'weDocs', 'wedocs' ),
            __( 'weDocs', 'wedocs' ),
            $this->capability,
            $parent_slug,
            array( $this, 'display_wedocs' ),
            'dashicons-media-document',
            $this->get_menu_position()
        );

        $faq = add_submenu_page( $parent_slug, __( 'FAQ', 'wedocs' ), __( 'FAQ', 'wedocs' ), $this->capability, 'wedocs-faq', array( $this, 'display_faq' ) );

        add_action( 'load-' . $faq, [ $this, 'faq_menu_action' ] );
    }

    /**
     * Fire the FAQ page load hook.
     *
     * @since WEDOCS_SINCE
     *
     * @return void
     */
    public function faq_menu_action() {
        /**
         * Backdoor for calling the menu hook.
         * This hook won't get translated even the site language is changed
         */
        do_action( 'wedocs_load_faq_page' );
    }

    /**
     * Display FAQ page.
     *
     * @since WEDOCS_SINCE
     *
     * @return void
     */
    public function display_faq() {
        wedocs_get_template_part( 'admin/faq' );
    }

    /**
     * Add submenu to Admin Dashboard.
     *
     * @since 2.0.0
     *
     * @return void
     */
    public function add_admin_submenu() {
        global $submenu;

        if ( ! ( current_user_can( 'manage_options' ) || current_user_can( wedocs_get_publish_cap() ) ) )  {
            return;
        }

        $base         = admin_url( 'admin.php?page=wedocs' );
        $all_submenus = array(
            array(
                __( 'Dashboard', 'wedocs' ),
                $this->capability,
                $base . '#/dashboard',
            ),
            array(
                __( 'Docs', 'wedocs' ),
                $this->capability,
                $base . '#/',
            ),
            array(
                __( 'Tags', 'wedocs' ),
                $this->capability,
                'edit-tags.php?taxonomy=doc_tag&post_type=docs',
            ),
            array(
                __( 'FAQ', 'wedocs' ),
                $this->capability,
                'wedocs-faq',
                __( 'FAQ', 'wedocs' ),
            ),
            array(
                __( 'Settings', 'wedocs' ),
                apply_filters( 'wedocs_settings_management_capabilities', $this->capability ),
                $base . '#/settings',
            ),
            array(
                __( 'Migration', 'wedocs' ),
                apply_filters( 'wedocs_migration_management_capabilities', 'manage_options' ),
                $base . '#/migrate',
            ),
        );

        if ( ! wedocs_is_pro_active() ) {
            $all_submenus[] = array(
                $this->get_premium_menu_title(),
                $this->capability,
                $base . '#/premium',
            );
        }

        $all_submenus = apply_filters( 'wedocs_submenu', $all_submenus );

        // Reset submenu to remove the auto-generated parent duplicate
        // that WordPress creates when add_submenu_page() is used.
        $submenu['wedocs'] = array(); // phpcs:ignore.

        array_push(
            $submenu['wedocs'],
            ...$all_submenus
        );
    }

    /**
     * Build the Premium submenu title with its crown icon.
     *
     * WordPress prints submenu titles unescaped, so markup is allowed here. The
     * crown is inlined rather than enqueued so it costs no extra request, and the
     * glow itself is handled in CSS — see premium_menu_styles().
     *
     * @since 2.4.0
     *
     * @return string
     */
    public function get_premium_menu_title() {
        $crown = '<svg class="wedocs-premium-menu__crown" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 16L3 6l5.5 4L12 4l3.5 6L21 6l-2 10H5zm14 3a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-1h14v1z"/></svg>';

        return '<span class="wedocs-premium-menu">' . esc_html__( 'Premium', 'wedocs' ) . $crown . '</span>';
    }

    /**
     * Print the glow styles for the Premium submenu item.
     *
     * Lives in admin_head because the admin menu renders on every screen, while
     * the plugin stylesheet is only enqueued on weDocs pages.
     *
     * @since 2.4.0
     *
     * @return void
     */
    public function premium_menu_styles() {
        if ( wedocs_is_pro_active() ) {
            return;
        }
        ?>
        <style id="wedocs-premium-menu-style">
            #adminmenu .wedocs-premium-menu {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                font-weight: 600;
                color: #ffb900;
            }

            #adminmenu .wedocs-premium-menu__crown {
                width: 14px;
                height: 14px;
                flex-shrink: 0;
                fill: currentColor;
                animation: wedocs-premium-glow 2.4s ease-in-out infinite;
            }

            #adminmenu a:hover .wedocs-premium-menu,
            #adminmenu a:focus .wedocs-premium-menu,
            #adminmenu .current .wedocs-premium-menu {
                color: #ffc83d;
            }

            @keyframes wedocs-premium-glow {
                0%, 100% {
                    filter: drop-shadow( 0 0 0 rgba( 255, 185, 0, 0 ) );
                    transform: scale( 1 );
                }

                50% {
                    filter: drop-shadow( 0 0 5px rgba( 255, 185, 0, .9 ) );
                    transform: scale( 1.12 );
                }
            }

            @media ( prefers-reduced-motion: reduce ) {
                #adminmenu .wedocs-premium-menu__crown {
                    animation: none;
                    filter: drop-shadow( 0 0 3px rgba( 255, 185, 0, .7 ) );
                }
            }
        </style>
        <?php
    }

    /**
     * Display documentations dashboard.
     *
     * @since 2.0.0
     *
     * @return void
     */
    public function display_wedocs() {
        wedocs_get_template_part( 'admin/docs' );
    }

    /**
     * Get the admin menu position.
     *
     * @since 2.0.0
     *
     * @return int the position of the menu
     */
    public function get_menu_position() {
        return apply_filters( 'wedocs_menu_position', 48 );
    }

    /**
     * Cleans admin notice.
     *
     * @since 2.0.0
     *
     * @return void
     */
    public function cleanup_admin_notices() {
        if ( 'toplevel_page_wedocs' === get_current_screen()->id ) {
            remove_all_actions( 'admin_notices' );
        }
    }
}
