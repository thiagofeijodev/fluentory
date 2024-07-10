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
import { Input } from 'finance-components/atoms/Input';
import { fetchAllAccounts, insertFinancial } from 'finance-db';
import { useLanguage } from 'finance-contexts/TranslationProvider';
import { Select } from 'finance-components/atoms/Select';
import { useAuth } from 'finance-contexts/AuthProvider';
import { useQuery } from 'finance-hooks/useQuery';

export const AddDialog = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [open, setOpen] = React.useState(false);

  const { data: accounts } = useQuery(fetchAllAccounts, []);

  const onSubmit = (data) => {
    insertFinancial(user.uid, data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(_event, data) => setOpen(data.open)}>
      <DialogTrigger disableButtonEnhancement>
        <Button>{t('New')}</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{t('New')}</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(insertFinancial)}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur } }) => (
                  <Input
                    label={t('Name')}
                    placeholder={t('Name')}
                    onBlur={onBlur}
                    onChange={onChange}
                  />
                )}
                name="name"
              />
              {errors.name && <span>{t('This field is required')}</span>}

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Select
                    label={t('Account')}
                    onChange={onChange}
                    onBlur={onBlur}
                    options={accounts.map((d) => d.name)}
                    value={value || ''}
                  />
                )}
                name="account"
              />
              {errors.account && <span>{t('This field is required')}</span>}
            </form>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">{t('Close')}</Button>
            </DialogTrigger>
            <Button appearance="primary" onClick={handleSubmit(onSubmit)}>
              {t('Save')}
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default AddDialog;
