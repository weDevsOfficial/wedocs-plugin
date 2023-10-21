import { useEffect } from "@wordpress/element";

export const userIsAdmin = ( id = 0 ) => {
    return weDocsAdminVars?.hasManageCap;
};

export const handleDocCreationByRef = ( creationBtnRef ) => {
    useEffect( () => {
        document.addEventListener( 'keypress', ( event ) => {
            if ( event?.key === 'Enter' && creationBtnRef?.current ) return creationBtnRef?.current?.click();
        } );
    }, [] );
};
