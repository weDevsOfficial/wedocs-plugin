// DESCRIPTION: Smooth expand/collapse transitions for FAQ <details>
// elements rendered by the [wedocs_faq] shortcode.

document.addEventListener( 'DOMContentLoaded', function () {
    document.querySelectorAll( '.wedocs-faq-item' ).forEach( function ( details ) {
        var summary = details.querySelector( '.wedocs-faq-item__question' );
        var answer  = details.querySelector( '.wedocs-faq-item__answer' );

        // Items open by default need the inline style set so transitions work.
        if ( details.open ) {
            answer.style.gridTemplateRows = '1fr';
        }

        summary.addEventListener( 'click', function ( e ) {
            e.preventDefault();

            if ( details.open ) {
                // Closing: let the transition finish before removing open.
                answer.style.gridTemplateRows = '0fr';
                answer.addEventListener( 'transitionend', function handler() {
                    details.open = false;
                    answer.removeEventListener( 'transitionend', handler );
                } );
            } else {
                // Opening: set open first so content is measurable, then animate.
                details.open = true;
                // Force a reflow so the browser registers the 0fr starting state.
                answer.offsetHeight; // eslint-disable-line no-unused-expressions
                answer.style.gridTemplateRows = '1fr';
            }
        } );
    } );
} );
