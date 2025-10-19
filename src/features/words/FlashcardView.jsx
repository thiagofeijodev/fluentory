import { makeStyles, Button, Spinner } from '@fluentui/react-components';
import React from 'react';
import {
  ArrowShuffle20Filled,
  ChevronLeft20Regular,
  ChevronRight20Regular,
} from '@fluentui/react-icons';
import { fetchAllWords } from '../../db';
import { useLanguage } from '../../hooks/useLanguage';
import { useQuery } from '../../hooks/useQuery';

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
  card: {
    width: '100%',
    maxWidth: '800px',
    minHeight: '300px',
    borderRadius: '12px',
    border: '2px solid #0078d4',
    padding: '40px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px',
    alignItems: 'center',
    justifyItems: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  cardContent: {
    textAlign: 'center',
  },
  word: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#0078d4',
    margin: '0 0 10px 0',
  },
  label: {
    fontSize: '14px',
    color: '#666',
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: '1px',
  },
  description: {
    fontSize: '20px',
    color: '#333',
    margin: '0',
    lineHeight: '1.6',
  },
  controls: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  counter: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#666',
    minWidth: '100px',
    textAlign: 'center',
  },
  divider: {
    height: '30px',
    width: '1px',
    backgroundColor: '#ccc',
  },
  emptyState: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#666',
  },
});

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const FlashcardView = ({ onBack }) => {
  const styles = useStyles();
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [shuffled, setShuffled] = React.useState(false);

  const { data: allWords, isLoading } = useQuery(fetchAllWords, []);

  const words = React.useMemo(() => {
    return shuffled ? shuffleArray(allWords) : allWords;
  }, [allWords, shuffled]);

  const currentWord = words[currentIndex];

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleShuffle = () => {
    setShuffled(!shuffled);
    setCurrentIndex(0);
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Spinner appearance="primary" label={`${t('Loading')}...`} />
      </div>
    );
  }

  if (words.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <p>{t('No words available')}</p>
          <Button onClick={onBack}>{t('Back')}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Flashcard */}
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <div className={styles.label}>{t('Word')}</div>
          <p className={styles.word}>{currentWord?.name}</p>
        </div>
        <div className={styles.cardContent}>
          <div className={styles.label}>{t('Definition')}</div>
          <p className={styles.description}>{currentWord?.description}</p>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <Button icon={<ChevronLeft20Regular />} onClick={handlePrev} disabled={currentIndex === 0}>
          {t('Previous')}
        </Button>

        <div className={styles.counter}>
          {currentIndex + 1} / {words.length}
        </div>

        <div className={styles.divider} />

        <Button
          icon={<ChevronRight20Regular />}
          onClick={handleNext}
          disabled={currentIndex === words.length - 1}
        >
          {t('Next')}
        </Button>

        <Button
          appearance={shuffled ? 'primary' : 'secondary'}
          icon={<ArrowShuffle20Filled />}
          onClick={handleShuffle}
        >
          {shuffled ? `${t('Shuffled')}` : `${t('Shuffle')}`}
        </Button>

        <Button appearance="secondary" onClick={onBack}>
          {t('Back')}
        </Button>
      </div>
    </div>
  );
};

export default FlashcardView;
