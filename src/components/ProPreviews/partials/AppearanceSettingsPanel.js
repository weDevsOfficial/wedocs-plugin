import { __ } from '@wordpress/i18n';
import UploadButton from './UploadButton';
import FontSettings from './FontSettings';
import { useEffect, useState } from '@wordpress/element';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import ColorPaletteSettings from './ColorPaletteSettings';
import MessagePreview from './MessagePreview';
import { useSelect } from '@wordpress/data';

const AppearanceSettingsPanel = ( { settingsData, setSettings } ) => {
    const colorBy = [
        {
            field: 'pre-built',
            title: __( 'Pre-built Color Palette', 'wedocs' ),
            description: __(
                'Choose a pre-built color palette for the colors of your assistant widget.',
                'wedocs'
            ),
        },
        {
            field: 'custom',
            title: __( 'Custom Color Palette', 'wedocs' ),
            description: __(
                'Choose any colors that represents your brand or that you prefer.',
                'wedocs'
            ),
        },
    ];

    const [ selectedColorBy, setSelectedColorBy ] = useState( colorBy[ 0 ] );

    const [ pages, setPages ] = useState( [] );
    const getPages = useSelect(
        ( select ) => select( 'wedocs/docs' ).getPages(),
        []
    );

    const classNames = ( ...classes ) => {
        return classes.filter( Boolean ).join( ' ' );
    };

    useEffect( () => {
        if (
            Boolean( settingsData?.assistant?.color_settings?.palette_settings )
        ) {
            setSelectedColorBy(
                colorBy?.find(
                    ( color ) =>
                        color?.field ===
                        settingsData?.assistant?.color_settings
                            ?.palette_settings
                ) || selectedColorBy
            );
        }
    }, [ settingsData ] );

    useEffect( () => {
        setPages( [ ...pages, ...getPages ] );
    }, [ getPages ] );

    return (
        <>
            { selectedColorBy && (
                <div id="appearance-settings">
                    <h2 className="text-gray-900 font-medium text-base leading-none mt-2">
                        { __( 'Widget Settings', 'wedocs' ) }
                    </h2>
                    <hr className="h-px !bg-gray-200 border-0 dark:!bg-gray-200 my-5" />
                    <div className="appearance-widget-settings relative">
                        <div className="grid grid-cols-4 gap-5">
                            <div className="col-span-4">
                                <div className="settings-content flex items-center justify-between">
                                    <div className="settings-field-heading flex items-center space-x-2 flex-1">
                                        <label
                                            className="block text-sm font-medium text-gray-600"
                                            id="headlessui-listbox-label-15"
                                            data-headlessui-state="open"
                                        >
                                            { __(
                                                'Tab First Sub-Title Font Size',
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
                                        <FontSettings
                                            name={ 'widget_title_font' }
                                            classes={ `justify-end` }
                                            setSettings={ setSettings }
                                            settingsData={ settingsData }
                                        />
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
                                                'Tab Second Sub-Title Font Size',
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
                                            <FontSettings
                                                name={
                                                    'widget_description_font'
                                                }
                                                classes={ `justify-end` }
                                                setSettings={ setSettings }
                                                settingsData={
                                                    settingsData
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-gray-900 font-medium text-base leading-none mt-8">
                        { __( 'Explore Settings', 'wedocs' ) }
                    </h2>
                    <hr className="h-px !bg-gray-200 border-0 dark:!bg-gray-200 my-5" />
                    <div className="appearance-explore-settings relative">
                        <div className="grid grid-cols-4 gap-5">
                            <div className="col-span-4">
                                <div className="settings-content flex items-center justify-between">
                                    <div className="settings-field-heading mt-1 flex items-center space-x-2 flex-1">
                                        <label
                                            className="block text-sm font-medium text-gray-600"
                                            id="headlessui-listbox-label-15"
                                            data-headlessui-state="open"
                                        >
                                            { __(
                                                'Explore tab icon',
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
                                    <div className="settings-field w-full max-w-[490px] ml-auto flex flex-2">
                                        <UploadButton />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-gray-900 font-medium text-base leading-none mt-8">
                        { __( 'Messaging Settings', 'wedocs' ) }
                    </h2>
                    <hr className="h-px !bg-gray-200 border-0 dark:!bg-gray-200 my-5" />
                    <div className="appearance-messaging-settings relative">
                        <div className="grid grid-cols-4 gap-5">
                            <div className="col-span-4">
                                <div className="settings-content flex items-center justify-between">
                                    <div className="settings-field-heading mt-1 flex items-center space-x-2 flex-1">
                                        <label
                                            className="block text-sm font-medium text-gray-600"
                                            id="headlessui-listbox-label-15"
                                            data-headlessui-state="open"
                                        >
                                            { __(
                                                'Messaging tab icon',
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
                                    <div className="settings-field w-full max-w-[490px] ml-auto flex-2 flex">
                                        <UploadButton />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-gray-900 font-medium text-base leading-none mt-8">
                        { __( 'Color Palette Settings', 'wedocs' ) }
                    </h2>
                    <hr className="h-px !bg-gray-200 border-0 dark:!bg-gray-200 my-5" />
                    <div className="appearance-color-settings relative">
                        <RadioGroup value={ selectedColorBy }>
                            <div className="mb-8 grid grid-cols-3 !gap-6 sm:grid-cols-3 sm:gap-x-4">
                                { colorBy.map( ( color ) => (
                                    <RadioGroup.Option
                                        key={ color?.field }
                                        value={ color }
                                        className={ ( {
                                            checked,
                                            active,
                                        } ) =>
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
                                                    { color?.title }
                                                    <div
                                                        className={ classNames(
                                                            selectedColorBy?.field !==
                                                            color?.field
                                                                ? 'border border-gray-400'
                                                                : '',
                                                            'ml-auto rounded-full w-4 h-4'
                                                        ) }
                                                    >
                                                        <CheckCircleIcon
                                                            className={ classNames(
                                                                selectedColorBy?.field !==
                                                                color?.field
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
                                                    { color?.description }
                                                </RadioGroup.Description>
                                                <span
                                                    className={ classNames(
                                                        selectedColorBy?.field ===
                                                        color?.field
                                                            ? 'border'
                                                            : 'border-2',
                                                        selectedColorBy?.field ===
                                                        color?.field
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

                        { selectedColorBy?.field === 'custom' && (
                            <div id="custom-heading" className="w-80">
                                <div className="settings-heading flex items-center justify-between mb-4">
                                    <span className="font-bold text-sm text-gray-600">
                                        { __(
                                            'Choose Color: ',
                                            'wedocs'
                                        ) }
                                    </span>
                                    <span className="reset-palette text-sm font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer">
                                        { __( 'Reset All', 'wedocs' ) }
                                    </span>
                                </div>
                                <hr className="border-t-[#DBDBDB]" />
                            </div>
                        ) }

                        <div className="flex gap-24 my-6">
                            <ColorPaletteSettings />
                            <MessagePreview settings={ settingsData?.assistant } />
                        </div>
                    </div>
                </div>
            ) }
        </>
    );
};

export default AppearanceSettingsPanel;
