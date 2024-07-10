import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from 'finance-components/atoms/Button';
import { useLanguage } from 'finance-contexts/TranslationProvider';
import { insertAccount } from 'finance-db';
import { useAuth } from 'finance-contexts/AuthProvider';
import { FormPageTemplate } from 'finance-components/templates/FormPageTemplate';
import { AccountForm } from 'finance-components/organisms/AccountForm';

export const AccountsNew = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { user } = useAuth();

  const form = useForm();

  const onSubmit = (data) => {
    insertAccount(user.uid, data);
    navigate(-1);
  };

  return (
    <FormPageTemplate>
      <FormPageTemplate.Body>
        <AccountForm form={form} onSubmit={onSubmit} />
      </FormPageTemplate.Body>
      <FormPageTemplate.Footer>
        <Button appearance="secondary" onClick={() => navigate(-1)}>
          {t('Close')}
        </Button>
        <Button appearance="primary" onClick={form?.handleSubmit(onSubmit)}>
          {t('Save')}
        </Button>
      </FormPageTemplate.Footer>
    </FormPageTemplate>
  );
};

export default AccountsNew;
