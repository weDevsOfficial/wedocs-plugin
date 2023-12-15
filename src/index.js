import './data/store';
import './assets/css/index.css';
import App from './components/App';
import menuFix from './utils/menuFix';
import { render } from '@wordpress/element';

render( <App />, document.getElementById( 'wedocs-app' ) );

menuFix( 'wedocs' );
