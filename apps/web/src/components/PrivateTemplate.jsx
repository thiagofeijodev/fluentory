import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthTest } from '@tfr/hooks/useAuthTest';
import { SplashScreenTemplate } from '@tfr/components/templates/SplashScreenTemplate';

export const PrivateTemplate = () => {
  const navigate = useNavigate();

  const gotToLogin = () => navigate('/login');
  const { user, isLoading } = useAuthTest(gotToLogin);

  if (!user && isLoading) {
    return <SplashScreenTemplate />;
  }

  return <Outlet />;
};

export default PrivateTemplate;
