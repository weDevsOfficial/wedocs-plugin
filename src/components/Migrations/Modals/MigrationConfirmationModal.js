import { __ } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import { Dialog, Transition } from '@headlessui/react';
import { dispatch, useSelect } from '@wordpress/data';
import settingsStore from '../../../data/settings';
import Swal from 'sweetalert2';

const MigrationConfirmationModal = ( { className, children } ) => {
    const [ openModal, setOpenModal ] = useState( false );

    const { need_migrate, status } = useSelect(
        ( select ) => select( settingsStore ).getMigrateInfo(),
        []
    );

    const handleMigrateClick = () => {
        dispatch( settingsStore )
            .wedocsMigrate( { migrate: need_migrate } )
            .then( ( response ) => {
                setOpenModal( false );
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

    return (
        <>
            <button
                className={ className }
                disabled={ status === 'running' }
                onClick={ () => setOpenModal( true ) }
            >
                { children }
            </button>

            <Transition appear show={ openModal } as={ Fragment }>
                <Dialog
                    as="div"
                    className="relative z-[9999]"
                    onClose={ () => setOpenModal( false ) }
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
                                <Dialog.Panel className="w-[512px] transform overflow-hidden rounded-2xl bg-white py-6 px-9 align-middle shadow-xl transition-all">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#E7E6FF] sm:mx-0 sm:h-10 sm:w-10">
                                            <svg width="19" height="19" fill="none">
                                                <path d="M13.085 4.491c0 1.928-1.542 3.491-3.443 3.491S6.199 6.419 6.199 4.491 7.741 1 9.642 1s3.443 1.563 3.443 3.491z" stroke="#4f46e5" strokeWidth="2" strokeLinejoin="round"></path>
                                                <mask id="A" fill="#fff">
                                                    <path fillRule="evenodd" d="M14.997 16.756a3.45 3.45 0 0 0 2.983-.995 3.57 3.57 0 0 0 0-4.996 3.45 3.45 0 0 0-4.927 0 3.56 3.56 0 0 0-.981 3.026L10.05 15.84c-.123.124-.192.293-.192.469v2.03c0 .366.293.662.653.662h2.002a.65.65 0 0 0 .462-.194l2.022-2.05zm-.045-1.36c-.225-.061-.465.004-.63.171l-2.079 2.108h-1.079v-1.094l2.079-2.108a.67.67 0 0 0 .169-.638c-.193-.737-.006-1.556.564-2.135a2.16 2.16 0 0 1 3.081 0c.85.863.85 2.262 0 3.124a2.16 2.16 0 0 1-2.105.572z"></path>
                                                </mask>
                                                <g fill="#4f46e5">
                                                    <path fillRule="evenodd" d="M14.997 16.756a3.45 3.45 0 0 0 2.983-.995 3.57 3.57 0 0 0 0-4.996 3.45 3.45 0 0 0-4.927 0 3.56 3.56 0 0 0-.981 3.026L10.05 15.84c-.123.124-.192.293-.192.469v2.03c0 .366.293.662.653.662h2.002a.65.65 0 0 0 .462-.194l2.022-2.05zm-.045-1.36c-.225-.061-.465.004-.63.171l-2.079 2.108h-1.079v-1.094l2.079-2.108a.67.67 0 0 0 .169-.638c-.193-.737-.006-1.556.564-2.135a2.16 2.16 0 0 1 3.081 0c.85.863.85 2.262 0 3.124a2.16 2.16 0 0 1-2.105.572z"></path>
                                                </g>
                                                <mask id="B" fill="#fff">
                                                    <path fillRule="evenodd" d="M14.85 13.939a.97.97 0 0 1 0-1.353c.368-.373.966-.373 1.335 0a.97.97 0 0 1 0 1.353c-.368.373-.966.373-1.335 0z"></path>
                                                </mask>
                                                <g fill="#4f46e5">
                                                    <path fillRule="evenodd" d="M14.85 13.939a.97.97 0 0 1 0-1.353c.368-.373.966-.373 1.335 0a.97.97 0 0 1 0 1.353c-.368.373-.966.373-1.335 0z"></path>
                                                    <path d="M17.646 11.182a2.96 2.96 0 0 1 0 4.161l-5.592-5.515c-1.876 1.902-1.876 4.966 0 6.868l5.592-5.515zm0 4.161c-1.17 1.186-3.088 1.186-4.257 0l5.592-5.515c-1.906-1.933-5.021-1.933-6.927 0l5.592 5.515zm-4.257 0a2.96 2.96 0 0 1 0-4.161l5.592 5.515c1.876-1.903 1.876-4.966 0-6.868l-5.592 5.515zm0-4.161c1.17-1.186 3.088-1.186 4.257 0l-5.592 5.515c1.906 1.933 5.021 1.933 6.927 0l-5.592-5.515z" mask="url(#B)"></path>
                                                </g>
                                                <path d="M8.214 17.482H2a1 1 0 0 1-1-1v-1.278c0-.11.016-.219.061-.319.551-1.227 3.026-3.41 9.179-3.41" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </svg>
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-medium text-gray-900 mb-2"
                                            >
                                                { __( 'Are you sure?', 'wedocs' ) }
                                            </Dialog.Title>
                                            <p className="text-gray-500 text-base">
                                                { __(
                                                    'We recommend backing up your database before upgrading to ensure your data is safe. Are you sure you want to run the upgrade now?',
                                                    'wedocs'
                                                ) }
                                            </p>

                                            <div className="mt-6 space-x-3.5 text-right">
                                                <button
                                                    className="bg-white hover:bg-gray-200 text-gray-700 font-medium text-base py-2 px-5 border border-gray-300 rounded-md"
                                                    onClick={ () => setOpenModal( false ) }
                                                >
                                                    { __( 'Cancel', 'wedocs' ) }
                                                </button>
                                                <button
                                                    className="bg-indigo-700 hover:bg-indigo-800 text-white font-medium text-base py-2 px-5 rounded-md"
                                                    onClick={ handleMigrateClick }
                                                >
                                                    { __( "I'm sure", 'wedocs' ) }
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

export default MigrationConfirmationModal;
