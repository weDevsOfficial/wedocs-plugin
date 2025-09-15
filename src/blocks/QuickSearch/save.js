import { useBlockProps } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
    const {
        hideBlock,
        searchBoxPlaceholder,
        modalPlaceholder,
        modalDocsSource,
        sectionIds,
        articleIds,
        helpfulDocsCount,
        customCssClass,
        searchBoxStyles,
        modalStyles,
        additionalCssClass,
    } = attributes;

    if (hideBlock) {
        return null;
    }

    const blockProps = useBlockProps.save({
        className: `wedocs-quick-search-block ${customCssClass} ${additionalCssClass}`,
    });

    const searchBoxStyle = {
        backgroundColor: searchBoxStyles.backgroundColor,
        borderColor: searchBoxStyles.borderColor,
        borderWidth: searchBoxStyles.borderWidth,
        borderRadius: searchBoxStyles.borderRadius,
        paddingTop: searchBoxStyles.padding.top,
        paddingRight: searchBoxStyles.padding.right,
        paddingBottom: searchBoxStyles.padding.bottom,
        paddingLeft: searchBoxStyles.padding.left,
        marginTop: searchBoxStyles.margin.top,
        marginRight: searchBoxStyles.margin.right,
        marginBottom: searchBoxStyles.margin.bottom,
        marginLeft: searchBoxStyles.margin.left,
        fontSize: searchBoxStyles.fontSize,
        fontWeight: searchBoxStyles.fontWeight,
        letterSpacing: searchBoxStyles.letterSpacing,
        lineHeight: searchBoxStyles.lineHeight,
        '--wedocs-placeholder-color': searchBoxStyles.placeholderColor,
        '--wedocs-icon-color': searchBoxStyles.iconColor,
        '--wedocs-command-key-color': searchBoxStyles.commandKeyColor,
    };

    const modalStyle = {
        '--wedocs-modal-placeholder-color': modalStyles.placeholderColor,
        '--wedocs-modal-search-icon-color': modalStyles.searchIconColor,
        '--wedocs-modal-background-color': modalStyles.backgroundColor,
        '--wedocs-modal-field-text-color': modalStyles.fieldTextColor,
        '--wedocs-modal-list-item-icon-color': modalStyles.listItemIconColor,
        '--wedocs-modal-list-item-text-color': modalStyles.listItemTextColor,
        '--wedocs-modal-doc-label-color': modalStyles.docLabelColor,
        '--wedocs-modal-section-label-color': modalStyles.sectionLabelColor,
        '--wedocs-modal-list-item-padding-top': modalStyles.listItemPadding.top,
        '--wedocs-modal-list-item-padding-right': modalStyles.listItemPadding.right,
        '--wedocs-modal-list-item-padding-bottom': modalStyles.listItemPadding.bottom,
        '--wedocs-modal-list-item-padding-left': modalStyles.listItemPadding.left,
        '--wedocs-modal-list-item-margin-top': modalStyles.listItemMargin.top,
        '--wedocs-modal-list-item-margin-right': modalStyles.listItemMargin.right,
        '--wedocs-modal-list-item-margin-bottom': modalStyles.listItemMargin.bottom,
        '--wedocs-modal-list-item-margin-left': modalStyles.listItemMargin.left,
        '--wedocs-modal-list-item-border-color': modalStyles.listItemBorderColor,
        '--wedocs-modal-list-item-border-width': modalStyles.listItemBorderWidth,
        '--wedocs-modal-list-item-border-radius': modalStyles.listItemBorderRadius,
    };

    return (
        <div {...blockProps} style={searchBoxStyle}>
            <div 
                className="wedocs-quick-search-trigger"
                data-placeholder={searchBoxPlaceholder}
                data-modal-placeholder={modalPlaceholder}
                data-modal-docs-source={modalDocsSource}
                data-section-ids={sectionIds}
                data-article-ids={articleIds}
                data-helpful-docs-count={helpfulDocsCount}
                style={modalStyle}
            >
                <div className="wedocs-quick-search-input">
                    <span className="wedocs-quick-search-placeholder">
                        {searchBoxPlaceholder}
                    </span>
                    <span className="wedocs-quick-search-command">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 9l6 6m0-6l-6 6"/>
                        </svg>
                        K
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Save;
