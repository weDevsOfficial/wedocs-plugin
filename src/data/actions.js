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
};

export default actions;
