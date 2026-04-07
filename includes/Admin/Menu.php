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

        $all_submenus = apply_filters( 'wedocs_submenu', $all_submenus );
        if ( empty( $submenu['wedocs'] ) ) {
            $submenu['wedocs'] = array(); // phpcs:ignore.
        }

        array_push(
            $submenu['wedocs'],
            ...$all_submenus
        );
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
