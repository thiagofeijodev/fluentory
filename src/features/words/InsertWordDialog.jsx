import React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
} from '@fluentui/react-components';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '../../components/Input';
import { insertWord } from '../../db';
import { useLanguage } from '../../hooks/useLanguage';
import { useAuth } from '../../hooks/useAuth';

export const InsertWordDialog = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [open, setOpen] = React.useState(false);

  const onSubmit = (data) => {
    insertWord(user.uid, data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(_event, data) => setOpen(data.open)}>
      <DialogTrigger disableButtonEnhancement>
        <Button>{t('New word')}</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{t('New word')}</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur } }) => (
                  <Input
                    label={t('Word')}
                    placeholder={t('Word')}
                    onBlur={onBlur}
                    onChange={onChange}
                  />
                )}
                name="name"
              />
              {errors.name && <span>{t('This field is required')}</span>}
            </form>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">{t('Cancel')}</Button>
            </DialogTrigger>
            <Button appearance="primary" onClick={handleSubmit(onSubmit)}>
              {t('Save word')}
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default InsertWordDialog;
