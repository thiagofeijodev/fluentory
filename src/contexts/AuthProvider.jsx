import React, { createContext, useEffect, useState, useContext } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, function (user) {
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
