<?php

namespace WeDevs\WeDocs;

use Appsero\Client as Appsero_Client;

/**
 * Frontend Handler Class
 */
class Admin {

    /**
     * Initialize the class
     */
    public function __construct() {
        new Admin\Admin();
        new Admin\Settings();
        new Admin\Docs_List_Table();

        add_action( 'admin_init', [ $this, 'init_appsero' ], 1 );
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
