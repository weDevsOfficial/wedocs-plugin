# weDocs MCP Integration Guide

**For:** Developers building Model Context Protocol (MCP) clients on top of weDocs  
**Since:** weDocs 2.2.2  
**Namespace:** `wp/v2/docs`

---

## Table of Contents

1. [What is the weDocs Abilities API?](#1-what-is-the-wedocs-abilities-api)
2. [Abilities Matrix](#2-abilities-matrix)
3. [Authentication for MCP Clients](#3-authentication-for-mcp-clients)
4. [Endpoint Reference](#4-endpoint-reference)
5. [MCP Onboarding Flow](#5-mcp-onboarding-flow)
6. [Mapping MCP Actions to Abilities](#6-mapping-mcp-actions-to-abilities)
7. [Graceful Denial Handling](#7-graceful-denial-handling)
8. [Public vs Authenticated Flows](#8-public-vs-authenticated-flows)
9. [Extending Abilities](#9-extending-abilities)
10. [Migration Notes for Existing Integrations](#10-migration-notes-for-existing-integrations)

---

## 1. What is the weDocs Abilities API?

The **Abilities API** is a lightweight discovery layer that tells an MCP client exactly what the currently authenticated user is allowed to do *before* making any mutating API calls. This avoids the pattern of speculatively attempting an action and relying on a `403 Forbidden` error.

Two REST endpoints are exposed:

| Method | URL | Description |
|--------|-----|-------------|
| `GET` | `/wp/v2/docs/abilities` | Global abilities for the current user |
| `GET` | `/wp/v2/docs/{id}/abilities` | Per-doc abilities for the current user |

Both endpoints are **always publicly accessible** and return `false` for every protected ability when called without credentials.

---

## 2. Abilities Matrix

### 2.1 Global abilities (`/wp/v2/docs/abilities`)

| Ability key | `true` when… | Required WordPress capability |
|---|---|---|
| `docs.read` | Always | _(public)_ |
| `docs.read_private` | User can read private docs | `read_private_docs` |
| `docs.create` | User can author new docs | `edit_docs` |
| `docs.edit` | User can edit own docs | `edit_docs` |
| `docs.edit_others` | User can edit other authors' docs | `edit_others_docs` |
| `docs.delete` | User can delete docs | `edit_docs` |
| `docs.publish` | User can publish docs | `publish_docs` |
| `docs.sort` | User can reorder / sort docs | `edit_docs` |
| `docs.search` | Always | _(public)_ |
| `settings.read` | User can view plugin settings | `manage_options` |
| `settings.write` | User can save plugin settings | `manage_options` |
| `ai.generate` | User can generate AI content | `edit_docs` |
| `ai.upload_image` | User can upload images for AI (Pro + upload cap) | `edit_docs` + `upload_files` + Pro active |
| `ai.configure` | User can configure AI providers | `manage_options` |
| `summary.read` | Always | _(public)_ |
| `summary.save` | User can persist AI summaries | `edit_docs` |
| `summary.delete` | User can delete AI summaries | `edit_docs` |
| `summary.generate` | Always (errors if AI not configured) | _(public)_ |
| `notices.manage` | User can view / dismiss admin notices | `manage_options` |
| `helpfulness.vote` | Logged-in users only | _(is_user_logged_in)_ |
| `feedback.submit` | Always | _(public)_ |
| `contributors.read` | Always | _(public)_ |
| `pro_active` | weDocs Pro is installed and active | _(plugin check)_ |

### 2.2 Per-doc abilities (`/wp/v2/docs/{id}/abilities`)

Per-doc abilities take the **post status** into account:

| Status | `read` |
|---|---|
| `publish` | Everyone |
| `private` | Users with `read_private_docs` |
| `draft` / `pending` / `future` | Users with `edit_docs` **or** the post author |
| `trash` | Nobody |

| Ability key | Description |
|---|---|
| `read` | Can read this specific doc |
| `edit` | `current_user_can('edit_post', $id)` |
| `delete` | `current_user_can('delete_post', $id)` |
| `publish` | Has `publish_docs` capability |
| `summary.read` | Same as `read` |
| `summary.save` | `edit` + `edit_docs` |
| `summary.delete` | `edit` + `edit_docs` |
| `summary.generate` | Same as `read` |

---

## 3. Authentication for MCP Clients

weDocs uses **WordPress REST API authentication**. Choose the method that fits your MCP host:

### 3.1 Application Passwords (recommended)

WordPress 5.6+ includes Application Passwords which are ideal for server-to-server integrations.

1. Log in to WordPress admin → **Users → Profile → Application Passwords**.
2. Create a new password, e.g. `My MCP Client`.
3. Send the credentials as HTTP Basic Auth on every request:

```
Authorization: Basic base64(username:application_password)
```

```http
GET /wp-json/wp/v2/docs/abilities HTTP/1.1
Host: example.com
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
```

> **Security note:** Application Passwords only work over HTTPS. Never send them over plain HTTP.

### 3.2 Cookie + Nonce (browser-based MCP clients)

For MCP clients running inside a browser context (e.g. a JavaScript agent embedded in the WordPress admin):

```js
// WordPress injects wp.apiFetch with nonce automatically when running in admin context.
wp.apiFetch({ path: '/wp/v2/docs/abilities' }).then( console.log );
```

If constructing requests manually, include the nonce:

```http
GET /wp-json/wp/v2/docs/abilities HTTP/1.1
X-WP-Nonce: <nonce-from-wp_create_nonce('wp_rest')>
Cookie: wordpress_logged_in_...=...
```

### 3.3 JWT Authentication (third-party plugin)

If the site uses a JWT plugin (e.g. [JWT Authentication for WP REST API](https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/)):

```http
GET /wp-json/wp/v2/docs/abilities HTTP/1.1
Authorization: Bearer <jwt-token>
```

---

## 4. Endpoint Reference

### 4.1 `GET /wp/v2/docs/abilities` — Global abilities

Returns the current user's global abilities across all weDocs features.

**Request**

```http
GET /wp-json/wp/v2/docs/abilities HTTP/1.1
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
```

**Response (authenticated editor)**

```json
{
  "docs.read": true,
  "docs.read_private": true,
  "docs.create": true,
  "docs.edit": true,
  "docs.edit_others": true,
  "docs.delete": true,
  "docs.publish": true,
  "docs.sort": true,
  "docs.search": true,
  "settings.read": false,
  "settings.write": false,
  "ai.generate": true,
  "ai.upload_image": false,
  "ai.configure": false,
  "summary.read": true,
  "summary.save": true,
  "summary.delete": true,
  "summary.generate": true,
  "notices.manage": false,
  "helpfulness.vote": true,
  "feedback.submit": true,
  "contributors.read": true,
  "pro_active": false
}
```

**Response (unauthenticated)**

```json
{
  "docs.read": true,
  "docs.read_private": false,
  "docs.create": false,
  "docs.edit": false,
  "docs.edit_others": false,
  "docs.delete": false,
  "docs.publish": false,
  "docs.sort": false,
  "docs.search": true,
  "settings.read": false,
  "settings.write": false,
  "ai.generate": false,
  "ai.upload_image": false,
  "ai.configure": false,
  "summary.read": true,
  "summary.save": false,
  "summary.delete": false,
  "summary.generate": true,
  "notices.manage": false,
  "helpfulness.vote": false,
  "feedback.submit": true,
  "contributors.read": true,
  "pro_active": false
}
```

---

### 4.2 `GET /wp/v2/docs/{id}/abilities` — Per-doc abilities

Returns the current user's abilities for a specific doc post.

**Request**

```http
GET /wp-json/wp/v2/docs/42/abilities HTTP/1.1
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
```

**Response (editor, doc is published)**

```json
{
  "read": true,
  "edit": true,
  "delete": true,
  "publish": true,
  "summary.read": true,
  "summary.save": true,
  "summary.delete": true,
  "summary.generate": true
}
```

**Response (404 — doc does not exist)**

```json
{
  "code": "wedocs_invalid_doc",
  "message": "Invalid documentation post.",
  "data": { "status": 404 }
}
```

---

## 5. MCP Onboarding Flow

The recommended flow for an MCP client connecting to a weDocs installation:

```
┌─────────────────────────────────────────────────────────────────┐
│ MCP Client                                                      │
├─────────────────────────────────────────────────────────────────┤
│ 1. Authenticate (App Password / JWT / Cookie+Nonce)             │
│                                                                 │
│ 2. GET /wp/v2/docs/abilities                                    │
│    → Store the returned abilities map                           │
│                                                                 │
│ 3. Enable / disable tools based on abilities:                   │
│    - docs.search = true  → expose "search docs" tool           │
│    - docs.create = true  → expose "create doc" tool            │
│    - ai.generate = true  → expose "generate AI content" tool   │
│    - settings.read = true → expose "get settings" tool         │
│    - pro_active = true   → expose "upload image" tool          │
│    ...                                                          │
│                                                                 │
│ 4. Before each mutating call, optionally re-check per-doc      │
│    abilities via GET /wp/v2/docs/{id}/abilities if resource     │
│    IDs are known in advance.                                    │
│                                                                 │
│ 5. On 403 from any endpoint, refresh abilities and re-evaluate │
│    (the user's role may have changed mid-session).              │
└─────────────────────────────────────────────────────────────────┘
```

### Pseudo-code (Node.js / TypeScript)

```typescript
interface WeDocsAbilities {
  [key: string]: boolean;
}

async function initMcpTools(apiBase: string, auth: string): Promise<void> {
  const response = await fetch(`${apiBase}/wp-json/wp/v2/docs/abilities`, {
    headers: { Authorization: auth },
  });
  const abilities: WeDocsAbilities = await response.json();

  const tools = [];

  if (abilities['docs.search']) {
    tools.push(searchDocsTool);
  }
  if (abilities['docs.create']) {
    tools.push(createDocTool);
  }
  if (abilities['docs.edit']) {
    tools.push(updateDocTool);
  }
  if (abilities['docs.delete']) {
    tools.push(deleteDocTool);
  }
  if (abilities['ai.generate']) {
    tools.push(generateAiContentTool);
  }
  if (abilities['ai.upload_image']) {
    tools.push(uploadImageTool); // Pro only
  }
  if (abilities['settings.read']) {
    tools.push(getSettingsTool);
  }
  if (abilities['settings.write']) {
    tools.push(saveSettingsTool);
  }

  registerTools(tools);
}
```

### Pseudo-code (Python)

```python
import requests

def init_mcp_tools(api_base: str, auth: tuple) -> list:
    resp = requests.get(f"{api_base}/wp-json/wp/v2/docs/abilities", auth=auth)
    resp.raise_for_status()
    abilities = resp.json()

    tools = []
    if abilities.get("docs.search"):
        tools.append("search_docs")
    if abilities.get("docs.create"):
        tools.append("create_doc")
    if abilities.get("docs.edit"):
        tools.append("update_doc")
    if abilities.get("docs.delete"):
        tools.append("delete_doc")
    if abilities.get("ai.generate"):
        tools.append("generate_ai_content")
    if abilities.get("settings.read"):
        tools.append("get_settings")
    if abilities.get("settings.write"):
        tools.append("save_settings")
    return tools
```

---

## 6. Mapping MCP Actions to Abilities

| MCP Tool / Action | Required Ability | Endpoint(s) |
|---|---|---|
| List all docs | `docs.read` | `GET /wp/v2/docs` |
| Get a single doc | `docs.read` | `GET /wp/v2/docs/{id}` |
| Get a private doc | `docs.read_private` | `GET /wp/v2/docs/{id}` |
| Search docs | `docs.search` | `GET /wp/v2/docs/search` |
| Get doc contributors | `contributors.read` | `GET /wp/v2/docs/contributors` |
| Create a doc | `docs.create` | `POST /wp/v2/docs` |
| Update a doc | `docs.edit` or per-doc `edit` | `PUT /wp/v2/docs/{id}` |
| Delete a doc | `docs.delete` or per-doc `delete` | `DELETE /wp/v2/docs/{id}` |
| Sort / reorder docs | `docs.sort` | `POST /wp/v2/docs/sortable` |
| Get settings | `settings.read` | `GET /wp/v2/docs/settings` |
| Save settings | `settings.write` | `POST /wp/v2/docs/settings` |
| Generate AI content | `ai.generate` | `POST /wp/v2/docs/ai/generate` |
| Upload image for AI | `ai.upload_image` | `POST /wp/v2/docs/ai/upload-image` |
| List AI models | `ai.generate` | `GET /wp/v2/docs/ai/models/{provider}` |
| Read AI summary | `summary.read` | `GET /wp/v2/docs/{id}/ai-summary` |
| Save AI summary | `summary.save` or per-doc `summary.save` | `POST /wp/v2/docs/{id}/ai-summary` |
| Delete AI summary | `summary.delete` or per-doc `summary.delete` | `DELETE /wp/v2/docs/{id}/ai-summary` |
| Generate AI summary | `summary.generate` | `POST /wp/v2/docs/{id}/ai-summary/generate` |
| Submit helpful vote | `helpfulness.vote` | `POST /wp/v2/docs/{id}/helpful` |
| Submit feedback | `feedback.submit` | `POST /wp/v2/docs/{id}/feedback` |
| View admin notices | `notices.manage` | `GET /wp/v2/docs/promo-notices` |
| Dismiss admin notice | `notices.manage` | `POST /wp/v2/docs/promo-notices/{key}/dismiss` |

---

## 7. Graceful Denial Handling

When a tool is invoked despite the corresponding ability being `false`, the REST endpoint will return a `403 Forbidden` or `401 Unauthorized` response. Your MCP client should handle this gracefully:

```typescript
async function callDocsTool(
  name: string,
  abilities: WeDocsAbilities,
  requiredAbility: string,
  fn: () => Promise<unknown>
): Promise<unknown> {
  if (!abilities[requiredAbility]) {
    return {
      error: 'permission_denied',
      message: `The current user does not have the '${requiredAbility}' ability. `
               + `Tip: check GET /wp-json/wp/v2/docs/abilities for the full list.`,
    };
  }

  try {
    return await fn();
  } catch (err: any) {
    if (err.status === 403 || err.status === 401) {
      // Refresh abilities — role may have changed mid-session.
      abilities = await fetchAbilities();
      return {
        error: 'permission_denied_server',
        message: err.message,
        abilities_refreshed: true,
      };
    }
    throw err;
  }
}
```

**Key rule:** Never surface raw WordPress `WP_Error` objects to end users. Always translate permission errors into actionable messages (e.g. *"You need Editor role or higher to create docs."*).

---

## 8. Public vs Authenticated Flows

Some abilities are always `true` and do not require authentication. This enables unauthenticated MCP agents (e.g. a read-only documentation chatbot) to function without credentials:

| Ability | Auth required? |
|---|---|
| `docs.read` | No |
| `docs.search` | No |
| `summary.read` | No |
| `summary.generate` | No (requires AI to be configured on the server) |
| `feedback.submit` | No (requires `name` + `email` fields for guests) |
| `contributors.read` | No |
| All other abilities | Yes |

An unauthenticated MCP agent can therefore provide a **read-only documentation experience** without any credentials. To perform write operations, it must authenticate first.

---

## 9. Extending Abilities

Third-party plugins (including weDocs Pro) can add or override abilities using WordPress filters:

### Extending global abilities

```php
add_filter( 'wedocs_global_abilities', function( array $abilities ): array {
    // Add a custom Pro ability.
    $abilities['my_plugin.custom_action'] = current_user_can( 'my_custom_capability' );

    // Override an existing ability.
    if ( my_plugin_has_extended_permissions() ) {
        $abilities['docs.delete'] = current_user_can( 'delete_docs' );
    }

    return $abilities;
} );
```

### Extending per-doc abilities

```php
add_filter( 'wedocs_doc_abilities', function( array $abilities, int $doc_id, WP_Post $post ): array {
    // Allow users with a custom role to always export.
    $abilities['export'] = current_user_can( 'export_docs' );

    return $abilities;
}, 10, 3 );
```

MCP clients that consume these extended abilities should enumerate all keys of the returned object rather than checking a hardcoded list:

```typescript
// Safe: iterate all returned abilities.
for (const [key, value] of Object.entries(abilities)) {
  if (value && toolRegistry.has(key)) {
    tools.push(toolRegistry.get(key));
  }
}
```

---

## 10. Migration Notes for Existing Integrations

### 10.1 What changed in 2.2.2

| Area | Before 2.2.2 | 2.2.2+ |
|---|---|---|
| Permission logic | Scattered `current_user_can()` calls inline in each permission_callback | Centralized in `WeDevs\WeDocs\API\AbilitiesPolicy` |
| Abilities discovery | Not available | `GET /wp/v2/docs/abilities` + `GET /wp/v2/docs/{id}/abilities` |
| Callback behavior | Unchanged (same capability checks, same HTTP status codes) | Identical — delegates to `AbilitiesPolicy` |

### 10.2 No breaking changes

The behavior of all existing REST endpoints is **fully backward compatible**:

- Endpoints that previously checked `current_user_can('edit_docs')` still check the same capability — `AbilitiesPolicy::can('docs.edit')` resolves to the same `current_user_can('edit_docs')` call under the hood.
- HTTP status codes (`401`, `403`, `404`) are unchanged.
- Response payloads are unchanged.

### 10.3 Filter-based migration

If you previously hooked into individual endpoint permission_callbacks to alter access, migrate to the `wedocs_global_abilities` filter instead for cleaner integration:

```php
// Before (fragile — tied to internal method names)
add_filter( 'wedocs_ai_generate_permissions', '__return_true' );

// After (stable — uses the abilities contract)
add_filter( 'wedocs_global_abilities', function( $abilities ) {
    $abilities['ai.generate'] = true;
    return $abilities;
} );
```

---

## Quick-Start Checklist for MCP Developers

- [ ] Choose an authentication method (Application Passwords recommended for server-to-server)
- [ ] On startup, call `GET /wp/v2/docs/abilities` and store the result
- [ ] Enable / disable MCP tools based on the returned abilities
- [ ] For resource-specific operations, call `GET /wp/v2/docs/{id}/abilities` before mutating
- [ ] Handle `403` responses by refreshing the abilities map
- [ ] Never hard-code capability strings — always check abilities dynamically
- [ ] Subscribe to the `wedocs_global_abilities` filter if you need to expose custom Pro abilities
- [ ] Test with both authenticated and unauthenticated requests to verify graceful degradation
