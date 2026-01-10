# weDocs Block Design Standards

This document defines the comprehensive design standards for all weDocs Gutenberg blocks to ensure consistency, accessibility, and a professional user experience.

## Core Principles

1. **WordPress-Native First**: Use WordPress block supports and components
2. **Theme Compatibility**: Respect theme defaults and global styles
3. **Responsive by Default**: Support all device sizes
4. **Accessible**: Follow WCAG 2.1 AA standards
5. **Consistent Layer Structure**: Organize controls logically

## Block.json Configuration

### Required Supports

Every block should include these supports in `block.json`:

```json
{
  "supports": {
    "html": false,
    "anchor": true,
    "align": ["wide", "full"],
    "color": {
      "background": true,
      "text": true,
      "link": true,
      "gradients": true,
      "__experimentalDefaultControls": {
        "background": true,
        "text": true
      }
    },
    "typography": {
      "fontSize": true,
      "lineHeight": true,
      "fontFamily": true,
      "fontWeight": true,
      "fontStyle": true,
      "textTransform": true,
      "textDecoration": true,
      "letterSpacing": true,
      "__experimentalFontFamily": true,
      "__experimentalFontWeight": true,
      "__experimentalFontStyle": true,
      "__experimentalTextTransform": true,
      "__experimentalTextDecoration": true,
      "__experimentalLetterSpacing": true,
      "__experimentalDefaultControls": {
        "fontSize": true,
        "lineHeight": true,
        "fontWeight": true
      }
    },
    "spacing": {
      "margin": true,
      "padding": true,
      "blockGap": true,
      "__experimentalDefaultControls": {
        "padding": true,
        "margin": true
      }
    },
    "border": {
      "color": true,
      "radius": true,
      "style": true,
      "width": true,
      "__experimentalDefaultControls": {
        "color": true,
        "radius": true,
        "style": true,
        "width": true
      }
    },
    "__experimentalBorder": {
      "color": true,
      "radius": true,
      "style": true,
      "width": true,
      "__experimentalDefaultControls": {
        "color": true,
        "radius": true,
        "style": true,
        "width": true
      }
    },
    "interactivity": {
      "clientNavigation": true
    }
  }
}
```

## Inspector Controls Structure

### Standard Panel Organization

Controls should be organized in this order:

1. **Block-Specific Actions** (if applicable)
   - Primary functionality controls
   - Generation/loading actions
   - Data management

2. **Block Settings**
   - Feature toggles
   - Behavior options
   - Display preferences

3. **[Element] Style Panels** (one per major element)
   - Title Style
   - Content Style
   - Icon Style
   - etc.

4. **Background & Border**
   - Background color/gradient
   - Border controls

5. **Spacing**
   - Padding
   - Margin

### Panel Structure Example

