// DESCRIPTION: Reusable Headless UI Listbox primitive for weDocs settings dropdowns.
// DESCRIPTION: Handles rendering only — callers own state, options, and change handling.

import { Fragment } from '@wordpress/element';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { __ } from '@wordpress/i18n';

const ListboxSelect = ( {
  value,
  options = [],
  onChange,
  placeholder = __( 'Select an option', 'wedocs' ),
  disabled = false,
} ) => {
  if ( disabled || ! options.length ) {
    return (
      <div className="relative mt-1">
        <input
          className="relative !w-full cursor-pointer !rounded-md border !border-gray-300 bg-white !py-2 !pl-3 !pr-10 text-left shadow-sm sm:text-sm"
          placeholder={ placeholder }
          disabled
        />
      </div>
    );
  }

  return (
    <Listbox value={ value } onChange={ onChange }>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
          <span className="block truncate">{ value?.name }</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={ Fragment }
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            { options.map( ( option ) => (
              <Listbox.Option
                key={ option?.id }
                className={ ( { active } ) =>
                  `cursor-pointer relative select-none py-2 pl-3 pr-9 ${
                    active ? 'text-white bg-indigo-600' : 'text-gray-900'
                  }`
                }
                value={ option }
              >
                { ( { selected, active } ) => (
                  <>
                    <span
                      className={ `block truncate ${
                        selected ? 'font-semibold' : 'font-normal'
                      }` }
                    >
                      { option?.name }
                    </span>
                    { selected && (
                      <span
                        className={ `absolute inset-y-0 right-0 flex items-center pr-4 ${
                          active ? 'text-white' : 'text-indigo-600'
                        }` }
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) }
                  </>
                ) }
              </Listbox.Option>
            ) ) }
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default ListboxSelect;
