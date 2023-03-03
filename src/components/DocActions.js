import { useEffect, Fragment, useState } from '@wordpress/element';
import AddArticleModal from './AddArticleModal';
import { __ } from '@wordpress/i18n';
import RestictionModal from './RestrictionModal';
import { useSelect } from '@wordpress/data';
import docsStore from '../data/docs';

const DocActions = ( { docId, addArticle = false } ) => {
  const [ showActions, setShowActions ] = useState( false );

  const sections = useSelect(
    ( select ) => select( docsStore ).getSectionsDocs( parseInt( docId ) ),
    []
  );

  useEffect( () => {
    return setShowActions( false );
  }, [] );

  return (
    <>
      <div className="documentation-ellipsis-actions relative">
        <span
          onClick={ () => setShowActions( ! showActions ) }
          className="dashicons dashicons-ellipsis d-block cursor-pointer text-sm rotate-90 text-gray-500"
        ></span>
        { showActions && (
          <div
            id="action-menus"
            className="w-40 z-40 bg-white border border-[#DBDBDB] absolute z-10 shadow right-0 py-1 rounded-md mt-2.5"
          >
            { /* Edit documentation */ }
            <a
              href={ `${ window.location.origin }/wp-admin/post.php?post=${ docId }&action=edit` }
              target="_blank"
              className="group flex items-center py-2 px-4 text-sm font-medium text-gray-700 hover:bg-indigo-700 hover:text-white !shadow-none"
              rel="noreferrer"
            >
              { __( 'Edit', 'wedocs' ) }
            </a>
            { /* Delete documentation */ }
            <RestictionModal
              docId={ docId }
              className="w-full group flex items-center py-2 px-4 text-sm font-medium text-gray-700 hover:bg-indigo-700 hover:text-white"
            >
              { __( 'Delete', 'wedocs' ) }
            </RestictionModal>
          </div>
        ) }
      </div>
      { showActions && (
        <div
          className="backdrop absolute z-[5] top-0 left-0 w-full h-full"
          onClick={ () => setShowActions( false ) }
        />
      ) }
    </>
  );
};

export default DocActions;
