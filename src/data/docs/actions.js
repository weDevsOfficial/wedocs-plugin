const actions = {
	setDocs( docs ) {
		return {
			type: 'SET_DOCS',
			docs,
		};
	},

	fetchDocs() {
		return {
			type: 'FETCH_DOCS',
		};
	},

	setDoc( doc ) {
		return { type: 'SET_DOC', doc };
	},

	setLoading( loading ) {
		return { type: 'SET_LOADING', loading };
	},

	fetchDocsFromAPI( path ) {
		return { type: 'FETCH_FROM_API', path };
	},

	createDocsToAPI( doc ) {
		const path = '/wp/v2/docs';
		return { type: 'UPDATE_TO_API', path, data: doc };
	},

	*createDoc( doc ) {
		const createdDoc = yield actions.createDocsToAPI( doc );
		yield actions.setDoc( createdDoc );
		return createdDoc;
	},

	*updateDoc( docId, data ) {
		const path = '/wp/v2/docs/' + docId;
		const response = yield { type: 'UPDATE_TO_API', path, data };
		return response;
	},

	*updateDocMeta( docId, meta ) {
		const path = '/wp/v2/docs/' + docId + '/meta';
		const response = yield { type: 'UPDATE_TO_API', path, data: meta };
		return response;
	},
};

export default actions;
