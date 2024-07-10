import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
} from 'finance-db';
import { useLanguage } from 'finance-contexts/TranslationProvider';
import { LoginTemplate } from 'finance-components/templates/LoginTemplate';
import { Button } from 'finance-components/atoms/Button';
import LoginForm from 'finance-components/organisms/LoginForm';

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
    <LoginTemplate>
      <div>
        <LoginForm onSubmit={onLoginByEmail} form={form}>
          <Button primary type="submit" onClick={form?.handleSubmit(onLoginByEmail)}>
            {t('Login')}
          </Button>
        </LoginForm>
      </div>
      <div>
        <Button onClick={onLoginByGoogle}>Google</Button>
        <Button onClick={onLoginByFB}>Facebook</Button>
      </div>
      <div>
        <p>{errorMessage}</p>
        <Button primary onClick={onGoToCreate}>
          {t('Create new account')}
        </Button>
      </div>
    </LoginTemplate>
  );
};

export default Login;
