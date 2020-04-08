<?php

namespace WeDevs\WeDocs\Admin;

use WeDevs_Settings_API;

/**
 * Settings Class.
 *
 * @since 1.1
 */
class Settings {

    /**
     * Constructor
     */
    public function __construct() {
        $this->settings_api = new WeDevs_Settings_API();

        add_action( 'admin_init', [$this, 'admin_init'] );
        add_action( 'admin_menu', [$this, 'admin_menu'] );
    }

    /**
     * Initialize the settings.
     *
     * @return void
     */
    public function admin_init() {
        //set the settings
        $this->settings_api->set_sections( $this->get_settings_sections() );
        $this->settings_api->set_fields( $this->get_settings_fields() );

        //initialize settings
        $this->settings_api->admin_init();
    }

    /**
     * Register the admin settings menu.
     *
     * @return void
     */
    public function admin_menu() {
        add_submenu_page( 'wedocs', __( 'weDocs Settings', 'wedocs' ), __( 'Settings', 'wedocs' ), 'manage_options', 'wedocs-settings', [ $this, 'plugin_page' ] );
    }

    /**
     * Plugin settings sections.
     *
     * @return array
     */
    public function get_settings_sections() {
        $sections = [
            [
                'id'    => 'wedocs_settings',
                'title' => __( 'Plugin Settings', 'wedocs' ),
            ],
        ];

        return $sections;
    }

    /**
     * Returns all the settings fields.
     *
     * @return array settings fields
     */
    public function get_settings_fields() {
        $settings_fields = [
            'wedocs_settings' => [
                [
                    'name'    => 'docs_home',
                    'label'   => __( 'Docs Home', 'wedocs' ),
                    'desc'    => sprintf( __( 'Home page for docs page. Preferably use <code>[wedocs]</code> <a href="%s" target="_blank">shortcode</a> or design your own.', 'wedocs' ), 'https://github.com/tareq1988/wedocs-plugin/wiki/Using-Shortcodes' ),
                    'type'    => 'select',
                    'options' => $this->get_pages(),
                ],
                [
                    'name'    => 'email',
                    'label'   => __( 'Email feedback', 'wedocs' ),
                    'desc'    => __( 'Enable Email feedback form', 'wedocs' ),
                    'type'    => 'checkbox',
                    'default' => 'on',
                ],
                [
                    'name'              => 'email_to',
                    'label'             => __( 'Email Address', 'wedocs' ),
                    'desc'              => __( 'The email address where the feedbacks should sent to', 'wedocs' ),
                    'type'              => 'text',
                    'default'           => get_option( 'admin_email' ),
                    'sanitize_callback' => 'sanitize_text_field',
                ],
                [
                    'name'    => 'helpful',
                    'label'   => __( 'Helpful feedback', 'wedocs' ),
                    'desc'    => __( 'Enable helpful feedback links', 'wedocs' ),
                    'type'    => 'checkbox',
                    'default' => 'on',
                ],
                [
                    'name'    => 'comments',
                    'label'   => __( 'Comments', 'wedocs' ),
                    'desc'    => __( 'Allow Comments', 'wedocs' ),
                    'type'    => 'checkbox',
                    'default' => 'off',
                ],
                [
                    'name'    => 'print',
                    'label'   => __( 'Print article', 'wedocs' ),
                    'desc'    => __( 'Enable article printing', 'wedocs' ),
                    'type'    => 'checkbox',
                    'default' => 'on',
                ],
            ],
        ];

        return $settings_fields;
    }

    /**
     * The plguin page handler.
     *
     * @return void
     */
    public function plugin_page() {
        echo '<div class="wrap">';

        $this->settings_api->show_navigation();
        $this->settings_api->show_forms();

        $this->scripts();

        echo '</div>';
    }

    /**
     * Get all the pages.
     *
     * @return array page names with key value pairs
     */
    public function get_pages() {
        $pages_options = [ '' => __( '&mdash; Select Page &mdash;', 'wedocs' ) ];
        $pages         = get_pages( [
            'numberposts' => -1,
        ] );

        if ( $pages ) {
            foreach ( $pages as $page ) {
                $pages_options[$page->ID] = $page->post_title;
            }
        }

        return $pages_options;
    }

    /**
     * JS snippets.
     *
     * @return void
     */
    public function scripts() {
        ?>
        <script type="text/javascript">
            jQuery(function($) {
                $('input[name="wedocs_settings[email]"]:checkbox').on( 'change', function() {

                    if ( $(this).is(':checked' ) ) {
                        $('tr.email_to').show();
                    } else {
                        $('tr.email_to').hide();
                    }

                }).change();
            });
        </script>
        <?php
    }
}
