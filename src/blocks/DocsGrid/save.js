import { useBlockProps } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
    const {
        hideDocGrid,
        docStyle,
        docsPerPage,
        excludeDocs,
        orderBy,
        sectionsPerDoc,
        articlesPerSection,
        enablePagination,
        showDocArticle,
        keepArticlesCollapsed,
        showViewDetails,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: `wedocs-block${hideDocGrid ? ' is-hidden' : ''}`
    });

    // Return a minimal structure - actual rendering will be handled by PHP
    return (
        <div {...blockProps}
             data-style={docStyle}
             data-per-page={docsPerPage}
             data-exclude={excludeDocs ? excludeDocs.join(',') : ''}
             data-order-by={orderBy}
             data-sections-per-doc={sectionsPerDoc}
             data-articles-per-section={articlesPerSection}
             data-enable-pagination={enablePagination ? '1' : '0'}
             data-show-article-count={showDocArticle ? '1' : '0'}
             data-keep-collapsed={keepArticlesCollapsed ? '1' : '0'}
             data-show-details={showViewDetails ? '1' : '0'}
        >
                <div className="wedocs-container"></div>
            Ratul {docStyle}
            </div>
    );
};

export default Save;
