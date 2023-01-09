import apiFetch from '@wordpress/api-fetch';

const controls = {
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
};

export default controls;
