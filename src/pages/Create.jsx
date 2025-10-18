import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword } from '../db';
import { Button } from '../components/atoms/Button';
import CreateForm from '../components/organisms/CreateForm';
import { useLanguage } from '../hooks/useLanguage';
import { PublicTemplate } from '../components/templates/PublicTemplate';

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
    <PublicTemplate>
      <CreateForm onSubmit={onCreateByEmail} form={form}>
        <Button
          appearance="primary"
          type="submit"
          onClick={form?.handleSubmit(onCreateByEmail)}
          style={{
            width: '100%',
            height: '40px',
            marginBottom: 'var(--spacingVerticalM)',
          }}
        >
          {t('Create Account')}
        </Button>
      </CreateForm>

      {errorMessage && (
        <div
          style={{
            color: 'var(--colorPaletteRedForeground1)',
            textAlign: 'center',
            margin: 'var(--spacingVerticalS) 0',
            padding: 'var(--spacingVerticalS)',
            backgroundColor: 'var(--colorPaletteRedBackground1)',
            borderRadius: 'var(--borderRadiusMedium)',
          }}
        >
          {errorMessage}
        </div>
      )}

      <div
        style={{
          textAlign: 'center',
          marginTop: 'var(--spacingVerticalL)',
          padding: 'var(--spacingVerticalM) 0',
        }}
      >
        <span
          style={{
            color: 'var(--colorNeutralForeground2)',
            marginRight: 'var(--spacingHorizontalS)',
          }}
        >
          {t('Already have an account?')}
        </span>
        <Button appearance="transparent" onClick={onGoToLogin}>
          {t('Sign in here')}
        </Button>
      </div>
    </PublicTemplate>
  );
};

export default Create;
