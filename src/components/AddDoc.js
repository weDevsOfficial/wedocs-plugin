import { __ } from "@wordpress/i18n";
import AddDocModal from "./AddDocModal";

const AddDoc = () => {
    return (
        <>
            <h1>
                { __( 'Documentations ', 'wedocs' ) }
                <AddDocModal className="page-title-action !py-1.5 !px-3 !rounded" href="#">{ __( 'Add Doc', 'wedocs' ) }</AddDocModal>
            </h1>

            <span className="spinner is-active"></span>
        </>
    );
}

export default AddDoc;
