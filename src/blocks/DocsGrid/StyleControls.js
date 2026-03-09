import { __ } from '@wordpress/i18n';
import {
    PanelBody,
    __experimentalBoxControl as BoxControl,
    SelectControl,
    TextControl,
    __experimentalVStack as VStack,
} from '@wordpress/components';
import {
    PanelColorSettings,
    FontSizePicker,
    LineHeightControl,
    __experimentalFontFamilyControl as FontFamilyControl,
    __experimentalFontAppearanceControl as FontAppearanceControl,
    useSettings,
} from '@wordpress/block-editor';

/**
 * Per-element typography controls using native FSE/Gutenberg components.
 * Font sizes and font families are read from theme.json via useSettings,
 * so they automatically reflect whatever the active theme exposes.
 *
 * Prefix = attribute key prefix, e.g. "title" → titleFontSize, titleFontWeight …
 */
const TypographyGroup = ( { prefix, label, attributes, setAttributes } ) => {
    const [ fontSizes, fontFamilies ] = useSettings(
        'typography.fontSizes',
        'typography.fontFamilies'
    );

    const sizeKey   = `${ prefix }FontSize`;
    const weightKey = `${ prefix }FontWeight`;
    const familyKey = `${ prefix }FontFamily`;
    const lhKey     = `${ prefix }LineHeight`;

    return (
        <PanelBody title={ label } initialOpen={ false }>
            <VStack spacing={ 4 }>
                { fontFamilies?.length > 0 && (
                    <FontFamilyControl
                        fontFamilies={ fontFamilies }
                        value={ attributes[ familyKey ] || '' }
                        onChange={ ( v ) => setAttributes( { [ familyKey ]: v || '' } ) }
                        size="__unstable-large"
                        __nextHasNoMarginBottom
                    />
                ) }
                <FontSizePicker
                    fontSizes={ fontSizes || [] }
                    value={ attributes[ sizeKey ] || undefined }
                    onChange={ ( v ) => setAttributes( { [ sizeKey ]: v || '' } ) }
                    withReset
                    __nextHasNoMarginBottom
                />
                <FontAppearanceControl
                    value={ {
                        fontStyle: undefined,
                        fontWeight: attributes[ weightKey ] || undefined,
                    } }
                    onChange={ ( { fontWeight } ) =>
                        setAttributes( { [ weightKey ]: fontWeight || '' } )
                    }
                    hasFontStyles={ false }
                    hasFontWeights={ true }
                />
                <LineHeightControl
                    value={ attributes[ lhKey ] || '' }
                    onChange={ ( v ) =>
                        setAttributes( { [ lhKey ]: typeof v === 'number' ? String( v ) : ( v || '' ) } )
                    }
                    __nextHasNoMarginBottom
                />
            </VStack>
        </PanelBody>
    );
};

const StyleControls = ( { attributes, setAttributes } ) => {
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

            <TypographyGroup
                prefix="title"
                label={ __( 'Title Typography', 'wedocs' ) }
                attributes={ attributes }
                setAttributes={ setAttributes }
            />

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

            <TypographyGroup
                prefix="button"
                label={ __( 'Button Typography', 'wedocs' ) }
                attributes={ attributes }
                setAttributes={ setAttributes }
            />

            <PanelBody
                title={__('Pagination Styles', 'wedocs')}
                icon="admin-appearance"
                initialOpen={false}
            >
                <label>{__('Pagination Colors', 'wedocs')}</label>
                <PanelColorSettings
                    colors={colors}
                    colorSettings={[
                        {
                            value: attributes.paginationTextColor,
                            label: __('Text Color', 'wedocs'),
                            onChange: (newColor) => updateAttribute('paginationTextColor')(newColor)
                        },
                        {
                            value: attributes.paginationTextHoverColor,
                            label: __('Text Hover Color', 'wedocs'),
                            onChange: (newColor) => updateAttribute('paginationTextHoverColor')(newColor)
                        },
                        {
                            value: attributes.paginationBackgroundColor,
                            label: __('Background Color', 'wedocs'),
                            onChange: (newColor) => updateAttribute('paginationBackgroundColor')(newColor)
                        },
                        {
                            value: attributes.paginationHoverColor,
                            label: __('Hover Color', 'wedocs'),
                            onChange: (newColor) => updateAttribute('paginationHoverColor')(newColor)
                        }
                    ]}
                />
            </PanelBody>

            <TypographyGroup
                prefix="pagination"
                label={ __( 'Pagination Typography', 'wedocs' ) }
                attributes={ attributes }
                setAttributes={ setAttributes }
            />
        </>
    );
};

export default StyleControls;
