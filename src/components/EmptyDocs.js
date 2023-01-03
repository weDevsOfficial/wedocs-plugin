import {__} from "@wordpress/i18n";

const EmptyDocs = ({ isEmpty }) => {
    return (
        isEmpty && <div className="no-docs">
            { __( 'No docs has been found. Perhaps ', 'wedocs' ) }
            <a href="#">{ __( 'create one', 'wedocs' ) }</a>?
        </div>
    );
}

export default EmptyDocs;
