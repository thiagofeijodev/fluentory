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
  hint: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
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
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t('Email')}
              placeholder={t('Enter your email')}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              required
              name="email"
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
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              type="password"
              label={t('Password')}
              placeholder={t('Enter your password')}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              required
              name="password"
            />
          )}
          name="password"
        />
      </div>

      <div className={styles.actions}>{children}</div>
    </form>
  );
};

export default LoginForm;
