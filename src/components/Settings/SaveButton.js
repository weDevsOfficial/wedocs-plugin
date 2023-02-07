import { __ } from '@wordpress/i18n';

const SaveButton = ( { settingsSaveHandler } ) => {
	return (
		<div className="sticky flex justify-end bottom-0 mt-5 p-5 pr-0">
			<button
				type="button"
				onClick={ settingsSaveHandler }
				className="inline-flex shadow shadow-lg shadow-gray-800/30 items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
					className="-ml-1 mr-3 h-5 w-5"
				>
					<path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z"></path>
				</svg>
				{ __( 'Save', 'wedocs-pro' ) }
			</button>
		</div>
	);
};

export default SaveButton;
