import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@fluentui/react-components';
import { AccountsList } from './AccountsList/AccountsList';

export const Accounts = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button onClick={() => navigate('/account/new')}>Add</Button>
      <AccountsList />
    </div>
  );
};

export default Accounts;
