import actions from './actions';

const resolvers = {
	*getSettings() {
		yield actions.setLoading( true );
		const settings = yield { type: 'FETCH_SETTINGS' };
		yield actions.setSettings( settings );
		return actions.setLoading( false );
	},

	*getRoles() {
		yield actions.setLoading( true );
		const roles = yield { type: 'FETCH_ROLES' };
		yield actions.setRoles( roles );
		return actions.setLoading( false );
	},
};

export default resolvers;
