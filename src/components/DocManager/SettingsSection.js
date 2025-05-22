import SettingsHeader from './SettingsHeader';
import PrivacySettings from './PrivacySettings';
import RoleManagementHeader from './RoleManagementHeader';
import RoleManagementSettings from './RoleManagementSettings';
import { __ } from '@wordpress/i18n';
import { dispatch, useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import Swal from 'sweetalert2';
import UpgradePopup from '../ProPreviews/common/UpgradePopup';

const SettingsSection = () => {
	const id = window.location.hash.split( '/' ).pop();

	const [ docStatus, setDocStatus ] = useState( 'publish' );
	const [ docPermission, setDocPermission ] = useState( 'global' );
	const [ statusChanged, setStatusChanged ] = useState( false );

	const [ permissionMeta, setPermissionMeta ] = useState( {
		key: 'wedocs_user_permission',
		value: docPermission,
	} );

	const roleCaps = {
		editor: 'view',
		author: 'view',
		custom: 'view',
		subscriber: 'view',
		contributor: 'view',
	};

	const [ roleCapSettings, setRoleCapSettings ] = useState( roleCaps );

	const [ roleCapSettingsMeta, setRoleCapSettingsMeta ] = useState( {
		key: 'wedocs_access_role_capabilities',
		value: roleCapSettings,
	} );

	const [ childrens, setChildrens ] = useState( [] );
	const allDocs = useSelect( ( select ) => select( 'wedocs/docs' ).getDocs(), [] ) || [];

	const handleRoleManagementSettings = ( e ) => {
		setDocPermission( e.target.value );
		setPermissionMeta( { ...permissionMeta, value: e.target.value } );
	};

	const handleRoleCapabilities = ( e ) => {
		setRoleCapSettings( {
			...roleCapSettings,
			[ e.target.name ]: e.target.value,
		} );
		setRoleCapSettingsMeta( {
			...roleCapSettingsMeta,
			value: { ...roleCapSettings, [ e.target.name ]: e.target.value },
		} );
	};

	const handlerClick = ( e ) => {
		if ( !isProLoaded && 'private' === e.target.name ) {
			setShowPopup( true );
			
			return;
		}
		
		setDocStatus( e.target.name );
		setStatusChanged( true );
	};

	const isProLoaded = wp.hooks.applyFilters(
		'wedocs_pro_loaded',
		false
	);

    const [ showPopup, setShowPopup ] = useState( false );

	useEffect( () => {
		if ( !isProLoaded ) {
			return;
		}

		// Update documentation permission meta.
		apiFetch( {
			path: '/wp/v2/docs/' + id + '/meta?key=' + permissionMeta.key,
		} )
			.then( ( result ) => {
				if ( result ) {
					setPermissionMeta( { ...permissionMeta, value: result } );
					setDocPermission( result );
				}
			} )
			.catch( ( err ) => {} );

		// Update documentation role capabilities meta.
		apiFetch( {
			path: '/wp/v2/docs/' + id + '/meta?key=' + roleCapSettingsMeta.key,
		} )
			.then( ( result ) => {
				if ( result ) {
					setRoleCapSettingsMeta( {
						...roleCapSettingsMeta,
						value: result,
					} );
					setRoleCapSettings( result );
				}
			} )
			.catch( ( err ) => {} );

		apiFetch( {
			path: '/wp/v2/docs/' + id,
		} )
			.then( ( result ) => {
				setDocStatus( result?.status );
			} )
			.catch( ( err ) => {} );
	}, [] );

	useEffect( () => {
		const sections = allDocs?.filter( ( doc ) => doc.parent === parseInt( id ) );
		const articles = [];
		const articlesChildrens = [];

		sections?.forEach( ( article ) => {
			const collection = allDocs.filter( ( doc ) => {
				return doc.parent === article.id;
			} );

			articles.push( ...collection );
		} );

		articles?.forEach( ( articleChildren ) => {
			const collection = allDocs.filter( ( doc ) => {
				return doc.parent === articleChildren.id;
			} );

			articlesChildrens.push( ...collection );
		} );

		setChildrens( [ ...sections, ...articles, ...articlesChildrens ] );
	}, [ allDocs ] );

	const updateMetaData = () => {
		// Update documentation data.
		dispatch( 'wedocs/docs' )
			.updateDoc( id, { status: docStatus } )
			.then( ( { docs } ) => {
				docs?.find( doc => {
					if ( doc?.id === parseInt( id ) ) setDocStatus( doc?.status );
				} )
			} )
			.catch( ( err ) => {
				console.log( err );
			} );

		// Update documentation permission meta.
		dispatch( 'wedocs/docs' )
			.updateDocMeta( id, permissionMeta )
			.then( ( result ) => {} )
			.catch( ( err ) => {} );

		// Update documentation role capabilities meta.
		dispatch( 'wedocs/docs' )
			.updateDocMeta( id, roleCapSettingsMeta )
			.then( ( result ) => {} )
			.catch( ( err ) => {} );

		// Update children docs status.
		if ( statusChanged ) {
			const data = {
				docIds : childrens?.map( children => children?.id ),
				status : docStatus
			};

			dispatch( 'wedocs/docs' )
				.updateDocs( data )
				.then( ( result ) => {} )
				.catch( ( err ) => {} );
		}

		Swal.fire( {
			title: __( 'Doc Manager Saved!', 'wedocs-pro' ),
			text: __(
				'Documentation manager settings saved successfully',
				'wedocs-pro'
			),
			icon: 'success',
			toast: true,
			position: 'bottom-end',
			showConfirmButton: false,
			timer: 2000,
		} );
	};

	return (
		<div className="bg-white">
			<div className="px-10 py-7 sm:px-10">
				<SettingsHeader />
				<PrivacySettings
					status={ docStatus }
					handlerClick={ handlerClick }
				/>
				<hr className="my-8 h-px bg-[#DBDBDB] border-0 dark:bg-[#DBDBDB]" />
				<RoleManagementHeader />
				<RoleManagementSettings
					docPermission={ docPermission }
					roleCapSettings={ roleCapSettings }
					handleRoleManager={ handleRoleManagementSettings }
					handleRoleCapabilities={ handleRoleCapabilities }
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
						{ __( 'Cancel', 'wedocs-pro' ) }
					</a>
					<button
						type="button"
						onClick={ updateMetaData }
						className="py-2 inline-flex items-center rounded-md border border-indigo-600 shadow-gray-100 px-4 text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm"
					>
						{ __( 'Save', 'wedocs-pro' ) }
					</button>
				</div>
			</div>
			<UpgradePopup autoOpen={ showPopup ? true : false } />
		</div>
	);
};

export default SettingsSection;
