<?php

namespace WeDevs\WeDocs\Upgrader\Upgrades;


use WeDevs\WeDocs\Upgrader\Abstracts\UpgradeHandler;
use WeDevs\WeDocs\Upgrader\Upgrader;
use WeDevs\WeDocs\Upgrader\Upgrades\Upgrades;

/**
 * Car handler class.
 */
class V_2_0_0 extends UpgradeHandler {

    /**
     * Upgrade version.
     *
     * @since 2.0.0
     *
     * @var string
     */
    protected $version = '2.0.0';


    /**
     * Upgrade necessary data in database.
     *
     * @since 2.0.0
     *
     * @return string|null
     */
    public function handle_upgrade() {
        $value = get_option( 'wedocs_settings', [] );

        // Check if data already updated.
        if ( empty( $value['general'] ) ) {
            // Set default value if general data not found.
            $value['general'] = [
                'print'     => wedocs_get_general_settings( 'print', 'on' ),
                'email'     => wedocs_get_general_settings( 'email', 'on' ),
                'helpful'   => wedocs_get_general_settings( 'helpful', 'on' ),
                'comments'  => wedocs_get_general_settings( 'comments', 'on' ),
                'email_to'  => wedocs_get_general_settings( 'email_to' ),
                'docs_home' => wedocs_get_general_settings( 'docs_home' ),
            ];

            // Remove all unnecessary data.
            unset( $value['print'] );
            unset( $value['email'] );
            unset( $value['helpful'] );
            unset( $value['comments'] );
            unset( $value['email_to'] );
            unset( $value['docs_home'] );
        }

        // Update settings data with plugin version.
        update_option( 'wedocs_settings', $value );
    }
}
