const attributes = {
    // General settings
    hideBlock: {
        type: 'string',
        default: false,
    },
    docsGridColumnStyle: {
        type: 'string',
        default: 'col-2',
    },
    docsPerPage: {
        type: 'number',
        default: 10,
    },
    includeDocs: {
        type: 'array',
        default: [],
    },
    excludeDocs: {
        type: 'array',
        default: [],
    },
    orderBy: {
        type: 'string',
        default: 'date',
    },
    order: {
        type: 'string',
        default: 'asc',
    },
    sectionPerDocs: {
        type: 'string',
        default: 'all'
    },
    articlePerDocs: {
        type: 'string',
        default: 'all'
    },
    showDocArticles: {
        type: 'boolean',
        default: true,
    },
    collapseArticles: {
        type: 'boolean',
        default: true,
    },
    showViewDetailsBtn: {
        type: 'boolean',
        default: true,
    },

    // Style settings
    titleTag: {
        type: 'string',
        default: 'h2',
    },
    titleFontSize: {
        type: 'number',
        default: 20,
    },
    titleFontWeight: {
        type: 'string',
        default: 'normal',
    },
    titleTextColor: {
        type: 'string',
        default: '#333333',
    },
    boxBgColor: {
        type: 'string',
        default: '#ffffff',
    },
    boxBorderColor: {
        type: 'string',
        default: '#eeeeee',
    },
    boxBorderWidth: {
        type: 'number',
        default: 1,
    },
    boxBorderRadius: {
        type: 'number',
        default: 5,
    },
    boxPadding: {
        type: 'number',
        default: 20,
    },
    boxMargin: {
        type: 'number',
        default: 15,
    },
    linkColor: {
        type: 'string',
        default: '#007cba',
    },
    linkHoverColor: {
        type: 'string',
        default: '#005fa3',
    },
    linkDecoration: {
        type: 'string',
        default: 'none',
    },
    linkHoverDecoration: {
        type: 'string',
        default: 'underline',
    },
}

export default attributes;
