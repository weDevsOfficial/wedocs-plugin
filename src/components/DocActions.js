import { Fragment, useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import RestictionModal from './RestrictionModal';

const DocActions = ( { docId, type } ) => {
  const restrictionAction = wp.hooks.applyFilters(
    'wedocs_admin_article_restriction_action',
    '',
    docId,
    type
  );

  const documentationActionMenuWidth = wp.hooks.applyFilters(
    'wedocs_admin_documentation_action_menu_width',
    'w-[270px]'
  );

  const articleActionMenuWidth = wp.hooks.applyFilters(
    'wedocs_admin_article_action_menu_width',
    'w-[310px]'
  );

  const [ showActions, setShowActions ] = useState( false );

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
          { /* Edit documentation */ }
          <a
            href={ `${ window.location.origin }/wp-admin/post.php?post=${ docId }&action=edit` }
            target="_blank"
            className="group flex items-center py-2 px-4 text-sm font-medium text-gray-700 hover:bg-indigo-700 hover:text-white !shadow-none"
            rel="noreferrer"
          >
            { __( 'Edit', 'wedocs' ) }
          </a>

          <a
            target="_blank"
            href={ `${ window.location.origin }/?p=${ docId }` }
            rel="noreferrer"
            className="group flex items-center py-2 px-4 text-sm font-medium text-gray-700 hover:bg-indigo-700 hover:text-white !shadow-none"
          >
            { __( 'View', 'wedocs' ) }
          </a>

          { /* Add external actions */ }
          { restrictionAction }

          { /* Delete documentation */ }
          <RestictionModal
            docId={ docId }
            type={ type }
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
