import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { Fragment } from '@wordpress/element';
import { useBlockProps, InspectorControls, PanelColorSettings, useBlockEditContext } from '@wordpress/block-editor';
import {
    PanelBody,
    SelectControl,
    __experimentalBoxControl as BoxControl,
    RangeControl,
    ToggleControl
} from '@wordpress/components';

const Edit = ({ attributes, setAttributes }) => {
    const blockProps = useBlockProps();
    const { clientId } = useBlockEditContext();
    const { selectBlock } = useDispatch('core/block-editor');
    const {
        seoLinks,
        navPadding,
        navMargin,
        navBorderStyle,
        navBorderRadius,
        navBorderWidth,
        navBorderColor,
        navShadow,
        customShadowHorizontal,
        customShadowVertical,
        customShadowBlur,
        customShadowSpread,
        customShadowColor,
        customShadowOpacity,
        customShadowInset,
        navigationTextColor,
        navigationTextHoverColor,
        navigationFontSize,
        navigationFontWeight,
        navigationFontStyle,
        arrowSize,
        arrowColor,
        arrowBackgroundColor,
        arrowPadding,
        arrowMargin
    } = attributes;

    const renderPreview = () => {
        // Build custom shadow if selected
        let shadowValue = navShadow || 'none';
        if (navShadow === 'custom') {
            const opacity = (customShadowOpacity || 25) / 100;
            const color = customShadowColor || '#000000';
            const rgbaColor = color.startsWith('#') 
                ? `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${opacity})`
                : color;
            
            const inset = customShadowInset ? 'inset ' : '';
            shadowValue = `${inset}${customShadowHorizontal || 0}px ${customShadowVertical || 0}px ${customShadowBlur || 0}px ${customShadowSpread || 0}px ${rgbaColor}`;
        }

        const navItemStyle = {
            padding: navPadding ? `${navPadding.top} ${navPadding.right} ${navPadding.bottom} ${navPadding.left}` : '12px 16px',
            margin: navMargin ? `${navMargin.top} ${navMargin.right} ${navMargin.bottom} ${navMargin.left}` : '0',
            borderStyle: navBorderStyle || 'none',
            borderWidth: navBorderWidth || '1px',
            borderColor: navBorderColor || '#dddddd',
            borderRadius: navBorderRadius || '4px',
            boxShadow: shadowValue
        };

        const navigationStyle = {
            color: navigationTextColor || '#333333',
            fontSize: navigationFontSize || '16px',
            fontWeight: navigationFontWeight || '400',
            fontStyle: navigationFontStyle || 'normal'
        };

        const arrowStyle = {
            fontSize: arrowSize || '16px',
            color: arrowColor || '#333333',
            backgroundColor: arrowBackgroundColor || 'transparent',
            padding: arrowPadding ? `${arrowPadding.top} ${arrowPadding.right} ${arrowPadding.bottom} ${arrowPadding.left}` : '8px',
            margin: arrowMargin ? `${arrowMargin.top} ${arrowMargin.right} ${arrowMargin.bottom} ${arrowMargin.left}` : '0 8px 0 0'
        };

        return (
            <div 
                {...blockProps} 
                className="wedocs-document wedocs-doc-navigation-preview"
                onClick={(e) => {
                    e.stopPropagation();
                    selectBlock(clientId);
                }}
            >
                <div className="wedocs-doc-navigation flex justify-between">
                    <div className="wedocs-doc-nav-prev" style={navItemStyle}>
                        <span className="wedocs-doc-nav-arrow" style={arrowStyle}>←</span>
                        <span className="wedocs-doc-nav-title" style={navigationStyle}>
                            {__('Previous Document', 'wedocs')}
                        </span>
                    </div>
                    
                    <div className="wedocs-doc-nav-next" style={navItemStyle}>
                        <span className="wedocs-doc-nav-title" style={navigationStyle}>
                            {__('Next Document', 'wedocs')}
                        </span>
                        <span className="wedocs-doc-nav-arrow" style={arrowStyle}>→</span>
                    </div>
                </div>
            </div>
        );
    };

    // Fetch theme colors and gradients
    const { themeColors, themeGradients } = useSelect((select) => {
        const editorSettings = select('core/block-editor').getSettings();
        return {
            themeColors: editorSettings.colors,
            themeGradients: editorSettings.gradients,
        };
    });

    // Control options
    const seoLinksOptions = [
        { label: __('None', 'wedocs'), value: 'none' },
        { label: __('Add rel', 'wedocs'), value: 'prev_next' }
    ];

    const borderStyleOptions = [
        { label: __('None', 'wedocs'), value: 'none' },
        { label: __('Solid', 'wedocs'), value: 'solid' },
        { label: __('Dashed', 'wedocs'), value: 'dashed' },
        { label: __('Dotted', 'wedocs'), value: 'dotted' }
    ];

    const fontWeightOptions = [
        { label: __('Normal', 'wedocs'), value: '400' },
        { label: __('Bold', 'wedocs'), value: '700' },
        { label: __('Light', 'wedocs'), value: '300' }
    ];

    const fontStyleOptions = [
        { label: __('Normal', 'wedocs'), value: 'normal' },
        { label: __('Italic', 'wedocs'), value: 'italic' }
    ];

    const colors = [
        { name: 'Sweet', color: '#F43F5E' },
        { name: 'Orange', color: '#F97316' },
        { name: 'Yellow', color: '#FACC15' },
        { name: 'Purple', color: '#8B5CF6' },
        { name: 'Light Blue', color: '#3B82F6' },
        { name: 'Light Green', color: '#10B981' },
    ];

    // Update handlers
    const updateAttribute = (attributeName) => (value) => {
        setAttributes({ [attributeName]: value });
    };

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody
                    title={__('SEO Settings', 'wedocs')}
                    initialOpen={true}
                >
                    <SelectControl
                        value={seoLinks}
                        options={seoLinksOptions}
                        label={__('SEO Links', 'wedocs')}
                        help={__('Add rel="prev" and rel="next" to previous and next document links', 'wedocs')}
                        onChange={updateAttribute('seoLinks')}
                    />
                </PanelBody>
            </InspectorControls>

             <InspectorControls group="styles">
                 <PanelBody
                     title={__('Navigation Item Styles', 'wedocs')}
                     initialOpen={true}
                 >   
                     <BoxControl
                         label={__('Padding', 'wedocs')}
                         values={navPadding}
                         onChange={updateAttribute('navPadding')}
                     />

                    <PanelColorSettings
                         colors={[
                             {
                                 colors: themeColors,
                                 name: __('Theme', 'wedocs'),
                             }
                         ]}
                         colorSettings={[
                             {
                                 value: navBorderColor,
                                 label: __('Border Color', 'wedocs'),
                                 onChange: (newBorderColor) => updateAttribute('navBorderColor')(newBorderColor)
                             }
                         ]}
                     />
                     
                     <BoxControl
                         label={__('Margin', 'wedocs')}
                         values={navMargin}
                         onChange={updateAttribute('navMargin')}
                     />
                     
                     <SelectControl
                         label={__('Border Style', 'wedocs')}
                         value={navBorderStyle}
                         options={borderStyleOptions}
                         onChange={updateAttribute('navBorderStyle')}
                     />
                     
                     <SelectControl
                         label={__('Border Width', 'wedocs')}
                         value={navBorderWidth}
                         options={[
                             { label: '0px', value: '0px' },
                             { label: '1px', value: '1px' },
                             { label: '2px', value: '2px' },
                             { label: '3px', value: '3px' },
                             { label: '4px', value: '4px' },
                             { label: '5px', value: '5px' }
                         ]}
                         onChange={updateAttribute('navBorderWidth')}
                     />
                     
                     <SelectControl
                         label={__('Border Radius', 'wedocs')}
                         value={navBorderRadius}
                         options={[
                             { label: '0px', value: '0px' },
                             { label: '4px', value: '4px' },
                             { label: '8px', value: '8px' },
                             { label: '12px', value: '12px' },
                             { label: '16px', value: '16px' },
                             { label: '20px', value: '20px' }
                         ]}
                         onChange={updateAttribute('navBorderRadius')}
                     />
                     
                     <SelectControl
                         label={__('Shadow', 'wedocs')}
                         value={navShadow}
                         options={[
                             { label: __('None', 'wedocs'), value: 'none' },
                             { label: __('Natural', 'wedocs'), value: '6px 6px 9px rgba(0, 0, 0, 0.2)' },
                             { label: __('Deep', 'wedocs'), value: '12px 12px 50px rgba(0, 0, 0, 0.4)' },
                             { label: __('Sharp', 'wedocs'), value: '6px 6px 0px rgba(0, 0, 0, 0.2)' },
                             { label: __('Outlined', 'wedocs'), value: '6px 6px 0px -3px rgba(255, 255, 255, 1), 6px 6px rgba(0, 0, 0, 1)' },
                             { label: __('Crisp', 'wedocs'), value: '6px 6px 0px rgba(0, 0, 0, 1)' },
                             { label: __('Custom', 'wedocs'), value: 'custom' }
                         ]}
                         onChange={updateAttribute('navShadow')}
                     />
                     
                     {navShadow === 'custom' && (
                         <>
                             <RangeControl
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                     label={__('Horizontal Offset', 'wedocs')}
                                     value={customShadowHorizontal}
                                     onChange={updateAttribute('customShadowHorizontal')}
                                     min={-50}
                                     max={50}
                                     step={1}
                                 />
                             
                             <RangeControl
                                label={__('Vertical Offset', 'wedocs')}
                                value={customShadowVertical}
                                onChange={updateAttribute('customShadowVertical')}
                                min={-50}
                                max={50}
                                step={1}
                            />
                             
                            <RangeControl
                                label={__('Blur Radius', 'wedocs')}
                                value={customShadowBlur}
                                onChange={updateAttribute('customShadowBlur')}
                                min={0}
                                max={50}
                                step={1}
                            />
                             
                            <RangeControl
                                label={__('Spread Radius', 'wedocs')}
                                value={customShadowSpread}
                                onChange={updateAttribute('customShadowSpread')}
                                min={-20}
                                max={20}
                                step={1}
                            />
                             
                             <PanelColorSettings
                                 colors={[
                                     {
                                         colors: themeColors,
                                         name: __('Theme', 'wedocs'),
                                     }
                                 ]}
                                 colorSettings={[
                                     {
                                         value: customShadowColor,
                                         label: __('Shadow Color', 'wedocs'),
                                         onChange: (newColor) => updateAttribute('customShadowColor')(newColor)
                                     }
                                 ]}
                             />
                             
                            <RangeControl
                                label={__('Opacity', 'wedocs')}
                                value={customShadowOpacity}
                                onChange={updateAttribute('customShadowOpacity')}
                                min={0}
                                max={100}
                                step={5}
                            />
                             
                            <ToggleControl
                                label={__('Inset Shadow', 'wedocs')}
                                checked={customShadowInset}
                                onChange={updateAttribute('customShadowInset')}
                                help={__('Create an inner shadow instead of an outer shadow', 'wedocs')}
                            />
                             
                             <div style={{ 
                                padding: '8px', 
                                backgroundColor: '#f0f0f0', 
                                borderRadius: '4px',
                                fontFamily: 'monospace',
                                fontSize: '12px',
                                marginTop: '8px'
                            }}>
                                <strong>{__('Preview:', 'wedocs')}</strong><br/>
                                {customShadowInset ? 'inset ' : ''}
                                {customShadowHorizontal || 0}px {customShadowVertical || 0}px {customShadowBlur || 0}px {customShadowSpread || 0}px {customShadowColor || '#000000'}
                            </div>
                         </>
                     )}
                 </PanelBody>

                <PanelBody
                    title={__('Navigation Styles', 'wedocs')}
                    initialOpen={false}
                >
                    <PanelColorSettings
                        colors={colors}
                        colorSettings={[
                            {
                                value: navigationTextColor,
                                label: __('Navigation Text Color', 'wedocs'),
                                onChange: (newTextColor) => updateAttribute('navigationTextColor')(newTextColor)
                            },
                            {
                                value: navigationTextHoverColor,
                                label: __('Navigation Text Hover Color', 'wedocs'),
                                onChange: (newHoverColor) => updateAttribute('navigationTextHoverColor')(newHoverColor)
                            }
                        ]}
                    />
                    
                    <SelectControl
                        label={__('Font Size', 'wedocs')}
                        value={navigationFontSize}
                        options={[
                            { label: '12px', value: '12px' },
                            { label: '14px', value: '14px' },
                            { label: '16px', value: '16px' },
                            { label: '18px', value: '18px' },
                            { label: '20px', value: '20px' },
                            { label: '24px', value: '24px' }
                        ]}
                        onChange={updateAttribute('navigationFontSize')}
                    />
                    
                    <SelectControl
                        label={__('Font Weight', 'wedocs')}
                        value={navigationFontWeight}
                        options={fontWeightOptions}
                        onChange={updateAttribute('navigationFontWeight')}
                    />
                    
                    <SelectControl
                        label={__('Font Style', 'wedocs')}
                        value={navigationFontStyle}
                        options={fontStyleOptions}
                        onChange={updateAttribute('navigationFontStyle')}
                    />
                    
                    <SelectControl
                        label={__('Arrow Size', 'wedocs')}
                        value={arrowSize}
                        options={[
                            { label: '12px', value: '12px' },
                            { label: '14px', value: '14px' },
                            { label: '16px', value: '16px' },
                            { label: '18px', value: '18px' },
                            { label: '20px', value: '20px' },
                            { label: '24px', value: '24px' }
                        ]}
                        onChange={updateAttribute('arrowSize')}
                    />
                    
                    <PanelColorSettings
                        colors={colors}
                        colorSettings={[
                            {
                                value: arrowColor,
                                label: __('Arrow Color', 'wedocs'),
                                onChange: (newArrowColor) => updateAttribute('arrowColor')(newArrowColor)
                            },
                            {
                                value: arrowBackgroundColor,
                                label: __('Arrow Background Color', 'wedocs'),
                                onChange: (newArrowBgColor) => updateAttribute('arrowBackgroundColor')(newArrowBgColor)
                            }
                        ]}
                    />
                    
                    <BoxControl
                        label={__('Arrow Padding', 'wedocs')}
                        values={arrowPadding}
                        onChange={updateAttribute('arrowPadding')}
                    />
                    
                    <BoxControl
                        label={__('Arrow Margin', 'wedocs')}
                        values={arrowMargin}
                        onChange={updateAttribute('arrowMargin')}
                    />
                </PanelBody>
            </InspectorControls>

            {renderPreview()}
        </Fragment>
    );
};

export default Edit;
