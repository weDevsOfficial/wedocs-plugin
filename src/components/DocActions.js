import { Fragment, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import RestictionModal from './RestrictionModal';
import QuickEditModal from './DocListing/QuickEditModal';
import { userIsAdmin } from '../utils/helper';
import { dispatch } from '@wordpress/data';
import Swal from 'sweetalert2';

const DocActions = ( { doc, type, section, sections, setShowArticles } ) => {
  const isAdmin = userIsAdmin();

  const documentationActionMenuWidth = wp.hooks.applyFilters(
    'wedocs_admin_documentation_action_menu_width',
    'w-[270px]'
  );

  const articleActionMenuWidth = wp.hooks.applyFilters(
    'wedocs_admin_article_action_menu_width',
    'w-[310px]'
  );

  const [ showActions, setShowActions ] = useState( false );

  // Update documentation data.
  const updateDocStatus = () => {
    dispatch( 'wedocs/docs' )
      .updateDoc( doc?.id, { status: doc?.status === 'draft' ? 'publish' : 'draft' } )
      .then( ( { docs } ) => {
        Swal.fire( {
          icon              : 'success',
          toast             : true,
          title             : __( `${ type === 'doc' ? 'Doc' : 'Article' } ${ doc?.status === 'draft' ? 'Published' : 'Drafted' } Successfully!`, 'wedocs' ),
          timer             : 2000,
          position          : 'bottom-end',
          showConfirmButton : false,
          // Your article has been successfully drafted
          text              : __(
            `${ type === 'doc' ? 'Your documentation' : 'Your article' } has been successfully ${doc?.status === 'draft' ? 'published' : 'drafted' }`,
            'wedocs'
          ),
        } );
      } )
      .catch( err => console.log( err ) );
  }

  return (
    <Fragment>
      <div
        className="documentation-ellipsis-actions relative"
        onMouseEnter={ () => setShowActions( true ) }
        onMouseLeave={ () => setShowActions( false ) }
      >
        <span
          className="dashicons dashicons-ellipsis d-block wedocs-cursor-pointer wedocs-text-sm wedocs-rotate-90 wedocs-text-gray-500"
        ></span>
        <div
          id="action-menus"
          className={ `${
            type === 'article' ? articleActionMenuWidth : documentationActionMenuWidth
          } ${ showActions ? 'wedocs-block' : 'wedocs-hidden' } wedocs-z-40 wedocs-bg-white wedocs-border wedocs-border-[#DBDBDB] wedocs-absolute wedocs-shadow -wedocs-right-3.5 wedocs-py-1 wedocs-rounded-md wedocs-mt-2.5 hover:wedocs-block after:content-[''] before:content-[''] after:wedocs-absolute before:wedocs-absolute after:wedocs-w-[13px] before:wedocs-w-full after:wedocs-h-[13px] before:wedocs-h-2.5 after:wedocs-top-[-7px] before:-wedocs-top-2.5 after:wedocs-right-4 after:wedocs-z-[-1] after:wedocs-bg-white after:wedocs-border after:wedocs-border-[#DBDBDB] after:!wedocs-rotate-45 after:wedocs-border-r-0 after:wedocs-border-b-0` }
        >
          { isAdmin && type === 'article' && (
            <QuickEditModal
              article={ doc }
              sections={ sections }
              defaultSection={ section }
              setShowArticles={ setShowArticles }
              className={ `wedocs-group wedocs-flex wedocs-items-center wedocs-py-2 wedocs-px-4 wedocs-text-sm wedocs-font-medium wedocs-text-gray-700 hover:wedocs-bg-indigo-700 hover:wedocs-text-white !wedocs-shadow-none wedocs-w-full` }
            >
              { __( 'Quick Edit', 'wedocs' ) }
            </QuickEditModal>
          ) }

          { /* Edit documentation */ }
          <a
            href={ `${ weDocsAdminVars.adminUrl }post.php?post=${ doc?.id }&action=edit` }
            target="_blank"
            className="wedocs-group wedocs-flex wedocs-items-center wedocs-py-2 wedocs-px-4 wedocs-text-sm wedocs-font-medium wedocs-text-gray-700 hover:wedocs-bg-indigo-700 hover:wedocs-text-white !wedocs-shadow-none"
            rel="noreferrer"
          >
            { __( 'Edit', 'wedocs' ) }
          </a>

          <a
            target="_blank"
            href={ doc?.link }
            rel="noreferrer"
            className="wedocs-group wedocs-flex wedocs-items-center wedocs-py-2 wedocs-px-4 wedocs-text-sm wedocs-font-medium wedocs-text-gray-700 hover:wedocs-bg-indigo-700 hover:wedocs-text-white !wedocs-shadow-none"
          >
            { __( 'View', 'wedocs' ) }
          </a>

          <span
            onClick={ updateDocStatus }
            className="wedocs-group wedocs-flex wedocs-items-center wedocs-py-2 wedocs-px-4 wedocs-text-sm wedocs-font-medium wedocs-text-gray-700 hover:wedocs-bg-indigo-700 hover:wedocs-text-white !wedocs-shadow-none"
          >
            { doc?.status === 'draft' ? __( 'Publish Now', 'wedocs' ) : __( 'Switch to Draft', 'wedocs' ) }
          </span>

          { /* Add external actions */ }
          { wp.hooks.applyFilters(
            'wedocs_admin_article_restriction_action',
            '',
            doc?.id,
            type
          ) }

          { /* Delete documentation */ }
          <RestictionModal
            type={ type }
            docId={ doc?.id }
            classes="wedocs-w-full wedocs-group wedocs-flex wedocs-items-center wedocs-py-2 wedocs-px-4 wedocs-text-sm wedocs-font-medium wedocs-text-red-500 hover:wedocs-bg-indigo-700 hover:wedocs-text-white"
          >
            { __( 'Delete', 'wedocs' ) }
          </RestictionModal>
        </div>
      </div>
    </Fragment>
  );
};

export default DocActions;
