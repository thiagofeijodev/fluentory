import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { WordList } from './WordList';
import * as _db from '../../db';

jest.mock('../../db');
jest.mock('../../hooks/useQuery');
jest.mock('../../hooks/useLanguage');

const db = { ..._db };

// Mock useQuery hook
const mockUseQuery = require('../../hooks/useQuery').useQuery;
// Mock useLanguage hook
const mockUseLanguage = require('../../hooks/useLanguage').useLanguage;

describe('WordList Component', () => {
  const mockWords = [
    { id: '1', name: 'Hello', description: 'A greeting', status: 'learning' },
    { id: '2', name: 'Goodbye', description: 'A farewell', status: 'learned' },
    { id: '3', name: 'Please', description: 'A polite word', status: 'learning' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseLanguage.mockReturnValue({
      t: (key) => key,
    });
  });

  describe('Loading State', () => {
    test('should display spinner while loading', () => {
      mockUseQuery.mockReturnValue({
        data: [],
        isLoading: true,
      });

      render(<WordList />);

      expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    test('should display empty state when no words exist', () => {
      mockUseQuery.mockReturnValue({
        data: [],
        isLoading: false,
      });

      render(<WordList />);

      // EmptyStateTemplate renders SVG element
      const svgElement = screen.getByTestId('empty-state-svg', { hidden: true });
      expect(svgElement).toBeInTheDocument();
    });
  });

  describe('Rendering Words', () => {
    test('should display all words with both statuses when loaded', () => {
      mockUseQuery.mockReturnValue({
        data: mockWords,
        isLoading: false,
      });

      render(<WordList />);

      // Verify heading is shown
      expect(screen.getByText('Words:')).toBeInTheDocument();

      // Verify all words are displayed
      expect(screen.getByText('Hello')).toBeInTheDocument();
      expect(screen.getByText('Goodbye')).toBeInTheDocument();
      expect(screen.getByText('Please')).toBeInTheDocument();

      // Verify descriptions are shown
      expect(screen.getByText('A greeting')).toBeInTheDocument();
      expect(screen.getByText('A farewell')).toBeInTheDocument();
      expect(screen.getByText('A polite word')).toBeInTheDocument();
    });

    test('should display filter controls', () => {
      mockUseQuery.mockReturnValue({
        data: mockWords,
        isLoading: false,
      });

      render(<WordList />);

      expect(screen.getByText('Filter:')).toBeInTheDocument();
      expect(screen.getByLabelText('Learning')).toBeInTheDocument();
      expect(screen.getByLabelText('Learned')).toBeInTheDocument();

      // Both filters should be checked by default
      expect(screen.getByLabelText('Learning')).toBeChecked();
      expect(screen.getByLabelText('Learned')).toBeChecked();
    });
  });

  describe('Filtering by Status', () => {
    test('should show only learning words when uncheck learned filter', async () => {
      const user = userEvent.setup();
      mockUseQuery.mockReturnValue({
        data: mockWords,
        isLoading: false,
      });

      render(<WordList />);

      // Uncheck "Learned" to show only learning words
      const learnedCheckbox = screen.getByLabelText('Learned');
      await user.click(learnedCheckbox);

      await waitFor(() => {
        // Learning words should be visible
        expect(screen.getByText('Hello')).toBeInTheDocument();
        expect(screen.getByText('Please')).toBeInTheDocument();
        // Learned words should be hidden
        expect(screen.queryByText('Goodbye')).not.toBeInTheDocument();
      });

      // Verify checkbox state
      expect(screen.getByLabelText('Learned')).not.toBeChecked();
      expect(screen.getByLabelText('Learning')).toBeChecked();
    });

    test('should show only learned words when uncheck learning filter', async () => {
      const user = userEvent.setup();
      mockUseQuery.mockReturnValue({
        data: mockWords,
        isLoading: false,
      });

      render(<WordList />);

      // Uncheck "Learning" to show only learned words
      const learningCheckbox = screen.getByLabelText('Learning');
      await user.click(learningCheckbox);

      await waitFor(() => {
        // Learned words should be visible
        expect(screen.getByText('Goodbye')).toBeInTheDocument();
        // Learning words should be hidden
        expect(screen.queryByText('Hello')).not.toBeInTheDocument();
        expect(screen.queryByText('Please')).not.toBeInTheDocument();
      });

      // Verify checkbox state
      expect(screen.getByLabelText('Learning')).not.toBeChecked();
      expect(screen.getByLabelText('Learned')).toBeChecked();
    });

    test('should show empty state when both filters are unchecked', async () => {
      const user = userEvent.setup();
      mockUseQuery.mockReturnValue({
        data: mockWords,
        isLoading: false,
      });

      render(<WordList />);

      const learningCheckbox = screen.getByLabelText('Learning');
      const learnedCheckbox = screen.getByLabelText('Learned');

      // Uncheck both filters
      await user.click(learningCheckbox);
      await user.click(learnedCheckbox);

      await waitFor(() => {
        // No words should be visible
        expect(screen.queryByText('Hello')).not.toBeInTheDocument();
        expect(screen.queryByText('Goodbye')).not.toBeInTheDocument();
        expect(screen.queryByText('Please')).not.toBeInTheDocument();

        // Empty state should be shown (SVG)
        const svgElement = screen.getByTestId('empty-state-svg', { hidden: true });
        expect(svgElement).toBeInTheDocument();
      });
    });

    test('should toggle filter state when clicking same checkbox multiple times', async () => {
      const user = userEvent.setup();
      mockUseQuery.mockReturnValue({
        data: mockWords,
        isLoading: false,
      });

      render(<WordList />);

      const learnedCheckbox = screen.getByLabelText('Learned');

      // Initially checked
      expect(learnedCheckbox).toBeChecked();

      // Click to uncheck
      await user.click(learnedCheckbox);
      expect(learnedCheckbox).not.toBeChecked();

      // Click to check again
      await user.click(learnedCheckbox);
      expect(learnedCheckbox).toBeChecked();
    });
  });

  describe('Word Status Updates', () => {
    test('should call updateWordStatus with correct parameters when status button clicked', async () => {
      const user = userEvent.setup();
      db.updateWordStatus = jest.fn();

      mockUseQuery.mockReturnValue({
        data: mockWords,
        isLoading: false,
      });

      render(<WordList />);

      // Find the first word's status button
      const statusButtons = screen.getAllByLabelText(/Mark as/);
      await user.click(statusButtons[0]);

      expect(db.updateWordStatus).toHaveBeenCalled();
      expect(db.updateWordStatus).toHaveBeenCalledWith('1', expect.any(String));
    });

    test('should pass word id and new status to updateWordStatus callback', async () => {
      const user = userEvent.setup();
      db.updateWordStatus = jest.fn();

      mockUseQuery.mockReturnValue({
        data: mockWords,
        isLoading: false,
      });

      render(<WordList />);

      const statusButtons = screen.getAllByLabelText(/Mark as/);
      // Click first word's status button (Hello - learning status)
      await user.click(statusButtons[0]);

      expect(db.updateWordStatus).toHaveBeenCalledWith(
        '1',
        expect.stringMatching(/^(learning|learned)$/),
      );
    });
  });

  describe('Edge Cases', () => {
    test('should handle words without explicit status (defaults to learning)', () => {
      const wordsWithoutStatus = [
        { id: '1', name: 'Hello', description: 'A greeting' }, // no status
      ];

      mockUseQuery.mockReturnValue({
        data: wordsWithoutStatus,
        isLoading: false,
      });

      render(<WordList />);

      expect(screen.getByText('Hello')).toBeInTheDocument();
    });

    test('should handle empty description gracefully', () => {
      const wordsWithEmptyDesc = [{ id: '1', name: 'Hello', description: '', status: 'learning' }];

      mockUseQuery.mockReturnValue({
        data: wordsWithEmptyDesc,
        isLoading: false,
      });

      render(<WordList />);

      expect(screen.getByText('Hello')).toBeInTheDocument();
    });
  });
});
