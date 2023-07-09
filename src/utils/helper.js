import { select, useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export function isAdminUser() {
    const getCurrentUserData = (select) => {
        const { getCurrentUser, getUser } = select( coreStore );
        const currentUser = getCurrentUser();
        const getUserData = getUser( currentUser?.id, { _fields: 'roles' } );

        return getUserData?.roles?.includes( 'administrator' );
    };

    return useSelect( getCurrentUserData );
}
