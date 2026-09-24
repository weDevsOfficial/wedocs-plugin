import { Browser, BrowserContext, Page, test, chromium, expect } from '@playwright/test';
import { BasicLoginPage } from '../../pages/basicLogin';
import { SettingsPage } from '../../pages/settings';
import { Selectors } from '../../pages/selectors';
import { Users } from '../../utils/testData';
import { wedocsContextOptions } from '../../utils/auth';
import { configureSpecFailFast } from '../../utils/specFailFast';

let browser: Browser;
let context: BrowserContext;
let page: Page;
let settings: SettingsPage;

test.beforeAll(async () => {
  browser = await chromium.launch();
  context = await browser.newContext(wedocsContextOptions());
  page = await context.newPage();
  const login = new BasicLoginPage(page);
  await login.basicLogin(Users.adminUsername, Users.adminPassword);
  settings = new SettingsPage(page);
  await settings.open();
  await settings.openTab('Shortcodes');
});

test.afterAll(async () => {
  await context.close();
  await browser.close();
});

test.describe('Settings — Shortcodes tab', () => {
  configureSpecFailFast();

  test('ST0001 : The tab lists both free shortcodes', async () => {
    const cards = await settings.shortcodeCards();
    const titles = cards.map((c) => c.title);

    expect(titles).toContain('Documentation List');
    expect(titles).toContain('FAQ Section');
  });

  test('ST0002 : Every listed shortcode carries a plan badge', async () => {
    const cards = await settings.shortcodeCards();

    for (const card of cards) {
      expect(card.badge, `${card.title} should carry a plan badge`).toMatch(/^(Free|Pro)$/);
    }
  });

  test('ST0003 : With Pro inactive the Changelog card is not advertised', async () => {
    // The tab lists what is actually registered, so a shortcode the site cannot
    // render must not appear.
    const cards = await settings.shortcodeCards();
    expect(cards.map((c) => c.title)).not.toContain('Changelog');

    const free = cards.filter((c) => c.badge === 'Free');
    expect(free).toHaveLength(cards.length);
  });

  test('ST0004 : Documented attributes match what the shortcode accepts', async () => {
    const cards = await settings.shortcodeCards();

    const docs = cards.find((c) => c.title === 'Documentation List')!;
    expect(docs.attributes).toEqual(['col', 'items', 'include', 'exclude', 'more', 'paginate']);

    const faq = cards.find((c) => c.title === 'FAQ Section')!;
    expect(faq.attributes).toEqual(['group', 'limit', 'orderby', 'order']);
  });

  test('ST0005 : Every example is a shortcode the site can actually run', async () => {
    const cards = await settings.shortcodeCards();

    for (const card of cards) {
      expect(card.example, `${card.title} example`).toMatch(/^\[wedocs(_faq)?\b.*\]$/);
    }
  });

  test('ST0006 : Each card offers an icon-only copy control', async () => {
    const copies = page.locator(Selectors.settings.shortcodeCopyButton);
    const cards = await settings.shortcodeCards();

    await expect(copies).toHaveCount(cards.length);
    // Icon only: the control carries no visible label of its own.
    expect((await copies.first().textContent())?.trim()).toBe('');
  });

  test('ST0007 : The tab renders without console errors', async () => {
    const errors: string[] = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));

    await settings.open();
    await settings.openTab('Shortcodes');
    await page.waitForTimeout(1000);

    expect(errors).toEqual([]);
  });
});
