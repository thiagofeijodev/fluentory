# E2E Testing with Playwright

This directory contains end-to-end tests for the Fluentory English learning app, configured to test across multiple devices and screen sizes.

## Overview

The E2E test suite includes:

- **Authentication Flow Tests** - Login, signup, logout functionality
- **Words Management Tests** - CRUD operations for vocabulary
- **Flashcards Tests** - Study mode and flashcard interactions
- **Settings Tests** - User preferences and account management
- **Accessibility Tests** - WCAG compliance and screen reader support

## Device Coverage

Tests run on the following devices and screen sizes:

### Desktop Browsers

- Chrome (Desktop)
- Firefox (Desktop)
- Safari (Desktop)
- Chrome (Large - 1920x1080)
- Chrome (4K - 3840x2160)
- Chrome (Small - 1024x768)

### Mobile Devices

- iPhone 12
- iPhone SE
- Pixel 5
- Galaxy S III

### Tablets

- iPad Pro
- iPad Mini

## Firebase Mocking

The tests use a comprehensive Firebase mocking system that:

- Mocks Firebase Auth for login/signup flows
- Mocks Firestore for data operations
- Provides realistic test data
- Handles offline scenarios
- Simulates network delays and errors

## Running Tests

### Prerequisites

```bash
# Install Playwright browsers
npm run test:e2e:install
```

### Basic Test Commands

```bash
# Run all tests on all devices
npm run test:e2e

# Run tests with UI (interactive mode)
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Debug tests step by step
npm run test:e2e:debug
```

### Device-Specific Testing

```bash
# Test only mobile devices
npm run test:e2e:mobile

# Test only desktop browsers
npm run test:e2e:desktop

# Test only tablets
npm run test:e2e:tablet
```

### Individual Test Suites

```bash
# Run only authentication tests
npx playwright test auth.spec.js

# Run only words management tests
npx playwright test words.spec.js

# Run only flashcard tests
npx playwright test flashcards.spec.js

# Run only settings tests
npx playwright test settings.spec.js

# Run only accessibility tests
npx playwright test accessibility.spec.js
```

## Test Reports

After running tests, view the HTML report:

```bash
npm run test:e2e:report
```

Reports are also saved as:

- `test-results/e2e-results.json` - JSON format
- `test-results/e2e-results.xml` - JUnit format
- `test-results/screenshots/` - Screenshots for each test

## Test Structure

### Fixtures (`fixtures/`)

- `test-data.js` - Test users, words, selectors, and timeouts
- Reusable test data and constants

### Utils (`utils/`)

- `firebase-mock.js` - Firebase mocking utilities
- `test-helpers.js` - Common test helper functions

### Test Files

- `auth.spec.js` - Authentication flow tests
- `words.spec.js` - Vocabulary management tests
- `flashcards.spec.js` - Study mode tests
- `settings.spec.js` - User settings tests
- `accessibility.spec.js` - Accessibility compliance tests

## Key Features

### Responsive Design Testing

- Tests layout adaptation across screen sizes
- Validates touch interactions on mobile
- Checks keyboard navigation
- Verifies accessibility compliance

### Firebase Integration

- Complete auth flow testing
- Data persistence validation
- Offline scenario handling
- Error state testing

### Performance Testing

- Page load time measurement
- Network request monitoring
- Memory usage tracking
- Screenshot comparison

### Accessibility Testing

- WCAG compliance checks
- Screen reader compatibility
- Keyboard navigation
- Color contrast validation
- Focus management

## Configuration

The main configuration is in `playwright.config.js`:

- Device presets and viewport sizes
- Test parallelization settings
- Reporter configuration
- Screenshot and video capture
- Web server setup

## Best Practices

### Writing Tests

1. Use descriptive test names
2. Take screenshots for visual regression
3. Test both success and error scenarios
4. Include accessibility checks
5. Test responsive behavior

### Maintenance

1. Update test data when app changes
2. Review screenshots for visual changes
3. Keep Firebase mocks in sync
4. Update device presets as needed

## Troubleshooting

### Common Issues

**Tests fail to start**

- Ensure the dev server is running (`npm start`)
- Check that Playwright browsers are installed

**Firebase mocking issues**

- Verify mock setup in `firebase-mock.js`
- Check that test data matches app expectations

**Screenshot differences**

- Review screenshots in `test-results/screenshots/`
- Update baseline images if UI changes are intentional

**Device-specific failures**

- Check responsive design implementation
- Verify touch interactions on mobile
- Test keyboard navigation

### Debug Mode

```bash
# Run specific test in debug mode
npx playwright test auth.spec.js --debug

# Run with browser dev tools
npx playwright test --headed --debug
```

## CI/CD Integration

The test suite is designed for CI/CD pipelines:

- JSON and JUnit report formats
- Screenshot artifacts
- Parallel test execution
- Retry logic for flaky tests

Example GitHub Actions workflow:

```yaml
- name: Run E2E Tests
  run: npm run test:e2e

- name: Upload Test Results
  uses: actions/upload-artifact@v3
  with:
    name: e2e-results
    path: test-results/
```
