import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@fluentui/react-components';
import { useLanguage } from 'contexts/TranslationProvider';
import ListPageLayout from 'components/ListPageLayout';
import { AccountsList } from './components/AccountsList';

export const Accounts = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <ListPageLayout>
      <Button onClick={() => navigate('/account/new')}>{t('New')}</Button>
      <AccountsList />
    </ListPageLayout>
  );
};

export default Accounts;
