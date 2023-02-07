import { createReduxStore } from '@wordpress/data';
import reducer from './reducer';
import actions from './actions';
import selectors from './selectors';
import controls from './controls';
import resolvers from './resolvers';

export const DOCS_STORE = 'wedocs-pro/docs';

const docsStore = createReduxStore( DOCS_STORE, {
	reducer,
	selectors,
	actions,
	resolvers,
	controls,
} );

export default docsStore;
