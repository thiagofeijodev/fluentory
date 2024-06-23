import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '@fluentui/react-components';
import { insertAccount } from 'db';
import { AccountForm } from './AccountForm';
import { useTranslation } from 'react-i18next';

export const AccountsNew = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const form = useForm();

  const onSubmit = (data) => {
    insertAccount(data);
    navigate('/');
  };

  return (
    <>
      <AccountForm form={form} onSubmit={onSubmit} />
      <Button appearance="secondary" onClick={() => navigate(-1)}>
        {t('Close')}
      </Button>
      <Button appearance="primary" onClick={form?.handleSubmit(onSubmit)}>
        {t('Save')}
      </Button>
    </>
  );
};

export default AccountsNew;
