/**
 * Hover State Controls Component
 * Controls for managing hover and interaction states
 */

import { __ } from '@wordpress/i18n';
import { PanelColorSettings } from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    SelectControl,
    ToggleControl,
    __experimentalUnitControl as UnitControl,
    __experimentalDivider as Divider,
} from '@wordpress/components';

/**
 * Hover State Controls Panel
 * Comprehensive hover state management
 */
export const HoverStateControls = ({
    title = __('Hover & Interaction States', 'wedocs'),
    // Hover colors
    hoverBackgroundColor,
    hoverTextColor,
    hoverBorderColor,
    // Active/Focus states
    activeBackgroundColor,
    activeTextColor,
    activeBorderColor,
    focusBackgroundColor,
    focusTextColor,
    focusBorderColor,
    // Transition settings
    transitionDuration,
    transitionTimingFunction,
    transitionProperty,
    // Transform effects
    hoverScale,
    hoverTranslateX,
    hoverTranslateY,
    hoverRotate,
    // Opacity
    hoverOpacity,
    // Shadow
    hoverBoxShadow,
    // Callbacks
    onHoverBackgroundColorChange,
    onHoverTextColorChange,
    onHoverBorderColorChange,
    onActiveBackgroundColorChange,
    onActiveTextColorChange,
    onActiveBorderColorChange,
    onFocusBackgroundColorChange,
    onFocusTextColorChange,
    onFocusBorderColorChange,
    onTransitionDurationChange,
    onTransitionTimingFunctionChange,
    onTransitionPropertyChange,
    onHoverScaleChange,
    onHoverTranslateXChange,
    onHoverTranslateYChange,
    onHoverRotateChange,
    onHoverOpacityChange,
    onHoverBoxShadowChange,
    // Visibility
    showHoverState = true,
    showActiveState = false,
    showFocusState = false,
    showTransitions = true,
    showTransforms = true,
    initialOpen = false
}) => {
    return (
        <PanelBody title={title} initialOpen={initialOpen}>
            {/* Hover State Colors */}
            {showHoverState && (
                <>
                    <PanelColorSettings
                        title={__('Hover State Colors', 'wedocs')}
                        colorSettings={[
                            ...(onHoverBackgroundColorChange ? [{
                                label: __('Hover Background', 'wedocs'),
                                value: hoverBackgroundColor,
                                onChange: onHoverBackgroundColorChange,
                            }] : []),
                            ...(onHoverTextColorChange ? [{
                                label: __('Hover Text', 'wedocs'),
                                value: hoverTextColor,
                                onChange: onHoverTextColorChange,
                            }] : []),
                            ...(onHoverBorderColorChange ? [{
                                label: __('Hover Border', 'wedocs'),
                                value: hoverBorderColor,
                                onChange: onHoverBorderColorChange,
                            }] : []),
                        ].filter(Boolean)}
                        __experimentalHasMultipleOrigins
                        __experimentalIsRenderedInSidebar
                    />
                    <Divider />
                </>
            )}

            {/* Active State Colors */}
            {showActiveState && (
                <>
                    <PanelColorSettings
                        title={__('Active State Colors', 'wedocs')}
                        colorSettings={[
                            ...(onActiveBackgroundColorChange ? [{
                                label: __('Active Background', 'wedocs'),
                                value: activeBackgroundColor,
                                onChange: onActiveBackgroundColorChange,
                            }] : []),
                            ...(onActiveTextColorChange ? [{
                                label: __('Active Text', 'wedocs'),
                                value: activeTextColor,
                                onChange: onActiveTextColorChange,
                            }] : []),
                            ...(onActiveBorderColorChange ? [{
                                label: __('Active Border', 'wedocs'),
                                value: activeBorderColor,
                                onChange: onActiveBorderColorChange,
                            }] : []),
                        ].filter(Boolean)}
                        __experimentalHasMultipleOrigins
                        __experimentalIsRenderedInSidebar
                    />
                    <Divider />
                </>
            )}

            {/* Focus State Colors */}
            {showFocusState && (
                <>
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
                    <Divider />
                </>
            )}

            {/* Transition Settings */}
            {showTransitions && (
                <>
                    <h3 style={{ marginBottom: '8px', fontSize: '13px', fontWeight: 500 }}>
                        {__('Transition Settings', 'wedocs')}
                    </h3>
                    {onTransitionDurationChange && (
                        <RangeControl
                            label={__('Transition Duration (ms)', 'wedocs')}
                            value={transitionDuration ? parseInt(transitionDuration) : 300}
                            onChange={(value) => onTransitionDurationChange(`${value}ms`)}
                            min={0}
                            max={1000}
                            step={50}
                        />
                    )}
                    {onTransitionTimingFunctionChange && (
                        <SelectControl
                            label={__('Transition Timing', 'wedocs')}
                            value={transitionTimingFunction || 'ease'}
                            onChange={onTransitionTimingFunctionChange}
                            options={[
                                { label: __('Linear', 'wedocs'), value: 'linear' },
                                { label: __('Ease', 'wedocs'), value: 'ease' },
                                { label: __('Ease In', 'wedocs'), value: 'ease-in' },
                                { label: __('Ease Out', 'wedocs'), value: 'ease-out' },
                                { label: __('Ease In Out', 'wedocs'), value: 'ease-in-out' },
                            ]}
                        />
                    )}
                    {onTransitionPropertyChange && (
                        <SelectControl
                            label={__('Transition Property', 'wedocs')}
                            value={transitionProperty || 'all'}
                            onChange={onTransitionPropertyChange}
                            options={[
                                { label: __('All Properties', 'wedocs'), value: 'all' },
                                { label: __('Background', 'wedocs'), value: 'background-color' },
                                { label: __('Color', 'wedocs'), value: 'color' },
                                { label: __('Border', 'wedocs'), value: 'border-color' },
                                { label: __('Transform', 'wedocs'), value: 'transform' },
                                { label: __('Opacity', 'wedocs'), value: 'opacity' },
                                { label: __('Box Shadow', 'wedocs'), value: 'box-shadow' },
                            ]}
                        />
                    )}
                    <Divider />
                </>
            )}

            {/* Transform Effects */}
            {showTransforms && (
                <>
                    <h3 style={{ marginBottom: '8px', fontSize: '13px', fontWeight: 500 }}>
                        {__('Hover Transform Effects', 'wedocs')}
                    </h3>
                    {onHoverScaleChange && (
                        <RangeControl
                            label={__('Scale', 'wedocs')}
                            value={hoverScale || 1}
                            onChange={onHoverScaleChange}
                            min={0.5}
                            max={2}
                            step={0.05}
                            help={__('Scale the element on hover (1 = normal size)', 'wedocs')}
                        />
                    )}
                    {onHoverTranslateXChange && (
                        <RangeControl
                            label={__('Translate X (px)', 'wedocs')}
                            value={hoverTranslateX || 0}
                            onChange={onHoverTranslateXChange}
                            min={-50}
                            max={50}
                            step={1}
                            help={__('Move horizontally on hover', 'wedocs')}
                        />
                    )}
                    {onHoverTranslateYChange && (
                        <RangeControl
                            label={__('Translate Y (px)', 'wedocs')}
                            value={hoverTranslateY || 0}
                            onChange={onHoverTranslateYChange}
                            min={-50}
                            max={50}
                            step={1}
                            help={__('Move vertically on hover', 'wedocs')}
                        />
                    )}
                    {onHoverRotateChange && (
                        <RangeControl
                            label={__('Rotate (degrees)', 'wedocs')}
                            value={hoverRotate || 0}
                            onChange={onHoverRotateChange}
                            min={-180}
                            max={180}
                            step={5}
                            help={__('Rotate the element on hover', 'wedocs')}
                        />
                    )}
                    <Divider />
                </>
            )}

            {/* Additional Effects */}
            {onHoverOpacityChange && (
                <>
                    <RangeControl
                        label={__('Hover Opacity', 'wedocs')}
                        value={hoverOpacity !== undefined ? hoverOpacity : 1}
                        onChange={onHoverOpacityChange}
                        min={0}
                        max={1}
                        step={0.1}
                    />
                    <Divider />
                </>
            )}

            {onHoverBoxShadowChange && (
                <UnitControl
                    label={__('Hover Box Shadow', 'wedocs')}
                    value={hoverBoxShadow}
                    onChange={onHoverBoxShadowChange}
                    help={__('Example: 0 4px 8px rgba(0,0,0,0.15)', 'wedocs')}
                />
            )}
        </PanelBody>
    );
};

