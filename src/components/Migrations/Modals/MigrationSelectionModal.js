import { __ } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import { Dialog, Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

const MigrationSelectionModal = ( {
    children,
    className,
    isMigrationDone,
    handleMigrateClick,
    openSelectionModal,
    setOpenSelectionModal
} ) => {
    const migratablePlugins = [
        { key: 'betterdocs', name: __( 'BetterDocs', 'wedocs' ) }
    ];

    const [ selectedPlugin, setSelectedPlugin ] = useState( migratablePlugins[0] );

    return (
        <Fragment>
            <button
                className={ className }
                disabled={ isMigrationDone }
                onClick={ () => setOpenSelectionModal( true ) }
            >
                { children }
            </button>

            <Transition appear show={ openSelectionModal } as={ Fragment }>
                <Dialog
                    as="div"
                    className="relative z-[9999]"
                    onClose={ () => setOpenSelectionModal( false ) }
                >
                    <Transition.Child
                        as={ Fragment }
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <Transition.Child
                                as={ Fragment }
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-[900px] transform overflow-hidden rounded-2xl bg-white align-middle shadow-xl transition-all">
                                    <div className="sm:flex sm:items-start sm:justify-center py-12 px-9">
                                        <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-2xl text-center font-bold leading-7 text-gray-900 mb-4 text-[#111827]"
                                            >
                                                { __( 'Are you sure to migrate?', 'wedocs' ) }
                                            </Dialog.Title>
                                            <p className="text-gray-500 text-center text-base leading-6">
                                                { __(
                                                    'We want to make sure you have a successful migration experience to weDocs.',
                                                    'wedocs'
                                                ) }
                                            </p>

                                            { migratablePlugins && (
                                                <div className={ `select-migratable-plugin pt-16 pb-4` }>
                                                    { Object.keys( migratablePlugins ).length > 0 ? (
                                                        <div className={ `list-area grid gap-1` }>
                                                            <label className={ `text-gray-400 text-base leading-7` }>
                                                                { __( 'Migrate from', 'wedocs' ) }
                                                            </label>
                                                            <div className={ `list-field-content flex gap-5` }>
                                                                <Listbox value={ selectedPlugin } onChange={ setSelectedPlugin }>
                                                                    <div className="relative flex-[3]">
                                                                        <Listbox.Button className="relative w-full cursor-pointer rounded-md border border-gray-300 bg-white !w-[600px] py-3 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                                                            <span className="block truncate text-base">{ selectedPlugin?.name }</span>
                                                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                                            <ChevronDownIcon
                                                                                aria-hidden="true"
                                                                                className="h-5 w-5 text-gray-400"
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
                                                                                { migratablePlugins?.map( ( plugin ) => (
                                                                                    <Listbox.Option
                                                                                        key={ plugin?.key }
                                                                                        className={ ( { active } ) =>
                                                                                            `cursor-pointer relative select-none py-2 pl-3 pr-9 ${
                                                                                                active ? 'text-white bg-indigo-600' : 'text-gray-900'
                                                                                            }`
                                                                                        }
                                                                                        value={ plugin }
                                                                                    >
                                                                                        { ( { selected, active } ) => (
                                                                                            <>
                                                                                                <span
                                                                                                    className={ `block truncate ${
                                                                                                        selected ? 'font-semibold' : 'font-normal'
                                                                                                    }` }
                                                                                                >
                                                                                                  { plugin?.name }
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
                                                                <div className={ `migration-to-label flex-[1.25] rounded-md border border-gray-300 bg-white px-8 py-3 text-center sm:text-base text-[#333333] leading-none` }>
                                                                    { __( 'to weDocs' ) }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="relative mt-1">
                                                            <input
                                                                className="relative !w-full cursor-pointer !rounded-md border !border-gray-300 bg-white !py-2 !pl-3 !pr-10 text-left shadow-sm sm:text-sm"
                                                                placeholder={ __( 'loading…', 'wedocs' ) }
                                                                disabled
                                                            />
                                                        </div>
                                                    ) }
                                                </div>
                                            ) }
                                        </div>
                                    </div>

                                    <hr className={ `mt-14 w-full` } />
                                    <div className="my-5 space-x-3.5 text-center px-[70px] mb-5 sm:flex sm:items-start sm:justify-end">
                                        <button
                                            className="bg-white hover:bg-gray-200 text-gray-700 font-medium text-base py-2 px-5 border border-gray-300 rounded-md"
                                            onClick={ () => setOpenSelectionModal( false ) }
                                        >
                                            { __( 'Cancel', 'wedocs' ) }
                                        </button>
                                        <button
                                            onClick={ handleMigrateClick }
                                            className="bg-indigo-700 hover:bg-indigo-800 text-white font-medium text-base py-2 px-5 rounded-md"
                                        >
                                            { __( "Yes, I'm sure", 'wedocs' ) }
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </Fragment>
    );
}

export default MigrationSelectionModal;
