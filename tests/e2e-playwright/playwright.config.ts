import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config({ quiet: true });

// One config, real Playwright sharding. CI splits the suite across parallel
// matrix jobs by feature FOLDER (see .github/workflows/e2e-wedocs.yml) so related
// specs stay together. The `setup` project runs first on every shard (dependency)
// to seed the reused admin auth and the shared fixtures; `chromium` then runs
// that shard's specs.
export default defineConfig({
  testDir: './tests',
  globalSetup: './global-setup',
  timeout: 90000,
  expect: { timeout: 20000 },
  // Tests WITHIN a file stay serial and ordered (they share state); only whole
  // files run concurrently across workers.
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 3,
  // blob → mergeable across shards into one HTML report (merge-reports job).
  reporter: process.env.CI
    ? [['blob'], ['list']]
    : [['list'], ['html', { outputFolder: './playwright-report', open: 'never' }]],
  use: {
    // Bounded so a wrong or blocked selector fails in 15s, not the whole timeout.
    actionTimeout: 15000,
    headless: true,
    viewport: { width: 1440, height: 900 },
    ignoreHTTPSErrors: true,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
    baseURL: process.env.QA_BASE_URL || 'http://localhost:8889',
  },
  projects: [
    // Logs in as admin once and saves storageState for the whole shard.
    {
      name: 'setup',
      testMatch: /setup\/.*\.spec\.ts$/,
      use: { ...devices['Desktop Chrome'] },
    },
    // Every feature spec. Reuses the admin auth the setup project saved.
    {
      name: 'chromium',
      testIgnore: /setup\//,
      dependencies: ['setup'],
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
