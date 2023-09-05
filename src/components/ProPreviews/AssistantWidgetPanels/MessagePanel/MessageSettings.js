import { __ } from '@wordpress/i18n';

const MessageSettings = () => {
	return (
		<div className="messaging-settings relative">
			<div className="grid grid-cols-4 gap-5">
				<div className="col-span-4">
					<div className="settings-content flex items-center justify-between">
						<div className="settings-field-heading flex items-center space-x-2 flex-1">
							<label
								className="block text-sm font-medium text-gray-600"
								id="headlessui-listbox-label-15"
								data-headlessui-state="open"
							>
								{ __(
									'Cloudflare Turnstile Site Key',
									'wedocs'
								) }
							</label>
							<div
								className="tooltip cursor-pointer ml-2"
								data-tip={ __(
									'Set your cloudflare turnstile site key for sending message traffic free',
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
								<input
									type="text"
									name="turnstile_site_key"
									id="turnstile-site-key"
									placeholder={ __(
										'Enter your cloudflare turnstile site key',
										'wedocs'
									) }
									className="w-full !rounded-md !bg-white !border-gray-300 bg-white !py-1 !pl-3 !pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
									value=''
									readOnly={ true }
								/>
							</div>
						</div>
					</div>
					<div className="settings-description w-full max-w-[490px] ml-auto mt-1">
						<p className="text-sm text-[#6B7280]">
							{ __(
								'How to set up ',
								'wedocs'
							) }
							<a
								href="//developers.cloudflare.com/turnstile/get-started/"
								target="_blank"
								className="text-indigo-700 underline underline-offset-2 !shadow-none"
								rel="noreferrer"
							>
								{ __( 'Cloudflare Turnstile', 'wedocs' ) }
							</a>
						</p>
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
									'Email Address',
									'wedocs'
								) }
							</label>
							<div
								className="tooltip cursor-pointer ml-2"
								data-tip={ __(
									'Please enter the email addresses where you would like to receive contact from leads from your users. You can enter multiple emails separated by a comma.',
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
								<input
									type="email"
									name="email_address"
									id="email-address"
									placeholder={ __(
										'Email Address',
										'wedocs'
									) }
									className="w-full !rounded-md !bg-white !border-gray-300 bg-white !py-1 !pl-3 !pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
									value=''
									readOnly={ true }
								/>
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
									'Success Message Title',
									'wedocs'
								) }
							</label>
							<div
								className="tooltip cursor-pointer ml-2"
								data-tip={ __(
									'Success message title when message is sent successfully',
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
								<input
									type="text"
									name="messaging_success_title"
									id="messaging-success-title"
									placeholder={ __(
										'Messaging success title',
										'wedocs'
									) }
									className="w-full !rounded-md !bg-white !border-gray-300 bg-white !py-1 !pl-3 !pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
									value=''
									readOnly={ true }
								/>
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
									'Success Message Text',
									'wedocs'
								) }
							</label>
							<div
								className="tooltip cursor-pointer ml-2"
								data-tip={ __(
									'Success message text when message is sent successfully',
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
								<input
									type="text"
									name="messaging_success_text"
									id="messaging-success-text"
									placeholder={ __(
										'Messaging success text',
										'wedocs'
									) }
									className="w-full !rounded-md !bg-white !border-gray-300 bg-white !py-1 !pl-3 !pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
									value=''
									readOnly={ true }
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MessageSettings;
