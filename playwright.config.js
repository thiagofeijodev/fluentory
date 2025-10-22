const fs = require('fs');
const { defineConfig, devices } = require('@playwright/test');

if (fs.existsSync('.env.development.local')) {
  require('dotenv').config({ path: '.env.development.local' });
}

const reporter = !process.env.CI
  ? [['html']]
  : [
      ['html'],
      ['json', { outputFile: 'test-results/e2e-results.json' }],
      ['junit', { outputFile: 'test-results/e2e-results.xml' }],
    ];

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter,
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers and devices */
  projects: [
    // Desktop browsers
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Mobile devices
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
    {
      name: 'Mobile Safari (iPhone SE)',
      use: { ...devices['iPhone SE'] },
    },
    {
      name: 'Mobile Chrome (Galaxy S5)',
      use: { ...devices['Galaxy S III'] },
    },

    // Tablet devices
    {
      name: 'iPad',
      use: { ...devices['iPad Pro'] },
    },
    {
      name: 'iPad Mini',
      use: { ...devices['iPad Mini'] },
    },

    // Large screens
    {
      name: 'Desktop Chrome (Large)',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'Desktop Chrome (4K)',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 3840, height: 2160 },
      },
    },

    // Small screens
    {
      name: 'Small Desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1024, height: 768 },
      },
    },
    */
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3001',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
