---
name: wedocs-release
description: Release a new version of weDocs (free) to wp.org via GitHub Actions (`.github/workflows/deploy-org.yml`). Pushing tag `vX.Y.Z` triggers the deploy workflow — builds with npm + composer, deploys to wp.org SVN, and attaches the weDocs zip to a GitHub Release. Trigger when user says "release wedocs", "ship wedocs X.Y.Z", "publish wedocs", "/wedocs-release". Free plugin only — NOT wedocs-pro.
---

# weDocs (Free) Release Skill

Workflow-driven release for `wedocs`. Pushing tag `vX.Y.Z` triggers `.github/workflows/deploy-org.yml`, which builds (Node 18 + npm + Composer + PHP 7.4), deploys to wp.org SVN via `10up/action-wordpress-plugin-deploy`, builds the weDocs zip via the project flow (`npm run zip:create`), and publishes a GitHub Release.

**Workflow follows the Project Manager (PM) pattern. Zip / version / changelog follow weDocs' own structure. No git-flow. Just bump + commit + tag + push.**

## TL;DR

```bash
~/wedocs-release.sh 2.2.2
# → prompts: 'Tested up to' WP version (default = latest)
# → prompts/accepts changelog entries
# → bumps versions, inserts changelog, commits, tags, pushes
# → tag push triggers deploy-org.yml → wp.org deploy + GitHub Release
```

For a pre-drafted changelog (recommended — agent writes it):
```bash
~/wedocs-release.sh 2.2.2 --changelog-file /tmp/wedocs-changelog.md
```

Fake-test against the fork (no SVN secrets there = safe):
```bash
~/wedocs-release.sh 2.2.2 --repo git@github.com:arifulhoque7/wedocs-plugin.git
```

### Flags

| Flag | Default | Purpose |
|------|---------|---------|
| `--repo URL` | weDevsOfficial | Source repo to clone + push to |
| `--branch NAME` | develop | Branch to release from |
| `--remote NAME` | origin | Remote name for push |
| `--changelog-file PATH` | _interactive_ | Pre-drafted changelog entries (one per line) |
| `--wp-tested X.Y` | _prompt_ | Skip 'Tested up to' prompt |
| `--no-clone` | _clone_ | Operate on current dir instead of a fresh clone |
| `--skip-build` | _build_ | Skip local npm/composer/zip build |
| `--skip-push` | _push_ | Stop before pushing |
| `-y`, `--yes` | _prompt_ | Auto-accept confirmations |

## When to use

User wants to ship weDocs **free**. Match: `release wedocs 2.2.2`, `ship wedocs`, `publish wedocs`, `/wedocs-release`.

**Do NOT use for:** wedocs-pro (commercial, no wp.org — pro only needs a zip, see `wedocs-pro-zip` skill), code review, or non-version-bump hotfixes.

## Version flow (weDocs structure — bump ALL of these)

| File | What |
|------|------|
| `wedocs.php` | `Version: X.Y.Z` header (line ~6) |
| `wedocs.php` | `const VERSION = 'X.Y.Z';` (line ~63) |
| `package.json` | `"version": "X.Y.Z"` |
| `readme.txt` | `Stable tag: X.Y.Z` |
| `readme.txt` | `Tested up to: X.Y` (when bumping WP support) |

`npm run version:replace` additionally swaps the `WEDOCS_SINCE` placeholder in `@since` docblocks with the package.json version. **All four version locations must match the tag** (drop the leading `v`) or wp.org rejects the deploy on `Stable tag` mismatch.

> ⚠️ Known drift to fix on next release: `wedocs.php` is at `2.1.11` while `readme.txt` Stable tag is `2.2.1`. Reconcile both to the new version.

## Changelog flow (weDocs structure)

`readme.txt` uses a markdown `## Changelog` section (NOT wp.org `== Changelog ==`). Insert the new block directly under `## Changelog`:

```
## Changelog

**v2.2.2 (8 Jun, 2026)**
- **Added:** Description of a new capability (#PR).
- **Improved:** Description of an enhancement (#PR).
- **Fixed:** Description of a bug fix (#PR).

**v2.2.1 (30 Mar, 2026)**
...
```

Date format: `D Mon, YYYY` (e.g. `8 Jun, 2026`). Bold-prefix types: `**Added:**`, `**Improved:**`, `**Fixed:**`, `**Update:**`. Reference PR numbers as `(#NNN)` where applicable.

