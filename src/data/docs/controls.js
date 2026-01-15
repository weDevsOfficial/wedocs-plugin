import apiFetch from '@wordpress/api-fetch';

// Set up REST API nonce for authentication
if ( typeof window.weDocsAdminVars !== 'undefined' && window.weDocsAdminVars.restNonce ) {
  apiFetch.use( apiFetch.createNonceMiddleware( window.weDocsAdminVars.restNonce ) );
}

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

  DELETE_TO_API( action ) {
    return apiFetch( {
      path: action.path,
      method: 'DELETE',
    } );
  },
};

export default controls;
