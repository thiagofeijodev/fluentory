import { Controller } from 'react-hook-form';
import { Input } from '../../components/Input';
import { useLanguage } from '../../hooks/useLanguage';
import { makeStyles, Title1, Caption1, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
  },
  title: {
    textAlign: 'center',
    marginBottom: tokens.spacingVerticalL,
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
  },
  error: {
    color: tokens.colorPaletteRedForeground1,
    marginTop: tokens.spacingVerticalXXS,
  },
  actions: {
    marginTop: tokens.spacingVerticalL,
  },
});

export const LoginForm = ({ onSubmit, form, children }) => {
  const styles = useStyles();
  const { t } = useLanguage();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.title}>
        <Title1>{t('Welcome back')}</Title1>
        <Caption1>{t('Sign in to continue')}</Caption1>
      </div>

      <div className={styles.field}>
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: t('Invalid email address'),
            },
          }}
          render={({ field: { onChange, onBlur } }) => (
            <Input
              label={t('Email')}
              placeholder={t('Enter your email')}
              onBlur={onBlur}
              onChange={onChange}
              required
            />
          )}
          name="email"
        />
        {errors.email && (
          <Caption1 className={styles.error}>
            {errors.email.message || t('Email is required')}
          </Caption1>
        )}
      </div>

      <div className={styles.field}>
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: {
              value: 6,
              message: t('Password must be at least 6 characters'),
            },
          }}
          render={({ field: { onChange, onBlur } }) => (
            <Input
              type="password"
              label={t('Password')}
              placeholder={t('Enter your password')}
              onBlur={onBlur}
              onChange={onChange}
              required
            />
          )}
          name="password"
        />
        {errors.password && (
          <Caption1 className={styles.error}>
            {errors.password.message || t('Password is required')}
          </Caption1>
        )}
      </div>

      <div className={styles.actions}>{children}</div>
    </form>
  );
};

export default LoginForm;
