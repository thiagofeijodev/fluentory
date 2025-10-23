import React from 'react';
import {
  Input as BaseInput,
  makeStyles,
  MessageBar,
  MessageBarBody,
} from '@fluentui/react-components';
import { insertWord } from '../../db';
import { useLanguage } from '../../hooks/useLanguage';
import { useAuth } from '../../hooks/useAuth';
import { useRemoteConfig } from '../../hooks/useRemoteConfig';

const useStyles = makeStyles({
  container: {
    width: '100%',
  },
  errorMessage: {
    marginTop: '8px',
  },
});

export const QuickAddWord = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { config } = useRemoteConfig();
  const styles = useStyles();
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('');

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter' && value.trim()) {
      try {
        setError('');
        await insertWord(user.uid, { name: value.trim() }, config.maxWordsLimit);
        setValue('');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <>
      <BaseInput
        className={styles.container}
        placeholder={t('Add a new word...')}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleKeyPress}
        data-testid="add-word"
      />
      {error && (
        <MessageBar intent="error" className={styles.errorMessage}>
          <MessageBarBody>{error}</MessageBarBody>
        </MessageBar>
      )}
    </>
  );
};

export default QuickAddWord;
