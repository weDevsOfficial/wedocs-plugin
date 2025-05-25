import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

const ContributorUsers = ( { id } ) => {
	const [ userAvatars, setUserAvatars ] = useState( [] );
	const [ contributors, setContributors ] = useState( [] );

	useEffect( () => {
		apiFetch( {
			path: '/wp/v2/docs/' + id + '/contributors',
		} )
			.then( ( result ) => {
				setContributors( [ ...contributors, ...result ] );
			} )
			.catch( ( err ) => {
				console.log( err );
			} );
	}, [ id ] );

	useEffect( () => {
		contributors?.map( ( contributorId ) => {
			apiFetch( {
				path: '/wp/v2/users/' + contributorId,
			} )
				.then( ( result ) => {
					const userName = result?.name,
						avatarUrl = result?.avatar_urls?.[ '24' ];

					userAvatars.push( {
						name: userName,
						url: avatarUrl,
					} );

					setUserAvatars( [ ...userAvatars ] );
				} )
				.catch( ( err ) => {
					console.log( err );
				} );
		} );
	}, [ contributors ] );

	return (
		<div className="isolate ml-4 flex -space-x-2 h-7">
			{ userAvatars &&
				userAvatars?.map( ( avatar, index ) =>
					index < 4 ? (
						<div
							key={ index }
							className="tooltip cursor-pointer"
							data-tip={ __(
								avatar?.name,
								'wedocs-pro'
							) }
						>
							<img
								src={ avatar?.url }
								alt={ avatar?.name }
								className="relative z-0 inline-block h-full w-7 rounded-full ring-2 ring-white"
							/>
						</div>
					) : (
						''
					)
				) }

			{ userAvatars && userAvatars?.length > 4 && (
				<div className="relative z-0 inline-block h-full w-7 rounded-full ring-2 ring-white bg-indigo-700 text-white">
					<span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -mt-[1px]">
						+{ userAvatars?.length - 4 }
					</span>
				</div>
			) }
		</div>
	);
}

export default ContributorUsers;
