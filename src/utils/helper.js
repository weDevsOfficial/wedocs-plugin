import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { useEffect, useState } from "@wordpress/element";

export const userIsAdmin = ( id = 0 ) => {
    const [ userId, setUserId ] = useState( id );
    const [ isAdmin, setIsAdmin ] = useState( null );

    useSelect( (select) => {
        if ( userId ) return;

        const { getCurrentUser } = select( coreStore );
        const currentUser = getCurrentUser();

        if ( currentUser && currentUser.id ) {
            setUserId( currentUser.id );
        }
    }, [ userId ] );

    const user = useSelect( ( select ) => {
        if ( !userId ) return;

        const { getUser } = select( coreStore );

        return getUser( userId, { _fields: 'roles' } );
    }, [ userId ] );

    useEffect( () => {
        if ( ! user ) {
            return;
        }
        setIsAdmin( user?.roles?.includes( 'administrator' ) );
    }, [ user ] );

    return isAdmin;
};
