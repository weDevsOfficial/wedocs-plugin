import { __ } from '@wordpress/i18n'
import Switcher from '../Switcher';
import { useState } from '@wordpress/element';
import Overlay from './common/Overlay';
import { Switch } from '@headlessui/react';

const IntegrateAiSettings = ( { settingsData, setSettings } ) => {
	const [ showOverlay, setShowOverlay ] = useState( false );

	return (
		<div className="shadow sm:rounded-md bg-white overflow-hidden">
			<div className="flex justify-between items-center py-4 px-8 sm:px-8 sm:py-4">
				<div className="flex items-center space-x-3">
					<h2 className="text-gray-900 font-medium text-lg">
						{ __( 'Integrate AI', 'wedocs' ) }
					</h2>
					<div
						className="tooltip cursor-pointer ml-2 z-[9999]"
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
				<div className="flex items-center">
					<Switch className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer outline-0 items-center justify-center rounded-full">
						<span
							aria-hidden="true"
							className="pointer-events-none absolute h-full w-full rounded-md bg-white"
						/>
						<span
							aria-hidden="true"
							className={ 'bg-indigo-600 pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out' }
						/>
						<span
							aria-hidden="true"
							className={ 'translate-x-5 pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out' }
						/>
					</Switch>
					<span className={ `ml-3` }>
						<span className="text-sm text-gray-900">
							{ __( 'Enable', 'wedocs' ) }
						</span>
					</span>
				</div>
			</div>
			<hr className="h-px !bg-gray-200 border-0 dark:!bg-gray-200" />
			<div
				className="pt-6 pb-20 px-8 grid grid-cols-4 gap-5 relative"
				onMouseEnter={ () => setShowOverlay( true ) }
				onMouseLeave={ () => setShowOverlay( false ) }
			>
				<div className="col-span-4">
					<div className="settings-content flex items-center justify-between">
						<div className="settings-heading flex items-center space-x-2 flex-1">
							<label
								className="block text-sm font-medium text-gray-700"
								id="headlessui-listbox-label-15"
								data-headlessui-state="open"
							>
								{ __( 'Sync Data with AI', 'wedocs' ) }
							</label>
							<div
								className="tooltip cursor-pointer ml-2"
								data-tip={ __( 'Please create at least one document to enable and sync data with AI', 'wedocs' ) }
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
						<div className="settings-field w-full align-center max-w-[490px] mt-1 ml-auto flex items-center">
							<Switcher
								name="sync_data"
								setSettings={ setSettings }
								panelName={ `integrate_ai` }
								settingsData={ settingsData }
								settingsPanel={ settingsData?.integrate_ai }
								isEnabled={ settingsData.integrate_ai.sync_data === 'on' }
							/>
						</div>
					</div>
					<div className="settings-description w-full max-w-[490px] ml-auto mt-2 text-xs text-gray-500">
						{ __( 'Please create at least one document to enable and sync data with AI', 'wedocs' ) }
					</div>
				</div>
				<Overlay classes={ `${ showOverlay ? 'flex items-center justify-center' : 'hidden' }` } />
			</div>
		</div>
	)
}

export default IntegrateAiSettings
