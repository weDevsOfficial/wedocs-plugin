const selectors = {
  getSettings( state ) {
    const { settings } = state;
    return settings;
  },

  getSettingsOption( state, option ) {
    const { settings } = state;
    return settings[ option ];
  },

  getRoles( state ) {
    const { roles } = state;
    return roles;
  },

  getLoading( state ) {
    const { loading } = state;
    return loading;
  },

  getWedocsVersion( state ) {
    const { wedocsVersion } = state;
    return wedocsVersion;
  },

  getUpgradeVersion( state ) {
    const { upgradeVersion } = state;
    return upgradeVersion;
  },

  getSaving( state ) {
    const { saving } = state;
    return saving;
  },
};

export default selectors;
