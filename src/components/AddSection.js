import {__} from "@wordpress/i18n";
import AddDocModal from "./AddDocModal";

const AddSection = () => {
    return (
        <div className="add-section">
            <AddDocModal className="button button-primary" href="#">
                { __( 'Add Section', 'wedocs' ) }
            </AddDocModal>
        </div>
    );
}

export default AddSection;
