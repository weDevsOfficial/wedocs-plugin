# WordPress Blocks FSE Modernization - weDocs Plugin

## Overview
This document outlines the comprehensive modernization of weDocs blocks to align with the latest WordPress Block Editor (Gutenberg) standards and Full Site Editing (FSE) capabilities.

## Issues Identified

### 1. **Inconsistent Control Organization**
   - Controls were not properly separated into General and Style tabs
   - Mixed content and styling controls in the same panel
   - No use of `InspectorControls group="styles"` for style-specific controls

### 2. **Missing FSE Support**
   - No support for theme.json color palettes
   - No typography controls (font size, line height, font family)
   - Missing spacing controls (margin, padding, blockGap)
   - No border controls (color, radius, style, width)

### 3. **Custom Controls Over Native WordPress Controls**
   - Used custom control components instead of WordPress native components
   - Reinvented functionality that WordPress already provides
   - Harder to maintain and not aligned with WordPress ecosystem

### 4. **No Block.json Configuration**
   - Some blocks using attributes.js instead of block.json
   - Missing modern block API v3 features
   - No proper support declarations

### 5. **Frontend/Editor Inconsistencies**
   - Some controls worked in editor but didn't reflect on frontend
   - Save functions not properly handling all attributes
   - CSS variables not consistently applied

## WordPress Block Best Practices Implemented

### 1. **Block.json Structure**
```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "wedocs/block-name",
  "supports": {
    "html": false,
    "align": ["wide", "full"],
    "anchor": true,
    "color": {
      "background": true,
      "text": true,
      "link": true,
      "__experimentalDefaultControls": {
        "background": true,
        "text": true
      }
    },
    "typography": {
      "fontSize": true,
      "lineHeight": true,
      "__experimentalFontFamily": true,
      "__experimentalFontWeight": true,
      "__experimentalFontStyle": true,
      "__experimentalTextTransform": true,
      "__experimentalTextDecoration": true,
      "__experimentalLetterSpacing": true,
      "__experimentalDefaultControls": {
        "fontSize": true
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
    }
  }
}
```

### 2. **Proper InspectorControls Organization**

#### General Tab (Default InspectorControls)
```jsx
<InspectorControls>
  <PanelBody title={__('General Settings', 'wedocs')} initialOpen={true}>
    {/* Content-related controls */}
    <TextControl />
    <ToggleControl />
    <SelectControl />
  </PanelBody>
  
  <PanelBody title={__('Advanced Settings', 'wedocs')} initialOpen={false}>
    {/* Advanced functionality controls */}
  </PanelBody>
</InspectorControls>
```

#### Style Tab (InspectorControls group="styles")
```jsx
<InspectorControls group="styles">
  <PanelBody title={__('Visual Styles', 'wedocs')} initialOpen={true}>
    {/* Appearance controls */}
    <PanelColorSettings />
    <UnitControl label="Border Radius" />
  </PanelBody>
  
  <PanelBody title={__('Layout', 'wedocs')} initialOpen={false}>
    {/* Layout-related controls */}
    <BoxControl label="Padding" />
    <BoxControl label="Margin" />
  </PanelBody>
</InspectorControls>
```

### 3. **WordPress Native Controls**

Use WordPress native components instead of custom controls:

| Old Custom Control | New Native Control |
|-------------------|-------------------|
| Custom color picker | `PanelColorSettings` from `@wordpress/block-editor` |
| Custom unit control | `__experimentalUnitControl` from `@wordpress/components` |
| Custom box control | `__experimentalBoxControl` from `@wordpress/components` |
| Custom alignment | `AlignmentToolbar` in `BlockControls` |
| Custom radio buttons | `SelectControl` or `RadioControl` |

### 4. **BlockControls for Toolbar Actions**
```jsx
<BlockControls>
  <AlignmentToolbar
    value={alignment}
    onChange={(value) => setAttributes({ alignment: value })}
  />
</BlockControls>
```

## Changes Made to Search Block

### Files Modified:
1. **block.json** (NEW) - Created comprehensive block configuration
2. **index.js** - Updated to use block.json metadata
3. **edit.js** - Complete rewrite with FSE support
4. **save.js** - Updated to match new attributes and structure

### Key Improvements:

#### 1. FSE Support Added
- ✅ Color support (background, text, link)
- ✅ Typography support (all font properties)
- ✅ Spacing support (margin, padding, blockGap)
- ✅ Border support (color, radius, style, width)
- ✅ Alignment support (wide, full)
- ✅ Anchor support

#### 2. Control Organization
- ✅ General Settings panel (content controls)
- ✅ Button Settings panel (functionality)
- ✅ Input Styles panel (in Style tab)
- ✅ Button Styles panel (in Style tab)
- ✅ BlockControls for alignment toolbar

#### 3. Simplified Attributes
```javascript
// Old: Multiple granular attributes
margin, padding, bgColor, hoverColor, borderColor, borderWidth, 
borderType, borderRadius, iconColor, iconBgColor, etc.

// New: Simplified with FSE support
searchWidth, placeholder, alignment, buttonText, showButton,
buttonPosition, buttonBackgroundColor, buttonTextColor, etc.
// + All FSE attributes handled automatically
```

