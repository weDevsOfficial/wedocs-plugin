import { __ } from '@wordpress/i18n';
import FontSettings from '../FontSettings';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import ColorPaletteSettings from './ColorPaletteSettings';
import MessagePreview from './MessagePreview';

const PreferenceSettings = ( { settingsData, setSettings } ) => {
	const colorBy = [
		{
			field: 'pre-built',
			title: __( 'Pre-built Color Palette', 'wedocs' ),
			description: __(
				'Choose a pre-built color palette for the colors of your assistant widget.',
				'wedocs'
			),
		},
		{
			field: 'custom',
			title: __( 'Custom Color Palette', 'wedocs' ),
			description: __(
				'Choose any colors that represents your brand or that you prefer.',
				'wedocs'
			),
		},
	];

	const classNames = ( ...classes ) => {
		return classes.filter( Boolean ).join( ' ' );
	};

	const pages = [
		{ id: 1, title: { rendered: __( 'Home', 'wedocs' ) } },
		{ id: 2, title: { rendered: __( 'About', 'wedocs' ) } },
		{ id: 3, title: { rendered: __( 'Services', 'wedocs' ) } },
		{ id: 4, title: { rendered: __( 'Portfolio', 'wedocs' ) } },
		{ id: 5, title: { rendered: __( 'Contact Us', 'wedocs' ) } },
	];

	const defaultColorPalette = {
		widgetBg: { r: 99, g: 102, b: 241, a: 1 },
		activeTabBg: { r: 255, g: 255, b: 255, a: 1 },
		activeTabFont: { r: 55, g: 65, b: 81, a: 1 },
		inactiveTabBg: { r: 67, g: 56, b: 202, a: 1 },
		inactiveTabFont: { r: 199, g: 210, b: 254, a: 1 },
		tabTitleFont: { r: 255, g: 255, b: 255, a: 1 },
		tabDescriptionFont: { r: 199, g: 210, b: 254, a: 1 },
		breadcrumbColor: { r: 67, g: 56, b: 202, a: 1 },
		sendBtnBg: { r: 99, g: 102, b: 241, a: 1 },
		sendBtnFont: { r: 255, g: 255, b: 255, a: 1 },
		bubbleBg: { r: 87, g: 116, b: 241, a: 1 },
		bubbleIcon: { r: 255, g: 255, b: 255, a: 1 },
	};

	return (
		<div className={ `preference-settings` }>
			<div className={ `preference-label` }>
				<h3 className={ `text-base text-[#111827] font-medium leading-5` }>
					{ __( 'Widget Settings', 'wedocs' ) }
				</h3>
				<hr className="h-px !bg-gray-200 border-0 dark:!bg-gray-200 mt-5 mb-6" />
			</div>
			<div className="appearance-widget-settings relative">
				<div className="grid grid-cols-4 gap-5">
					<div className="col-span-4">
						<div className="settings-content flex items-center justify-between">
							<div className="settings-field-heading flex items-center space-x-2 flex-1">
								<label
									className="block text-sm font-medium text-gray-600"
									id="headlessui-listbox-label-15"
									data-headlessui-state="open"
								>
									{ __( 'Hide from Pages', 'wedocs' ) }
								</label>
								<div
									className="tooltip cursor-pointer ml-2"
									data-tip={ __(
										'Prevent the widget from appearing on specific pages',
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
							<div className="settings-field w-full max-w-[490px] ml-auto -mt-1 flex-2">
								<div className="pageSelectionBox">
									<div className="relative mb-2">
										<button className="w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
											<div className="active-roles inline-flex flex-wrap items-center gap-2.5">
												{ pages.map( ( page ) => (
													<span
														key={ page?.id }
														className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2.5 py-0.5 text-sm text-gray-800"
													>
														{ page?.title?.rendered }
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth={ 3.5 }
															stroke="currentColor"
															className="w-3 h-3 cursor-pointer text-gray-400"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M6 18L18 6M6 6l12 12"
															/>
														</svg>
													</span>
												) ) }
											</div>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-span-4">
						<div className="settings-content flex items-center justify-between">
							<div className="settings-field-heading flex items-center space-x-2 flex-1">
								<label
									className="block text-sm font-medium text-gray-600"
									id="headlessui-listbox-label-15"
									data-headlessui-state="open"
								>
									{ __(
										'Tab First Sub-Title Font Size',
										'wedocs'
									) }
								</label>
								<div
									className="tooltip cursor-pointer ml-2"
									data-tip={ __(
										'Choose an appropriate font size for tab first sub-title',
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
							<div className="settings-field w-full max-w-[490px] ml-auto flex-2">
								<FontSettings
									name={ 'widget_title_font' }
									classes={ `justify-end` }
									setSettings={ setSettings }
									settingsData={ settingsData }
								/>
							</div>
						</div>
					</div>
					<div className="col-span-4">
						<div className="settings-content flex items-center justify-between">
							<div className="settings-field-heading flex items-center space-x-2 flex-1">
								<label
									className="block text-sm font-medium text-gray-600"
									id="headlessui-listbox-label-15"
									data-headlessui-state="open"
								>
									{ __(
										'Tab Second Sub-Title Font Size',
										'wedocs'
									) }
								</label>
								<div
									className="tooltip cursor-pointer ml-2"
									data-tip={ __(
										'Choose an appropriate font size for tab second sub-title',
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
							<div className="settings-field w-full max-w-[490px] ml-auto flex-2">
								<div className="relative">
									<FontSettings
										name={ 'widget_description_font' }
										classes={ `justify-end` }
										setSettings={ setSettings }
										settingsData={ settingsData }
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<h2 className="text-gray-900 font-medium text-base leading-none mt-8">
				{ __( 'Color Palette Settings', 'wedocs' ) }
			</h2>
			<hr className="h-px !bg-gray-200 border-0 dark:!bg-gray-200 my-5" />
			<div className="appearance-color-settings relative">
				<RadioGroup value={ colorBy[ 0 ] }>
					<div className="mb-10 grid grid-cols-3 !gap-6 sm:grid-cols-3 sm:gap-x-4">
						{ colorBy.map( ( color ) => (
							<RadioGroup.Option
								key={ color?.field }
								value={ color }
								className={ ( { checked, active } ) =>
									classNames(
										checked
											? 'border-transparent'
											: 'border-gray-300',
										active
											? 'border-indigo-600 ring-2 ring-indigo-600'
											: '',
										'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
									)
								}
							>
								<span className="flex">
									<span className="flex flex-col">
										<RadioGroup.Label
											as="span"
											className="flex items-center text-sm font-medium text-gray-600 mb-0.5"
										>
											{ color?.title }
											<div
												className={ classNames(
													colorBy[ 0 ]?.field !==
													color?.field
														? 'border border-gray-400'
														: '',
													'ml-auto rounded-full w-4 h-4'
												) }
											>
												<CheckCircleIcon
													className={ classNames(
														colorBy[ 0 ]?.field !==
														color?.field
															? 'invisible'
															: '-mt-0.5',
														'h-5 w-5 text-indigo-600'
													) }
													aria-hidden="true"
												/>
											</div>
										</RadioGroup.Label>
										<RadioGroup.Description
											as="span"
											className="mt-1 flex items-center font-medium text-xs !leading-5 text-[#6B7280]"
										>
											{ color?.description }
										</RadioGroup.Description>
										<span
											className={ classNames(
												colorBy[ 0 ]?.field ===
												color?.field
													? 'border'
													: 'border-2',
												colorBy[ 0 ]?.field ===
												color?.field
													? 'border-indigo-600'
													: 'border-transparent',
												'pointer-events-none absolute -inset-px rounded-lg'
											) }
											aria-hidden="true"
										/>
									</span>
								</span>
							</RadioGroup.Option>
						) ) }
					</div>
				</RadioGroup>

				{ colorBy[ 0 ]?.field === 'custom' && (
					<div id="custom-heading" className="w-80">
						<div className="settings-heading flex items-center justify-between mb-4">
							<span className="font-bold text-sm text-gray-600">
								{ __(
									'Choose Color: ',
									'wedocs'
								) }
							</span>
							<span className="reset-palette text-sm font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer">
								{ __( 'Reset All', 'wedocs' ) }
							</span>
						</div>
						<hr className="border-t-[#DBDBDB]" />
					</div>
				) }

				<div className="flex gap-24 my-6">
					<ColorPaletteSettings />
					<MessagePreview settings={ settingsData } previewColors={ defaultColorPalette } />
				</div>
			</div>
		</div>
	);
}

export default PreferenceSettings;