/**
 * Animation Controls Panel
 * Controls for CSS animations
 */
export const AnimationControls = ({
    title = __('Animation Settings', 'wedocs'),
    animationName,
    animationDuration,
    animationDelay,
    animationIterationCount,
    animationDirection,
    animationTimingFunction,
    animationFillMode,
    onAnimationNameChange,
    onAnimationDurationChange,
    onAnimationDelayChange,
    onAnimationIterationCountChange,
    onAnimationDirectionChange,
    onAnimationTimingFunctionChange,
    onAnimationFillModeChange,
    initialOpen = false
}) => {
    return (
        <PanelBody title={title} initialOpen={initialOpen}>
            {onAnimationNameChange && (
                <SelectControl
                    label={__('Animation Type', 'wedocs')}
                    value={animationName || 'none'}
                    onChange={onAnimationNameChange}
                    options={[
                        { label: __('None', 'wedocs'), value: 'none' },
                        { label: __('Fade In', 'wedocs'), value: 'fadeIn' },
                        { label: __('Slide In Up', 'wedocs'), value: 'slideInUp' },
                        { label: __('Slide In Down', 'wedocs'), value: 'slideInDown' },
                        { label: __('Slide In Left', 'wedocs'), value: 'slideInLeft' },
                        { label: __('Slide In Right', 'wedocs'), value: 'slideInRight' },
                        { label: __('Bounce', 'wedocs'), value: 'bounce' },
                        { label: __('Pulse', 'wedocs'), value: 'pulse' },
                        { label: __('Shake', 'wedocs'), value: 'shake' },
                        { label: __('Rotate', 'wedocs'), value: 'rotate' },
                    ]}
                />
            )}

            {animationName && animationName !== 'none' && (
                <>
                    {onAnimationDurationChange && (
                        <RangeControl
                            label={__('Duration (ms)', 'wedocs')}
                            value={animationDuration ? parseInt(animationDuration) : 1000}
                            onChange={(value) => onAnimationDurationChange(`${value}ms`)}
                            min={100}
                            max={5000}
                            step={100}
                        />
                    )}

                    {onAnimationDelayChange && (
                        <RangeControl
                            label={__('Delay (ms)', 'wedocs')}
                            value={animationDelay ? parseInt(animationDelay) : 0}
                            onChange={(value) => onAnimationDelayChange(`${value}ms`)}
                            min={0}
                            max={3000}
                            step={100}
                        />
                    )}

                    {onAnimationIterationCountChange && (
                        <SelectControl
                            label={__('Repeat', 'wedocs')}
                            value={animationIterationCount || '1'}
                            onChange={onAnimationIterationCountChange}
                            options={[
                                { label: __('Once', 'wedocs'), value: '1' },
                                { label: __('Twice', 'wedocs'), value: '2' },
                                { label: __('Three Times', 'wedocs'), value: '3' },
                                { label: __('Infinite', 'wedocs'), value: 'infinite' },
                            ]}
                        />
                    )}

                    {onAnimationTimingFunctionChange && (
                        <SelectControl
                            label={__('Timing Function', 'wedocs')}
                            value={animationTimingFunction || 'ease'}
                            onChange={onAnimationTimingFunctionChange}
                            options={[
                                { label: __('Linear', 'wedocs'), value: 'linear' },
                                { label: __('Ease', 'wedocs'), value: 'ease' },
                                { label: __('Ease In', 'wedocs'), value: 'ease-in' },
                                { label: __('Ease Out', 'wedocs'), value: 'ease-out' },
                                { label: __('Ease In Out', 'wedocs'), value: 'ease-in-out' },
                            ]}
                        />
                    )}
                </>
            )}
        </PanelBody>
    );
};

export default HoverStateControls;
