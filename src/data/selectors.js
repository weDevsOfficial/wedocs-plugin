const selectors = {
    getDocs( state ) {
        const { docs } = state;
        return docs;
    },

    getDoc( state, id ) {
        const { docs } = state;
        return docs.find( doc => doc.id === id );
    },

    getLoading( state ) {
        const { loading } = state;
        return loading;
    }
};

export default selectors;
