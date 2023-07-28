import { useEffect, useState } from '@wordpress/element';
import AddArticleModal from '../AddArticleModal';
import { __ } from '@wordpress/i18n';
import AddSectionModal from '../AddSectionModal';

const AddChildrens = ( { docId, sections, className, children } ) => {
  return (
    <>
      <div className="documentation-ellipsis-actions relative group">
        <span className={ className }>
          { children }
        </span>
        <div
          id="action-menus"
          className="w-40 bg-white border border-[#DBDBDB] mt-2.5 absolute z-10 shadow right-0 py-1 rounded-md hidden group-hover:block hover:block after:content-[''] before:content-[''] after:absolute before:absolute after:w-[13px] before:w-full after:h-[13px] before:h-2.5 after:top-[-7px] before:-top-2.5 after:right-[22px] after:z-[-1] after:bg-white after:border after:border-[#DBDBDB] after:!rotate-45 after:border-r-0 after:border-b-0"
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
      </div>
    </>
  );
};

export default AddChildrens;
