import apiFetch from '@wordpress/api-fetch';

// Set up REST API nonce for authentication
if ( typeof window.weDocsAdminVars !== 'undefined' && window.weDocsAdminVars.restNonce ) {
  apiFetch.use( apiFetch.createNonceMiddleware( window.weDocsAdminVars.restNonce ) );
}

const controls = {
  FETCH_FROM_API( action ) {
    return apiFetch( { path: action.path } );
  },

  // `parse: false` hands back the raw Response so pagination totals can be read
  // from the X-WP-Total / X-WP-TotalPages headers.
  FETCH_WITH_HEADERS_FROM_API( action ) {
    return apiFetch( { path: action.path, parse: false } ).then( ( response ) =>
      response.json().then( ( body ) => ( { body, headers: response.headers } ) )
    );
  },

  UPDATE_TO_API( action ) {
    return apiFetch( {
      path: action.path,
      data: action.data,
      method: 'POST',
    } );
  },

  DELETE_TO_API( action ) {
    return apiFetch( {
      path: action.path,
      method: 'DELETE',
    } );
  },
};

export default controls;
