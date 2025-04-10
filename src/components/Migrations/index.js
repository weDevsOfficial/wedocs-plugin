import { __ } from '@wordpress/i18n';
import { Link } from 'react-router-dom';
import { Fragment, useEffect, useState } from '@wordpress/element';
import MigrationProgressModal from './Modals/MigrationProgressModal';
import MigrationSelectionModal from './Modals/MigrationSelectionModal';
import { dispatch, resolveSelect, useSelect } from '@wordpress/data';
import docsStore from '../../data/docs';
import MigrationContentMappingModal from './Modals/MigrationContentMappingModal';
import apiFetch from '@wordpress/api-fetch';
import WedocsPromoNotice from '../WedocsPromoNotice';

const Migrate = () => {
    const [ migratedId, setMigratedId ] = useState( 0 );
    const [ migratedDocTitle, setMigratedDocTitle ] = useState( '' );
    const [ needMigrate, setNeedMigrate ] = useState( false );
    const [ migrationProgress, setMigrationProgress ] = useState( 0 );
    const [ showMigrationMap, setShowMigraitonMap ] = useState( false );
    const [ migrationSuccess, setMigrationSuccess ] = useState( false );
    const [ openProgressModal, setOpenProgressModal ] = useState( false );
    const [ openSelectionModal, setOpenSelectionModal ] = useState( false );

    useEffect( () => {
        jQuery.ajax( {
            url      : ajaxurl,
            type     : 'POST',
            data     : { action : 'wedocs_check_need_betterdocs_migration' },
            dataType : 'json',
            success  : ( response ) => {
                setNeedMigrate( response?.data?.success );
                setMigratedId( response?.data?.parent_id );
            },
        } );
    }, [] );

    useEffect( () => {
        if ( !Boolean( migratedId ) ) return;

        apiFetch({
            path: '/wp/v2/docs/' + migratedId,
        })
        .then( ( doc ) => setMigratedDocTitle( doc?.title?.rendered ) )
        .catch( ( err ) => {} );
    }, [ migratedId ] )

    const handleMigrateClick = ( parentTitle = '', progressData = {} ) => {
        if ( ! openProgressModal ) {
            setShowMigraitonMap( false );
            setOpenProgressModal( true );
        }

        const { migrated_length } = progressData;

        const data = {
            action            : 'wedocs_migrate_betterdocs_to_wedocs',
            migratedDocLength : migrated_length,
        };

        // Add parent title for migration.
        if ( parentTitle?.length > 0 ) data.parentTitle = parentTitle;

        jQuery.ajax( {
            data,
            url     : ajaxurl,
            type    : 'POST',
            success : ( { success, data = {} } ) => {
                if ( ! success ) return;
                setMigrationProgress( data?.progress );
                if ( data?.progress && data?.progress !== 100 ) {
                    handleMigrateClick( '', { ...data } );
                }

                if ( data?.progress && data?.progress === 100 ) {
                    dispatch( docsStore ).updateParentDocs().then( ( docs ) => {
                        setNeedMigrate( false );
                        setMigrationSuccess( true );
                    } );
                }
            },
        } );
    };

    const handleBackToDocPageClick = ( event ) => {
        event.preventDefault();

        const $ = jQuery;
        const { origin, pathname, search } = window.location;
        const menuRoot = $( '#toplevel_page_wedocs' );
        $( 'ul.wp-submenu li', menuRoot ).removeClass( 'current' );
        menuRoot.find( 'li.wp-first-item' ).addClass( 'current' );

        window.location.href = `${ origin + pathname + search }#/`;
    };

    return (
        <div className='w-full mt-7'>
          { <WedocsPromoNotice />}
            <div className='shadow sm:overflow-hidden sm:rounded-md'>
                <div className='space-y-6 h-[80vh] flex justify-center align-center bg-white px-4 py-5 sm:p-6'>
                    <div className='w-[800px] text-center self-center mt-1 px-6 py-12'>
                        <h2 className='mb-16'>
                            { migrationSuccess ? (
                                <svg width='65' height='65' viewBox='0 0 65 65' fill='none' className='mx-auto mb-10'>
                                    <circle cx='32.0957' cy='32.8599' r='32' fill='url(#paint0_linear_3069_18418)' />
                                    <path d='M24.9883 31.2202L30.0747 36.3066L39.1784 27.2029' stroke='white' strokeWidth='5' strokeLinecap='round' />
                                    <defs>
                                        <linearGradient id='paint0_linear_3069_18418' x1='32.0957' y1='0.859863' x2='32.0957' y2='64.8599' gradientUnits='userSpaceOnUse'>
                                            <stop stopColor='#23D88B' />
                                            <stop offset='1' stopColor='#22B591' />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            ) : (
                                <svg width='280' className='mx-auto mb-10' height='157' fill='none'>
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
                            ) }
                            <p className={ `${ migrationSuccess ? 'text-[#111827]' : 'text-[#3B3F4A]' } font-bold text-2xl mx-auto mb-3` }>
                                { migrationSuccess ? __( 'Migration has been successful', 'wedocs' ) : __( 'Migrate existing docs from BetterDocs to weDocs', 'wedocs' ) }
                            </p>
                            <p className='text-[#666B79] text-lg mx-auto'>
                                { !migrationSuccess && (
                                    <a
                                        href='//wedocs.co/docs/wedocs/migration/how-to-migrate-documentation-from-betterdocs-to-wedocs/'
                                        className='text-[#0043FF] !shadow-none'
                                        target='_blank'
                                        rel='noreferrer'
                                    >
                                        { __( 'Learn more ', 'wedocs' ) }
                                    </a>
                                ) }
                                { migrationSuccess ? __( 'All existing docs have been successfully migrated from BetterDocs to weDocs.', 'wedocs' ) : __( 'how to migrate docs', 'wedocs' ) }
                            </p>
                        </h2>
                        { needMigrate ? (
                            <Fragment>
                                <MigrationSelectionModal
                                    openSelectionModal={ openSelectionModal }
                                    isMigrationDone={ needMigrate === 'done' }
                                    setShowMigrationMap={ setShowMigraitonMap }
                                    setOpenSelectionModal={ setOpenSelectionModal }
                                    className={ `bg-indigo-600 inline-flex gap-3 cursor-pointer items-center focus:ring-0 rounded-md border border-transparent px-6 py-2.5 text-base text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2` }
                                >
                                    { needMigrate === 'done' ? (
                                        <Fragment>
                                            <svg width='17' height='17' fill='none'>
                                                <path
                                                    fill='#fff'
                                                    fillRule='evenodd'
                                                    d='M8.096 16.329a8 8 0 0 0 0-16 8 8 0 0 0-8 8 8 8 0 0 0 8 8zm3.707-9.293a1 1 0 0 0-1.414-1.414L7.096 8.915 5.803 7.622a1 1 0 1 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4z'
                                                />
                                            </svg>
                                            { __( `Already Migrated`, 'wedocs' ) }
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <svg
                                                width='21'
                                                height='21'
                                                fill='none'
                                                xmlns='http://www.w3.org/2000/svg'
                                            >
                                                <path
                                                    fill='#fff'
                                                    fillRule='evenodd'
                                                    d='M12.389 5.622a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414l2.293-2.293H3.096a1 1 0 0 1 0-2h11.586l-2.293-2.293a1 1 0 0 1 0-1.414z'
                                                />
                                            </svg>
                                            { __( `Start Migration`, 'wedocs' ) }
                                        </Fragment>
                                    ) }
                                </MigrationSelectionModal>
                                <MigrationContentMappingModal
                                    migratedDocTitle={ migratedDocTitle }
                                    showMigrationMap={ showMigrationMap }
                                    handleMigrateClick={ handleMigrateClick }
                                    setShowMigrationMap={ setShowMigraitonMap }
                                />
                                <MigrationProgressModal
                                    openProgressModal={ openProgressModal }
                                    migrationProgress={ migrationProgress }
                                    setOpenProgressModal={ setOpenProgressModal }
                                />
                            </Fragment>
                        ) : (
                            <Fragment>
                                { migrationSuccess ? (
                                    <a
                                        href={ '#' }
                                        onClick={ handleBackToDocPageClick }
                                        className="inline-flex gap-3 items-center rounded-md border border-transparent bg-indigo-600 hover:text-white focus:text-white px-6 py-2.5 text-base text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M6.30281 10.567C5.91229 10.9575 5.27912 10.9575 4.8886 10.567L0.888597 6.56697C0.498072 6.17645 0.498072 5.54328 0.888597 5.15276L4.8886 1.15276C5.27912 0.762232 5.91229 0.762232 6.30281 1.15276C6.69334 1.54328 6.69334 2.17645 6.30281 2.56697L4.00992 4.85986L15.5957 4.85986C16.148 4.85986 16.5957 5.30758 16.5957 5.85986C16.5957 6.41215 16.148 6.85986 15.5957 6.85986L4.00992 6.85986L6.30281 9.15276C6.69334 9.54328 6.69334 10.1764 6.30281 10.567Z" fill="white" />
                                        </svg>
                                        { __( 'Go back to Docs', 'wedocs' ) }
                                    </a>
                                ) : (
                                    <button
                                        type='submit'
                                        disabled={ true }
                                        className={ `disabled:bg-[#F2F2F2] inline-flex gap-3 items-center focus:ring-0 rounded-md border border-transparent px-6 py-2.5 text-base text-[#B4BBD6] shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2` }
                                    >
                                        <svg
                                            width='21'
                                            height='21'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path
                                                fill='#B4BBD6'
                                                fillRule='evenodd'
                                                d='M12.389 5.622a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414l2.293-2.293H3.096a1 1 0 0 1 0-2h11.586l-2.293-2.293a1 1 0 0 1 0-1.414z'
                                            />
                                        </svg>
                                        { __( `Migration not required`, 'wedocs' ) }
                                    </button>
                                ) }
                            </Fragment>
                        ) }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Migrate;
