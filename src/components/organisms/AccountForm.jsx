import React from 'react';
import { Controller } from 'react-hook-form';
import { Input } from 'finance-components/atoms/Input';
import { useLanguage } from 'finance-contexts/TranslationProvider';

export const AccountForm = ({ onSubmit, form }) => {
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
          <Input label={t('Name')} placeholder={t('Name')} onBlur={onBlur} onChange={onChange} />
        )}
        name="name"
      />
      {errors.name && <span>{t('This field is required')}</span>}
    </form>
  );
};

export default AccountForm;
