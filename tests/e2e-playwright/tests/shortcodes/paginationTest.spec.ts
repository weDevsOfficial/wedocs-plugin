import { Browser, BrowserContext, Page, test, chromium, expect } from '@playwright/test';
import { FrontendPage } from '../../pages/frontend';
import { PaginationProbes } from '../../utils/testData';
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

test.describe('[wedocs paginate] boundary handling', () => {
  configureSpecFailFast();

  let totalPages = 0;

  test('SP0001 : first page shows the pager with Previous disabled', async () => {
    await front.openPath(baseline.pages.PAGINATE);
    const render = await front.readDocs();

    expect(render.hasPager).toBe(true);
    expect(render.pageInfo).toMatch(/Page 1 of \d+/);
    expect(render.prevDisabled).toBe(true);
    expect(render.nextDisabled).toBe(false);
    expect(render.docTitles).toHaveLength(1);

    totalPages = Number((render.pageInfo || '').match(/of (\d+)/)?.[1] || 0);
    expect(totalPages).toBeGreaterThan(1);
  });

  test('SP0002 : Next advances one page and changes the doc shown', async () => {
    await front.openPath(baseline.pages.PAGINATE);
    const first = await front.readDocs();

    await front.clickNextPage();
    const second = await front.readDocs();

    expect(second.pageInfo).toContain('Page 2 of');
    expect(second.docTitles).not.toEqual(first.docTitles);
    expect(second.prevDisabled).toBe(false);
  });

  test('SP0003 : the last page disables Next', async () => {
    await front.openPath(`${baseline.pages.PAGINATE}?wedocs_page=${totalPages}`);
    const render = await front.readDocs();

    expect(render.pageInfo).toBe(`Page ${totalPages} of ${totalPages}`);
    expect(render.nextDisabled).toBe(true);
  });

  // Every value a visitor could put in the query string, including the ones that
  // are not numbers at all. Each must clamp, never error, never be echoed back.
  for (const probe of PaginationProbes) {
    test(`SP-PROBE : wedocs_page "${probe.query || '(none)'}" clamps safely`, async () => {
      const result = await front.probe(`${baseline.pages.PAGINATE}${probe.query}`);

      expect(result.status).toBe(200);
      expect(result.phpError, 'PHP error in response').toBe(false);
      expect(result.reflected, 'query value reflected into markup').toBe(false);

      const expected = probe.expectPage === 'last' ? totalPages : probe.expectPage;
      expect(result.pageInfo).toBe(`Page ${expected} of ${totalPages}`);
    });
  }

  test('SP0004 : paginate larger than the doc count drops the pager', async () => {
    await front.openPath(baseline.pages.D12);
    const render = await front.readDocs();

    expect(render.hasPager).toBe(false);
    expect(render.docTitles.length).toBeGreaterThan(1);
  });
});
