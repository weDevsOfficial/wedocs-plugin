# Quick Reference: Block Supports Configuration

Quick guide for adding proper supports to new or existing blocks.

## Choose Your Support Level

### 🎨 Full Design Standards
**When to use:** Feature-rich content blocks needing maximum customization
```json
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
      "radius": true
    }
  }
}
```
**Examples:** AISummary, AdvanceContributors

---

### ⭐ Enhanced Supports
**When to use:** Standard blocks needing good customization options
```json
"supports": {
  "html": false,
  "anchor": true,
  "align": ["wide", "full"],
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
      "radius": true
    }
  }
}
```
**Examples:** Contributors, DocsGrid, HelpfulFeedback, Search, TableOfContents

---

### 📝 Text Block Supports
**When to use:** Text-based blocks with directional alignment
```json
"supports": {
  "html": false,
  "anchor": true,
  "align": ["left", "center", "right", "wide", "full"],
  "color": {
    "background": true,
    "text": true,
    "__experimentalDefaultControls": {
      "text": true
    }
  },
  "typography": {
    "fontSize": true,
    "lineHeight": true,
    "__experimentalFontFamily": true,
    "__experimentalFontWeight": true,
    "__experimentalDefaultControls": {
      "fontSize": true
    }
  },
  "spacing": {
    "margin": true,
    "padding": true,
    "__experimentalDefaultControls": {
      "padding": true,
      "margin": true
    }
  }
}
```
**Examples:** LastUpdated, DocActions (with border), FontSizeSwitcher (with blockGap)

---

### 🔧 Widget Supports
**When to use:** Utility blocks with minimal styling needs
```json
"supports": {
  "html": false,
  "anchor": true,
  "align": ["left", "center", "right", "wide", "full"],
  "spacing": {
    "margin": true,
    "padding": true,
    "__experimentalDefaultControls": {
      "padding": true,
      "margin": true
    }
  }
}
```

---

### 🎯 Singleton Supports
**When to use:** Blocks that should appear only once per page
```json
"supports": {
  "html": false,
  "multiple": false,
  // ... combine with other supports as needed
}
```
**Examples:** ReadingProgress, FontSizeSwitcher

---

## Common Additions

### Add Border Support
```json
"__experimentalBorder": {
  "color": true,
  "radius": true,
  "style": true,
  "width": true,
  "__experimentalDefaultControls": {
    "color": true,
    "radius": true
  }
}
```

### Add Block Gap (for container blocks)
```json
"spacing": {
  "margin": true,
  "padding": true,
  "blockGap": true,  // ← Add this line
  "__experimentalDefaultControls": {
    "padding": true,
    "margin": true
  }
}
```

### Add Gradient Support
```json
"color": {
  "background": true,
  "text": true,
  "link": true,
  "gradients": true,  // ← Add this line
  "__experimentalDefaultControls": {
    "background": true,
    "text": true
  }
}
```

---

## Decision Tree

```
Is this a singleton block (only 1 per page)?
├─ Yes → Add "multiple": false
└─ No  → Continue

Does it display text content?
├─ Yes → Use Text Block Supports (left/center/right alignment)
└─ No  → Continue

Does it need extensive styling?
├─ Yes → Use Full Design Standards
└─ No  → Use Enhanced Supports

Is it a container block?
├─ Yes → Add blockGap to spacing
└─ No  → Standard spacing is fine

Does it need borders?
├─ Yes → Add __experimentalBorder
└─ No  → Omit border controls
```

---

## Checklist for New Blocks

- [ ] Choose appropriate support level
- [ ] Add `"html": false` (always)
- [ ] Add `"anchor": true` (for linking)
- [ ] Choose alignment type (directional vs wide/full)
- [ ] Add color controls
- [ ] Add typography controls
- [ ] Add spacing controls
- [ ] Add border controls (if needed)
- [ ] Add `"multiple": false` (if singleton)
- [ ] Add `"blockGap": true` (if container)
- [ ] Set appropriate default controls
- [ ] Test in editor
- [ ] Verify frontend display

---

## Default Controls Guidelines

Always set these for better UX:

### Color
```json
"__experimentalDefaultControls": {
  "background": true,
  "text": true
}
```

### Typography
```json
"__experimentalDefaultControls": {
  "fontSize": true,
  // Add others as needed
}
```

### Spacing
```json
"__experimentalDefaultControls": {
  "padding": true,
  "margin": true
}
```

### Border
```json
"__experimentalDefaultControls": {
  "color": true,
  "radius": true
}
```

---

## Testing After Adding Supports

1. **Editor Test**
   - Load block in editor
   - Open all control panels
   - Verify controls appear and function
   - Check for console errors

2. **Frontend Test**
   - Save and view on frontend
   - Verify styles apply
   - Test responsive behavior
   - Check theme compatibility

3. **Pattern Test**
   - Try different control combinations
   - Test extreme values
   - Verify defaults work

---

## Common Mistakes to Avoid

❌ **Don't:** Mix old and new border syntax
```json
// Bad
"border": { ... },
"__experimentalBorder": { ... }
```

❌ **Don't:** Forget default controls
```json
// Bad - users won't see controls by default
"color": {
  "background": true,
  "text": true
  // Missing __experimentalDefaultControls
}
```

❌ **Don't:** Add unnecessary controls
```json
// Bad - simple text block doesn't need gradients
"color": {
  "gradients": true  // Overkill
}
```

✅ **Do:** Match support level to block purpose
✅ **Do:** Test with different themes
✅ **Do:** Document any special requirements

---

## Need Help?

- 📖 Full documentation: `COMMON_SUPPORTS_README.md`
- 🎨 Implementation details: `BLOCK_DESIGN_STANDARDS_COMPLETE.md`
- 💻 Code reference: `src/blocks/common-supports.js`
- 🌐 WordPress docs: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/
