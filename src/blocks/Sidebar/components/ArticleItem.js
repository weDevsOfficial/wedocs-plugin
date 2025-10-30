const ArticleItem = ({ article, attributes, level = 0 }) => {
    
    const {
        articleTitleTag,
        enableNestedArticles,
        docListStyles,
        treeStyles
    } = attributes;

    // Helper function to decode HTML entities
    const decodeHtmlEntities = (text) => {
        if (!text) return '';
        const textarea = document.createElement('textarea');
        textarea.innerHTML = text;
        return textarea.value;
    };

    // Tree-specific styles
    const indentation = level * parseInt(treeStyles?.indentation?.replace('px', '') || 20);
    
    // Helper function to get color value or fallback
    const getColorValue = (colorValue, fallback = '') => {
        return colorValue && colorValue.trim() !== '' ? colorValue : fallback;
    };

    const articleStyle = {
        marginLeft: level > 0 ? `${indentation}px` : '0',
        marginBottom: treeStyles?.itemSpacing || '4px',
        position: 'relative',
        backgroundColor: getColorValue(docListStyles.backgroundColor),
        padding: '8px 12px',
        borderLeft: level > 0 && treeStyles?.connectorColor ? `2px solid ${treeStyles.connectorColor}` : 'none',
        borderRadius: '4px'
    };

    const iconStyle = {
        color: getColorValue(docListStyles.textColor, '#6c757d'),
        fontSize: '14px',
        marginRight: '8px'
    };

    const textStyle = {
        color: getColorValue(docListStyles.textColor)
    };


    const TitleTag = articleTitleTag || 'h4';
    const children = article.children || [];
    const hasChildren = children.length > 0;

    return (
        <div className="wedocs-article transition-colors duration-200">
            {/* Visual connector line for nested items */}
            {level > 0 && (
                <div
                    className="wedocs-connector-line"
                    style={{
                        position: 'absolute',
                        left: `-${parseInt(treeStyles?.indentation?.replace('px', '') || 20) / 2}px`,
                        top: '0',
                        bottom: '0',
                        width: treeStyles?.connectorWidth || '1px',
                        backgroundColor: getColorValue(treeStyles?.connectorColor, '#e5e7eb')
                    }}
                />
            )}
            
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
                    className={`wedocs-article-title ${TitleTag} m-0 flex-1`}
                    style={textStyle}
                >
                    <a 
                        href={article.permalink || `#${article.ID}`}
                        className="hover:underline transition-colors duration-200"
                        style={{ 
                            color: getColorValue(docListStyles.textColor),
                            textDecoration: 'none'
                        }}
                        onMouseEnter={(e) => {
                            const hoverColor = getColorValue(docListStyles.textColorHover);
                            if (hoverColor) {
                                e.target.style.color = hoverColor;
                            }
                        }}
                        onMouseLeave={(e) => {
                            const normalColor = getColorValue(docListStyles.textColor);
                            if (normalColor) {
                                e.target.style.color = normalColor;
                            }
                        }}
                    >
                        {decodeHtmlEntities(article.post_title)}
                    </a>
                </TitleTag>
                
            </div>
            
            {hasChildren && enableNestedArticles && (
                <div 
                    className="wedocs-article-children"
                    style={{
                        marginLeft: level > 0 ? `${parseInt(treeStyles?.indentation?.replace('px', '') || 20)}px` : '0',
                        borderLeft: level > 0 && treeStyles?.connectorColor ? `${treeStyles?.connectorWidth || '1px'} solid ${treeStyles.connectorColor}` : 'none',
                        paddingLeft: level > 0 ? '8px' : '0'
                    }}
                >
                    {children.map((childArticle) => (
                        <ArticleItem
                            key={childArticle.ID}
                            article={childArticle}
                            attributes={attributes}
                            level={level + 1}
                        />
                    ))}
                </div>
            )}
            
            {/* When nested articles are disabled, show all child articles at the same level */}
            {hasChildren && !enableNestedArticles && (
                <>
                    {children.map((childArticle) => (
                        <ArticleItem
                            key={childArticle.ID}
                            article={childArticle}
                            attributes={attributes}
                            level={level}
                        />
                    ))}
                </>
            )}
        </div>
    );
};

export default ArticleItem;
