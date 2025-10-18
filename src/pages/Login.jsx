import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
} from '../db';
import { useLanguage } from '../hooks/useLanguage';
import { PublicTemplate } from '../components/templates/PublicTemplate';
import { Button } from '../components/atoms/Button';
import LoginForm from '../components/organisms/LoginForm';

export const Login = () => {
  const { t } = useLanguage();
  const auth = getAuth();
  const navigate = useNavigate();
  const form = useForm();
  const [errorMessage, setErrorMessage] = useState('');

  const onGoToCreate = () => navigate('/create');

  const onSuccess = () => navigate('/');

  const onError = (error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    console.log(errorCode, errorMessage, email);

    setErrorMessage(errorMessage);
  };

  const onLoginByGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(onSuccess).catch(onError);
  };

  const onLoginByFB = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider).then(onSuccess).catch(onError);
  };

  const onLoginByEmail = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password).then(onSuccess).catch(onError);
  };

  return (
    <PublicTemplate>
      <LoginForm onSubmit={onLoginByEmail} form={form}>
        <Button
          appearance="primary"
          type="submit"
          onClick={form?.handleSubmit(onLoginByEmail)}
          style={{ width: '100%' }}
        >
          {t('Sign in')}
        </Button>
      </LoginForm>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          margin: '1.5rem 0',
        }}
      >
        <div style={{ flex: 1, height: '1px', background: 'var(--colorNeutralStroke2)' }} />
        <span style={{ color: 'var(--colorNeutralForeground2)' }}>{t('or')}</span>
        <div style={{ flex: 1, height: '1px', background: 'var(--colorNeutralStroke2)' }} />
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Button
          appearance="subtle"
          icon={
            <img
              src="https://authjs.dev/img/providers/google.svg"
              style={{ width: 20, height: 20 }}
              alt="Google"
            />
          }
          onClick={onLoginByGoogle}
        >
          Google
        </Button>
        <Button
          appearance="subtle"
          icon={
            <img
              src="https://authjs.dev/img/providers/facebook.svg"
              style={{ width: 20, height: 20 }}
              alt="Facebook"
            />
          }
          onClick={onLoginByFB}
        >
          Facebook
        </Button>
      </div>

      {errorMessage && (
        <div
          style={{
            color: 'var(--colorPaletteRedForeground1)',
            textAlign: 'center',
            margin: '1rem 0',
          }}
        >
          {errorMessage}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <span style={{ marginRight: '0.5rem', color: 'var(--colorNeutralForeground2)' }}>
          {t("Don't have an account?")}
        </span>
        <Button appearance="transparent" onClick={onGoToCreate}>
          {t('Create new account')}
        </Button>
      </div>
    </PublicTemplate>
  );
};

export default Login;
