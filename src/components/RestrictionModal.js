import { __, sprintf } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import { Dialog, Transition } from '@headlessui/react';

const RestictionModal = ( { className, children, href } ) => {
	const [ isOpen, setIsOpen ] = useState( false );

	const closeModal = () => {
		setIsOpen( false );
	};

	const openModal = () => {
		setIsOpen( true );
	};

	return (
		<>
			<a
				href={ href || '#' }
				onClick={ openModal }
				className={ className }
			>
				{ children }
			</a>

			<Transition appear show={ isOpen } as={ Fragment }>
				<Dialog
					as="div"
					className="relative z-10"
					onClose={ closeModal }
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
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
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
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white py-6 px-9 align-middle shadow-xl transition-all">
									<div className="sm:flex sm:items-start">
										<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="20"
												height="18"
												fill="none"
												className="text-red-600"
											>
												<path
													d="M10 7v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L11.732 2C10.962.667 9.037.667 8.268 2L1.339 14c-.77 1.333.192 3 1.732 3z"
													stroke="#dc2626"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</div>
										<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
											<Dialog.Title
												as="h3"
												className="text-lg font-medium text-gray-900 mb-2"
											>
												{ __(
													'Restrict Edit access for Admins only',
													'wedocs'
												) }
											</Dialog.Title>
											<p className="text-gray-500 text-base">
												{ __(
													'Are you sure to restrict the editing access for this doc to admin only? When restrictions are applied, only Admins can edit the article',
													'wedocs'
												) }
											</p>

											<div className="mt-6 space-x-3.5 text-right">
												<button
													className="bg-white hover:bg-gray-200 text-gray-700 font-medium text-base py-2 px-5 border border-gray-300 rounded-md"
													onClick={ closeModal }
												>
													{ __(
														'Cancel',
														'wedocs'
													) }
												</button>
												<button
													className="bg-red-600 hover:bg-indigo-800 text-white font-medium text-base py-2 px-5 rounded-md"
													onClick={ closeModal }
												>
													{ __(
														"I'm Sure",
														'wedocs'
													) }
												</button>
											</div>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default RestictionModal;
