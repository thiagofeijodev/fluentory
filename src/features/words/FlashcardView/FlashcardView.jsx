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
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
    gap: '30px',
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
        <p>{t('No words available')}</p>
        <EmptyStateTemplate />
        <Button appearance="primary" onClick={onBack}>
          {t('Back')}
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Flashcard word={currentWord} description={description} />

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
