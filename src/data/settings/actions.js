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

  setMigrateInfo( needMigrate ) {
    return { type: 'SET_MIGRATE_INFO', needMigrate };
  },

  setSaving( saving ) {
    return { type: 'SET_SAVING', saving };
  },

  setRoles( roles ) {
    return { type: 'SET_ROLES', roles };
  },

  setTurnstileSiteKey( siteKey ) {
    return { type: 'SET_TURNSTILE_SITE_KEY', siteKey }
  },

  *updateSettings( data ) {
    const path = '/wp/v2/docs/settings';
    const response = yield { type: 'UPDATE_TO_API', path, data };
    yield actions.setSettings( response.data );
    return response.data;
  },

  *wedocsUpgrade( data ) {
    const path = '/wp/v2/docs/upgrade';
    const response = yield { type: 'UPDATE_TO_API', path, data };
    yield actions.setUpgradeInfo( false );
    return response;
  },

  *makeUpdateDone() {
    return yield { type: 'UPDATE_TO_API', path: '/wp/v2/docs/upgrade/done' };
  },
};

export default actions;
