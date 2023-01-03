import {createReduxStore, register} from "@wordpress/data";
import reducer from "./reducer";
import actions from "./actions";
import selectors from "./selectors";
import controls from "./controls";
import resolvers from "./resolvers";

const DOCS_STORE = 'wedocs/docs';

const docsStore = createReduxStore( DOCS_STORE, {
    reducer,
    actions,
    selectors,
    controls,
    resolvers
} );

register( docsStore );

export default docsStore;
