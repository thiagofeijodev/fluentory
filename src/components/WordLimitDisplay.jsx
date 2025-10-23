import { Text, makeStyles } from '@fluentui/react-components';
import { useLanguage } from '../hooks/useLanguage';
import { useRemoteConfig } from '../hooks/useRemoteConfig';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 12px',
    backgroundColor: 'var(--colorNeutralBackground2)',
    borderRadius: '4px',
    marginBottom: '12px',
  },
  limitText: {
    fontSize: '14px',
    color: 'var(--colorNeutralForeground2)',
  },
  countText: {
    fontSize: '14px',
    fontWeight: '600',
  },
});

export const WordLimitDisplay = ({ currentCount }) => {
  const { t } = useLanguage();
  const { config } = useRemoteConfig();
  const styles = useStyles();

  const percentage = Math.round((currentCount / config.maxWordsLimit) * 100);

  return (
    <div className={styles.container}>
      <Text className={styles.limitText}>
        {t('Words limit')}: {currentCount} / {config.maxWordsLimit}
      </Text>
      <Text className={styles.countText}>{percentage}%</Text>
    </div>
  );
};
