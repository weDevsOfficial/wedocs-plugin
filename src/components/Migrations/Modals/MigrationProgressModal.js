import { __ } from '@wordpress/i18n';
import ProgressBar from '../ProgressBar';
import { Fragment } from '@wordpress/element';
import { Dialog, Transition } from '@headlessui/react';

const MigrationProgressModal = ( {
    migrationProgress,
    openProgressModal,
    setOpenProgressModal
} ) => {
    return (
        <Transition
            appear
            as={ Fragment }
            show={ openProgressModal }
        >
            <Dialog
                as="div"
                className="wedocs-document wedocs-relative wedocs-z-[9999]"
                onClose={ () => setOpenProgressModal( false ) }
            >
                <Transition.Child
                    as={ Fragment }
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="wedocs-fixed wedocs-inset-0 wedocs-bg-black wedocs-bg-opacity-25 wedocs-z-[50]" />
                </Transition.Child>

                <div className="wedocs-fixed wedocs-inset-0 wedocs-overflow-y-auto wedocs-z-[100]">
                    <div className="wedocs-flex wedocs-min-h-full wedocs-items-center wedocs-justify-center wedocs-p-4">
                        <Transition.Child
                            as={ Fragment }
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="wedocs-w-[900px] wedocs-transform wedocs-overflow-hidden wedocs-rounded-2xl wedocs-bg-white wedocs-align-middle wedocs-shadow-xl wedocs-transition-all">
                                <div className="sm:wedocs-flex sm:wedocs-items-start sm:wedocs-justify-center wedocs-py-12 wedocs-px-9">
                                    <div className="wedocs-mt-3 wedocs-text-center sm:wedocs-mt-0 sm:wedocs-text-left">
                                        <Dialog.Title
                                            as="h3"
                                            className="wedocs-text-2xl wedocs-text-center wedocs-font-bold wedocs-leading-7 wedocs-text-gray-900 wedocs-mb-4 wedocs-text-[#111827]"
                                        >
                                            { __( 'Migrating Docs...', 'wedocs' ) }
                                        </Dialog.Title>
                                        <p className="wedocs-text-gray-500 wedocs-text-center wedocs-text-base wedocs-leading-6">
                                            { __(
                                                'Migrating existing docs from BetterDocs to weDocs',
                                                'wedocs'
                                            ) }
                                        </p>
                                    </div>
                                </div>

                                <div className={ `progressing-body wedocs-px-16` }>
                                    {/* Render migrating svg. */}
                                    <svg width='280' className='wedocs-mx-auto wedocs-mb-6' height='157' fill='none'>
                                        <path
                                            fill='url(#A)'
                                            fillOpacity='.1'
                                            d='M12.553 86.533l.484-2.838a68.26 68.26 0 0 1 5.918-16.685v-.003a75.8 75.8 0 0 1 2.455-4.476c2.544-4.272 5.455-8.315 8.701-12.081a98.74 98.74 0 0 1 6.304-6.703c9.659-9.397 21.557-17.434 34.613-23.934a166.98 166.98 0 0 1 7.475-3.499 187.74 187.74 0 0 1 24.673-8.818l5.238-1.393a185.07 185.07 0 0 1 9.132-2.057 184.1 184.1 0 0 1 12.294-2.027c5.222-.68 10.397-1.112 15.472-1.298 6.059-.21 12.125-.108 18.173.307 3.103.203 6.252.49 9.426.86.016-.002.02-.002.023 0 2.815.324 5.649.712 8.501 1.164l2.338.386a191.49 191.49 0 0 1 15.819 3.4 4.38 4.38 0 0 1 .284.075c.053.01.106.023.157.039.148.036.295.075.442.118 4.669 1.236 9.282 2.658 13.795 4.273 3.174 1.135 6.3 2.367 9.351 3.698 1.452.631 2.885 1.285 4.3 1.962 1.294.618 2.574 1.256 3.838 1.913 7.458 3.871 14.318 8.4 20.246 13.618 2.685 2.356 5.2 4.898 7.527 7.608 3.533 4.102 6.52 8.646 8.884 13.517a56.59 56.59 0 0 1 2.962 7.448 57.68 57.68 0 0 1 .925 3.224 68.9 68.9 0 0 1 2.067 15.243 71.87 71.87 0 0 1 0 3.714c-.104 4.328-.602 8.638-1.488 12.876-2.351 11.166-7.488 21.495-15.717 28.384-14.171 11.869-36.049 12.301-49.602 11.17-5.28-.442-9.298-1.119-11.103-1.452-2.685-.494-5.314-1.105-7.972-1.746-9.851-2.371-20.118-5.111-35.067-3.43-1.557.176-6.981.83-16.911 3.593-7.419 2.013-14.668 4.605-21.681 7.753l-.932.425-2.309 1.095-.568.278a175.8 175.8 0 0 0-4.29 2.181h-.007l-.144.078-.552.291c-.019.008-.036.018-.053.03l-5.659 3.011-1.125.589-.785.402-.536.275h-.003a91.39 91.39 0 0 1-3.286 1.582 60.81 60.81 0 0 1-5.375 2.168 55.09 55.09 0 0 1-4.698 1.412c-16.466 4.189-41.09 2.852-56.755-11.646-12.758-11.814-15.838-28.901-16.08-41.646a90.62 90.62 0 0 1 .883-14.429z'
                                        />
                                        <path
                                            fill='#eac250'
                                            d='M61.075 86.134V74.3a1.84 1.84 0 0 0-2.123-1.816l-27.915 4.263c-.979.149-1.891-.498-2.082-1.468l-.265-1.352c-.191-.987-1.136-1.634-2.123-1.46L2.434 76.705c-.97.174-1.642 1.078-1.509 2.057l5.888 43.713 54.262-36.341z'
                                        />
                                        <path
                                            fill='#fff'
                                            d='M6.821 113.701L4.416 81.897l62.315-8.086.456 29.78-60.366 10.11z'
                                        />
                                        <path
                                            fill='#ebf2ff'
                                            d='M30.995 98.259s.257-25.46 5.681-37.037l26.19 1.841s-7.447 26.928-5.424 33.819l-26.447 1.377z'
                                        />
                                        <path
                                            fill='#fadf68'
                                            d='M6.829 95.149l-.017 29.806c0 1.409 1.252 2.496 2.646 2.289l56.559-8.36c1.095-.166 1.924-1.078 1.974-2.181l1.667-37.278a2.31 2.31 0 0 0-2.621-2.397l-26.936 3.632c-.63.083-1.203.431-1.576.954l-5.092 7.174c-.373.522-.937.862-1.576.954L8.836 92.86c-1.153.158-2.007 1.128-2.007 2.289z'
                                        />
                                        <path
                                            fill='#c8a339'
                                            fillRule='evenodd'
                                            d='M27.424 109.692v1.402c.29 1.012.763 1.899 1.659 2.538.481.34 1.028.514 1.576.688h11.728c.929-.232 1.791-.589 2.546-1.211 1.783-1.476 2.38-4.122 1.385-6.22l-.912-1.9a.65.65 0 0 1 .017-.721l.818-1.39v-.001l.244-.426c1.568-2.728-.299-5.979-3.442-5.988a690.45 690.45 0 0 0-5.864 0c-1.501.008-2.671.663-3.425 1.941l-3.599 6.173h0 0 0l-2.215 3.813c-.178.318-.293.656-.408.995l-.106.307zm7.548 2.719l-.673.01-.953.002h0 0c-.632.001-1.262.003-1.892-.002-1.75-.025-2.679-1.642-1.808-3.16l5.714-9.853c.398-.697 1.02-1.045 1.841-1.045l2.495.001 3.327.007c1.75.017 2.662 1.65 1.783 3.176l-2.353 4.049h0l-.004.006-1.483 2.547-.526.893a50.95 50.95 0 0 0-1.166 2.035c-.498.929-1.219 1.402-2.297 1.344l-2.006-.01h0zm3.45-9.551l.771-.002.59.001 1.774-.009c.622 0 1.012-.365.995-.904-.017-.523-.39-.863-1.004-.863a454.26 454.26 0 0 0-4.669 0c-.622 0-1.028.365-1.028.887s.406.88 1.028.888l1.543.002zm-1.194 3.382l-.787.002h0c-.523.001-1.044.003-1.569-.002-.589-.009-1.004-.365-1.004-.863 0-.531.398-.904 1.012-.904h4.661c.614 0 1.02.365 1.02.896 0 .547-.381.871-1.02.879-.386 0-.771-.002-1.157-.004h-.001l-1.157-.004zM32.79 109.7h2.438l.591.001 1.756-.009c.581-.008.987-.373.987-.879s-.406-.888-.987-.888l-3.159-.001-1.585.001c-.29 0-.547.067-.738.299-.224.274-.299.589-.149.921a.86.86 0 0 0 .846.555z'
                                        />
                                        <path
                                            fill='#ebf2ff'
                                            d='M108.901 39.013L90.358 51.32a52.57 52.57 0 0 0-5.059-3.052c-16.089-8.442-25.684-.979-28.296 1.559 5.399-5.789 11.42-9.33 17.382-11.395 17.266-6.013 34.068.357 34.516.581z'
                                        />
                                        <path
                                            fill='#7a8aee'
                                            d='M85.299 48.268s-5.49 1.766-6.991 6.162l-22.027-3.831.008-.025c.025-.008.033-.033.042-.041l.315-.34.199-.207c.041-.058.099-.108.157-.158 2.612-2.529 12.208-10.001 28.296-1.559z'
                                        />
                                        <path
                                            fill='#ebf2ff'
                                            d='M154.729 36.525s-17.946 13.062-29.308 4.138L102.872 54.43c15.657 10.847 32.26-.929 51.857-17.905z'
                                        />
                                        <path
                                            fill='#7a8aee'
                                            d='M154.729 36.525l-22.391 11.561s1.434 3.865-5.126 7.87c9.728-4.818 18.851-11.436 27.517-19.431z'
                                        />
                                        <path
                                            fill='#ebf2ff'
                                            d='M226.316 18.637l-29.814 11.519s-5.466-6.842-14.77-8.335c-2.364-.398-4.96-.431-7.788.075l-.24.041-1.228.265c0 0 21.728-9.819 31.075-10.889 15.392-1.791 22.765 7.323 22.765 7.323z'
                                        />
                                        <path
                                            fill='#7a8aee'
                                            d='M181.731 21.821l-1.384 1.965-23.959 7.862c7.049-6.104 16.088-9.446 16.088-9.446l1.228-.265.24-.041c2.82-.506 5.424-.473 7.787-.075z'
                                        />
                                        <path
                                            fill='#eac250'
                                            d='M275.354 67.229a4 4 0 0 1 3.918 4.011l-.154 51.575-72.905-21.595-5.851-33.402a4 4 0 0 1 3.708-4.683l33.281-1.928c1.644-.095 3.095 1.063 3.367 2.686.257 1.529 1.565 2.659 3.115 2.691l31.521.645z'
                                        />
                                        <path
                                            fill='#7a8aee'
                                            d='M264.895 85.247s-6.659-28.52-11.511-35.768l-35.337 5.515s12.415 26.314 14.596 40.296l32.202-9.711'
                                        />
                                        <path
                                            fill='#ebf2ff'
                                            d='M241.475 77.394s-6.659-28.52-11.511-35.768l-35.337 5.515c.747.224 12.166 20.783 14.596 40.296l32.203-9.711'
                                        />
                                        <path
                                            fill='#cedcf9'
                                            d='M202.73 53.6l-.174-.672c6.261-1.592 19.547-3.566 27.284-3.715l.017.697c-7.572.141-21.032 2.14-27.127 3.691zm1.012 3.301l-.175-.672c6.262-1.592 19.547-3.566 27.285-3.715l.016.697c-7.571.149-21.031 2.14-27.126 3.691zm1.011 3.301l-.174-.672c6.261-1.592 19.547-3.566 27.285-3.715l.016.697c-7.563.149-21.031 2.14-27.127 3.69zm1.012 3.309l-.174-.672c6.261-1.592 19.547-3.566 27.284-3.715l.017.697c-7.563.141-21.023 2.14-27.127 3.69zm1.012 3.3l-.174-.672c6.261-1.592 19.547-3.566 27.284-3.715l.017.697c-7.564.141-21.023 2.14-27.127 3.691zm1.012 3.301l-.175-.672c6.262-1.592 19.547-3.566 27.285-3.715l.016.697c-7.563.149-21.023 2.14-27.126 3.69zm1.02 3.301l-.175-.672c6.262-1.592 19.547-3.566 27.285-3.715l.017.697c-7.572.149-21.032 2.14-27.127 3.691zm1.011 3.3l-.174-.672c6.262-1.592 19.547-3.566 27.285-3.715l.016.697c-7.571.149-21.031 2.14-27.127 3.69z'
                                        />
                                        <path
                                            fill='#fadf68'
                                            d='M270.839 72.819a4 4 0 0 0-3.877-3.346l-27.321-.475a4 4 0 0 0-2.378.733l-8.501 6.007c-.618.436-1.346.689-2.101.728l-23.056 1.199a4 4 0 0 0-3.734 4.674l6.956 40.334 72.291.141-8.279-49.996z'
                                        />
                                        <defs>
                                            <linearGradient id='A' x1='80.292' y1='83.873' x2='93.014' y2='179.78' gradientUnits='userSpaceOnUse'>
                                                <stop stopColor='#7a8aee' stopOpacity='0' />
                                                <stop offset='1' stopColor='#7a8aee' />
                                            </linearGradient>
                                        </defs>
                                    </svg>

                                    {/* Render migration progress bar. */}
                                    <ProgressBar progress={ migrationProgress } />
                                </div>

                                <hr className={ `wedocs-mt-14 wedocs-w-full` } />
                                <div className="wedocs-space-x-3.5 wedocs-text-center wedocs-px-[70px] wedocs-mb-5 sm:wedocs-flex sm:wedocs-items-start sm:wedocs-justify-end">
                                    <div className="wedocs-mt-5 wedocs-space-x-3.5 wedocs-text-center">
                                        <button
                                            className="wedocs-bg-white hover:wedocs-bg-gray-200 wedocs-text-gray-700 wedocs-font-medium wedocs-text-base wedocs-py-2 wedocs-px-5 wedocs-border wedocs-border-gray-300 wedocs-rounded-md"
                                            onClick={ () => setOpenProgressModal( false ) }
                                        >
                                            { __( 'Cancel', 'wedocs' ) }
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default MigrationProgressModal;
