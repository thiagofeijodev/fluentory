import { useEffect, useState } from 'react';
import { useAuth } from '@tfr/contexts/AuthProvider';

export const useQuery = (service, initialData) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (!user?.uid) return;

    const onFinish = (data) => {
      setIsLoading(false);
      setData(data);
    };

    return service(user.uid, onFinish);
  }, []);

  return {
    isLoading,
    data,
  };
};

export default useQuery;
