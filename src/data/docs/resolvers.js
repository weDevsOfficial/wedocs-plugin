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
    const response = yield actions.fetchFromAPI( '/wp/v2/pages' );
    return actions.setPages( response );
  },

  *getSortingStatus() {
    const response = yield actions.fetchFromAPI( '/wp/v2/docs/sorting_status' );
    return actions.setSortingStatus( response );
  },

  *getNeedSortingStatus() {
    const response = yield actions.fetchFromAPI( '/wp/v2/docs/need_sorting_status' );
    return actions.setNeedSortingStatus( response );
  },

  *getUserDocIds() {
    console.log('Resolvers');

    const userDocIds = yield actions.fetchFromAPI( `/wp/v2/docs/users/ids` );
    return actions.setUserDocIds( userDocIds );
  },

  *getHelpfulDocs() {
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
  },

  *getRestrictedArticles() {
    const response = yield actions.fetchFromAPI( '/wp/v2/docs/meta?key=wedocs_restrict_admin_article_access' );
    return yield actions.setRestrictedArticles( response );
  },

  *getRestrictedArticle( state, id ) {
    const { restrictedArticleList } = state;
    return restrictedArticleList.find( ( article ) => article.id === id );
  },
};

export default resolvers;
