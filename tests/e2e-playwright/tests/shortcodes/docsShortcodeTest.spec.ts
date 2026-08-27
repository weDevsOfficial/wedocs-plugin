import { Browser, BrowserContext, Page, test, chromium, expect } from '@playwright/test';
import { FrontendPage } from '../../pages/frontend';
import { ShortcodePatterns } from '../../utils/testData';
import { readBaseline, type Baseline } from '../../utils/baseline';
import { wedocsContextOptions } from '../../utils/auth';
import { configureSpecFailFast } from '../../utils/specFailFast';

let browser: Browser;
let context: BrowserContext;
let page: Page;
let front: FrontendPage;

// Read inside beforeAll, not at module scope: Playwright collects every spec
// file before it runs anything, so a top-level read fires before the setup
// project has written baseline.json.
let baseline: Baseline;

test.beforeAll(async () => {
  baseline = readBaseline();
  browser = await chromium.launch();
  context = await browser.newContext(wedocsContextOptions());
  page = await context.newPage();
  front = new FrontendPage(page);
});

test.afterAll(async () => {
  await context.close();
  await browser.close();
});

test.describe('[wedocs] shortcode attribute patterns', () => {
  configureSpecFailFast();

  // One case per pattern, so a failure names the attribute that broke rather
  // than "the shortcode page".
  for (const pattern of ShortcodePatterns.docs) {
    test(`SD${pattern.id} : ${pattern.label} — ${pattern.code}`, async () => {
      await front.openPath(baseline.pages[pattern.id]);
      const render = await front.readDocs();

      if (!pattern.expect.renders) {
        // An empty result renders nothing at all, not an empty shell.
        expect(render.wraps, `${pattern.code} should render nothing`).toBe(0);
        return;
      }

      expect(render.wraps, `${pattern.code} should render once`).toBe(1);
      expect(render.docTitles.length).toBeGreaterThan(0);

      if (pattern.expect.col !== undefined) {
        expect(render.col, `${pattern.code} column class`).toBe(pattern.expect.col);
      }

      if (pattern.expect.more !== undefined) {
        expect(render.moreLabels).toContain(pattern.expect.more);
      }

      if (pattern.expect.maxSections !== undefined) {
        for (const count of render.sectionCounts) {
          expect(count).toBeLessThanOrEqual(pattern.expect.maxSections);
        }
      }

      if (pattern.expect.pager !== undefined) {
        expect(render.hasPager, `${pattern.code} pagination`).toBe(pattern.expect.pager);
      }
    });
  }

  test('SD-COMBINED : docs and FAQ shortcodes coexist on one page', async () => {
    await front.openPath(baseline.pages.COMBINED);

    const docs = await front.readDocs();
    const faq = await front.readFaq();

    expect(docs.wraps).toBe(1);
    expect(faq.sections).toBe(1);

    // Each shortcode enqueues its own assets, and only when it actually renders.
    const assets = await page.evaluate(() => ({
      styles: [...document.styleSheets].map((s) => s.href || '').filter((h) => /wedocs/i.test(h)),
      scripts: [...document.querySelectorAll('script[src]')].map((s) => (s as HTMLScriptElement).src),
    }));

    expect(assets.styles.some((h) => /faq/i.test(h)), 'faq.css enqueued').toBe(true);
    expect(assets.scripts.some((s) => /faq/i.test(s)), 'faq.js enqueued').toBe(true);
  });

  test('SD-NOERR : no shortcode page emits a PHP error', async () => {
    for (const pattern of ShortcodePatterns.docs) {
      const probe = await front.probe(baseline.pages[pattern.id]);
      expect(probe.status, `${pattern.code} status`).toBe(200);
      expect(probe.phpError, `${pattern.code} PHP error`).toBe(false);
    }
  });
});
