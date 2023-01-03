const defaultState = {
    docs: [],
    loading: false,
};

const reducer = ( state = defaultState, action ) => {
    switch ( action.type ) {
        case 'SET_DOCS' :
            return {
                ...state,
                docs: action.docs
            }

        case 'SET_DOC' :
            return {
                ...state,
                docs: [ ...state.docs, action.doc ]
            }

        case 'SET_LOADING' :
            return {
                ...state,
                loading: action.loading
            }
    }
};

export default reducer;
