import * as React from 'react';
import { makeStyles, Button } from '@fluentui/react-components';
import { useTheme, themeEnumOption } from 'contexts/ThemeProvider';
import { Select } from 'components/Select';
import { backupDataBase } from 'functions/backupDataBase';

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

  return (
    <div className={styles.root}>
      <Select
        label="Theme"
        onChange={onTheme}
        options={Object.values(themeEnumOption)}
        value={theme}
      />
      <Button onClick={backupDataBase}>Backup</Button>
    </div>
  );
};

export default Settings;
