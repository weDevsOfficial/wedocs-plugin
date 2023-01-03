import { __ } from "@wordpress/i18n";
import AddDocModal from "./AddDocModal";

const Actions = ({ documentation, section, article } ) => {
    return (
        <span className="actions wedocs-row-actions">
            { ( article || section ) && <span className="wedocs-btn-reorder" title={ __( 'Re-order this section', 'wedocs' ) }>
                <span className="dashicons dashicons-menu"></span>
            </span> }
            <a target="_blank" href="#" title={ __( 'Preview the section', 'wedocs' ) }>
                <span className="dashicons dashicons-external"></span>
            </a>
            <span className="wedocs-btn-remove" title={ __( 'Delete this section', 'wedocs' ) }>
                <span className="dashicons dashicons-trash"></span>
            </span>
            { ( section && ! article ) && <span className="add-article" title={ __( 'Add a new article', 'wedocs' ) }>
                <AddDocModal href="#">
                    <span className="dashicons dashicons-plus-alt"></span>
                </AddDocModal>
            </span> }
            { documentation && <span className="wedocs-btn-reorder" title={ __( 'Re-order this section', 'wedocs' ) }>
                <span className="dashicons dashicons-menu"></span>
            </span> }
        </span>
    );
}

export default Actions;
