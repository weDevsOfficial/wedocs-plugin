/** @type {import('tailwindcss').Config} */

// Config for the four block stylesheets that carry Tailwind utilities
// (Breadcrumb, Sidebar, DocNavigation, QuickSearch). Loaded through `@config`
// from each of them, exactly like tailwind.config.js is for the admin app.
//
// Same `important` scope and class-based dark mode as tailwind.config.js. The
// difference is `content`: the block stylesheets are meant to scan the block
// sources and the front-end templates only, never the admin app under src/, so
// a block ships the utilities the blocks use instead of every class the admin
// app uses. Tailwind 4 still auto-detects sources project-wide on top of this
// list, so each stylesheet also carries `@source not` exclusions for the admin
// app; the globs here keep the JS config truthful for tooling.
const rootClass = '.wedocs-document';

module.exports = {
  important: rootClass,
  darkMode: 'class',
  content: [
    './src/blocks/**/*.{js,jsx,php,html}',
    './templates/block-templates/**/*.html',
    './templates/*.php',
    './templates/modals/**/*.php',
  ],
  theme: {
    extend: {},
  },
};
