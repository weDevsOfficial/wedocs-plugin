import Menu from './Menu';
import SaveButton from './SaveButton';
import { Tab } from '@headlessui/react';
import { useEffect, useState } from '@wordpress/element';
import { dispatch, useSelect } from '@wordpress/data';
import settingsStore from '../../data/settings';
import GeneralSettings from './GeneralSettings';
import Swal from "sweetalert2";
import { __ } from "@wordpress/i18n";

const SettingsPage = () => {
    const [ selectedIndex, setSelectedIndex ] = useState( 0 );

	const settings = useSelect(
		( select ) => select( settingsStore ).getSettings(),
		[]
	);

	const weDocsSettings = {
		general: {
            docs_home: '',
            email: 'on',
            email_to: '',
            helpful: 'on',
            comments: 'on',
            print: 'on',
		},
	};

	const [ docSettings, setDocSettings ] = useState( { ...weDocsSettings } );

	const handleSettingsSave = () => {
		// Update wedocs settings data.
		dispatch( settingsStore )
			.updateSettings( { settings: docSettings } )
			.then( ( result ) => {
                setDocSettings( { ...docSettings, ...result } );
                Swal.fire( {
                    title: __( 'Save Settings Data', 'wedocs' ),
                    text: __(
                        'Settings data has been save successfully',
                        'wedocs'
                    ),
                    icon: 'success',
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 2000,
                } );
			} )
			.catch( ( err ) => {
                Swal.fire( {
                    title: __( 'Error', 'wedocs' ),
                    text: err.message,
                    icon: 'error',
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 3000,
                } );
            } );
	};

	useEffect( () => {
		if ( settings && Object.keys( settings ).length ) {
			setDocSettings( { ...settings } );
		}
	}, [ settings ] );

	return (
		<div className="min-h-full">
			<main>
				<div className="py-10 sm:px-0">
					<div className="h-100">
						<div className="h-full">
							<main>
								<div className="lg:grid lg:grid-cols-12 lg:gap-x-6">
									<Tab.Group
										vertical
										onChange={ setSelectedIndex }
										selectedIndex={ selectedIndex }
									>
										<aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
											<nav className="py-[18px] min-h-[180px] bg-white rounded-md">
												<Tab.List className="overflow-hidden px-2 space-y-0.5">
													<Menu />
												</Tab.List>
											</nav>
										</aside>

										<div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
											<Tab.Panels>
												<Tab.Panel>
													<GeneralSettings
														settingsData={
															docSettings
														}
														generalSettingsData={
															docSettings.general
														}
														setSettings={
															setDocSettings
														}
													/>
												</Tab.Panel>
											</Tab.Panels>
										</div>
									</Tab.Group>
								</div>
							</main>

							<SaveButton
								settingsSaveHandler={ handleSettingsSave }
							/>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default SettingsPage;
