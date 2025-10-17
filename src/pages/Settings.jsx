import { Persona } from '../components/atoms/Persona';
import SettingsTemplate from '../components/templates/SettingsTemplate';
import { useAuth } from '../hooks/useAuth';
import { SettingsForm } from '../components/organisms/SettingsForm';

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
