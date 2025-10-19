import { Button, makeStyles } from '@fluentui/react-components';
import {
  ArrowShuffle20Filled,
  ChevronLeft20Regular,
  ChevronRight20Regular,
} from '@fluentui/react-icons';
import { useLanguage } from '../../../hooks/useLanguage';

const useStyles = makeStyles({
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
});

export const FlashcardControls = ({
  onPrev,
  onNext,
  onShuffle,
  onBack,
  shuffled,
  currentIndex,
  wordCount,
}) => {
  const { t } = useLanguage();
  const styles = useStyles();
  return (
    <div className={styles.controls}>
      <Button
        icon={<ChevronLeft20Regular />}
        onClick={onPrev}
        disabled={!shuffled && currentIndex === 0}
      >
        {t('Previous')}
      </Button>

      <div className={styles.counter}>
        {currentIndex + 1} / {wordCount}
      </div>

      <div className={styles.divider} />

      <Button
        icon={<ChevronRight20Regular />}
        onClick={onNext}
        disabled={!shuffled && currentIndex === wordCount - 1}
      >
        {t('Next')}
      </Button>

      <Button
        appearance={shuffled ? 'primary' : 'secondary'}
        icon={<ArrowShuffle20Filled />}
        onClick={onShuffle}
      >
        {shuffled ? t('Shuffled') : t('Shuffle')}
      </Button>

      <Button appearance="secondary" onClick={onBack}>
        {t('Back')}
      </Button>
    </div>
  );
};
