import { __ } from '@wordpress/i18n';
import { select } from '@wordpress/data';
import extractedTitle from '../../../../wedocs-pro/src/utils/extractedTitle';
import { useEffect, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

const ManagerHeader = () => {
	const docId = window.location.hash.replace( '#/manager/', '' );
	const doc = select( 'wedocs/docs' ).getDoc( parseInt( docId ) );

	const [ documentation, setDocumentation ] = useState( doc );

	useEffect( () => {
		apiFetch({
			path: '/wp/v2/docs/' + docId,
		})
			.then( ( result ) => {
				setDocumentation( { ...documentation, ...result } );
			})
			.catch( ( err ) => {} );
	}, [] );

	return (
		<div className="docs-heading flex justify-between items-center mt-5 mb-3.5">
			<h1
				className="font-medium text-[#111827] text-xl"
				dangerouslySetInnerHTML={ {
					__html: __(
						`Manage ${ extractedTitle(
							documentation?.title?.rendered,
							25
						) }`,
						'wedocs-pro'
					),
				} }
			></h1>
		</div>
	);
};

export default ManagerHeader;
