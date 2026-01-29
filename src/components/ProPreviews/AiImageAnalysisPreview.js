import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import Badge from './common/Badge';
import Overlay from './common/Overlay';

const AiImageAnalysisPreview = () => {
	const [showOverlay, setShowOverlay] = useState(false);

	const classNames = (...classes) => classes.filter(Boolean).join(' ');

	return (
		<div 
			className="col-span-4 mt-4 relative"
			onMouseEnter={() => setShowOverlay(true)}
			onMouseLeave={() => setShowOverlay(false)}
		>
			<div className="settings-content flex items-center justify-between">
				<div className="settings-heading md:min-w-[300px] flex items-center space-x-2 flex-1">
					<label
						className="block text-sm font-medium text-gray-700"
						id="headlessui-listbox-label-image-analysis"
					>
						{__('Enable image analysis', 'wedocs')}
					</label>
					<Badge 
						classes="opacity-100" 
						heading={__('Pro Feature', 'wedocs')}
						description={__('Upload screenshots for AI to analyze when generating documentation', 'wedocs')}
					/>
					<div
						className="tooltip cursor-pointer ml-2"
						data-tip={__(
							'Allow AI to analyze uploaded screenshots when generating documentation',
							'wedocs'
						)}
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
					<button
						type="button"
						className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer outline-0 items-center justify-center rounded-full"
						disabled
					>
						<span
							aria-hidden="true"
							className="pointer-events-none absolute h-full w-full rounded-md bg-white"
						/>
						<span
							aria-hidden="true"
							className={classNames(
								'bg-gray-200',
								'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
							)}
						/>
						<span
							aria-hidden="true"
							className={classNames(
								'translate-x-0',
								'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out'
							)}
						/>
					</button>
					<span className="ml-3">
						<span className="text-sm text-gray-900">
							{__('Disable', 'wedocs')}
						</span>
					</span>
				</div>
			</div>
			<div className="settings-description w-full max-w-[490px] ml-auto mt-1">
				<p className="text-sm text-[#6B7280]">
					{__(
						'Allow AI to analyze uploaded screenshots when generating documentation. Useful for documenting UI flows, onboarding steps, and feature screenshots.',
						'wedocs'
					)}
				</p>
				<p className="text-sm text-amber-600 mt-2 flex items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="none"
						className="mr-1"
					>
						<path
							d="M8 5.333V8m0 2.667h.007M14.667 8A6.667 6.667 0 1 1 1.333 8a6.667 6.667 0 1 1 13.334 0z"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					{__(
						'Image analysis increases API token usage significantly.',
						'wedocs'
					)}
				</p>
			</div>
			{showOverlay && <Overlay classes="!z-[9999] flex items-center justify-center" />}
		</div>
	);
};

export default AiImageAnalysisPreview;
