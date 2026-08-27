import { faker } from '@faker-js/faker';

export const Urls = {
  baseUrl: process.env.QA_BASE_URL ? process.env.QA_BASE_URL : 'http://localhost:8889',
};

export const Users = {
  adminUsername: process.env.QA_ADMIN_USERNAME ? process.env.QA_ADMIN_USERNAME : 'admin',
  adminPassword: process.env.QA_ADMIN_PASSWORD ? process.env.QA_ADMIN_PASSWORD : 'password',

  editorUsername: process.env.QA_EDITOR_USERNAME ? process.env.QA_EDITOR_USERNAME : 'wedocs_editor_user',
  editorPassword: process.env.QA_EDITOR_PASSWORD ? process.env.QA_EDITOR_PASSWORD : 'password',

  subscriberUsername: process.env.QA_SUBSCRIBER_USERNAME ? process.env.QA_SUBSCRIBER_USERNAME : 'wedocs_subscriber_user',
  subscriberPassword: process.env.QA_SUBSCRIBER_PASSWORD ? process.env.QA_SUBSCRIBER_PASSWORD : 'password',
};

export const AdminPaths = {
  docs: '/wp-admin/admin.php?page=wedocs#/',
  dashboard: '/wp-admin/admin.php?page=wedocs#/dashboard',
  settings: '/wp-admin/admin.php?page=wedocs#/settings',
  faq: '/wp-admin/admin.php?page=wedocs-faq',
  tags: '/wp-admin/edit-tags.php?taxonomy=doc_tag&post_type=docs',
};

export const DocData = {
  // Seeded once by the setup project; shortcode specs assert against it, so it
  // must not be renamed or deleted mid-run.
  baseline: {
    title: 'E2E Baseline Doc',
    section: 'E2E Baseline Section',
    article: 'E2E Baseline Article',
  },
  random(): { title: string } {
    return { title: `E2E Doc ${faker.string.alphanumeric(6)}` };
  },
};

export const FaqData = {
  baselineGroup: 'E2E Baseline FAQ Group',
  randomGroup(): { title: string } {
    return { title: `E2E FAQ Group ${faker.string.alphanumeric(5)}` };
  },
  randomFaq(): { question: string; answer: string } {
    const id = faker.string.alphanumeric(5);
    return { question: `E2E Question ${id}`, answer: `E2E answer body ${id}.` };
  },
};

/**
 * Every attribute pattern the two free shortcodes accept, plus the edge cases
 * that decide a branch in Shortcode.php. `expect` is asserted by the specs.
 *
 * Counts are relative to the fixtures the setup project seeds, so they stay
 * stable no matter what else is on the install.
 */
export const ShortcodePatterns = {
  docs: [
    { id: 'D01', label: 'bare', code: '[wedocs]', expect: { renders: true, col: '2' } },
    { id: 'D02', label: 'col 1', code: '[wedocs col="1"]', expect: { renders: true, col: '1' } },
    { id: 'D03', label: 'col 3', code: '[wedocs col="3"]', expect: { renders: true, col: '3' } },
    { id: 'D04', label: 'col 4', code: '[wedocs col="4"]', expect: { renders: true, col: '4' } },
    // Non-numeric col is int-cast before the template, so it lands on col-0.
    { id: 'D05', label: 'col non numeric', code: '[wedocs col="abc"]', expect: { renders: true, col: '0' } },
    { id: 'D06', label: 'items 1', code: '[wedocs items="1"]', expect: { renders: true, maxSections: 1 } },
    { id: 'D07', label: 'items 0', code: '[wedocs items="0"]', expect: { renders: true } },
    { id: 'D08', label: 'include unknown id', code: '[wedocs include="999999"]', expect: { renders: false } },
    { id: 'D09', label: 'custom more label', code: '[wedocs more="Read the full guide"]', expect: { renders: true, more: 'Read the full guide' } },
    { id: 'D10', label: 'empty more label', code: '[wedocs more=""]', expect: { renders: true, more: '' } },
    { id: 'D11', label: 'unknown attribute ignored', code: '[wedocs bogus="1" col="2"]', expect: { renders: true, col: '2' } },
    { id: 'D12', label: 'paginate larger than total', code: '[wedocs paginate="99"]', expect: { renders: true, pager: false } },
    { id: 'D13', label: 'paginate 1', code: '[wedocs paginate="1"]', expect: { renders: true, pager: true } },
  ],
  faq: [
    { id: 'F01', label: 'bare', code: '[wedocs_faq]', expect: { renders: true } },
    { id: 'F02', label: 'limit 1', code: '[wedocs_faq limit="1"]', expect: { renders: true, perGroup: 1 } },
    { id: 'F03', label: 'explicit limit -1', code: '[wedocs_faq limit="-1"]', expect: { renders: true } },
    { id: 'F04', label: 'unknown group renders nothing', code: '[wedocs_faq group="does-not-exist"]', expect: { renders: false } },
    { id: 'F05', label: 'orderby title desc', code: '[wedocs_faq orderby="title" order="DESC"]', expect: { renders: true } },
    { id: 'F06', label: 'orderby date asc', code: '[wedocs_faq orderby="date" order="ASC"]', expect: { renders: true } },
    { id: 'F07', label: 'orderby rand', code: '[wedocs_faq orderby="rand"]', expect: { renders: true } },
    { id: 'F08', label: 'invalid order value', code: '[wedocs_faq order="SIDEWAYS"]', expect: { renders: true } },
    { id: 'F09', label: 'bogus orderby value', code: '[wedocs_faq orderby="not_a_field"]', expect: { renders: true } },
    { id: 'F10', label: 'unknown attribute ignored', code: '[wedocs_faq bogus="x"]', expect: { renders: true } },
    { id: 'F11', label: 'group value with injection attempt', code: `[wedocs_faq group="e2e' OR 1=1--"]`, expect: { renders: false } },
  ],
};

/**
 * Hostile and boundary values for `?wedocs_page`. The shortcode must clamp every
 * one of them without a PHP error and without echoing the value back.
 */
export const PaginationProbes = [
  { query: '', expectPage: 1 },
  { query: '?wedocs_page=1', expectPage: 1 },
  { query: '?wedocs_page=2', expectPage: 2 },
  { query: '?wedocs_page=99', expectPage: 'last' },
  { query: '?wedocs_page=0', expectPage: 1 },
  { query: '?wedocs_page=-1', expectPage: 1 },
  { query: '?wedocs_page=abc', expectPage: 1 },
  { query: '?wedocs_page=2.9', expectPage: 2 },
  { query: '?wedocs_page[]=2', expectPage: 1 },
  { query: '?wedocs_page=%3Cscript%3Ealert(1)%3C/script%3E', expectPage: 1 },
] as const;
