#!/usr/bin/env node
// Build a markdown results table from a Playwright JSON report and append it to
// the GitHub Actions job summary ($GITHUB_STEP_SUMMARY) — a table view on the
// run page, no HTML download. Usage: node utils/ghSummary.mjs <results.json>
import { readFileSync, appendFileSync, existsSync } from 'fs';

const file = process.argv[2] || 'merged-results.json';
if (!existsSync(file)) { console.error(`no ${file}`); process.exit(0); }
const report = JSON.parse(readFileSync(file, 'utf8'));

const byFile = {};
let passed = 0, failed = 0, skipped = 0, flaky = 0;
const walk = (suites = [], inherited = '') => {
  for (const s of suites) {
    const f = s.file || inherited;
    for (const spec of s.specs || []) {
      const status = spec.ok ? 'passed'
        : spec.tests?.some((t) => t.status === 'skipped') ? 'skipped'
        : spec.tests?.some((t) => (t.results || []).length > 1 && t.status === 'expected') ? 'flaky'
        : 'failed';
      const short = (f || 'unknown').replace(/^tests\//, '');
      byFile[short] = byFile[short] || { passed: 0, failed: 0, skipped: 0, flaky: 0 };
      byFile[short][status]++;
      if (status === 'passed') passed++;
      else if (status === 'skipped') skipped++;
      else if (status === 'flaky') flaky++;
      else failed++;
    }
    walk(s.suites, f);
  }
};
walk(report.suites);

const total = passed + failed + skipped + flaky;
const rows = Object.entries(byFile)
  .sort()
  .map(([f, c]) => `| \`${f}\` | ${c.passed} | ${c.failed} | ${c.skipped} | ${c.flaky} |`);
const md = [
  `## 🎭 E2E Results — ${failed ? '❌ ' + failed + ' failed' : '✅ all passed'}`,
  '',
  `**${total} tests** · ✅ ${passed} passed · ❌ ${failed} failed · ⏭️ ${skipped} skipped · ⚠️ ${flaky} flaky`,
  '',
  '| Spec file | ✅ | ❌ | ⏭️ | ⚠️ |',
  '|---|--:|--:|--:|--:|',
  ...rows,
  '',
].join('\n');

console.log(md);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, md + '\n');
