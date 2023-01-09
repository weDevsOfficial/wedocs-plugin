import actions from './actions';
import { dispatch } from '@wordpress/data';
import './store';

const resolvers = {
    *getDocs() {
        yield actions.setLoading( true );
        const docs = yield actions.fetchDocsFromAPI( '/wp/v2/docs' );
        yield actions.setDocs( docs );
        return actions.setLoading( false );
    },

    *getDoc( id ) {
        yield actions.setLoading( true );
        const doc = yield actions.fetchDocsFromAPI( '/wp/v2/docs/' + id );
        yield actions.setDoc( doc );
        return actions.setLoading( false );
    },

    *getParentOnlyDocs() {
        dispatch( DOCS_STORE ).startResolution( 'getParentOnlyDocs' );
        yield actions.setLoading( true );
        const docs = yield actions.fetchDocsFromAPI( '/wp/v2/docs' );
        yield actions.setDocs( docs );
        dispatch( DOCS_STORE ).finishResolution( 'getParentOnlyDocs' );
        return actions.setLoading( false );
    },

    *getSectionsDocs( id ) {
        dispatch( DOCS_STORE ).startResolution( 'getSectionsDocs' );
        yield actions.setLoading( true );
        const docs = yield actions.fetchDocsFromAPI( '/wp/v2/docs/' + id );
        yield actions.setDocs( docs );
        dispatch( DOCS_STORE ).finishResolution( 'getSectionsDocs' );
        return actions.setLoading( false );
    },
};

export default resolvers;
