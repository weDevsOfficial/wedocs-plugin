import AddDoc from "./AddDoc";
import EmptyDocs from "./EmptyDocs";
import Documentation from "./Documentation";
import {dispatch, useSelect} from "@wordpress/data";
import "../data/store";
import TestDragFeature from "./TestDragFeature";
import docsStore from "../data/store";
import {useEffect} from "@wordpress/element";

const App = () => {

    // const docs = useSelect( ( select) => select( coreStore ).getEntityRecords( 'postType', 'docs', { parent: 0 } ), [] );

    const { docs, isResolved } = useSelect( ( select ) => {
        return {
            docs: select(docsStore).getDocs(),
            isResolved: select(docsStore).getIsResolving('getDocs')
        }
    }, [] );
    // const parentDocs = useSelect( ( select ) => select( docsStore ).getParentOnlyDocs(), [] );

    console.log( docs, isResolved );

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
