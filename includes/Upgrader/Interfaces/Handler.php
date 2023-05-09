<?php

namespace WeDevs\WeDocs\Upgrader\Interfaces;

/**
 * Upgrades Handler interface.
 */
interface UpgradesHandler {
    // Set next handler for building the chain of handlers.
    public function setNext( Handler $handler ): Handler;

    // Use handle method for executing a request.
    public function handle( string $request ): ?string;
}
