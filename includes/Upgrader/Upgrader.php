<?php

namespace WeDevs\WeDocs\Upgrader;

class Upgrader {

    public function __construct() {
        add_action( 'as_wedocs_upgrader_runner', array( $this, 'process_upgrade' ) );
    }

    public function process_upgrade() {
        error_log( 'we could ran the upgrader at' );
    }
}
