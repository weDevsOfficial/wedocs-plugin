# Quick Start - Using Block Helpers

## 1. JavaScript Implementation

### Simple Block with Helpers

```javascript
// src/blocks/MyBlock/edit.js
import { useBlockProps } from '@wordpress/block-editor';
import { getBlockClasses, getInlineStyles } from '../block-helpers';

export default function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps({
        className: getBlockClasses(attributes, 'wp-block-wedocs-my-block'),
        style: getInlineStyles(attributes)
    });

    return (
        <div {...blockProps}>
            <h3>My Block Content</h3>
            <p>All styling handled automatically!</p>
        </div>
    );
}
```

```javascript
// src/blocks/MyBlock/save.js
import { useBlockProps } from '@wordpress/block-editor';
import { getBlockClasses, getInlineStyles } from '../block-helpers';

export default function Save({ attributes }) {
    const blockProps = useBlockProps.save({
        className: getBlockClasses(attributes, 'wp-block-wedocs-my-block'),
        style: getInlineStyles(attributes)
    });

    return (
        <div {...blockProps}>
            <h3>My Block Content</h3>
            <p>Styles preserved on frontend!</p>
        </div>
    );
}
```

## 2. PHP Server-Side Render

### render.php

```php
<?php
/**
 * Block render template
 */

// Load helper class
if (!class_exists('WeDocs_Block_Helpers')) {
    require_once WEDOCS_PATH . '/includes/class-block-helpers.php';
}

// Get wrapper attributes
$wrapper_attributes = WeDocs_Block_Helpers::get_block_wrapper_attributes(
    $attributes,
    'wp-block-wedocs-my-block'
);

// Optional: Generate additional CSS for complex scenarios
$block_id = 'wp-block-wedocs-my-block-' . uniqid();
$custom_css = WeDocs_Block_Helpers::generate_block_css(
    $attributes,
    $block_id
);

?>

<?php if (!empty($custom_css)) : ?>
    <style><?php echo esc_html($custom_css); ?></style>
<?php endif; ?>

<div <?php echo $wrapper_attributes; ?>>
    <h3><?php echo esc_html($attributes['title']); ?></h3>
    <p><?php echo esc_html($attributes['content']); ?></p>
</div>
```

## 3. Dynamic Block Registration

### block.php

```php
<?php
/**
 * Register block with server-side rendering
 */

function wedocs_register_my_block() {
    // Load helper class
    if (!class_exists('WeDocs_Block_Helpers')) {
        require_once WEDOCS_PATH . '/includes/class-block-helpers.php';
    }

    register_block_type(__DIR__ . '/build/blocks/MyBlock', [
        'render_callback' => 'wedocs_render_my_block'
    ]);
}
add_action('init', 'wedocs_register_my_block');

function wedocs_render_my_block($attributes, $content, $block) {
    // Get wrapper attributes with all styles
    $wrapper_attrs = WeDocs_Block_Helpers::get_block_wrapper_attributes(
        $attributes,
        'wp-block-wedocs-my-block'
    );

    ob_start();
    ?>
    <div <?php echo $wrapper_attrs; ?>>
        <h3><?php echo esc_html($attributes['title'] ?? ''); ?></h3>
        <div class="content">
            <?php echo wp_kses_post($attributes['content'] ?? ''); ?>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
```

## 4. Advanced Usage - Custom Selectors

### Generate CSS for Child Elements

```javascript
import { generateBlockCSS } from '../block-helpers';

// Generate CSS for the block container
const containerCSS = generateBlockCSS(
    attributes,
    'wp-block-wedocs-my-block'
);

// Generate CSS for a specific child element
const headerCSS = generateBlockCSS(
    attributes.headerStyles,
    'wp-block-wedocs-my-block',
    { selector: '.wp-block-wedocs-my-block .header' }
);

// Combine and output
const fullCSS = `${containerCSS}\n${headerCSS}`;
```

### PHP Equivalent

```php
// Container CSS
$container_css = WeDocs_Block_Helpers::generate_block_css(
    $attributes,
    'wp-block-wedocs-my-block'
);

// Header CSS
$header_css = WeDocs_Block_Helpers::generate_block_css(
    $attributes['headerStyles'],
    'wp-block-wedocs-my-block',
    ['selector' => '.wp-block-wedocs-my-block .header']
);

// Combine
$full_css = $container_css . "\n" . $header_css;
```

## 5. Handling Custom Attributes

### With Sanitization

```javascript
import { sanitizeAttribute, formatSpacing } from '../block-helpers';

// In your attribute setter
const updatePadding = (value) => {
    setAttributes({
        customPadding: formatSpacing(sanitizeAttribute(value, 'string'))
    });
};
```

### PHP Sanitization

