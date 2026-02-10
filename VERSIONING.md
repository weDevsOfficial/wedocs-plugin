# Article Versioning in weDocs

This document explains how to use the article versioning feature in weDocs.

## Overview

The article versioning feature allows you to manage multiple versions of your documentation for different software releases or product versions. This is particularly useful when you need to maintain documentation for both current and legacy versions of your software.

## How to Use

### 1. Creating Versions

1. Go to **Docs → Versions** in your WordPress admin panel
2. Click **Add New Version**
3. Enter a version name (e.g., "v1.0", "v2.0", "Latest")
4. Optionally add a slug (e.g., "v1-0", "v2-0", "latest")
5. Click **Add New Version**

### 2. Assigning Versions to Documentation

When creating or editing a documentation article:

1. Look for the **Versions** box in the sidebar (similar to Categories or Tags)
2. Check the version(s) that this documentation applies to
3. You can assign multiple versions to a single article if the content applies to multiple releases
4. Save or update your documentation

### 3. Viewing Versioned Documentation

When viewing a documentation page:

- If the article is associated with multiple versions, a version selector will appear:
  - Below the breadcrumbs in the main content area
  - In the sidebar navigation

- The version selector only appears when:
  - At least 2 versions exist in your system
  - The current article is assigned to at least one version

### 4. Switching Between Versions

Users can switch between versions by:

1. Using the version dropdown selector
2. Selecting a different version from the dropdown
3. The page will reload with the version parameter in the URL (e.g., `?version=v2-0`)

## Best Practices

### Version Naming

- Use clear, descriptive version names (e.g., "v2.1", "2024.1", "Latest")
- Keep version slugs URL-friendly (e.g., "v2-1", "2024-1", "latest")
- Consider using semantic versioning (Major.Minor.Patch)

### Content Organization

1. **Create a "Latest" version**: Always maintain a "Latest" or "Current" version for your most up-to-date documentation
2. **Duplicate content when needed**: When releasing a new version, duplicate the documentation and update only what's changed
3. **Mark deprecated versions**: Consider adding a note to older versions that they're for legacy releases
4. **Archive old versions**: If a version is no longer supported, you can unassign it from docs or delete it

### URL Structure

The version selector adds a query parameter to the URL:
```
https://example.com/docs/article-name/?version=v2-0
```

This allows users to:
- Bookmark specific versions
- Share links to version-specific documentation
- Have better SEO for different versions

## Example Workflow

Let's say you're documenting a WordPress plugin:

1. **Initial Setup** (Plugin v1.0 released):
   - Create version "v1.0"
   - Write documentation and assign to "v1.0"

2. **New Release** (Plugin v2.0 released):
   - Create version "v2.0"
   - Review existing documentation:
     - Articles that haven't changed: assign to both "v1.0" and "v2.0"
     - Articles with changes: create new versions and assign to "v2.0" only
     - Keep old articles assigned to "v1.0" for legacy users

3. **Ongoing Maintenance**:
   - New features: Create docs and assign to "v2.0"
   - Bug fixes: Update docs assigned to "v2.0"
   - Deprecation: Remove version assignments from very old versions

## Technical Details

- **Taxonomy**: Versions are implemented as a custom taxonomy (`doc_version`)
- **Hierarchical**: Versions support parent-child relationships if needed
- **REST API**: Versions are available via WordPress REST API
- **Backward Compatible**: Existing documentation without versions will continue to work normally

## Troubleshooting

### Version selector doesn't appear

- Ensure you have created at least 2 versions
- Verify the current article is assigned to at least one version
- Check that versions are published (not in draft)

### Version switching doesn't work

- Clear your browser cache
- Check JavaScript console for errors
- Ensure the version slug is URL-friendly (no special characters)

## Future Enhancements

Potential future improvements to the versioning system:

- Version-specific styling or banners
- Automatic version detection based on URL structure
- Version comparison tools
- Version-based search filtering
- Default version settings

## Support

For questions or issues with the versioning feature:

- Visit [weDocs Documentation](https://wedocs.co/docs/)
- Get support at [weDocs Support](https://wedocs.co/get-support/)
- Report bugs on [GitHub](https://github.com/weDevsOfficial/wedocs-plugin/issues)
