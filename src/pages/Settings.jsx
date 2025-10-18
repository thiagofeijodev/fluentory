import { Persona } from '../components/Persona';
import SettingsTemplate from '../components/SettingsTemplate';
import { useAuth } from '../hooks/useAuth';
import { SettingsForm } from '../features/settings/SettingsForm';

export const Settings = () => {
  const { user } = useAuth();

  return (
    <SettingsTemplate>
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
    </SettingsTemplate>
  );
};

export default Settings;
