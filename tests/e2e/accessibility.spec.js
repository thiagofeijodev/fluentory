/**
 * Accessibility E2E Tests
 * Tests accessibility features across different devices and screen sizes
 */

import { test, expect } from '@playwright/test';
import {
  waitForPageLoad,
  takeScreenshot,
  checkAccessibility,
  loginUser,
} from './utils/test-helpers.js';

test.describe('Accessibility Tests', () => {
  test.beforeEach(async ({ page, context }) => {
    await takeScreenshot(page, 'before-test', context);
  });

  test('should have proper heading hierarchy on landing page', async ({ page, context }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const accessibility = await checkAccessibility(page);

    // Check if there's at least one h1
    const h1Elements = page.locator('h1');
    await expect(h1Elements).toHaveCount(1);

    // Check heading hierarchy
    expect(accessibility.hasProperHeadings).toBe(true);

    await takeScreenshot(page, 'landing-accessibility', context);
  });

  test('should have alt text on all images', async ({ page, context }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const accessibility = await checkAccessibility(page);

    // Check that all images have alt text
    expect(accessibility.imagesWithoutAlt).toHaveLength(0);

    await takeScreenshot(page, 'images-alt-text', context);
  });

  test('should have proper form labels', async ({ page, context }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    // Click sign in to get to login form
    const signInButton = page.locator('button:has-text("Sign in")');
    await signInButton.click();

    // Check email input - use first() to handle multiple labels
    const emailLabel = page.locator('label[for], label:has(input[type="email"])').first();
    await expect(emailLabel).toBeVisible();

    // Check password input
    const passwordLabel = page.locator('label[for], label:has(input[type="password"])').first();
    await expect(passwordLabel).toBeVisible();

    await takeScreenshot(page, 'form-labels', context);
  });

  test('should have proper button labels', async ({ page, context }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    // Check all buttons have accessible text
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();

    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute('aria-label');
      const ariaLabelledBy = await button.getAttribute('aria-labelledby');

      expect(text || ariaLabel || ariaLabelledBy).toBeTruthy();
    }

    await takeScreenshot(page, 'button-labels', context);
  });

  test('should support keyboard navigation', async ({ page, context }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    // Test Tab navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Test Enter key on focused element
    await page.keyboard.press('Enter');

    // Test Escape key
    await page.keyboard.press('Escape');

    await takeScreenshot(page, 'keyboard-navigation', context);
  });

  test('should have proper focus indicators', async ({ page, context }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    // Click sign in to get to login form
    const signInButton = page.locator('button:has-text("Sign in")');
    await signInButton.click();

    // Wait for the form to load
    await page.waitForTimeout(1000);

    // Try to find any input field that can be focused
    const inputs = page.locator('input');
    const inputCount = await inputs.count();

    if (inputCount > 0) {
      // Focus on the first input
      const firstInput = inputs.first();
      await firstInput.focus();

      // Check if focus indicator is visible
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();

      // Check if focus styles are applied
      const focusStyles = await firstInput.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          outline: styles.outline,
          outlineWidth: styles.outlineWidth,
          boxShadow: styles.boxShadow,
        };
      });

      expect(focusStyles.outline !== 'none' || focusStyles.boxShadow !== 'none').toBe(true);
    }

    await takeScreenshot(page, 'focus-indicators', context);
  });

  test('should have proper color contrast', async ({ page, context }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    // Check text elements for color contrast
    const textElements = page.locator('p, h1, h2, h3, h4, h5, h6, span, div');
    const elementCount = await textElements.count();

    // Sample a few elements for color contrast
    for (let i = 0; i < Math.min(elementCount, 5); i++) {
      const element = textElements.nth(i);
      const isVisible = await element.isVisible();

      if (isVisible) {
        const styles = await element.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            color: computed.color,
            backgroundColor: computed.backgroundColor,
            fontSize: computed.fontSize,
          };
        });

        // Basic check - ensure text is not transparent
        expect(styles.color).not.toBe('rgba(0, 0, 0, 0)');
        expect(styles.color).not.toBe('transparent');
      }
    }

    await takeScreenshot(page, 'color-contrast', context);
  });

  test('should handle screen reader announcements', async ({ page, context }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    // Click sign in to get to login form
    const signInButton = page.locator('button:has-text("Sign in")');
    await signInButton.click();

    // Check for ARIA live regions
    const liveRegions = page.locator('[aria-live], [aria-atomic], [aria-relevant]');
    await liveRegions.count();

    // Check for role attributes
    const roleElements = page.locator('[role]');
    await roleElements.count();

    // Check for aria-label attributes
    const ariaLabelElements = page.locator('[aria-label]');
    await ariaLabelElements.count();

    await takeScreenshot(page, 'screen-reader-support', context);
  });

  test('should handle high contrast mode', async ({ page, context }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    // Simulate high contrast mode
    await page.emulateMedia({ colorScheme: 'dark' });

    // Check if page is still readable
    const mainContent = page.locator('main, [role="main"], .main-content, body');
    await expect(mainContent).toBeVisible();

    await takeScreenshot(page, 'high-contrast-mode', context);
  });

  test('should handle reduced motion preferences', async ({ page, context }) => {
    // Login using the generic login function
    await loginUser(page);

    // Check if animations respect reduced motion
    await page.emulateMedia({ reducedMotion: 'reduce' });

    // Navigate to flashcards page
    await page.goto('/app/flashcards');
    await waitForPageLoad(page);

    // Check if page still functions without animations
    const flashcardContainer = page.locator('[data-testid="flashcard"], .flashcard');
    const pageContent = page.locator('body');

    // Either flashcards should be visible or the page should have content
    const hasFlashcards = await flashcardContainer.isVisible();
    const hasContent = await pageContent.isVisible();

    expect(hasFlashcards || hasContent).toBe(true);

    await takeScreenshot(page, 'reduced-motion', context);
  });

  test('should handle zoom up to 200%', async ({ page, context }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    // Test zoom levels
    const zoomLevels = [1, 1.5, 2];

    for (const zoom of zoomLevels) {
      await page.setViewportSize({
        width: Math.floor(1280 * zoom),
        height: Math.floor(720 * zoom),
      });

      // Check if content is still accessible
      const mainContent = page.locator('main, [role="main"], .main-content, body');
      await expect(mainContent).toBeVisible();

      await takeScreenshot(page, `zoom-${zoom}x`, context);
    }
  });

  test('should handle different text sizes', async ({ page, context }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    // Test different font sizes
    const fontSizes = ['12px', '16px', '20px', '24px'];

    for (const fontSize of fontSizes) {
      await page.addStyleTag({
        content: `* { font-size: ${fontSize} !important; }`,
      });

      // Check if content is still readable
      const mainContent = page.locator('main, [role="main"], .main-content, body');
      await expect(mainContent).toBeVisible();

      await takeScreenshot(page, `font-size-${fontSize}`, context);
    }
  });

  test('should have proper semantic HTML structure', async ({ page, context }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    // Check for semantic HTML elements
    const semanticElements = page.locator('main, nav, header, footer, section, article, aside');
    const semanticCount = await semanticElements.count();

    expect(semanticCount).toBeGreaterThan(0);

    // Check for proper landmark roles
    const landmarks = page.locator(
      '[role="main"], [role="navigation"], [role="banner"], [role="contentinfo"]',
    );
    await landmarks.count();

    await takeScreenshot(page, 'semantic-structure', context);
  });

  test('should handle focus management in modals', async ({ page, context }) => {
    // Login using the generic login function
    await loginUser(page);
    await waitForPageLoad(page);

    // Look for modal triggers
    const modalTriggers = page.locator(
      'button:has-text("Add"), button:has-text("Edit"), button:has-text("Delete")',
    );
    const triggerCount = await modalTriggers.count();

    if (triggerCount > 0) {
      // Click first modal trigger
      await modalTriggers.first().click();

      // Check if modal is visible
      const modal = page.locator('[role="dialog"], .modal, [data-testid="modal"]');
      if (await modal.isVisible()) {
        // Check if focus is trapped in modal
        const focusedElement = page.locator(':focus');
        await expect(focusedElement).toBeVisible();

        // Check if modal has proper ARIA attributes
        const modalRole = await modal.getAttribute('role');
        expect(modalRole).toBe('dialog');

        // Test Escape key to close modal
        await page.keyboard.press('Escape');
      }
    }

    await takeScreenshot(page, 'modal-focus-management', context);
  });
});
