---
name: wedocs-release
description: Release weDocs (free) to wp.org. Bump version + changelog, then push tag to weDevsOfficial/wedocs-plugin where `.github/workflows/deploy-org.yml` builds + deploys to wp.org SVN (10up) and publishes a GitHub Release. Trigger on "release wedocs", "ship wedocs X.Y.Z", "publish wedocs", "/wedocs-release". Free only — for Pro use wedocs-pro-release.
---

# weDocs (Free) Release

Orchestrator: `~/wedocs-release.sh`. Pushing tag `vX.Y.Z` triggers `.github/workflows/deploy-org.yml` (Node 18 + npm + Composer + PHP 7.4): build → POT → composer → disk-gate → **zip + GitHub Release** → **wp.org SVN deploy** (10up). SVN secrets `SVN_USERNAME`/`SVN_PASSWORD` are set on the upstream repo only.

## 🚨 Who actually publishes to wp.org — read this first (learned from the 2.2.5→2.2.7 triple-blunder)

There were historically **two** publishers racing on each tag:
1. **Appsero auto-release** — a GitHub→wp.org integration that shipped the repo's **git-tracked** files filtered by **`appsero.json`** (NOT `.distignore`). It usually won the race, so the 10up step logged `ℹ︎ Version X already published` and **skipped**.
2. **`deploy-org.yml`** (10up) — the workflow in this repo.

**As of 10 Jun 2026, Appsero automatic release is DISABLED.** `deploy-org.yml` (10up) is now the **sole publisher**. This changed how the build must ship — see below.

### The current model (post-2.2.7, commit d960a5a)
- **`assets/build/` is UNTRACKED (gitignored).** Do NOT commit it. A guard workflow (`guard-build-untracked.yml`) fails any PR/push that tracks it.
- CI runs `npm run build`; the **default 10up deploy ships the on-disk working tree** (minus `.distignore`) to SVN — exactly like `wedevs-project-manager` ships its gitignored `/views/assets/dist`.
- **NEVER set `BUILD_DIR`** on the 10up action. It makes 10up sync the git-tracked set instead of the working tree, which **strips the untracked `assets/build`** → package ships with no blocks (this broke 2.2.5/2.2.6).
- `.distignore` is honored by 10up now — it excludes `.claude`, `FILTERS.md`, `src`, `bin`, `tests`, build/tooling config, etc.

