import { __ } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import { Dialog, Transition } from '@headlessui/react';
import { dispatch, useSelect } from '@wordpress/data';
import settingsStore from '../data/settings';
import Swal from 'sweetalert2';

const ConfirmationModal = ( { className, children } ) => {
  const [ openModal, setOpenModal ] = useState( false );

  const { need_upgrade, status } = useSelect(
    ( select ) => select( settingsStore ).getUpgradeInfo(),
    []
  );

  const handleUpgraderClick = () => {
    dispatch( settingsStore )
      .wedocsUpgrade( { upgrade: need_upgrade } )
      .then( ( result ) => {
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
      <button disabled={ status === 'running' } onClick={ () => setOpenModal( true ) } className={ className }>
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
                        <path
                          d="M13.085 4.491c0 1.928-1.542 3.491-3.443 3.491S6.199 6.419 6.199 4.491 7.741 1 9.642 1s3.443 1.563 3.443 3.491z"
                          stroke="#4f46e5"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                        <mask id="A" fill="#fff">
                          <path
                            fillRule="evenodd"
                            d="M14.997 16.756a3.45 3.45 0 0 0 2.983-.995 3.57 3.57 0 0 0 0-4.996 3.45 3.45 0 0 0-4.927 0 3.56 3.56 0 0 0-.981 3.026L10.05 15.84c-.123.124-.192.293-.192.469v2.03c0 .366.293.662.653.662h2.002a.65.65 0 0 0 .462-.194l2.022-2.05zm-.045-1.36c-.225-.061-.465.004-.63.171l-2.079 2.108h-1.079v-1.094l2.079-2.108a.67.67 0 0 0 .169-.638c-.193-.737-.006-1.556.564-2.135a2.16 2.16 0 0 1 3.081 0c.85.863.85 2.262 0 3.124a2.16 2.16 0 0 1-2.105.572z"
                          />
                        </mask>
                        <g fill="#4f46e5">
                          <path
                            fillRule="evenodd"
                            d="M14.997 16.756a3.45 3.45 0 0 0 2.983-.995 3.57 3.57 0 0 0 0-4.996 3.45 3.45 0 0 0-4.927 0 3.56 3.56 0 0 0-.981 3.026L10.05 15.84c-.123.124-.192.293-.192.469v2.03c0 .366.293.662.653.662h2.002a.65.65 0 0 0 .462-.194l2.022-2.05zm-.045-1.36c-.225-.061-.465.004-.63.171l-2.079 2.108h-1.079v-1.094l2.079-2.108a.67.67 0 0 0 .169-.638c-.193-.737-.006-1.556.564-2.135a2.16 2.16 0 0 1 3.081 0c.85.863.85 2.262 0 3.124a2.16 2.16 0 0 1-2.105.572z"
                          />
                          <path
                            d="M14.997 16.756l.591-3.882-1.98-.302-1.407 1.426 2.796 2.757zm2.983-5.991l-2.797 2.757.002.002 2.795-2.758zm-5.909 3.026l2.795 2.758 1.376-1.395-.287-1.938-3.885.575zM10.05 15.84l-2.795-2.758h-.001l2.796 2.758zm4.902-.443l-1.028 3.79.006.002 1.022-3.792zm-2.709 2.28v3.927h1.643l1.153-1.17-2.796-2.757zm-1.079 0H7.237v3.927h3.927v-3.927zm0-1.094l-2.796-2.758-1.131 1.147v1.611h3.927zm2.248-2.747l-3.799.996.001.005 3.797-1.001zm3.645-2.135l2.797-2.756-.003-.003-2.795 2.759zm-2.651 8.938c2.255.343 4.644-.369 6.37-2.12l-5.592-5.515a.48.48 0 0 1 .404-.13l-1.182 7.764zm6.37-2.12a7.5 7.5 0 0 0-.001-10.512l-5.59 5.517c-.081-.082-.112-.184-.112-.261a.38.38 0 0 1 .111-.259l5.592 5.515zm.001-10.51a7.38 7.38 0 0 0-10.52-.001l5.592 5.515c-.177.18-.486.181-.666-.001l5.594-5.513zm-10.52-.001c-1.722 1.746-2.4 4.13-2.07 6.358l7.769-1.15c.013.086-.01.208-.107.307l-5.592-5.515zm-.981 3.025l-2.022 2.049 5.591 5.516 2.022-2.049-5.591-5.516zm-2.022 2.05c-.853.865-1.323 2.027-1.323 3.226h7.854a3.26 3.26 0 0 1-.939 2.289l-5.592-5.515zm-1.323 3.226v2.03h7.854v-2.03H5.931zm0 2.03c0 2.483 1.999 4.589 4.58 4.589v-7.854a3.27 3.27 0 0 1 3.274 3.265H5.931zm4.58 4.589h2.002v-7.854h-2.002v7.854zm2.002 0c1.232 0 2.403-.497 3.258-1.364l-5.592-5.515a3.28 3.28 0 0 1 2.334-.975v7.854zm3.258-1.364l2.022-2.05-5.592-5.515-2.022 2.05 5.592 5.515zm.208-9.957c-1.603-.435-3.302.036-4.453 1.204l5.592 5.515a3.28 3.28 0 0 1-3.194.861l2.056-7.58zm-4.453 1.204l-2.079 2.108 5.592 5.515 2.079-2.108-5.592-5.515zm.717.939h-1.079v7.854h1.079v-7.854zm2.848 3.927v-1.094H7.237v1.094h7.854zm-1.131 1.664l2.079-2.108-5.592-5.515-2.079 2.108 5.592 5.515zm2.079-2.108c1.146-1.162 1.582-2.837 1.17-4.397l-7.594 2.003a3.26 3.26 0 0 1 .832-3.121l5.592 5.515zm1.172-4.392c.14.533.014 1.16-.438 1.619l-5.592-5.515a6.16 6.16 0 0 0-1.567 5.888l7.597-1.992zm-.438 1.619a1.77 1.77 0 0 1-2.51.001l5.589-5.518c-2.387-2.418-6.283-2.42-8.671.001l5.592 5.515zm-2.513-.002c-.655-.665-.658-1.722.001-2.39l5.592 5.515a6.16 6.16 0 0 0 .002-8.637l-5.595 5.512zm.001-2.39c.46-.466 1.125-.62 1.713-.462l-2.044 7.583c2.042.55 4.323.017 5.924-1.606l-5.592-5.515z"
                            mask="url(#A)"
                          />
                        </g>
                        <mask id="B" fill="#fff">
                          <path
                            fillRule="evenodd"
                            d="M14.85 13.939a.97.97 0 0 1 0-1.353c.368-.373.966-.373 1.335 0a.97.97 0 0 1 0 1.353c-.368.373-.966.373-1.335 0z"
                          />
                        </mask>
                        <g fill="#4f46e5">
                          <path
                            fillRule="evenodd"
                            d="M14.85 13.939a.97.97 0 0 1 0-1.353c.368-.373.966-.373 1.335 0a.97.97 0 0 1 0 1.353c-.368.373-.966.373-1.335 0z"
                          />
                          <path
                            d="M17.646 11.182a2.96 2.96 0 0 1 0 4.161l-5.592-5.515c-1.876 1.902-1.876 4.966 0 6.868l5.592-5.515zm0 4.161c-1.17 1.186-3.088 1.186-4.257 0l5.592-5.515c-1.906-1.933-5.021-1.933-6.927 0l5.592 5.515zm-4.257 0a2.96 2.96 0 0 1 0-4.161l5.592 5.515c1.876-1.903 1.876-4.966 0-6.868l-5.592 5.515zm0-4.161c1.17-1.186 3.088-1.186 4.257 0l-5.592 5.515c1.906 1.933 5.021 1.933 6.927 0l-5.592-5.515z"
                            mask="url(#B)"
                          />
                        </g>
                        <path
                          d="M8.214 17.482H2a1 1 0 0 1-1-1v-1.278c0-.11.016-.219.061-.319.551-1.227 3.026-3.41 9.179-3.41"
                          stroke="#4f46e5"
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
                          onClick={ handleUpgraderClick }
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

export default ConfirmationModal;
