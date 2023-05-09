import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import RestictionModal from './RestrictionModal';

const DocActions = ( { docId, type } ) => {
  const [ showActions, setShowActions ] = useState( false );

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
            className="w-40 z-40 bg-white border border-[#DBDBDB] absolute z-10 shadow right-0 py-1 rounded-md mt-1.5"
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
              type={ type }
              classes="w-full group flex items-center py-2 px-4 text-sm font-medium text-gray-700 hover:bg-indigo-700 hover:text-white"
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