```php
$safe_title = WeDocs_Block_Helpers::sanitize_attribute(
    $attributes['title'],
    'string'
);

$safe_url = WeDocs_Block_Helpers::sanitize_attribute(
    $attributes['link'],
    'url'
);

$safe_number = WeDocs_Block_Helpers::sanitize_attribute(
    $attributes['count'],
    'number'
);
```

## 6. Working with Responsive Styles

```javascript
import { getResponsiveValue } from '../block-helpers';

// Define responsive values
const attributes = {
    fontSize: {
        desktop: '18px',
        tablet: '16px',
        mobile: '14px'
    }
};

// Get value for current device
const currentFontSize = getResponsiveValue(attributes.fontSize, 'mobile');
// Returns: '14px'
```

## 7. Complete Real-World Example

### Edit Component with All Features

```javascript
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, RangeControl } from '@wordpress/components';
import { getBlockClasses, getInlineStyles, sanitizeAttribute } from '../block-helpers';

export default function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps({
        className: getBlockClasses(attributes, 'wp-block-wedocs-doc-card'),
        style: getInlineStyles(attributes)
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title="Card Settings">
                    <TextControl
                        label="Title"
                        value={attributes.title}
                        onChange={(value) => 
                            setAttributes({ 
                                title: sanitizeAttribute(value, 'string') 
                            })
                        }
                    />
                    <RangeControl
                        label="Card Height"
                        value={parseInt(attributes.minHeight)}
                        onChange={(value) => 
                            setAttributes({ 
                                minHeight: `${value}px` 
                            })
                        }
                        min={100}
                        max={600}
                    />
                </PanelBody>
            </InspectorControls>
            
            <div {...blockProps}>
                <h3>{attributes.title}</h3>
                <p>{attributes.description}</p>
                {/* All WordPress block supports work automatically */}
            </div>
        </>
    );
}
```

### PHP Render with Full Styling

```php
<?php
function wedocs_render_doc_card($attributes) {
    // Sanitize all inputs
    $title = WeDocs_Block_Helpers::sanitize_attribute(
        $attributes['title'] ?? '',
        'string'
    );
    
    $description = WeDocs_Block_Helpers::sanitize_attribute(
        $attributes['description'] ?? '',
        'html'
    );
    
    // Get complete wrapper attributes
    $wrapper_attrs = WeDocs_Block_Helpers::get_block_wrapper_attributes(
        $attributes,
        'wp-block-wedocs-doc-card'
    );
    
    // Build output
    ob_start();
    ?>
    <div <?php echo $wrapper_attrs; ?>>
        <?php if (!empty($title)) : ?>
            <h3 class="card-title"><?php echo esc_html($title); ?></h3>
        <?php endif; ?>
        
        <?php if (!empty($description)) : ?>
            <div class="card-description">
                <?php echo wp_kses_post($description); ?>
            </div>
        <?php endif; ?>
    </div>
    <?php
    return ob_get_clean();
}
?>
```

## 8. Testing Your Implementation

```javascript
// Test in browser console
import { generateBlockCSS, getBlockClasses } from '../block-helpers';

const testAttrs = {
    backgroundColor: 'primary',
    style: {
        spacing: { padding: '20px' },
        typography: { fontSize: '16px' }
    }
};

console.log('CSS:', generateBlockCSS(testAttrs, 'test-block'));
console.log('Classes:', getBlockClasses(testAttrs, 'test-block'));
```

## Common Patterns

### Pattern 1: Container Block with Gap

```javascript
const containerProps = useBlockProps({
    className: getBlockClasses(attributes, 'wp-block-wedocs-container'),
    style: {
        ...getInlineStyles(attributes),
        display: 'flex',
        flexDirection: 'column'
    }
});
```

### Pattern 2: Card with Custom Background

```javascript
const cardStyle = {
    ...getInlineStyles(attributes),
    backgroundImage: `url(${attributes.backgroundImage})`,
    backgroundSize: 'cover'
};
```

### Pattern 3: Responsive Typography

```javascript
const fontSize = getResponsiveValue(
    attributes.fontSize,
    window.innerWidth < 768 ? 'mobile' : 'desktop'
);
```

## Checklist for New Blocks

- [ ] Import block helpers
- [ ] Use `getBlockClasses()` for className
- [ ] Use `getInlineStyles()` for style prop
- [ ] Add wrapper attributes in PHP render
- [ ] Sanitize all user inputs
- [ ] Test with different block supports enabled
- [ ] Verify CSS output in browser
- [ ] Check responsive behavior
- [ ] Validate accessibility

## Need Help?

- 📖 Full Documentation: [BLOCK_HELPERS_GUIDE.md](BLOCK_HELPERS_GUIDE.md)
- 🎨 Common Supports: [COMMON_SUPPORTS_README.md](COMMON_SUPPORTS_README.md)
- 🔧 API Reference: Check JSDoc in `block-helpers.js`

---

✅ **Start using these helpers in all your blocks for consistent, maintainable code!**
