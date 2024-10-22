import { __ } from '@wordpress/i18n';
import { grid } from '@wordpress/icons';
import { Fragment } from '@wordpress/element';
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

    // Get published docs
    const { pages } = useSelect((select) => {
        const { getEntityRecords } = select('core');
        const query = {
            status: 'publish',
            per_page: -1,
            parent: 0,
        };
        return {
            pages: getEntityRecords('postType', 'docs', query),
        };
    });

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

    // Update handlers
    const updateAttribute = (attributeName) => (value) => {
        setAttributes({ [attributeName]: value });
    };

    // Filter and limit docs based on settings
    const getDisplayDocs = () => {
        if (!pages) return [];

        let filteredDocs = [...pages];

        // Filter excluded docs
        if (excludeDocs && excludeDocs.length > 0) {
            filteredDocs = filteredDocs.filter(doc =>
                !excludeDocs.includes(doc.id.toString())
            );
        }

        // Apply docs per page limit
        if (docsPerPage !== 'all') {
            filteredDocs = filteredDocs.slice(0, parseInt(docsPerPage));
        }

        return filteredDocs;
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
    console.log(docsOptions);
    return (
        <Fragment>
            <InspectorControls>
                <PanelBody>
                    <ToggleControl
                        checked={hideDocGrid}
                        label={__('Disable Doc Grid', 'wedocs')}
                        onChange={updateAttribute('hideDocGrid')}
                    />
                </PanelBody>

                {!hideDocGrid && (
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
                )}
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
                            {getDisplayDocs().map((doc) => (
                                <div
                                    key={doc.id}
                                    className="wedocs-docs-grid__item"
                                >
                                    <h3 className="wedocs-docs-grid__title">
                                        {doc.title.rendered}
                                    </h3>
                                    {showDocArticle && doc.articleCount && (
                                        <p className="wedocs-docs-grid__article-count">
                                            {doc.articleCount} {__('articles',
                                            'wedocs')}
                                        </p>
                                    )}
                                    {showViewDetails && (
                                        <div className="wedocs-docs-grid__details">
                                            <span className="wedocs-docs-grid__details-link">
                                                {__('View Details', 'wedocs')} →
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default Edit;
