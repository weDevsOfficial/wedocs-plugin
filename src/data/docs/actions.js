const actions = {
  setDocs( docs ) {
    return {
      type: 'SET_DOCS',
      docs,
    };
  },

  setDoc( doc ) {
    return { type: 'SET_DOC', doc };
  },

  setPages( pages ) {
    return {
      type: 'SET_PAGES',
      pages,
    };
  },

  setLoading( loading ) {
    return { type: 'SET_LOADING', loading };
  },

  fetchFromAPI( path ) {
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
    const docs = yield actions.fetchFromAPI( '/wp/v2/docs?per_page=-1' );
    yield actions.setDocs( docs );
    return response;
  },

  *deleteDoc( docId ) {
    const path = '/wp/v2/docs/' + docId;
    yield { type: 'DELETE_TO_API', path };
    const response = yield actions.fetchFromAPI( '/wp/v2/docs?per_page=-1' );
    return actions.setDocs( response );
  },
};

export default actions;
