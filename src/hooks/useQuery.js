import { useEffect, useState } from 'react';
import { useAuth } from 'contexts/AuthProvider';

export const useQuery = (service, initialData) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(initialData);

  useEffect(() => {
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
