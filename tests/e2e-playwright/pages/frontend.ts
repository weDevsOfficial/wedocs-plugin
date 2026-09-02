import { type Page } from '@playwright/test';
import { Base } from './base';
import { Selectors } from './selectors';

export type DocsRender = {
  wraps: number;
  col: string | null;
  docTitles: string[];
  sectionCounts: number[];
  moreLabels: string[];
  hasPager: boolean;
  pageInfo: string | null;
  nextDisabled: boolean;
  prevDisabled: boolean;
};

export type FaqRender = {
  sections: number;
  groups: { name: string; items: number; questions: string[]; openItems: number; hasIcon: boolean }[];
};

export class FrontendPage extends Base {
  constructor(page: Page) {
    super(page);
  }

  async openPath(path: string) {
    await this.navigateToURL(this.pageUrl(path));
  }

  pageUrl(path: string): string {
    return this.docsPage.replace(/\/wp-admin.*$/, '') + path;
  }

  async readDocs(): Promise<DocsRender> {
    return this.page.evaluate((S) => {
      const wraps = [...document.querySelectorAll(S.docsWrap)];
      const wrap = wraps[0];

      if (!wrap) {
        return {
          wraps: 0, col: null, docTitles: [], sectionCounts: [],
          moreLabels: [], hasPager: false, pageInfo: null,
          nextDisabled: false, prevDisabled: false,
        };
      }

      const list = wrap.querySelector(S.docsList);
      const cards = [...wrap.querySelectorAll(S.docCard)];

      return {
        wraps: wraps.length,
        col: list ? (list.className.match(/col-(\d+)/) || [])[1] || null : null,
        docTitles: cards.map((c) => c.querySelector('h2, h3')?.textContent?.trim() || ''),
        sectionCounts: cards.map((c) => c.querySelectorAll(S.docSections).length),
        moreLabels: [...new Set(cards.map((c) => c.querySelector(S.docMoreLink)?.textContent?.trim() ?? ''))],
        hasPager: !!wrap.querySelector(S.pagination),
        pageInfo: wrap.querySelector(S.paginationInfo)?.textContent?.trim() || null,
        nextDisabled: !!wrap.querySelector(`${S.paginationNext}${S.paginationDisabled}`),
        prevDisabled: !!wrap.querySelector(`${S.paginationPrev}${S.paginationDisabled}`),
      };
    }, Selectors.frontend);
  }

  async readFaq(): Promise<FaqRender> {
    return this.page.evaluate((S) => {
      const sections = [...document.querySelectorAll(S.faqSection)];

      return {
        sections: sections.length,
        groups: sections.flatMap((s) =>
          [...s.querySelectorAll(S.faqGroup)].map((g) => {
            const items = [...g.querySelectorAll(S.faqItem)];
            return {
              name: g.querySelector(S.faqGroupTitle)?.textContent?.trim() || '',
              items: items.length,
              questions: items.map((i) => i.querySelector(S.faqQuestion)?.textContent?.trim() || ''),
              openItems: items.filter((i) => i.hasAttribute('open')).length,
              hasIcon: !!g.querySelector(S.faqGroupIcon),
            };
          }),
        ),
      };
    }, Selectors.frontend);
  }

  /** Fetch a path and report only what the specs assert, without navigating. */
  async probe(path: string) {
    return this.page.evaluate(async (url) => {
      const res = await fetch(url, { credentials: 'same-origin' });
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const wrap = doc.querySelector('.wedocs-shortcode-wrap');

      return {
        status: res.status,
        pageInfo: wrap?.querySelector('.wedocs-pagination__info')?.textContent?.trim() || null,
        docTitles: wrap ? [...wrap.querySelectorAll('li.wedocs-docs-single h2, li.wedocs-docs-single h3')].map((t) => t.textContent?.trim() || '') : [],
        // A PHP warning or fatal printed into the response would show up here.
        phpError: /Fatal error|There has been a critical error|Warning<b>|Notice:/.test(html),
        // Proof the raw query value is never echoed back into the markup.
        reflected: html.includes('<script>alert(1)</script>'),
      };
    }, this.pageUrl(path));
  }

  /** Next is a plain link, so wait for the navigation rather than the load state. */
  async clickNextPage() {
    await Promise.all([
      this.page.waitForURL(/wedocs_page=/),
      this.clickFirst(Selectors.frontend.paginationNext),
    ]);
    await this.waitForLoading();
  }

  async toggleFaqItem(index = 0) {
    const item = this.page.locator(Selectors.frontend.faqItem).nth(index);
    await item.locator(Selectors.frontend.faqQuestion).click();
    await this.page.waitForTimeout(400);
    return item.evaluate((el) => el.hasAttribute('open'));
  }
}
