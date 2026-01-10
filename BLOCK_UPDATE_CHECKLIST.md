# Block Modernization Checklist

Quick reference guide for updating each block to WordPress FSE standards.

## ✅ Completed Blocks

- [x] **Search Block** - Fully modernized with FSE support
- [x] **DocsGrid Block** - Structure updated, FSE support added

---

## 📋 Block Update Checklist Template

Use this checklist when modernizing each block:

### 1. Create/Update block.json
- [ ] Add `"apiVersion": 3`
- [ ] Add FSE `supports` object:
  - [ ] `color` (background, text, link)
  - [ ] `typography` (fontSize, lineHeight, fontFamily, etc.)
  - [ ] `spacing` (margin, padding, blockGap)
  - [ ] `__experimentalBorder` (color, radius, style, width)
  - [ ] `align` (wide, full) if needed
  - [ ] `anchor` for direct linking
- [ ] Set `"html": false` in supports
- [ ] Verify all attributes are defined

### 2. Update index.js
- [ ] Import metadata from block.json
- [ ] Use `registerBlockType(metadata.name, { ...metadata })`
- [ ] Remove hardcoded icon/title/description (now in block.json)

### 3. Reorganize edit.js Controls
- [ ] Separate into two InspectorControls:
  - [ ] General tab: `<InspectorControls>`
  - [ ] Style tab: `<InspectorControls group="styles">`
- [ ] Add `<BlockControls>` for toolbar items (if applicable)
- [ ] Use WordPress native components:
  - [ ] Replace custom color pickers with `PanelColorSettings`
  - [ ] Replace custom unit controls with `__experimentalUnitControl`
  - [ ] Replace custom box controls with `__experimentalBoxControl`
  - [ ] Use `AlignmentToolbar` for alignment

### 4. Organize Controls by Tab

**General Tab Should Include:**
- [ ] Content controls (text, options, selections)
- [ ] Functionality toggles (show/hide features)
- [ ] Query/filter settings
- [ ] Display options (layout, ordering)

**Style Tab Should Include:**
- [ ] Color settings (all PanelColorSettings)
- [ ] Border settings (radius, width, style, color)
- [ ] Spacing settings (margin, padding)
- [ ] Typography overrides (if beyond FSE defaults)
- [ ] Visual effects (shadows, opacity, etc.)

### 5. Update save.js
- [ ] Match JSX structure with edit.js
- [ ] Use same class names
- [ ] Apply inline styles consistently
- [ ] Handle CSS variables for hover states
- [ ] Test that attributes save correctly

### 6. Test the Block
- [ ] Build: `npm run build`
- [ ] Editor Tests:
  - [ ] Block inserts without errors
  - [ ] Controls appear in correct tabs
  - [ ] Changes reflect in editor preview
  - [ ] Theme colors appear in color picker
  - [ ] No console errors
- [ ] Frontend Tests:
  - [ ] Block renders correctly
  - [ ] All styles apply
  - [ ] Hover states work
  - [ ] Responsive design maintained
  - [ ] No console errors

### 7. Theme Integration
- [ ] Test with multiple themes
- [ ] Verify theme.json color palette integration
- [ ] Check typography inheritance
- [ ] Test with FSE themes

---

## 🎯 Specific Block Checklists

### Contributors Block
**Priority:** High

#### To-Do:
- [ ] Create block.json with FSE supports
- [ ] Update edit.js:
  - [ ] General tab: contributor selection, layout (grid/list), count
  - [ ] Style tab: colors, avatar size, typography, spacing
- [ ] Add `PanelColorSettings` for name and description colors
- [ ] Add spacing controls for avatar-to-text gap
- [ ] Test with different contributor counts
- [ ] Verify frontend matches editor

#### Control Organization:
```
General Tab:
├── Layout Settings
│   ├── Display Style (grid/list)
│   ├── Columns (if grid)
│   └── Contributors per page
├── Contributor Selection
│   ├── Which contributors to show
│   └── Order/sorting
└── Display Options
    ├── Show avatar
    ├── Show name
    └── Show description

Style Tab:
├── Colors
│   ├── Name color
│   ├── Description color
│   └── Background color
├── Typography
│   ├── Name font size
│   └── Description font size
├── Avatar Settings
│   ├── Avatar size
│   └── Avatar border radius
└── Spacing
    ├── Item spacing
    └── Content padding
```

