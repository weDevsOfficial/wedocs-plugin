import { __ } from '@wordpress/i18n';

const SaveButton = ( { settingsSaveHandler, saving } ) => {
  return (
    <div className="wedocs-flex wedocs-justify-end wedocs-mt-5 wedocs-p-5 wedocs-pr-0">
      <button
        type="button"
        onClick={ settingsSaveHandler }
        className={ `${ saving ? 'wedocs-opacity-50' : 'wedocs-opacity-100' } wedocs-min-w-[136px] wedocs-inline-flex wedocs-shadow wedocs-shadow-lg wedocs-shadow-gray-800/30 wedocs-items-center wedocs-rounded-md wedocs-border wedocs-border-transparent wedocs-bg-indigo-600 wedocs-px-4 wedocs-py-2 wedocs-text-base wedocs-font-medium wedocs-text-white hover:wedocs-bg-indigo-700 focus:wedocs-outline-none focus:wedocs-ring-2 focus:wedocs-ring-indigo-500 focus:wedocs-ring-offset-2` }
      >
        { saving ? __( 'Saving...', 'wedocs' ) : __( 'Save Settings', 'wedocs' ) }
      </button>
    </div>
  );
};

export default SaveButton;
