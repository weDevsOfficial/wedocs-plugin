# weDocs Hooks Reference

This document lists all action and filter hooks available in weDocs for developers to extend and customize the plugin's behavior.

---

## Action Hooks

### `wedocs_before_main_content`

Fires before the main documentation content on the single doc template.

**Since:** 1.4

**File:** `templates/single-docs.php`

#### Description

This action runs before the main content area on single documentation pages. By default, `wedocs_template_wrapper_start` is hooked at priority 10 to output the opening wrapper markup.

#### Default Hooked Callbacks

| Callback | Priority |
|----------|----------|
| `wedocs_template_wrapper_start` | 10 |

#### Parameters

None.

#### Example

```php
add_action( 'wedocs_before_main_content', function () {
    echo '<div class="my-custom-wrapper">';
}, 5 );
```

---

### `wedocs_after_main_content`

Fires after the main documentation content on the single doc template.

**Since:** 1.4

**File:** `templates/single-docs.php`

#### Description

This action runs after the main content area on single documentation pages. By default, `wedocs_template_wrapper_end` is hooked at priority 10 to output the closing wrapper markup.

#### Default Hooked Callbacks

| Callback | Priority |
|----------|----------|
| `wedocs_template_wrapper_end` | 10 |

#### Parameters

None.

#### Example

```php
add_action( 'wedocs_after_main_content', function () {
    echo '</div><!-- .my-custom-wrapper -->';
}, 15 );
```

---

### `wedocs_settings_data_updated`

Fires after plugin settings have been saved via the REST API.

**Since:** 2.0.0

**File:** `includes/API/SettingsApi.php`

#### Description

This action is triggered after weDocs settings are saved to the `wedocs_settings` option. It receives the filtered settings data that was just stored.

#### Parameters

- **$settings_data** (array) — The settings data that was saved, after being passed through the `wedocs_settings_data` filter.

#### Example

```php
add_action( 'wedocs_settings_data_updated', function ( $settings_data ) {
    // Flush rewrite rules when settings change.
    flush_rewrite_rules();
} );
```

---

## Filter Hooks

### `wedocs_theme_dir_path`

Filters the theme directory path used for template overrides.

**Since:** 1.0

**File:** `wedocs.php`

#### Parameters

- **$path** (string) — Theme directory name. Default: `'wedocs/'`.

#### Example

```php
add_filter( 'wedocs_theme_dir_path', function ( $path ) {
    return 'my-custom-docs/';
} );
```

---

### `wedocs_post_type`

Filters the arguments passed to `register_post_type()` for the `docs` post type.

**Since:** 1.0

**File:** `includes/Post_Types.php`

#### Parameters

- **$args** (array) — The post type registration arguments.

#### Example

```php
add_filter( 'wedocs_post_type', function ( $args ) {
    $args['exclude_from_search'] = true;
    return $args;
} );
```

---

### `wedocs_shortcode_page_parent_args`

Filters the query arguments used to retrieve parent documentation pages in the shortcode.

**Since:** 2.0.0

**File:** `includes/Shortcode.php`

#### Parameters

- **$parent_args** (array) — Arguments passed to `get_pages()`.

#### Example

```php
add_filter( 'wedocs_shortcode_page_parent_args', function ( $args ) {
    $args['sort_column'] = 'post_title';
    return $args;
} );
```

---

### `wedocs_shortcode_page_section_args`

Filters the query arguments used to retrieve section (child) docs in the shortcode.

**Since:** 2.0.0

**File:** `includes/Shortcode.php`

#### Parameters

- **$section_args** (array) — Arguments passed to `get_children()`.

#### Example

```php
add_filter( 'wedocs_shortcode_page_section_args', function ( $args ) {
    $args['numberposts'] = 20;
    return $args;
} );
```

---

### `wedocs_get_doc_listing_template_dir`

Filters the template file name used for the docs listing shortcode output.

**Since:** 2.0.0

**File:** `includes/Shortcode.php`

#### Parameters

- **$template_dir** (string) — Template file name. Default: `'shortcode.php'`.

#### Example

```php
add_filter( 'wedocs_get_doc_listing_template_dir', function ( $template ) {
    return 'custom-shortcode.php';
} );
```

---

### `wedocs_set_template_path`

Filters the base file system path where weDocs looks for template files.

**Since:** 2.0.0

**File:** `includes/functions.php`

#### Parameters

- **$path** (string) — The plugin's template directory path.
- **$template** (string) — The resolved template file path (may be empty).
- **$args** (array) — Template arguments.

#### Example

```php
add_filter( 'wedocs_set_template_path', function ( $path, $template, $args ) {
    return '/custom/path/to/templates';
}, 10, 3 );
```

