import { expect, type Page } from '@playwright/test';
import { Base } from './base';
import { Selectors } from './selectors';

export class DocsPage extends Base {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.navigateToURL(this.docsPage);
    await this.waitForSpa();
  }

  async openDashboard() {
    await this.navigateToURL(this.dashboardPage);
    await this.waitForSpa();
  }

  async assertMenuVisible() {
    await this.assertVisible(Selectors.wpAdmin.menuRoot);
  }

  async assertAppMounted() {
    await this.assertVisible(Selectors.spaRoot);
  }

  async assertNewDocButton() {
    await this.assertVisible(Selectors.docs.newDocButton);
  }

  async assertDocListed(title: string) {
    await expect(this.page.locator(Selectors.docs.docByTitle(title)).first()).toBeVisible();
  }

  /** The admin menu icon is the weDocs mark served as a data URI, not a dashicon. */
  async menuIconBackground(): Promise<string> {
    return this.page.evaluate((sel) => {
      const el = document.querySelector(sel) as HTMLElement | null;
      return el ? getComputedStyle(el).backgroundImage : '';
    }, Selectors.wpAdmin.menuIcon);
  }
}
