import { __ } from '@wordpress/i18n';
import { thumbsUp, thumbsDown } from '@wordpress/icons';
import { Fragment } from '@wordpress/element';
import {
    useBlockProps,
    InspectorControls,
    BlockControls,
    AlignmentToolbar,
} from '@wordpress/block-editor';
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
} from '../commonControls/CommonControls';
import RadioImageControl from '../CustomControls/RadioImageControl';

const Edit = ({ attributes, setAttributes }) => {
    const blockProps = useBlockProps();

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

    const containerStyle = {
        backgroundColor: containerBgColor,
        padding: `${containerPadding.top} ${containerPadding.right} ${containerPadding.bottom} ${containerPadding.left}`,
        margin: `${containerMargin.top} ${containerMargin.right} ${containerMargin.bottom} ${containerMargin.left}`,
        border: containerBorderStyle !== 'none' ? `${containerBorderWidth.top} ${containerBorderStyle} ${containerBorderColor}` : 'none',
        borderRadius: `${containerBorderRadius.top} ${containerBorderRadius.right} ${containerBorderRadius.bottom} ${containerBorderRadius.left}`,
        boxShadow: containerBoxShadow,
        textAlign: alignment,
        transition: 'all 0.3s ease'
    };

    const titleStyle = {
        color: titleColor,
        fontSize: titleFontSize,
        fontWeight: titleFontWeight,
        lineHeight: titleLineHeight,
        letterSpacing: titleLetterSpacing,
        padding: `${titlePadding.top} ${titlePadding.right} ${titlePadding.bottom} ${titlePadding.left}`,
        margin: `${titleMargin.top} ${titleMargin.right} ${titleMargin.bottom} ${titleMargin.left}`
    };

    const buttonBaseStyle = {
        border: buttonBorderStyle !== 'none' ? `${buttonBorderWidth} ${buttonBorderStyle} ${buttonBorderColor}` : 'none',
        borderRadius: buttonBorderRadius,
        boxShadow: buttonBoxShadow,
        color: buttonTextColor,
        padding: '12px 24px',
        margin: '0 8px',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.3s ease'
    };

    const yesButtonStyle = {
        ...buttonBaseStyle,
        backgroundColor: yesButtonColor
    };

    const noButtonStyle = {
        ...buttonBaseStyle,
        backgroundColor: noButtonColor
    };

    const iconStyle = {
        width: iconWidth,
        height: iconHeight,
        color: iconColor
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

                <ColorSettingsPanel
                    title={__('Title Colors', 'wedocs')}
                    colorSettings={[
                        {
                            value: titleColor,
                            onChange: (value) => setAttributes({ titleColor: value }),
                            label: __('Title Color', 'wedocs'),
                        },
                    ]}
                />

                <TypographyPanel
                    title={__('Title Typography', 'wedocs')}
                    fontSize={titleFontSize}
                    fontWeight={titleFontWeight}
                    lineHeight={titleLineHeight}
                    letterSpacing={titleLetterSpacing}
                    onFontSizeChange={(value) => setAttributes({ titleFontSize: value })}
                    onFontWeightChange={(value) => setAttributes({ titleFontWeight: value })}
                    onLineHeightChange={(value) => setAttributes({ titleLineHeight: value })}
                    onLetterSpacingChange={(value) => setAttributes({ titleLetterSpacing: value })}
                    showLineHeight={true}
                    showLetterSpacing={true}
                />

                <SpacingPanel
                    title={__('Title Spacing', 'wedocs')}
                    padding={titlePadding}
                    margin={titleMargin}
                    onPaddingChange={(value) => setAttributes({ titlePadding: value })}
                    onMarginChange={(value) => setAttributes({ titleMargin: value })}
                />

                <ColorSettingsPanel
                    title={__('Button Colors', 'wedocs')}
                    colorSettings={[
                        {
                            value: yesButtonColor,
                            onChange: (value) => setAttributes({ yesButtonColor: value }),
                            label: __('Yes Button', 'wedocs'),
                        },
                        {
                            value: yesButtonHoverColor,
                            onChange: (value) => setAttributes({ yesButtonHoverColor: value }),
                            label: __('Yes Hover', 'wedocs'),
                        },
                        {
                            value: noButtonColor,
                            onChange: (value) => setAttributes({ noButtonColor: value }),
                            label: __('No Button', 'wedocs'),
                        },
                        {
                            value: noButtonHoverColor,
                            onChange: (value) => setAttributes({ noButtonHoverColor: value }),
                            label: __('No Hover', 'wedocs'),
                        },
                        {
                            value: buttonTextColor,
                            onChange: (value) => setAttributes({ buttonTextColor: value }),
                            label: __('Text Color', 'wedocs'),
                        },
                    ]}
                />

                <BorderPanel
                    title={__('Button Border', 'wedocs')}
                    borderStyle={buttonBorderStyle}
                    borderWidth={buttonBorderWidth}
                    borderColor={buttonBorderColor}
                    borderRadius={buttonBorderRadius}
                    onStyleChange={(value) => setAttributes({ buttonBorderStyle: value })}
                    onWidthChange={(value) => setAttributes({ buttonBorderWidth: value })}
                    onColorChange={(value) => setAttributes({ buttonBorderColor: value })}
                    onRadiusChange={(value) => setAttributes({ buttonBorderRadius: value })}
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

                    <div className="wedocs-feedback-buttons">
                        <button
                            className="wedocs-feedback-button wedocs-feedback-yes"
                            style={yesButtonStyle}
                            disabled
                        >
                            <span className="wedocs-feedback-icon" style={iconStyle}>
                                {thumbsUp}
                            </span>
                            {yesButtonText}
                            {showVoteCount && <span className="vote-count"> (0)</span>}
                        </button>

                        <button
                            className="wedocs-feedback-button wedocs-feedback-no"
                            style={noButtonStyle}
                            disabled
                        >
                            <span className="wedocs-feedback-icon" style={iconStyle}>
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
