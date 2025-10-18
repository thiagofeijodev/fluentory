import { Controller } from 'react-hook-form';
import { makeStyles, tokens, Title1, Caption1 } from '@fluentui/react-components';
import { Input } from '../../components/Input';
import { useLanguage } from '../../hooks/useLanguage';

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
  hint: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
    marginTop: tokens.spacingVerticalXXS,
  },
});

export const CreateForm = ({ onSubmit, form, children }) => {
  const styles = useStyles();
  const { t } = useLanguage();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const password = watch('password', '');

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.title}>
        <Title1>{t('Create Account')}</Title1>
        <Caption1>{t('Join us today')}</Caption1>
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
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t('Email')}
              placeholder={t('Enter your email')}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
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
              value: 8,
              message: t('Password must be at least 8 characters'),
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message: t(
                'Password must include uppercase, lowercase, number and special character',
              ),
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              type="password"
              label={t('Password')}
              placeholder={t('Create a strong password')}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              required
            />
          )}
          name="password"
        />
        {!errors.password && password && (
          <Caption1 className={styles.hint}>
            {t('Password strength: ')}
            {password.length >= 12 ? t('Strong') : password.length >= 8 ? t('Medium') : t('Weak')}
          </Caption1>
        )}
        {errors.password && <Caption1 className={styles.error}>{errors.password.message}</Caption1>}
      </div>

      <div className={styles.field}>
        <Controller
          control={control}
          rules={{
            required: true,
            validate: (value) => value === password || t('Passwords do not match'),
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              type="password"
              label={t('Confirm Password')}
              placeholder={t('Confirm your password')}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              required
            />
          )}
          name="confirmPassword"
        />
        {errors.confirmPassword && (
          <Caption1 className={styles.error}>{errors.confirmPassword.message}</Caption1>
        )}
      </div>

      <div className={styles.actions}>{children}</div>
    </form>
  );
};

export default CreateForm;
