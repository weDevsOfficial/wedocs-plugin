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

/**
 * PostCSS plugin: unwrap the `:where()` Tailwind 4 puts around `space-x-*`,
 * `space-y-*` and `divide-*`.
 *
 * Those utilities style a SIBLING of the element the class sits on, so Tailwind
 * 4 wraps the whole selector in `:where()` to drop it to zero specificity and
 * keep it easy to override:
 *
 *   :where(.wedocs-document .space-y-6 > :not(:last-child)) { … }
 *
 * That only holds up because Tailwind 4 puts preflight in `@layer base`, and a
 * layer loses to everything unlayered whatever its specificity. wp-admin is
 * unlayered and styles bare elements (`p, .wp-die-message { margin: 1em 0 }`,
 * `h1`-`h6`), so at zero specificity `space-y-*` loses to wp-admin on any `p`
 * or heading child - and to the preflight parity reset in
 * `src/assets/css/index.css`, which has to sit at (0,0,1) to beat wp-admin at
 * all.
 *
 * Tailwind 3 emitted these unwrapped, at the same (0,2,0) as every other scoped
 * utility, so they outranked both. Restoring that shape puts the cascade back:
 * wp-admin element rules < the preflight reset < utilities.
 *
 * Only a selector that is ENTIRELY one `:where()` around a compound with a
 * combinator is unwrapped, which is exactly the shape these utilities take.
 * The reset in `index.css` reads `:where(.wedocs-document, …):is(p, …)`, whose
 * `:where()` closes early, so it is left alone - as is every `:where()`
 * Tailwind and daisyUI use inside a larger selector.
 */
const unwrapScopedWhere = () => ( {
    postcssPlugin: 'wedocs-unwrap-scoped-where',
    Rule( rule ) {
        const parts = splitSelectors( rule.selector ).map( ( part ) => {
            if ( ! part.startsWith( ':where(' ) || ! part.endsWith( ')' ) ) {
                return part;
            }

            // Only unwrap when the opening `:where(` is what the trailing `)`
            // closes, so a selector that merely starts with one is untouched.
            let depth = 0;

            for ( let i = ':where('.length - 1; i < part.length; i++ ) {
                if ( part[ i ] === '(' ) {
                    depth++;
                } else if ( part[ i ] === ')' ) {
                    depth--;

                    if ( depth === 0 && i !== part.length - 1 ) {
                        return part;
                    }
                }
            }

            const inner = part.slice( ':where('.length, -1 );

            // These utilities always reach a sibling, so the wrapped selector
            // carries a combinator. A `:where()` holding a plain selector list
            // is somebody else's, and keeps the specificity it was given.
            return splitSelectors( inner ).length === 1 &&
                /[\s>+~]/.test( inner )
                ? inner
                : part;
        } );

        rule.selector = parts.join( ',' );
    },
} );
unwrapScopedWhere.postcss = true;

module.exports = {
    plugins: [
        require( '@tailwindcss/postcss' ),
        scopedRootMatch,
        unwrapScopedWhere,
    ]
}
