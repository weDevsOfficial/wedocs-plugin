import { __ } from '@wordpress/i18n';
import { useEffect, useRef } from '@wordpress/element';
import Badge from '../ProPreviews/common/Badge';
import UpgradePopup from '../ProPreviews/common/UpgradePopup';

const PrivacySettings = ( ) => {
	
	return (
		<div className="privacy-settings mt-8">
			<div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-20">
				<label
					htmlFor="public"
					className="text-base font-medium text-gray-900 mr-5"
				>
					{ __( 'Viewing Privacy', 'wedocs' ) }
				</label>
				<div className="privacy-fields relative flex space-x-12 !mt-1">
					<div className="field flex">
						<input
							id="public"
							type="radio"
							name="publish"
							
							 defaultChecked={ true }
							className=
								 'checked:!border-transparent checked:!bg-indigo-600 !mt-[.2rem] before:!bg-white before:!w-1.5 before:!h-1.5 before:!mt-1 before:!ml-1 place-content-center'
							
						/>
						<div className="ml-2 text-sm">
							<label
								htmlFor="public"
								className="font-medium text-gray-700"
							>
								{ __( 'Public', 'wedocs' ) }
								<p className="font-normal text-[#6B7280] pt-0.5">
									{ __(
										'Everyone can see this doc',
										'wedocs'
									) }
								</p>
							</label>
						</div>
					</div>
					<div className="field flex">
						<UpgradePopup>
	<input
							id="privacy"
							name="private"
							type="radio"
							className='!bg-transparent !border-[#8c8f94]
							 !mt-[.2rem] before:!bg-white before:!w-1.5 before:!h-1.5 before:!mt-1 before:!ml-1 place-content-center'
						/>
						</UpgradePopup>
					
						<div className="ml-2 text-sm">
							<label
								htmlFor="privacy"
								className="font-medium text-gray-700 relative"
							>
								{ __( 'Private', 'wedocs' ) }
								<p className="font-normal text-[#6B7280] pt-0.5">
									{ __(
										'Only logged-in users can see this doc',
										'wedocs'
									) }
								</p>
								<Badge position='absolute' top="-5px" left="45px" heading="Permission Management is a Premium Feature" description="To see who contributed to the documents, you must upgrade to the pro edition."/>
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PrivacySettings;
