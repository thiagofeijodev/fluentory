import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PAGES } from '../constants';

export const useRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const page = location.pathname;

    if (!PAGES[page]) {
      console.error('unknown page');
      return;
    }

    const pageName = `Finance: ${PAGES[page] || ''}`;
    document.title = pageName;
  }, [location.pathname]);

  return {
    currentPage: location.pathname,
    onMovePage: navigate,
  };
};

export default useRoute;
