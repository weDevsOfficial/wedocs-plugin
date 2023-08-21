import { __ } from '@wordpress/i18n';
import { Switch } from '@headlessui/react';

const MessagingSettingsPanel = () => {
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
                                { __( 'Enable Messaging Tab', 'wedocs' ) }
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
            <div className="messaging-settings relative">
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
                                        'Cloudflare Turnstile Site Key',
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
                                        name="turnstile_site_key"
                                        id="turnstile-site-key"
                                        placeholder={ __(
                                            'Enter your cloudflare turnstile site key',
                                            'wedocs'
                                        ) }
                                        className="w-full !rounded-md !border-gray-300 !bg-white !py-1 !pl-3 !pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                        readOnly={ true }
                                        value=''
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="settings-description w-full max-w-[490px] ml-auto mt-1">
                            <p className="text-sm text-[#6B7280]">
                                { __(
                                    'How to set up ',
                                    'wedocs'
                                ) }
                                <a
                                    href="//developers.cloudflare.com/turnstile/get-started/"
                                    target="_blank"
                                    className="text-indigo-700 underline underline-offset-2 !shadow-none"
                                    rel="noreferrer"
                                >
                                    { __( 'Cloudflare Turnstile', 'wedocs' ) }
                                </a>
                            </p>
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
                                        'Email Address',
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
                                        type="email"
                                        name="email_address"
                                        id="email-address"
                                        placeholder={ __(
                                            'Email Address',
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
                                        'Messaging Tab Title',
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
                                        name="messaging_title"
                                        id="messaging-title"
                                        placeholder={ __(
                                            'Messaging tab title',
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
                                        'Messaging Tab Subtitle 1',
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
                                        name="messaging_subtitle_one"
                                        id="messaging-subtitle-one"
                                        placeholder={ __(
                                            'Messaging tab subtitle 1',
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
                                        'Messaging Tab Subtitle 2',
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
                                        name="messaging_subtitle_two"
                                        id="messaging-subtitle-two"
                                        placeholder={ __(
                                            'Messaging tab subtitle 2',
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
                                        'Success Message Title',
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
                                        name="messaging_success_title"
                                        id="messaging-success-title"
                                        placeholder={ __(
                                            'Messaging success title',
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
                                        'Success Message Text',
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
                                        name="messaging_success_text"
                                        id="messaging-success-text"
                                        placeholder={ __(
                                            'Messaging success text',
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

export default MessagingSettingsPanel;
