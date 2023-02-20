import { useEffect, Fragment, useState } from '@wordpress/element';
import AddArticleModal from './AddArticleModal';
import { __ } from '@wordpress/i18n';
import RestictionModal from './RestrictionModal';
import { useSelect } from '@wordpress/data';
import docsStore from '../data/docs';

import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';

const DocActions = ( { docId, addArticle = false } ) => {
  const [ showActions, setShowActions ] = useState( false );

  const sections = useSelect(
    ( select ) => select( docsStore ).getSectionsDocs( parseInt( docId ) ),
    []
  );

  const classNames = ( ...classes ) => {
    return classes.filter( Boolean ).join( ' ' );
  };

  // useEffect( () => {
  //     // if ( showActions && ! actionDom.contains( event.target ) ) {
  //         document.addEventListener('click', function ( event ) {
  //             // if ( showActions && ! actionDom.contains( event.target ) ) {
  //             //     console.log( event.target );
  //             // }
  //
  //             if ( showActions ) {
  //                 const actionDom = document.querySelector( '#action-menus' );
  //                 // console.log( actionDom.contains( event.target ) );
  //                 console.log( actionDom );
  //             }
  //         });
  //     // }
  // }, [ showActions ] );

  return (
    <div className="documentation-ellipsis-actions relative">
      { /*<span onClick={ () => setShowActions( ! showActions ) } className="dashicons dashicons-ellipsis d-block cursor-pointer text-sm rotate-90 text-gray-500"></span>*/ }
      { /*{ showActions && (*/ }
      { /*    <div id="action-menus" className="w-40 bg-white border border-[#DBDBDB] absolute z-10 shadow right-0 py-1 rounded-md mt-2.5">*/ }
      { /*        /!* Add article *!/*/ }
      { /*        { addArticle && (*/ }
      { /*            <AddArticleModal sections={ sections } docId={ docId } className="group w-full flex items-center py-2 px-4 text-sm font-medium text-gray-700 hover:bg-indigo-700 hover:text-white">*/ }
      { /*                <span className="dashicons dashicons-plus text-xs mt-1.5 ml-[-4px]"></span>*/ }
      { /*                { __( 'Add article', 'wedocs' ) }*/ }
      { /*            </AddArticleModal>*/ }
      { /*        ) }*/ }

      { /*        /!* Edit documentation *!/*/ }
      { /*        <a*/ }
      { /*            href={ `${ window.location.origin }/wp-admin/post.php?post=${ docId }&action=edit` } target="_blank"*/ }
      { /*            className="group flex items-center py-2 px-4 text-sm font-medium text-gray-700 hover:bg-indigo-700 hover:text-white"*/ }
      { /*        >*/ }
      { /*            { __( 'Edit', 'wedocs' ) }*/ }
      { /*        </a>*/ }

      { /*        /!* Delete documentation *!/*/ }
      { /*        <RestictionModal docId={ docId } className="w-full group flex items-center py-2 px-4 text-sm font-medium text-gray-700 hover:bg-indigo-700 hover:text-white">*/ }
      { /*            { __( 'Delete', 'wedocs' ) }*/ }
      { /*        </RestictionModal>*/ }
      { /*    </div>*/ }
      { /*) }*/ }

      <Menu as="div" className="relative inline-block text-left">
        { ( { open } ) => (
          <>
            <div>
              <Menu.Button className="flex items-center">
                { /*<EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />*/ }
                <span className="dashicons dashicons-ellipsis d-block cursor-pointer text-sm rotate-90 text-gray-500"></span>
              </Menu.Button>
            </div>

            { open && (
              <Transition
                as={ Fragment }
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  static={ true }
                >
                  <div className="py-1">
                    <Menu.Item>
                      { ( { close } ) => (
                        // { addArticle && (
                        <AddArticleModal
                          sections={ sections }
                          docId={ docId }
                          closeEllipsis={ close }
                          className="group w-full flex items-center py-2 px-4 text-sm font-medium text-gray-700 hover:bg-indigo-700 hover:text-white"
                        >
                          <span className="dashicons dashicons-plus text-xs mt-1.5 ml-[-4px]"></span>
                          { __( 'Add article', 'wedocs' ) }
                        </AddArticleModal>
                        // ) }
                      ) }
                    </Menu.Item>
                    <Menu.Item>
                      <a
                        href={ `${ window.location.origin }/wp-admin/post.php?post=${ docId }&action=edit` }
                        target="_blank"
                        className="group flex items-center py-2 px-4 text-sm font-medium text-gray-700 hover:bg-indigo-700 hover:text-white"
                        rel="noreferrer"
                      >
                        { __( 'Edit', 'wedocs' ) }
                      </a>
                    </Menu.Item>
                    <Menu.Item>
                      <RestictionModal
                        docId={ docId }
                        className="w-full group flex items-center py-2 px-4 text-sm font-medium text-gray-700 hover:bg-indigo-700 hover:text-white"
                      >
                        { __( 'Delete', 'wedocs' ) }
                      </RestictionModal>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            ) }
          </>
        ) }
      </Menu>
    </div>
  );
};

export default DocActions;
