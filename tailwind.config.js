/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [ './templates/*.php', './templates/**/*.php', './src/**/*' ],
    theme: {
        extend: {},
    },
    plugins: [ require( 'daisyui' ), require( '@tailwindcss/forms' ) ],
}
