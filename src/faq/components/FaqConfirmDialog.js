// DESCRIPTION: Reusable confirmation dialog for FAQ actions.
// Renders a modal with icon, title, message, and confirm/cancel buttons.

import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { Dialog, Transition } from '@headlessui/react';

const FaqConfirmDialog = ( {
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText,
    cancelText,
    confirmClassName,
    icon,
    isProcessing = false,
    processingText,
} ) => {
    return (
        <Transition appear show={ isOpen } as={ Fragment }>
            <Dialog as="div" className="wedocs-document relative z-[9999]" onClose={ onClose }>
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

                <div className="fixed inset-0 overflow-y-auto z-[9999]">
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
                            <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white py-6 px-8 text-left align-middle shadow-xl transition-all">
                                <div className="flex flex-col items-center text-center">
                                    { icon && (
                                        <div className="mb-4">
                                            { icon }
                                        </div>
                                    ) }

                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-semibold text-gray-900 mb-2"
                                    >
                                        { title }
                                    </Dialog.Title>

                                    { message && (
                                        <p className="text-sm text-gray-500 mb-6">
                                            { message }
                                        </p>
                                    ) }

                                    <div className="flex items-center space-x-3 w-full">
                                        <button
                                            className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-medium text-sm py-2.5 px-5 border border-gray-300 rounded-md transition-colors"
                                            onClick={ onClose }
                                            disabled={ isProcessing }
                                        >
                                            { cancelText || __( 'Cancel', 'wedocs' ) }
                                        </button>
                                        <button
                                            className={ `flex-1 font-medium text-sm py-2.5 px-5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${ confirmClassName || 'bg-indigo-600 hover:bg-indigo-700 text-white' }` }
                                            onClick={ onConfirm }
                                            disabled={ isProcessing }
                                        >
                                            { isProcessing
                                                ? ( processingText || __( 'Processing...', 'wedocs' ) )
                                                : confirmText
                                            }
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default FaqConfirmDialog;
