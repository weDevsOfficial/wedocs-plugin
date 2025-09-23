/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'wedocs-',
  important: '.wedocs-document',
  content: [ './templates/*.php', './templates/**/*.php', './src/**/*' ],
  theme: {
    extend: {},
  },
  plugins: [ require( 'daisyui' ), require( '@tailwindcss/forms' ) ],
};
