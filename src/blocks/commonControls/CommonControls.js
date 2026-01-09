/**
 * Common Control Components
 * Reusable control components for weDocs blocks
 */

import { __ } from '@wordpress/i18n';
import { PanelColorSettings } from '@wordpress/block-editor';
import {
    PanelBody,
    SelectControl,
    __experimentalBoxControl as BoxControl,
    __experimentalUnitControl as UnitControl,
} from '@wordpress/components';

/**
 * Color Settings Panel
 * Standardized color control panel with theme color support
 */
export const ColorSettingsPanel = ({ title = __('Colors', 'wedocs'), colorSettings, initialOpen = false }) => {
    return (
        <PanelBody title={title} initialOpen={initialOpen}>
            <PanelColorSettings
                title={__('Color Settings', 'wedocs')}
                colorSettings={colorSettings}
                __experimentalHasMultipleOrigins
                __experimentalIsRenderedInSidebar
            />
        </PanelBody>
    );
};

/**
 * Spacing Control Panel
 * Padding and Margin controls
 */
export const SpacingPanel = ({
    title = __('Spacing', 'wedocs'),
    padding,
    margin,
    onPaddingChange,
    onMarginChange,
    showPadding = true,
    showMargin = true,
    initialOpen = false
}) => {
    return (
        <PanelBody title={title} initialOpen={initialOpen}>
            {showPadding && (
                <BoxControl
                    label={__('Padding', 'wedocs')}
                    values={padding}
                    onChange={onPaddingChange}
                    resetValues={{
                        top: '0px',
                        right: '0px',
                        bottom: '0px',
                        left: '0px'
                    }}
                />
            )}

            {showMargin && (
                <BoxControl
                    label={__('Margin', 'wedocs')}
                    values={margin}
                    onChange={onMarginChange}
                    resetValues={{
                        top: '0px',
                        right: '0px',
                        bottom: '0px',
                        left: '0px'
                    }}
                />
            )}
        </PanelBody>
    );
};

/**
 * Border Control Panel
 * Complete border control with style, width, color, and radius
 */
export const BorderPanel = ({
    title = __('Border', 'wedocs'),
    borderStyle,
    borderWidth,
    borderColor,
    borderRadius,
    onStyleChange,
    onWidthChange,
    onColorChange,
    onRadiusChange,
    initialOpen = false
}) => {
    const borderStyleOptions = [
        { label: __('None', 'wedocs'), value: 'none' },
        { label: __('Solid', 'wedocs'), value: 'solid' },
        { label: __('Dashed', 'wedocs'), value: 'dashed' },
        { label: __('Dotted', 'wedocs'), value: 'dotted' },
        { label: __('Double', 'wedocs'), value: 'double' },
    ];

    return (
        <PanelBody title={title} initialOpen={initialOpen}>
            <SelectControl
                label={__('Border Style', 'wedocs')}
                value={borderStyle}
                options={borderStyleOptions}
                onChange={onStyleChange}
            />

            {borderStyle && borderStyle !== 'none' && (
                <>
                    {typeof borderWidth === 'object' ? (
                        <BoxControl
                            label={__('Border Width', 'wedocs')}
                            values={borderWidth}
                            onChange={onWidthChange}
                        />
                    ) : (
                        <UnitControl
                            label={__('Border Width', 'wedocs')}
                            value={borderWidth}
                            onChange={onWidthChange}
                        />
                    )}

                    <PanelColorSettings
                        title={__('Border Color', 'wedocs')}
                        colorSettings={[
                            {
                                value: borderColor,
                                onChange: onColorChange,
                                label: __('Border Color', 'wedocs'),
                            },
                        ]}
                    />

                    {typeof borderRadius === 'object' ? (
                        <BoxControl
                            label={__('Border Radius', 'wedocs')}
                            values={borderRadius}
                            onChange={onRadiusChange}
                        />
                    ) : (
                        <UnitControl
                            label={__('Border Radius', 'wedocs')}
                            value={borderRadius}
                            onChange={onRadiusChange}
                        />
                    )}
                </>
            )}
        </PanelBody>
    );
};

/**
 * Typography Control Panel
 * Font size, weight, line height, letter spacing
 */
export const TypographyPanel = ({
    title = __('Typography', 'wedocs'),
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    onFontSizeChange,
    onFontWeightChange,
    onLineHeightChange,
    onLetterSpacingChange,
    showFontSize = true,
    showFontWeight = true,
    showLineHeight = false,
    showLetterSpacing = false,
    initialOpen = false
}) => {
    const fontWeightOptions = [
        { label: __('Light (300)', 'wedocs'), value: '300' },
        { label: __('Normal (400)', 'wedocs'), value: '400' },
        { label: __('Medium (500)', 'wedocs'), value: '500' },
        { label: __('Semi Bold (600)', 'wedocs'), value: '600' },
        { label: __('Bold (700)', 'wedocs'), value: '700' },
        { label: __('Extra Bold (800)', 'wedocs'), value: '800' },
    ];

    return (
        <PanelBody title={title} initialOpen={initialOpen}>
            {showFontSize && (
                <UnitControl
                    label={__('Font Size', 'wedocs')}
                    value={fontSize}
                    onChange={onFontSizeChange}
                    units={[
                        { value: 'px', label: 'px' },
                        { value: 'em', label: 'em' },
                        { value: 'rem', label: 'rem' },
                    ]}
                />
            )}

            {showFontWeight && (
                <SelectControl
                    label={__('Font Weight', 'wedocs')}
                    value={fontWeight}
                    options={fontWeightOptions}
                    onChange={onFontWeightChange}
                />
            )}

            {showLineHeight && (
                <UnitControl
                    label={__('Line Height', 'wedocs')}
                    value={lineHeight}
                    onChange={onLineHeightChange}
                    units={[
                        { value: 'px', label: 'px' },
                        { value: 'em', label: 'em' },
                        { value: '', label: '-' },
                    ]}
                />
            )}

            {showLetterSpacing && (
                <UnitControl
                    label={__('Letter Spacing', 'wedocs')}
                    value={letterSpacing}
                    onChange={onLetterSpacingChange}
                    units={[
                        { value: 'px', label: 'px' },
                        { value: 'em', label: 'em' },
                    ]}
                />
            )}
        </PanelBody>
    );
};

/**
 * Alignment Control
 * Standard alignment options
 */
export const AlignmentControl = ({ value, onChange, label = __('Alignment', 'wedocs') }) => {
    const alignmentOptions = [
        { label: __('Left', 'wedocs'), value: 'left' },
        { label: __('Center', 'wedocs'), value: 'center' },
        { label: __('Right', 'wedocs'), value: 'right' },
    ];

    return (
        <SelectControl
            label={label}
            value={value}
            options={alignmentOptions}
            onChange={onChange}
        />
    );
};

/**
 * Dimension Control (Width/Height)
 */
export const DimensionControl = ({
    label,
    value,
    onChange,
    units = [
        { value: '%', label: '%' },
        { value: 'px', label: 'px' },
        { value: 'em', label: 'em' },
        { value: 'rem', label: 'rem' },
        { value: 'vw', label: 'vw' },
        { value: 'vh', label: 'vh' },
    ]
}) => {
    return (
        <UnitControl
            label={label}
            value={value}
            onChange={onChange}
            units={units}
        />
    );
};
