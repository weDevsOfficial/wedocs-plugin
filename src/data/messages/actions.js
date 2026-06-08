// DESCRIPTION: Redux store actions for the messages data store.
// Provides synchronous setters and async generators for CRUD operations.

const actions = {
	setMessages( messages ) {
		return { type: 'SET_MESSAGES', messages };
	},

	setMessage( message ) {
		return { type: 'SET_MESSAGE', message };
	},

	setMessagesLoading( loading ) {
		return { type: 'SET_MESSAGES_LOADING', loading };
	},

	setMessagesMeta( meta ) {
		return { type: 'SET_MESSAGES_META', meta };
	},

	removeMessage( messageId ) {
		return { type: 'REMOVE_MESSAGE', messageId };
	},

	setMessagesError( error ) {
		return { type: 'SET_MESSAGES_ERROR', error };
	},

	fetchFromAPI( path ) {
		return { type: 'FETCH_FROM_API', path };
	},

	*fetchMessages( page = 1, perPage = 20, search = '', source = '' ) {
		yield actions.setMessagesLoading( true );

		let path = `/wp/v2/docs/messages?page=${ page }&per_page=${ perPage }`;
		if ( search ) {
			path += `&search=${ encodeURIComponent( search ) }`;
		}
		if ( source ) {
			path += `&source=${ encodeURIComponent( source ) }`;
		}

		const response = yield actions.fetchFromAPI( path );

		yield actions.setMessages( response.messages );
		yield actions.setMessagesMeta( {
			total: response.total,
			totalPages: response.total_pages,
		} );

		return actions.setMessagesLoading( false );
	},

	*fetchMessage( id ) {
		yield actions.setMessagesLoading( true );

		const path = `/wp/v2/docs/messages/${ id }`;
		const response = yield actions.fetchFromAPI( path );
		yield actions.setMessage( response );

		return actions.setMessagesLoading( false );
	},

	*deleteMessage( messageId ) {
		const path = `/wp/v2/docs/messages/${ messageId }`;
		yield { type: 'DELETE_TO_API', path };
		return actions.removeMessage( messageId );
	},
};

export default actions;
