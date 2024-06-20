import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const PrivateLayout = () => {
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, function (user) {
      if (!user) {
        navigate('/login');
        return;
      }

      setLoggedUser(user);
    });
  }, []);

  if (!loggedUser) {
    return <p>lodding...</p>;
  }

  return <Outlet />;
};

export default PrivateLayout;
