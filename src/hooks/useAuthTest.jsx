import React, { useEffect } from 'react';
import { useAuth } from 'finance-contexts/AuthProvider';

export const useAuthTest = (goToLogin) => {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!user && !isLoading) {
      goToLogin();
      return;
    }
  }, [user, isLoading]);

  return { user, isLoading };
};

export default useAuthTest;
