# Block Helpers - Centralized Settings & CSS System

## Overview

The Block Helpers system provides a centralized, consistent approach for handling block settings and CSS generation across all weDocs blocks. This ensures every block works with the same logic and format without hesitation.

## Architecture

```
Block Settings & CSS Generation System
├── JavaScript (Editor & Frontend)
│   └── src/blocks/block-helpers.js
├── PHP (Server-side Rendering)
│   └── includes/class-block-helpers.php
└── Common Configuration
    └── src/blocks/common-supports.js
```

## Features

### ✅ Consistent CSS Generation
- Automatic CSS generation from block attributes
- Supports all WordPress block supports (color, typography, spacing, etc.)
- Works in both JavaScript and PHP
- Consistent output format

### ✅ Centralized Logic
- Single source of truth for styling logic
- No code duplication across blocks
- Easy to maintain and update
- Predictable behavior

### ✅ Type Safety
- Attribute sanitization
- Value validation
- Type checking
- Safe defaults

## JavaScript API

### Import the Helpers

```javascript
import {
    generateBlockCSS,
    getBlockClasses,
    getInlineStyles,
    useBlockProps
} from '../block-helpers';
```

### Generate Block CSS

```javascript
// Generate complete CSS from attributes
const css = generateBlockCSS(attributes, 'wp-block-wedocs-my-block');

// Output:
// .wp-block-wedocs-my-block {
//   background-color: #ffffff;
//   color: #333333;
//   padding: 20px;
//   margin: 10px 0;
//   border-radius: 8px;
// }
```

### Get Block Classes

```javascript
// Get all relevant CSS classes
const className = getBlockClasses(attributes, 'wp-block-wedocs-my-block');

// Output: "wp-block-wedocs-my-block alignwide has-background has-text-color"
```

### Get Inline Styles

```javascript
// Get inline styles object
const style = getInlineStyles(attributes);

// Output:
// {
//   backgroundColor: '#ffffff',
//   color: '#333333',
//   padding: '20px',
//   marginTop: '10px'
// }
```

### Use Block Props (React)

```javascript
// In your Edit component
import { useBlockProps } from '@wordpress/block-editor';
import { useBlockProps as useWedocsBlockProps } from '../block-helpers';

function Edit({ attributes }) {
    const blockProps = useBlockProps({
        className: getBlockClasses(attributes, 'wp-block-wedocs-my-block'),
        style: getInlineStyles(attributes)
    });
    
    return <div {...blockProps}>Block content</div>;
}

// Or use the helper directly
function Edit({ attributes }) {
    const wedocsProps = useWedocsBlockProps(attributes, {
        className: 'wp-block-wedocs-my-block'
    });
    
    return <div {...wedocsProps}>Block content</div>;
}
```

## PHP API

### Load the Helper Class

```php
// In your main plugin file or block registration
require_once WEDOCS_PATH . '/includes/class-block-helpers.php';
```

### Generate Block CSS (Server-side)

```php
// In your block render callback
function render_my_block($attributes) {
    $css = WeDocs_Block_Helpers::generate_block_css(
        $attributes,
        'wp-block-wedocs-my-block'
    );
    
    // Wrap in style tag
    $style = !empty($css) ? "<style>{$css}</style>" : '';
    
    // Render block
    return $style . '<div>' . $content . '</div>';
}
```

### Get Block Wrapper Attributes

```php
// Get all wrapper attributes as string
$wrapper_attrs = WeDocs_Block_Helpers::get_block_wrapper_attributes(
    $attributes,
    'wp-block-wedocs-my-block'
);

// Use in template
echo "<div {$wrapper_attrs}>Block content</div>";
```

### Get Classes Only

```php
$classes = WeDocs_Block_Helpers::get_block_classes(
    $attributes,
    'wp-block-wedocs-my-block'
);
```

### Get Inline Styles

```php
$styles = WeDocs_Block_Helpers::get_inline_styles($attributes);
$style_string = WeDocs_Block_Helpers::styles_to_string($styles);

echo "<div style=\"{$style_string}\">Content</div>";
```

## Supported Attributes

