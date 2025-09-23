import { __, sprintf } from '@wordpress/i18n';
import Overlay from './common/Overlay';
import { useState } from '@wordpress/element';

const PermissionSettings = () => {
    const [ showOverlay, setShowOverlay ] = useState( false );
    const roles = [ 'administrator', 'editor', 'author', 'contributor', 'subscriber', 'custom' ];

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
            <div className="wedocs-shadow sm:wedocs-rounded-md wedocs-bg-white wedocs-overflow-hidden wedocs-min-h-[500px]">
                <div className="wedocs-py-4 wedocs-px-8 sm:wedocs-px-8 sm:wedocs-py-4">
                    <h2 className="wedocs-text-gray-900 wedocs-font-medium wedocs-text-lg">
                        { __( 'Permission Management', 'wedocs' ) }
                    </h2>
                </div>
                <hr className="wedocs-h-px !wedocs-bg-gray-200 wedocs-border-0 dark:!wedocs-bg-gray-200" />
                <div
                    className='wedocs-pt-6 wedocs-pb-20 wedocs-px-8 wedocs-grid wedocs-grid-cols-4 wedocs-auto-rows-max wedocs-gap-5 wedocs-relative wedocs-min-h-[439px]'
                    onMouseEnter={ () => setShowOverlay( true ) }
                    onMouseLeave={ () => setShowOverlay( false ) }
                >
                    { permissionFields &&
                        permissionFields?.map( ( field, fieldIndex ) => (
                        <div className="wedocs-col-span-4" key={ fieldIndex }>
                            <div className="settings-content wedocs-flex wedocs-items-center wedocs-justify-between">
                                <div className="settings-heading md:wedocs-min-w-[300px] wedocs-flex wedocs-items-center wedocs-space-x-2 wedocs-flex-1">
                                    <label
                                        className="wedocs-block wedocs-text-sm wedocs-font-medium wedocs-text-gray-700"
                                        id="headlessui-listbox-label-15"
                                        data-headlessui-state="open"
                                    >
                                        { field?.title }
                                    </label>
                                    <div
                                        className="tooltip wedocs-cursor-pointer wedocs-ml-2"
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
                                <div className="settings-field wedocs-w-full wedocs-max-w-[490px] wedocs-mt-1 wedocs-ml-auto flex-2">
                                    <div className="multiSelectBox">
                                        <div className="wedocs-relative wedocs-mb-2">
                                            <button className="wedocs-w-full wedocs-cursor-pointer wedocs-rounded-md wedocs-border wedocs-border-gray-300 wedocs-bg-white wedocs-py-2 wedocs-pl-3 wedocs-pr-10 wedocs-text-left wedocs-shadow-sm focus:wedocs-border-indigo-500 focus:wedocs-outline-none focus:wedocs-ring-1 focus:wedocs-ring-indigo-500 sm:wedocs-text-sm">
                                                <span className="wedocs-block multiSelectBox wedocs-truncate">
                                                    { __( '6 roles selected', 'wedocs' ) }
                                                </span>
                                                <span className="wedocs-pointer-events-none wedocs-absolute wedocs-inset-y-0 wedocs-right-0 wedocs-flex wedocs-items-center wedocs-pr-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        aria-hidden="true"
                                                        className="wedocs-h-5 wedocs-w-5 wedocs-text-gray-400"
                                                    >
                                                        <path
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        ></path>
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            { field?.permissionObj &&
                              field?.permissionObj?.length > 0 && (
                                <div className="settings-description wedocs-max-w-[490px] wedocs-ml-auto">
                                    <div className="active-roles wedocs-inline-flex wedocs-flex-wrap wedocs-items-center wedocs-gap-2.5">
                                        { field?.permissionObj?.map(
                                          ( role, index ) => (
                                            <span
                                              key={ index }
                                              className="wedocs-inline-flex wedocs-items-center wedocs-gap-1 wedocs-rounded-md wedocs-bg-gray-100 wedocs-px-2.5 wedocs-py-0.5 wedocs-text-sm wedocs-text-gray-800"
                                            >
                                                { sprintf(
                                                    __(
                                                      '%s',
                                                      'wedocs'
                                                    ),
                                                    role
                                                      .charAt( 0 )
                                                      .toUpperCase() +
                                                    role.slice(
                                                      1
                                                    )
                                                ) }
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  fill="none"
                                                  viewBox="0 0 24 24"
                                                  strokeWidth={
                                                      1.5
                                                  }
                                                  stroke="currentColor"
                                                  className="wedocs-w-4 wedocs-h-4 wedocs-cursor-pointer"
                                                >
                                                    <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </span>
                                          )
                                        ) }
                                    </div>
                                </div>
                              ) }
                        </div>
                      ) ) }
                    <Overlay classes={ `${ showOverlay ? 'wedocs-flex wedocs-items-center wedocs-justify-center' : 'wedocs-hidden' }` } />
                </div>
            </div>
        </section>
    );
};

export default PermissionSettings;
