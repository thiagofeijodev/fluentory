import * as React from 'react';
import { Persona } from '@tfr/components/atoms/Persona';
import SettingsTemplate from '@tfr/components/templates/SettingsTemplate';
import { useAuth } from '@tfr/contexts/AuthProvider';
import { SettingsForm } from '@tfr/components/organisms/SettingsForm';

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
