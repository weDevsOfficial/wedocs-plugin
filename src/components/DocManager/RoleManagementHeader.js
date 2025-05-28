import { __ } from '@wordpress/i18n';

const RoleManagementHeader = () => {
	return (
		<div className="min-w-0 space-y-1.5 mb-5">
			<h3 className="font-medium text-xl text-[#111827]">
				{ __( 'Manage your team members', 'wedocs-pro' ) }
			</h3>
			<p className="text-sm text-[#6B7280]">
				{ __(
					'Assign roles, control access levels, and collaborate seamlessly on documentations',
					'wedocs-pro'
				) }
			</p>
		</div>
	);
};

export default RoleManagementHeader;
