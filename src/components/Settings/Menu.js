import { __ } from '@wordpress/i18n';
import { Tab } from '@headlessui/react';
import Badge from '../ProPreviews/common/Badge';
import { Fragment, useState, useMemo } from '@wordpress/element';

const Menu = ({ searchQuery = '' }) => {
  let menus = {
    general: {
      text: __( 'General', 'wedocs' ),
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
          <path d="M8.325 2.317c.426-1.756 2.924-1.756 3.351 0 .275 1.135 1.575 1.673 2.572 1.066 1.543-.94 3.31.826 2.369 2.369-.608.997-.069 2.297 1.066 2.572 1.756.426 1.756 2.924 0 3.351-1.135.275-1.673 1.575-1.065 2.572.94 1.543-.826 3.31-2.369 2.369-.997-.608-2.297-.069-2.572 1.066-.426 1.756-2.924 1.756-3.351 0-.275-1.135-1.575-1.673-2.572-1.065-1.543.94-3.31-.826-2.369-2.369.608-.997.069-2.297-1.066-2.572-1.756-.426-1.756-2.924 0-3.351 1.135-.275 1.673-1.575 1.066-2.572-.94-1.543.826-3.31 2.369-2.369.997.608 2.297.069 2.572-1.066z" />
          <path d="M13 10a3 3 0 1 1-6 0 3 3 0 1 1 6 0z" />
        </svg>
      ),
    },
    ai: {
      text: __( 'AI Control', 'wedocs' ),
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
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-6.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
          <path d="M14 6h4v4" />
          <path d="M17 4v8" />
        </svg>
      ),
    },
  };

  const [ showSubTabs, setShowSubTabs ] = useState( true );

  menus = wp.hooks.applyFilters( 'wedocs_settings_menu', menus );

  // Filter menus based on search query
  const filteredMenus = useMemo(() => {
    if (!searchQuery || searchQuery.trim() === '') {
      return Object.entries(menus);
    }

    const query = searchQuery.toLowerCase().trim();
    const filtered = Object.entries(menus).filter(([key, menu]) => {
      // Check if menu text matches
      if (menu.text.toLowerCase().includes(query)) {
        return true;
      }

      // Check if any subtabs match
      if (menu.subtabs) {
        return menu.subtabs.some(subtab => 
          subtab.text.toLowerCase().includes(query)
        );
      }

      return false;
    });

    return filtered;
  }, [menus, searchQuery]);

  return (
    <Fragment>
      { searchQuery && filteredMenus.length === 0 && (
        <div className="px-5 py-3 text-sm text-gray-500 text-center">
          { __( 'No settings found', 'wedocs' ) }
        </div>
      ) }
      { filteredMenus.map( ( tab, index ) => (
        <Fragment key={ index }>
          { !tab[ 1 ]?.disabled ? (
            <Tab className="settings-tab w-full focus:outline-0 !text-black aria-selected:text-gray-600 aria-selected:bg-gray-100 hover:text-gray-600 hover:bg-gray-100 group rounded-md px-5 py-3 flex items-center text-sm font-medium cursor-pointer">
              { tab[ 1 ]?.icon }
              <span className="truncate">{ __( tab[ 1 ]?.text, 'wedocs' ) }</span>
              { tab[ 1 ]?.pro && <Badge classes="opacity-0 group-hover:opacity-100 transition-opacity"/> }
            </Tab>
          ) : (
            <Fragment>
              <div
                onClick={ () => setShowSubTabs( !showSubTabs ) }
                className={ `disable-tab-item settings-tab w-full focus:outline-0 !text-black aria-selected:text-gray-600 aria-selected:bg-gray-100 hover:text-gray-600 hover:bg-gray-100 group rounded-md px-5 py-3 flex items-center text-sm font-medium cursor-pointer` }
              >
                { tab[ 1 ]?.icon }
                <span className="truncate">{ tab[ 1 ]?.text }</span>
                { tab[ 1 ]?.pro && <Badge classes="opacity-0 group-hover:opacity-100 transition-opacity"/> }
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#6b7280" className="w-5 h-5 ml-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                </svg>
              </div>
              { tab[ 1 ]?.subtabs && tab[ 1 ]?.subtabs?.map( ( subtab, index ) => (
                <Tab
                  key={ index }
                  disabled={ subtab?.disabled }
                  className={ `${ showSubTabs ? '' : 'hidden' } settings-sub-tab w-full focus:outline-0 !text-black aria-selected:text-gray-600 aria-selected:bg-gray-100 hover:text-gray-600 hover:bg-gray-100 group rounded-md px-5 py-3 flex items-center text-sm font-medium` }
                >
                  <div className={ `pro-sub-settings ml-9 flex items-center w-full` }>
                    { subtab?.icon }
                    <span className="truncate">{ subtab?.text }</span>
                    { subtab?.pro && <Badge classes="opacity-0 group-hover:opacity-100 transition-opacity"/> }
                  </div>
                </Tab>
              ) ) }
            </Fragment>
          ) }
        </Fragment>
      ) ) }
    </Fragment>
  );
};

export default Menu;
