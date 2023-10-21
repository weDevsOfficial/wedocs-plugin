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

  setParentDocs( parents ) {
    return {
      type: 'SET_PARENT_DOCS',
      parents,
    };
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

  setSortingStatus( sorting ) {
    return { type: 'SET_SORTING_STATUS', sorting };
  },

  setNeedSortingStatus( needSorting ) {
    return { type: 'SET_NEED_SORTING_STATUS', needSorting };
  },

  setUserDocIds( userDocIds ) {
    return { type: 'SET_USER_DOC_IDS', userDocIds };
  },

  fetchFromAPI( path ) {
    return { type: 'FETCH_FROM_API', path };
  },

  setHelpfulDocs( helpfulDocs ) {
    return { type: 'SET_HELPFUL_DOCS', helpfulDocs };
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
    yield { type: 'UPDATE_TO_API', path, data };
    const response = yield actions.fetchFromAPI(
      '/wp/v2/docs?per_page=-1&status=publish,draft,private'
    );
    const parentDocs = response.filter( ( doc ) => ! doc.parent );
    const sortableDocs = parentDocs?.sort(
      ( a, b ) => a.menu_order - b.menu_order
    );
    yield actions.setParentDocs( sortableDocs );
    return actions.setDocs( response );
  },

  *updateNeedSortingStatus( data ) {
    const path = '/wp/v2/docs/need_sorting_status';
    yield { type: 'UPDATE_TO_API', path, data };
    const response = yield actions.fetchFromAPI(
      '/wp/v2/docs/need_sorting_status'
    );
    return actions.setNeedSortingStatus( response );
  },

  *updateSortingStatus( data ) {
    const path = '/wp/v2/docs/sorting_status';
    yield { type: 'UPDATE_TO_API', path, data };
    const response = yield actions.fetchFromAPI(
      '/wp/v2/docs/sorting_status'
    );
    yield actions.setNeedSortingStatus( response );
    return actions.setSortingStatus( response );
  },

  *updateDocMeta( docId, meta ) {
    const path = '/wp/v2/docs/' + docId + '/meta';
    const response = yield { type: 'UPDATE_TO_API', path, data: meta };
    return response;
  },

  *deleteDoc( docId ) {
    const path = '/wp/v2/docs/' + docId;
    yield { type: 'DELETE_TO_API', path };
    const response = yield actions.fetchFromAPI(
      '/wp/v2/docs?per_page=-1&status=publish,draft,private'
    );
    const parentDocs = response.filter( ( doc ) => ! doc.parent );
    const sortableDocs = parentDocs?.sort(
      ( a, b ) => a.menu_order - b.menu_order
    );
    yield actions.setParentDocs( sortableDocs );
    return actions.setDocs( response );
  },

  *updateDocs( docs ) {
    const parentDocs = docs.filter( ( doc ) => ! doc.parent );
    const sortableDocs = parentDocs?.sort(
      ( a, b ) => a.menu_order - b.menu_order
    );
    yield actions.setParentDocs( sortableDocs );
    return actions.setDocs( docs );
  },

  *sendMessage( data ) {
    const path = '/wp/v2/docs/message';
    const response = yield { type: 'UPDATE_TO_API', path, data };
    return response;
  },
};

export default actions;
