// DESCRIPTION: Dropdown for choosing the weDocs Home page (docs_home general setting).
// DESCRIPTION: Pulls pages from the docs store and writes the selected page ID to settings.

import { useEffect, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import settingsStore from '../data/settings';
import docsStore from '../data/docs';
import ListboxSelect from './ListboxSelect';

const SelectBox = ( { name, setSettings, settingsData, settingsPanel } ) => {
  const docPageId = useSelect(
    ( select ) =>
      select( settingsStore ).getGeneralSettingsOption( 'docs_home' ),
    []
  );

  const pages = useSelect( ( select ) => select( docsStore ).getPages(), [] );

  const [ pageOptions, setPageOptions ] = useState( [] );
  const [ selectedPage, setSelectedPage ] = useState( {} );

  useEffect( () => {
    setSettings( {
      ...settingsData,
      general: { ...settingsPanel, [ name ]: selectedPage?.id },
    } );
  }, [ selectedPage ] );

  useEffect( () => {
    const options = pages?.map( ( page ) => {
      return { id: page?.id, name: page?.title?.rendered };
    } );

    let selectedPageObj = {};
    if ( ! Boolean( docPageId ) ) {
      selectedPageObj = options?.filter(
        ( page ) => page?.name === 'Documentation'
      )[ 0 ];
    } else {
      selectedPageObj = options?.filter(
        ( page ) => page?.id === parseInt( docPageId )
      )[ 0 ];
    }

    selectedPageObj = ( typeof selectedPageObj === 'undefined' || selectedPageObj === {} ) ? { ...options?.[0] } : selectedPageObj;

    setPageOptions( [ ...options ] );
    setSelectedPage( { ...selectedPageObj } );

    setSettings( {
      ...settingsData,
      general: { ...settingsPanel, docs_home: selectedPage?.id },
    } );
  }, [ pages ] );

  const hasSelection = selectedPage && Object.keys( selectedPage ).length > 0;

  return (
    <ListboxSelect
      value={ selectedPage }
      options={ pageOptions }
      onChange={ setSelectedPage }
      disabled={ ! hasSelection }
      placeholder={ __( 'Page not found', 'wedocs' ) }
    />
  );
};

export default SelectBox;
