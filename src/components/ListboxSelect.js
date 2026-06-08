// DESCRIPTION: Reusable Headless UI Combobox primitive for weDocs settings dropdowns.
// DESCRIPTION: Renders a searchable dropdown; callers own state, options, and change handling.

import { Fragment, useState } from '@wordpress/element';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { __ } from '@wordpress/i18n';

const ListboxSelect = ( {
  value,
  options = [],
  onChange,
  placeholder = __( 'Select an option', 'wedocs' ),
  disabled = false,
} ) => {
  const [ query, setQuery ] = useState( '' );

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

  const filteredOptions =
    query === ''
      ? options
      : options.filter( ( option ) =>
          option?.name
            ?.toLowerCase()
            .includes( query.toLowerCase().trim() )
        );

  return (
    <Combobox value={ value } onChange={ onChange }>
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded-md border border-gray-300 bg-white text-left shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 sm:text-sm">
          <Combobox.Input
            className="!w-full !border-none !py-2 !pl-3 !pr-10 text-sm leading-5 text-gray-900 !shadow-none focus:!ring-0"
            displayValue={ ( option ) => option?.name }
            onChange={ ( event ) => setQuery( event.target.value ) }
            placeholder={ __( 'Search a page…', 'wedocs' ) }
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={ Fragment }
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={ () => setQuery( '' ) }
        >
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            { filteredOptions.length === 0 ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                { __( 'No page found.', 'wedocs' ) }
              </div>
            ) : (
              filteredOptions.map( ( option ) => (
                <Combobox.Option
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
                </Combobox.Option>
              ) )
            ) }
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export default ListboxSelect;
