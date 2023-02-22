import actions from './actions';

const resolvers = {
  *getSettings() {
    yield actions.setLoading( true );
    const settings = yield { type: 'FETCH_SETTINGS' };
    yield actions.setSettings( settings );
    return actions.setLoading( false );
  },

  *getWedocsVersion() {
    yield actions.setLoading( true );
    const wedocsVersion = yield { type: 'FETCH_WEDOCS_VERSION' };
    yield actions.setWedocsVersion( wedocsVersion );
    return actions.setLoading( false );
  },

  *getUpgradeVersion() {
    yield actions.setLoading( true );
    const upgradeVersion = yield { type: 'FETCH_UPGRADE_VERSION' };
    yield actions.setUpgradeVersion( upgradeVersion );
    return actions.setLoading( false );
  },
};

export default resolvers;
