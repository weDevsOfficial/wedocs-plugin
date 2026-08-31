// DESCRIPTION: Shared UI surface the Pro plugin builds on.
//
// Pro is a separate bundle, so it cannot `import` from this repo's source, and
// it must not ship its own copies of these components either: two copies drift,
// and the admin screens slowly stop matching each other. Free is a hard
// dependency of Pro, so Free publishes the components on `window.wedocs` and
// Pro reads them from there.
//
// The registry ships as its own bundle (src/shared.js -> assets/build/shared.js)
// registered as `wedocs-shared-script`, which every weDocs admin bundle depends
// on. That is what guarantees the registry exists before any weDocs React tree
// renders, whichever order the admin screens enqueue their apps in.
//
// Both plugins resolve React through `@wordpress/element`, which wp-scripts
// externalises to `wp.element`, so components handed across the boundary run on
// the same React instance.
//
// Kept deliberately small. Everything listed here is bundled twice - once in
// shared.js, once in whichever app bundle imports it directly - so a component
// only earns a place when Pro has no equivalent of its own. That rules out the
// selects (Pro has ListboxSelect/MultiSelectBox), the colour pickers (Pro has
// ColorPicker/SketchPicker) and the toast helpers (Pro depends on sweetalert2
// directly): adding them costs ~290KB of duplicated bundle for no reuse.
//
// Adding to this file is a public API change for Pro: rename or drop an export
// and Pro breaks at runtime, with no build-time error to catch it. Bump
// REGISTRY_VERSION when the shape changes so a consumer can feature-detect.

import ConfirmDialog from './ConfirmDialog';
import ToggleSwitch from './ToggleSwitch';

export const REGISTRY_VERSION = 1;

export const components = {
    ConfirmDialog,
    ToggleSwitch,
};

/**
 * Publish the shared components on the global weDocs namespace.
 *
 * Merges into whatever is already there so load order never wipes an existing
 * registry, and so a later bundle can extend it.
 *
 * @return {Object} The weDocs global namespace, with the registry attached.
 */
export const registerSharedComponents = () => {
    window.wedocs = window.wedocs || {};

    window.wedocs.components = { ...window.wedocs.components, ...components };
    window.wedocs.registryVersion = REGISTRY_VERSION;

    return window.wedocs;
};

export { ConfirmDialog, ToggleSwitch };
