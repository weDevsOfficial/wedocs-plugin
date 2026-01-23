import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    ToggleControl,
    SelectControl,
    CheckboxControl,
    ColorPicker,
    __experimentalBoxControl as BoxControl,
    __experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import ListItems from './controls/ListItems';

const Inspector = ({ attributes, setAttributes }) => {
    const {
        tocTitle,
        supportedHeadings,
        showHierarchy,
        showNumbering,
        collapsibleOnMobile,
        smoothScroll,
        stickyMode,
        containerBackgroundColor,
        containerWidth,
        containerPadding,
        containerMargin,
        containerBorderStyle,
        containerBorderWidth,
        containerBorderColor,
        containerBorderRadius,
        titleColor,
        titleFontSize,
        titleFontWeight,
        listColor,
        listHoverColor,
        listFontSize
    } = attributes;

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('General', 'wedocs')} initialOpen={true}>
                    <TextControl
                        label={__('TOC Title', 'wedocs')}
                        value={tocTitle}
                        onChange={(value) => setAttributes({ tocTitle: value })}
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                    />

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                            {__('Supported Heading Tags', 'wedocs')}
                        </label>
                        {['h1', 'h2', 'h3', 'h4', 'h5'].map(heading => (
                            <CheckboxControl
                                key={heading}
                                label={heading.toUpperCase()}
                                checked={supportedHeadings.includes(heading)}
                                onChange={(checked) => {
                                    const newHeadings = checked
                                        ? [...supportedHeadings, heading]
                                        : supportedHeadings.filter(h => h !== heading);
                                    setAttributes({ supportedHeadings: newHeadings });
                                }}
                                __nextHasNoMarginBottom
                            />
                        ))}
                    </div>

                    <ToggleControl
                        label={__('List Hierarchy', 'wedocs')}
                        help={__('Indent subheadings to show hierarchy', 'wedocs')}
                        checked={showHierarchy}
                        onChange={(value) => setAttributes({ showHierarchy: value })}
                        __nextHasNoMarginBottom
                    />

                    <ToggleControl
                        label={__('List Numbering', 'wedocs')}
                        help={__('Show numbered list instead of bullets', 'wedocs')}
                        checked={showNumbering}
                        onChange={(value) => setAttributes({ showNumbering: value })}
                        __nextHasNoMarginBottom
                    />

                    <ToggleControl
                        label={__('Collapsible on Small Devices', 'wedocs')}
                        help={__('Make TOC collapsible on mobile devices', 'wedocs')}
                        checked={collapsibleOnMobile}
                        onChange={(value) => setAttributes({ collapsibleOnMobile: value })}
                        __nextHasNoMarginBottom
                    />
                    <ToggleControl
                        label={__('Smooth Scroll Behavior', 'wedocs')}
                        checked={smoothScroll}
                        onChange={(value) => setAttributes({ smoothScroll: value })}
                        __nextHasNoMarginBottom
                    />

                    <ToggleControl
                        label={__('Sticky Mode', 'wedocs')}
                        help={__('Keep TOC fixed while scrolling', 'wedocs')}
                        checked={stickyMode}
                        onChange={(value) => setAttributes({ stickyMode: value })}
                        __nextHasNoMarginBottom
                    />
                </PanelBody>



                {/* <PanelBody title={__('Advanced', 'wedocs')} initialOpen={false}>
					<TextControl
						label={__('Additional CSS class(es)', 'wedocs')}
						value={additionalCssClass}
						onChange={(value) => setAttributes({ additionalCssClass: value })}
						help={__('Space-separated CSS classes', 'wedocs')}
					/>


				</PanelBody> */}
            </InspectorControls>

            <InspectorControls group='styles'>
                <ListItems attributes={attributes} setAttributes={setAttributes} />
                <PanelBody title={__('Container Style', 'wedocs')} initialOpen={false}>
                    <h4>{__('TOC Container', 'wedocs')}</h4>

                    {/* <div style={{ marginBottom: '20px' }}> */}
                        <label>{__('Background Color', 'wedocs')}</label>
                        <ColorPicker
                            color={containerBackgroundColor}
                            onChange={(value) => setAttributes({ containerBackgroundColor: value })}
                        />
                    {/* </div> */}

                    <UnitControl
                        label={__('Width', 'wedocs')}
                        value={containerWidth}
                        onChange={(value) => setAttributes({ containerWidth: value })}
                        units={[
                            { value: '%', label: '%' },
                            { value: 'px', label: 'px' },
                            { value: 'em', label: 'em' },
                            { value: 'rem', label: 'rem' }
                        ]}
                    />

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
                            <UnitControl
                                label={__('Border Width', 'wedocs')}
                                value={containerBorderWidth}
                                onChange={(value) => setAttributes({ containerBorderWidth: value })}
                            />

                            <div style={{ marginBottom: '20px' }}>
                                <label>{__('Border Color', 'wedocs')}</label>
                                <ColorPicker
                                    color={containerBorderColor}
                                    onChange={(value) => setAttributes({ containerBorderColor: value })}
                                />
                            </div>
                        </>
                    )}

                    <UnitControl
                        label={__('Border Radius', 'wedocs')}
                        value={containerBorderRadius}
                        onChange={(value) => setAttributes({ containerBorderRadius: value })}
                    />

                    <hr style={{ margin: '20px 0' }} />

                    <h4>{__('TOC Title', 'wedocs')}</h4>

                    <div style={{ marginBottom: '20px' }}>
                        <label>{__('Color', 'wedocs')}</label>
                        <ColorPicker
                            color={titleColor}
                            onChange={(value) => setAttributes({ titleColor: value })}
                        />
                    </div>

                    <UnitControl
                        label={__('Font Size', 'wedocs')}
                        value={titleFontSize}
                        onChange={(value) => setAttributes({ titleFontSize: value })}
                    />

                    <SelectControl
                        label={__('Font Weight', 'wedocs')}
                        value={titleFontWeight}
                        options={[
                            { label: '300', value: '300' },
                            { label: '400', value: '400' },
                            { label: '500', value: '500' },
                            { label: '600', value: '600' },
                            { label: '700', value: '700' },
                            { label: '800', value: '800' }
                        ]}
                        onChange={(value) => setAttributes({ titleFontWeight: value })}
                    />

                    <hr style={{ margin: '20px 0' }} />

                    <h4>{__('TOC List', 'wedocs')}</h4>

                    <div style={{ marginBottom: '20px' }}>
                        <label>{__('Color', 'wedocs')}</label>
                        <ColorPicker
                            color={listColor}
                            onChange={(value) => setAttributes({ listColor: value })}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label>{__('Hover Color', 'wedocs')}</label>
                        <ColorPicker
                            color={listHoverColor}
                            onChange={(value) => setAttributes({ listHoverColor: value })}
                        />
                    </div>

                    <UnitControl
                        label={__('Font Size', 'wedocs')}
                        value={listFontSize}
                        onChange={(value) => setAttributes({ listFontSize: value })}
                    />
                </PanelBody>
            </InspectorControls>
        </>
    );
};

export default Inspector;
