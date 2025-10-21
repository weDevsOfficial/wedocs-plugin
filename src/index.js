import './data/store';
import './assets/css/index.css';
import App from './components/App';
import menuFix from './utils/menuFix';
import { createRoot } from '@wordpress/element';

// Wait for DOM and all scripts to be ready before rendering
// This ensures Pro plugin filters are registered before App renders

const container = document.getElementById( 'wedocs-app' );
const root = createRoot( container );
root.render( <App /> );
menuFix( 'wedocs' );