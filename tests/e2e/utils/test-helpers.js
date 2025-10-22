/**
 * Test helper utilities for E2E tests
 */

/**
 * Wait for page to be fully loaded
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
export async function waitForPageLoad(page) {
  try {
    // Wait for network to be idle (no requests for 500ms)
    await page.waitForLoadState('networkidle', { timeout: 10000 });
  } catch {
    console.log('Network idle timeout, continuing...');
  }

  try {
    // Wait for DOM content to be loaded
    await page.waitForLoadState('domcontentloaded', { timeout: 10000 });
  } catch {
    console.log('DOM content loaded timeout, continuing...');
  }

  // Additional wait for React components to render
  await page.waitForTimeout(1000);
}

/**
 * Take a screenshot with device info
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} name - Screenshot name
 * @param {Object} context - Test context
 */
export async function takeScreenshot(page, name, context) {
  const deviceName = context.projectName || 'unknown';
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  await page.screenshot({
    path: `test-results/screenshots/${deviceName}-${name}-${timestamp}.png`,
    fullPage: true,
  });
}

/**
 * Check responsive design breakpoints
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {Object} context - Test context
 */
export async function checkResponsiveDesign(page, context) {
  const viewport = page.viewportSize();
  const deviceName = context.projectName || 'unknown';

  // Check if navigation is properly displayed
  const isMobile = viewport.width < 768;
  const isTablet = viewport.width >= 768 && viewport.width < 1024;
  const isDesktop = viewport.width >= 1024;

  console.log(
    `Testing on ${deviceName}: ${viewport.width}x${viewport.height} (${isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'})`,
  );

  return {
    isMobile,
    isTablet,
    isDesktop,
    viewport,
    deviceName,
  };
}

/**
 * Generic login function for E2E tests
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {Object} options - Login options
 * @param {string} options.email - User email (defaults to TEST_EMAIL env var)
 * @param {string} options.password - User password (defaults to TEST_PASSWORD env var)
 * @param {string} options.targetUrl - URL to navigate to after login (defaults to '/app')
 */
export async function loginUser(page, options = {}) {
  const testEmail = options.email || process.env.TEST_EMAIL;
  const testPassword = options.password || process.env.TEST_PASSWORD;
  const targetUrl = options.targetUrl || '/app';

  // Navigate to the login page
  await page.goto('/');

  // Click the sign in button
  const signInButton = page.locator('button:has-text("Sign in")');
  await signInButton.click();

  // Fill in the login form
  await page.getByLabel('Email').fill(testEmail);
  await page.getByLabel('Password').fill(testPassword);

  // Click the login button
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Wait for navigation to the target page
  await page.waitForURL(targetUrl);

  return {
    email: testEmail,
    targetUrl,
  };
}

/**
 * Check accessibility basics
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
export async function checkAccessibility(page) {
  // Check for alt text on images
  const images = await page.locator('img').all();
  const imagesWithoutAlt = [];

  for (const img of images) {
    const alt = await img.getAttribute('alt');
    if (!alt) {
      imagesWithoutAlt.push(await img.getAttribute('src'));
    }
  }

  // Check for proper heading hierarchy
  const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
  const headingLevels = [];

  for (const heading of headings) {
    const tagName = await heading.evaluate((el) => el.tagName.toLowerCase());
    headingLevels.push(tagName);
  }

  return {
    imagesWithoutAlt,
    headingLevels,
    hasProperHeadings: headingLevels.length > 0 && headingLevels.includes('h1'),
  };
}
