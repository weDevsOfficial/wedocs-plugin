import {createReduxStore, dispatch, register} from "@wordpress/data";
import reducer from "./reducer";
// import actions from "./actions";
import selectors from "./selectors";
import controls from "./controls";
import resolvers from "./resolvers";
import apiFetch from "@wordpress/api-fetch";

const DOCS_STORE = 'wedocs/docs';

const actions = {
    setDocs( docs ) {
        return {
            type: 'SET_DOCS',
            docs: docs
        }
    },
    fetchDocs() {
        return {
            type: 'FETCH_DOCS'
        }
    }
}

const docsStore = createReduxStore( DOCS_STORE, {
    reducer: ( state = { docs: [] }, action ) => {
        switch ( action.type ) {
            case 'SET_DOCS':
                return {
                    ...state,
                    docs: action.docs
                }
            default:
                return state;
        }
    },
    selectors: {
        getDocs: ( state ) => {
            return state.docs;
        }
    },
    actions: actions,
    resolvers: {
        *getDocs(state) {
            console.log('resolvers')
            dispatch(docsStore).startResolution('getDocs');
            const response = yield actions.fetchDocs();
            dispatch(docsStore).finishResolution('getDocs');
            return actions.setDocs(response);
        }
    },
    controls: {
        FETCH_DOCS() {
            return apiFetch({ path: '/wp/v2/docs' })
        }
    }
    // actions,
    // selectors,
    // controls,
    // resolvers
} );

register( docsStore );

export default docsStore;
