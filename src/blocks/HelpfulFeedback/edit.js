import { __ } from '@wordpress/i18n';
import { thumbsUp, thumbsDown } from '@wordpress/icons';
import { Fragment } from '@wordpress/element';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import {
    PanelBody,
    SelectControl,
    ToggleControl,
    TextControl,
    __experimentalBoxControl as BoxControl,
    ColorPalette,
    RangeControl,
    __experimentalBorderControl as BorderControl,
    __experimentalToolsPanel as ToolsPanel,
    __experimentalToolsPanelItem as ToolsPanelItem
} from '@wordpress/components';
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
        dataAttributes
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

    const alignmentOptions = [
        { label: __('Left', 'wedocs'), value: 'left' },
        { label: __('Center', 'wedocs'), value: 'center' },
        { label: __('Right', 'wedocs'), value: 'right' }
    ];

    const borderStyles = [
        { label: __('None', 'wedocs'), value: 'none' },
        { label: __('Solid', 'wedocs'), value: 'solid' },
        { label: __('Dashed', 'wedocs'), value: 'dashed' },
        { label: __('Dotted', 'wedocs'), value: 'dotted' }
    ];

    const fontWeightOptions = [
        { label: __('Normal', 'wedocs'), value: '400' },
        { label: __('Medium', 'wedocs'), value: '500' },
        { label: __('Semi Bold', 'wedocs'), value: '600' },
        { label: __('Bold', 'wedocs'), value: '700' }
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

                <PanelBody title={__('Layout & Alignment', 'wedocs')} initialOpen={false}>
                    <label>{__('Layout Style', 'wedocs')}</label>
                    <RadioImageControl
                        selected={layout}
                        options={layoutOptions}
                        onChange={(value) => setAttributes({ layout: value })}
                    />

                    <SelectControl
                        label={__('Alignment', 'wedocs')}
                        value={alignment}
                        options={alignmentOptions}
                        onChange={(value) => setAttributes({ alignment: value })}
                    />
                </PanelBody>

                <PanelBody title={__('Container Styling', 'wedocs')} initialOpen={false}>
                    <ToolsPanel label={__('Container Settings', 'wedocs')}>
                        <ToolsPanelItem
                            hasValue={() => containerBgColor !== '#ffffff'}
                            label={__('Background Color', 'wedocs')}
                            onDeselect={() => setAttributes({ containerBgColor: '#ffffff' })}
                        >
                            <ColorPalette
                                label={__('Background Color', 'wedocs')}
                                value={containerBgColor}
                                onChange={(value) => setAttributes({ containerBgColor: value || '#ffffff' })}
                            />
                        </ToolsPanelItem>

                        <ToolsPanelItem
                            hasValue={() => containerBgHoverColor !== '#f9f9f9'}
                            label={__('Background Hover Color', 'wedocs')}
                            onDeselect={() => setAttributes({ containerBgHoverColor: '#f9f9f9' })}
                        >
                            <ColorPalette
                                label={__('Background Hover Color', 'wedocs')}
                                value={containerBgHoverColor}
                                onChange={(value) => setAttributes({ containerBgHoverColor: value || '#f9f9f9' })}
                            />
                        </ToolsPanelItem>
                    </ToolsPanel>

                    <BoxControl
                        label={__('Padding', 'wedocs')}
                        values={containerPadding}
                        onChange={(value) => setAttributes({ containerPadding: value })}
                    />

                    <BoxControl
                        label={__('Margin', 'wedocs')}
                        values={containerMargin}
                        onChange={(value) => setAttributes({ containerMargin: value })}
                    />

                    <SelectControl
                        label={__('Border Style', 'wedocs')}
                        value={containerBorderStyle}
                        options={borderStyles}
                        onChange={(value) => setAttributes({ containerBorderStyle: value })}
                    />

                    {containerBorderStyle !== 'none' && (
                        <Fragment>
                            <ColorPalette
                                label={__('Border Color', 'wedocs')}
                                value={containerBorderColor}
                                onChange={(value) => setAttributes({ containerBorderColor: value || '#e0e0e0' })}
                            />

                            <BoxControl
                                label={__('Border Width', 'wedocs')}
                                values={containerBorderWidth}
                                onChange={(value) => setAttributes({ containerBorderWidth: value })}
                            />
                        </Fragment>
                    )}

                    <BoxControl
                        label={__('Border Radius', 'wedocs')}
                        values={containerBorderRadius}
                        onChange={(value) => setAttributes({ containerBorderRadius: value })}
                    />

                    <TextControl
                        label={__('Box Shadow', 'wedocs')}
                        value={containerBoxShadow}
                        onChange={(value) => setAttributes({ containerBoxShadow: value })}
                        help={__('CSS box-shadow value', 'wedocs')}
                    />
                </PanelBody>

                <PanelBody title={__('Title Styling', 'wedocs')} initialOpen={false}>
                    <ColorPalette
                        label={__('Title Color', 'wedocs')}
                        value={titleColor}
                        onChange={(value) => setAttributes({ titleColor: value || '#333333' })}
                    />

                    <TextControl
                        label={__('Font Size', 'wedocs')}
                        value={titleFontSize}
                        onChange={(value) => setAttributes({ titleFontSize: value })}
                        help={__('e.g., 16px, 1.2em', 'wedocs')}
                    />

                    <SelectControl
                        label={__('Font Weight', 'wedocs')}
                        value={titleFontWeight}
                        options={fontWeightOptions}
                        onChange={(value) => setAttributes({ titleFontWeight: value })}
                    />

                    <TextControl
                        label={__('Line Height', 'wedocs')}
                        value={titleLineHeight}
                        onChange={(value) => setAttributes({ titleLineHeight: value })}
                        help={__('e.g., 1.4, 24px', 'wedocs')}
                    />

                    <TextControl
                        label={__('Letter Spacing', 'wedocs')}
                        value={titleLetterSpacing}
                        onChange={(value) => setAttributes({ titleLetterSpacing: value })}
                        help={__('e.g., 0px, 1px', 'wedocs')}
                    />

                    <BoxControl
                        label={__('Title Padding', 'wedocs')}
                        values={titlePadding}
                        onChange={(value) => setAttributes({ titlePadding: value })}
                    />

                    <BoxControl
                        label={__('Title Margin', 'wedocs')}
                        values={titleMargin}
                        onChange={(value) => setAttributes({ titleMargin: value })}
                    />
                </PanelBody>

                <PanelBody title={__('Button Styling', 'wedocs')} initialOpen={false}>
                    <h4>{__('Yes Button Colors', 'wedocs')}</h4>
                    <ColorPalette
                        label={__('Normal Color', 'wedocs')}
                        value={yesButtonColor}
                        onChange={(value) => setAttributes({ yesButtonColor: value || '#4CAF50' })}
                    />

                    <ColorPalette
                        label={__('Hover Color', 'wedocs')}
                        value={yesButtonHoverColor}
                        onChange={(value) => setAttributes({ yesButtonHoverColor: value || '#45a049' })}
                    />

                    <ColorPalette
                        label={__('Active Color', 'wedocs')}
                        value={yesButtonActiveColor}
                        onChange={(value) => setAttributes({ yesButtonActiveColor: value || '#2e7d32' })}
                    />

                    <h4>{__('No Button Colors', 'wedocs')}</h4>
                    <ColorPalette
                        label={__('Normal Color', 'wedocs')}
                        value={noButtonColor}
                        onChange={(value) => setAttributes({ noButtonColor: value || '#9e9e9e' })}
                    />

                    <ColorPalette
                        label={__('Hover Color', 'wedocs')}
                        value={noButtonHoverColor}
                        onChange={(value) => setAttributes({ noButtonHoverColor: value || '#757575' })}
                    />

                    <ColorPalette
                        label={__('Active Color', 'wedocs')}
                        value={noButtonActiveColor}
                        onChange={(value) => setAttributes({ noButtonActiveColor: value || '#616161' })}
                    />

                    <h4>{__('Button Text Colors', 'wedocs')}</h4>
                    <ColorPalette
                        label={__('Text Color', 'wedocs')}
                        value={buttonTextColor}
                        onChange={(value) => setAttributes({ buttonTextColor: value || '#ffffff' })}
                    />

                    <ColorPalette
                        label={__('Text Hover Color', 'wedocs')}
                        value={buttonTextHoverColor}
                        onChange={(value) => setAttributes({ buttonTextHoverColor: value || '#ffffff' })}
                    />

                    <h4>{__('Icon Settings', 'wedocs')}</h4>
                    <TextControl
                        label={__('Icon Width', 'wedocs')}
                        value={iconWidth}
                        onChange={(value) => setAttributes({ iconWidth: value })}
                    />

                    <TextControl
                        label={__('Icon Height', 'wedocs')}
                        value={iconHeight}
                        onChange={(value) => setAttributes({ iconHeight: value })}
                    />

                    <ColorPalette
                        label={__('Icon Color', 'wedocs')}
                        value={iconColor}
                        onChange={(value) => setAttributes({ iconColor: value || '#ffffff' })}
                    />

                    <ColorPalette
                        label={__('Icon Hover Color', 'wedocs')}
                        value={iconHoverColor}
                        onChange={(value) => setAttributes({ iconHoverColor: value || '#ffffff' })}
                    />

                    <h4>{__('Button Borders', 'wedocs')}</h4>
                    <SelectControl
                        label={__('Border Style', 'wedocs')}
                        value={buttonBorderStyle}
                        options={borderStyles}
                        onChange={(value) => setAttributes({ buttonBorderStyle: value })}
                    />

                    {buttonBorderStyle !== 'none' && (
                        <Fragment>
                            <ColorPalette
                                label={__('Border Color', 'wedocs')}
                                value={buttonBorderColor}
                                onChange={(value) => setAttributes({ buttonBorderColor: value || 'transparent' })}
                            />

                            <ColorPalette
                                label={__('Border Hover Color', 'wedocs')}
                                value={buttonBorderHoverColor}
                                onChange={(value) => setAttributes({ buttonBorderHoverColor: value || 'transparent' })}
                            />

                            <TextControl
                                label={__('Border Width', 'wedocs')}
                                value={buttonBorderWidth}
                                onChange={(value) => setAttributes({ buttonBorderWidth: value })}
                            />
                        </Fragment>
                    )}

                    <TextControl
                        label={__('Border Radius', 'wedocs')}
                        value={buttonBorderRadius}
                        onChange={(value) => setAttributes({ buttonBorderRadius: value })}
                    />

                    <TextControl
                        label={__('Box Shadow', 'wedocs')}
                        value={buttonBoxShadow}
                        onChange={(value) => setAttributes({ buttonBoxShadow: value })}
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