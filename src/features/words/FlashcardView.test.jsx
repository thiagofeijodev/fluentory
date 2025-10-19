import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { FlashcardView } from './FlashcardView';

jest.mock('../../db');
jest.mock('../../hooks/useQuery');
jest.mock('../../hooks/useLanguage');

const mockUseQuery = require('../../hooks/useQuery').useQuery;
const mockUseLanguage = require('../../hooks/useLanguage').useLanguage;

describe('FlashcardView Component', () => {
  const mockWords = [
    { id: '1', name: 'Hello', description: 'A greeting' },
    { id: '2', name: 'Goodbye', description: 'A farewell' },
    { id: '3', name: 'Please', description: 'A polite word' },
  ];

  const mockOnBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseLanguage.mockReturnValue({
      t: (key) => key,
    });
  });

  test('should display loading spinner initially', () => {
    mockUseQuery.mockReturnValue({
      data: [],
      isLoading: true,
    });

    render(<FlashcardView onBack={mockOnBack} />);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test('should display first word on initial load', () => {
    mockUseQuery.mockReturnValue({
      data: mockWords,
      isLoading: false,
    });

    render(<FlashcardView onBack={mockOnBack} />);

    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('A greeting')).toBeInTheDocument();
  });

  test('should navigate to next card', async () => {
    const user = userEvent.setup();
    mockUseQuery.mockReturnValue({
      data: mockWords,
      isLoading: false,
    });

    render(<FlashcardView onBack={mockOnBack} />);

    const nextButton = screen.getByText('Next');
    await user.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText('Goodbye')).toBeInTheDocument();
      expect(screen.getByText('A farewell')).toBeInTheDocument();
    });
  });

  test('should navigate to previous card', async () => {
    const user = userEvent.setup();
    mockUseQuery.mockReturnValue({
      data: mockWords,
      isLoading: false,
    });

    render(<FlashcardView onBack={mockOnBack} />);

    const nextButton = screen.getByText('Next');
    await user.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText('Goodbye')).toBeInTheDocument();
    });

    const prevButton = screen.getByText('Previous');
    await user.click(prevButton);

    await waitFor(() => {
      expect(screen.getByText('Hello')).toBeInTheDocument();
    });
  });

  test('should disable previous button on first card', () => {
    mockUseQuery.mockReturnValue({
      data: mockWords,
      isLoading: false,
    });

    render(<FlashcardView onBack={mockOnBack} />);

    const prevButton = screen.getByText('Previous');
    expect(prevButton).toBeDisabled();
  });

  test('should disable next button on last card', async () => {
    const user = userEvent.setup();
    mockUseQuery.mockReturnValue({
      data: mockWords,
      isLoading: false,
    });

    render(<FlashcardView onBack={mockOnBack} />);

    const nextButton = screen.getByText('Next');
    await user.click(nextButton);
    await user.click(nextButton);

    await waitFor(() => {
      expect(nextButton).toBeDisabled();
    });
  });

  test('should display correct progress counter', () => {
    mockUseQuery.mockReturnValue({
      data: mockWords,
      isLoading: false,
    });

    render(<FlashcardView onBack={mockOnBack} />);

    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  test('should update progress counter when navigating', async () => {
    const user = userEvent.setup();
    mockUseQuery.mockReturnValue({
      data: mockWords,
      isLoading: false,
    });

    render(<FlashcardView onBack={mockOnBack} />);

    const nextButton = screen.getByText('Next');
    await user.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText('2 / 3')).toBeInTheDocument();
    });
  });

  test('should call onBack when back button is clicked', async () => {
    const user = userEvent.setup();
    mockUseQuery.mockReturnValue({
      data: mockWords,
      isLoading: false,
    });

    render(<FlashcardView onBack={mockOnBack} />);

    const backButton = screen.getByText('Back');
    await user.click(backButton);

    expect(mockOnBack).toHaveBeenCalled();
  });

  test('should shuffle words on shuffle click', async () => {
    const user = userEvent.setup();
    mockUseQuery.mockReturnValue({
      data: mockWords,
      isLoading: false,
    });

    render(<FlashcardView onBack={mockOnBack} />);

    expect(screen.getByText('Hello')).toBeInTheDocument();

    const shuffleButton = screen.getByRole('button', { name: /Shuffle/ });
    await user.click(shuffleButton);

    // After shuffle, we should still be on card 1
    await waitFor(() => {
      expect(screen.getByText('1 / 3')).toBeInTheDocument();
    });
  });

  test('should display empty state when no words', () => {
    mockUseQuery.mockReturnValue({
      data: [],
      isLoading: false,
    });

    render(<FlashcardView onBack={mockOnBack} />);

    expect(screen.getByText('No words available')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  test('should show back button in empty state', async () => {
    const user = userEvent.setup();
    mockUseQuery.mockReturnValue({
      data: [],
      isLoading: false,
    });

    render(<FlashcardView onBack={mockOnBack} />);

    const backButton = screen.getByRole('button', { name: 'Back' });
    await user.click(backButton);

    expect(mockOnBack).toHaveBeenCalled();
  });
});
