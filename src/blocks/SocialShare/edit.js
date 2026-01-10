import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { getBlockClasses, getInlineStyles } from '../block-helpers';
import {
    PanelBody,
    SelectControl,
    ToggleControl,
    TextControl,
    RangeControl,
    __experimentalBoxControl as BoxControl,
    __experimentalToolsPanel as ToolsPanel,
    __experimentalToolsPanelItem as ToolsPanelItem,
    ColorPalette
} from '@wordpress/components';

const Edit = ({ attributes, setAttributes }) => {
    const blockProps = useBlockProps();

    const {
        labelText,
        showLabel,
        enabledPlatforms,
        buttonStyle,
        buttonSize,
        buttonShape,
        layout,
        alignment,
        spacing,
        labelColor,
        labelFontSize,
        labelFontWeight,
        buttonBgColor,
        buttonBgHoverColor,
        buttonIconColor,
        buttonIconHoverColor,
        useIndividualColors,
        facebookColor,
        twitterColor,
        linkedinColor,
        pinterestColor,
        containerPadding,
        containerMargin,
        containerBorderStyle,
        containerBorderColor,
        containerBorderWidth,
        containerBorderRadius,
        containerBgColor,
        additionalCssClass
    } = attributes;

    // Color palette
    const colors = [
        { name: 'Red', color: '#EF4444' },
        { name: 'Blue', color: '#3B82F6' },
        { name: 'Green', color: '#10B981' },
        { name: 'Yellow', color: '#F59E0B' },
        { name: 'Purple', color: '#8B5CF6' },
        { name: 'Pink', color: '#EC4899' },
        { name: 'Gray', color: '#6B7280' },
        { name: 'Black', color: '#000000' },
        { name: 'White', color: '#FFFFFF' },
    ];

    // Social icons SVG
    const socialIcons = {
        facebook: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
        ),
        twitter: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
        ),
        linkedin: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
        ),
        pinterest: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
            </svg>
        )
    };

    // Get button size class
    const getButtonSizeClass = () => {
        switch (buttonSize) {
            case 'small': return 'wedocs-social-btn-small';
            case 'large': return 'wedocs-social-btn-large';
            default: return 'wedocs-social-btn-medium';
        }
    };

    // Get button shape class
    const getButtonShapeClass = () => {
        switch (buttonShape) {
            case 'square': return 'wedocs-social-btn-square';
            case 'circle': return 'wedocs-social-btn-circle';
            default: return 'wedocs-social-btn-rounded';
        }
    };

    // Get alignment class
    const getAlignmentClass = () => {
        switch (alignment) {
            case 'center': return 'wedocs-social-align-center';
            case 'right': return 'wedocs-social-align-right';
            default: return 'wedocs-social-align-left';
        }
    };

    // Container styles
    const containerStyles = {
        backgroundColor: containerBgColor,
        padding: `${containerPadding?.top || '20px'} ${containerPadding?.right || '0px'} ${containerPadding?.bottom || '20px'} ${containerPadding?.left || '0px'}`,
        margin: `${containerMargin?.top || '20px'} ${containerMargin?.right || '0px'} ${containerMargin?.bottom || '20px'} ${containerMargin?.left || '0px'}`,
        border: containerBorderStyle !== 'none' ? `${containerBorderWidth} ${containerBorderStyle} ${containerBorderColor}` : 'none',
        borderRadius: containerBorderRadius
    };

    // Label styles
    const labelStyles = {
        color: labelColor,
        fontSize: `${labelFontSize}px`,
        fontWeight: labelFontWeight,
        marginBottom: '12px'
    };

    // Button wrapper styles
    const buttonWrapperStyles = {
        display: 'flex',
        flexDirection: layout === 'vertical' ? 'column' : 'row',
        gap: `${spacing}px`,
        flexWrap: 'wrap'
    };

    // Get button color
    const getButtonColor = (platform) => {
        if (useIndividualColors) {
            switch (platform) {
                case 'facebook': return facebookColor;
                case 'twitter': return twitterColor;
                case 'linkedin': return linkedinColor;
                case 'pinterest': return pinterestColor;
                default: return buttonBgColor;
            }
        }
        return buttonBgColor;
    };

    return (
        <Fragment>
            <InspectorControls>
                {/* Content Settings */}
                <PanelBody title={__('Content Settings', 'wedocs')} initialOpen={true}>
                    <ToggleControl
                        label={__('Show Label', 'wedocs')}
                        checked={showLabel}
                        onChange={(value) => setAttributes({ showLabel: value })}
                    />
                    {showLabel && (
                        <TextControl
                            label={__('Label Text', 'wedocs')}
                            value={labelText}
                            onChange={(value) => setAttributes({ labelText: value })}
                        />
                    )}
                </PanelBody>

                {/* Platform Settings */}
                <PanelBody title={__('Platform Settings', 'wedocs')} initialOpen={true}>
                    <ToggleControl
                        label={__('Facebook', 'wedocs')}
                        checked={enabledPlatforms.facebook}
                        onChange={(value) => setAttributes({
                            enabledPlatforms: { ...enabledPlatforms, facebook: value }
                        })}
                    />
                    <ToggleControl
                        label={__('Twitter/X', 'wedocs')}
                        checked={enabledPlatforms.twitter}
                        onChange={(value) => setAttributes({
                            enabledPlatforms: { ...enabledPlatforms, twitter: value }
                        })}
                    />
                    <ToggleControl
                        label={__('LinkedIn', 'wedocs')}
                        checked={enabledPlatforms.linkedin}
                        onChange={(value) => setAttributes({
                            enabledPlatforms: { ...enabledPlatforms, linkedin: value }
                        })}
                    />
                    <ToggleControl
                        label={__('Pinterest', 'wedocs')}
                        checked={enabledPlatforms.pinterest}
                        onChange={(value) => setAttributes({
                            enabledPlatforms: { ...enabledPlatforms, pinterest: value }
                        })}
                    />
                </PanelBody>

                {/* Layout Settings */}
                <PanelBody title={__('Layout Settings', 'wedocs')} initialOpen={false}>
                    <SelectControl
                        label={__('Button Style', 'wedocs')}
                        value={buttonStyle}
                        options={[
                            { label: __('Icon Only', 'wedocs'), value: 'icon-only' },
                            { label: __('Icon with Text', 'wedocs'), value: 'icon-text' },
                            { label: __('Text Only', 'wedocs'), value: 'text-only' }
                        ]}
                        onChange={(value) => setAttributes({ buttonStyle: value })}
                    />
                    <SelectControl
                        label={__('Button Size', 'wedocs')}
                        value={buttonSize}
                        options={[
                            { label: __('Small', 'wedocs'), value: 'small' },
                            { label: __('Medium', 'wedocs'), value: 'medium' },
                            { label: __('Large', 'wedocs'), value: 'large' }
                        ]}
                        onChange={(value) => setAttributes({ buttonSize: value })}
                    />
                    <SelectControl
                        label={__('Button Shape', 'wedocs')}
                        value={buttonShape}
                        options={[
                            { label: __('Rounded', 'wedocs'), value: 'rounded' },
                            { label: __('Square', 'wedocs'), value: 'square' },
                            { label: __('Circle', 'wedocs'), value: 'circle' }
                        ]}
                        onChange={(value) => setAttributes({ buttonShape: value })}
                    />
                    <SelectControl
                        label={__('Layout', 'wedocs')}
                        value={layout}
                        options={[
                            { label: __('Horizontal', 'wedocs'), value: 'horizontal' },
                            { label: __('Vertical', 'wedocs'), value: 'vertical' }
                        ]}
                        onChange={(value) => setAttributes({ layout: value })}
                    />
                    <SelectControl
                        label={__('Alignment', 'wedocs')}
                        value={alignment}
                        options={[
                            { label: __('Left', 'wedocs'), value: 'left' },
                            { label: __('Center', 'wedocs'), value: 'center' },
                            { label: __('Right', 'wedocs'), value: 'right' }
                        ]}
                        onChange={(value) => setAttributes({ alignment: value })}
                    />
                    <RangeControl
                        label={__('Button Spacing', 'wedocs')}
                        value={spacing}
                        onChange={(value) => setAttributes({ spacing: value })}
                        min={0}
                        max={50}
                    />
                </PanelBody>

                {/* Label Style */}
                {showLabel && (
                    <PanelBody title={__('Label Style', 'wedocs')} initialOpen={false}>
                        <ToolsPanel label={__('Label Colors', 'wedocs')}>
                            <ToolsPanelItem
                                hasValue={() => labelColor !== '#374151'}
                                label={__('Text Color', 'wedocs')}
                                onDeselect={() => setAttributes({ labelColor: '#374151' })}
                            >
                                <ColorPalette
                                    colors={colors}
                                    value={labelColor}
                                    onChange={(value) => setAttributes({ labelColor: value })}
                                />
                            </ToolsPanelItem>
                        </ToolsPanel>
                        <RangeControl
                            label={__('Font Size', 'wedocs')}
                            value={labelFontSize}
                            onChange={(value) => setAttributes({ labelFontSize: value })}
                            min={12}
                            max={32}
                        />
                        <SelectControl
                            label={__('Font Weight', 'wedocs')}
                            value={labelFontWeight}
                            options={[
                                { label: __('Normal', 'wedocs'), value: '400' },
                                { label: __('Medium', 'wedocs'), value: '500' },
                                { label: __('Semibold', 'wedocs'), value: '600' },
                                { label: __('Bold', 'wedocs'), value: '700' }
                            ]}
                            onChange={(value) => setAttributes({ labelFontWeight: value })}
                        />
                    </PanelBody>
                )}

                {/* Button Style */}
                <PanelBody title={__('Button Colors', 'wedocs')} initialOpen={false}>
                    <ToggleControl
                        label={__('Use Individual Platform Colors', 'wedocs')}
                        checked={useIndividualColors}
                        onChange={(value) => setAttributes({ useIndividualColors: value })}
                        help={__('Enable to use platform-specific brand colors', 'wedocs')}
                    />

                    {!useIndividualColors ? (
                        <ToolsPanel label={__('Button Colors', 'wedocs')}>
                            <ToolsPanelItem
                                hasValue={() => buttonBgColor !== '#6B7280'}
                                label={__('Background Color', 'wedocs')}
                                onDeselect={() => setAttributes({ buttonBgColor: '#6B7280' })}
                            >
                                <ColorPalette
                                    colors={colors}
                                    value={buttonBgColor}
                                    onChange={(value) => setAttributes({ buttonBgColor: value })}
                                />
                            </ToolsPanelItem>
                            <ToolsPanelItem
                                hasValue={() => buttonBgHoverColor !== '#4B5563'}
                                label={__('Hover Background Color', 'wedocs')}
                                onDeselect={() => setAttributes({ buttonBgHoverColor: '#4B5563' })}
                            >
                                <ColorPalette
                                    colors={colors}
                                    value={buttonBgHoverColor}
                                    onChange={(value) => setAttributes({ buttonBgHoverColor: value })}
                                />
                            </ToolsPanelItem>
                            <ToolsPanelItem
                                hasValue={() => buttonIconColor !== '#FFFFFF'}
                                label={__('Icon Color', 'wedocs')}
                                onDeselect={() => setAttributes({ buttonIconColor: '#FFFFFF' })}
                            >
                                <ColorPalette
                                    colors={colors}
                                    value={buttonIconColor}
                                    onChange={(value) => setAttributes({ buttonIconColor: value })}
                                />
                            </ToolsPanelItem>
                        </ToolsPanel>
                    ) : (
                        <ToolsPanel label={__('Platform Colors', 'wedocs')}>
                            <ToolsPanelItem
                                hasValue={() => facebookColor !== '#1877F2'}
                                label={__('Facebook Color', 'wedocs')}
                                onDeselect={() => setAttributes({ facebookColor: '#1877F2' })}
                            >
                                <ColorPalette
                                    colors={colors}
                                    value={facebookColor}
                                    onChange={(value) => setAttributes({ facebookColor: value })}
                                />
                            </ToolsPanelItem>
                            <ToolsPanelItem
                                hasValue={() => twitterColor !== '#000000'}
                                label={__('Twitter/X Color', 'wedocs')}
                                onDeselect={() => setAttributes({ twitterColor: '#000000' })}
                            >
                                <ColorPalette
                                    colors={colors}
                                    value={twitterColor}
                                    onChange={(value) => setAttributes({ twitterColor: value })}
                                />
                            </ToolsPanelItem>
                            <ToolsPanelItem
                                hasValue={() => linkedinColor !== '#0A66C2'}
                                label={__('LinkedIn Color', 'wedocs')}
                                onDeselect={() => setAttributes({ linkedinColor: '#0A66C2' })}
                            >
                                <ColorPalette
                                    colors={colors}
                                    value={linkedinColor}
                                    onChange={(value) => setAttributes({ linkedinColor: value })}
                                />
                            </ToolsPanelItem>
                            <ToolsPanelItem
                                hasValue={() => pinterestColor !== '#E60023'}
                                label={__('Pinterest Color', 'wedocs')}
                                onDeselect={() => setAttributes({ pinterestColor: '#E60023' })}
                            >
                                <ColorPalette
                                    colors={colors}
                                    value={pinterestColor}
                                    onChange={(value) => setAttributes({ pinterestColor: value })}
                                />
                            </ToolsPanelItem>
                        </ToolsPanel>
                    )}
                </PanelBody>

                {/* Container Style */}
                <PanelBody title={__('Container Style', 'wedocs')} initialOpen={false}>
                    <ToolsPanel label={__('Container Colors', 'wedocs')}>
                        <ToolsPanelItem
                            hasValue={() => containerBgColor !== 'transparent'}
                            label={__('Background Color', 'wedocs')}
                            onDeselect={() => setAttributes({ containerBgColor: 'transparent' })}
                        >
                            <ColorPalette
                                colors={colors}
                                value={containerBgColor}
                                onChange={(value) => setAttributes({ containerBgColor: value })}
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => containerBorderColor !== '#E5E7EB'}
                            label={__('Border Color', 'wedocs')}
                            onDeselect={() => setAttributes({ containerBorderColor: '#E5E7EB' })}
                        >
                            <ColorPalette
                                colors={colors}
                                value={containerBorderColor}
                                onChange={(value) => setAttributes({ containerBorderColor: value })}
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
                        options={[
                            { label: __('None', 'wedocs'), value: 'none' },
                            { label: __('Solid', 'wedocs'), value: 'solid' },
                            { label: __('Dashed', 'wedocs'), value: 'dashed' },
                            { label: __('Dotted', 'wedocs'), value: 'dotted' }
                        ]}
                        onChange={(value) => setAttributes({ containerBorderStyle: value })}
                    />

                    {containerBorderStyle !== 'none' && (
                        <>
                            <TextControl
                                label={__('Border Width', 'wedocs')}
                                value={containerBorderWidth}
                                onChange={(value) => setAttributes({ containerBorderWidth: value })}
                            />
                            <TextControl
                                label={__('Border Radius', 'wedocs')}
                                value={containerBorderRadius}
                                onChange={(value) => setAttributes({ containerBorderRadius: value })}
                            />
                        </>
                    )}
                </PanelBody>

                {/* Advanced Settings */}
                <PanelBody title={__('Advanced', 'wedocs')} initialOpen={false}>
                    <TextControl
                        label={__('Additional CSS Class', 'wedocs')}
                        value={additionalCssClass}
                        onChange={(value) => setAttributes({ additionalCssClass: value })}
                        help={__('Add custom CSS classes for additional styling', 'wedocs')}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div
                    className={`wedocs-social-share-block ${getAlignmentClass()} ${additionalCssClass}`}
                    style={containerStyles}
                >
                    {showLabel && (
                        <span className="wedocs-social-share-label" style={labelStyles}>
                            {labelText}
                        </span>
                    )}

                    <div
                        className={`wedocs-social-share-buttons ${layout === 'vertical' ? 'vertical' : 'horizontal'}`}
                        style={buttonWrapperStyles}
                    >
                        {enabledPlatforms.facebook && (
                            <button
                                className={`wedocs-social-share-btn wedocs-social-share-facebook ${getButtonSizeClass()} ${getButtonShapeClass()}`}
                                style={{
                                    backgroundColor: getButtonColor('facebook'),
                                    color: buttonIconColor
                                }}
                                disabled
                            >
                                {socialIcons.facebook}
                                {buttonStyle === 'icon-text' && <span>Facebook</span>}
                                {buttonStyle === 'text-only' && <span>Facebook</span>}
                            </button>
                        )}

                        {enabledPlatforms.twitter && (
                            <button
                                className={`wedocs-social-share-btn wedocs-social-share-twitter ${getButtonSizeClass()} ${getButtonShapeClass()}`}
                                style={{
                                    backgroundColor: getButtonColor('twitter'),
                                    color: buttonIconColor
                                }}
                                disabled
                            >
                                {socialIcons.twitter}
                                {buttonStyle === 'icon-text' && <span>Twitter</span>}
                                {buttonStyle === 'text-only' && <span>Twitter</span>}
                            </button>
                        )}

                        {enabledPlatforms.linkedin && (
                            <button
                                className={`wedocs-social-share-btn wedocs-social-share-linkedin ${getButtonSizeClass()} ${getButtonShapeClass()}`}
                                style={{
                                    backgroundColor: getButtonColor('linkedin'),
                                    color: buttonIconColor
                                }}
                                disabled
                            >
                                {socialIcons.linkedin}
                                {buttonStyle === 'icon-text' && <span>LinkedIn</span>}
                                {buttonStyle === 'text-only' && <span>LinkedIn</span>}
                            </button>
                        )}

                        {enabledPlatforms.pinterest && (
                            <button
                                className={`wedocs-social-share-btn wedocs-social-share-pinterest ${getButtonSizeClass()} ${getButtonShapeClass()}`}
                                style={{
                                    backgroundColor: getButtonColor('pinterest'),
                                    color: buttonIconColor
                                }}
                                disabled
                            >
                                {socialIcons.pinterest}
                                {buttonStyle === 'icon-text' && <span>Pinterest</span>}
                                {buttonStyle === 'text-only' && <span>Pinterest</span>}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Edit;
