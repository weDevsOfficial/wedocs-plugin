import { render } from '@wordpress/element';
import './data/store';
import './assets/css/index.css';
import App from './components/App';
import menuFix from './utils/menuFix';

const isProLoaded = wp.hooks.applyFilters(
  'wedocs_pro_loaded',
  false
);

render( <App />, document.getElementById( 'wedocs-app' ) );

if ( !isProLoaded ) {
  import( './components/ProPreviews' ).then( ( module ) => module.default );
}

menuFix( 'wedocs' );
