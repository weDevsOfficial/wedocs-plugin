import { __ } from '@wordpress/i18n';
import { Fragment, useState, useRef } from "@wordpress/element";
import { Dialog, Transition } from '@headlessui/react';

const ConfirmationModal = ( { className, children } ) => {
    const [ openModal, setOpenModal ] = useState( false );
    const cancelButtonRef = useRef( null );

    // const removeDocumentation = () => {
    //     dispatch( docsStore )
    //         .deleteDoc( docId )
    //         .then( ( result ) => {
    //             Swal.fire( {
    //                 title: __( 'Documentation Deleted', 'wedocs' ),
    //                 text: __(
    //                     'Documentation has been deleted successfully',
    //                     'wedocs'
    //                 ),
    //                 icon: 'success',
    //                 toast: true,
    //                 position: 'bottom-end',
    //                 showConfirmButton: false,
    //                 timer: 2000,
    //             } );
    //         } )
    //         .catch( ( err ) => {
    //             Swal.fire( {
    //                 title: __( 'Error', 'wedocs' ),
    //                 text: err.message,
    //                 icon: 'error',
    //                 toast: true,
    //                 position: 'bottom-end',
    //                 showConfirmButton: false,
    //                 timer: 3000,
    //             } );
    //         } );
    //
    //     setIsOpen( false );
    // };

    // const openModal = () => {
    //     setIsOpen( true );
    // };

    return (
        <>
            <button
                onClick={ () => setOpenModal( true ) }
                className={ className }
            >
                { children }
            </button>

            <Transition.Root show={ openModal } as={ Fragment }>
                <Dialog as="div" className="relative z-10" initialFocus={ cancelButtonRef } onClose={ setOpenModal } >
                    <Transition.Child
                        as={ Fragment }
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={ Fragment }
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                    <div>
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
                                            </svg>
                                        </div>
                                        <div className="mt-3 text-center sm:mt-5">
                                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                                Payment successful
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam laudantium explicabo
                                                    pariatur iste dolorem animi vitae error totam. At sapiente aliquam accusamus facere veritatis.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 space-x-4 text-center">
                                        <button
                                            className="bg-indigo-700 hover:bg-indigo-800 text-white font-medium text-base py-3 px-7 rounded-md"
                                        >
                                            { __(
                                                'Update',
                                                'wedocs'
                                            ) }
                                        </button>
                                        <button
                                            className="bg-white hover:bg-gray-200 text-gray-700 font-medium text-base py-3 px-7 border border-gray-300 rounded-md"
                                            onClick={ () => setOpenModal( false ) }
                                            ref={ cancelButtonRef }
                                        >
                                            { __(
                                                'Cancel',
                                                'wedocs'
                                            ) }
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}

export default ConfirmationModal;
