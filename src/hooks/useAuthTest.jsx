import { useEffect } from 'react';
import { useAuth } from '@tfr/contexts/AuthProvider';

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
