import { render } from '@wordpress/element';
import './data/store';
import './assets/css/index.css';
import App from './components/App';

render( <App />, document.getElementById( 'wedocs-app' ) );
