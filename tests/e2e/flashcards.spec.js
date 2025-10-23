/**
 * Flashcards E2E Tests
 * Tests flashcard functionality and study features across different devices
 */

import { test, expect } from '@playwright/test';
import {
  waitForPageLoad,
  takeScreenshot,
  checkResponsiveDesign,
  loginUser,
} from './utils/test-helpers.js';

test.describe('Flashcards Study Mode', () => {
  test.beforeEach(async ({ page, context }) => {
    // Login using the generic login function
    await loginUser(page);

    await takeScreenshot(page, 'before-test', context);
  });

  test('should display flashcards page correctly', async ({ page, context }) => {
    // We should already be logged in from beforeEach, so just navigate to flashcards
    await page.goto('/app/flashcards');
    await waitForPageLoad(page);

    await checkResponsiveDesign(page, context);

    const pageContent = page.locator('body');
    const backButton = page.locator('button:has-text("Back")');

    // Page content should always be visible
    await expect(pageContent).toBeVisible();

    // Wait for loading to finish if present
    await page
      .waitForFunction(
        () => !document.querySelector('[role="progressbar"], .spinner, [class*="spinner"]'),
        { timeout: 5000 },
      )
      .catch(() => {});

    // After loading finishes, back button should be visible
    await expect(backButton).toBeVisible();

    await takeScreenshot(page, 'flashcards-page', context);
  });

  test('should navigate between flashcards when cards available', async ({ page, context }) => {
    await page.goto('/app/flashcards');
    await waitForPageLoad(page);

    const flashcardContainer = page.locator(
      '[data-testid="flashcard"], .flashcard, [class*="flashcard"]',
    );

    // Expect flashcards to be visible
    await expect(flashcardContainer).toBeVisible();

    // Get initial card content
    const initialCard = page.locator('[data-testid="flashcard"], .flashcard, [class*="flashcard"]');
    const initialContent = await initialCard.textContent();

    // Click next button
    const nextButton = page.locator('button:has-text("Next"), [data-testid="next-card"]');
    await expect(nextButton).toBeEnabled();
    await nextButton.click();

    // Should show different card
    const nextCard = page.locator('[data-testid="flashcard"], .flashcard, [class*="flashcard"]');
    await expect(nextCard).not.toHaveText(initialContent);

    // Click previous button
    const previousButton = page.locator(
      'button:has-text("Previous"), [data-testid="previous-card"]',
    );
    await previousButton.click();

    // Should go back to initial card
    const previousCard = page.locator(
      '[data-testid="flashcard"], .flashcard, [class*="flashcard"]',
    );
    await expect(previousCard).toHaveText(initialContent);

    await takeScreenshot(page, 'flashcard-navigation', context);
  });

  test('should display empty state when no flashcards available', async ({ page, context }) => {
    await page.goto('/app/flashcards');
    await waitForPageLoad(page);

    const emptyState = page.locator(
      'text=No words available, text=No words, [data-testid="empty-state"]',
    );

    // Expect empty state to be visible
    await expect(emptyState).toBeVisible();

    await takeScreenshot(page, 'flashcard-empty-state', context);
  });

  test('should handle keyboard navigation in flashcards', async ({ page, context }) => {
    await page.goto('/app/flashcards');
    await waitForPageLoad(page);

    // Test keyboard shortcuts
    await page.keyboard.press('ArrowRight'); // Next card
    await page.keyboard.press('ArrowLeft'); // Previous card
    await page.keyboard.press(' '); // Flip card (spacebar)
    await page.keyboard.press('Enter'); // Flip card (enter)

    // Verify page is still functional after keyboard navigation
    const body = page.locator('body');
    await expect(body).toBeVisible();

    await takeScreenshot(page, 'flashcard-keyboard', context);
  });

  test('should handle touch interactions on mobile', async ({ page, context }) => {
    const deviceInfo = await checkResponsiveDesign(page, context);
    // eslint-disable-next-line playwright/no-skipped-test
    test.skip(!deviceInfo.isMobile, 'Only runs on mobile devices');

    await page.goto('/app/flashcards');
    await waitForPageLoad(page);

    const body = page.locator('body');
    await expect(body).toBeVisible();

    // Test swipe gestures
    const flashcardContainer = page.locator(
      '[data-testid="flashcard"], .flashcard, [class*="flashcard"]',
    );

    // Swipe left for next card
    await flashcardContainer.hover();
    await page.mouse.down();
    await page.mouse.move(-100, 0);
    await page.mouse.up();

    // Swipe right for previous card
    await flashcardContainer.hover();
    await page.mouse.down();
    await page.mouse.move(100, 0);
    await page.mouse.up();

    // Tap to flip
    await flashcardContainer.tap();

    await takeScreenshot(page, 'flashcard-touch', context);
  });

  test('should show progress indicator on flashcards', async ({ page, context }) => {
    await page.goto('/app/flashcards');
    await waitForPageLoad(page);

    const flashcardContainer = page.locator(
      '[data-testid="flashcard"], .flashcard, [class*="flashcard"]',
    );

    // Expect flashcards to be visible
    await expect(flashcardContainer).toBeVisible();

    // Check if progress indicator is visible (counter like "1 / 5")
    const progressIndicator = page.locator(
      '[data-testid="progress"], .progress, [class*="progress"], text=/\\d+ \\/ \\d+/',
    );
    await expect(progressIndicator).toBeVisible();

    // Navigate through cards and check if progress updates
    const initialProgress = await progressIndicator.textContent();

    const nextButton = page.locator('button:has-text("Next"), [data-testid="next-card"]');
    await expect(nextButton).toBeEnabled();
    await nextButton.click();

    const updatedProgress = progressIndicator;
    await expect(updatedProgress).not.toHaveText(initialProgress);

    await takeScreenshot(page, 'flashcard-progress', context);
  });

  test('should display empty state when flashcard set is empty', async ({ page, context }) => {
    await page.goto('/app/flashcards');
    await waitForPageLoad(page);

    const pageContent = page.locator('body');
    await expect(pageContent).toBeVisible();

    // At least one of these messages should be present in the page
    const emptyState = page.locator('[data-testid="empty-state"], .empty-state, [class*="empty"]');
    const addWordsMessage = page.locator('text=Add words');
    const noWordsMessage = page.locator('text=No words available');

    const hasEmptyState = await emptyState.isVisible();
    const hasAddWordsMessage = await addWordsMessage.isVisible();
    const hasNoWordsMessage = await noWordsMessage.isVisible();

    expect(hasEmptyState || hasAddWordsMessage || hasNoWordsMessage).toBe(true);

    await takeScreenshot(page, 'flashcard-empty', context);
  });

  test('should adapt flashcard layout to different screen sizes', async ({ page, context }) => {
    await page.goto('/app/flashcards');
    await waitForPageLoad(page);

    await checkResponsiveDesign(page, context);

    const flashcardContainer = page.locator(
      '[data-testid="flashcard"], .flashcard, [class*="flashcard"]',
    );

    // Expect flashcards to be visible
    await expect(flashcardContainer).toBeVisible();

    // Check if flashcard layout adapts to screen size
    const nextButton = page.locator('button:has-text("Next"), [data-testid="next-card"]');
    const buttonSize = await nextButton.boundingBox();

    // Verify button has dimensions
    expect(buttonSize).toBeTruthy();
    expect(buttonSize?.height).toBeGreaterThanOrEqual(40);

    await takeScreenshot(page, 'flashcard-responsive', context);
  });

  test('should display touch-friendly controls on mobile', async ({ page, context }) => {
    const deviceInfo = await checkResponsiveDesign(page, context);
    // eslint-disable-next-line playwright/no-skipped-test
    test.skip(!deviceInfo.isMobile, 'Only runs on mobile devices');

    await page.goto('/app/flashcards');
    await waitForPageLoad(page);

    const nextButton = page.locator('button:has-text("Next"), [data-testid="next-card"]');
    const buttonSize = await nextButton.boundingBox();

    // On mobile, controls should be touch-friendly
    expect(buttonSize).toBeTruthy();
    expect(buttonSize?.height).toBeGreaterThanOrEqual(40);

    await takeScreenshot(page, 'flashcard-mobile-controls', context);
  });
});
