/**
 * Input Controls Component
 * Comprehensive controls for input fields, textareas, and form elements
 */

import { __ } from '@wordpress/i18n';
import { PanelColorSettings } from '@wordpress/block-editor';
import {
    PanelBody,
    SelectControl,
    RangeControl,
    ToggleControl,
    __experimentalBoxControl as BoxControl,
    __experimentalUnitControl as UnitControl,
    __experimentalBorderControl as BorderControl,
    __experimentalDivider as Divider,
} from '@wordpress/components';

/**
 * Input Field Controls Panel
 * Complete input styling controls
 */
export const InputFieldControls = ({
    title = __('Input Field Settings', 'wedocs'),
    // Color attributes
    backgroundColor,
    textColor,
    placeholderColor,
    borderColor,
    focusBackgroundColor,
    focusTextColor,
    focusBorderColor,
    // Dimension attributes
    width,
    height,
    padding,
    margin,
    // Border attributes
    border,
    borderRadius,
    focusBoxShadow,
    // Typography
    fontSize,
    fontWeight,
    // Callbacks
    onBackgroundColorChange,
    onTextColorChange,
    onPlaceholderColorChange,
    onBorderColorChange,
    onFocusBackgroundColorChange,
    onFocusTextColorChange,
    onFocusBorderColorChange,
    onWidthChange,
    onHeightChange,
    onPaddingChange,
    onMarginChange,
    onBorderChange,
    onBorderRadiusChange,
    onFocusBoxShadowChange,
    onFontSizeChange,
    onFontWeightChange,
    // Visibility
    showDimensions = true,
    showSpacing = true,
    showBorder = true,
    showTypography = true,
    showFocusState = true,
    initialOpen = false
}) => {
    return (
        <PanelBody title={title} initialOpen={initialOpen}>
            {/* Color Settings */}
            <PanelColorSettings
                title={__('Input Colors', 'wedocs')}
                colorSettings={[
                    {
                        label: __('Background Color', 'wedocs'),
                        value: backgroundColor,
                        onChange: onBackgroundColorChange,
                    },
                    {
                        label: __('Text Color', 'wedocs'),
                        value: textColor,
                        onChange: onTextColorChange,
                    },
                    ...(onPlaceholderColorChange ? [{
                        label: __('Placeholder Color', 'wedocs'),
                        value: placeholderColor,
                        onChange: onPlaceholderColorChange,
                    }] : []),
                ].filter(Boolean)}
                __experimentalHasMultipleOrigins
                __experimentalIsRenderedInSidebar
            />

            {showFocusState && (
                <>
                    <Divider />
                    <PanelColorSettings
                        title={__('Focus State Colors', 'wedocs')}
                        colorSettings={[
                            ...(onFocusBackgroundColorChange ? [{
                                label: __('Focus Background', 'wedocs'),
                                value: focusBackgroundColor,
                                onChange: onFocusBackgroundColorChange,
                            }] : []),
                            ...(onFocusTextColorChange ? [{
                                label: __('Focus Text', 'wedocs'),
                                value: focusTextColor,
                                onChange: onFocusTextColorChange,
                            }] : []),
                            ...(onFocusBorderColorChange ? [{
                                label: __('Focus Border', 'wedocs'),
                                value: focusBorderColor,
                                onChange: onFocusBorderColorChange,
                            }] : []),
                        ].filter(Boolean)}
                        __experimentalHasMultipleOrigins
                        __experimentalIsRenderedInSidebar
                    />
                </>
            )}

            <Divider />

            {/* Dimensions */}
            {showDimensions && (
                <>
                    <h3 style={{ marginBottom: '8px', fontSize: '13px', fontWeight: 500 }}>
                        {__('Dimensions', 'wedocs')}
                    </h3>
                    {onWidthChange && (
                        <UnitControl
                            label={__('Width', 'wedocs')}
                            value={width}
                            onChange={onWidthChange}
                            units={[
                                { value: 'px', label: 'px' },
                                { value: '%', label: '%' },
                                { value: 'em', label: 'em' },
                                { value: 'rem', label: 'rem' },
                                { value: 'auto', label: 'auto' }
                            ]}
                        />
                    )}
                    {onHeightChange && (
                        <UnitControl
                            label={__('Height', 'wedocs')}
                            value={height}
                            onChange={onHeightChange}
                            units={[
                                { value: 'px', label: 'px' },
                                { value: 'em', label: 'em' },
                                { value: 'rem', label: 'rem' },
                                { value: 'auto', label: 'auto' }
                            ]}
                        />
                    )}
                    <Divider />
                </>
            )}

            {/* Spacing */}
            {showSpacing && (
                <>
                    {onPaddingChange && (
                        <BoxControl
                            label={__('Padding', 'wedocs')}
                            values={padding}
                            onChange={onPaddingChange}
                            units={[
                                { value: 'px', label: 'px' },
                                { value: 'em', label: 'em' },
                                { value: 'rem', label: 'rem' }
                            ]}
                        />
                    )}
                    {onMarginChange && (
                        <BoxControl
                            label={__('Margin', 'wedocs')}
                            values={margin}
                            onChange={onMarginChange}
                            units={[
                                { value: 'px', label: 'px' },
                                { value: 'em', label: 'em' },
                                { value: 'rem', label: 'rem' },
                                { value: 'auto', label: 'auto' }
                            ]}
                        />
                    )}
                    <Divider />
                </>
            )}

            {/* Border */}
            {showBorder && onBorderChange && (
                <>
                    <BorderControl
                        label={__('Border', 'wedocs')}
                        value={border}
                        onChange={onBorderChange}
                    />
                    {onBorderRadiusChange && (
                        <BoxControl
                            label={__('Border Radius', 'wedocs')}
                            values={borderRadius}
                            onChange={onBorderRadiusChange}
                            units={[
                                { value: 'px', label: 'px' },
                                { value: '%', label: '%' },
                                { value: 'em', label: 'em' }
                            ]}
                        />
                    )}
                    {showFocusState && onFocusBoxShadowChange && (
                        <UnitControl
                            label={__('Focus Box Shadow', 'wedocs')}
                            value={focusBoxShadow}
                            onChange={onFocusBoxShadowChange}
                            help={__('Example: 0 0 0 3px rgba(0,123,255,0.25)', 'wedocs')}
                        />
                    )}
                    <Divider />
                </>
            )}

            {/* Typography */}
            {showTypography && (
                <>
                    {onFontSizeChange && (
                        <UnitControl
                            label={__('Font Size', 'wedocs')}
                            value={fontSize}
                            onChange={onFontSizeChange}
                            units={[
                                { value: 'px', label: 'px' },
                                { value: 'em', label: 'em' },
                                { value: 'rem', label: 'rem' }
                            ]}
                        />
                    )}
                    {onFontWeightChange && (
                        <SelectControl
                            label={__('Font Weight', 'wedocs')}
                            value={fontWeight}
                            onChange={onFontWeightChange}
                            options={[
                                { label: __('Normal (400)', 'wedocs'), value: '400' },
                                { label: __('Medium (500)', 'wedocs'), value: '500' },
                                { label: __('Semi Bold (600)', 'wedocs'), value: '600' },
                                { label: __('Bold (700)', 'wedocs'), value: '700' },
                            ]}
                        />
                    )}
                </>
            )}
        </PanelBody>
    );
};

