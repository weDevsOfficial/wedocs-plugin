import { userIsAdmin } from '../../utils/helper';
import { useEffect, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import PrivacyModal from '../../../../wedocs-pro/src/components/Modals/PrivacyModal';

const ArticleRestrictionMenu = ( { id, type } ) => {
	const isAdmin = userIsAdmin();

	const [ isAdminRestricted, setIsAdminRestricted ] = useState( 0 );

	const sortableStatus = useSelect(
		( select ) => select( 'wedocs/docs' )?.getSortingStatus(),
		[]
	);

	const restrictedArticles = useSelect(
		( select ) => select( 'wedocs/docs' ).getRestrictedArticles(),
		[]
	);

	useEffect( () => {
		if ( !Boolean( sortableStatus ) ) {
			restrictedArticles?.map( restrictedArticle => {
				if ( restrictedArticle?.id === id ) {
					setIsAdminRestricted( parseInt( restrictedArticle?.value ) );
				}
			} );
		}
	}, [ sortableStatus, restrictedArticles ] );

	return (
		<>
			{ isAdmin && (
				<>
					{ type === 'doc' && (
						<a
							href={ `${weDocsAdminVars?.weDocsUrl}manager/${ id }` }
							className="group flex items-center py-2 px-4 text-sm font-medium text-gray-700 hover:bg-indigo-700 hover:text-white !shadow-none"
						>
							<span>{ __( 'Permission Management', 'wedocs' ) }</span>
						</a>
					) }
					{ !Boolean( isAdminRestricted ) && type === 'article' && (
						<PrivacyModal
							docId={ id }
							isArticle={ true }
							className='group w-full flex items-center py-2 px-4 text-sm font-medium text-gray-700 hover:bg-indigo-700 hover:text-white !shadow-none'
						>
							{ __(
								'Restrict editing for admin only',
								'wedocs'
							) }
						</PrivacyModal>
					) }
				</>
			) }
		</>
	);
}

export default ArticleRestrictionMenu;
