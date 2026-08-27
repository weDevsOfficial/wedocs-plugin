import { Browser, BrowserContext, Page, test, chromium, expect } from '@playwright/test';
import { FrontendPage } from '../../pages/frontend';
import { FaqData, ShortcodePatterns } from '../../utils/testData';
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

test.describe('[wedocs_faq] shortcode attribute patterns', () => {
  configureSpecFailFast();

  for (const pattern of ShortcodePatterns.faq) {
    test(`SF${pattern.id} : ${pattern.label} — ${pattern.code}`, async () => {
      await front.openPath(baseline.pages[pattern.id]);
      const render = await front.readFaq();

      if (!pattern.expect.renders) {
        expect(render.sections, `${pattern.code} should render nothing`).toBe(0);
        return;
      }

      expect(render.sections, `${pattern.code} should render once`).toBe(1);

      const baselineGroup = render.groups.find((g) => g.name === FaqData.baselineGroup);
      expect(baselineGroup, `${pattern.code} should include the baseline group`).toBeTruthy();

      if (pattern.expect.perGroup !== undefined) {
        for (const group of render.groups) {
          expect(group.items, `${pattern.code} items in ${group.name}`).toBeLessThanOrEqual(pattern.expect.perGroup);
        }
      }
    });
  }

  test('SF-ORDER : orderby title DESC reverses the ASC order', async () => {
    await front.openPath(baseline.pages.F06);
    const asc = await front.readFaq();

    await front.openPath(baseline.pages.F05);
    const desc = await front.readFaq();

    const ascQuestions = asc.groups.find((g) => g.name === FaqData.baselineGroup)!.questions;
    const descQuestions = desc.groups.find((g) => g.name === FaqData.baselineGroup)!.questions;

    expect(descQuestions).toEqual([...ascQuestions].reverse());
  });

  test('SF-EMPTY : a group with no FAQs is skipped by hide_empty', async () => {
    // Created with no FAQs, so it must never reach the frontend.
    const emptyName = `E2E Empty Group ${Date.now()}`;
    await page.goto(`${front.docsPage}`);
    await page.waitForSelector('#wedocs-app');

    const { createFaqGroup } = await import('../../utils/apiHelper');
    await createFaqGroup(page, emptyName);

    await front.openPath(baseline.pages.F01);
    const render = await front.readFaq();

    expect(render.groups.map((g) => g.name)).not.toContain(emptyName);
  });

  test('SF-NOERR : no FAQ shortcode page emits a PHP error', async () => {
    for (const pattern of ShortcodePatterns.faq) {
      const probe = await front.probe(baseline.pages[pattern.id]);
      expect(probe.status, `${pattern.code} status`).toBe(200);
      expect(probe.phpError, `${pattern.code} PHP error`).toBe(false);
    }
  });
});
