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
          text              : __(
            `${ type === 'doc' ? 'Documentation' : 'Article documentation' } has been ${doc?.status === 'draft' ? 'published' : 'drafted' } successfully`,
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
          className="dashicons dashicons-ellipsis d-block cursor-pointer text-sm rotate-90 text-gray-500"
        ></span>
        <div
          id="action-menus"
          className={ `${
            type === 'article' ? articleActionMenuWidth : documentationActionMenuWidth
          } ${ showActions ? 'block' : 'hidden' } z-40 bg-white border border-[#DBDBDB] absolute z-10 shadow -right-3.5 py-1 rounded-md mt-2.5 hover:block after:content-[''] before:content-[''] after:absolute before:absolute after:w-[13px] before:w-full after:h-[13px] before:h-2.5 after:top-[-7px] before:-top-2.5 after:right-4 after:z-[-1] after:bg-white after:border after:border-[#DBDBDB] after:!rotate-45 after:border-r-0 after:border-b-0` }
        >
          { isAdmin && type === 'article' && (
            <QuickEditModal
              article={ doc }
              sections={ sections }
              defaultSection={ section }
              setShowArticles={ setShowArticles }
              className={ `group flex items-center py-2 px-4 text-sm font-medium text-gray-700 hover:bg-indigo-700 hover:text-white !shadow-none w-full` }
            >
              { __( 'Quick Edit', 'wedocs' ) }
            </QuickEditModal>
          ) }

          { /* Edit documentation */ }
          <a
            href={ `${ weDocsAdminVars.adminUrl }post.php?post=${ doc?.id }&action=edit` }
            target="_blank"
            className="group flex items-center py-2 px-4 text-sm font-medium text-gray-700 hover:bg-indigo-700 hover:text-white !shadow-none"
            rel="noreferrer"
          >
            { __( 'Edit', 'wedocs' ) }
          </a>

          <a
            target="_blank"
            href={ doc?.link }
            rel="noreferrer"
            className="group flex items-center py-2 px-4 text-sm font-medium text-gray-700 hover:bg-indigo-700 hover:text-white !shadow-none"
          >
            { __( 'View', 'wedocs' ) }
          </a>

          <span
            onClick={ updateDocStatus }
            className="group flex items-center py-2 px-4 text-sm font-medium text-gray-700 hover:bg-indigo-700 hover:text-white !shadow-none"
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
            classes="w-full group flex items-center py-2 px-4 text-sm font-medium text-red-500 hover:bg-indigo-700 hover:text-white"
          >
            { __( 'Delete', 'wedocs' ) }
          </RestictionModal>
        </div>
      </div>
    </Fragment>
  );
};

export default DocActions;
