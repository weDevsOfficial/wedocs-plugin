import { __ } from '@wordpress/i18n';
import UploadButton from '../UploadButton';
import AppearanceLabel from '../AppearanceLabel';

const Appearance = () => {
	return (
		<div className={ `ai-appearance-section wedocs-relative` }>
			<AppearanceLabel />
			<div className="wedocs-grid wedocs-grid-cols-4 wedocs-gap-5">
				<div className="wedocs-col-span-4">
					<div className="settings-content wedocs-flex wedocs-items-center wedocs-justify-between">
						<div className="settings-field-heading md:wedocs-min-w-[300px] wedocs-mt-1 wedocs-flex wedocs-items-center wedocs-space-x-2 wedocs-flex-1">
							<label
								className="wedocs-block wedocs-text-sm wedocs-font-medium wedocs-text-gray-600"
								id="headlessui-listbox-label-15"
								data-headlessui-state="open"
							>
								{ __(
									'Explore tab icon',
									'wedocs'
								) }
							</label>
							<div
								className="tooltip wedocs-cursor-pointer wedocs-ml-2"
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
						<div className="settings-field wedocs-w-full wedocs-max-w-[490px] wedocs-ml-auto wedocs-flex wedocs-flex-2">
							<UploadButton />
						</div>
					</div>
				</div>
				<div className="col-span-4">
					<div className="settings-content wedocs-flex wedocs-items-center wedocs-justify-between">
						<div className="settings-field-heading md:wedocs-min-w-[300px] wedocs-flex wedocs-items-center wedocs-space-x-2 wedocs-flex-1">
							<label
								className="wedocs-block wedocs-text-sm wedocs-font-medium wedocs-text-gray-600"
								id="headlessui-listbox-label-15"
								data-headlessui-state="open"
							>
								{ __( 'Explore tab name', 'wedocs' ) }
							</label>
							<div
								className="tooltip wedocs-cursor-pointer wedocs-ml-2"
								data-tip={ __(
									'Give your explore tab a meaningful name',
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
									name="explore_title"
									id="explore-title"
									placeholder={ __(
										'Explore tab title',
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
					<div className="settings-content wedocs-flex wedocs-items-center wedocs-justify-between">
						<div className="settings-field-heading md:wedocs-min-w-[300px] wedocs-flex wedocs-items-center wedocs-space-x-2 wedocs-flex-1">
							<label
								className="wedocs-block wedocs-text-sm wedocs-font-medium wedocs-text-gray-600"
								id="headlessui-listbox-label-15"
								data-headlessui-state="open"
							>
								{ __(
									'Explore Tab Subtitle 1',
									'wedocs'
								) }
							</label>
							<div
								className="tooltip wedocs-cursor-pointer wedocs-ml-2"
								data-tip={ __(
									'Edit the first explore tab subtitle',
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
									name="explore_subtitle_one"
									id="explore-subtitle-one"
									placeholder={ __(
										'Explore tab subtitle 1',
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
					<div className="settings-content wedocs-flex wedocs-items-center wedocs-justify-between">
						<div className="settings-field-heading md:wedocs-min-w-[300px] wedocs-flex wedocs-items-center wedocs-space-x-2 wedocs-flex-1">
							<label
								className="wedocs-block wedocs-text-sm wedocs-font-medium wedocs-text-gray-600"
								id="headlessui-listbox-label-15"
								data-headlessui-state="open"
							>
								{ __(
									'Explore Tab Subtitle 2',
									'wedocs'
								) }
							</label>
							<div
								className="tooltip wedocs-cursor-pointer wedocs-ml-2"
								data-tip={ __(
									'Edit the second explore tab subtitle',
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
									name="explore_subtitle_two"
									id="explore-subtitle-two"
									placeholder={ __(
										'Explore tab subtitle 2',
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
}

export default Appearance
