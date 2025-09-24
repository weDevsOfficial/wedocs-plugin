import { useEffect, useState } from '@wordpress/element';
import AddArticleModal from '../AddArticleModal';
import { __ } from '@wordpress/i18n';
import AddSectionModal from '../AddSectionModal';

const AddChildrens = ( { docId, sections, className, children } ) => {
  return (
    <>
      <div className="documentation-ellipsis-actions wedocs-relative wedocs-group">
        <span className={ className }>
          { children }
        </span>
        <div
          id="action-menus"
          className="wedocs-w-40 wedocs-bg-white wedocs-border wedocs-border-[#DBDBDB] wedocs-mt-2.5 wedocs-absolute wedocs-z-[99999] wedocs-shadow wedocs-right-0 wedocs-py-1 wedocs-rounded-md wedocs-hidden group-hover:wedocs-block hover:wedocs-block after:wedocs-content-[''] before:wedocs-content-[''] after:wedocs-absolute before:wedocs-absolute after:wedocs-w-[13px] before:wedocs-w-full after:wedocs-h-[13px] before:wedocs-h-2.5 after:wedocs-top-[-7px] before:wedocs--top-2.5 after:wedocs-right-[22px] after:wedocs-z-[-1] after:wedocs-bg-white after:wedocs-border after:wedocs-border-[#DBDBDB] after:!wedocs-rotate-45 after:wedocs-border-r-0 after:wedocs-border-b-0"
        >
          { /* Add article */ }
          <AddArticleModal
            sections={ sections }
            docId={ docId }
            className="wedocs-group wedocs-w-full wedocs-flex wedocs-items-center wedocs-py-2 wedocs-px-4 wedocs-text-sm wedocs-font-medium wedocs-text-gray-700 hover:wedocs-bg-indigo-700 hover:wedocs-text-white"
          >
            { __( 'Add article', 'wedocs' ) }
          </AddArticleModal>
          { /* Add section */ }
          <AddSectionModal
            parent={ docId }
            order={ sections?.length }
            className="wedocs-group wedocs-w-full wedocs-flex wedocs-items-center wedocs-py-2 wedocs-px-4 wedocs-text-sm wedocs-font-medium wedocs-text-gray-700 hover:wedocs-bg-indigo-700 hover:wedocs-text-white"
          >
            { __( 'Add section', 'wedocs' ) }
          </AddSectionModal>
        </div>
      </div>
    </>
  );
};

export default AddChildrens;
