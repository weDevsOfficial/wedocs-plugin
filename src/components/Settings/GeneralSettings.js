import { __ } from '@wordpress/i18n';
import Switcher from '../Switcher';
import { useEffect, useState } from '@wordpress/element';
import SelectBox from '../SelectBox';

const GeneralSettings = ( {
  settingsData,
  generalSettingsData,
  setSettings,
} ) => {
  const [ generalSettings, setGeneralSettings ] = useState( {
    ...generalSettingsData,
  } );

  const handleEmailAddress = ( e ) => {
    setSettings( {
      ...settingsData,
      general: { ...generalSettingsData, email_to: e.target.value },
    } );
  };

  useEffect( () => {
    setGeneralSettings( {
      ...generalSettingsData,
    } );
  }, [ generalSettingsData ] );

  return (
    <section>
      <div className="shadow sm:rounded-md">
        <div className="bg-white">
          <div className="section-heading py-4 px-8 sm:px-8 sm:py-4">
            <h2 className="text-gray-900 font-medium text-lg">
              { __( 'General', 'wedocs' ) }
            </h2>
          </div>
          <hr className="h-px !bg-gray-200 border-0 dark:!bg-gray-200" />
          <div className="pt-6 pb-20 px-8 grid grid-cols-4 gap-5">
            <div className="col-span-4">
              <div className="settings-content flex items-center justify-between">
                <div className="settings-field-heading flex items-center space-x-2 flex-1">
                  <label
                    className="block text-sm font-medium text-gray-600"
                    id="headlessui-listbox-label-15"
                    data-headlessui-state="open"
                  >
                    { __( 'weDocs Home', 'wedocs' ) }
                  </label>
                </div>
                <div className="settings-field w-full max-w-[490px] mt-1 ml-auto flex-2">
                  <div className="relative">
                    <SelectBox
                      name="docs_home"
                      setSettings={ setSettings }
                      settingsData={ settingsData }
                      generalSettings={ generalSettings }
                    />
                  </div>
                </div>
              </div>
              <div className="settings-description w-full max-w-[490px] ml-auto mt-1">
                <p className="text-sm text-[#6B7280]">
                  { __(
                    'Select the documentation Home page, where the shortcode [wedocs] ',
                    'wedocs'
                  ) }
                  <a
                    href="https://github.com/tareq1988/wedocs-plugin/wiki/Using-Shortcodes"
                    target="_blank"
                    className="text-indigo-700 underline underline-offset-2 !shadow-none"
                    rel="noreferrer"
                  >
                    { __( 'shortcode', 'wedocs' ) }
                  </a>
                  { __( ' is used.', 'wedocs' ) }
                </p>
              </div>
            </div>

            { ( generalSettingsData?.email === 'on' ||
              ! Boolean( generalSettingsData?.email ) ) && (
              <div className="col-span-4">
                <div className="settings-content flex items-center justify-between">
                  <div className="settings-field-heading flex items-center space-x-2 flex-1">
                    <label
                      className="block text-sm font-medium text-gray-600"
                      id="headlessui-listbox-label-15"
                      data-headlessui-state="open"
                    >
                      { __( 'Email Address', 'wedocs' ) }
                    </label>
                    <div
                      className="tooltip cursor-pointer ml-2"
                      data-tip={ __(
                        'Enter the email address where you would like to receive feedback from users.',
                        'wedocs'
                      ) }
                    >
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
                        name="doc_title"
                        id="doc-title"
                        placeholder={ __(
                          'Write your email address',
                          'wedocs'
                        ) }
                        className="w-full !rounded-md !border-gray-300 bg-white !py-1 !pl-3 !pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        value={ generalSettingsData?.email_to || '' }
                        onChange={ handleEmailAddress }
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) }

            <div className="col-span-4">
              <div className="settings-content flex items-center justify-between">
                <div className="settings-heading flex items-center space-x-2 flex-1">
                  <label
                    className="block text-sm font-medium text-gray-600"
                    id="headlessui-listbox-label-15"
                    data-headlessui-state="open"
                  >
                    { __( 'Email Feedback on Article', 'wedocs' ) }
                  </label>
                  <div
                    className="tooltip cursor-pointer ml-2"
                    data-tip={ __(
                      'Invite readers to share their thoughts and suggestions through an email feedback form',
                      'wedocs'
                    ) }
                  >
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
                <div className="settings-field flex items-center w-full max-w-[490px] mt-1 ml-auto flex-2">
                  <Switcher
                    name="email"
                    generalSettings={ generalSettings }
                    settingsData={ settingsData }
                    setSettings={ setSettings }
                  />
                </div>
              </div>
            </div>

            <div className="col-span-4">
              <div className="settings-content flex items-center justify-between">
                <div className="settings-heading space-x-2 items-center flex flex-1">
                  <label
                    className="block text-sm font-medium text-gray-600"
                    id="headlessui-listbox-label-15"
                    data-headlessui-state="open"
                  >
                    { __( 'Helpful Feedback on Article', 'wedocs' ) }
                  </label>
                  <div
                    className="tooltip cursor-pointer ml-2"
                    data-tip={ __(
                      'Enabling helpful feedback on your article allows readers to provide opinions on your content',
                      'wedocs'
                    ) }
                  >
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
                <div className="settings-field flex items-center w-full max-w-[490px] mt-1 ml-auto flex-2">
                  <Switcher
                    name="helpful"
                    generalSettings={ generalSettings }
                    settingsData={ settingsData }
                    setSettings={ setSettings }
                  />
                </div>
              </div>
            </div>

            <div className="col-span-4">
              <div className="settings-content flex items-center justify-between">
                <div className="settings-heading space-x-2 items-center flex flex-1">
                  <label
                    className="block text-sm font-medium text-gray-600"
                    id="headlessui-listbox-label-15"
                    data-headlessui-state="open"
                  >
                    { __( 'Allow Comments on Article', 'wedocs' ) }
                  </label>
                  <div
                    className="tooltip cursor-pointer ml-2"
                    data-tip={ __(
                      'Increase reader engagement by turning on article comments',
                      'wedocs'
                    ) }
                  >
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
                <div className="settings-field flex items-center w-full max-w-[490px] mt-1 ml-auto flex-2">
                  <Switcher
                    name="comments"
                    generalSettings={ generalSettings }
                    settingsData={ settingsData }
                    setSettings={ setSettings }
                  />
                </div>
              </div>
            </div>

            <div className="col-span-4">
              <div className="settings-content flex items-center justify-between">
                <div className="settings-heading space-x-2 items-center flex flex-1">
                  <label
                    className="block text-sm font-medium text-gray-600"
                    id="headlessui-listbox-label-15"
                    data-headlessui-state="open"
                  >
                    { __( 'Allow Article Printing', 'wedocs' ) }
                  </label>
                  <div
                    className="tooltip cursor-pointer ml-2"
                    data-tip={ __(
                      'Enable this option to allow users to print articles directly from the website',
                      'wedocs'
                    ) }
                  >
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
                <div className="settings-field flex items-center w-full max-w-[490px] mt-1 ml-auto flex-2">
                  <Switcher
                    name="print"
                    generalSettings={ generalSettings }
                    settingsData={ settingsData }
                    setSettings={ setSettings }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeneralSettings;
