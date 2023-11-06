import { __ } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import { Dialog, Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

const MigrationSelectionModal = ( {
    children,
    className,
    isMigrationDone,
    openSelectionModal,
    setShowMigrationMap,
    setOpenSelectionModal
} ) => {
    const migratablePlugins = [
        { key: 'betterdocs', name: __( 'BetterDocs', 'wedocs' ) }
    ];

    const [ selectedPlugin, setSelectedPlugin ] = useState( migratablePlugins[0] );

    const handleSelectionDone = () => {
        setShowMigrationMap( true );
        setOpenSelectionModal( false );
    };

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
                    as='div'
                    className='relative z-[9999]'
                    onClose={ () => setOpenSelectionModal( false ) }
                >
                    <Transition.Child
                        as={ Fragment }
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <div className='fixed inset-0 bg-black bg-opacity-25' />
                    </Transition.Child>

                    <div className='fixed inset-0 overflow-y-auto'>
                        <div className='flex min-h-full items-center justify-center p-4'>
                            <Transition.Child
                                as={ Fragment }
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 scale-95'
                                enterTo='opacity-100 scale-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100 scale-100'
                                leaveTo='opacity-0 scale-95'
                            >
                                <Dialog.Panel className='w-[900px] transform overflow-hidden rounded-2xl bg-white align-middle shadow-xl transition-all'>
                                    <div className='sm:flex sm:items-start sm:justify-center p-12'>
                                        <div className='mt-3 text-center sm:mt-0 sm:text-left'>
                                            <Dialog.Title
                                                as='h3'
                                                className='text-2xl text-center font-bold leading-7 text-gray-900 mb-4 text-[#111827]'
                                            >
                                                { __( 'Are you sure to migrate?', 'wedocs' ) }
                                            </Dialog.Title>
                                            <p className='text-gray-500 text-center text-base leading-6'>
                                                { __(
                                                    'We want to make sure you have a successful migration experience to weDocs.',
                                                    'wedocs'
                                                ) }
                                            </p>

                                            { migratablePlugins && (
                                                <div className={ `select-migratable-plugin pt-16 pb-12` }>
                                                    { Object.keys( migratablePlugins ).length > 0 ? (
                                                        <div className={ `list-area grid gap-1` }>
                                                            <label className={ `text-gray-400 text-base leading-7` }>
                                                                { __( 'Migrate from:', 'wedocs' ) }
                                                            </label>
                                                            <div className={ `list-field-content flex gap-5` }>
                                                                <Listbox value={ selectedPlugin } onChange={ setSelectedPlugin }>
                                                                    <div className='relative flex-[3]'>
                                                                        <Listbox.Button className='relative w-full cursor-pointer rounded-md border border-gray-300 bg-white !w-[600px] py-3 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'>
                                                                            <span className='block truncate text-base'>{ selectedPlugin?.name }</span>
                                                                            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                                                                            <ChevronDownIcon
                                                                                aria-hidden='true'
                                                                                className='h-5 w-5 text-gray-400'
                                                                            />
                                                                        </span>
                                                                        </Listbox.Button>
                                                                        <Transition
                                                                            as={ Fragment }
                                                                            leave='transition ease-in duration-100'
                                                                            leaveFrom='opacity-100'
                                                                            leaveTo='opacity-0'
                                                                        >
                                                                            <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
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
                                                                                                        <CheckIcon className='h-5 w-5' aria-hidden='true' />
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
                                                        <div className='relative mt-1'>
                                                            <input
                                                                className='relative !w-full cursor-pointer !rounded-md border !border-gray-300 bg-white !py-2 !pl-3 !pr-10 text-left shadow-sm sm:text-sm'
                                                                placeholder={ __( 'loading…', 'wedocs' ) }
                                                                disabled
                                                            />
                                                        </div>
                                                    ) }
                                                </div>
                                            ) }

                                            <div className={ `migration-changing-notice flex border border-[#DBDBDB] rounded-md py-0.5 px-4 mb-6` }>
                                                <div className={ `exclamation-icon my-3.5` }>
                                                    <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                                                        <path fillRule='evenodd' clipRule='evenodd' d='M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM11.7071 6.70711C12.0976 6.31658 12.0976 5.68342 11.7071 5.29289C11.3166 4.90237 10.6834 4.90237 10.2929 5.29289L7 8.58579L5.70711 7.29289C5.31658 6.90237 4.68342 6.90237 4.29289 7.29289C3.90237 7.68342 3.90237 8.31658 4.29289 8.70711L6.29289 10.7071C6.68342 11.0976 7.31658 11.0976 7.70711 10.7071L11.7071 6.70711Z' fill='#4F46E5'/>
                                                    </svg>
                                                </div>
                                                <div className={ `text-[#6B7280] text-sm leading-5 p-3 pr-9` }>
                                                    <span className={ `font-bold block leading-5 text-gray-600` }>{ __( 'Migration Notice: ', 'wedocs' ) }</span>
                                                    { __( 'This will migrate all your docs to a Single Parent Doc. If you are a BetterDocs Pro user and using Knowledge Bases, migration for Pro users is coming soon.', 'wedocs' ) }
                                                </div>
                                            </div>

                                            <div className={ `migration-notice notice m-0 border-0 border-l-4 border-yellow-400 bg-yellow-50 flex border-[#FBBF24]` }>
                                                <div className={ `exclamation-icon my-3.5` }>
                                                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='14' fill='none'>
                                                        <path
                                                            fill='#fbbf24'
                                                            fillRule='evenodd'
                                                            d='M6.257 1.099c.765-1.359 2.722-1.359 3.486 0l5.58 9.921C16.074 12.353 15.11 14 13.58 14H2.42C.89 14-.073 12.353.677 11.019l5.58-9.921zM9 11a1 1 0 1 1-2 0 1 1 0 1 1 2 0zM8 3a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1z'
                                                        />
                                                    </svg>
                                                </div>
                                                <div className={ `text-[#92400E] text-sm leading-5 p-3 pr-9` }>
                                                    <span className={ `font-bold` }>{ __( 'Uncategorized Articles: ', 'wedocs' ) }</span> <br />
                                                    { __( 'Note: During the migration, articles under "Uncategorized" category won\'t be transferred. Please ensure to categorize articles appropriately before migrating.', 'wedocs' ) }
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <hr className={ `mt-8 w-full` } />
                                    <div className='my-5 space-x-3.5 text-center px-12 mb-5 sm:flex sm:items-start sm:justify-end'>
                                        <button
                                            className='bg-white hover:bg-gray-200 text-gray-700 font-medium text-base py-2 px-5 border border-gray-300 rounded-md'
                                            onClick={ () => setOpenSelectionModal( false ) }
                                        >
                                            { __( 'Cancel', 'wedocs' ) }
                                        </button>
                                        <button
                                            onClick={ handleSelectionDone }
                                            className='bg-indigo-700 hover:bg-indigo-800 text-white font-medium text-base py-2 px-5 rounded-md'
                                        >
                                            { __( 'Yes, I\'m sure', 'wedocs' ) }
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
