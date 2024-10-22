
const attributes = {
    // Grid Controls
    hideDocGrid: {
        type: 'boolean',
        default: false
    },
    docStyle: {
        type: 'string',
        default: '1x1'
    },
    docsPerPage: {
        type: 'string',
        default: 'all'
    },
    excludeDocs: {
        type: 'array',
        default: []
    },
    orderBy: {
        type: 'string',
        default: 'date'
    },
    sectionsPerDoc: {
        type: 'string',
        default: 'all'
    },
    articlesPerSection: {
        type: 'string',
        default: 'all'
    },
    enablePagination: {
        type: 'boolean',
        default: false
    },
    showDocArticle: {
        type: 'boolean',
        default: true
    },
    keepArticlesCollapsed: {
        type: 'boolean',
        default: false
    },
    showViewDetails: {
        type: 'boolean',
        default: true
    },

};

export default attributes;
