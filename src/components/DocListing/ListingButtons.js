import { __ } from '@wordpress/i18n';
import AddSectionModal from '../AddSectionModal';
import AddArticleModal from '../AddArticleModal';
import { useParams } from 'react-router-dom';

const ListingButtons = ( { sections } ) => {
  const { id } = useParams();

  const showActions = wp.hooks.applyFilters(
    'wedocs_show_documentation_actions',
    true
  );

  return (
    <>
      { showActions && (
        <div className="doc-listing-buttons wedocs-space-x-3.5 wedocs-mt-10">
          <AddSectionModal
            parent={ id }
            order={ sections?.length }
            className="wedocs-py-2.5 wedocs-px-4 wedocs-h-fit wedocs-inline-flex wedocs-items-center wedocs-rounded-md wedocs-border wedocs-border-gray-300 wedocs-bg-white wedocs-text-gray-700 hover:wedocs-text-white hover:wedocs-bg-indigo-600 wedocs-px-4 wedocs-text-sm wedocs-shadow-sm hover:wedocs-bg-indigo-700 focus:wedocs-outline-none focus:wedocs-ring-2 focus:wedocs-ring-indigo-500 focus:wedocs-ring-offset-2"
          >
            <span className="dashicons dashicons-plus-alt2 wedocs-w-3.5 wedocs-h-3.5 wedocs-mr-3 wedocs-text-base wedocs-flex wedocs-items-center"></span>
            { __( 'Add section', 'wedocs' ) }
          </AddSectionModal>

          <AddArticleModal
            sections={ sections }
            className="wedocs-py-2.5 wedocs-px-4 wedocs-h-fit wedocs-inline-flex wedocs-items-center wedocs-rounded-md wedocs-border wedocs-border-gray-300 wedocs-bg-white wedocs-text-gray-700 hover:wedocs-text-white hover:wedocs-bg-indigo-600 wedocs-px-4 wedocs-text-sm wedocs-shadow-sm hover:wedocs-bg-indigo-700 focus:wedocs-outline-none focus:wedocs-ring-2 focus:wedocs-ring-indigo-500 focus:wedocs-ring-offset-2"
          >
            <span className="dashicons dashicons-plus-alt2 wedocs-w-3.5 wedocs-h-3.5 wedocs-mr-3 wedocs-text-base wedocs-flex wedocs-items-center"></span>
            { __( 'Add article', 'wedocs' ) }
          </AddArticleModal>
        </div>
      ) }
    </>
  );
};

export default ListingButtons;
