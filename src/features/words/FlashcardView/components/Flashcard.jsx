import { makeStyles } from '@fluentui/react-components';
import { useLanguage } from '../../../../hooks/useLanguage';

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
});

export const Flashcard = ({ word, description }) => {
  const { t } = useLanguage();
  const styles = useStyles();
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
    </div>
  );
};
