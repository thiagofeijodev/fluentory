import React, { createContext, useEffect, useState, useContext } from 'react';
import { getLogin } from 'finance-db';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getLogin(function (user) {
      setIsLoading(false);
      if (!user) {
        return;
      }

      setLoggedUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user: loggedUser, isLoading }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
