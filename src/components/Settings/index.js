import Menu from './Menu';
import SaveButton from './SaveButton';
import { Tab } from '@headlessui/react';
import { useEffect, useState } from '@wordpress/element';
import { dispatch, useSelect } from '@wordpress/data';
import settingsStore from '../../data/settings';
import GeneralSettings from './GeneralSettings';
import Swal from 'sweetalert2';
import { __ } from '@wordpress/i18n';
import Upgrade from '../Upgrade';

const SettingsPage = () => {
  const [ selectedIndex, setSelectedIndex ] = useState( 0 );

  const settings = useSelect(
    ( select ) => select( settingsStore ).getSettings(),
    []
  );

  const [ docSettings, setDocSettings ] = useState( { ...settings } );

  const needUpgrade = useSelect(
    ( select ) => select( settingsStore ).getUpgradeInfo(),
    []
  );

  const handleSettingsSave = () => {
    // Update wedocs settings data.
    dispatch( settingsStore )
      .updateSettings( { settings: docSettings } )
      .then( ( result ) => {
        setDocSettings( { ...docSettings, ...result } );
        Swal.fire( {
          title: __( 'Settings Data Saved!', 'wedocs' ),
          text: __( 'Settings data has been saved successfully', 'wedocs' ),
          icon: 'success',
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 2000,
        } );
      } )
      .catch( ( err ) => {
        Swal.fire( {
          title: __( 'Error', 'wedocs' ),
          text: err.message,
          icon: 'error',
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 3000,
        } );
      } );
  };

  useEffect( () => {
    if ( settings?.docs_home && ! Boolean( settings?.general?.docs_home ) ) {
      const email = settings?.email;
      const print = settings?.print;
      const helpful = settings?.helpful;
      const emailTo = settings?.email_to;
      const comments = settings?.comments;
      const docsPageId = settings?.docs_home;

      delete settings?.email;
      delete settings?.print;
      delete settings?.helpful;
      delete settings?.comments;
      delete settings?.email_to;
      delete settings?.docs_home;

      settings.general.email = email;
      settings.general.print = print;
      settings.general.helpful = helpful;
      settings.general.email_to = emailTo;
      settings.general.comments = comments;
      settings.general.docs_home = docsPageId;
    }

    setDocSettings( { ...docSettings, ...settings } );
  }, [ settings ] );

  return (
    <div className="min-h-full pt-7">
      { needUpgrade && <Upgrade /> }

      <main>
        <div className="pb-10 pt-3 sm:px-0">
          <div className="h-100">
            <div className="h-full">
              <main>
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-6">
                  <Tab.Group
                    vertical
                    onChange={ setSelectedIndex }
                    selectedIndex={ selectedIndex }
                  >
                    <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
                      <nav className="py-[18px] min-h-[180px] bg-white rounded-md">
                        <Tab.List className="overflow-hidden px-2 space-y-0.5">
                          <Menu />
                        </Tab.List>
                      </nav>
                    </aside>

                    <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
                      <Tab.Panels>
                        <Tab.Panel>
                          <GeneralSettings
                            settingsData={ docSettings }
                            generalSettingsData={ docSettings.general }
                            setSettings={ setDocSettings }
                          />
                        </Tab.Panel>
                      </Tab.Panels>
                    </div>
                  </Tab.Group>
                </div>
              </main>

              <SaveButton settingsSaveHandler={ handleSettingsSave } />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
