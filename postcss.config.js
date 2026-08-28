const rootClass = '.wedocs-document';

/**
 * Split a selector list on top-level commas only. A plain `String.split(',')`
 * corrupts selectors that carry commas inside `:is()`, `:not()`, `:where()` or
 * an attribute value.
 *
 * @param {string} selector Full selector list.
 *
 * @return {string[]} Individual selectors, trimmed.
 */
const splitSelectors = ( selector ) => {
    const out = [];
    let depth = 0;
    let current = '';

    for ( const char of selector ) {
        if ( char === '(' || char === '[' ) {
            depth++;
        } else if ( char === ')' || char === ']' ) {
            depth--;
        }

        if ( char === ',' && depth === 0 ) {
            out.push( current.trim() );
            current = '';
            continue;
        }

        current += char;
    }

    if ( current.trim() ) {
        out.push( current.trim() );
    }

    return out;
};

/**
 * PostCSS plugin: Tailwind's `important: '.wedocs-document'` scope emits every
 * utility as a DESCENDANT of the root container (`.wedocs-document .flex`), so a
 * utility never applies to the container element itself. This adds a matching
 * self-scoped selector (`.wedocs-document.flex`) alongside it.
 *
 * Tailwind 3 wrapped these in `:is()` (`.wedocs-document :is(.flex)`); Tailwind 4
 * emits the plain descendant form, so the pattern this matches changed with the
 * v4 upgrade. Keep both shapes handled in case a rule still carries `:is()`.
 */
const scopedRootMatch = () => ( {
    postcssPlugin: 'wedocs-important-root-match',
    Rule( rule ) {
        const parts = splitSelectors( rule.selector );
        const extra = [];

        parts.forEach( ( part ) => {
            // `.wedocs-document :is(x)` -> `:is(.wedocs-document x)` (v3 shape)
            if ( part.startsWith( rootClass + ' :is(' ) ) {
                extra.push( part.replace( rootClass + ' :is(', ':is(' + rootClass ) );
                return;
            }
            // `.wedocs-document .x ...` -> `.wedocs-document.x ...` (v4 shape)
            if ( part.startsWith( rootClass + ' ' ) ) {
                const rest = part.slice( rootClass.length ).trimStart();

                // The next compound has to be attachable (class, attribute or
                // pseudo) — `.wedocs-document div` must stay a descendant.
                if ( ! /^[.:[]/.test( rest ) ) {
                    return;
                }

                // Only STRUCTURAL utilities are folded in: the ones whose own
                // selector reaches past the element it is applied to, such as
                // `group-hover:*`, `space-x-*` and `divide-*`. Those are the
                // rules Tailwind 3 emitted as `.wedocs-document :is(…)`, and the
                // only ones this plugin ever rewrote. A plain single-compound
                // utility like `.flex` deliberately gets nothing, so the
                // container does not start picking up utilities it never had.
                const firstCompound = rest.split( /[\s>+~]/ )[ 0 ];
                if ( firstCompound === rest ) {
                    return;
                }

                extra.push( rootClass + rest );
            }
        } );

        if ( extra.length ) {
            rule.selector = parts.concat( extra ).join( ',' );
        }
    },
} );
scopedRootMatch.postcss = true;

module.exports = {
    plugins: [
        require( '@tailwindcss/postcss' ),
        scopedRootMatch,
    ]
}
