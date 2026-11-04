import actions from './actions';

const resolvers = {
  *getSettings() {
    // Users who cannot manage settings got a 403 here on every docs screen;
    // keep the store defaults for them.
    if ( window.weDocsAdminVars && ! window.weDocsAdminVars.canManageSettings ) {
      return actions.setLoading( false );
    }

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

  *getRoles() {
    yield actions.setLoading( true );
    const roles = yield { type: 'FETCH_ROLES' };
    yield actions.setRoles( roles );
    return actions.setLoading( false );
  },

  *getTurnstileSiteKey() {
    yield actions.setLoading( true );
    const siteKey = yield { type: 'FETCH_SITE_KEY' };
    yield actions.setTurnstileSiteKey( siteKey );
    return actions.setLoading( false );
  },

  *getPromoNotice() {
    yield actions.setLoading( true );
    const promoNotice = yield { type: 'FETCH_PROMO_NOTICE' };
    yield actions.setPromoNotice( promoNotice );
    return actions.setLoading( false );
  },
};

export default resolvers;
