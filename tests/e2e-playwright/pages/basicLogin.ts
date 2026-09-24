import { type Page } from '@playwright/test';
import { Selectors } from './selectors';
import { Base } from './base';

export class BasicLoginPage extends Base {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Land in wp-admin. With the saved storageState the login form never appears,
   * so only fill it when it does.
   */
  async basicLogin(username: string, password: string) {
    await this.navigateToURL(this.wpAdminPage);

    if (await this.page.isVisible(Selectors.login.emailField)) {
      await this.fillFirst(Selectors.login.emailField, username);
      await this.fillFirst(Selectors.login.passwordField, password);
      await this.clickFirst(Selectors.login.submit);
      await this.waitForLoading();
    }

    await this.validateBasicLogin();
  }

  async loginAndVisitDocs(username: string, password: string) {
    await this.basicLogin(username, password);
    await this.navigateToURL(this.docsPage);
    await this.waitForSpa();
  }

  async loginAndVisitFaq(username: string, password: string) {
    await this.basicLogin(username, password);
    await this.navigateToURL(this.faqPage);
    await this.waitForFaqApp();
  }

  async validateBasicLogin() {
    await this.assertVisible(Selectors.login.dashboardLoaded);
  }
}
