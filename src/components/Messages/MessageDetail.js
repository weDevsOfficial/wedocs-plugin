// DESCRIPTION: Modal component for displaying full details of a single message.
// Shows all message fields including name, email, subject, body, and metadata.

import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { Dialog, Transition } from '@headlessui/react';

const MessageDetail = ( { message, isOpen, onClose } ) => {
	if ( ! message ) {
		return null;
	}

	const formatDate = ( dateString ) => {
		const date = new Date( dateString );
		return date.toLocaleString();
	};

	return (
		<Transition appear show={ isOpen } as={ Fragment }>
			<Dialog
				as="div"
				className="wedocs-document relative z-[9999]"
				onClose={ onClose }
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
							<Dialog.Panel className="w-[640px] transform overflow-hidden rounded-2xl bg-white py-6 px-9 align-middle shadow-xl transition-all">
								<Dialog.Title
									as="h3"
									className="text-lg font-medium text-gray-900 mb-4 flex items-center justify-between"
								>
									<span>{ __( 'Message Details', 'wedocs' ) }</span>
									<button
										onClick={ onClose }
										className="text-gray-400 hover:text-gray-600 cursor-pointer"
									>
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 2 } stroke="currentColor" className="w-5 h-5">
											<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
										</svg>
									</button>
								</Dialog.Title>

								<div className="space-y-4">
									<div className="grid grid-cols-2 gap-4">
										<div>
											<label className="block text-sm font-medium text-gray-500 mb-1">
												{ __( 'Name', 'wedocs' ) }
											</label>
											<p className="text-sm text-gray-900">{ message.name }</p>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-500 mb-1">
												{ __( 'Email', 'wedocs' ) }
											</label>
											<p className="text-sm text-gray-900">
												<a href={ `mailto:${ message.email }` } className="text-indigo-600 hover:text-indigo-800">
													{ message.email }
												</a>
											</p>
										</div>
									</div>

									{ message.subject && (
										<div>
											<label className="block text-sm font-medium text-gray-500 mb-1">
												{ __( 'Subject', 'wedocs' ) }
											</label>
											<p className="text-sm text-gray-900">{ message.subject }</p>
										</div>
									) }

									<div>
										<label className="block text-sm font-medium text-gray-500 mb-1">
											{ __( 'Message', 'wedocs' ) }
										</label>
										<p className="text-sm text-gray-900 whitespace-pre-wrap bg-gray-50 rounded-md p-3">
											{ message.message }
										</p>
									</div>

									<div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200">
										<div>
											<label className="block text-sm font-medium text-gray-500 mb-1">
												{ __( 'Source', 'wedocs' ) }
											</label>
											<span className={ `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${ message.source === 'widget' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800' }` }>
												{ message.source === 'widget' ? __( 'Widget', 'wedocs' ) : __( 'Modal', 'wedocs' ) }
											</span>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-500 mb-1">
												{ __( 'Date', 'wedocs' ) }
											</label>
											<p className="text-sm text-gray-900">{ formatDate( message.submitted_at ) }</p>
										</div>
									</div>

									<div className="grid grid-cols-2 gap-4">
										{ message.recipients && (
											<div>
												<label className="block text-sm font-medium text-gray-500 mb-1">
													{ __( 'Recipients', 'wedocs' ) }
												</label>
												<p className="text-sm text-gray-900">{ message.recipients }</p>
											</div>
										) }
										{ message.ip_address && (
											<div>
												<label className="block text-sm font-medium text-gray-500 mb-1">
													{ __( 'IP Address', 'wedocs' ) }
												</label>
												<p className="text-sm text-gray-900">{ message.ip_address }</p>
											</div>
										) }
									</div>

									{ parseInt( message.doc_id ) > 0 && (
										<div>
											<label className="block text-sm font-medium text-gray-500 mb-1">
												{ __( 'Related Doc', 'wedocs' ) }
											</label>
											<a
												href={ `${ window.weDocsAdminVars?.adminUrl }post.php?action=edit&post=${ message.doc_id }` }
												target="_blank"
												rel="noopener noreferrer"
												className="text-sm text-indigo-600 hover:text-indigo-800"
											>
												{ __( 'View Doc #', 'wedocs' ) }{ message.doc_id }
											</a>
										</div>
									) }

									{ message.attachment_url && (
										<div>
											<label className="block text-sm font-medium text-gray-500 mb-1">
												{ __( 'Attachment', 'wedocs' ) }
											</label>
											<a
												href={ message.attachment_url }
												target="_blank"
												rel="noopener noreferrer"
												className="text-sm text-indigo-600 hover:text-indigo-800"
											>
												{ __( 'View Attachment', 'wedocs' ) }
											</a>
										</div>
									) }
								</div>

								<div className="mt-6 text-right">
									<button
										className="bg-white hover:bg-gray-200 text-gray-700 font-medium text-sm py-2 px-5 border border-gray-300 rounded-md cursor-pointer"
										onClick={ onClose }
									>
										{ __( 'Close', 'wedocs' ) }
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default MessageDetail;
