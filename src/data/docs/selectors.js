const selectors = {
	getDocs: ( state ) => {
		const { docs } = state;
		return docs;
	},

	getDoc( state, id ) {
		const { docs } = state;
		return docs.find( ( doc ) => doc.id === id );
	},

	getLoading( state ) {
		const { loading } = state;
		return loading;
	},

	getParentOnlyDocs( state ) {
		const { docs } = state;
		return docs.filter( ( doc ) => ! doc.parent );
	},

	getSectionsDocs( state, id ) {
		const { docs } = state;
		return docs.filter( ( doc ) => doc.parent === id );
	},

	getDocArticles( state, id ) {
		const { docs } = state;
		const sections = docs.filter( ( doc ) => doc.parent === id );
		const articles = [];
		sections.forEach( ( article ) => {
			const collection = docs.filter( ( doc ) => {
				return doc.parent === article.id;
			} );

			articles.push( ...collection );
		} );

		return articles;
	},

	getSectionArticles( state, id ) {
		const { docs } = state;
		return docs.filter( ( doc ) => doc.parent === id );
	},
};

export default selectors;