---

### `wedocs_get_template_part`

Filters the resolved template file path before it is included.

**Since:** 2.0.0

**File:** `includes/functions.php`

#### Parameters

- **$template** (string) — Full path to the template file.
- **$slug** (string) — The template slug.
- **$name** (string) — The template name.

#### Example

```php
add_filter( 'wedocs_get_template_part', function ( $template, $slug, $name ) {
    if ( $slug === 'content' && $name === 'feedback' ) {
        return get_stylesheet_directory() . '/wedocs/content-feedback.php';
    }
    return $template;
}, 10, 3 );
```

---

### `wedocs_breadcrumbs`

Filters the breadcrumb configuration arguments.

**Since:** 1.0

**File:** `includes/functions.php`

#### Parameters

- **$args** (array) — Breadcrumb arguments:
  - **delimiter** (string) — HTML between breadcrumb items.
  - **home** (string) — Home link label. Default: `'Home'`.
  - **before** (string) — HTML before the current item.
  - **after** (string) — HTML after the current item.

#### Example

```php
add_filter( 'wedocs_breadcrumbs', function ( $args ) {
    $args['delimiter'] = '<span class="sep"> / </span>';
    return $args;
} );
```

---

### `wedocs_breadcrumbs_html`

Filters the final breadcrumb HTML output before it is echoed.

**Since:** 1.0

**File:** `includes/functions.php`

#### Parameters

- **$html** (string) — The generated breadcrumb HTML.
- **$args** (array) — The breadcrumb arguments.

#### Example

```php
add_filter( 'wedocs_breadcrumbs_html', function ( $html, $args ) {
    return '<nav aria-label="breadcrumb">' . $html . '</nav>';
}, 10, 2 );
```

---

### `wedocs_translate_text`

Filters translatable text strings, primarily post titles. Useful for multilingual plugins like qTranslate.

**Since:** 1.0

**File:** `includes/functions.php`

#### Parameters

- **$text** (string) — The text to translate.

#### Example

```php
add_filter( 'wedocs_translate_text', function ( $text ) {
    return my_translate_function( $text );
} );
```

---

### `wedocs_email_feedback_to`

Filters the recipient email address for doc feedback emails.

**Since:** 1.2

**File:** `includes/functions.php`

#### Parameters

- **$email_to** (string) — Recipient email address.
- **$doc_id** (int) — The documentation post ID.
- **$document** (WP_Post) — The documentation post object.

#### Example

```php
add_filter( 'wedocs_email_feedback_to', function ( $email_to, $doc_id, $document ) {
    return 'support@example.com';
}, 10, 3 );
```

---

### `wedocs_email_feedback_subject`

Filters the subject line for doc feedback emails.

**Since:** 1.2

**File:** `includes/functions.php`

#### Parameters

- **$subject** (string) — Email subject.
- **$doc_id** (int) — The documentation post ID.
- **$document** (WP_Post) — The documentation post object.
- **$post_data** (array) — The `$_POST` data from the form submission.

#### Example

```php
add_filter( 'wedocs_email_feedback_subject', function ( $subject, $doc_id ) {
    return '[Feedback] ' . get_the_title( $doc_id );
}, 10, 2 );
```

---

### `wedocs_email_feedback_body`

Filters the body content of doc feedback emails.

**Since:** 1.2

**File:** `includes/functions.php`

#### Parameters

- **$email_body** (string) — Email body text.
- **$doc_id** (int) — The documentation post ID.
- **$document** (WP_Post) — The documentation post object.
- **$post_data** (array) — The `$_POST` data from the form submission.

#### Example

```php
add_filter( 'wedocs_email_feedback_body', function ( $body, $doc_id, $document, $post_data ) {
    $body .= "\r\nDoc URL: " . get_permalink( $doc_id );
    return $body;
}, 10, 4 );
```

---

### `wedocs_email_feedback_headers`

Filters the email headers for doc feedback emails.

**Since:** 1.2

**File:** `includes/functions.php`

#### Parameters

- **$headers** (string) — Email headers.
- **$doc_id** (int) — The documentation post ID.
- **$document** (WP_Post) — The documentation post object.
- **$post_data** (array) — The `$_POST` data from the form submission.

#### Example

```php
add_filter( 'wedocs_email_feedback_headers', function ( $headers, $doc_id, $document, $post_data ) {
    $headers .= "CC: manager@example.com\n";
    return $headers;
}, 10, 4 );
```

---

### `wedocs_publish_cap`

Filters the capability required to publish documentation.

**Since:** 1.3

**File:** `includes/functions.php`

#### Parameters

- **$capability** (string) — The capability string. Default: `'manage_categories'`.

