<?php

namespace WeDevs\WeDocs\Upgrader\Upgrades;

use WeDevs\WeDocs\Upgrader\Abstracts\UpgradeHandler;

/**
 * Upgrade handler for version 2.1.17.
 *
 * Security fix: Remove documentation editing capabilities from unauthorized roles.
 */
class V_2_1_17 extends UpgradeHandler {

    /**
     * Upgrade version.
     *
     * @since 2.1.17
     *
     * @var string
     */
    protected $version = '2.1.17';

    /**
     * Upgrade necessary data in database.
     *
     * @since 2.1.17
     *
     * @return void
     */
    public function handle_upgrade() {
        $this->fix_documentation_capabilities();
    }

    /**
     * Fix documentation handling capabilities.
     *
     * Removes editing capabilities from unauthorized roles (Subscriber, Contributor, Author)
     * that were incorrectly granted in previous versions. Only Administrator and Editor
     * should have documentation editing capabilities.
     *
     * @since 2.1.17
     *
     * @return void
     */
    private function fix_documentation_capabilities() {
        wedocs_user_documentation_handling_capabilities();
    }
}
