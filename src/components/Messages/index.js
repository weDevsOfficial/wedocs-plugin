// DESCRIPTION: Admin page component for listing and managing stored messages.
// Provides a paginated table view with search, detail view, and delete actions.

import { __ } from '@wordpress/i18n';
import { useState, useEffect, Fragment } from '@wordpress/element';
import { useSelect, dispatch } from '@wordpress/data';
import { Dialog, Transition } from '@headlessui/react';
import { MESSAGES_STORE } from '../../data/messages';
import MessageDetail from './MessageDetail';
import Swal from 'sweetalert2';

const Messages = () => {
	const messages = useSelect(
		( select ) => select( MESSAGES_STORE ).getMessages(),
		[]
	);

	const loading = useSelect(
		( select ) => select( MESSAGES_STORE ).getMessagesLoading(),
		[]
	);

	const meta = useSelect(
		( select ) => select( MESSAGES_STORE ).getMessagesMeta(),
		[]
	);

	const [ currentPage, setCurrentPage ] = useState( 1 );
	const [ searchValue, setSearchValue ] = useState( '' );
	const [ sourceFilter, setSourceFilter ] = useState( '' );
	const [ selectedMessage, setSelectedMessage ] = useState( null );
	const [ deleteModalOpen, setDeleteModalOpen ] = useState( false );
	const [ messageToDelete, setMessageToDelete ] = useState( null );
	const [ apiError, setApiError ] = useState( null );
	const perPage = 20;

	useEffect( () => {
		setApiError( null );
		dispatch( MESSAGES_STORE )
			.fetchMessages( currentPage, perPage, searchValue, sourceFilter )
			.catch( ( err ) => {
				dispatch( MESSAGES_STORE ).setMessagesLoading( false );
				setApiError( err.message || __( 'Failed to load messages.', 'wedocs' ) );
			} );
	}, [ currentPage, sourceFilter ] );

	const handleSearch = ( event ) => {
		event.preventDefault();
		setCurrentPage( 1 );
		setApiError( null );
		dispatch( MESSAGES_STORE )
			.fetchMessages( 1, perPage, searchValue, sourceFilter )
			.catch( ( err ) => {
				console.error( 'weDocs Messages: Failed to search messages', err );
				dispatch( MESSAGES_STORE ).setMessagesLoading( false );
				setApiError( err.message || __( 'Failed to load messages.', 'wedocs' ) );
			} );
	};

	const handleDelete = () => {
		if ( ! messageToDelete ) {
			return;
		}

		dispatch( MESSAGES_STORE )
			.deleteMessage( messageToDelete.id )
			.then( () => {
				setDeleteModalOpen( false );
				setMessageToDelete( null );
				Swal.fire( {
					title: __( 'Deleted', 'wedocs' ),
					text: __( 'Message deleted successfully.', 'wedocs' ),
					icon: 'success',
					toast: true,
					position: 'bottom-end',
					showConfirmButton: false,
					timer: 3000,
				} );
			} )
			.catch( ( err ) => {
				Swal.fire( {
					title: __( 'Error', 'wedocs' ),
					text: err.message,
					icon: 'error',
					toast: true,
					position: 'bottom-end',
					showConfirmButton: false,
					timer: 3000,
				} );
			} );
	};

	const openDeleteModal = ( message ) => {
		setMessageToDelete( message );
		setDeleteModalOpen( true );
	};

	const formatDate = ( dateString ) => {
		const date = new Date( dateString );
		return date.toLocaleDateString();
	};

	const truncateText = ( text, maxLength = 60 ) => {
		if ( ! text ) {
			return '';
		}
		return text.length > maxLength ? text.substring( 0, maxLength ) + '...' : text;
	};

	return (
		<div className="wedocs-messages-page p-8">
			<div className="mb-6 flex items-center justify-between">
				<h1 className="text-2xl font-bold text-gray-900">
					{ __( 'Messages', 'wedocs' ) }
				</h1>
				<span className="text-sm text-gray-500">
					{ meta.total > 0 && (
						<>{ meta.total } { meta.total === 1 ? __( 'message', 'wedocs' ) : __( 'messages', 'wedocs' ) }</>
					) }
				</span>
			</div>

			{ /* Search and filters */ }
			<div className="mb-4 flex items-center gap-3">
				<form onSubmit={ handleSearch } className="flex items-center gap-2">
					<input
						type="text"
						placeholder={ __( 'Search messages...', 'wedocs' ) }
						value={ searchValue }
						onChange={ ( e ) => setSearchValue( e.target.value ) }
						className="!border !border-gray-300 !rounded-md !px-3 !py-2 text-sm text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
					/>
					<button
						type="submit"
						className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded-md cursor-pointer"
					>
						{ __( 'Search', 'wedocs' ) }
					</button>
				</form>
				<select
					value={ sourceFilter }
					onChange={ ( e ) => {
						setSourceFilter( e.target.value );
						setCurrentPage( 1 );
					} }
					className="!border !border-gray-300 !rounded-md !px-3 !py-2 text-sm text-gray-700 w-[10rem]"
				>
					<option value="">{ __( 'All Sources', 'wedocs' ) }</option>
					<option value="modal">{ __( 'Modal', 'wedocs' ) }</option>
					<option value="widget">{ __( 'Widget', 'wedocs' ) }</option>
				</select>
			</div>

			{ /* Error message */ }
			{ apiError && (
				<div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
					<div className="flex items-start">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0">
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
						</svg>
						<p className="text-sm text-red-700">{ apiError }</p>
					</div>
				</div>
			) }

			{ /* Messages table */ }
			<div className="bg-white rounded-lg shadow overflow-hidden">
				{ loading ? (
					<div className="p-8 text-center text-gray-500">
						{ __( 'Loading messages...', 'wedocs' ) }
					</div>
				) : messages.length === 0 ? (
					<div className="p-8 text-center text-gray-500">
						{ __( 'No messages found.', 'wedocs' ) }
					</div>
				) : (
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									{ __( 'Name', 'wedocs' ) }
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									{ __( 'Email', 'wedocs' ) }
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									{ __( 'Subject', 'wedocs' ) }
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									{ __( 'Message', 'wedocs' ) }
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									{ __( 'Source', 'wedocs' ) }
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									{ __( 'Date', 'wedocs' ) }
								</th>
								<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
									{ __( 'Actions', 'wedocs' ) }
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{ messages.map( ( message ) => (
								<tr
									key={ message.id }
									className="hover:bg-gray-50 cursor-pointer"
									onClick={ () => setSelectedMessage( message ) }
								>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{ message.name }
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{ message.email }
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{ truncateText( message.subject, 30 ) || '—' }
									</td>
									<td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
										{ truncateText( message.message ) }
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span className={ `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${ message.source === 'widget' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800' }` }>
											{ message.source === 'widget' ? __( 'Widget', 'wedocs' ) : __( 'Modal', 'wedocs' ) }
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{ formatDate( message.submitted_at ) }
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-right text-sm">
										<button
											onClick={ ( e ) => {
												e.stopPropagation();
												openDeleteModal( message );
											} }
											className="text-red-600 hover:text-red-800 cursor-pointer"
											title={ __( 'Delete', 'wedocs' ) }
										>
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-5 h-5">
												<path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
											</svg>
										</button>
									</td>
								</tr>
							) ) }
						</tbody>
					</table>
				) }
			</div>

			{ /* Pagination */ }
			{ meta.totalPages > 1 && (
				<div className="mt-4 flex items-center justify-between">
					<p className="text-sm text-gray-500">
						{ __( 'Page', 'wedocs' ) } { currentPage } { __( 'of', 'wedocs' ) } { meta.totalPages }
					</p>
					<div className="flex gap-2">
						<button
							disabled={ currentPage <= 1 }
							onClick={ () => setCurrentPage( currentPage - 1 ) }
							className="bg-white hover:bg-gray-100 text-gray-700 text-sm font-medium py-2 px-4 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
						>
							{ __( 'Previous', 'wedocs' ) }
						</button>
						<button
							disabled={ currentPage >= meta.totalPages }
							onClick={ () => setCurrentPage( currentPage + 1 ) }
							className="bg-white hover:bg-gray-100 text-gray-700 text-sm font-medium py-2 px-4 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
						>
							{ __( 'Next', 'wedocs' ) }
						</button>
					</div>
				</div>
			) }

			{ /* Message detail modal */ }
			<MessageDetail
				message={ selectedMessage }
				isOpen={ !! selectedMessage }
				onClose={ () => setSelectedMessage( null ) }
			/>

			{ /* Delete confirmation modal */ }
			<Transition appear show={ deleteModalOpen } as={ Fragment }>
				<Dialog
					as="div"
					className="wedocs-document relative z-[9999]"
					onClose={ () => setDeleteModalOpen( false ) }
				>
					<Transition.Child
						as={ Fragment }
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25 z-[50]" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto z-[100]">
						<div className="flex min-h-full items-center justify-center p-4">
							<Transition.Child
								as={ Fragment }
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-[440px] transform overflow-hidden rounded-2xl bg-white py-6 px-9 align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium text-gray-900 mb-2"
									>
										{ __( 'Delete Message', 'wedocs' ) }
									</Dialog.Title>
									<p className="text-gray-500 text-sm mb-6">
										{ __( 'Are you sure you want to delete this message? This action cannot be undone.', 'wedocs' ) }
									</p>
									<div className="flex justify-end gap-3">
										<button
											className="bg-white hover:bg-gray-200 text-gray-700 font-medium text-sm py-2 px-5 border border-gray-300 rounded-md cursor-pointer"
											onClick={ () => setDeleteModalOpen( false ) }
										>
											{ __( 'Cancel', 'wedocs' ) }
										</button>
										<button
											className="bg-red-600 hover:bg-red-700 text-white font-medium text-sm py-2 px-5 rounded-md cursor-pointer"
											onClick={ handleDelete }
										>
											{ __( 'Delete', 'wedocs' ) }
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
};

export default Messages;
