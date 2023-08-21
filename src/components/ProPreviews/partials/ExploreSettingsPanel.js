import { __, sprintf } from '@wordpress/i18n';
import { RadioGroup, Switch } from '@headlessui/react';
import { CheckCircleIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useState } from '@wordpress/element';

const ExploreSettingsPanel = () => {
    const exploreBy = [
        {
            field: 'helpful',
            title: __( 'Helpful Content', 'wedocs' ),
            description: __(
                'Top 10 contents that are found as most helpful by the visitors will be set automatically in descending order ( No helpful documentation available at this moment )',
                'wedocs'
            ),
        },
        {
            field: 'selected',
            title: __( 'Selected Content', 'wedocs' ),
            description: __(
                'Manually select content that will appear in the Explore tab of the Assistant widget',
                'wedocs'
            ),
        },
    ];

    const [ selectedExploreBy, setSelectedExploreBy ] = useState(
        exploreBy[ 1 ]
    );

    const pages = [
        { id: 1, title: { rendered: __( 'Home', 'wedocs' ) } },
        { id: 2, title: { rendered: __( 'About', 'wedocs' ) } },
        { id: 3, title: { rendered: __( 'Services', 'wedocs' ) } },
        { id: 4, title: { rendered: __( 'Portfolio', 'wedocs' ) } },
        { id: 5, title: { rendered: __( 'Contact Us', 'wedocs' ) } },
    ];

    const articles = [
        { id: 1, title: { rendered: __( 'Documentation Team 1', 'wedocs' ) } },
        { id: 2, title: { rendered: __( 'Documentation Team 2', 'wedocs' ) } },
        { id: 3, title: { rendered: __( 'Documentation Team 3', 'wedocs' ) } },
        { id: 4, title: { rendered: __( 'Documentation Team 4', 'wedocs' ) } },
    ];

    const classNames = ( ...classes ) => {
        return classes.filter( Boolean ).join( ' ' );
    };

    return (
        <>
            <div className="grid grid-cols-4 gap-5">
                <div className="col-span-4">
                    <div className="settings-content flex items-center justify-between">
                        <div className="settings-field-heading flex items-center space-x-2 flex-1">
                            <label
                                className="block text-sm font-medium text-gray-600"
                                id="headlessui-listbox-label-15"
                                data-headlessui-state="open"
                            >
                                { __( 'Enable Explore Tab', 'wedocs' ) }
                            </label>
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
                        <div className="settings-field w-full max-w-[490px] mt-1 ml-auto flex-2">
                            <div className="relative flex items-center">
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
                                <span className={ `mt-0.5 ml-3` }>
                                    <span className="text-sm text-gray-900">
                                        { __( 'Enable', 'wedocs' ) }
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="h-px !bg-gray-200 border-0 dark:!bg-gray-200 my-5" />
            <div className="explore-settings relative">
                <RadioGroup value={ selectedExploreBy }>
                    <div className="my-5 grid grid-cols-3 !gap-6 sm:grid-cols-3 sm:gap-x-4">
                        { exploreBy.map( ( explore, index ) => (
                            <RadioGroup.Option
                                key={ index }
                                value={ explore }
                                className={ ( { checked, active } ) =>
                                    classNames(
                                        checked
                                            ? 'border-transparent'
                                            : 'border-gray-300',
                                        active
                                            ? 'border-indigo-600 ring-2 ring-indigo-600'
                                            : '',
                                        'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                                    )
                                }
                            >
                                <span className="flex">
                                    <span className="flex flex-col">
                                        <RadioGroup.Label
                                            as="span"
                                            className="flex items-center text-sm font-medium text-gray-600 mb-0.5"
                                        >
											                      { explore.title }
                                            <div
                                                className={ classNames(
                                                    selectedExploreBy?.field !==
                                                    explore?.field
                                                        ? 'border border-gray-400'
                                                        : '',
                                                    'ml-auto rounded-full w-4 h-4'
                                                ) }
                                            >
												                        <CheckCircleIcon
                                                    className={ classNames(
                                                        selectedExploreBy?.field !==
                                                        explore?.field
                                                            ? 'invisible'
                                                            : '-mt-0.5',
                                                        'h-5 w-5 text-indigo-600'
                                                    ) }
                                                    aria-hidden="true"
                                                />
											                      </div>
										                    </RadioGroup.Label>
										                    <RadioGroup.Description
                                            as="span"
                                            className="mt-1 flex items-center font-medium text-xs !leading-5 text-[#6B7280]"
                                        >
                                            { explore?.description }
                                        </RadioGroup.Description>
										                    <span
                                            className={ classNames(
                                                selectedExploreBy?.id ===
                                                explore?.id
                                                    ? 'border'
                                                    : 'border-2',
                                                selectedExploreBy?.id ===
                                                explore?.id
                                                    ? 'border-indigo-600'
                                                    : 'border-transparent',
                                                'pointer-events-none absolute -inset-px rounded-lg'
                                            ) }
                                            aria-hidden="true"
                                        />
									                  </span>
								                </span>
                            </RadioGroup.Option>
                        ) ) }
                    </div>
                </RadioGroup>
                { selectedExploreBy &&
                    selectedExploreBy?.field === 'selected' && (
                        <div className="grid grid-cols-4 gap-5 my-6">
                            <div className="col-span-4">
                                <div className="settings-content flex items-center justify-between">
                                    <div className="settings-field-heading flex items-center space-x-2 flex-1">
                                        <label
                                            className="block text-sm font-medium text-gray-600"
                                            id="headlessui-listbox-label-15"
                                            data-headlessui-state="open"
                                        >
                                            { __(
                                                'Select Content',
                                                'wedocs'
                                            ) }
                                        </label>
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
                                    <div className="settings-field w-full max-w-[490px] ml-auto flex-2">
                                        <div id="select-articles" className="multiSelectBox">
                                            <div className="relative">
                                                <button className="w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                                    <span className="block multiSelectBox truncate">
                                                        { __( 'Select Articles', 'wedocs' ) }
                                                    </span>
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
                                                            ></path>
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                { articles &&
                                    articles?.length > 0 && (
                                        <div className="selected-articles rounded-md mt-6 max-w-[490px] ml-auto border border-gray-300 bg-white text-left shadow-sm">
                                            <div className="w-full py-2 pl-6 pr-10 bg-gray-200 text-xs font-medium text-gray-500 tracking-wider">
                                                { __(
                                                    'Selected Articles',
                                                    'wedocs'
                                                ) }
                                            </div>
                                            <div className="relative px-3">
                                                <ul className="z-10 my-1.5">
                                                    { articles?.map(
                                                        ( article, index ) => (
                                                            <li
                                                                key={
                                                                    article?.id
                                                                }
                                                                className={ `${ index === 1 && 'rounded-md border border-[#E5E7EB] py-1' } cursor-pointer text-gray-900 select-none !mb-0.5` }
                                                            >
                                                                <nav
                                                                    className={ `${ index === 1 ? 'block' : 'hidden' } flex px-3.5 pt-2.5` }
                                                                    aria-label="Breadcrumb"
                                                                >
                                                                    <ol
                                                                        role="list"
                                                                        className="flex items-center"
                                                                    >
                                                                        <li className="m-0">
                                                                            <div className="flex items-center">
                                                                                <a
                                                                                    href='#'
                                                                                    className="text-xs leading-5 text-gray-500 text-indigo-700 cursor-pointer"
                                                                                >
                                                                                    { __( 'Parent Documentation', 'wedocs' ) }
                                                                                </a>
                                                                                <ChevronRightIcon
                                                                                    className="h-3.5 w-3.5 mx-1 flex-shrink-0 text-gray-400"
                                                                                    aria-hidden="true"
                                                                                />
                                                                            </div>
                                                                        </li>
                                                                        <li className="m-0">
                                                                            <div className="flex items-center">
                                                                                <a
                                                                                    href='#'
                                                                                    className="text-xs leading-5 text-gray-500 text-indigo-700 cursor-pointer"
                                                                                >
                                                                                    { __( 'Section Documentation', 'wedocs' ) }
                                                                                </a>
                                                                            </div>
                                                                        </li>
                                                                    </ol>
                                                                </nav>
                                                                <label
                                                                    htmlFor="multi-select"
                                                                    className="py-2.5 px-3.5 font-normal block truncate flex items-center w-full group text-sm leading-5 text-gray-500"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="14"
                                                                        height="18"
                                                                        fill="none"
                                                                        className="mr-2.5"
                                                                    >
                                                                        <path
                                                                            d="M4.5 9h5m-5 3.333h5m1.667 4.167H2.833c-.92 0-1.667-.746-1.667-1.667V3.167c0-.92.746-1.667 1.667-1.667h4.655c.221 0 .433.088.589.244l4.512 4.512c.156.156.244.368.244.589v7.988c0 .921-.746 1.667-1.667 1.667z"
                                                                            stroke="#6b7280"
                                                                            strokeWidth="2"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        />
                                                                    </svg>
                                                                    <a
                                                                        href={ `${ window.location.origin }/?p=${ article?.id }` }
                                                                    >
                                                                        { sprintf(
                                                                            __(
                                                                                '%s',
                                                                                'wedocs'
                                                                            ),
                                                                            article
                                                                                ?.title
                                                                                ?.rendered
                                                                        ) }
                                                                    </a>
                                                                    <button className={ `${ index === 1 ? 'flex items-center' : 'hidden' } cursor-pointer ml-auto bg-gray-100 rounded px-2 py-0.5 text-gray-500 text-sm` }>
                                                                        { __(
                                                                            'Remove',
                                                                            'wedocs'
                                                                        ) }
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            fill="none"
                                                                            viewBox="0 0 24 24"
                                                                            strokeWidth={
                                                                                1.5
                                                                            }
                                                                            stroke="currentColor"
                                                                            className="w-3 h-3 ml-1"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                d="M6 18L18 6M6 6l12 12"
                                                                            />
                                                                        </svg>
                                                                    </button>
                                                                </label>
                                                            </li>
                                                        )
                                                    ) }
                                                </ul>
                                            </div>
                                        </div>
                                    ) }
                            </div>
                        </div>
                    ) }
                <hr className="h-px !bg-gray-200 border-0 dark:!bg-gray-200 my-5" />
                <div className="grid grid-cols-4 gap-5">
                    <div className="col-span-4">
                        <div className="settings-content flex items-center justify-between">
                            <div className="settings-field-heading flex items-center space-x-2 flex-1">
                                <label
                                    className="block text-sm font-medium text-gray-600"
                                    id="headlessui-listbox-label-15"
                                    data-headlessui-state="open"
                                >
                                    { __( 'Hide from Pages', 'wedocs' ) }
                                </label>
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
                            <div className="settings-field w-full max-w-[490px] ml-auto -mt-1 flex-2">
                                <div className="pageSelectionBox">
                                    <div className="relative mb-2">
                                        <button className="w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                            <div className="active-roles inline-flex flex-wrap items-center gap-2.5">
                                                { pages.map( ( page ) => (
                                                    <span
                                                        key={ page?.id }
                                                        className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2.5 py-0.5 text-sm text-gray-800"
                                                    >
                                                        { page?.title?.rendered }
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={ 3.5 }
                                                            stroke="currentColor"
                                                            className="w-3 h-3 cursor-pointer text-gray-400"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M6 18L18 6M6 6l12 12"
                                                            />
                                                        </svg>
                                                    </span>
                                                ) ) }
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div className="settings-content flex items-center justify-between">
                            <div className="settings-field-heading flex items-center space-x-2 flex-1">
                                <label
                                    className="block text-sm font-medium text-gray-600"
                                    id="headlessui-listbox-label-15"
                                    data-headlessui-state="open"
                                >
                                    { __( 'Explore Tab Title', 'wedocs' ) }
                                </label>
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
                            <div className="settings-field w-full max-w-[490px] ml-auto flex-2">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder={ __(
                                            'Explore tab title',
                                            'wedocs'
                                        ) }
                                        className="w-full !rounded-md !border-gray-300 !bg-white !py-1 !pl-3 !pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                        readOnly={ true }
                                        value=''
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div className="settings-content flex items-center justify-between">
                            <div className="settings-field-heading flex items-center space-x-2 flex-1">
                                <label
                                    className="block text-sm font-medium text-gray-600"
                                    id="headlessui-listbox-label-15"
                                    data-headlessui-state="open"
                                >
                                    { __(
                                        'Explore Tab Subtitle 1',
                                        'wedocs'
                                    ) }
                                </label>
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
                            <div className="settings-field w-full max-w-[490px] ml-auto flex-2">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder={ __(
                                            'Explore tab subtitle 1',
                                            'wedocs'
                                        ) }
                                        className="w-full !rounded-md !border-gray-300 !bg-white !py-1 !pl-3 !pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                        readOnly={ true }
                                        value=''
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div className="settings-content flex items-center justify-between">
                            <div className="settings-field-heading flex items-center space-x-2 flex-1">
                                <label
                                    className="block text-sm font-medium text-gray-600"
                                    id="headlessui-listbox-label-15"
                                    data-headlessui-state="open"
                                >
                                    { __(
                                        'Explore Tab Subtitle 2',
                                        'wedocs'
                                    ) }
                                </label>
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
                            <div className="settings-field w-full max-w-[490px] ml-auto flex-2">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder={ __(
                                            'Explore tab subtitle 2',
                                            'wedocs'
                                        ) }
                                        className="w-full !rounded-md !border-gray-300 !bg-white !py-1 !pl-3 !pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                        readOnly={ true }
                                        value=''
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ExploreSettingsPanel;
