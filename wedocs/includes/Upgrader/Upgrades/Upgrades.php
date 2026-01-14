<?php

namespace WeDevs\WeDocs\Upgrader\Upgrades;

class Upgrades {

    /**
     * Wedocs upgrader list.
     *
     * @var array $class_list
     *
     * @since 2.0.2
     */
    public $class_list = array( '2.0.2' => V_2_0_2::class );

    /**
     * Get wedocs installed version number.
     *
     * @since 2.0.2
     *
     * @return string
     */
    public function get_wedocs_installed_version() {
        return get_option( 'wedocs_version', null );
    }
}
