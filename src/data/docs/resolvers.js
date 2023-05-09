import actions from './actions';

const resolvers = {
  *getDocs() {
    yield actions.setLoading( true );
    const response = yield actions.fetchFromAPI(
      '/wp/v2/docs?per_page=-1&status=publish,private'
    );
    yield actions.setDocs( response );
    return actions.setLoading( false );
  },

  *getDoc( id ) {
    yield actions.setLoading( true );
    const response = yield actions.fetchFromAPI(
      '/wp/v2/docs?per_page=-1&status=publish,private'
    );
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
    const docs = yield actions.fetchFromAPI(
      '/wp/v2/docs?per_page=-1&status=publish,private'
    );
    yield actions.setDocs( docs );
    return actions.setLoading( false );
  },

  *getSectionsDocs( id ) {
    const response = yield actions.fetchFromAPI(
      '/wp/v2/docs?per_page=-1&status=publish,private'
    );
    return actions.setDocs( response );
  },

  *getDocArticles( id ) {
    const docs = yield actions.fetchFromAPI(
      '/wp/v2/docs?per_page=-1&status=publish,private'
    );
    return actions.setDocs( docs );
  },

  *getHelpfulDocs() {
    yield actions.setLoading( true );
    const docs = yield actions.fetchFromAPI(
      '/wp/v2/docs?per_page=-1&status=publish,private'
    );
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
