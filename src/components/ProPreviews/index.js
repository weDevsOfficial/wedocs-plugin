import { __ } from '@wordpress/i18n';
import PermissionSettings from './PermissionSettings';
import AssistantWidgetSettings from './AssistantWidgetSettings';
import { userIsAdmin } from '../../utils/helper';
import Badge from './common/Badge';
import Contributors from './common/Contributors';

wp.hooks.addFilter(
    'wedocs_settings_menu',
    'settings_menu_override',
    function ( menus ) {
        menus.permission = {
            pro: true,
            text: __( 'Permission Management', 'wedocs' ),
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="#6b7280"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    className="-ml-1 mr-4"
                >
                    <path d="M10 2.866a3.99 3.99 0 0 1 3-1.354 4 4 0 1 1 0 8 3.99 3.99 0 0 1-3-1.354m3 11.354H1v-1a6 6 0 1 1 12 0v1zm0 0h6v-1a6 6 0 0 0-6-6 5.97 5.97 0 0 0-3 .803m1-7.803a4 4 0 1 1-8 0 4 4 0 1 1 8 0z" />
                </svg>
            ),
        };
        menus.assistant = {
            pro: true,
            text: __( 'Assistant Widget', 'wedocs' ),
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="#6b7280"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    className="-ml-1 mr-4"
                >
                    <path d="M1 3.512v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-6l-2-2H3a2 2 0 0 0-2 2z" />
                </svg>
            ),
        };

        return menus;
    }
);

wp.hooks.addFilter(
    'wedocs_settings_page_templates',
    'wedocs_settings_page_templates_callback',
    function ( templates, docSettings, setDocSettings, index ) {
        return [
            ...templates,
            <PermissionSettings key={ index } />,
            <AssistantWidgetSettings
                key={ index }
                settingsData={ docSettings }
                setSettings={ setDocSettings }
            />,
        ];
    }
);

wp.hooks.addFilter(
  'wedocs_admin_article_restriction_action',
  'wedocs_admin_article_restriction_action_callback',
  function ( componentsArray, id, type ) {
    return (
      <>
        { userIsAdmin() && (
          <>
            { type === 'doc' && (
              <span
                className="group flex items-center py-2 px-4 space-x- text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 !shadow-none"
              >
                <span>{ __( 'Manage', 'wedocs' ) }</span>
                <Badge />
              </span>
            ) }
            { type === 'article' && (
              <span
                className='group w-full flex items-center py-2 px-4 space-x-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 !shadow-none'
              >
                { __(
                  'Restrict editing for admin only',
                  'wedocs'
                ) }
                <Badge />
              </span>
            ) }
          </>
        ) }
      </>
    );
  }
);

wp.hooks.addFilter(
  'wedocs_documentation_contributors',
  'wedocs_documentation_contributors_callback',
  function () {
    if ( !userIsAdmin() ) return;

    return <Contributors />;
  }
);

wp.hooks.addFilter(
  'wedocs_article_contributors',
  'wedocs_article_contributors_callback',
  function () {
    if ( !userIsAdmin() ) return;

    return <Contributors />;
  }
);
