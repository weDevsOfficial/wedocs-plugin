import { __ } from '@wordpress/i18n';

const SettingsHeader = () => {
	return (
		<div className="min-w-0 space-y-1.5 flex items-center">
			<h3 className="font-medium text-xl text-[#111827]">
				{ __( 'Choose your privacy settings', 'wedocs-pro' ) }
			</h3>
		</div>
	);
};

export default SettingsHeader;
