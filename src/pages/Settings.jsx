import { useNavigate } from 'react-router-dom';
import { Button, makeStyles } from '@fluentui/react-components';
import { SignOut20Regular } from '@fluentui/react-icons';
import { Persona } from '../components/Persona';
import SettingsTemplate from '../components/SettingsTemplate';
import { useAuth } from '../hooks/useAuth';
import { SettingsForm } from '../features/settings/SettingsForm';
import { logout } from '../db';
import { useLanguage } from '../hooks/useLanguage';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  logoutButton: {
    marginTop: '20px',
  },
});

export const Settings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const styles = useStyles();

  const handleLogout = async () => {
    if (window.confirm(t('Are you sure you want to log out?'))) {
      await logout();
      navigate('/login');
    }
  };

  return (
    <SettingsTemplate>
      <div className={styles.container}>
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
        <Button
          appearance="secondary"
          icon={<SignOut20Regular />}
          onClick={handleLogout}
          className={styles.logoutButton}
        >
          {t('Log Out')}
        </Button>
      </div>
    </SettingsTemplate>
  );
};

export default Settings;
