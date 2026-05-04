// DESCRIPTION: Messages data store registration.
// Creates and exports the wedocs/messages Redux store.

import { createReduxStore } from '@wordpress/data';
import reducer from './reducer';
import actions from './actions';
import selectors from './selectors';
import controls from './controls';
import resolvers from './resolvers';

export const MESSAGES_STORE = 'wedocs/messages';

const messagesStore = createReduxStore( MESSAGES_STORE, {
	reducer,
	selectors,
	actions,
	resolvers,
	controls,
} );

export default messagesStore;
