import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl, TextControl, ColorPalette, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { SidebarContainer } from './components';

const Edit = ({ attributes, setAttributes }) => {
    const {
        excludeSections,
        sectionsOrderBy,
        sectionsOrder,
        articleOrderBy,
        articleOrder,
        enableNestedArticles,
        sectionTitleTag,
        articleTitleTag,
        className,
        containerStyles,
        sectionStyles,
        titleStyles,
        docListStyles
    } = attributes;

    const blockProps = useBlockProps({
        className: 'wedocs-sidebar-block'
    });

    // Fetch theme colors and gradients
    const { themeColors, themeGradients } = useSelect((select) => {
        const editorSettings = select('core/block-editor').getSettings();
        return {
            themeColors: editorSettings.colors,
            themeGradients: editorSettings.gradients,
        };
    });

    // Helper function to handle color values (including empty/cleared values)
    const handleColorValue = (value) => {
        return value === undefined || value === null ? '' : value;
    };

    // Helper functions for updating styles
    const updateContainerStyles = (property, value) => {
        setAttributes({
            containerStyles: {
                ...containerStyles,
                [property]: handleColorValue(value)
            }
        });
    };

    const updateSectionStyles = (property, value) => {
        setAttributes({
            sectionStyles: {
                ...sectionStyles,
                [property]: handleColorValue(value)
            }
        });
    };

    const updateTitleStyles = (property, value) => {
        setAttributes({
            titleStyles: {
                ...titleStyles,
                [property]: handleColorValue(value)
            }
        });
    };

    const updateDocListStyles = (property, value) => {
        setAttributes({
            docListStyles: {
                ...docListStyles,
                [property]: handleColorValue(value)
            }
        });
    };


    // Real data fetching for preview
    const [sections, setSections] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch real weDocs data using WordPress REST API
    useEffect(() => {
        const fetchDocsData = async () => {
            setIsLoading(true);
            try {
                // Build query parameters based on block attributes
                const queryParams = new URLSearchParams({
                    per_page: -1,
                    status: 'publish',
                    orderby: sectionsOrderBy,
                    order: sectionsOrder,
                });

                // Apply exclude filter
                if (excludeSections.length > 0) {
                    queryParams.append('exclude', excludeSections.join(','));
                }

                // Fetch docs from WordPress REST API
                const response = await wp.apiFetch({
                    path: `/wp/v2/docs?${queryParams.toString()}`
                });

                // Process the data to build hierarchical structure
                const processedSections = processDocsData(response);
                setSections(processedSections);
            } catch (error) {
                console.error('Error fetching weDocs data:', error);
                // Fallback to empty array on error
                setSections([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDocsData();
    }, [excludeSections, sectionsOrderBy, sectionsOrder, articleOrderBy, articleOrder, enableNestedArticles]);

    // Process flat docs array into hierarchical structure
    const processDocsData = (docs) => {
        if (!docs || !Array.isArray(docs)) return [];

        // Create a map for quick lookup
        const docsMap = new Map();
        docs.forEach(doc => {
            docsMap.set(doc.id, {
                ID: doc.id,
                post_title: doc.title.rendered,
                post_name: doc.slug,
                post_parent: doc.parent,
                menu_order: doc.menu_order,
                children: []
            });
        });

        // Build hierarchical structure
        const sections = [];
        docs.forEach(doc => {
            const docObj = docsMap.get(doc.id);
            
            if (doc.parent === 0) {
                // This is a top-level section
                sections.push(docObj);
            } else {
                // This is a child - find its parent and add it
                const parent = docsMap.get(doc.parent);
                if (parent) {
                    parent.children.push(docObj);
                }
            }
        });

        // Sort sections and their children
        const sortDocs = (docsArray) => {
            return docsArray.sort((a, b) => {
                if (sectionsOrderBy === 'menu_order') {
                    return sectionsOrder === 'asc' ? a.menu_order - b.menu_order : b.menu_order - a.menu_order;
                } else if (sectionsOrderBy === 'name') {
                    return sectionsOrder === 'asc' 
                        ? a.post_title.localeCompare(b.post_title)
                        : b.post_title.localeCompare(a.post_title);
                } else if (sectionsOrderBy === 'id') {
                    return sectionsOrder === 'asc' ? a.ID - b.ID : b.ID - a.ID;
                }
                return 0;
            });
        };

        // Sort sections
        const sortedSections = sortDocs(sections);
        
        // Sort children of each section
        sortedSections.forEach(section => {
            if (section.children.length > 0) {
                section.children = sortDocs(section.children);
            }
        });

        return sortedSections;
    };

    const orderByOptions = [
        { label: __('weDocs Order', 'wedocs'), value: 'menu_order' },
        { label: __('Name', 'wedocs'), value: 'name' },
        { label: __('Slug', 'wedocs'), value: 'slug' },
        { label: __('ID', 'wedocs'), value: 'id' },
        { label: __('Count', 'wedocs'), value: 'count' }
    ];

    const titleTagOptions = [
        { label: 'H2', value: 'h2' },
        { label: 'H3', value: 'h3' },
        { label: 'H4', value: 'h4' },
        { label: 'H5', value: 'h5' },
        { label: 'H6', value: 'h6' }
    ];

    return (
        <>
            <BlockControls>
                <AlignmentToolbar
                    value={attributes.align}
                    onChange={(value) => setAttributes({ align: value })}
                />
            </BlockControls>
            
            <InspectorControls>
                <PanelBody title={__('Query Settings', 'wedocs')} initialOpen={true}>
                    <TextControl
                        label={__('Exclude Sections', 'wedocs')}
                        value={excludeSections.join(', ')}
                        onChange={(value) => setAttributes({ excludeSections: value.split(',').map(id => id.trim()).filter(id => id) })}
                        help={__('Comma-separated section IDs to exclude', 'wedocs')}
                    />
                    
                    <SelectControl
                        label={__('Sections Order By', 'wedocs')}
                        value={sectionsOrderBy}
                        options={orderByOptions}
                        onChange={(value) => setAttributes({ sectionsOrderBy: value })}
                    />
                    
                    <SelectControl
                        label={__('Order', 'wedocs')}
                        value={sectionsOrder}
                        options={[
                            { label: __('Ascending', 'wedocs'), value: 'asc' },
                            { label: __('Descending', 'wedocs'), value: 'desc' }
                        ]}
                        onChange={(value) => setAttributes({ sectionsOrder: value })}
                    />
                    
                    
                    <SelectControl
                        label={__('Article Order By', 'wedocs')}
                        value={articleOrderBy}
                        options={orderByOptions}
                        onChange={(value) => setAttributes({ articleOrderBy: value })}
                    />
                    
                    <SelectControl
                        label={__('Article Order', 'wedocs')}
                        value={articleOrder}
                        options={[
                            { label: __('Ascending', 'wedocs'), value: 'asc' },
                            { label: __('Descending', 'wedocs'), value: 'desc' }
                        ]}
                        onChange={(value) => setAttributes({ articleOrder: value })}
                    />
                    
                    <ToggleControl
                        label={__('Enable Nested Articles', 'wedocs')}
                        checked={enableNestedArticles}
                        onChange={(value) => setAttributes({ enableNestedArticles: value })}
                    />
                </PanelBody>
                
                <PanelBody title={__('Layout Settings', 'wedocs')}>
                    <SelectControl
                        label={__('Section Title Tag', 'wedocs')}
                        value={sectionTitleTag}
                        options={titleTagOptions}
                        onChange={(value) => setAttributes({ sectionTitleTag: value })}
                    />
                    
                    <SelectControl
                        label={__('Article Title Tag', 'wedocs')}
                        value={articleTitleTag}
                        options={titleTagOptions}
                        onChange={(value) => setAttributes({ articleTitleTag: value })}
                    />
                </PanelBody>
                
            </InspectorControls>

            <InspectorControls group="styles">
                <PanelBody title={__('Section Box Styling', 'wedocs')} initialOpen={false}>
                    <UnitControl
                        label={__('Section Padding', 'wedocs')}
                        value={sectionStyles.padding}
                        onChange={(value) => updateSectionStyles('padding', value)}
                        units={[
                            { value: 'px', label: 'px', default: 12 },
                            { value: 'em', label: 'em', default: 1 },
                            { value: 'rem', label: 'rem', default: 1 },
                            { value: '%', label: '%', default: 1 }
                        ]}
                    />
                    
                    <UnitControl
                        label={__('Section Margin', 'wedocs')}
                        value={sectionStyles.margin}
                        onChange={(value) => updateSectionStyles('margin', value)}
                        units={[
                            { value: 'px', label: 'px', default: 8 },
                            { value: 'em', label: 'em', default: 1 },
                            { value: 'rem', label: 'rem', default: 1 },
                            { value: '%', label: '%', default: 1 }
                        ]}
                    />
                    
                    <div>
                        <label className="components-base-control__label">
                            {__('Section Background', 'wedocs')}
                        </label>
                        <ColorPalette
                            colors={themeColors}
                            value={sectionStyles.backgroundColor}
                            onChange={(newColor) => updateSectionStyles('backgroundColor', newColor)}
                        />
                    </div>
                    
                    <div>
                        <label className="components-base-control__label">
                            {__('Section Background (Hover)', 'wedocs')}
                        </label>
                        <ColorPalette
                            colors={themeColors}
                            value={sectionStyles.backgroundColorHover}
                            onChange={(newColor) => updateSectionStyles('backgroundColorHover', newColor)}
                        />
                    </div>
                </PanelBody>
                
                <PanelBody title={__('Section Title Styling', 'wedocs')} initialOpen={false}>
                    <div>
                        <label className="components-base-control__label">
                            {__('Section Title Color', 'wedocs')}
                        </label>
                        <ColorPalette
                            colors={themeColors}
                            value={titleStyles.color}
                            onChange={(newColor) => updateTitleStyles('color', newColor)}
                        />
                    </div>
                    
                    <div>
                        <label className="components-base-control__label">
                            {__('Section Title Background', 'wedocs')}
                        </label>
                        <ColorPalette
                            colors={themeColors}
                            value={titleStyles.backgroundColor}
                            onChange={(newColor) => updateTitleStyles('backgroundColor', newColor)}
                        />
                    </div>
                    
                    <div>
                        <label className="components-base-control__label">
                            {__('Section Title Background (Hover)', 'wedocs')}
                        </label>
                        <ColorPalette
                            colors={themeColors}
                            value={titleStyles.backgroundColorHover}
                            onChange={(newColor) => updateTitleStyles('backgroundColorHover', newColor)}
                        />
                    </div>
                </PanelBody>
                
                <PanelBody title={__('Article Title Styling', 'wedocs')} initialOpen={false}>
                    <div>
                        <label className="components-base-control__label">
                            {__('Article Title Color', 'wedocs')}
                        </label>
                        <ColorPalette
                            colors={themeColors}
                            value={docListStyles.textColor}
                            onChange={(newColor) => updateDocListStyles('textColor', newColor)}
                        />
                    </div>
                    
                    <div>
                        <label className="components-base-control__label">
                            {__('Article Title Color (Hover)', 'wedocs')}
                        </label>
                        <ColorPalette
                            colors={themeColors}
                            value={docListStyles.textColorHover}
                            onChange={(newColor) => updateDocListStyles('textColorHover', newColor)}
                        />
                    </div>
                </PanelBody>
                
                
            </InspectorControls>

            <div {...blockProps}>
                <div  className='wedocs-document'>
                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="ml-2 text-gray-600">{__('Loading weDocs data...', 'wedocs')}</span>
                    </div>
                ) : sections.length > 0 ? (
                    <SidebarContainer 
                        sections={sections}
                        attributes={attributes}
                    />
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <p className="mb-2">{__('No documentation sections found.', 'wedocs')}</p>
                        <p className="text-sm">{__('Create some documentation sections to see them here.', 'wedocs')}</p>
                    </div>
                )}
                </div>
            </div>
        </>
    );
};

export default Edit;
