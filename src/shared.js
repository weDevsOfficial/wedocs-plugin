// DESCRIPTION: Entry point for the shared component registry.
//
// Built to assets/build/shared.js and enqueued as `wedocs-shared-script`, which
// every other weDocs admin bundle depends on. Keeping the registry in its own
// entry (instead of hanging it off src/index.js) means Pro can declare the same
// dependency and be guaranteed the registry exists before its own code runs,
// whichever order the admin screens enqueue their apps in.

import { registerSharedComponents } from './components/shared';

registerSharedComponents();
