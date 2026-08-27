import { test } from '@playwright/test';

// Specs share state across their steps, so a failure part-way through makes the
// rest meaningless. Serial mode stops the file at the first failure.
export function configureSpecFailFast() {
  test.describe.configure({ mode: 'serial', retries: 0 });
}
