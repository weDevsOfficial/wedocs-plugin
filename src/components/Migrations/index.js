import Swal from 'sweetalert2';
import { __ } from '@wordpress/i18n';
import settingsStore from '../../data/settings';
import { dispatch, useSelect } from '@wordpress/data';
import MigrationConfirmationModal from './MigrationConfirmationModal';
import { useEffect, useState } from '@wordpress/element';

const Migrate = () => {
    const { need_migrate, status } = useSelect(
        ( select ) => select( settingsStore ).getMigrateInfo(),
        []
    );

    if ( status === 'done' ) {
        dispatch( settingsStore )
            .makeMigrateDone()
            .then( ( result ) => {
                if ( result ) {
                    Swal.fire( {
                        icon: 'success',
                        text: __( 'Betterdocs to weDocs migration has been successfully done.', 'wedocs' ),
                        title: __( 'Database Migrated!', 'wedocs' ),
                        toast: true,
                        timer: 3000,
                        position: 'bottom-end',
                        showConfirmButton: false,
                    } );
                }
            } )
            .catch( ( err ) => {} );
    }

    return (
        <div className="w-full mt-7">
            <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 h-[80vh] flex justify-center align-center bg-white px-4 py-5 sm:p-6">
                    <div className="w-[600px] text-center self-center mt-1 px-6 py-12">
                        <h2 className="mb-6">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="194"
                                height="136"
                                fill="none"
                                className="mx-auto mb-6"
                            >
                                <path
                                    d="M192.481 72.21l-.354 2.079c-.909 4.246-2.367 8.355-4.336 12.225v.002c-.561 1.109-1.161 2.202-1.8 3.28-1.863 3.13-3.996 6.092-6.374 8.852-1.445 1.689-2.984 3.326-4.619 4.911-7.077 6.885-15.794 12.773-25.36 17.536-1.797.896-3.622 1.75-5.476 2.563-5.868 2.572-11.909 4.731-18.077 6.461l-3.838 1.021c-2.226.56-4.461 1.063-6.691 1.506a134.53 134.53 0 0 1-9.008 1.486c-3.825.498-7.618.814-11.335.951a129.13 129.13 0 0 1-13.315-.225c-2.273-.149-4.58-.36-6.906-.63a145.95 145.95 0 0 1-6.245-.853l-1.713-.283a140.49 140.49 0 0 1-11.59-2.491 3.2 3.2 0 0 1-.208-.056.91.91 0 0 1-.115-.028c-.108-.027-.216-.055-.323-.087-3.421-.905-6.801-1.947-10.107-3.131-2.326-.831-4.616-1.734-6.851-2.709a94.75 94.75 0 0 1-3.15-1.437c-.949-.453-1.886-.92-2.812-1.402-5.464-2.836-10.49-6.154-14.834-9.977-1.967-1.726-3.81-3.589-5.515-5.575a45.85 45.85 0 0 1-6.509-9.903c-.852-1.765-1.577-3.589-2.17-5.457a42.48 42.48 0 0 1-.678-2.362A50.47 50.47 0 0 1 .656 77.308c-.024-.903-.024-1.81 0-2.721a52.21 52.21 0 0 1 1.09-9.434c1.722-8.181 5.486-15.749 11.516-20.796 10.383-8.696 26.412-9.012 36.341-8.183 3.869.323 6.813.819 8.136 1.064 1.967.362 3.893.81 5.84 1.279 7.218 1.737 14.74 3.744 25.693 2.513 1.14-.129 5.115-.609 12.39-2.633 5.436-1.474 10.747-3.374 15.886-5.68l.682-.311 1.692-.803.417-.204 3.143-1.598h.004l.106-.057.405-.213c.013-.006.026-.013.038-.022l4.147-2.206.824-.431.575-.295.393-.201h.002c.8-.402 1.596-.791 2.408-1.16a44.5 44.5 0 0 1 3.938-1.588c1.088-.381 2.226-.726 3.443-1.035 12.064-3.069 30.105-2.089 41.582 8.533 9.348 8.655 11.605 21.175 11.782 30.513a66.4 66.4 0 0 1-.647 10.572z"
                                    fill="url(#A)"
                                    fillOpacity=".2"
                                />
                                <path
                                    d="M133.086 124.617H38.875a11.12 11.12 0 0 1-11.084-11.084V35.948h27.266c3.658 0 7.204 1.884 9.2 4.988l4.544 6.761c2.106 3.104 5.542 4.988 9.2 4.988h38.46a11.12 11.12 0 0 1 11.084 11.084v47.549c0 4.987 1.995 9.753 5.541 13.3z"
                                    fill="url(#B)"
                                />
                                <g fill="#898989">
                                    <path d="M128.875 127.942h-90a14.38 14.38 0 0 1-14.409-14.409V35.948c0-1.884 1.441-3.325 3.325-3.325h27.266c4.877 0 9.31 2.438 11.97 6.429l4.544 6.761c1.441 2.217 3.879 3.436 6.429 3.436h38.46a14.38 14.38 0 0 1 14.409 14.409v38.793c0 1.884-1.441 3.325-3.326 3.325s-3.325-1.441-3.325-3.325V63.657a7.71 7.71 0 0 0-7.758-7.759h-38.35c-4.877 0-9.31-2.438-11.97-6.429l-4.544-6.761c-1.441-2.217-3.879-3.436-6.428-3.436H31.117v74.26a7.71 7.71 0 0 0 7.759 7.759h90c3.879 0 7.204-2.882 7.647-6.761l8.313-60.96c.222-2.217-.443-4.434-1.884-6.096s-3.547-2.66-5.764-2.66c-1.884 0-3.325-1.441-3.325-3.325s1.441-3.325 3.325-3.325c4.101 0 8.091 1.773 10.751 4.877 2.771 3.103 3.991 7.204 3.547 11.305l-8.313 60.96c-.886 7.204-7.093 12.635-14.297 12.635z" />
                                    <path d="M137.187 44.815H65.476c-1.884 0-3.325-1.441-3.325-3.325s1.441-3.325 3.325-3.325h71.711c1.885 0 3.325 1.441 3.325 3.325s-1.551 3.325-3.325 3.325z" />
                                </g>
                                <circle cx="158.425" cy="31.314" r="30.886" fill="url(#C)" />
                                <path
                                    d="M150.8 32.481h6.457v6.601h2.335v-6.601h6.457v-2.335h-6.457v-6.601h-2.335v6.601H150.8v2.335z"
                                    fill="#fff"
                                />
                                <defs>
                                    <linearGradient
                                        id="A"
                                        x1="45.819"
                                        y1="233.312"
                                        x2="77.401"
                                        y2="10.643"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#9743ed" />
                                        <stop offset="1" stopColor="#9743ed" stopOpacity="0" />
                                    </linearGradient>
                                    <linearGradient
                                        id="B"
                                        x1="77.835"
                                        y1="124.617"
                                        x2="74.044"
                                        y2="96.278"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#fff" stopOpacity="0" />
                                        <stop offset="1" stopColor="#fff" />
                                    </linearGradient>
                                    <linearGradient
                                        id="C"
                                        x1="169.738"
                                        y1="-16.997"
                                        x2="92.091"
                                        y2="112.101"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#fffefe" />
                                        <stop offset=".386" stopColor="#efc561" />
                                        <stop offset="1" stopColor="#ff3f00" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <p className="text-[#3B3F4A] font-bold text-2xl mx-auto mb-2">
                                { __( 'Get started betterdocs to weDocs mirgration', 'wedocs' ) }
                            </p>
                            <p className="text-[#666B79] text-lg mx-auto">
                                <a
                                    href="https://wedocs.co/docs/wedocs/how-to/how-to-create-a-doc/"
                                    className="text-[#0043FF] !shadow-none"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    { __( 'Learn More ', 'wedocs' ) }
                                </a>
                                { __( 'how to create a new doc', 'wedocs' ) }
                            </p>
                        </h2>
                        { need_migrate ? (
                            <MigrationConfirmationModal className={ `bg-indigo-600 inline-flex items-center focus:ring-0 rounded-md border border-transparent px-6 py-2.5 text-base text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2` }>
                                { __( `Migrat${ status === 'running' ? 'ing...' : 'e' }`, 'wedocs' ) }
                            </MigrationConfirmationModal>
                        ) : (
                            <button
                                type='submit'
                                disabled={ true }
                                className={ `disabled:bg-gray-600 inline-flex items-center focus:ring-0 rounded-md border border-transparent px-6 py-2.5 text-base text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2` }
                            >
                                { __( `Migration not required`, 'wedocs' ) }
                            </button>
                        ) }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Migrate;