---

### TableOfContents Block
**Priority:** High (partial update needed)

#### To-Do:
- [ ] Review Inspector.js
- [ ] Move these to Style tab:
  - [ ] All ColorPicker components
  - [ ] Container background color
  - [ ] Title color/font settings
  - [ ] List color/font settings
- [ ] Keep in General tab:
  - [ ] TOC title text
  - [ ] Supported heading tags
  - [ ] Hierarchy toggle
  - [ ] Numbering toggle
  - [ ] Mobile collapsible
  - [ ] Smooth scroll
  - [ ] Sticky mode
- [ ] Update block.json FSE supports (may already exist)
- [ ] Test both tabs work correctly

#### Current Issues:
- ❌ Color controls in General tab (should be in Style)
- ❌ Style controls mixed with content controls
- ✅ Already has block.json

---

### HelpfulModal Block
**Priority:** Medium

#### To-Do:
- [ ] Create block.json
- [ ] Add FSE supports
- [ ] General tab:
  - [ ] Modal trigger text/button
  - [ ] Modal content
  - [ ] Display conditions
- [ ] Style tab:
  - [ ] Modal colors (background, overlay)
  - [ ] Button colors
  - [ ] Border/shadow
  - [ ] Animation settings

---

### HelpfulFeedback Block
**Priority:** Medium

#### To-Do:
- [ ] Create block.json
- [ ] Add FSE supports
- [ ] General tab:
  - [ ] Feedback question text
  - [ ] Response options (helpful/not helpful)
  - [ ] Thank you message
- [ ] Style tab:
  - [ ] Button colors
  - [ ] Icon colors
  - [ ] Typography
  - [ ] Spacing

---

### SocialShare Block
**Priority:** Low

#### To-Do:
- [ ] Create block.json
- [ ] Add FSE supports
- [ ] General tab:
  - [ ] Which platforms to show
  - [ ] Display style (icons only/with text)
  - [ ] Icon size
- [ ] Style tab:
  - [ ] Icon colors
  - [ ] Button styles
  - [ ] Spacing between icons
  - [ ] Hover effects

---

## 🔄 Common Patterns

### Pattern 1: Color Settings
```jsx
// In Style Tab
<InspectorControls group="styles">
  <PanelBody title={__('Colors', 'wedocs')}>
    <PanelColorSettings
      title={__('Color Settings', 'wedocs')}
      colorSettings={[
        {
          value: backgroundColor,
          onChange: (value) => setAttributes({ backgroundColor: value }),
          label: __('Background Color', 'wedocs'),
        },
        {
          value: textColor,
          onChange: (value) => setAttributes({ textColor: value }),
          label: __('Text Color', 'wedocs'),
        },
      ]}
    />
  </PanelBody>
</InspectorControls>
```

### Pattern 2: Spacing Controls
```jsx
// In Style Tab
<BoxControl
  label={__('Padding', 'wedocs')}
  values={padding}
  onChange={(value) => setAttributes({ padding: value })}
/>

<BoxControl
  label={__('Margin', 'wedocs')}
  values={margin}
  onChange={(value) => setAttributes({ margin: value })}
/>
```

### Pattern 3: Unit Controls
```jsx
<UnitControl
  label={__('Width', 'wedocs')}
  value={width}
  onChange={(value) => setAttributes({ width: value })}
  units={[
    { value: '%', label: '%' },
    { value: 'px', label: 'px' },
    { value: 'vw', label: 'vw' },
  ]}
/>
```

---

## 🧪 Testing Commands

```bash
# Development build with watch
npm run start

# Production build
npm run build

# Lint JS files
npm run lint:js

# Lint CSS files
npm run lint:css
```

---

## 📚 References

- [Block API Reference](https://developer.wordpress.org/block-editor/reference-guides/block-api/)
- [Block Supports](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/)
- [Components](https://developer.wordpress.org/block-editor/reference-guides/components/)
- [InspectorControls](https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/block-controls-toolbar-and-sidebar/)

---

**Print this checklist and check off items as you complete each block!**
