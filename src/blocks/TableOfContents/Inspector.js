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
    return (
        <>
            <InspectorControls>
                <PanelBody title={__('General', 'dynamic-table-of-contents-block-wp')} initialOpen={true}>
                    <TextControl
                        label={__('TOC Title', 'dynamic-table-of-contents-block-wp')}
                        value={tocTitle}
                        onChange={(value) => setAttributes({ tocTitle: value })}
                    />

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                            {__('Supported Heading Tags', 'dynamic-table-of-contents-block-wp')}
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
                            />
                        ))}
                    </div>

                    <ToggleControl
                        label={__('List Hierarchy', 'dynamic-table-of-contents-block-wp')}
                        help={__('Indent subheadings to show hierarchy', 'dynamic-table-of-contents-block-wp')}
                        checked={showHierarchy}
                        onChange={(value) => setAttributes({ showHierarchy: value })}
                    />

                    <ToggleControl
                        label={__('List Numbering', 'dynamic-table-of-contents-block-wp')}
                        help={__('Show numbered list instead of bullets', 'dynamic-table-of-contents-block-wp')}
                        checked={showNumbering}
                        onChange={(value) => setAttributes({ showNumbering: value })}
                    />

                    <ToggleControl
                        label={__('Collapsible on Small Devices', 'dynamic-table-of-contents-block-wp')}
                        help={__('Make TOC collapsible on mobile devices', 'dynamic-table-of-contents-block-wp')}
                        checked={collapsibleOnMobile}
                        onChange={(value) => setAttributes({ collapsibleOnMobile: value })}
                    />
                    <ToggleControl
                        label={__('Smooth Scroll Behavior', 'dynamic-table-of-contents-block-wp')}
                        checked={smoothScroll}
                        onChange={(value) => setAttributes({ smoothScroll: value })}
                    />

                    <ToggleControl
                        label={__('Sticky Mode', 'dynamic-table-of-contents-block-wp')}
                        help={__('Keep TOC fixed while scrolling', 'dynamic-table-of-contents-block-wp')}
                        checked={stickyMode}
                        onChange={(value) => setAttributes({ stickyMode: value })}
                    />
                </PanelBody>



                {/* <PanelBody title={__('Advanced', 'dynamic-table-of-contents-block-wp')} initialOpen={false}>
					<TextControl
						label={__('Additional CSS class(es)', 'dynamic-table-of-contents-block-wp')}
						value={additionalCssClass}
						onChange={(value) => setAttributes({ additionalCssClass: value })}
						help={__('Space-separated CSS classes', 'dynamic-table-of-contents-block-wp')}
					/>


				</PanelBody> */}
            </InspectorControls>
            <InspectorControls group='styles'>
                <ListItems attributes={attributes} setAttributes={setAttributes} />
                <PanelBody title={__('Style', 'dynamic-table-of-contents-block-wp')} initialOpen={false}>
                    <h4>{__('TOC Container', 'dynamic-table-of-contents-block-wp')}</h4>

                    <div style={{ marginBottom: '20px' }}>
                        <label>{__('Background Color', 'dynamic-table-of-contents-block-wp')}</label>
                        <ColorPicker
                            color={containerBackgroundColor}
                            onChange={(value) => setAttributes({ containerBackgroundColor: value })}
                        />
                    </div>

                    <UnitControl
                        label={__('Width', 'dynamic-table-of-contents-block-wp')}
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
                        label={__('Padding', 'dynamic-table-of-contents-block-wp')}
                        values={containerPadding}
                        onChange={(value) => setAttributes({ containerPadding: value })}
                    />

                    <BoxControl
                        label={__('Margin', 'dynamic-table-of-contents-block-wp')}
                        values={containerMargin}
                        onChange={(value) => setAttributes({ containerMargin: value })}
                    />

                    <SelectControl
                        label={__('Border Style', 'dynamic-table-of-contents-block-wp')}
                        value={containerBorderStyle}
                        options={[
                            { label: __('None', 'dynamic-table-of-contents-block-wp'), value: 'none' },
                            { label: __('Solid', 'dynamic-table-of-contents-block-wp'), value: 'solid' },
                            { label: __('Dashed', 'dynamic-table-of-contents-block-wp'), value: 'dashed' },
                            { label: __('Dotted', 'dynamic-table-of-contents-block-wp'), value: 'dotted' }
                        ]}
                        onChange={(value) => setAttributes({ containerBorderStyle: value })}
                    />

                    {containerBorderStyle !== 'none' && (
                        <>
                            <UnitControl
                                label={__('Border Width', 'dynamic-table-of-contents-block-wp')}
                                value={containerBorderWidth}
                                onChange={(value) => setAttributes({ containerBorderWidth: value })}
                            />

                            <div style={{ marginBottom: '20px' }}>
                                <label>{__('Border Color', 'dynamic-table-of-contents-block-wp')}</label>
                                <ColorPicker
                                    color={containerBorderColor}
                                    onChange={(value) => setAttributes({ containerBorderColor: value })}
                                />
                            </div>
                        </>
                    )}

                    <UnitControl
                        label={__('Border Radius', 'dynamic-table-of-contents-block-wp')}
                        value={containerBorderRadius}
                        onChange={(value) => setAttributes({ containerBorderRadius: value })}
                    />

                    <hr style={{ margin: '20px 0' }} />

                    <h4>{__('TOC Title', 'dynamic-table-of-contents-block-wp')}</h4>

                    <div style={{ marginBottom: '20px' }}>
                        <label>{__('Color', 'dynamic-table-of-contents-block-wp')}</label>
                        <ColorPicker
                            color={titleColor}
                            onChange={(value) => setAttributes({ titleColor: value })}
                        />
                    </div>

                    <UnitControl
                        label={__('Font Size', 'dynamic-table-of-contents-block-wp')}
                        value={titleFontSize}
                        onChange={(value) => setAttributes({ titleFontSize: value })}
                    />

                    <SelectControl
                        label={__('Font Weight', 'dynamic-table-of-contents-block-wp')}
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

                    <h4>{__('TOC List', 'dynamic-table-of-contents-block-wp')}</h4>

                    <div style={{ marginBottom: '20px' }}>
                        <label>{__('Color', 'dynamic-table-of-contents-block-wp')}</label>
                        <ColorPicker
                            color={listColor}
                            onChange={(value) => setAttributes({ listColor: value })}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label>{__('Hover Color', 'dynamic-table-of-contents-block-wp')}</label>
                        <ColorPicker
                            color={listHoverColor}
                            onChange={(value) => setAttributes({ listHoverColor: value })}
                        />
                    </div>

                    <UnitControl
                        label={__('Font Size', 'dynamic-table-of-contents-block-wp')}
                        value={listFontSize}
                        onChange={(value) => setAttributes({ listFontSize: value })}
                    />
                </PanelBody>
            </InspectorControls>
        </>
    );
};

export default Inspector;
