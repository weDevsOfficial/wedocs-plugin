import { createRoot, render } from '@wordpress/element';
import './data/store';
import './assets/css/index.css';
import App from './components/App';
import menuFix from './utils/menuFix';

const isProLoaded = wp.hooks.applyFilters(
  'wedocs_pro_loaded',
  false
);

const container = document.getElementById( 'wedocs-app' );
const root = createRoot( container );

root.render( <App /> );

if ( !isProLoaded ) {
  import( './components/ProPreviews' ).then( ( module ) => module.default );
}

menuFix( 'wedocs' );
