import './data/store';
import './assets/css/index.css';
import './components/ProPreviews';
import App from './components/App';
import menuFix from './utils/menuFix';
import { createRoot } from '@wordpress/element';

// Wait for DOM and all scripts to be ready before rendering
// This ensures Pro plugin filters are registered before App renders

const container = document.getElementById( 'wedocs-app' );

const renderApp = () => {
    if (!container) {
		console.error('wedocs-app container not found');
		return;
	}
	const root = createRoot( container );
	root.render( <App /> );
	menuFix( 'wedocs' );
};

// Render once the DOM is parsed. Pro's script is printed after this one, and
// a timer could fire before it ran, so its routes (such as manager/:id) were
// sometimes missing and the screen fell through to the 404 panel. By
// DOMContentLoaded every footer script, Pro included, has executed.
if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', renderApp );
} else {
	renderApp();
}
