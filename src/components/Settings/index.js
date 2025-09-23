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
import { useParams } from 'react-router-dom';
import WedocsPromoNotice from '../WedocsPromoNotice';

const SettingsPage = () => {
  const { panel } = useParams();

  const settings = useSelect(
    ( select ) => select( settingsStore ).getSettings(),
    []
  );

  const panelIndex = Object.keys( settings ).indexOf( panel );
  const [ selectedIndex, setSelectedIndex ] = useState( panelIndex || 0 );

  const [ docSettings, setDocSettings ] = useState( { ...settings } );

  const { need_upgrade, status } = useSelect(
    ( select ) => select( settingsStore ).getUpgradeInfo(),
    []
  );

  const [ saving, setSaving ] = useState( false );

  const handleSettingsSave = () => {
    // Update wedocs settings data.
    setSaving( true );
    dispatch( settingsStore )
      .updateSettings( { settings: docSettings } )
      .then( ( result ) => {
        setSaving( false );
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

  let templates = [
    <GeneralSettings
      index={ selectedIndex }
      settingsData={ docSettings }
      generalSettingsData={ docSettings?.general }
      setSettings={ setDocSettings }
    />,
  ];

  templates = wp.hooks.applyFilters(
    'wedocs_settings_page_templates',
    templates,
    docSettings,
    setDocSettings
  );

  const settingsFooter = wp.hooks.applyFilters(
    'wedocs_settings_page_footer',
    '',
    docSettings?.assistant
  );

  const showActions = wp.hooks.applyFilters(
    'wedocs_show_documentation_actions',
    true
  );

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

      settings.general.email = typeof email !== 'undefined' ? email : 'on';
      settings.general.print = typeof print !== 'undefined' ? print : 'on';
      settings.general.helpful = typeof helpful !== 'undefined' ? helpful : 'on';
      settings.general.email_to = typeof emailTo !== 'undefined' ? emailTo : '';
      settings.general.comments = typeof comments !== 'undefined' ? comments : 'off';
      settings.general.docs_home = docsPageId;
    }

    setDocSettings( { ...docSettings, ...settings } );
  }, [ settings ] );

  if ( status === 'done' ) {
    dispatch( settingsStore )
      .makeUpdateDone()
      .then( ( result ) => {
        if ( result ) {
          Swal.fire( {
            icon: 'success',
            text: __( 'weDocs database has been updated successfully', 'wedocs' ),
            title: __( 'Database Updated!', 'wedocs' ),
            toast: true,
            timer: 3000,
            position: 'bottom-end',
            showConfirmButton: false,
          } );
        }
      } )
      .catch( ( err ) => {} );
  }

  return (
    <div className="wedocs-min-h-full wedocs-pt-7">
      { showActions && need_upgrade && <Upgrade status={ status } /> }
      <WedocsPromoNotice />
      <main>
        <div className="wedocs-pb-10 wedocs-pt-3 sm:wedocs-px-0">
          <div className="wedocs-h-100">
            <div className="wedocs-h-full">
              <main>
                <div className="lg:wedocs-grid lg:wedocs-grid-cols-12 lg:wedocs-gap-x-6">
                  <Tab.Group
                    vertical
                    onChange={ setSelectedIndex }
                    selectedIndex={ selectedIndex }
                  >
                    <aside className="wedocs-px-2 sm:wedocs-px-6 lg:wedocs-py-0 lg:wedocs-px-0 lg:wedocs-col-span-3 md:wedocs-mb-6">
                      <nav className="wedocs-py-[18px] wedocs-min-h-[500px] wedocs-bg-white wedocs-rounded-md">
                        <Tab.List className="wedocs-px-2 wedocs-space-y-1">
                          <Menu />
                        </Tab.List>
                      </nav>
                    </aside>

                    <div className="wedocs-space-y-6 sm:wedocs-px-6 lg:wedocs-px-0 lg:wedocs-col-span-9">
                      <Tab.Panels>
                        { templates &&
                          templates?.map( ( value, index ) => (
                            <Tab.Panel key={ index }>{ value }</Tab.Panel>
                          ) ) }
                      </Tab.Panels>
                    </div>
                  </Tab.Group>
                </div>
              </main>

              <SaveButton settingsSaveHandler={ handleSettingsSave } saving={ saving } />
            </div>
          </div>
          { /* Render settings footer contents. */ }
          { settingsFooter }
        </div>
      </main>
    </div>
  );
};

window.weDocsSettingsPage = SettingsPage;
export default SettingsPage;
