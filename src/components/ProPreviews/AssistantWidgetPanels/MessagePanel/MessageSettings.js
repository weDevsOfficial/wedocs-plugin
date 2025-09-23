import { __ } from '@wordpress/i18n';

const MessageSettings = () => {
	return (
		<div className="messaging-settings wedocs-relative">
			<div className="wedocs-grid wedocs-grid-cols-4 wedocs-gap-5">
				<div className="wedocs-col-span-4">
					<div className="settings-content wedocs-flex wedocs-items-center wedocs-justify-between">
						<div className="settings-field-heading md:wedocs-min-w-[300px] wedocs-flex wedocs-items-center wedocs-space-x-2 wedocs-flex-1">
							<label
								className="wedocs-block wedocs-text-sm wedocs-font-medium wedocs-text-gray-600"
								id="headlessui-listbox-label-15"
								data-headlessui-state="open"
							>
								{ __(
									'Cloudflare Turnstile Site Key',
									'wedocs'
								) }
							</label>
							<div
								className="tooltip wedocs-cursor-pointer wedocs-ml-2"
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
						<div className="settings-field wedocs-w-full wedocs-max-w-[490px] wedocs-ml-auto wedocs-flex-2">
							<div className="wedocs-relative">
								<input
									type="text"
									name="turnstile_site_key"
									id="turnstile-site-key"
									placeholder={ __(
										'Enter your cloudflare turnstile site key',
										'wedocs'
									) }
									className="wedocs-w-full !wedocs-rounded-md !wedocs-bg-white !wedocs-border-gray-300 wedocs-bg-white !wedocs-py-1 !wedocs-pl-3 !wedocs-pr-10 wedocs-text-left wedocs-shadow-sm focus:wedocs-border-indigo-500 focus:wedocs-outline-none focus:wedocs-ring-1 focus:wedocs-ring-indigo-500 sm:wedocs-text-sm"
									value=''
									readOnly={ true }
								/>
							</div>
						</div>
					</div>
					<div className="settings-description wedocs-w-full wedocs-max-w-[490px] wedocs-ml-auto wedocs-mt-1">
						<p className="wedocs-text-sm wedocs-text-[#6B7280]">
							{ __(
								'How to set up ',
								'wedocs'
							) }
							<a
								href="//developers.cloudflare.com/turnstile/get-started/"
								target="_blank"
								className="wedocs-text-indigo-700 wedocs-underline wedocs-underline-offset-2 !wedocs-shadow-none"
								rel="noreferrer"
							>
								{ __( 'Cloudflare Turnstile', 'wedocs' ) }
							</a>
						</p>
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
									'Email Address',
									'wedocs'
								) }
							</label>
							<div
								className="tooltip wedocs-cursor-pointer wedocs-ml-2"
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
						<div className="settings-field wedocs-w-full wedocs-max-w-[490px] wedocs-ml-auto wedocs-flex-2">
							<div className="wedocs-relative">
								<input
									type="email"
									name="email_address"
									id="email-address"
									placeholder={ __(
										'Email Address',
										'wedocs'
									) }
									className="wedocs-w-full !wedocs-rounded-md !wedocs-bg-white !wedocs-border-gray-300 wedocs-bg-white !wedocs-py-1 !wedocs-pl-3 !wedocs-pr-10 wedocs-text-left wedocs-shadow-sm focus:wedocs-border-indigo-500 focus:wedocs-outline-none focus:wedocs-ring-1 focus:wedocs-ring-indigo-500 sm:wedocs-text-sm"
									value=''
									readOnly={ true }
								/>
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
									'Success Message Title',
									'wedocs'
								) }
							</label>
							<div
								className="tooltip wedocs-cursor-pointer wedocs-ml-2"
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
						<div className="settings-field wedocs-w-full wedocs-max-w-[490px] wedocs-ml-auto wedocs-flex-2">
							<div className="wedocs-relative">
								<input
									type="text"
									name="messaging_success_title"
									id="messaging-success-title"
									placeholder={ __(
										'Messaging success title',
										'wedocs'
									) }
									className="wedocs-w-full !wedocs-rounded-md !wedocs-bg-white !wedocs-border-gray-300 wedocs-bg-white !wedocs-py-1 !wedocs-pl-3 !wedocs-pr-10 wedocs-text-left wedocs-shadow-sm focus:wedocs-border-indigo-500 focus:wedocs-outline-none focus:wedocs-ring-1 focus:wedocs-ring-indigo-500 sm:wedocs-text-sm"
									value=''
									readOnly={ true }
								/>
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
									'Success Message Text',
									'wedocs'
								) }
							</label>
							<div
								className="tooltip wedocs-cursor-pointer wedocs-ml-2"
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
						<div className="settings-field wedocs-w-full wedocs-max-w-[490px] wedocs-ml-auto wedocs-flex-2">
							<div className="wedocs-relative">
								<input
									type="text"
									name="messaging_success_text"
									id="messaging-success-text"
									placeholder={ __(
										'Messaging success text',
										'wedocs'
									) }
									className="wedocs-w-full !wedocs-rounded-md !wedocs-bg-white !wedocs-border-gray-300 wedocs-bg-white !wedocs-py-1 !wedocs-pl-3 !wedocs-pr-10 wedocs-text-left wedocs-shadow-sm focus:wedocs-border-indigo-500 focus:wedocs-outline-none focus:wedocs-ring-1 focus:wedocs-ring-indigo-500 sm:wedocs-text-sm"
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
