import { useEffect, useState } from '@wordpress/element';
import { Switch } from '@headlessui/react';
import { __ } from '@wordpress/i18n';

const Switcher = ( {
  name,
  settingsPanel,
  settingsData,
  setSettings,
  panelName,
  onChange = () => {},
  isEnabled = true,
} ) => {
  const [ enabled, setEnabled ] = useState( isEnabled );

  const classNames = ( ...classes ) => {
    return classes.filter( Boolean ).join( ' ' );
  };

  useEffect( () => {
    if ( settingsPanel[ name ] === 'off' ) {
      setEnabled( false );
    }
  }, [ settingsPanel[ name ] ] );

  useEffect( () => {
      setEnabled( isEnabled );
  }, [ isEnabled ] );

  useEffect( () => {
    setSettings( {
      ...settingsData,
      [ panelName ]: { ...settingsPanel, [ name ]: enabled ? 'on' : 'off' },
    } );
  }, [ enabled ] );

  const handleChange = () => {
    setEnabled( !enabled );
    onChange( !enabled );
  }

  return (
    <>
      <Switch
        checked={ enabled }
        onChange={ ()=>handleChange() }
        className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer outline-0 items-center justify-center rounded-full"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute h-full w-full rounded-md bg-white"
        />
        <span
          aria-hidden="true"
          className={ classNames(
            enabled ? 'bg-indigo-600' : 'bg-gray-200',
            'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
          ) }
        />
        <span
          aria-hidden="true"
          className={ classNames(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out'
          ) }
        />
      </Switch>
      <span className={ `${ name === 'assist_enable' ? 'mt-0.5' : '' } ml-3` }>
        <span className="text-sm text-gray-900">
          { __( enabled ? 'Enable' : 'Disable', 'wedocs' ) }
        </span>
      </span>
    </>
  );
};

window.switchComponent = Switcher;
export default Switcher;
