import { __ } from '@wordpress/i18n';
import { Tab } from '@headlessui/react';
import { useState } from '@wordpress/element';

const Menu = () => {
  let menus = {
    general: __( 'General', 'wedocs' ),
  };

  menus = wp.hooks.applyFilters( 'wedocs_settings_menu', menus );

  const [ iconPath, setIconPath ] = useState(
    'M1 10.512l2-2m0 0l7-7 7 7m-14 0v10a1 1 0 0 0 1 1h3m10-11l2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6'
  );

  const handleMenuIconPath = ( index ) => {
    let path =
      index === 1
        ? 'M10 2.866a3.99 3.99 0 0 1 3-1.354 4 4 0 1 1 0 8 3.99 3.99 0 0 1-3-1.354m3 11.354H1v-1a6 6 0 1 1 12 0v1zm0 0h6v-1a6 6 0 0 0-6-6 5.97 5.97 0 0 0-3 .803m1-7.803a4 4 0 1 1-8 0 4 4 0 1 1 8 0z'
        : iconPath;
    path =
      index === 2
        ? 'M1 3.512v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-6l-2-2H3a2 2 0 0 0-2 2z'
        : path;
    path =
      index === 3
        ? 'M13 5.512a2 2 0 0 1 2 2m4 0a6 6 0 0 1-7.743 5.743L9 15.512H7v2H5v2H2a1 1 0 0 1-1-1v-2.586a1 1 0 0 1 .293-.707l5.964-5.964A6 6 0 0 1 13 1.512a6 6 0 0 1 6 6z'
        : path;

    return path;
  };

  return (
    <>
      { Object.entries( menus ).map( ( value, index ) => (
        <Tab
          key={ index }
          className="w-full focus:outline-0 !text-black aria-selected:text-gray-600 aria-selected:bg-gray-100 hover:text-gray-600 hover:bg-gray-100 group rounded-md px-5 py-3 flex items-center text-sm font-medium"
        >
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
          <span className="truncate">{ value[ 1 ] }</span>
        </Tab>
      ) ) }
    </>
  );
};

export default Menu;
