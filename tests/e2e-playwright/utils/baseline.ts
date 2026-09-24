import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import type { Page } from '@playwright/test';
import { createDoc, createFaq, createFaqGroup, createShortcodePage, setFaqGroupStatus } from './apiHelper';
import { DocData, FaqData, ShortcodePatterns } from './testData';

export const BASELINE_FILE = join(process.cwd(), 'playwright', '.auth', 'baseline.json');

export type Baseline = {
  docId: number;
  sectionId: number;
  articleId: number;
  faqGroupId: number;
  faqGroupSlug: string;
  faqIds: number[];
  pages: Record<string, string>;
};

export function readBaseline(): Baseline {
  if (!existsSync(BASELINE_FILE)) {
    throw new Error(`baseline.json missing — the setup project must run first (${BASELINE_FILE})`);
  }

  return JSON.parse(readFileSync(BASELINE_FILE, 'utf8')) as Baseline;
}

/**
 * Seed the fixtures every other spec reads, then persist their ids.
 *
 * One doc with a section and an article gives [wedocs] something with real
 * nesting to lay out; one FAQ group with two FAQs gives [wedocs_faq] a group
 * that survives hide_empty. Every shortcode pattern gets its own page so a
 * failure names the pattern that broke rather than a shared page.
 */
export async function saveBaseline(page: Page): Promise<Baseline> {
  const doc = await createDoc(page, DocData.baseline.title, 0, 0);
  const section = await createDoc(page, DocData.baseline.section, doc.id, 0);
  const article = await createDoc(page, DocData.baseline.article, section.id, 0);

  const group = await createFaqGroup(page, FaqData.baselineGroup);

  // Pin it active. A group left disabled by an earlier run drops all of its
  // FAQs from the frontend, which reads as a broken shortcode rather than as
  // stale fixture state.
  await setFaqGroupStatus(page, group.id, true);

  const faqs: number[] = [];

  for (let i = 1; i <= 3; i++) {
    const faq = await createFaq(page, `E2E Baseline Question ${i}`, `<p>E2E baseline answer ${i}.</p>`, group.id, i);
    faqs.push(faq.id);
  }

  const pages: Record<string, string> = {};

  for (const pattern of [...ShortcodePatterns.docs, ...ShortcodePatterns.faq]) {
    const slug = `e2e-sc-${pattern.id.toLowerCase()}`;
    await createShortcodePage(page, slug, `E2E Shortcode ${pattern.id}`, pattern.code);
    pages[pattern.id] = `/${slug}/`;
  }

  // Pagination probes need a doc set larger than one page, so add siblings and a
  // dedicated page pinned to one doc per page.
  for (let i = 1; i <= 2; i++) {
    await createDoc(page, `E2E Pagination Doc ${i}`, 0, 10 + i);
  }

  await createShortcodePage(page, 'e2e-sc-paginate', 'E2E Shortcode Paginate', '[wedocs paginate="1"]');
  pages.PAGINATE = '/e2e-sc-paginate/';

  // All three shortcodes together, to prove they coexist and each enqueues its
  // own assets on one request.
  await createShortcodePage(page, 'e2e-sc-combined', 'E2E Shortcode Combined', '[wedocs col="1"]\n[wedocs_faq limit="1"]');
  pages.COMBINED = '/e2e-sc-combined/';

  const baseline: Baseline = {
    docId: doc.id,
    sectionId: section.id,
    articleId: article.id,
    faqGroupId: group.id,
    faqGroupSlug: group.slug,
    faqIds: faqs,
    pages,
  };

  mkdirSync(dirname(BASELINE_FILE), { recursive: true });
  writeFileSync(BASELINE_FILE, JSON.stringify(baseline, null, 2));

  return baseline;
}
