import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { makeStyles, tokens } from '@fluentui/react-components';
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword } from '../db';
import { Button } from '../components/Button';
import { AuthPageTemplate } from '../components/AuthPageTemplate';
import { CreateForm } from '../features/auth/CreateForm';
import { useLanguage } from '../hooks/useLanguage';
import { PublicTemplate } from '../components/PublicTemplate';

const useStyles = makeStyles({
  submitButton: {
    width: '100%',
    height: '40px',
    marginBottom: tokens.spacingVerticalM,
  },
  errorMessage: {
    color: tokens.colorPaletteRedForeground1,
    textAlign: 'center',
    margin: `${tokens.spacingVerticalS} 0`,
    padding: tokens.spacingVerticalS,
    backgroundColor: tokens.colorPaletteRedBackground1,
    borderRadius: tokens.borderRadiusMedium,
  },
  footer: {
    textAlign: 'center',
    marginTop: tokens.spacingVerticalL,
    padding: `${tokens.spacingVerticalM} 0`,
  },
  footerText: {
    color: tokens.colorNeutralForeground2,
    marginRight: tokens.spacingHorizontalS,
  },
});

export const Create = () => {
  const { t } = useLanguage();
  const styles = useStyles();
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
      <AuthPageTemplate>
        <CreateForm onSubmit={onCreateByEmail} form={form}>
          <Button
            appearance="primary"
            type="submit"
            onClick={form?.handleSubmit(onCreateByEmail)}
            className={styles.submitButton}
          >
            {t('Create Account')}
          </Button>
        </CreateForm>

        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

        <div className={styles.footer}>
          <span className={styles.footerText}>{t('Already have an account?')}</span>
          <Button appearance="transparent" onClick={onGoToLogin}>
            {t('Sign in here')}
          </Button>
        </div>
      </AuthPageTemplate>
    </PublicTemplate>
  );
};

export default Create;
