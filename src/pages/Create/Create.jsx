import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { makeStyles, Button } from '@fluentui/react-components';
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { useLanguage } from 'contexts/TranslationProvider';
import { CreateForm } from './components/CreateForm';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '5px',
  },
  create: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const Create = () => {
  const styles = useStyles();
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
    <div className={styles.root}>
      <div>
        <CreateForm onSubmit={onCreateByEmail} form={form}>
          <Button primary type="submit" onClick={form?.handleSubmit(onCreateByEmail)}>
            {t('Create')}
          </Button>
        </CreateForm>
      </div>
      <div className={styles.create}>
        <p>{errorMessage}</p>
        <Button primary onClick={onGoToLogin}>
          {t('Login')}
        </Button>
      </div>
    </div>
  );
};

export default Create;
