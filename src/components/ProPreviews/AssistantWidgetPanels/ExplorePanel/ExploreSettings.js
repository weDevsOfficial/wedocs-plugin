import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { __, sprintf } from '@wordpress/i18n';

const ExploreSettings = () => {
	const exploreBy = [
		{
			field: 'helpful',
			title: __( 'Helpful Content', 'wedocs' ),
			description: __(
				'Top 10 contents that are found as most helpful by the visitors will be set automatically in descending order',
				'wedocs'
			),
		},
		{
			field: 'selected',
			title: __( 'Selected Content', 'wedocs' ),
			description: __(
				'Manually select content that will appear in the Explore tab of the Assistant widget',
				'wedocs'
			),
		},
	];

	const classNames = ( ...classes ) => {
		return classes.filter( Boolean ).join( ' ' );
	};

	const articles = [
		{ id: 1, title: { rendered: __( 'Documentation Team 1', 'wedocs' ) } },
		{ id: 2, title: { rendered: __( 'Documentation Team 2', 'wedocs' ) } },
		{ id: 3, title: { rendered: __( 'Documentation Team 3', 'wedocs' ) } },
		{ id: 4, title: { rendered: __( 'Documentation Team 4', 'wedocs' ) } },
	];

	return (
		<div className="explore-settings wedocs-relative">
			<RadioGroup
				value={ exploreBy[ 1 ] }
			>
				<div className="wedocs-my-5 wedocs-grid wedocs-grid-cols-3 !wedocs-gap-6 sm:wedocs-grid-cols-3 sm:wedocs-gap-x-4">
					{ exploreBy.map( ( explore, index ) => (
						<RadioGroup.Option
							key={ index }
							value={ explore }
							className={ ( { checked, active } ) =>
								classNames(
									checked
										? 'wedocs-border-transparent'
										: 'wedocs-border-gray-300',
									active
										? 'wedocs-border-indigo-600 wedocs-ring-2 wedocs-ring-indigo-600'
										: '',
									'wedocs-relative wedocs-flex wedocs-cursor-pointer wedocs-rounded-lg wedocs-border wedocs-bg-white wedocs-p-4 wedocs-shadow-sm focus:wedocs-outline-none'
								)
							}
						>
							<span className="wedocs-flex">
								<span className="wedocs-flex wedocs-flex-col">
									<RadioGroup.Label
										as="span"
										className="wedocs-flex wedocs-items-center wedocs-text-sm wedocs-font-medium wedocs-text-gray-600 wedocs-mb-0.5"
									>
										{ explore?.title }
										<div
											className={ classNames(
												exploreBy[ 1 ]?.field !==
												explore?.field
													? 'wedocs-border wedocs-border-gray-400'
													: '',
												'wedocs-ml-auto wedocs-rounded-full wedocs-w-4 wedocs-h-4'
											) }
										>
											<CheckCircleIcon
												className={ classNames(
													exploreBy[ 1 ]?.field !==
													explore?.field
														? 'wedocs-invisible'
														: 'wedocs--mt-0.5',
													'wedocs-h-5 wedocs-w-5 wedocs-text-indigo-600'
												) }
												aria-hidden="true"
											/>
										</div>
									</RadioGroup.Label>
									<RadioGroup.Description
										as="span"
										className="wedocs-mt-1 wedocs-flex wedocs-items-center wedocs-font-medium wedocs-text-xs !wedocs-leading-5 wedocs-text-[#6B7280]"
									>
										{ explore?.description }
									</RadioGroup.Description>
									<span
										className={ classNames(
											exploreBy[ 1 ]?.id ===
											explore?.id
												? 'wedocs-border'
												: 'wedocs-border-2',
											exploreBy[ 1 ]?.id ===
											explore?.id
												? 'wedocs-border-indigo-600'
												: 'wedocs-border-transparent',
											'wedocs-pointer-events-none wedocs-absolute wedocs--inset-px wedocs-rounded-lg'
										) }
										aria-hidden="true"
									/>
								</span>
							</span>
						</RadioGroup.Option>
					) ) }
				</div>
			</RadioGroup>
			{ exploreBy[ 1 ]?.field === 'selected' && (
					<div className="wedocs-grid wedocs-grid-cols-4 wedocs-gap-5 wedocs-my-6">
						<div className="wedocs-col-span-4">
							<div className="settings-content wedocs-flex wedocs-items-center wedocs-justify-between">
								<div className="settings-field-heading md:wedocs-min-w-[300px] wedocs-flex wedocs-items-center wedocs-space-x-2 wedocs-flex-1">
									<label
										className="wedocs-block wedocs-text-sm wedocs-font-medium wedocs-text-gray-600"
										id="headlessui-listbox-label-15"
										data-headlessui-state="open"
									>
										{ __(
											'Select Content',
											'wedocs'
										) }
									</label>
									<div
										className="tooltip wedocs-cursor-pointer wedocs-ml-2"
										data-tip={ __(
											'Handpick content to showcase in the explore tab',
											'wedocs'
										) }
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="18"
											height="18"
											fill="none"
										>
											<path
												d="M9.833 12.333H9V9h-.833M9 5.667h.008M16.5 9a7.5 7.5 0 1 1-15 0 7.5 7.5 0 1 1 15 0z"
												stroke="#6b7280"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</div>
								</div>
								<div className="settings-field wedocs-w-full wedocs-max-w-[490px] wedocs-ml-auto flex-2">
									<div id="select-articles" className="multiSelectBox">
										<div className="wedocs-relative">
											<button className="wedocs-w-full wedocs-cursor-pointer wedocs-rounded-md wedocs-border wedocs-border-gray-300 wedocs-bg-white wedocs-py-2 wedocs-pl-3 wedocs-pr-10 wedocs-text-left wedocs-shadow-sm focus:wedocs-border-indigo-500 focus:wedocs-outline-none focus:wedocs-ring-1 focus:wedocs-ring-indigo-500 sm:wedocs-text-sm">
                                                    <span className="wedocs-block multiSelectBox wedocs-truncate">
                                                        { __( 'Select Articles', 'wedocs' ) }
                                                    </span>
												<span className="wedocs-pointer-events-none wedocs-absolute wedocs-inset-y-0 wedocs-right-0 wedocs-flex wedocs-items-center wedocs-pr-2">
                                                        <svg
																													xmlns="http://www.w3.org/2000/svg"
																													viewBox="0 0 20 20"
																													fill="currentColor"
																													aria-hidden="true"
																													className="wedocs-h-5 wedocs-w-5 wedocs-text-gray-400"
																												>
                                                            <path
																															d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
																															clipRule="evenodd"
																														></path>
                                                        </svg>
                                                    </span>
											</button>
										</div>
									</div>
								</div>
							</div>
							{ articles &&
								articles?.length > 0 && (
									<div className="selected-articles wedocs-rounded-md wedocs-mt-6 wedocs-max-w-[490px] wedocs-ml-auto wedocs-border wedocs-border-gray-300 wedocs-bg-white wedocs-text-left wedocs-shadow-sm">
										<div className="wedocs-w-full wedocs-py-2 wedocs-pl-6 wedocs-pr-10 wedocs-bg-gray-200 wedocs-text-xs wedocs-font-medium wedocs-text-gray-500 wedocs-tracking-wider">
											{ __(
												'Selected Articles',
												'wedocs'
											) }
										</div>
										<div className="wedocs-relative wedocs-px-3">
											<ul className="wedocs-z-10 wedocs-my-1.5">
												{ articles?.map(
													( article, index ) => (
														<li
															key={
																article?.id
															}
															className={ `${ index === 1 && 'wedocs-rounded-md wedocs-border wedocs-border-[#E5E7EB] wedocs-py-1' } wedocs-cursor-pointer wedocs-text-gray-900 wedocs-select-none !wedocs-mb-0.5` }
														>
															<nav
																className={ `${ index === 1 ? 'wedocs-block' : 'wedocs-hidden' } wedocs-flex wedocs-px-3.5 wedocs-pt-2.5` }
																aria-label="Breadcrumb"
															>
																<ol
																	role="list"
																	className="wedocs-flex wedocs-items-center"
																>
																	<li className="wedocs-m-0">
																		<div className="wedocs-flex wedocs-items-center">
																			<a
																				href='#'
																				className="wedocs-text-xs wedocs-leading-5 wedocs-text-gray-500 wedocs-text-indigo-700 wedocs-cursor-pointer"
																			>
																				{ __( 'Parent Documentation', 'wedocs' ) }
																			</a>
																			<ChevronRightIcon
																				className="wedocs-h-3.5 wedocs-w-3.5 wedocs-mx-1 wedocs-flex-shrink-0 wedocs-text-gray-400"
																				aria-hidden="true"
																			/>
																		</div>
																	</li>
																	<li className="wedocs-m-0">
																		<div className="wedocs-flex wedocs-items-center">
																			<a
																				href='#'
																				className="wedocs-text-xs wedocs-leading-5 wedocs-text-gray-500 wedocs-text-indigo-700 wedocs-cursor-pointer"
																			>
																				{ __( 'Section Documentation', 'wedocs' ) }
																			</a>
																		</div>
																	</li>
																</ol>
															</nav>
															<label
																htmlFor="multi-select"
																className="wedocs-py-2.5 wedocs-px-3.5 wedocs-font-normal wedocs-block wedocs-truncate wedocs-flex wedocs-items-center wedocs-w-full wedocs-group wedocs-text-sm wedocs-leading-5 wedocs-text-gray-500"
															>
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	width="14"
																	height="18"
																	fill="none"
																	className="wedocs-mr-2.5"
																>
																	<path
																		d="M4.5 9h5m-5 3.333h5m1.667 4.167H2.833c-.92 0-1.667-.746-1.667-1.667V3.167c0-.92.746-1.667 1.667-1.667h4.655c.221 0 .433.088.589.244l4.512 4.512c.156.156.244.368.244.589v7.988c0 .921-.746 1.667-1.667 1.667z"
																		stroke="#6b7280"
																		strokeWidth="2"
																		strokeLinecap="round"
																		strokeLinejoin="round"
																	/>
																</svg>
																<a
																	href={ `${ window.location.origin }/?p=${ article?.id }` }
																>
																	{ sprintf(
																		__(
																			'%s',
																			'wedocs'
																		),
																		article
																			?.title
																			?.rendered
																	) }
																</a>
																<button className={ `${ index === 1 ? 'wedocs-flex wedocs-items-center' : 'wedocs-hidden' } wedocs-cursor-pointer wedocs-ml-auto wedocs-bg-gray-100 wedocs-rounded wedocs-px-2 wedocs-py-0.5 wedocs-text-gray-500 wedocs-text-sm` }>
																	{ __(
																		'Remove',
																		'wedocs'
																	) }
																	<svg
																		xmlns="http://www.w3.org/2000/svg"
																		fill="none"
																		viewBox="0 0 24 24"
																		strokeWidth={
																			1.5
																		}
																		stroke="currentColor"
																		className="wedocs-w-3 wedocs-h-3 wedocs-ml-1"
																	>
																		<path
																			strokeLinecap="round"
																			strokeLinejoin="round"
																			d="M6 18L18 6M6 6l12 12"
																		/>
																	</svg>
																</button>
															</label>
														</li>
													)
												) }
											</ul>
										</div>
									</div>
								) }
						</div>
					</div>
				) }
		</div>
	);
};

export default ExploreSettings;
