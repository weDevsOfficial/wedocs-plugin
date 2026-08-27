import { getDocsFetchingPath, DEFAULT_PER_PAGE } from './docsPath';
import actions from './actions';

const resolvers = {
  *getDocs() {
    // Load only the first page of top-level docs. Sections and articles are
    // fetched when a documentation is opened, so the dashboard no longer pays
    // for the whole tree up front.
    yield* actions.loadDocsPage( { page: 1, perPage: DEFAULT_PER_PAGE } );
  },

  // getDocs already populates the parent list from the same response, so this
  // resolver deliberately does no fetching of its own — declaring it would make
  // the dashboard request the first page twice.

  *getDoc( id ) {
    yield actions.setLoading( true );
    let url = '/wp/v2/docs/' + id;
    const response = yield actions.fetchFromAPI( url );
    yield actions.setDoc( response );
    return actions.setLoading( false );
  },

  *getPages() {
    // Pull all pages (REST defaults to 10) so every page is selectable as the weDocs Home.
    const response = yield actions.fetchFromAPI(
      '/wp/v2/pages?per_page=100&orderby=title&order=asc&_fields=id,title'
    );
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
    try {
      // Check if Pro plugin is active via global flag
      if (typeof weDocsAdminVars !== 'undefined' && weDocsAdminVars.pro_active) {
        const userDocIds = yield actions.fetchFromAPI(`/wp/v2/docs/users/ids/`);
        return actions.setUserDocIds(userDocIds);
      } else {
        // Pro plugin not active, return empty array
        console.info('weDocs Pro plugin not active, returning empty user doc IDs');
        return actions.setUserDocIds([]);
      }
    } catch (error) {
      console.warn('Error fetching user doc IDs:', error);
      return actions.setUserDocIds([]);
    }
  },

  *getHelpfulDocs() {
    const docs = yield actions.fetchFromAPI( getDocsFetchingPath() );
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
