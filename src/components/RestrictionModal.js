import { __ } from '@wordpress/i18n';
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
          title: deletedType + __( ` deleted!`, 'wedocs' ),
          text: deletedType + __( ` has been deleted successfully`, 'wedocs' ),
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
          className="wedocs-document wedocs-relative wedocs-z-[9999]"
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
            <div className="wedocs-fixed wedocs-inset-0 wedocs-bg-black wedocs-bg-opacity-25 wedocs-z-[50]" />
          </Transition.Child>

          <div className="wedocs-fixed wedocs-inset-0 wedocs-overflow-y-auto wedocs-z-[100]">
            <div className="wedocs-flex wedocs-min-h-full wedocs-items-center wedocs-justify-center wedocs-p-4">
              <Transition.Child
                as={ Fragment }
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="wedocs-w-[512px] wedocs-transform wedocs-overflow-hidden wedocs-rounded-2xl wedocs-bg-white wedocs-py-6 wedocs-px-9 wedocs-align-middle wedocs-shadow-xl wedocs-transition-all">
                  <div className="sm:wedocs-flex sm:wedocs-items-start">
                    <div className="wedocs-mx-auto wedocs-flex wedocs-h-12 wedocs-w-12 wedocs-flex-shrink-0 wedocs-items-center wedocs-justify-center wedocs-rounded-full wedocs-bg-red-100 sm:wedocs-mx-0 sm:wedocs-h-10 sm:wedocs-w-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="18"
                        fill="none"
                        className="wedocs-text-red-600"
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
                    <div className="wedocs-mt-3 wedocs-text-center sm:wedocs-mt-0 sm:wedocs-ml-4 sm:wedocs-text-left">
                      <Dialog.Title
                        as="h3"
                        className="wedocs-text-lg wedocs-font-medium wedocs-text-gray-900 wedocs-mb-2"
                      >
                        { __(
                          `Are you sure you want to delete this `,
                          'wedocs'
                        ) + type + `?` }
                      </Dialog.Title>
                      <p className="wedocs-text-gray-500 wedocs-text-base">
                        { __(
                          'Deleting it means it will be permanently lost, and you won\'t be able to retrieve it again.',
                          'wedocs'
                        ) }
                      </p>

                      <div className="wedocs-mt-6 wedocs-space-x-3.5 wedocs-text-right">
                        <button
                          className="wedocs-bg-white hover:wedocs-bg-gray-200 wedocs-text-gray-700 wedocs-font-medium wedocs-text-base wedocs-py-2 wedocs-px-5 wedocs-border wedocs-border-gray-300 wedocs-rounded-md"
                          onClick={ () => setIsOpen( false ) }
                        >
                          { __( 'Cancel', 'wedocs' ) }
                        </button>
                        <button
                          className="wedocs-bg-red-600 hover:wedocs-bg-red-700 wedocs-text-white wedocs-font-medium wedocs-text-base wedocs-py-2 wedocs-px-5 wedocs-rounded-md"
                          onClick={ removeDocumentation }
                          disabled={ disabled }
                        >
                          { disabled ? __( 'Removing...', 'wedocs' ) : __( "I'm sure", 'wedocs' ) }
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
