// DESCRIPTION: Toggle switch for the FAQ screens.
// Mirrors the markup of the settings Switcher (src/components/Switcher.js) so
// the FAQ toggles look identical to the ones on the settings page. Switcher
// itself is bound to the settings store, so only its presentation is reused.

import { Switch } from '@headlessui/react';

const classNames = ( ...classes ) => classes.filter( Boolean ).join( ' ' );

const ToggleSwitch = ( { checked, onChange, disabled = false, label } ) => (
    <Switch
        checked={ checked }
        onChange={ onChange }
        disabled={ disabled }
        aria-label={ label }
        className={ classNames(
            disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
            'group relative inline-flex h-5 w-10 flex-shrink-0 outline-0 items-center justify-center rounded-full'
        ) }
    >
        <span
            aria-hidden="true"
            className="pointer-events-none absolute h-full w-full rounded-md bg-white"
        />
        <span
            aria-hidden="true"
            className={ classNames(
                checked ? 'bg-indigo-600' : 'bg-gray-200',
                'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
            ) }
        />
        <span
            aria-hidden="true"
            className={ classNames(
                checked ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out'
            ) }
        />
    </Switch>
);

export default ToggleSwitch;
