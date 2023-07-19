import logo from '../assets/img/wedocs.svg';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { InformationCircleIcon } from '@heroicons/react/20/solid';
import ConfirmationModal from './ConfirmationModal';

const Upgrade = ( { status } ) => {
  const [ showUpgrader, setShowUpgrader ] = useState( true );

  return (
    <>
      { showUpgrader && (
        <div className="border-l-4 border-indigo-600 rounded-md bg-white p-4 mb-7">
          <div className="flex space-x-8">
            <div className="flex flex-shrink-0 relative items-center">
              <InformationCircleIcon
                className="h-5 w-5 mt-0.5 text-indigo-600 bg-white absolute -right-1 -top-1 rounded-full z-[1]"
                aria-hidden="true"
              />
              <div className="avatar">
                <div className="w-24 h-24 mask mask-squircle">
                  <img src={ logo } alt={ __( 'Wedocs Logo', 'wedocs' ) } />
                </div>
              </div>
            </div>
            <div className="ml-3 w-full">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-semibold">
                  { __( 'weDocs Data Update Required', 'wedocs' ) }
                </h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={ () => setShowUpgrader( false ) }
                  fill="#4F46E5"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6 text-white cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="mt-2 text-base">
                <p>
                  { __(
                    "A database upgrade is required. If you don't upgrade, you may experience unexpected behaviour while using weDocs.",
                    'wedocs'
                  ) }
                </p>
              </div>
              <div className="mt-4">
                <div className="-mx-1 -mt-1 flex">
                  <ConfirmationModal className={ `px-2 py-1.5 h-fit inline-flex items-center rounded-md border border-transparent bg-indigo-600 ease-in-out duration-200 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-75 disabled:hover:bg-indigo-600` }>
                    { __( `Updat${ status === 'running' ? 'ing...' : 'e' }`, 'wedocs' ) }
                  </ConfirmationModal>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) }
    </>
  );
};

export default Upgrade;
