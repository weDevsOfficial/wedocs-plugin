const selectors = {
    getDocs( state ) {
        if ( ! state.docs ) {
            return;
        }

        const { docs } = state;
        return docs;
    },

    getDoc( state, id ) {
        if ( ! state.docs ) {
            return;
        }

        const { docs } = state;
        return docs.find( doc => doc.id === id );
    },

    getLoading( state ) {
        if ( ! state.loading ) {
            return;
        }

        const { loading } = state;
        return loading;
    },

    getParentOnlyDocs( state ) {
        if ( ! state.docs ) {
            return;
        }

        const { docs } = state;
        return docs.filter( ( doc ) => ! doc.parent );
    },

    getSectionsDocs( state, id ) {
        if ( ! state.docs ) {
            return;
        }

        const { docs } = state;
        return docs.filter( ( doc ) => doc.parent === id );
    },
};

export default selectors;
