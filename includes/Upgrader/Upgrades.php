<?php

namespace WeDevs\WeDocs\Upgrader;

class Upgrades {

    /**
     * Wedocs upgraders
     *
     * @since 2.0.0
     *
     * @var array
     */
    public $upgrades = [
        '2.0.0' => Upgrades\V_2_0_0::class,
        '2.0.1' => Upgrades\V_2_0_1::class,
        '2.0.2' => Upgrades\V_2_0_2::class,
        '2.1.0' => Upgrades\V_2_1_0::class,
    ];

    /**
     * Get wedocs installed version number.
     *
     * @since 2.0.0
     *
     * @return string
     */
    public function get_db_installed_version() {
        return get_option( 'wedocs_version', null );
    }

    /**
     * Get all upgrades.
     *
     * @return array|string[]
     */
    public function get_upgrades() {
        return $this->upgrades;
    }
}
