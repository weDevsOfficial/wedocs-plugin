import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { useBlockProps, InspectorControls, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { 
    PanelBody, 
    SelectControl, 
    ToggleControl, 
    TextControl,
    PanelRow 
} from '@wordpress/components';
import Inspector from './Inspector';

const Edit = ({ attributes, setAttributes }) => {
    const blockProps = useBlockProps();
    
    const {
        layout,
        alignment,
        buttonText,
        showIcon,
        padding,
        margin,
        backgroundColor,
        textColor,
        hoverBackgroundColor,
        hoverTextColor,
        borderRadius,
        borderWidth,
        borderColor,
        borderStyle,
        fontSize,
        fontWeight,
        additionalClasses
    } = attributes;

    // Apply inline styles
    const buttonInlineStyles = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: showIcon ? '8px' : '0',
        padding: `${padding.top} ${padding.right} ${padding.bottom} ${padding.left}`,
        margin: `${margin.top} ${margin.right} ${margin.bottom} ${margin.left}`,
        backgroundColor: backgroundColor,
        color: textColor,
        border: `${borderWidth} ${borderStyle} ${borderColor}`,
        borderRadius: borderRadius,
        fontSize: fontSize,
        fontWeight: fontWeight,
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '--hover-bg-color': hoverBackgroundColor,
        '--hover-text-color': hoverTextColor
    };

    // Container alignment styles
    const containerStyles = {
        textAlign: alignment,
        width: '100%'
    };

    // Layout variations
    const renderLayout = () => {
        switch (layout) {
            case 'layout2':
                return (
                    <div style={containerStyles}>
                        <button
                            className={`wedocs-print-button layout-2 ${additionalClasses}`}
                            style={buttonInlineStyles}
                            onClick={(e) => e.preventDefault()}
                        >
                            {showIcon && <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/></svg>}
                            <span>{buttonText || __('Print', 'wedocs')}</span>
                        </button>
                        <style dangerouslySetInnerHTML={{
                            __html: `
                                .wedocs-print-button:hover {
                                    background-color: var(--hover-bg-color) !important;
                                    color: var(--hover-text-color) !important;
                                }
                            `
                        }} />
                    </div>
                );
            case 'layout3':
                return (
                    <div style={containerStyles}>
                        <button
                            className={`wedocs-print-button layout-3 ${additionalClasses}`}
                            style={{
                                ...buttonInlineStyles,
                                flexDirection: 'column',
                                gap: '4px'
                            }}
                            onClick={(e) => e.preventDefault()}
                        >
                            {showIcon && <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/></svg>}
                            <span style={{ fontSize: '12px' }}>{buttonText || __('Print', 'wedocs')}</span>
                        </button>
                        <style dangerouslySetInnerHTML={{
                            __html: `
                                .wedocs-print-button:hover {
                                    background-color: var(--hover-bg-color) !important;
                                    color: var(--hover-text-color) !important;
                                }
                            `
                        }} />
                    </div>
                );
            default: // layout1
                return (
                    <div style={containerStyles}>
                        <button
                            className={`wedocs-print-button layout-1 ${additionalClasses}`}
                            style={buttonInlineStyles}
                            onClick={(e) => e.preventDefault()}
                        >
                            {showIcon && <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/></svg>}
                            <span>{buttonText || __('Print', 'wedocs')}</span>
                        </button>
                        <style dangerouslySetInnerHTML={{
                            __html: `
                                .wedocs-print-button:hover {
                                    background-color: var(--hover-bg-color) !important;
                                    color: var(--hover-text-color) !important;
                                }
                            `
                        }} />
                    </div>
                );
        }
    };

    return (
        <Fragment>
            <BlockControls>
                <AlignmentToolbar
                    value={alignment}
                    onChange={(newAlignment) => setAttributes({ alignment: newAlignment || 'left' })}
                />
            </BlockControls>
            
            <InspectorControls>
                <PanelBody title={__('General Settings', 'wedocs')} initialOpen={true}>
                    <SelectControl
                        label={__('Layout', 'wedocs')}
                        value={layout}
                        options={[
                            { label: __('Layout 1 - Horizontal', 'wedocs'), value: 'layout1' },
                            { label: __('Layout 2 - Button Style', 'wedocs'), value: 'layout2' },
                            { label: __('Layout 3 - Vertical', 'wedocs'), value: 'layout3' }
                        ]}
                        onChange={(value) => setAttributes({ layout: value })}
                    />
                    
                    <TextControl
                        label={__('Button Text', 'wedocs')}
                        value={buttonText}
                        onChange={(value) => setAttributes({ buttonText: value })}
                        placeholder={__('Print', 'wedocs')}
                    />
                    
                    <PanelRow>
                        <ToggleControl
                            label={__('Show Print Icon', 'wedocs')}
                            checked={showIcon}
                            onChange={(value) => setAttributes({ showIcon: value })}
                        />
                    </PanelRow>
                </PanelBody>
                
                <Inspector attributes={attributes} setAttributes={setAttributes} />
                
                <PanelBody title={__('Advanced', 'wedocs')} initialOpen={false}>
                    <TextControl
                        label={__('Additional CSS Classes', 'wedocs')}
                        value={additionalClasses}
                        onChange={(value) => setAttributes({ additionalClasses: value })}
                        help={__('Add custom CSS classes separated by spaces', 'wedocs')}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="wedocs-print-button-wrapper">
                    {renderLayout()}
                </div>
            </div>
        </Fragment>
    );
};

export default Edit;
