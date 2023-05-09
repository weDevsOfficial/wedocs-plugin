<?php

namespace WeDevs\WeDocs\Upgrader\Upgrades;


use WeDevs\WeDocs\Upgrader\Abstracts\UpgradeHandler;
use WeDevs\WeDocs\Upgrader\Upgrades;

/**
 * Car handler class.
 */
class V_2_0_1 extends UpgradeHandler {

    public function check( Upgrades $update ) {
        if ( ! $update->upgrades['2.0.1'] ) {
            throw new Exception( 'This upgrader isn\'t available at this moment!!!' );
        }

        error_log( 'Throw version 2.0.1 upgraders code!!!' );

        $this->next( $update );
    }
}
