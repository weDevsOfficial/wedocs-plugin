import Swal from 'sweetalert2';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import RestictionModal from './RestrictionModal';
import { InformationCircleIcon } from '@heroicons/react/20/solid';
import ConfirmationModal from './ConfirmationModal';
import { dispatch } from '@wordpress/data';
import settingsStore from '../data/settings';

const Upgrade = () => {
  const [ showUpgrader, setShowUpgrader ] = useState( true );

  // const handleUpgraderClick = () => {
  // Swal({
  //     title: "Submit or Cancel",
  //     text: "Are you sure you want to submit this form?",
  //     icon: "info",
  //     buttons: ["Cancel", "Submit"],
  // })
  // .then((willSubmit) => {
  //     if (willSubmit) {
  //         swal("Success!", "Your form has been submitted.", "success");
  //     } else {
  //         swal("Cancelled", "Your form has not been submitted.", "error");
  //     }
  // });
  // Swal.fire( {
  //     title: __( 'Error', 'wedocs' ),
  //     text: 'Hello World',
  //     icon: 'info',
  //     toast: true,
  //     position: 'bottom-end',
  //     showConfirmButton: false,
  //     timer: 3000,
  //     buttons: ["Cancel", "Submit"],
  // });
  // Swal.fire({
  //     title: __( 'Error', 'wedocs' ),
  //     text: 'Hello World',
  //     icon: 'info',
  //     showCancelButton: true,
  //     confirmButtonText: __( 'Update', 'wedocs' ),
  //     cancelButtonText: __( 'Cancel', 'wedocs' ),
  // }).then((result) => {});
  // .then((willSubmit) => {
  //     if (willSubmit) {
  //         swal("Success!", "Your form has been submitted.", "success");
  //     } else {
  //         swal("Cancelled", "Your form has not been submitted.", "error");
  //     };
  // };

  return (
    <>
      { showUpgrader && (
        <div className="border-l-4 border-indigo-600 rounded-md bg-white p-4 mb-7">
          <div className="flex space-x-8">
            <div className="flex flex-shrink-0 relative items-center">
              <InformationCircleIcon
                className="h-5 w-5 mt-0.5 text-indigo-600 bg-white absolute -right-1 -top-1 rounded-full z-10"
                aria-hidden="true"
              />
              <div className="avatar">
                <div className="w-24 h-24 mask mask-squircle">
                  <img
                    src="https://ps.w.org/wedocs/assets/icon-256x256.png?rev=2281297"
                    alt=""
                  />
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
                    "A database upgrade is required. If you don't upgrade, you may experience errors while using weDocs.",
                    'wedocs'
                  ) }
                </p>
              </div>
              <div className="mt-4">
                <div className="-mx-1 -mt-1 flex">
                  <ConfirmationModal className="px-2 py-1.5 h-fit inline-flex items-center rounded-md border border-transparent bg-indigo-600 ease-in-out duration-200 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    { __( 'Update', 'wedocs' ) }
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
