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
        className="wedocs-group wedocs-relative wedocs-inline-flex wedocs-h-5 wedocs-w-10 wedocs-flex-shrink-0 wedocs-cursor-pointer wedocs-outline-0 wedocs-items-center wedocs-justify-center wedocs-rounded-full"
      >
        <span
          aria-hidden="true"
          className="wedocs-pointer-events-none wedocs-absolute wedocs-h-full wedocs-w-full wedocs-rounded-md wedocs-bg-white"
        />
        <span
          aria-hidden="true"
          className={ classNames(
            enabled ? 'wedocs-bg-indigo-600' : 'wedocs-bg-gray-200',
            'wedocs-pointer-events-none wedocs-absolute wedocs-mx-auto wedocs-h-4 wedocs-w-9 wedocs-rounded-full wedocs-transition-colors wedocs-duration-200 wedocs-ease-in-out'
          ) }
        />
        <span
          aria-hidden="true"
          className={ classNames(
            enabled ? 'wedocs-translate-x-5' : 'wedocs-translate-x-0',
            'wedocs-pointer-events-none wedocs-absolute wedocs-left-0 wedocs-inline-block wedocs-h-5 wedocs-w-5 wedocs-transform wedocs-rounded-full wedocs-border wedocs-border-gray-200 wedocs-bg-white wedocs-shadow wedocs-ring-0 wedocs-transition-transform wedocs-duration-200 wedocs-ease-in-out'
          ) }
        />
      </Switch>
      <span className={ `${ name === 'assist_enable' ? 'wedocs-mt-0.5' : '' } wedocs-ml-3` }>
        <span className="wedocs-text-sm wedocs-text-gray-900">
          { enabled ? __( 'Enable', 'wedocs' ) : __( 'Disable', 'wedocs' ) }
        </span>
      </span>
    </>
  );
};

window.switchComponent = Switcher;
export default Switcher;
