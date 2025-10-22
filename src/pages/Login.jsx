import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { makeStyles, tokens } from '@fluentui/react-components';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
} from '../db';
import { useLanguage } from '../hooks/useLanguage';
import { PublicTemplate } from '../components/PublicTemplate';
import { AuthPageTemplate } from '../components/AuthPageTemplate';
import { Button } from '../components/Button';
import { LoginForm } from '../features/auth/LoginForm';

const useStyles = makeStyles({
  submitButton: {
    width: '100%',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalL,
    margin: `${tokens.spacingVerticalL} 0`,
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    background: tokens.colorNeutralStroke2,
  },
  dividerText: {
    color: tokens.colorNeutralForeground2,
  },
  socialButtons: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    justifyContent: 'center',
  },
  socialIcon: {
    width: '20px',
    height: '20px',
  },
  errorMessage: {
    color: tokens.colorPaletteRedForeground1,
    textAlign: 'center',
    margin: `${tokens.spacingVerticalM} 0`,
  },
  footer: {
    textAlign: 'center',
    marginTop: tokens.spacingVerticalM,
  },
  footerText: {
    marginRight: tokens.spacingHorizontalS,
    color: tokens.colorNeutralForeground2,
  },
});

export const Login = () => {
  const { t } = useLanguage();
  const auth = getAuth();
  const navigate = useNavigate();
  const form = useForm();
  const [errorMessage, setErrorMessage] = useState('');

  const onGoToCreate = () => navigate('/create');

  const onSuccess = () => navigate('/app');

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

  const styles = useStyles();

  return (
    <PublicTemplate>
      <AuthPageTemplate>
        <LoginForm onSubmit={onLoginByEmail} form={form}>
          <Button
            appearance="primary"
            type="submit"
            onClick={form?.handleSubmit(onLoginByEmail)}
            className={styles.submitButton}
          >
            {t('Sign in')}
          </Button>
        </LoginForm>

        <div className={styles.divider}>
          <div className={styles.dividerLine} />
          <span className={styles.dividerText}>{t('or')}</span>
          <div className={styles.dividerLine} />
        </div>

        <div className={styles.socialButtons}>
          <Button
            appearance="subtle"
            icon={
              <img
                src="https://authjs.dev/img/providers/google.svg"
                className={styles.socialIcon}
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
                className={styles.socialIcon}
                alt="Facebook"
              />
            }
            onClick={onLoginByFB}
          >
            Facebook
          </Button>
        </div>

        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

        <div className={styles.footer}>
          <span className={styles.footerText}>{t("Don't have an account?")}</span>
          <Button appearance="transparent" onClick={onGoToCreate}>
            {t('Create new account')}
          </Button>
        </div>
      </AuthPageTemplate>
    </PublicTemplate>
  );
};

export default Login;
