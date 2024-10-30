import { __ } from '@wordpress/i18n';
import {
    PanelBody,
    __experimentalBoxControl as BoxControl,
    SelectControl,
    ColorPicker, TextControl
} from '@wordpress/components';

// Add these to your attributes in block.json
const styleAttributes = {
    gridPadding: {
        type: "object",
        default: {
            top: "20px",
            right: "20px",
            bottom: "20px",
            left: "20px"
        }
    },
    gridMargin: {
        type: "object",
        default: {
            top: "0px",
            right: "0px",
            bottom: "0px",
            left: "0px"
        }
    },
    docTitleColor: {
        type: "string",
        default: "#333333"
    },
    docChildrenActiveColor: {
        type: "string",
        default: "#0073aa"
    },
    borderType: {
        type: "string",
        default: "solid"
    },
    borderWidth: {
        type: "string",
        default: "1px"
    },
    borderColor: {
        type: "string",
        default: "#dddddd"
    },
    borderRadius: {
        type: "string",
        default: "4px"
    },
    buttonBorderRadius: {
        type: "string",
        default: "4px"
    },
    buttonPadding: {
        type: "object",
        default: {
            top: "10px",
            right: "20px",
            bottom: "10px",
            left: "20px"
        }
    },
    buttonMargin: {
        type: "object",
        default: {
            top: "10px",
            right: "0px",
            bottom: "0px",
            left: "0px"
        }
    },
    buttonColor: {
        type: "string",
        default: "#0073aa"
    },
    buttonHoverColor: {
        type: "string",
        default: "#005177"
    },
    buttonTextColor: {
        type: "string",
        default: "#ffffff"
    },
    buttonHoverTextColor: {
        type: "string",
        default: "#ffffff"
    },
    paginationTextColor: {
        type: "string",
        default: "#333333"
    },
    paginationTextHoverColor: {
        type: "string",
        default: "#0073aa"
    },
    paginationBackgroundColor: {
        type: "string",
        default: "#ffffff"
    },
    paginationHoverColor: {
        type: "string",
        default: "#f5f5f5"
    }
};

