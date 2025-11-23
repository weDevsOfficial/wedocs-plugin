import { __, sprintf } from '@wordpress/i18n';
import Overlay from './common/Overlay';
import { useState } from '@wordpress/element';
import MultiSelectBox from '../MultiSelectBox';

const PermissionSettings = () => {

    const [activeIndex, setActiveIndex] = useState(null);
   
    const roles = [ 'Administrator', 'Editor', 'Author', 'Contributor', 'Subscriber', 'Custom' ];

    const permissionFields = [
        {
            permissionObj: roles,
            boxId: 'global_permission',
            title: __( 'Global doc permission settings', 'wedocs' ),
            tooltip: __(
                'By default, who will get edit access on all the documents?',
                'wedocs'
            ),
        },
        {
            permissionObj: roles,
            boxId: 'role_wise_permission',
            title: __( 'Who can manage weDocs Settings?', 'wedocs' ),
            tooltip: __(
                'Who will have the ability to alter the settings of the plugin?',
                'wedocs'
            ),
        },
    ];

    return (
        <section>
            <div className="shadow sm:rounded-md bg-white overflow-visible min-h-[500px]">
                <div className="py-4 px-8 sm:px-8 sm:py-4">
                    <h2 className="text-gray-900 font-medium text-lg">
                        { __( 'Permission Management', 'wedocs' ) }
                    </h2>
                </div>
                <hr className="h-px !bg-gray-200 border-0 dark:!bg-gray-200" />
                <div
                    className='pt-6 pb-20 px-8 grid grid-cols-4 auto-rows-max gap-5 relative min-h-[439px]'
                >
                    { permissionFields &&
                        permissionFields?.map( ( field, fieldIndex ) => (
                        <div className="col-span-4" key={ fieldIndex }>
                            <div className="settings-content flex items-center justify-between">
                                <div className="settings-heading md:min-w-[300px] flex items-center space-x-2 flex-1">
                                    <label
                                        className="block text-sm font-medium text-gray-700"
                                        id="headlessui-listbox-label-15"
                                        data-headlessui-state="open"
                                    >
                                        { field?.title }
                                    </label>
                                    <div
                                        className="tooltip cursor-pointer ml-2"
                                        data-tip={ field?.tooltip }
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
                                   
                                                <MultiSelectBox options={roles} index={fieldIndex} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
                                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        aria-hidden="true"
                                                        className="h-5 w-5 text-gray-400"
                                                    >
                                                        <path
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        ></path>
                                                    </svg>
                                                </span>
                                </div>
                            </div>
                                <div className="settings-description max-w-[490px] ml-auto">
                                    <div className="active-roles inline-flex flex-wrap items-center gap-2.5">
                                            <span
                                              
                                              className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2.5 py-0.5 text-sm text-gray-800"
                                            >
                                                {
                                                   __("Administrator","wedocs")
                                                }
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  fill="none"
                                                  viewBox="0 0 24 24"
                                                  strokeWidth={
                                                      1.5
                                                  }
                                                  stroke="currentColor"
                                                  className="w-4 h-4 cursor-pointer"
                                                >
                                                    <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </span>
                                         
                                    </div>
                                </div>
                        </div>
                      ) ) }
                </div>
            </div>
        </section>
    );
};

export default PermissionSettings;
