import * as React from 'react';
import { Persona } from 'finance-components/atoms/Persona';
import SettingsTemplate from 'finance-components/templates/SettingsTemplate';
import { useAuth } from 'finance-contexts/AuthProvider';
import { SettingsForm } from 'finance-components/organisms/SettingsForm';

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
