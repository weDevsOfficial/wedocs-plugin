import { Browser, BrowserContext, Page, test, chromium, expect } from '@playwright/test';
import { BasicLoginPage } from '../../pages/basicLogin';
import { FaqPage } from '../../pages/faq';
import { FaqData, Users } from '../../utils/testData';
import { wedocsContextOptions } from '../../utils/auth';
import { configureSpecFailFast } from '../../utils/specFailFast';
import { Selectors } from '../../pages/selectors';

let browser: Browser;
let context: BrowserContext;
let page: Page;
let faq: FaqPage;

const group = FaqData.randomGroup();
const item = FaqData.randomFaq();

test.beforeAll(async () => {
  browser = await chromium.launch();
  context = await browser.newContext(wedocsContextOptions());
  page = await context.newPage();
  const login = new BasicLoginPage(page);
  await login.loginAndVisitFaq(Users.adminUsername, Users.adminPassword);
  faq = new FaqPage(page);
  await faq.createGroup(group.title);
});

test.afterAll(async () => {
  await faq.deleteGroup(group.title).catch(() => {});
  await context.close();
  await browser.close();
});

test.describe('FAQ item CRUD', () => {
  configureSpecFailFast();

  test('FI0001 : Groups start collapsed and mount no editors', async () => {
    // Every FAQ carries a Tiptap instance. Mounting them all on load made the
    // page most of the DOM, so a collapsed group must mount none.
    expect(await faq.mountedEditorCount()).toBe(0);
  });

  test('FI0002 : Admin adds a FAQ to the group', async () => {
    await faq.addFaq(group.title, item.question, item.answer);
    await expect(page.locator(`text=${item.question}`).first()).toBeVisible();
  });

  test('FI0003 : Adding a FAQ reports through a toast', async () => {
    // The add form stays open after a save, so the toast is still on screen.
    expect(await faq.lastToast()).toBeTruthy();
  });

  test('FI0004 : Collapsing then expanding the group re-reads its FAQs', async () => {
    await faq.collapseGroup(group.title);
    await faq.expandGroup(group.title);
    await expect(page.locator(`text=${item.question}`).first()).toBeVisible();
  });

  test('FI0005 : An expanded group never shows the loading state forever', async () => {
    await faq.reloadAndWait();
    await faq.expandGroup(group.title);

    // "Loading FAQs…" must be replaced by content, not left on screen. It stuck
    // once because the gate ignored whether the group was expanded at all.
    await expect(page.locator('text=Loading FAQs')).toHaveCount(0);
    await expect(page.locator(`text=${item.question}`).first()).toBeVisible();
  });

  test('FI0006 : The question survives a round trip without entity corruption', async () => {
    const tricky = `Tom & Jerry ${Date.now()}`;
    await faq.addFaq(group.title, tricky, 'Answer for the entity probe.');
    await faq.reloadAndWait();
    await faq.expandGroup(group.title);

    // Editing seeded from `rendered` instead of `raw` wrote wptexturize output
    // back into the post, so "&" came back as "&#038;".
    // Poll rather than read once: the row list renders asynchronously after the
    // expand, so a single read can land before the new FAQ is on screen.
    await expect
      .poll(
        async () => {
          const titles = await page
            .locator(Selectors.faq.faqItemTitles)
            .evaluateAll((els) => els.map((e) => e.textContent?.trim() || ''));
          return titles.find((t) => t.includes('Tom &')) ?? null;
        },
        { message: 'question should still be in the FAQ list', timeout: 20000 },
      )
      .not.toBeNull();

    const titles = await page
      .locator(Selectors.faq.faqItemTitles)
      .evaluateAll((els) => els.map((e) => e.textContent?.trim() || ''));
    const stored = titles.find((t) => t.includes('Tom &'))!;

    expect(stored).not.toContain('&#038;');
    expect(stored).toBe(tricky);
  });
});
