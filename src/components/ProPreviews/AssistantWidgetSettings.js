import { __ } from '@wordpress/i18n';
import { Switch, Tab } from '@headlessui/react';
import { useState } from '@wordpress/element';
import ExploreSettingsPanel from './partials/ExploreSettingsPanel';
import MessagingSettingsPanel from './partials/MessagingSettingsPanel';
import AppearanceSettingsPanel from './partials/AppearanceSettingsPanel';
import Overlay from './common/Overlay';

const AssistantWidgetSettings = ( { settingsData, setSettings } ) => {
    const [ selectedIndex, setSelectedIndex ] = useState( 0 );
    const [ showOverlay, setShowOverlay ] = useState( false );

    const tabs = [
        __( 'Explore', 'wedocs' ),
        __( 'Messaging', 'wedocs' ),
        __( 'Appearance', 'wedocs' ),
    ];

    return (
        <section>
            <div className="shadow sm:rounded-md bg-white overflow-hidden">
                <div className="flex justify-between items-center py-4 px-8 sm:px-8 sm:py-4">
                    <div className="flex items-center space-x-3">
                        <h2 className="text-gray-900 font-medium text-lg">
                            { __( 'Assistant Widget', 'wedocs' ) }
                        </h2>
                        <div className="tooltip cursor-pointer ml-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                fill="none"
                            >
                                <path
                                    d="M9.833 12.333H9V9h-.833M9 5.667h.008M16.5 9a7.5 7.5 0 1 1-15 0 7.5 7.5 0 1 1 15 0z"
                                    stroke="#6b7280"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="flex items-center relative">
                        <Switch className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer outline-0 items-center justify-center rounded-full">
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute h-full w-full rounded-md bg-white"
                            />
                            <span
                                aria-hidden="true"
                                className={ 'bg-indigo-600 pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out' }
                            />
                            <span
                                aria-hidden="true"
                                className={ 'translate-x-5 pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out' }
                            />
                        </Switch>
                        <span className={ `ml-3` }>
                            <span className="text-sm text-gray-900">
                                { __( 'Enable', 'wedocs' ) }
                            </span>
                        </span>
                    </div>
                </div>
                <hr className="h-px !bg-gray-200 border-0 dark:!bg-gray-200" />
                <Tab.Group
                    selectedIndex={ selectedIndex }
                    onChange={ setSelectedIndex }
                >
                    <Tab.List className="pt-6 px-8 mb-3 space-x-3.5 font-medium text-sm">
                        { tabs &&
                            tabs?.map( ( tab, index ) => (
                                <Tab
                                    className={
                                        'px-3 py-2 aria-selected:bg-indigo-700 aria-selected:text-white hover:text-white hover:bg-indigo-700 rounded-md'
                                    }
                                    key={ index }
                                >
                                    { tab }
                                </Tab>
                            ) ) }
                    </Tab.List>
                    <Tab.Panels
                        className='relative pt-5 pb-20 px-8'
                        onMouseEnter={ () => setShowOverlay( true ) }
                        onMouseLeave={ () => setShowOverlay( false ) }
                    >
                        <Tab.Panel>
                            <ExploreSettingsPanel />
                        </Tab.Panel>
                        <Tab.Panel>
                            <MessagingSettingsPanel />
                        </Tab.Panel>
                        <Tab.Panel>
                            <AppearanceSettingsPanel
                                settingsData={ settingsData }
                                setSettings={ setSettings }
                            />
                        </Tab.Panel>
                        <Overlay classes={ `${ showOverlay ? 'flex items-center justify-center' : 'hidden' }` } />
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </section>
    );
};

export default AssistantWidgetSettings;
