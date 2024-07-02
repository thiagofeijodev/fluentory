import * as React from 'react';
import { makeStyles, Button } from '@fluentui/react-components';
import { useTheme, themeEnumOption } from 'contexts/ThemeProvider';
import { useLanguage, translationEnumOption } from 'contexts/TranslationProvider';
import { Select } from 'components/Select';
import { backupDataBase } from './utils/backupDataBase';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center',
    height: '100%',
    gap: '50px',
  },
});

export const Settings = () => {
  const styles = useStyles();
  const { theme, onTheme } = useTheme();
  const { t, lng, onTraslationChange } = useLanguage();

  return (
    <div className={styles.root}>
      <Select
        label={t('Theme')}
        onChange={onTheme}
        options={Object.values(themeEnumOption)}
        value={theme}
      />
      <Select
        label={t('Language')}
        onChange={onTraslationChange}
        options={[translationEnumOption.ptBr, translationEnumOption.en]}
        value={lng}
      />
      <Button onClick={backupDataBase}>{t('Backup')}</Button>
    </div>
  );
};

export default Settings;
