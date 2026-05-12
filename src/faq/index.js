// DESCRIPTION: Entry point for the FAQ Builder React app.
// Mounts the FaqApp component into the #wedocs-faq-app container.

import './assets/faq.css';
import FaqApp from './components/FaqApp';
import { createRoot } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

// Set up REST API nonce for authentication.
if ( window.weDocsFaqVars?.restNonce ) {
    apiFetch.use( apiFetch.createNonceMiddleware( window.weDocsFaqVars.restNonce ) );
}

const container = document.getElementById( 'wedocs-faq-app' );

if ( container ) {
    const root = createRoot( container );
    root.render( <FaqApp /> );
}
