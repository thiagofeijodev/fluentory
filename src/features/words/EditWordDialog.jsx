import React from 'react';
import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
} from '@fluentui/react-components';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '../../components/Input';
import { updateWord } from '../../db';
import { useLanguage } from '../../hooks/useLanguage';

export const EditWordDialog = ({ word, open, onOpenChange }) => {
  const { t } = useLanguage();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: word?.name || '',
      description: word?.description || '',
    },
  });

  React.useEffect(() => {
    if (word) {
      reset({
        name: word.name || '',
        description: word.description || '',
      });
    }
  }, [word, reset]);

  const onSubmit = (data) => {
    if (word?.id) {
      updateWord(word.id, data);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(_event, data) => onOpenChange(data.open)}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{t('Edit word')}</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label={t('Word')}
                    placeholder={t('Word')}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                )}
                name="name"
              />
              {errors.name && <span>{t('This field is required')}</span>}

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label={t('Description')}
                    placeholder={t('Description')}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                )}
                name="description"
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button appearance="secondary" onClick={() => onOpenChange(false)}>
              {t('Cancel')}
            </Button>
            <Button appearance="primary" onClick={handleSubmit(onSubmit)}>
              {t('Update word')}
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default EditWordDialog;
