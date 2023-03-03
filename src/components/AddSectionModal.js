import { __, sprintf } from '@wordpress/i18n';
import { Fragment, useEffect, useState } from '@wordpress/element';
import { Dialog, Transition } from '@headlessui/react';
import { dispatch } from '@wordpress/data';
import docStore from '../data/docs';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import Swal from 'sweetalert2';

const AddSectionModal = ( { parent, order, className, children } ) => {
  const [ isOpen, setIsOpen ] = useState( false );
  const [ newDoc, setNewDoc ] = useState( {
    title: { raw: '' },
    parent: parseInt( parent ),
    status: 'publish',
  } );

  const [ formError, setFormError ] = useState( false );

  const onTitleChange = ( e ) => {
    setNewDoc( { ...newDoc, title: { raw: e.target.value } } );
    setFormError( e.target.value.length === 0 );
  };

  const [ disabled, setDisabled ] = useState( false );

  const createDoc = () => {
    if ( newDoc.title.raw === '' ) {
      setFormError( true );
      return;
    }

    // Make it disabled for creating a section.
    setDisabled( true );

    dispatch( docStore )
      .createDoc( newDoc )
      .then( ( result ) => {
        setNewDoc( { ...newDoc, title: { raw: '' } } );
        Swal.fire( {
          title: __( 'New section added!', 'wedocs' ),
          text: __( 'New section has been added successfully', 'wedocs' ),
          icon: 'success',
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 2000,
        } );
        closeModal();
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
      } )
      .finally( () => setDisabled( false ) );
  };

  const closeModal = () => {
    setIsOpen( false );
  };

  const openModal = () => {
    setIsOpen( true );
  };

  useEffect( () => {
    setNewDoc( { ...newDoc, menu_order: order } );
  }, [ order ] );

  return (
    <>
      <button onClick={ openModal } className={ className }>
        { children }
      </button>

      <Transition appear show={ isOpen } as={ Fragment }>
        <Dialog as="div" className="relative z-50" onClose={ closeModal }>
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={ Fragment }
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white py-6 px-9 text-center align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold text-gray-900 mb-2"
                  >
                    { __( 'Enter your section title', 'wedocs' ) }
                  </Dialog.Title>

                  <p className="text-gray-500 text-base">
                    { __(
                      'Use concise section titles for better navigation',
                      'wedocs'
                    ) }
                  </p>

                  <div className="relative mt-6 mb-5">
                    <input
                      type="text"
                      name="doc_title"
                      id="doc-title"
                      placeholder={ __( 'Type a section name', 'wedocs' ) }
                      required
                      className={ `${
                        formError
                          ? '!border-red-500 focus:ring-red-500 focus:border-red-500'
                          : '!border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                      }
                                                h-11 bg-gray-50 text-gray-900 text-base !rounded-md block w-full !py-2 !px-3 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white` }
                      value={ newDoc.title.raw }
                      onChange={ onTitleChange }
                    />

                    { formError && (
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <ExclamationCircleIcon
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                      </div>
                    ) }
                  </div>

                  <div className="mt-6 space-x-3.5">
                    <button
                      className="bg-indigo-600 hover:bg-indigo-800 text-white font-medium text-base py-2 px-5 rounded-md"
                      disabled={ disabled }
                      onClick={ createDoc }
                    >
                      { sprintf(
                        __( '%s', 'wedocs' ),
                        disabled ? 'Creating...' : 'Create'
                      ) }
                    </button>
                    <button
                      className="bg-white hover:bg-gray-200 text-gray-700 font-medium text-base py-2 px-5 border border-gray-300 rounded-md"
                      onClick={ closeModal }
                    >
                      { __( 'Cancel', 'wedocs' ) }
                    </button>
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

export default AddSectionModal;
