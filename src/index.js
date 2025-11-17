import './data/store';
import './assets/css/index.css';
import './components/ProPreviews';
import App from './components/App';
import menuFix from './utils/menuFix';
import { createRoot } from '@wordpress/element';

// Wait for DOM and all scripts to be ready before rendering
// This ensures Pro plugin filters are registered before App renders

const container = document.getElementById( 'wedocs-app' );

// Use requestIdleCallback or setTimeout to ensure all scripts have executed
// This gives Pro plugin time to register its filters
const renderApp = () => {
	const root = createRoot( container );
	root.render( <App /> );
	menuFix( 'wedocs' );
};

// Check if Pro is loaded by testing for its global variable
if ( typeof window.weDocsPro_Vars !== 'undefined' ) {
	// Pro is loaded, render immediately
	renderApp();
} else {
	// Give Pro a chance to load (it's enqueued as a dependency)
	// Use setTimeout to defer execution until next tick
	setTimeout( renderApp, 0 );
}