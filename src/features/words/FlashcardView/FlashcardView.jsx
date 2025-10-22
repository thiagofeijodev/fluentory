import { Button, makeStyles, Spinner } from '@fluentui/react-components';
import { EmptyStateTemplate } from '../../../components/EmptyStateTemplate';
import { useLanguage } from '../../../hooks/useLanguage';
import { useFlashcard } from './hooks/useFlashcard';
import { Flashcard } from './components/Flashcard';
import { FlashcardControls } from './components/FlashcardControls';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100vh',
    padding: '20px',
    gap: '30px',
    boxSizing: 'border-box',
  },
  cardContainer: {
    flexGrow: 1,
    display: 'flex',
    width: '100%',
  },
});

export const FlashcardView = ({ onBack }) => {
  const styles = useStyles();
  const { t } = useLanguage();
  const {
    words,
    isLoadingWords,
    currentWord,
    currentIndex,
    description,
    shuffled,
    handleNext,
    handlePrev,
    handleShuffle,
  } = useFlashcard();

  if (isLoadingWords) {
    return <Spinner label={`${t('Loading words')}...`} />;
  }

  if (!words || words.length === 0) {
    return (
      <div className={styles.container}>
        <header>
          <h1>Flashcards Study Mode</h1>
        </header>
        <div data-testid="empty-state">
          <p>{t('No words available')}</p>
          <EmptyStateTemplate />
        </div>
        <Button appearance="primary" onClick={onBack}>
          {t('Back')}
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header>
        <h1>Flashcards Study Mode</h1>
      </header>
      <div className={styles.cardContainer}>
        <Flashcard word={currentWord} description={description} />
      </div>

      <FlashcardControls
        onPrev={handlePrev}
        onNext={handleNext}
        onShuffle={handleShuffle}
        onBack={onBack}
        shuffled={shuffled}
        currentIndex={currentIndex}
        wordCount={words.length}
      />
    </div>
  );
};
