import { __, sprintf } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import docsStore from '../../data/docs';
import DocumentationHeader from './DocumentationHeader';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import AddChildrens from './AddChildrens';

const ParentDocs = ( { doc } ) => {
  if ( ! doc ) {
    return;
  }

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable( { id: doc.id } );

  const style = {
    transform: CSS.Transform.toString( transform ),
    transition,
  };

  const sections =
    useSelect(
      ( select ) => select( docsStore ).getSectionsDocs( doc.id ),
      []
    ) || [];

  const articles =
    useSelect(
      ( select ) => select( docsStore ).getDocArticles( doc.id ),
      []
    ) || [];

  const footerLeft = wp.hooks.applyFilters(
    'wedocs_documentation_footer_left',
    [],
    doc?.id
  );

  const contributors = wp.hooks.applyFilters(
    'wedocs_documentation_contributors',
    '',
    doc?.id,
    sections,
    articles
  );

  return (
    <div
      className="col-span-1 rounded bg-white shadow"
      ref={ setNodeRef }
      style={ style }
      { ...attributes }
      { ...listeners }
    >
      <DocumentationHeader doc={ doc } />

      { /* Documentation Section Start */ }
      <div className="w-full p-6 pt-0 pb-7">
        <ul role="list" className="mb-6 rounded-md">
          <li className="flex items-center justify-between mb-0 py-1.5 pl-3 pr-4 text-sm">
            <div className="w-full inline-flex items-center">
              <div className="w-6 flex-none -mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="17"
                  fill="none"
                >
                  <path
                    d="M1 3.945v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-6l-2-2H3a2 2 0 0 0-2 2z"
                    stroke="#6b7280"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="ml-2 flex-1 truncate">
                { sprintf(
                  // translators: %d: Length of documentation sections
                  __( '%d Sections', 'wedocs' ),
                  sections.length
                ) }
              </span>
            </div>
          </li>
          <li className="flex items-center justify-between mb-0 py-1.5 pl-3 pr-4 text-sm">
            <div className="flex w-0 flex-1 items-center">
              <div className="w-6 flex justify-center -mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="21"
                  fill="none"
                >
                  <path
                    d="M5 10.02h6m-6 4h6m2 5H3a2 2 0 0 1-2-2v-14a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707v9.586a2 2 0 0 1-2 2z"
                    stroke="#6b7280"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="ml-2 w-0 flex-1 truncate">
                { sprintf(
                  // translators: %d: Length of documentation articles
                  __( '%d Articles', 'wedocs' ),
                  articles.length
                ) }
              </span>
            </div>
          </li>
        </ul>
        { /* Render documentation contributors list. */ }
        { contributors }
      </div>
      { /* Documentation Section End */ }

      { /* Documentation Footer Start */ }
      <div className="border-t border-gray-200">
        <div className="-mt-px flex divide-x divide-gray-200">
          <div
            className={ `${
              footerLeft[ 0 ] ? 'justify-between' : 'justify-end'
            } flex w-0 flex-1 items-center py-4 px-6` }
          >
            { footerLeft }
            <AddChildrens
              docId={ doc?.id }
              sections={ sections }
              className="py-2 inline-flex items-center hover:bg-indigo-600 hover:text-white rounded-md border border-gray-200 ease-in-out duration-200 shadow-gray-100 px-4 text-sm text-gray shadow-sm"
            >
              <span className="dashicons dashicons-plus-alt2 w-3.5 h-3.5 mr-2 text-base flex items-center"></span>
              { __( 'Add', 'wedocs' ) }
            </AddChildrens>
          </div>
        </div>
      </div>
      { /* Documentation Footer End */ }
    </div>
  );
};

export default ParentDocs;
