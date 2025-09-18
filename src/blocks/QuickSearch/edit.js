import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { useBlockProps, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    SelectControl,
    RangeControl,
    ToggleControl,
    __experimentalBoxControl as BoxControl,
} from '@wordpress/components';

const Edit = ({ attributes, setAttributes }) => {
    const blockProps = useBlockProps();

    const {
        searchBoxPlaceholder,
        modalPlaceholder,
        modalDocsSource,
        sectionIds,
        articleIds,
        helpfulDocsCount,
        searchBoxStyles,
        modalStyles,
    } = attributes;

    const modalDocsSourceOptions = [
        { label: __( 'None', 'wedocs' ), value: 'none' },
        { label: __( 'Sections', 'wedocs' ), value: 'sections' },
        { label: __( 'Articles', 'wedocs' ), value: 'articles' },
        { label: __( 'Helpful Docs', 'wedocs' ), value: 'helpful' },
    ];

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
        color: searchBoxStyles.placeholderColor,
    };

    const updateSearchBoxStyles = (key, value) => {
        setAttributes({
            searchBoxStyles: {
                ...searchBoxStyles,
                [key]: value,
            },
        });
    };

    const updateModalStyles = (key, value) => {
        setAttributes({
            modalStyles: {
                ...modalStyles,
                [key]: value,
            },
        });
    };

    const colorOptions = [
        { name: 'Default', color: '#9CA3AF' },
        { name: 'Black', color: '#000000' },
        { name: 'White', color: '#FFFFFF' },
        { name: 'Gray', color: '#6B7280' },
        { name: 'Blue', color: '#3B82F6' },
        { name: 'Red', color: '#EF4444' },
        { name: 'Green', color: '#10B981' },
    ];

    return (
        <Fragment>
            <InspectorControls>
                {/* Search Box Section */}
                <PanelBody title={__('Search Box Section', 'wedocs')} initialOpen={true}>
                    <TextControl
                        value={searchBoxPlaceholder}
                        label={__('Search Box Placeholder', 'wedocs')}
                        placeholder={__('Enter placeholder text', 'wedocs')}
                        onChange={(newPlaceholder) => {
                            console.log('Updating search box placeholder:', newPlaceholder);
                            setAttributes({ searchBoxPlaceholder: newPlaceholder });
                        }}
                    />
                </PanelBody>

                {/* Search Modal Display Section */}
                <PanelBody title={__('Search Modal Display Section', 'wedocs')} initialOpen={true}>
                    <TextControl
                        value={modalPlaceholder}
                        label={__('Search Modal Placeholder', 'wedocs')}
                        placeholder={__('Enter placeholder text', 'wedocs')}
                        onChange={(newPlaceholder) => setAttributes({ modalPlaceholder: newPlaceholder })}
                    />
                    
                    <SelectControl
                        value={modalDocsSource}
                        options={modalDocsSourceOptions}
                        label={__('Modal Docs Source', 'wedocs')}
                        onChange={(newSource) => {
                            setAttributes({ modalDocsSource: newSource });
                        }}
                    />
                    
                    {modalDocsSource === 'sections' && (
                        <TextControl
                            value={sectionIds}
                            label={__('Section IDs', 'wedocs')}
                            placeholder={__('Enter section post ID, example: 3, 5', 'wedocs')}
                            onChange={(newIds) => setAttributes({ sectionIds: newIds })}
                        />
                    )}
                    
                    {modalDocsSource === 'articles' && (
                        <TextControl
                            value={articleIds}
                            label={__('Article IDs', 'wedocs')}
                            placeholder={__('Enter article post ID, example: 3, 5', 'wedocs')}
                            onChange={(newIds) => setAttributes({ articleIds: newIds })}
                        />
                    )}
                    
                    {modalDocsSource === 'helpful' && (
                        <RangeControl
                            value={helpfulDocsCount}
                            min={1}
                            max={10}
                            label={__('Number of Helpful Docs', 'wedocs')}
                            onChange={(newCount) => setAttributes({ helpfulDocsCount: newCount })}
                        />
                    )}
                </PanelBody>
                <PanelBody title={__('Search Box Styling', 'wedocs')} initialOpen={false}>
                    <PanelColorSettings
                        colors={colorOptions}
                        colorSettings={[
                            {
                                value: searchBoxStyles.placeholderColor,
                                label: __('Placeholder Color', 'wedocs'),
                                onChange: (newColor) => updateSearchBoxStyles('placeholderColor', newColor),
                            },
                            {
                                value: searchBoxStyles.iconColor,
                                label: __('Icon & Command Key Color', 'wedocs'),
                                onChange: (newColor) => updateSearchBoxStyles('iconColor', newColor),
                            },
                            {
                                value: searchBoxStyles.backgroundColor,
                                label: __('Background Color', 'wedocs'),
                                onChange: (newColor) => updateSearchBoxStyles('backgroundColor', newColor),
                            },
                            {
                                value: searchBoxStyles.borderColor,
                                label: __('Border Color', 'wedocs'),
                                onChange: (newColor) => updateSearchBoxStyles('borderColor', newColor),
                            },
                        ]}
                    />
                    
                    <RangeControl
                        value={parseInt(searchBoxStyles.borderWidth)}
                        min={0}
                        max={10}
                        label={__('Border Width', 'wedocs')}
                        onChange={(newWidth) => updateSearchBoxStyles('borderWidth', `${newWidth}px`)}
                    />
                    
                    <RangeControl
                        value={parseInt(searchBoxStyles.borderRadius)}
                        min={0}
                        max={50}
                        label={__('Border Radius', 'wedocs')}
                        onChange={(newRadius) => updateSearchBoxStyles('borderRadius', `${newRadius}px`)}
                    />
                    
                    <BoxControl
                        values={searchBoxStyles.padding}
                        label={__('Padding', 'wedocs')}
                        onChange={(newPadding) => updateSearchBoxStyles('padding', newPadding)}
                    />
                    
                    <BoxControl
                        values={searchBoxStyles.margin}
                        label={__('Margin', 'wedocs')}
                        onChange={(newMargin) => updateSearchBoxStyles('margin', newMargin)}
                    />
                    
                    <RangeControl
                        value={parseInt(searchBoxStyles.fontSize)}
                        min={12}
                        max={24}
                        label={__('Font Size', 'wedocs')}
                        onChange={(newSize) => updateSearchBoxStyles('fontSize', `${newSize}px`)}
                    />
                    
                    <RangeControl
                        value={parseInt(searchBoxStyles.fontWeight)}
                        min={100}
                        max={900}
                        step={100}
                        label={__('Font Weight', 'wedocs')}
                        onChange={(newWeight) => updateSearchBoxStyles('fontWeight', newWeight.toString())}
                    />
                    
                    <RangeControl
                        value={parseFloat(searchBoxStyles.letterSpacing)}
                        min={-2}
                        max={5}
                        step={0.1}
                        label={__('Letter Spacing', 'wedocs')}
                        onChange={(newSpacing) => updateSearchBoxStyles('letterSpacing', `${newSpacing}px`)}
                    />
                    
                    <RangeControl
                        value={parseFloat(searchBoxStyles.lineHeight)}
                        min={1}
                        max={3}
                        step={0.1}
                        label={__('Line Height', 'wedocs')}
                        onChange={(newHeight) => updateSearchBoxStyles('lineHeight', newHeight.toString())}
                    />
                </PanelBody>

                <PanelBody title={__('Search Modal Styling', 'wedocs')} initialOpen={false}>
                    <p className="'mb-0'">{__('The styling will be shown in the frontend, not in the editor', 'wedocs')}</p>
                    <PanelColorSettings
                        colors={colorOptions}
                        colorSettings={[
                            {
                                value: modalStyles.placeholderColor,
                                label: __('Placeholder Color', 'wedocs'),
                                onChange: (newColor) => updateModalStyles('placeholderColor', newColor),
                            },
                            {
                                value: modalStyles.searchIconColor,
                                label: __('Search Icon Color', 'wedocs'),
                                onChange: (newColor) => updateModalStyles('searchIconColor', newColor),
                            },
                            {
                                value: modalStyles.backgroundColor,
                                label: __('Background Color', 'wedocs'),
                                onChange: (newColor) => updateModalStyles('backgroundColor', newColor),
                            },
                            {
                                value: modalStyles.fieldTextColor,
                                label: __('Field Text Color', 'wedocs'),
                                onChange: (newColor) => updateModalStyles('fieldTextColor', newColor),
                            },
                            {
                                value: modalStyles.listItemIconColor,
                                label: __('List Item Icon Color', 'wedocs'),
                                onChange: (newColor) => updateModalStyles('listItemIconColor', newColor),
                            },
                            {
                                value: modalStyles.listItemTextColor,
                                label: __('List Item Text Color', 'wedocs'),
                                onChange: (newColor) => updateModalStyles('listItemTextColor', newColor),
                            },
                            {
                                value: modalStyles.docLabelColor,
                                label: __('Doc Label Color', 'wedocs'),
                                onChange: (newColor) => updateModalStyles('docLabelColor', newColor),
                            },
                            {
                                value: modalStyles.sectionLabelColor,
                                label: __('Section Label Color', 'wedocs'),
                                onChange: (newColor) => updateModalStyles('sectionLabelColor', newColor),
                            },
                        ]}
                    />
                    
                    <BoxControl
                        values={modalStyles.listItemPadding}
                        label={__('List Item Padding', 'wedocs')}
                        onChange={(newPadding) => updateModalStyles('listItemPadding', newPadding)}
                    />
                    
                    <BoxControl
                        values={modalStyles.listItemMargin}
                        label={__('List Item Margin', 'wedocs')}
                        onChange={(newMargin) => updateModalStyles('listItemMargin', newMargin)}
                    />
                    
                    <PanelColorSettings
                        colors={colorOptions}
                        colorSettings={[
                            {
                                value: modalStyles.listItemBorderColor,
                                label: __('List Item Border Color', 'wedocs'),
                                onChange: (newColor) => updateModalStyles('listItemBorderColor', newColor),
                            },
                        ]}
                    />
                    
                    <RangeControl
                        value={parseInt(modalStyles.listItemBorderWidth)}
                        min={0}
                        max={5}
                        label={__('List Item Border Width', 'wedocs')}
                        onChange={(newWidth) => updateModalStyles('listItemBorderWidth', `${newWidth}px`)}
                    />
                    
                    <RangeControl
                        value={parseInt(modalStyles.listItemBorderRadius)}
                        min={0}
                        max={20}
                        label={__('List Item Border Radius', 'wedocs')}
                        onChange={(newRadius) => updateModalStyles('listItemBorderRadius', `${newRadius}px`)}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className='wedocs-document'>
                    <div
                    className="wedocs-quick-search-editor wedocs-quick-search-block-editor"
                    >
                        <div
                            className="flex rounded-md"
                            style={{
                                backgroundColor: searchBoxStyles.backgroundColor,
                                borderColor: searchBoxStyles.borderColor,
                                borderWidth: searchBoxStyles.borderWidth,
                                borderRadius: searchBoxStyles.borderRadius,
                                marginTop: searchBoxStyles.margin.top,
                                marginRight: searchBoxStyles.margin.right,
                                marginBottom: searchBoxStyles.margin.bottom,
                                marginLeft: searchBoxStyles.margin.left,
                            }}>
                            <input
                                id="wedocs-quick-search"
                                placeholder={searchBoxPlaceholder}
                                type="text" 
                                name="search" 
                                disabled="disabled"
                                className="block min-w-0 grow focus:outline focus:outline-0 !border-none focus:!shadow-none disabled:!shadow-none"
                                style={{
                                    color: searchBoxStyles.placeholderColor,
                                    backgroundColor: 'transparent',
                                    borderRadius: searchBoxStyles.borderRadius,
                                    fontSize: searchBoxStyles.fontSize,
                                    fontWeight: searchBoxStyles.fontWeight,
                                    letterSpacing: searchBoxStyles.letterSpacing,
                                    lineHeight: searchBoxStyles.lineHeight,
                                    paddingTop: searchBoxStyles.padding.top,
                                    paddingRight: searchBoxStyles.padding.right,
                                    paddingBottom: searchBoxStyles.padding.bottom,
                                    paddingLeft: searchBoxStyles.padding.left,
                                }}
                            />
                            <style>
                                {`
                                    #wedocs-quick-search::placeholder {
                                        color: ${searchBoxStyles.placeholderColor} !important;
                                    }
                                    #wedocs-quick-search::-webkit-input-placeholder {
                                        color: ${searchBoxStyles.placeholderColor} !important;
                                    }
                                    #wedocs-quick-search::-moz-placeholder {
                                        color: ${searchBoxStyles.placeholderColor} !important;
                                    }
                                    #wedocs-quick-search:-ms-input-placeholder {
                                        color: ${searchBoxStyles.placeholderColor} !important;
                                    }
                                `}
                            </style>
                            <div className="flex py-1.5 pr-1.5">
                                <kbd 
                                    className="inline-flex items-center rounded border px-1 font-sans text-xs"
                                    style={{
                                        color: searchBoxStyles.iconColor,
                                    }}>
                                    ⌘K
                                </kbd>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Edit;