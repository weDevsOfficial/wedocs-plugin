<?php

namespace WeDevs\WeDocs\Upgrader;

use WeDevs\WeDocs\Upgrader\Upgrades\Upgrades;

class Upgrader {

    /**
     * Check upgrader version.
     *
     * @var bool $need_upgrade
     *
     * @since 2.0.2
     */
    protected $need_upgrade = false;

    /**
     * Upgrader class constructor.
     */
    public function __construct() {
        add_action( 'wedocs_upgrader_runner', array( $this, 'do_upgrade' ) );
    }

    /**
     * Calculate upgrader version for run it.
     *
     * @since 2.0.2
     *
     * @return $this
     */
    public function calculate() {
        $upgrades          = new Upgrades();
        $installed_version = $upgrades->get_wedocs_installed_version();
        $upgrader_version  = array_key_last( $upgrades->class_list );

        $this->need_upgrade = version_compare( $upgrader_version, $installed_version, '>' );

        return $this;
    }

    /**
     * Check if upgrader run is required.
     *
     * @since 2.0.2
     *
     * @return bool
     */
    public function need_upgrade(): bool {
        return $this->need_upgrade;
    }

    /**
     * Upgrade necessary data.
     *
     * @since 2.0.2
     *
     * @return void
     */
    public function do_upgrade() {
        $upgrades   = new Upgrades();
        $class_list = ( $upgrades )->class_list;
        $class_list = array_reverse( $class_list );

        $upgrade_initiator = null;
        foreach ( $class_list as $class_name ) {
            $upgrade = new $class_name();
            if ( ! is_null( $upgrade_initiator ) ) {
                $upgrade->setUpgrade( $upgrade_initiator );
            }

            $upgrade_initiator = $upgrade;
        }

        $upgrade_initiator->check();
        update_option( 'wedocs_upgrader_runner', 'done' );
    }
}
