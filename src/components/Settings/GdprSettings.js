// DESCRIPTION: GDPR Compliance settings tab component.
// Provides admin controls for enabling GDPR features, data retention, and consent configuration.

import { __ } from '@wordpress/i18n';
import Switcher from '../Switcher';
import { useEffect, useState, Fragment } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import docsStore from '../../data/docs';

const GdprSettings = ( {
	settingsData,
	gdprSettingsData,
	setSettings,
} ) => {
	const [ gdprSettings, setGdprSettings ] = useState( {
		...gdprSettingsData,
	} );

	const [ validationError, setValidationError ] = useState( '' );

	const pages = useSelect( ( select ) => select( docsStore ).getPages(), [] );
	const [ pageOptions, setPageOptions ] = useState( [] );
	const [ selectedPolicyPage, setSelectedPolicyPage ] = useState( {} );
	const [ selectedRequestPage, setSelectedRequestPage ] = useState( {} );

	useEffect( () => {
		setGdprSettings( { ...gdprSettingsData } );
	}, [ gdprSettingsData ] );

	useEffect( () => {
		const options = pages?.map( ( page ) => ( {
			id: page?.id,
			name: page?.title?.rendered,
		} ) );

		setPageOptions( options || [] );

		if ( gdprSettingsData?.privacy_policy_page ) {
			const policyPage = options?.find(
				( page ) => page?.id === parseInt( gdprSettingsData.privacy_policy_page )
			);
			if ( policyPage ) {
				setSelectedPolicyPage( policyPage );
			}
		}

		if ( gdprSettingsData?.data_request_page ) {
			const requestPage = options?.find(
				( page ) => page?.id === parseInt( gdprSettingsData.data_request_page )
			);
			if ( requestPage ) {
				setSelectedRequestPage( requestPage );
			}
		}
	}, [ pages, gdprSettingsData?.privacy_policy_page, gdprSettingsData?.data_request_page ] );

	const handleFieldChange = ( field, value ) => {
		setValidationError( '' );
		setSettings( {
			...settingsData,
			gdpr: { ...gdprSettingsData, [ field ]: value },
		} );
	};

	const handlePolicyPageChange = ( page ) => {
		setSelectedPolicyPage( page );
		setValidationError( '' );
		setSettings( {
			...settingsData,
			gdpr: { ...gdprSettingsData, privacy_policy_page: page?.id },
		} );
	};

	const handleRequestPageChange = ( page ) => {
		setSelectedRequestPage( page );
		setSettings( {
			...settingsData,
			gdpr: { ...gdprSettingsData, data_request_page: page?.id },
		} );
	};

	const isEnabled = gdprSettings?.enabled === 'on';

	return (
		<section>
			<div className="shadow sm:rounded-md">
				<div className="bg-white sm:rounded-md min-h-[500px]">
					<div className="section-heading py-4 px-8 sm:px-8 sm:py-4">
						<h2 className="text-gray-900 font-medium text-lg">
							{ __( 'GDPR Compliance', 'wedocs' ) }
						</h2>
					</div>
					<hr className="h-px !bg-gray-200 border-0 dark:!bg-gray-200" />
					<div className="pt-6 pb-20 px-8 grid grid-cols-4 gap-5">

						{ /* Master toggle */ }
						<div className="col-span-4">
							<div className="settings-content flex items-center justify-between">
								<div className="settings-heading md:min-w-[300px] flex items-center space-x-2 flex-1">
									<label className="block text-sm font-medium text-gray-600">
										{ __( 'Enable GDPR Compliance', 'wedocs' ) }
									</label>
									<div
										className="tooltip cursor-pointer ml-2 z-[9999]"
										data-tip={ __(
											'Important: You are responsible for deleting user data from external systems (if weDocs form data is synced to CRMs/email platforms) to remain GDPR compliant.',
											'wedocs'
										) }
									>
										<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="#9CA3AF" className="w-[18px] h-[18px]">
											<path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
										</svg>
									</div>
								</div>
								<div className="settings-field w-full max-w-[490px] mt-1 ml-auto flex-2 flex items-center">
									<Switcher
										name="enabled"
										settingsPanel={ gdprSettings }
										settingsData={ settingsData }
										setSettings={ setSettings }
										panelName="gdpr"
										isEnabled={ isEnabled }
									/>
								</div>
							</div>
							<div className="settings-description w-full max-w-[490px] ml-auto mt-1">
								<p className="text-sm text-[#6B7280]">
									{ __( 'Master toggle for all GDPR settings in the contact modal and messaging widget.', 'wedocs' ) }
								</p>
							</div>
						</div>

						{ isEnabled && (
							<>
								{ /* Data Retention */ }
								<div className="col-span-4">
									<div className="settings-content flex items-center justify-between">
										<div className="settings-heading md:min-w-[300px] flex items-center space-x-2 flex-1">
											<label className="block text-sm font-medium text-gray-600">
												{ __( 'Data Retention', 'wedocs' ) }
											</label>
										</div>
										<div className="settings-field w-full max-w-[490px] mt-1 ml-auto flex-2">
											<select
												value={ gdprSettings?.retention || 'manual' }
												onChange={ ( e ) => handleFieldChange( 'retention', e.target.value ) }
												className="!border !border-gray-300 !rounded-md !px-3 !py-2 text-sm text-gray-700 w-full"
											>
												<option value="manual">{ __( 'Manual deletion only', 'wedocs' ) }</option>
												<option value="30">{ __( 'Auto-delete after 30 days', 'wedocs' ) }</option>
												<option value="60">{ __( 'Auto-delete after 60 days', 'wedocs' ) }</option>
												<option value="90">{ __( 'Auto-delete after 90 days', 'wedocs' ) }</option>
											</select>
										</div>
									</div>
									<div className="settings-description w-full max-w-[490px] ml-auto mt-1">
										<p className="text-sm text-[#6B7280]">
											{ __( 'How long to retain stored messages before automatic deletion.', 'wedocs' ) }
										</p>
									</div>
								</div>

								{ /* Enable GDPR in Contact Modal */ }
								<div className="col-span-4">
									<div className="settings-content flex items-center justify-between">
										<div className="settings-heading md:min-w-[300px] flex items-center space-x-2 flex-1">
											<label className="block text-sm font-medium text-gray-600">
												{ __( 'Enable GDPR in Contact Modal', 'wedocs' ) }
											</label>
										</div>
										<div className="settings-field w-full max-w-[490px] mt-1 ml-auto flex-2 flex items-center">
											<Switcher
												name="modal_enabled"
												settingsPanel={ gdprSettings }
												settingsData={ settingsData }
												setSettings={ setSettings }
												panelName="gdpr"
												isEnabled={ gdprSettings?.modal_enabled === 'on' }
											/>
										</div>
									</div>
									<div className="settings-description w-full max-w-[490px] ml-auto mt-1">
										<p className="text-sm text-[#6B7280]">
											{ __( 'Show consent checkbox on the "How can we help?" contact form.', 'wedocs' ) }
										</p>
									</div>
								</div>

								{ /* Enable GDPR in Messaging (Pro only) */ }
								{ window.weDocsAdminVars?.pro_active && (
									<div className="col-span-4">
										<div className="settings-content flex items-center justify-between">
											<div className="settings-heading md:min-w-[300px] flex items-center space-x-2 flex-1">
												<label className="block text-sm font-medium text-gray-600">
													{ __( 'Enable GDPR in Messaging', 'wedocs' ) }
												</label>
											</div>
											<div className="settings-field w-full max-w-[490px] mt-1 ml-auto flex-2 flex items-center">
												<Switcher
													name="messaging_enabled"
													settingsPanel={ gdprSettings }
													settingsData={ settingsData }
													setSettings={ setSettings }
													panelName="gdpr"
													isEnabled={ gdprSettings?.messaging_enabled === 'on' }
												/>
											</div>
										</div>
										<div className="settings-description w-full max-w-[490px] ml-auto mt-1">
											<p className="text-sm text-[#6B7280]">
												{ __( 'Show consent checkbox on the messaging widget contact form.', 'wedocs' ) }
											</p>
										</div>
									</div>
								) }

								{ /* Consent Checkbox Text */ }
								<div className="col-span-4">
									<div className="settings-content flex items-center justify-between">
										<div className="settings-heading md:min-w-[300px] flex items-center space-x-2 flex-1">
											<label className="block text-sm font-medium text-gray-600">
												{ __( 'Consent Checkbox Text', 'wedocs' ) }
											</label>
										</div>
										<div className="settings-field w-full max-w-[490px] mt-1 ml-auto flex-2">
											<textarea
												rows="3"
												value={ gdprSettings?.consent_text || '' }
												onChange={ ( e ) => handleFieldChange( 'consent_text', e.target.value ) }
												className="!border !border-gray-300 !rounded-md !px-3 !py-2 text-sm text-gray-700 w-full"
											/>
										</div>
									</div>
									<div className="settings-description w-full max-w-[490px] ml-auto mt-1">
										<p className="text-sm text-[#6B7280]">
											{ __( 'Available tokens: {privacy_policy}, {request_data}', 'wedocs' ) }
										</p>
									</div>
								</div>

								{ /* Privacy Policy Page */ }
								<div className="col-span-4">
									<div className="settings-content flex items-center justify-between">
										<div className="settings-heading md:min-w-[300px] flex items-center space-x-2 flex-1">
											<label className="block text-sm font-medium text-gray-600">
												{ __( 'Privacy Policy Page', 'wedocs' ) }
												<span className="text-red-500 ml-1">*</span>
											</label>
										</div>
										<div className="settings-field w-full max-w-[490px] mt-1 ml-auto flex-2">
											<div className="relative">
												{ pageOptions.length > 0 ? (
													<Listbox value={ selectedPolicyPage } onChange={ handlePolicyPageChange }>
														<div className="relative mt-1">
															<Listbox.Button className="relative w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
																<span className="block truncate">
																	{ selectedPolicyPage?.name || __( 'Select a page', 'wedocs' ) }
																</span>
																<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
																	<ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
																</span>
															</Listbox.Button>
															<Transition
																as={ Fragment }
																leave="transition ease-in duration-100"
																leaveFrom="opacity-100"
																leaveTo="opacity-0"
															>
																<Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
																	{ pageOptions.map( ( page ) => (
																		<Listbox.Option
																			key={ page.id }
																			className={ ( { active } ) =>
																				`cursor-pointer relative select-none py-2 pl-3 pr-9 ${ active ? 'text-white bg-indigo-600' : 'text-gray-900' }`
																			}
																			value={ page }
																		>
																			{ ( { selected, active } ) => (
																				<>
																					<span className={ `block truncate ${ selected ? 'font-semibold' : 'font-normal' }` }>
																						{ page.name }
																					</span>
																					{ selected && (
																						<span className={ `absolute inset-y-0 right-0 flex items-center pr-4 ${ active ? 'text-white' : 'text-indigo-600' }` }>
																							<CheckIcon className="h-5 w-5" aria-hidden="true" />
																						</span>
																					) }
																				</>
																			) }
																		</Listbox.Option>
																	) ) }
																</Listbox.Options>
															</Transition>
														</div>
													</Listbox>
												) : (
													<input
														className="relative !w-full !rounded-md border !border-gray-300 bg-white !py-2 !pl-3 !pr-10 text-left shadow-sm sm:text-sm"
														placeholder={ __( 'Loading pages...', 'wedocs' ) }
														disabled
													/>
												) }
											</div>
											{ validationError && (
												<p className="text-sm text-red-600 mt-1">{ validationError }</p>
											) }
										</div>
									</div>
									<div className="settings-description w-full max-w-[490px] ml-auto mt-1">
										<p className="text-sm text-[#6B7280]">
											{ __( 'Select the page containing your privacy policy.', 'wedocs' ) }
										</p>
									</div>
								</div>

								{ /* Data Access Request Page */ }
								<div className="col-span-4">
									<div className="settings-content flex items-center justify-between">
										<div className="settings-heading md:min-w-[300px] flex items-center space-x-2 flex-1">
											<label className="block text-sm font-medium text-gray-600">
												{ __( 'Data Access Request Page', 'wedocs' ) }
											</label>
										</div>
										<div className="settings-field w-full max-w-[490px] mt-1 ml-auto flex-2">
											<div className="relative">
												{ pageOptions.length > 0 ? (
													<Listbox value={ selectedRequestPage } onChange={ handleRequestPageChange }>
														<div className="relative mt-1">
															<Listbox.Button className="relative w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
																<span className="block truncate">
																	{ selectedRequestPage?.name || __( 'Select a page', 'wedocs' ) }
																</span>
																<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
																	<ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
																</span>
															</Listbox.Button>
															<Transition
																as={ Fragment }
																leave="transition ease-in duration-100"
																leaveFrom="opacity-100"
																leaveTo="opacity-0"
															>
																<Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
																	{ pageOptions.map( ( page ) => (
																		<Listbox.Option
																			key={ page.id }
																			className={ ( { active } ) =>
																				`cursor-pointer relative select-none py-2 pl-3 pr-9 ${ active ? 'text-white bg-indigo-600' : 'text-gray-900' }`
																			}
																			value={ page }
																		>
																			{ ( { selected, active } ) => (
																				<>
																					<span className={ `block truncate ${ selected ? 'font-semibold' : 'font-normal' }` }>
																						{ page.name }
																					</span>
																					{ selected && (
																						<span className={ `absolute inset-y-0 right-0 flex items-center pr-4 ${ active ? 'text-white' : 'text-indigo-600' }` }>
																							<CheckIcon className="h-5 w-5" aria-hidden="true" />
																						</span>
																					) }
																				</>
																			) }
																		</Listbox.Option>
																	) ) }
																</Listbox.Options>
															</Transition>
														</div>
													</Listbox>
												) : (
													<input
														className="relative !w-full !rounded-md border !border-gray-300 bg-white !py-2 !pl-3 !pr-10 text-left shadow-sm sm:text-sm"
														placeholder={ __( 'Loading pages...', 'wedocs' ) }
														disabled
													/>
												) }
											</div>
										</div>
									</div>
									<div className="settings-description w-full max-w-[490px] ml-auto mt-1">
										<p className="text-sm text-[#6B7280]">
											{ __( 'Select the page where users can request access to or deletion of their data.', 'wedocs' ) }
										</p>
									</div>
								</div>
							</>
						) }
					</div>
				</div>
			</div>
		</section>
	);
};

export default GdprSettings;
