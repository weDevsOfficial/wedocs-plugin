import { __ } from '@wordpress/i18n';
import { Tab } from '@headlessui/react';
import { useState } from '@wordpress/element';

const Menu = () => {
	const menus = {
		general: __( 'General', 'wedocs-pro' ),
		permission: __( 'Permission Management', 'wedocs-pro' ),
		widget: __( 'Assistant Widget', 'wedocs-pro' ),
		license: __( 'License', 'wedocs-pro' ),
	};

	const [ iconPath, setIconPath ] = useState(
		'M1 10.512l2-2m0 0l7-7 7 7m-14 0v10a1 1 0 0 0 1 1h3m10-11l2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6'
	);

	const handleMenuIconPath = ( index ) => {
		let path =
			index === 1
				? 'M10 2.866a3.99 3.99 0 0 1 3-1.354 4 4 0 1 1 0 8 3.99 3.99 0 0 1-3-1.354m3 11.354H1v-1a6 6 0 1 1 12 0v1zm0 0h6v-1a6 6 0 0 0-6-6 5.97 5.97 0 0 0-3 .803m1-7.803a4 4 0 1 1-8 0 4 4 0 1 1 8 0z'
				: iconPath;
		path =
			index === 2
				? 'M1 3.512v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-6l-2-2H3a2 2 0 0 0-2 2z'
				: path;
		path =
			index === 3
				? 'M13 5.512a2 2 0 0 1 2 2m4 0a6 6 0 0 1-7.743 5.743L9 15.512H7v2H5v2H2a1 1 0 0 1-1-1v-2.586a1 1 0 0 1 .293-.707l5.964-5.964A6 6 0 0 1 13 1.512a6 6 0 0 1 6 6z'
				: path;

		return path;
	};

	return (
		<>
			{ Object.entries( menus ).map( ( value, index ) => (
				<Tab
					key={ index }
					className="w-full focus:outline-0 text-gray-600 aria-selected:text-gray-600 aria-selected:bg-gray-100 hover:text-gray-600 hover:bg-gray-100 group rounded-md px-5 py-3 flex items-center text-sm font-medium"
				>
					{ index === 0 && (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="21"
							fill="currentColor"
							className="text-gray-400 flex-shrink-0 -ml-1 mr-4 h-6 w-6"
						>
							<path
								d="M1 10.512l2-2m0 0l7-7 7 7m-14 0v10a1 1 0 0 0 1 1h3m10-11l2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6"
								stroke="#9ca3af"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					) }
					{ index === 1 && (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="21"
							fill="none"
							className="text-gray-400 flex-shrink-0 -ml-1 mr-4 h-6 w-6"
						>
							<path
								d="M10 2.866a3.99 3.99 0 0 1 3-1.354 4 4 0 1 1 0 8 3.99 3.99 0 0 1-3-1.354m3 11.354H1v-1a6 6 0 1 1 12 0v1zm0 0h6v-1a6 6 0 0 0-6-6 5.97 5.97 0 0 0-3 .803m1-7.803a4 4 0 1 1-8 0 4 4 0 1 1 8 0z"
								stroke="#9ca3af"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					) }
					{ index === 2 && (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox={ index === 2 ? '0 0 20 18' : null }
							fill="none"
							className="text-gray-400 flex-shrink-0 -ml-1 mr-4 h-6 w-6"
						>
							<path
								d="M1 3.512v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-6l-2-2H3a2 2 0 0 0-2 2z"
								stroke="#9ca3af"
								strokeWidth="2"
								strokeLinejoin="round"
							/>
						</svg>
					) }
					{ index === 3 && (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="21"
							fill="none"
							className="text-gray-400 flex-shrink-0 -ml-1 mr-4 h-6 w-6"
						>
							<path
								d="M13 5.512a2 2 0 0 1 2 2m4 0a6 6 0 0 1-7.743 5.743L9 15.512H7v2H5v2H2a1 1 0 0 1-1-1v-2.586a1 1 0 0 1 .293-.707l5.964-5.964A6 6 0 0 1 13 1.512a6 6 0 0 1 6 6z"
								stroke="#9ca3af"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					) }
					<span className="truncate">{ value[ 1 ] }</span>
				</Tab>
			) ) }
		</>
	);
};

export default Menu;
