import React, { useEffect, useState } from 'react';
import { fetchAllAccounts } from 'db';
import { EmptyState } from 'components/EmptyState';
import { useAuth } from 'contexts/AuthProvider';
import { useLanguage } from 'contexts/TranslationProvider';

export const AccountsList = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const onFinish = (data) => {
      setIsLoading(false);
      setData(data);
    };

    return fetchAllAccounts(user.uid, onFinish);
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data.length) {
    return <EmptyState />;
  }

  return (
    <>
      <h1>{t('Accounts:')}</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {item.name} - {item.amount}
          </li>
        ))}
      </ul>
    </>
  );
};

export default AccountsList;