### Color
```javascript
{
    backgroundColor: 'primary',           // Preset color
    textColor: 'secondary',              // Preset color
    gradient: 'vivid-cyan-blue',         // Preset gradient
    style: {
        color: {
            background: '#ffffff',        // Custom color
            text: '#333333',             // Custom text color
            gradient: 'linear-gradient(...)' // Custom gradient
        }
    }
}
```

### Typography
```javascript
{
    fontSize: 'large',                    // Preset size
    fontFamily: 'system-font',           // Preset family
    style: {
        typography: {
            fontSize: '18px',             // Custom size
            fontFamily: 'Arial, sans-serif', // Custom family
            fontWeight: '600',            // Weight
            fontStyle: 'italic',          // Style
            lineHeight: '1.6',            // Line height
            letterSpacing: '0.5px',       // Letter spacing
            textTransform: 'uppercase',   // Transform
            textDecoration: 'underline'   // Decoration
        }
    }
}
```

### Spacing
```javascript
{
    style: {
        spacing: {
            margin: '20px',               // All sides
            margin: {                     // Individual sides
                top: '10px',
                right: '20px',
                bottom: '10px',
                left: '20px'
            },
            padding: '15px',              // All sides
            padding: {                    // Individual sides
                top: '10px',
                right: '15px',
                bottom: '10px',
                left: '15px'
            },
            blockGap: '10px'              // Gap for container blocks
        }
    }
}
```

### Dimensions
```javascript
{
    style: {
        dimensions: {
            minHeight: '300px',           // Minimum height
            width: '100%',                // Width
            maxWidth: '1200px'            // Maximum width
        }
    }
}
```

### Border
```javascript
{
    borderColor: 'primary',               // Preset color
    style: {
        border: {
            color: '#dddddd',             // Custom color
            width: '2px',                 // All sides
            width: {                      // Individual sides
                top: '1px',
                right: '2px',
                bottom: '1px',
                left: '2px'
            },
            style: 'solid',               // Border style
            radius: '8px',                // All corners
            radius: {                     // Individual corners
                topLeft: '8px',
                topRight: '8px',
                bottomLeft: '4px',
                bottomRight: '4px'
            }
        }
    }
}
```

### Alignment
```javascript
{
    align: 'wide',                        // Block alignment
    // Options: 'left', 'center', 'right', 'wide', 'full'
}
```

## Helper Functions

### Sanitize Attributes

```javascript
import { sanitizeAttribute } from '../block-helpers';

const cleanValue = sanitizeAttribute(userInput, 'string');
const cleanNumber = sanitizeAttribute(userInput, 'number');
const cleanColor = sanitizeAttribute(userInput, 'color');
const cleanUrl = sanitizeAttribute(userInput, 'url');
```

```php
$clean_value = WeDocs_Block_Helpers::sanitize_attribute($input, 'string');
$clean_number = WeDocs_Block_Helpers::sanitize_attribute($input, 'number');
$clean_color = WeDocs_Block_Helpers::sanitize_attribute($input, 'color');
$clean_url = WeDocs_Block_Helpers::sanitize_attribute($input, 'url');
```

### Format Spacing

```javascript
import { formatSpacing } from '../block-helpers';

formatSpacing(10);        // '10px'
formatSpacing('10');      // '10px'
formatSpacing('10px');    // '10px'
formatSpacing('1rem');    // '1rem'
```

### Parse Spacing

```javascript
import { parseSpacing } from '../block-helpers';

parseSpacing('10px');           // { top: '10px', right: '10px', bottom: '10px', left: '10px' }
parseSpacing('10px 20px');      // { top: '10px', right: '20px', bottom: '10px', left: '20px' }
parseSpacing('10px 20px 30px'); // { top: '10px', right: '20px', bottom: '30px', left: '20px' }
```

### Responsive Values

```javascript
import { getResponsiveValue } from '../block-helpers';

const values = {
    desktop: '20px',
    tablet: '15px',
    mobile: '10px'
};

getResponsiveValue(values, 'desktop'); // '20px'
getResponsiveValue(values, 'mobile');  // '10px'
```

### Merge Attributes

```javascript
import { mergeAttributes } from '../block-helpers';

const defaultAttrs = {
    backgroundColor: 'white',
    style: { spacing: { padding: '10px' } }
};

const userAttrs = {
    textColor: 'black',
    style: { spacing: { margin: '20px' } }
};

const merged = mergeAttributes(defaultAttrs, userAttrs);
// Result: All properties combined, deep merge for style object
```

