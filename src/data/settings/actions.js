const actions = {
  setSettings( settings ) {
    return { type: 'SET_SETTINGS', settings };
  },

  setSettingsOption( option, value ) {
    return { type: 'SET_SETTINGS_OPTION', option, value };
  },

  setLoading( loading ) {
    return { type: 'SET_LOADING', loading };
  },

  setUpgradeInfo( needUpgrade ) {
    return { type: 'SET_UPGRADE_INFO', needUpgrade };
  },

  setSaving( saving ) {
    return { type: 'SET_SAVING', saving };
  },

  setRoles( roles ) {
    return { type: 'SET_ROLES', roles };
  },

  *updateSettings( data ) {
    const path = '/wp/v2/docs/settings';
    const response = yield { type: 'UPDATE_TO_API', path, data };
    yield actions.setSettings( response );
    return response;
  },

  *wedocsUpgrade( data ) {
    const path = '/wp/v2/docs/upgrade';
    const response = yield { type: 'UPDATE_TO_API', path, data };
    yield actions.setUpgradeInfo( false );
    return response;
  },
};

export default actions;