### What went wrong (so it never repeats)
- **2.2.5** (dark-mode CSS fix, #322) shipped broken: `assets/build` had just been untracked (BUILD_DIR experiment), but **Appsero** (git-tracked deployer) published → package had **no built blocks** (`assets/build/index.js` 404) and **leaked `.claude`** (tracked, not in `appsero.json` exclude).
- **2.2.6** hotfix *also* broken — the BUILD_DIR/`.distignore`/10up changes were **moot** because Appsero, not 10up, was deploying.
- **2.2.7** finally fixed it by **re-tracking** `assets/build` (so Appsero shipped it) + adding `.claude`/`FILTERS.md` to `appsero.json` exclude.
- Then Appsero auto-release was turned **off**, and `assets/build` was **untracked again** (10up now ships it from CI). **This pipeline is now PROVEN** — v2.4.0 (21 Jul 2026) shipped on it and SVN served the CI-built assets correctly. Keep Appsero off.

## 🚨 MANDATORY pre-release verification (run in the tmp clone, STOP if any fails)

```bash
# ⚠️ Do NOT derive PREV with `sort -V | tail -1`. A stray v2.11.12 tag (pushed
# 2025-07-24, a full year BEFORE v2.3.1) sorts highest and silently makes every
# diff below compare against the wrong baseline. Sort by tag DATE, not name:
LAST=$(git for-each-ref --sort=-creatordate --format='%(refname:short)' 'refs/tags/v*' | head -1)
PREV=${LAST#v}
echo "diffing against $LAST"   # sanity-check this is really the previous release
# 1. assets/build must be UNTRACKED now (10up builds + ships it from CI).
git ls-files assets/build | grep -q . && echo "FAIL: assets/build is tracked — untrack it (git rm -r --cached assets/build)"
# 2. register_blocks() must still have the full block list (security cleanups love to delete it)
grep -q 'block_directories' wedocs.php || echo "FAIL: register_blocks gutted"
grep -c 'assets/build/blocks/' wedocs.php   # expect ~17-19 entries, not 1
# 3. the block-styles helper require must be intact
grep -q "blocks/helpers/block-styles.php" wedocs.php || echo "FAIL: block-styles require missing"
# 4. NO BUILD_DIR *input* in the deploy workflow. Match the YAML key only — a bare
#    `grep BUILD_DIR` also matches the warning COMMENT above the 10up step and
#    false-fails every single time.
grep -qE '^\s*BUILD_DIR\s*:' .github/workflows/deploy-org.yml && echo "FAIL: BUILD_DIR present — it strips the untracked build"
# 5. tailwind.config.js must be the clean ESM import form
head -6 tailwind.config.js | grep -q "^import {" || echo "WARN: tailwind not ESM-import form"
# 6. diff the two files security-cleanups have damaged before
git --no-pager diff "v$PREV" -- wedocs.php tailwind.config.js
```

## 🔁 "Install and build" fails with an npm cache EEXIST (seen on v2.4.0)

Symptom — the **Install and build** step dies at `npm ci`, long before the deploy:

```
npm error code EEXIST
npm error syscall rename
npm error ENOENT: no such file or directory, rename
  '/home/runner/.npm/_cacache/tmp/xxxx' -> '.../content-v2/sha512/...'
npm error File exists: .../content-v2/sha512/...
##[error]Process completed with exit code 254
```

`ENOENT` on the temp file **and** `File exists` on the destination in the same error is the
signature of a corrupt/partial npm `_cacache` — not a dependency problem. Do not go hunting
through `package-lock.json`; on v2.4.0 the lockfile was byte-identical to v2.3.1 apart from the
version bump, and the workflow file had not changed since before v2.3.1.

**Why it happens.** `actions/setup-node` `cache: 'npm'` keys the cache off the lockfile hash. The
release commit bumps the version *inside* `package-lock.json`, so the key always misses on a
release tag, falls back to a `restore-key`, and hydrates a **partial** cache that `npm ci` then
collides with. GitHub force-upgrading `actions/checkout@v4` / `setup-node@v4` onto Node 24
(annotation: *"Node.js 20 is deprecated … forced to run on Node.js 24"*) made this surface.

**Ignore these red herrings** — they appear in green runs too:
- `npm warn EBADENGINE` for `hashery`, `joi`, `qified` wanting node >= 20 on node 18. Present in
  v2.3.1's lockfile as well. Warnings, never the cause.
- The Node 20 → 24 deprecation annotation itself.

**Recovery — it is safe to just retry.** The step fails *upstream* of the disk-gate, zip, GitHub
Release and SVN deploy, so nothing was published and wp.org is untouched. There is no
half-released version to clean up, and no need to re-tag:

```bash
gh run rerun <run-id> --repo weDevsOfficial/wedocs-plugin --failed
gh run watch  <run-id> --repo weDevsOfficial/wedocs-plugin --exit-status
```
v2.4.0 went green on the first rerun (4m23s).

**Durable fix (not yet applied — do it as its own PR, never inside a release):** in
`.github/workflows/deploy-org.yml`, drop `cache: 'npm'` from the `setup-node` step, or bump to
`actions/setup-node@v5` + `actions/checkout@v5`. A cold `npm ci` costs ~1 extra minute and removes
the race entirely. Releases are infrequent — the cache buys nothing here.

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
**SVN is the only immediately-authoritative source.** Both the canonical `wedocs.zip` *and* the
versioned `wedocs.$V.zip` lag (~minutes to an hour) while wp.org generates them. Worse, the
versioned URL returns **HTTP 200 with the literal body `Not found`** until it exists — so
`curl -o` writes a ~4KB text file and `unzip -l` reports 0 blocks, which looks exactly like a
broken release. Always confirm with `file /tmp/w.zip` before panicking; if it says `ASCII text`,
the package simply is not built yet. Re-check the zip later, and judge the release on the SVN
`curl -sI` results above.

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
- Main file `wedocs.php` · tag `vX.Y.Z` · build Node 18 + npm + Composer + PHP 7.4
- `assets/build/` is **gitignored** (built in CI). Package excludes via `.distignore`.
- Last good release: **v2.4.0** (21 Jul 2026) — first release fully validated on the untracked-build + 10up-sole-publisher pipeline. SVN trunk and `tags/2.4.0` both served `assets/build/index.js` (200) with no `.claude` leak, confirming CI-built gitignored assets ship correctly. Needed one rerun for the npm cache race documented above.
- Stray tag warning: **`v2.11.12`** exists upstream (pushed 2025-07-24, before v2.3.1). It is NOT a real release but sorts highest under `sort -V` — never derive the previous version by name-sort.
