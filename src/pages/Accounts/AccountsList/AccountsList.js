import React, { useEffect, useState } from 'react';
import { fetchAllAccounts } from 'db';
import { EmptyState } from 'components/EmptyState';

export const AccountsList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAllAccounts(setData);
  }, []);

  if (!data.length) {
    return <EmptyState />;
  }

  return (
    <>
      <h1>Accounts:</h1>
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
