const actions = {
    setDocs(docs) {
        return { type: 'SET_DOCS', docs: docs };
    },

    setDoc(doc) {
        return { type: 'SET_DOC', doc: doc };
    },

    setLoading(loading) {
        return { type: 'SET_LOADING', loading: loading };
    },

    fetchDocsFromAPI( path ) {
        return { type: 'FETCH_FROM_API', path };
    },
};

export default actions;
