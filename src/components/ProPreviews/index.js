import { __ } from '@wordpress/i18n';
import PermissionSettings from './PermissionSettings';
import { userIsAdmin } from '../../utils/helper';
import Contributors from './common/Contributors';
import UpgradePopup from './common/UpgradePopup';
import LayoutSettings from './LayoutSettings';
import AiChatBotSettings from './AssistantWidgetPanels/AiChatPanel';
import ExploreSettings from './AssistantWidgetPanels/ExplorePanel';
import MessageSettings from './AssistantWidgetPanels/MessagePanel';
import PlacementSettings from './AssistantWidgetPanels/PlacementPanel';
import PreferenceSettings from './AssistantWidgetPanels/PreferencePanel';

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
            disabled: true,
            subtabs: [
                {
                    pro: true,
                    text: __( 'Ai Chat', 'wedocs-pro' ),
                    icon: (
                        <svg width="20" height="16" fill="none" style={{ marginRight: '1em' }} className="-ml-1 mr-4">
                            <path fillRule="evenodd" d="M1.703.818a1.02 1.02 0 0 1 1.022 1.022 1.02 1.02 0 0 1-.606.934v3.032l.165-.017C3.033 2.635 5.979.818 9.5.818s6.466 1.816 7.216 4.97l.165.014V2.775a1.02 1.02 0 0 1-.606-.934c0-.564.458-1.022 1.022-1.022a1.02 1.02 0 0 1 1.022 1.022 1.02 1.02 0 0 1-.606.934v3.245c.544.249.911.702.949 1.405l.003.568-.001.768c-.057 1.063-.862 1.557-1.897 1.638-.65 3.305-3.658 5.219-7.269 5.219s-6.62-1.914-7.269-5.221C1.195 10.3.392 9.72.337 8.659l-.003-.666.003-.466a1.68 1.68 0 0 1 .949-1.472v-3.28a1.02 1.02 0 0 1-.605-.934c0-.564.458-1.022 1.022-1.022zm13.566 6.45l.009.951-.01.939c-.16 3.046-2.682 4.837-5.768 4.837s-5.607-1.79-5.768-4.837l-.008-.939.009-.951c.166-3.042 2.685-4.826 5.768-4.826s5.601 1.784 5.768 4.826zM13.17 7.17c0-.602-.486-1.088-1.088-1.088s-1.088.486-1.088 1.088.486 1.088 1.088 1.088 1.088-.486 1.088-1.088zm-5.167 0a1.09 1.09 0 0 1-1.088 1.088A1.09 1.09 0 0 1 5.827 7.17a1.09 1.09 0 0 1 1.088-1.088A1.09 1.09 0 0 1 8.003 7.17z" style={{fill: '#6b7280'}}></path>
                        </svg>
                    ),
                },
                {
                    pro: true,
                    text: __( 'Explore', 'wedocs-pro' ),
                    icon: (
                        <svg width='20' height='20' fill='none' className="-ml-1 mr-4">
                            <path
                                strokeWidth='2'
                                stroke='#6b7280'
                                strokeLinecap='round'
                                className="-ml-1 mr-4"
                                d='M6 19h7a2 2 0 0 0 2-2V7.414a1 1 0 0 0-.293-.707L9.293 1.293A1 1 0 0 0 8.586 1H3a2 2 0 0 0-2 2v11m0 5l4.879-4.879m0 0A2.99 2.99 0 0 0 8 15a3 3 0 1 0 0-6 3 3 0 0 0-3 3 2.99 2.99 0 0 0 .879 2.121z'
                            />
                        </svg>
                    ),
                },
                {
                    pro: true,
                    text: __( 'Messaging', 'wedocs-pro' ),
                    icon: (
                        <svg width='20' height='16' fill='none' className="-ml-1 mr-4">
                            <path
                                d='M1 4l7.891 5.26a2 2 0 0 0 2.219 0L19 4M3 15h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z'
                                strokeWidth='2'
                                stroke='#6b7280'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                        </svg>
                    ),
                },
                {
                    pro: true,
                    text: __( 'Placement', 'wedocs-pro' ),
                    icon: (
                        <svg width='20' height='14' fill='none' className='-ml-1 mr-4'>
                            <path
                                strokeWidth='2'
                                stroke='#6b7280'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M1 1H17M1 7H17M1 13H8'
                            />
                        </svg>
                    ),
                },
                {
                    pro: true,
                    text: __( 'Widget Preference', 'wedocs-pro' ),
                    icon: (
                        <svg width='20' height='18' fill='none' className='-ml-1 mr-4'>
                            <path
                                strokeWidth='2'
                                stroke='#6b7280'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M9 3V1m0 2a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m-6 8a2 2 0 1 0 0-4m0 4a2 2 0 1 1 0-4m0 4v2m0-6V1m6 6v10m6-2a2 2 0 1 0 0-4m0 4a2 2 0 1 1 0-4m0 4v2m0-6V1'
                            />
                        </svg>
                    ),
                },
            ],
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

        return menus;
    }
);

wp.hooks.addFilter(
    'wedocs_settings_page_templates',
    'wedocs_settings_page_templates_callback',
    function ( templates, docSettings, setDocSettings, index ) {
        const assistantWidgetSubPanels = [
            <AiChatBotSettings key={ index } />,
            <ExploreSettings key={ index } />,
            <MessageSettings key={ index } />,
            <PlacementSettings key={ index } />,
            <PreferenceSettings
                key={ index }
                settingsData={ docSettings }
                setSettings={ setDocSettings }
            />,
        ];

        return [
            ...templates,
            <PermissionSettings key={ index } />,
            ...assistantWidgetSubPanels,
            <LayoutSettings
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
