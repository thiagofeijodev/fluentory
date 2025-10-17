import { useContext } from 'react';
import { AuthContext } from '../contexts/constants';

export const useAuth = () => {
  return useContext(AuthContext);
};
