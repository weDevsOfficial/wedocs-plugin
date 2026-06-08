// DESCRIPTION: Read-only dropdown used inside Pro preview panels.
// DESCRIPTION: Opens like a real select, highlights the current free option, and routes clicks on locked options to the UpgradePopup.

import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import Badge from './Badge';
import UpgradePopup from './UpgradePopup';

const PreviewDropdown = ( { options = [], ariaLabel } ) => {
  const [ isOpen, setIsOpen ] = useState( false );

  const selected = options.find( ( option ) => option?.selected ) || options[ 0 ];

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={ ariaLabel }
        aria-expanded={ isOpen }
        onClick={ () => setIsOpen( ( prev ) => ! prev ) }
        className="relative w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
      >
        <span className="block truncate text-gray-900">{ selected?.name }</span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="h-5 w-5 text-gray-400"
          >
            <path
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>

      { isOpen && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          { options.map( ( option ) => {
            const isSelected = option?.id === selected?.id;
            const rowClasses = `group flex items-center select-none py-2 pl-3 pr-9 ${
              isSelected ? 'bg-gray-100' : 'hover:bg-[#F9FAFB]'
            } ${ option?.locked ? 'cursor-pointer text-gray-400' : 'cursor-default text-gray-900' }`;

            const content = (
              <>
                <span className={ `block truncate flex-1 ${ isSelected ? 'font-semibold' : 'font-normal' }` }>
                  { option?.name }
                </span>
                { option?.locked && (
                  <Badge
                    classes="opacity-0 group-hover:opacity-100 transition-opacity"
                    heading={ __( 'Pro Feature', 'wedocs' ) }
                  />
                ) }
              </>
            );

            if ( option?.locked ) {
              return (
                <li key={ option?.id } className={ rowClasses }>
                  <UpgradePopup className="flex items-center w-full">{ content }</UpgradePopup>
                </li>
              );
            }

            return (
              <li key={ option?.id } className={ rowClasses }>
                { content }
              </li>
            );
          } ) }
        </ul>
      ) }
    </div>
  );
};

export default PreviewDropdown;