## Zip flow (weDocs structure)

`npm run zip:create` runs `bin/zip.js`, which bundles `assets/ includes/ languages/ vendor/ templates/ wedocs.php readme.txt` into `wedocs.v<package.json version>.zip` under a top-level `wedocs/` folder. Requires `vendor/` (run `composer install`) and a fresh `npm run build` first. The full local flow is:

```bash
npm run release   # = version:replace && build && make-pot:local && zip:create
```

(Run `composer install` before `release` if `vendor/` is missing — `zip.js` needs it.)

## Workflow (PM pattern)

`.github/workflows/deploy-org.yml` triggers on **any tag push** (`tags: ['*']`):

1. Checkout the tagged commit
2. Node 18 + `npm ci` + `npm run build`
3. `npm run make-pot:local`
4. `composer install --no-dev --optimize-autoloader`
5. Deploy to wp.org SVN via `10up/action-wordpress-plugin-deploy` (uses `.distignore`)
6. `npm run zip:create` → weDocs zip
7. Publish GitHub Release with the zip

`.github/workflows/main.yml` separately pushes readme/asset updates to wp.org trunk on `master` push (PM's `assets-deploy.yml` equivalent).

**Required repo secrets:** `SVN_USERNAME`, `SVN_PASSWORD` (wp.org). Missing secrets = deploy step fails (safe on a fork).

## Agent flow — drafting the changelog

Draft the changelog yourself (don't rely on the interactive prompt) for user-centric entries.

1. Find last tag: `git ls-remote --tags origin | awk -F/ '{print $NF}' | grep -E '^v[0-9]' | sort -V | tail -1`
2. Inspect commits + merged PRs since:
   ```bash
   git log v<last>..HEAD --no-merges --pretty='format:%h %s'
   gh pr list --repo weDevsOfficial/wedocs-plugin --state merged --base develop --limit 30 --json number,title
   ```
3. Categorize user-facing changes into `**Added:** / **Improved:** / **Fixed:** / **Update:**`. Skip chore/lint/refactor with no visible impact.
4. Write entries to `/tmp/wedocs-changelog.md` (one per line, no header — the script wraps with `**vX.Y.Z (D Mon, YYYY)**`).
5. Run `~/wedocs-release.sh X.Y.Z --changelog-file /tmp/wedocs-changelog.md`.

## Setup (one-time)

```bash
which git gh node npm composer curl awk sed
gh auth status
echo "alias wedocs-release='~/wedocs-release.sh'" >> ~/.zshrc
# push perm (need >= write):
gh api repos/weDevsOfficial/wedocs-plugin/collaborators/$(gh api user --jq .login)/permission --jq .role_name
```

## ⚠️ Don't

- DON'T release more than once per 24h (wp.org indexer rate-limits).
- DON'T let the four version locations drift — they must all equal the tag.
- DON'T skip the `Stable tag` bump — wp.org rejects mismatched deploys.
- DON'T delete published tags on `weDevsOfficial/wedocs-plugin`.
- DON'T release wedocs-pro through this skill (no wp.org; use the pro zip skill).

## Repo facts (cached)

- Repo: `weDevsOfficial/wedocs-plugin`  ·  Default branch: `develop`
- wp.org slug: `wedocs`  ·  https://wordpress.org/plugins/wedocs/
- Main file: `wedocs.php`  ·  Version const: `const VERSION` + `Version:` header
- Tag format: `vX.Y.Z`  ·  Build: Node 18 + npm + Composer + PHP 7.4
- Deploy: `.github/workflows/deploy-org.yml`  ·  Build excludes: `.distignore`
- Zip: `bin/zip.js` → `wedocs.vX.Y.Z.zip`
- Changelog: `## Changelog` in `readme.txt`, `**vX.Y.Z (D Mon, YYYY)**` + `- **Type:**` lines

## Manual fallback

```bash
git clone --branch develop git@github.com:weDevsOfficial/wedocs-plugin.git
cd wedocs-plugin
# bump: wedocs.php (Version: + const VERSION), package.json version, readme.txt Stable tag (+ Tested up to)
# insert changelog block under ## Changelog in readme.txt
git add wedocs.php package.json readme.txt includes src templates
git commit -m "chore: bump version to X.Y.Z"
git tag -a vX.Y.Z -m "release version X.Y.Z"
git push origin develop && git push origin vX.Y.Z
gh run watch --repo weDevsOfficial/wedocs-plugin
```
