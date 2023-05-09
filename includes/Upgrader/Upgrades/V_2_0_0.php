<?php

namespace WeDevs\WeDocs\Upgrader\Upgrades;


use WeDevs\WeDocs\Upgrader\Abstracts\UpgradeHandler;
use WeDevs\WeDocs\Upgrader\Upgrades;

/**
 * Car handler class.
 */
class V_2_0_0 extends UpgradeHandler {

    public function check( Upgrades $update ) {
        if ( ! $update->upgrades['2.0.0'] ) {
            throw new Exception( 'This upgrader isn\'t available at this moment!!!' );
        }

        error_log( 'Throw version 2.0.0 upgraders code!!!' );

        $this->next( $update );
    }

//    /**
//     * Either handle a request or pass it to the next handler in the chain.
//     *
//     * @param string $request
//     *
//     * @return string|null
//     */
//    public function handle( string $request ): ?string {
//        if ( 'Car' === $request ) {
//            return "{$request}: I'm ready for start.";
//        }
//
//        return parent::handle( $request );
//    }
}
