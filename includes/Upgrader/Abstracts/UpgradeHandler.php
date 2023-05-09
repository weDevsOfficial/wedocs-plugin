<?php

namespace WeDevs\WeDocs\Upgrader\Abstracts;

use WeDevs\WeDocs\Upgrader\Upgrades;

/**
 * The AbstractHandler class.
 */
abstract class UpgradeHandler {

    /**
     * @var Upgrader
     */
    protected $upgrade;

    /**
     * Check upgrades handler for building the chain of handlers.
     *
     * @param Upgrades $update
     *
     * @return mixed
     */
    public abstract function check( Upgrades $update );

    /**
     * Set current upgrade object.
     *
     * @param UpgradeHandler $upgrade
     *
     * @return void
     */
    public function setUpgrade( UpgradeHandler $upgrade ) {
        $this->upgrade = $upgrade;

        return $upgrade;
    }

    /**
     * Check upgrade handler & pass next handle.
     *
     * @param Upgrades $update
     *
     * @return void
     */
    public function next( Upgrades $update ) {
        if ( $this->upgrade ) {
            $this->upgrade->check( $update );
        }
    }
}


