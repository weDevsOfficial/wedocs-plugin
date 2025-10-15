import { __ } from '@wordpress/i18n';
import SettingsHeader from "./SettingsHeader"
import PrivacySettings from "./PrivacySettings"
import RoleManagementHeader from "./RoleManagementHeader"
import RoleManagementSettings from "./RoleManagementSettings"
import BackToDocsPage from './BackToDocsPage';


export default function PermissionSettingsDemo() {
  return (
	<>
		<BackToDocsPage/>
			<div className="bg-white">
			
			<div className="px-10 py-7 sm:px-10">
				<SettingsHeader />
				<PrivacySettings/>
				<hr className="my-8 h-px bg-[#DBDBDB] border-0 dark:bg-[#DBDBDB]" />
				<RoleManagementHeader />
				<RoleManagementSettings
				/>
				<hr className="h-px !bg-gray-200 border-0 dark:!bg-gray-200" />
				<div className="p-4 relative text-right space-x-2.5 sm:p-4">
					<a
						href={ `${
							window.location.pathname + window.location.search
						}#/` }
						type="button"
						className="py-2 inline-flex items-center rounded-md border border-gray-300 shadow-gray-100 px-4 text-sm text-gray-700 hover:!text-gray-700 shadow-sm"
					>
						{ __( 'Cancel', 'wedocs' ) }
					</a>
					
					<button
						type="button"
						disabled
						className="py-2 inline-flex items-center rounded-md px-4 text-sm bg-stone-400 text-white bg-grey cursor-not-allowed"
					>
						{ __( 'Save', 'wedocs' ) }
					</button>
				</div>
			</div>
		</div>
	</>
    	
  )
}