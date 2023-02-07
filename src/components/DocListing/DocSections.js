import drag from '../../assets/img/drag.png';
import { __, sprintf } from '@wordpress/i18n';
import folder from '../../assets/img/folder.png';
import { useSelect } from '@wordpress/data';
import docStore from '../../data/docs';
import SectionArticles from './SectionArticles';
import { useState } from '@wordpress/element';
import AddArticleModal from '../AddArticleModal';

const DocSections = ( { section, sections } ) => {
	const { id, title } = section;
	const [ showArticles, setShowArticles ] = useState( false );

	const sectionArticles = useSelect(
		( select ) => select( docStore ).getSectionArticles( parseInt( id ) ),
		[]
	);

	return (
		<div className="space-y-4 mb-3">
			<div className="bg-white shadow sm:rounded-md">
				<div className="doc-section cursor-pointer px-4 py-5 sm:px-6">
					<div
						className="flex items-center group"
						onClick={ () => setShowArticles( ! showArticles ) }
					>
						<img
							src={ drag }
							alt={ __( 'Docs Link Icon', 'wedocs-pro' ) }
						/>
						<div className="flex items-center w-full">
							<div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
								<div className="truncate flex items-center">
									<div className="flex items-center text-sm pr-5">
										<img
											src={ folder }
											className="w-full h-full px-3.5"
											alt={ __(
												'Docs Link Icon',
												'wedocs-pro'
											) }
										/>
										<a
											href={ `${ window.location.origin }/?p=${ id }` }
											className="flex items-center flex-shrink-0 text-base font-medium text-black"
										>
											<span className="hover:underline group-hover:text-black">
												{ sprintf(
													__( '%s', 'wedocs-pro' ),
													title?.rendered
												) }
											</span>
										</a>
									</div>
									<div className="article-counter grid place-content-center text-white font-medium text-sm w-7 h-7 bg-[#00A1E4] rounded-full">
										{ sectionArticles.length }
									</div>
									<a
										href={ `${ window.location.origin }/?p=${ id }` }
										className="flex items-center flex-shrink-0 text-base font-medium text-black"
									>
										<svg
											className="hidden group-hover:block ml-6 stroke-gray-500 hover:stroke-indigo-700"
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
										className="ml-4 hidden group-hover:block"
										rel="noreferrer"
										href={ `${ window.location.origin }/wp-admin/post.php?post=${ id }&action=edit` }
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="18"
											height="18"
											fill="none"
											className="stroke-gray-500 hover:stroke-indigo-700"
										>
											<path
												d="M13.303 1.322a2.4 2.4 0 1 1 3.394 3.394l-.951.951-3.394-3.394.951-.951zm-2.648 2.649L.6 14.025v3.394h3.394L14.049 7.365l-3.394-3.394z"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</a>
								</div>
							</div>

							{ sectionArticles && sectionArticles.length > 0 && (
								<div className="ml-5 flex-shrink-0">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
										className={ `${
											showArticles
												? 'rotate-90 transform'
												: ''
										} group-hover:text-[#00A1E4] h-5 w-5 text-gray-400` }
									>
										<path d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" />
									</svg>
								</div>
							) }
						</div>
					</div>

					{ showArticles && (
						<div className="section-article mt-3 pl-4 sm:pl-6">
							{ sectionArticles &&
								sectionArticles.length > 0 &&
								sectionArticles.map( ( article ) => (
									<SectionArticles
										key={ article.id }
										article={ article }
									/>
								) ) }

							<AddArticleModal
								sections={ sections }
								className="py-2.5 px-4 mt-7 mb-2 h-fit inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 text-sm text-white hover:text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>
								<span className="dashicons dashicons-plus-alt2 w-3.5 h-3.5 mr-3 text-base flex items-center"></span>
								{ __( 'Add article', 'wedocs-pro' ) }
							</AddArticleModal>
						</div>
					) }
				</div>
			</div>
		</div>
	);
};

export default DocSections;
