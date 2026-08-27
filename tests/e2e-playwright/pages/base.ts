import * as dotenv from 'dotenv';
dotenv.config({ quiet: true });
import { expect, type Page } from '@playwright/test';
import { AdminPaths, Urls } from '../utils/testData';
import { Selectors } from './selectors';

export class Base {
  readonly page: Page;
  readonly wpAdminPage: string = Urls.baseUrl + '/wp-admin/';
  readonly pluginsPage: string = Urls.baseUrl + '/wp-admin/plugins.php';

  // weDocs routes
  readonly docsPage: string = Urls.baseUrl + AdminPaths.docs;
  readonly dashboardPage: string = Urls.baseUrl + AdminPaths.dashboard;
  readonly settingsPage: string = Urls.baseUrl + AdminPaths.settings;
  readonly faqPage: string = Urls.baseUrl + AdminPaths.faq;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToURL(url: string) {
    await this.page.goto(url);
    await this.waitForLoading();
  }

  async waitForLoading() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async assertVisible(locator: string) {
    const element = this.page.locator(locator).first();
    await element.waitFor({ state: 'visible' });
    await expect(element).toBeVisible();
  }

  async assertHidden(locator: string) {
    await expect(this.page.locator(locator)).toHaveCount(0);
  }

  async clickFirst(locator: string) {
    const element = this.page.locator(locator).first();
    await element.waitFor({ state: 'visible' });
    await element.click();
  }

  async fillFirst(locator: string, value: string) {
    const element = this.page.locator(locator).first();
    await element.waitFor({ state: 'visible' });
    await element.fill(value);
  }

  /**
   * The docs and settings screens are one React SPA behind a hash route, so a
   * hash change re-renders without a navigation. Wait for the container, then
   * for the route's own heading to settle.
   */
  async waitForSpa() {
    await this.page.waitForSelector(Selectors.spaRoot, { timeout: 60000 });
    await this.waitForLoading();
  }

  async waitForFaqApp() {
    await this.page.waitForSelector(Selectors.faq.root, { timeout: 60000 });
    // The group list is fetched after mount; the heading renders with it.
    await this.page.waitForSelector(Selectors.faq.newGroupButton, { timeout: 30000 });
  }

  /**
   * True when weDocs Pro is running. The free suite uses it to assert that
   * Pro-only surfaces are absent rather than silently passing either way.
   */
  async isProActive(): Promise<boolean> {
    return this.page.evaluate(() => {
      const w = window as any;
      return Boolean(w.wp?.hooks?.applyFilters?.('wedocs_pro_loaded', false));
    });
  }

  /** Collected console errors, for specs that assert a screen is clean. */
  trackConsoleErrors(): string[] {
    const errors: string[] = [];
    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    return errors;
  }
}
