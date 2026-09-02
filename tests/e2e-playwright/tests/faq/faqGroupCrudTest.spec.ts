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
// Deliberately NOT derived from group.title: row lookups use :has-text(), which
// matches substrings, so "<title> renamed" would still match the old title and
// the absent-after-rename assertion could never pass.
const renamed = FaqData.randomGroup().title;

test.beforeAll(async () => {
  browser = await chromium.launch();
  context = await browser.newContext(wedocsContextOptions());
  page = await context.newPage();
  const login = new BasicLoginPage(page);
  await login.loginAndVisitFaq(Users.adminUsername, Users.adminPassword);
  faq = new FaqPage(page);
});

test.afterAll(async () => {
  // FG0006 removes the copy, so the original is this spec's to clean up.
  await faq.deleteGroup(renamed).catch(() => {});
  await context.close();
  await browser.close();
});

test.describe('FAQ group CRUD', () => {
  configureSpecFailFast();

  test('FG0001 : Admin creates a FAQ group', async () => {
    // Creating a group was a hard 403 until the taxonomy was given caps that a
    // role actually holds, and the UI reported nothing at all.
    await faq.createGroup(group.title);
    await faq.assertGroupVisible(group.title);
  });

  test('FG0002 : Creating a group raises a success toast', async () => {
    const toast = await faq.lastToast();
    expect(toast).toBeTruthy();
  });

  test('FG0003 : Admin renames the group', async () => {
    await faq.renameGroup(group.title, renamed);
    await faq.assertGroupVisible(renamed);
    await faq.assertGroupAbsent(group.title);
  });

  test('FG0004 : Admin toggles the group inactive and back', async () => {
    // toHaveCount retries; a bare .count() reads once and can fire before the
    // group list has finished rendering after the reload.
    const switchWithLabel = (label: string) =>
      page.locator(`#wedocs-faq-app div.border.border-gray-300:has-text("${renamed}") button[aria-label="${label}"]`);

    await faq.toggleGroupStatus(renamed);
    await faq.reloadAndWait();

    // The switch alone carries the state; there is no status text beside it.
    await expect(switchWithLabel('Activate FAQ group'), 'group should now read as deactivated').toHaveCount(1);

    await faq.toggleGroupStatus(renamed);
    await faq.reloadAndWait();

    await expect(switchWithLabel('Deactivate FAQ group'), 'group should be active again').toHaveCount(1);
  });

  test('FG0005 : Admin duplicates the group', async () => {
    await faq.duplicateGroup(renamed);
    await faq.reloadAndWait();

    // Assert the copy itself, not a global row count: spec files run in
    // parallel workers and the others create and delete their own groups, so a
    // before/after total is not this spec's to own.
    await expect(page.locator(Selectors.faq.groupRow(`${renamed} (Copy)`)).first()).toBeVisible();
  });

  test('FG0006 : Admin deletes a group and it reports through a toast', async () => {
    const copy = `${renamed} (Copy)`;

    await faq.deleteGroup(copy);

    // Assert the toast here, before any reload: it auto-dismisses after 2s, so
    // checking it in a later test only ever sees null.
    // Deletes used to 403 for everyone, administrators included, and the UI said
    // nothing at all, so the report is the point of the test.
    expect(await faq.lastToast(), 'delete should report an outcome').toBeTruthy();

    await faq.reloadAndWait();

    await faq.assertGroupAbsent(copy);
    // The original must survive its copy being removed.
    await faq.assertGroupVisible(renamed);
  });
});
