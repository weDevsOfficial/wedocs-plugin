const selectors = {
  getSettings( state ) {
    const { settings } = state;
    return settings;
  },

  getSettingsOption( state, option ) {
    const { settings } = state;
    return settings[ option ];
  },

  getGeneralSettingsOption( state, option ) {
    const { settings } = state;
    return settings?.general?.[ option ];
  },

  getPermissionSettingsOption( state, option ) {
    const { settings } = state;
    return settings?.permission?.[ option ];
  },

  getAssistantSettingsOption( state, option ) {
    const { settings } = state;
    return settings?.assistant?.[ option ];
  },

  getRoles( state ) {
    const { roles } = state;
    return roles;
  },

  getLoading( state ) {
    const { loading } = state;
    return loading;
  },

  getUpgradeInfo( state ) {
    const { needUpgrade } = state;
    return needUpgrade;
  },

  getSaving( state ) {
    const { saving } = state;
    return saving;
  },

  getTurnstileSiteKey( state ) {
    const { settings } = state;
    return settings?.assistant?.message?.turnstile_site_key;
  },
};

export default selectors;
