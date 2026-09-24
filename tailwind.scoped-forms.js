/**
 * `@tailwindcss/forms`, scoped to a container.
 *
 * The forms plugin writes its reset as bare element rules
 * (`input:where([type='checkbox']) { appearance: none; ... }`). Neither the
 * `important` scope nor `tailwindcss-scoped-preflight` touches plugin base
 * rules, so wherever a weDocs stylesheet loaded, every checkbox, radio, select
 * and text field on the page was restyled, the theme's and other plugins'
 * included.
 *
 * This runs the forms plugin unchanged and rewrites each selector it hands to
 * `addBase` so it only matches inside the container, the same
 * `:where(<selector>, <selector> *)` form the scoped preflight uses. `:where()`
 * adds no specificity, so the rules keep the weight they had before.
 *
 * Usage, in a Tailwind 4 stylesheet:
 *
 *     @plugin "../../tailwind.scoped-forms.js" {
 *       selector: .wedocs-document;
 *     }
 *
 * `selector` takes a comma-separated list when the markup lives in more than
 * one container.
 */
const plugin = require( 'tailwindcss/plugin' );
const forms = require( '@tailwindcss/forms' );

// Split on commas that are not inside parentheses or brackets.
const splitSelectorList = ( list ) => {
    const parts = [];
    let depth = 0;
    let current = '';

    for ( const char of list ) {
        if ( '(' === char || '[' === char ) {
            depth++;
        } else if ( ')' === char || ']' === char ) {
            depth--;
        }

        if ( ',' === char && 0 === depth ) {
            parts.push( current.trim() );
            current = '';
        } else {
            current += char;
        }
    }

    parts.push( current.trim() );

    return parts.filter( Boolean );
};

// Append the scope to one selector, ahead of any pseudo-element, which has to
// stay last.
const scopeSelector = ( selector, scope ) => {
    const pseudo = selector.indexOf( '::' );

    if ( -1 === pseudo ) {
        return `${ selector }${ scope }`;
    }

    return `${ selector.slice( 0, pseudo ) }${ scope }${ selector.slice( pseudo ) }`;
};

const scopeRules = ( rules, scope ) => {
    const scoped = {};

    for ( const [ key, value ] of Object.entries( rules ) ) {
        if ( key.startsWith( '@' ) ) {
            // @media / @supports: scope the rules inside, keep the at-rule.
            scoped[ key ] = scopeRules( value, scope );
        } else if ( value && 'object' === typeof value && ! Array.isArray( value ) ) {
            const selector = splitSelectorList( key )
                .map( ( part ) => scopeSelector( part, scope ) )
                .join( ',' );

            scoped[ selector ] = value;
        } else {
            // A declaration at this level; nothing to scope.
            scoped[ key ] = value;
        }
    }

    return scoped;
};

module.exports = plugin.withOptions( ( options = {} ) => ( api ) => {
    // One container or a comma-separated list of them.
    const containers = splitSelectorList( String( options.selector || '.wedocs-document' ) );
    const scope = `:where(${ containers.map( ( c ) => `${ c }, ${ c } *` ).join( ', ' ) })`;

    forms( { strategy: options.strategy } ).handler( {
        ...api,
        addBase: ( rules ) => {
            const list = Array.isArray( rules ) ? rules : [ rules ];

            list.forEach( ( rule ) => api.addBase( scopeRules( rule, scope ) ) );
        },
    } );
} );
