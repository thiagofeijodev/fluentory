import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FlashcardView } from './FlashcardView';
import { useFlashcard } from './hooks/useFlashcard';

jest.mock('../../../db');
jest.mock('../../../hooks/useLanguage');
jest.mock('./hooks/useFlashcard');

const mockUseLanguage = require('../../../hooks/useLanguage').useLanguage;

describe('FlashcardView Component', () => {
  const mockWords = [
    { id: '1', name: 'Hello', description: 'A greeting' },
    { id: '2', name: 'Goodbye', description: 'A farewell' },
    { id: '3', name: 'Please', description: 'A polite word' },
  ];

  const mockMetadata = [
    { fl: 'noun', shortdef: ['a greeting'] },
    { fl: 'interjection', shortdef: ['used to greet someone'] },
  ];

  const mockOnBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseLanguage.mockReturnValue({
      t: (key) => key,
    });
    // Reset useFlashcard mock before each test
    useFlashcard.mockClear();
  });

  test('should display loading spinner initially', () => {
    useFlashcard.mockReturnValue({
      data: [],
      isLoadingWords: true,
    });

    render(<FlashcardView onBack={mockOnBack} />);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test('should display first word on initial load', () => {
    useFlashcard.mockReturnValue({
      words: mockWords,
      isLoadingWords: false,
      currentWord: mockWords[0],
      metadata: mockMetadata,
      data: mockWords,
      isLoading: false,
    });

    render(<FlashcardView onBack={mockOnBack} />);

    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  test('should navigate to next card', async () => {
    const user = userEvent.setup();
    const handleNext = jest.fn();
    useFlashcard.mockReturnValue({
      words: mockWords,
      isLoadingWords: false,
      currentWord: mockWords[0],
      metadata: mockMetadata,
      handleNext,
    });

    render(<FlashcardView onBack={mockOnBack} />);

    const nextButton = screen.getByText('Next');
    await user.click(nextButton);

    expect(handleNext).toHaveBeenCalled();
  });

  test('should navigate to previous card', async () => {
    const user = userEvent.setup();
    const handlePrev = jest.fn();
    const handleNext = jest.fn();

    useFlashcard.mockReturnValue({
      words: mockWords,
      isLoadingWords: false,
      currentWord: mockWords[1], // Start on the second card
      currentIndex: 1,
      metadata: [],
      shuffled: false,
      handlePrev,
      handleNext,
    });

    render(<FlashcardView onBack={mockOnBack} />);

    const nextButton = screen.getByText('Next');
    await user.click(nextButton);

    expect(handleNext).toHaveBeenCalled();

    const prevButton = screen.getByText('Previous');
    await user.click(prevButton);

    expect(handlePrev).toHaveBeenCalled();
  });

  test('should disable previous button on first card', () => {
    useFlashcard.mockReturnValue({
      words: mockWords,
      isLoadingWords: false,
      currentWord: mockWords[0],
      currentIndex: 0,
      shuffled: false,
    });

    render(<FlashcardView onBack={mockOnBack} />);

    const prevButton = screen.getByText('Previous');
    expect(prevButton).toBeDisabled();
  });

  test('should disable next button on last card', async () => {
    useFlashcard.mockReturnValue({
      words: mockWords,
      isLoadingWords: false,
      currentWord: mockWords[2],
      currentIndex: 2,
      shuffled: false,
    });

    render(<FlashcardView onBack={mockOnBack} />);

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  test('should display correct progress counter', () => {
    useFlashcard.mockReturnValue({
      words: mockWords,
      isLoadingWords: false,
      currentWord: mockWords[0],
      currentIndex: 0,
      metadata: [],
      shuffled: false,
    });

    render(<FlashcardView onBack={mockOnBack} />);

    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  test('should update progress counter when navigating', async () => {
    useFlashcard.mockReturnValue({
      words: mockWords,
      isLoadingWords: false,
      currentWord: mockWords[1],
      currentIndex: 1,
      metadata: [],
      shuffled: false,
    });

    render(<FlashcardView onBack={mockOnBack} />);

    expect(screen.getByText('2 / 3')).toBeInTheDocument();
  });

  test('should call onBack when back button is clicked', async () => {
    const user = userEvent.setup();
    useFlashcard.mockReturnValue({
      words: mockWords,
      isLoadingWords: false,
      currentWord: mockWords[0],
      currentIndex: 0,
      metadata: [],
      shuffled: false,
    });

    render(<FlashcardView onBack={mockOnBack} />);

    const backButton = screen.getByText('Back');
    await user.click(backButton);

    expect(mockOnBack).toHaveBeenCalled();
  });

  test('should shuffle words on shuffle click', async () => {
    const user = userEvent.setup();
    const handleShuffle = jest.fn();
    useFlashcard.mockReturnValue({
      words: mockWords,
      isLoadingWords: false,
      currentWord: mockWords[0],
      currentIndex: 0,
      metadata: [],
      shuffled: false,
      handleShuffle,
    });

    render(<FlashcardView onBack={mockOnBack} />);

    const shuffleButton = screen.getByRole('button', { name: /Shuffle/ });
    await user.click(shuffleButton);

    expect(handleShuffle).toHaveBeenCalled();
  });

  test('should display empty state when no words', () => {
    useFlashcard.mockReturnValue({
      words: [],
      isLoadingWords: false,
      currentWord: null,
    });

    render(<FlashcardView onBack={mockOnBack} />);

    expect(screen.getByText('No words available')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  test('should show back button in empty state', async () => {
    const user = userEvent.setup();
    useFlashcard.mockReturnValue({
      words: [],
      isLoadingWords: false,
      currentWord: null,
    });

    render(<FlashcardView onBack={mockOnBack} />);

    const backButton = screen.getByRole('button', { name: 'Back' });
    await user.click(backButton);

    expect(mockOnBack).toHaveBeenCalled();
  });
});
