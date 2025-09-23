import { Fragment, useEffect, useState } from '@wordpress/element';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { useSelect } from '@wordpress/data';
import settingsStore from '../data/settings';
import { __ } from '@wordpress/i18n';
import docsStore from '../data/docs';

const SelectBox = ( { name, setSettings, settingsData, settingsPanel } ) => {
  const docPageId = useSelect(
    ( select ) =>
      select( settingsStore ).getGeneralSettingsOption( 'docs_home' ),
    []
  );

  const pages = useSelect( ( select ) => select( docsStore ).getPages(), [] );

  const [ pageOptions, setPageOptions ] = useState( [] );
  const [ selectedPage, setSelectedPage ] = useState( {} );

  useEffect( () => {
    setSettings( {
      ...settingsData,
      general: { ...settingsPanel, [ name ]: selectedPage?.id },
    } );
  }, [ selectedPage ] );

  useEffect( () => {
    const options = pages?.map( ( page ) => {
      return { id: page?.id, name: page?.title?.rendered };
    } );

    let selectedPageObj = {};
    if ( ! Boolean( docPageId ) ) {
      selectedPageObj = options?.filter(
        ( page ) => page?.name === 'Documentation'
      )[ 0 ];
    } else {
      selectedPageObj = options?.filter(
        ( page ) => page?.id === parseInt( docPageId )
      )[ 0 ];
    }

    selectedPageObj = ( typeof selectedPageObj === 'undefined' || selectedPageObj === {} ) ? { ...options?.[0] } : selectedPageObj;

    setPageOptions( [ ...options ] );
    setSelectedPage( { ...selectedPageObj } );

    setSettings( {
      ...settingsData,
      general: { ...settingsPanel, docs_home: selectedPage?.id },
    } );
  }, [ pages ] );

  return (
    <Fragment>
      { selectedPage && Object.keys( selectedPage ).length > 0 ? (
        <Listbox value={ selectedPage } onChange={ setSelectedPage }>
          <div className="wedocs-relative wedocs-mt-1">
            <Listbox.Button className="wedocs-relative wedocs-w-full wedocs-cursor-pointer wedocs-rounded-md wedocs-border wedocs-border-gray-300 wedocs-bg-white wedocs-py-2 wedocs-pl-3 wedocs-pr-10 wedocs-text-left wedocs-shadow-sm focus:wedocs-border-indigo-500 focus:wedocs-outline-none focus:wedocs-ring-1 focus:wedocs-ring-indigo-500 sm:wedocs-text-sm">
              <span className="wedocs-block wedocs-truncate">{ selectedPage?.name }</span>
              <span className="wedocs-pointer-events-none wedocs-absolute wedocs-inset-y-0 wedocs-right-0 wedocs-flex wedocs-items-center wedocs-pr-2">
                <ChevronDownIcon
                  className="wedocs-h-5 wedocs-w-5 wedocs-text-gray-400"
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
              <Listbox.Options className="wedocs-absolute wedocs-z-10 wedocs-mt-1 wedocs-max-h-60 wedocs-w-full wedocs-overflow-auto wedocs-rounded-md wedocs-bg-white wedocs-py-1 wedocs-text-base wedocs-shadow-lg wedocs-ring-1 wedocs-ring-black wedocs-ring-opacity-5 focus:wedocs-outline-none sm:wedocs-text-sm">
                { pageOptions?.map( ( page ) => (
                  <Listbox.Option
                    key={ page?.id }
                    className={ ( { active } ) =>
                      `wedocs-cursor-pointer wedocs-relative wedocs-select-none wedocs-py-2 wedocs-pl-3 wedocs-pr-9 ${
                        active ? 'wedocs-text-white wedocs-bg-indigo-600' : 'wedocs-text-gray-900'
                      }`
                    }
                    value={ page }
                  >
                    { ( { selected, active } ) => (
                      <>
                        <span
                          className={ `wedocs-block wedocs-truncate ${
                            selected ? 'wedocs-font-semibold' : 'wedocs-font-normal'
                          }` }
                        >
                          { page?.name }
                        </span>
                        { selected && (
                          <span
                            className={ `wedocs-absolute wedocs-inset-y-0 wedocs-right-0 wedocs-flex wedocs-items-center wedocs-pr-4 ${
                              active ? 'wedocs-text-white' : 'wedocs-text-indigo-600'
                            }` }
                          >
                            <CheckIcon className="wedocs-h-5 wedocs-w-5" aria-hidden="true" />
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
      ) : (
        <div className="wedocs-relative wedocs-mt-1">
          <input
            className="wedocs-relative !wedocs-w-full wedocs-cursor-pointer !wedocs-rounded-md wedocs-border !wedocs-border-gray-300 wedocs-bg-white !wedocs-py-2 !wedocs-pl-3 !wedocs-pr-10 wedocs-text-left wedocs-shadow-sm sm:wedocs-text-sm"
            placeholder={ __( 'Page not found', 'wedocs' ) }
            disabled
          />
        </div>
      ) }
    </Fragment>
  );
};

export default SelectBox;