#### Example

```php
add_filter( 'wedocs_publish_cap', function ( $cap ) {
    return 'edit_posts';
} );
```

---

### `wedocs_ai_provider_configs`

Filters the AI provider configurations used for content generation.

**Since:** 2.1.15

**File:** `includes/functions.php`

#### Parameters

- **$provider_configs** (array) — Associative array of provider configurations. Each key is a provider slug (`openai`, `anthropic`, `google`) with:
  - **name** (string) — Display name.
  - **endpoint** (string) — API endpoint URL.
  - **models** (array) — Key-value pairs of model ID to label.
  - **requires_key** (bool) — Whether an API key is required.

#### Example

```php
add_filter( 'wedocs_ai_provider_configs', function ( $configs ) {
    // Add a custom AI provider.
    $configs['custom_ai'] = [
        'name'         => 'My Custom AI',
        'endpoint'     => 'https://api.custom-ai.com/v1/generate',
        'models'       => [ 'model-1' => 'Model One' ],
        'requires_key' => true,
    ];
    return $configs;
} );
```

---

### `wedocs_upgrade_popup_content`

Filters the content displayed in the "Free to Pro" upgrade popup.

**Since:** 2.1.19

**File:** `includes/functions.php`

#### Description

See [FILTERS.md](../FILTERS.md) in the plugin root for detailed documentation including default values and 5 usage examples.

#### Parameters

- **$content** (array) — Popup content data with keys: `title`, `subtitle`, `features`, `button_text`, `button_url`, `footer_features`.

---

### `wedocs_display_admin_footer_text`

Filters whether to display the weDocs admin footer text (rating prompt).

**Since:** 1.0

**File:** `includes/Admin/Admin.php`

#### Parameters

- **$display** (bool) — Whether the current screen should show the footer text.

#### Example

```php
add_filter( 'wedocs_display_admin_footer_text', '__return_false' );
```

---

### `wedocs_settings_management_capabilities`

Filters the capability required to access the Settings submenu.

**Since:** 2.0.0

**File:** `includes/Admin/Menu.php`

#### Parameters

- **$capability** (string) — The capability string. Default: the main weDocs menu capability.

#### Example

```php
add_filter( 'wedocs_settings_management_capabilities', function ( $cap ) {
    return 'manage_options';
} );
```

---

### `wedocs_migration_management_capabilities`

Filters the capability required to access the Migration submenu.

**Since:** 2.0.0

**File:** `includes/Admin/Menu.php`

#### Parameters

- **$capability** (string) — The capability string. Default: `'manage_options'`.

#### Example

```php
add_filter( 'wedocs_migration_management_capabilities', function ( $cap ) {
    return 'manage_options';
} );
```

---

### `wedocs_submenu`

Filters the array of admin submenu items before they are registered.

**Since:** 2.0.0

**File:** `includes/Admin/Menu.php`

#### Parameters

- **$all_submenus** (array) — Array of submenu items. Each item is an array of `[ label, capability, menu_slug ]`.

#### Example

```php
add_filter( 'wedocs_submenu', function ( $submenus ) {
    // Add a custom submenu.
    $submenus[] = [
        __( 'Analytics', 'my-plugin' ),
        'manage_options',
        'admin.php?page=wedocs#/analytics',
    ];
    return $submenus;
} );
```

---

### `wedocs_menu_position`

Filters the position of the weDocs admin menu in the sidebar.

**Since:** 2.0.0

**File:** `includes/Admin/Menu.php`

#### Parameters

- **$position** (int) — Menu position. Default: `48`.

#### Example

```php
add_filter( 'wedocs_menu_position', function ( $position ) {
    return 25;
} );
```

---

### `wedocs_settings_data`

Filters settings data before it is saved to the database.

**Since:** 2.0.0

**File:** `includes/API/SettingsApi.php`

#### Parameters

- **$settings_data** (array) — The settings data from the REST request.

#### Example

```php
add_filter( 'wedocs_settings_data', function ( $data ) {
    // Force a specific setting value.
    $data['general']['print'] = 'on';
    return $data;
} );
```

---

### `wedocs_settings_data_rest_response`

Filters the REST API response data after settings have been saved.

**Since:** 2.0.0

**File:** `includes/API/SettingsApi.php`

#### Parameters

- **$settings_data_filtered** (array) — The saved (filtered) settings data.
- **$settings_data** (array) — The original settings data from the request.

#### Example

```php
add_filter( 'wedocs_settings_data_rest_response', function ( $filtered, $original ) {
    $filtered['save_timestamp'] = current_time( 'timestamp' );
    return $filtered;
}, 10, 2 );
```
