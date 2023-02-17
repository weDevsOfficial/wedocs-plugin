import {useEffect, useState} from '@wordpress/element';
import AddArticleModal from "./AddArticleModal";
import { __ } from "@wordpress/i18n";
import RestictionModal from "./RestrictionModal";
import { useSelect } from "@wordpress/data";
import docsStore from "../data/docs";

const DocActions = ( { docId, addArticle = false } ) => {
    const [ showActions, setShowActions ] = useState( false );

    const sections = useSelect(
        ( select ) => select( docsStore ).getSectionsDocs( parseInt( docId ) ),
        []
    );

    // useEffect( () => {
    //     // if ( showActions && ! actionDom.contains( event.target ) ) {
    //         document.addEventListener('click', function ( event ) {
    //             // if ( showActions && ! actionDom.contains( event.target ) ) {
    //             //     console.log( event.target );
    //             // }
    //
    //             if ( showActions ) {
    //                 const actionDom = document.querySelector( '#action-menus' );
    //                 // console.log( actionDom.contains( event.target ) );
    //                 console.log( actionDom );
    //             }
    //         });
    //     // }
    // }, [ showActions ] );

	return (
        <div className="documentation-ellipsis-actions relative">
            <span onClick={ () => setShowActions( ! showActions ) } className="dashicons dashicons-ellipsis d-block cursor-pointer text-sm rotate-90 text-gray-500"></span>
            { showActions && (
                <div id="action-menus" className="w-40 bg-white border border-[#DBDBDB] absolute z-10 shadow right-0 py-1 rounded-md mt-2.5">
                    {/* Add article */}
                    { addArticle && (
                        <AddArticleModal sections={ sections } docId={ docId } className="group w-full flex items-center py-2 px-4 text-sm font-medium text-gray-700 hover:bg-indigo-700 hover:text-white">
                            <span className="dashicons dashicons-plus text-xs mt-1.5 ml-[-4px]"></span>
                            { __( 'Add article', 'wedocs' ) }
                        </AddArticleModal>
                    ) }

                    {/* Edit documentation */}
                    <a
                        href={ `${ window.location.origin }/wp-admin/post.php?post=${ docId }&action=edit` } target="_blank"
                        className="group flex items-center py-2 px-4 text-sm font-medium text-gray-700 hover:bg-indigo-700 hover:text-white"
                    >
                        { __( 'Edit', 'wedocs' ) }
                    </a>

                    {/* Delete documentation */}
                    <RestictionModal docId={ docId } className="w-full group flex items-center py-2 px-4 text-sm font-medium text-gray-700 hover:bg-indigo-700 hover:text-white">
                        { __( 'Delete', 'wedocs' ) }
                    </RestictionModal>
                </div>
            ) }
        </div>
	);
};

export default DocActions;
