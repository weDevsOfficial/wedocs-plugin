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
        <div className="wedocs-border-l-4 wedocs-border-indigo-600 wedocs-rounded-md wedocs-bg-white wedocs-p-4 wedocs-mb-7">
          <div className="wedocs-flex wedocs-space-x-8">
            <div className="wedocs-flex wedocs-flex-shrink-0 wedocs-relative wedocs-items-center">
              <InformationCircleIcon
                className="wedocs-h-5 wedocs-w-5 wedocs-mt-0.5 wedocs-text-indigo-600 wedocs-bg-white wedocs-absolute wedocs--right-1 wedocs--top-1 wedocs-rounded-full wedocs-z-[1]"
                aria-hidden="true"
              />
              <div className="avatar">
                <div className="wedocs-w-24 wedocs-h-24 mask mask-squircle">
                  <img src={ logo } alt={ __( 'Wedocs Logo', 'wedocs' ) } />
                </div>
              </div>
            </div>
            <div className="wedocs-ml-3 wedocs-w-full">
              <div className="wedocs-flex wedocs-justify-between wedocs-items-center">
                <h3 className="wedocs-text-base wedocs-font-semibold">
                  { __( 'weDocs Data Update Required', 'wedocs' ) }
                </h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={ () => setShowUpgrader( false ) }
                  fill="#4F46E5"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="wedocs-w-6 wedocs-h-6 wedocs-text-white wedocs-cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="wedocs-mt-2 wedocs-text-base">
                <p>
                  { __(
                    "A database upgrade is required. If you don't upgrade, you may experience unexpected behaviour while using weDocs.",
                    'wedocs'
                  ) }
                </p>
              </div>
              <div className="wedocs-mt-4">
                <div className="wedocs--mx-1 wedocs--mt-1 wedocs-flex">
                  <ConfirmationModal className={ `wedocs-px-2 wedocs-py-1.5 wedocs-h-fit wedocs-inline-flex wedocs-items-center wedocs-rounded-md wedocs-border wedocs-border-transparent wedocs-bg-indigo-600 wedocs-ease-in-out wedocs-duration-200 wedocs-px-4 wedocs-text-sm wedocs-font-medium wedocs-text-white wedocs-shadow-sm hover:wedocs-bg-indigo-700 focus:wedocs-outline-none focus:wedocs-ring-2 focus:wedocs-ring-indigo-500 focus:wedocs-ring-offset-2 disabled:wedocs-opacity-75 disabled:hover:wedocs-bg-indigo-600` }>
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
