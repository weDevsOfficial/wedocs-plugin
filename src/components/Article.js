import {__} from "@wordpress/i18n";
import Actions from "./Actions";
import {useSelect} from "@wordpress/data";
import {store as coreStore} from "@wordpress/core-data";
import Title from "./Title";
import ChildArticles from "./ChildArticles";

const Article = ({ sectionId }) => {
    if ( ! sectionId ) {
        return;
    }

    const articles = useSelect( ( select ) => select( coreStore ).getEntityRecords( 'postType', 'docs', { parent: sectionId } ), [] );

    return (
        <ul className="articles connectedSortable">
            { articles && articles.map( ( article ) => (
                <li className="article" key={article.id}>
                    <span>
                        <Title obj={ article } />
                        {/*<a target="_blank" href="#">*/}
                            {/*{ article.title.rendered }*/}
                            {/*<Title obj={ article } />*/}
                            {/*{ __( 'React dev docs', 'wedocs' ) }*/}
                            {/*<span v-if="article.post.status != 'publish'" className="doc-status">{{ article.post.status }}</span>*/}
                        {/*</a>*/}
                        {/*<span v-else>{{ article.post.title }}</span>*/}
                        <Actions article={true} />
                    </span>

                    {/*<ChildArticles articleId={ article.id } />*/}
                </li>
            ) ) }
        </ul>
    );
}

export default Article;
