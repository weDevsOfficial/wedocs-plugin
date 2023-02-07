import { __, sprintf } from '@wordpress/i18n';
import { Link } from 'react-router-dom';
import { useSelect } from '@wordpress/data';
import docsStore from '../../data/docs';

const ListingHeader = ( { id } ) => {
	if ( ! id ) {
		return;
	}

	const doc = useSelect(
		( select ) => select( docsStore ).getDoc( parseInt( id ) ),
		[]
	);

	return (
		<div className="docs-heading flex justify-between items-center mt-5 mb-3.5">
			<div className="section-heading flex items-center">
				<h1 className="flex items-center font-medium text-[#111827] text-xl space-x-3">
					<a
						target="_blank"
						rel="noreferrer"
						// href={ `${ window.location.origin }/wp-admin/post.php?action=edit&post=${ id }` }
						href={ `${ window.location.origin }/?p=${ id }` }
						className="flex items-center group hover:text-black"
					>
						<span className="group-hover:underline">
							{ sprintf(
								// translators: %s: Section title
								__( '%s', 'wedocs-pro' ),
								doc?.title?.rendered
							) }
						</span>
						<svg
							className="ml-5 stroke-gray-500 group-hover:stroke-indigo-700"
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							fill="none"
						>
							<path
								d="M7.118 3.5H3.452c-1.013 0-1.833.821-1.833 1.833V14.5c0 1.012.821 1.833 1.833 1.833h9.167c1.012 0 1.833-.821 1.833-1.833v-3.667m-3.667-9.167h5.5m0 0v5.5m0-5.5l-9.167 9.167"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</a>

					<a
						target="_blank"
						rel="noreferrer"
						href={ `${ window.location.origin }/wp-admin/post.php?post=${ id }&action=edit` }
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							fill="none"
						>
							<path
								d="M13.303 1.322a2.4 2.4 0 1 1 3.394 3.394l-.951.951-3.394-3.394.951-.951zm-2.648 2.649L.6 14.025v3.394h3.394L14.049 7.365l-3.394-3.394z"
								className="stroke-gray-500 hover:stroke-indigo-700"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</a>
				</h1>
			</div>
			<Link
				to={ `/manager/${ id }` }
				className="py-2 px-3 h-fit inline-flex items-center rounded border border-gray-300 bg-white px-4 text-xs font-medium text-gray-700 shadow-sm focus:outline-none"
			>
				<svg
					className="mr-2.5"
					width="14"
					height="14"
					viewBox="0 0 14 14"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M5.88309 1.87821C6.16735 0.707264 7.83265 0.707265 8.11692 1.87821C8.30055 2.63462 9.16716 2.99358 9.83188 2.58857C10.8609 1.96159 12.0384 3.13914 11.4114 4.16812C11.0064 4.83284 11.3654 5.69945 12.1218 5.88308C13.2927 6.16735 13.2927 7.83265 12.1218 8.11692C11.3654 8.30055 11.0064 9.16716 11.4114 9.83188C12.0384 10.8609 10.8609 12.0384 9.83188 11.4114C9.16717 11.0064 8.30055 11.3654 8.11692 12.1218C7.83265 13.2927 6.16735 13.2927 5.88309 12.1218C5.69945 11.3654 4.83284 11.0064 4.16812 11.4114C3.13914 12.0384 1.96159 10.8609 2.58857 9.83188C2.99358 9.16716 2.63462 8.30055 1.87821 8.11692C0.707265 7.83265 0.707264 6.16735 1.87821 5.88308C2.63462 5.69945 2.99358 4.83284 2.58857 4.16812C1.96159 3.13914 3.13914 1.96159 4.16812 2.58857C4.83284 2.99358 5.69945 2.63462 5.88309 1.87821Z"
						stroke="#374151"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M9 7C9 8.10457 8.10457 9 7 9C5.89543 9 5 8.10457 5 7C5 5.89543 5.89543 5 7 5C8.10457 5 9 5.89543 9 7Z"
						stroke="#374151"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				{ __( 'Manage', 'wedocs-pro' ) }
			</Link>
		</div>
	);
};

export default ListingHeader;
