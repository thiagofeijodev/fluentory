import React from 'react';
import { Input as BaseInput, makeStyles } from '@fluentui/react-components';
import { insertWord } from '../../db';
import { useLanguage } from '../../hooks/useLanguage';
import { useAuth } from '../../hooks/useAuth';

const useStyles = makeStyles({
  container: {
    width: '100%',
  },
});

export const QuickAddWord = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const styles = useStyles();
  const [value, setValue] = React.useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && value.trim()) {
      insertWord(user.uid, { name: value.trim() });
      setValue('');
    }
  };

  return (
    <BaseInput
      className={styles.container}
      placeholder={t('Add a new word...')}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyPress={handleKeyPress}
      data-testid="add-word"
    />
  );
};

export default QuickAddWord;
