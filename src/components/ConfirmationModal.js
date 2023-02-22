import { __ } from '@wordpress/i18n';
import { Fragment, useState, useRef } from '@wordpress/element';
import { Dialog, Transition } from '@headlessui/react';
import { dispatch, useSelect } from '@wordpress/data';
import settingsStore from '../data/settings';
import Swal from 'sweetalert2';

const ConfirmationModal = ( { className, children } ) => {
  const [ openModal, setOpenModal ] = useState( false );
  const cancelButtonRef = useRef( null );

  const upgradeVersion = useSelect(
    ( select ) => select( settingsStore ).getUpgradeVersion(),
    []
  );

  const handleUpgraderClick = () => {
    dispatch( settingsStore )
      .wedocsUpgrade( { upgrade: upgradeVersion } )
      .then( ( result ) => {
        Swal.fire( {
          title: __( 'Database Upgraded', 'wedocs' ),
          text: __( 'Wedocs database has been upgrade successfully', 'wedocs' ),
          icon: 'success',
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 2000,
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

  return (
    <>
      <button onClick={ () => setOpenModal( true ) } className={ className }>
        { children }
      </button>

      <Transition appear show={ openModal } as={ Fragment }>
        <Dialog
          as="div"
          className="relative z-50"
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
                <Dialog.Panel className="w-[512px] transform overflow-hidden rounded-2xl bg-white py-7 px-9 align-middle shadow-xl transition-all">
                  <div className="mx-auto mb-6 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-500 text-white sm:h-10 sm:w-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
                      />
                    </svg>
                  </div>
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-center">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium text-gray-900 mb-2"
                      >
                        { __( 'Upgrade Wedocs Database', 'wedocs' ) }
                      </Dialog.Title>
                      <p className="text-gray-500 text-base">
                        { __(
                          'Are you sure to restrict the editing access for this doc to admin only? When restrictions are applied, only Admins can edit the article',
                          'wedocs'
                        ) }
                      </p>

                      <div className="mt-6 space-x-3.5 text-center">
                        <button
                          className="bg-indigo-700 hover:bg-indigo-800 text-white font-medium text-base py-2 px-5 rounded-md"
                          onClick={ handleUpgraderClick }
                        >
                          { __( 'Update', 'wedocs' ) }
                        </button>
                        <button
                          className="bg-white hover:bg-gray-200 text-gray-700 font-medium text-base py-2 px-5 border border-gray-300 rounded-md"
                          onClick={ () => setOpenModal( false ) }
                        >
                          { __( 'Cancel', 'wedocs' ) }
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
