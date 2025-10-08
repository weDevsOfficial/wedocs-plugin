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

/**
 * Check if an article is NOT admin restricted.
 * Returns true if the article is accessible (not restricted).
 *
 * @param {*} restrictedValue - The value from the wedocs_check_is_admin_restricted_article filter
 * @returns {boolean} - True if article is accessible (not restricted), false if restricted
 */
export const isArticleAccessible = ( restrictedValue ) => {
    // Article is accessible if the restriction value is NOT true, 1, or '1'
    return !(restrictedValue === true || restrictedValue === 1 || restrictedValue === '1');
};
