import apiFetch from '@wordpress/api-fetch';

const controls = {
	FETCH_DOCS() {
		return apiFetch( { path: '/wp/v2/docs?per_page=-1' } );
	},

	FETCH_FROM_API( action ) {
		return apiFetch( { path: action.path } );
	},

	FETCH_FROM_API_UNPARSED( action ) {
		return apiFetch( { path: action.path, parse: false } ).then(
			( response ) =>
				Promise.all( [ response.headers, response.json() ] ).then(
					( [ headers, data ] ) => ( { headers, data } )
				)
		);
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
