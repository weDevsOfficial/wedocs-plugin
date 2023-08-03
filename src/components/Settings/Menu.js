import { __ } from '@wordpress/i18n';
import { Tab } from '@headlessui/react';
import Badge from '../ProPreviews/common/Badge';

const Menu = () => {
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
  };

  menus = wp.hooks.applyFilters( 'wedocs_settings_menu', menus );

  return (
    <>
      { Object.entries( menus ).map( ( value, index ) => (
        <Tab
          key={ index }
          className="w-full focus:outline-0 !text-black aria-selected:text-gray-600 aria-selected:bg-gray-100 hover:text-gray-600 hover:bg-gray-100 group rounded-md px-5 py-3 flex items-center text-sm font-medium"
        >
          { value[ 1 ]?.icon }
          <span className="truncate">{ value[ 1 ]?.text }</span>
          { value[ 1 ]?.pro && <Badge /> }
        </Tab>
      ) ) }
    </>
  );
};

export default Menu;
