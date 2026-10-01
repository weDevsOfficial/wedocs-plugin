---
name: wedocs-release
description: Release weDocs (free) to wp.org. Bump version + changelog, then push tag to weDevsOfficial/wedocs-plugin where `.github/workflows/deploy-org.yml` builds + deploys to wp.org SVN (10up) and publishes a GitHub Release. Trigger on "release wedocs", "ship wedocs X.Y.Z", "publish wedocs", "/wedocs-release". Free only — for Pro use wedocs-pro-release.
---

# weDocs (Free) Release

Orchestrator: `~/wedocs-release.sh`. Pushing tag `vX.Y.Z` triggers `.github/workflows/deploy-org.yml` (Node 24 + npm + Composer + PHP 7.4): build → POT → composer → disk-gate → **zip + GitHub Release** → **wp.org SVN deploy** (10up). SVN secrets `SVN_USERNAME`/`SVN_PASSWORD` are set on the upstream repo only.

## 🚨 Who actually publishes to wp.org — read this first (learned from the 2.2.5→2.2.7 triple-blunder)

There were historically **two** publishers racing on each tag:
1. **Appsero auto-release** — a GitHub→wp.org integration that shipped the repo's **git-tracked** files filtered by **`appsero.json`** (NOT `.distignore`). It usually won the race, so the 10up step logged `ℹ︎ Version X already published` and **skipped**.
2. **`deploy-org.yml`** (10up) — the workflow in this repo.

**As of 10 Jun 2026, Appsero automatic release is DISABLED.** `deploy-org.yml` (10up) is now the **sole publisher**. This changed how the build must ship — see below.

### The current model (post-2.2.7, commit d960a5a)
- **`assets/build/` is UNTRACKED (gitignored).** Do NOT commit it. A guard workflow (`guard-build-untracked.yml`) fails any PR/push that tracks it.
- CI runs `pnpm run build`; the **default 10up deploy ships the on-disk working tree** (minus `.distignore`) to SVN — exactly like `wedevs-project-manager` ships its gitignored `/views/assets/dist`.
- **NEVER set `BUILD_DIR`** on the 10up action. It makes 10up sync the git-tracked set instead of the working tree, which **strips the untracked `assets/build`** → package ships with no blocks (this broke 2.2.5/2.2.6).
- `.distignore` is honored by 10up now — it excludes `.claude`, `FILTERS.md`, `src`, `bin`, `tests`, build/tooling config, etc.

