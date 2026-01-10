# Common Block Supports - Usage Guide

This document explains how to use the common supports configuration for consistent block design standards.

## Overview

The `common-supports.js` file provides reusable support configurations that can be referenced in `block.json` files to ensure consistency across all blocks in the weDocs plugin.

## Available Support Configurations

### 1. Full Design Supports
**Use for:** Feature-rich content blocks that need all design controls

```json
{
  "supports": {
    "html": false,
    "anchor": true,
    "align": ["wide", "full"],
    "color": { ... },
    "typography": { ... },
    "spacing": { ... },
    "border": { ... }
  }
}
```

**Applied to:**
- AISummary block
- AdvanceContributors block

### 2. Enhanced Supports
**Use for:** Standard content blocks with core design controls

```json
{
  "supports": {
    "html": false,
    "anchor": true,
    "align": ["wide", "full"],
    "color": { ... },
    "typography": { ... },
    "spacing": { ... },
    "__experimentalBorder": { ... }
  }
}
```

**Applied to:**
- Contributors block
- DocsGrid block
- HelpfulFeedback block
- Search block
- TableOfContents block

### 3. Text Block Supports
**Use for:** Text-based blocks with directional alignment

```json
{
  "supports": {
    "html": false,
    "anchor": true,
    "align": ["left", "center", "right", "wide", "full"],
    "color": { ... },
    "typography": { ... },
    "spacing": { ... }
  }
}
```

**Applied to:**
- LastUpdated block
- DocActions block
- FontSizeSwitcher block
- SocialShare block

### 4. Widget Supports
**Use for:** Utility/widget blocks with basic controls

```json
{
  "supports": {
    "html": false,
    "anchor": true,
    "align": ["left", "center", "right", "wide", "full"],
    "spacing": { ... }
  }
}
```

### 5. Singleton Supports
**Use for:** Blocks that should only appear once per page

```json
{
  "supports": {
    "html": false,
    "multiple": false
  }
}
```

**Applied to:**
- ReadingProgress block
- FontSizeSwitcher block

## Design Standards Summary

### ✅ Full Design Standards
These blocks have the most comprehensive design controls:
- **AISummary** - AI-powered content summaries
- **AdvanceContributors** - Enhanced contributor display

### ✅ Enhanced Supports
These blocks have core design controls sufficient for their purpose:
- **Contributors** - Basic contributor display
- **DocsGrid** - Documentation grid layout
- **HelpfulFeedback** - Feedback voting system
- **Search** - Search functionality
- **TableOfContents** - Dynamic TOC

### ✅ Text Block Supports
These blocks have text-focused design controls:
- **LastUpdated** - Last updated date display
- **DocActions** - Action buttons
- **FontSizeSwitcher** - Font size controls (with singleton)
- **SocialShare** - Social sharing buttons
- **ReadingProgress** - Progress bar (with singleton)

## Block Support Features

### Color Controls
- Background color
- Text color
- Link color
- Gradients (for full design supports)

### Typography Controls
- Font size
- Line height
- Font family
- Font weight
- Font style (full supports)
- Text transform (full supports)
- Text decoration (full supports)
- Letter spacing (full supports)

### Spacing Controls
- Margin
- Padding
- Block gap

### Border Controls
- Border color
- Border radius
- Border style
- Border width

### Alignment Options
- **Wide/Full:** For content that can span the full width
- **Left/Center/Right:** For text and widget blocks
- **Anchor:** For linking to specific sections

## Implementation Status

All blocks have been updated with appropriate design standards:

| Block | Status | Support Type |
|-------|--------|-------------|
| AISummary | ✅ Updated | Full Design |
| AdvanceContributors | ✅ Updated | Full Design |
| Contributors | ✅ Verified | Enhanced |
| DocActions | ✅ Updated | Text Block + Border |
| DocsGrid | ✅ Verified | Enhanced |
| FontSizeSwitcher | ✅ Updated | Text Block + Singleton |
| HelpfulFeedback | ✅ Verified | Enhanced |
| LastUpdated | ✅ Verified | Text Block |
| ReadingProgress | ✅ Updated | Text Block + Singleton |
| Search | ✅ Verified | Enhanced |
| SocialShare | ✅ Updated | Text Block + Border |
| TableOfContents | ✅ Verified | Enhanced |

## Benefits

1. **Consistency** - All blocks follow the same design patterns
2. **Maintainability** - Changes to common patterns are easy to implement
3. **Performance** - Standardized controls improve editor performance
4. **User Experience** - Consistent controls across all blocks
5. **Accessibility** - Standard WordPress controls ensure accessibility

## Next Steps

After building the plugin:
1. Test each block in the editor
2. Verify all controls are working as expected
3. Check that saved blocks maintain their styling
4. Ensure responsive design works correctly
5. Validate accessibility features

## Reference

For WordPress block supports documentation, see:
https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/
