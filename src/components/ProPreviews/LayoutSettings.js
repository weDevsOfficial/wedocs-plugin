import { __ } from '@wordpress/i18n';
import { RadioGroup, Tab } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import Overlay from './common/Overlay';
import Switcher from '../Switcher';
import { useState } from '@wordpress/element';

const LayoutSettings = ( { settingsData, setSettings } ) => {
	const { layout } = settingsData;
	const [ showOverlay, setShowOverlay ] = useState( false );

	const columnOptions = [
		{
			name: '1',
			src: '<svg width="46" height="25" fill="none">' +
				'<rect y=".981" width="46" height="24" rx="2" fill="#d5dadf" />' +
				'</svg>'
		},
		{
			name: '2',
			src: '<svg width="46" height="25" fill="#d5dadf">' +
				'<rect y=".981" width="22" height="24" rx="2" />' +
				'<rect x="24" y=".981" width="22" height="24" rx="2" />' +
				'</svg>'
		},
	];

	const templateOptions = [
		{ name: 'default', text: __( 'Default Template', 'wedocs' ) },
		{ name: 'bootstrap', text: __( 'Bootstrap Template', 'wedocs' ) },
		{ name: 'tailwind', text: __( 'Tailwind Template', 'wedocs' ) },
	];

	const layoutColorOptions  = [
		{
			key: 'active_nav_bg',
			title: __( 'Active Navigation Background Color', 'wedocs' ),
			tooltip: __( 'Highlight the active navigation section. Pick a background color that stands out', 'wedocs' ),
			default: { r: 6, g: 182, b: 212, a: 1 },
		},
		{
			key: 'active_nav_text',
			title: __( 'Active Navigation Text Color', 'wedocs' ),
			tooltip: __( 'Make navigation clear. Choose a text color for the active navigation section', 'wedocs' ),
			default: { r: 255, g: 255, b: 255, a: 1 },
		},
		{
			key: 'active_text',
			title: __( 'Active Font Color', 'wedocs' ),
			tooltip: __( 'Enhance readability. Select a font color for the active elements in your layout', 'wedocs' ),
			default: { r: 6, g: 182, b: 212, a: 1 },
		},
	];

	const classNames = ( ...classes ) => classes.filter( Boolean ).join( ' ' );

	return (
		<section>
			<div className="shadow sm:rounded-md bg-white overflow-hidden min-h-[500px]">
				<div className="py-4 px-8 sm:px-8 sm:py-4">
					<h2 className="text-gray-900 font-medium text-lg">
						{ __( 'Layout Settings', 'wedocs' ) }
					</h2>
				</div>
				<hr className="h-px !bg-gray-200 border-0 dark:!bg-gray-200" />
				<div
					className="pt-6 pb-20 px-8 grid grid-cols-4 gap-5 relative"
					onMouseEnter={ () => setShowOverlay( true ) }
					onMouseLeave={ () => setShowOverlay( false ) }
				>
					<div className='col-span-12' >
						<div className="settings-content flex items-center justify-between">
							<div className="settings-heading space-x-2 items-center flex flex-1">
								<label
									className="block text-sm font-medium text-gray-600"
									id="headlessui-listbox-label-15"
									data-headlessui-state="open"
								>
									{ __( 'Choose Doc List Column Style', 'wedocs' ) }
								</label>
								<div
									className="tooltip cursor-pointer ml-2 z-[9999]"
									data-tip={ __(
										'Choose how your document list columns should appear',
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
						</div>
					</div>
					<div className="settings-field flex items-center mb-2">
						<RadioGroup value={ columnOptions[ 1 ] }>
							<div className="flex items-center space-x-6">
								{ columnOptions.map( ( column, index ) => (
									<RadioGroup.Option
										key={ index }
										value={ column }
										className={ ( { checked, active } ) =>
											classNames(
												checked
													? 'border-transparent'
													: 'border-gray-300',
												active
													? 'border-indigo-600 ring-2 ring-indigo-600'
													: '',
												'relative w-24 h-20 flex items-center justify-center cursor-pointer rounded-lg border bg-white shadow-sm focus:outline-none p-1.5'
											)
										}
									>
										<svg width="46" height="25" fill="#d5dadf">
											{ index === 0 && <rect y=".981" width="46" height="24" rx="2" fill="#d5dadf" /> }
											{ index === 1 && (
												<>
													<rect y=".981" width="22" height="24" rx="2" />
													<rect x="24" y=".981" width="22" height="24" rx="2" />
												</>
											) }
											{ index === 2 && (
												<>
													<rect y=".981" width="14" height="24" rx="2" />
													<rect x="16" y=".981" width="14" height="24" rx="2" />
													<rect x="32" y=".981" width="14" height="24" rx="2" />
												</>
											) }
										</svg>
										<span className="flex">
										<span className="flex flex-col">
											<RadioGroup.Label
												as="span"
												className="flex items-center text-sm font-medium text-gray-600 mb-0.5 absolute top-2.5 right-2.5"
											>
												<div
													className={ classNames(
														columnOptions[ 1 ]?.name !==
														column?.name
															? 'border border-gray-400'
															: '',
														'ml-auto rounded-full w-4 h-4'
													) }
												>
													<CheckCircleIcon
														className={ classNames(
															columnOptions[ 1 ]?.name !==
															column?.name
																? 'invisible'
																: '-mt-0.5',
															'h-5 w-5 text-indigo-600'
														) }
														aria-hidden="true"
													/>
												</div>
											</RadioGroup.Label>
											<span
												className={ classNames(
													columnOptions[ 1 ]?.name !==
													column?.name
														? 'border-transparent'
														: 'border-indigo-600',
													'pointer-events-none absolute -inset-px rounded-lg border'
												) }
												aria-hidden="true"
											/>
										</span>
									</span>
									</RadioGroup.Option>
								) ) }
							</div>
						</RadioGroup>
					</div>
					<div className="col-span-12">
						<div className="settings-content flex items-center justify-between">
							<div className="settings-heading flex items-center space-x-2 flex-1">
								<label
									data-headlessui-state="open"
									id="headlessui-listbox-label-15"
									className="block text-sm font-medium text-gray-700"
								>
									{ __( 'Choose Single Doc Template', 'wedocs' ) }
								</label>
								<div
									data-tip={
										__(
											'Customize the template for individual docs. Choose a layout that suits your content best',
											'wedocs'
										)
									}
									className="tooltip cursor-pointer ml-2"
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
						</div>
					</div>
					<div className="settings-field flex items-center">
						<RadioGroup value={ templateOptions[ 2 ] }>
							<div className="flex items-center space-x-6">
								{ templateOptions.map( ( template, index ) => (
									<RadioGroup.Option
										key={ template?.name }
										value={ template }
										className={ ( { checked, active } ) =>
											classNames(
												checked
													? 'border-transparent'
													: 'border-gray-300',
												active
													? 'border-indigo-600 ring-2 ring-indigo-600'
													: '',
												'relative w-32 h-[135px] flex items-center justify-center cursor-pointer rounded-lg border bg-white shadow-sm focus:outline-none'
											)
										}
									>
										{ index === 0 && (
											<svg width='126' height='135' fill='none'>
												<style>{`
												.B{fill:#dde1ea}
												.C{fill:#118ede}
												.D{fill:#979da9}
											`}</style>
												<g className='B'>
													<rect x='36.401' y='20.013' width='7.775' height='.895' rx='.448' />
													<rect x='47.757' y='20.013' width='7.775' height='.895' rx='.448' />
													<rect x='59.113' y='20.013' width='7.775' height='.895' rx='.448' />
													<rect x='70.469' y='20.013' width='7.775' height='.895' rx='.448' />
													<rect x='81.825' y='20.013' width='7.775' height='.895' rx='.448' />
												</g>
												<rect x='48.987' y='30.757' width='32.22' height='1.074' rx='.537' className='D' />
												<g className='B'>
													<rect x='48.987' y='36.308' width='67.115' height='1.074' rx='.537' />
													<rect x='48.987' y='41.858' width='47.821' height='1.074' rx='.537' />
												</g>
												<rect x='48.987' y='51.887' width='47.457' height='1.074' rx='.537' className='D' />
												<g className='B'>
													<rect x='48.987' y='57.438' width='67.115' height='1.074' rx='.537' />
													<rect x='48.987' y='62.988' width='47.821' height='1.074' rx='.537' />
												</g>
												<rect x='48.987' y='68.54' width='7.504' height='21.79' rx='1.791' fill='#fff' />
												<rect x='60.967' y='70.661' width='2.865' height='2.865' rx='1.433' className='C' />
												<rect x='65.623' y='71.557' width='37.864' height='1.074' rx='.537' className='B' />
												<rect x='60.967' y='78.003' width='2.865' height='2.865' rx='1.433' className='C' />
												<rect x='65.623' y='78.898' width='37.864' height='1.074' rx='.537' className='B' />
												<rect x='60.967' y='85.345' width='2.865' height='2.865' rx='1.433' className='C' />
												<g className='B'>
													<rect x='65.623' y='86.24' width='37.864' height='1.074' rx='.537' />
													<rect x='48.987' y='94.807' width='67.115' height='1.074' rx='.537' />
													<rect x='48.987' y='100.357' width='67.115' height='1.074' rx='.537' />
												</g>
												<rect x='48.987' y='105.908' width='67.115' height='1.074' rx='.537' fill='#fff' />
												<rect x='48.987' y='111.46' width='16.637' height='1.074' rx='.537' className='D' />
												<g className='B'>
													<rect x='48.987' y='117.011' width='67.115' height='1.074' rx='.537' />
													<rect x='48.987' y='122.562' width='34.623' height='1.074' rx='.537' />
												</g>
												<path d='M41.355 30.757v97.465' stroke='#dde1ea' strokeWidth='.448' />
												<rect x='9.899' y='30.757' width='23.572' height='.895' rx='.448' className='B' />
												<rect x='9.899' y='36.129' width='27.982' height='8.329' rx='.895' className='C' />
												<rect x='12.857' y='39.846' width='14.88' height='.895' rx='.448' fill='#acd2ff' />
												<g className='B'>
													<rect x='14.375' y='48.663' width='19.095' height='.895' rx='.448' />
													<rect x='14.375' y='54.035' width='16.347' height='.895' rx='.448' />
													<rect x='14.375' y='59.407' width='14.561' height='.895' rx='.448' />
													<rect x='9.899' y='67.465' width='23.572' height='.895' rx='.448' />
													<rect x='9.899' y='72.837' width='20.797' height='.895' rx='.448' />
													<rect x='9.899' y='78.209' width='25.177' height='.895' rx='.448' />
													<rect x='9.899' y='83.581' width='25.177' height='.895' rx='.448' />
													<rect x='9.899' y='88.953' width='21.554' height='.895' rx='.448' />
													<rect x='9.899' y='94.324' width='21.554' height='.895' rx='.448' />
													<rect x='9.899' y='99.696' width='19.199' height='.895' rx='.448' />
													<rect x='9.899' y='105.068' width='19.199' height='.895' rx='.448' />
													<rect x='9.899' y='110.44' width='19.619' height='.895' rx='.448' />
													<rect x='9.899' y='115.812' width='19.619' height='.895' rx='.448' />
												</g>
												<g className='C'>
													<path fillRule='evenodd'
																d='M9.935 20.057h5.525c2.365-.003 4.281-1.898 4.284-4.237v-3.197c-.003-2.339-1.919-4.234-4.284-4.237h-1.241c-2.365.003-4.281 1.898-4.284 4.237v7.434zm5.525-1.17h-4.342v-6.264c.002-1.693 1.389-3.065 3.101-3.067h1.241c1.712.002 3.099 1.374 3.101 3.067v3.198c-.002 1.693-1.389 3.065-3.101 3.067z' />
													<path
														d='M16.123 15.68h-3.231c-.056 0-.102.046-.102.102v.661c0 .056.046.102.102.102h3.231c.056 0 .102-.046.102-.102v-.661c0-.056-.046-.102-.102-.102zm.664-1.743h-3.895c-.056 0-.102.046-.102.102v.661c0 .056.046.102.102.102h3.895c.056 0 .102-.046.102-.102v-.661c0-.056-.046-.102-.102-.102zm-1.819-1.747h-2.077c-.056 0-.102.046-.102.102v.661c0 .056.046.102.102.102h2.077c.056 0 .102-.046.102-.102v-.661c0-.056-.046-.102-.102-.102z' />
												</g>
											</svg>
										) }

										{ index === 1 && (
											<svg width="126" height="135" fill="none">
												<rect x="18.057" y="13.825" width="5.964" height=".874" rx=".437" fill="#e2ddea" />
												<rect x='26.643' y='13.825' width='15.787' height='.874' rx='.437'
															fill='#432b69' />
												<g fill='#e2ddea'>
													<rect x='45.052' y='13.825' width='9.503' height='.874' rx='.437' />
													<rect x='57.178' y='13.825' width='4.929' height='.874' rx='.437' />
													<rect x='64.729' y='13.825' width='4.4' height='.874' rx='.437' />
													<rect x='90.163' y='13.825' width='4.4' height='.874' rx='.437' />
												</g>
												<rect x='9.827' y='11.639' width='5.248' height='5.248' rx='1.567'
															stroke='#8873a9' strokeWidth='.448' />
												<g fill='#432b69'>
													<path
														d='M11.362 15.851v-3.178h1.164c.226 0 .412.037.56.112s.259.173.332.3.11.267.11.424c0 .133-.024.244-.073.335a.6.6 0 0 1-.195.217.86.86 0 0 1-.267.118v.031c.106.005.209.039.309.102a.73.73 0 0 1 .251.265c.066.115.099.255.099.419s-.038.308-.115.438-.193.23-.351.306-.361.112-.607.112h-1.218zm.48-.411h.692c.23 0 .394-.044.494-.133a.43.43 0 0 0 .149-.334c0-.1-.025-.193-.076-.276s-.123-.15-.217-.2-.204-.074-.332-.074h-.709v1.018zm0-1.392h.643a.66.66 0 0 0 .29-.062.51.51 0 0 0 .206-.174.46.46 0 0 0 .078-.267.44.44 0 0 0-.138-.331c-.092-.089-.233-.133-.424-.133h-.655v.967z' />
													<rect x='11.242' y='44.84' width='17.679' height='.895' rx='.448' />
												</g>
												<g fill='#ae98d1'>
													<rect x='50.33' y='35.114' width='32.22' height='1.074' rx='.537' />
													<rect x='50.33' y='67.347' width='56.141' height='1.074'
																rx='.537' />
													<rect x='50.33' y='94.028' width='32.22' height='1.074' rx='.537' />
												</g>
												<g fill='#e2ddea'>
													<rect x='50.33' y='40.666' width='67.115' height='1.074'
																rx='.537' />
													<rect x='50.33' y='46.217' width='67.115' height='1.074'
																rx='.537' />
													<rect x='50.33' y='51.768' width='67.115' height='1.074'
																rx='.537' />
													<rect x='50.33' y='57.319' width='47.821' height='1.074'
																rx='.537' />
													<rect x='50.33' y='72.898' width='67.115' height='1.074'
																rx='.537' />
													<rect x='50.33' y='78.449' width='67.115' height='1.074'
																rx='.537' />
													<rect x='50.33' y='84.001' width='47.821' height='1.074'
																rx='.537' />
													<rect x='50.33' y='99.58' width='67.115' height='1.074' rx='.537' />
													<rect x='50.33' y='105.131' width='67.115' height='1.074'
																rx='.537' />
													<rect x='50.33' y='110.682' width='67.115' height='1.074'
																rx='.537' />
													<rect x='50.33' y='116.233' width='53.4' height='1.074' rx='.537' />
												</g>
												<rect x='11.242' y='50.212' width='12.828' height='.895' rx='.448'
															fill='#ae98d1' />
												<g fill='#e2ddea'>
													<rect x='11.242' y='55.584' width='10.053' height='.895'
																rx='.448' />
													<rect x='11.242' y='60.956' width='8.875' height='.895' rx='.448' />
													<rect x='11.242' y='66.327' width='19.809' height='.895'
																rx='.448' />
													<rect x='11.242' y='71.699' width='10.81' height='.895' rx='.448' />
													<rect x='11.242' y='77.071' width='8.455' height='.895' rx='.448' />
													<rect x='11.242' y='82.443' width='10.81' height='.895' rx='.448' />
													<rect x='11.242' y='87.815' width='8.875' height='.895' rx='.448' />
												</g>
												<g fill='#ae98d1'>
													<rect x='11.242' y='95.873' width='7.782' height='.895' rx='.448' />
													<rect x='11.242' y='101.245' width='8.875' height='.895'
																rx='.448' />
													<rect x='11.242' y='106.617' width='14.931' height='.895'
																rx='.448' />
													<rect x='11.242' y='111.989' width='8.455' height='.895'
																rx='.448' />
													<rect x='11.242' y='117.361' width='7.782' height='.895'
																rx='.448' />
													<rect x='11.242' y='122.733' width='10.81' height='.895'
																rx='.448' />
												</g>
												<rect x='8.556' y='28.709' width='28.616' height='9.674' rx='1.791'
															fill='#e2ddea' />
												<path d='M42.698 28.709v97.465' stroke='#e2ddea' strokeWidth='.448' />
											</svg>
										) }

										{ index === 2 && (
											<svg width='126' height='135' fill='none'>
												<path fillRule='evenodd'
															d='M16.592 8.386c-1.775 0-2.884.882-3.329 2.647.666-.882 1.442-1.213 2.33-.993.506.126.868.491 1.269.895.653.659 1.408 1.421 3.058 1.421 1.775 0 2.885-.882 3.328-2.647-.665.882-1.442 1.213-2.33.992-.507-.126-.869-.491-1.269-.895-.653-.659-1.408-1.421-3.058-1.421zm-3.329 3.97c-1.775 0-2.885.882-3.328 2.647.666-.882 1.442-1.213 2.33-.993.507.126.869.491 1.269.895.653.659 1.408 1.421 3.058 1.421 1.775 0 2.885-.882 3.328-2.647-.666.882-1.442 1.213-2.33.993-.506-.126-.868-.491-1.269-.895-.653-.659-1.408-1.421-3.058-1.421z'
															fill='#06b6d4' />
												<rect x='49.023' y='33.475' width='32.22' height='1.074' rx='.537'
															fill='#00beeb' />
												<g fill='#dde1ea'>
													<rect x='49.023' y='39.025' width='67.115' height='1.074'
																rx='.537' />
													<rect x='49.023' y='44.576' width='47.821' height='1.074'
																rx='.537' />
												</g>
												<rect x='49.023' y='54.605' width='32.22' height='1.074' rx='.537'
															fill='#00beeb' />
												<g fill='#dde1ea'>
													<rect x='49.023' y='60.155' width='67.115' height='1.074'
																rx='.537' />
													<rect x='49.023' y='65.706' width='47.821' height='1.074'
																rx='.537' />
												</g>
												<g fill='#e9f5fa'>
													<rect x='49.023' y='71.257' width='12.835' height='12.895'
																rx='1.791' />
													<rect x='66.334' y='71.257' width='12.835' height='12.895'
																rx='1.791' />
													<rect x='83.646' y='71.257' width='12.835' height='12.895'
																rx='1.791' />
													<rect x='100.957' y='71.257' width='12.835' height='12.895'
																rx='1.791' />
												</g>
												<g fill='#dde1ea'>
													<rect x='49.023' y='88.629' width='67.115' height='1.074'
																rx='.537' />
													<rect x='49.023' y='94.18' width='67.115' height='1.074'
																rx='.537' />
													<rect x='49.023' y='99.731' width='67.115' height='1.074'
																rx='.537' />
													<rect x='49.023' y='105.282' width='67.115' height='1.074'
																rx='.537' />
													<rect x='49.023' y='110.833' width='67.115' height='1.074'
																rx='.537' />
													<rect x='49.023' y='116.384' width='34.623' height='1.074'
																rx='.537' />
												</g>
												<path d='M41.392 27.069v97.465' stroke='#dde1ea' strokeWidth='.448' />
												<rect x='9.935' y='27.069' width='23.572' height='.895' rx='.448'
															fill='#bec1c9' />
												<g fill='#dde1ea'>
													<rect x='9.935' y='32.441' width='20.797' height='.895' rx='.448' />
													<rect x='9.935' y='37.814' width='19.619' height='.895' rx='.448' />
													<rect x='9.935' y='43.186' width='25.177' height='.895' rx='.448' />
													<rect x='9.935' y='48.558' width='21.554' height='.895' rx='.448' />
													<rect x='9.935' y='53.93' width='19.199' height='.895' rx='.448' />
												</g>
												<rect x='9.935' y='63.778' width='23.572' height='.895' rx='.448'
															fill='#00beeb' />
												<g fill='#dde1ea'>
													<rect x='9.935' y='69.15' width='20.797' height='.895' rx='.448' />
													<rect x='9.935' y='74.523' width='25.177' height='.895' rx='.448' />
													<rect x='9.935' y='79.895' width='21.554' height='.895' rx='.448' />
													<rect x='9.935' y='85.267' width='19.199' height='.895' rx='.448' />
													<rect x='9.935' y='90.638' width='19.619' height='.895' rx='.448' />
												</g>
												<rect x='9.935' y='100.486' width='23.572' height='.895' rx='.448'
															fill='#bec1c9' />
											</svg>
										) }

										<span className="flex">
										<span className="flex flex-col">
											<RadioGroup.Label
												as="span"
												className="flex items-center text-sm font-medium text-gray-600 mb-0.5 absolute top-2.5 right-2.5"
											>
												<div
													className={ classNames(
														templateOptions[ 2 ]?.name !==
														template?.name
															? 'border border-gray-400'
															: '',
														'ml-auto rounded-full w-4 h-4'
													) }
												>
													<CheckCircleIcon
														className={ classNames(
															templateOptions[ 2 ]?.name !==
															template?.name
																? 'invisible'
																: '-mt-0.5',
															'h-5 w-5 text-indigo-600'
														) }
														aria-hidden="true"
													/>
												</div>
											</RadioGroup.Label>
											<span
												className={ classNames(
													templateOptions[ 2 ]?.name ===
													template?.name
														? 'border-indigo-600'
														: 'border-transparent',
													'pointer-events-none absolute -inset-px rounded-lg border'
												) }
												aria-hidden="true"
											/>
										</span>
									</span>
									</RadioGroup.Option>
								) ) }
							</div>
						</RadioGroup>
					</div>
					{ layoutColorOptions?.map( ( option ) => (
						<div className={ `col-span-12 mt-2` } key={ option?.key }>
							<div className="settings-content flex items-center justify-between">
								<div className="settings-heading space-x-2 items-center flex flex-1">
									<label
										className="block text-sm font-medium text-gray-600"
										id="headlessui-listbox-label-15"
										data-headlessui-state="open"
									>
										{ option?.title }
									</label>
									<div
										className="tooltip cursor-pointer ml-2 z-[9999]"
										data-tip={ option?.tooltip }
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
								<div className="settings-field flex items-center w-full max-w-[490px] ml-auto flex-2">
									<div className="color-container flex gap-2.5">
										<div className="flex justify-center items-center space-x-1 px-2 py-1.5 rounded-md bg-white border border-[#E2E2E2] cursor-pointer relative">
											<div className={ `${option?.key === 'active_nav_text' ? 'bg-white border border-[#E2E2E2]' : 'bg-[#06B6D4]' } w-6 h-6 rounded-full flex justify-center items-center` }></div>
											<svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 stroke-gray-500" strokeWidth="1">
												<path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
											</svg>
										</div>
									</div>
								</div>
							</div>
						</div>
					) ) }
					<div className={ `col-span-12 mt-2` } >
						<div className="settings-content flex items-center justify-between">
							<div className="settings-heading space-x-2 items-center flex flex-1">
								<label
									className="block text-sm font-medium text-gray-600"
									id="headlessui-listbox-label-15"
									data-headlessui-state="open"
								>
									{ __( 'Enable Navigation Icon', 'wedocs' ) }
								</label>
								<div
									className="tooltip cursor-pointer ml-2 z-[9999]"
									data-tip={ __(
										'Enable/Disable navigation icons for a user-friendly experience on your single document pages',
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
							<div className="settings-field flex items-center w-full max-w-[490px] ml-auto flex-2">
								<Switcher
									name="nav_icon"
									settingsPanel={ layout }
									settingsData={ settingsData }
									setSettings={ setSettings }
									panelName={ `layout` }
								/>
							</div>
						</div>
					</div>
					<div className={ `col-span-12 mt-2` } >
						<div className="settings-content flex items-center justify-between">
							<div className="settings-heading space-x-2 items-center flex flex-1">
								<label
									className="block text-sm font-medium text-gray-600"
									id="headlessui-listbox-label-15"
									data-headlessui-state="open"
								>
									{ __( 'Enable Table of Contents', 'wedocs' ) }
								</label>
								<div
									className="tooltip cursor-pointer ml-2 z-[9999]"
									data-tip={ __(
										'Improve content navigation. Turn on the table of contents feature for easy access to document sections',
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
							<div className="settings-field flex items-center w-full max-w-[490px] ml-auto flex-2">
								<Switcher
									name="right_bar"
									settingsPanel={ layout }
									settingsData={ settingsData }
									setSettings={ setSettings }
									panelName={ `layout` }
								/>
							</div>
						</div>
					</div>
					<Overlay classes={ `${ showOverlay ? 'flex items-center justify-center' : 'hidden' }` } />
				</div>
			</div>
		</section>
	);
}

export default LayoutSettings;
