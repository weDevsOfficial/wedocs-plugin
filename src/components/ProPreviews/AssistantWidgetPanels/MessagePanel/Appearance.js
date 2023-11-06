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
						<div className="settings-field-heading md:min-w-[300px] mt-1 flex items-center space-x-2 flex-1">
							<label
								className="block text-sm font-medium text-gray-600"
								id="headlessui-listbox-label-15"
								data-headlessui-state="open"
							>
								{ __(
									'Messaging tab icon',
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
						<div className="settings-field-heading md:min-w-[300px] flex items-center space-x-2 flex-1">
							<label
								className="block text-sm font-medium text-gray-600"
								id="headlessui-listbox-label-15"
								data-headlessui-state="open"
							>
								{ __( 'Messaging tab name', 'wedocs' ) }
							</label>
							<div
								className="tooltip cursor-pointer ml-2"
								data-tip={ __(
									'Give your messaging tab a meaningful name',
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
									name="messaging_title"
									id="messaging-title"
									placeholder={ __(
										'Messaging tab title',
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
						<div className="settings-field-heading md:min-w-[300px] flex items-center space-x-2 flex-1">
							<label
								className="block text-sm font-medium text-gray-600"
								id="headlessui-listbox-label-15"
								data-headlessui-state="open"
							>
								{ __(
									'Messaging Tab Subtitle 1',
									'wedocs'
								) }
							</label>
							<div
								className="tooltip cursor-pointer ml-2"
								data-tip={ __(
									'Edit the first messaging tab subtitle',
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
									name="messaging_subtitle_one"
									id="messaging-subtitle-one"
									placeholder={ __(
										'Messaging tab subtitle 1',
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
						<div className="settings-field-heading md:min-w-[300px] flex items-center space-x-2 flex-1">
							<label
								className="block text-sm font-medium text-gray-600"
								id="headlessui-listbox-label-15"
								data-headlessui-state="open"
							>
								{ __(
									'Messaging Tab Subtitle 2',
									'wedocs'
								) }
							</label>
							<div
								className="tooltip cursor-pointer ml-2"
								data-tip={ __(
									'Edit the second messaging tab subtitle',
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
									name="messaging_subtitle_two"
									id="messaging-subtitle-two"
									placeholder={ __(
										'Messaging tab subtitle 2',
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
}

export default Appearance
