# Quick Reference: Using Common Controls

## Import Statement

```javascript
import {
    ColorSettingsPanel,
    SpacingPanel,
    BorderPanel,
    TypographyPanel,
    AlignmentControl,
    DimensionControl,
} from '../commonControls/CommonControls';
```

## Usage Examples

### 1. ColorSettingsPanel

```javascript
<ColorSettingsPanel
    title={__('Button Colors', 'wedocs')}
    colorSettings={[
        {
            value: buttonColor,
            onChange: (value) => setAttributes({ buttonColor: value }),
            label: __('Button Background', 'wedocs'),
        },
        {
            value: buttonHoverColor,
            onChange: (value) => setAttributes({ buttonHoverColor: value }),
            label: __('Button Hover', 'wedocs'),
        },
        {
            value: buttonTextColor,
            onChange: (value) => setAttributes({ buttonTextColor: value }),
            label: __('Text Color', 'wedocs'),
        },
    ]}
    initialOpen={true}
/>
```

### 2. SpacingPanel

```javascript
<SpacingPanel
    title={__('Container Spacing', 'wedocs')}
    padding={containerPadding}
    margin={containerMargin}
    onPaddingChange={(value) => setAttributes({ containerPadding: value })}
    onMarginChange={(value) => setAttributes({ containerMargin: value })}
    showPadding={true}
    showMargin={true}
    initialOpen={false}
/>
```

### 3. BorderPanel

```javascript
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
    initialOpen={false}
/>
```

### 4. TypographyPanel

```javascript
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
    showFontSize={true}
    showFontWeight={true}
    showLineHeight={true}
    showLetterSpacing={true}
    initialOpen={false}
/>
```

### 5. AlignmentControl

```javascript
<AlignmentControl
    value={alignment}
    onChange={(value) => setAttributes({ alignment: value })}
    label={__('Content Alignment', 'wedocs')}
/>
```

### 6. DimensionControl

```javascript
<DimensionControl
    label={__('Container Width', 'wedocs')}
    value={containerWidth}
    onChange={(value) => setAttributes({ containerWidth: value })}
    units={[
        { value: '%', label: '%' },
        { value: 'px', label: 'px' },
        { value: 'vw', label: 'vw' },
    ]}
/>
```

## Complete Block Structure Example

```javascript
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
    useBlockProps,
    InspectorControls,
    BlockControls,
    AlignmentToolbar,
} from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    ToggleControl,
    SelectControl,
} from '@wordpress/components';
import {
    ColorSettingsPanel,
    SpacingPanel,
    BorderPanel,
    TypographyPanel,
    AlignmentControl,
} from '../commonControls/CommonControls';

const Edit = ({ attributes, setAttributes }) => {
    const {
        // General attributes
        title,
        showTitle,
        alignment,
        
        // Style attributes
        titleColor,
        titleFontSize,
        titleFontWeight,
        containerPadding,
        containerMargin,
        containerBorderStyle,
        containerBorderWidth,
        containerBorderColor,
        containerBorderRadius,
    } = attributes;

    const blockProps = useBlockProps();

    return (
        <Fragment>
            {/* Toolbar Controls */}
            <BlockControls>
                <AlignmentToolbar
                    value={alignment}
                    onChange={(value) => setAttributes({ alignment: value })}
                />
            </BlockControls>

            {/* General Tab */}
            <InspectorControls>
                <PanelBody title={__('General Settings', 'wedocs')} initialOpen={true}>
                    <ToggleControl
                        label={__('Show Title', 'wedocs')}
                        checked={showTitle}
                        onChange={(value) => setAttributes({ showTitle: value })}
                    />

                    {showTitle && (
                        <TextControl
                            label={__('Title', 'wedocs')}
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                        />
                    )}

                    <AlignmentControl
                        value={alignment}
                        onChange={(value) => setAttributes({ alignment: value })}
                    />
                </PanelBody>

                <PanelBody title={__('Advanced', 'wedocs')} initialOpen={false}>
                    {/* Advanced settings */}
                </PanelBody>
            </InspectorControls>

            {/* Style Tab */}
            <InspectorControls group="styles">
                <ColorSettingsPanel
                    title={__('Title Colors', 'wedocs')}
                    colorSettings={[
                        {
                            value: titleColor,
                            onChange: (value) => setAttributes({ titleColor: value }),
                            label: __('Title Color', 'wedocs'),
                        },
                    ]}
                    initialOpen={true}
                />

                <TypographyPanel
                    title={__('Title Typography', 'wedocs')}
                    fontSize={titleFontSize}
                    fontWeight={titleFontWeight}
                    onFontSizeChange={(value) => setAttributes({ titleFontSize: value })}
                    onFontWeightChange={(value) => setAttributes({ titleFontWeight: value })}
                    showFontSize={true}
                    showFontWeight={true}
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
            </InspectorControls>

            {/* Block Content */}
            <div {...blockProps}>
                {/* Your block content */}
            </div>
        </Fragment>
    );
};

export default Edit;
```

