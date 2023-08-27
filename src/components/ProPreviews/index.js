import { __ } from '@wordpress/i18n';
import PermissionSettings from './PermissionSettings';
import AssistantWidgetSettings from './AssistantWidgetSettings';
import { userIsAdmin } from '../../utils/helper';
import { WrenchIcon } from '@heroicons/react/24/outline'
import Contributors from './common/Contributors';
import UpgradePopup from './common/UpgradePopup';
import LayoutSettings from './LayoutSettings';
import IntegrateAiSettings from './IntegrateAiSettings';

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
        menus.styles = {
            pro: true,
            text: __( 'Layout & Styles', 'wedocs-pro' ),
            icon: (
                <svg
                    width="20"
                    height="20"
                    fill="none"
                    strokeWidth="2"
                    stroke="#6b7280"
                    strokeLinejoin="round"
                    className="-ml-0.5 mr-4"
                >
                    <path d="M1 2.47a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2zm0 8a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-6zm12 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-6z" />
                </svg>
            ),
        };
        menus.integrate_ai = {
            pro: true,
            text: __( 'Integrate AI', 'wedocs' ),
            icon: (
                <WrenchIcon className="-ml-1 mr-4 h-5 w-5 text-gray-600" />
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
            <LayoutSettings
                key={ index }
                settingsData={ docSettings }
                setSettings={ setDocSettings }
            />,
            <IntegrateAiSettings
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
              <UpgradePopup>
                <span className="group flex items-center py-2 px-4 space-x- text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 !shadow-none">
                  <span>{ __( 'Permission Management', 'wedocs' ) }</span>
                  <span className={ `crown cursor-pointer relative text-white text-[10px] py-[3px] px-[5px] leading-none ml-2.5` }>
                    <svg className='crown-icon hover:fill-[#cf7500]' xmlns="http://www.w3.org/2000/svg" width="20" fill="#ff9000" height="15">
                      <path d="M19.213 4.116c.003.054-.001.108-.015.162l-1.234 6.255a.56.56 0 0 1-.541.413l-7.402.036h-.003-7.402c-.257 0-.482-.171-.544-.414L.839 4.295a.53.53 0 0 1-.015-.166C.347 3.983 0 3.548 0 3.036c0-.632.528-1.145 1.178-1.145s1.178.514 1.178 1.145a1.13 1.13 0 0 1-.43.884L3.47 5.434c.39.383.932.602 1.486.602.655 0 1.28-.303 1.673-.81l2.538-3.272c-.213-.207-.345-.494-.345-.809C8.822.514 9.351 0 10 0s1.178.514 1.178 1.145c0 .306-.125.584-.327.79l.002.003 2.52 3.281c.393.512 1.02.818 1.677.818a2.11 2.11 0 0 0 1.481-.597l1.554-1.512c-.268-.21-.44-.531-.44-.892 0-.632.528-1.145 1.177-1.145S20 2.405 20 3.036c0 .498-.329.922-.787 1.079zm-1.369 8.575c0-.301-.251-.545-.561-.545H2.779c-.31 0-.561.244-.561.545V14c0 .301.251.546.561.546h14.505c.31 0 .561-.244.561-.546v-1.309z"/>
                    </svg>
                  </span>
                  <span className='ml-1 text-white bg-[#FF9000] px-1.5 py-0.5 rounded leading-[13.31px] text-[11px] pt-[1px] pb-0.5 px-[5px]'>
                    { __( 'Pro', 'wedocs' ) }
                  </span>
                </span>
              </UpgradePopup>
            ) }
            { type === 'article' && (
              <UpgradePopup>
                <span className='group w-full flex items-center py-2 px-4 space-x-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 !shadow-none'>
                  <span>{ __( 'Restrict editing for admin only', 'wedocs' ) }</span>
                  <span className={ `crown cursor-pointer relative text-white text-[10px] py-[3px] px-[5px] leading-none ml-2.5` }>
                    <svg className='crown-icon hover:fill-[#cf7500]' xmlns="http://www.w3.org/2000/svg" width="20" fill="#ff9000" height="15">
                      <path d="M19.213 4.116c.003.054-.001.108-.015.162l-1.234 6.255a.56.56 0 0 1-.541.413l-7.402.036h-.003-7.402c-.257 0-.482-.171-.544-.414L.839 4.295a.53.53 0 0 1-.015-.166C.347 3.983 0 3.548 0 3.036c0-.632.528-1.145 1.178-1.145s1.178.514 1.178 1.145a1.13 1.13 0 0 1-.43.884L3.47 5.434c.39.383.932.602 1.486.602.655 0 1.28-.303 1.673-.81l2.538-3.272c-.213-.207-.345-.494-.345-.809C8.822.514 9.351 0 10 0s1.178.514 1.178 1.145c0 .306-.125.584-.327.79l.002.003 2.52 3.281c.393.512 1.02.818 1.677.818a2.11 2.11 0 0 0 1.481-.597l1.554-1.512c-.268-.21-.44-.531-.44-.892 0-.632.528-1.145 1.177-1.145S20 2.405 20 3.036c0 .498-.329.922-.787 1.079zm-1.369 8.575c0-.301-.251-.545-.561-.545H2.779c-.31 0-.561.244-.561.545V14c0 .301.251.546.561.546h14.505c.31 0 .561-.244.561-.546v-1.309z"/>
                    </svg>
                  </span>
                  <span className='!ml-1 text-white bg-[#FF9000] px-1.5 py-0.5 rounded leading-[13.31px] text-[11px] pt-[1px] pb-0.5 px-[5px]'>
                    { __( 'Pro', 'wedocs' ) }
                  </span>
                </span>
              </UpgradePopup>
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