```jsx
<InspectorControls>
  {/* Block-Specific Actions */}
  <PanelBody title={__('Actions', 'wedocs-plugin')} initialOpen={true}>
    {/* Action buttons and controls */}
  </PanelBody>

  {/* Block Settings */}
  <PanelBody title={__('Block Settings', 'wedocs-plugin')} initialOpen={false}>
    {/* Feature toggles and options */}
  </PanelBody>

  {/* Title Style */}
  <PanelBody title={__('Title Style', 'wedocs-plugin')} initialOpen={false}>
    <ColorSettingsPanel
      title={__('Title Color', 'wedocs-plugin')}
      colorSettings={[{
        label: __('Text Color', 'wedocs-plugin'),
        value: titleColor,
        onChange: (value) => setAttributes({ titleColor: value })
      }]}
      initialOpen={true}
    />

    <TypographyPanel
      title={__('Title Typography', 'wedocs-plugin')}
      fontSize={titleFontSize}
      fontWeight={titleFontWeight}
      fontFamily={titleFontFamily}
      lineHeight={titleLineHeight}
      letterSpacing={titleLetterSpacing}
      onFontSizeChange={(value) => setAttributes({ titleFontSize: value })}
      onFontWeightChange={(value) => setAttributes({ titleFontWeight: value })}
      onFontFamilyChange={(value) => setAttributes({ titleFontFamily: value })}
      onLineHeightChange={(value) => setAttributes({ titleLineHeight: value })}
      onLetterSpacingChange={(value) => setAttributes({ titleLetterSpacing: value })}
      showFontFamily={true}
      showLineHeight={true}
      showLetterSpacing={true}
      initialOpen={true}
    />
  </PanelBody>

  {/* Content Style */}
  <PanelBody title={__('Content Style', 'wedocs-plugin')} initialOpen={false}>
    {/* Color and Typography controls */}
  </PanelBody>

  {/* Background & Border */}
  <PanelBody title={__('Background & Border', 'wedocs-plugin')} initialOpen={false}>
    <ColorSettingsPanel
      title={__('Background', 'wedocs-plugin')}
      colorSettings={[{
        label: __('Background Color', 'wedocs-plugin'),
        value: backgroundColor,
        onChange: (value) => setAttributes({ backgroundColor: value })
      }]}
      initialOpen={true}
    />

    <BorderPanel
      title={__('Border', 'wedocs-plugin')}
      borderStyle={borderStyle}
      borderWidth={borderWidth}
      borderColor={borderColor}
      borderRadius={borderRadius}
      onStyleChange={(value) => setAttributes({ borderStyle: value })}
      onWidthChange={(value) => setAttributes({ borderWidth: value })}
      onColorChange={(value) => setAttributes({ borderColor: value })}
      onRadiusChange={(value) => setAttributes({ borderRadius: value })}
      initialOpen={true}
    />
  </PanelBody>

  {/* Spacing */}
  <PanelBody title={__('Spacing', 'wedocs-plugin')} initialOpen={false}>
    <SpacingPanel
      title={__('Padding', 'wedocs-plugin')}
      padding={padding}
      onPaddingChange={(value) => setAttributes({ padding: value })}
      showPadding={true}
      showMargin={false}
      initialOpen={true}
    />

    <SpacingPanel
      title={__('Margin', 'wedocs-plugin')}
      margin={margin}
      onMarginChange={(value) => setAttributes({ margin: value })}
      showPadding={false}
      showMargin={true}
      initialOpen={true}
    />
  </PanelBody>
</InspectorControls>
```

## Required Controls

### Color Controls
- Background Color (with gradient support)
- Text Color
- Link Color (if applicable)
- Element-specific colors (title, content, icon, etc.)
- Border Color

### Typography Controls
For each text element (title, content, etc.):
- Font Family (16+ options including system fonts)
- Font Size
- Font Weight
- Font Style
- Line Height
- Letter Spacing
- Text Transform
- Text Decoration

### Spacing Controls
- Padding (top, right, bottom, left)
- Margin (top, right, bottom, left)
- Block Gap (for container blocks)

### Border Controls
- Border Style (none, solid, dashed, dotted, double)
- Border Width (unified or individual sides)
- Border Color
- Border Radius (unified or individual corners)

### Layout Controls
- Alignment (left, center, right)
- Width/Height (when applicable)
- Display options

## Hover States

### Implementation

Add hover states in `style.scss`:

```scss
.wp-block-wedocs-[block-name] {
  transition: all 0.3s ease;

  /* Block hover */
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }

  /* Link hover */
  a {
    transition: color 0.2s ease, opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
    }
  }

  /* Button hover */
  .button-class {
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
      background-color: darken(#color, 10%);
      transform: scale(1.02);
    }

    &:active:not(:disabled) {
      transform: scale(0.98);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
}
```

## Responsive Design

### Breakpoints

Use these standard breakpoints:

- **Desktop**: > 782px (default styles)
- **Tablet**: 600px - 782px
- **Mobile**: 480px - 600px
- **Small Mobile**: < 480px

### Implementation

