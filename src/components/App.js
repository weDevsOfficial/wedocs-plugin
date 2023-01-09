import AddDoc from "./AddDoc";
import EmptyDocs from "./EmptyDocs";
import Documentation from "./Documentation";
import {useSelect} from "@wordpress/data";
import {store as coreStore} from "@wordpress/core-data";
import "../data/store";
import TestDragFeature from "./TestDragFeature";
import docsStore from "../data/store";

const App = () => {

    // const docs = useSelect( ( select) => select( coreStore ).getEntityRecords( 'postType', 'docs', { parent: 0 } ), [] );

    const docs       = useSelect( ( select ) => select( docsStore ).getDocs() );
    const parentDocs = useSelect( ( select ) => select( docsStore ).getParentOnlyDocs() );

    console.log( docs, parentDocs );

    return (
        <>
            <AddDoc />
            {/*<Documentation docs={docs} />*/}
            <TestDragFeature docs={docs} />
            <EmptyDocs isEmpty={!docs} />
        </>
    );
}

export default App;
