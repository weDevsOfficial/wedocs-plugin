# Version Filtering Fix - Quick Start Guide

## Problem Fixed
✅ **Issue**: All versions were showing the same (latest) documentation
✅ **Solution**: Added filtering to ensure each version shows only its assigned documentation

## What Changed

### Modified Files
- `includes/functions.php` - Added version filtering functions

### New Files
- `VERSION_FIX_SUMMARY.md` - Technical documentation of the fix

## How to Test

### Quick Test (5 minutes)

1. **Create Two Versions**
   - Go to: `Docs → Versions`
   - Add "Version 1.0" (slug: `v1-0`)
   - Add "Version 2.0" (slug: `v2-0`)

2. **Create Version-Specific Docs**
   - Create a doc called "Feature A" and assign it to v1.0 only
   - Create a doc called "Feature B" and assign it to v2.0 only
   - Create a doc called "Common Feature" and assign it to both versions

3. **Test Version Switching**
   - Visit any documentation page
   - Use the version dropdown to select "Version 1.0"
   - ✅ Sidebar should show only "Feature A" and "Common Feature"
   - Switch to "Version 2.0"
   - ✅ Sidebar should show only "Feature B" and "Common Feature"

### Expected Behavior

#### ✅ When v1.0 is selected (`?version=v1-0`):
- Sidebar navigation shows only v1.0 docs
- Child articles section shows only v1.0 children
- Search results include only v1.0 docs
- Shortcode displays only v1.0 docs

#### ✅ When v2.0 is selected (`?version=v2-0`):
- Sidebar navigation shows only v2.0 docs
- Child articles section shows only v2.0 children
- Search results include only v2.0 docs
- Shortcode displays only v2.0 docs

#### ✅ When no version is selected:
- All docs are shown (normal behavior)
- Version dropdown still works

## How It Works

The fix adds two smart filters:

1. **`wedocs_filter_pages_by_version()`** - Filters sidebar, child lists, and shortcodes
2. **`wedocs_filter_query_by_version()`** - Filters all WP_Query searches for docs

Both filters:
- Detect the `?version=` URL parameter
- Only show docs assigned to that specific version
- Work automatically without breaking existing functionality
- Don't affect admin area or non-versioned docs

## Troubleshooting

### Problem: Version selector doesn't show
**Solution**: Ensure at least 2 versions exist and the doc is assigned to at least one version

### Problem: Switching versions shows no docs
**Solution**: Make sure you've assigned docs to that version in the admin

### Problem: Some docs appear in all versions
**Solution**: Check the doc's version assignments - it may be assigned to multiple versions

## Support

For detailed technical documentation, see:
- `VERSION_FIX_SUMMARY.md` - Complete technical details and test cases
- `VERSIONING.md` - User guide for the versioning feature

## Performance

- ✅ No database changes required
- ✅ Minimal performance impact (one taxonomy lookup per page)
- ✅ Filters at database level (efficient)
- ✅ Backward compatible with existing docs

## Next Steps

1. Test the fix with your documentation structure
2. Verify all versions show correct content
3. Update any custom code that queries docs (if needed)
4. Consider clearing cache if using caching plugins
