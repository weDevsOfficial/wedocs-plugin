import {useSelect} from "@wordpress/data";
import {store as coreStore} from "@wordpress/core-data";
import {__} from "@wordpress/i18n";
import Title from "./Title";
import Actions from "./Actions";

const ChildArticles = ({ articleId }) => {
    if ( ! articleId ) {
        return;
    }

    const articles = useSelect( ( select ) => select( coreStore ).getEntityRecords( 'postType', 'docs', { parentId : articleId } ), [] );

    return (
        <ul className="articles">
            { articles && articles.map( ( article ) => (
                <li key={article.id}>
                    <Title obj={article} />
                    {/*<a target="_blank" href="#">*/}
                        {/*<span v-if="art.post.status != 'publish'" class="doc-status">{{ art.post.status }}</span>*/}
                    {/*</a>*/}

                    {/*<span v-else>{{ art.post.title }}</span>*/}

                    <Actions />
                </li>
            ) ) }
        </ul>
    );
}

export default ChildArticles;
