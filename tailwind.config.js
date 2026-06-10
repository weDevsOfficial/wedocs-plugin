/** @type {import('tailwindcss').Config} */
import {
  scopedPreflightStyles,
  isolateInsideOfContainer,
} from 'tailwindcss-scoped-preflight';

const rootClass = '.wedocs-document'; //We will use this class to scope the styles.

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
  // Stop daisyui injecting its GLOBAL base ([data-theme]{background-color;color},
  // html, :root resets) into every block stylesheet — that base leaks out of the
  // blocks and paints the block editor canvas dark. Theme vars + components stay.
  daisyui: {
    base: false,
  },
  plugins: [
    scopedPreflightStyles( {
      isolationStrategy: isolateInsideOfContainer( rootClass, {} ),
    } ),
    require( 'daisyui' ),
    require( '@tailwindcss/forms' )
  ],
};
