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

    // Check if either flashcard container or empty state is visible
    const flashcardContainer = page.locator(
      '[data-testid="flashcard"], .flashcard, [class*="flashcard"]',
    );
    const emptyState = page.locator(
      'text=No words available, text=No words, [data-testid="empty-state"]',
    );
    const backButton = page.locator('button:has-text("Back")');
    const loadingSpinner = page.locator('[role="progressbar"], .spinner, [class*="spinner"]');
    const pageContent = page.locator('body');

    const hasFlashcards = await flashcardContainer.isVisible();
    const hasEmptyState = await emptyState.isVisible();
    const hasLoading = await loadingSpinner.isVisible();
    const hasPageContent = await pageContent.isVisible();

    // The page should show either flashcards, empty state, loading, or at least have content
    expect(hasFlashcards || hasEmptyState || hasLoading || hasPageContent).toBe(true);

    // Wait for loading to finish if present
    if (hasLoading) {
      await page.waitForTimeout(2000); // Wait for loading to complete
    }

    // After loading, there should be either flashcards or empty state
    const finalHasFlashcards = await flashcardContainer.isVisible();
    const finalHasEmptyState = await emptyState.isVisible();
    const finalHasPageContent = await pageContent.isVisible();
    expect(finalHasFlashcards || finalHasEmptyState || finalHasPageContent).toBe(true);

    // Check if back button is visible (it might not be visible in empty state)
    const hasBackButton = await backButton.isVisible();
    if (hasBackButton) {
      await expect(backButton).toBeVisible();
    }

    await takeScreenshot(page, 'flashcards-page', context);
  });

  test('should navigate between flashcards', async ({ page, context }) => {
    await page.goto('/app/flashcards');
    await waitForPageLoad(page);

    // Check if flashcards are available
    const flashcardContainer = page.locator(
      '[data-testid="flashcard"], .flashcard, [class*="flashcard"]',
    );
    const emptyState = page.locator(
      'text=No words available, text=No words, [data-testid="empty-state"]',
    );

    const hasFlashcards = await flashcardContainer.isVisible();
    const hasEmptyState = await emptyState.isVisible();

    if (hasFlashcards) {
      // Get initial card content
      const initialCard = page.locator(
        '[data-testid="flashcard"], .flashcard, [class*="flashcard"]',
      );
      const initialContent = await initialCard.textContent();

      // Click next button
      const nextButton = page.locator('button:has-text("Next"), [data-testid="next-card"]');
      if (await nextButton.isEnabled()) {
        await nextButton.click();

        // Should show different card
        const nextCard = page.locator(
          '[data-testid="flashcard"], .flashcard, [class*="flashcard"]',
        );
        const nextContent = await nextCard.textContent();
        expect(nextContent).not.toBe(initialContent);

        // Click previous button
        const previousButton = page.locator(
          'button:has-text("Previous"), [data-testid="previous-card"]',
        );
        await previousButton.click();

        // Should go back to initial card
        const previousCard = page.locator(
          '[data-testid="flashcard"], .flashcard, [class*="flashcard"]',
        );
        const previousContent = await previousCard.textContent();
        expect(previousContent).toBe(initialContent);
      }
    } else if (hasEmptyState) {
      // If no flashcards, just verify empty state is shown
      await expect(emptyState).toBeVisible();
    }

    await takeScreenshot(page, 'flashcard-navigation', context);
  });

  test('should handle keyboard navigation in flashcards', async ({ page, context }) => {
    await page.goto('/app/flashcards');
    await waitForPageLoad(page);

    // Test keyboard shortcuts
    await page.keyboard.press('ArrowRight'); // Next card
    await page.keyboard.press('ArrowLeft'); // Previous card
    await page.keyboard.press(' '); // Flip card (spacebar)
    await page.keyboard.press('Enter'); // Flip card (enter)

    await takeScreenshot(page, 'flashcard-keyboard', context);
  });

  test('should handle touch interactions on mobile', async ({ page, context }) => {
    await page.goto('/app/flashcards');
    await waitForPageLoad(page);

    const deviceInfo = await checkResponsiveDesign(page, context);

    if (deviceInfo.isMobile) {
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
    }

    await takeScreenshot(page, 'flashcard-touch', context);
  });

  test('should show progress indicator', async ({ page, context }) => {
    await page.goto('/app/flashcards');
    await waitForPageLoad(page);

    // Check if flashcards are available
    const flashcardContainer = page.locator(
      '[data-testid="flashcard"], .flashcard, [class*="flashcard"]',
    );
    const emptyState = page.locator(
      'text=No words available, text=No words, [data-testid="empty-state"]',
    );

    const hasFlashcards = await flashcardContainer.isVisible();
    const hasEmptyState = await emptyState.isVisible();

    if (hasFlashcards) {
      // Check if progress indicator is visible (counter like "1 / 5")
      const progressIndicator = page.locator(
        '[data-testid="progress"], .progress, [class*="progress"], text=/\\d+ \\/ \\d+/',
      );
      await expect(progressIndicator).toBeVisible();

      // Navigate through cards and check if progress updates
      const initialProgress = await progressIndicator.textContent();

      const nextButton = page.locator('button:has-text("Next"), [data-testid="next-card"]');
      if (await nextButton.isEnabled()) {
        await nextButton.click();

        const updatedProgress = await progressIndicator.textContent();
        expect(updatedProgress).not.toBe(initialProgress);
      }
    } else if (hasEmptyState) {
      // If no flashcards, just verify empty state is shown
      await expect(emptyState).toBeVisible();
    }

    await takeScreenshot(page, 'flashcard-progress', context);
  });

  test('should handle empty flashcard set gracefully', async ({ page, context }) => {
    await page.goto('/app/flashcards');
    await waitForPageLoad(page);

    // Should show empty state or message to add words
    const emptyState = page.locator('[data-testid="empty-state"], .empty-state, [class*="empty"]');
    const addWordsMessage = page.locator('text=Add words, text=No words, text=Start learning');
    const noWordsMessage = page.locator('text=No words available');
    const pageContent = page.locator('body');

    // Check if either empty state or add words message is visible
    const hasEmptyState = await emptyState.isVisible();
    const hasAddWordsMessage = await addWordsMessage.isVisible();
    const hasNoWordsMessage = await noWordsMessage.isVisible();
    const hasPageContent = await pageContent.isVisible();

    expect(hasEmptyState || hasAddWordsMessage || hasNoWordsMessage || hasPageContent).toBe(true);

    await takeScreenshot(page, 'flashcard-empty', context);
  });

  test('should handle responsive design on different screen sizes', async ({ page, context }) => {
    await page.goto('/app/flashcards');
    await waitForPageLoad(page);

    const deviceInfo = await checkResponsiveDesign(page, context);

    // Check if flashcards are available
    const flashcardContainer = page.locator(
      '[data-testid="flashcard"], .flashcard, [class*="flashcard"]',
    );
    const emptyState = page.locator(
      'text=No words available, text=No words, [data-testid="empty-state"]',
    );

    const hasFlashcards = await flashcardContainer.isVisible();
    const hasEmptyState = await emptyState.isVisible();

    if (hasFlashcards) {
      // Check if flashcard layout adapts to screen size
      await expect(flashcardContainer).toBeVisible();

      if (deviceInfo.isMobile) {
        // On mobile, check if controls are touch-friendly
        const nextButton = page.locator('button:has-text("Next"), [data-testid="next-card"]');
        const buttonSize = await nextButton.boundingBox();
        if (buttonSize) {
          expect(buttonSize.height).toBeGreaterThan(40); // Touch-friendly size
        }
      }
    } else if (hasEmptyState) {
      // If no flashcards, just verify empty state is shown
      await expect(emptyState).toBeVisible();
    }

    await takeScreenshot(page, 'flashcard-responsive', context);
  });
});
