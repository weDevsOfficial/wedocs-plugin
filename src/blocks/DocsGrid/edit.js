import { __ } from '@wordpress/i18n';
import { grid } from '@wordpress/icons';
import { Fragment, useState } from '@wordpress/element';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
    PanelBody,
    SelectControl,
    ToggleControl,
    PanelRow,
    FormTokenField
} from '@wordpress/components';

const Edit = ({ attributes, setAttributes }) => {
    const blockProps = useBlockProps();
    const { useSelect } = wp.data;
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

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

    // Control options
    const docStyles = [
        { label: '1x1', value: '1x1' },
        { label: '1x2', value: '1x2' },
    ];

    const docsPerPageOptions = [
        { label: 'All', value: 'all' },
        ...Array.from({ length: 10 }, (_, i) => ({
            label: String(i + 1),
            value: String(i + 1)
        }))
    ];

    const orderByOptions = [
        { label: __('weDocs Order', 'wedocs'), value: 'menu_order' },
        { label: __('ID', 'wedocs'), value: 'id' },
        { label: __('Name', 'wedocs'), value: 'name' },
    ];

    const countOptions = [
        { label: 'All', value: 'all' },
        ...Array.from({ length: 10 }, (_, i) => ({
            label: String(i + 1),
            value: String(i + 1)
        }))
    ];
    // Get published docs
    const { pages, sections, articles } = useSelect((select) => {
        const { getEntityRecords } = select('core');

        const docs = getEntityRecords('postType', 'docs', {
            status: 'publish',
            per_page: -1,
            parent: 0,
            orderby: orderBy,
            order: 'asc'
        });

        // Get all sections (docs children)
        const allSections = docs ? getEntityRecords('postType', 'docs', {
            status: 'publish',
            parent_in: docs.map(doc => doc.id),
            per_page: -1
        }) : null;

        // Get all articles (sections children)
        const allArticles = allSections ? getEntityRecords('postType', 'docs', {
            status: 'publish',
            parent_in: allSections.map(section => section.id),
            per_page: -1
        }) : null;

        return {
            pages: docs,
            sections: allSections,
            articles: allArticles
        };
    });

    const processDocsData = () => {
        if (!pages || !sections || !articles) return [];

        // Filter and sort docs based on settings
        let processedDocs = [...pages];

        // Apply exclude filter
        if (excludeDocs && excludeDocs.length > 0) {
            processedDocs = processedDocs.filter(doc =>
                !excludeDocs.includes(doc.id.toString())
            );
        }

        // Process each doc with its sections and articles
        processedDocs = processedDocs.map(doc => {
            // Get sections for this doc
            let docSections = sections.filter(section => section.parent === doc.id);

            // Limit sections if specified
            if (sectionsPerDoc !== 'all') {
                docSections = docSections.slice(0, parseInt(sectionsPerDoc));
            }

            // Process sections with their articles
            docSections = docSections.map(section => {
                let sectionArticles = articles.filter(article => article.parent === section.id);

                // Limit articles if specified
                if (articlesPerSection !== 'all') {
                    sectionArticles = sectionArticles.slice(0, parseInt(articlesPerSection));
                }

                return {
                    ...section,
                    articles: sectionArticles
                };
            });

            // Calculate total articles for the doc
            const totalArticles = docSections.reduce((total, section) =>
                total + section.articles.length, 0
            );

            return {
                ...doc,
                sections: docSections,
                articleCount: totalArticles
            };
        });

        return processedDocs;
    };
    // Handle pagination
    const getPagedDocs = (docs) => {
        if (!enablePagination || docsPerPage === 'all') return docs;

        const perPage = parseInt(docsPerPage);
        const start = (currentPage - 1) * perPage;
        const end = start + perPage;

        return docs.slice(start, end);
    };

    // Get final display docs
    const getDisplayDocs = () => {
        const processedDocs = processDocsData();
        return getPagedDocs(processedDocs);
    };

    // Pagination controls
    const renderPagination = (totalDocs) => {
        if (!enablePagination || docsPerPage === 'all') return null;

        const totalPages = Math.ceil(totalDocs.length / parseInt(docsPerPage));

        return (
            <div className="wedocs-docs-pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        className={`wedocs-docs-pagination__button ${currentPage === i + 1 ? 'is-active' : ''}`}
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        );
    };

    // Render section preview
    const renderSections = (doc) => {
        if (!doc.sections || !showViewDetails) return null;

        return (
            <div className={`wedocs-docs-grid__sections ${keepArticlesCollapsed ? 'is-collapsed' : ''}`}>
                {doc.sections.map(section => (
                    <div key={section.id} className="wedocs-docs-grid__section">
                        <h4 className="wedocs-docs-grid__section-title">
                            {section.title.rendered}
                        </h4>
                        {!keepArticlesCollapsed && section.articles && (
                            <ul className="wedocs-docs-grid__articles">
                                {section.articles.map(article => (
                                    <li key={article.id} className="wedocs-docs-grid__article">
                                        {article.title.rendered}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    const displayDocs = getDisplayDocs();
    // Create a mapping of ID to title for suggestions
    const docsMap = pages ? pages.reduce((acc, page) => {
        acc[page.id] = page.title.rendered;
        return acc;
    }, {}) : {};

    // Prepare docs options for FormTokenField
    const docsOptions = pages ? pages.map(page => ({
        value: page.id.toString(),
        label: page.title.rendered
    })) : [];

    // Update handlers
    const updateAttribute = (attributeName) => (value) => {
        setAttributes({ [attributeName]: value });
    };

    // Transform IDs to titles for FormTokenField display
    const excludeDocsDisplay = excludeDocs ? excludeDocs.map(id => docsMap[id] || id) : [];

    // Handle token changes
    const handleExcludeDocsChange = (tokens) => {
        // Convert titles back to IDs
        const newExcludeDocs = tokens.map(token => {
            // Find the ID for this title
            const found = Object.entries(docsMap).find(([id, title]) => title === token);
            return found ? found[0] : token;
        });

        setAttributes({ excludeDocs: newExcludeDocs });
    };

    const getGridClass = () => {
        return `wedocs-docs-grid--${docStyle}`;
    };

    return (
        <Fragment>
            <InspectorControls>
                    <PanelBody
                        title={__('Doc List Styles', 'wedocs')}
                        icon={grid}
                        initialOpen={false}
                    >
                        <SelectControl
                            value={docStyle}
                            options={docStyles}
                            label={__('Doc Styles', 'wedocs')}
                            onChange={updateAttribute('docStyle')}
                        />

                        <SelectControl
                            value={docsPerPage}
                            options={docsPerPageOptions}
                            label={__('Docs per page', 'wedocs')}
                            onChange={updateAttribute('docsPerPage')}
                        />

                        <FormTokenField
                            value={excludeDocsDisplay}
                            suggestions={Object.values(docsMap)}
                            label={__('Exclude Docs', 'wedocs')}
                            onChange={handleExcludeDocsChange}
                        />
                        <SelectControl
                            value={orderBy}
                            options={orderByOptions}
                            label={__('Order by', 'wedocs')}
                            onChange={updateAttribute('orderBy')}
                        />

                        <SelectControl
                            value={sectionsPerDoc}
                            options={countOptions}
                            label={__('Sections per doc', 'wedocs')}
                            onChange={updateAttribute('sectionsPerDoc')}
                        />

                        <SelectControl
                            value={articlesPerSection}
                            options={countOptions}
                            label={__('Articles per section', 'wedocs')}
                            onChange={updateAttribute('articlesPerSection')}
                        />

                        <PanelRow>
                            <ToggleControl
                                checked={enablePagination}
                                label={__('Enable pagination', 'wedocs')}
                                onChange={updateAttribute('enablePagination')}
                            />
                        </PanelRow>

                        <PanelRow>
                            <ToggleControl
                                checked={showDocArticle}
                                label={__('Show doc article count', 'wedocs')}
                                onChange={updateAttribute('showDocArticle')}
                            />
                        </PanelRow>

                        <PanelRow>
                            <ToggleControl
                                checked={keepArticlesCollapsed}
                                label={__('Keep article collapsed', 'wedocs')}
                                onChange={updateAttribute(
                                    'keepArticlesCollapsed')}
                            />
                        </PanelRow>

                        <PanelRow>
                            <ToggleControl
                                checked={showViewDetails}
                                label={__('Show view details button', 'wedocs')}
                                onChange={updateAttribute('showViewDetails')}
                            />
                        </PanelRow>
                    </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {hideDocGrid ? (
                    <div className="backdrop"></div>
                ) : (
                    <div className="wedocs-block-wrapper">
                        <p className="wedocs-preview-title">
                            {__('Docs Grid Preview', 'wedocs')}
                        </p>
                        <div className={`wedocs-docs-grid ${getGridClass()}`}>
                            {loading ? (
                                <Spinner />
                            ) : (
                                displayDocs.map((doc) => (
                                    <div
                                        key={doc.id}
                                        className="wedocs-docs-grid__item"
                                    >
                                        <h3 className="wedocs-docs-grid__title">
                                            {doc.title.rendered}
                                        </h3>
                                        {showDocArticle && (
                                            <p className="wedocs-docs-grid__article-count">
                                                {doc.articleCount} {__(
                                                'articles', 'wedocs')}
                                            </p>
                                        )}
                                        {renderSections(doc)}
                                        {showViewDetails && (
                                            <div className="wedocs-docs-grid__details">
                                                <span className="wedocs-docs-grid__details-link">
                                                    {__('View Details',
                                                        'wedocs')} →
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                        {renderPagination(processDocsData())}
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default Edit;