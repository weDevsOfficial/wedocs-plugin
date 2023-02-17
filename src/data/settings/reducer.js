const DEFAULT_SETTINGS_STATE = {
	roles: {},
	settings: {},
	loading: false,
	saving: false,
};

const reducer = ( state = DEFAULT_SETTINGS_STATE, action ) => {
	switch ( action.type ) {
		case 'SET_SETTINGS':
			return { ...state, settings: action.settings };
		case 'SET_LOADING':
			return { ...state, loading: action.loading };
		case 'SET_SETTINGS_OPTION':
			return {
				...state,
				settings: {
					...state.settings,
					[ action.option ]: action.value,
				},
			};
		case 'SET_SAVING':
			return { ...state, saving: action.saving };
		default:
			return state;
	}
};

export default reducer;
