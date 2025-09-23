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
        <Dialog as="div" className="wedocs-document wedocs-relative wedocs-z-[9999]" onClose={ closeModal }>
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
            <div className="wedocs-flex wedocs-min-h-full wedocs-items-center wedocs-justify-center wedocs-p-4 wedocs-text-center">
              <Transition.Child
                as={ Fragment }
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="wedocs-w-full wedocs-max-w-md wedocs-transform wedocs-rounded-2xl wedocs-bg-white wedocs-py-6 wedocs-px-9 wedocs-text-center wedocs-align-middle wedocs-shadow-xl wedocs-transition-all wedocs-overflow-visible">
                  <Dialog.Title
                    as="h3"
                    className="wedocs-text-lg wedocs-font-bold wedocs-text-gray-900 wedocs-mb-2"
                  >
                    { __( 'Enter your article title', 'wedocs' ) }
                  </Dialog.Title>

                  <p className="wedocs-text-gray-500 wedocs-text-base">
                    { __( 'Describe what the article is about', 'wedocs' ) }
                  </p>

                  <div className="wedocs-relative wedocs-mt-6 wedocs-mb-4">
                    <input
                      type="text"
                      name="doc_title"
                      id="doc-title"
                      placeholder={ __( 'Type an article name', 'wedocs' ) }
                      required
                      className={ `${
                        formError.title
                          ? '!wedocs-border-red-500 focus:wedocs-ring-red-500 focus:wedocs-border-red-500'
                          : '!wedocs-border-gray-300 focus:wedocs-ring-blue-500 focus:wedocs-border-blue-500'
                      } wedocs-h-11 wedocs-bg-gray-50 wedocs-text-gray-900 wedocs-text-base !wedocs-rounded-md wedocs-block wedocs-w-full !wedocs-py-2 !wedocs-px-3 dark:wedocs-bg-gray-600 dark:wedocs-border-gray-500 dark:wedocs-placeholder-gray-400 dark:wedocs-text-white` }
                      value={ newArticle?.title?.raw }
                      onChange={ onTitleChange }
                    />

                    { formError.title && (
                      <div className="wedocs-pointer-events-none wedocs-absolute wedocs-inset-y-0 wedocs-right-0 wedocs-flex wedocs-items-center wedocs-pr-3">
                        <ExclamationCircleIcon
                          className="wedocs-h-5 wedocs-w-5 wedocs-text-red-500"
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

                  <div className="wedocs-mt-6 wedocs-flex wedocs-items-center wedocs-justify-center wedocs-space-x-3.5">
                    <button
                      className="wedocs-bg-white hover:wedocs-bg-gray-200 wedocs-text-gray-700 wedocs-font-medium wedocs-text-base wedocs-py-2 wedocs-px-5 wedocs-border wedocs-border-gray-300 wedocs-rounded-md"
                      onClick={ closeModal }
                    >
                      { __( 'Cancel', 'wedocs' ) }
                    </button>
                    <div className={ `doc-publish-btn wedocs-group wedocs-relative` }>
                      <button
                        className="wedocs-inline-flex wedocs-justify-between wedocs-items-center wedocs-cursor-pointer wedocs-bg-indigo-600 hover:wedocs-bg-indigo-800 wedocs-text-white wedocs-font-medium wedocs-text-base wedocs-py-2 wedocs-px-5 wedocs-rounded-md wedocs-min-w-[122px]"
                        ref={ docCreateBtnRef }
                        disabled={ disabled }
                        onClick={ createDoc }
                      >
                        <Fragment>
                          { newArticle?.status === 'publish' ? __( 'Publish', 'wedocs' ) : __( 'Draft', 'wedocs' ) }
                          { disabled ? __( 'ing...', 'wedocs' ) : '' }
                          <ChevronDownIcon
                            className="wedocs-h-5 wedocs-w-5 wedocs-text-white wedocs-mt-[1px]"
                            aria-hidden="true"
                          />
                        </Fragment>
                      </button>
                      <div
                        id='action-menus'
                        className={ `wedocs-hidden wedocs-cursor-pointer wedocs-w-44 wedocs-z-40 wedocs-bg-white wedocs-border wedocs-border-[#DBDBDB] wedocs-absolute wedocs-z-10 wedocs-shadow wedocs-right-0 wedocs-py-1 wedocs-rounded-md wedocs-mt-0.5 group-hover:wedocs-block after:content-[''] before:content-[''] after:wedocs-absolute before:wedocs-absolute after:wedocs-w-[13px] before:wedocs-w-[70%] before:-wedocs-right-[1px] after:wedocs-h-[13px] before:wedocs-h-3 before:wedocs-mt-3 after:wedocs-top-[-7px] before:-wedocs-top-6 after:wedocs-right-[1.4rem] after:wedocs-z-[-1] after:wedocs-bg-white after:wedocs-border after:wedocs-border-[#DBDBDB] after:!wedocs-rotate-45 after:wedocs-border-r-0 after:wedocs-border-b-0` }
                      >
                      <span onClick={ () => articleStatusHandler( 'draft' ) } className="wedocs-flex wedocs-items-center wedocs-py-2 wedocs-px-4 wedocs-text-sm wedocs-font-medium wedocs-text-gray-700 hover:wedocs-bg-indigo-700 hover:wedocs-text-white !wedocs-shadow-none">
                        { __( 'Create and Draft', 'wedocs' ) }
                      </span>
                      <span onClick={ () => articleStatusHandler( 'publish' ) } className="wedocs-flex wedocs-items-center wedocs-py-2 wedocs-px-4 wedocs-text-sm wedocs-font-medium wedocs-text-gray-700 hover:wedocs-bg-indigo-700 hover:wedocs-text-white !wedocs-shadow-none">
                        { __( 'Create and Publish', 'wedocs' ) }
                      </span>
                      </div>
                    </div>
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
