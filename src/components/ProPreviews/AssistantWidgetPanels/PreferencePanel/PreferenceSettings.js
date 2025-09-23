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
				<h3 className={ `wedocs-text-base wedocs-text-[#111827] wedocs-font-medium wedocs-leading-5` }>
					{ __( 'Widget Settings', 'wedocs' ) }
				</h3>
				<hr className="wedocs-h-px !wedocs-bg-gray-200 wedocs-border-0 dark:!wedocs-bg-gray-200 wedocs-mt-5 wedocs-mb-6" />
			</div>
			<div className="appearance-widget-settings wedocs-relative">
				<div className="wedocs-grid wedocs-grid-cols-4 wedocs-gap-5">
					<div className="wedocs-col-span-4">
						<div className="settings-content wedocs-flex wedocs-items-center wedocs-justify-between">
							<div className="settings-field-heading md:wedocs-min-w-[300px] wedocs-flex wedocs-items-center wedocs-space-x-2 wedocs-flex-1">
								<label
									className="wedocs-block wedocs-text-sm wedocs-font-medium wedocs-text-gray-600"
									id="headlessui-listbox-label-15"
									data-headlessui-state="open"
								>
									{ __( 'Hide from Pages', 'wedocs' ) }
								</label>
								<div
									className="tooltip wedocs-cursor-pointer wedocs-ml-2"
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
							<div className="settings-field wedocs-w-full wedocs-max-w-[490px] wedocs-ml-auto wedocs--mt-1 wedocs-flex-2">
								<div className="pageSelectionBox">
									<div className="wedocs-relative wedocs-mb-2">
										<button className="wedocs-w-full wedocs-cursor-pointer wedocs-rounded-md wedocs-border wedocs-border-gray-300 wedocs-bg-white wedocs-py-2 wedocs-pl-3 wedocs-pr-10 wedocs-text-left wedocs-shadow-sm focus:wedocs-border-indigo-500 focus:wedocs-outline-none focus:wedocs-ring-1 focus:wedocs-ring-indigo-500 sm:wedocs-text-sm">
											<div className="active-roles wedocs-inline-flex wedocs-flex-wrap wedocs-items-center wedocs-gap-2.5">
												{ pages.map( ( page ) => (
													<span
														key={ page?.id }
														className="wedocs-inline-flex wedocs-items-center wedocs-gap-1 wedocs-rounded-md wedocs-bg-gray-100 wedocs-px-2.5 wedocs-py-0.5 wedocs-text-sm wedocs-text-gray-800"
													>
														{ page?.title?.rendered }
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth={ 3.5 }
															stroke="currentColor"
															className="wedocs-w-3 wedocs-h-3 wedocs-cursor-pointer wedocs-text-gray-400"
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
							<div className="settings-field-heading md:wedocs-min-w-[300px] wedocs-flex wedocs-items-center wedocs-space-x-2 wedocs-flex-1">
								<label
									className="wedocs-block wedocs-text-sm wedocs-font-medium wedocs-text-gray-600"
									id="headlessui-listbox-label-15"
									data-headlessui-state="open"
								>
									{ __(
										'Tab First Sub-Title Font Size',
										'wedocs'
									) }
								</label>
								<div
									className="tooltip wedocs-cursor-pointer wedocs-ml-2"
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
							<div className="settings-field wedocs-w-full wedocs-max-w-[490px] wedocs-ml-auto wedocs-flex-2">
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
							<div className="settings-field-heading md:wedocs-min-w-[300px] wedocs-flex wedocs-items-center wedocs-space-x-2 wedocs-flex-1">
								<label
									className="wedocs-block wedocs-text-sm wedocs-font-medium wedocs-text-gray-600"
									id="headlessui-listbox-label-15"
									data-headlessui-state="open"
								>
									{ __(
										'Tab Second Sub-Title Font Size',
										'wedocs'
									) }
								</label>
								<div
									className="tooltip wedocs-cursor-pointer wedocs-ml-2"
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
							<div className="settings-field wedocs-w-full wedocs-max-w-[490px] wedocs-ml-auto wedocs-flex-2">
								<div className="wedocs-relative">
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

			<h2 className="wedocs-text-gray-900 wedocs-font-medium wedocs-text-base wedocs-leading-none wedocs-mt-8">
				{ __( 'Color Palette Settings', 'wedocs' ) }
			</h2>
			<hr className="wedocs-h-px !wedocs-bg-gray-200 wedocs-border-0 dark:!wedocs-bg-gray-200 wedocs-my-5" />
			<div className="appearance-color-settings wedocs-relative">
				<RadioGroup value={ colorBy[ 0 ] }>
					<div className="wedocs-mb-10 wedocs-grid wedocs-grid-cols-3 !wedocs-gap-6 sm:wedocs-grid-cols-3 sm:wedocs-gap-x-4">
						{ colorBy.map( ( color ) => (
							<RadioGroup.Option
								key={ color?.field }
								value={ color }
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
											{ color?.title }
											<div
												className={ classNames(
													colorBy[ 0 ]?.field !==
													color?.field
														? 'wedocs-border wedocs-border-gray-400'
														: '',
													'wedocs-ml-auto wedocs-rounded-full wedocs-w-4 wedocs-h-4'
												) }
											>
												<CheckCircleIcon
													className={ classNames(
														colorBy[ 0 ]?.field !==
														color?.field
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
											{ color?.description }
										</RadioGroup.Description>
										<span
											className={ classNames(
												colorBy[ 0 ]?.field ===
												color?.field
													? 'wedocs-border'
													: 'wedocs-border-2',
												colorBy[ 0 ]?.field ===
												color?.field
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

				{ colorBy[ 0 ]?.field === 'custom' && (
					<div id="custom-heading" className="wedocs-w-80">
						<div className="settings-heading md:wedocs-min-w-[300px] wedocs-flex wedocs-items-center wedocs-justify-between wedocs-mb-4">
							<span className="wedocs-font-bold wedocs-text-sm wedocs-text-gray-600">
								{ __(
									'Choose Color: ',
									'wedocs'
								) }
							</span>
							<span className="reset-palette wedocs-text-sm wedocs-font-semibold wedocs-text-indigo-600 hover:wedocs-text-indigo-700 wedocs-cursor-pointer">
								{ __( 'Reset All', 'wedocs' ) }
							</span>
						</div>
						<hr className="wedocs-border-t-[#DBDBDB]" />
					</div>
				) }

				<div className="palette-options-container wedocs-flex wedocs-gap-24 wedocs-my-6">
					<ColorPaletteSettings />
					<MessagePreview settings={ settingsData } previewColors={ defaultColorPalette } />
				</div>
			</div>
		</div>
	);
}

export default PreferenceSettings;
