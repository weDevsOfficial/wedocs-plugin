/**
 * Icon Controls Component
 * Comprehensive controls for icon styling and customization
 */

import { __ } from '@wordpress/i18n';
import { PanelColorSettings } from '@wordpress/block-editor';
import {
    PanelBody,
    SelectControl,
    RangeControl,
    ToggleControl,
    __experimentalUnitControl as UnitControl,
    __experimentalBoxControl as BoxControl,
    __experimentalDivider as Divider,
} from '@wordpress/components';

/**
 * Icon Controls Panel
 * Complete icon styling controls
 */
export const IconControls = ({
    title = __('Icon Settings', 'wedocs'),
    // Size attributes
    iconSize,
    iconWidth,
    iconHeight,
    // Color attributes
    iconColor,
    iconHoverColor,
    iconBackgroundColor,
    iconHoverBackgroundColor,
    // Position attributes
    iconPosition,
    iconGap,
    // Style attributes
    iconPadding,
    iconMargin,
    iconBorderRadius,
    iconRotation,
    iconOpacity,
    iconHoverOpacity,
    // Callbacks
    onIconSizeChange,
    onIconWidthChange,
    onIconHeightChange,
    onIconColorChange,
    onIconHoverColorChange,
    onIconBackgroundColorChange,
    onIconHoverBackgroundColorChange,
    onIconPositionChange,
    onIconGapChange,
    onIconPaddingChange,
    onIconMarginChange,
    onIconBorderRadiusChange,
    onIconRotationChange,
    onIconOpacityChange,
    onIconHoverOpacityChange,
    // Visibility options
    showSize = true,
    showColors = true,
    showPosition = true,
    showSpacing = true,
    showEffects = true,
    showHoverStates = true,
    initialOpen = false
}) => {
    return (
        <PanelBody title={title} initialOpen={initialOpen}>
            {/* Size Controls */}
            {showSize && (
                <>
                    <h3 style={{ marginBottom: '8px', fontSize: '13px', fontWeight: 500 }}>
                        {__('Icon Size', 'wedocs')}
                    </h3>
                    {onIconSizeChange && (
                        <RangeControl
                            label={__('Icon Size', 'wedocs')}
                            value={iconSize ? parseInt(iconSize) : 20}
                            onChange={(value) => onIconSizeChange(`${value}px`)}
                            min={10}
                            max={100}
                            step={1}
                        />
                    )}
                    {onIconWidthChange && (
                        <UnitControl
                            label={__('Icon Width', 'wedocs')}
                            value={iconWidth}
                            onChange={onIconWidthChange}
                            units={[
                                { value: 'px', label: 'px' },
                                { value: 'em', label: 'em' },
                                { value: 'rem', label: 'rem' }
                            ]}
                        />
                    )}
                    {onIconHeightChange && (
                        <UnitControl
                            label={__('Icon Height', 'wedocs')}
                            value={iconHeight}
                            onChange={onIconHeightChange}
                            units={[
                                { value: 'px', label: 'px' },
                                { value: 'em', label: 'em' },
                                { value: 'rem', label: 'rem' }
                            ]}
                        />
                    )}
                    <Divider />
                </>
            )}

            {/* Color Controls */}
            {showColors && (
                <>
                    <PanelColorSettings
                        title={__('Icon Colors', 'wedocs')}
                        colorSettings={[
                            ...(onIconColorChange ? [{
                                label: __('Icon Color', 'wedocs'),
                                value: iconColor,
                                onChange: onIconColorChange,
                            }] : []),
                            ...(showHoverStates && onIconHoverColorChange ? [{
                                label: __('Icon Hover Color', 'wedocs'),
                                value: iconHoverColor,
                                onChange: onIconHoverColorChange,
                            }] : []),
                            ...(onIconBackgroundColorChange ? [{
                                label: __('Icon Background Color', 'wedocs'),
                                value: iconBackgroundColor,
                                onChange: onIconBackgroundColorChange,
                            }] : []),
                            ...(showHoverStates && onIconHoverBackgroundColorChange ? [{
                                label: __('Icon Hover Background', 'wedocs'),
                                value: iconHoverBackgroundColor,
                                onChange: onIconHoverBackgroundColorChange,
                            }] : []),
                        ].filter(Boolean)}
                        __experimentalHasMultipleOrigins
                        __experimentalIsRenderedInSidebar
                    />
                    <Divider />
                </>
            )}

            {/* Position Controls */}
            {showPosition && (
                <>
                    <h3 style={{ marginBottom: '8px', fontSize: '13px', fontWeight: 500 }}>
                        {__('Icon Position', 'wedocs')}
                    </h3>
                    {onIconPositionChange && (
                        <SelectControl
                            label={__('Icon Position', 'wedocs')}
                            value={iconPosition}
                            onChange={onIconPositionChange}
                            options={[
                                { label: __('Before Text', 'wedocs'), value: 'before' },
                                { label: __('After Text', 'wedocs'), value: 'after' },
                                { label: __('Above Text', 'wedocs'), value: 'above' },
                                { label: __('Below Text', 'wedocs'), value: 'below' },
                                { label: __('Icon Only', 'wedocs'), value: 'only' },
                            ]}
                        />
                    )}
                    {onIconGapChange && (
                        <UnitControl
                            label={__('Gap Between Icon and Text', 'wedocs')}
                            value={iconGap}
                            onChange={onIconGapChange}
                            units={[
                                { value: 'px', label: 'px' },
                                { value: 'em', label: 'em' },
                                { value: 'rem', label: 'rem' }
                            ]}
                        />
                    )}
                    <Divider />
                </>
            )}

            {/* Spacing Controls */}
            {showSpacing && (
                <>
                    {onIconPaddingChange && (
                        <BoxControl
                            label={__('Icon Padding', 'wedocs')}
                            values={iconPadding}
                            onChange={onIconPaddingChange}
                            units={[
                                { value: 'px', label: 'px' },
                                { value: 'em', label: 'em' },
                                { value: 'rem', label: 'rem' }
                            ]}
                        />
                    )}
                    {onIconMarginChange && (
                        <BoxControl
                            label={__('Icon Margin', 'wedocs')}
                            values={iconMargin}
                            onChange={onIconMarginChange}
                            units={[
                                { value: 'px', label: 'px' },
                                { value: 'em', label: 'em' },
                                { value: 'rem', label: 'rem' }
                            ]}
                        />
                    )}
                    {onIconBorderRadiusChange && (
                        <BoxControl
                            label={__('Icon Border Radius', 'wedocs')}
                            values={iconBorderRadius}
                            onChange={onIconBorderRadiusChange}
                            units={[
                                { value: 'px', label: 'px' },
                                { value: '%', label: '%' },
                                { value: 'em', label: 'em' }
                            ]}
                        />
                    )}
                    {(onIconPaddingChange || onIconMarginChange || onIconBorderRadiusChange) && <Divider />}
                </>
            )}

            {/* Effects Controls */}
            {showEffects && (
                <>
                    <h3 style={{ marginBottom: '8px', fontSize: '13px', fontWeight: 500 }}>
                        {__('Icon Effects', 'wedocs')}
                    </h3>
                    {onIconRotationChange && (
                        <RangeControl
                            label={__('Rotation', 'wedocs')}
                            value={iconRotation || 0}
                            onChange={onIconRotationChange}
                            min={0}
                            max={360}
                            step={15}
                            help={__('Rotate icon in degrees', 'wedocs')}
                        />
                    )}
                    {onIconOpacityChange && (
                        <RangeControl
                            label={__('Opacity', 'wedocs')}
                            value={iconOpacity || 1}
                            onChange={onIconOpacityChange}
                            min={0}
                            max={1}
                            step={0.1}
                        />
                    )}
                    {showHoverStates && onIconHoverOpacityChange && (
                        <RangeControl
                            label={__('Hover Opacity', 'wedocs')}
                            value={iconHoverOpacity || 1}
                            onChange={onIconHoverOpacityChange}
                            min={0}
                            max={1}
                            step={0.1}
                        />
                    )}
                </>
            )}
        </PanelBody>
    );
};

