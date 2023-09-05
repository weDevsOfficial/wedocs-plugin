import { Switch } from '@headlessui/react';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

const DummySwitch = ( { isEnabled = false, setChange } ) => {
  const [ enabled, setEnabled ] = useState( isEnabled );

  const classNames = ( ...classes ) => {
    return classes.filter( Boolean ).join( ' ' );
  };

  const handleSwichChange = () => {
    setEnabled( !enabled );
    setChange( !enabled );
  };

  return (
    <div className="flex items-center relative">
      <Switch
        onChange={ handleSwichChange }
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
      <span className={ `ml-3` }>
        <span className="text-sm text-gray-900">
          { __( enabled ? 'Enable' : 'Disable', 'wedocs' ) }
        </span>
      </span>
    </div>
  );
}

export default DummySwitch;
