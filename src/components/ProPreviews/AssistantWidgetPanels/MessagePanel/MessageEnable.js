import { __ } from '@wordpress/i18n';
import AssistantSwitcher from '../AssistantSwitcher';
import DummySwitch from '../DummySwitch';

const MessageEnable = () => {
	return (
		<>
			<div className="wedocs-grid wedocs-grid-cols-4 wedocs-gap-5">
				<div className="wedocs-col-span-4">
					<div className="settings-content wedocs-flex wedocs-items-center wedocs-justify-between">
						<div className="settings-field-heading md:wedocs-min-w-[300px] wedocs-flex wedocs-items-center wedocs-space-x-2 wedocs-flex-1">
							<label
								className="wedocs-block wedocs-text-sm wedocs-font-medium wedocs-text-gray-600"
								id="headlessui-listbox-label-15"
								data-headlessui-state="open"
							>
								{ __( 'Enable Messaging Tab', 'wedocs' ) }
							</label>
							<div
								className="tooltip wedocs-cursor-pointer wedocs-ml-2"
								data-tip={ __(
									'Stay connected to your readers and receive their thoughts effortlessly through an email form',
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
						<div className="settings-field wedocs-w-full wedocs-max-w-[490px] wedocs-mt-1 wedocs-ml-auto wedocs-flex-2">
							<div className="wedocs-relative wedocs-flex wedocs-items-center">
								<DummySwitch isEnabled={ true } />
							</div>
						</div>
					</div>
				</div>
			</div>
			<hr className="wedocs-h-px !wedocs-bg-gray-200 wedocs-border-0 dark:!wedocs-bg-gray-200 wedocs-my-5" />
		</>
	);
}

export default MessageEnable;
