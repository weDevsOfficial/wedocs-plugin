import { __ } from '@wordpress/i18n';

const UploadButton = ( { classes } ) => {
	return (
		<div
			className={ `flex items-center space-x-5 relative ${ classes ? classes : '' }` }
		>
			<button className="px-4 py-2.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm items-center flex justify-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="21"
					fill="none"
					className="mr-2 z-0"
				>
					<path
						d="M6.667 14.7A4.17 4.17 0 0 1 2.5 10.533a4.17 4.17 0 0 1 3.403-4.097 4.17 4.17 0 0 1 8.194 0 4.17 4.17 0 0 1-.764 8.264M7.5 10.533l2.5-2.5m0 0l2.5 2.5m-2.5-2.5v10"
						stroke="#fff"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				{ __( 'Upload', 'wedocs' ) }
			</button>
			<div id="file-chosen" className="flex items-center space-x-2.5">
				<span
					id="file-chosen"
					className="text-sm leading-5 font-medium text-gray-500"
				>{ __( 'example.png', 'wedocs' ) }</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={ 3 }
					className="w-4 h-4 stroke-gray-500 ml-2 relative z-50 cursor-pointer"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</div>
		</div>
	);
};

export default UploadButton;
