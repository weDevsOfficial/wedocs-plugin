import { useState } from '@wordpress/element';

const ArticleItem = ({ article, attributes }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const {
        articleTitleTag,
        enableNestedArticles,
        docListStyles
    } = attributes;

    const articleStyle = {
        backgroundColor: docListStyles.backgroundColor || 'transparent',
        padding: '8px'
    };

    const iconStyle = {
        color: '#6c757d',
        fontSize: '16px',
        marginRight: '8px'
    };

    const textStyle = {
        color: docListStyles.textColor || '#333333'
    };

    const toggleExpanded = () => {
        if (article.children && article.children.length > 0) {
            setIsExpanded(!isExpanded);
        }
    };

    const TitleTag = articleTitleTag || 'h4';
    const children = article.children || [];
    const hasChildren = children.length > 0;

    return (
        <div className="wedocs-article transition-colors duration-200">
            <div 
                className="flex items-center space-x-2"
                style={articleStyle}
            >
                <span 
                    className="wedocs-article-icon"
                    style={iconStyle}
                    aria-hidden="true"
                >
                    📄
                </span>
                <TitleTag 
                    className="wedocs-article-title text-sm m-0 flex-1"
                    style={textStyle}
                >
                    <a 
                        href={article.permalink || `#${article.ID}`}
                        className="hover:underline transition-colors duration-200"
                        style={{ 
                            color: docListStyles.textColor || '#333333',
                            textDecoration: 'none'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.color = docListStyles.textColorHover || '#007cba';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.color = docListStyles.textColor || '#333333';
                        }}
                    >
                        {article.post_title}
                    </a>
                </TitleTag>
                
                {hasChildren && enableNestedArticles && (
                    <button
                        className="wedocs-expand-toggle text-gray-500 hover:text-gray-700 transition-colors"
                        onClick={toggleExpanded}
                        aria-expanded={isExpanded}
                        aria-label={`Toggle ${article.post_title} sub-articles`}
                        style={{
                            fontSize: '16px',
                            color: '#6c757d',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '2px'
                        }}
                    >
                        {isExpanded ? '▼' : '▶'}
                    </button>
                )}
            </div>
            
            {hasChildren && enableNestedArticles && (
                <div 
                    className={`wedocs-article-children ${
                        isExpanded ? 'expanded' : 'collapsed'
                    }`}
                >
                    {children.map((childArticle) => (
                        <ArticleItem
                            key={childArticle.ID}
                            article={childArticle}
                            attributes={attributes}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ArticleItem;
