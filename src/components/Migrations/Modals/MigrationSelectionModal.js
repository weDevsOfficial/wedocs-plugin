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
                    className='wedocs-document wedocs-relative wedocs-z-[9999]'
                    onClose={ () => setOpenSelectionModal( false ) }
                >
                    <Transition.Child
                        as={ Fragment }
                        enter='wedocs-ease-out wedocs-duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='wedocs-ease-in wedocs-duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <div className='wedocs-fixed wedocs-inset-0 wedocs-bg-black wedocs-bg-opacity-25 wedocs-z-[50]' />
                    </Transition.Child>

                    <div className='wedocs-fixed wedocs-inset-0 wedocs-overflow-y-auto wedocs-z-[100]'>
                        <div className='wedocs-flex wedocs-min-h-full wedocs-items-center wedocs-justify-center wedocs-p-4'>
                            <Transition.Child
                                as={ Fragment }
                                enter='wedocs-ease-out wedocs-duration-300'
                                enterFrom='opacity-0 scale-95'
                                enterTo='opacity-100 scale-100'
                                leave='wedocs-ease-in wedocs-duration-200'
                                leaveFrom='opacity-100 scale-100'
                                leaveTo='opacity-0 scale-95'
                            >
                                <Dialog.Panel className='wedocs-w-[900px] wedocs-transform wedocs-overflow-hidden wedocs-rounded-2xl wedocs-bg-white wedocs-align-middle wedocs-shadow-xl wedocs-transition-all'>
                                    <div className='sm:wedocs-flex sm:wedocs-items-start sm:wedocs-justify-center wedocs-p-12'>
                                        <div className='wedocs-mt-3 wedocs-text-center sm:wedocs-mt-0 sm:wedocs-text-left'>
                                            <Dialog.Title
                                                as='h3'
                                                className='wedocs-text-2xl wedocs-text-center wedocs-font-bold wedocs-leading-7 wedocs-text-gray-900 wedocs-mb-4 wedocs-text-[#111827]'
                                            >
                                                { __( 'Are you sure to migrate?', 'wedocs' ) }
                                            </Dialog.Title>
                                            <p className='wedocs-text-gray-500 wedocs-text-center wedocs-text-base wedocs-leading-6'>
                                                { __(
                                                    'We want to make sure you have a successful migration experience to weDocs.',
                                                    'wedocs'
                                                ) }
                                            </p>

                                            { migratablePlugins && (
                                                <div className={ `select-migratable-plugin pt-16 pb-12` }>
                                                    { Object.keys( migratablePlugins ).length > 0 ? (
                                                        <div className={ `list-area wedocs-grid wedocs-gap-1` }>
                                                            <label className={ `wedocs-text-gray-400 wedocs-text-base wedocs-leading-7` }>
                                                                { __( 'Migrate from:', 'wedocs' ) }
                                                            </label>
                                                            <div className={ `list-field-content wedocs-flex wedocs-gap-5` }>
                                                                <Listbox value={ selectedPlugin } onChange={ setSelectedPlugin }>
                                                                    <div className='wedocs-relative wedocs-flex-[3]'>
                                                                        <Listbox.Button className='wedocs-relative wedocs-w-full wedocs-cursor-pointer wedocs-rounded-md wedocs-border wedocs-border-gray-300 wedocs-bg-white !wedocs-w-[600px] wedocs-py-3 wedocs-pl-3 wedocs-pr-10 wedocs-text-left wedocs-shadow-sm focus:wedocs-border-indigo-500 focus:wedocs-outline-none focus:wedocs-ring-1 focus:wedocs-ring-indigo-500 sm:wedocs-text-sm'>
                                                                            <span className='wedocs-block wedocs-truncate wedocs-text-base'>{ selectedPlugin?.name }</span>
                                                                            <span className='wedocs-pointer-events-none wedocs-absolute wedocs-inset-y-0 wedocs-right-0 wedocs-flex wedocs-items-center wedocs-pr-2'>
                                                                            <ChevronDownIcon
                                                                                aria-hidden='true'
                                                                                className='wedocs-h-5 wedocs-w-5 wedocs-text-gray-400'
                                                                            />
                                                                        </span>
                                                                        </Listbox.Button>
                                                                        <Transition
                                                                            as={ Fragment }
                                                                            leave='wedocs-transition wedocs-ease-in wedocs-duration-100'
                                                                            leaveFrom='opacity-100'
                                                                            leaveTo='opacity-0'
                                                                        >
                                                                            <Listbox.Options className='wedocs-absolute wedocs-z-10 wedocs-mt-1 wedocs-max-h-60 wedocs-w-full wedocs-overflow-auto wedocs-rounded-md wedocs-bg-white wedocs-py-1 wedocs-text-base wedocs-shadow-lg wedocs-ring-1 wedocs-ring-black wedocs-ring-opacity-5 focus:wedocs-outline-none sm:wedocs-text-sm'>
                                                                                { migratablePlugins?.map( ( plugin ) => (
                                                                                    <Listbox.Option
                                                                                        key={ plugin?.key }
                                                                                        className={ ( { active } ) =>
                                                                                            `wedocs-cursor-pointer wedocs-relative wedocs-select-none wedocs-py-2 wedocs-pl-3 wedocs-pr-9 ${
                                                                                                active ? 'wedocs-text-white wedocs-bg-indigo-600' : 'wedocs-text-gray-900'
                                                                                            }`
                                                                                        }
                                                                                        value={ plugin }
                                                                                    >
                                                                                        { ( { selected, active } ) => (
                                                                                            <>
                                                                                                <span
                                                                                                    className={ `wedocs-block wedocs-truncate ${
                                                                                                        selected ? 'wedocs-font-semibold' : 'wedocs-font-normal'
                                                                                                    }` }
                                                                                                >
                                                                                                  { plugin?.name }
                                                                                                </span>
                                                                                                { selected && (
                                                                                                    <span
                                                                                                        className={ `wedocs-absolute wedocs-inset-y-0 wedocs-right-0 wedocs-flex wedocs-items-center wedocs-pr-4 ${
                                                                                                            active ? 'wedocs-text-white' : 'wedocs-text-indigo-600'
                                                                                                        }` }
                                                                                                    >
                                                                                                        <CheckIcon className='wedocs-h-5 wedocs-w-5' aria-hidden='true' />
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
                                                                <div className={ `migration-to-label wedocs-flex-[1.25] wedocs-rounded-md wedocs-border wedocs-border-gray-300 wedocs-bg-white wedocs-px-8 wedocs-py-3 wedocs-text-center sm:wedocs-text-base wedocs-text-[#333333] wedocs-leading-none` }>
                                                                    { __( 'to weDocs' ) }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className='wedocs-relative wedocs-mt-1'>
                                                            <input
                                                                className='wedocs-relative !wedocs-w-full wedocs-cursor-pointer !wedocs-rounded-md wedocs-border !wedocs-border-gray-300 wedocs-bg-white !wedocs-py-2 !wedocs-pl-3 !wedocs-pr-10 wedocs-text-left wedocs-shadow-sm sm:wedocs-text-sm'
                                                                placeholder={ __( 'loading…', 'wedocs' ) }
                                                                disabled
                                                            />
                                                        </div>
                                                    ) }
                                                </div>
                                            ) }

                                            <div className={ `migration-changing-notice wedocs-flex wedocs-border wedocs-border-[#DBDBDB] wedocs-rounded-md wedocs-py-0.5 wedocs-px-4 wedocs-mb-6` }>
                                                <div className={ `exclamation-icon wedocs-my-3.5` }>
                                                    <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                                                        <path fillRule='evenodd' clipRule='evenodd' d='M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM11.7071 6.70711C12.0976 6.31658 12.0976 5.68342 11.7071 5.29289C11.3166 4.90237 10.6834 4.90237 10.2929 5.29289L7 8.58579L5.70711 7.29289C5.31658 6.90237 4.68342 6.90237 4.29289 7.29289C3.90237 7.68342 3.90237 8.31658 4.29289 8.70711L6.29289 10.7071C6.68342 11.0976 7.31658 11.0976 7.70711 10.7071L11.7071 6.70711Z' fill='#4F46E5'/>
                                                    </svg>
                                                </div>
                                                <div className={ `wedocs-text-[#6B7280] wedocs-text-sm wedocs-leading-5 wedocs-p-3 wedocs-pr-9` }>
                                                    <span className={ `wedocs-font-bold wedocs-block wedocs-leading-5 wedocs-text-gray-600` }>{ __( 'Migration Notice: ', 'wedocs' ) }</span>
                                                    { __( 'This will migrate all your docs to a Single Parent Doc. If you are a BetterDocs Pro user and using Knowledge Bases, migration for Pro users is coming soon.', 'wedocs' ) }
                                                </div>
                                            </div>

                                            <div className={ `migration-notice notice wedocs-m-0 wedocs-border-0 wedocs-border-l-4 wedocs-border-yellow-400 wedocs-bg-yellow-50 wedocs-flex wedocs-border-[#FBBF24]` }>
                                                <div className={ `exclamation-icon wedocs-my-3.5` }>
                                                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='14' fill='none'>
                                                        <path
                                                            fill='#fbbf24'
                                                            fillRule='evenodd'
                                                            d='M6.257 1.099c.765-1.359 2.722-1.359 3.486 0l5.58 9.921C16.074 12.353 15.11 14 13.58 14H2.42C.89 14-.073 12.353.677 11.019l5.58-9.921zM9 11a1 1 0 1 1-2 0 1 1 0 1 1 2 0zM8 3a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1z'
                                                        />
                                                    </svg>
                                                </div>
                                                <div className={ `wedocs-text-[#92400E] wedocs-text-sm wedocs-leading-5 wedocs-p-3 wedocs-pr-9` }>
                                                    <span className={ `wedocs-font-bold` }>{ __( 'Uncategorized Articles: ', 'wedocs' ) }</span> <br />
                                                    { __( 'Note: During the migration, articles under "Uncategorized" category won\'t be transferred. Please ensure to categorize articles appropriately before migrating.', 'wedocs' ) }
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <hr className={ `wedocs-mt-8 wedocs-w-full` } />
                                    <div className='wedocs-my-5 wedocs-space-x-3.5 wedocs-text-center wedocs-px-12 wedocs-mb-5 sm:wedocs-flex sm:wedocs-items-start sm:wedocs-justify-end'>
                                        <button
                                            className='wedocs-bg-white hover:wedocs-bg-gray-200 wedocs-text-gray-700 wedocs-font-medium wedocs-text-base wedocs-py-2 wedocs-px-5 wedocs-border wedocs-border-gray-300 wedocs-rounded-md'
                                            onClick={ () => setOpenSelectionModal( false ) }
                                        >
                                            { __( 'Cancel', 'wedocs' ) }
                                        </button>
                                        <button
                                            onClick={ handleSelectionDone }
                                            className='wedocs-bg-indigo-700 hover:wedocs-bg-indigo-800 wedocs-text-white wedocs-font-medium wedocs-text-base wedocs-py-2 wedocs-px-5 wedocs-rounded-md'
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
