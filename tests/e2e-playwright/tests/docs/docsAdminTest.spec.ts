import { Browser, BrowserContext, Page, test, chromium, expect } from '@playwright/test';
import { BasicLoginPage } from '../../pages/basicLogin';
import { DocsPage } from '../../pages/docs';
import { Selectors } from '../../pages/selectors';
import { DocData, Users } from '../../utils/testData';
import { wedocsContextOptions } from '../../utils/auth';
import { configureSpecFailFast } from '../../utils/specFailFast';

let browser: Browser;
let context: BrowserContext;
let page: Page;
let docs: DocsPage;

test.beforeAll(async () => {
  browser = await chromium.launch();
  context = await browser.newContext(wedocsContextOptions());
  page = await context.newPage();
  const login = new BasicLoginPage(page);
  await login.basicLogin(Users.adminUsername, Users.adminPassword);
  docs = new DocsPage(page);
});

test.afterAll(async () => {
  await context.close();
  await browser.close();
});

test.describe('Docs admin', () => {
  configureSpecFailFast();

  test('DA0001 : The admin menu uses the weDocs mark, not a dashicon', async () => {
    // The icon ships as a base64 SVG data URI so it can be recoloured per admin
    // scheme; a dashicon fallback here would mean the asset went missing.
    const background = await docs.menuIconBackground();
    expect(background).toContain('data:image/svg+xml');
  });

  test('DA0002 : Docs listing shows the seeded baseline doc', async () => {
    await docs.open();
    await docs.assertDocListed(DocData.baseline.title);
  });

  test('DA0003 : Dashboard route renders its cards', async () => {
    await docs.openDashboard();
    await docs.assertAppMounted();
    // The dashboard is stat cards; at minimum the SPA must paint content.
    await expect(page.locator(`${Selectors.spaRoot} >> text=/\\d+/`).first()).toBeVisible();
  });

  test('DA0004 : Every weDocs submenu entry resolves without a WP error', async () => {
    const links = await page
      .locator(`${Selectors.wpAdmin.menuRoot} a`)
      .evaluateAll((els) => els.map((e) => (e as HTMLAnchorElement).href).filter(Boolean));

    // Deduplicate: the top-level entry repeats its first submenu target.
    for (const href of [...new Set(links)]) {
      const res = await page.evaluate(async (url) => {
        const r = await fetch(url, { credentials: 'same-origin' });
        const html = await r.text();
        return {
          status: r.status,
          fatal: /There has been a critical error|Fatal error/.test(html),
          denied: /You do not have sufficient permissions/.test(html),
        };
      }, href);

      expect(res.status, `${href} status`).toBe(200);
      expect(res.fatal, `${href} fatal`).toBe(false);
      expect(res.denied, `${href} permission denied`).toBe(false);
    }
  });

  test('DA0005 : The docs screen renders without console errors', async () => {
    const errors: string[] = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));

    await docs.open();
    await page.waitForTimeout(1500);

    expect(errors).toEqual([]);
  });
});
