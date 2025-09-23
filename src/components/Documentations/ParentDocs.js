import { __, sprintf } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import docsStore from '../../data/docs';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import AddChildrens from './AddChildrens';
import { Link } from 'react-router-dom';
import he from 'he';
import extractedTitle from '../../utils/extractedTitle';
import DocActions from '../DocActions';
import { userIsAdmin } from '../../utils/helper';
import { Fragment } from '@wordpress/element';

const ParentDocs = ( { doc } ) => {
  if ( ! doc ) {
    return;
  }

  const isAdmin = userIsAdmin();

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable( { id: doc.id } );

  const style = {
    transform: CSS.Transform.toString( transform ),
    zIndex: isDragging ? 9999 : '',
    transition
  };

  const privacyIcon = wp.hooks.applyFilters(
    'wedocs_documentation_privacy_action',
    [],
    doc.id
  );

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
    doc?.id
  );

  const showActions = wp.hooks.applyFilters(
    'wedocs_show_documentation_actions',
    true
  );

  return (
    <div
      style={ style }
      { ...attributes }
      ref={ setNodeRef }
      className="wedocs-col-span-1 wedocs-rounded wedocs-bg-white wedocs-shadow"
    >
      { /* Documentation Header Start */ }
      <div className="wedocs-flex wedocs-w-full wedocs-items-center wedocs-justify-between wedocs-px-6 wedocs-h-[4.5rem]">
        <div className="wedocs-flex-1">
          <div className="wedocs-inline-flex wedocs-items-center wedocs-space-x-3">
            <div className="wedocs-flex wedocs-items-center wedocs-space-x-3 wedocs-flex-1 group">
              <div
                className="tooltip wedocs-cursor-pointer before:wedocs-max-w-xl wedocs-z-[0]"
                data-tip={ he.decode( __( doc?.title?.rendered, 'wedocs' ) ) }
              >
                <Link to={ `/section/${ doc.id }` }>
                  <h3
                    className="wedocs-truncate hover:wedocs-underline wedocs-text-lg wedocs-font-medium wedocs-text-[#3B3F4A]"
                    dangerouslySetInnerHTML={ {
                      __html: extractedTitle( doc?.title?.rendered, doc.status !== 'publish' ? 12 : 20 ),
                    } }
                  ></h3>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="wedocs-flex wedocs-items-center">
          { doc?.status === 'draft' && (
            <div className={ `docs-draft-status wedocs-font-medium wedocs-text-sm wedocs-text-gray-800 wedocs-leading-5 wedocs-bg-[#E3E5E7] wedocs-rounded-[42px] wedocs-py-0.5 wedocs-px-2.5` }>
              { __( 'Draft', 'wedocs' ) }
            </div>
          ) }
          { /* Render private documentation icon */ }
          { isAdmin && (
            <Fragment>
              <svg
                width="17"
                height="17"
                fill="none"
                { ...listeners }
                className={ `wedocs-cursor-grab wedocs-p-5 wedocs-box-content` }
              >
                <path
                  fill="#9ca3af"
                  className={ `fill-gray-500` }
                  d="M16.951 8.549l-2.584 2.573-.154.15c-.14.125-.297.15-.466.075-.161-.072-.244-.201-.244-.383l.004-1.358c.004-.165-.036-.229-.215-.226H10.02c-.161 0-.215.043-.215.211v3.29c0 .158.05.204.204.201l1.34-.004c.201-.004.351.072.426.258s.029.348-.115.487L9.06 16.429c-.093.093-.154.097-.247 0l-2.602-2.605c-.14-.14-.19-.305-.115-.487s.226-.262.426-.262l1.358.004c.136.004.19-.036.19-.179V9.556a.14.14 0 0 0-.176-.176H4.552c-.147 0-.183.05-.179.186l.004 1.34c.004.204-.065.366-.262.444s-.358.018-.502-.129l-2.58-2.577c-.108-.104-.104-.168 0-.272l2.566-2.566c.151-.151.312-.219.516-.136s.262.254.258.462l-.004 1.322c-.004.14.039.186.183.186h3.343c.136 0 .172-.047.172-.176V4.123c0-.15-.057-.179-.19-.179l-1.34.004c-.208.004-.366-.068-.444-.262s-.014-.358.129-.502L8.737.668 8.898.5h.072l.161.168 2.516 2.516c.143.143.208.308.129.502s-.236.265-.444.262c-.441-.004-.882.004-1.322-.004-.151-.004-.208.036-.208.197v3.308c0 .147.047.194.194.194h3.308c.161 0 .201-.057.197-.208l-.004-1.376a.39.39 0 0 1 .244-.383c.168-.075.326-.05.466.075l.129.125 2.609 2.598a.28.28 0 0 1 .007.075z"
                />
              </svg>
            </Fragment>
          ) }
        </div>
        <div className="wedocs-flex wedocs-items-center">
          { privacyIcon }
          { showActions && <DocActions doc={ doc } type="doc" disabled /> }
        </div>
      </div>
      <Link to={ `/section/${ doc.id }` }>
        { /* Documentation Body Start */ }
        <div className="wedocs-w-full wedocs-p-6 wedocs-pt-0 wedocs-pb-7">
          <ul role="list" className="wedocs-mb-6 wedocs-rounded-md">
            <li className="wedocs-flex wedocs-items-center wedocs-justify-between wedocs-mb-0 wedocs-py-1.5 wedocs-pl-3 wedocs-pr-4 wedocs-text-sm">
              <div className="wedocs-w-full wedocs-inline-flex wedocs-items-center">
                <div className="wedocs-w-6 wedocs-flex-none wedocs--mt-1">
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
                <span className="wedocs-ml-2 wedocs-flex-1 wedocs-truncate wedocs-text-[#3B3F4A] hover:wedocs-underline wedocs-decoration-1">
                  { sprintf(
                    // translators: %d: Length of documentation sections
                    __( '%d Sections', 'wedocs' ),
                    sections.length
                  ) }
                </span>
              </div>
            </li>
            <li className="wedocs-flex wedocs-items-center wedocs-justify-between wedocs-mb-0 wedocs-py-1.5 wedocs-pl-3 wedocs-pr-4 wedocs-text-sm">
              <div className="wedocs-flex wedocs-w-0 wedocs-flex-1 wedocs-items-center">
                <div className="wedocs-w-6 wedocs-flex wedocs-justify-center wedocs--mt-0.5">
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
                <span className="wedocs-ml-2 wedocs-w-0 wedocs-flex-1 wedocs-truncate wedocs-text-[#3B3F4A] hover:wedocs-underline wedocs-decoration-1">
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
      </Link>
      { /* Documentation Section End */ }

      { /* Documentation Footer Start */ }
      { showActions && (
        <div className="wedocs-border-t wedocs-border-gray-200">
          <div className="wedocs--mt-px wedocs-flex wedocs-divide-x wedocs-divide-gray-200">
            <div
              className={ `${
                footerLeft[ 0 ] ? 'wedocs-justify-between' : 'wedocs-justify-end'
              } wedocs-flex wedocs-w-0 wedocs-flex-1 wedocs-items-center wedocs-py-4 wedocs-px-6` }
            >
              { footerLeft }
              <AddChildrens
                docId={ doc?.id }
                sections={ sections }
                className="wedocs-py-2 wedocs-inline-flex wedocs-items-center wedocs-bg-indigo-600 wedocs-text-white wedocs-rounded-md wedocs-border wedocs-border-gray-200 wedocs-ease-in-out wedocs-duration-200 wedocs-shadow-gray-100 wedocs-px-4 wedocs-text-sm wedocs-text-gray wedocs-shadow-sm wedocs-cursor-pointer"
              >
                <span className="dashicons dashicons-plus-alt2 wedocs-w-3.5 wedocs-h-3.5 wedocs-mr-2 wedocs-text-base wedocs-flex wedocs-items-center"></span>
                { __( 'Add', 'wedocs' ) }
              </AddChildrens>
            </div>
          </div>
        </div>
      ) }
      { /* Documentation Footer End */ }
    </div>
  );
};

export default ParentDocs;
