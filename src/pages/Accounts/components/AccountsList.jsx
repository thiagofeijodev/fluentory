import React from 'react';
import { makeStyles, Spinner } from '@fluentui/react-components';
import { fetchAllAccounts } from 'db';
import { EmptyState } from 'components/EmptyState';
import { CardItemList } from 'components/CardItemList';
import { useLanguage } from 'contexts/TranslationProvider';
import useQuery from 'hooks/useQuery';

const useStyles = makeStyles({
  ul: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    width: '100%',
    'list-style-type': 'none',
    margin: 0,
    padding: 0,
  },
});

export const AccountsList = () => {
  const styles = useStyles();
  const { t } = useLanguage();

  const { data: accounts, isLoading } = useQuery(fetchAllAccounts, []);

  if (isLoading) {
    return <Spinner appearance="primary" label={`${t('Loading')}...`} />;
  }

  if (!accounts.length) {
    return <EmptyState />;
  }

  return (
    <>
      <h1>{t('Accounts')}:</h1>
      <ul className={styles.ul}>
        {accounts.map((item, index) => (
          <li key={index}>
            <CardItemList name={item.name} description={item.description} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default AccountsList;
