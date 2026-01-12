/**
 * Button Controls Component
 * Comprehensive controls for button styling including all states and properties
 */

import { __ } from '@wordpress/i18n';
import { PanelColorSettings } from '@wordpress/block-editor';
import {
    PanelBody,
    SelectControl,
    RangeControl,
    __experimentalBoxControl as BoxControl,
    __experimentalUnitControl as UnitControl,
    __experimentalBorderControl as BorderControl,
    ToggleControl,
    __experimentalDivider as Divider,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

/**
 * Button Controls Panel
 * Complete button styling controls with all states
 */
export const ButtonControls = ({
    title = __('Button Settings', 'wedocs'),
    // Color attributes
    backgroundColor,
    textColor,
    hoverBackgroundColor,
    hoverTextColor,
    activeBackgroundColor,
    activeTextColor,
    borderColor,
    hoverBorderColor,
    // Dimension attributes
    width,
    height,
    padding,
    margin,
    // Border attributes
    border,
    borderRadius,
    // Shadow attributes
    boxShadow,
    hoverBoxShadow,
    // Alignment attributes
    alignment,
    // Callback functions
    onBackgroundColorChange,
    onTextColorChange,
    onHoverBackgroundColorChange,
    onHoverTextColorChange,
    onActiveBackgroundColorChange,
    onActiveTextColorChange,
    onBorderColorChange,
    onHoverBorderColorChange,
    onWidthChange,
    onHeightChange,
    onPaddingChange,
    onMarginChange,
    onBorderChange,
    onBorderRadiusChange,
    onBoxShadowChange,
    onHoverBoxShadowChange,
    onAlignmentChange,
    // Optional controls visibility
    showWidth = true,
    showHeight = true,
    showPadding = true,
    showMargin = true,
    showBorder = true,
    showShadow = true,
    showAlignment = true,
    showHoverStates = true,
    showActiveStates = false,
    initialOpen = false
}) => {
    return (
        <PanelBody title={title} initialOpen={initialOpen}>
            {/* Color Settings */}
            <PanelColorSettings
                title={__('Button Colors', 'wedocs')}
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
                    ...(showHoverStates ? [
                        {
                            label: __('Hover Background Color', 'wedocs'),
                            value: hoverBackgroundColor,
                            onChange: onHoverBackgroundColorChange,
                        },
                        {
                            label: __('Hover Text Color', 'wedocs'),
                            value: hoverTextColor,
                            onChange: onHoverTextColorChange,
                        }
                    ] : []),
                    ...(showActiveStates ? [
                        {
                            label: __('Active Background Color', 'wedocs'),
                            value: activeBackgroundColor,
                            onChange: onActiveBackgroundColorChange,
                        },
                        {
                            label: __('Active Text Color', 'wedocs'),
                            value: activeTextColor,
                            onChange: onActiveTextColorChange,
                        }
                    ] : [])
                ]}
                __experimentalHasMultipleOrigins
                __experimentalIsRenderedInSidebar
            />

            <Divider />

            {/* Dimensions */}
            {(showWidth || showHeight) && (
                <>
                    <h3 style={{ marginBottom: '8px', fontSize: '13px', fontWeight: 500 }}>
                        {__('Dimensions', 'wedocs')}
                    </h3>
                    {showWidth && onWidthChange && (
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
                    {showHeight && onHeightChange && (
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
            {(showPadding || showMargin) && (
                <>
                    {showPadding && onPaddingChange && (
                        <BoxControl
                            label={__('Padding', 'wedocs')}
                            values={padding}
                            onChange={onPaddingChange}
                            units={[
                                { value: 'px', label: 'px' },
                                { value: 'em', label: 'em' },
                                { value: 'rem', label: 'rem' },
                                { value: '%', label: '%' }
                            ]}
                        />
                    )}
                    {showMargin && onMarginChange && (
                        <BoxControl
                            label={__('Margin', 'wedocs')}
                            values={margin}
                            onChange={onMarginChange}
                            units={[
                                { value: 'px', label: 'px' },
                                { value: 'em', label: 'em' },
                                { value: 'rem', label: 'rem' },
                                { value: '%', label: '%' },
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
                    {showHoverStates && onHoverBorderColorChange && (
                        <PanelColorSettings
                            title={__('Border Hover Color', 'wedocs')}
                            colorSettings={[
                                {
                                    label: __('Hover Border Color', 'wedocs'),
                                    value: hoverBorderColor,
                                    onChange: onHoverBorderColorChange,
                                }
                            ]}
                            __experimentalHasMultipleOrigins
                            __experimentalIsRenderedInSidebar
                        />
                    )}
                    <Divider />
                </>
            )}

            {/* Border Radius (if not included in BorderControl) */}
            {onBorderRadiusChange && (
                <>
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
                    <Divider />
                </>
            )}

            {/* Shadow */}
            {showShadow && (
                <>
                    {onBoxShadowChange && (
                        <UnitControl
                            label={__('Box Shadow', 'wedocs')}
                            value={boxShadow}
                            onChange={onBoxShadowChange}
                            help={__('Example: 0 2px 4px rgba(0,0,0,0.1)', 'wedocs')}
                        />
                    )}
                    {showHoverStates && onHoverBoxShadowChange && (
                        <UnitControl
                            label={__('Hover Box Shadow', 'wedocs')}
                            value={hoverBoxShadow}
                            onChange={onHoverBoxShadowChange}
                            help={__('Example: 0 4px 8px rgba(0,0,0,0.15)', 'wedocs')}
                        />
                    )}
                    {(onBoxShadowChange || onHoverBoxShadowChange) && <Divider />}
                </>
            )}

            {/* Alignment */}
            {showAlignment && onAlignmentChange && (
                <SelectControl
                    label={__('Alignment', 'wedocs')}
                    value={alignment}
                    onChange={onAlignmentChange}
                    options={[
                        { label: __('Left', 'wedocs'), value: 'left' },
                        { label: __('Center', 'wedocs'), value: 'center' },
                        { label: __('Right', 'wedocs'), value: 'right' },
                        { label: __('Justified', 'wedocs'), value: 'space-between' },
                    ]}
                />
            )}
        </PanelBody>
    );
};

/**
 * Button Group Controls
 * Controls for managing button groups/collections
 */
export const ButtonGroupControls = ({
    title = __('Button Group Settings', 'wedocs'),
    gap,
    direction,
    wrap,
    justifyContent,
    alignItems,
    onGapChange,
    onDirectionChange,
    onWrapChange,
    onJustifyContentChange,
    onAlignItemsChange,
    initialOpen = false
}) => {
    return (
        <PanelBody title={title} initialOpen={initialOpen}>
            {onGapChange && (
                <UnitControl
                    label={__('Gap Between Buttons', 'wedocs')}
                    value={gap}
                    onChange={onGapChange}
                    units={[
                        { value: 'px', label: 'px' },
                        { value: 'em', label: 'em' },
                        { value: 'rem', label: 'rem' }
                    ]}
                />
            )}

            {onDirectionChange && (
                <SelectControl
                    label={__('Direction', 'wedocs')}
                    value={direction}
                    onChange={onDirectionChange}
                    options={[
                        { label: __('Horizontal', 'wedocs'), value: 'row' },
                        { label: __('Vertical', 'wedocs'), value: 'column' },
                    ]}
                />
            )}

            {onWrapChange && (
                <ToggleControl
                    label={__('Allow Wrapping', 'wedocs')}
                    checked={wrap}
                    onChange={onWrapChange}
                    help={__('Allow buttons to wrap to next line', 'wedocs')}
                />
            )}

            {onJustifyContentChange && (
                <SelectControl
                    label={__('Horizontal Alignment', 'wedocs')}
                    value={justifyContent}
                    onChange={onJustifyContentChange}
                    options={[
                        { label: __('Start', 'wedocs'), value: 'flex-start' },
                        { label: __('Center', 'wedocs'), value: 'center' },
                        { label: __('End', 'wedocs'), value: 'flex-end' },
                        { label: __('Space Between', 'wedocs'), value: 'space-between' },
                        { label: __('Space Around', 'wedocs'), value: 'space-around' },
                        { label: __('Space Evenly', 'wedocs'), value: 'space-evenly' },
                    ]}
                />
            )}

            {onAlignItemsChange && (
                <SelectControl
                    label={__('Vertical Alignment', 'wedocs')}
                    value={alignItems}
                    onChange={onAlignItemsChange}
                    options={[
                        { label: __('Start', 'wedocs'), value: 'flex-start' },
                        { label: __('Center', 'wedocs'), value: 'center' },
                        { label: __('End', 'wedocs'), value: 'flex-end' },
                        { label: __('Stretch', 'wedocs'), value: 'stretch' },
                        { label: __('Baseline', 'wedocs'), value: 'baseline' },
                    ]}
                />
            )}
        </PanelBody>
    );
};

export default ButtonControls;
