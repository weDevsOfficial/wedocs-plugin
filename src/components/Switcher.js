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
  isEnabled,
} ) => {
  const savedValue = settingsPanel?.[ name ];

  // A saved value wins over the caller's default, so a switch that was turned
  // off and saved still reads Disable after a reload.
  const [ enabled, setEnabled ] = useState( () =>
    savedValue !== undefined ? savedValue === 'on' : isEnabled !== false
  );

  const classNames = ( ...classes ) => {
    return classes.filter( Boolean ).join( ' ' );
  };

  useEffect( () => {
    if ( savedValue !== undefined ) {
      setEnabled( savedValue === 'on' );
    }
  }, [ savedValue ] );

  useEffect( () => {
    if ( isEnabled !== undefined ) {
      setEnabled( isEnabled );
    }
  }, [ isEnabled ] );

  useEffect( () => {
    // Several switchers mount together and each writes its value here. Merge
    // into the latest state, otherwise every write starts from the same stale
    // copy and only the last switcher's value survives.
    setSettings( ( prev ) => ( {
      ...prev,
      [ panelName ]: {
        ...( prev?.[ panelName ] || {} ),
        [ name ]: enabled ? 'on' : 'off',
      },
    } ) );
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
          { enabled ? __( 'Enable', 'wedocs' ) : __( 'Disable', 'wedocs' ) }
        </span>
      </span>
    </>
  );
};

window.switchComponent = Switcher;
export default Switcher;
