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

  setWedocsVersion( wedocsVersion ) {
    return { type: 'SET_WEDOCS_VERSION', wedocsVersion };
  },

  setUpgradeVersion( upgradeVersion ) {
    return { type: 'SET_UPGRADE_VERSION', upgradeVersion };
  },

  setSaving( saving ) {
    return { type: 'SET_SAVING', saving };
  },

  *updateSettings( data ) {
    const path = '/wp/v2/docs/settings';
    const response = yield { type: 'UPDATE_TO_API', path, data };
    yield actions.setSettings( response );
    return response;
  },

  *wedocsUpgrade( data ) {
    const path = '/wp/v2/docs/settings';
    const response = yield { type: 'UPDATE_TO_API', path, data };
    yield actions.setWedocsVersion( response );
    return response;
  },
};

export default actions;
