// DESCRIPTION: Dropdown to choose the Docs URL & breadcrumb structure.
// DESCRIPTION: Writes "before_doc" or "after_doc" into general settings under "docs_url_structure".

import { __ } from '@wordpress/i18n';
import ListboxSelect from './ListboxSelect';

const DocsUrlStructureSelect = ( {
  setSettings,
  settingsData,
  settingsPanel,
} ) => {
  const options = [
    { id: 'before_doc', name: __( 'Before Doc', 'wedocs' ) },
    { id: 'after_doc', name: __( 'After Doc', 'wedocs' ) },
  ];

  const currentValue = settingsPanel?.docs_url_structure || 'before_doc';
  const selectedOption =
    options.find( ( option ) => option.id === currentValue ) || options[ 0 ];

  const handleChange = ( option ) => {
    setSettings( {
      ...settingsData,
      general: { ...settingsPanel, docs_url_structure: option.id },
    } );
  };

  return (
    <ListboxSelect
      value={ selectedOption }
      options={ options }
      onChange={ handleChange }
    />
  );
};

export default DocsUrlStructureSelect;
