import apiFetch from '@wordpress/api-fetch';

const controls = {
	FETCH_FROM_API( action ) {
		return apiFetch( { path: action.path } );
	},

	UPDATE_TO_API( action ) {
		return apiFetch( {
			path: action.path,
			data: action.data,
			method: 'POST',
		} );
	},
};

export default controls;
