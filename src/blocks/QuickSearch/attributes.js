import { __ } from '@wordpress/i18n';

const attributes = {
    searchBoxPlaceholder: {
        type: 'string',
        default: __( 'Quick search...', 'wedocs' ),
    },
    modalPlaceholder: {
        type: 'string',
        default: __( 'Search documentation', 'wedocs' ),
    },
    modalDocsSource: {
        type: 'string',
        default: 'helpful', // 'sections', 'articles', 'helpful'
    },
    sectionIds: {
        type: 'string',
        default: '',
    },
    articleIds: {
        type: 'string',
        default: '',
    },
    helpfulDocsCount: {
        type: 'number',
        default: 10,
    },
    searchBoxStyles: {
        type: 'object',
        default: {
            placeholderColor: '#9CA3AF',
            iconColor: '#6B7280',
            commandKeyColor: '#6B7280',
            backgroundColor: '#FFFFFF',
            borderColor: '#D1D5DB',
            borderWidth: '1px',
            borderRadius: '8px',
            padding: {
                top: '12px',
                right: '16px',
                bottom: '12px',
                left: '16px',
            },
            margin: {
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },
            fontSize: '16px',
            fontWeight: '400',
            letterSpacing: '0px',
            lineHeight: '1.5',
        },
    },
    modalStyles: {
        type: 'object',
        default: {
            placeholderColor: '#9CA3AF',
            searchIconColor: '#6B7280',
            backgroundColor: '#FFFFFF',
            fieldTextColor: '#111827',
            listItemIconColor: '#3B82F6',
            listItemTextColor: '#111827',
            docLabelColor: '#3B82F6',
            sectionLabelColor: '#3B82F6',
            listItemPadding: {
                top: '12px',
                right: '16px',
                bottom: '12px',
                left: '16px',
            },
            listItemMargin: {
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },
            listItemBorderColor: '#E5E7EB',
            listItemBorderWidth: '1px',
            listItemBorderRadius: '4px',
        },
    },
};

export default attributes;
