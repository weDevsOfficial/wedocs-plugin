import actions from './actions';

const getDocsPath = wp.hooks.applyFilters(
  'wedocs_documentation_fetching_path',
  `/wp/v2/docs?per_page=-1&status=publish${ typeof weDocsAdminVars !== 'undefined' ? ',draft' : ''}`
);

const resolvers = {
  *getDocs() {
    yield actions.setLoading( true );
    const response = yield actions.fetchFromAPI( getDocsPath );
    yield actions.setDocs( response );
    const parentDocs = response.filter( ( doc ) => ! doc.parent );
    const sortableDocs = parentDocs?.sort(
      ( a, b ) => a.menu_order - b.menu_order
    );
    yield actions.setParentDocs( sortableDocs );
    return actions.setLoading( false );
  },

  *getDoc( id ) {
    yield actions.setLoading( true );
    let url = '/wp/v2/docs/' + id;
    const response = yield actions.fetchFromAPI( url );
    yield actions.setDoc( response );
    return actions.setLoading( false );
  },

  *getPages() {
    // yield actions.setLoading( true );
    const response = yield actions.fetchFromAPI( '/wp/v2/pages' );
    yield actions.setPages( response );
    // return actions.setLoading( false );
  },

  *getSortingStatus() {
    // yield actions.setLoading( true );
    const response = yield actions.fetchFromAPI( '/wp/v2/docs/sorting_status' );
    yield actions.setSortingStatus( response );
    // return actions.setLoading( false );
  },

  *getNeedSortingStatus() {
    // yield actions.setLoading( true );
    const response = yield actions.fetchFromAPI( '/wp/v2/docs/need_sorting_status' );
    yield actions.setNeedSortingStatus( response );
    // return actions.setLoading( false );
  },

  *getUserDocIds() {
    // yield actions.setLoading( true );
    const userDocIds = yield actions.fetchFromAPI( `/wp/v2/docs/users/ids` );
    yield actions.setUserDocIds( userDocIds );
    // return actions.setLoading( false );
  },

  *getHelpfulDocs() {
    // yield actions.setLoading( true );
    const docs = yield actions.fetchFromAPI( getDocsPath );
    yield actions.setDocs( docs );
    const helpfulDocIds = yield actions.fetchFromAPI(
      '/wp/v2/docs/helpfulness'
    );
    const helpfulDocs = docs.sort( ( a, b ) => helpfulDocIds.indexOf( a.id ) - helpfulDocIds.indexOf( b.id ) )
      .filter( ( doc ) =>
        helpfulDocIds?.includes( doc?.id )
      );
    yield actions.setHelpfulDocs( helpfulDocs );
    // yield actions.setLoading( false );
  },
};

export default resolvers;
