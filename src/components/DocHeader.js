import Title from "./Title";
import Actions from "./Actions";

const DocHeader = ( { doc } ) => {
    return (
        <h3>
            <Title obj={ doc } />
            <Actions documentation={true} />
        </h3>
    );
}

export default DocHeader;
