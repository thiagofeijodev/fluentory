import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'finance-components/atoms/Button';
import { useLanguage } from 'finance-contexts/TranslationProvider';
import ListPageTemplate from 'finance-components/templates/ListPageTemplate';
import AccountsList from 'finance-components/organisms/AccountsList';

export const Accounts = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <ListPageTemplate>
      <Button onClick={() => navigate('/account/new')}>{t('New')}</Button>
      <AccountsList />
    </ListPageTemplate>
  );
};

export default Accounts;