/**
 * Icon Library Selector
 * Control for selecting icons from a library
 */
export const IconLibraryControl = ({
    title = __('Icon Selection', 'wedocs'),
    iconLibrary,
    selectedIcon,
    customIconUrl,
    onIconLibraryChange,
    onSelectedIconChange,
    onCustomIconUrlChange,
    icons = {},
    initialOpen = false
}) => {
    return (
        <PanelBody title={title} initialOpen={initialOpen}>
            {onIconLibraryChange && (
                <SelectControl
                    label={__('Icon Library', 'wedocs')}
                    value={iconLibrary}
                    onChange={onIconLibraryChange}
                    options={[
                        { label: __('Built-in Icons', 'wedocs'), value: 'builtin' },
                        { label: __('WordPress Dashicons', 'wedocs'), value: 'dashicons' },
                        { label: __('Custom URL', 'wedocs'), value: 'custom' },
                    ]}
                />
            )}

            {iconLibrary === 'custom' && onCustomIconUrlChange && (
                <UnitControl
                    label={__('Custom Icon URL', 'wedocs')}
                    value={customIconUrl}
                    onChange={onCustomIconUrlChange}
                    help={__('Enter the URL of your custom icon (SVG or image)', 'wedocs')}
                />
            )}

            {iconLibrary !== 'custom' && onSelectedIconChange && Object.keys(icons).length > 0 && (
                <>
                    <SelectControl
                        label={__('Select Icon', 'wedocs')}
                        value={selectedIcon}
                        onChange={onSelectedIconChange}
                        options={Object.keys(icons).map(key => ({
                            label: key.charAt(0).toUpperCase() + key.slice(1),
                            value: key
                        }))}
                    />
                    {selectedIcon && icons[selectedIcon] && (
                        <div style={{
                            padding: '16px',
                            background: '#f0f0f0',
                            borderRadius: '4px',
                            textAlign: 'center',
                            marginTop: '12px'
                        }}>
                            <div style={{ width: '48px', height: '48px', margin: '0 auto' }}>
                                {icons[selectedIcon]}
                            </div>
                            <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
                                {__('Icon Preview', 'wedocs')}
                            </p>
                        </div>
                    )}
                </>
            )}
        </PanelBody>
    );
};

export default IconControls;
