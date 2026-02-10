<?php

namespace WeDevs\WeDocs\Upgrader\Abstracts;

use WeDevs\WeDocs\Upgrader\Upgrades\Upgrades;

/**
 * The AbstractHandler class.
 */
abstract class UpgradeHandler {

    /**
     * @var UpgradeHandler
     *
     * @since 2.0.0
     */
    protected $upgrade;

    /**
     * Set current upgrade object.
     *
     * @param UpgradeHandler $upgrade
     *
     * @return UpgradeHandler
     */
    public function setUpgrade( UpgradeHandler $upgrade ) {
        $this->upgrade = $upgrade;

        return $this;
    }

    /**
     * Check upgrader version & passed next upgrader class.
     *
     * @since 2.0.0
     *
     * @return mixed|void
     */
    public function check() {
        $upgrades       = new Upgrades();
        $wedocs_version = $upgrades->get_wedocs_installed_version();
        $need_upgrade   = version_compare( $wedocs_version, $this->version, '<' );

        if ( $need_upgrade ) {
            $this->handle_upgrade();
            update_option( 'wedocs_version', $this->version );
        }

        // Always call next() to continue the upgrade chain,
        // even if this upgrade didn't need to run
        $this->next();
    }

    /**
     * Check upgrade handler & pass next handle.
     *
     * @since 2.0.0
     *
     * @return void
     */
    public function next() {
        if ( $this->upgrade ) {
            $this->upgrade->check();
        }
    }
}


