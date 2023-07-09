import actions from './actions';
import { select } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

const getDocsPath = wp.hooks.applyFilters(
  'wedocs_documentation_fetching_path',
  '/wp/v2/docs?per_page=-1&status=publish'
);

const resolvers = {
  *getDocs() {
    yield actions.setLoading( true );
    const response = yield actions.fetchFromAPI(
      getDocsPath
      // '/wp/v2/docs?per_page=-1&status=publish,private&context=view'
    );
    yield actions.setDocs( response );
    return actions.setLoading( false );
  },

  *getDoc( id ) {
    yield actions.setLoading( true );
    const response = yield actions.fetchFromAPI( getDocsPath );
    yield actions.setDocs( response );
    return actions.setLoading( false );
  },

  *getPages() {
    yield actions.setLoading( true );
    const response = yield actions.fetchFromAPI( '/wp/v2/pages' );
    yield actions.setPages( response );
    return actions.setLoading( false );
  },

  // *getContributors() {
  //   yield actions.setLoading( true );
  //   const response = yield actions.fetchFromAPI( '/wp/v2/docs/contributors' );
  //   yield actions.setContributors( response );
  //   return actions.setLoading( false );
  // },

  *getParentDocs() {
    yield actions.setLoading( true );
    const docs = yield actions.fetchFromAPI( getDocsPath );
    yield actions.setDocs( docs );
    return actions.setLoading( false );
  },

  *getUserDocIds() {
    yield actions.setLoading( true );
    const userDocIds = yield actions.fetchFromAPI( `/wp/v2/docs/users/ids` );
    yield actions.setUserDocIds( userDocIds );
    return actions.setLoading( false );
  },

  *getSectionsDocs( id ) {
    const response = yield actions.fetchFromAPI( getDocsPath );
    return actions.setDocs( response );
  },

  *getDocArticles( id ) {
    const docs = yield actions.fetchFromAPI( getDocsPath );
    return actions.setDocs( docs );
  },

  *getHelpfulDocs() {
    yield actions.setLoading( true );
    const docs = yield actions.fetchFromAPI( getDocsPath );
    yield actions.setDocs( docs );
    const helpfulDocIds = yield actions.fetchFromAPI(
      '/wp/v2/docs/helpfulness'
    );
    const helpfulDocs = docs?.filter( ( doc ) =>
      helpfulDocIds?.includes( doc?.id )
    );
    yield actions.setHelpfulDocs( helpfulDocs );
    yield actions.setLoading( false );
  },
};

export default resolvers;
