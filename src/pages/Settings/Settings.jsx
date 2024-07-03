import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { Persona } from '@fluentui/react-components';
import { useAuth } from 'contexts/AuthProvider';
import { SettingsForm } from './components/SettingsForm';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    'flex-direction': 'column',
    'box-sizing': 'border-box',
    height: '100%',
    gap: '10%',
    padding: '20vh 30%',
    '@media (max-width: 1024px)': {
      padding: '20vh 10%',
    },
  },
});

export const Settings = () => {
  const styles = useStyles();
  const { user } = useAuth();

  return (
    <div className={styles.root}>
      <Persona
        name={user.displayName}
        secondaryText={user.email || user.phoneNumber}
        avatar={{
          image: {
            src: user.photoURL,
          },
        }}
      />
      <SettingsForm />
    </div>
  );
};

export default Settings;
