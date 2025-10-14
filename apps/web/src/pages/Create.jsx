import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword } from '@tfr/db';
import { Button } from '@tfr/components/atoms/Button';
import CreateForm from '@tfr/components/organisms/CreateForm';
import { useLanguage } from '@tfr/contexts/TranslationProvider';
import { CreateTemplate } from '@tfr/components/templates/CreateTemplate';

export const Create = () => {
  const { t } = useLanguage();
  const auth = getAuth();
  const navigate = useNavigate();
  const form = useForm();
  const [errorMessage, setErrorMessage] = useState('');

  const onGoToLogin = () => navigate('/login');

  const onSuccess = () => navigate('/');

  const onError = (error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(errorCode, errorMessage, email, credential);

    setErrorMessage(errorMessage);
  };

  const onCreateByEmail = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password).then(onSuccess).catch(onError);
  };

  return (
    <CreateTemplate>
      <div>
        <CreateForm onSubmit={onCreateByEmail} form={form}>
          <Button primary type="submit" onClick={form?.handleSubmit(onCreateByEmail)}>
            {t('Create')}
          </Button>
        </CreateForm>
      </div>
      <div>
        <p>{errorMessage}</p>
        <Button primary onClick={onGoToLogin}>
          {t('Login')}
        </Button>
      </div>
    </CreateTemplate>
  );
};

export default Create;
