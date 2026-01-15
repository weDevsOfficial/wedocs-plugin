# WeDocs Block Helpers

This directory contains shared helper functions and utilities for WeDocs blocks. These helpers provide a consistent and maintainable approach to styling, responsive design, and functionality across all blocks.

## Files

### `block-styles.php`
PHP helper functions for server-side rendering:

- `wedocs_build_typography_styles()` - Generate typography CSS from attributes
- `wedocs_build_spacing_styles()` - Generate padding/margin CSS
- `wedocs_build_border_styles()` - Generate border CSS
- `wedocs_build_shadow_styles()` - Generate box-shadow CSS
- `wedocs_build_background_styles()` - Generate background CSS
- `wedocs_build_element_styles()` - Complete element styling
- `wedocs_generate_block_id()` - Unique block ID generation
- `wedocs_styles_to_css()` - Convert styles array to CSS string
- `wedocs_generate_responsive_css()` - Generate responsive CSS rules
- `wedocs_sanitize_css_value()` - Validate and sanitize CSS values

### `block-helpers.js`
JavaScript helper functions for editor and frontend:

- `generateBlockStyles()` - Generate CSS styles from attributes
- `generateTypographyStyles()` - Typography style generation
- `generateSpacingStyles()` - Spacing style generation
- `generateElementStyles()` - Complete element styling
- `generateCustomProperties()` - CSS custom properties for theming
- `debounce()` - Performance optimization utility
- `isValidCSSValue()` - CSS value validation
- `convertToPx()` - Unit conversion utility
- `classNames()` - Class name merging utility
- `getBreakpoints()` - Responsive breakpoint values
- `isBreakpoint()` - Breakpoint matching utility

### `index.js`
Main export file for easy imports

## Usage

### PHP Usage
```php
// Include the helpers file
require_once plugin_dir_path(__FILE__) . 'src/blocks/helpers/block-styles.php';

// Use helper functions in render callbacks
$title_styles = wedocs_build_element_styles([
    'color' => $attributes['titleColor'],
    'typography' => $attributes['titleTypography'],
    'spacing' => [
        'padding' => $attributes['titlePadding'],
        'margin' => $attributes['titleMargin']
    ]
]);

$css = wedocs_styles_to_css($title_styles);
```

### JavaScript Usage
```javascript
// Import specific helpers
import { generateElementStyles, classNames } from '../helpers';

// Or import all helpers
import blockHelpers from '../helpers';

// Use in components
const elementStyles = generateElementStyles({
    color: attributes.nameColor,
    typography: attributes.nameTypography,
    spacing: {
        padding: attributes.namePadding,
        margin: attributes.nameMargin
    }
});
```

## Benefits

1. **Consistency** - All blocks use the same styling logic
2. **Maintainability** - Updates in one place affect all blocks
3. **Performance** - Optimized functions reduce code duplication
4. **Scalability** - Easy to add new styling features
5. **Reliability** - Centralized validation and sanitization
6. **Responsiveness** - Built-in responsive design utilities

## Adding New Helpers

When adding new helper functions:

1. Add PHP functions to `block-styles.php`
2. Add JavaScript functions to `block-helpers.js`
3. Export new functions in `index.js`
4. Update this README with usage examples
5. Follow existing naming conventions
6. Include proper documentation
7. Add validation and sanitization
8. Consider performance implications

## Naming Conventions

- PHP functions: `wedocs_[action]_[subject]()`
- JavaScript functions: `[action][Subject]()`
- Use descriptive names that clearly indicate purpose
- Group related functions together

## Security Considerations

All PHP helper functions include:
- Input validation with appropriate defaults
- Output escaping with `esc_attr()`, `esc_url()`, `esc_html()`
- CSS injection prevention
- WordPress coding standards compliance

## Performance Considerations

- Functions are optimized for minimal DOM manipulation
- CSS generation is efficient and cached where possible
- Responsive breakpoints use standard values
- Debouncing is available for expensive operations