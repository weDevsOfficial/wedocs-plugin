import {Fragment, useEffect, useState} from '@wordpress/element';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { useSelect } from "@wordpress/data";
import docsStore from "../data/docs";

const SelectBox = ({ name, options, setSettings, settingsData, generalSettings }) => {
    const [ selected, setSelected ] = useState( options[0] );

    useEffect( () => {
        let selectedPage = {};

        const docsHomeSettings = generalSettings?.docs_home;
        if ( ! Boolean( docsHomeSettings ) ) {
            selectedPage = options.filter( page => page?.name === 'Documentation' )[0];
        } else {
            selectedPage = options.filter( page => page?.id === parseInt( docsHomeSettings ) )[0];
        }

        setSelected( { ...selectedPage } );
        setSettings(
            { ...settingsData, general: { ...generalSettings, docs_home: selectedPage?.id } }
        );
    }, [] );

    useEffect( () => {
        setSettings( {
            ...settingsData,
            general: { ...generalSettings, [ name ]: selected?.id },
        } );
    }, [ selected ] );

    return (
        <Listbox value={ selected } onChange={ setSelected }>
            <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                    <span className="block truncate">
                        { selected?.name }
                    </span>
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
                        { options.map( ( page ) => (
                            <Listbox.Option
                                key={ page?.id }
                                className={({ active }) =>
                                    `cursor-pointer relative select-none py-2 pl-3 pr-9 ${
                                        active ? 'text-white bg-indigo-600' : 'text-gray-900'
                                    }`
                                }
                                value={ page }
                            >
                                {({ selected, active }) => (
                                    <>
                                        <span
                                            className={`block truncate ${
                                                selected ? 'font-semibold' : 'font-normal'
                                            }`}
                                        >
                                            { page?.name }
                                        </span>
                                        { selected && (
                                            <span className={ `absolute inset-y-0 right-0 flex items-center pr-4 ${ active ? 'text-white' : 'text-indigo-600' }` }>
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        ) }
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    );
}

export default SelectBox;
