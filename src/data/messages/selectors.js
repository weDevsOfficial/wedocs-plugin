// DESCRIPTION: Redux selectors for the messages data store.
// Provides accessor functions for messages state.

const selectors = {
	getMessages( state ) {
		return state.messages;
	},

	getMessage( state ) {
		return state.message;
	},

	getMessagesLoading( state ) {
		return state.loading;
	},

	getMessagesMeta( state ) {
		return state.meta;
	},

	getMessagesError( state ) {
		return state.error;
	},
};

export default selectors;
