import { expect, type Page } from '@playwright/test';
import { Base } from './base';
import { Selectors } from './selectors';

export class SettingsPage extends Base {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.navigateToURL(this.settingsPage);
    await this.waitForSpa();
  }

  async openTab(label: string) {
    await this.clickFirst(Selectors.settings.tab(label));
    await this.page.waitForTimeout(500);
  }

  async assertHeading(text: string) {
    await expect(this.page.locator(Selectors.settings.heading).first()).toContainText(text);
  }

  /** Every shortcode card on the Shortcodes tab, in render order. */
  async shortcodeCards() {
    return this.page.evaluate(
      ({ card, title, badge, example, rows }) =>
        [...document.querySelectorAll(card)]
          .map((c) => ({
            title: c.querySelector(title)?.textContent?.trim() || null,
            badge: c.querySelector(badge)?.textContent?.trim() || null,
            example: c.querySelector(example)?.textContent?.trim() || null,
            attributes: [...c.querySelectorAll(rows)].map(
              (r) => r.querySelector('td code')?.textContent?.trim() || '',
            ),
          }))
          .filter((c) => c.title),
      {
        card: Selectors.settings.shortcodeCard,
        title: Selectors.settings.shortcodeCardTitle,
        badge: Selectors.settings.shortcodeCardBadge,
        example: Selectors.settings.shortcodeExample,
        rows: Selectors.settings.attributeRows,
      },
    );
  }
}
