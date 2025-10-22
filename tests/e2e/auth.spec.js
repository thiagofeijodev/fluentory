import { test, expect } from '@playwright/test';
import { loginUser } from './utils/test-helpers.js';

test.describe('Authentication', () => {
  test('should allow a user to log in with mocked credentials', async ({ page }) => {
    // Login using the generic login function
    await loginUser(page);

    // Check that the user is on the home page.
    await expect(page.getByText('Home')).toBeVisible();
    await expect(page.getByText('Words:')).toBeVisible();
  });
});
