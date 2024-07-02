import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthProvider';
import { SplashScreen } from 'pages/SplashScreen/SplashScreen';

export const PrivateLayout = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!user && !isLoading) {
      navigate('/login');
      return;
    }
  }, [user, isLoading]);

  if (!user && isLoading) {
    return <SplashScreen />;
  }

  return <Outlet />;
};

export default PrivateLayout;
