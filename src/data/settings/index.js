import { createReduxStore } from '@wordpress/data';
import reducer from './reducer';
import selectors from './selectors';
import actions from './actions';
import resolvers from './resolvers';
import controls from './controls';

export const DOCS_SETTINGS_STORE = 'wedocs/settings';

const settingsStore = createReduxStore( DOCS_SETTINGS_STORE, {
  reducer,
  selectors,
  actions,
  resolvers,
  controls,
} );

export default settingsStore;
