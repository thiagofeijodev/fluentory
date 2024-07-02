import React from 'react';
import { Controller } from 'react-hook-form';
import { useLanguage } from 'contexts/TranslationProvider';
import { Input } from 'components/Input';

export const LoginForm = ({ onSubmit, form, children }) => {
  const { t } = useLanguage();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur } }) => (
          <Input label={t('Email')} placeholder={t('Email')} onBlur={onBlur} onChange={onChange} />
        )}
        name="email"
      />
      {errors.email && <span>{t('This field is required')}</span>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur } }) => (
          <Input
            type="password"
            label={t('Password')}
            placeholder={t('Password')}
            onBlur={onBlur}
            onChange={onChange}
          />
        )}
        name="password"
      />
      {errors.password && <span>{t('This field is required')}</span>}
      <br />
      {children}
    </form>
  );
};

export default LoginForm;
