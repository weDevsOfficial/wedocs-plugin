# weDocs REST API Reference

All endpoints use the WordPress REST API under the `wp/v2` namespace. Authentication follows standard WordPress REST API conventions (cookie auth, application passwords, or nonce-based auth).

---

## Docs API

**Controller:** `WeDevs\WeDocs\API\API`
**Base:** `/wp/v2/docs`

---

### `POST /wp/v2/docs/{id}/feedback`

Submit feedback on a documentation article.

**Since:** 1.0

**Permission:** Passes `create_item_permissions_check` (checks user creation capabilities).

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | integer | Yes (URL) | The documentation post ID. |
| `name` | string | No | Sender's name. |
| `email` | string (email) | No | Sender's email address. |
| `subject` | string | Yes | Feedback subject line. |
| `message` | string | Yes | Feedback message body. |

#### Response

Success response with feedback status.

---

### `PUT /wp/v2/docs/{id}/helpfullness`

Mark a documentation article as helpful or not helpful.

**Since:** 1.0

**Permission:** `helpful_update_permissions_check`

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | integer | Yes (URL) | The documentation post ID. |
| `type` | string | Yes | Vote type. Must be `positive` or `negative`. |

#### Response

Updated helpfulness data.

---

### `DELETE /wp/v2/docs/{id}/`

Delete a documentation article.

**Since:** 1.0

**Permission:** `delete_item_permissions_check` (standard WordPress delete capability for the post).

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | integer | Yes (URL) | The documentation post ID. |
| `force` | boolean | No | Whether to bypass trash and force deletion. Default: `false`. |

#### Response

The deleted post data.

---

### `GET /wp/v2/docs/{id}/parents`

Retrieve the parent hierarchy of a documentation article.

**Since:** 1.0

**Permission:** `get_parents_permissions_check`

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | integer | Yes (URL) | The documentation post ID. |

#### Response

Array of parent posts in hierarchical order.

---

### `GET /wp/v2/docs/helpfulness`

Get a list of documentation articles with helpfulness data.

**Since:** 1.0

**Permission:** Public (no authentication required).

#### Parameters

None.

#### Response

Array of docs with their helpfulness statistics.

---

### `GET /wp/v2/docs/contributors`

Get a list of documentation contributors.

**Since:** 1.0

**Permission:** Public (no authentication required).

#### Parameters

None.

#### Response

Array of contributor user data.

---

### `GET /wp/v2/docs/search`

Search across documentation articles.

**Since:** 1.0

**Permission:** Public (no authentication required).

#### Parameters

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `query` | string | Yes | — | Search query string. |
| `in` | integer | No | — | Limit search to children of this parent doc ID. |
| `page` | integer | No | `1` | Page number for pagination. Minimum: `1`. |
| `per_page` | integer | No | `10` | Results per page. Range: `1`–`100`. |

#### Response

Array of matching documentation posts with pagination headers.

---

### `GET /wp/v2/docs/sorting_status`

Get the current sorting status.

**Since:** 2.0.0

**Permission:** `sortable_item_permissions_check` (requires `edit_docs` capability).

#### Parameters

None.

#### Response

The current sorting status (boolean).

---

### `POST /wp/v2/docs/sorting_status`

Update sorting status and reorder documentation.

**Since:** 2.0.0

