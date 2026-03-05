const rootClass = '.wedocs-document';
const escapedRoot = rootClass.replace( /[.*+?^${}()|[\]\\]/g, '\\$&' );
const rootDescendantPattern = new RegExp(
    escapedRoot + '\\s+:is\\(', 'g'
);

/**
 * PostCSS plugin: For each Tailwind rule scoped as `.wedocs-document :is(.utility)`,
 * add a matching selector `:is(.wedocs-document.utility)` so utilities also apply
 * when the element itself is the root `.wedocs-document` container.
 */
const scopedRootMatch = () => ( {
    postcssPlugin: 'wedocs-important-root-match',
    Rule( rule ) {
        if ( ! rootDescendantPattern.test( rule.selector ) ) {
            return;
        }
        rootDescendantPattern.lastIndex = 0;

        const rootSelector = rule.selector.replace(
            rootDescendantPattern,
            ':is(' + rootClass
        );

        if ( rootSelector !== rule.selector ) {
            const existingSelectors = new Set(
                rule.selector.split( ',' ).map( ( selector ) => selector.trim() )
            );
            const selectorsToAdd = rootSelector
                .split( ',' )
                .map( ( selector ) => selector.trim() )
                .filter( ( selector ) => selector.length && ! existingSelectors.has( selector ) );

            if ( selectorsToAdd.length ) {
                rule.selector = rule.selector + ', ' + selectorsToAdd.join( ', ' );
            }
        }
    },
} );
scopedRootMatch.postcss = true;

module.exports = {
    plugins: [
        require( 'tailwindcss' ),
        require( 'autoprefixer' ),
        scopedRootMatch,
    ]
}
