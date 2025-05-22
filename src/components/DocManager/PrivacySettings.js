import { __ } from '@wordpress/i18n';
import { useEffect, useRef } from '@wordpress/element';
import ProBadge from '../ProPreviews/common/ProBadge';

const PrivacySettings = ( { status, handlerClick } ) => {
	const privateRef = useRef( null );
	const isProLoaded = wp.hooks.applyFilters(
		'wedocs_pro_loaded',
		false
	);

	useEffect( () => {
		if ( status === 'private' ) {
			privateRef.current.click();
		}
	}, [ status ] );

	return (
		<div className="privacy-settings mt-8">
			<div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-20">
				<label
					htmlFor="public"
					className="text-base font-medium text-gray-900 mr-5"
				>
					{ __( 'Viewing Privacy', 'wedocs-pro' ) }
				</label>
				<div className="privacy-fields relative flex space-x-12 !mt-1">
					<div className="field flex">
						<input
							id="public"
							type="radio"
							name="publish"
							onClick={ handlerClick }
							defaultChecked={ status === 'publish' }
							className={ `${
								status === 'publish'
									? 'checked:!border-transparent checked:!bg-indigo-600'
									: '!bg-transparent !border-[#8c8f94]'
							} !mt-[.2rem] before:!bg-white before:!w-1.5 before:!h-1.5 before:!mt-1 before:!ml-1 place-content-center` }
						/>
						<div className="ml-2 text-sm">
							<label
								htmlFor="public"
								className="font-medium text-gray-700"
							>
								{ __( 'Public', 'wedocs-pro' ) }
								<p className="font-normal text-[#6B7280] pt-0.5">
									{ __(
										'Everyone can see this doc',
										'wedocs-pro'
									) }
								</p>
							</label>
						</div>
					</div>
					<div className="field flex">
						<input
							id="privacy"
							name="private"
							type="radio"
							ref={ privateRef }
							onClick={ handlerClick }
							defaultChecked={ status === 'private' }
							className={ `${
								status === 'private'
									? 'checked:!border-transparent checked:!bg-indigo-600'
									: '!bg-transparent !border-[#8c8f94]'
							} !mt-[.2rem] before:!bg-white before:!w-1.5 before:!h-1.5 before:!mt-1 before:!ml-1 place-content-center` }
						/>
						<div className="ml-2 text-sm">
							<label
								htmlFor="privacy"
								className="font-medium text-gray-700"
							>
								{ __( 'Private', 'wedocs-pro' ) }
								{ !isProLoaded && <ProBadge /> }
								<p className="font-normal text-[#6B7280] pt-0.5">
									{ __(
										'Only logged-in users can see this doc',
										'wedocs-pro'
									) }
								</p>
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PrivacySettings;
