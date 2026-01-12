/**
 * Advanced Typography Controls Component
 * Comprehensive typography controls beyond basic font settings
 */

import { __ } from '@wordpress/i18n';
import {
    PanelBody,
    SelectControl,
    RangeControl,
    ToggleControl,
    __experimentalUnitControl as UnitControl,
    __experimentalDivider as Divider,
} from '@wordpress/components';
import { PanelColorSettings } from '@wordpress/block-editor';

/**
 * Advanced Typography Controls Panel
 */
export const AdvancedTypographyControls = ({
    title = __('Typography', 'wedocs'),
    // Font attributes
    fontFamily,
    fontSize,
    fontWeight,
    fontStyle,
    lineHeight,
    letterSpacing,
    wordSpacing,
    textTransform,
    textDecoration,
    // Color attributes
    textColor,
    textHoverColor,
    // Alignment
    textAlign,
    // Advanced
    textShadow,
    writingMode,
    // Callbacks
    onFontFamilyChange,
    onFontSizeChange,
    onFontWeightChange,
    onFontStyleChange,
    onLineHeightChange,
    onLetterSpacingChange,
    onWordSpacingChange,
    onTextTransformChange,
    onTextDecorationChange,
    onTextColorChange,
    onTextHoverColorChange,
    onTextAlignChange,
    onTextShadowChange,
    onWritingModeChange,
    // Visibility
    showFontFamily = true,
    showFontSize = true,
    showFontWeight = true,
    showFontStyle = true,
    showLineHeight = true,
    showLetterSpacing = true,
    showWordSpacing = false,
    showTextTransform = true,
    showTextDecoration = true,
    showTextColor = true,
    showTextAlign = true,
    showAdvanced = false,
    showHoverColor = true,
    initialOpen = false
}) => {
    return (
        <PanelBody title={title} initialOpen={initialOpen}>
            {/* Font Family */}
            {showFontFamily && onFontFamilyChange && (
                <SelectControl
                    label={__('Font Family', 'wedocs')}
                    value={fontFamily}
                    onChange={onFontFamilyChange}
                    options={[
                        { label: __('Default', 'wedocs'), value: '' },
                        { label: __('System Font', 'wedocs'), value: 'system-ui' },
                        { label: __('Arial', 'wedocs'), value: 'Arial, sans-serif' },
                        { label: __('Helvetica', 'wedocs'), value: 'Helvetica, sans-serif' },
                        { label: __('Times New Roman', 'wedocs'), value: 'Times New Roman, serif' },
                        { label: __('Georgia', 'wedocs'), value: 'Georgia, serif' },
                        { label: __('Courier New', 'wedocs'), value: 'Courier New, monospace' },
                        { label: __('Verdana', 'wedocs'), value: 'Verdana, sans-serif' },
                        { label: __('Tahoma', 'wedocs'), value: 'Tahoma, sans-serif' },
                        { label: __('Trebuchet MS', 'wedocs'), value: 'Trebuchet MS, sans-serif' },
                        { label: __('Inherit', 'wedocs'), value: 'inherit' },
                    ]}
                />
            )}

            {/* Font Size */}
            {showFontSize && onFontSizeChange && (
                <UnitControl
                    label={__('Font Size', 'wedocs')}
                    value={fontSize}
                    onChange={onFontSizeChange}
                    units={[
                        { value: 'px', label: 'px' },
                        { value: 'em', label: 'em' },
                        { value: 'rem', label: 'rem' },
                        { value: '%', label: '%' }
                    ]}
                />
            )}

            {/* Font Weight */}
            {showFontWeight && onFontWeightChange && (
                <SelectControl
                    label={__('Font Weight', 'wedocs')}
                    value={fontWeight}
                    onChange={onFontWeightChange}
                    options={[
                        { label: __('Default', 'wedocs'), value: '' },
                        { label: __('Thin (100)', 'wedocs'), value: '100' },
                        { label: __('Extra Light (200)', 'wedocs'), value: '200' },
                        { label: __('Light (300)', 'wedocs'), value: '300' },
                        { label: __('Normal (400)', 'wedocs'), value: '400' },
                        { label: __('Medium (500)', 'wedocs'), value: '500' },
                        { label: __('Semi Bold (600)', 'wedocs'), value: '600' },
                        { label: __('Bold (700)', 'wedocs'), value: '700' },
                        { label: __('Extra Bold (800)', 'wedocs'), value: '800' },
                        { label: __('Black (900)', 'wedocs'), value: '900' },
                    ]}
                />
            )}

            {/* Font Style */}
            {showFontStyle && onFontStyleChange && (
                <SelectControl
                    label={__('Font Style', 'wedocs')}
                    value={fontStyle}
                    onChange={onFontStyleChange}
                    options={[
                        { label: __('Normal', 'wedocs'), value: 'normal' },
                        { label: __('Italic', 'wedocs'), value: 'italic' },
                        { label: __('Oblique', 'wedocs'), value: 'oblique' },
                    ]}
                />
            )}

            <Divider />

            {/* Line Height */}
            {showLineHeight && onLineHeightChange && (
                <UnitControl
                    label={__('Line Height', 'wedocs')}
                    value={lineHeight}
                    onChange={onLineHeightChange}
                    units={[
                        { value: 'px', label: 'px' },
                        { value: 'em', label: 'em' },
                        { value: 'rem', label: 'rem' },
                        { value: '', label: 'unitless' }
                    ]}
                />
            )}

            {/* Letter Spacing */}
            {showLetterSpacing && onLetterSpacingChange && (
                <UnitControl
                    label={__('Letter Spacing', 'wedocs')}
                    value={letterSpacing}
                    onChange={onLetterSpacingChange}
                    units={[
                        { value: 'px', label: 'px' },
                        { value: 'em', label: 'em' },
                        { value: 'rem', label: 'rem' }
                    ]}
                />
            )}

            {/* Word Spacing */}
            {showWordSpacing && onWordSpacingChange && (
                <UnitControl
                    label={__('Word Spacing', 'wedocs')}
                    value={wordSpacing}
                    onChange={onWordSpacingChange}
                    units={[
                        { value: 'px', label: 'px' },
                        { value: 'em', label: 'em' },
                        { value: 'rem', label: 'rem' }
                    ]}
                />
            )}

            <Divider />

            {/* Text Transform */}
            {showTextTransform && onTextTransformChange && (
                <SelectControl
                    label={__('Text Transform', 'wedocs')}
                    value={textTransform}
                    onChange={onTextTransformChange}
                    options={[
                        { label: __('None', 'wedocs'), value: 'none' },
                        { label: __('Uppercase', 'wedocs'), value: 'uppercase' },
                        { label: __('Lowercase', 'wedocs'), value: 'lowercase' },
                        { label: __('Capitalize', 'wedocs'), value: 'capitalize' },
                    ]}
                />
            )}

            {/* Text Decoration */}
            {showTextDecoration && onTextDecorationChange && (
                <SelectControl
                    label={__('Text Decoration', 'wedocs')}
                    value={textDecoration}
                    onChange={onTextDecorationChange}
                    options={[
                        { label: __('None', 'wedocs'), value: 'none' },
                        { label: __('Underline', 'wedocs'), value: 'underline' },
                        { label: __('Overline', 'wedocs'), value: 'overline' },
                        { label: __('Line Through', 'wedocs'), value: 'line-through' },
                    ]}
                />
            )}

            {/* Text Align */}
            {showTextAlign && onTextAlignChange && (
                <SelectControl
                    label={__('Text Align', 'wedocs')}
                    value={textAlign}
                    onChange={onTextAlignChange}
                    options={[
                        { label: __('Left', 'wedocs'), value: 'left' },
                        { label: __('Center', 'wedocs'), value: 'center' },
                        { label: __('Right', 'wedocs'), value: 'right' },
                        { label: __('Justify', 'wedocs'), value: 'justify' },
                    ]}
                />
            )}

            <Divider />

            {/* Text Colors */}
            {showTextColor && (
                <PanelColorSettings
                    title={__('Text Colors', 'wedocs')}
                    colorSettings={[
                        ...(onTextColorChange ? [{
                            label: __('Text Color', 'wedocs'),
                            value: textColor,
                            onChange: onTextColorChange,
                        }] : []),
                        ...(showHoverColor && onTextHoverColorChange ? [{
                            label: __('Hover Text Color', 'wedocs'),
                            value: textHoverColor,
                            onChange: onTextHoverColorChange,
                        }] : []),
                    ].filter(Boolean)}
                    __experimentalHasMultipleOrigins
                    __experimentalIsRenderedInSidebar
                />
            )}

            {/* Advanced Typography */}
            {showAdvanced && (
                <>
                    <Divider />
                    <h3 style={{ marginBottom: '8px', fontSize: '13px', fontWeight: 500 }}>
                        {__('Advanced', 'wedocs')}
                    </h3>
                    {onTextShadowChange && (
                        <UnitControl
                            label={__('Text Shadow', 'wedocs')}
                            value={textShadow}
                            onChange={onTextShadowChange}
                            help={__('Example: 2px 2px 4px rgba(0,0,0,0.3)', 'wedocs')}
                        />
                    )}
                    {onWritingModeChange && (
                        <SelectControl
                            label={__('Writing Mode', 'wedocs')}
                            value={writingMode}
                            onChange={onWritingModeChange}
                            options={[
                                { label: __('Horizontal TB', 'wedocs'), value: 'horizontal-tb' },
                                { label: __('Vertical RL', 'wedocs'), value: 'vertical-rl' },
                                { label: __('Vertical LR', 'wedocs'), value: 'vertical-lr' },
                            ]}
                        />
                    )}
                </>
            )}
        </PanelBody>
    );
};

