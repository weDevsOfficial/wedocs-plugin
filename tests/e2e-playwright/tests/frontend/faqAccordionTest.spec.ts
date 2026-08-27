import { Browser, BrowserContext, Page, test, chromium, expect } from '@playwright/test';
import { FrontendPage } from '../../pages/frontend';
import { FaqData } from '../../utils/testData';
import { readBaseline, type Baseline } from '../../utils/baseline';
import { createFaq } from '../../utils/apiHelper';
import { wedocsContextOptions } from '../../utils/auth';
import { configureSpecFailFast } from '../../utils/specFailFast';

let browser: Browser;
let context: BrowserContext;
let page: Page;
let front: FrontendPage;
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

test.describe('FAQ frontend rendering', () => {
  configureSpecFailFast();

  test('FE0001 : The accordion opens and closes on click', async () => {
    await front.openPath(baseline.pages.F01);

    expect(await front.toggleFaqItem(0), 'first click should open').toBe(true);
    expect(await front.toggleFaqItem(0), 'second click should close').toBe(false);
  });

  test('FE0002 : Answers keep their markup', async () => {
    await front.openPath(baseline.pages.F01);

    // The template runs the_content so embeds and shortcodes survive; running
    // wp_kses_post over the result would strip what those filters produced.
    const html = await page.locator('.wedocs-faq-item__answer-inner').first().innerHTML();
    expect(html).toContain('<p>');
  });

  test('FE0003 : A question is escaped, never rendered as markup', async () => {
    // Marker must be unique across the suite: another spec seeds a "Tom & Jerry"
    // question, and a shared substring would match that row instead of this one.
    const marker = 'EscapeProbe';
    const tricky = `${marker} & <b>bold</b> "quoted"`;
    await page.goto(front.pageUrl('/wp-admin/admin.php?page=wedocs'));
    await page.waitForSelector('#wedocs-app');
    await createFaq(page, tricky, '<p>Escaping probe.</p>', baseline.faqGroupId, 99);

    await front.openPath(baseline.pages.F01);

    const question = page.locator('.wedocs-faq-item__question', { hasText: marker }).first();
    await expect(question).toBeVisible();

    // Stored title is echoed through esc_html, so the tags must be inert text.
    expect(await question.locator('b').count(), 'markup must not be live').toBe(0);
    expect((await question.textContent())?.trim()).toContain('<b>bold</b>');
  });

  test('FE0004 : An inactive group is dropped from the frontend', async () => {
    // Deactivate the baseline group over REST, then confirm the shortcode skips it.
    await page.goto(front.pageUrl('/wp-admin/admin.php?page=wedocs'));
    await page.waitForSelector('#wedocs-app');

    const setStatus = async (status: boolean) =>
      page.evaluate(
        async ({ id, status }) => {
          const w = window as any;
          return w.wp.apiFetch({
            path: `/wp/v2/wedocs-faq-groups/${id}`,
            method: 'POST',
            data: { meta: { status } },
          });
        },
        { id: baseline.faqGroupId, status },
      );

    await setStatus(false);
    await front.openPath(baseline.pages.F01);
    let render = await front.readFaq();
    expect(render.groups.map((g) => g.name)).not.toContain(FaqData.baselineGroup);

    await page.goto(front.pageUrl('/wp-admin/admin.php?page=wedocs'));
    await page.waitForSelector('#wedocs-app');
    await setStatus(true);

    await front.openPath(baseline.pages.F01);
    render = await front.readFaq();
    expect(render.groups.map((g) => g.name)).toContain(FaqData.baselineGroup);
  });

  test('FE0005 : The FAQ frontend raises no console errors', async () => {
    const errors: string[] = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));

    await front.openPath(baseline.pages.F01);
    await page.waitForTimeout(1000);

    expect(errors).toEqual([]);
  });
});
