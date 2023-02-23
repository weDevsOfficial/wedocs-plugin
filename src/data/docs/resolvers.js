import actions from './actions';

const resolvers = {
  *getDocs() {
    yield actions.setLoading( true );
    const response = yield actions.fetchFromAPI( '/wp/v2/docs?per_page=-1' );
    yield actions.setDocs( response );
    return actions.setLoading( false );
  },

  *getDoc( id ) {
    yield actions.setLoading( true );
    const response = yield actions.fetchFromAPI( '/wp/v2/docs?per_page=-1' );
    yield actions.setDocs( response );
    return actions.setLoading( false );
  },

  *getPages() {
    yield actions.setLoading( true );
    const response = yield actions.fetchFromAPI( '/wp/v2/pages' );
    yield actions.setPages( response );
    return actions.setLoading( false );
  },

  *getParentDocs() {
    yield actions.setLoading( true );
    const docs = yield actions.fetchFromAPI( '/wp/v2/docs?per_page=-1' );
    yield actions.setDocs( docs );
    return actions.setLoading( false );
  },

  // *getSectionsDocs( id ) {
  // 	yield actions.setLoading( true );
  // 	const docs = yield actions.fetchFromAPI( '/wp/v2/docs/' + id );
  // 	yield actions.setDocs( docs );
  // 	return actions.setLoading( false );
  // },

  *getSectionsDocs( id ) {
    const response = yield actions.fetchFromAPI( '/wp/v2/docs?per_page=-1' );
    return actions.setDocs( response );
  },

  *getDocArticles( id ) {
    const docs = yield actions.fetchFromAPI( '/wp/v2/docs?per_page=-1' );

    return actions.setDocs( docs );
  },

  // *getDocArticles( id ) {
  // 	const docs = yield actions.fetchFromAPI(
  // 		'/wp/v2/docs?per_page=-1'
  // 	);
  // 	yield actions.setDocs( docs );
  // 	const sections = docs.filter( ( doc ) => doc.parent === id );
  // 	const articles = [];
  // 	sections.forEach( ( article ) => {
  // 		const collection = docs.filter( ( doc ) => {
  // 			return doc.parent === article.id;
  // 		} );
  //
  // 		articles.push( ...collection );
  // 	} );
  //
  // 	yield actions.setDocs( docs );
  // },
};

export default resolvers;
