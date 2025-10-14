import { Controller } from 'react-hook-form';
import { Input } from '@tfr/components/atoms/Input';
import { useLanguage } from '@tfr/contexts/TranslationProvider';

export const CreateForm = ({ onSubmit, form, children }) => {
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

export default CreateForm;
