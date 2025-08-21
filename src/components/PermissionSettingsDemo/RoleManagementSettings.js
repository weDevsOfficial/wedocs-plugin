import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import Badge from '../ProPreviews/common/Badge';

const RoleManagementSettings = ({}) => {
  const [isGlobal, setIsGlobal] = useState(true);

  function handlePermission() {
    setIsGlobal((value) => !value);
  }

  return (
    <div className="sm:flex sm:pt-5 mb-9">
      <label
        htmlFor="role-settings"
        className="block text-sm font-semibold text-gray-900 flex mt-2.5 mr-5"
      >
        {__('User role management', 'wedocs')}
        <div
          className="tooltip cursor-pointer font-normal ml-2"
          data-tip={__('Set your documentation role permissions', 'wedocs')}
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
          onChange={handlePermission}
          id="role-settings"
          name="role-settings"
          className="!px-3.5 !py-1 mb-1 block w-full !max-w-full font-medium !text-gray-700 !rounded-md !border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
        >
          <option>{__('As per Global Permission Settings', 'wedocs')}</option>
          <option>{__('Custom', 'wedocs')}</option>
        </select>

        <a
          href={ `${ window.location.origin }/wp-admin/admin.php${ window.location.search }#/settings/permission`}
          className="text-sm text-indigo-600 pl-0.5 mb-2"
        >
          {__('Go to permission management setting', 'wedocs')}
        </a>

        <div className="mt-6 space-y-2">
          {!isGlobal && (

			<>
			  <div className="sm:flex sm:pt-5">
              <label className="block text-sm font-semibold text-gray-900 flex mt-2.5">
                {__('Admin', 'wedocs')}
              </label>
              <div className="mt-1 ml-auto sm:col-span-2 sm:mt-0">
                <select disabled className="!px-3.5 !py-1 mb-1 block w-[312px] font-medium !text-gray-700 !rounded-md !border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm">
                  <option>{__('Can edit', 'wedocs')}</option>
                </select>
              </div>
            </div>
			<div className='other-roles relative'>
				  <div className="sm:flex sm:pt-5 pointer-events-none">
              <label className="block text-sm font-semibold text-gray-900 flex mt-2.5">
                {__('Authors', 'wedocs')}
              </label>
              <div className="mt-1 ml-auto sm:col-span-2 sm:mt-0 opacity-40">
                <select className="!px-3.5 !py-1 mb-1 block w-[312px] font-medium !text-gray-700 !rounded-md !border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm">
                  <option>{__('Can view', 'wedocs')}</option>
                  <option>{__('Can edit', 'wedocs')}</option>
                </select>
				
              </div>
			
            </div>
			  <div className="sm:flex sm:pt-5 opacity-40 pointer-events-none">
              <label className="block text-sm font-semibold text-gray-900 flex mt-2.5">
                {__('Contributors', 'wedocs')}
              </label>
              <div className="mt-1 ml-auto sm:col-span-2 sm:mt-0">
                <select className="!px-3.5 !py-1 mb-1 block w-[312px] font-medium !text-gray-700 !rounded-md !border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm">
                  <option>{__('Can view', 'wedocs')}</option>
                  <option>{__('Can edit', 'wedocs')}</option>
                </select>
              </div>
            </div>
			  <div className="sm:flex sm:pt-5 opacity-40 pointer-events-none">
              <label className="block text-sm font-semibold text-gray-900 flex mt-2.5">
                {__('Subscribers', 'wedocs')}
              </label>
              <div className="mt-1 ml-auto sm:col-span-2 sm:mt-0">
                <select className="!px-3.5 !py-1 mb-1 block w-[312px] font-medium !text-gray-700 !rounded-md !border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm">
                  <option>{__('Can view', 'wedocs')}</option>
                  <option>{__('Can edit', 'wedocs')}</option>
                </select>
              </div>
            </div>
			<Badge position='absolute right-[25px] top-1/2 -translate-y-1/2'/>
			</div>
			</>
          
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleManagementSettings;
