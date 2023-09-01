import { __ } from '@wordpress/i18n';
import DummySwitch from '../DummySwitch';

const IntegrateAiSettings = () => {
	return (
		<div className={ `relative` }>
			<div className="grid grid-cols-4 gap-5 mb-5">
				<div
					className="col-span-4"
					key="sync_data"
				>
					<div className="settings-content flex items-center justify-between mt-1">
						<div className="settings-heading flex items-center space-x-2 flex-1">
							<label
								className="block text-sm font-medium text-gray-700"
								id="headlessui-listbox-label-15"
								data-headlessui-state="open"
							>
								{ __('Sync Data with AI', 'wedocs') }
							</label>
							<div className="tooltip cursor-pointer ml-2">
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
						<div className="settings-field w-full align-center max-w-[490px] flex items-center ml-auto">
							<DummySwitch isEnabled={ false } />
						</div>
					</div>
				</div>
			</div>
			<div className={ `w-full flex items-center bg-[#FFFBEB] border-0 border-l-4 border border-[#FBBF24] text-[#92400E] text-sm leading-5 py-3 px-4 gap-3 mb-5` } >
				<svg width="16" height="15" fill="none">
					<path
						fill="#fbbf24"
						fillRule="evenodd"
						d="M6.257 1.165c.765-1.359 2.722-1.359 3.486 0l5.58 9.921c.75 1.333-.213 2.98-1.743 2.98H2.42c-1.53 0-2.493-1.647-1.743-2.98l5.58-9.921zM9 11.066a1 1 0 1 1-2 0 1 1 0 1 1 2 0zm-1-8a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0v-3a1 1 0 0 0-1-1z"
					/>
				</svg>
				{ __( 'Ai Chat functionality will not work unless "Sync Data with AI" is enabled.', 'wedocs' ) }
			</div>
			<div className="grid grid-cols-4 gap-5">
				<div
					className="col-span-4"
					key="manage_subscription"
				>
					<div className="settings-content flex items-center justify-between">
						<div className="settings-heading flex items-center space-x-2 flex-1">
							<label
								className="block text-sm font-medium text-gray-700"
								id="headlessui-listbox-label-15"
								data-headlessui-state="open"
							>
								{ __('Manage AI Chatbot Billing', 'wedocs') }
							</label>
						</div>
						<div className="settings-field w-full align-center max-w-[490px] ml-auto">
							<>
								<button
									type="button"
									className="inline-flex shadow-gray-800/30 items-center border border-indigo-600 px-4 py-2 text-indigo-700 font-medium hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
								>
									{ __( 'Manage Subscription', 'wedocs' ) }
								</button>
							</>
						</div>
					</div>
				</div>
			</div>
			<div
				className="backdrop absolute z-0 top-0 left-0 w-full h-full"
				style={ { backgroundColor: 'white', opacity: 0.5 } }
			/>
		</div>
	)
}

export default IntegrateAiSettings