/**
 * Responsive Typography Controls
 * Typography controls with responsive breakpoints
 */
export const ResponsiveTypographyControls = ({
    title = __('Responsive Typography', 'wedocs'),
    desktopFontSize,
    tabletFontSize,
    mobileFontSize,
    desktopLineHeight,
    tabletLineHeight,
    mobileLineHeight,
    onDesktopFontSizeChange,
    onTabletFontSizeChange,
    onMobileFontSizeChange,
    onDesktopLineHeightChange,
    onTabletLineHeightChange,
    onMobileLineHeightChange,
    initialOpen = false
}) => {
    return (
        <PanelBody title={title} initialOpen={initialOpen}>
            <h3 style={{ marginBottom: '8px', fontSize: '13px', fontWeight: 500 }}>
                {__('Desktop', 'wedocs')}
            </h3>
            {onDesktopFontSizeChange && (
                <UnitControl
                    label={__('Font Size', 'wedocs')}
                    value={desktopFontSize}
                    onChange={onDesktopFontSizeChange}
                    units={[
                        { value: 'px', label: 'px' },
                        { value: 'em', label: 'em' },
                        { value: 'rem', label: 'rem' }
                    ]}
                />
            )}
            {onDesktopLineHeightChange && (
                <UnitControl
                    label={__('Line Height', 'wedocs')}
                    value={desktopLineHeight}
                    onChange={onDesktopLineHeightChange}
                    units={[
                        { value: 'px', label: 'px' },
                        { value: 'em', label: 'em' },
                        { value: '', label: 'unitless' }
                    ]}
                />
            )}

            <Divider />

            <h3 style={{ marginBottom: '8px', fontSize: '13px', fontWeight: 500 }}>
                {__('Tablet', 'wedocs')}
            </h3>
            {onTabletFontSizeChange && (
                <UnitControl
                    label={__('Font Size', 'wedocs')}
                    value={tabletFontSize}
                    onChange={onTabletFontSizeChange}
                    units={[
                        { value: 'px', label: 'px' },
                        { value: 'em', label: 'em' },
                        { value: 'rem', label: 'rem' }
                    ]}
                />
            )}
            {onTabletLineHeightChange && (
                <UnitControl
                    label={__('Line Height', 'wedocs')}
                    value={tabletLineHeight}
                    onChange={onTabletLineHeightChange}
                    units={[
                        { value: 'px', label: 'px' },
                        { value: 'em', label: 'em' },
                        { value: '', label: 'unitless' }
                    ]}
                />
            )}

            <Divider />

            <h3 style={{ marginBottom: '8px', fontSize: '13px', fontWeight: 500 }}>
                {__('Mobile', 'wedocs')}
            </h3>
            {onMobileFontSizeChange && (
                <UnitControl
                    label={__('Font Size', 'wedocs')}
                    value={mobileFontSize}
                    onChange={onMobileFontSizeChange}
                    units={[
                        { value: 'px', label: 'px' },
                        { value: 'em', label: 'em' },
                        { value: 'rem', label: 'rem' }
                    ]}
                />
            )}
            {onMobileLineHeightChange && (
                <UnitControl
                    label={__('Line Height', 'wedocs')}
                    value={mobileLineHeight}
                    onChange={onMobileLineHeightChange}
                    units={[
                        { value: 'px', label: 'px' },
                        { value: 'em', label: 'em' },
                        { value: '', label: 'unitless' }
                    ]}
                />
            )}
        </PanelBody>
    );
};

export default AdvancedTypographyControls;
