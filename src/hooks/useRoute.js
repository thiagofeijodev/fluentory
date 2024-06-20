import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DEFAULT_PAGE, PAGES } from '../constants';

export const useRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(location.pathname || DEFAULT_PAGE);

  const onMovePage = (page) => {
    if (!PAGES[page]) {
      console.error('unknown page');
    }

    const pageName = `Finance: ${PAGES[page]}`;
    document.title = pageName;

    navigate(page);
    setCurrentPage(page);
  };

  return {
    currentPage,
    onMovePage,
  };
};

export default useRoute;