#### 4. Consistent Editor/Frontend Rendering
- Same JSX structure in edit.js and save.js
- CSS variables for hover states
- Proper inline styles that work in both contexts

## Implementation Guide for Remaining Blocks

### DocsGrid Block
**Priority: High**
**Files to Update:**
- Create `block.json`
- Update `edit.js` with proper InspectorControls organization
- Separate StyleControls.js content into InspectorControls group="styles"
- Update `render.php` to use new attribute structure

**Specific Changes:**
1. Move color controls to Style tab
2. Add typography support for title and content
3. Add spacing support for grid items
4. Use native WordPress color picker instead of custom
5. Organize controls: General (query, display options) vs Styles (colors, spacing, borders)

### Contributors Block
**Priority: High**
**Files to Update:**
- Create `block.json`
- Update `edit.js`
- Add FSE supports

**Specific Changes:**
1. Add color support for contributor names and descriptions
2. Add typography controls
3. Add spacing controls for avatar and text
4. Organize settings and style controls properly

### TableOfContents Block
**Priority: Medium** (Already has better structure)
**Files to Update:**
- Review `Inspector.js` and ensure proper tab separation
- Move color/style controls from General to Styles tab
- Add missing FSE supports to `block.json`

**Specific Changes:**
1. Move all ColorPicker controls to InspectorControls group="styles"
2. Keep only functional controls in General tab (heading selection, hierarchy, numbering)
3. Add typography support for TOC title and items

### HelpfulModal & HelpfulFeedback Blocks
**Priority: Medium**
**Changes:**
1. Create block.json for both
2. Add FSE color and typography support
3. Separate content controls from style controls
4. Add proper button styling controls

### SocialShare Block
**Priority: Low**
**Changes:**
1. Create block.json
2. Add FSE support
3. Organize icon and button controls
4. Add proper spacing and color controls

## Testing Checklist

For each updated block, test:

### Editor (Block Editor)
- [ ] Block inserts without errors
- [ ] All controls appear in correct tabs (General vs Styles)
- [ ] Control changes reflect immediately in editor preview
- [ ] Color picker shows theme colors
- [ ] Typography controls work correctly
- [ ] Spacing controls update visual appearance
- [ ] Border controls function properly
- [ ] No console errors

### Frontend
- [ ] Block renders correctly on frontend
- [ ] All style attributes apply correctly
- [ ] Hover states work as expected
- [ ] Responsive design maintained
- [ ] No console errors
- [ ] Browser compatibility (Chrome, Firefox, Safari)

### Theme Integration
- [ ] Block respects theme.json colors
- [ ] Typography settings honor theme fonts
- [ ] Spacing scales work with theme settings
- [ ] Block works with different themes
- [ ] FSE theme compatibility

## Migration Notes

### For Existing Blocks
When users update to the new version with modernized blocks:

1. **Deprecated Blocks**: Consider adding deprecated block versions for backward compatibility
2. **Attribute Migration**: Create migration scripts in block.json deprecated array
3. **Style Preservation**: Ensure old inline styles continue to work

### Example Deprecated Configuration:
```javascript
deprecated: [
  {
    attributes: {
      // Old attribute structure
    },
    migrate(attributes) {
      // Convert old attributes to new structure
      return {
        searchWidth: attributes.searchWidth + attributes.widthUnit,
        // ... more migrations
      };
    },
    save: OldSaveComponent
  }
]
```

## Benefits of These Changes

### 1. **Better User Experience**
- Consistent interface across all blocks
- Familiar WordPress controls
- Easier to understand and use
- Better organization of settings

### 2. **Theme Integration**
- Blocks automatically inherit theme colors
- Typography follows site-wide settings
- Spacing is consistent with theme
- Better FSE compatibility

### 3. **Maintainability**
- Less custom code to maintain
- Uses WordPress core APIs
- Easier for other developers to contribute
- Future-proof with latest WordPress standards

### 4. **Performance**
- Leverages WordPress optimizations
- Better code splitting
- Reduced bundle size
- Faster block loading

### 5. **Accessibility**
- WordPress controls are accessibility-ready
- Better keyboard navigation
- Screen reader friendly
- WCAG compliant

## Next Steps

1. **Immediate:**
   - Apply same changes to DocsGrid block
   - Apply to Contributors block
   
2. **Short-term:**
   - Update TableOfContents block
   - Fix HelpfulModal and HelpfulFeedback blocks
   
3. **Long-term:**
   - Update SocialShare block
   - Review and update remaining commented-out blocks
   - Create comprehensive block testing suite
   - Document all block features in user guide

## Resources

- [WordPress Block API Reference](https://developer.wordpress.org/block-editor/reference-guides/block-api/)
- [Block Supports Documentation](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/)
- [InspectorControls Documentation](https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/block-controls-toolbar-and-sidebar/)
- [FSE Theme Documentation](https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/)

## Conclusion

These modernizations bring weDocs blocks in line with current WordPress standards, making them more maintainable, user-friendly, and future-proof. The modular approach allows for incremental updates while maintaining backward compatibility.

---

**Author:** weDocs Development Team  
**Last Updated:** January 9, 2026  
**Version:** 1.0.0
