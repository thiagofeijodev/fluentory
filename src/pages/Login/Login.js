import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { makeStyles, Button } from '@fluentui/react-components';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useLanguage } from 'contexts/TranslationProvider';
import { LoginForm } from './components/LoginForm';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '5px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '5px',
  },
  create: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const Login = () => {
  const styles = useStyles();
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
    <div className={styles.root}>
      <div>
        <LoginForm onSubmit={onLoginByEmail} form={form}>
          <Button primary type="submit" onClick={form?.handleSubmit(onLoginByEmail)}>
            {t('Login')}
          </Button>
        </LoginForm>
      </div>
      <div className={styles.footer}>
        <Button onClick={onLoginByGoogle}>Google</Button>
        <Button onClick={onLoginByFB}>Facebook</Button>
      </div>
      <div className={styles.create}>
        <p>{errorMessage}</p>
        <Button primary onClick={onGoToCreate}>
          {t('Create new account')}
        </Button>
      </div>
    </div>
  );
};

export default Login;
