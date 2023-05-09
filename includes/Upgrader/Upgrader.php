<?php

namespace WeDevs\WeDocs\Upgrader;

use WeDevs\WeDocs\Upgrader\Upgrades\V_2_0_0;
use WeDevs\WeDocs\Upgrader\Upgrades\V_2_0_1;
use WeDevs\WeDocs\Upgrader\Upgrades\V_2_0_2;
use WeDevs\WeDocs\Upgrader\Upgrades\V_2_1_0;

class Upgrader {

    protected $need_upgrade = false;

    public function __construct() {
        add_action( 'wedocs_upgrader_runner', array( $this, 'do_upgrade' ) );
    }

    public function calculate() {
        $wedocs_version  = get_option( 'wedocs_version' );
        empty( $upgrade_version ) ? update_option( 'wedocs_upgrade_version', '2.0.0' ) : '';
        $upgrade_version = get_option( 'wedocs_upgrade_version' );

        $this->need_upgrade = $upgrade_version > $wedocs_version;

        return $this;
    }

    public function need_upgrade(): bool {
        return $this->need_upgrade;
    }

    public function do_upgrade() {
        $v_2_0_0 = new V_2_0_0();
        $v_2_0_1 = new V_2_0_1();
        $v_2_0_2 = new V_2_0_2();
        $v_2_1_0 = new V_2_1_0();

        $v_2_0_0->setUpgrade( $v_2_0_1 )->setUpgrade( $v_2_0_2 )->setUpgrade( $v_2_1_0 );

        $v_2_0_0->check(  );
    }

//    public function do_upgrade() {
//        $value           = get_option( 'wedocs_settings', [] );
//        $updated_version = get_option( 'wedocs_upgrade_version' );
//
//        // Check if data already updated.
//        if ( empty( $value['general'] ) ) {
//            // Set default value if general data not found.
//            $value['general'] = [
//                'print'     => wedocs_get_general_settings( 'print', 'on' ),
//                'email'     => wedocs_get_general_settings( 'email', 'on' ),
//                'helpful'   => wedocs_get_general_settings( 'helpful', 'on' ),
//                'comments'  => wedocs_get_general_settings( 'comments', 'on' ),
//                'email_to'  => wedocs_get_general_settings( 'email_to' ),
//                'docs_home' => wedocs_get_general_settings( 'docs_home' ),
//            ];
//
//            // Remove all unnecessary data.
//            unset( $value['print'] );
//            unset( $value['email'] );
//            unset( $value['helpful'] );
//            unset( $value['comments'] );
//            unset( $value['email_to'] );
//            unset( $value['docs_home'] );
//        }
//
//        // Update settings data with plugin version.
//        update_option( 'wedocs_settings', $value );
//        update_option( 'wedocs_version', $updated_version );
//    }
}
