---
name: wedocs-release
description: Release weDocs (free) to wp.org. Bump version + changelog, dry-run on the fork, then push tag to weDevsOfficial/wedocs-plugin where `.github/workflows/deploy-org.yml` builds + deploys to wp.org SVN and publishes a GitHub Release. Trigger on "release wedocs", "ship wedocs X.Y.Z", "publish wedocs", "/wedocs-release". Free only — for Pro use wedocs-pro-release.
---

# weDocs (Free) Release

Orchestrator: `~/wedocs-release.sh`. Pushing tag `vX.Y.Z` triggers `.github/workflows/deploy-org.yml` (Node 18 + npm + Composer + PHP 7.4): build → POT → composer → **zip + GitHub Release** → **wp.org SVN deploy** (10up). SVN secrets `SVN_USERNAME`/`SVN_PASSWORD` are set on the upstream repo.

## ⭐ Golden path (always dry-run on the fork first)

```bash
# 1. draft changelog to a file (one entry per line, no header):
cat > /tmp/wedocs-cl.md <<'EOF'
**Added:** User-facing description of a new capability.
**Improved:** User-facing description of an enhancement.
**Fixed:** User-facing description of a bug fix.
**Update:** Tested up to WordPress 7.0.
EOF

# 2. prepare the release in a tmp clone (bump + changelog + tag, NO push):
rm -rf /tmp/wedocs-rel
git clone --branch develop git@github.com:weDevsOfficial/wedocs-plugin.git /tmp/wedocs-rel
cd /tmp/wedocs-rel
~/wedocs-release.sh X.Y.Z --no-clone --skip-build --skip-push --wp-tested 7.0 --changelog-file /tmp/wedocs-cl.md -y

# 3. DRY-RUN on the fork (no SVN secrets there → wp.org step fails safely):
git remote add fork git@github.com:arifulhoque7/wedocs-plugin.git
git push fork develop
git push fork vX.Y.Z
gh run watch --repo arifulhoque7/wedocs-plugin
# verify the fork release: title = vX.Y.Z, body = ## Changelog block, asset = wedocs.vX.Y.Z.zip
gh release view vX.Y.Z --repo arifulhoque7/wedocs-plugin --json name,body,assets

# 4. only if the fork run is green AND the zip has assets/build + no leaks → go live:
git push origin develop
git push origin vX.Y.Z
gh run watch --repo weDevsOfficial/wedocs-plugin

# 5. after release: sync fork branches
git push origin upstream/develop:refs/heads/develop   # keep fork develop = upstream
```

`~/wedocs-release.sh` flags: `--no-clone` (operate on cwd), `--skip-build`, `--skip-push`, `--wp-tested X.Y`, `--changelog-file PATH`, `--repo URL`, `--branch`, `--remote`, `-y`.

## Version sync (the script bumps + verifies all 4 — must equal the tag, no `v`)
- `wedocs.php` → `Version: X.Y.Z` header
- `wedocs.php` → `const VERSION = 'X.Y.Z';`
- `package.json` → `"version": "X.Y.Z"`
- `readme.txt` → `Stable tag: X.Y.Z` (+ `Tested up to:` when bumping WP support)

The script hard-aborts if any of the four ≠ the version (wp.org rejects `Stable tag` mismatch). Tag = `vX.Y.Z`, Stable tag = `X.Y.Z`.

## Changelog (weDocs free format)
`readme.txt` uses `## Changelog` (markdown, NOT wp.org `== Changelog ==`). Block format:
```
**vX.Y.Z (D Mon, YYYY)**
- **Added:** ...
- **Improved:** ...
- **Fixed:** ...
- **Update:** ...
```
Date `D Mon, YYYY` (e.g. `8 Jun, 2026`). The workflow extracts this block into the GitHub Release body (so the release reads exactly like v2.2.1 — `## Changelog` heading + block, title = tag). **User-facing only — never put dev/chore/refactor commits in the changelog.**

## How the build ships — ⚠️ assets/build MUST be tracked
**`assets/build/` is committed (tracked) in git. NEVER gitignore/untrack it.**

The 10up `action-wordpress-plugin-deploy` ships only **git-tracked** files to wp.org SVN. Untracking `assets/build/` (as was wrongly tried in 2.2.2) strips the built blocks/JS from the wp.org package, and `wedocs.php`'s `require_once .../assets/build/blocks/DocsGrid/render.php` then **fatals on activation**. Fixed in 2.2.3 by re-tracking. So: after any JS/block change, `npm run build` AND **commit the rebuilt `assets/build/`** along with the source. `wedocs.php` also guards that require with `file_exists()` as a safety net, but the file must be present.

`npm run zip:create` (bin/zip.js) bundles `assets/ includes/ languages/ vendor/ templates/ wedocs.php readme.txt` into `wedocs.vX.Y.Z.zip` for the GitHub Release. `deploy-org.yml` runs `npm run build` in CI too, but the SVN deploy only carries what git tracks — so the committed `assets/build/` is what reaches wp.org.

## Workflow facts (`.github/workflows/deploy-org.yml`)
- Trigger: any tag push (`tags: ['*']`)
- **Installs WP-CLI explicitly** (phar) — `setup-php` `tools: wp-cli` is unreliable (`wp: not found` → POT step 127). Keep the explicit install step.
- Order: build → POT → composer `--no-dev` → zip → **GitHub Release** → **wp.org deploy** (deploy LAST so the zip/Release survive a deploy retry).
- Release step: `body_path: RELEASE_NOTES.md` (extracted `## Changelog` block) + `name: ${{ github.ref_name }}`. Do NOT add `generate_release_notes: true` (it appends an unwanted commit-link section).
- `main.yml` separately updates wp.org readme/assets on `master` push.

## Verify the zip before going live (catch these)
```bash
gh release download vX.Y.Z --repo arifulhoque7/wedocs-plugin --pattern 'wedocs.v*.zip' --dir /tmp/zc --clobber
unzip -l /tmp/zc/wedocs.vX.Y.Z.zip | grep assets/build/index.js   # built JS present
unzip -l /tmp/zc/wedocs.vX.Y.Z.zip | grep -iE 'node_modules|/src/|\.claude|\.git'  # must be empty
```

## Gotchas learned the hard way
- **PolinRider hooks block `--amend`/force/rebase on `develop`** → only make NEW commits; re-tag by `git tag -d` + `git tag -a` (local), then push the fresh tag.
- **Squash-merge a PR ≠ your local follow-up commits.** If you commit fixes to a feature branch AFTER the PR was opened but the PR squash-merged earlier, those fixes are NOT in develop. Verify file CONTENT in `upstream/develop` (not `git --contains`, which misses squashes) before releasing.
- Fork must have **Actions enabled** for the dry-run.
- After release, sync `develop` AND (if the repo uses it) `master` on both fork and upstream.

## Repo facts
- Repo `weDevsOfficial/wedocs-plugin` · branch `develop` · wp.org slug `wedocs`
- Main file `wedocs.php` · tag `vX.Y.Z` · build Node 18 + npm + Composer + PHP 7.4
- Build excludes: `.distignore` (used by the SVN deploy)
- Last verified release via this flow: **v2.2.2** (8 Jun 2026) — wp.org SVN 200, GitHub Release + zip, changelog rendered.
