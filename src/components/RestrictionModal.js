import { __, sprintf } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import { Dialog, Transition } from '@headlessui/react';
import { dispatch } from '@wordpress/data';
import Swal from 'sweetalert2';

const RestictionModal = ( { classes, children, docId, type } ) => {
  const [ isOpen, setIsOpen ] = useState( false );
  const [ disabled, setDisabled ] = useState( false );

  const removeDocumentation = () => {
    const deletedType = type.charAt( 0 ).toUpperCase() + type.slice( 1 );

    // Make it disabled for removing a doc.
    setDisabled( true );

    dispatch( 'wedocs/docs' )
      .deleteDoc( docId )
      .then( ( result ) => {
        Swal.fire( {
          title: __( `${ deletedType } deleted!`, 'wedocs' ),
          text: __(
            `${ deletedType } has been deleted successfully`,
            'wedocs'
          ),
          icon: 'success',
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 2000,
          customClass: {
            container: '!z-[9999]',
          },
        } );
        setIsOpen( false );
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
          customClass: {
            container: '!z-[9999]',
          },
        } );
      } )
      .finally( () => setDisabled( false ) );
  };

  const openModal = () => {
    setIsOpen( true );
  };

  return (
    <>
      <button onClick={ openModal } className={ classes }>
        { children }
      </button>

      <Transition appear show={ isOpen } as={ Fragment }>
        <Dialog
          as="div"
          className="relative z-[9999]"
          onClose={ () => setIsOpen( false ) }
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
                          `Are you sure you want to delete this ${type}?`,
                          'wedocs'
                        ) }
                      </Dialog.Title>
                      <p className="text-gray-500 text-base">
                        { __(
                          'Deleting it means it will be permanently lost, and you won\'t be able to retrieve it again.',
                          'wedocs'
                        ) }
                      </p>

                      <div className="mt-6 space-x-3.5 text-right">
                        <button
                          className="bg-white hover:bg-gray-200 text-gray-700 font-medium text-base py-2 px-5 border border-gray-300 rounded-md"
                          onClick={ () => setIsOpen( false ) }
                        >
                          { __( 'Cancel', 'wedocs' ) }
                        </button>
                        <button
                          className="bg-red-600 hover:bg-red-700 text-white font-medium text-base py-2 px-5 rounded-md"
                          onClick={ removeDocumentation }
                          disabled={ disabled }
                        >
                          { sprintf(
                            __( '%s', 'wedocs' ),
                            disabled ? 'Removing...' : "I'm Sure"
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
