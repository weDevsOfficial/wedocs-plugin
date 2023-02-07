import PrivacyIcon from '../PrivacyIcon';
import folder from '../../assets/img/folder.png';
import { __, sprintf } from '@wordpress/i18n';
import file from '../../assets/img/file.png';
import thumb from '../../assets/img/thumb.jpg';
import thumb2 from '../../assets/img/thumb2.jpg';
import thumb3 from '../../assets/img/thumb3.jpg';
import thumb4 from '../../assets/img/thumb4.jpg';
import AddPostModal from '../AddPostModal';
import { useSelect } from '@wordpress/data';
import docsStore from '../../data/docs';
import { Link } from 'react-router-dom';
import { Fragment } from '@wordpress/element';
import { Menu, Transition } from '@headlessui/react';
import DocumentationHeader from './DocumentationHeader';
import AddSectionModal from '../AddSectionModal';

const ParentDocs = ( { doc } ) => {
	if ( ! doc ) {
		return;
	}

	const sections = useSelect(
		( select ) => select( docsStore ).getSectionsDocs( doc.id ),
		[]
	);

	const articles = useSelect(
		( select ) => select( docsStore ).getDocArticles( doc.id ),
		[]
	);

	return (
		<div key={ doc.id } className="col-span-1 rounded bg-white shadow">
			<DocumentationHeader key={ doc.id } doc={ doc } />

			{ /* Documentation Section Start */ }
			<div className="w-full p-6 pt-0 pb-7">
				<ul role="list" className="mb-6 rounded-md">
					<li
						key="sections"
						className="flex items-center justify-between mb-0 py-1.5 pl-3 pr-4 text-sm"
					>
						<div className="w-full inline-flex items-center">
							<div className="w-6 flex-none justify-center">
								<img
									src={ folder }
									alt={ __( 'Docs Link Icon', 'wedocs-pro' ) }
								/>
							</div>
							<span className="ml-2 flex-1 truncate">
								{ sprintf(
									// translators: %d: Length of documentation sections
									__( '%d Sections', 'wedocs-pro' ),
									sections.length
								) }
							</span>
						</div>
					</li>
					<li
						key="articles"
						className="flex items-center justify-between mb-0 py-1.5 pl-3 pr-4 text-sm"
					>
						<div className="flex w-0 flex-1 items-center">
							<div className="w-6 flex justify-center">
								<img
									src={ file }
									alt={ __( 'Docs Link Icon', 'wedocs-pro' ) }
								/>
							</div>
							<span className="ml-2 w-0 flex-1 truncate">
								{ sprintf(
									// translators: %d: Length of documentation articles
									__( '%d Articles', 'wedocs-pro' ),
									articles.length
								) }
							</span>
						</div>
					</li>
				</ul>

				<div className="isolate ml-4 flex -space-x-2 overflow-hidden">
					<img
						className="relative z-30 inline-block h-7 w-7 rounded-full ring-2 ring-white"
						src={ thumb }
						alt={ __( 'thumbnail', 'wedocs-pro' ) }
					/>
					<img
						className="relative z-20 inline-block h-7 w-7 rounded-full ring-2 ring-white"
						src={ thumb2 }
						alt={ __( 'thumbnail', 'wedocs-pro' ) }
					/>
					<img
						className="relative z-10 inline-block h-7 w-7 rounded-full ring-2 ring-white"
						src={ thumb3 }
						alt={ __( 'thumbnail', 'wedocs-pro' ) }
					/>
					<img
						className="relative z-0 inline-block h-7 w-7 rounded-full ring-2 ring-white"
						src={ thumb4 }
						alt={ __( 'thumbnail', 'wedocs-pro' ) }
					/>
					<img
						className="relative z-0 inline-block h-7 w-7 rounded-full ring-2 ring-white"
						src={ thumb }
						alt={ __( 'thumbnail', 'wedocs-pro' ) }
					/>
				</div>
			</div>
			{ /* Documentation Section End */ }

			{ /* Documentation Footer Start */ }
			<div className="border-t border-gray-200">
				<div className="-mt-px flex divide-x divide-gray-200">
					<div className="flex w-0 flex-1 justify-between items-center py-4 px-6">
						<Link
							to={ `/manager/${ doc.id }` }
							className="relative -mr-px flex rounded-bl-lg border border-transparent text-sm font-medium text-gray-700 hover:text-gray-500"
						>
							<svg
								className="h-5 w-5 text-gray-400"
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								fill="none"
								stroke="#374151"
								strokeWidth="2"
								strokeLinejoin="round"
							>
								<path d="M8.325 2.317c.426-1.756 2.924-1.756 3.351 0 .275 1.135 1.575 1.673 2.572 1.066 1.543-.94 3.31.826 2.369 2.369-.608.997-.069 2.297 1.066 2.572 1.756.426 1.756 2.924 0 3.351-1.135.275-1.673 1.575-1.065 2.572.94 1.543-.826 3.31-2.369 2.369-.997-.608-2.297-.069-2.572 1.066-.426 1.756-2.924 1.756-3.351 0-.275-1.135-1.575-1.673-2.572-1.065-1.543.94-3.31-.826-2.369-2.369.608-.997.069-2.297-1.066-2.572-1.756-.426-1.756-2.924 0-3.351 1.135-.275 1.673-1.575 1.066-2.572-.94-1.543.826-3.31 2.369-2.369.997.608 2.297.069 2.572-1.066z" />
								<path d="M13 10a3 3 0 1 1-6 0 3 3 0 1 1 6 0z" />
							</svg>

							<span className="ml-2">
								{ __( 'Manage', 'wedocs-pro' ) }
							</span>
						</Link>
						<AddSectionModal
							className="py-2 inline-flex items-center hover:bg-indigo-600 hover:text-white rounded-md border border-gray-200 ease-in-out duration-200 shadow-gray-100 px-4 text-sm text-gray shadow-sm"
							parent={ doc.id }
						>
							<span className="dashicons dashicons-plus-alt2 w-3.5 h-3.5 mr-4 text-base flex items-center"></span>
							{ __( 'Add', 'wedocs-pro' ) }
						</AddSectionModal>
					</div>
				</div>
			</div>
			{ /* Documentation Footer End */ }
		</div>
	);
};

export default ParentDocs;
