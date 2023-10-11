import { __, sprintf } from '@wordpress/i18n';
import { Fragment, useEffect, useRef, useState } from '@wordpress/element';
import { Dialog, Transition } from '@headlessui/react';
import { dispatch, useSelect } from '@wordpress/data';
import docStore from '../data/docs';
import ComboBox from './ComboBox';
import { ChevronDownIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid';
import Swal from 'sweetalert2';
import { handleDocCreationByRef } from '../utils/helper';

const AddArticleModal = ( {
  sections,
  className,
  children,
  defaultSection,
  docId,
  setShowArticles,
} ) => {
  const docCreateBtnRef = useRef( null );

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

  const articles = useSelect(
    ( select ) =>
      select( docStore ).getSectionArticles( parseInt( sectionId ) ),
    []
  );

  const onTitleChange = ( e ) => {
    setNewArticle( { ...newArticle, title: { raw: e.target.value } } );
    setFormError( { ...formError, title: e.target.value.length === 0 } );
  };

  const [ disabled, setDisabled ] = useState( false );

  const createDoc = () => {
    if ( newArticle.title.raw === '' ) {
      setFormError( { ...formError, title: true } );
      return;
    }

    if ( ! sectionId ) {
      setFormError( { ...formError, sectionId: true } );
      return;
    }

    // Make it disabled for creating an article.
    setDisabled( true );

    dispatch( docStore )
      .createDoc( newArticle )
      .then( ( result ) => {
        setNewArticle( { ...newArticle, title: { raw: '' } } );
        setSectionId( defaultSection?.id || '' );
        if ( setShowArticles ) setShowArticles( true );
        Swal.fire( {
          title: __( 'New article added!', 'wedocs' ),
          text: __( 'New article has been added successfully', 'wedocs' ),
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

  const openModal = ( e ) => {
    e.stopPropagation();
    setIsOpen( true );
  };

  const articleStatusHandler = ( status ) => {
    setNewArticle( { ...newArticle, status } );
  };

  useEffect( () => {
    setNewArticle( {
      ...newArticle,
      parent: sectionId,
    } );
    setFormError( { ...formError, sectionId: false } );
  }, [ sectionId ] );

  useEffect( () => {
    setNewArticle( { ...newArticle, menu_order: articles?.length } );
  }, [ articles ] );

  // Crete article on enter click.
  handleDocCreationByRef( docCreateBtnRef );

  return (
    <Fragment>
      <button type="button" onClick={ openModal } className={ className }>
        { children }
      </button>

      <Transition appear show={ isOpen } as={ Fragment }>
        <Dialog as="div" className="relative z-[9999]" onClose={ closeModal }>
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
                <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white py-6 px-9 text-center align-middle shadow-xl transition-all overflow-visible">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold text-gray-900 mb-2"
                  >
                    { __( 'Enter your article title', 'wedocs' ) }
                  </Dialog.Title>

                  <p className="text-gray-500 text-base">
                    { __( 'Describe what the article is about', 'wedocs' ) }
                  </p>

                  <div className="relative mt-6 mb-4">
                    <input
                      type="text"
                      name="doc_title"
                      id="doc-title"
                      placeholder={ __( 'Type an article name', 'wedocs' ) }
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

                  { typeof defaultSection === 'undefined' && (
                    <ComboBox
                      sections={ sections }
                      selectSectionId={ setSectionId }
                      defaultSection={ defaultSection?.title?.rendered }
                      isFormError={ formError.sectionId }
                      docId={ docId }
                    />
                  ) }

                  <div className="mt-6 flex items-center justify-center space-x-3.5">
                    <div className={ `doc-publish-btn group relative` }>
                      <button
                        className="inline-flex justify-between items-center cursor-pointer bg-indigo-600 hover:bg-indigo-800 text-white font-medium text-base py-2 px-5 rounded-md min-w-[122px]"
                        ref={ docCreateBtnRef }
                        disabled={ disabled }
                        onClick={ createDoc }
                      >
                        <Fragment>
                          { sprintf(
                            __( '%s', 'wedocs' ),
                            newArticle?.status?.charAt( 0 ).toUpperCase() + newArticle?.status?.slice( 1 ) + ( disabled ? 'ing...' : '' )
                          ) }
                          <ChevronDownIcon
                            className="h-5 w-5 text-white mt-[1px]"
                            aria-hidden="true"
                          />
                        </Fragment>
                      </button>
                      <div
                        id='action-menus'
                        className={ `hidden cursor-pointer w-44 z-40 bg-white border border-[#DBDBDB] absolute z-10 shadow right-0 py-1 rounded-md mt-0.5 group-hover:block after:content-[''] before:content-[''] after:absolute before:absolute after:w-[13px] before:w-[70%] before:-right-[1px] after:h-[13px] before:h-3 before:mt-3 after:top-[-7px] before:-top-6 after:right-[1.4rem] after:z-[-1] after:bg-white after:border after:border-[#DBDBDB] after:!rotate-45 after:border-r-0 after:border-b-0` }
                      >
                      <span onClick={ () => articleStatusHandler( 'draft' ) } className="flex items-center py-2 px-4 text-sm font-medium text-gray-700 hover:bg-indigo-700 hover:text-white !shadow-none">
                        { __( 'Create and Draft', 'wedocs' ) }
                      </span>
                      <span onClick={ () => articleStatusHandler( 'publish' ) } className="flex items-center py-2 px-4 text-sm font-medium text-gray-700 hover:bg-indigo-700 hover:text-white !shadow-none">
                        { __( 'Create and Publish', 'wedocs' ) }
                      </span>
                      </div>
                    </div>
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
    </Fragment>
  );
};

export default AddArticleModal;
