import { expect, type Page } from '@playwright/test';
import { Base } from './base';
import { Selectors } from './selectors';

export class FaqPage extends Base {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.navigateToURL(this.faqPage);
    await this.waitForFaqApp();
  }

  /**
   * Reload and wait for the group list to actually render.
   *
   * waitForFaqApp() only proves the app mounted: the "New FAQ Group" button
   * paints before the groups are fetched, so counting rows straight after a
   * plain reload reads zero and looks like the data vanished.
   */
  async reloadAndWait() {
    await this.page.reload();
    await this.waitForFaqApp();
    await this.page.waitForFunction(
      () => (document.querySelectorAll('#wedocs-faq-app div.border.border-gray-300').length > 0),
      undefined,
      { timeout: 30000 },
    );
  }

  async assertAppMounted() {
    await this.assertVisible(Selectors.faq.root);
  }

  /**
   * The heading renders exactly one <h1>. A second one was a real regression
   * once (the template heading duplicated FaqApp's), so assert the count.
   */
  async headingCount(): Promise<number> {
    return this.page.locator(Selectors.faq.heading).count();
  }

  async createGroup(title: string) {
    await this.clickFirst(Selectors.faq.newGroupButton);
    await this.page.waitForSelector(Selectors.faq.modalTitleInput);
    await this.fillFirst(Selectors.faq.modalTitleInput, title);
    await this.clickFirst(Selectors.faq.modalCreate);
    await this.page.waitForSelector(Selectors.faq.modal, { state: 'detached' });
    await this.assertGroupVisible(title);
  }

  async renameGroup(from: string, to: string) {
    await this.clickFirst(Selectors.faq.editGroup(from));
    await this.page.waitForSelector(Selectors.faq.modalTitleInput);
    await this.fillFirst(Selectors.faq.modalTitleInput, to);
    await this.clickFirst(Selectors.faq.modalSave);
    await this.page.waitForSelector(Selectors.faq.modal, { state: 'detached' });
    await this.assertGroupVisible(to);
  }

  /**
   * Confirm dialogs are keyed on their button, never on [role="dialog"].
   * Headless UI puts that role on a `relative` wrapper whose only children are
   * `fixed`, so the wrapper has no box and Playwright never reports it visible,
   * even while the dialog is on screen and interactive.
   */
  private async confirmVia(trigger: string, confirmButton: string) {
    await this.clickFirst(trigger);
    await this.page.waitForSelector(confirmButton, { state: 'visible' });
    await this.clickFirst(confirmButton);
    await this.page.waitForSelector(confirmButton, { state: 'detached' });

    // A failed duplicate swaps in an error dialog instead of closing quietly;
    // surface its message rather than letting the next assertion guess.
    const failure = this.page.locator('[role="dialog"]:has-text("Duplication Failed")');

    if (await failure.count()) {
      throw new Error(`FAQ action reported a failure dialog: ${(await failure.first().textContent())?.trim()}`);
    }
  }

  async deleteGroup(title: string) {
    await this.confirmVia(Selectors.faq.deleteGroup(title), Selectors.faq.confirmDelete);
  }

  async duplicateGroup(title: string) {
    await this.confirmVia(Selectors.faq.duplicateGroup(title), Selectors.faq.confirmDuplicate);
  }

  /**
   * Expanded state, read from the DOM rather than from the control.
   *
   * Collapsing animates the panel to `max-height: 0px`; it does NOT unmount the
   * rows, so waiting for them to detach never resolves, and they keep a
   * bounding box so Playwright still calls them visible. The panel height is
   * the only honest signal. The expand button cannot stand in for it either:
   * its aria-label is hard-coded to "Expand FAQ group" in both directions and
   * it carries no aria-expanded.
   */
  async isGroupExpanded(title: string): Promise<boolean> {
    return this.page.evaluate((groupTitle) => {
      const rows = [...document.querySelectorAll('#wedocs-faq-app div.border.border-gray-300')];
      const row = rows.find((r) => r.textContent?.includes(groupTitle));

      if (!row) {
        return false;
      }

      const panel = row.querySelector('[style*="max-height"]') as HTMLElement | null;
      const open = !panel || panel.style.maxHeight !== '0px';

      return open && row.querySelectorAll('.text-base.font-medium.text-gray-700').length > 0;
    }, title);
  }

  private async waitForExpanded(title: string, expected: boolean) {
    await this.page.waitForFunction(
      ({ groupTitle, want }) => {
        const rows = [...document.querySelectorAll('#wedocs-faq-app div.border.border-gray-300')];
        const row = rows.find((r) => r.textContent?.includes(groupTitle));

        if (!row) {
          return false;
        }

        const panel = row.querySelector('[style*="max-height"]') as HTMLElement | null;
        const open = (!panel || panel.style.maxHeight !== '0px')
          && row.querySelectorAll('.text-base.font-medium.text-gray-700').length > 0;

        return open === want;
      },
      { groupTitle: title, want: expected },
      { timeout: 20000 },
    );
  }

  async expandGroup(title: string) {
    if (await this.isGroupExpanded(title)) {
      return;
    }

    await this.clickFirst(Selectors.faq.toggleExpand(title));
    await this.waitForExpanded(title, true);
  }

  async collapseGroup(title: string) {
    if (!(await this.isGroupExpanded(title))) {
      return;
    }

    await this.clickFirst(Selectors.faq.toggleExpand(title));
    await this.waitForExpanded(title, false);
  }

  /**
   * Flip a group's active switch and wait for the write to land, not for a
   * fixed delay: reloading before the request settles reads back the old value
   * and looks exactly like a persistence bug.
   */
  async toggleGroupStatus(title: string) {
    const [response] = await Promise.all([
      this.page.waitForResponse(
        (r) => /wedocs-faq-groups/.test(r.url()) && r.request().method() !== 'GET',
        { timeout: 20000 },
      ),
      this.clickFirst(Selectors.faq.groupToggle(title)),
    ]);

    if (!response.ok()) {
      throw new Error(`toggling "${title}" failed: ${response.status()} ${await response.text()}`);
    }
  }

  async addFaq(groupTitle: string, question: string, answer: string) {
    // The form stays open after a save, and the button toggles it, so clicking
    // again when it is already open would close it.
    if (!(await this.page.locator(Selectors.faq.questionInput).count())) {
      await this.clickFirst(Selectors.faq.addFaqButton(groupTitle));
    }

    await this.page.waitForSelector(Selectors.faq.questionInput);
    await this.fillFirst(Selectors.faq.questionInput, question);

    // The answer is a Tiptap editor, so type into the contenteditable body.
    const editor = this.page.locator(Selectors.faq.answerInput).first();
    await editor.waitFor({ state: 'visible' });
    await editor.click();
    await editor.fill(answer).catch(async () => {
      await this.page.keyboard.type(answer);
    });

    await this.clickFirst(Selectors.faq.createFaq);
    await this.page.waitForTimeout(1500);
  }

  async assertGroupVisible(title: string) {
    await expect(this.page.locator(Selectors.faq.groupRow(title)).first()).toBeVisible();
  }

  async assertGroupAbsent(title: string) {
    await expect(this.page.locator(Selectors.faq.groupRow(title))).toHaveCount(0);
  }

  async groupCount(): Promise<number> {
    return this.page.locator(Selectors.faq.groupTitles).count();
  }

  /**
   * Text of the last toast raised. Every FAQ action reports through SweetAlert2,
   * which is what makes a rejected request visible instead of silent.
   */
  async lastToast(): Promise<string | null> {
    const toast = this.page.locator(Selectors.faq.toastTitle).first();

    try {
      await toast.waitFor({ state: 'visible', timeout: 5000 });
      return (await toast.textContent())?.trim() || null;
    } catch {
      return null;
    }
  }

  /** Tiptap mounts one editor per FAQ; collapsed groups must mount none. */
  async mountedEditorCount(): Promise<number> {
    return this.page.locator('#wedocs-faq-app .ProseMirror').count();
  }
}