## Props Reference

### ColorSettingsPanel
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| title | string | No | 'Colors' | Panel title |
| colorSettings | array | Yes | - | Array of color setting objects |
| initialOpen | boolean | No | false | Panel initially open |

**colorSettings object:**
```javascript
{
    value: string,      // Current color value
    onChange: function, // Change handler
    label: string,      // Control label
}
```

### SpacingPanel
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| title | string | No | 'Spacing' | Panel title |
| padding | object | No | - | Padding values |
| margin | object | No | - | Margin values |
| onPaddingChange | function | No | - | Padding change handler |
| onMarginChange | function | No | - | Margin change handler |
| showPadding | boolean | No | true | Show padding control |
| showMargin | boolean | No | true | Show margin control |
| initialOpen | boolean | No | false | Panel initially open |

### BorderPanel
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| title | string | No | 'Border' | Panel title |
| borderStyle | string | Yes | - | Border style value |
| borderWidth | string/object | Yes | - | Border width |
| borderColor | string | Yes | - | Border color |
| borderRadius | string/object | Yes | - | Border radius |
| onStyleChange | function | Yes | - | Style change handler |
| onWidthChange | function | Yes | - | Width change handler |
| onColorChange | function | Yes | - | Color change handler |
| onRadiusChange | function | Yes | - | Radius change handler |
| initialOpen | boolean | No | false | Panel initially open |

### TypographyPanel
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| title | string | No | 'Typography' | Panel title |
| fontSize | string | No | - | Font size value |
| fontWeight | string | No | - | Font weight value |
| lineHeight | string | No | - | Line height value |
| letterSpacing | string | No | - | Letter spacing value |
| onFontSizeChange | function | No | - | Font size change handler |
| onFontWeightChange | function | No | - | Font weight change handler |
| onLineHeightChange | function | No | - | Line height change handler |
| onLetterSpacingChange | function | No | - | Letter spacing change handler |
| showFontSize | boolean | No | true | Show font size control |
| showFontWeight | boolean | No | true | Show font weight control |
| showLineHeight | boolean | No | false | Show line height control |
| showLetterSpacing | boolean | No | false | Show letter spacing control |
| initialOpen | boolean | No | false | Panel initially open |

### AlignmentControl
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| value | string | Yes | - | Current alignment |
| onChange | function | Yes | - | Change handler |
| label | string | No | 'Alignment' | Control label |

### DimensionControl
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| label | string | Yes | - | Control label |
| value | string | Yes | - | Current value |
| onChange | function | Yes | - | Change handler |
| units | array | No | [%, px, em, rem, vw, vh] | Available units |

---

## Tips

1. **Use ColorSettingsPanel instead of individual ColorPicker** - It automatically integrates theme colors
2. **Group related colors together** - Put all button colors in one panel, all text colors in another
3. **Set initialOpen wisely** - First panel in Style tab should be open, rest closed
4. **Show only needed typography controls** - Not all blocks need line-height or letter-spacing
5. **BorderPanel handles both objects and strings** - Works with BoxControl or UnitControl values
6. **Use descriptive panel titles** - "Button Colors" is better than just "Colors"

---

**Location:** `/src/blocks/commonControls/CommonControls.js`
**Last Updated:** January 9, 2026
