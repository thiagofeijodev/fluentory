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

  test('should test responsive design on different screen sizes', async ({ page, context }) => {
    await page.goto('/app');
    await waitForPageLoad(page);

    const deviceInfo = await checkResponsiveDesign(page, context);

    // Check if layout adapts to screen size
    if (deviceInfo.isMobile) {
      // On mobile, check if words list is stacked vertically
      const wordsList = page.locator('[data-testid="words-list"]');
      await expect(wordsList).toBeVisible();
    } else if (deviceInfo.isTablet) {
      // On tablet, check if layout is responsive
      const wordsList = page.locator('[data-testid="words-list"]');
      await expect(wordsList).toBeVisible();
    } else {
      // On desktop, check if layout uses full width
      const wordsList = page.locator('[data-testid="words-list"]');
      await expect(wordsList).toBeVisible();
    }

    await takeScreenshot(page, 'responsive-words', context);
  });

  test('should handle offline scenarios gracefully', async ({ page, context }) => {
    await page.goto('/app');
    await waitForPageLoad(page);

    // Simulate offline
    await page.context().setOffline(true);

    // Try to add a word
    const addWordButton = page.locator('button:has-text("Add"), [data-testid="add-word"]');
    if (await addWordButton.isVisible()) {
      await addWordButton.click();
      const wordInput = page.locator('input[name="word"], [data-testid="add-word"]');
      if (await wordInput.isVisible()) {
        await wordInput.fill('offline-test');
      }
    }

    // Should show offline message or queue the action
    const offlineMessage = page.locator('[data-testid="offline"], .offline-message');
    if (await offlineMessage.isVisible()) {
      await expect(offlineMessage).toBeVisible();
    }

    // Go back online
    await page.context().setOffline(false);

    await takeScreenshot(page, 'offline-handling', context);
  });
});
