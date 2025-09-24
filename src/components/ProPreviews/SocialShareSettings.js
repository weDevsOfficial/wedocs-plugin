import { __ } from '@wordpress/i18n';
import Overlay from './common/Overlay';
import Switcher from '../Switcher';
import { useState } from '@wordpress/element';

const SocialShareSettings = ( { settingsData, setSettings } ) => {
	const [ showOverlay, setShowOverlay ] = useState( false );
	const { general } = settingsData;
	const { switchComponent: Switcher } = window;

	return (
		<section>
			<div className="shadow sm:rounded-md bg-white min-h-[500px] relative">
				<div className="py-4 px-8 sm:px-8 sm:py-4">
					<h2 className="text-gray-900 font-medium text-lg">
						{ __( 'Social Share', 'wedocs' ) }
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
							<div className="settings-heading md:min-w-[300px] space-x-2 items-center flex flex-1">
								<label
									className="block text-sm font-medium text-gray-600"
									id="headlessui-listbox-label-social-share"
								>
									{ __( 'Enable Social Share', 'wedocs' ) }
								</label>
								<div
									className="tooltip cursor-pointer ml-2 z-[9999]"
									data-tip={ __(
										'Enable social sharing buttons on documentation articles',
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
											d="M9 16A7 7 0 1 0 9 2a7 7 0 0 0 0 14ZM9 6v4M9 14h.01"
											stroke="#6b7280"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</div>
							</div>
							<div className="settings-field flex items-center w-full max-w-[490px] ml-auto flex-2">
								<div className="flex items-center space-x-2">
									<span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
										PRO
									</span>
									<Switcher
										name="social_share"
										settingsPanel={ general }
										settingsData={ settingsData }
										setSettings={ setSettings }
										panelName={ `general` }
										isEnabled={ false }
									/>
								</div>
							</div>
						</div>
					</div>
					<Overlay classes={ `${ showOverlay ? 'flex items-center justify-center' : 'hidden' }` } />
				</div>
			</div>
		</section>
	);
};

export default SocialShareSettings;
