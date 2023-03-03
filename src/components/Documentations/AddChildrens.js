import { useEffect, Fragment, useState } from '@wordpress/element';
import AddArticleModal from '../AddArticleModal';
import { __ } from '@wordpress/i18n';
import RestictionModal from '../RestrictionModal';
import AddSectionModal from '../AddSectionModal';

const AddChildrens = ( { docId, sections, className, children } ) => {
  const [ showActions, setShowActions ] = useState( false );

  useEffect( () => {
    return setShowActions( false );
  }, [] );

  return (
    <>
      <div className="documentation-ellipsis-actions relative">
        <span
          onClick={ () => setShowActions( ! showActions ) }
          className={ className }
        >
          { children }
        </span>
        { showActions && (
          <div
            id="action-menus"
            className="w-40 bg-white border border-[#DBDBDB] absolute z-10 shadow right-0 py-1 rounded-md mt-1.5"
          >
            { /* Add article */ }
            <AddArticleModal
              sections={ sections }
              docId={ docId }
              className="group w-full flex items-center py-2 px-4 text-sm font-medium text-gray-700 hover:bg-indigo-700 hover:text-white"
            >
              { __( 'Add article', 'wedocs' ) }
            </AddArticleModal>
            { /* Add section */ }
            <AddSectionModal
              parent={ docId }
              order={ sections?.length }
              className="group w-full flex items-center py-2 px-4 text-sm font-medium text-gray-700 hover:bg-indigo-700 hover:text-white"
            >
              { __( 'Add section', 'wedocs' ) }
            </AddSectionModal>
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

export default AddChildrens;
