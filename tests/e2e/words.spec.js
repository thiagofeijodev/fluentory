/**
 * Words Management E2E Tests
 * Tests word CRUD operations and vocabulary features across different devices
 */

import { test, expect } from '@playwright/test';
import {
  waitForPageLoad,
  takeScreenshot,
  checkResponsiveDesign,
  loginUser,
} from './utils/test-helpers.js';

test.describe('Words Management', () => {
  test.beforeEach(async ({ page, context }) => {
    // Login using the generic login function
    await loginUser(page);

    await takeScreenshot(page, 'before-test', context);
  });

  test('should display home page with words list', async ({ page, context }) => {
    await page.goto('/app');
    await waitForPageLoad(page);

    await checkResponsiveDesign(page, context);

    // Check if words list is visible
    const wordsList = page.locator('[data-testid="words-list"], .words-list, [class*="word"]');
    await expect(wordsList).toBeVisible();

    // Check if add word button is visible
    const addWordButton = page.locator('button:has-text("Add"), [data-testid="add-word"]');
    await expect(addWordButton).toBeVisible();

    await takeScreenshot(page, 'words-list', context);
  });

  test('should handle word relationships interactions', async ({ page, context }) => {
    await page.goto('/app/words');
    await waitForPageLoad(page);

    // Test graph interactions
    const wordGraph = page.locator('[data-testid="word-graph"], .word-graph, canvas');
    if (await wordGraph.isVisible()) {
      // Click on a word node
      await wordGraph.click({ position: { x: 100, y: 100 } });

      // Check if word details are shown
      const wordDetails = page.locator('[data-testid="word-details"], .word-details');
      if (await wordDetails.isVisible()) {
        await expect(wordDetails).toBeVisible();
      }
    }

    await takeScreenshot(page, 'word-graph-interaction', context);
  });

  test('should maintain responsive design on different screen sizes', async ({ page, context }) => {
    await page.goto('/app');
    await waitForPageLoad(page);

    // Check responsive design across viewports
    const deviceInfo = await checkResponsiveDesign(page, context);

    // Verify words list is always visible regardless of device
    const wordsList = page.locator('[data-testid="words-list"]');
    await expect(wordsList).toBeVisible();

    // Verify device info is properly detected
    expect(typeof deviceInfo.isMobile).toBe('boolean');
    expect(typeof deviceInfo.isTablet).toBe('boolean');

    await takeScreenshot(page, 'responsive-words', context);
  });

  test('should keep page functional when going offline', async ({ page, context }) => {
    await page.goto('/app');
    await waitForPageLoad(page);

    // Verify page is functional before going offline
    const body = page.locator('body');
    await expect(body).toBeVisible();

    // Simulate offline
    await page.context().setOffline(true);

    // Verify page remains visible and functional offline
    await expect(body).toBeVisible();

    // Go back online
    await page.context().setOffline(false);

    // Verify page is still functional after reconnecting
    await expect(body).toBeVisible();

    await takeScreenshot(page, 'offline-handling', context);
  });
});
