import { __ } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import {
    useBlockProps,
    InspectorControls,
    BlockControls,
    AlignmentToolbar,
    PanelColorSettings,
} from '@wordpress/block-editor';
import { getBlockClasses, getInlineStyles } from '../block-helpers';
import {
    PanelBody,
    TextControl,
    ToggleControl,
    SelectControl,
    __experimentalBoxControl as BoxControl,
    __experimentalUnitControl as UnitControl,
    RangeControl,
} from '@wordpress/components';

const Edit = ({ attributes, setAttributes }) => {
    const {
        hideSearch,
        searchWidth,
        placeholder,
        alignment,
        buttonText,
        showButton,
        buttonPosition,
        buttonBackgroundColor,
        buttonTextColor,
        buttonHoverBackgroundColor,
        buttonHoverTextColor,
        buttonBorderRadius,
        buttonPadding,
        inputBorderRadius,
        iconSize,
    } = attributes;

    const [isButtonHovered, setIsButtonHovered] = useState(false);

    const blockProps = useBlockProps({
        className: `wedocs-search-block align-${alignment}`,
    });

    const searchContainerStyles = {
        display: 'flex',
        justifyContent: alignment === 'center' ? 'center' : alignment === 'right' ? 'flex-end' : 'flex-start',
        width: '100%',
    };

    const searchWrapperStyles = {
        display: 'flex',
        flexDirection: buttonPosition === 'outside' ? 'row' : 'relative',
        width: searchWidth,
        gap: buttonPosition === 'outside' ? '8px' : '0',
    };

    const inputStyles = {
        width: '100%',
        borderRadius: inputBorderRadius,
        paddingRight: showButton && buttonPosition === 'inside' ? '50px' : '16px',
    };

    const buttonStyles = {
        backgroundColor: isButtonHovered ? buttonHoverBackgroundColor || buttonBackgroundColor : buttonBackgroundColor,
        color: isButtonHovered ? buttonHoverTextColor || buttonTextColor : buttonTextColor,
        borderRadius: buttonBorderRadius,
        padding: buttonPadding ? `${buttonPadding.top} ${buttonPadding.right} ${buttonPadding.bottom} ${buttonPadding.left}` : '12px 24px',
        border: 'none',
        cursor: 'pointer',
        position: buttonPosition === 'inside' ? 'absolute' : 'relative',
        right: buttonPosition === 'inside' ? '4px' : 'auto',
        top: buttonPosition === 'inside' ? '50%' : 'auto',
        transform: buttonPosition === 'inside' ? 'translateY(-50%)' : 'none',
        whiteSpace: 'nowrap',
    };

    const searchIconSvg = (
        <svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block' }}
        >
            <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );

    return (
        <Fragment>
            <BlockControls>
                <AlignmentToolbar
                    value={alignment}
                    onChange={(newAlignment) => setAttributes({ alignment: newAlignment })}
                />
            </BlockControls>

            <InspectorControls>
                <PanelBody title={__('General Settings', 'wedocs')} initialOpen={true}>
                    <ToggleControl
                        label={__('Disable Block', 'wedocs')}
                        checked={hideSearch}
                        onChange={(value) => setAttributes({ hideSearch: value })}
                        help={__('Hide this search block from display', 'wedocs')}
                    />

                    {!hideSearch && (
                        <>
                            <TextControl
                                label={__('Placeholder Text', 'wedocs')}
                                value={placeholder}
                                onChange={(value) => setAttributes({ placeholder: value })}
                                help={__('Text shown inside the search input', 'wedocs')}
                            />

                            <UnitControl
                                label={__('Search Width', 'wedocs')}
                                value={searchWidth}
                                onChange={(value) => setAttributes({ searchWidth: value })}
                                units={[
                                    { value: '%', label: '%' },
                                    { value: 'px', label: 'px' },
                                    { value: 'vw', label: 'vw' },
                                ]}
                            />

                            <SelectControl
                                label={__('Alignment', 'wedocs')}
                                value={alignment}
                                options={[
                                    { label: __('Left', 'wedocs'), value: 'left' },
                                    { label: __('Center', 'wedocs'), value: 'center' },
                                    { label: __('Right', 'wedocs'), value: 'right' },
                                ]}
                                onChange={(value) => setAttributes({ alignment: value })}
                            />
                        </>
                    )}
                </PanelBody>

                {!hideSearch && (
                    <PanelBody title={__('Button Settings', 'wedocs')} initialOpen={false}>
                        <ToggleControl
                            label={__('Show Search Button', 'wedocs')}
                            checked={showButton}
                            onChange={(value) => setAttributes({ showButton: value })}
                        />

                        {showButton && (
                            <>
                                <TextControl
                                    label={__('Button Text', 'wedocs')}
                                    value={buttonText}
                                    onChange={(value) => setAttributes({ buttonText: value })}
                                />

                                <SelectControl
                                    label={__('Button Position', 'wedocs')}
                                    value={buttonPosition}
                                    options={[
                                        { label: __('Inside Input', 'wedocs'), value: 'inside' },
                                        { label: __('Outside Input', 'wedocs'), value: 'outside' },
                                    ]}
                                    onChange={(value) => setAttributes({ buttonPosition: value })}
                                />

                                <UnitControl
                                    label={__('Icon Size', 'wedocs')}
                                    value={iconSize}
                                    onChange={(value) => setAttributes({ iconSize: value })}
                                />

                                <BoxControl
                                    label={__('Button Padding', 'wedocs')}
                                    values={buttonPadding}
                                    onChange={(value) => setAttributes({ buttonPadding: value })}
                                />
                            </>
                        )}
                    </PanelBody>
                )}
            </InspectorControls>

            <InspectorControls group="styles">
                {!hideSearch && (
                    <>
                        <PanelBody title={__('Input Styles', 'wedocs')} initialOpen={true}>
                            <UnitControl
                                label={__('Border Radius', 'wedocs')}
                                value={inputBorderRadius}
                                onChange={(value) => setAttributes({ inputBorderRadius: value })}
                            />
                        </PanelBody>

                        {showButton && (
                            <PanelBody title={__('Button Styles', 'wedocs')} initialOpen={false}>
                                <PanelColorSettings
                                    title={__('Button Colors', 'wedocs')}
                                    colorSettings={[
                                        {
                                            value: buttonBackgroundColor,
                                            onChange: (value) => setAttributes({ buttonBackgroundColor: value }),
                                            label: __('Background Color', 'wedocs'),
                                        },
                                        {
                                            value: buttonTextColor,
                                            onChange: (value) => setAttributes({ buttonTextColor: value }),
                                            label: __('Text Color', 'wedocs'),
                                        },
                                        {
                                            value: buttonHoverBackgroundColor,
                                            onChange: (value) => setAttributes({ buttonHoverBackgroundColor: value }),
                                            label: __('Hover Background Color', 'wedocs'),
                                        },
                                        {
                                            value: buttonHoverTextColor,
                                            onChange: (value) => setAttributes({ buttonHoverTextColor: value }),
                                            label: __('Hover Text Color', 'wedocs'),
                                        },
                                    ]}
                                />

                                <UnitControl
                                    label={__('Button Border Radius', 'wedocs')}
                                    value={buttonBorderRadius}
                                    onChange={(value) => setAttributes({ buttonBorderRadius: value })}
                                />
                            </PanelBody>
                        )}
                    </>
                )}
            </InspectorControls>

            <div {...blockProps}>
                {!hideSearch && (
                    <div style={searchContainerStyles}>
                        <form
                            className="wedocs-search-form"
                            role="search"
                            style={searchWrapperStyles}
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <div style={{ position: 'relative', flex: 1 }}>
                                <input
                                    type="search"
                                    className="wedocs-search-input"
                                    placeholder={placeholder}
                                    style={inputStyles}
                                    disabled
                                />
                                {showButton && buttonPosition === 'inside' && (
                                    <button
                                        type="button"
                                        className="wedocs-search-button wedocs-search-button-inside"
                                        style={buttonStyles}
                                        onMouseEnter={() => setIsButtonHovered(true)}
                                        onMouseLeave={() => setIsButtonHovered(false)}
                                    >
                                        {buttonText || searchIconSvg}
                                    </button>
                                )}
                            </div>
                            {showButton && buttonPosition === 'outside' && (
                                <button
                                    type="button"
                                    className="wedocs-search-button wedocs-search-button-outside"
                                    style={buttonStyles}
                                    onMouseEnter={() => setIsButtonHovered(true)}
                                    onMouseLeave={() => setIsButtonHovered(false)}
                                >
                                    {buttonText || searchIconSvg}
                                </button>
                            )}
                        </form>
                    </div>
                )}
                {hideSearch && (
                    <div className="wedocs-search-disabled">
                        {__('Search block is disabled', 'wedocs')}
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default Edit;
