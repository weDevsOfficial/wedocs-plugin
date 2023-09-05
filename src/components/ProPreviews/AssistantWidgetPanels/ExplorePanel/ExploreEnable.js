import { __ } from '@wordpress/i18n';
import DummySwitch from '../DummySwitch';

const ExploreEnable = () => {
	return (
		<>
			<div className="grid grid-cols-4 gap-5">
				<div className="col-span-4">
					<div className="settings-content flex items-center justify-between">
						<div className="settings-field-heading flex items-center space-x-2 flex-1">
							<label
								className="block text-sm font-medium text-gray-600"
								id="headlessui-listbox-label-15"
								data-headlessui-state="open"
							>
								{ __( 'Enable Explore Tab', 'wedocs' ) }
							</label>
							<div
								className="tooltip cursor-pointer ml-2"
								data-tip={ __(
									'Explore tab helps keep all the crucial and indispensable information at the forefront, making it easier for the readers to access and utilize',
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
						<div className="settings-field w-full max-w-[490px] mt-1 ml-auto flex-2">
							<div className="relative flex items-center">
								<DummySwitch isEnabled={ true } />
							</div>
						</div>
					</div>
				</div>
			</div>
			<hr className="h-px !bg-gray-200 border-0 dark:!bg-gray-200 my-5" />
		</>
	);
}

export default ExploreEnable;
