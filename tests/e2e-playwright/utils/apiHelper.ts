import type { Page } from '@playwright/test';

/**
 * REST calls issued from inside an authenticated wp-admin page.
 *
 * Seeding through the UI would make every spec depend on the editor screens it
 * is not testing, so fixtures go in over REST instead. The call runs in the page
 * context to reuse the logged-in cookie and the nonce weDocs already localises
 * (`wp.apiFetch` carries it; the raw-fetch fallback reads `wpApiSettings`).
 */
export async function rest<T = any>(
  page: Page,
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: unknown,
): Promise<T> {
  const result = await page.evaluate(
    async ({ path, method, body }) => {
      const w = window as any;

      try {
        if (w.wp?.apiFetch) {
          return { ok: true, data: await w.wp.apiFetch({ path, method, data: body }) };
        }

        const nonce = w.wpApiSettings?.nonce;
        const root = w.wpApiSettings?.root || '/wp-json/';
        const res = await fetch(root.replace(/\/$/, '') + path, {
          method,
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            ...(nonce ? { 'X-WP-Nonce': nonce } : {}),
          },
          body: body ? JSON.stringify(body) : undefined,
        });

        const data = await res.json();
        return res.ok ? { ok: true, data } : { ok: false, error: JSON.stringify(data) };
      } catch (e) {
        return { ok: false, error: (e as Error).message || String(e) };
      }
    },
    { path, method, body },
  );

  if (!result.ok) {
    throw new Error(`REST ${method} ${path} failed: ${result.error}`);
  }

  return result.data as T;
}

/** Same shape WordPress gives a title, so a lookup by slug is deterministic. */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Fixtures are find-or-create so a second run reuses the first run's data.
 * Creating unconditionally piles up duplicate docs and makes the FAQ group
 * insert fail outright ("a term with the name provided already exists"), which
 * then breaks every spec that reads the baseline.
 *
 * The lookup goes by slug, not by `search`: search is a relevance match whose
 * result set depends on what else is on the install, so it silently missed an
 * existing doc and seeded a duplicate. A slug is exact.
 */
export async function createDoc(page: Page, title: string, parent = 0, order = 0) {
  const slug = slugify(title);
  const found = await rest<any[]>(page, `/wp/v2/docs?slug=${slug}&per_page=100&status=publish,draft`, 'GET');

  if (found.length) {
    return { id: found[0].id as number, link: found[0].link as string };
  }

  return rest<{ id: number; link: string }>(page, '/wp/v2/docs', 'POST', {
    title,
    slug,
    status: 'publish',
    parent,
    menu_order: order,
  });
}

export async function createFaqGroup(page: Page, name: string) {
  const slug = slugify(name);
  const found = await rest<any[]>(page, `/wp/v2/wedocs-faq-groups?slug=${slug}&per_page=100`, 'GET');

  if (found.length) {
    return { id: found[0].id as number, slug: found[0].slug as string };
  }

  return rest<{ id: number; slug: string }>(page, '/wp/v2/wedocs-faq-groups', 'POST', { name, slug });
}

/**
 * Pin a group's active flag.
 *
 * The seeder always sets it: WP deletes the meta row for boolean false, so an
 * empty value means "explicitly disabled" to the shortcode, and a group left
 * disabled by an earlier run (or by hand) silently drops its FAQs from every
 * frontend assertion.
 */
export async function setFaqGroupStatus(page: Page, groupId: number, status: boolean) {
  return rest(page, `/wp/v2/wedocs-faq-groups/${groupId}`, 'POST', { meta: { status } });
}

export async function createFaq(page: Page, question: string, answer: string, groupId: number, order = 0) {
  const slug = slugify(question);
  const found = await rest<any[]>(page, `/wp/v2/wedocs-faqs?slug=${slug}&per_page=100&status=publish,draft`, 'GET');

  if (found.length) {
    return { id: found[0].id as number };
  }

  return rest<{ id: number }>(page, '/wp/v2/wedocs-faqs', 'POST', {
    title: question,
    slug,
    content: answer,
    status: 'publish',
    'wedocs-faq-groups': [groupId],
    menu_order: order,
  });
}

/**
 * A published page holding exactly one shortcode. Nothing else goes in the
 * content: a `<code>` label showing the shortcode would still be executed by
 * do_shortcode() and render a second, silently misparsed copy.
 */
export async function createShortcodePage(page: Page, slug: string, title: string, shortcode: string) {
  const existing = await rest<any[]>(page, `/wp/v2/pages?slug=${slug}&status=publish,draft`, 'GET');

  if (existing.length) {
    return rest<{ id: number; link: string }>(page, `/wp/v2/pages/${existing[0].id}`, 'POST', {
      content: shortcode,
      status: 'publish',
    });
  }

  return rest<{ id: number; link: string }>(page, '/wp/v2/pages', 'POST', {
    title,
    slug,
    content: shortcode,
    status: 'publish',
  });
}
