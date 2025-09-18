# PanelColorSettings

A component that provides a panel interface for managing multiple color settings in the block editor. It's a wrapper around `PanelColorGradientSettings` that transforms color settings into the format expected by the underlying color control components.

## Usage

```jsx
import { PanelColorSettings } from '@wordpress/block-editor';

function MyBlockEdit({ attributes, setAttributes }) {
    const { bgColor, textColor, borderColor } = attributes;

    return (
        <PanelColorSettings
            title="Color Settings"
            colorSettings={[
                {
                    value: bgColor,
                    label: __('Background Color', 'textdomain'),
                    onChange: (newColor) => setAttributes({ bgColor: newColor })
                },
                {
                    value: textColor,
                    label: __('Text Color', 'textdomain'),
                    onChange: (newColor) => setAttributes({ textColor: newColor })
                },
                {
                    value: borderColor,
                    label: __('Border Color', 'textdomain'),
                    onChange: (newColor) => setAttributes({ borderColor: newColor })
                }
            ]}
        />
    );
}
```

## Parameters

* _props_ `Object`: Component props.
* _props.colorSettings_ `Array`: **Required.** An array of color setting objects. Each object should contain:
  * _value_ `string`: The current color value (hex, rgb, etc.)
  * _onChange_ `Function`: Callback function called when the color changes
  * _label_ `string`: Label text for the color control
  * _[otherSettings]_ `Object`: Additional settings that will be passed through to the color control
* _props.title_ `string`: **Optional.** Title for the panel. Defaults to undefined.
* _props.children_ `Element`: **Optional.** Additional content to render in the panel.
* _props.[...otherProps]_ `Object`: **Optional.** Any additional props are passed through to the underlying `PanelColorGradientSettings` component.

## Returns

* `Element`: A panel containing color controls for each setting in the `colorSettings` array.

## Notes

* This component automatically transforms the `colorSettings` array by mapping `value` to `colorValue` and `onChange` to `onColorChange` for compatibility with the underlying color control components.
* Custom gradients are disabled by default (`disableCustomGradients: true`).
* The component renders a `PanelBody` with the provided title and color controls, followed by any additional children content.
* Each color setting is rendered as a `ColorControl` component that opens a color picker when pressed.

## Example with InspectorControls

```jsx
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

function MyBlockEdit({ attributes, setAttributes }) {
    return (
        <InspectorControls>
            <PanelBody title="Appearance">
                <PanelColorSettings
                    title="Colors"
                    colorSettings={[
                        {
                            value: attributes.primaryColor,
                            label: __('Primary Color', 'textdomain'),
                            onChange: (newColor) => setAttributes({ primaryColor: newColor })
                        },
                        {
                            value: attributes.secondaryColor,
                            label: __('Secondary Color', 'textdomain'),
                            onChange: (newColor) => setAttributes({ secondaryColor: newColor })
                        }
                    ]}
                />
            </PanelBody>
        </InspectorControls>
    );
}
```

## Styling

The component accepts standard React props for styling:

### CSS Classes
```jsx
<PanelColorSettings
    className="my-custom-color-panel"
    colorSettings={colorSettings}
/>
```

### Inline Styles
```jsx
<PanelColorSettings
    style={{
        margin: '20px 0',
        padding: '15px',
        backgroundColor: '#f9f9f9'
    }}
    colorSettings={colorSettings}
/>
```

### Wrapper Approach (Recommended)
```jsx
<div 
    className="custom-color-panel-wrapper"
    style={{
        margin: '20px 0',
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '8px'
    }}
>
    <PanelColorSettings
        colorSettings={colorSettings}
    />
</div>
```

## Related

* [@wordpress/block-editor](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)
* [PanelColorGradientSettings](https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/colors-gradients/panel-color-gradient-settings/README.md)
