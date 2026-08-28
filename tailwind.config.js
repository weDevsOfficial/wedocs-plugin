/** @type {import('tailwindcss').Config} */

const rootClass = '.wedocs-document'; //We will use this class to scope the styles.

// Tailwind 4 is CSS-first: preflight scoping, daisyUI and the forms plugin are
// now declared with `@plugin` in the stylesheets (see src/assets/css/index.css).
// This file is still loaded through `@config` for the settings that have no CSS
// equivalent: the `important` scope, the class-based dark mode and the content
// globs.
module.exports = {
  important: rootClass,
  // Gate `dark:` variants behind a `.dark` class, NOT the OS preference.
  // Default ('media') makes every `dark:` utility fire under
  // `@media (prefers-color-scheme: dark)`, so a dark-mode OS turns weDocs
  // admin/modals dark. weDocs never sets a `.dark` toggle, so 'class' keeps
  // the UI light regardless of the OS theme.
  darkMode: 'class',
  content: [ './templates/*.php', './templates/**/*.php', './src/**/*' ],
  theme: {
    extend: {},
  },
};