## Example Implementation

### Complete Block Example (JavaScript)

```javascript
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { getBlockClasses, getInlineStyles } from '../block-helpers';

registerBlockType('wedocs/my-block', {
    edit: ({ attributes }) => {
        const blockProps = useBlockProps({
            className: getBlockClasses(attributes, 'wp-block-wedocs-my-block'),
            style: getInlineStyles(attributes)
        });
        
        return <div {...blockProps}>Editor content</div>;
    },
    
    save: ({ attributes }) => {
        const blockProps = useBlockProps.save({
            className: getBlockClasses(attributes, 'wp-block-wedocs-my-block'),
            style: getInlineStyles(attributes)
        });
        
        return <div {...blockProps}>Saved content</div>;
    }
});
```

### Complete Block Example (PHP Render)

```php
function wedocs_register_my_block() {
    register_block_type('wedocs/my-block', [
        'render_callback' => 'wedocs_render_my_block',
        'attributes' => [
            // ... attribute definitions
        ]
    ]);
}

function wedocs_render_my_block($attributes, $content) {
    // Get wrapper attributes
    $wrapper_attrs = WeDocs_Block_Helpers::get_block_wrapper_attributes(
        $attributes,
        'wp-block-wedocs-my-block'
    );
    
    // Generate dynamic CSS if needed
    $css = WeDocs_Block_Helpers::generate_block_css(
        $attributes,
        'wp-block-wedocs-my-block'
    );
    
    $output = '';
    
    // Add inline styles if there's dynamic CSS
    if (!empty($css)) {
        $output .= "<style>{$css}</style>";
    }
    
    // Render block
    $output .= "<div {$wrapper_attrs}>";
    $output .= wp_kses_post($content);
    $output .= "</div>";
    
    return $output;
}

add_action('init', 'wedocs_register_my_block');
```

## Benefits

### 1. Consistency
- All blocks use the same styling logic
- Predictable behavior across the plugin
- Easy to understand and debug

### 2. Maintainability
- Single place to update styling logic
- No code duplication
- Clear separation of concerns

### 3. Performance
- Optimized CSS generation
- Minimal runtime overhead
- Efficient string concatenation

### 4. Developer Experience
- Clear, documented API
- TypeScript-friendly structure
- Easy to test and validate

### 5. User Experience
- Consistent controls across blocks
- Reliable styling output
- Better editor performance

## Migration Guide

### Before (Manual CSS in each block)

```javascript
// In block save/edit
const style = {
    backgroundColor: attributes.bgColor,
    padding: `${attributes.paddingTop} ${attributes.paddingRight}...`,
    // ... manual style building
};
```

### After (Using Block Helpers)

```javascript
import { getInlineStyles } from '../block-helpers';

// Automatic style generation
const style = getInlineStyles(attributes);
```

## Testing

```javascript
// Test CSS generation
import { generateBlockCSS } from '../block-helpers';

const attributes = {
    backgroundColor: 'primary',
    style: {
        spacing: { padding: '20px' }
    }
};

const css = generateBlockCSS(attributes, 'test-block');
console.log(css);
// Output: .test-block { background-color: var(--wp--preset--color--primary); padding: 20px; }
```

## Best Practices

1. **Always use helpers** for CSS generation
2. **Use common-supports.js** for block.json configuration
3. **Sanitize user input** before processing
4. **Test in both JS and PHP** environments
5. **Follow WordPress standards** for attribute naming

## Support Matrix

| Feature | JavaScript | PHP | Status |
|---------|-----------|-----|--------|
| Color | ✅ | ✅ | Complete |
| Typography | ✅ | ✅ | Complete |
| Spacing | ✅ | ✅ | Complete |
| Dimensions | ✅ | ✅ | Complete |
| Border | ✅ | ✅ | Complete |
| Alignment | ✅ | ✅ | Complete |
| Classes | ✅ | ✅ | Complete |
| Inline Styles | ✅ | ✅ | Complete |

---

**Status:** ✅ Ready for Implementation  
**Compatibility:** WordPress 6.0+  
**Last Updated:** January 10, 2026
