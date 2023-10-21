import { __ } from '@wordpress/i18n';
import UploadButton from '../UploadButton';
import AppearanceLabel from '../AppearanceLabel';

const Appearance = () => {
	return (
		<div className={ `ai-appearance-section relative` }>
			<AppearanceLabel />
			<div className="grid grid-cols-4 gap-5">
				<div className="col-span-4">
					<div className="settings-content flex items-center justify-between">
						<div className="settings-field-heading mt-1 flex items-center space-x-2 flex-1">
							<label
								className="block text-sm font-medium text-gray-600"
								id="headlessui-listbox-label-15"
								data-headlessui-state="open"
							>
								{ __(
									'A.I. ChatBot tab icon',
									'wedocs'
								) }
							</label>
							<div
								className="tooltip cursor-pointer ml-2"
								data-tip={ __(
									'Upload the new explore tab icon. png/jpg preferred',
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
						<div className="settings-field w-full max-w-[490px] ml-auto flex flex-2">
							<UploadButton />
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
								{ __( 'A.I. ChatBot tab name', 'wedocs' ) }
							</label>
							<div
								className="tooltip cursor-pointer ml-2"
								data-tip={ __(
									'Give your explore tab a meaningful title',
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
									id="chatbot-title"
									name="chatbot_title"
									placeholder={ __(
										'A.I. ChatBot',
										'wedocs'
									) }
									className="w-full !rounded-md !bg-white !border-gray-300 bg-white !py-1 !pl-3 !pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
									readOnly={ true }
									value=''
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
									'A.I. ChatBot Tab Subtitle 1',
									'wedocs'
								) }
							</label>
							<div
								className="tooltip cursor-pointer ml-2"
								data-tip={ __(
									'Edit the first chatbot tab subtitle',
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
									name="chatbot_subtitle_one"
									id="chatbot-subtitle-one"
									placeholder={ __(
										'A.I. ChatBot tab subtitle 1',
										'wedocs'
									) }
									className="w-full !rounded-md !bg-white !border-gray-300 bg-white !py-1 !pl-3 !pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
									readOnly={ true }
									value=''
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
									'A.I. ChatBot Tab Subtitle 2',
									'wedocs'
								) }
							</label>
							<div
								className="tooltip cursor-pointer ml-2"
								data-tip={ __(
									'Edit the second chatbot tab subtitle',
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
									name="chatbot_subtitle_two"
									id="chatbot-subtitle-two"
									placeholder={ __(
										'A.I. Chatbot tab subtitle 2',
										'wedocs'
									) }
									className="w-full !rounded-md !bg-white !border-gray-300 bg-white !py-1 !pl-3 !pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
									readOnly={ true }
									value=''
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				className="backdrop absolute z-0 top-0 left-0 w-full h-full"
				style={ { backgroundColor: 'white', opacity: 0.5 } }
			/>
		</div>
	);
}

export default Appearance
