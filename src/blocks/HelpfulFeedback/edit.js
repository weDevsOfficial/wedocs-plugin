import { __ } from '@wordpress/i18n';
import { thumbsUp, thumbsDown } from '@wordpress/icons';
import { Fragment, useState } from '@wordpress/element';
import {
    useBlockProps,
    InspectorControls,
    BlockControls,
    AlignmentToolbar,
} from '@wordpress/block-editor';
import { getBlockClasses, getInlineStyles } from '../block-helpers';
import {
    PanelBody,
    ToggleControl,
    TextControl,
} from '@wordpress/components';
import {
    ColorSettingsPanel,
    SpacingPanel,
    BorderPanel,
    TypographyPanel,
    ButtonControls,
    ButtonGroupControls,
    IconControls,
    HoverStateControls,
    AdvancedTypographyControls,
} from '../commonControls/CommonControls';
import RadioImageControl from '../CustomControls/RadioImageControl';

const Edit = ({ attributes, setAttributes }) => {
    const blockProps = useBlockProps();
    const [hoveredButton, setHoveredButton] = useState(null);

    const {
        questionText,
        layout,
        alignment,
        showVoteCount,
        allowAnonymous,
        yesButtonText,
        noButtonText,
        thankYouMessage,
        containerBgColor,
        containerBgHoverColor,
        containerPadding,
        containerMargin,
        containerBorderStyle,
        containerBorderColor,
        containerBorderWidth,
        containerBorderRadius,
        containerBoxShadow,
        titleColor,
        titleFontSize,
        titleFontWeight,
        titleLineHeight,
        titleLetterSpacing,
        titlePadding,
        titleMargin,
        yesButtonColor,
        yesButtonHoverColor,
        yesButtonActiveColor,
        noButtonColor,
        noButtonHoverColor,
        noButtonActiveColor,
        buttonTextColor,
        buttonTextHoverColor,
        iconWidth,
        iconHeight,
        iconColor,
        iconHoverColor,
        innerIconColor,
        innerIconHoverColor,
        buttonBorderStyle,
        buttonBorderColor,
        buttonBorderHoverColor,
        buttonBorderWidth,
        buttonBorderRadius,
        buttonBoxShadow,
        additionalCssClass,
        // New comprehensive attributes
        yesButtonBorder,
        yesButtonBorderRadius,
        yesButtonPadding,
        yesButtonMargin,
        yesButtonWidth,
        yesButtonHeight,
        noButtonBorder,
        noButtonBorderRadius,
        noButtonPadding,
        noButtonMargin,
        noButtonWidth,
        noButtonHeight,
        buttonGap,
        buttonDirection,
        buttonJustifyContent,
        yesIconSize,
        yesIconColor,
        yesIconHoverColor,
        yesIconBackgroundColor,
        yesIconBorderRadius,
        yesIconMargin,
        noIconSize,
        noIconColor,
        noIconHoverColor,
        noIconBackgroundColor,
        noIconBorderRadius,
        noIconMargin,
        transitionDuration,
        transitionTimingFunction,
        buttonHoverScale,
        buttonHoverTranslateY,
        buttonFontSize,
        buttonFontWeight,
        buttonLetterSpacing,
    } = attributes;

    const layoutOptions = [
        {
            label: __('Layout 1', 'wedocs'),
            value: 'layout1',
            svg: <svg width="60" height="40" viewBox="0 0 60 40"><rect x="5" y="15" width="15" height="10" fill="#4CAF50"/><rect x="25" y="15" width="15" height="10" fill="#9e9e9e"/><text x="30" y="8" fontSize="8" textAnchor="middle">Question</text></svg>
        },
        {
            label: __('Layout 2', 'wedocs'),
            value: 'layout2',
            svg: <svg width="60" height="40" viewBox="0 0 60 40"><circle cx="15" cy="20" r="8" fill="#4CAF50"/><circle cx="35" cy="20" r="8" fill="#9e9e9e"/><text x="30" y="8" fontSize="8" textAnchor="middle">Question</text></svg>
        }
    ];

    // Helper function to convert spacing object to CSS string
    const spacingToString = (spacing) => {
        if (!spacing) return undefined;
        return `${spacing.top || '0'} ${spacing.right || '0'} ${spacing.bottom || '0'} ${spacing.left || '0'}`;
    };

    // Helper function to convert border object to CSS string
    const borderToString = (border) => {
        if (!border || !border.width) return undefined;
        return `${border.width} ${border.style || 'solid'} ${border.color || 'currentColor'}`;
    };

    // Get Yes button style
    const getYesButtonStyle = (isHovered) => {
        const baseStyle = {
            backgroundColor: isHovered ? (yesButtonHoverColor || yesButtonColor) : yesButtonColor,
            color: isHovered ? (buttonTextHoverColor || buttonTextColor) : buttonTextColor,
            border: borderToString(yesButtonBorder) || (buttonBorderStyle !== 'none' ? `${buttonBorderWidth} ${buttonBorderStyle} ${buttonBorderColor}` : 'none'),
            borderColor: isHovered ? (buttonBorderHoverColor || buttonBorderColor) : buttonBorderColor,
            borderRadius: spacingToString(yesButtonBorderRadius) || buttonBorderRadius,
            padding: spacingToString(yesButtonPadding) || '12px 24px',
            margin: spacingToString(yesButtonMargin) || '0',
            width: yesButtonWidth,
            height: yesButtonHeight,
            fontSize: buttonFontSize,
            fontWeight: buttonFontWeight,
            letterSpacing: buttonLetterSpacing,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: `all ${transitionDuration || '0.3s'} ${transitionTimingFunction || 'ease'}`,
            boxShadow: buttonBoxShadow,
        };

        if (isHovered && (buttonHoverScale || buttonHoverTranslateY)) {
            const transforms = [];
            if (buttonHoverScale) transforms.push(`scale(${buttonHoverScale})`);
            if (buttonHoverTranslateY) transforms.push(`translateY(${buttonHoverTranslateY})`);
            baseStyle.transform = transforms.join(' ');
        }

        return baseStyle;
    };

    // Get No button style
    const getNoButtonStyle = (isHovered) => {
        const baseStyle = {
            backgroundColor: isHovered ? (noButtonHoverColor || noButtonColor) : noButtonColor,
            color: isHovered ? (buttonTextHoverColor || buttonTextColor) : buttonTextColor,
            border: borderToString(noButtonBorder) || (buttonBorderStyle !== 'none' ? `${buttonBorderWidth} ${buttonBorderStyle} ${buttonBorderColor}` : 'none'),
            borderColor: isHovered ? (buttonBorderHoverColor || buttonBorderColor) : buttonBorderColor,
            borderRadius: spacingToString(noButtonBorderRadius) || buttonBorderRadius,
            padding: spacingToString(noButtonPadding) || '12px 24px',
            margin: spacingToString(noButtonMargin) || '0',
            width: noButtonWidth,
            height: noButtonHeight,
            fontSize: buttonFontSize,
            fontWeight: buttonFontWeight,
            letterSpacing: buttonLetterSpacing,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: `all ${transitionDuration || '0.3s'} ${transitionTimingFunction || 'ease'}`,
            boxShadow: buttonBoxShadow,
        };

        if (isHovered && (buttonHoverScale || buttonHoverTranslateY)) {
            const transforms = [];
            if (buttonHoverScale) transforms.push(`scale(${buttonHoverScale})`);
            if (buttonHoverTranslateY) transforms.push(`translateY(${buttonHoverTranslateY})`);
            baseStyle.transform = transforms.join(' ');
        }

        return baseStyle;
    };

    // Get icon style for Yes button
    const getYesIconStyle = (isHovered) => ({
        width: yesIconSize || iconWidth || '24px',
        height: yesIconSize || iconHeight || '24px',
        color: isHovered ? (yesIconHoverColor || yesIconColor || iconHoverColor || iconColor) : (yesIconColor || iconColor),
        backgroundColor: yesIconBackgroundColor,
        borderRadius: yesIconBorderRadius,
        margin: spacingToString(yesIconMargin),
        padding: yesIconBackgroundColor ? '4px' : '0',
        transition: `all ${transitionDuration || '0.3s'} ${transitionTimingFunction || 'ease'}`,
    });

    // Get icon style for No button
    const getNoIconStyle = (isHovered) => ({
        width: noIconSize || iconWidth || '24px',
        height: noIconSize || iconHeight || '24px',
        color: isHovered ? (noIconHoverColor || noIconColor || iconHoverColor || iconColor) : (noIconColor || iconColor),
        backgroundColor: noIconBackgroundColor,
        borderRadius: noIconBorderRadius,
        margin: spacingToString(noIconMargin),
        padding: noIconBackgroundColor ? '4px' : '0',
        transition: `all ${transitionDuration || '0.3s'} ${transitionTimingFunction || 'ease'}`,
    });

    const containerStyle = {
        backgroundColor: containerBgColor,
        padding: spacingToString(containerPadding),
        margin: spacingToString(containerMargin),
        border: (containerBorderStyle !== 'none' && containerBorderWidth) ? `${containerBorderWidth.top} ${containerBorderStyle} ${containerBorderColor}` : 'none',
        borderRadius: spacingToString(containerBorderRadius),
        boxShadow: containerBoxShadow,
        textAlign: alignment,
        transition: `all ${transitionDuration || '0.3s'} ${transitionTimingFunction || 'ease'}`
    };

    const titleStyle = {
        color: titleColor,
        fontSize: titleFontSize,
        fontWeight: titleFontWeight,
        lineHeight: titleLineHeight,
        letterSpacing: titleLetterSpacing,
        padding: spacingToString(titlePadding),
        margin: spacingToString(titleMargin)
    };

    const buttonsContainerStyle = {
        display: 'flex',
        flexDirection: buttonDirection || 'row',
        gap: buttonGap || '8px',
        justifyContent: buttonJustifyContent || 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
    };

    return (
        <Fragment>
            <BlockControls>
                <AlignmentToolbar
                    value={alignment}
                    onChange={(value) => setAttributes({ alignment: value })}
                />
            </BlockControls>

            <InspectorControls>
                <PanelBody title={__('General Settings', 'wedocs')} initialOpen={true}>
                    <TextControl
                        label={__('Question Text', 'wedocs')}
                        value={questionText}
                        onChange={(value) => setAttributes({ questionText: value })}
                        help={__('The question to ask users about the article', 'wedocs')}
                    />

                    <TextControl
                        label={__('Yes Button Text', 'wedocs')}
                        value={yesButtonText}
                        onChange={(value) => setAttributes({ yesButtonText: value })}
                    />

                    <TextControl
                        label={__('No Button Text', 'wedocs')}
                        value={noButtonText}
                        onChange={(value) => setAttributes({ noButtonText: value })}
                    />

                    <TextControl
                        label={__('Thank You Message', 'wedocs')}
                        value={thankYouMessage}
                        onChange={(value) => setAttributes({ thankYouMessage: value })}
                        help={__('Message shown after voting', 'wedocs')}
                    />
                </PanelBody>

                <PanelBody title={__('Display Options', 'wedocs')} initialOpen={false}>
                    <label>{__('Layout Style', 'wedocs')}</label>
                    <RadioImageControl
                        selected={layout}
                        options={layoutOptions}
                        onChange={(value) => setAttributes({ layout: value })}
                    />

                    <ToggleControl
                        label={__('Show Vote Count', 'wedocs')}
                        checked={showVoteCount}
                        onChange={(value) => setAttributes({ showVoteCount: value })}
                    />

                    <ToggleControl
                        label={__('Allow Anonymous Voting', 'wedocs')}
                        checked={allowAnonymous}
                        onChange={(value) => setAttributes({ allowAnonymous: value })}
                        help={__('Allow guests to vote without logging in', 'wedocs')}
                    />
                </PanelBody>

                <PanelBody title={__('Advanced', 'wedocs')} initialOpen={false}>
                    <TextControl
                        label={__('Additional CSS Class(es)', 'wedocs')}
                        value={additionalCssClass}
                        onChange={(value) => setAttributes({ additionalCssClass: value })}
                        help={__('Separate multiple classes with spaces', 'wedocs')}
                    />
                </PanelBody>
            </InspectorControls>

            <InspectorControls group="styles">
                <ColorSettingsPanel
                    title={__('Container Colors', 'wedocs')}
                    colorSettings={[
                        {
                            value: containerBgColor,
                            onChange: (value) => setAttributes({ containerBgColor: value }),
                            label: __('Background Color', 'wedocs'),
                        },
                        {
                            value: containerBgHoverColor,
                            onChange: (value) => setAttributes({ containerBgHoverColor: value }),
                            label: __('Background Hover Color', 'wedocs'),
                        },
                    ]}
                    initialOpen={true}
                />

                <SpacingPanel
                    title={__('Container Spacing', 'wedocs')}
                    padding={containerPadding}
                    margin={containerMargin}
                    onPaddingChange={(value) => setAttributes({ containerPadding: value })}
                    onMarginChange={(value) => setAttributes({ containerMargin: value })}
                />

                <BorderPanel
                    title={__('Container Border', 'wedocs')}
                    borderStyle={containerBorderStyle}
                    borderWidth={containerBorderWidth}
                    borderColor={containerBorderColor}
                    borderRadius={containerBorderRadius}
                    onStyleChange={(value) => setAttributes({ containerBorderStyle: value })}
                    onWidthChange={(value) => setAttributes({ containerBorderWidth: value })}
                    onColorChange={(value) => setAttributes({ containerBorderColor: value })}
                    onRadiusChange={(value) => setAttributes({ containerBorderRadius: value })}
                />

                <AdvancedTypographyControls
                    title={__('Question Typography', 'wedocs')}
                    textColor={titleColor}
                    fontSize={titleFontSize}
                    fontWeight={titleFontWeight}
                    lineHeight={titleLineHeight}
                    letterSpacing={titleLetterSpacing}
                    onTextColorChange={(value) => setAttributes({ titleColor: value })}
                    onFontSizeChange={(value) => setAttributes({ titleFontSize: value })}
                    onFontWeightChange={(value) => setAttributes({ titleFontWeight: value })}
                    onLineHeightChange={(value) => setAttributes({ titleLineHeight: value })}
                    onLetterSpacingChange={(value) => setAttributes({ titleLetterSpacing: value })}
                    showFontFamily={false}
                    showTextTransform={false}
                    showTextDecoration={false}
                    showTextAlign={false}
                    showHoverColor={false}
                    initialOpen={false}
                />

                <SpacingPanel
                    title={__('Question Spacing', 'wedocs')}
                    padding={titlePadding}
                    margin={titleMargin}
                    onPaddingChange={(value) => setAttributes({ titlePadding: value })}
                    onMarginChange={(value) => setAttributes({ titleMargin: value })}
                />

                <ButtonControls
                    title={__('Yes Button Styling', 'wedocs')}
                    backgroundColor={yesButtonColor}
                    textColor={buttonTextColor}
                    hoverBackgroundColor={yesButtonHoverColor}
                    hoverTextColor={buttonTextHoverColor}
                    activeBackgroundColor={yesButtonActiveColor}
                    borderColor={buttonBorderColor}
                    hoverBorderColor={buttonBorderHoverColor}
                    border={yesButtonBorder}
                    borderRadius={yesButtonBorderRadius}
                    padding={yesButtonPadding}
                    margin={yesButtonMargin}
                    width={yesButtonWidth}
                    height={yesButtonHeight}
                    onBackgroundColorChange={(value) => setAttributes({ yesButtonColor: value })}
                    onTextColorChange={(value) => setAttributes({ buttonTextColor: value })}
                    onHoverBackgroundColorChange={(value) => setAttributes({ yesButtonHoverColor: value })}
                    onHoverTextColorChange={(value) => setAttributes({ buttonTextHoverColor: value })}
                    onActiveBackgroundColorChange={(value) => setAttributes({ yesButtonActiveColor: value })}
                    onBorderColorChange={(value) => setAttributes({ buttonBorderColor: value })}
                    onHoverBorderColorChange={(value) => setAttributes({ buttonBorderHoverColor: value })}
                    onBorderChange={(value) => setAttributes({ yesButtonBorder: value })}
                    onBorderRadiusChange={(value) => setAttributes({ yesButtonBorderRadius: value })}
                    onPaddingChange={(value) => setAttributes({ yesButtonPadding: value })}
                    onMarginChange={(value) => setAttributes({ yesButtonMargin: value })}
                    onWidthChange={(value) => setAttributes({ yesButtonWidth: value })}
                    onHeightChange={(value) => setAttributes({ yesButtonHeight: value })}
                    showAlignment={false}
                    showActiveStates={true}
                    initialOpen={false}
                />

                <IconControls
                    title={__('Yes Icon Styling', 'wedocs')}
                    iconSize={yesIconSize}
                    iconColor={yesIconColor}
                    iconHoverColor={yesIconHoverColor}
                    iconBackgroundColor={yesIconBackgroundColor}
                    iconBorderRadius={yesIconBorderRadius}
                    iconMargin={yesIconMargin}
                    onIconSizeChange={(value) => setAttributes({ yesIconSize: value })}
                    onIconColorChange={(value) => setAttributes({ yesIconColor: value })}
                    onIconHoverColorChange={(value) => setAttributes({ yesIconHoverColor: value })}
                    onIconBackgroundColorChange={(value) => setAttributes({ yesIconBackgroundColor: value })}
                    onIconBorderRadiusChange={(value) => setAttributes({ yesIconBorderRadius: value })}
                    onIconMarginChange={(value) => setAttributes({ yesIconMargin: value })}
                    showIconLibrary={false}
                    showPosition={false}
                    showRotation={false}
                    showOpacity={false}
                    initialOpen={false}
                />

                <ButtonControls
                    title={__('No Button Styling', 'wedocs')}
                    backgroundColor={noButtonColor}
                    textColor={buttonTextColor}
                    hoverBackgroundColor={noButtonHoverColor}
                    hoverTextColor={buttonTextHoverColor}
                    activeBackgroundColor={noButtonActiveColor}
                    borderColor={buttonBorderColor}
                    hoverBorderColor={buttonBorderHoverColor}
                    border={noButtonBorder}
                    borderRadius={noButtonBorderRadius}
                    padding={noButtonPadding}
                    margin={noButtonMargin}
                    width={noButtonWidth}
                    height={noButtonHeight}
                    onBackgroundColorChange={(value) => setAttributes({ noButtonColor: value })}
                    onTextColorChange={(value) => setAttributes({ buttonTextColor: value })}
                    onHoverBackgroundColorChange={(value) => setAttributes({ noButtonHoverColor: value })}
                    onHoverTextColorChange={(value) => setAttributes({ buttonTextHoverColor: value })}
                    onActiveBackgroundColorChange={(value) => setAttributes({ noButtonActiveColor: value })}
                    onBorderColorChange={(value) => setAttributes({ buttonBorderColor: value })}
                    onHoverBorderColorChange={(value) => setAttributes({ buttonBorderHoverColor: value })}
                    onBorderChange={(value) => setAttributes({ noButtonBorder: value })}
                    onBorderRadiusChange={(value) => setAttributes({ noButtonBorderRadius: value })}
                    onPaddingChange={(value) => setAttributes({ noButtonPadding: value })}
                    onMarginChange={(value) => setAttributes({ noButtonMargin: value })}
                    onWidthChange={(value) => setAttributes({ noButtonWidth: value })}
                    onHeightChange={(value) => setAttributes({ noButtonHeight: value })}
                    showAlignment={false}
                    showActiveStates={true}
                    initialOpen={false}
                />

                <IconControls
                    title={__('No Icon Styling', 'wedocs')}
                    iconSize={noIconSize}
                    iconColor={noIconColor}
                    iconHoverColor={noIconHoverColor}
                    iconBackgroundColor={noIconBackgroundColor}
                    iconBorderRadius={noIconBorderRadius}
                    iconMargin={noIconMargin}
                    onIconSizeChange={(value) => setAttributes({ noIconSize: value })}
                    onIconColorChange={(value) => setAttributes({ noIconColor: value })}
                    onIconHoverColorChange={(value) => setAttributes({ noIconHoverColor: value })}
                    onIconBackgroundColorChange={(value) => setAttributes({ noIconBackgroundColor: value })}
                    onIconBorderRadiusChange={(value) => setAttributes({ noIconBorderRadius: value })}
                    onIconMarginChange={(value) => setAttributes({ noIconMargin: value })}
                    showIconLibrary={false}
                    showPosition={false}
                    showRotation={false}
                    showOpacity={false}
                    initialOpen={false}
                />

                <ButtonGroupControls
                    title={__('Button Group Layout', 'wedocs')}
                    gap={buttonGap}
                    direction={buttonDirection}
                    justifyContent={buttonJustifyContent}
                    onGapChange={(value) => setAttributes({ buttonGap: value })}
                    onDirectionChange={(value) => setAttributes({ buttonDirection: value })}
                    onJustifyContentChange={(value) => setAttributes({ buttonJustifyContent: value })}
                    initialOpen={false}
                />

                <AdvancedTypographyControls
                    title={__('Button Typography', 'wedocs')}
                    fontSize={buttonFontSize}
                    fontWeight={buttonFontWeight}
                    letterSpacing={buttonLetterSpacing}
                    onFontSizeChange={(value) => setAttributes({ buttonFontSize: value })}
                    onFontWeightChange={(value) => setAttributes({ buttonFontWeight: value })}
                    onLetterSpacingChange={(value) => setAttributes({ buttonLetterSpacing: value })}
                    showFontFamily={false}
                    showTextColor={false}
                    showLineHeight={false}
                    showTextTransform={false}
                    showTextDecoration={false}
                    showTextAlign={false}
                    showHoverColor={false}
                    initialOpen={false}
                />

                <HoverStateControls
                    title={__('Button Effects & Transitions', 'wedocs')}
                    transitionDuration={transitionDuration}
                    transitionTimingFunction={transitionTimingFunction}
                    hoverScale={buttonHoverScale}
                    hoverTranslateY={buttonHoverTranslateY}
                    onTransitionDurationChange={(value) => setAttributes({ transitionDuration: value })}
                    onTransitionTimingFunctionChange={(value) => setAttributes({ transitionTimingFunction: value })}
                    onHoverScaleChange={(value) => setAttributes({ buttonHoverScale: value })}
                    onHoverTranslateYChange={(value) => setAttributes({ buttonHoverTranslateY: value })}
                    showHoverState={false}
                    showActiveState={false}
                    showFocusState={false}
                    showHoverTranslateX={false}
                    showHoverRotate={false}
                    showHoverOpacity={false}
                    showHoverBoxShadow={false}
                    initialOpen={false}
                />
            </InspectorControls>

            <div {...blockProps}>
                <div
                    className={`wedocs-helpful-feedback ${layout} ${additionalCssClass}`}
                    style={containerStyle}
                >
                    <div className="wedocs-feedback-title" style={titleStyle}>
                        {questionText}
                    </div>

                    <div className="wedocs-feedback-buttons" style={buttonsContainerStyle}>
                        <button
                            className="wedocs-feedback-button wedocs-feedback-yes"
                            style={getYesButtonStyle(hoveredButton === 'yes')}
                            onMouseEnter={() => setHoveredButton('yes')}
                            onMouseLeave={() => setHoveredButton(null)}
                            disabled
                        >
                            <span className="wedocs-feedback-icon" style={getYesIconStyle(hoveredButton === 'yes')}>
                                {thumbsUp}
                            </span>
                            {yesButtonText}
                            {showVoteCount && <span className="vote-count"> (0)</span>}
                        </button>

                        <button
                            className="wedocs-feedback-button wedocs-feedback-no"
                            style={getNoButtonStyle(hoveredButton === 'no')}
                            onMouseEnter={() => setHoveredButton('no')}
                            onMouseLeave={() => setHoveredButton(null)}
                            disabled
                        >
                            <span className="wedocs-feedback-icon" style={getNoIconStyle(hoveredButton === 'no')}>
                                {thumbsDown}
                            </span>
                            {noButtonText}
                            {showVoteCount && <span className="vote-count"> (0)</span>}
                        </button>
                    </div>

                    <div className="wedocs-feedback-preview-note" style={{ marginTop: '10px', fontSize: '12px', opacity: '0.7' }}>
                        {__('Preview mode - voting disabled in editor', 'wedocs')}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Edit;
