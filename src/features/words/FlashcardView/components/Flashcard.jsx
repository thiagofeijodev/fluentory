import { useState } from 'react';
import { Button, makeStyles, Spinner } from '@fluentui/react-components';
import { useLanguage } from '../../../../hooks/useLanguage';
import { handleProvideSimilarWordsToAskAI } from '../../../../db/ai/words';
import { Sparkle24Filled } from '@fluentui/react-icons';

const useStyles = makeStyles({
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
    color: '#FFF',
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: '1px',
  },
  description: {
    fontSize: '20px',
    color: '#666',
    margin: '0',
    lineHeight: '1.6',
  },
  aiContainer: {
    gridColumnStart: '1',
    gridColumnEnd: '3',
    textAlign: 'center',
  },
  similarWords: {
    marginTop: '20px',
    fontSize: '18px',
  },
});

export const Flashcard = ({ word, description }) => {
  const { t } = useLanguage();
  const styles = useStyles();
  const [similarWords, setSimilarWords] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const listFromAI = similarWords[word?.name] || [];

  const handleAskAI = async () => {
    if (!word?.name) return;

    setIsLoading(true);
    setSimilarWords((prev) => ({
      ...prev,
      [word.name]: [],
    }));

    try {
      const text = await handleProvideSimilarWordsToAskAI(word);
      setSimilarWords((prev) => ({
        ...prev,
        [word.name]: text.split(',').map((w) => w.trim()),
      }));
    } catch (error) {
      console.error('Error fetching similar words:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.label}>{t('Word')}</div>
        <p className={styles.word}>{word?.name}</p>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.label}>{t('Definition')}</div>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.aiContainer}>
        <Button
          appearance="primary"
          icon={<Sparkle24Filled />}
          onClick={handleAskAI}
          disabled={isLoading}
        >
          {t('Ask AI for 5 similar words')}
        </Button>
        {isLoading && <Spinner label={`${t('Thinking')}...`} />}
        {listFromAI.length > 0 && (
          <div className={styles.similarWords}>
            <strong>{t('Similar words')}:</strong>
            <p>{listFromAI.join(', ')}</p>
          </div>
        )}
      </div>
    </div>
  );
};
