import { __ } from '@wordpress/i18n';
import Switcher from '../Switcher';
import { useEffect, useState, useMemo } from '@wordpress/element';
import SelectBox from '../SelectBox';

const GeneralSettings = ( {
  settingsData,
  generalSettingsData,
  setSettings,
  searchQuery = '',
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

  // Helper function to check if a setting matches the search query
  const matchesSearch = (text) => {
    if (!searchQuery || searchQuery.trim() === '') return true;
    return text.toLowerCase().includes(searchQuery.toLowerCase().trim());
  };

  // Define settings with their search keywords
  const settingItems = useMemo(() => [
    {
      id: 'docs_home',
      label: __('weDocs Home', 'wedocs'),
      keywords: 'wedocs home page documentation shortcode',
      visible: true,
    },
    {
      id: 'email',
      label: __('Email Feedback on Article', 'wedocs'),
      keywords: 'email feedback article invite readers thoughts form contact',
      visible: true,
    },
    {
      id: 'email_to',
      label: __('Email Address', 'wedocs'),
      keywords: 'email address receive feedback contact',
      visible: generalSettingsData?.email === 'on' || !Boolean(generalSettingsData?.email),
    },
    {
      id: 'enable_search',
      label: __('Enable searchbar on docs home', 'wedocs'),
      keywords: 'enable searchbar docs home homepage search',
      visible: true,
    },
    {
      id: 'helpful',
      label: __('Helpful Feedback on Article', 'wedocs'),
      keywords: 'helpful feedback article readers opinions content',
      visible: true,
    },
    {
      id: 'comments',
      label: __('Allow Comments on Article', 'wedocs'),
      keywords: 'allow comments article reader engagement discussion',
      visible: true,
    },
    {
      id: 'print',
      label: __('Allow Article Printing', 'wedocs'),
      keywords: 'allow article printing print users website',
      visible: true,
    },
  ], [generalSettingsData]);

  // Filter settings based on search query
  const filteredSettings = useMemo(() => {
    if (!searchQuery || searchQuery.trim() === '') {
      return settingItems;
    }
    
    return settingItems.filter(item => 
      item.visible && (
        matchesSearch(item.label) || 
        matchesSearch(item.keywords)
      )
    );
  }, [searchQuery, settingItems]);

  return (
      <section>
      <div className="shadow sm:rounded-md">
        <div className="bg-white sm:rounded-md min-h-[500px]">
          <div className="section-heading py-4 px-8 sm:px-8 sm:py-4">
            <h2 className="text-gray-900 font-medium text-lg">
              {__('General', 'wedocs')}
            </h2>
          </div>
          <hr className="h-px !bg-gray-200 border-0 dark:!bg-gray-200" />
          { searchQuery && filteredSettings.length === 0 && (
            <div className="pt-6 pb-20 px-8">
              <p className="text-gray-500 text-center">
                {__('No settings found matching your search.', 'wedocs')}
              </p>
            </div>
          ) }
          <div className="pt-6 pb-20 px-8 grid grid-cols-4 gap-5">
            { filteredSettings.find(s => s.id === 'docs_home') && (
            <div className="col-span-4"
              style={{ backgroundColor: searchQuery && matchesSearch(filteredSettings.find(s => s.id === 'docs_home')?.label || '') ? '#fef3c7' : 'transparent' }}
            >
              <div className="settings-content flex items-center justify-between">
                <div className="settings-field-heading md:min-w-[300px] flex items-center space-x-2 flex-1">
                  <label
                      className="block text-sm font-medium text-gray-600"
                      id="headlessui-listbox-label-15"
                      data-headlessui-state="open"
                  >
                    {__('weDocs Home', 'wedocs')}
                  </label>
                </div>
                <div className="settings-field w-full max-w-[490px] mt-1 ml-auto flex-2">
                  <div className="relative">
                    <SelectBox
                        name="docs_home"
                        setSettings={setSettings}
                        settingsData={settingsData}
                        settingsPanel={generalSettings}
                    />
                  </div>
                </div>
              </div>
              <div className="settings-description w-full max-w-[490px] ml-auto mt-1">
                <p className="text-sm text-[#6B7280]">
                  {__(
                      'Select the documentation Home page, where the shortcode [wedocs] ',
                      'wedocs'
                  )}
                    <a
                        href="https://wedocs.co/docs/wedocs/shortcodes/"
                        target="_blank"
                        className="text-indigo-700 underline underline-offset-2 !shadow-none"
                        rel="noreferrer"
                    >
                    {__('shortcode', 'wedocs')}
                  </a>
                    {__(' is used.', 'wedocs')}
                </p>
              </div>
            </div>
            ) }

            { filteredSettings.find(s => s.id === 'email') && (
            <div className="col-span-4"
              style={{ backgroundColor: searchQuery && matchesSearch(filteredSettings.find(s => s.id === 'email')?.label || '') ? '#fef3c7' : 'transparent' }}
            >
              <div className="settings-content flex items-center justify-between">
                <div className="settings-heading md:min-w-[300px] flex items-center space-x-2 flex-1">
                  <label
                      className="block text-sm font-medium text-gray-600"
                      id="headlessui-listbox-label-15"
                      data-headlessui-state="open"
                  >
                    {__('Email Feedback on Article', 'wedocs')}
                  </label>
                  <div
                      className="tooltip cursor-pointer ml-2 z-[9999]"
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
                <div className="settings-field flex items-center w-full max-w-[490px] ml-auto flex-2">
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
            ) }

              { filteredSettings.find(s => s.id === 'email_to') && (generalSettingsData?.email === 'on' ||
                  !Boolean(generalSettingsData?.email)) && (
                  <div className="col-span-4"
                    style={{ backgroundColor: searchQuery && matchesSearch(filteredSettings.find(s => s.id === 'email_to')?.label || '') ? '#fef3c7' : 'transparent' }}
                  >
                <div className="settings-content flex items-center justify-between">
                  <div className="settings-field-heading md:min-w-[300px] flex items-center space-x-2 flex-1">
                    <label
                        className="block text-sm font-medium text-gray-600"
                        id="headlessui-listbox-label-15"
                        data-headlessui-state="open"
                    >
                      {__('Email Address', 'wedocs')}
                    </label>

                    <div
                        className="tooltip cursor-pointer ml-2 z-[9999]"
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
                  <div className="settings-field w-full max-w-[490px] ml-auto flex-2">
                    <div className="relative">
                      <input
                          type="email"
                          name="doc_title"
                          id="doc-title"
                          placeholder={__(
                              'Write your email address',
                              'wedocs'
                          )}
                          className="w-full !rounded-md !border-gray-300 bg-white !py-1 !pl-3 !pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                          value={generalSettingsData?.email_to || ''}
                          onChange={handleEmailAddress}
                      />
                    </div>
                  </div>
                </div>
              </div>
              ) }

              { filteredSettings.find(s => s.id === 'enable_search') && (
              <div className="col-span-4"
                style={{ backgroundColor: searchQuery && matchesSearch(filteredSettings.find(s => s.id === 'enable_search')?.label || '') ? '#fef3c7' : 'transparent' }}
              >
              <div className="settings-content flex items-center justify-between">
                <div className="settings-heading md:min-w-[300px] space-x-2 items-center flex flex-1">
                  <label
                      className="block text-sm font-medium text-gray-600"
                      id="headlessui-listbox-label-15"
                      data-headlessui-state="open"
                  >
                    {__('Enable searchbar on docs home', 'wedocs')}
                  </label>
                  <div
                      className="tooltip cursor-pointer ml-2 z-[9999]"
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
                <div className="settings-field flex items-center w-full max-w-[490px] ml-auto flex-2">
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
            ) }

            { filteredSettings.find(s => s.id === 'helpful') && (
            <div className="col-span-4"
              style={{ backgroundColor: searchQuery && matchesSearch(filteredSettings.find(s => s.id === 'helpful')?.label || '') ? '#fef3c7' : 'transparent' }}
            >
              <div className="settings-content flex items-center justify-between">
                <div className="settings-heading md:min-w-[300px] space-x-2 items-center flex flex-1">
                  <label
                      className="block text-sm font-medium text-gray-600"
                      id="headlessui-listbox-label-15"
                      data-headlessui-state="open"
                  >
                    {__('Helpful Feedback on Article', 'wedocs')}
                  </label>
                  <div
                      className="tooltip cursor-pointer ml-2 z-[9999]"
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
                <div className="settings-field flex items-center w-full max-w-[490px] ml-auto flex-2">
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
            ) }

            { filteredSettings.find(s => s.id === 'comments') && (
            <div className="col-span-4"
              style={{ backgroundColor: searchQuery && matchesSearch(filteredSettings.find(s => s.id === 'comments')?.label || '') ? '#fef3c7' : 'transparent' }}
            >
              <div className="settings-content flex items-center justify-between mt-1">
                <div className="settings-heading md:min-w-[300px] space-x-2 items-center flex flex-1">
                  <label
                      className="block text-sm font-medium text-gray-600"
                      id="headlessui-listbox-label-15"
                      data-headlessui-state="open"
                  >
                    {__('Allow Comments on Article', 'wedocs')}
                  </label>
                  <div
                      className="tooltip cursor-pointer ml-2 z-[9999]"
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
                <div className="settings-field flex items-center w-full max-w-[490px] ml-auto flex-2">
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
            ) }

            { filteredSettings.find(s => s.id === 'print') && (
            <div className="col-span-4"
              style={{ backgroundColor: searchQuery && matchesSearch(filteredSettings.find(s => s.id === 'print')?.label || '') ? '#fef3c7' : 'transparent' }}
            >
              <div className="settings-content flex items-center justify-between">
                <div className="settings-heading md:min-w-[300px] space-x-2 items-center flex flex-1">
                  <label
                      className="block text-sm font-medium text-gray-600"
                      id="headlessui-listbox-label-15"
                      data-headlessui-state="open"
                  >
                    {__('Allow Article Printing', 'wedocs')}
                  </label>
                  <div
                      className="tooltip cursor-pointer ml-2 z-[9999]"
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
                <div className="settings-field flex items-center w-full max-w-[490px] ml-auto flex-2">
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
            ) }
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeneralSettings;
