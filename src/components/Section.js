import { useSelect } from "@wordpress/data";
import { store as coreStore } from '@wordpress/core-data';
import Actions from "./Actions";
import Title from "./Title";
import Article from "./Article";

const Section = ( { docID } ) => {
    if ( ! docID ) {
        return;
    }

    const sections = useSelect( ( select ) => select( coreStore ).getEntityRecords( 'postType', 'docs', { parent: docID } ), [] );

    return (
        <div className="inside">
            <ul className="sections ui-sortable">
                { sections && sections.map( ( section ) => (
                    <li key={section.id}>
                        <span className="section-title">
                            <Title obj={ section } count="2" />
                            {/*<span v-if="section.child.length > 0" className="count">{{ section.child.length }}</span></a>*/}
                            {/*<span v-else>*/}
                            {/*    { section.title.rendered }*/}
                            {/*    <span className="doc-status">{{ section.post.status }}</span>*/}
                            {/*    <span className="count">{{ section.child.length }}</span>*/}
                            {/*</span>*/}

                            <Actions section={true} />
                        </span>

                        <Article sectionId={section.id} />
                    </li>
                ) ) }
            </ul>
        </div>
    )
}

export default Section;