/**
 * Label Controls Panel
 * Controls for form labels
 */
export const LabelControls = ({
    title = __('Label Settings', 'wedocs'),
    labelColor,
    labelFontSize,
    labelFontWeight,
    labelMargin,
    labelPadding,
    onLabelColorChange,
    onLabelFontSizeChange,
    onLabelFontWeightChange,
    onLabelMarginChange,
    onLabelPaddingChange,
    initialOpen = false
}) => {
    return (
        <PanelBody title={title} initialOpen={initialOpen}>
            {onLabelColorChange && (
                <PanelColorSettings
                    title={__('Label Color', 'wedocs')}
                    colorSettings={[
                        {
                            label: __('Label Color', 'wedocs'),
                            value: labelColor,
                            onChange: onLabelColorChange,
                        }
                    ]}
                    __experimentalHasMultipleOrigins
                    __experimentalIsRenderedInSidebar
                />
            )}

            {onLabelFontSizeChange && (
                <UnitControl
                    label={__('Font Size', 'wedocs')}
                    value={labelFontSize}
                    onChange={onLabelFontSizeChange}
                    units={[
                        { value: 'px', label: 'px' },
                        { value: 'em', label: 'em' },
                        { value: 'rem', label: 'rem' }
                    ]}
                />
            )}

            {onLabelFontWeightChange && (
                <SelectControl
                    label={__('Font Weight', 'wedocs')}
                    value={labelFontWeight}
                    onChange={onLabelFontWeightChange}
                    options={[
                        { label: __('Normal (400)', 'wedocs'), value: '400' },
                        { label: __('Medium (500)', 'wedocs'), value: '500' },
                        { label: __('Semi Bold (600)', 'wedocs'), value: '600' },
                        { label: __('Bold (700)', 'wedocs'), value: '700' },
                    ]}
                />
            )}

            {onLabelPaddingChange && (
                <BoxControl
                    label={__('Padding', 'wedocs')}
                    values={labelPadding}
                    onChange={onLabelPaddingChange}
                    units={[
                        { value: 'px', label: 'px' },
                        { value: 'em', label: 'em' },
                        { value: 'rem', label: 'rem' }
                    ]}
                />
            )}

            {onLabelMarginChange && (
                <BoxControl
                    label={__('Margin', 'wedocs')}
                    values={labelMargin}
                    onChange={onLabelMarginChange}
                    units={[
                        { value: 'px', label: 'px' },
                        { value: 'em', label: 'em' },
                        { value: 'rem', label: 'rem' }
                    ]}
                />
            )}
        </PanelBody>
    );
};