const StyleControls = ({ attributes, setAttributes }) => {
    const updateAttribute = (attributeName) => (value) => {
        setAttributes({ [attributeName]: value });
    };

    const borderTypes = [
        { label: __('Solid', 'wedocs'), value: 'solid' },
        { label: __('Dashed', 'wedocs'), value: 'dashed' },
        { label: __('Dotted', 'wedocs'), value: 'dotted' },
        { label: __('None', 'wedocs'), value: 'none' }
    ];

    return (
        <>
            <PanelBody
              title={__('Grid Styles', 'wedocs')}
              icon="admin-appearance"
              initialOpen={false}
            >
                <BoxControl
                  label={__('Grid Padding', 'wedocs')}
                  values={attributes.gridPadding}
                  onChange={updateAttribute('gridPadding')}
                />
                <BoxControl
                  label={__('Grid Margin', 'wedocs')}
                  values={attributes.gridMargin}
                  onChange={updateAttribute('gridMargin')}
                />
                <div className='wedocs-color-control'>
                    <label>{__('Doc Title Color', 'wedocs')}</label>
                    <ColorPicker
                      color={attributes.docTitleColor}
                      onChange={updateAttribute('docTitleColor')}
                      enableAlpha
                    />
                </div>
                <div className='wedocs-color-control'>
                    <label>{__('Doc Children Active Color', 'wedocs')}</label>
                    <ColorPicker
                      color={attributes.docChildrenActiveColor}
                      onChange={updateAttribute('docChildrenActiveColor')}
                      enableAlpha
                    />
                </div>
                <SelectControl
                  label={__('Border Type', 'wedocs')}
                  value={attributes.borderType}
                  options={[
                      { label: __('Solid', 'wedocs'), value: 'solid' },
                      { label: __('Dashed', 'wedocs'), value: 'dashed' },
                      { label: __('Dotted', 'wedocs'), value: 'dotted' },
                      { label: __('None', 'wedocs'), value: 'none' }
                  ]}
                  onChange={value => setAttributes({ borderType: value })}
                />

                <SelectControl
                  label={__('Border Width', 'wedocs')}
                  value={attributes.borderWidth}
                  options={[
                      { label: '0px', value: '0px' },
                      { label: '1px', value: '1px' },
                      { label: '2px', value: '2px' },
                      { label: '3px', value: '3px' },
                      { label: '4px', value: '4px' },
                      { label: '5px', value: '5px' }
                  ]}
                  onChange={value => setAttributes({ borderWidth: value })}
                />

                <div className="wedocs-color-control">
                    <label>{__('Border Color', 'wedocs')}</label>
                    <ColorPicker
                      color={attributes.borderColor}
                      onChange={value => setAttributes({ borderColor: value })}
                      enableAlpha
                    />
                </div>

                <SelectControl
                  label={__('Border Radius', 'wedocs')}
                  value={attributes.borderRadius}
                  options={[
                      { label: '0px', value: '0px' },
                      { label: '4px', value: '4px' },
                      { label: '8px', value: '8px' },
                      { label: '12px', value: '12px' },
                      { label: '16px', value: '16px' },
                      { label: '20px', value: '20px' }
                  ]}
                  onChange={value => setAttributes({ borderRadius: value })}
                />
            </PanelBody>

            <PanelBody
              title={__('Button Styles', 'wedocs')}
              icon="admin-appearance"
              initialOpen={false}
            >
                <SelectControl
                    label={__('Button Border Radius', 'wedocs')}
                    value={attributes.buttonBorderRadius}
                    options={[
                        { label: '0px', value: '0px' },
                        { label: '4px', value: '4px' },
                        { label: '8px', value: '8px' },
                        { label: '12px', value: '12px' },
                        { label: '16px', value: '16px' },
                        { label: '20px', value: '20px' }
                    ]}
                    onChange={value => setAttributes({ buttonBorderRadius: value })}
                />
                <BoxControl
                  label={__('Button Padding', 'wedocs')}
                  values={attributes.buttonPadding}
                  onChange={updateAttribute('buttonPadding')}
                />
                <BoxControl
                  label={__('Button Margin', 'wedocs')}
                    values={attributes.buttonMargin}
                    onChange={updateAttribute('buttonMargin')}
                />
                <div className="wedocs-color-control">
                    <label>{__('Button Color', 'wedocs')}</label>
                    <ColorPicker
                        color={attributes.buttonColor}
                        onChange={updateAttribute('buttonColor')}
                        enableAlpha
                    />
                </div>
                <div className="wedocs-color-control">
                    <label>{__('Button Hover Color', 'wedocs')}</label>
                    <ColorPicker
                        color={attributes.buttonHoverColor}
                        onChange={updateAttribute('buttonHoverColor')}
                        enableAlpha
                    />
                </div>
                <div className="wedocs-color-control">
                    <label>{__('Button Text', 'wedocs')}</label>
                    <TextControl value={attributes.buttonText} onChange={updateAttribute('buttonText')} />
                </div>
                <div className="wedocs-color-control">
                    <label>{__('Button Text Color', 'wedocs')}</label>
                    <ColorPicker
                        color={attributes.buttonTextColor}
                        onChange={updateAttribute('buttonTextColor')}
                        enableAlpha
                    />
                </div>
                <div className="wedocs-color-control">
                    <label>{__('Button Hover Text Color', 'wedocs')}</label>
                    <ColorPicker
                        color={attributes.buttonHoverTextColor}
                        onChange={updateAttribute('buttonHoverTextColor')}
                        enableAlpha
                    />
                </div>
            </PanelBody>

            {/*<PanelBody*/}
            {/*    title={__('Pagination Styles', 'wedocs')}*/}
            {/*    icon="admin-appearance"*/}
            {/*    initialOpen={false}*/}
            {/*>*/}
            {/*    <div className="wedocs-color-control">*/}
            {/*        <label>{__('Text Color', 'wedocs')}</label>*/}
            {/*        <ColorPicker*/}
            {/*            color={attributes.paginationTextColor}*/}
            {/*            onChange={updateAttribute('paginationTextColor')}*/}
            {/*            enableAlpha*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    <div className="wedocs-color-control">*/}
            {/*        <label>{__('Text Hover Color', 'wedocs')}</label>*/}
            {/*        <ColorPicker*/}
            {/*            color={attributes.paginationTextHoverColor}*/}
            {/*            onChange={updateAttribute('paginationTextHoverColor')}*/}
            {/*            enableAlpha*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    <div className="wedocs-color-control">*/}
            {/*        <label>{__('Background Color', 'wedocs')}</label>*/}
            {/*        <ColorPicker*/}
            {/*            color={attributes.paginationBackgroundColor}*/}
            {/*            onChange={updateAttribute('paginationBackgroundColor')}*/}
            {/*            enableAlpha*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    <div className="wedocs-color-control">*/}
            {/*        <label>{__('Hover Color', 'wedocs')}</label>*/}
            {/*        <ColorPicker*/}
            {/*            color={attributes.paginationHoverColor}*/}
            {/*            onChange={updateAttribute('paginationHoverColor')}*/}
            {/*            enableAlpha*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*</PanelBody>*/}
        </>
    );
};

export default StyleControls;
