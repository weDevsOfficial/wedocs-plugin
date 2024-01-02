<?php

namespace WeDevs\WeDocs\Upgrader\Upgrades;


use WeDevs\WeDocs\Upgrader\Abstracts\UpgradeHandler;

/**
 * Car handler class.
 */
class V_2_0_2 extends UpgradeHandler {

    /**
     * Upgrade version.
     *
     * @since 2.0.2
     *
     * @var string
     */
    protected $version = '2.0.2';

    /**
     * Upgrade necessary data in database.
     *
     * @since 2.0.2
     *
     * @return void
     */
    public function handle_upgrade() {
        $this->clean_beta_notice();
        $this->update_settings_db();
        $this->add_documentation_handling_capabilities();
    }

    /**
     * Remove beta notice data.
     *
     * @since 2.0.2
     *
     * @return void
     */
    public function clean_beta_notice() {
        $user_id         = get_current_user_id();
        $has_beta_notice = get_user_meta( $user_id, 'wedocs_hide_beta_notice', true );

        if ( ! empty( $has_beta_notice ) ) {
            delete_user_meta( $user_id, 'wedocs_hide_beta_notice', 1 );
        }
    }

    /**
     * Update weDocs settings db.
     *
     * @since 2.0.2
     *
     * @return void
     */
    private function update_settings_db() {
        $value = get_option( 'wedocs_settings', [] );

        // Check if data already updated.
        if ( empty( $value['general'] ) ) {
            // Set default value if general data not found.
            $value['general'] = [
                'print'     => wedocs_get_general_settings( 'print', 'on' ),
                'email'     => wedocs_get_general_settings( 'email', 'on' ),
                'helpful'   => wedocs_get_general_settings( 'helpful', 'on' ),
                'comments'  => wedocs_get_general_settings( 'comments', 'off' ),
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

    /**
     * Add weDocs documentation handling capabilities for users.
     *
     * @since 2.0.2
     *
     * @return void
     */
    private function add_documentation_handling_capabilities() {
        global $wp_roles;

        if ( class_exists( 'WP_Roles' ) && ! isset( $wp_roles ) ) {
            $wp_roles = new \WP_Roles(); // @codingStandardsIgnoreLine
        }

        $roles        = $wp_roles->get_names();
        $capabilities = array(
            'edit_post',
            'edit_docs',
            'publish_docs',
            'edit_others_docs',
            'read_private_docs',
            'edit_private_docs',
            'edit_published_docs'
        );

        // Push documentation handling access to users.
        foreach ( $capabilities as $capability ) {
            foreach ( $roles as $role_key => $role ) {
                $wp_roles->add_cap( $role_key, $capability );
            }
        }
    }
}