/**
 * Textarea Controls Panel
 * Controls specific to textarea elements
 */
export const TextareaControls = ({
    title = __('Textarea Settings', 'wedocs'),
    minHeight,
    maxHeight,
    resize,
    onMinHeightChange,
    onMaxHeightChange,
    onResizeChange,
    ...inputFieldProps
}) => {
    return (
        <>
            <InputFieldControls {...inputFieldProps} title={title} />
            <PanelBody title={__('Textarea Specific', 'wedocs')} initialOpen={false}>
                {onMinHeightChange && (
                    <UnitControl
                        label={__('Minimum Height', 'wedocs')}
                        value={minHeight}
                        onChange={onMinHeightChange}
                        units={[
                            { value: 'px', label: 'px' },
                            { value: 'em', label: 'em' },
                            { value: 'rem', label: 'rem' }
                        ]}
                    />
                )}

                {onMaxHeightChange && (
                    <UnitControl
                        label={__('Maximum Height', 'wedocs')}
                        value={maxHeight}
                        onChange={onMaxHeightChange}
                        units={[
                            { value: 'px', label: 'px' },
                            { value: 'em', label: 'em' },
                            { value: 'rem', label: 'rem' }
                        ]}
                    />
                )}

                {onResizeChange && (
                    <SelectControl
                        label={__('Resize', 'wedocs')}
                        value={resize}
                        onChange={onResizeChange}
                        options={[
                            { label: __('None', 'wedocs'), value: 'none' },
                            { label: __('Both', 'wedocs'), value: 'both' },
                            { label: __('Horizontal', 'wedocs'), value: 'horizontal' },
                            { label: __('Vertical', 'wedocs'), value: 'vertical' },
                        ]}
                    />
                )}
            </PanelBody>
        </>
    );
};

export default InputFieldControls;
