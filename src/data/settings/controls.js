import apiFetch from '@wordpress/api-fetch';

// Set up REST API nonce for authentication
if ( typeof window.weDocsAdminVars !== 'undefined' && window.weDocsAdminVars.restNonce ) {
  apiFetch.use( apiFetch.createNonceMiddleware( window.weDocsAdminVars.restNonce ) );
}

const isProLoaded = wp.hooks.applyFilters(
  'wedocs_pro_loaded',
  false
);

const controls = {
  FETCH_SETTINGS() {
    return apiFetch( {
      path: '/wp/v2/docs/settings?data=wedocs_settings',
    } );
  },

  FETCH_ROLES() {
    return apiFetch( {
      path: '/wp/v2/docs/users',
    } );
  },

  FETCH_UPGRADE_INFO() {
    return apiFetch( {
      path: '/wp/v2/docs/upgrade',
    } );
  },

  FETCH_SITE_KEY() {
    return apiFetch( {
      path: '/wp/v2/docs/settings/turnstile-site-key',
    } );
  },

  UPDATE_TO_API( action ) {
    return apiFetch( {
      path: action.path,
      data: action.data,
      method: 'POST',
    } );
  },

  FETCH_PROMO_NOTICE() {
    if ( isProLoaded ) {
      return null;
    }

    return apiFetch( {
      path: '/wp/v2/docs/promotion-notice',
    } );
  },
};

export default controls;
