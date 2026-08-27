import { Browser, BrowserContext, Page, test, chromium, expect } from '@playwright/test';
import { BasicLoginPage } from '../../pages/basicLogin';
import { DocsPage } from '../../pages/docs';
import { FaqPage } from '../../pages/faq';
import { Users } from '../../utils/testData';
import { saveAdminAuth } from '../../utils/auth';
import { saveBaseline } from '../../utils/baseline';
import { configureSpecFailFast } from '../../utils/specFailFast';

let browser: Browser;
let context: BrowserContext;
let page: Page;

test.beforeAll(async () => {
  browser = await chromium.launch();
  context = await browser.newContext();
  page = await context.newPage();
});

test.afterAll(async () => {
  // Persist the admin session so every later spec reuses it and skips wp-login.
  // Best-effort: an empty state just makes those specs log in normally.
  await saveAdminAuth(context).catch(() => {});
  await context.close();
  await browser.close();
});

test.describe('Login and Setup (Free)', () => {
  configureSpecFailFast();

  test('LS0001 : Admin logs into WP dashboard', { tag: ['@Basic'] }, async () => {
    const login = new BasicLoginPage(page);
    await login.basicLogin(Users.adminUsername, Users.adminPassword);
  });

  test('LS0002 : weDocs menu visible in sidebar', { tag: ['@Basic'] }, async () => {
    const docs = new DocsPage(page);
    await docs.assertMenuVisible();
  });

  test('LS0003 : Docs SPA mounts', { tag: ['@Basic'] }, async () => {
    const docs = new DocsPage(page);
    await docs.open();
    await docs.assertAppMounted();
    await docs.assertNewDocButton();
  });

  test('LS0004 : Dashboard route opens', { tag: ['@Basic'] }, async () => {
    const docs = new DocsPage(page);
    await docs.openDashboard();
    await docs.assertAppMounted();
  });

  test('LS0005 : FAQ app mounts', { tag: ['@Basic'] }, async () => {
    const faq = new FaqPage(page);
    await faq.open();
    await faq.assertAppMounted();
  });

  test('LS0006 : FAQ page renders exactly one h1', { tag: ['@Basic'] }, async () => {
    const faq = new FaqPage(page);
    // FaqApp renders its own heading; a template heading on top produced two.
    expect(await faq.headingCount()).toBe(1);
  });

  // Seed the shared fixtures the feature specs read, rather than each spec
  // creating (and racing on) its own. Persisted to baseline.json.
  test('LS0007 : Seed baseline docs, FAQs and shortcode pages', { tag: ['@Basic'] }, async () => {
    const docs = new DocsPage(page);
    await docs.open();

    const baseline = await saveBaseline(page);

    expect(baseline.docId).toBeGreaterThan(0);
    expect(baseline.faqGroupId).toBeGreaterThan(0);
    expect(baseline.faqIds).toHaveLength(3);
    expect(Object.keys(baseline.pages).length).toBeGreaterThan(20);
  });
});