**Permission:** `sortable_item_permissions_check` (requires `edit_docs` capability).

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sortable_status` | boolean | Yes | Whether sorting is active. |
| `documentations` | object | Yes | Object containing documentation items with their new order. Each item has `id` (int). |

#### Response

Updated sorting status.

---

### `GET /wp/v2/docs/need_sorting_status`

Check if documentation needs re-sorting.

**Since:** 2.0.0

**Permission:** `sortable_item_permissions_check` (requires `edit_docs` capability).

#### Parameters

None.

#### Response

Boolean indicating whether sorting is needed.

---

### `POST /wp/v2/docs/need_sorting_status`

Update whether documentation needs re-sorting.

**Since:** 2.0.0

**Permission:** `sortable_item_permissions_check` (requires `edit_docs` capability).

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `need_sortable_status` | boolean | Yes | Whether sorting is needed. |

#### Response

The updated status.

---

### `POST /wp/v2/docs/update_docs_status`

Bulk update the publish status of multiple documentation articles.

**Since:** 2.0.2

**Permission:** `sortable_item_permissions_check` (requires `edit_docs` capability).

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `data` | object | Yes | Object containing: |
| `data.docIds` | object | Yes | Object of documentation post IDs. |
| `data.status` | string | Yes | The new post status to apply. |

#### Response

Success confirmation.

---

### `GET /wp/v2/docs/promotion-notice`

Get the current promotional notice data.

**Since:** 2.0.0

**Permission:** `get_promotional_notice_check` (admin only).

#### Parameters

None.

#### Response

Promotional notice data or empty if no active promotion.

---

### `POST /wp/v2/docs/hide-promotion-notice`

Dismiss/hide the current promotional notice.

**Since:** 2.0.0

**Permission:** `get_promotional_notice_check` (admin only).

#### Parameters

None.

#### Response

Success confirmation.

---

### `POST /wp/v2/docs/ai/generate`

Generate documentation content using AI.

**Since:** 2.1.15

**Permission:** `ai_generate_permissions_check` (admin only).

#### Parameters

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `prompt` | string | Yes | — | The text prompt for content generation. |
| `provider` | string | No | Configured default | AI provider slug (`openai`, `anthropic`, `google`). |
| `model` | string | No | Provider default | Specific model ID to use. |
| `maxTokens` | integer | No | `2000` | Maximum tokens in the response. |
| `temperature` | number | No | `0.7` | Sampling temperature (0–1). |
| `systemPrompt` | string | No | — | System-level instructions for the AI. |

#### Response

Generated content from the AI provider.

---

## Settings API

**Controller:** `WeDevs\WeDocs\API\SettingsApi`
**Base:** `/wp/v2/docs/settings`

---

### `GET /wp/v2/docs/settings`

Retrieve plugin settings.

**Since:** 2.0.0

**Permission:** `manage_options` capability required.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `data` | string | No | Settings key to retrieve. Use `wedocs_settings` to get all settings. |

#### Response

The settings data object.

---

### `POST /wp/v2/docs/settings`

Save plugin settings.

**Since:** 2.0.0

**Permission:** `manage_options` capability required.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `settings` | object | Yes | The settings data to save. |
| `upgrade` | boolean | No | Whether this is an upgrade-related settings update. |

#### Response

The saved settings data (after filtering).

#### Hooks Fired

- `wedocs_settings_data` — Filter applied to settings before saving.
- `wedocs_settings_data_rest_response` — Filter applied to the response.
- `wedocs_settings_data_updated` — Action fired after settings are saved.

---

### `GET /wp/v2/docs/settings/turnstile-site-key`

Get the Cloudflare Turnstile site key for the assistant widget.

**Since:** 2.0.0

**Permission:** Public (no authentication required).

#### Parameters

None.

#### Response

The Turnstile site key string (empty string if not configured).

---

## Upgrader API

**Controller:** `WeDevs\WeDocs\API\UpgraderApi`
**Base:** `/wp/v2/docs/upgrade`

---

### `GET /wp/v2/docs/upgrade`

Check if a database upgrade is needed and get the current upgrade status.

**Since:** 2.0.0

**Permission:** `read` capability required.

#### Parameters

None.

#### Response

```json
{
    "status": "running|close|null",
    "need_upgrade": true|false
}
```

---

### `POST /wp/v2/docs/upgrade`

Trigger the database upgrade process. Enqueues an async action via Action Scheduler.

**Since:** 2.0.0

**Permission:** `manage_options` capability required.

#### Parameters

None.

#### Response

```json
{
    "message": "Processing Upgrade in the background."
}
```

---

### `POST /wp/v2/docs/upgrade/done`

Mark the database upgrade process as complete.

**Since:** 2.0.0

**Permission:** `manage_options` capability required.

#### Parameters

None.

#### Response

Boolean indicating whether the option was updated successfully.
