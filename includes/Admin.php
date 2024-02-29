<?php

namespace WeDevs\WeDocs;

use \WeDevs\WeDocs\Appsero\Client as Appsero_Client;

/**
 * Frontend Handler Class
 */
class Admin {

    /**
     * Initialize the class
     */
    public function __construct() {
        new Admin\Admin();
        new Admin\Migrate();
        new Admin\Docs_List_Table();

        add_action( 'admin_init', array( $this, 'init_admin_actions' ), 5 );
    }

    /**
     * Admin initialization hook.
     *
     * @since 2.0.0
     *
     * @return void
     */
    public function init_admin_actions() {
        $this->handle_plugin_activate_redirection();
        $this->init_appsero();
    }

    /**
     * Handle redirection after activate wedocs.
     *
     * @since 2.0.0
     *
     * @return void
     */
    public function handle_plugin_activate_redirection() {
        // Check if the plugin is being activated for the first time.
        if ( get_option( 'wedocs_activation_redirect', false ) ) {
            // Remove the redirect option to prevent further redirections.
            delete_option('wedocs_activation_redirect');

            // Redirect to the weDocs dashboard & exit.
            wp_safe_redirect( admin_url( 'admin.php?page=wedocs#/' ) );
            exit;
        }
    }

    /**
     * Initialize the appsero tracker
     *
     * @since 1.6.0
     *
     * @return void
     */
    public function init_appsero() {
        $client = new Appsero_Client( 'aa0ffba5-b889-40af-a34c-41fc8f707faa', 'weDocs', WEDOCS_FILE );
        $client->insights()->init();
    }
}
