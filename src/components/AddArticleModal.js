import { __ } from '@wordpress/i18n';
import { Fragment, useEffect, useState } from '@wordpress/element';
import { Dialog, Transition } from '@headlessui/react';
import { dispatch } from '@wordpress/data';
import docStore from '../data/docs';
import ComboBox from './ComboBox';
import ComboBox2 from './ComboBox2';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import Swal from 'sweetalert2';

const AddArticleModal = ( {
  sections,
  className,
  children,
  defaultSection,
  docId,
  closeEllipsis,
} ) => {
  const [ isOpen, setIsOpen ] = useState( false );
  const [ sectionId, setSectionId ] = useState( defaultSection?.id || '' );
  const [ newArticle, setNewArticle ] = useState( {
    title: { raw: '' },
    parent: sectionId ? parseInt( sectionId ) : '',
    status: 'publish',
  } );

  const [ formError, setFormError ] = useState( {
    title: false,
    sectionId: false,
  } );

  const onTitleChange = ( e ) => {
    setNewArticle( { ...newArticle, title: { raw: e.target.value } } );
    setFormError( { ...formError, title: e.target.value.length === 0 } );
  };

  const createDoc = () => {
    if ( newArticle.title.raw === '' ) {
      setFormError( { ...formError, title: true } );
      return;
    }

    if ( ! sectionId ) {
      setFormError( { ...formError, sectionId: true } );
      return;
    }

    dispatch( docStore )
      .createDoc( newArticle )
      .then( ( result ) => {
        setNewArticle( { ...newArticle, title: { raw: '' } } );
        setSectionId( defaultSection?.id || '' );
        Swal.fire( {
          title: __( 'Section Article Created', 'wedocs' ),
          text: __( 'Section article has been created successfully', 'wedocs' ),
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
      } );
  };

  const closeModal = () => {
    setIsOpen( false );
    // closeEllipsis();
  };

  const openModal = ( e ) => {
    setIsOpen( true );
    // closeEllipsis();
  };

  useEffect( () => {
    setNewArticle( { ...newArticle, parent: sectionId } );
    setFormError( { ...formError, sectionId: false } );
  }, [ sectionId ] );

  return (
    <>
      <button type="button" onClick={ openModal } className={ className }>
        { children }
      </button>

      <Transition appear show={ isOpen } as={ Fragment }>
        <Dialog
          as="div"
          className="relative z-50"
          // static={ true }
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
                <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white py-6 px-9 text-center align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold text-gray-900 mb-2"
                  >
                    { __( 'Enter your article title', 'wedocs' ) }
                  </Dialog.Title>

                  <p className="text-gray-500 text-base">
                    { __( 'Help text how to add article', 'wedocs' ) }
                  </p>

                  <div className="relative mt-6 mb-4">
                    <input
                      type="text"
                      name="doc_title"
                      id="doc-title"
                      placeholder={ __( 'Write article name', 'wedocs' ) }
                      required
                      className={ `${
                        formError.title
                          ? '!border-red-500 focus:ring-red-500 focus:border-red-500'
                          : '!border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                      } h-11 bg-gray-50 text-gray-900 text-base !rounded-md block w-full !py-2 !px-3 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white` }
                      value={ newArticle?.title?.raw }
                      onChange={ onTitleChange }
                    />

                    { formError.title && (
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <ExclamationCircleIcon
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                      </div>
                    ) }
                  </div>

                  <ComboBox
                    sections={ sections }
                    defaultSection={ defaultSection?.title?.rendered }
                    selectSectionId={ setSectionId }
                    isFormError={ formError.sectionId }
                    docId={ docId }
                  />

                  { /*<ComboBox2 sections={ sections } />*/ }

                  <div className="mt-6 space-x-3.5">
                    <button
                      className="bg-indigo-600 hover:bg-indigo-800 text-white font-medium text-base py-2 px-5 rounded-md"
                      onClick={ createDoc }
                    >
                      { __( 'Create', 'wedocs' ) }
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

export default AddArticleModal;
