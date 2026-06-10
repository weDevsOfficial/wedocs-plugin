/** @type {import('tailwindcss').Config} */
import {
  scopedPreflightStyles,
  isolateInsideOfContainer,
} from 'tailwindcss-scoped-preflight';

const rootClass = '.wedocs-document'; //We will use this class to scope the styles.

module.exports = {
  important: rootClass,
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
