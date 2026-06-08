// DESCRIPTION: Redux reducer for the messages data store.
// Manages state for messages list, single message, loading, and pagination meta.

const DEFAULT_STATE = {
	messages: [],
	message: null,
	loading: false,
	error: null,
	meta: { total: 0, totalPages: 0 },
};

const reducer = ( state = DEFAULT_STATE, action ) => {
	switch ( action.type ) {
		case 'SET_MESSAGES':
			return {
				...state,
				messages: [ ...action.messages ],
			};

		case 'SET_MESSAGE':
			return {
				...state,
				message: action.message,
			};

		case 'SET_MESSAGES_LOADING':
			return {
				...state,
				loading: action.loading,
			};

		case 'SET_MESSAGES_META':
			return {
				...state,
				meta: { ...action.meta },
			};

		case 'SET_MESSAGES_ERROR':
			return {
				...state,
				error: action.error,
			};

		case 'REMOVE_MESSAGE':
			return {
				...state,
				messages: state.messages.filter(
					( msg ) => msg.id !== action.messageId
				),
				meta: {
					...state.meta,
					total: Math.max( 0, state.meta.total - 1 ),
				},
			};

		default:
			return state;
	}
};

export default reducer;
