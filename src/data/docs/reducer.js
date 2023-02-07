const DEFAULT_STATE = {
	docs: [],
	loading: false,
};

const reducer = ( state = DEFAULT_STATE, action ) => {
	switch ( action.type ) {
		case 'SET_DOCS':
			return {
				...state,
				docs: [ ...action.docs ],
			};

		case 'SET_DOC':
			return {
				...state,
				docs: [ ...state.docs, action.doc ],
			};

		case 'SET_LOADING':
			return {
				...state,
				loading: action.loading,
			};

		default:
			return state;
	}
};

export default reducer;