### What went wrong (so it never repeats)
- **2.2.5** (dark-mode CSS fix, #322) shipped broken: `assets/build` had just been untracked (BUILD_DIR experiment), but **Appsero** (git-tracked deployer) published → package had **no built blocks** (`assets/build/index.js` 404) and **leaked `.claude`** (tracked, not in `appsero.json` exclude).
- **2.2.6** hotfix *also* broken — the BUILD_DIR/`.distignore`/10up changes were **moot** because Appsero, not 10up, was deploying.
- **2.2.7** finally fixed it by **re-tracking** `assets/build` (so Appsero shipped it) + adding `.claude`/`FILTERS.md` to `appsero.json` exclude.
- Then Appsero auto-release was turned **off**, and `assets/build` was **untracked again** (10up now ships it from CI). The untracked→10up pipeline is validated at the **next** release.

## 🚨 MANDATORY pre-release verification (run in the tmp clone, STOP if any fails)

```bash
LAST=$(git ls-remote --tags origin | awk -F/ '{print $NF}' | grep -E '^v[0-9]' | grep -v '\^' | sort -V | tail -1)
PREV=${LAST#v}
# 1. assets/build must be UNTRACKED now (10up builds + ships it from CI).
git ls-files assets/build | grep -q . && echo "FAIL: assets/build is tracked — untrack it (git rm -r --cached assets/build)"
# 2. register_blocks() must still have the full block list (security cleanups love to delete it)
grep -q 'block_directories' wedocs.php || echo "FAIL: register_blocks gutted"
grep -c 'assets/build/blocks/' wedocs.php   # expect ~17-19 entries, not 1
# 3. the block-styles helper require must be intact
grep -q "blocks/helpers/block-styles.php" wedocs.php || echo "FAIL: block-styles require missing"
# 4. NO BUILD_DIR in the deploy workflow
grep -q 'BUILD_DIR' .github/workflows/deploy-org.yml && echo "FAIL: BUILD_DIR present — it strips the untracked build"
# 5. build configs must be free of the PolinRider payload. (Since Tailwind 4, #348,
#    tailwind.config.js is CJS loaded via @config, so the old "ESM import form" check no longer applies.)
grep -lE "global\[|fromCharCode|rmcej|eval\(|Function\(|child_process|config\.bat" tailwind*.js postcss.config.js && echo "FAIL: payload signature"
awk 'length>300{print FILENAME": long line"; exit}' tailwind*.js postcss.config.js
# 6. diff the two files security-cleanups have damaged before
git --no-pager diff "v$PREV" -- wedocs.php tailwind.config.js
```

## ✅ MANDATORY post-release verification — green workflow ≠ working package

**The dry-run on the fork CANNOT test the SVN deploy** (no SVN secrets there → the 10up step aborts before the sync; the *zip* still looks perfect because `bin/zip.js` builds it separately). So a green fork run / clean zip proves NOTHING about wp.org. Always check the **real published package** after going live:

```bash
V=X.Y.Z
# Official downloadable zip (what users install). ~1.5MB with blocks, NOT ~470KB.
curl -sL "https://downloads.wordpress.org/plugin/wedocs.$V.zip" -o /tmp/w.zip
unzip -l /tmp/w.zip | grep -c 'assets/build/index.js'   # want 1
unzip -l /tmp/w.zip | grep -c '\.claude'                # want 0
# SVN source of truth
curl -s  "https://plugins.svn.wordpress.org/wedocs/trunk/readme.txt" | grep 'Stable tag'             # == $V
curl -sI "https://plugins.svn.wordpress.org/wedocs/trunk/assets/build/index.js" | head -1            # 200
curl -sI "https://plugins.svn.wordpress.org/wedocs/tags/$V/assets/build/index.js" | head -1          # 200
curl -sI "https://plugins.svn.wordpress.org/wedocs/trunk/.claude/skills/wedocs-release/SKILL.md" | head -1  # 404
```
The canonical `wedocs.zip` CDN cache lags (~minutes to an hour) — the versioned `wedocs.$V.zip` + SVN are authoritative.

## ✅ How 2.6.0 actually shipped (24 Sep 2026): follow this, the golden path below is the old direct-push form

1. **Bump on a fork branch, PR to org `develop`** (never push `develop` to the org): `release/X.Y.Z` with the 4 version fields + changelog, open PR, merge when green.
2. **Replace `@since WEDOCS_SINCE` in that bump.** Neither `deploy-org.yml` nor `pnpm run build` runs `version:replace`, so placeholders ship literally (14 did in 2.5.0). Blame each one: code first shipped in an earlier tag gets that version, new code gets X.Y.Z.
3. **`Tested up to`**: latest stable from `https://api.wordpress.org/core/version-check/1.7/` (major.minor, e.g. 7.1 for 7.1.2).
4. **QA gate before tagging** (this caught 4 release bugs in 2.6.0/1.4.0):
   - fresh `git clone --depth 1 --branch develop` of both repos, build the CI way (`pnpm install --frozen-lockfile && pnpm run build && pnpm run make-pot:local`, `composer install --no-dev -o`, `pnpm run zip:create`)
   - install both zips on a clean WP site ([[wedocs-fresh-verification-site]] recipe), license Pro from the `we_docs` DB
   - crawl front end + admin for fatals on **PHP 7.4 and the latest PHP** (`herd isolate php@7.4`), with WP_DEBUG_LOG on; the log must be empty apart from vendor deprecations
   - every settings tab: open, Save (expect 200), **with Pro on and Pro off**, and diff `wedocs_settings` before/after (nothing lost, no `undefined` key)
   - features (glossary tooltip, FAQ accordion, changelog timeline, helpful vote, QuickSearch, assistant widget on a docs AND a non-docs page), loading skeletons, a checkbox outside weDocs must stay native
   - Playwright: go to `about:blank` before each `goto`; a hash-only change does not reload, so a deactivated Pro's JS stays loaded
5. **Changelog = what changes for someone on the previous release.** Leave out fixes to code that never shipped (regressions found and fixed inside the cycle).
6. **Tag**: annotated `vX.Y.Z` on the org `develop` merge commit (same as 2.5.0), `git push upstream vX.Y.Z`, then run the post-release verification below.
7. **`master`**: PR `arifulhoque7:develop` into org `master` and merge. `main.yml` then pushes readme/assets to wp.org trunk (harmless). The line-scoped PHPCS check fails on this PR by design (its base is the old master, so it sees every line since then); the merge changes no code, `master` tree must equal the tag tree.
8. **Slack**: draft the announcement ([[wedocs-release-slack-msg]]) and hand it over. **The user posts it, never post it yourself.**

## ⭐ Golden path

```bash
# 1. draft changelog to a file (one entry per line, no header; USER-FACING only):
cat > /tmp/wedocs-cl.md <<'EOF'
**Fixed:** User-facing description of a bug fix.
EOF

# 2. prepare the release in a tmp clone (bump + changelog + tag, NO push):
rm -rf /tmp/wedocs-rel
git clone --branch develop git@github.com:weDevsOfficial/wedocs-plugin.git /tmp/wedocs-rel
cd /tmp/wedocs-rel
~/wedocs-release.sh X.Y.Z --no-clone --skip-build --skip-push --wp-tested 7.0 --changelog-file /tmp/wedocs-cl.md -y
# NOTE: --wp-tested is REQUIRED in non-interactive runs (else the script prompts and exits 1).

# 3. (optional) fork dry-run only confirms build/zip/Release — NOT the SVN deploy:
git remote add fork git@github.com:arifulhoque7/wedocs-plugin.git
git push fork develop --force && git push fork vX.Y.Z
gh run watch --repo arifulhoque7/wedocs-plugin   # WordPress Plugin Deploy WILL fail (no SVN secrets) — expected

# 4. go live (10up is the sole publisher now):
git push origin develop && git push origin vX.Y.Z
gh run watch --repo weDevsOfficial/wedocs-plugin

# 5. POST-RELEASE: run the verification block above. If assets/build is 404, it FAILED.
# 6. sync fork: git push fork develop
```

`~/wedocs-release.sh` flags: `--no-clone`, `--skip-build`, `--skip-push`, `--wp-tested X.Y`, `--changelog-file PATH`, `--repo URL`, `--branch`, `--remote`, `-y`.

## Version sync (script bumps + verifies all 4 — must equal the tag, no `v`)
`wedocs.php` `Version:` header · `wedocs.php` `const VERSION` · `package.json` `version` · `readme.txt` `Stable tag`. Script hard-aborts on mismatch (wp.org rejects `Stable tag` mismatch). Tag = `vX.Y.Z`, Stable tag = `X.Y.Z`.

## Changelog (weDocs free format)
`readme.txt` uses `## Changelog` (markdown). Block:
```
**vX.Y.Z (D Mon, YYYY)**
- **Added:** ...
- **Fixed:** ...
```
The workflow extracts this block into the GitHub Release body. **User-facing only — never put dev/chore/refactor commits in the changelog.**

## Workflow facts (`.github/workflows/deploy-org.yml`)
- Trigger: any tag push. Order: build → POT → composer `--no-dev` → **disk-gate (`test -f assets/build/index.js`)** → zip → GitHub Release → wp.org deploy (LAST, so zip/Release survive a deploy retry).
- **Installs WP-CLI explicitly** (phar) — `setup-php` `tools: wp-cli` is unreliable (POT step 127). Keep it.
- 10up deploy has **NO `BUILD_DIR`** and **NO `dry-run`**. It rsyncs the working tree (with CI-built, gitignored `assets/build`) minus `.distignore`.
- Release step: `body_path: RELEASE_NOTES.md` + `name: ${{ github.ref_name }}`. Do NOT add `generate_release_notes`.
- `guard-build-untracked.yml` fails any PR/push that tracks `assets/build`.
- `main.yml` separately updates wp.org readme/assets on `master` push.

## Gotchas learned the hard way
- **A green workflow / clean fork zip does NOT mean wp.org got a working package.** Only the post-release curl block proves it.
- **Appsero auto-release** (if ever re-enabled) ships git-tracked files via `appsero.json` and races ahead of 10up — would re-break the untracked-build model. Keep it OFF.
- **PolinRider hooks block `--amend`/force/rebase on `develop`** → only make NEW commits; re-tag via `git tag -d` + fresh `git tag -a`.
- **Squash-merge a PR ≠ your later commits.** Verify file CONTENT in `upstream/develop` before releasing.
- After release, sync `develop` (and `master` if used) on both fork and upstream.

## Repo facts
- Repo `weDevsOfficial/wedocs-plugin` · branch `develop` · wp.org slug `wedocs` · fork `arifulhoque7/wedocs-plugin`
- Main file `wedocs.php` · tag `vX.Y.Z` · build Node 24 + npm + Composer + PHP 7.4
- `assets/build/` is **gitignored** (built in CI). Package excludes via `.distignore`.
- Last verified release: **v2.6.0** (24 Sep 2026): untracked build + 10up sole publisher, wp.org zip 2.4 MB with `assets/build/index.js`, no `.claude`, trunk + `tags/2.6.0` index.js 200, Stable tag 2.6.0.
