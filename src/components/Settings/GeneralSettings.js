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
      <div className="wedocs-shadow sm:wedocs-rounded-md">
        <div className="wedocs-bg-white sm:wedocs-rounded-md wedocs-min-h-[500px]">
          <div className="section-heading wedocs-py-4 wedocs-px-8 sm:wedocs-px-8 sm:wedocs-py-4">
            <h2 className="wedocs-text-gray-900 wedocs-font-medium wedocs-text-lg">
              {__('General', 'wedocs')}
            </h2>
          </div>
          <hr className="wedocs-h-px !wedocs-bg-gray-200 wedocs-border-0 dark:!wedocs-bg-gray-200" />
          <div className="wedocs-pt-6 wedocs-pb-20 wedocs-px-8 wedocs-grid wedocs-grid-cols-4 wedocs-gap-5">
            <div className="wedocs-col-span-4">
              <div className="settings-content wedocs-flex wedocs-items-center wedocs-justify-between">
                <div className="settings-field-heading md:wedocs-min-w-[300px] wedocs-flex wedocs-items-center wedocs-space-x-2 wedocs-flex-1">
                  <label
                      className="wedocs-block wedocs-text-sm wedocs-font-medium wedocs-text-gray-600"
                      id="headlessui-listbox-label-15"
                      data-headlessui-state="open"
                  >
                    {__('weDocs Home', 'wedocs')}
                  </label>
                </div>
                <div className="settings-field wedocs-w-full wedocs-max-w-[490px] wedocs-mt-1 wedocs-ml-auto wedocs-flex-2">
                  <div className="wedocs-relative">
                    <SelectBox
                        name="docs_home"
                        setSettings={setSettings}
                        settingsData={settingsData}
                        settingsPanel={generalSettings}
                    />
                  </div>
                </div>
              </div>
              <div className="settings-description wedocs-w-full wedocs-max-w-[490px] wedocs-ml-auto wedocs-mt-1">
                <p className="wedocs-text-sm wedocs-text-[#6B7280]">
                  {__(
                      'Select the documentation Home page, where the shortcode [wedocs] ',
                      'wedocs'
                  )}
                    <a
                        href="https://github.com/tareq1988/wedocs-plugin/wiki/Using-Shortcodes"
                        target="_blank"
                        className="wedocs-text-indigo-700 wedocs-underline wedocs-underline-offset-2 !wedocs-shadow-none"
                        rel="noreferrer"
                    >
                    {__('shortcode', 'wedocs')}
                  </a>
                    {__(' is used.', 'wedocs')}
                </p>
              </div>
            </div>

            <div className="wedocs-col-span-4">
              <div className="settings-content wedocs-flex wedocs-items-center wedocs-justify-between">
                <div className="settings-heading md:wedocs-min-w-[300px] wedocs-flex wedocs-items-center wedocs-space-x-2 wedocs-flex-1">
                  <label
                      className="wedocs-block wedocs-text-sm wedocs-font-medium wedocs-text-gray-600"
                      id="headlessui-listbox-label-15"
                      data-headlessui-state="open"
                  >
                    {__('Email Feedback on Article', 'wedocs')}
                  </label>
                  <div
                      className="tooltip wedocs-cursor-pointer wedocs-ml-2 wedocs-z-[9999]"
                      data-tip={__(
                          'Invite readers to share their thoughts through an email feedback form',
                          'wedocs'
                      )}
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
                <div className="settings-field wedocs-flex wedocs-items-center wedocs-w-full wedocs-max-w-[490px] wedocs-ml-auto wedocs-flex-2">
                  <Switcher
                      name="email"
                      settingsPanel={generalSettings}
                      settingsData={settingsData}
                      setSettings={setSettings}
                      panelName={`general`}
                      isEnabled={generalSettings?.email !== 'off'}
                  />
                </div>
              </div>
            </div>

              {(generalSettingsData?.email === 'on' ||
                  !Boolean(generalSettingsData?.email)) && (
                  <div className="wedocs-col-span-4">
                <div className="settings-content wedocs-flex wedocs-items-center wedocs-justify-between">
                  <div className="settings-field-heading md:min-w-[300px] flex items-center space-x-2 flex-1">
                    <label
                        className="wedocs-block wedocs-text-sm wedocs-font-medium wedocs-text-gray-600"
                        id="headlessui-listbox-label-15"
                        data-headlessui-state="open"
                    >
                      {__('Email Address', 'wedocs')}
                    </label>

                    <div
                        className="tooltip wedocs-cursor-pointer wedocs-ml-2 wedocs-z-[9999]"
                        data-tip={__(
                            'Enter the email address where you would like to receive feedback',
                            'wedocs'
                        )}
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
                  <div className="settings-field wedocs-w-full wedocs-max-w-[490px] wedocs-ml-auto wedocs-flex-2">
                    <div className="wedocs-relative">
                      <input
                          type="email"
                          name="doc_title"
                          id="doc-title"
                          placeholder={__(
                              'Write your email address',
                              'wedocs'
                          )}
                          className="wedocs-w-full !wedocs-rounded-md !wedocs-border-gray-300 wedocs-bg-white !wedocs-py-1 !wedocs-pl-3 !wedocs-pr-10 wedocs-text-left wedocs-shadow-sm focus:wedocs-border-indigo-500 focus:wedocs-outline-none focus:wedocs-ring-1 focus:wedocs-ring-indigo-500 sm:wedocs-text-sm"
                          value={generalSettingsData?.email_to || ''}
                          onChange={handleEmailAddress}
                      />
                    </div>
                  </div>
                </div>
              </div>
              )}

              <div className="wedocs-col-span-4">
              <div className="settings-content wedocs-flex wedocs-items-center wedocs-justify-between">
                <div className="settings-heading md:wedocs-min-w-[300px] wedocs-space-x-2 wedocs-items-center wedocs-flex wedocs-flex-1">
                  <label
                      className="wedocs-block wedocs-text-sm wedocs-font-medium wedocs-text-gray-600"
                      id="headlessui-listbox-label-15"
                      data-headlessui-state="open"
                  >
                    {__('Enable searchbar on docs home', 'wedocs')}
                  </label>
                  <div
                      className="tooltip wedocs-cursor-pointer wedocs-ml-2 wedocs-z-[9999]"
                      data-tip={__(
                          'Enable searchbar on docs homepage, applicable only for those using the [weDocs] shortcode',
                          'wedocs'
                      )}
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
                <div className="settings-field wedocs-flex wedocs-items-center wedocs-w-full wedocs-max-w-[490px] wedocs-ml-auto wedocs-flex-2">
                  <Switcher
                      name="enable_search"
                      settingsPanel={generalSettings}
                      settingsData={settingsData}
                      setSettings={setSettings}
                      panelName={`general`}
                      isEnabled={generalSettings?.enable_search !== 'off'}
                  />
                </div>
              </div>
            </div>

            <div className="wedocs-col-span-4">
              <div className="settings-content wedocs-flex wedocs-items-center wedocs-justify-between">
                <div className="settings-heading md:wedocs-min-w-[300px] wedocs-space-x-2 wedocs-items-center wedocs-flex wedocs-flex-1">
                  <label
                      className="wedocs-block wedocs-text-sm wedocs-font-medium wedocs-text-gray-600"
                      id="headlessui-listbox-label-15"
                      data-headlessui-state="open"
                  >
                    {__('Helpful Feedback on Article', 'wedocs')}
                  </label>
                  <div
                      className="tooltip wedocs-cursor-pointer wedocs-ml-2 wedocs-z-[9999]"
                      data-tip={__(
                          'Enabling helpful feedback on your article allows readers to provide opinions on your content',
                          'wedocs'
                      )}
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
                <div className="settings-field wedocs-flex wedocs-items-center wedocs-w-full wedocs-max-w-[490px] wedocs-ml-auto wedocs-flex-2">
                  <Switcher
                      name="helpful"
                      settingsPanel={generalSettings}
                      settingsData={settingsData}
                      setSettings={setSettings}
                      panelName={`general`}
                      isEnabled={generalSettings?.helpful !== 'off'}
                  />
                </div>
              </div>
            </div>

            <div className="wedocs-col-span-4">
              <div className="settings-content wedocs-flex wedocs-items-center wedocs-justify-between wedocs-mt-1">
                <div className="settings-heading md:wedocs-min-w-[300px] wedocs-space-x-2 wedocs-items-center wedocs-flex wedocs-flex-1">
                  <label
                      className="wedocs-block wedocs-text-sm wedocs-font-medium wedocs-text-gray-600"
                      id="headlessui-listbox-label-15"
                      data-headlessui-state="open"
                  >
                    {__('Allow Comments on Article', 'wedocs')}
                  </label>
                  <div
                      className="tooltip wedocs-cursor-pointer wedocs-ml-2 wedocs-z-[9999]"
                      data-tip={__(
                          'Increase reader engagement by turning on comments',
                          'wedocs'
                      )}
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
                <div className="settings-field wedocs-flex wedocs-items-center wedocs-w-full wedocs-max-w-[490px] wedocs-ml-auto wedocs-flex-2">
                  <Switcher
                      name="comments"
                      settingsPanel={generalSettings}
                      settingsData={settingsData}
                      setSettings={setSettings}
                      panelName={`general`}
                      isEnabled={generalSettings?.comments === 'on'}
                  />
                </div>
              </div>
            </div>

            <div className="wedocs-col-span-4">
              <div className="settings-content wedocs-flex wedocs-items-center wedocs-justify-between">
                <div className="settings-heading md:wedocs-min-w-[300px] wedocs-space-x-2 wedocs-items-center wedocs-flex wedocs-flex-1">
                  <label
                      className="wedocs-block wedocs-text-sm wedocs-font-medium wedocs-text-gray-600"
                      id="headlessui-listbox-label-15"
                      data-headlessui-state="open"
                  >
                    {__('Allow Article Printing', 'wedocs')}
                  </label>
                  <div
                      className="tooltip wedocs-cursor-pointer wedocs-ml-2 wedocs-z-[9999]"
                      data-tip={__(
                          'Allow users to print articles directly from the website',
                          'wedocs'
                      )}
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
                <div className="settings-field wedocs-flex wedocs-items-center wedocs-w-full wedocs-max-w-[490px] wedocs-ml-auto wedocs-flex-2">
                  <Switcher
                      name="print"
                      settingsPanel={generalSettings}
                      settingsData={settingsData}
                      setSettings={setSettings}
                      panelName={`general`}
                      isEnabled={generalSettings?.print !== 'off'}
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
