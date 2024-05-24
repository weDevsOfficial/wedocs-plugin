/** @type {import('tailwindcss').Config} */
module.exports = {
  important: '.wedocs-document',
  content: [ './templates/*.php', './templates/**/*.php', './src/**/*' ],
  theme: {
    extend: {},
  },
  plugins: [ require( 'daisyui' ), require( '@tailwindcss/forms' ) ],
};
