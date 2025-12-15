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
  plugins: [
    scopedPreflightStyles( {
      isolationStrategy: isolateInsideOfContainer( rootClass, {} ),
    } ),
    require( 'daisyui' ),
    require( '@tailwindcss/forms' )
  ],
};
