import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import ProBadge from '../ProPreviews/common/ProBadge';

const RoleManagementSettings = ( {
	docPermission,
	roleCapSettings,
	handleRoleManager,
	handleRoleCapabilities,
} ) => {
	const docPermissionOptions = [
		{
			name: __( 'As per Global Permission Settings', 'wedocs-pro' ),
			value: 'global',
		},
		{
			name: __( 'Custom', 'wedocs-pro' ),
			value: 'custom',
		}
	];

	const roleCapOptions = [
		{ value: 'view', name: __( 'Can View', 'wedocs-pro' ) },
		{ value: 'edit', name: __( 'Can Edit', 'wedocs-pro' ) },
	];

	const userRoles = useSelect(
		( select ) => select( 'wedocs/settings' ).getRoles(),
		[]
	);

	const [ docRoleOptions, setDocRoleOptions ] = useState( [] );

	const isProLoaded = wp.hooks.applyFilters(
		'wedocs_pro_loaded',
		false
	);

	useEffect( () => {
		const prepareRoleObj = [];
		Object.entries( userRoles ).forEach( ( role ) => {
			prepareRoleObj.push( {
				name: __( role[ 1 ], 'wedocs-pro' ),
				value: {
					role: role[ 0 ],
					options: roleCapOptions,
				},
			} );
		} );

		setDocRoleOptions( [ ...docRoleOptions, ...prepareRoleObj ] );
	}, [ userRoles ] );

	return (
		<div className="sm:flex sm:pt-5 mb-9">
			<label
				htmlFor="role-settings"
				className="block text-sm font-semibold text-gray-900 flex mt-2.5 mr-5"
			>
				{ __( 'User role management', 'wedocs-pro' ) }
				<div
					className="tooltip cursor-pointer font-normal ml-2"
					data-tip={ __(
						'Set your documentation role permissions',
						'wedocs-pro'
					) }
				>
					<svg
						className="mt-[1px] align-center"
						width="18"
						height="18"
						viewBox="0 0 18 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M9.83333 12.3333H9V9H8.16667M9 5.66667H9.00833M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z"
							stroke="#6B7280"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
			</label>
			<div className="mt-1 relative flex-1 sm:col-span-2 sm:mt-0 !max-w-[452px]">
				<select
					id="role-settings"
					name="role-settings"
					value={ docPermission }
					onChange={ handleRoleManager }
					className="!px-3.5 !py-1 mb-1 block w-full !max-w-full font-medium !text-gray-700 !rounded-md !border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
				>
					{ docPermissionOptions.map( ( item ) => (
						<option key={ item.value } value={ item.value }>
							{ item.name }
						</option>
					) ) }
				</select>

				<a
					href={ `${ window.location.origin }/wp-admin/admin.php${ window.location.search }#/settings/permission` }
					className="text-sm text-indigo-600 pl-0.5 mb-2"
				>
					{ __(
						'Go to permission management setting',
						'wedocs-pro'
					) }
				</a>

				{ docPermission === 'custom' && docRoleOptions && (
					<div className="mt-6 space-y-2">
						{ docRoleOptions.map( ( role ) => (
							<div
								key={ role.value.role }
								className="sm:flex sm:pt-5"
							>
								<label
									htmlFor={ role.value.role }
									// className="block text-sm font-semibold text-gray-900 flex mt-2.5"
									className={
										`block text-sm font-semibold text-gray-900 flex mt-2.5` +
										(!isProLoaded && role.value.role !== 'administrator' ? ' opacity-50' : '')
									}
								>
									{ role.name }
								</label>
								<div className="relative mt-1 ml-auto sm:col-span-2 sm:mt-0 group">
									<select
										id={ role.value.role }
										name={ role.value.role }
										value={
											roleCapSettings[ role.value.role ]
										}
										onChange={ handleRoleCapabilities }
										className="!px-3.5 !py-1 mb-1 block w-[312px] font-medium !text-gray-700 !rounded-md !border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
										disabled={ !isProLoaded && role.value.role !== 'administrator' }
									>
										{ role.value.options.map( ( item ) => (
											<option
												key={ item.value }
												value={ item.value }
											>
												{ item.name }
											</option>
										) ) }
									</select>
									{ !isProLoaded && role.value.role !== 'administrator' && <ProBadge classes="absolute top-0.5 right-7 hidden group-hover:flex" /> }
								</div>
							</div>
						) ) }
					</div>
				) }
			</div>
		</div>
	);
};

export default RoleManagementSettings;
