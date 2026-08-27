// DESCRIPTION: Smooth expand/collapse transitions for FAQ <details>
// elements rendered by the [wedocs_faq] shortcode.

document.addEventListener( 'DOMContentLoaded', function () {
    document.querySelectorAll( '.wedocs-faq-item' ).forEach( function ( details ) {
        var summary = details.querySelector( '.wedocs-faq-item__question' );
        var answer  = details.querySelector( '.wedocs-faq-item__answer' );

        if ( ! summary || ! answer ) {
            return;
        }

        var closing = null;

        // Set the starting row size explicitly so the very first toggle in
        // either direction has two values to transition between.
        answer.style.gridTemplateRows = details.open ? '1fr' : '0fr';

        var finishClose = function () {
            if ( ! closing ) {
                return;
            }

            answer.removeEventListener( 'transitionend', finishClose );
            window.clearTimeout( closing );
            closing = null;
            details.open = false;
        };

        summary.addEventListener( 'click', function ( e ) {
            e.preventDefault();

            if ( closing ) {
                // Mid-close: settle it now so the click reopens from a known state.
                finishClose();
            }

            if ( details.open ) {
                answer.style.gridTemplateRows = '0fr';
                answer.addEventListener( 'transitionend', finishClose );

                // Browsers that cannot interpolate grid-template-rows never fire
                // transitionend, which would leave the item stuck open because
                // preventDefault() already suppressed the native toggle.
                closing = window.setTimeout( finishClose, 400 );
                return;
            }

            details.open = true;
            answer.style.gridTemplateRows = '0fr';
            // Force a reflow so the browser registers the 0fr starting state.
            answer.offsetHeight; // eslint-disable-line no-unused-expressions
            answer.style.gridTemplateRows = '1fr';
        } );
    } );
} );
