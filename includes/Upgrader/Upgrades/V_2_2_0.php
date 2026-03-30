<?php
// DESCRIPTION: Upgrade handler for version 2.2.0.
// Creates the wedocs_messages table for persistent message storage.

namespace WeDevs\WeDocs\Upgrader\Upgrades;

use WeDevs\WeDocs\Upgrader\Abstracts\UpgradeHandler;

/**
 * Upgrade handler for version 2.2.0.
 *
 * Creates the messages table for storing contact form and widget submissions.
 */
class V_2_2_0 extends UpgradeHandler {

    /**
     * Upgrade version.
     *
     * @since WEDOCS_SINCE
     *
     * @var string
     */
    protected $version = '2.2.0';

    /**
     * Upgrade necessary data in database.
     *
     * @since WEDOCS_SINCE
     *
     * @return void
     */
    public function handle_upgrade() {
        wedocs_create_messages_table();
        wedocs_add_messages_delete_after_column();
    }
}
