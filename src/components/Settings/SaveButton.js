import { __ } from '@wordpress/i18n';

const SaveButton = ( { settingsSaveHandler, saving, disabled = false } ) => {
  return (
    <div className="flex justify-end mt-5 p-5 pr-0">
      <button
        type="button"
        onClick={ settingsSaveHandler }
        disabled={ disabled || saving }
        aria-disabled={ disabled || saving }
        className={ `${ saving || disabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100' } min-w-[136px] inline-flex shadow shadow-lg shadow-gray-800/30 items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2` }
      >
        { saving ? __( 'Saving...', 'wedocs' ) : disabled ? __( 'Loading...', 'wedocs' ) : __( 'Save Settings', 'wedocs' ) }
      </button>
    </div>
  );
};

export default SaveButton;
