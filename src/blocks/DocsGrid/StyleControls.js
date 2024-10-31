import { __ } from '@wordpress/i18n';
import {
    PanelBody,
    __experimentalBoxControl as BoxControl,
    SelectControl,
    TextControl
} from '@wordpress/components';
import { PanelColorSettings } from '@wordpress/block-editor';

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
    const colors = [
        { name: 'Sweet', color: '#F43F5E' },
        { name: 'Orange', color: '#F97316' },
        { name: 'Yellow', color: '#FACC15' },
        { name: 'Purple', color: '#8B5CF6' },
        { name: 'Light Blue', color: '#3B82F6' },
        { name: 'Light Green', color: '#10B981' },
    ];

    return (
        <>
            <PanelBody
              title={__('Grid Styles', 'wedocs')}
              icon='admin-appearance'
              initialOpen={false}
            >
                <label>{__('Colors', 'wedocs')}</label>
                <PanelColorSettings
                    colors={colors}
                    colorSettings={[
                        {
                            value: attributes.docTitleColor,
                            label: __('Doc Title Color', 'wedocs'),
                            onChange: (newBgColor) => updateAttribute(
                              'docTitleColor')(newBgColor)
                        },
                        {
                            value: attributes.docChildrenActiveColor,
                            label: __('Doc Children Active Color', 'wedocs'),
                            onChange: (newBgColor) => updateAttribute(
                              'docChildrenActiveColor')(newBgColor)
                        },
                        {
                            value: attributes.borderColor,
                            label: __('Border Color', 'wedocs'),
                            onChange: (newBorderColor) => updateAttribute(
                              'borderColor')(newBorderColor)
                        }
                    ]}
                />
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
              icon='admin-appearance'
              initialOpen={false}
            >
                  <label>{__('Button Colors', 'wedocs')}</label>
                  <PanelColorSettings
                    colors={colors}
                    colorSettings={[
                      {
                        value: attributes.buttonColor,
                        label: __('Button Color', 'wedocs'),
                        onChange: (newBgColor) => updateAttribute(
                          'buttonColor')(newBgColor)
                      },
                      {
                        value: attributes.buttonHoverColor,
                        label: __('Button Hover Color', 'wedocs'),
                        onChange: (newBgColor) => updateAttribute(
                          'buttonHoverColor')(newBgColor)
                      },
                      {
                        value: attributes.buttonTextColor,
                        label: __('Button Text Color', 'wedocs'),
                        onChange: (newBorderColor) => updateAttribute(
                              'buttonTextColor')(newBorderColor)
                          },
                          {
                            value: attributes.buttonHoverTextColor,
                            label: __('Button Hover Text Color', 'wedocs'),
                            onChange: (newBorderColor) => updateAttribute(
                              'buttonHoverTextColor')(newBorderColor)
                          }
                      ]}
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
                  onChange={value => setAttributes(
                    { buttonBorderRadius: value })}
                />
                <div className='wedocs-color-control'>
                    <label>{__('Button Text', 'wedocs')}</label>
                    <TextControl
                      value={attributes.buttonText}
                      onChange={updateAttribute('buttonText')}
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
