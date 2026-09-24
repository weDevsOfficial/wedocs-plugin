import { existsSync } from 'fs';
import { join } from 'path';
import type { BrowserContext } from '@playwright/test';

// Playwright runs from the e2e-playwright dir (where the config lives) both
// locally and in CI, so resolve against the working directory. This module is
// ESM, so there is no __dirname.

// Admin cookies saved once by the setup project. Every admin spec reuses them so
// its login lands already authenticated and skips the wp-login form.
export const ADMIN_AUTH_FILE = join(process.cwd(), 'playwright', '.auth', 'admin.json');

// newContext() options: attach the saved admin state when it exists, otherwise
// fall back to a fresh context so a single-spec local run still works via the
// normal login form.
export function wedocsContextOptions(): { storageState?: string } {
  return existsSync(ADMIN_AUTH_FILE) ? { storageState: ADMIN_AUTH_FILE } : {};
}

export async function saveAdminAuth(context: BrowserContext): Promise<void> {
  await context.storageState({ path: ADMIN_AUTH_FILE });
}
