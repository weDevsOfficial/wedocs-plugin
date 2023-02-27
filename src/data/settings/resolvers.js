import actions from './actions';

const resolvers = {
  *getSettings() {
    yield actions.setLoading( true );
    const settings = yield { type: 'FETCH_SETTINGS' };
    yield actions.setSettings( settings );
    return actions.setLoading( false );
  },

  *getUpgradeInfo() {
    yield actions.setLoading( true );
    const needUpgrade = yield { type: 'FETCH_UPGRADE_INFO' };
    yield actions.setUpgradeInfo( needUpgrade );
    return actions.setLoading( false );
  },
};

export default resolvers;
