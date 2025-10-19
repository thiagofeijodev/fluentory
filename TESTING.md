# Testing Guide

This document provides an overview of the automated testing setup and practices used in the Fluentory project.

## Overview

The project uses **Jest** with **React Testing Library** for unit and integration testing. Firebase operations are mocked to ensure tests run independently without external dependencies.

### Testing Stack

- **Test Runner**: Jest 30.2.0
- **DOM Testing**: React Testing Library 16.3.0
- **User Interactions**: @testing-library/user-event 14.6.1
- **Assertions**: jest-dom 6.9.1
- **Mocking**: Firebase, i18next, and other external dependencies

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Generate Coverage Report

```bash
npm run test:coverage
```

### Run Tests with CI Output

```bash
npm run test:ci
```

## Coverage Requirements

The project enforces a minimum coverage threshold:

- **Branches**: 50%
- **Functions**: 50%
- **Lines**: 50%
- **Statements**: 50%

Tests must meet these thresholds before merging. Run `npm run test:coverage` to see current coverage.

## Test Files

### Components Tests

#### `src/components/CardItemList.test.jsx`

Tests the CardItemList component which displays words with status badges and action buttons.

**Tests:**

- Renders card with word name and description
- Displays correct status badge (Learning/Learned)
- Calls status change handler on status button click
- Toggles between learning and learned status
- Calls more options handler
- Defaults to "learning" status

#### `src/components/Input.test.jsx`

Tests the Input component with label focus behavior.

**Tests:**

- User can focus on input by clicking label text

#### `src/components/Button.test.js`

Tests the Button component functionality.

**Tests:**

- Renders button with text
- Calls onClick handler when clicked
- Respects disabled state
- Supports aria-label

#### `src/components/Select.test.jsx`

Tests the Select dropdown component.

**Tests:**

- Renders select element with options
- Displays label
- Renders all options
- Calls onChange on selection change
- Supports aria-label
- Uses name as label when label not provided

### Feature Tests

#### `src/features/words/WordList.test.jsx`

Tests the WordList component with filtering and display functionality.

**Tests:**

- Displays loading spinner during data fetch
- Shows empty state when no words exist
- Renders all words when data loads
- Filters words by status (Learning/Learned)
- Shows empty state when all words are filtered
- Updates word status on card action
- Displays filter controls (checkboxes)
- Re-renders when filters change

#### `src/features/words/FlashcardView.test.jsx`

Tests the flashcard study view with navigation and shuffle.

**Tests:**

- Displays loading spinner
- Shows first word on initial load
- Navigates to next card
- Navigates to previous card
- Disables previous button on first card
- Disables next button on last card
- Displays progress counter (e.g., 1/3)
- Updates progress when navigating
- Calls onBack when back button clicked
- Shuffles words randomly
- Shows empty state when no words
- Handles back button in empty state

#### `src/features/words/InsertWordDialog.test.jsx`

Tests the dialog for adding new words.

**Tests:**

- Renders dialog trigger button
- Opens dialog when button clicked
- Displays word input field
- Calls insertWord with correct parameters
- Closes dialog after submission
- Closes dialog when cancel clicked
- Resets form after submission

### Database Tests

#### `src/db/models/words.test.js`

Tests database functions with Firebase mocks.

**Tests:**

**fetchAllWords:**

- Fetches all words for a user
- Includes document ID in results
- Handles errors gracefully

**insertWord:**

- Inserts word with default "learning" status
- Preserves existing status when provided
- Sets user ID on inserted word
- Handles insertion errors

**updateWordStatus:**

- Updates word status to "learned"
- Updates word status to "learning"
- Handles update errors

### Hook Tests

#### `src/hooks/useQuery.test.jsx`

Tests the useQuery custom hook for fetching data.

**Tests:**

- Returns initial loading state
- Returns initial data
- Doesn't call service when user not authenticated
- Calls service with user UID when authenticated
- Updates data when service returns results
- Sets loading to false after data received
- Handles service cleanup function
- Handles service with no cleanup

## Test Structure

Each test file follows this structure:

```javascript
describe('Component/Feature Name', () => {
  beforeEach(() => {
    // Setup mocks and initial state
  });

  test('should do something specific', () => {
    // Arrange: Set up test data
    // Act: Perform the action
    // Assert: Check the results
  });
});
```

## Firebase Mocking

Firebase operations are mocked in the test setup (`.config/tests/setupTests.js`):

```javascript
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  // ... other Firebase functions
}));
```

This allows tests to:

- Run without external services
- Control Firebase behavior precisely
- Test error handling

### Using Firebase Mocks in Tests

```javascript
import * as db from '../../db';

jest.mock('../../db');

beforeEach(() => {
  db.updateWordStatus = jest.fn();
});

test('updates status', async () => {
  // Test code
  expect(db.updateWordStatus).toHaveBeenCalled();
});
```

## Testing Best Practices

### 1. Test User Behavior, Not Implementation

```javascript
// ✅ Good - Tests user action
await user.click(screen.getByText('Submit'));

// ❌ Bad - Tests implementation details
expect(component.state.isClicked).toBe(true);
```

### 2. Use Semantic Queries

```javascript
// ✅ Good - User-visible text
screen.getByText('Click me');
screen.getByLabelText('Email');

// ❌ Bad - Implementation detail
screen.getByTestId('submit-button');
```

### 3. Wait for Async Operations

```javascript
// ✅ Good - Waits for state update
await waitFor(() => {
  expect(screen.getByText('Success')).toBeInTheDocument();
});

// ❌ Bad - No wait
expect(screen.getByText('Success')).toBeInTheDocument();
```

### 4. Mock External Dependencies

```javascript
// ✅ Good - Mock Firebase
jest.mock('firebase/firestore');

// ❌ Bad - Make actual calls
// No mocking - tests are flaky
```

## Adding New Tests

When adding new features:

1. Create a test file in the same directory as the component:
   - `MyComponent.jsx` → `MyComponent.test.jsx`

2. Follow the existing test patterns:

   ```javascript
   describe('My Feature', () => {
     beforeEach(() => {
       /* setup */
     });
     test('should do something', () => {
       /* test */
     });
   });
   ```

3. Run tests to ensure coverage threshold is met:

   ```bash
   npm run test:coverage
   ```

4. Fix any coverage gaps before committing

## Troubleshooting

### "Cannot find module" error

- Ensure jest.mock() is called before imports
- Check that module paths are correct

### "Expected mock function to have been called"

- Verify mocks are set up in beforeEach
- Check that the mocked function is actually imported in the component

### Async test timeouts

- Increase timeout: `test('...', async () => { ... }, 10000);`
- Ensure waitFor() is used for state updates
- Check that mocked promises are resolved

### "act" warnings

- Wrap state-changing actions in `waitFor()`
- Use `userEvent.setup()` for user interactions

## CI Integration

On GitHub Actions (or your CI), run:

```bash
npm run test:ci
```

This:

- Runs all tests
- Generates coverage report
- Outputs results in JSON format to `test-results/jest-results.json`
- Enforces coverage thresholds

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