```scss
.wp-block-wedocs-[block-name] {
  /* Desktop styles (default) */

  /* Tablet and below */
  @media (max-width: 782px) {
    // Adjust font sizes, spacing
  }

  /* Mobile devices */
  @media (max-width: 600px) {
    padding: 15px !important;

    .element {
      font-size: 14px !important;
    }
  }

  /* Small mobile devices */
  @media (max-width: 480px) {
    padding: 12px !important;

    .element {
      font-size: 13px !important;
    }
  }
}
```

### Responsive Guidelines

1. **Font Sizes**: Reduce by 10-20% on mobile
2. **Spacing**: Reduce padding/margin on smaller screens
3. **Icons**: Scale down proportionally
4. **Buttons**: Maintain touch-friendly size (min 44x44px)
5. **Layout**: Stack elements vertically on mobile when needed

## Common Controls Components

### Using CommonControls

Import shared components:

```jsx
import {
  ColorSettingsPanel,
  TypographyPanel,
  SpacingPanel,
  BorderPanel,
  AlignmentControl,
  DimensionControl
} from '../commonControls/CommonControls';
```

### Typography Panel Options

```jsx
<TypographyPanel
  title={__('Typography', 'wedocs-plugin')}
  fontSize={fontSize}
  fontWeight={fontWeight}
  fontFamily={fontFamily}
  lineHeight={lineHeight}
  letterSpacing={letterSpacing}
  onFontSizeChange={(value) => setAttributes({ fontSize: value })}
  onFontWeightChange={(value) => setAttributes({ fontWeight: value })}
  onFontFamilyChange={(value) => setAttributes({ fontFamily: value })}
  onLineHeightChange={(value) => setAttributes({ lineHeight: value })}
  onLetterSpacingChange={(value) => setAttributes({ letterSpacing: value })}
  showFontSize={true}
  showFontWeight={true}
  showFontFamily={true}
  showLineHeight={true}
  showLetterSpacing={true}
  initialOpen={false}
/>
```

## Theme Integration

### Global Styles

Blocks should respect WordPress theme.json settings:

```json
{
  "supports": {
    "color": {
      "background": true,
      "text": true,
      "__experimentalDefaultControls": {
        "background": true,
        "text": true
      }
    }
  }
}
```

### CSS Custom Properties

Use CSS variables for theme compatibility:

```scss
.wp-block-wedocs-[block-name] {
  color: var(--wp--preset--color--text, inherit);
  background-color: var(--wp--preset--color--background, transparent);
  font-family: var(--wp--preset--font-family--body, inherit);
}
```

## Accessibility

### Requirements

1. **Keyboard Navigation**: All interactive elements must be keyboard accessible
2. **Focus Indicators**: Visible focus states for all interactive elements
3. **ARIA Labels**: Proper labeling for screen readers
4. **Color Contrast**: Minimum 4.5:1 ratio for text
5. **Semantic HTML**: Use appropriate HTML elements

### Implementation

```jsx
// Focus visible styles
.wp-block-wedocs-[block-name] {
  button:focus-visible,
  a:focus-visible {
    outline: 2px solid #007cba;
    outline-offset: 2px;
  }
}

// ARIA labels
<button
  aria-label={__('Generate AI Summary', 'wedocs-plugin')}
  aria-describedby="generate-description"
>
  {__('Generate', 'wedocs-plugin')}
</button>
```

## Testing Checklist

Before releasing a block, verify:

- [ ] All color controls work with theme colors
- [ ] Typography controls apply correctly
- [ ] Spacing controls function properly
- [ ] Border controls display correctly
- [ ] Hover states work on all interactive elements
- [ ] Responsive design works at all breakpoints
- [ ] Block saves and loads correctly
- [ ] Theme styles are respected
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] RTL language support
- [ ] Block validation passes
- [ ] No console errors

## Example: AI Summary Block

See `/src/blocks/AISummary/` for a complete implementation following these standards:

- `block.json` - Full supports configuration
- `edit.js` - Organized InspectorControls
- `save.js` - Semantic HTML with proper attributes
- `style.scss` - Hover states and responsive design
- `editor.scss` - Editor-specific styles

## Resources

- [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [Block Supports Reference](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/)
- [Theme.json Documentation](https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
