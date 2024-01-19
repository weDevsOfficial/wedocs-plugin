import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

import { PanelBody, RangeControl, TextControl } from '@wordpress/components';
import { InspectorControls, BlockControls, AlignmentToolbar, ColorPalette } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';

const Edit = ({ attributes, setAttributes }) => {
    const blockProps = useBlockProps();

    const {
        margin,
        bgColor,
        padding,
        alignment,
        iconColor,
        hoverColor,
        borderType,
        placeholder,
        borderColor,
        borderWidth,
        iconBgColor,
        borderRadius,
        iconHoverColor,
    } = attributes;

    return (
        <Fragment>
            <BlockControls>
                <AlignmentToolbar
                    value={alignment}
                    onChange={(newAlignment) => setAttributes({ alignment: newAlignment })}
                />
            </BlockControls>

            <InspectorControls>
                <PanelBody title={__('Search Bar Settings', 'wedocs')}>
                    <TextControl
                        label={__('Placeholder Text', 'wedocs')}
                        value={placeholder}
                        onChange={(newPlaceholder) => setAttributes({ placeholder: newPlaceholder })}
                    />
                    <RangeControl
                        label={__('Padding', 'wedocs')}
                        value={padding}
                        onChange={(newPadding) => setAttributes({ padding: newPadding })}
                        min={0}
                        max={50}
                    />
                    <RangeControl
                        label={__('Margin', 'wedocs')}
                        value={margin}
                        onChange={(newMargin) => setAttributes({ margin: newMargin })}
                        min={0}
                        max={50}
                    />
                    <RangeControl
                        label={__('Border Width', 'wedocs')}
                        value={borderWidth}
                        onChange={(newBorderWidth) => setAttributes({ borderWidth: newBorderWidth })}
                        min={0}
                        max={10}
                    />
                    <RangeControl
                        label={__('Border Radius', 'wedocs')}
                        value={borderRadius}
                        onChange={(newBorderRadius) => setAttributes({ borderRadius: newBorderRadius })}
                        min={0}
                        max={50}
                    />
                    <TextControl
                        label={__('Border Type', 'wedocs')}
                        value={borderType}
                        onChange={(newBorderType) => setAttributes({ borderType: newBorderType })}
                    />
                    <p>{__('Background Color', 'wedocs')}</p>
                    <ColorPalette
                        value={bgColor}
                        onChange={(newBgColor) => setAttributes({ bgColor: newBgColor })}
                    />
                    <p>{__('Border Color', 'wedocs')}</p>
                    <ColorPalette
                        value={borderColor}
                        onChange={(newBorderColor) => setAttributes({ borderColor: newBorderColor })}
                    />
                    <p>{__('Hover Background Color', 'wedocs')}</p>
                    <ColorPalette
                        value={hoverColor}
                        onChange={(newHoverColor) => setAttributes({ hoverColor: newHoverColor })}
                    />
                    <p>{__('Icon Color', 'wedocs')}</p>
                    <ColorPalette
                        value={iconColor}
                        onChange={(newIconColor) => setAttributes({ iconColor: newIconColor })}
                    />
                    <p>{__('Icon Background Color', 'wedocs')}</p>
                    <ColorPalette
                        value={iconBgColor}
                        onChange={(newIconBgColor) => setAttributes({ iconBgColor: newIconBgColor })}
                    />
                    <p>{__('Icon Hover Color', 'wedocs')}</p>
                    <ColorPalette
                        value={iconHoverColor}
                        onChange={(newIconHoverColor) => setAttributes({ iconHoverColor: newIconHoverColor })}
                    />
                </PanelBody>
            </InspectorControls>
            <form { ...blockProps } role='search' method='get' className='search-form wedocs-search-form' action=''>
                <div className='wedocs-search-input'>
                    <input
                        name='s'
                        type='search'
                        className='search-field'
                        value=''
                        title='Search for:'
                        placeholder='Search for a topic or question'
                    />
                    <input type='hidden' name='post_type' value='docs' />
                    <button type='submit' className='search-submit'>
                        <svg width='15' height='16' fill='none'>
                            <path fillRule='evenodd' d='M11.856 10.847l2.883 2.883a.89.89 0 0 1 0 1.257c-.173.174-.401.261-.629.261s-.455-.087-.629-.261l-2.883-2.883c-1.144.874-2.532 1.353-3.996 1.353a6.56 6.56 0 0 1-4.671-1.935c-2.576-2.575-2.576-6.765 0-9.341C3.179.934 4.839.247 6.603.247s3.424.687 4.671 1.935a6.56 6.56 0 0 1 1.935 4.67 6.55 6.55 0 0 1-1.353 3.995zM3.189 3.439c-1.882 1.882-1.882 4.945 0 6.827.912.912 2.124 1.414 3.414 1.414s2.502-.502 3.414-1.414 1.414-2.124 1.414-3.413-.502-2.502-1.414-3.413-2.124-1.414-3.414-1.414-2.502.502-3.414 1.414z' fill='#fff' />
                        </svg>
                    </button>
                </div>
            </form>
        </Fragment>
    );
}

export default Edit;
