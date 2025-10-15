import { __ } from '@wordpress/i18n';

const SettingsHeader = () => {
	return (
		<div className="min-w-0 space-y-1.5 flex flex-col">
			<h3 className="font-medium text-xl text-[#111827]">
				{ __( 'Choose your privacy settings', 'wedocs' ) }
			</h3>
			
			<p>{__("Control user management for this doc. You can make a doc for internal usage, allow certain user roles to write and edit a doc and more","wedocs")}</p>
		</div>
	);
};

export default SettingsHeader;
