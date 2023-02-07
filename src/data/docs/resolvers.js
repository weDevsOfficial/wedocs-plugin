import actions from './actions';
import { dispatch } from '@wordpress/data';
import docsStore from './index';

const resolvers = {
	*getDocs() {
		// dispatch( docsStore ).startResolution( 'getDocs' );
		yield actions.setLoading( true );
		const response = yield actions.fetchDocsFromAPI(
			'/wp/v2/docs?per_page=-1'
		);
		yield actions.setDocs( response );
		// dispatch( docsStore ).finishResolution( 'getDocs' );
		return actions.setLoading( false );
	},

	*getDoc( id ) {
		yield actions.setLoading( true );
		const doc = yield actions.fetchDocsFromAPI( '/wp/v2/docs/' + id );
		yield actions.setDoc( doc );
		return actions.setLoading( false );
	},

	*getParentOnlyDocs() {
		yield actions.setLoading( true );
		const docs = yield actions.fetchDocsFromAPI(
			'/wp/v2/docs?per_page=-1'
		);
		yield actions.setDocs( docs );
		return actions.setLoading( false );
	},

	// *getSectionsDocs( id ) {
	// 	yield actions.setLoading( true );
	// 	const docs = yield actions.fetchDocsFromAPI( '/wp/v2/docs/' + id );
	// 	yield actions.setDocs( docs );
	// 	return actions.setLoading( false );
	// },

	*getSectionsDocs( id ) {
		const response = yield actions.fetchDocsFromAPI(
			'/wp/v2/docs?per_page=-1'
		);
		return actions.setDocs( response );
	},

	*getDocArticles( id ) {
		const docs = yield actions.fetchDocsFromAPI(
			'/wp/v2/docs?per_page=-1'
		);

		return actions.setDocs( docs );
	},

	// *getDocArticles( id ) {
	// 	const docs = yield actions.fetchDocsFromAPI(
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
