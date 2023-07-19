import apiFetch from '@wordpress/api-fetch';

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

  UPDATE_TO_API( action ) {
    return apiFetch( {
      path: action.path,
      data: action.data,
      method: 'POST',
    } );
  },
};

export default controls;
